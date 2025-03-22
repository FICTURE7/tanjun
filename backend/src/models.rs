use chrono::{DateTime, Utc};
use rocket::serde::{Serialize, Deserialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct User {
  pub id: i64,
  pub username: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct RegisterUser {
  pub username: String,
  pub password: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct LoginUser {
  pub username: String,
  pub password: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Post {
  pub id: i64,
  pub title: String,
  pub content: String,
  pub created_at: DateTime<Utc>,
  pub updated_at: Option<DateTime<Utc>>,
  pub author: User,
}

#[derive(Clone, Debug, Deserialize)]
pub struct NewPost {
  pub title: String,
  pub content: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct UpdatePost {
  pub title: String,
  pub content: String,
}
