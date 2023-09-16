use std::path::PathBuf;

use tauri::Manager;

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
pub async fn sync_with_paradox(app: tauri::AppHandle) -> Result<(), String> {
    let Some(data_dir) = app.path_resolver().app_data_dir() else {
        return Err("Could not find data directory".to_string());
    };

    let launcher_mods_dir = data_dir.join("mods");
    if !launcher_mods_dir.exists() {
        std::fs::create_dir_all(&launcher_mods_dir).expect("Could not create mods directory");
    }

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
            let m = descriptor::Descriptor{
                archive: mod_.archive,
                path: mod_.path,
                name: mod_.name.unwrap(),
                version: mod_.version,
                supported_version: mod_.supported_version,
                remote_file_id: mod_.remote_file_id
            };

            let file_id = &m.remote_file_id;
            let name = &m.name;

            let filename = file_id.as_ref().unwrap_or(name);
            
            let path = launcher_mods_dir.join(format!("{}{}", filename, ".mod"));
            let _ = std::fs::write(path, serde_json::to_string(&m).unwrap());
        }
    }
    
    Ok(())
}


#[tauri::command]
async fn update_mods(
    state: tauri::State<'_, crate::launcher_state::LauncherState>,
) -> Result<(), String> {
    let _mods = state.mods.lock().unwrap();

    Ok(())
}
