use rocket::serde::{Serialize, Deserialize};
use chrono::{DateTime, Utc};

use crate::models::user::User;

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
