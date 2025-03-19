pub mod post {
  use rocket::Route;
  use rocket::serde::json::Json;
  use rocket_db_pools::Connection;
  use crate::services;
  use crate::database::Db;
  use crate::models::Post;

  #[get("/")]
  pub fn list() -> Json<Vec<Post>> {
    Json(services::post::list())
  }

  #[post("/", data = "<post>")]
  pub async fn create(conn: Connection<Db>, post: Json<Post>) -> Result<Json<Post>, String> {
    Ok(Json(services::post::create(conn, &post.into_inner()).await?))
  }

  #[put("/<id>", data = "<post>")]
  pub fn update(id: u64, post: Json<Post>) -> Json<Post> {
    Json(services::post::update(id, &post.into_inner()))
  }

  #[get("/<id>")]
  pub fn retrieve(id: u64) -> Option<Json<Post>> {
    Some(Json(services::post::read(id)?))
  }

  #[delete("/<id>")]
  pub fn delete(id: u64) -> Json<Post> {
    Json(services::post::delete(id))
  }

  pub fn routes() -> Vec<Route> {
    routes![list, create, update, retrieve, delete]
  }
}
