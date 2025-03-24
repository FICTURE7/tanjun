use std::io::{Cursor};

use rocket::{Config};
use rocket::{Request};
use rocket::response::{Responder, Response, Result};
use rocket::http::{Status, ContentType};
use rocket::serde::json::{json};

use validator::{Validate, ValidationErrors};

#[derive(PartialEq, Debug)]
pub enum Error {
  #[allow(dead_code)]
  NotImplemented,
  Internal(String),
  Database(String),

  Validation(ValidationErrors),

  TokenNotFound,
  TokenInvalid,
  TokenExpired,

  UserAccessForbidden,
  UserAlreadyExists,
  UserLoginNotFound,
  UserLoginInvalid,
}

impl std::fmt::Display for Error {
  fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
    match self {
      Error::NotImplemented => write!(f, "Not implemented"),
      Error::Internal(e) => write!(f, "Internal error: {}", e),
      Error::Database(e) => write!(f, "Database error: {}", e),

      // TODO: Properly format the error message based on the errors in `e`.
      Error::Validation(e) => write!(f, "Validation error: {}", e),

      Error::TokenNotFound => write!(f, "Token not found in request"),
      Error::TokenInvalid => write!(f, "Token is invalid"),
      Error::TokenExpired => write!(f, "Token is expired"),

      Error::UserAccessForbidden => write!(f, "User not allowed to perform action"),
      Error::UserAlreadyExists => write!(f, "User already already exist"),
      Error::UserLoginNotFound => write!(f, "User not found"),
      Error::UserLoginInvalid => write!(f, "User login credentials invalid"),
    }
  }
}

impl std::error::Error for Error {}

impl<'r> Responder<'r, 'static> for Error {
  fn respond_to(self, _: &Request) -> Result<'static> {
    let is_release = Config::figment().profile() == "release";
    let message = match self {
      // Avoid internal messages.
      Error::NotImplemented |
      Error::Database(_) |
      Error::Internal(_) if is_release => "Internal error".to_string(),

      // Avoid user enumeration.
      Error::UserLoginNotFound |
      Error::UserLoginInvalid if is_release => "Username or password invalid".to_string(),

      _ => self.to_string()
    };

    let json = json!({ "error": message });
    let body = json.to_string();

    let status = match self {
      Error::Validation(_) => Status::UnprocessableEntity,

      Error::TokenNotFound => Status::Unauthorized,
      Error::TokenInvalid => Status::Unauthorized,
      Error::TokenExpired => Status::Unauthorized,

      Error::UserAccessForbidden => Status::Forbidden,
      Error::UserAlreadyExists => Status::Conflict,
      Error::UserLoginNotFound => Status::Unauthorized,
      Error::UserLoginInvalid => Status::Unauthorized,

      _ => Status::InternalServerError
    };

    Response::build()
      .header(ContentType::JSON)
      .status(status)
      .sized_body(body.len(), Cursor::new(body))
      .ok()
  }
}

pub struct Validation;

impl Validation {
  pub fn validate<T: Validate>(input: &T) -> std::result::Result<(), Error> {
    input.validate().map_err(|e| Error::Validation(e))
  }
}
