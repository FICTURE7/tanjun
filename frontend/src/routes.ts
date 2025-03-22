import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home/HomePage.tsx"),
  route("login", "pages/login/LoginPage.tsx"),
  route("register", "pages/register/RegisterPage.tsx"),
  route("post/:id", "pages/post/PostPage.tsx"),
  route("post/new", "pages/post-new/PostNewPage.tsx"),
  route("post/edit/:id", "pages/post-edit/PostEditPage.tsx")
] satisfies RouteConfig;
