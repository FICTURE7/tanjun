mod common;

use common::*;
use rocket::http::Status;
use rocket::local::blocking::{Client, LocalResponse};

#[test]
fn test_create() {
  // Arrange
  setup();
  let client = get_client();

  // Act
  let response = create_post(&client);

  // Assert
  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_read() {
  // Arrange
  setup();
  let client = get_client();
  let response = create_post(&client);
  let id = get_json(response)["id"].as_i64().expect("valid id");

  // Act
  let response = read_post(&client, id);

  // Assert
  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_read_all() {
  // Arrange
  setup();
  let client = get_client();
  let response = create_post(&client);

  // Act
  // TODO: Implement.

  // Assert
  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_read_not_exist() {
  // Arrange
  setup();
  let client = get_client();

  // Act
  let response = read_post(&client, 0);

  // Assert
  assert_eq!(response.status(), Status::NotFound);
}

#[test]
fn test_update() {
  // Arrange
  setup();
  let client = get_client();
  let response = create_post(&client);
  let id = get_json(response)["id"].as_i64().expect("valid id");

  // Act
  let response = update_post(&client, id);

  // Assert
  assert_eq!(response.status(), Status::Ok);

  let json = get_json(response);
  let title = json["title"].as_str().expect("valid title");

  assert_eq!(title, "updated post title");
}

#[test]
fn test_update_not_exist() {
  // Arrange
  setup();
  let client = get_client();

  // Act
  let response = update_post(&client, 0);

  // Assert
  assert_eq!(response.status(), Status::NotFound);
}

#[test]
fn test_delete() {
  // Arrange
  setup();
  let client = get_client();
  let response = create_post(&client);
  let id = get_json(response)["id"].as_i64().expect("valid id");

  // Act
  let response = delete_post(&client, id);

  // Assert
  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_delete_not_exist() {
  // Arrange
  setup();
  let client = get_client();

  // Act
  let response = delete_post(&client, 0);

  // Assert
  assert_eq!(response.status(), Status::NotFound);
}

fn create_post(client: &Client) -> LocalResponse {
  client
    .post("/post")
    .body(r#"{"title":"post title","content":"post content"}"#)
    .dispatch()
}

fn read_post(client: &Client, id: i64) -> LocalResponse {
  client
    .get(format!("/post/{}", id))
    .dispatch()
}

fn update_post(client: &Client, id: i64) -> LocalResponse {
  client
    .put(format!("/post/{}", id))
    .body(r#"{"title":"updated post title","content":"post content"}"#)
    .dispatch()
}

fn delete_post(client: &Client, id: i64) -> LocalResponse {
  client
    .delete(format!("/post/{}", id))
    .dispatch()
}
