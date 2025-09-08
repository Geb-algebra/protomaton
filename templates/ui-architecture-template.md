# UI Architecture: {{NAME}}

**Created**: {{DATE}}  
**Last Updated**: {{DATE}}

===============================================================
## Execution Flow (UI Design)
```
1. Parse requirements from specifications and domain designs
   → If no related specs: ERROR "UI design requires specifications"
2. Identify user interaction patterns
   → Map user scenarios to UI flows
3. For each unclear UX decision:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Design route structure following React Router patterns
   → Reference law/react-router-law.md for pattern selection
5. Identify shared vs route-specific components
6. Create ASCII wireframes for layout structure
7. Select additional libraries beyond core stack
8. Run compliance checklists (Constitution + React Router Law)
   → If violations found: ERROR "Fix compliance issues"
9. Return: SUCCESS (UI design ready for implementation)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on user experience and component architecture
- ❌ Avoid specific styling details or implementation code
- 👩‍💻 Reviewable by technical team to catch architectural issues

### Section Requirements
- **Route Modules**: Always required - define React Router structure
- **UI Wireframe**: Always required - show component layout
- **Shared Components**: Required when components are reused across routes
- **Technology Stack**: Optional - only for libraries beyond core stack

### For AI Generation
When creating this UI design:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for unclear UX decisions
2. **Don't guess**: If user flow is ambiguous, mark it rather than assume
3. **Think like a UX designer**: Focus on user journey and component relationships
4. **Common underspecified areas**:
   - User permission levels and conditional UI
   - Error state and loading state behaviors
   - Mobile vs desktop experience differences
   - Navigation patterns and breadcrumbs
   - Form validation and user feedback
   - Data refresh and real-time update needs

---
===============================================================

## Overview
<!-- Brief description of this page/feature and its purpose -->

## Route Modules
<!-- List of React Router modules to implement -->

### Route: [Path]
**Pattern**: [Pattern from law/react-router-law.md - e.g., "Loader Pattern", "Action Pattern"]  
**Purpose**: [What this route module handles]  
**Responsibilities**:
- [Responsibility 1]
- [Responsibility 2]

### Route: [Path]  
**Pattern**: [Pattern from law/react-router-law.md]  
**Purpose**: [What this route module handles]  
**Responsibilities**:
- [Responsibility 1]
- [Responsibility 2]

## Shared Components
<!-- Components used by multiple routes (not internal route components) -->

### Component: [Name]
**Purpose**: [What this component does]  
**Used By**: [Which routes use this component]  
**Props Interface**: 
- `prop_name` (type) - Description

### Component: [Name]
**Purpose**: [What this component does]  
**Used By**: [Which routes use this component]  
**Props Interface**:
- `prop_name` (type) - Description

## UI Wireframe
<!-- ASCII diagram showing how components are arranged -->

```
┌─────────────────────────────────────┐
│ Header Component                    │
├─────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────────┐ │
│ │ Sidebar     │ │ Main Content    │ │
│ │ Component   │ │ (Route Outlet)  │ │
│ │             │ │                 │ │
│ └─────────────┘ └─────────────────┘ │
├─────────────────────────────────────┤
│ Footer Component                    │
└─────────────────────────────────────┘
```

## Technology Stack
<!-- Libraries beyond React Router, Shadcn/ui, and Zod -->

### UI Libraries
- **Library Name**: [Purpose and rationale]

### State Management  
- **Solution**: [State management approach and rationale]

### Additional Tools
- **Tool Name**: [Purpose and rationale]

## Data Flow
<!-- How data moves through the UI components -->

1. [Data source] → [Component] → [Action/Processing] → [Result]
2. [User interaction] → [Component] → [State update] → [UI update]

## Constitution Compliance Checklist
<!-- Verify adherence to constitution.md principles -->
- [ ] Components follow single responsibility principle  
- [ ] State management follows established patterns
- [ ] External data access uses proper abstractions
- [ ] Error boundaries are implemented where needed
- [ ] [Add other constitution.md requirements as applicable]

## React Router Law Compliance Checklist  
<!-- Verify adherence to law/react-router-law.md -->
- [ ] Route modules follow specified patterns
- [ ] Data loading uses appropriate loaders
- [ ] Form actions use appropriate action functions  
- [ ] Navigation follows React Router conventions
- [ ] [Add other react-router-law.md requirements as applicable]

---
*This document defines the UI architecture and component structure. Technical reviewers should verify this before implementation to catch architectural issues early.*