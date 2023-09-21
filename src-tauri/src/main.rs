#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

const LOG_TARGETS: [tauri_plugin_log::LogTarget; 3] = [tauri_plugin_log::LogTarget::Stdout, tauri_plugin_log::LogTarget::Webview, tauri_plugin_log::LogTarget::LogDir];

#[macro_use] extern crate log;

mod commands;
mod launcher_state;
mod models;
mod utils;

fn main() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::default()
            .targets(LOG_TARGETS)
            .with_colors(tauri_plugin_log::fern::colors::ColoredLevelConfig::default())
            .build()
        )
        .on_window_event(|e| {
            if let tauri::WindowEvent::Resized(_) = e.event() {
                std::thread::sleep(std::time::Duration::from_nanos(1));
            }
        })
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
