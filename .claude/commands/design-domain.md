# Protomaton Domain Design Command

notes: read and follow CLAUDE.md before you start

## Your Task
Create or update comments, types and interfaces of the codes under `app/domain` based on the current change history and specifications.
NEVER implement bodies of functions and classes. You can add/update ONLY Zod schemas, comments and function interfaces (name and type definitions).

## Process
1. **Read context**: Review the current change history in `/docs/changes` and specifications in `/docs/spec` specified by the change history. if specifications do not exist,  ERROR "No feature spec provided"
2. **Create/update basic designs**: For domain design:
   - Run `./scripts/design-domain.sh [name]` to create templates if needed. name must be same as what specified in the change history.
   - Fill in the templates following the "Execution Flow" section in `app/domain/[name]/overview.md` following the guidelines below
   - DO NOT touch lifecycle.ts now. it will be created/updated in implementation phase.
3. **Create/update detailed designs**: When complex decisions need documentation:
   - Run `./scripts/adr.sh [decision-name]` to create detailed design documents
   - Document architectural decision records in `docs/adr/[decision-name].md`
   - Add it to the change history in `/docs/changes`
4. **Review completeness**: Ensure domain implementation covers all requirements

Create detailed design documents (`docs/adr/[decision name].md`) when:
- **Complex decisions**: Multiple viable approaches need comparison and justification
- **Basic architecture insufficient**: Important details that can't fit in the main architecture document
- **High implementation risk**: Areas prone to errors that benefit from detailed specification

## Important Notes
- **Domain document as self-documented codes**: Always required, follow constitution.md domain-driven development rules
- **Detailed documents**: Created as needed for complex decisions, permanently maintained
- You should define interfaces of services and APIs but DO NOT implement them now.
- DO NOT touch lifecycle.ts now. it will be created/updated in implementation phase.
- Include constitution.md compliance in domain implementation
- Focus on domain logic and architectural decisions, not UI/storage details

Begin the domain design process now.