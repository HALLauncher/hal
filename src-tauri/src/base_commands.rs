use tauri::Manager;

#[tauri::command]
pub fn close_loadingscreen(windows: tauri::Window) {
    if let Some(loadingscreen) = windows.get_window("loadingscreen") {
        loadingscreen.close().unwrap();
    }
    windows.get_window("main").unwrap().show().unwrap();
}

#[tauri::command]
pub fn exit(app: tauri::AppHandle, windows: tauri::Window) {
    windows.close().unwrap();
    app.exit(0);
}
