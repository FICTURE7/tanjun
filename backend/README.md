# tanjun-backend
The backend of tanjun written in rust using rocket.

#### Pre-requisites
The backend is written in rust and as such rust is a pre-requisite.

## Building
To build, simply run the following command.

On bash and batch:
```bash
cargo build
```

## Testing
To run the tests, it is recommended to switch to the `test` profile by setting the `ROCKET_PROFILE` environment variable to `test`.

On bash:
```bash
ROCKET_PROFILE=test cargo test
```

On batch:
```batch
set ROCKET_PROFILE=test
cargo test
```