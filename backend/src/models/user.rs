use rocket::serde::{Serialize, Deserialize};
use validator::{Validate, ValidationError};

#[derive(Debug, Serialize)]
pub struct User {
  pub id: i64,
  pub username: String,
}

#[derive(Debug, Validate, Deserialize)]
pub struct RegisterUser {
  #[validate(custom(
    function="validate_username",
    message="must be between 1 and 32 characters long and contain only alphanumeric characters and underscore (_)"))]
  pub username: String,
  #[validate(custom(
    function="validate_password",
    message="must be between 8 and 32 characters long, contain an uppercase character, a lowercase character, a digit and a special character ('@', '$', '!', '%', '*', '?', '&')"))]
  pub password: String,
}

#[derive(Debug, Validate, Deserialize)]
pub struct LoginUser {
  pub username: String,
  pub password: String,
}

#[derive(Debug, Serialize)]
pub struct AuthUser {
  pub user: User,
  pub token: String,
}

fn validate_username(username: &String) -> Result<(), ValidationError> {
  let valid_length = username.len() >= 1 && username.len() <= 32;
  let valid_chars  = username.chars().all(|c| c.is_alphanumeric() || c == '_');
  
  if valid_length && valid_chars {
    Ok(())
  } else {
    Err(ValidationError::new("Username must be between 1 and 32 characters long and contain only alphanumeric characters and underscore (_)"))
  }
}

fn validate_password(password: &String) -> Result<(), ValidationError> {
  let mut has_uppercase = false;
  let mut has_lowercase = false;
  let mut has_digit = false;
  let mut has_special = false;
  
  let valid_length = password.len() >= 8 && password.len() <= 32;
  
  for c in password.chars() {
    if c.is_uppercase() {
      has_uppercase = true;
    } else if c.is_lowercase() {
      has_lowercase = true;
    } else if c.is_digit(10) {
      has_digit = true;
    } else if r"@$!%*?&".contains(c) {
      has_special = true;
    }
    
    if has_uppercase && has_lowercase && has_digit && has_special {
      break;
    }
  }
  
  if valid_length && has_uppercase && has_lowercase && has_digit && has_special {
    Ok(())
  } else {
    Err(ValidationError::new("Password must be between 8 and 32 characters long, contain an uppercase character, a lowercase character, a digit and a special character ('@', '$', '!', '%', '*', '?', '&')"))
  }
}

#[cfg(test)]
mod tests {
  use super::*;
  
  // validate_password tests
  
  #[test]
  fn test_valid_password() {
    // Valid password: At least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character.
    let password = "Abcdef1@".to_string();
    assert!(validate_password(&password).is_ok());
  }
  
  #[test]
  fn test_password_too_short() {
    // Too short (<8 characters)
    let password = "Ab1@".to_string();
    assert!(validate_password(&password).is_err());
  }
  
  #[test]
  fn test_missing_uppercase() {
    // No uppercase character present
    let password = "abcdef1@".to_string();
    assert!(validate_password(&password).is_err());
  }
  
  #[test]
  fn test_missing_lowercase() {
    // No lowercase character present
    let password = "ABCDEF1@".to_string();
    assert!(validate_password(&password).is_err());
  }
  
  #[test]
  fn test_missing_digit() {
    // No digit present
    let password = "Abcdefg@".to_string();
    assert!(validate_password(&password).is_err());
  }
  
  #[test]
  fn test_missing_special() {
    // No special character present
    let password = "Abcdef11".to_string();
    assert!(validate_password(&password).is_err());
  }
  
  #[test]
  fn test_password_too_long() {
    // Exceeds 32 characters
    let password = "Aabcdef1@Aabcdef1@ABCAabcdef1@Aaj".to_string(); // 33 characters
    assert!(validate_password(&password).is_err());
  }
  
  // validate_username tests

  #[test]
  fn test_valid_username() {
    // At least one character and only alphanumeric characters.
    let username = "User123".to_string();
    assert!(validate_username(&username).is_ok());
  }

  #[test]
  fn test_valid_underscore_username() {
    // At least one character, only alphanumeric characters and underscore.
    let username = "_User123".to_string();
    assert!(validate_username(&username).is_ok());
  }
  
  #[test]
  fn test_empty_username() {
    // Username is empty.
    let username = "".to_string();
    assert!(validate_username(&username).is_err());
  }

  #[test]
  fn test_username_too_long() {
    // Exceeds 32 characters.
    let username = "Aabcdef1_Aabcdef1_ABCAabcdef1_Aaj".to_string();
    assert!(validate_username(&username).is_err());
  }
  
  #[test]
  fn test_username_with_special_chars() {
    // Username contains non-alphanumeric characters.
    let username = "User!23".to_string();
    assert!(validate_username(&username).is_err());
  }
  
  #[test]
  fn test_username_with_space() {
    // Username contains a space.
    let username = "User 123".to_string();
    assert!(validate_username(&username).is_err());
  }
}
