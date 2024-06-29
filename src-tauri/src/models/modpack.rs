use serde::{Deserialize, Serialize};
use uuid::Uuid;

use super::{
    descriptor::ShareableDescriptor,
    FromFile,
};

#[derive(Debug, Deserialize, Serialize, PartialEq, Clone)]
pub struct Modpack {
    pub name: String,
    pub mods: Vec<Uuid>,
    pub uuid: Uuid,
}

pub struct ShareableModpack {
    pub name: String,
    pub mods: Vec<ShareableDescriptor>,
}

impl FromFile<Modpack> for Modpack {
    fn from_file(path: &std::path::PathBuf) -> Result<Modpack, String> {
        let content = std::fs::read_to_string(path).map_err(|_| "Could not read file")?;
        let modpack = serde_json::from_str(&content).map_err(|_| "Could not parse file")?;
        Ok(modpack)
    }
}