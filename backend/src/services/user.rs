// TODO: Remove this dependency from here.
use rocket_db_pools::Connection;

use crate::sqlx::{self, Row};
use crate::database::Db;
use crate::models::{User, NewUser};
use crate::errors::Error;

pub async fn create(mut db: Connection<Db>, user: &NewUser) -> Result<User, Error> {
  // TODO: Hash password.
  sqlx::query("INSERT INTO users (username, password_hash) VALUES (?, ?) RETURNING username")
    .bind(&user.username)
    .bind(&user.password)
    .fetch_one(&mut **db)
    .await
    .map(|row| User {
      username: row.get(1),
    })
    .map_err(|e| Error::DatabaseError(e.to_string()))
}
