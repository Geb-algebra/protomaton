/*
 * Route Module: /todos/:id
 * Pattern: Page Pattern
 *
 * RESPONSIBILITIES:
 * This route module handles individual task detail view with full CRUD capabilities.
 * Provides comprehensive task management interface for viewing, editing, and deleting tasks.
 *
 * ROUTE FUNCTIONS:
 * - loader(): Fetches specific task data by ID from taskDomain.getTaskById()
 * - action(): Processes task updates and deletions with proper validation
 * - meta(): Sets dynamic page title based on task name for better user context
 *
 * COMPONENT RESPONSIBILITIES:
 * - Display task details in an editable form with current values pre-populated
 * - Show all task fields: name, priority, due date, completion status, timestamps
 * - Enable inline editing of task properties with immediate validation feedback
 * - Provide save, cancel, and delete action buttons with appropriate confirmations
 * - Handle loading states while fetching task data or processing updates
 * - Display error messages for validation failures or operation errors
 * - Navigate back to task list after successful operations
 *
 * DATA FLOW:
 * 1. loader() → taskDomain.getTaskById(id) → loaderData → Task Detail Component
 * 2. Edit form submission → action() → Validate UpdateTaskFormSchema → taskDomain.updateTask()
 * 3. Delete action → action() → taskDomain.deleteTask() → Redirect to /todos
 * 4. Success → Re-render with updated data | Redirect → Error → Show error message
 *
 * DOMAIN API USAGE:
 * - taskDomain.getTaskById(): Fetch specific task data for detail view
 * - taskDomain.updateTask(): Update task with validated changes
 * - taskDomain.deleteTask(): Permanently remove task from system
 *
 * FORM VALIDATION:
 * - Uses Zod schema for form input validation (defined in this route module)
 * - All fields are optional for partial updates (following UpdateTaskInput pattern)
 * - Name: Optional string with minimum length when provided
 * - Priority: Optional enum validation for LOW/MEDIUM/HIGH
 * - Due Date: Optional date validation
 * - Completion Status: Boolean toggle for done/undone state
 *
 * UI COMPONENTS (shadcn/ui):
 * - Card for task detail container
 * - Form components for structured editing layout
 * - Input for task name editing
 * - Select for priority level modification
 * - Date picker for due date updates
 * - Checkbox/Switch for completion status toggle
 * - Button group for save/cancel/delete actions
 * - Dialog for delete confirmation
 * - Alert for error message display
 *
 * LAYOUT:
 * - Uses CSS modules with grid-template-areas for detail view layout
 * - Responsive design with clear visual hierarchy
 * - Form fields grouped logically with proper spacing
 * - Action buttons positioned for easy access and clear intent
 *
 * ERROR HANDLING:
 * - 404 handling when task ID doesn't exist
 * - Validation error display for each form field
 * - Domain-level error handling (storage failures, conflicts)
 * - User confirmation for destructive actions (delete)
 * - Network error handling with retry options
 *
 * NAVIGATION:
 * - Back button to return to task list (/todos)
 * - Automatic redirect after successful delete operation
 * - Breadcrumb navigation showing current location
 *
 * COMPLIANCE CHECKS:
 * ✅ React Router Law: loader/action handle data, component handles UI only
 * ✅ React Router Law: Uses <Form> for submissions with proper validation
 * ✅ React Router Law: Form validation schema defined in route module
 * ✅ React Router Law: Error handling with detailed user feedback
 * ✅ Domain Driven Design: Only uses taskDomain APIs from index.ts export
 * ✅ Constitution: No direct domain imports, follows API patterns
 * ✅ Schema Validation: All form data validated with Zod schemas
 * ✅ UI Implementation: Uses shadcn/ui components with CSS modules for layout
 */

import { data, Form, Link, redirect } from "react-router";
import { z } from "zod";
import { Alert, AlertDescription } from "../../components/atoms/alert";
import { Badge } from "../../components/atoms/badge";
import { Button } from "../../components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/atoms/card";
import { Input } from "../../components/atoms/input";
import { Label } from "../../components/atoms/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/atoms/select";
import { deleteTask, getTaskById, type Task, type TaskId, updateTask } from "../../domain/task";
import type { Route } from "./+types/detail";
import styles from "./detail.module.css";

// Form validation schema for task updates
const UpdateTaskFormSchema = z.object({
	name: z.string().min(1, "Task name is required").optional(),
	priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
	dueDate: z
		.string()
		.transform((val) => (val ? new Date(val) : undefined))
		.optional(),
	isCompleted: z.coerce.boolean().optional(),
	_action: z.enum(["update", "delete"]),
});

export function meta({ data }: Route.MetaArgs) {
	const task = data?.task as Task | null;
	return [
		{ title: task ? `Task: ${task.name}` : "Task Details" },
		{ name: "description", content: "View and edit task details" },
	];
}

