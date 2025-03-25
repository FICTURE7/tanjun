# tanjun
A simple blog application written in rust and react.

## Running
The applcaition can be run on docker or on the host machine itself.

### Docker
To the application in docker, run the following command:

```bash
docker compose up -d
```

or

```bash
docker compose up --build --force-recreate -d
```

> [!NOTE]
> The frontend is built and statically served through an nginx server.

### Host
To run the application on the host machine itself, ideally for development.

In `frontend`:

```bash
npm run dev
```

In `backend`

```bash
cargo run
```

## Design
tanjun is a TypeScript-based Single Page Application (SPA) powered by Vite.js, React Router, and Tailwind CSS. It backend is a RESTful API built with Rust and Rocket.rs, with authentication and authorization managed through JWT tokens.