// TODO: Remove this dependency from here.
use rocket_db_pools::Connection;

use crate::sqlx::{self, Row};
use crate::database::Db;
use crate::models::{User, NewUser};
use crate::errors::Error;

pub async fn create(mut db: Connection<Db>, user: &NewUser) -> Result<User, Error> {
  sqlx::query("INSERT INTO users (username, password) VALUES (?, ?) RETURNING id, username, email")
    .bind(&user.username)
    .bind(&user.password)
    .fetch_one(&mut **db)
    .await
    .map(|row| User {
      id: row.get(0),
      username: row.get(1),
      password: row.get(2),
    })
    .map_err(|e| Error::DatabaseError(e.to_string()))
}

pub async fn read(mut db: Connection<Db>) -> Result<Option<User>, Error> {
  Err(Error::NotImplemented)
}
