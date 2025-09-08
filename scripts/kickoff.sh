#!/bin/bash

# Protomaton Kickoff Script
# Creates a new branch and change history document for a new development session

if [ $# -ne 2 ]; then
    echo "Usage: ./scripts/kickoff.sh [short_name] [full_description]"
    echo "Example: ./scripts/kickoff.sh user-auth 'Add user authentication with OAuth'"
    echo "Note: The AI should generate the short_name (kebab-case, max 20 chars)"
    exit 1
fi

short_name="$1"
full_description="$2"
date=$(date +%y%m%d)
change_name="${date}_${short_name}"
branch_name="feature/${change_name}"

# Create new branch
echo "Creating branch: ${branch_name}"
git checkout -b "${branch_name}"

# Create change history document from template
change_file="docs/changes/${change_name}.md"
echo "Creating change history: ${change_file}"
cp templates/change-history-template.md "${change_file}"

# Replace placeholders
sed -i.bak "s/{{DESCRIPTION}}/${full_description}/g" "${change_file}" && rm "${change_file}.bak"
sed -i.bak "s/{{DATE}}/$(date +%Y-%m-%d)/g" "${change_file}" && rm "${change_file}.bak"
sed -i.bak "s/{{FILENAME}}/${change_name}/g" "${change_file}" && rm "${change_file}.bak"

echo "✅ Kickoff complete!"
echo "📝 Change history created: ${change_file}"
echo "📋 Description: ${full_description}"
echo "🌿 Branch created: ${branch_name}"
echo "🚀 Next step: Run '/kickoff ${change_name}' to complete the change history"