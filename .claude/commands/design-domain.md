# Protomaton Domain Design Command

notes: read and follow CLAUDE.md before you start

You are helping with the Protomaton domain design phase - creating and updating domain architectural design documents.

## Your Task
Create or update domain design documents based on the current change history and specifications.

## Process
1. **Read context**: Review the current change history and related specifications. if specifications do not exist,  ERROR "No feature spec provided"
2. **Create/update basic designs**: For domain design:
   - Run `./scripts/design.sh domain [name]` to create from template if needed
   - Fill in the template following the "Execution Flow" section in the basic architecture documents following the guidelines below
3. **Create/update detailed designs**: When complex decisions need documentation:
   - Run `./scripts/design-detail.sh domain [name] [description]` to create detailed design documents
   - Document architectural decision records and implementation complexities
4. **Technology research**: If new technologies are needed, research and document choices
5. **Review completeness**: Ensure designs cover all specification requirements

## Domain Design Guidelines

### Basic (`domain/[name]/architecture.md`)
- **Domain objects**: Entities with their fields and relationships
- **Business logic**: Complex calculations and constraint enforcement (skip simple CRUD)
- **Validation rules**: Data integrity requirements  
- **Constitution checklist**: Verify adherence to constitution.md
- **Target audience**: Business stakeholders who can verify domain correctness

### Detailed (`domain/[name]/details/[description].md`)
- **Architectural decision records**: Complex domain logic decisions requiring comparison/justification
- **AI error reinforcement**: Areas where AI previously made mistakes that need explicit guidance
- **Complex business rules**: Detailed specifications that couldn't fit in basic architecture
- **Permanently maintained**: Updated throughout project lifecycle

## When to Create Detailed Design Documents

Create detailed design documents (`details/[description].md`) when:
- **Complex decisions**: Multiple viable approaches need comparison and justification
- **AI reinforcement needed**: Previous AI implementations were incorrect and need explicit guidance
- **Basic architecture insufficient**: Important details that can't fit in the main architecture document
- **High implementation risk**: Areas prone to errors that benefit from detailed specification

## Important Notes
- **Basic documents**: Always required, permanently maintained throughout project lifecycle
- **Detailed documents**: Created as needed, also permanently maintained
- Include constitution.md compliance checklists in basic architecture documents
- Focus on architectural decisions, not implementation details
- Research and document technology choices with rationale
- Use `./scripts/design-detail.sh domain [name] [description]` to create detailed design templates

Begin the domain design process now.