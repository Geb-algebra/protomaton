import { z } from "zod";

/**
 * Priority level for a task indicating importance or urgency.
 * Business rules:
 * - LOW: Tasks with minimal impact or urgency
 * - MEDIUM: Standard tasks with moderate importance
 * - HIGH: Critical tasks requiring immediate attention
 */
export const TaskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;

/**
 * Unique identifier for a task in the system.
 * Must be a non-empty string to ensure data integrity.
 */
export const TaskIdSchema = z.string().min(1).brand("TaskId");
export type TaskId = z.infer<typeof TaskIdSchema>;

/**
 * Core entity representing a single todo item that a user needs to complete.
 * Business constraints:
 * - Name is required and must be non-empty (primary identifier for users)
 * - Priority is mandatory to enable task organization
 * - Due date is required to support deadline management
 * - Completion status defaults to false when created
 * - Created and modified timestamps for audit trail
 */
export const TaskSchema = z.object({
	id: TaskIdSchema,
	name: z.string().min(1, "Task name is required"),
	priority: TaskPrioritySchema,
	dueDate: z.date(),
	isCompleted: z.boolean().default(false),
	createdAt: z.date(),
	modifiedAt: z.date(),
});
export type Task = z.infer<typeof TaskSchema>;

/**
 * Input schema for creating a new task.
 * Excludes system-generated fields (id, timestamps).
 */
export const CreateTaskInputSchema = z.object({
	name: z.string().min(1, "Task name is required"),
	priority: TaskPrioritySchema,
	dueDate: z.date(),
});
export type CreateTaskInput = z.infer<typeof CreateTaskInputSchema>;

/**
 * Input schema for updating an existing task.
 * All fields are optional to support partial updates.
 */
export const UpdateTaskInputSchema = z.object({
	name: z.string().min(1, "Task name is required").optional(),
	priority: TaskPrioritySchema.optional(),
	dueDate: z.date().optional(),
	isCompleted: z.boolean().optional(),
});
export type UpdateTaskInput = z.infer<typeof UpdateTaskInputSchema>;
