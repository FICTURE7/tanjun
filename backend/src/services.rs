pub mod post {
  // TODO: Remove this dependency from here.
  // TODO: Implement a function to map the rows.
  use rocket_db_pools::Connection;

  use crate::sqlx;
  use crate::sqlx::Row;
  use crate::database::Db;
  use crate::models::{Post, NewPost};
  use crate::errors::Error;

  pub async fn list(mut db: Connection<Db>) -> Result<Vec<Post>, Error> {
    sqlx::query("SELECT id, title, content FROM posts")
      .fetch_all(&mut **db)
      .await
      .map(|rows| {
        rows.iter().map(|row| Post {
          id: row.get(0),
          title: row.get(1),
          content: row.get(2),
        }).collect()
      })
      .map_err(|e| Error::DatabaseError(e.to_string()))
  }

  pub async fn create(mut db: Connection<Db>, post: &NewPost) -> Result<Post, Error> {
    sqlx::query("INSERT INTO posts (title, content) VALUES (?, ?) RETURNING id, title, content")
      .bind(&post.title)
      .bind(&post.content)
      .fetch_one(&mut **db)
      .await
      .map(|row| Post {
        id: row.get(0),
        title: row.get(1),
        content: row.get(2),
      })
      .map_err(|e| Error::DatabaseError(e.to_string()))
  }

  pub async fn read(mut db: Connection<Db>, id: i64) -> Result<Option<Post>, Error> {
    sqlx::query("SELECT id, title, content FROM posts WHERE id = ?")
      .bind(&id)
      .fetch_optional(&mut **db)
      .await
      .map(|row| {
        println!("the row is {:?} {:?}", id, row.is_none());
        row.map(|row| Post {
          id: row.get(0),
          title: row.get(1),
          content: row.get(2),
        })
      })
      .map_err(|e| Error::DatabaseError(e.to_string()))
  }

  pub fn update(id: i64, post: &Post) -> Post {
    post.clone()
  }

  pub async fn delete(mut db: Connection<Db>, id: i64) -> Result<Option<Post>, Error> {
    sqlx::query("DELETE FROM posts WHERE id = ? RETURNING id, title, content")
      .bind(&id)
      .fetch_optional(&mut **db)
      .await
      .map(|row| {
        row.map(|row| Post {
          id: row.get(0),
          title: row.get(1),
          content: row.get(2),
        })
      })
      .map_err(|e| Error::DatabaseError(e.to_string()))
  }
}
