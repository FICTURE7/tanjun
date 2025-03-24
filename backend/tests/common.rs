#![allow(unused)]

use tanjun_backend;
use tanjun_backend::Db;

use rocket::Config;
use rocket::fairing::AdHoc;
use rocket::serde::json::serde_json;
use rocket::local::blocking::{Client, LocalResponse};

use rocket_db_pools::Database;

pub fn get_client() -> Client {
  let rocket = tanjun_backend::rocket()
    .attach(AdHoc::try_on_ignite("[Test] Database Clean Up", |rocket| async {
      match Db::fetch(&rocket) {
        Some(db) => {
          let query = sqlx::query(
            r#"
            DELETE FROM posts;
            DELETE FROM users;
            "#)
            .execute(&**db)
            .await;
          
          match query {
            Ok(_) => Ok(rocket),
            Err(e) => {
              rocket::error!("Failed to clean up database: {}", e);
              Err(rocket)
            }
          }
        },
        None => Err(rocket)
      }
    }));

  Client::tracked(rocket).expect("valid rocket instance")
}

pub fn get_json(response: LocalResponse) -> serde_json::Value {
  serde_json::from_str(&response.into_string().unwrap()).expect("valid json")
}

pub fn get_token(client: &Client, username: &str) -> String {
  let response = client.post("/auth/register")
    .body(format!(r#"{{"username":"{}","password":"test"}}"#, username))
    .dispatch();
  let json = get_json(response);
  let token = json["token"].as_str().expect("valid authentication token");

  token.to_string()
}
