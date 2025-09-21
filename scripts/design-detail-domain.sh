#!/bin/bash

# Protomaton Domain Detail Script
# Creates detail documentation for domain decisions

if [ $# -lt 2 ]; then
    echo "Usage: ./scripts/design-detail-domain.sh [domain-name] [detail-name]"
    echo "Example: ./scripts/design-detail-domain.sh todo task-validation"
    exit 1
fi

domain_name="$1"
detail_name="$2"
domain_dir="app/domain/${domain_name}"
detail_file="${domain_dir}/design-detail/${detail_name}.md"

# Check if domain directory exists
if [ ! -d "$domain_dir" ]; then
    echo "❌ Error: Domain directory ${domain_dir} does not exist"
    echo "Create the domain first with: ./scripts/design-domain.sh ${domain_name}"
    exit 1
fi

# Create design-detail directory
mkdir -p "${domain_dir}/design-detail"

# Create detail document from template if it doesn't exist
if [ ! -f "$detail_file" ]; then
    echo "Creating domain detail document: ${detail_file}"
    cp "templates/detail-template.md" "${detail_file}"
    
    # Replace placeholders
    sed -i.bak "s/{{NAME}}/${detail_name}/g" "${detail_file}" && rm "${detail_file}.bak"
    sed -i.bak "s/{{DATE}}/$(date +%Y-%m-%d)/g" "${detail_file}" && rm "${detail_file}.bak"
    
    echo "✅ Domain detail document created: ${detail_file}"
else
    echo "✅ Domain detail document already exists: ${detail_file}"
fi

echo "🚀 Ready to document architectural decision for domain '${domain_name}'"
echo "📝 Detail document: ${detail_file}"