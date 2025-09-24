#!/bin/bash

# Protomaton ADR Script
# Creates Architectural Decision Records from template

if [ $# -lt 1 ]; then
    echo "Usage: ./scripts/adr.sh [decision-name]"
    echo "Example: ./scripts/adr.sh database-choice"
    echo "Example: ./scripts/adr.sh state-management-strategy"
    exit 1
fi

decision_name="$1"
adr_dir="docs/adr"
adr_file="${adr_dir}/${decision_name}.md"

# Create directory structure if it doesn't exist
mkdir -p "${adr_dir}"

# Create ADR from template if it doesn't exist
if [ ! -f "$adr_file" ]; then
    echo "Creating new ADR: ${adr_file}"
    cp "templates/adr-template.md" "${adr_file}"
    
    # Replace placeholders
    sed -i.bak "s/{{NAME}}/${decision_name}/g" "${adr_file}" && rm "${adr_file}.bak"
    sed -i.bak "s/{{DATE}}/$(date +%Y-%m-%d)/g" "${adr_file}" && rm "${adr_file}.bak"
    
    echo "✅ New ADR created: ${adr_file}"
else
    echo "✅ ADR already exists: ${adr_file}"
fi

echo "🚀 Ready to document architectural decision: ${decision_name}"