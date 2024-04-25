use std::path::PathBuf;

use crate::{
    launcher_state::LauncherInfo,
    models::{descriptor, hoidescriptor, modpack::Modpack, FromFile},
};
use sysinfo::System;

#[tauri::command]
pub fn get_mod(
    modname: &str,
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
) -> Result<crate::models::descriptor::Descriptor, String> {
    let mods = state.mods.lock().unwrap();
    match mods.iter().find(|x| x.name == modname) {
        Some(mod_) => return Ok(mod_.clone()),
        None => return Err("Mod not found".to_string()),
    }
}

#[tauri::command]
pub async fn get_mods_folder(app: tauri::AppHandle) -> Result<PathBuf, String> {
    crate::utils::get_mods_folder(app).await
}

#[tauri::command]
pub async fn sync_with_paradox(
    app: tauri::AppHandle,
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
) -> Result<(), String> {
    let Ok(launcher_mods_dir) = crate::utils::get_mods_folder(app).await else {
        error!("Could not get mods folder");
        return Err("Could not get mods folder".to_string());
    };

    let Some(docs) = dirs_next::document_dir() else {
        error!("Could not find documents directory");
        return Err("Could not find documents directory".to_string());
    };

    let mod_foler = docs
        .join("Paradox Interactive")
        .join("Hearts of Iron IV")
        .join("mod");
    if !mod_foler.exists() || !mod_foler.is_dir() {
        error!("Could not find mod directory");
        return Err("Could not find mod directory".to_string());
    };

    let mut files = mod_foler.read_dir().unwrap();

    while let Some(file) = files.next() {
        let file = file.unwrap();
        let path = file.path();

        if !path.is_file() || !path.extension().unwrap().to_str().unwrap().eq("mod") {
            continue;
        };

        if let Ok(mod_) = hoidescriptor::HoiDescriptor::from_file(&path) {
            let m = descriptor::Descriptor {
                archive: mod_.archive,
                path: mod_.path,
                name: mod_.name.unwrap(),
                version: mod_.version,
                supported_version: mod_.supported_version,
                remote_file_id: mod_.remote_file_id,
            };

            let file_id = &m.remote_file_id;
            let name = &m.name;

            let filename = file_id.as_ref().unwrap_or(name);

            let path = launcher_mods_dir.join(format!("{}{}", filename, ".mod"));
            tokio::fs::write(&path, serde_json::to_string(&m).unwrap())
                .await
                .map_err(|_| {
                    error!("Could not write file {}", path.display());
                    "Could not write file".to_string()
                })?;
        }
    }

    let Some(mut steam_dir) = steamlocate::SteamDir::locate() else {
        error!("Could not find steam directory");
        return Err("Could not find steam directory".to_string());
    };

    let laucner_settings_file = match steam_dir.app(&394360) {
        Some(app) => app.path.join("launcher-settings.json"),
        None => {
            let Ok(folder) = crate::utils::get_hoi_folder().await else {
                error!("Could not find hoi directory");
                return Err("Could not find hoi directory".to_string());
            };
            folder.join("launcher-settings.json")
        }
    };

    if !laucner_settings_file.exists() || !laucner_settings_file.is_file() {
        error!("Could not find launcher-settings.json");
        return Err("Could not find launcher-settings.json".to_string());
    }

    let Ok(content) = tokio::fs::read_to_string(&laucner_settings_file).await else {
        error!("Could not read launcher-settings.json");
        return Err("Could not read launcher-settings.json".to_string());
    };

    let Ok(launcher_settings) = serde_json::from_str::<LauncherInfo>(&content) else {
        error!("Could not parse launcher-settings.json");
        return Err("Could not parse launcher-settings.json".to_string());
    };

    state
        .info
        .lock()
        .and_then(|mut x| {
            *x = launcher_settings.clone();
            Ok(())
        })
        .map_err(|_| "Could not write launcher-settings.json".to_string())
}

#[tauri::command]
pub async fn update_mods(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
    app: tauri::AppHandle,
) -> Result<(), String> {
    let Ok(launcher_mods_dir) = crate::utils::get_mods_folder(app).await else {
        error!("Could not get mods folder");
        return Err("Could not get mods folder".to_string());
    };

    let mut files = launcher_mods_dir.read_dir().unwrap();

    while let Some(file) = files.next() {
        let Ok(file) = file else {
            continue;
        };

        let path = file.path();

        if !path.is_file() || !path.extension().unwrap().to_str().unwrap().eq("mod") {
            continue;
        }

        let Ok(content) = tokio::fs::read_to_string(&path).await else {
            warn!("Could not read file {}", path.display());
            continue;
        };

        let Ok(m) = serde_json::from_str::<descriptor::Descriptor>(&content) else {
            warn!("Could not parse file {}", path.display());
            continue;
        };

        if let Ok(mods) = state.mods.lock().as_mut() {
            if !mods.contains(&m) {
                mods.push(m);
            }
        }
    }

    Ok(())
}

#[tauri::command]
pub async fn update_modpacks(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
    app: tauri::AppHandle,
) -> Result<(), String> {
    let Ok(launcher_mods_dir) = crate::utils::get_mods_folder(app).await else {
        error!("Could not get modpacks folder");
        return Err("Could not get modpacks folder".to_string());
    };

    let modpacks_dir = launcher_mods_dir.join("modpaks");
    if !modpacks_dir.exists() {
        std::fs::create_dir_all(&modpacks_dir).unwrap();
    }

    let mut files = modpacks_dir.read_dir().unwrap();
    while let Some(file) = files.next() {
        let Ok(file) = file else {
            continue;
        };

        let path = file.path();

        if !path.is_file() || !path.extension().unwrap().to_str().unwrap().eq("mod") {
            continue;
        }

        let Ok(content) = tokio::fs::read_to_string(&path).await else {
            warn!("Could not read file {}", path.display());
            continue;
        };

        let Ok(m) = serde_json::from_str::<Modpack>(&content) else {
            warn!("Could not parse file {}", path.display());
            continue;
        };

        if let Ok(modpacks) = state.modpacks.lock().as_mut() {
            if !modpacks.contains(&m) {
                modpacks.push(m);
            }
        }
    }
    Ok(())
}

#[tauri::command]
pub async fn start_game(options: Vec<String>) -> Result<(), String> {
    let mut s = System::new_all();
    s.refresh_all();

    if let Some(process) = s.processes_by_name("hoi4").next() {
        info!(
            "Game is already running {} {}",
            process.pid(),
            process.name()
        );
        return Ok(());
    }

    info!("Starting game with options: {:?}", options);
    let Some(mut steam_dir) = steamlocate::SteamDir::locate() else {
        error!("Could not find steam directory");
        return Err("Could not find steam directory".to_string());
    };

    match steam_dir.app(&394360) {
        Some(app) => crate::utils::start_game(&app.path, options).await,
        None => {
            let Ok(folder) = crate::utils::get_hoi_folder().await else {
                error!("Could not find hoi directory");
                return Err("Could not find hoi directory".to_string());
            };
            crate::utils::start_game(&folder, options).await
        }
    }
}

#[tauri::command]
pub async fn get_launcher_info(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
) -> Result<LauncherInfo, String> {
    state
        .info
        .lock()
        .and_then(|x| Ok(x.clone()))
        .map_err(|_| "Could not get launcher info".to_string())
}
