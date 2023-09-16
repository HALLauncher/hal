#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
mod launcher_state;
mod models;
mod utils;

fn main() {
    tauri::Builder::default()
        .manage(launcher_state::LauncherState::default())
        .invoke_handler(tauri::generate_handler![
            commands::get_mod,
            commands::sync_with_paradox,
            commands::update_mods,
            commands::get_mods_folder,
            commands::start_game
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
