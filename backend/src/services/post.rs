use crate::sqlx::{self, Row, SqliteConnection};
use crate::models::{Post, NewPost, UpdatePost};
use crate::errors::Error;

pub async fn create(conn: &mut SqliteConnection, post: &NewPost) -> Result<Post, Error> {
  sqlx::query(r#"
    INSERT INTO posts (title, content, author_id, created_at) VALUES (?, ?, ?, current_timestamp)
    RETURNING id, title, content, created_at
    "#)
    .bind(&post.title)
    .bind(&post.content)
    .bind(1) // TODO: Remove hardcode.
    .fetch_one(conn)
    .await
    .map(|row| Post {
      id: row.get(0),
      title: row.get(1),
      content: row.get(2),
      created_at: row.get(3),
      updated_at: None
    })
    .map_err(|e| Error::Database(e.to_string()))
}

pub async fn read(conn: &mut SqliteConnection, id: i64) -> Result<Option<Post>, Error> {
  sqlx::query("SELECT id, title, content, created_at, updated_at FROM posts WHERE id = ?")
    .bind(&id)
    .fetch_optional(conn)
    .await
    .map(|row| row.map(|row| Post {
      id: row.get(0),
      title: row.get(1),
      content: row.get(2),
      created_at: row.get(3),
      updated_at: row.get(4),
    }))
    .map_err(|e| Error::Database(e.to_string()))
}

// TODO: Implement paging.
pub async fn read_paged(conn: &mut SqliteConnection) -> Result<Vec<Post>, Error> {
  sqlx::query("SELECT id, title, content, created_at, updated_at FROM posts")
    .fetch_all(conn)
    .await
    .map(|rows| {
      rows.iter().map(|row| Post {
        id: row.get(0),
        title: row.get(1),
        content: row.get(2),
        created_at: row.get(3),
        updated_at: row.get(4),
      }).collect()
    })
    .map_err(|e| Error::Database(e.to_string()))
}

pub async fn update(conn: &mut SqliteConnection, id: i64, post: &UpdatePost) -> Result<Option<Post>, Error> {
  sqlx::query("UPDATE posts SET title = ?, content = ?, updated_at = current_timestamp WHERE id = ? RETURNING id, title, content, created_at, updated_at")
    .bind(&post.title)
    .bind(&post.content)
    .bind(&id)
    .fetch_optional(conn)
    .await
    .map(|row| row.map(|row| Post {
      id: row.get(0),
      title: row.get(1),
      content: row.get(2),
      created_at: row.get(3),
      updated_at: row.get(4),
    }))
    .map_err(|e| Error::Database(e.to_string()))
}

pub async fn delete(conn: &mut SqliteConnection, id: i64) -> Result<Option<Post>, Error> {
  sqlx::query("DELETE FROM posts WHERE id = ? RETURNING id, title, content, created_at, updated_at")
    .bind(&id)
    .fetch_optional(conn)
    .await
    .map(|row| row.map(|row| Post {
      id: row.get(0),
      title: row.get(1),
      content: row.get(2),
      created_at: row.get(3),
      updated_at: row.get(4),
    }))
    .map_err(|e| Error::Database(e.to_string()))
}
