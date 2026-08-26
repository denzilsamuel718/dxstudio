import os
import numpy as np
from PIL import Image, ImageFilter

src_path = r"C:\Users\Arul Dass\.gemini\antigravity\brain\1387f7eb-4b24-4dcd-a446-787e1c4dd841\.user_uploaded\media_1787384085774.jpg"
out_dir = r"c:\Users\Arul Dass\Desktop\DX Studio\public\assets"
os.makedirs(out_dir, exist_ok=True)
out_png = os.path.join(out_dir, "dx-cassette-clean.png")

img = Image.open(src_path).convert("RGBA")
arr = np.array(img, dtype=np.float32)
h, w, _ = arr.shape

r = arr[:, :, 0]
g = arr[:, :, 1]
b = arr[:, :, 2]

# Detect background color signature:
# Purple background: high saturation in magenta/purple (B > G, R > G)
# In cassette body:
# The chassis border is dark/charcoal/black where R, G, B are all low and nearly equal or G is closer to R and B.
# Background corner average is deep purple: R~70-130, G~10-40, B~100-180
# Difference (B - G) and (R - G)

is_purple_bg = (b - g > 30) & (r - g > 20) & ((g < 80) | (b > 120))

# To protect the purple label INSIDE the cassette:
# The cassette outer boundary is roughly:
# Top: around 18% to 82% height, Left: 4% to 96% width
# Let's find connected background from the 4 image borders using flood-fill on the mask
from collections import deque

visited = np.zeros((h, w), dtype=bool)
queue = deque()

# Add all 4 outer borders to queue
for y in range(h):
    queue.append((y, 0))
    queue.append((y, w - 1))
    visited[y, 0] = True
    visited[y, w - 1] = True

for x in range(w):
    queue.append((0, x))
    queue.append((h - 1, x))
    visited[0, x] = True
    visited[h - 1, x] = True

# Cassette dark chassis color threshold:
# Chassis dark edge has r+g+b < 120 and |r-g| < 25 and |b-g| < 25 or is non-purple dark metal
while queue:
    cy, cx = queue.popleft()
    
    # Check 4 neighbors
    for ny, nx in [(cy-1, cx), (cy+1, cx), (cy, cx-1), (cy, cx+1)]:
        if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
            # A pixel is background if it has purple background characteristics
            # and is NOT dark cassette chassis
            pr, pg, pb = r[ny, nx], g[ny, nx], b[ny, nx]
            
            # Cassette outer edge condition: dark chassis
            is_chassis_edge = (pr < 70 and pg < 70 and pb < 70 and abs(pb - pg) < 25)
            
            # Is background purple/vignette
            is_bg = (pb - pg > 18 and pr - pg > 12) or (pb > 70 and pg < 45) or (pr + pg + pb < 35)
            
            if is_bg and not is_chassis_edge:
                visited[ny, nx] = True
                queue.append((ny, nx))

# Alpha mask: 0 for background, 255 for cassette
alpha = np.where(visited, 0, 255).astype(np.uint8)

# Smooth edges using Pillow GaussianBlur for soft anti-aliasing
mask_img = Image.fromarray(alpha, mode='L')
mask_img = mask_img.filter(ImageFilter.GaussianBlur(radius=1.2))

# Apply mask to image
result = Image.open(src_path).convert("RGBA")
result.putalpha(mask_img)
result.save(out_png, format="PNG")
print(f"Saved clean cutout to {out_png}")
