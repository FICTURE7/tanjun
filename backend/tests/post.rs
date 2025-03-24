mod common;

use rocket::http::{Status, Header};
use rocket::local::blocking::{Client, LocalResponse};

#[test]
fn test_create() {
  // Arrange
  common::setup();
  let client = common::get_client();
  let token = common::get_token(&client);

  // Act
  let response = create_post(&client, &token);

  // Assert
  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_read() {
  // Arrange
  common::setup();
  let client = common::get_client();
  let token = common::get_token(&client);
  let response = create_post(&client, &token);
  let id = common::get_json(response)["id"].as_i64().expect("valid id");

  // Act
  let response = read_post(&client, id);

  // Assert
  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_read_all() {
  // Arrange
  common::setup();
  let client = common::get_client();
  let token = common::get_token(&client);
  for _ in 0..5 {
    let response = create_post(&client, &token);

    assert_eq!(response.status(), Status::Ok);
  }

  // Act
  let response = read_paged_post(&client);

  // Assert
  assert_eq!(response.status(), Status::Ok);

  let json = common::get_json(response);
  let array = json.as_array().expect("valid array");

  assert_eq!(array.len(), 5);
}

#[test]
fn test_read_not_exist() {
  // Arrange
  common::setup();
  let client = common::get_client();

  // Act
  let response = read_post(&client, 0);

  // Assert
  assert_eq!(response.status(), Status::NotFound);
}

#[test]
fn test_update() {
  // Arrange
  common::setup();
  let client = common::get_client();
  let token = common::get_token(&client);
  let response = create_post(&client, &token);
  let id = common::get_json(response)["id"].as_i64().expect("valid id");

  // Act
  let response = update_post(&client, &token, id);

  // Assert
  assert_eq!(response.status(), Status::Ok);

  let json = common::get_json(response);
  let title = json["title"].as_str().expect("valid title");

  assert_eq!(title, "updated post title");
}

#[test]
fn test_update_not_exist() {
  // Arrange
  common::setup();
  let client = common::get_client();
  let token = common::get_token(&client);

  // Act
  let response = update_post(&client, &token, 0);

  // Assert
  assert_eq!(response.status(), Status::NotFound);
}

#[test]
fn test_delete() {
  // Arrange
  common::setup();
  let client = common::get_client();
  let token = common::get_token(&client);
  let response = create_post(&client, &token);
  let id = common::get_json(response)["id"].as_i64().expect("valid id");

  // Act
  let response = delete_post(&client, &token, id);

  // Assert
  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_delete_not_exist() {
  // Arrange
  common::setup();
  let client = common::get_client();
  let token = common::get_token(&client);

  // Act
  let response = delete_post(&client, &token, 0);

  // Assert
  assert_eq!(response.status(), Status::NotFound);
}

fn create_post<'a>(client: &'a Client, token: &'a String) -> LocalResponse<'a> {
  client
    .post("/post")
    .header(Header::new("Authorization", token.clone()))
    .body(r#"{"title":"post title","content":"post content"}"#)
    .dispatch()
}

fn read_post(client: &Client, id: i64) -> LocalResponse {
  client
    .get(format!("/post/{}", id))
    .dispatch()
}

fn read_paged_post(client: &Client) -> LocalResponse {
  client
    .get("/post")
    .dispatch()
}

fn update_post<'a>(client: &'a Client, token: &'a String, id: i64) -> LocalResponse<'a> {
  client
    .put(format!("/post/{}", id))
    .header(Header::new("Authorization", token.clone()))
    .body(r#"{"title":"updated post title","content":"post content"}"#)
    .dispatch()
}

fn delete_post<'a>(client: &'a Client, token: &'a String, id: i64) -> LocalResponse<'a> {
  client
    .delete(format!("/post/{}", id))
    .header(Header::new("Authorization", token.clone()))
    .dispatch()
}
