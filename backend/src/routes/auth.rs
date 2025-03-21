use rocket::Route;
use rocket::serde::json::Json;
use rocket_db_pools::Connection;

use crate::services;
use crate::database::Db;
use crate::errors::Error;
use crate::models::{User, RegisterUser, LoginUser};

type Result<T> = std::result::Result<T, Error>;

#[post("/register", data = "<register>")]
pub async fn register(conn: Connection<Db>, register: Json<RegisterUser>) -> Result<Json<User>> {
  services::auth::register(conn, &register.into_inner())
    .await
    .map(|user| Json(user))
}

#[post("/login", data = "<login>")]
pub async fn login(conn: Connection<Db>, login: Json<LoginUser>) -> Result<Json<User>> {
  services::auth::login(conn, &login.into_inner())
    .await
    .map(|user| Json(user))
}

pub fn routes() -> Vec<Route> {
  routes![register, login]
}
