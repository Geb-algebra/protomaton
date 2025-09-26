import { Task } from "./models";

/**
 * **Purpose**: Applies business rules when toggling task completion status
 * **Inputs**: Task entity and desired completion status
 * **Logic**: Updates completion status and modifies timestamp
 * **Outputs**: Task with updated completion status and modification timestamp
 * **Constraints**: Task must exist and modification timestamp must be current
 */
export const toggleTaskCompletion = (task: Task, isCompleted: boolean): Task => {
	return {
		...task,
		isCompleted,
		modifiedAt: new Date(),
	};
};

/**
 * **Purpose**: Validates business rules for task updates
 * **Inputs**: Original task and update data
 * **Logic**: Ensures modification timestamp is updated for any change
 * **Outputs**: Task with applied updates and current modification timestamp
 * **Constraints**: At least one field must be updated, name cannot be empty if provided
 */
export const updateTaskWithValidation = (
	originalTask: Task,
	updates: Partial<Pick<Task, "name" | "priority" | "dueDate" | "isCompleted">>
): Task => {
	const hasChanges = Object.keys(updates).length > 0;
	if (!hasChanges) {
		return originalTask;
	}

	return {
		...originalTask,
		...updates,
		modifiedAt: new Date(),
	};
};
