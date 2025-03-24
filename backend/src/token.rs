use chrono::{Utc, Duration};
use rocket::Config;
use rocket::serde::{Deserialize, Serialize};
use jsonwebtoken as jwt;

#[derive(Debug, Deserialize, Serialize)]
pub struct Claims {
  pub id: i64,
  pub exp: i64,
}

pub fn create_token(id: i64) -> Result<String, jwt::errors::Error> {
  let secret: String = Config::figment().extract_inner("jwt.secret")
    .expect("Failed to get `jwt.secret` configuration. Make sure it is configured");

  create_token_with_secret(id, secret.as_bytes())
}

fn create_token_with_secret(id: i64, secret: &[u8]) -> Result<String, jwt::errors::Error> {
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
    let token = create_token_with_secret(user_id, b"non-default-secret")
      .expect("Expected token creation to succeed");

    // Act
    let decode_result = decode_token(token);

    // Assert
    assert!(decode_result.is_err(), "Token decoding should fail with incorrect secret");
  }
}
