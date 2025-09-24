import { index, route } from "@react-router/dev/routes";

export default [
  index("./spec/example/index.tsx"),
  route("robots.txt", "./spec/other/robots.tsx"),
]