use rocket::{Rocket, Build};
use rocket::fairing::{AdHoc, Result};
use rocket_db_pools::Database;
use rocket_db_pools::sqlx;

#[derive(Database)]
#[database("tanjun")]
pub struct Db(sqlx::SqlitePool);

pub struct Migrator;

impl Migrator {
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

  pub fn init() -> AdHoc{
    AdHoc::try_on_ignite("Database Migrations", Migrator::_run_migrations)
  }
}
