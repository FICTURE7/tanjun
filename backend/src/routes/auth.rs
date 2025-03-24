use rocket::Route;
use rocket::serde::json::Json;
use rocket_db_pools::Connection;

use crate::services;
use crate::token::Token;
use crate::database::Db;
use crate::errors::Error;
use crate::models::user::{RegisterUser, LoginUser, AuthUser};

type Result<T> = std::result::Result<T, Error>;

#[post("/register", data = "<register>")]
pub async fn register(mut conn: Connection<Db>, register: Json<RegisterUser>) -> Result<Json<AuthUser>> {
  let user = services::auth::register(&mut **conn, &register.into_inner()).await?;
  let token = Token::create(user.id)?;

  Ok(Json(AuthUser {
    user: user,
    token: token,
  }))
}

#[post("/login", data = "<login>")]
pub async fn login(mut conn: Connection<Db>, login: Json<LoginUser>) -> Result<Json<AuthUser>> {
  let user = services::auth::login(&mut **conn, &login.into_inner()).await?;
  let token = Token::create(user.id)?;

  Ok(Json(AuthUser {
    user: user,
    token: token,
  }))
}

pub fn routes() -> Vec<Route> {
  routes![register, login]
}
