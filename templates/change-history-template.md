# Change History: {{FILENAME}}

**Status**: Live  
**Created**: {{DATE}}  
**Description**: {{DESCRIPTION}}

## Execution Flow
```
1. Parse user description and project context
   → If description too vague: ERROR "Need clearer feature description"
2. Identify scope of change
   → New feature | Bug fix | Enhancement | Refactor
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Map to existing documentation
   → Which specs need updates?
   → Which designs are affected?
5. Identify new documentation needs
   → What new specs/designs are needed?
6. Plan documentation sequence
   → Dependencies between documents
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Change scope has uncertainties"
   → If missing key documents: ERROR "Critical documentation missing"
8. Return: SUCCESS (change plan ready for execution)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT documentation needs to be created/updated
- ❌ Avoid implementation details or coding todos
- 📋 Planning document for stakeholder alignment

### Section Requirements
- **Overview**: Always required - clear change summary
- **Documentation Updates**: Always required - specific file impacts
- **Notes**: Optional - additional context or constraints

### For AI Generation
When creating this change history:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for any assumption about scope
2. **Don't guess**: If unclear what documents are affected, mark it rather than assume
3. **Think systematically**: Consider all document types (spec, domain, ui, system)
4. **Common underspecified areas**:
   - Integration points with existing features
   - User permission/role impacts
   - Data migration or compatibility needs
   - Performance/scale considerations
   - Security/compliance implications
   - Cross-feature dependencies

---

## Overview
<!-- Provide a clear overview of what needs to be changed and why -->

## Documentation Updates Required

### Specifications (docs/spec/)
<!-- List which spec documents need to be created or updated -->
- [ ] **spec-name.md** - New/Update - Brief description of changes needed

### Domain Designs (app/domain/ as self-documented codes) 
<!-- List which domain designs need to be created or updated -->
- [ ] **app/domain-name** - New/Update - Brief description of changes needed

### Application Designs (docs/app/)
<!-- List which UI designs need to be created or updated -->
- [ ] **page-name/architecture.md** - New/Update - Brief description of changes needed

### System Designs (docs/system/)
<!-- List which system designs need to be created or updated -->  
- [ ] **item-name/architecture.md** - New/Update - Brief description of changes needed

## Notes
<!-- Any additional context, constraints, or considerations. Do Not include what is specified by constitution/laws -->

---
*This document tracks the planned documentation changes for this development session. Status will change to "Fixed" when development is complete.*