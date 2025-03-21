use rocket::Route;
use rocket::serde::json::Json;
use rocket_db_pools::Connection;

use crate::services;
use crate::database::Db;
use crate::errors::Error;
use crate::models::{Post, NewPost, UpdatePost};

type Result<T> = std::result::Result<T, Error>;

#[post("/", data = "<post>")]
pub async fn create(conn: Connection<Db>, post: Json<NewPost>) -> Result<Json<Post>> {
  services::post::create(conn, &post.into_inner())
    .await
    .map(|post| Json(post))
}

#[get("/<id>")]
pub async fn read(conn: Connection<Db>, id: i64) -> Result<Option<Json<Post>>> {
  services::post::read(conn, id)
    .await
    .map(|post| post.map(Json))
}

// TODO: Implement paging.
#[get("/")]
pub async fn read_paged(conn: Connection<Db>) -> Result<Json<Vec<Post>>> {
  services::post::read_paged(conn)
    .await
    .map(|posts| Json(posts))
}

#[put("/<id>", data = "<post>")]
pub async fn update(conn: Connection<Db>, id: i64, post: Json<UpdatePost>) -> Result<Option<Json<Post>>> {
  services::post::update(conn, id, &post.into_inner())
    .await
    .map(|post| post.map(Json))
}

#[delete("/<id>")]
pub async fn delete(conn: Connection<Db>, id: i64) -> Result<Option<Json<Post>>> {
  services::post::delete(conn, id)
    .await
    .map(|post| post.map(Json))
}

pub fn routes() -> Vec<Route> {
  routes![create, read, read_paged, update, delete]
}
