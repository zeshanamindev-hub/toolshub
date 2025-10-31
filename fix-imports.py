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

        # Fix import statement
        pattern = r'import .* from "./client"'
        replacement = f'import {class_name}Client from "./client"'
        new_content = re.sub(pattern, replacement, content)

        if new_content != content:
            with open(page_path, 'w') as f:
                f.write(new_content)
            print(f"✓ Fixed import in {tool}")

print("\n✓ All imports fixed successfully!")
