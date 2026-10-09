import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("work/:slug", "routes/case-study.tsx"),
  route("cv", "routes/cv.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
