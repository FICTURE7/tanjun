use rocket_db_pools::Database;
use rocket_db_pools::sqlx;

#[derive(Database)]
#[database("tanjun")]
pub struct Db(sqlx::SqlitePool);
