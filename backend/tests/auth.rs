mod common;

use rocket::http::{Status, Header};
use rocket::local::blocking::{Client, LocalResponse};

#[test]
fn test_register() {
  // Arrange
  let client = common::get_client();

  // Act
  let response = register_user(&client);

  // Assert
  assert_eq!(response.status(), Status::Ok);

  let json = common::get_json(response);
  let _token = json["token"]
    .as_str().expect("token string");
  let username = json["user"]
    .as_object().expect("user object")["username"]
    .as_str().expect("username string");

  assert_eq!(username, "test_user");
}

#[test]
fn test_register_already_exist() {
  // Arrange
  let client = common::get_client();
  let _ = register_user(&client);

  // Act
  let response = register_user(&client);

  // Assert
  assert_eq!(response.status(), Status::Conflict);
}

#[test]
fn test_login_valid_password() {
  // Arrange
  let client = common::get_client();
  let _ = register_user(&client);

  // Act
  let response = login_user(&client);

  // Assert
  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_login_invalid_password() {
  // Arrange
  let client = common::get_client();
  let _ = register_user(&client);

  // Act
  let response = client.post("/auth/login")
    .body(r#"{"username":"test_user","password":"test-invalid-password"}"#) // Invalid password.
    .dispatch();

  // Assert
  assert_eq!(response.status(), Status::Unauthorized);
}

#[test]
fn test_login_invalid_user() {
  // Arrange
  let client = common::get_client();

  // Act
  let response = login_user(&client);

  // Assert
  assert_eq!(response.status(), Status::Unauthorized);
}

#[test]
fn test_refresh() {
  // Arrange
  let client = common::get_client();
  let token = common::get_token(&client, "test_user");

  // Act
  let response = refresh_user(&client, token);

  // Assert
  assert_eq!(response.status(), Status::Ok);
}

fn register_user(client: &Client) -> LocalResponse {
  client.post("/auth/register")
    .body(r#"{"username":"test_user","password":"p@Assw0rd123"}"#)
    .dispatch()
}

fn login_user(client: &Client) -> LocalResponse {
  client.post("/auth/login")
    .body(r#"{"username":"test_user","password":"p@Assw0rd123"}"#)
    .dispatch()
}

fn refresh_user(client: &Client, token: String) -> LocalResponse {
  client.post("/auth/refresh")
    .header(Header::new("Authorization", token))
    .dispatch()
}
