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
4. Model domain objects and relationships
   → Ensure proper encapsulation
   → Define validation rules
5. Identify complex business logic (skip simple CRUD)
   → Focus on calculations, constraints, workflows
6. Define domain events for cross-boundary communication
7. Run Constitution compliance checklist
   → If violations found: ERROR "Fix constitution compliance"
8. Return: SUCCESS (domain design ready for implementation)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on business concepts and rules, not technical implementation
- ❌ Avoid persistence, UI, or infrastructure concerns
- 🏢 Reviewable by business stakeholders for domain correctness

### Section Requirements
- **Domain Objects**: Always required - core business entities
- **Business Logic**: Required only for complex operations (skip CRUD)
- **Validation Rules**: Required when business constraints exist
- **Domain Events**: Optional - for cross-boundary communication

### For AI Generation
When creating this domain design:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for unclear business rules
2. **Don't guess**: If business logic is ambiguous, mark it rather than assume
3. **Think like a domain expert**: Focus on business invariants and rules
4. **Common underspecified areas**:
   - Business rule enforcement points
   - Data validation and constraints
   - Entity lifecycle management
   - Cross-aggregate consistency rules
   - Domain event triggers and data
   - Permission and authorization rules within domain

---

## Overview
<!-- Brief description of this domain and its responsibilities -->

## Domain Objects

### Entity: [Name]
<!-- Primary business entities -->
**Purpose**: [What this entity represents in the business domain]

**Key Attributes**:
- `field_name` (type) - Description and validation rules
- `field_name` (type) - Description and validation rules

**Relationships**:
- [Relationship type] with [Other Entity] - Description

### Value Object: [Name]  
<!-- Immutable objects that represent concepts -->
**Purpose**: [What this value object represents]

**Attributes**:
- `field_name` (type) - Description and validation rules

**Validation Rules**:
- Rule 1: [Constraint description]
- Rule 2: [Constraint description]

## Business Logic

### Complex Operations
<!-- Only include non-trivial business operations, skip simple CRUD -->

#### Operation: [Name]
**Purpose**: [What business problem this solves]  
**Inputs**: [Required data]  
**Logic**: [High-level algorithm or business rules]  
**Outputs**: [Results produced]  
**Constraints**: [Business rules that must be maintained]

#### Operation: [Name]
**Purpose**: [What business problem this solves]  
**Inputs**: [Required data]  
**Logic**: [High-level algorithm or business rules]  
**Outputs**: [Results produced]  
**Constraints**: [Business rules that must be maintained]

## Domain Events
<!-- Important business events that other domains might need to know about -->

### Event: [Name]
**Triggered When**: [Condition that causes this event]  
**Data Included**: [Information carried by the event]  
**Consumers**: [Who needs to know about this event]

## Validation Rules
<!-- Domain-wide validation and business constraints -->

### Entity Validation
- [Entity Name]: [Validation rules]

### Business Constraints  
- [Constraint]: [Description and enforcement rules]

## Constitution Compliance Checklist
<!-- Verify adherence to constitution.md principles -->
- [ ] Domain objects are properly encapsulated
- [ ] Business logic is contained within the domain layer
- [ ] External dependencies are abstracted through interfaces
- [ ] Domain events are used for cross-boundary communication
- [ ] [Add other constitution.md requirements as applicable]

---
*This document defines the core business domain model and logic. It should be reviewable by business stakeholders to verify domain correctness.*