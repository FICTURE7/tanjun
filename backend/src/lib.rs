#[macro_use] extern crate rocket;

mod cors;
mod hash;
mod token;
mod errors;
mod routes;
mod models;
mod services;
mod database;

#[launch]
pub fn rocket() -> _ {
  rocket::build()
    .attach(cors::Cors)
    .attach(database::stage())
    .mount("/auth", routes::auth::routes())
    .mount("/post", routes::post::routes())
}
