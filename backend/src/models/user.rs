use rocket::serde::{Serialize, Deserialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct User {
  pub id: i64,
  pub username: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct RegisterUser {
  pub username: String,
  pub password: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct LoginUser {
  pub username: String,
  pub password: String,
}
