#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Default, PartialEq, Eq)]
pub struct Descriptor {
    pub path: Option<String>,
    pub archive: Option<String>,
    pub name: String,
    pub version: Option<String>,
    pub supported_version: Option<String>,
    pub remote_file_id: Option<String>,
}

pub trait IsRemote {
    fn is_remote(&self) -> bool;
}

impl IsRemote for Descriptor {
    fn is_remote(&self) -> bool {
        self.remote_file_id.is_some()
    }
}
