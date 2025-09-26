export { Task, TaskId, TaskPriority, CreateTaskInput, UpdateTaskInput } from "./models";

import { Task, TaskId, CreateTaskInput, UpdateTaskInput, CreateTaskInputSchema, UpdateTaskInputSchema } from "./models";
import { toggleTaskCompletion, updateTaskWithValidation } from "./services";

/**
 * **Purpose**: Creates a new task with validation and proper defaults
 * **Inputs**: Task creation data (name, priority, dueDate)
 * **Operation**: Validates input, generates ID and timestamps, creates task entity
 * **Outputs**: Newly created Task entity
 * **Usage Context**: When user creates a new todo item via UI forms
 */
export const createTask = (input: CreateTaskInput): Task => {
	const validatedInput = CreateTaskInputSchema.parse(input);
	const now = new Date();
	
	return {
		id: crypto.randomUUID() as TaskId,
		name: validatedInput.name,
		priority: validatedInput.priority,
		dueDate: validatedInput.dueDate,
		isCompleted: false,
		createdAt: now,
		modifiedAt: now,
	};
};

/**
 * **Purpose**: Retrieves all tasks for display in task list
 * **Inputs**: None
 * **Operation**: Fetches all tasks from repository
 * **Outputs**: Array of all Task entities
 * **Usage Context**: When displaying the main task list view
 */
export const getAllTasks = (): Task[] => {
	// Implementation will be added in lifecycle phase
	throw new Error("Not implemented - will be added in implementation phase");
};

/**
 * **Purpose**: Retrieves a specific task by its ID
 * **Inputs**: Task ID
 * **Operation**: Fetches single task from repository by ID
 * **Outputs**: Task entity or null if not found
 * **Usage Context**: When displaying task detail view or preparing for updates
 */
export const getTaskById = (id: TaskId): Task | null => {
	// Implementation will be added in lifecycle phase
	throw new Error("Not implemented - will be added in implementation phase");
};

/**
 * **Purpose**: Updates an existing task with validation
 * **Inputs**: Task ID and update data (partial task fields)
 * **Operation**: Retrieves task, applies business rule validation, saves updated task
 * **Outputs**: Updated Task entity
 * **Usage Context**: When user edits task details in the task detail view
 */
export const updateTask = (id: TaskId, updates: UpdateTaskInput): Task => {
	const validatedUpdates = UpdateTaskInputSchema.parse(updates);
	
	// Implementation will use repository to get/save task
	throw new Error("Not implemented - will be added in implementation phase");
};

/**
 * **Purpose**: Toggles task completion status with business logic
 * **Inputs**: Task ID and desired completion state
 * **Operation**: Retrieves task, applies completion toggle service, saves updated task
 * **Outputs**: Task with updated completion status
 * **Usage Context**: When user marks task as done/undone in list or detail view
 */
export const toggleTaskComplete = (id: TaskId, isCompleted: boolean): Task => {
	// Implementation will use repository and toggleTaskCompletion service
	throw new Error("Not implemented - will be added in implementation phase");
};

/**
 * **Purpose**: Permanently removes a task from the system
 * **Inputs**: Task ID
 * **Operation**: Removes task from repository
 * **Outputs**: Success confirmation (void)
 * **Usage Context**: When user deletes a task they no longer need
 */
export const deleteTask = (id: TaskId): void => {
	// Implementation will be added in lifecycle phase
	throw new Error("Not implemented - will be added in implementation phase");
};
