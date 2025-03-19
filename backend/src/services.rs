pub mod post {
  use crate::sqlx;

  // TODO: Remove this dependency from here.
  use rocket_db_pools::Connection;

  use crate::database::Db;
  use crate::models::Post;

  pub fn list() -> Vec<Post> {
    vec![
      Post {
        id: 1,
        title: "Hello, world!".to_string(),
        content: "Hello, world!".to_string(),
      }
    ]
  }

  pub async fn create(mut conn: Connection<Db>, post: &Post) -> Result<Post, String> {
    sqlx::query("INSERT INTO posts (title, content) VALUES (?, ?) RETURNING id")
      .bind(&post.title)
      .bind(&post.content)
      .execute(&mut **conn)
      .await
      .map_err(|e| e.to_string())?;

    Ok(post.clone())
  }

  pub fn read(id: u64) -> Option<Post> {
    Some(Post {
      id: id,
      title: "Hello, world!".to_string(),
      content: "Hello, world!".to_string(),
    })
  }

  pub fn update(id: u64, post: &Post) -> Post {
    post.clone()
  }

  pub fn delete(id: u64) -> Post {
    Post {
      id: id,
      title: "Hello, world!".to_string(),
      content: "Hello, world!".to_string(),
    }
  }
}
