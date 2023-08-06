use tauri::Manager;

#[derive(serde::Serialize, Clone)]
pub struct SetLoadingStatusPayload {
    pub first_status: Option<String>,
    pub second_status: Option<String>,
    pub command_on_click: Option<String>,
}
