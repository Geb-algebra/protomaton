#!/bin/bash

# Protomaton Specify Script
# Creates specification document from template if needed

if [ $# -ne 1 ]; then
    echo "Usage: ./scripts/specify.sh [spec_name]"
    echo "Example: ./scripts/specify.sh user-authentication"
    exit 1
fi

spec_name="$1"
spec_file="docs/spec/${spec_name}.md"

# Create spec from template if it doesn't exist
if [ ! -f "$spec_file" ]; then
    echo "Creating new spec: ${spec_file}"
    cp templates/spec-template.md "${spec_file}"
    
    # Replace placeholders
    sed -i.bak "s/{{SPEC_NAME}}/${spec_name}/g" "${spec_file}" && rm "${spec_file}.bak"
    sed -i.bak "s/{{DATE}}/$(date +%Y-%m-%d)/g" "${spec_file}" && rm "${spec_file}.bak"
    
    echo "✅ New spec created: ${spec_file}"
else
    echo "✅ Spec already exists: ${spec_file}"
fi

echo "🚀 Ready for /specify ${spec_name}"