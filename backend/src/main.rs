#[macro_use] extern crate rocket;

mod routes;
mod models;
mod services;
mod database;

use rocket::fairing::AdHoc;
use rocket_db_pools::Database;
use rocket_db_pools::sqlx;
use crate::database::Db;

#[launch]
fn rocket() -> _ {
  rocket::build()
    .attach(Db::init())
    .attach(AdHoc::try_on_ignite("Database Migrations", |rocket| async {
      if let Some(db) = Db::fetch(&rocket) {
        sqlx::query("CREATE TABLE IF NOT EXISTS posts (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          content TEXT NOT NULL
        )")
          .execute(&**db)
          .await
          .expect("Failed to create table");
        Ok(rocket)
      } else {
        Err(rocket)
      }
    }))
    .mount("/post", routes::post::routes())
}
