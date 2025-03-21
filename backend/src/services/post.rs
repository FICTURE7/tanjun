// TODO: Remove this dependency from here.
// TODO: Implement a function to map the rows.
// TODO: Implement paging.
use rocket_db_pools::Connection;

use crate::sqlx::{self, Row};
use crate::database::Db;
use crate::models::{Post, NewPost, UpdatePost};
use crate::errors::Error;

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
    .map(|row| row.map(|row| Post {
      id: row.get(0),
      title: row.get(1),
      content: row.get(2),
    }))
    .map_err(|e| Error::DatabaseError(e.to_string()))
}

pub async fn read_paged(mut db: Connection<Db>) -> Result<Vec<Post>, Error> {
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

pub async fn update(mut db: Connection<Db>, id: i64, post: &UpdatePost) -> Result<Option<Post>, Error> {
  sqlx::query("UPDATE posts SET title = ?, content = ? WHERE id = ? RETURNING id, title, content")
    .bind(&post.title)
    .bind(&post.content)
    .bind(&id)
    .fetch_optional(&mut **db)
    .await
    .map(|row| row.map(|row| Post {
      id: row.get(0),
      title: row.get(1),
      content: row.get(2),
    }))
    .map_err(|e| Error::DatabaseError(e.to_string()))
}

pub async fn delete(mut db: Connection<Db>, id: i64) -> Result<Option<Post>, Error> {
  sqlx::query("DELETE FROM posts WHERE id = ? RETURNING id, title, content")
    .bind(&id)
    .fetch_optional(&mut **db)
    .await
    .map(|row| row.map(|row| Post {
      id: row.get(0),
      title: row.get(1),
      content: row.get(2),
    }))
    .map_err(|e| Error::DatabaseError(e.to_string()))
}
