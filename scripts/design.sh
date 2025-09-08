#!/bin/bash

# Protomaton Design Script
# Creates design documents from templates if needed

if [ $# -lt 2 ]; then
    echo "Usage: ./scripts/design.sh [type] [name]"
    echo "Types: domain, ui, system"
    echo "Example: ./scripts/design.sh domain user-management"
    echo "Example: ./scripts/design.sh ui login-page"
    echo "Example: ./scripts/design.sh system database"
    exit 1
fi

type="$1"
name="$2"
design_dir="docs/${type}/${name}"
design_file="${design_dir}/architecture.md"

# Validate type
case "$type" in
    domain|ui|system)
        ;;
    *)
        echo "❌ Invalid type: $type. Must be domain, ui, or system"
        exit 1
        ;;
esac

# Create directory structure
mkdir -p "${design_dir}/details"

# Create architecture doc from template if it doesn't exist
if [ ! -f "$design_file" ]; then
    echo "Creating new design: ${design_file}"
    cp "templates/${type}-architecture-template.md" "${design_file}"
    
    # Replace placeholders
    sed -i.bak "s/{{NAME}}/${name}/g" "${design_file}" && rm "${design_file}.bak"
    sed -i.bak "s/{{DATE}}/$(date +%Y-%m-%d)/g" "${design_file}" && rm "${design_file}.bak"
    
    echo "✅ New design created: ${design_file}"
else
    echo "✅ Design already exists: ${design_file}"
fi

echo "🚀 Ready for /design ${type} ${name}"