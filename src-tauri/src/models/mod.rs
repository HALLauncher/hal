#![allow(dead_code)]

pub trait FromFile<T> {
    fn from_file(path: &std::path::PathBuf) -> Result<T, String>;
}

pub trait ToShareable<T> {
    fn to_shareable(&self) -> T;
}

pub trait HashTarget {
    fn hash_target(&self) -> String;
}

pub mod descriptor;
pub mod hoidescriptor;
pub mod modpack;
