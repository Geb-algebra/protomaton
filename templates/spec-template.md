# Specification: {{SPEC_NAME}}

**Created**: {{DATE}}  
**Last Updated**: {{DATE}}

## Execution Flow (Specification Creation)
```
1. Parse user description from change history/input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (if data involved)
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

### Section Requirements
- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation
When creating this spec from a user prompt:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for any assumption you'd need to make
2. **Don't guess**: If the prompt doesn't specify something (e.g., "login system" without auth method), mark it
3. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
4. **Common underspecified areas**:
   - User types and permissions
   - Data retention/deletion policies  
   - Performance targets and scale
   - Error handling behaviors
   - Integration requirements
   - Security/compliance needs

---

## Primary User Story
<!-- The main value proposition from the user's perspective -->
As a [user type], I want [functionality] so that [benefit].

## Acceptance Scenarios
<!-- Specific testable scenarios that define success -->

### Scenario 1: [Name]
**Given** [initial conditions]  
**When** [user action]  
**Then** [expected outcome]

### Scenario 2: [Name]
**Given** [initial conditions]  
**When** [user action]  
**Then** [expected outcome]

## Edge Cases
<!-- Error conditions, boundary cases, and failure modes -->

### Error Handling
- **Case**: [Error condition]
  - **Expected**: [How system should respond]

### Boundary Conditions  
- **Case**: [Boundary condition]
  - **Expected**: [Expected behavior]

## Functional Requirements
<!-- What the system must do - avoid technical implementation details -->

### Core Requirements
1. The system must [requirement]
2. The system must [requirement]  
3. The system must [requirement]

### Business Rules
1. [Business rule or constraint]
2. [Business rule or constraint]

## Key Entities
<!-- Important data objects and their relationships -->

### Entity: [Name]
- **Purpose**: [What this represents]
- **Key Attributes**: [Important fields/properties]
- **Relationships**: [How it relates to other entities]

### Entity: [Name]  
- **Purpose**: [What this represents]
- **Key Attributes**: [Important fields/properties]
- **Relationships**: [How it relates to other entities]

## Success Criteria
<!-- How to measure if this specification is properly implemented -->
- [ ] All acceptance scenarios pass
- [ ] All edge cases are handled appropriately
- [ ] All functional requirements are met
- [ ] All business rules are enforced

---
*This specification focuses on WHAT the system should do, not HOW it should be implemented.*