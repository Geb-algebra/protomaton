# Domain Architecture: {{NAME}}

**Created**: {{DATE}}  
**Last Updated**: {{DATE}}

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
<!-- Brief description of this domain and its responsibilities -->

## Constitution Compliance Checklist
<!-- Verify adherence to constitution.md principles -->
- [ ] Domain objects are properly encapsulated
- [ ] Business logic is contained within the domain layer as services
- [ ] Simple CRUD operations handled by Factories and Repositories, not services
- [ ] External dependencies are abstracted through interfaces
- [ ] Exposed APIs cover all use cases of all features
- [ ] Exposed APIs are as few as possible (no redundancy)
