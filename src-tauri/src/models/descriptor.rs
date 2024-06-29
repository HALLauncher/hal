
use uuid::Uuid;

use super::{HashTarget, ToShareable};

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Default)]
pub struct Descriptor {
    pub path: Option<String>,
    pub archive: Option<String>,
    pub name: String,
    pub version: Option<String>,
    pub supported_version: Option<String>,
    pub remote_file_id: Option<String>,
    pub uuid: Option<Uuid>,
}

impl PartialEq for Descriptor {
    fn eq(&self, other: &Self) -> bool {
        self.uuid == other.uuid
    }
}

pub struct ShareableDescriptor {
    pub name: String,
    pub remote_file_id: String,
}

impl HashTarget for Descriptor {
    fn hash_target(&self) -> String {
        self.remote_file_id
            .clone()
            .or(self.path.clone())
            .or(self.archive.clone())
            .unwrap_or(self.name.clone())
    }
}

impl Descriptor {
    pub fn to_serialized_game_descriptor(&self) -> String {
        let mut buffer: Vec<u8> = Vec::new();
        let mut writer = jomini::TextWriterBuilder::new().from_writer(&mut buffer);
        if let Some(version) = &self.version {
            writer.write_unquoted(b"version").unwrap();
            writer
                .write_quoted(version.clone().as_bytes())
                .unwrap();
        }
        writer.write_unquoted(b"name").unwrap();
        writer.write_quoted(self.name.clone().as_bytes()).unwrap();
        writer.write_unquoted(b"supported_version").unwrap();
        writer
            .write_quoted(self.supported_version.clone().unwrap().as_bytes())
            .unwrap();
        writer.write_unquoted(b"path").unwrap();
        writer
            .write_quoted(self.path.clone().unwrap().as_bytes())
            .unwrap();
        String::from_utf8(buffer).unwrap()
    }
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
            remote_file_id: self.remote_file_id.clone().unwrap(),
        }
    }
}
