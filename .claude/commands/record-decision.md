# Protomaton ADR Command

notes: read and follow CLAUDE.md before you start

## Your Task
Create Architecture Decision Records (ADRs) to document important technical decisions with full context and rationale.

## Process
1. **Identify decision**: Understand the specific architectural decision to be documented
2. **Run script**: Execute `./scripts/adr.sh [decision-name]` to create ADR from template
3. **Fill template**: Complete all required sections following template instructions:
   - Context: Why this decision is needed
   - Decision: What was decided
   - Rationale: Why this option was chosen
   - Alternatives Considered: Other options evaluated with pros/cons
   - Implementation Notes: Key requirements and guidance
   - Consequences: Positive and negative impacts
   - Related Decisions: Links to related ADRs/docs
4. **Mark ambiguities**: Use `[NEEDS CLARIFICATION: specific question]` for unclear requirements
5. **Review completeness**: Ensure all sections are filled and decision is well-documented

## Important Notes
- ADRs will never updated. When decision updates are needed, create a new document that overwrites the previous decision.
- Focus on architectural decisions requiring justification
- Document WHY, not just WHAT
- Be objective about trade-offs

Begin recording the architectural decision now.