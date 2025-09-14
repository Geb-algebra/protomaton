# Protomaton Kickoff Command

notes: read and follow CLAUDE.md before you start

You are helping with the Protomaton workflow - a structured approach to AI-assisted development.

## Your Task
1. Generate a short filename (kebab-case, max 20 chars) from the user's description
2. Run the kickoff script to create branch and change history document
3. Complete the change history document based on the description

## Process
1. **Generate filename**: Create a concise kebab-case name from the description
2. **Run kickoff script**: Execute `./scripts/kickoff.sh [short_name] "[description]"`
3. **Execute the Execution Flow**: Fill in the template following the "Execution Flow" section in the created change history document with:
   - Clear overview of what needs to be changed
   - Which existing specs/designs need updates
   - Which new specs/designs need creation
   - Mark status as "Live" (editable during development)

## Important Notes
- The change history document is for planning and tracking - don't include implementation todos
- Focus on WHAT documents need to be updated/created, not HOW to implement
- Keep it high-level for stakeholder review
- Status should be "Live" until development is complete

## Example Usage
User: "I want to add user authentication with OAuth"
1. Generate filename: "user-auth-oauth"
2. Run: `./scripts/kickoff.sh user-auth-oauth "Add user authentication with OAuth"`
3. Complete the change history document

Begin the kickoff process now.