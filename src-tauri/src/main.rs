// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

mod base_commands;
mod loading;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            base_commands::close_loadingscreen,
            base_commands::exit
        ])
        .setup(|app| {
            let loading_window = app.get_window("loadingscreen").unwrap();
            let main_window = app.get_window("main").unwrap();

            tauri::async_runtime::spawn(async move {
                loop {
                    loading_window
                        .emit(
                            "setLoadingStatus",
                            loading::SetLoadingStatusPayload {
                                first_status: Some(chrono::Utc::now().to_string()),
                                second_status: None,
                                command_on_click: None,
                            },
                        )
                        .unwrap();

                    //std::thread::sleep(std::time::Duration::from_secs(1));
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
