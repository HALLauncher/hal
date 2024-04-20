#[derive(Default)]
pub struct LauncherState {
    pub mods: std::sync::Mutex<Vec<crate::models::descriptor::Descriptor>>,
    pub modpacks: std::sync::Mutex<Vec<crate::models::modpack::Modpack>>,
}
