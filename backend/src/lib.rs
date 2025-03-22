#[macro_use] extern crate rocket;

mod cors;
mod errors;
mod routes;
mod models;
mod services;
mod database;

use rocket::fairing::AdHoc;
use rocket_db_pools::{sqlx, Database};
use crate::cors::Cors;
use crate::database::Db;

// TODO: Refactor this bit of code out to database.rs.
// TODO: Implement migrations.
#[launch]
pub fn rocket() -> _ {
  rocket::build()
    .attach(Db::init())
    .attach(Cors)
    .attach(AdHoc::try_on_ignite("Database Migrations", |rocket| async {
      if let Some(db) = Db::fetch(&rocket) {
        sqlx::query(
          r#"
          DROP TABLE IF EXISTS posts;
          DROP TABLE IF EXISTS users;

          CREATE TABLE users(
            id            INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            username      TEXT UNIQUE NOT NULL,
            password_hash BINARY(32) NOT NULL,
            password_salt BINARY(16) NOT NULL
          );

          CREATE TABLE posts(
            id            INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            title         TEXT NOT NULL,
            content       TEXT NOT NULL,
            author_id     INTEGER NOT NULL,
			
            FOREIGN KEY (author_id) REFERENCES users(id)
          );

          INSERT INTO users(username, password_hash, password_salt) VALUES('admin', 'hash', 'salt');
          "#)
          .execute(&**db)
          .await
          .expect("Failed to create table");
        Ok(rocket)
      } else {
        Err(rocket)
      }
    }))
    .mount("/auth", routes::auth::routes())
    .mount("/post", routes::post::routes())
}
