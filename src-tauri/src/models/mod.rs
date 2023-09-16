pub trait FromFile<T> {
    fn from_file(path: &std::path::PathBuf) -> Result<T, String>;
}

pub mod descriptor;
pub mod hoidescriptor;
