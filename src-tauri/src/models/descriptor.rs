use super::ToShareable;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Default, PartialEq, Eq)]
pub struct Descriptor {
    pub path: Option<String>,
    pub archive: Option<String>,
    pub name: String,
    pub version: Option<String>,
    pub supported_version: Option<String>,
    pub remote_file_id: Option<String>,
}

pub struct ShareableDescriptor {
    pub name: String,
    pub version: String,
    pub supported_version: String,
    pub remote_file_id: String,
}

pub trait IsRemote {
    fn is_remote(&self) -> bool;
}

impl IsRemote for Descriptor {
    fn is_remote(&self) -> bool {
        self.remote_file_id.is_some()
    }
}

impl ToShareable<ShareableDescriptor> for Descriptor {
    fn to_shareable(&self) -> ShareableDescriptor {
        ShareableDescriptor {
            name: self.name.clone(),
            version: self.version.clone().unwrap_or("".to_string()),
            supported_version: self
                .supported_version
                .clone()
                .unwrap_or("".to_string()),
            remote_file_id: self
                .remote_file_id
                .clone()
                .unwrap_or("".to_string()),
        }
    }
}