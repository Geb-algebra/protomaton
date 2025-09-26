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

import type { Route } from "./+types/new";
import { z } from "zod";

// Form validation schema for new task creation
const CreateTaskFormSchema = z.object({
	name: z.string().min(1, "Task name is required"),
	priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
		errorMap: () => ({ message: "Priority is required" })
	}),
	dueDate: z.string().min(1, "Due date is required").transform((val) => new Date(val))
});

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Create New Task" },
		{ name: "description", content: "Create a new task with name, priority, and due date" },
	];
}

export async function action({ request }: Route.ActionArgs) {
    // TODO: Implement task creation with form validation and taskDomain.createTask()
    return { error: "" };
}

export default function NewTask({ actionData }: Route.ComponentProps) {
    // TODO: Implement new task creation form with validation feedback
    return null;
}