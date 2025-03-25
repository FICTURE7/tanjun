#[macro_use] extern crate rocket;

mod cors;
mod hash;
mod token;
mod errors;
mod routes;
mod models;
mod services;
mod database;

pub use database::Db;
use rocket_db_pools::Database;

#[launch]
pub fn rocket() -> _ {
  rocket::build()
    .attach(cors::Cors)
    .attach(database::PreDb::init())
    .attach(database::Db::init())
    .attach(database::PostDb::init())
    .mount("/auth", routes::auth::routes())
    .mount("/post", routes::post::routes())
}
