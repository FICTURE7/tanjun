pub mod post {
  use crate::models::Post;

  pub fn list() -> Vec<Post> {
    vec![
      Post {
        id: 1,
        title: "Hello, world!".to_string(),
        content: "Hello, world!".to_string(),
      }
    ]
  }

  pub fn create(post: Post) -> Post {
    post
  }

  pub fn update(id: u64, post: Post) -> Post {
    post
  }

  pub fn retrieve(id: u64) -> Post {
    crate::models::Post {
      id: id,
      title: "Hello, world!".to_string(),
      content: "Hello, world!".to_string(),
    }
  }

  pub fn delete(id: u64) -> Post {
    crate::models::Post {
      id: id,
      title: "Hello, world!".to_string(),
      content: "Hello, world!".to_string(),
    }
  }
}
