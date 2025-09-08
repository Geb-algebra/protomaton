# Architectural Decision Record: {{NAME}}

**Created**: {{DATE}}  
**Last Updated**: {{DATE}}  
**Status**: [Proposed | Accepted | Superseded]

## Execution Flow (ADR Creation)
```
1. Identify specific architectural decision requiring documentation
   → If decision too broad: ERROR "Break into specific decisions"
2. Research existing approaches and alternatives
3. For each unclear trade-off:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Analyze pros/cons of each alternative objectively
5. Document decision rationale with specific reasons
6. Identify implementation requirements and consequences
7. Link to related decisions and documents
8. Return: SUCCESS (ADR ready for review and acceptance)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on specific architectural decisions requiring justification
- ❌ Avoid general documentation or implementation guides
- 📚 Permanent record of decision reasoning for future reference

### Section Requirements
- **Context & Decision**: Always required - what and why
- **Alternatives Considered**: Always required - options evaluated
- **Rationale**: Always required - specific decision factors
- **Consequences**: Always required - positive and negative impacts

### For AI Generation
When creating this ADR:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for unclear requirements or constraints
2. **Don't guess**: If trade-offs are unclear, mark them rather than assume
3. **Think like a architect**: Focus on long-term maintainability and consequences
4. **Common underspecified areas**:
   - Performance requirements affecting the decision
   - Team expertise and learning curve considerations
   - Integration constraints with existing systems
   - Future scalability and evolution needs
   - Budget and timeline constraints
   - Regulatory or compliance requirements

---

## Context
<!-- What is the issue that we're seeing that is motivating this decision or change? -->

## Decision  
<!-- What is the change that we're proposing or have agreed to implement? -->

## Rationale
<!-- Why did we choose this approach? What were the key factors? -->

### Alternatives Considered
1. **Option A**: [Description]
   - Pros: [Benefits]
   - Cons: [Drawbacks]

2. **Option B**: [Description]  
   - Pros: [Benefits]
   - Cons: [Drawbacks]

3. **Chosen Option**: [Description]
   - Pros: [Benefits]  
   - Cons: [Drawbacks]
   - **Why chosen**: [Key decision factors]

## Implementation Notes
<!-- Specific guidance for implementing this decision -->

### Key Requirements
- [Requirement 1]
- [Requirement 2]

### Implementation Guidance
- [Guidance point 1]  
- [Guidance point 2]

## Consequences
<!-- What becomes easier or more difficult to do and any risks introduced? -->

### Positive Consequences
- [Benefit 1]
- [Benefit 2]

### Negative Consequences  
- [Risk or limitation 1]
- [Risk or limitation 2]

### Mitigation Strategies
- [How to address negative consequences]

## Related Decisions
<!-- Links to other ADRs or design documents that relate to this decision -->
- [Related document or decision]

---
*This ADR provides detailed decision rationale to supplement the basic architecture document. It should be maintained permanently to preserve the reasoning behind complex decisions.*