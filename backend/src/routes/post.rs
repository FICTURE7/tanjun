use rocket::Route;
use rocket::serde::json::Json;
use rocket_db_pools::Connection;

use crate::services;
use crate::token::Token;
use crate::database::Db;
use crate::errors::Error;
use crate::models::post::{Post, NewPost, UpdatePost};

type Result<T> = std::result::Result<T, Error>;

#[post("/", data = "<post>")]
pub async fn create(mut conn: Connection<Db>, token: Token, post: Json<NewPost>) -> Result<Json<Post>> {
  services::post::create(&mut **conn, token.claims.id, &post.into_inner())
    .await
    .map(|post| Json(post))
}

#[get("/<id>")]
pub async fn read(mut conn: Connection<Db>, id: i64) -> Result<Option<Json<Post>>> {
  services::post::read(&mut **conn, id)
    .await
    .map(|post| post.map(Json))
}

// TODO: Implement paging.
#[get("/")]
pub async fn read_paged(mut conn: Connection<Db>) -> Result<Json<Vec<Post>>> {
  services::post::read_paged(&mut **conn)
    .await
    .map(|posts| Json(posts))
}

#[put("/<id>", data = "<post>")]
pub async fn update(mut conn: Connection<Db>, token: Token, id: i64, post: Json<UpdatePost>) -> Result<Option<Json<Post>>> {
  match services::post::update(&mut conn, id, &post.into_inner()).await? {
    Some(post) => if post.author.id != token.claims.id {
      Err(Error::UserForbidden)
    } else {
      Ok(Some(Json(post)))
    },
    None => Ok(None),
  }
}

#[delete("/<id>")]
pub async fn delete(mut conn: Connection<Db>, token: Token, id: i64) -> Result<Option<Json<Post>>> {
  match services::post::delete(&mut conn, id).await? {
    Some(post) => if post.author.id != token.claims.id {
      Err(Error::UserForbidden)
    } else {
      Ok(Some(Json(post)))
    },
    None => Ok(None)
  }
}

pub fn routes() -> Vec<Route> {
  routes![create, read, read_paged, update, delete]
}
