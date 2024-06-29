use std::path::PathBuf;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Default)]
pub struct Settings {
    pub custom_background: Option<PathBuf>,
}

impl Settings {
    pub async fn load(&mut self, app: tauri::AppHandle) -> Result<(), Box<dyn std::error::Error>> {
        let app_config_dir = app.path_resolver().app_config_dir().unwrap();
        let settings_path = app_config_dir.join("settings.json");

        info!("Loading settings from {}", settings_path.display());

        if !settings_path.exists() {
            let settings = Self::default();
            tokio::fs::write(&settings_path, serde_json::to_string(&settings)?).await?;
            *self = settings;
        } else {
            let settings = tokio::fs::read_to_string(&settings_path).await?;
            *self = serde_json::from_str(&settings)?;
        }

        info!("Settings loaded {:#?}", self);

        Ok(())
    }
}

#[tauri::command]
pub async fn get_settings(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
) -> Result<Settings, String> {
    state
        .settings
        .lock()
        .map(|x| x.clone())
        .map_err(|_| "Could not get settings".to_string())
}

#[tauri::command]
pub async fn save_settings(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
    settings: Settings,
) -> Result<(), String> {
    state
        .settings
        .lock()
        .map(|mut x| {
            *x = settings;
        })
        .map_err(|_| "Could not save settings".to_string())
}
