// This is a template for a Page-pattern React Router Route Module.
// You must verify that the Data Flow section in `design.md` aligns with responsibilities of this Route Module.

/**
 * ## overview
 *
 * **Pattern**: [Pattern from law/react-router-law.md - "Page Pattern", "Resource Route Pattern", "Fullstack Component Pattern"]
 * **Purpose**: [What this route module handles]
 * **Domain APIs Used**: [List domain APIs from `domain/[domain name]/index.ts`]
 * **Responsibilities**:
 * - [Responsibility 1]
 * - [Responsibility 2]
 *
 *
 * ## Workflows
 * <!-- Non-domain workflows -->
 *
 * **Purpose**: [What this workflow accomplishes]
 * **Trigger**: [What initiates this workflow]
 * **Steps**:
 * 1. [Step 1 - UI action/validation]
 * 2. [Step 2 - Data orchestration]
 * 3. [Step 3 - State updates]
 * 4. [Step 4 - UI feedback]
 *
 * ## Data Flow
 * <!-- How data moves through the UI components via domain APIs -->
 *
 * 1. [Route Loader] → [Domain API] → [Component] → [UI Render]
 * 2. [User interaction] → [Route Action] → [Domain API] → [State update] → [UI update]
 * 3. [Form submission] → [Domain API validation] → [Domain API operation] → [Result]
 *
 * ## Constitution Compliance Checklist
 * <!-- Verify adherence to constitution.md principles -->
 * - [ ] Components follow single responsibility principle
 * - [ ] State management follows established patterns
 * - [ ] Route modules ONLY use domain APIs from `domain/[domain name]/index.ts` exports
 * - [ ] NO direct imports from domain internals (models.ts, services.ts, lifecycle.ts)
 * - [ ] Domain API usage is limited to loader/action/clientLoader/clientAction
 * - [ ] Route components only render domain objects and forward user input
 * - [ ] Error boundaries are implemented where needed
 *
 * ## React Router Law Compliance Checklist
 * <!-- Verify adherence to law/react-router-law.md -->
 * - [ ] Route modules follow specified patterns
 * - [ ] Data loading uses appropriate loaders
 * - [ ] Form actions use appropriate action functions
 * - [ ] Navigation follows React Router conventions
 *
 */
