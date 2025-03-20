use rocket;
use tanjun_backend;

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
  tanjun_backend::rocket().launch().await?;
  Ok(())
}
