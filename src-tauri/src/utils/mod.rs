use std::path::PathBuf;

pub async fn get_mods_folder(app: tauri::AppHandle) -> Result<PathBuf, String> {
    let Some(data_dir) = app.path_resolver().app_data_dir() else {
        return Err("Could not find data directory".to_string());
    };

    let launcher_mods_dir = data_dir.join("mods");
    if !launcher_mods_dir.exists() {
        if std::fs::create_dir_all(&launcher_mods_dir).is_err() {
            return Err("Could not create mods directory".to_string());
        }
    }

    Ok(launcher_mods_dir)
}

pub async fn get_hoi_folder() -> Result<PathBuf, String> {
    let Some(mut steam_dir) = steamlocate::SteamDir::locate() else {
        return Err("Could not find steam directory".to_string());
    };

    let libraryfolders = steam_dir.libraryfolders();
    for libraryfolder in &libraryfolders.paths {
        let appmanifest_path = libraryfolder.join(format!("appmanifest_{}.acf", 394360));
        if appmanifest_path.is_file() {
            let content = tokio::fs::read_to_string(&appmanifest_path).await.unwrap();
            let Some(cps) = regex::Regex::new(r#"installdir"\s+"(.+?)"\n?"#)
                .unwrap()
                .captures_iter(&content)
                .next()
            else {
                return Err("Could not find installdir".to_string());
            };

            let p = cps.get(1).unwrap().as_str();

            let path = libraryfolder.join("common").join(p);
            if !path.is_dir() {
                return Err("Could not find hoi directory".to_string());
            };

            return Ok(path);
        }
    }
    Err("Could not find hoi directory".to_string())
}

pub async fn start_game(path: &PathBuf, options: Vec<String>) -> Result<(), String> {
    let game = path.join("hoi4.exe");
    if !game.is_file() {
        return Err("Could not find game".to_string());
    };

    tokio::process::Command::new(game)
        .args(options)
        .spawn()
        .map_err(|_| "Could not start game".to_string())
        .map(|_| ())
}
