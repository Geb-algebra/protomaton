/*
 * Route Module: /todos/new
 * Pattern: Page Pattern
 *
 * RESPONSIBILITIES:
 * This route module provides a form interface for creating new tasks.
 * Handles task creation workflow with proper validation and user feedback.
 *
 * ROUTE FUNCTIONS:
 * - action(): Processes new task creation form submissions with validation
 * - meta(): Sets page title and description for the new task creation page
 *
 * COMPONENT RESPONSIBILITIES:
 * - Display task creation form with fields: name (text), priority (select), due date (date)
 * - Validate all form inputs using Zod schemas before submission
 * - Show validation errors for invalid inputs with user-friendly messages
 * - Display success/error feedback after form submission
 * - Provide navigation back to task list upon successful creation or cancellation
 * - Handle form state management using native HTML form capabilities
 *
 * DATA FLOW:
 * 1. User fills form → Form submission → action() receives FormData
 * 2. action() → Validate with CreateTaskFormSchema → taskDomain.createTask()
 * 3. Success → Redirect to /todos → Error → Return error message → Display to user
 *
 * DOMAIN API USAGE:
 * - taskDomain.createTask(): Create new task with validated input data
 *
 * FORM VALIDATION:
 * - Uses Zod schema for form input validation (defined in this route module)
 * - Name: Required, non-empty string with minimum length validation
 * - Priority: Must be one of LOW, MEDIUM, HIGH enum values
 * - Due Date: Required date field, allows future dates
 *
 * UI COMPONENTS (shadcn/ui):
 * - Form components for structured form layout
 * - Input for task name field
 * - Select for priority level selection
 * - Date picker (or HTML date input) for due date
 * - Button for submit and cancel actions
 * - Alert/Toast for error message display
 *
 * LAYOUT:
 * - Uses CSS modules with grid-template-areas for form layout
 * - Responsive design with proper field spacing and alignment
 * - Clear visual hierarchy with labels and validation feedback
 *
 * ERROR HANDLING:
 * - Returns detailed error messages for validation failures
 * - Handles domain-level errors (e.g., storage failures)
 * - Provides user-friendly error descriptions for all failure scenarios
 *
 * COMPLIANCE CHECKS:
 * ✅ React Router Law: action() handles data operations, component handles UI only
 * ✅ React Router Law: Uses <Form> for submission, not manual event handlers
 * ✅ React Router Law: Form validation schema defined in route module
 * ✅ Domain Driven Design: Only uses taskDomain APIs, no direct domain imports
 * ✅ Constitution: Follows domain API usage patterns from app/domain/task/index.ts
 * ✅ Schema Validation: All form inputs validated with Zod schemas
 * ✅ UI Implementation: Uses shadcn/ui components with CSS modules for layout
 */

import { Form, href, Link, redirect } from "react-router";
import { z } from "zod";
import { Alert, AlertDescription } from "../../components/atoms/alert";
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
import { createTask } from "../../domain/task";
import type { Route } from "./+types/new";
import styles from "./new.module.css";

// Form validation schema for new task creation
const CreateTaskFormSchema = z.object({
	name: z.string().min(1, "Task name is required"),
	priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
		message: "Priority is required",
	}),
	dueDate: z
		.string()
		.min(1, "Due date is required")
		.transform((val) => new Date(val)),
});

export function meta() {
	return [
		{ title: "Create New Task" },
		{ name: "description", content: "Create a new task with name, priority, and due date" },
	];
}

export async function action({ request }: Route.ActionArgs) {
	try {
		const formData = await request.formData();
		const rawData = {
			name: formData.get("name") as string,
			priority: formData.get("priority") as "LOW" | "MEDIUM" | "HIGH",
			dueDate: formData.get("dueDate") as string,
		};

		const validatedData = CreateTaskFormSchema.parse(rawData);

		createTask({
			name: validatedData.name,
			priority: validatedData.priority,
			dueDate: validatedData.dueDate,
		});

		return redirect("/todos");
	} catch (error) {
		if (error instanceof z.ZodError) {
			const formData = await request.formData();
			return {
				error: error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
				values: {
					name: (formData.get("name") as string) || "",
					priority: (formData.get("priority") as string) || "",
					dueDate: (formData.get("dueDate") as string) || "",
				},
			};
		}
		return {
			error: error instanceof Error ? error.message : "Unknown error occurred",
			values: {
				name: "",
				priority: "",
				dueDate: "",
			},
		};
	}
}

export default function NewTask({ actionData }: Route.ComponentProps) {
	const formatDateForInput = () => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow.toISOString().split("T")[0];
	};

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<Link to="/todos" className={styles.backLink}>
					← Back to Todo List
				</Link>
			</header>

			<main className={styles.main}>
				<Card className={styles.formCard}>
					<CardHeader>
						<CardTitle>Create New Task</CardTitle>
					</CardHeader>
					<CardContent>
						{actionData?.error && (
							<Alert className={styles.errorAlert}>
								<AlertDescription>{actionData.error}</AlertDescription>
							</Alert>
						)}

						<Form method="post" className={styles.form}>
							<div className={styles.field}>
								<Label htmlFor="name">Task Name</Label>
								<Input
									id="name"
									name="name"
									type="text"
									required
									placeholder="Enter task name..."
									defaultValue={actionData?.values?.name || ""}
								/>
							</div>

							<div className={styles.field}>
								<Label htmlFor="priority">Priority</Label>
								<Select name="priority" defaultValue={actionData?.values?.priority || ""} required>
									<SelectTrigger id="priority">
										<SelectValue placeholder="Select priority level" />
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
									defaultValue={actionData?.values?.dueDate || formatDateForInput()}
								/>
							</div>

							<div className={styles.actions}>
								<Button type="submit">Create Task</Button>
								<Link to="/todos">
									<Button type="button" variant="outline">
										Cancel
									</Button>
								</Link>
							</div>
						</Form>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
