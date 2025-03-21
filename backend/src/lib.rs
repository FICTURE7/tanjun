#[macro_use] extern crate rocket;

mod errors;
mod routes;
mod models;
mod services;
mod database;

use rocket::fairing::AdHoc;
use rocket_db_pools::{sqlx, Database};
use crate::database::Db;

// TODO: Refactor this bit of code out to database.rs.
#[launch]
pub fn rocket() -> _ {
  rocket::build()
    .attach(Db::init())
    .attach(AdHoc::try_on_ignite("Database Migrations", |rocket| async {
      if let Some(db) = Db::fetch(&rocket) {
        sqlx::query(
          r#"
          CREATE TABLE IF NOT EXISTS users (
            id            INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            username      TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
          );

          CREATE TABLE IF NOT EXISTS posts (
            id            INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            title         TEXT NOT NULL,
            content       TEXT NOT NULL
          );
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
