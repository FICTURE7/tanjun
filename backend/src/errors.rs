use std::io::Cursor;
use rocket::Request;
use rocket::response::{Responder, Response, Result};
use rocket::http::Status;
use rocket::serde::json::json;

#[allow(dead_code)]
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

impl<'r> Responder<'r, 'static> for Error {
  fn respond_to(self, _: &Request) -> Result<'static> {
    // TODO: Provide useful information in debug mode.
    let json = json!({ "error": self.to_string() });
    let body = json.to_string();

    Response::build()
      .status(Status::InternalServerError)
      .sized_body(body.len(), Cursor::new(body))
      .ok()
  }
}
