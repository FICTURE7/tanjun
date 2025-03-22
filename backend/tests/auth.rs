mod common;

use rocket::http::Status;
use rocket::local::blocking::{Client, LocalResponse};

#[test]
fn test_register() {
  // Arrange
  common::setup();
  let client = common::get_client();

  // Act
  let response = register_user(&client);

  // Assert
  assert_eq!(response.status(), Status::Ok);

  let json = common::get_json(response);
  let username = json["username"].as_str().expect("valid username");

  assert_eq!(username, "test_user");
}

#[test]
fn test_register_already_exist() {
  // Arrange
  common::setup();
  let client = common::get_client();
  let _ = register_user(&client);

  // Act
  let response = register_user(&client);

  // Assert
  assert_eq!(response.status(), Status::Conflict);
}

fn register_user(client: &Client) -> LocalResponse {
  client.post("/auth/register")
    .body(r#"{"username":"test_user","password":"test"}"#)
    .dispatch()
}
