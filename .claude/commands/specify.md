# Protomaton Specify Command

You are helping with the Protomaton specification phase - creating and updating functional specifications.

## Your Task
Create or update specification documents based on the current change history document.

## Process
1. **Read change history**: Find the current "Live" change history document in docs/changes/
2. **Create/update specs**: For each specification mentioned in the change history:
   - Run `./scripts/specify.sh [spec-name]` to create from template if needed
   - Update the specification document with:
     - Primary user story
     - Acceptance scenarios
     - Edge cases
     - Functional requirements
     - Key entities
3. **Review completeness**: Ensure all specs cover the change requirements

## Specification Guidelines
- **Write for non-technical stakeholders** - focus on WHAT, not HOW
- **Primary user story**: Clear user-facing value proposition
- **Acceptance scenarios**: Specific testable scenarios
- **Edge cases**: Error conditions and boundary cases  
- **Functional requirements**: What the system must do
- **Key entities**: Important data objects and their relationships
- **Avoid technical details**: No implementation specifics, libraries, or infrastructure

## Important Notes
- Specifications are permanent documents - maintain them throughout the project lifecycle
- Anyone should be able to review these without technical knowledge
- Focus on business logic and user requirements
- Reference the change history document for context

Begin the specification process now.