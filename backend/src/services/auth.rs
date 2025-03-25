use sqlx::{Row, SqliteConnection};
use sqlx::sqlite::SqliteRow;

use crate::hash;
use crate::models::user::{User, RegisterUser, LoginUser};
use crate::errors::{Error, Validation};

pub async fn register(conn: &mut SqliteConnection, register: &RegisterUser) -> Result<User, Error> {
  Validation::validate(register)?;

  let salt = hash::generate_salt();
  let hash = hash::generate_hash(&register.password, &salt);

  sqlx::query("INSERT INTO users (username, password_hash, password_salt) VALUES (?, ?, ?) RETURNING id, username")
    .bind(&register.username)
    .bind(&hash)
    .bind(&salt)
    .fetch_one(conn)
    .await
    .map(|row| map_user_row(&row))
    .map_err(|e| match e {
      sqlx::Error::Database(e) if e.is_unique_violation() => Error::UserAlreadyExists,
      _ => Error::Database(e.to_string()),
    })
}

pub async fn login(conn: &mut SqliteConnection, login: &LoginUser) -> Result<User, Error> {
  Validation::validate(login)?;

  let row = sqlx::query("SELECT id, username, password_hash, password_salt FROM users WHERE username = ?")
    .bind(&login.username)
    .fetch_optional(conn)
    .await
    .map_err(|e| Error::Database(e.to_string()))?
    .ok_or(Error::UserLoginNotFound)?;
  
  let hash: Vec<u8> = row.get(2);
  let salt: Vec<u8> = row.get(3);
  let actual_hash = hash::generate_hash(&login.password, &salt);

  if hash != actual_hash {
    Err(Error::UserLoginInvalid)
  } else {
    Ok(map_user_row(&row))
  }
}

pub async fn refresh(conn: &mut SqliteConnection, id: i64) -> Result<User, Error> {
  sqlx::query("SELECT id, username, password_hash, password_salt FROM users WHERE id = ?")
    .bind(id)
    .fetch_optional(conn)
    .await
    .map_err(|e| Error::Database(e.to_string()))?
    .ok_or(Error::UserLoginNotFound)
    .map(|row| map_user_row(&row))
}

fn map_user_row(row: &SqliteRow) -> User {
  User {
    id: row.get(0),
    username: row.get(1),
  }
}
