#!/bin/bash

# Gradient Removal Script for Tools Hub
# This script removes all gradient classes and replaces them with solid colors
# Creates backups before making changes

set -e  # Exit on error

echo "🎨 Starting Gradient Removal Process..."
echo "========================================"

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for files processed
count=0

# Function to process a single file
process_file() {
    local file="$1"
    local backup="${file}.backup"

    # Skip if file doesn't exist or is a backup
    [[ ! -f "$file" || "$file" == *.backup ]] && return

    # Create backup
    cp "$file" "$backup"

    # Apply sed replacements for common gradient patterns
    sed -i \
        -e 's/bg-gradient-to-r from-blue-[0-9]* to-purple-[0-9]*/bg-blue-600/g' \
        -e 's/bg-gradient-to-r from-blue-[0-9]* via-purple-[0-9]* to-pink-[0-9]*/bg-blue-600/g' \
        -e 's/bg-gradient-to-r from-orange-[0-9]* to-pink-[0-9]*/bg-orange-500/g' \
        -e 's/bg-gradient-to-r from-green-[0-9]* to-emerald-[0-9]*/bg-green-500/g' \
        -e 's/bg-gradient-to-r from-purple-[0-9]* to-pink-[0-9]*/bg-purple-500/g' \
        -e 's/bg-gradient-to-r from-indigo-[0-9]* to-purple-[0-9]*/bg-indigo-600/g' \
        -e 's/bg-gradient-to-r from-pink-[0-9]* to-rose-[0-9]*/bg-pink-500/g' \
        -e 's/bg-gradient-to-r from-cyan-[0-9]* to-blue-[0-9]*/bg-cyan-500/g' \
        -e 's/bg-gradient-to-br from-[^ ]* to-[^ ]*/bg-blue-100/g' \
        -e 's/bg-gradient-to-[a-z]* from-[^ ]*/bg-blue-50/g' \
        -e 's/text-gradient/text-blue-600 font-bold/g' \
        -e 's/hover:bg-gradient-to-r hover:from-[^ ]* hover:to-[^ ]*/hover:bg-blue-50/g' \
        -e 's/group-hover:bg-gradient-to-r group-hover:from-[^ ]* group-hover:to-[^ ]*/group-hover:bg-blue-50/g' \
        -e 's/group-hover:text-gradient/group-hover:text-blue-600/g' \
        -e 's/from-\([a-z]*\)-\([0-9]*\)\/\([0-9]*\) to-\([a-z]*\)-\([0-9]*\)\/\([0-9]*\)/bg-\1-\2 opacity-\3/g' \
        "$file"

    # Check if file was actually modified
    if ! diff -q "$file" "$backup" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Processed: $file"
        ((count++))
    else
        # No changes, remove backup
        rm "$backup"
    fi
}

export -f process_file
export count GREEN BLUE YELLOW NC

# Process all tool client files
echo -e "\n${BLUE}Processing tool client files...${NC}"
find src/app/tools -name "client.tsx" -type f | while read file; do
    process_file "$file"
done

# Process all category pages
echo -e "\n${BLUE}Processing category pages...${NC}"
find src/app/categories -name "page.tsx" -type f | while read file; do
    process_file "$file"
done

# Process remaining component files
echo -e "\n${BLUE}Processing component files...${NC}"
find src/components -name "*.tsx" -type f | while read file; do
    process_file "$file"
done

# Process other app pages
echo -e "\n${BLUE}Processing other pages...${NC}"
for file in src/app/about/page.tsx src/app/contact/client.tsx src/app/privacy/page.tsx src/app/terms/page.tsx; do
    if [[ -f "$file" ]]; then
        process_file "$file"
    fi
done

echo ""
echo "========================================"
echo -e "${GREEN}✓ Gradient removal complete!${NC}"
echo -e "${YELLOW}Note: Backup files created with .backup extension${NC}"
echo ""
echo "To restore from backups if needed:"
echo "  find . -name '*.backup' -exec bash -c 'mv \"\$0\" \"\${0%.backup}\"' {} \;"
echo ""
echo "To remove all backups after verifying:"
echo "  find . -name '*.backup' -delete"
echo ""
