use rocket::Route;
use rocket::serde::json::Json;
use rocket_db_pools::Connection;

use crate::services;
use crate::database::Db;
use crate::errors::Error;
use crate::models::{User, RegisterUser};

type Result<T> = std::result::Result<T, Error>;

#[post("/register", data = "<user>")]
pub async fn register(conn: Connection<Db>, user: Json<RegisterUser>) -> Result<Json<User>> {
  services::auth::register(conn, &user.into_inner())
    .await
    .map(|user| Json(user))
}

pub fn routes() -> Vec<Route> {
  routes![register]
}
