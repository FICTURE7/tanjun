use rocket::{Rocket, Build};
use rocket::fairing::{AdHoc, Result};
use rocket_db_pools::Database;
use rocket_db_pools::sqlx;

#[derive(Database)]
#[database("tanjun")]
pub struct Db(sqlx::SqlitePool);

async fn _run_migrations(rocket: Rocket<Build>) -> Result {
  if let Some(db) = Db::fetch(&rocket) {
    sqlx::query(
      r#"
      DROP TABLE IF EXISTS posts;
      DROP TABLE IF EXISTS users;
    
      CREATE TABLE users(
        id            INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        username      TEXT UNIQUE NOT NULL,
        password_hash BINARY(32) NOT NULL,
        password_salt BINARY(16) NOT NULL
      );
    
      CREATE TABLE posts(
        id            INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        title         TEXT NOT NULL,
        content       TEXT NOT NULL,
        author_id     INTEGER NOT NULL,
        created_at    DATETIME NOT NULL,
        updated_at    DATETIME,

        FOREIGN KEY (author_id) REFERENCES users(id)
      );
    
      INSERT INTO users(username, password_hash, password_salt) VALUES('admin', 'hash', 'salt');
      "#)
      .execute(&**db)
      .await
      .expect("Failed to create table");

    Ok(rocket)
  } else {
    Err(rocket)
  }
}

async fn _run_stage(rocket: Rocket<Build>) -> Result {
  Ok(rocket
    .attach(Db::init())
    .attach(AdHoc::try_on_ignite("Database Migrations", _run_migrations)))
}

pub fn stage() -> AdHoc {
  AdHoc::try_on_ignite("Database Stage", _run_stage)
}
  