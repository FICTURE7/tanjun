#[macro_use] extern crate rocket;

mod routes;
mod models;
mod services;

#[launch]
fn rocket() -> _ {
  rocket::build()
    .mount("/post", routes::post::routes())
}
