use std::path::PathBuf;

use crate::models::{descriptor, hoidescriptor, FromFile};

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
pub async fn sync_with_paradox(app: tauri::AppHandle) -> Result<(), String> {
    let Ok(launcher_mods_dir) = crate::utils::get_mods_folder(app).await else {
        return Err("Could not get mods folder".to_string());
    };

    let Some(docs) = dirs_next::document_dir() else {
        return Err("Could not find documents directory".to_string());
    };

    let mod_foler = docs
        .join("Paradox Interactive")
        .join("Hearts of Iron IV")
        .join("mod");
    if !mod_foler.exists() || !mod_foler.is_dir() {
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
            return tokio::fs::write(&path, serde_json::to_string(&m).unwrap())
                .await
                .map_err(|_| {
                    info!("Could not write file {}", path.display());
                    "Could not write file".to_string()
                });
        }
    }

    Ok(())
}

#[tauri::command]
pub async fn update_mods(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
    app: tauri::AppHandle,
) -> Result<(), String> {
    let Ok(launcher_mods_dir) = crate::utils::get_mods_folder(app).await else {
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

        let Ok(content) = tokio::fs::read_to_string(path).await else {
            continue;
        };

        let Ok(m) = serde_json::from_str::<descriptor::Descriptor>(&content) else {
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
pub async fn start_game(options: Vec<String>) -> Result<(), String> {
    info!("Starting game with options: {:?}", options);
    let Some(mut steam_dir) = steamlocate::SteamDir::locate() else {
        return Err("Could not find steam directory".to_string());
    };

    match steam_dir.app(&394360) {
        Some(app) => {
            crate::utils::start_game(&app.path, options).await
        }
        None => {
            let Ok(folder) = crate::utils::get_hoi_foler().await else {
                return Err("Could not find hoi directory".to_string());
            };
            crate::utils::start_game(&folder, options).await
        },
    }
}