export async function loader({ params }: Route.LoaderArgs) {
	const taskId = params.id as TaskId;
	const task = getTaskById(taskId);

	if (!task) {
		throw data("Task not found", { status: 404 });
	}

	return { task };
}

export async function action({ request, params }: Route.ActionArgs) {
	try {
		const taskId = params.id as TaskId;
		const formData = await request.formData();

		const rawData = {
			name: formData.get("name") as string,
			priority: formData.get("priority") as "LOW" | "MEDIUM" | "HIGH",
			dueDate: formData.get("dueDate") as string,
			isCompleted: formData.has("isCompleted"),
			_action: formData.get("_action") as "update" | "delete",
		};

		const validatedData = UpdateTaskFormSchema.parse(rawData);

		if (validatedData._action === "delete") {
			deleteTask(taskId);
			return redirect("/todos");
		}

		if (validatedData._action === "update") {
			const updates: {
				name?: string;
				priority?: "LOW" | "MEDIUM" | "HIGH";
				dueDate?: Date;
				isCompleted?: boolean;
			} = {};
			if (validatedData.name) updates.name = validatedData.name;
			if (validatedData.priority) updates.priority = validatedData.priority;
			if (validatedData.dueDate) updates.dueDate = validatedData.dueDate;
			if (validatedData.isCompleted !== undefined) updates.isCompleted = validatedData.isCompleted;

			updateTask(taskId, updates);
			return { error: "", success: "Task updated successfully!" };
		}

		return { error: "Invalid action" };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				error: error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
			};
		}
		return {
			error: error instanceof Error ? error.message : "Unknown error occurred",
		};
	}
}

export default function TaskDetail({ loaderData, actionData }: Route.ComponentProps) {
	const task = loaderData?.task as Task;

	if (!task) {
		return (
			<div className={styles.container}>
				<div className={styles.error}>Task not found</div>
			</div>
		);
	}

	const formatDateForInput = (date: Date) => {
		return date.toISOString().split("T")[0];
	};

	const formatDateForDisplay = (date: Date) => {
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(date);
	};

	const priorityColors = {
		HIGH: "destructive",
		MEDIUM: "default",
		LOW: "secondary",
	} as const;

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<Link to="/todos" className={styles.backLink}>
					← Back to Todo List
				</Link>
			</header>

			<main className={styles.main}>
				<Card className={styles.detailCard}>
					<CardHeader className={styles.cardHeader}>
						<div className={styles.titleRow}>
							<CardTitle>Task Details</CardTitle>
							<Badge variant={priorityColors[task.priority]}>{task.priority}</Badge>
						</div>
						<div className={styles.metadata}>
							<span>Created: {formatDateForDisplay(new Date(task.createdAt))}</span>
							<span>Modified: {formatDateForDisplay(new Date(task.modifiedAt))}</span>
						</div>
					</CardHeader>
					<CardContent>
						{actionData?.error && (
							<Alert className={styles.errorAlert}>
								<AlertDescription>{actionData.error}</AlertDescription>
							</Alert>
						)}

						{actionData?.success && (
							<Alert className={styles.successAlert}>
								<AlertDescription>{actionData.success}</AlertDescription>
							</Alert>
						)}

						<Form method="post" className={styles.form}>
							<div className={styles.field}>
								<Label htmlFor="name">Task Name</Label>
								<Input id="name" name="name" type="text" required defaultValue={task.name} />
							</div>

							<div className={styles.field}>
								<Label htmlFor="priority">Priority</Label>
								<Select name="priority" defaultValue={task.priority} required>
									<SelectTrigger id="priority">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="LOW">Low</SelectItem>
										<SelectItem value="MEDIUM">Medium</SelectItem>
										<SelectItem value="HIGH">High</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className={styles.field}>
								<Label htmlFor="dueDate">Due Date</Label>
								<Input
									id="dueDate"
									name="dueDate"
									type="date"
									required
									defaultValue={formatDateForInput(new Date(task.dueDate))}
								/>
							</div>

							<div className={styles.checkboxField}>
								<input
									id="isCompleted"
									name="isCompleted"
									type="checkbox"
									defaultChecked={task.isCompleted}
									className={styles.checkbox}
								/>
								<Label htmlFor="isCompleted" className={styles.checkboxLabel}>
									Mark as completed
								</Label>
							</div>

							<div className={styles.actions}>
								<Button type="submit" name="_action" value="update">
									Save Changes
								</Button>
								<Link to="/todos">
									<Button type="button" variant="outline">
										Cancel
									</Button>
								</Link>
								<Button
									type="submit"
									name="_action"
									value="delete"
									variant="destructive"
									onClick={(e) => {
										if (
											!confirm(
												"Are you sure you want to delete this task? This action cannot be undone.",
											)
										) {
											e.preventDefault();
										}
									}}
								>
									Delete Task
								</Button>
							</div>
						</Form>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
