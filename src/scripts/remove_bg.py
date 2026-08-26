import os
import sys
from PIL import Image, ImageFilter, ImageOps
import numpy as np

src_path = r"C:\Users\Arul Dass\.gemini\antigravity\brain\1387f7eb-4b24-4dcd-a446-787e1c4dd841\.user_uploaded\media_1787384085774.jpg"
out_dir = r"c:\Users\Arul Dass\Desktop\DX Studio\public\assets"
os.makedirs(out_dir, exist_ok=True)
out_png = os.path.join(out_dir, "dx-cassette-transparent.png")

try:
    from rembg import remove
    print("Using rembg for state-of-the-art AI background removal...")
    with open(src_path, "rb") as f:
        input_data = f.read()
    output_data = remove(input_data)
    with open(out_png, "wb") as f:
        f.write(output_data)
    print(f"Successfully created: {out_png}")
except Exception as e:
    print(f"rembg error or not installed: {e}")
    # Fallback to high-precision color matting & edge refinement
    img = Image.open(src_path).convert("RGBA")
    data = np.array(img, dtype=np.float32)
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    
    # Calculate purple background metric: in purple bg, R > G and B > G, and saturation is high, or difference from cassette edge
    # Let's inspect sample corners
    corner_pixels = np.concatenate([data[:50, :50], data[:50, -50:], data[-50:, :50], data[-50:, -50:]])
    mean_corner = np.mean(corner_pixels, axis=(0, 1))
    print(f"Mean corner color: {mean_corner}")
