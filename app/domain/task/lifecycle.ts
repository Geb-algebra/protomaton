import type { Task, TaskId } from "./models";

/**
 * Repository for Task entity storage operations.
 * Handles CRUD operations with localStorage as the storage mechanism.
 * Follows Domain Driven Design pattern with static methods for get/save/delete only.
 */
export class TaskRepository {
	private static readonly STORAGE_KEY = "todo-tasks";

	/**
	 * Retrieves all tasks from storage
	 */
	static get(): Task[] {
		if (typeof window === "undefined") return [];

		const stored = localStorage.getItem(TaskRepository.STORAGE_KEY);
		if (!stored) return [];

		try {
			const parsed = JSON.parse(stored) as Array<{
				id: string;
				name: string;
				priority: "LOW" | "MEDIUM" | "HIGH";
				dueDate: string;
				isCompleted: boolean;
				createdAt: string;
				modifiedAt: string;
			}>;
			// Convert date strings back to Date objects
			return parsed.map((task) => ({
				...task,
				id: task.id as TaskId,
				dueDate: new Date(task.dueDate),
				createdAt: new Date(task.createdAt),
				modifiedAt: new Date(task.modifiedAt),
			}));
		} catch {
			return [];
		}
	}

	/**
	 * Retrieves a specific task by ID
	 */
	static getById(id: TaskId): Task | null {
		const tasks = TaskRepository.get();
		return tasks.find((task) => task.id === id) || null;
	}

	/**
	 * Saves a single task to storage (create or update)
	 */
	static save(task: Task): void {
		if (typeof window === "undefined") return;

		const tasks = TaskRepository.get();
		const existingIndex = tasks.findIndex((t) => t.id === task.id);

		if (existingIndex >= 0) {
			tasks[existingIndex] = task;
		} else {
			tasks.push(task);
		}

		localStorage.setItem(TaskRepository.STORAGE_KEY, JSON.stringify(tasks));
	}

	/**
	 * Removes a task from storage
	 */
	static delete(id: TaskId): void {
		if (typeof window === "undefined") return;

		const tasks = TaskRepository.get();
		const filtered = tasks.filter((task) => task.id !== id);
		localStorage.setItem(TaskRepository.STORAGE_KEY, JSON.stringify(filtered));
	}

	/**
	 * Clears all tasks from storage (for testing purposes)
	 */
	static clear(): void {
		if (typeof window === "undefined") return;
		localStorage.removeItem(TaskRepository.STORAGE_KEY);
	}
}

/**
 * Factory for creating Task entities with proper validation and defaults.
 * Ensures all created tasks meet domain requirements and have consistent structure.
 */
export class TaskFactory {
	/**
	 * Creates a new Task with generated ID and timestamps
	 */
	static create(data: { name: string; priority: "LOW" | "MEDIUM" | "HIGH"; dueDate: Date }): Task {
		const now = new Date();

		return {
			id: crypto.randomUUID() as TaskId,
			name: data.name,
			priority: data.priority,
			dueDate: data.dueDate,
			isCompleted: false,
			createdAt: now,
			modifiedAt: now,
		};
	}
}
