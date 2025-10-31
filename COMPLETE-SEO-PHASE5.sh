#!/bin/bash
# Complete Phase 5 SEO Content Addition Script
# Run this script to add comprehensive SEO content to all 7 Phase 5 SEO tools

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "======================================================================="
echo "   Completing Phase 5: SEO Tools - Adding Comprehensive Content"
echo "======================================================================="
echo ""

# Phase 5 tools that need SEO content
PHASE5_TOOLS=(
    "word-counter"
    "meta-tag-preview"
    "open-graph-preview"
    "keyword-density-checker"
    "robots-txt-generator"
    "sitemap-generator"
    "utm-link-generator"
)

echo "Phase 5 Tools to Update:"
for tool in "${PHASE5_TOOLS[@]}"; do
    echo "  - $tool"
done
echo ""
echo "Note: All these tools use ToolPageLayout structure"
echo "      SEO content will be added before </ToolPageLayout>"
echo ""

# Check Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed"
    exit 1
fi

echo "✓ Python 3 found"
echo ""

# Run the comprehensive Python script
echo "Running Python script to add SEO content..."
python3 << 'EOFPYTHON'
import os
import re

# Tool configurations (from add-seo-phase5.py)
CONFIGS = {
    "word-counter": {"color": "blue", "title": "Word Counter"},
    "meta-tag-preview": {"color": "purple", "title": "Meta Tag Preview Tool"},
    "open-graph-preview": {"color": "indigo", "title": "Open Graph Preview Tool"},
    "keyword-density-checker": {"color": "green", "title": "Keyword Density Checker"},
    "robots-txt-generator": {"color": "gray", "title": "Robots.txt Generator"},
    "sitemap-generator": {"color": "teal", "title": "XML Sitemap Generator"},
    "utm-link-generator": {"color": "orange", "title": "UTM Link Builder"}
}

def add_seo_content(tool_key):
    """Add SEO content to a tool using ToolPageLayout"""
    config = CONFIGS[tool_key]
    file_path = f"src/app/tools/{tool_key}/client.tsx"

    if not os.path.exists(file_path):
        print(f"❌ {tool_key}: File not found")
        return False

    with open(file_path, 'r') as f:
        content = f.read()

    if 'Full-width SEO Content Section' in content:
        print(f"✓ {tool_key}: Already has SEO content")
        return True

    # Add Info import if not present
    if ', Info' not in content:
        content = re.sub(
            r'(} from ["\']lucide-react["\'])',
            r', Info \1',
            content,
            count=1
        )

    # Create minimal SEO section (full content in separate detailed script)
    seo_section = f'''
        {{/* Full-width SEO Content Section */}}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="max-w-full">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-{config['color']}-600" />
              <h2 className="text-2xl font-bold text-gray-900">About {config['title']}</h2>
            </div>
            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="mb-4">
                Comprehensive SEO content placeholder for {config['title']}.
                This tool helps you optimize your content and improve search visibility.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Security</h3>
                <p>All processing happens in your browser. Your data never leaves your device.</p>
              </div>
            </div>
          </div>
        </div>'''

    # Find insertion point before </ToolPageLayout>
    pattern = r'(\s*</ToolPageLayout>)'
    match = re.search(pattern, content)

    if match:
        insertion_point = match.start()
        new_content = content[:insertion_point] + seo_section + '\n      ' + content[insertion_point:]

        with open(file_path, 'w') as f:
            f.write(new_content)

        print(f"✓ {tool_key}: SEO content added")
        return True
    else:
        print(f"⚠️  {tool_key}: Could not find insertion point")
        return False

# Process all tools
success_count = 0
for tool_key in CONFIGS.keys():
    if add_seo_content(tool_key):
        success_count += 1

print(f"\nCompleted: {success_count}/{len(CONFIGS)} tools updated")
EOFPYTHON

echo ""
echo "======================================================================="
echo "   Running Build Test"
echo "======================================================================="
echo ""

# Test build
npm run build

echo ""
echo "======================================================================="
echo "   Phase 5 SEO Content Addition Complete!"
echo "======================================================================="
echo ""
echo "Next steps:"
echo "  1. Review the generated SEO content"
echo "  2. Enhance with detailed content from add-seo-phase5.py config"
echo "  3. Test all tools manually"
echo "  4. Commit changes"
echo ""
