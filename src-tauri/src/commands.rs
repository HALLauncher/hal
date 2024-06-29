use std::{
    collections::HashMap,
    fmt::format,
    path::{Path, PathBuf},
};

use crate::{
    launcher_state::LauncherInfo,
    models::{
        descriptor, hoidescriptor,
        modpack::{self, Modpack},
        FromFile, HashTarget,
    },
};

use serde_json::json;
use tauri_plugin_hal_steamworks::filesystem;

use sysinfo::System;
use uuid::Uuid;

#[tauri::command]
pub async fn get_mod(
    hash: String,
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
) -> Result<crate::models::descriptor::Descriptor, String> {
    let uuid = Uuid::parse_str(&hash).unwrap();

    let mods = state.mods.lock().await;
    match mods.get(&uuid) {
        Some(mod_) => Ok(mod_.clone()),
        None => Err("Mod not found".to_string()),
    }
}

#[tauri::command]
pub async fn get_mods_folder(app: tauri::AppHandle) -> Result<PathBuf, String> {
    filesystem::get_mods_folder(app).await
}

#[tauri::command]
pub async fn sync_with_paradox(
    app: tauri::AppHandle,
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
) -> Result<(), String> {
    let _ = update_mods(state.clone(), app.clone()).await;

    let Ok(launcher_mods_dir) = filesystem::get_mods_folder(app).await else {
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

    let files = mod_foler.read_dir().unwrap();

    for file in files {
        let file = file.unwrap();
        let path = file.path();

        if !path.is_file() || !path.extension().unwrap().to_str().unwrap().eq("mod") {
            continue;
        };

        if let Ok(mod_) = hoidescriptor::HoiDescriptor::from_file(&path) {
            info!("Found mod: {:?}", mod_);

            if mod_.name.is_none() || (mod_.archive.is_none() && mod_.path.is_none()) {
                warn!("Could not get name from mod {} more info: https://www.youtube.com/watch?v=PKyn_Msy9Bc", path.display());
                let _ = tokio::fs::remove_file(&path).await;
                continue;
            }

            if let Some(modpath) = &mod_.path {
                if !tokio::fs::try_exists(&modpath).await.unwrap_or(false) {
                    warn!("Mod descriptor has invalid path {} more info: https://www.youtube.com/watch?v=PKyn_Msy9Bc", modpath);
                    let _ = tokio::fs::remove_file(&path).await;
                    continue;
                }
            }

            if let Some(archive) = &mod_.archive {
                if !tokio::fs::try_exists(&archive).await.unwrap_or(false) {
                    warn!("Mod descriptor has invalid archive {} more info: https://www.youtube.com/watch?v=PKyn_Msy9Bc", archive);
                    let _ = tokio::fs::remove_file(&path).await;
                    continue;
                }
            }

            let mut m = descriptor::Descriptor {
                archive: mod_.archive,
                path: mod_.path,
                name: mod_.name.unwrap(),
                version: mod_.version,
                supported_version: mod_.supported_version,
                remote_file_id: mod_.remote_file_id,
                uuid: None,
            };

            m.uuid = Some(Uuid::new_v3(
                &Uuid::NAMESPACE_OID,
                m.hash_target().as_bytes(),
            ));

            if state.mods.lock().await.contains_key(&m.uuid.unwrap()) {
                continue;
            }

            let path = launcher_mods_dir.join(format!("{}{}", m.uuid.unwrap(), ".mod"));
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
            let Ok(folder) = filesystem::get_hoi_folder().await else {
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

    *state.info.lock().await = launcher_settings.clone();

    Ok(())
}

#[tauri::command]
pub async fn update_mods(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
    app: tauri::AppHandle,
) -> Result<(), String> {
    let Ok(launcher_mods_dir) = filesystem::get_mods_folder(app).await else {
        error!("Could not get mods folder");
        return Err("Could not get mods folder".to_string());
    };

    let files = launcher_mods_dir.read_dir().unwrap();

    for file in files {
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

        let tmp_m = m.clone();
        let path = tmp_m
            .path
            .unwrap_or(tmp_m.archive.unwrap_or("".to_string()));

        if tokio::fs::try_exists(path).await.is_err() {
            if tokio::fs::remove_file(file.path()).await.is_err() {
                warn!("Could not remove file {:?}", file.path().display());
            }
            continue;
        }

        state.mods.lock().await.insert(m.uuid.unwrap(), m);
    }

    Ok(())
}

#[tauri::command]
pub async fn update_modpacks(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
    app: tauri::AppHandle,
) -> Result<(), String> {
    let Ok(launcher_mods_dir) = filesystem::get_mods_folder(app).await else {
        error!("Could not get modpacks folder");
        return Err("Could not get modpacks folder".to_string());
    };

    let modpacks_dir = launcher_mods_dir.join("modpacks");
    if !modpacks_dir.exists() {
        std::fs::create_dir_all(&modpacks_dir).unwrap();
    }

    let files = modpacks_dir.read_dir().unwrap();
    for file in files {
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

        state.modpacks.lock().await.insert(m.uuid, m);
    }
    Ok(())
}

pub async fn apply_modpack(
    app: tauri::AppHandle,
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
    modpack: Uuid,
) -> Result<(), String> {
    let Some(modpack) = state.modpacks.lock().await.get(&modpack).cloned() else {
        return Err("Could not find modpack".to_string());
    };

    let Some(docs) = dirs_next::document_dir() else {
        error!("Could not find documents directory");
        return Err("Could not find documents directory".to_string());
    };

    let datafoler = docs.join("Paradox Interactive").join("Hearts of Iron IV");

    let dlcload = datafoler.join("dlc_load.json");
    if !dlcload.exists() || !dlcload.is_file() {
        error!("Could not find dlc_load.json");
        tokio::fs::write(&dlcload, "{}").await.unwrap();
    }

    let cachedir = app.path_resolver().app_cache_dir().unwrap();
    let target_dir = cachedir.join("tmp_modpaks").join(modpack.uuid.to_string());

    let statemods = state.mods.lock().await;

    let mods = modpack
        .mods
        .iter()
        .map(|x| statemods.get(x).unwrap().clone())
        .collect::<Vec<_>>();

    let mut tmpmods: Vec<String> = Vec::new();

    for mod_ in mods.iter() {
        let gamedata = mod_.to_serialized_game_descriptor();
        let path = target_dir.join(format!("ugc_{}.mod", mod_.uuid.unwrap()));
        if !path.exists() {
            std::fs::create_dir_all(&target_dir).unwrap();
        }

        info!("Writing mod {} to {}", mod_.name, path.display());

        tokio::fs::write(&path, gamedata).await.unwrap();

        tmpmods.push(path.display().to_string().replace("\\", "/"));
    }

    let output = json!({
        "enabled_mods": tmpmods,
        "disabled_dlcs": []
    });

    tokio::fs::write(&dlcload, serde_json::to_string(&output).unwrap())
        .await
        .unwrap();

    Ok(())
}

#[tauri::command]
pub async fn start_game(
    app: tauri::AppHandle,
    options: Vec<String>,
    modpack: Option<Uuid>,
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
) -> Result<(), String> {
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
        Some(steamapp) => {
            if let Some(modpack) = modpack {
                apply_modpack(app, state, modpack).await?;
            }
            filesystem::start_game(&steamapp.path, options).await
        }
        None => {
            let Ok(folder) = filesystem::get_hoi_folder().await else {
                error!("Could not find hoi directory");
                return Err("Could not find hoi directory".to_string());
            };

            if let Some(modpack) = modpack {
                apply_modpack(app, state, modpack).await?;
            }

            filesystem::start_game(&folder, options).await
        }
    }
}

#[tauri::command]
pub async fn get_launcher_info(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
) -> Result<LauncherInfo, String> {
    Ok(state.info.lock().await.clone())
}

#[tauri::command]
pub async fn get_mods(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
) -> Result<Vec<descriptor::Descriptor>, String> {
    Ok(state
        .mods
        .lock()
        .await
        .values()
        .map(|x| x.clone())
        .collect::<Vec<_>>())
}

#[tauri::command]
pub async fn get_modpacks(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
) -> Result<Vec<Uuid>, String> {
    Ok(state
        .modpacks
        .lock()
        .await
        .keys()
        .cloned()
        .collect::<Vec<_>>())
}

#[tauri::command]
pub async fn create_modpack(
    app: tauri::AppHandle,
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
    name: String,
    mods: Vec<Uuid>,
) -> Result<Uuid, String> {
    for mod_ in &mods {
        if !state.mods.lock().await.contains_key(mod_) {
            warn!("Mod {} not found", mod_);
            return Err(format!("Mod not found {}", mod_));
        }
    }

    let uuid = Uuid::new_v4();
    let modpack = Modpack { name, mods, uuid };

    let mut modpacks = state.modpacks.lock().await;
    modpacks.insert(uuid, modpack.clone());

    let Ok(launcher_mods_dir) = filesystem::get_mods_folder(app).await else {
        error!("Could not get modpacks folder");
        return Err("Could not get modpacks folder".to_string());
    };

    let modpacks_dir = launcher_mods_dir.join("modpacks");
    if !modpacks_dir.exists() {
        std::fs::create_dir_all(&modpacks_dir).unwrap();
    }

    let path = modpacks_dir.join(format!("{}.mod", uuid));
    tokio::fs::write(&path, serde_json::to_string(&modpack).unwrap()).await.unwrap();

    Ok(uuid)
}

#[tauri::command]
pub async fn get_modpack(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
    uuid: Uuid,
) -> Result<Modpack, String> {
    let modpacks = state.modpacks.lock().await;

    let Some(modpack) = modpacks.get(&uuid).clone() else {
        error!("Modpack not found");
        return Err("Modpack not found".to_string());
    };
    Ok(modpack.clone())
}
