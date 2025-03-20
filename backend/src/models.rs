use rocket::serde::{Serialize, Deserialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct User {
  pub id: i64,
  pub username: String,
  pub password: String,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct NewUser {
  pub username: String,
  pub password: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Post {
  pub id: i64,
  pub title: String,
  pub content: String,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct NewPost {
  pub title: String,
  pub content: String,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct UpdatePost {
  pub title: String,
  pub content: String,
}
