#!/bin/bash

# Protomaton Design Detail Script
# Creates detailed design documents from templates

if [ $# -lt 3 ]; then
    echo "Usage: ./scripts/design-detail.sh [type] [name] [description]"
    echo "Types: domain, app, system"
    echo "Example: ./scripts/design-detail.sh domain user-management auth-strategy"
    echo "Example: ./scripts/design-detail.sh app login-page form-validation"
    echo "Example: ./scripts/design-detail.sh system database connection-pooling"
    exit 1
fi

type="$1"
name="$2"
description="$3"
details_dir="docs/${type}/${name}/details"
detail_file="${details_dir}/${description}.md"

# Validate type
case "$type" in
    domain|app|system)
        ;;
    *)
        echo "❌ Invalid type: $type. Must be domain, app, or system"
        exit 1
        ;;
esac

# Create directory structure if it doesn't exist
mkdir -p "${details_dir}"

# Create detail doc from template if it doesn't exist
if [ ! -f "$detail_file" ]; then
    echo "Creating new detailed design: ${detail_file}"
    cp "templates/detail-template.md" "${detail_file}"
    
    # Replace placeholders
    sed -i.bak "s/{{TYPE}}/${type}/g" "${detail_file}" && rm "${detail_file}.bak"
    sed -i.bak "s/{{NAME}}/${name}/g" "${detail_file}" && rm "${detail_file}.bak"
    sed -i.bak "s/{{DESCRIPTION}}/${description}/g" "${detail_file}" && rm "${detail_file}.bak"
    sed -i.bak "s/{{DATE}}/$(date +%Y-%m-%d)/g" "${detail_file}" && rm "${detail_file}.bak"
    
    echo "✅ New detailed design created: ${detail_file}"
else
    echo "✅ Detailed design already exists: ${detail_file}"
fi

echo "🚀 Ready for detailed design work on ${type}/${name}/${description}"