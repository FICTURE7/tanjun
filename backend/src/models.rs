use rocket::serde::{Serialize, Deserialize};

#[derive(Clone)]
#[derive(Debug)]
#[derive(Serialize)]
#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct User {
  pub id: i64,
  pub name: String,
}

#[derive(Clone)]
#[derive(Debug)]
#[derive(Serialize)]
#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Post {
  pub id: i64,
  pub title: String,
  pub content: String,
}

#[derive(Clone)]
#[derive(Debug)]
#[derive(Serialize)]
#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct NewPost {
  pub title: String,
  pub content: String,
}
