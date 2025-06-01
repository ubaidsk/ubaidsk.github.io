#!/usr/bin/env python3
"""
Blog Conversion Script
Converts blogs from old-portfolio MDX format to new Hugo Markdown format
"""

import os
import re
import yaml
import shutil
from pathlib import Path
from datetime import datetime

def extract_frontmatter_and_content(file_path):
    """Extract frontmatter and content from MDX file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find frontmatter boundaries
    frontmatter_pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)$'
    match = re.match(frontmatter_pattern, content, re.DOTALL)
    
    if not match:
        print(f"Warning: No frontmatter found in {file_path}")
        return {}, content
    
    frontmatter_text = match.group(1)
    body_content = match.group(2)
    
    try:
        frontmatter = yaml.safe_load(frontmatter_text)
    except yaml.YAMLError as e:
        print(f"Error parsing frontmatter in {file_path}: {e}")
        return {}, body_content
    
    return frontmatter, body_content

def convert_frontmatter(old_frontmatter, filename):
    """Convert old frontmatter format to new Hugo format"""
    new_frontmatter = {}
    
    # Basic mappings
    if 'title' in old_frontmatter:
        new_frontmatter['title'] = old_frontmatter['title']
    
    if 'publishedAt' in old_frontmatter:
        # Convert date format
        new_frontmatter['date'] = old_frontmatter['publishedAt']
    
    if 'excerpt' in old_frontmatter:
        new_frontmatter['description'] = old_frontmatter['excerpt']
    
    # Set default author
    new_frontmatter['author'] = "Ubaid Shaikh"
    
    # Extract tags from filename and title
    tags = []
    if 'gsoc' in filename.lower():
        tags.append('gsoc')
    if 'wasm' in (old_frontmatter.get('title', '') + old_frontmatter.get('excerpt', '')).lower():
        tags.append('wasm')
    if 'lfortran' in (old_frontmatter.get('title', '') + old_frontmatter.get('excerpt', '')).lower():
        tags.append('lfortran')
    if 'fortran' in (old_frontmatter.get('title', '') + old_frontmatter.get('excerpt', '')).lower():
        tags.append('fortran')
    
    if tags:
        new_frontmatter['tags'] = tags
    
    # Add categories
    categories = []
    if 'gsoc' in filename.lower():
        categories.append('gsoc')
    if 'misc' in filename.lower():
        categories.append('misc')
    
    if categories:
        new_frontmatter['categories'] = categories
    
    # Add series for GSoC posts
    if 'gsoc' in filename.lower() and not filename.startswith('misc'):
        new_frontmatter['series'] = ["GSoC 2022"]
    
    # Hugo-specific settings
    new_frontmatter['ShowToc'] = True
    new_frontmatter['TocOpen'] = False
    new_frontmatter['ShowBreadCrumbs'] = True
    new_frontmatter['ShowPostNavLinks'] = True
    new_frontmatter['ShowCodeCopyButtons'] = True
    
    return new_frontmatter

def convert_content(content, input_dir, assets_dir):
    """Convert MDX content to Markdown and fix image paths"""
    # Convert image paths from /imgs/ to /images/
    # Pattern: ![alt text](/imgs/image.png) -> ![alt text](/images/image.png)
    content = re.sub(r'!\[([^\]]*)\]\(/imgs/([^)]+)\)', r'![\1](/images/\2)', content)
    
    # Also handle cases without leading slash
    content = re.sub(r'!\[([^\]]*)\]\(imgs/([^)]+)\)', r'![\1](/images/\2)', content)
    
    # Copy images from old location to new location
    old_imgs_dir = input_dir.parent / "public" / "imgs"
    if old_imgs_dir.exists():
        for img_file in old_imgs_dir.glob("*"):
            if img_file.is_file():
                dest_path = assets_dir / img_file.name
                if not dest_path.exists():
                    shutil.copy2(img_file, dest_path)
                    print(f"  Copied image: {img_file.name}")
    
    # Remove any MDX-specific syntax if present
    # For now, we'll assume the content is mostly markdown compatible
    
    # Add more content if needed marker
    if '<!--more-->' not in content and len(content) > 200:
        # Find a good place to insert <!--more--> (after first paragraph)
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if line.strip() == '' and i > 0 and lines[i-1].strip() != '':
                lines.insert(i, '\n<!--more-->')
                break
        content = '\n'.join(lines)
    
    return content

def generate_output_filename(input_filename):
    """Generate output filename from input filename"""
    # Remove .mdx extension and add .md
    base_name = input_filename.replace('.mdx', '')
    
    # Convert underscores and tildes to hyphens for better URL structure
    base_name = base_name.replace('_', '-').replace('~', '-')
    
    return f"{base_name}.md"

def convert_blog_file(input_path, output_dir, assets_dir):
    """Convert a single blog file"""
    print(f"Converting: {input_path}")
    
    # Extract frontmatter and content
    old_frontmatter, content = extract_frontmatter_and_content(input_path)
    
    if not old_frontmatter:
        print(f"Skipping {input_path} due to missing frontmatter")
        return
    
    # Convert frontmatter
    filename = os.path.basename(input_path)
    new_frontmatter = convert_frontmatter(old_frontmatter, filename)
    
    # Convert content and handle images
    input_dir = Path(input_path).parent
    new_content = convert_content(content, input_dir, assets_dir)
    
    # Generate output filename
    output_filename = generate_output_filename(filename)
    output_path = os.path.join(output_dir, output_filename)
    
    # Create the new file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('---\n')
        yaml.dump(new_frontmatter, f, default_flow_style=False, allow_unicode=True)
        f.write('---\n\n')
        f.write(new_content)
    
    print(f"Created: {output_path}")

def main():
    """Main conversion function"""
    # Define paths
    input_dir = Path("/Users/ubaid/projects/blog/old-portfolio/data/blogs")
    output_dir = Path("/Users/ubaid/projects/blog/content/posts")
    assets_dir = Path("/Users/ubaid/projects/blog/assets/images")
    
    # Ensure output directories exist
    output_dir.mkdir(parents=True, exist_ok=True)
    assets_dir.mkdir(parents=True, exist_ok=True)
    
    # Find all MDX files
    mdx_files = list(input_dir.glob("*.mdx"))
    
    if not mdx_files:
        print(f"No MDX files found in {input_dir}")
        return
    
    print(f"Found {len(mdx_files)} MDX files to convert")
    print("-" * 50)
    
    # Convert each file
    for mdx_file in sorted(mdx_files):
        try:
            convert_blog_file(mdx_file, output_dir, assets_dir)
        except Exception as e:
            print(f"Error converting {mdx_file}: {e}")
    
    print("-" * 50)
    print("Conversion completed!")
    print(f"Converted files saved to: {output_dir}")
    print(f"Images copied to: {assets_dir}")

if __name__ == "__main__":
    main()
