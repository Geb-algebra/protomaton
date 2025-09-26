import { index, route } from "@react-router/dev/routes";

export default [
	index("./features/example/index.tsx"), 
	route("robots.txt", "./features/other/robots.tsx"),
	route("todos", "./features/todo/list.tsx"),
	route("todos/new", "./features/todo/new.tsx"),
	route("todos/:id", "./features/todo/detail.tsx"),
];
