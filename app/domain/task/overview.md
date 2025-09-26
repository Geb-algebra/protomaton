# Domain Architecture: task

**Created**: 2025-09-26  
**Last Updated**: 2025-09-26

## Execution Flow (Domain Design)
```
1. Parse requirements from specifications
   → If no related specs: ERROR "Domain design requires specifications"
2. Identify core business concepts
   → Extract: entities, value objects, aggregates
3. For each unclear business rule:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Create or update domain objects and relationships in ./models.ts as self-documented Zod schemas
   → Ensure proper encapsulation
   → Define validation rules
5. Identify complex business logic (skip simple CRUD) and define or update them in ./services.ts as unimplemented functions
   → Focus on calculations, constraints, workflows
6. Define or update exposed APIs for use by other domains and the application in ./index.ts as unimplemented functions so that they cover all of the acceptance scenarios in the specifications.
7. Minimize APIs by removing redundant ones, eliminating those unnecessary for acceptance scenarios, merging APIs, or using other consolidation methods without losing acceptance scenarios coverage.
8. Expose types (imported from ./models.ts into ./index.ts) required for use by other domains and the application from ./index.ts
9. Run Constitution compliance checklist. DO NOT edit the checklist items or add your own.
   → If violations found: ERROR "Fix constitution compliance"
10. Return: SUCCESS (domain design ready for implementation)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on business concepts and rules, not technical implementation
- ❌ Avoid persistence, UI, or infrastructure concerns
- 🏢 Reviewable by business stakeholders for domain correctness

### Section Requirements
- **Domain Objects** (as zod schemas in `models.ts`): Always required - core business entities
- **Business Logic** (as unimplemented functions in `services.ts`): Required only for complex operations (skip CRUD)
- **Validation Rules** (as unimplemented and documented functions in `services.ts`): Required when business constraints exist
- **Exposed APIs** (as unimplemented functions in `index.ts`): Always required - Functions exposed to other domains and the application
- When a section doesn't apply, leave it as "N/A" for future potential application


### For AI Generation
When creating this domain design:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for unclear business rules
2. **Don't guess**: If business logic is ambiguous, mark it rather than assume
3. **Think like a domain expert**: Focus on business invariants and rules
4. **Don't depend on specific techonologies**: All contents of this document must be applicable regardless of how the application or storage is implemented.
5. **Don't include non-domain contents**: Do not include contents for app-layer or storage-layer e.g., form input schema and Database schema.
6. **Common underspecified areas**:
   - Business rule enforcement points
   - Data validation and constraints
   - Entity lifecycle management
   - Cross-aggregate consistency rules
   - Domain event triggers and data
   - Permission and authorization rules within domain

---

## Overview
The Task domain manages the core business logic for todo items in the application. It provides a complete task management system with CRUD operations, priority-based organization, and completion status tracking. 

**Core Responsibilities**:
- Task entity management with proper validation
- Business rule enforcement for task lifecycle
- Priority-based task organization (LOW, MEDIUM, HIGH)
- Completion status tracking with audit timestamps
- Due date management for deadline tracking

**Domain Objects**:
- **Task**: Core entity representing a todo item with name, priority, due date, completion status, and audit timestamps
- **TaskPriority**: Enum for task importance levels (LOW, MEDIUM, HIGH)
- **CreateTaskInput**: Input schema for task creation
- **UpdateTaskInput**: Input schema for task updates

**Business Services**:
- **toggleTaskCompletion**: Handles completion status changes with timestamp updates
- **updateTaskWithValidation**: Applies business rules for task modifications

**Exposed APIs**:
- **createTask**: Create new tasks with validation
- **getAllTasks**: Retrieve all tasks for list display
- **getTaskById**: Retrieve specific task for detail view
- **updateTask**: Update existing tasks with validation
- **toggleTaskComplete**: Toggle completion status with business logic
- **deleteTask**: Permanently remove tasks

## Constitution Compliance Checklist
<!-- Verify adherence to constitution.md principles -->
- [x] Domain objects are properly encapsulated (Task entity with Zod schemas in models.ts)
- [x] Business logic is contained within the domain layer as services (completion toggle and update validation in services.ts)
- [x] Simple CRUD operations handled by Factories and Repositories, not services (create/get/delete operations will use factories/repositories in lifecycle.ts)
- [x] External dependencies are abstracted through interfaces (no direct external dependencies in domain layer)
- [x] Exposed APIs cover all use cases of all features (6 APIs cover all acceptance scenarios from specification)
- [x] Exposed APIs are as few as possible (no redundancy - each API serves distinct business purpose)
