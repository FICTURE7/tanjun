mod common;

use common::*;
use rocket::http::Status;
use rocket::local::blocking::{Client, LocalResponse};

#[test]
fn test_register() {
  let client = get_client();
  let response = register_user(&client);

  assert_eq!(response.status(), Status::Ok);

  let json = get_json(response);
  let username = json["username"].as_str().expect("valid username");

  assert_eq!(username, "test_user");
}

#[test]
fn test_register_already_exist() {
  let client = get_client();
  let response = register_user(&client);

  assert_eq!(response.status(), Status::Conflict);
}

fn register_user(client: &Client) -> LocalResponse {
  client.post("/user")
    .body(r#"{"username":"test_user","password":"test"}"#)
    .dispatch()
}
