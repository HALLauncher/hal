use serde::Serialize;

use super::{FromFile, HashTarget};

#[derive(Debug, Clone, Serialize, jomini::JominiDeserialize)]
pub struct HoiDescriptor {
    pub version: Option<String>,
    pub archive: Option<String>,
    pub tags: Option<Vec<String>>,
    pub name: Option<String>,
    pub supported_version: Option<String>,
    pub path: Option<String>,
    pub remote_file_id: Option<String>,
}

pub enum DescriptorType {
    LauncherDescriptor,
    GameDescriptor,
}

trait DescriptorTyping {
    fn get_type(&self) -> DescriptorType;
}

impl HashTarget for HoiDescriptor {
    fn hash_target(&self) -> String {
        self.remote_file_id
            .clone()
            .or(self.name.clone())
            .or(self.path.clone())
            .or(self.archive.clone())
            .unwrap_or(format!(
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ btw this is not valid descriptor {}",
                std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_secs()
            ))
    }
}

impl DescriptorTyping for HoiDescriptor {
    fn get_type(&self) -> DescriptorType {
        match self.path {
            Some(..) => DescriptorType::LauncherDescriptor,
            None => DescriptorType::GameDescriptor,
        }
    }
}

impl FromFile<HoiDescriptor> for HoiDescriptor {
    fn from_file(path: &std::path::PathBuf) -> Result<HoiDescriptor, String> {
        let content = std::fs::read_to_string(path).expect("Could not read file");
        let Ok(descriptor) = jomini::TextDeserializer::from_utf8_slice(content.as_bytes()) else {
            return Err("Could not parse descriptor".into());
        };
        match descriptor.deserialize::<HoiDescriptor>() {
            Ok(descriptor) => Ok(descriptor),
            Err(_) => Err("Could not parse descriptor".into()),
        }
    }
}
