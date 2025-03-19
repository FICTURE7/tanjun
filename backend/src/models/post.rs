use rocket::serde::Serialize;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Post {
  pub id: u64,
  pub title: String,
  pub content: String,
}
