use rocket::serde::{Serialize, Deserialize};
use chrono::{DateTime, Utc};
use validator::{Validate};

use crate::models::user::{User};

#[derive(Debug, Serialize)]
pub struct Post {
  pub id: i64,
  pub title: String,
  pub content: String,
  pub created_at: DateTime<Utc>,
  pub updated_at: Option<DateTime<Utc>>,
  pub author: User,
}

#[derive(Debug, Validate, Deserialize)]
pub struct NewPost {
  #[validate(length(min=1, message=r#"must not be empty."#))]
  pub title: String,
  #[validate(length(min=1, message=r#"must not be empty."#))]
  pub content: String,
}

#[derive(Debug, Validate, Deserialize)]
pub struct UpdatePost {
  #[validate(length(min=1, message=r#"must not be empty."#))]
  pub title: String,
  #[validate(length(min=1, message=r#"must not be empty."#))]
  pub content: String,
}
