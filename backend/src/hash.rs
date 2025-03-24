use rand::Rng;
use sha2::{Sha256, Digest};

pub fn generate_salt() -> Vec<u8> {
  let salt: [u8; 16] = rand::rng().random();
  salt.to_vec()
}

pub fn generate_hash(password: &String, salt: &Vec<u8>) -> Vec<u8>{
  let hash = Sha256::digest([password.as_bytes(), salt].concat());
  hash.to_vec()
}
