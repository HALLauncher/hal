#[derive(Default)]
pub struct LauncherState {
    pub mods: std::sync::Mutex<Vec<crate::models::descriptor::Descriptor>>,
}