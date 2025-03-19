use rocket::serde::Serialize;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct User {
  pub id: u64,
  pub name: String,
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Post {
  pub id: u64,
  pub title: String,
  pub content: String,
}
