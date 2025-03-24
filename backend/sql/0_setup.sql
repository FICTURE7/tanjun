CREATE TABLE users(
  id            INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  username      TEXT UNIQUE NOT NULL,
  password_hash BINARY(32) NOT NULL,
  password_salt BINARY(16) NOT NULL
);

CREATE TABLE posts(
  id            INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  title         TEXT NOT NULL,
  content       TEXT NOT NULL,
  author_id     INTEGER NOT NULL,
  created_at    DATETIME NOT NULL,
  updated_at    DATETIME,

  FOREIGN KEY (author_id) REFERENCES users(id)
);
