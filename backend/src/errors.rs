#[derive(Debug)]
pub enum Error {
  NotImplemented,
  DatabaseError(String),
}

impl std::fmt::Display for Error {
  fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
    match self {
      Error::NotImplemented => write!(f, "Not implemented"),
      Error::DatabaseError(e) => write!(f, "Database error: {}", e),
    }
  }
}

impl std::error::Error for Error {}
