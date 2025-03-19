use rocket::serde::{Serialize, Deserialize};

// TODO: The crate attribute can be removed by depending on serde directly, I think.

#[derive(Clone)]
#[derive(Serialize)]
#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct User {
  pub id: u64,
  pub name: String,
}

#[derive(Clone)]
#[derive(Serialize)]
#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Post {
  pub id: u64,
  pub title: String,
  pub content: String,
}
