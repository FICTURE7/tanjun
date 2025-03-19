pub mod post {
  use rocket::Route;
  use rocket::serde::json::Json;
  use crate::services;
  use crate::models::Post;

  #[get("/")]
  pub fn list() -> Json<Vec<Post>> {
    Json(services::post::list())
  }

  #[post("/", data = "<post>")]
  pub fn create(post: Json<Post>) -> Json<Post> {
    Json(services::post::create(post.into_inner()))
  }

  #[put("/<id>", data = "<post>")]
  pub fn update(id: u64, post: Json<Post>) -> Json<Post> {
    Json(services::post::update(id, post.into_inner()))
  }

  #[get("/<id>")]
  pub fn retrieve(id: u64) -> Json<Post> {
    Json(services::post::retrieve(id))
  }

  #[delete("/<id>")]
  pub fn delete(id: u64) -> Json<Post> {
    Json(services::post::delete(id))
  }

  pub fn routes() -> Vec<Route> {
    routes![list, create, update, retrieve, delete]
  }
}
