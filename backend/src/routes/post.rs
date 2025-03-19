use rocket::Route;
use rocket::serde::json::Json;

use crate::models::post::Post;

#[get("/")]
pub fn list() -> &'static str {
  "Hello, world!"
}

#[post("/")]
pub fn create() -> Json<Post> {
  let post = Post {
    id: 1,
    title: "Hello, world!".to_string(),
    content: "Hello, world!".to_string(),
  };

  Json(post)
}

#[put("/<id>")]
pub fn update(id: i64) -> &'static str {
  "Hello, world!"
}

#[get("/<id>")]
pub fn retrieve(id: i64) -> &'static str {
  "Hello, world!"
}

#[delete("/<id>")]
pub fn delete(id: i64) -> &'static str {
  "Hello, world!"
}

pub fn routes() -> Vec<Route> {
  routes![list, create, update, retrieve, delete]
}
