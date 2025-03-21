use rocket::Request;
use rocket::response::Response;
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;

pub struct Cors;

#[rocket::async_trait]
impl Fairing for Cors {
  fn info(&self) -> Info {
    Info {
      name: "Cross-Origin-Resource-Sharing enablement",
      kind: Kind::Response,
    }
  }
  
  async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
    response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
    response.set_header(Header::new("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET"));
    response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
    response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
  }
}
