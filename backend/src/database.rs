use std::fs;
use std::io;

use rocket::{Rocket, Build};
use rocket::fairing::{AdHoc, Result};
use rocket_db_pools::{Database};
use rocket_db_pools::sqlx;

#[derive(Database)]
#[database("tanjun")]
pub struct Db(sqlx::SqlitePool);

pub struct PreDb;

impl PreDb {
  async fn _create_directory(rocket: Rocket<Build>) -> Result {
    // TODO: Use configuration value instead.
    let path = "data";
    match fs::metadata(path) {
      Ok(metadata) => {
        if !metadata.is_dir() {
          error!("'{}' exists but is not a directory.", path);
          return Err(rocket);
        }
      }
      Err(e) => {
        if e.kind() == io::ErrorKind::NotFound {
          if let Err(e) = fs::create_dir_all(path) {
            error!("Failed to create folder '{}': {}", path, e);
            return Err(rocket);
          } else {
            info!("Folder '{}' created successfully.", path);
          }
        } else {
          error!("Failed to access folder '{}': {}", path, e);
          return Err(rocket);
        }
      }

    }
    Ok(rocket)
  }

  pub fn init() -> AdHoc {
    AdHoc::try_on_ignite("Database Pre", PreDb::_create_directory)
  }
}

pub struct PostDb;

impl PostDb {
  async fn _run_migrations(rocket: Rocket<Build>) -> Result {
    match Db::fetch(&rocket) {
      Some(db) => match sqlx::migrate!("./sql").run(&**db).await {
        Ok(_) => Ok(rocket),
        Err(e) => {
          error!("Failed to run migrations: {}", e);
          Err(rocket)
        },
      },
      None => Err(rocket),
    }
  }

  pub fn init() -> AdHoc {
    AdHoc::try_on_ignite("Database Post", PostDb::_run_migrations)
  }
}
