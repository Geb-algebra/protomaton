#!/bin/bash

# Protomaton Domain Setup Script
# Copies domain templates to app/domain/[name]

if [ $# -lt 1 ]; then
    echo "Usage: ./scripts/design-domain.sh [domain-name]"
    echo "Example: ./scripts/design-domain.sh user-management"
    exit 1
fi

name="$1"
domain_code_dir="app/domain/${name}"

# Check if domain directory already exists with files
if [ -d "$domain_code_dir" ] && [ "$(ls -A "$domain_code_dir" 2>/dev/null)" ]; then
    echo "❌ Error: Domain directory '${domain_code_dir}' already exists and contains files"
    echo "Please choose a different name or remove the existing directory first"
    exit 1
fi

# Create domain code directory
mkdir -p "$domain_code_dir"

# Copy all domain template files
if [ -d "templates/domain-templates" ]; then
    echo "Copying domain templates to ${domain_code_dir}..."
    cp -r templates/domain-templates/* "$domain_code_dir/"
    
    # Replace placeholders in overview.md
    current_date=$(date "+%Y-%m-%d")
    if [ -f "${domain_code_dir}/overview.md" ]; then
        sed -i.bak "s/{{NAME}}/${name}/g" "${domain_code_dir}/overview.md"
        sed -i.bak "s/{{DATE}}/${current_date}/g" "${domain_code_dir}/overview.md"
        rm "${domain_code_dir}/overview.md.bak"
        echo "✅ Placeholders replaced in overview.md"
    fi
    
    echo "✅ Domain templates copied to ${domain_code_dir}"
else
    echo "❌ Error: templates/domain-templates directory not found"
    exit 1
fi

echo "🚀 Domain '${name}' ready for implementation!"
echo "💻 Code templates: ${domain_code_dir}/"