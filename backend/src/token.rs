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

impl Token {
  fn _create_with_secret(id: i64, duration: i64, secret: &[u8]) -> Result<String, Error> {
    let exp = Utc::now()
      .checked_add_signed(Duration::seconds(duration))
      .expect("Failed to create token expiration date.")
      .timestamp();

    let claims = Claims {
      id: id,
      exp: exp,
    };

    let header = jwt::Header::default();
    let key = jwt::EncodingKey::from_secret(secret);
    
    jwt::encode(&header, &claims, &key)
      .map_err(|_| Error::Internal("Failed to encode JWT token.".to_string()))
  }

  pub fn create(id: i64) -> Result<String, Error> {
    let duration: i64 = Config::figment().extract_inner("jwt.duration_seconds")
      .expect("Failed to get \"jwt.duration_seconds\" configuration. Make sure it is configured");
    let secret: String = Config::figment().extract_inner("jwt.secret")
      .expect("Failed to get \"jwt.secret\" configuration. Make sure it is configured");

    Token::_create_with_secret(id, duration, secret.as_bytes())
  }

  pub fn decode(token: String) -> Result<Token, Error> {
    let secret: String = Config::figment().extract_inner("jwt.secret")
      .expect("Failed to get \"jwt.secret\" configuration. Make sure it is configured");

    let key = jwt::DecodingKey::from_secret(secret.as_bytes());
    let validation = jwt::Validation::default();

    jwt::decode::<Claims>(&token, &key, &validation)
      .map_err(|e| match e.kind() {
        ErrorKind::ExpiredSignature => Error::TokenExpired,
        _ => Error::TokenInvalid,
      })
      .map(|data| Token { claims: data.claims })
  }
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for Token {
  type Error = Error;

  async fn from_request(req: &'r Request<'_>) -> Outcome<Self, Error> {
    req.headers()
      .get_one("authorization")
      .or_error((Status::Unauthorized, Error::TokenNotFound))
      .and_then(|value| match Token::decode(value.to_string()) {
        Ok(token) => Outcome::Success(token),
        Err(e) => Outcome::Error((Status::Unauthorized, e)),
      })
  }
}

#[cfg(test)]
mod tests {
  use super::*;
  use chrono::Utc;
  
  #[test]
  fn test_create_token_success() {
    // Arrange
    let user_id = 42;
    let duration: i64 = Config::figment().extract_inner("jwt.duration_seconds")
      .expect("Failed to get \"jwt.duration_seconds\" configuration. Make sure it is configured");

    // Act
    let token = Token::create(user_id)
      .expect("Expected token creation to succeed");
    
    // Assert
    let token = Token::decode(token)
      .expect("Failed to decode token with valid secret");
    
    assert_eq!(token.claims.id, user_id);
    
    let now = Utc::now().timestamp();
    let delta = (token.claims.exp - (now + duration)).abs();

    assert!(delta <= 2, "Token expiration is not within the expected range (delta: {}).", delta);
  }

  #[test]
  fn test_decode_token_invalid_secret() {
    // Arrange
    let user_id = 42;
    let token = Token::_create_with_secret(user_id, 600, b"non-default-secret")
      .expect("Expected token creation to succeed");

    // Act
    let decode_result = Token::decode(token);

    // Assert
    assert!(decode_result.is_err(), "Token decoding should fail with incorrect secret");
  }
}
