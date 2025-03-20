mod common;

use common::*;
use rocket::http::Status;
use rocket::local::blocking::{Client, LocalResponse};

#[test]
fn test_list() {
  let client = get_client();
  let response = create_post(&client);

  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_create() {
  let client = get_client();
  let response = create_post(&client);

  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_read() {
  let client = get_client();
  let response = create_post(&client);

  let id = get_json(response)["id"].as_i64().expect("valid id");
  let response = read_post(&client, id);

  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_read_not_exist() {
  let client = get_client();

  let response = read_post(&client, 0);

  assert_eq!(response.status(), Status::NotFound);
}

#[test]
fn test_delete() {
  let client = get_client();
  let response = create_post(&client);

  let id = get_json(response)["id"].as_i64().expect("valid id");
  let response = delete_post(&client, id);

  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_delete_not_exist() {
  let client = get_client();

  let response = delete_post(&client, 0);

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

fn delete_post(client: &Client, id: i64) -> LocalResponse {
  client
    .delete(format!("/post/{}", id))
    .dispatch()
}
