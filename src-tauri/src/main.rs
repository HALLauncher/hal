#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let loading_window = app.get_window("loader").unwrap();
      //let main_window = app.get_window("main").unwrap();

      tauri::async_runtime::spawn(async move {
        loop {
          loading_window.emit("set_status", "Loading my dick in your mother...").unwrap();
          tokio::time::sleep(std::time::Duration::from_secs(1)).await;
        }

        //loading_window.hide().unwrap();
        //main_window.show().unwrap();
      });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
