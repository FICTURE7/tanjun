import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home/HomePage.tsx"),
  route("post/:id", "pages/post/PostPage.tsx")
] satisfies RouteConfig;
