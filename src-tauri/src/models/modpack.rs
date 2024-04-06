use serde::{Serialize, Deserialize};

use super::descriptor::Descriptor;

pub struct Modpack {
    pub name: String,
    pub mods: Vec<Descriptor>,
}