use serde::{Deserialize, Serialize};

use super::{
    descriptor::{Descriptor, ShareableDescriptor},
    FromFile, ToShareable,
};

#[derive(Debug, Deserialize, Serialize, PartialEq, Eq, Clone)]
pub struct Modpack {
    pub name: String,
    pub mods: Vec<Descriptor>,
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

impl ToShareable<ShareableModpack> for Modpack {
    fn to_shareable(&self) -> ShareableModpack {
        ShareableModpack {
            name: self.name.clone(),
            mods: self.mods.iter().map(|x| x.to_shareable()).collect(),
        }
    }
}
