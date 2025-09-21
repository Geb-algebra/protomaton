# Protomaton Domain Design Command

notes: read and follow CLAUDE.md before you start

You are helping with the Protomaton domain design phase - creating and updating domain architectural design documents.

## Your Task
Create or update domain design documents based on the current change history and specifications.

## Process
1. **Read context**: Review the current change history in `/docs/changes` and specifications in `/app/domain` specified by the change history. if specifications do not exist,  ERROR "No feature spec provided"
2. **Create/update basic designs**: For domain design:
   - Run `./scripts/design-domain.sh [name]` to create from template if needed. name must be same as what specified in the change history.
   - Fill in the templates following the "Execution Flow" section in `app/domain/[name]/overview.md` following the guidelines below
3. **Create/update detailed designs**: When complex decisions need documentation:
   - Run `./scripts/design-detail-domain.sh [domain-name] [detail-name]` to create detailed design documents
   - Document architectural decision records in `app/domain/[domain-name]/design-detail/[detail-name].md`
   - Add it to the change history in `/docs/changes`
4. **Technology research**: If new technologies are needed, research and document choices
5. **Review completeness**: Ensure domain implementation covers all requirements

## Domain Design Guidelines

### Basic Domain Implementation (`app/domain/[name]/`)
- **models.ts**: Domain objects as Zod schemas with strict validation
- **lifecycle.ts**: Factories and repositories for domain objects
- **services.ts**: Pure business logic functions with unit tests
- **index.ts**: Minimal API exports for other domains/app layers
- **Constitution compliance**: Follow all domain-driven development rules

### Detailed Design Documents (`app/domain/[name]/design-detail/[name].md`)
- **Architectural decision records**: Complex domain logic decisions requiring comparison/justification
- **AI error reinforcement**: Areas where AI previously made mistakes that need explicit guidance
- **Complex business rules**: Detailed specifications that couldn't fit in basic implementation
- **Permanently maintained**: Updated throughout project lifecycle

## When to Create Detailed Design Documents

Create detailed design documents (`design-detail/[detail-name].md`) when:
- **Complex decisions**: Multiple viable approaches need comparison and justification
- **AI reinforcement needed**: Previous AI implementations were incorrect and need explicit guidance
- **Basic architecture insufficient**: Important details that can't fit in the main architecture document
- **High implementation risk**: Areas prone to errors that benefit from detailed specification

## Important Notes
- **Domain implementation**: Always required, follow constitution.md domain-driven development rules
- **Detailed documents**: Created as needed for complex decisions, permanently maintained
- Include constitution.md compliance in domain implementation
- You should define interfaces of services and APIs but DO NOT implement them now.
- Focus on domain logic and architectural decisions, not UI/storage details
- Research and document technology choices with rationale
- Use `./scripts/design-detail-domain.sh [domain-name] [detail-name]` to create detailed design templates

Begin the domain design process now.