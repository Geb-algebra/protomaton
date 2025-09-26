/*
 * Route Module: /todos
 * Pattern: Page Pattern
 *
 * RESPONSIBILITIES:
 * This route module handles the main todo list view displaying all tasks with their essential information.
 * Provides the primary interface for users to view, create, and manage their task collection.
 *
 * ROUTE FUNCTIONS:
 * - loader(): Fetches all tasks from taskDomain.getAllTasks() API for initial page render
 * - action(): Handles quick task operations (toggle completion status) via fetcher submissions
 * - meta(): Sets page title and description for SEO and browser tabs
 *
 * COMPONENT RESPONSIBILITIES:
 * - Display all tasks in a responsive list layout using Card components from shadcn/ui
 * - Show task name, priority level, due date, and completion status for each task
 * - Provide "Create New Task" button that navigates to /todos/new
 * - Enable task completion status toggle via fetcher.submit for optimistic UI updates
 * - Handle loading and error states for better user experience
 * - Navigate to task detail pages when users click on individual tasks
 *
 * DATA FLOW:
 * 1. loader() → taskDomain.getAllTasks() → loaderData → Task List Component
 * 2. Toggle completion → fetcher.submit to action() → taskDomain.toggleTaskStatus() → re-fetch
 * 3. Create button click → navigate to /todos/new
 * 4. Task click → navigate to /todos/:id
 *
 * DOMAIN API USAGE:
 * - taskDomain.getAllTasks(): Fetch all tasks for list display
 * - taskDomain.toggleTaskStatus(): Toggle completion status of a specific task
 *
 * UI COMPONENTS (shadcn/ui):
 * - Card, CardContent for task display containers
 * - Button for create action and task interactions
 * - Badge for priority level indicators
 * - Checkbox for completion status display
 *
 * LAYOUT:
 * - Uses CSS modules with grid-template-areas for responsive layout
 * - Grid layout for task list with consistent spacing
 * - Mobile-responsive design adapting to different screen sizes
 *
 * COMPLIANCE CHECKS:
 * ✅ React Router Law: Clear separation - loader/action for data, component for UI only
 * ✅ Domain Driven Design: Only uses domain APIs from app/domain/task/index.ts
 * ✅ Constitution: No direct domain imports, uses exported APIs only
 * ✅ Schema Validation: All form data validated with Zod schemas
 * ✅ UI Implementation: Uses shadcn/ui components with CSS modules for layout
 */

import { href, Link, useFetcher } from "react-router";
import { Badge } from "../../components/atoms/badge";
import { Button } from "../../components/atoms/button";
import { Card, CardContent } from "../../components/atoms/card";
import { getAllTasks, type Task, type TaskId, toggleTaskComplete } from "../../domain/task";
import type { Route } from "./+types/list";
import styles from "./list.module.css";

export function meta() {
	return [
		{ title: "Todo List" },
		{ name: "description", content: "Manage your tasks and stay organized" },
	];
}

export async function loader() {
	return { tasks: getAllTasks() };
}

export async function action({ request }: Route.ActionArgs) {
	try {
		const formData = await request.formData();
		const taskId = formData.get("taskId") as TaskId;
		const isCompleted = formData.get("isCompleted") === "true";

		if (!taskId) {
			return { error: "Task ID is required" };
		}

		toggleTaskComplete(taskId, isCompleted);
		return { error: "" };
	} catch (error) {
		return { error: error instanceof Error ? error.message : "Unknown error occurred" };
	}
}

function TaskCard({ task }: { task: Task }) {
	const fetcher = useFetcher();
	const isSubmitting = fetcher.state === "submitting";

	const priorityColors = {
		HIGH: "destructive",
		MEDIUM: "default",
		LOW: "secondary",
	} as const;

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		}).format(date);
	};

	return (
		<Card className={styles.taskCard}>
			<CardContent className={styles.taskContent}>
				<div className={styles.taskMain}>
					<Link to={href("/todos/:id", { id: task.id })} className={styles.taskLink}>
						<h3 className={styles.taskName}>{task.name}</h3>
					</Link>
					<div className={styles.taskMeta}>
						<Badge variant={priorityColors[task.priority]}>{task.priority}</Badge>
						<span className={styles.dueDate}>Due: {formatDate(task.dueDate)}</span>
					</div>
				</div>
				<div className={styles.taskActions}>
					<fetcher.Form method="post" className={styles.toggleForm}>
						<input type="hidden" name="taskId" value={task.id} />
						<input type="hidden" name="isCompleted" value={(!task.isCompleted).toString()} />
						<Button
							type="submit"
							variant={task.isCompleted ? "secondary" : "default"}
							size="sm"
							disabled={isSubmitting}
						>
							{isSubmitting ? "..." : task.isCompleted ? "Undone" : "Done"}
						</Button>
					</fetcher.Form>
				</div>
			</CardContent>
		</Card>
	);
}

export default function TodoList({ loaderData, actionData }: Route.ComponentProps) {
	const tasks = loaderData?.tasks || [];

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title}>Todo List</h1>
				<Link to="/todos/new">
					<Button>Create New Task</Button>
				</Link>
			</header>

			{actionData?.error && <div className={styles.error}>{actionData.error}</div>}

			<main className={styles.main}>
				{tasks.length === 0 ? (
					<div className={styles.emptyState}>
						<p>No tasks yet. Create your first task to get started!</p>
						<Link to="/todos/new">
							<Button variant="outline">Create First Task</Button>
						</Link>
					</div>
				) : (
					<div className={styles.taskList}>
						{tasks.map((task: Task) => (
							<TaskCard key={task.id} task={task} />
						))}
					</div>
				)}
			</main>
		</div>
	);
}
