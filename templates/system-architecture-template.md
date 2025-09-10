# System Architecture: {{NAME}}

**Created**: {{DATE}}  
**Last Updated**: {{DATE}}

## Execution Flow (System Design)
```
1. Parse requirements from specifications and domain/UI designs
   → If no related designs: ERROR "System design requires other designs"
2. Identify technical concerns not covered by domain/UI layers
   → Persistence, performance, security, integration
3. For each unclear technical decision:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Research and select appropriate technologies
   → Database, caching, message queues, etc.
5. Design system architecture and data flow
6. Plan performance, security, and monitoring strategies
7. Run compliance checklists (Constitution + React Router Law)
   → If violations found: ERROR "Fix compliance issues"
8. Return: SUCCESS (system design ready for implementation)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on technical infrastructure and non-functional requirements
- ❌ Avoid domain logic or UI-specific concerns
- 🏗️ Implementation blueprint for system-level technical decisions

### Section Requirements
- **Technology Stack**: Always required - core infrastructure choices
- **Architecture Overview**: Always required - system component diagram
- **Data Architecture**: Required when persistence is involved
- **Performance/Security**: Optional - based on non-functional requirements

### For AI Generation
When creating this system design:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for unclear technical requirements
2. **Don't guess**: If performance/security requirements are ambiguous, mark them
3. **Think like a systems architect**: Focus on scalability, reliability, maintainability
4. **Common underspecified areas**:
   - Performance requirements and SLAs
   - Security and compliance requirements
   - Data backup and disaster recovery
   - Monitoring and alerting needs
   - Third-party integration requirements
   - Deployment and infrastructure needs

---

## Overview
<!-- Brief description of this system component and its purpose -->

## Technology Stack

### Core Technologies
- **Primary Technology**: [e.g., PostgreSQL] - [Version and rationale]
- **ORM/Query Builder**: [e.g., Drizzle ORM] - [Rationale for choice]
- **Additional Tools**: [e.g., Redis for caching] - [Purpose and rationale]

### Supporting Libraries
- **Library Name**: [Purpose and rationale]
- **Library Name**: [Purpose and rationale]

## Architecture Overview
<!-- High-level architecture diagram and explanation -->

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Application │────│ Service     │────│ Database    │
│ Layer       │    │ Layer       │    │ Layer       │
└─────────────┘    └─────────────┘    └─────────────┘
         │                  │                  │
         │                  │                  │
    [Component]         [Component]       [Component]
```

## Data Architecture
<!-- Database schema, data models, relationships -->

### Database Schema
- **Table/Collection**: [Name] - [Purpose]
  - Fields: [Key fields and types]
  - Indexes: [Important indexes for performance]

### Data Flow
1. [Data source] → [Processing] → [Storage]  
2. [Request] → [Validation] → [Business Logic] → [Persistence]

## Performance Considerations
<!-- Caching, optimization, scalability -->

### Caching Strategy
- **Cache Type**: [e.g., Redis] - [What is cached and why]
- **Cache Invalidation**: [How and when cache is updated]

### Optimization  
- **Query Optimization**: [Database query strategies]
- **Resource Management**: [Memory, connections, etc.]

## Async Processing
<!-- Background jobs, queues, event processing -->

### Background Jobs
- **Job Type**: [Purpose and trigger conditions]
- **Processing**: [How jobs are executed]

### Event Handling
- **Event Source**: [Where events originate]
- **Event Processing**: [How events are handled]

## Error Handling & Monitoring
<!-- Error recovery, logging, observability -->

### Error Recovery
- **Strategy**: [How errors are handled and recovered]
- **Fallbacks**: [Fallback mechanisms]

### Logging & Monitoring
- **Logging**: [What is logged and where]
- **Metrics**: [Key performance indicators tracked]

## Security Considerations
<!-- Authentication, authorization, data protection -->

### Data Security
- **Encryption**: [Data encryption at rest and in transit]
- **Access Control**: [How access is controlled]

### API Security  
- **Authentication**: [How users/services are authenticated]
- **Authorization**: [How permissions are enforced]

## Constitution Compliance Checklist
<!-- Verify adherence to constitution.md principles -->
- [ ] Architecture follows separation of concerns
- [ ] Dependencies are properly abstracted
- [ ] Error handling is comprehensive
- [ ] Security best practices are implemented
- [ ] [Add other constitution.md requirements as applicable]

## React Router Law Compliance Checklist
<!-- If applicable - verify adherence to law/react-router-law.md -->
- [ ] Server-side integration follows React Router patterns
- [ ] API endpoints align with route structure
- [ ] Data loading strategies are compatible
- [ ] [Add other react-router-law.md requirements as applicable]

---
*This document defines the system-level architecture and technology choices. Implementation should strictly follow these decisions.*