use sqlx::{Row, SqliteConnection};
use sqlx::sqlite::SqliteRow;

use crate::models::user::{User};
use crate::models::post::{Post, NewPost, UpdatePost};
use crate::errors::{Error, Validation};

pub async fn create(conn: &mut SqliteConnection, author_id: i64, post: &NewPost) -> Result<Post, Error> {
  Validation::validate(post)?;

  sqlx::query(r#"
    INSERT INTO posts (title, content, author_id, created_at)
    VALUES (?, ?, ?, current_timestamp);
  
    SELECT
      p.id,
      title,
      content,
      created_at,
      updated_at,
      u.id as author_id,
      u.username as author_username
    FROM posts p
      INNER JOIN users u ON p.author_id = u.id
    WHERE p.id = last_insert_rowid();
    "#)
    .bind(&post.title)
    .bind(&post.content)
    .bind(author_id)
    .fetch_one(conn)
    .await
    .map(|row| map_row(&row))
    .map_err(|e| Error::Database(e.to_string()))
}

pub async fn read(conn: &mut SqliteConnection, id: i64) -> Result<Option<Post>, Error> {
  sqlx::query(r#"
    SELECT
      p.id,
      title,
      content,
      created_at,
      updated_at,
      u.id as author_id,
      u.username as author_username
    FROM posts p
      INNER JOIN users u ON p.author_id = u.id
    WHERE p.id = ?;
    "#)
    .bind(&id)
    .fetch_optional(conn)
    .await
    .map(|row| row.map(|row| map_row(&row)))
    .map_err(|e| Error::Database(e.to_string()))
}

// TODO: Implement paging.
pub async fn read_paged(conn: &mut SqliteConnection) -> Result<Vec<Post>, Error> {
  sqlx::query(r#"
    SELECT
      p.id,
      title,
      content,
      created_at,
      updated_at,
      u.id as author_id,
      u.username as author_username
    FROM posts p
      INNER JOIN users u ON p.author_id = u.id
    "#)
    .fetch_all(conn)
    .await
    .map(|rows| rows.iter().map(|row| map_row(row)).collect())
    .map_err(|e| Error::Database(e.to_string()))
}

pub async fn update(conn: &mut SqliteConnection, id: i64, post: &UpdatePost) -> Result<Option<Post>, Error> {
  Validation::validate(post)?;

  sqlx::query(r#"
    UPDATE posts
    SET title = ?, content = ?, updated_at = current_timestamp
    WHERE id = ?;

    SELECT
      p.id,
      title,
      content,
      created_at,
      updated_at,
      u.id as author_id,
      u.username as author_username
    FROM posts p
      INNER JOIN users u ON p.author_id = u.id
    WHERE p.id = ?;
    "#)
    .bind(&post.title)
    .bind(&post.content)
    .bind(&id)
    .bind(&id)
    .fetch_optional(conn)
    .await
    .map(|row| row.map(|row| map_row(&row)))
    .map_err(|e| Error::Database(e.to_string()))
}

pub async fn delete(conn: &mut SqliteConnection, id: i64) -> Result<Option<Post>, Error> {
  sqlx::query(r#"
    SELECT
      p.id,
      title,
      content,
      created_at,
      updated_at,
      u.id as author_id,
      u.username as author_username
    FROM posts p
      INNER JOIN users u ON p.author_id = u.id
    WHERE p.id = ?;

    DELETE FROM posts WHERE id = ?;
    "#)
    .bind(&id)
    .bind(&id)
    .fetch_optional(conn)
    .await
    .map(|row| row.map(|row| map_row(&row)))
    .map_err(|e| Error::Database(e.to_string()))
}

fn map_row(row: &SqliteRow) -> Post {
  Post {
    id: row.get(0),
    title: row.get(1),
    content: row.get(2),
    created_at: row.get(3),
    updated_at: row.get(4),
    author: User {
      id: row.get(5),
      username: row.get(6),
    }
  }
}
