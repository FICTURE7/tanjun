use crate::sqlx::{self, Row, SqliteConnection};
use crate::models::{User, RegisterUser, LoginUser};
use crate::errors::Error;

pub async fn register(conn: &mut SqliteConnection, register: &RegisterUser) -> Result<User, Error> {
  // TODO: Hash password.
  sqlx::query("INSERT INTO users (username, password_hash, password_salt) VALUES (?, ?, ?) RETURNING id, username")
    .bind(&register.username)
    .bind(&register.password)
    .bind("salt")
    .fetch_one(conn)
    .await
    .map(|row| User {
      id: row.get(0),
      username: row.get(1),
    })
    .map_err(|e| match e {
      sqlx::Error::Database(e) if e.is_unique_violation() => Error::AlreadyExists,
      _ => Error::Database(e.to_string()),
    })
}

#[allow(unused_variables)]
pub async fn login(conn: &mut SqliteConnection, login: &LoginUser) -> Result<User, Error> {
  Err(Error::NotImplemented)
}
