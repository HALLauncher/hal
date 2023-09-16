use std::path::PathBuf;


pub async fn get_mods_folder(app: tauri::AppHandle) -> Result<PathBuf, String> {
    let Some(data_dir) = app.path_resolver().app_data_dir() else {
        return Err("Could not find data directory".to_string());
    };

    let launcher_mods_dir = data_dir.join("mods");
    if !launcher_mods_dir.exists() {
        if std::fs::create_dir_all(&launcher_mods_dir).is_err() {
            return Err("Could not create mods directory".to_string());
        }
    }

    Ok(launcher_mods_dir)
}