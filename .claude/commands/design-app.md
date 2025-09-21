# Protomaton App Design Command

notes: read and follow CLAUDE.md before you start

You are helping with the Protomaton app design phase - creating and updating app and system architectural design documents.

## Your Task
Create or update app and system design documents based on the current change history and specifications.

## Process
1. **Read context**: Review the current change history in `/docs/changes` and specifications in `/docs/domain, /docs/system, /docs/app` specified by the change history. if specifications do not exist,  ERROR "No feature spec provided"
2. **Create/update basic designs**: For each design area mentioned:
   - Run `./scripts/design.sh [type] [name]` to create from template if needed. name must be same as what specified in the change history.
   - Fill in the template following the "Execution Flow" section in the basic architecture documents following the guidelines below
3. **Create/update detailed designs**: When complex decisions need documentation:
   - Run `./scripts/design-detail.sh [type] [name] [description]` to create detailed design documents
   - Document architectural decision records and implementation complexities
   - Add it to the change history in `/docs/changes`
4. **Technology research**: If new technologies are needed, research and document choices
5. **Review completeness**: Ensure designs cover all specification requirements

## Design Types & Guidelines

### App Design

#### Basic (`app/[page]/architecture.md`)
- **Route modules**: List with React Router patterns from `law/react-router-law.md`
- **Shared components**: Components used across multiple routes
- **UI wireframes**: ASCII diagrams showing component layout
- **Additional libraries**: Beyond React Router, Shadcn/ui, Zod
- **Application layer logic**: Logic that doesn't belong in domain layer, including workflows and orchestration
- **Constitution & router law checklist**: Verify adherence to both documents
- **Target audience**: Technical reviewers who can catch architectural issues

#### Detailed (`app/[page]/details/[description].md`)
- **App architectural decisions**: Complex component structure or interaction decisions
- **Implementation reinforcement**: Specific app patterns where AI needs explicit guidance
- **Library integration details**: Complex usage of UI libraries beyond basic patterns
- **Application logic details**: Complex workflows and orchestration logic specifications
- **Permanently maintained**: Updated throughout project lifecycle

### System Design

#### Basic (`system/[item]/architecture.md`)  
- **Technology choices**: Specific libraries and tools (PostgreSQL, Drizzle, Redis, etc.)
- **Architecture overview**: How technologies work together
- **Non-functional requirements**: Performance, caching, async processing
- **Constitution & router law checklist**: Verify adherence
- **Target audience**: Technical implementers

#### Detailed (`system/[item]/details/[description].md`)
- **Technical decision records**: Complex infrastructure or technology decisions
- **Performance optimization details**: Specific caching, async processing, or scaling decisions
- **Integration complexities**: Detailed specifications for complex system integrations
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
- Use `./scripts/design-detail.sh [type] [name] [description]` to create detailed design templates

Begin the app and system design process now.