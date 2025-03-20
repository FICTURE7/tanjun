use tanjun_backend;
use rocket::serde::json::serde_json;
use rocket::local::blocking::{Client, LocalResponse};

pub fn get_client() -> Client {
  Client::tracked(tanjun_backend::rocket()).expect("valid rocket instance")
}

pub fn get_json(response: LocalResponse) -> serde_json::Value {
  serde_json::from_str(&response.into_string().unwrap()).expect("valid json")
}
