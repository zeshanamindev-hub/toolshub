#!/usr/bin/env python3
import os
import re

tools_dir = "/home/mobeen/Desktop/Work/Personal/timio/src/app/tools"

def to_pascal_case(s):
    """Convert kebab-case to PascalCase"""
    return ''.join(word.capitalize() for word in s.split('-'))

os.chdir(tools_dir)

for tool in os.listdir('.'):
    page_path = os.path.join(tool, 'page.tsx')
    if os.path.isdir(tool) and os.path.exists(page_path):
        class_name = to_pascal_case(tool)

        with open(page_path, 'r') as f:
            content = f.read()

        # Fix export default function line
        pattern1 = r'export default function .+Page\(\) \{'
        replacement1 = f'export default function {class_name}Page() {{'
        content = re.sub(pattern1, replacement1, content)

        # Fix return statement
        pattern2 = r'return <.+Client />'
        replacement2 = f'return <{class_name}Client />'
        content = re.sub(pattern2, replacement2, content)

        with open(page_path, 'w') as f:
            f.write(content)
        print(f"✓ Fixed {tool}")

print("\n✓ All page function names and returns fixed!")
