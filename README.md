# tanjun
A simple blog application written in rust and react.

## Running
The applcaition can be ran on docker or on the host machine itself.

### Docker
To the run application on docker, run the following command:

```bash
docker compose up -d
```

or

```bash
docker compose up --build --force-recreate -d
```

The application should be available at `http://localhost:8000/`

> [!NOTE]
> The frontend is built and statically served through an nginx server.

### Host
To run the application on the host machine itself, ideally for development.

In `backend`

```bash
cargo run
```

In `frontend`:

```bash
npm run dev
```

The application should available at address specified by Vite.js.

## Design
tanjun is a TypeScript-based Single Page Application (SPA) powered by vite.js, react router, and tailwindcss. Its backend is a RESTful API built with rust and rocket.rs, with authentication and authorization managed through JWT tokens. SQLite is used for persistance of server data.

## License

MIT License