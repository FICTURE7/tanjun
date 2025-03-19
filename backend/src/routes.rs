pub mod post {
  use rocket::Route;
  use rocket::serde::json::Json;

  use crate::models::Post;

  #[get("/")]
  pub fn list() -> Json<Vec<Post>> {
    Json(vec![
      Post {
        id: 1,
        title: "Hello, world!".to_string(),
        content: "Hello, world!".to_string(),
      }
    ])
  }

  #[post("/")]
  pub fn create() -> Json<Post> {
    Json(Post {
      id: 1,
      title: "Hello, world!".to_string(),
      content: "Hello, world!".to_string(),
    })
  }

  #[put("/<id>")]
  pub fn update(id: u64) -> Json<Post> {
    Json(Post {
      id: id,
      title: "Hello, world!".to_string(),
      content: "Hello, world!".to_string(),
    })
  }

  #[get("/<id>")]
  pub fn retrieve(id: u64) -> Json<Post> {
    Json(Post {
      id: id,
      title: "Hello, world!".to_string(),
      content: "Hello, world!".to_string(),
    })
  }

  #[delete("/<id>")]
  pub fn delete(id: u64) -> Json<Post> {
    Json(Post {
      id: id,
      title: "Hello, world!".to_string(),
      content: "Hello, world!".to_string(),
    })
  }

  pub fn routes() -> Vec<Route> {
    routes![list, create, update, retrieve, delete]
  }
}
