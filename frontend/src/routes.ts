import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home/HomePage.tsx"),
  route("login", "pages/login/LoginPage.tsx"),
  route("register", "pages/register/RegisterPage.tsx"),
  route("post/:id", "pages/post/PostPage.tsx"),
  route("post-create/", "pages/post-create/PostCreatePage.tsx")
] satisfies RouteConfig;
