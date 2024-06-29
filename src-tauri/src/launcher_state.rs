use std::collections::HashMap;

#[derive(Debug, serde::Deserialize, serde::Serialize, Clone, Default)]
pub struct LauncherInfo {
    #[serde(rename = "gameId")]
    pub game_id: String,
    #[serde(rename = "displayName")]
    pub display_name: String,
    pub version: String,
    #[serde(rename = "rawVersion")]
    pub raw_version: String,
    #[serde(rename = "distPlatform")]
    pub dist_platform: String,
    #[serde(rename = "ingameSettingsPath")]
    pub ingame_settings_path: String,
    #[serde(rename = "gameDataPath")]
    pub game_data_path: String,
    #[serde(rename = "dlcPath")]
    pub dlc_path: String,
    #[serde(rename = "ingameSettingsLayoutPath")]
    pub ingame_settings_layout_path: String,
    #[serde(rename = "themeFile")]
    pub theme_file: String,
    #[serde(rename = "browserDlcUrl")]
    pub browser_dlc_url: String,
    #[serde(rename = "browserModUrl")]
    pub browser_mod_url: String,
    #[serde(rename = "exePath")]
    pub exe_path: String,
    #[serde(rename = "exeArgs")]
    pub exe_args: Vec<String>,
    #[serde(rename = "alternativeExecutables")]
    pub alternative_executables: Vec<AlternativeExecutable>,
    #[serde(rename = "gameCachePaths")]
    pub game_cache_paths: Vec<String>,
}

#[derive(Debug, serde::Deserialize, serde::Serialize, Clone, Default)]
pub struct AlternativeExecutable {
    pub label: HashMap<String, String>,
    #[serde(rename = "exePath")]
    pub exe_path: String,
    #[serde(rename = "exeArgs")]
    pub exe_args: Vec<String>,
}
#[derive(Default)]
pub struct LauncherState {
    pub mods: std::sync::Mutex<Vec<crate::models::descriptor::Descriptor>>,
    pub modpacks: std::sync::Mutex<Vec<crate::models::modpack::Modpack>>,
    pub info: std::sync::Mutex<LauncherInfo>,
    pub settings: std::sync::Mutex<crate::settings::Settings>,
}
