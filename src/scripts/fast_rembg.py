import os
from rembg import remove, new_session
from PIL import Image

src_path = r"C:\Users\Arul Dass\.gemini\antigravity\brain\1387f7eb-4b24-4dcd-a446-787e1c4dd841\.user_uploaded\media_1787384085774.jpg"
out_dir = r"c:\Users\Arul Dass\Desktop\DX Studio\public\assets"
os.makedirs(out_dir, exist_ok=True)
out_png = os.path.join(out_dir, "dx-cassette-transparent.png")

# Use lightweight fast u2netp or isnet model (4MB - 40MB)
session = new_session("u2netp")
with open(src_path, "rb") as f:
    input_data = f.read()

output_data = remove(input_data, session=session, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=10)

with open(out_png, "wb") as f:
    f.write(output_data)

print(f"Generated ultra-high-res transparent tape at {out_png}")
