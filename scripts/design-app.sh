#!/bin/bash

# Protomaton Design Script
# Creates design documents from templates if needed

if [ $# -lt 1 ]; then
    echo "Usage: ./scripts/design.sh [feature name]"
    echo "Example: ./scripts/design.sh login-page"
    exit 1
fi

name="$1"
design_dir="app/features/${name}"
design_file="${design_dir}/design.md"

# Create directory structure
mkdir -p "${design_dir}"

# Create design doc from template if it doesn't exist
if [ ! -f "$design_file" ]; then
    echo "Creating new design: ${design_file}"
    cp "templates/design-template.md" "${design_file}"
    
    echo "✅ New design created: ${design_file}"
else
    echo "✅ Design already exists: ${design_file}"
fi