use crate::hash;
use crate::sqlx::{self, Row, SqliteConnection};
use crate::models::user::{User, RegisterUser, LoginUser};
use crate::errors::Error;

pub async fn register(conn: &mut SqliteConnection, register: &RegisterUser) -> Result<User, Error> {
  let salt = hash::generate_salt();
  let hash = hash::generate_hash(&register.password, &salt);

  sqlx::query("INSERT INTO users (username, password_hash, password_salt) VALUES (?, ?, ?) RETURNING id, username")
    .bind(&register.username)
    .bind(&hash)
    .bind(&salt)
    .fetch_one(conn)
    .await
    .map(|row| User {
      id: row.get(0),
      username: row.get(1),
    })
    .map_err(|e| match e {
      sqlx::Error::Database(e) if e.is_unique_violation() => Error::UserAlreadyExists,
      _ => Error::Database(e.to_string()),
    })
}

pub async fn login(conn: &mut SqliteConnection, login: &LoginUser) -> Result<User, Error> {
  let row = sqlx::query("SELECT id, username, password_hash, password_salt FROM users WHERE username = ?")
    .bind(&login.username)
    .fetch_optional(conn)
    .await
    .map_err(|e| Error::Database(e.to_string()))?
    .ok_or(Error::UserNotFound)?;
  
  let hash: Vec<u8> = row.get(2);
  let salt: Vec<u8> = row.get(3);
  let actual_hash = hash::generate_hash(&login.password, &salt);

  if hash != actual_hash {
    return Err(Error::UserLoginInvalid);
  }

  Ok(User {
    id: row.get(0),
    username: row.get(1),
  })
}
