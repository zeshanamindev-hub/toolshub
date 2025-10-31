#!/usr/bin/env python3
import os
import re

tools_dir = "/home/mobeen/Desktop/Work/Personal/timio/src/app/tools"

def to_pascal_case(s):
    """Convert kebab-case to PascalCase"""
    return ''.join(word.capitalize() for word in s.split('-'))

os.chdir(tools_dir)

for tool in os.listdir('.'):
    client_path = os.path.join(tool, 'client.tsx')
    if os.path.isdir(tool) and os.path.exists(client_path):
        class_name = to_pascal_case(tool)

        with open(client_path, 'r') as f:
            content = f.read()

        # Replace export default function XxxPage() with XxxClient()
        pattern = r'export default function \w+Page\(\)'
        replacement = f'export default function {class_name}Client()'
        new_content = re.sub(pattern, replacement, content)

        if new_content != content:
            with open(client_path, 'w') as f:
                f.write(new_content)
            print(f"✓ Updated {tool}")

print("\n✓ All client exports updated successfully!")
