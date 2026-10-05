import { index, route, type RouteConfig } from "@react-router/dev/routes";
export default [
  index("pages/home/ui/home.page.tsx"),
  route("o-mnie", "pages/about/ui/about.page.tsx"),
  route("kontakt", "pages/contact/ui/contact.page.tsx"),
  route("gaming", "pages/gaming/ui/gaming.page.tsx"),
  route("projekty/:slug", "pages/project/ui/project.page.tsx"),
  route("*", "pages/not-found/ui/not-found.page.tsx"),
] satisfies RouteConfig;
