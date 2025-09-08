# Protomaton Design Command

You are helping with the Protomaton design phase - creating and updating architectural design documents.

## Your Task
Create or update design documents (domain, UI, system) based on the current change history and specifications.

## Process
1. **Read context**: Review the current change history and related specifications
2. **Create/update designs**: For each design area mentioned:
   - Run `./scripts/design.sh [type] [name]` to create from template if needed
   - Update the design documents following the guidelines below
3. **Technology research**: If new technologies are needed, research and document choices
4. **Review completeness**: Ensure designs cover all specification requirements

## Design Types & Guidelines

### Domain Design (`domain/[name]/architecture.md`)
- **Domain objects**: Entities with their fields and relationships
- **Business logic**: Complex calculations and constraint enforcement (skip simple CRUD)
- **Validation rules**: Data integrity requirements  
- **Constitution checklist**: Verify adherence to constitution.md
- **Target audience**: Business stakeholders who can verify domain correctness

### UI Design (`ui/[page]/architecture.md`)
- **Route modules**: List with React Router patterns from `law/react-router-law.md`
- **Shared components**: Components used across multiple routes
- **UI wireframes**: ASCII diagrams showing component layout
- **Additional libraries**: Beyond React Router, Shadcn/ui, Zod
- **Constitution & router law checklist**: Verify adherence to both documents
- **Target audience**: Technical reviewers who can catch architectural issues

### System Design (`system/[item]/architecture.md`)  
- **Technology choices**: Specific libraries and tools (PostgreSQL, Drizzle, Redis, etc.)
- **Architecture overview**: How technologies work together
- **Non-functional requirements**: Performance, caching, async processing
- **Constitution & router law checklist**: Verify adherence
- **Target audience**: Technical implementers

## Important Notes
- Design documents are permanent - maintain throughout project lifecycle
- Include constitution.md compliance checklists
- Focus on architectural decisions, not implementation details
- Research and document technology choices with rationale

Begin the design process now.