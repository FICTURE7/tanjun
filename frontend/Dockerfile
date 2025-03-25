
FROM node:20-alpine AS builder

ARG API_URL="http://localhost:8000"
ENV VITE_API_URL=$API_URL

WORKDIR /build
COPY . ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci
RUN npm run build

FROM nginx:1.27.4-alpine
COPY --from=builder /build/build/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]