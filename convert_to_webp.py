#!/usr/bin/env python3
"""Convert all non-WebP images to WebP format."""
import os
import sys
import io
from pathlib import Path
from PIL import Image

# Fix encoding for Windows console
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

def convert_images():
    assets_dir = Path("public/assets")
    supported_formats = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.tif'}
    
    converted = []
    skipped = []
    errors = []
    
    for img_path in sorted(assets_dir.rglob("*")):
        if img_path.suffix.lower() not in supported_formats:
            continue
            
        webp_path = img_path.with_suffix('.webp')
        
        # Skip if WebP version already exists
        if webp_path.exists():
            skipped.append(img_path)
            continue
        
        try:
            with Image.open(img_path) as img:
                # Convert RGBA to RGB for WebP (WebP supports both, but RGB is smaller)
                if img.mode == 'RGBA':
                    # Create white background
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    background.paste(img, mask=img.split()[3])
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                img.save(webp_path, 'WEBP', quality=85)
                converted.append(str(img_path))
                print(f"Converted: {img_path}")
                
        except Exception as e:
            errors.append(f"{img_path}: {e}")
            print(f"Error converting {img_path}: {e}")
    
    print(f"\nSummary:")
    print(f"Converted: {len(converted)} files")
    print(f"Skipped (already exists): {len(skipped)} files")
    print(f"Errors: {len(errors)} files")
    if errors:
        print("\nErrors:")
        for err in errors:
            print(f"  {err}")
    
    return converted, skipped, errors

if __name__ == "__main__":
    os.chdir(Path(__file__).parent)
    convert_images()
