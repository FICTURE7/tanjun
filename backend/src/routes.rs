pub mod post {
  use rocket::Route;
  use rocket::serde::json::Json;
  use rocket_db_pools::Connection;

  use crate::services;
  use crate::database::Db;
  use crate::models::{Post, NewPost};

  #[get("/")]
  pub async fn list(conn: Connection<Db>) -> Result<Json<Vec<Post>>, String> {
    services::post::list(conn)
      .await
      .map(|posts| Json(posts))
      .map_err(|e| e.to_string())
  }

  #[post("/", data = "<post>")]
  pub async fn create(conn: Connection<Db>, post: Json<NewPost>) -> Result<Json<Post>, String> {
    services::post::create(conn, &post.into_inner())
      .await
      .map(|post| Json(post))
      .map_err(|e| e.to_string())
  }

  #[get("/<id>")]
  pub async fn read(conn: Connection<Db>, id: i64) -> Result<Option<Json<Post>>, String> {
    services::post::read(conn, id)
      .await
      .map(|post| post.map(Json))
      .map_err(|e| e.to_string())
  }

  #[put("/<id>", data = "<post>")]
  pub fn update(id: i64, post: Json<Post>) -> Json<Post> {
    Json(services::post::update(id, &post.into_inner()))
  }

  #[delete("/<id>")]
  pub async fn delete(conn: Connection<Db>, id: i64) -> Result<Option<Json<Post>>, String> {
    services::post::delete(conn, id)
      .await
      .map(|post| post.map(Json))
      .map_err(|e| e.to_string())
  }

  pub fn routes() -> Vec<Route> {
    routes![list, create, read, update, delete]
  }
}
