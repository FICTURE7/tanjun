// NOTE:
//
// This is needed by the sqlx::migrate! macro. If changes are made the `sql`
// directory, then cargo will not rebuild the crate. With change we make cargo
// aware of the `sql` directory [0].
//
// [0] https://docs.rs/sqlx/0.7.4/sqlx/macro.migrate.html.

fn main() {
  println!("cargo:rerun-if-changed=sql");
}
