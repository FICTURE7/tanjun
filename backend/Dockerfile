FROM rust:1.85.1 AS builder

WORKDIR /build
COPY . ./
RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/usr/local/cargo/git \
    --mount=type=cache,target=/build/target \
    cargo build --release && \
    cp target/release/tanjun-backend ./tanjun-backend

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=builder /build/tanjun-backend .
COPY --from=builder /build/Rocket.toml .

ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8000

EXPOSE 8000

CMD ["./tanjun-backend"]
