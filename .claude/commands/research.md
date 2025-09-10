# Protomaton Research Command

notes: read and follow CLAUDE.md before you start

You are helping with the Protomaton research phase - performing web research for technical decisions marked as [NEEDS RESEARCH] in architecture documents.

## Your Task
Search through app and system architecture documents to find [NEEDS RESEARCH] markers, then perform comprehensive web research to provide evidence-based technology recommendations.

## Process
1. **Scan Architecture Documents**: Search all `docs/app/*/architecture.md` and `docs/system/*/architecture.md` files for [NEEDS RESEARCH] markers
2. **Extract Research Questions**: For each marker, identify the specific technical decision that needs research
3. **Perform Web Research**: Use WebSearch to research each question thoroughly:
   - Compare multiple technology options
   - Look for current best practices and industry standards
   - Check compatibility with the project's tech stack (React Router v7, CloudFlare Workers)
   - Find performance benchmarks and trade-offs
   - Review recent community discussions and adoption trends
4. **Document Findings**: Create detailed design documents using `./scripts/design-detail.sh [type] [name] [description]` and complete the "Execution Flow" section in the document created in `./docs/[type]/detail/[name].md`.
   - `docs/app/[name]/architecture.md` → type: `app`, name: `[name]`
   - `docs/system/[name]/architecture.md` → type: `system`, name: `[name]`
5. **Update Architecture**: Update architecture documents with research-backed recommendations, removing [NEEDS RESEARCH] markers

## Detail Design Creation Process

For each research question found:
1. **Identify the design type and name** from the file path:
   - `docs/app/[name]/architecture.md` → type: `app`, name: `[name]`
   - `docs/system/[name]/architecture.md` → type: `system`, name: `[name]`

2. **Run design-detail.sh** to create detailed design document:
   ```bash
   ./scripts/design-detail.sh [type] [name] [description-of-research-topic]
   ```
   
3. **Fill the detailed design document** with research findings using this structure:
   - **Technology Research Summary**: 2-3 sentence summary of findings and final recommendation
   - **Options Evaluated**: Detailed comparison of technologies/approaches
   - **Performance Analysis**: Benchmarks, bundle size impacts, compatibility
   - **Final Recommendation**: Chosen technology with rationale
   - **Implementation Guidance**: Specific implementation considerations
   - **Sources**: Research sources and URLs

## Architecture Update Process
After completing research and creating detail documents:
1. Update the main architecture document  
2. Replace `[NEEDS RESEARCH: question]` with concrete technology decisions
3. Add technology choices to appropriate sections (Technology Stack, etc.)
4. Reference the detailed design document for comprehensive analysis

## Search Strategy
Use targeted search queries like:
- "[technology] vs [alternative] 2024 comparison"
- "[technology] React Router v7 compatibility"
- "[technology] CloudFlare Workers deployment"
- "best [category] library 2024 performance"
- "[technology] pros cons production experience"

## Important Notes
- Focus on technologies compatible with CloudFlare Workers deployment
- Prioritize solutions that work well with React Router v7
- Consider bundle size impact for client-side performance
- Look for actively maintained libraries with good TypeScript support
- Research recent discussions (2023-2025) for current best practices

Begin research process now.