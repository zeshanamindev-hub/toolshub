#!/usr/bin/env python3
import os
import re
import sys

# Import config from previous script
sys.path.insert(0, '/home/mobeen/Desktop/Work/Personal/timio')
from add_seo_phase5 import PHASE5_CONFIGS

def add_seo_toolpagelayout(tool_key, config):
    """Add SEO content to tools using ToolPageLayout"""
    file_path = f"src/app/tools/{tool_key}/client.tsx"
    
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return False
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'Full-width SEO Content Section' in content:
        print(f"✓ {tool_key} already has SEO content")
        return True
    
    # Add Info import if needed
    if ', Info ' not in content and 'Info, ' not in content:
        content = re.sub(
            r'(from ["\']lucide-react["\'])',
            r', Info \1',
            content,
            count=1
        )
    
    # Build SEO section
    features = "\n".join([
        f'''                    <li className="flex items-start gap-2">
                      <span className="text-{config['color']}-600 mt-1">•</span>
                      <span><strong>{title}:</strong> {desc}</span>
                    </li>'''
        for title, desc in config['features']
    ])
    
    steps = "\n".join([
        f'''                    <li className="flex items-start gap-2">
                      <span className="font-bold text-{config['color']}-600">{i}.</span>
                      <span>{step}</span>
                    </li>'''
        for i, step in enumerate(config['steps'], 1)
    ])
    
    use_cases = "\n".join([
        f'''                <li className="flex items-start gap-2">
                  <span className="text-{config['color']}-600 mt-1">•</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>'''
        for title, desc in config['use_cases']
    ])
    
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
                {config['intro']}
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
{features}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                  <ol className="space-y-2">
{steps}
                  </ol>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">What is it?</h3>
              <p className="mb-4">
                {config['what_is']}
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-2 mb-4">
{use_cases}
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Security</h3>
                <p>
                  All processing happens entirely in your browser using client-side JavaScript.
                  Your data never leaves your device and is not transmitted to any server.
                </p>
              </div>
            </div>
          </div>
        </div>'''
    
    # Find ToolPageLayout closing and insert before it
    pattern = r'(\s*</ToolPageLayout>\s*</>?\s*\)\s*})\s*$'
    match = re.search(pattern, content)
    
    if match:
        insertion_point = match.start()
        new_content = content[:insertion_point] + seo_section + '\n      ' + content[insertion_point:]
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ Added SEO content to {tool_key}")
        return True
    else:
        print(f"⚠️  Could not find ToolPageLayout in {tool_key}")
        return False

def main():
    print("=" * 70)
    print("Adding SEO Content to Phase 5 Tools (ToolPageLayout version)")
    print("=" * 70)
    
    success = 0
    for tool_key, config in PHASE5_CONFIGS.items():
        if add_seo_toolpagelayout(tool_key, config):
            success += 1
    
    print("=" * 70)
    print(f"✓ Successfully updated {success}/{len(PHASE5_CONFIGS)} tools")
    print("=" * 70)

if __name__ == "__main__":
    main()
