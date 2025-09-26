# App Architecture: todo

**Created**: 2025-09-26  
**Last Updated**: 2025-09-26

## Execution Flow
```
1. Parse requirements from specifications in `docs/spec/` and domain designs in `app/domain/`
   → If no related specs: ERROR "App design requires specifications"
2. Identify user interaction patterns and application workflows
   → Map user scenarios to UI flows and application logic
3. For each unclear UX or application flow decision:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Create ASCII wireframes for layout structure
5. Identify functionalities that require additional libraries beyond core stack. Mark [NEEDS RESEARCH] to a functionality if the library for it is not specified or easily selectable.
6. Design route structure following React Router patterns and write down the "Route Modules" section.
   → Reference law/react-router-law.md for pattern selection
7. Design data flow across the Route Modules
8. for each new Route Modules, run `./scripts/design-route.sh [module.name]` to copy a template Route Module, add its route to `app/routes.ts` and then fill in the template comment in the Route Module.
9.  Verify that this document's Data Flow section aligns with all Route Module responsibilities described in their comments. 
10. Run compliance checklists (Constitution + React Router Law) in the comments of the Route Modules
   → If violations found: ERROR "Fix compliance issues"
11. Return: SUCCESS (App design ready for implementation)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on user experience, component architecture, and application workflows
- ❌ Avoid domain logic (belongs in domain designs) and infrastructure details
- 🔒 MUST only use domain APIs exported from `domain/[domain name]/index.ts` - NO direct imports from domain internals
- 👩‍💻 Reviewable by technical team to catch architectural issues

### Section Requirements
- **Route Modules**: Always required - define React Router structure
- **UI Wireframe**: Always required - show component layout
- **Application Logic**: Required when non-domain orchestration logic exists
- **Shared Components**: Required when you need components shared across routes
- **Technology Stack**: Optional - only for libraries beyond core stack
- When a section doesn't apply, leave it as "N/A" for future potential application

### For AI Generation
When creating this app design:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for unclear UX or workflow decisions
2. **Don't guess**: If user flow or application logic is ambiguous, mark it rather than assume
3. **Think application layer**: Focus on orchestration, UI workflows, but not domain business rules
4. **Domain API Usage**: Only reference domain APIs that will be exported from `domain/[domain name]/index.ts`
5. **Common underspecified areas**:
   - User permission levels and conditional UI
   - Error state and loading state behaviors
   - Mobile vs desktop experience differences
   - Navigation patterns and breadcrumbs
   - Form validation and user feedback
   - Data refresh and real-time update needs
   - Application workflow orchestration logic
   - Which domain APIs are needed for each route

---

## Overview
<!-- Brief description of this page/feature and its purpose -->

A complete todo application that allows users to manage personal tasks. The application provides a task list view, individual task detail pages with editing capabilities, and full CRUD operations (create, read, update, delete) for tasks. Each task contains a name, priority level, and due date, with the ability to toggle completion status.

## UI Wireframe
<!-- ASCII diagram for all pages showing how components are arranged -->

**Todo List Page:**
```
┌─────────────────────────────────────┐
│ Todo List                           │
│ ┌─────────────────┐                 │
│ │ ➕ Create New   │                 │
│ └─────────────────┘                 │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 📋 Task Name           High     │ │
│ │ Due: 2025-09-30    [✓] Done    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 📝 Another Task        Medium   │ │
│ │ Due: 2025-10-01    [ ] Pending │ │
│ └─────────────────────────────────┘ │
│                                     │
│ (More tasks...)                     │
└─────────────────────────────────────┘
```

**Task Detail/Edit Page:**
```
┌─────────────────────────────────────┐
│ ← Back to List                      │
│                                     │
│ Task Details                        │
│ ┌─────────────────────────────────┐ │
│ │ Name: [________________]        │ │
│ │                                 │ │
│ │ Priority: [High ▼]              │ │
│ │                                 │ │
│ │ Due Date: [2025-09-30]          │ │
│ │                                 │ │
│ │ Status: [✓] Completed           │ │
│ │                                 │ │
│ │ ┌──────┐ ┌──────┐ ┌──────────┐  │ │
│ │ │ Save │ │Cancel│ │  Delete  │  │ │
│ │ └──────┘ └──────┘ └──────────┘  │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Route Modules
<!-- List of React Router modules to implement -->
<!-- Just single-line abstracts. Full Description should be at comments in each Route Module file. -->

- Route: `/todos` ... A Page that displays the list of all tasks with create button and task status toggles
- Route: `/todos/new` ... A Page that provides a form to create a new task with name, priority, and due date
- Route: `/todos/:id` ... A Page that shows task detail view with edit capabilities and delete functionality

## Data Flow
<!-- How data moves ACROSS the multiple Route Modules -->

1. **Task List Flow**: `/todos` loader → `taskDomain.getAllTasks()` → Task List Component → UI Render with task cards
2. **Task Creation Flow**: `/todos/new` action → Validate form data → `taskDomain.createTask()` → Redirect to `/todos`
3. **Task Detail/Edit Flow**: `/todos/:id` loader → `taskDomain.getTaskById()` → Task Detail Component → Form with current values
4. **Task Update Flow**: `/todos/:id` action → Validate form data → `taskDomain.updateTask()` → Re-render with updated data
5. **Task Status Toggle**: Task List Component → fetcher.submit to `/todos/:id` action → `taskDomain.toggleTaskStatus()` → Re-fetch list data
6. **Task Delete Flow**: `/todos/:id` action → `taskDomain.deleteTask()` → Redirect to `/todos`

## Technology Stack
<!-- Libraries beyond React Router, Shadcn/ui, and Zod -->

**Core Dependencies (Already Available):**
- React Router Framework Mode for routing and data loading
- shadcn/ui components for UI (Button, Form, Input, Select, Card, etc.)
- Zod for schema validation and type safety
- CSS Modules for layout using grid-template-areas

**Additional Libraries Needed:**
- [NEEDS CLARIFICATION: Date picker component - should we use shadcn/ui date picker or standard HTML date input?]
- [NEEDS RESEARCH: Priority enum values implementation approach - High/Medium/Low vs numeric scale]

---
*This document defines the application architecture, component structure, and application layer logic. Technical reviewers should verify this before implementation to catch architectural issues early.*