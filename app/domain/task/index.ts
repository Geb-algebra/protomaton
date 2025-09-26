export type { CreateTaskInput, Task, TaskId, TaskPriority, UpdateTaskInput } from "./models";

import { TaskFactory, TaskRepository } from "./lifecycle";
import type { CreateTaskInput, Task, TaskId, UpdateTaskInput } from "./models";
import { CreateTaskInputSchema, UpdateTaskInputSchema } from "./models";
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

	const task = TaskFactory.create({
		name: validatedInput.name,
		priority: validatedInput.priority,
		dueDate: validatedInput.dueDate,
	});

	TaskRepository.save(task);
	return task;
};

/**
 * **Purpose**: Retrieves all tasks for display in task list
 * **Inputs**: None
 * **Operation**: Fetches all tasks from repository
 * **Outputs**: Array of all Task entities
 * **Usage Context**: When displaying the main task list view
 */
export const getAllTasks = (): Task[] => {
	return TaskRepository.get();
};

/**
 * **Purpose**: Retrieves a specific task by its ID
 * **Inputs**: Task ID
 * **Operation**: Fetches single task from repository by ID
 * **Outputs**: Task entity or null if not found
 * **Usage Context**: When displaying task detail view or preparing for updates
 */
export const getTaskById = (id: TaskId): Task | null => {
	return TaskRepository.getById(id);
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

	const existingTask = TaskRepository.getById(id);
	if (!existingTask) {
		throw new Error(`Task with ID ${id} not found`);
	}

	const updatedTask = updateTaskWithValidation(existingTask, validatedUpdates);
	TaskRepository.save(updatedTask);
	return updatedTask;
};

/**
 * **Purpose**: Toggles task completion status with business logic
 * **Inputs**: Task ID and desired completion state
 * **Operation**: Retrieves task, applies completion toggle service, saves updated task
 * **Outputs**: Task with updated completion status
 * **Usage Context**: When user marks task as done/undone in list or detail view
 */
export const toggleTaskComplete = (id: TaskId, isCompleted: boolean): Task => {
	const existingTask = TaskRepository.getById(id);
	if (!existingTask) {
		throw new Error(`Task with ID ${id} not found`);
	}

	const updatedTask = toggleTaskCompletion(existingTask, isCompleted);
	TaskRepository.save(updatedTask);
	return updatedTask;
};

/**
 * **Purpose**: Permanently removes a task from the system
 * **Inputs**: Task ID
 * **Operation**: Removes task from repository
 * **Outputs**: Success confirmation (void)
 * **Usage Context**: When user deletes a task they no longer need
 */
export const deleteTask = (id: TaskId): void => {
	TaskRepository.delete(id);
};
