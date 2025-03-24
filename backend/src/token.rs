use chrono::{Utc, Duration};
use rocket::Config;
use rocket::http::Status;
use rocket::outcome::IntoOutcome;
use rocket::request::{Outcome, Request, FromRequest};
use rocket::serde::{Deserialize, Serialize};

use jsonwebtoken as jwt;
use jwt::errors::ErrorKind;

use crate::errors::Error;

#[derive(Debug, Deserialize, Serialize)]
pub struct Claims {
  pub id: i64,
  pub exp: i64,
}

#[derive(Debug)]
pub struct Token {
  pub claims: Claims,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for Token {
  type Error = Error;

  async fn from_request(req: &'r Request<'_>) -> Outcome<Self, Error> {
    req.headers()
      .get_one("authorization")
      .or_error((Status::Unauthorized, Error::TokenNotFound))
      .and_then(|value| match decode_token(value.to_string()) {
        Ok(claims) => Outcome::Success(Token { claims: claims }),
        Err(e) => match e.kind() {
          ErrorKind::ExpiredSignature => Outcome::Error((Status::Unauthorized, Error::TokenExpired)),
          _ => Outcome::Error((Status::Unauthorized, Error::TokenInvalid))
        }
      })
  }
}

pub fn create_token(id: i64) -> Result<String, jwt::errors::Error> {
  let secret: String = Config::figment().extract_inner("jwt.secret")
    .expect("Failed to get `jwt.secret` configuration. Make sure it is configured");

  _create_token_with_secret(id, secret.as_bytes())
}

fn _create_token_with_secret(id: i64, secret: &[u8]) -> Result<String, jwt::errors::Error> {
  let exp = Utc::now()
    .checked_add_signed(Duration::seconds(60))
    .expect("Failed to create token expiration date.")
    .timestamp();

  let claims = Claims {
    id: id,
    exp: exp,
  };

  let header = jwt::Header::default();
  let key = jwt::EncodingKey::from_secret(secret);
  
  jwt::encode(&header, &claims, &key)
}

pub fn decode_token(token: String) -> Result<Claims, jwt::errors::Error> {
  let secret: String = Config::figment().extract_inner("jwt.secret")
    .expect("Failed to get `jwt.secret` configuration. Make sure it is configured");

  let key = jwt::DecodingKey::from_secret(secret.as_bytes());
  let validation = jwt::Validation::default();

  jwt::decode::<Claims>(&token, &key, &validation)
    .map(|data| data.claims)
}

#[cfg(test)]
mod tests {
  use super::*;
  use chrono::Utc;
  
  #[test]
  fn test_create_token_success() {
    // Arrange
    let user_id = 42;

    // Act
    let token = create_token(user_id)
      .expect("Expected token creation to succeed");
    
    // Assert
    let claims = decode_token(token)
      .expect("Failed to decode token with valid secret");
    
    assert_eq!(claims.id, user_id);
    
    let now = Utc::now().timestamp();
    let delta = (claims.exp - (now + 60)).abs();

    assert!(delta <= 2, "Token expiration is not within the expected range (delta: {}).", delta);
  }

  #[test]
  fn test_decode_token_invalid_secret() {
    // Arrange
    let user_id = 42;
    let token = _create_token_with_secret(user_id, b"non-default-secret")
      .expect("Expected token creation to succeed");

    // Act
    let decode_result = decode_token(token);

    // Assert
    assert!(decode_result.is_err(), "Token decoding should fail with incorrect secret");
  }
}
