use rand::Rng;
use sha2::{Sha256, Digest};

use crate::sqlx::{self, Row, SqliteConnection};
use crate::models::{User, RegisterUser, LoginUser};
use crate::errors::Error;

pub async fn register(conn: &mut SqliteConnection, register: &RegisterUser) -> Result<User, Error> {
  let salt = gen_salt();
  let hash = gen_hash(&register.password, &salt);

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
  let actual_hash = gen_hash(&login.password, &salt);

  if hash != actual_hash {
    return Err(Error::UserLoginInvalid);
  }

  Ok(User {
    id: row.get(0),
    username: row.get(1),
  })
}

fn gen_salt() -> Vec<u8> {
  let salt: [u8; 16] = rand::rng().random();
  salt.to_vec()
}

fn gen_hash(password: &String, salt: &Vec<u8>) -> Vec<u8>{
  let hash = Sha256::digest([password.as_bytes(), salt].concat());
  hash.to_vec()
}
