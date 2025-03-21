// TODO: Remove this dependency from here.
use rocket_db_pools::Connection;

use crate::sqlx::{self, Row};
use crate::database::Db;
use crate::models::{User, RegisterUser, LoginUser};
use crate::errors::Error;

pub async fn register(mut db: Connection<Db>, register: &RegisterUser) -> Result<User, Error> {
  // TODO: Hash password.
  sqlx::query("INSERT INTO users (username, password_hash) VALUES (?, ?) RETURNING username")
    .bind(&register.username)
    .bind(&register.password)
    .fetch_one(&mut **db)
    .await
    .map(|row| User {
      username: row.get(0),
    })
    .map_err(|e| Error::DatabaseError(e.to_string()))
}

pub async fn login(mut db: Connection<Db>, login: &LoginUser) -> Result<User, Error> {
  Err(Error::NotImplemented)
}
