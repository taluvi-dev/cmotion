from pathlib import Path
import base64
import html

# Source image created by the previous image generation step.
src_candidates = [
    Path("/mnt/data/viking_warrior_sprite_sheet_animation.png"),
    Path("/mnt/data/ghostwriter_images/generated/a_clean_flat_sprite_sheet_image_on_a_light_whit_1.png"),
]

src = next((p for p in src_candidates if p.exists()), None)
if src is None:
    raise FileNotFoundError("Could not find the generated sprite sheet image in the expected paths.")

b64 = base64.b64encode(src.read_bytes()).decode("ascii")
data_uri = f"data:image/png;base64,{b64}"

html_content = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Viking Sprite Sheet - Base64 Embedded</title>
  <style>
    :root {{
      color-scheme: light dark;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }}

    body {{
      margin: 0;
      padding: 24px;
      display: grid;
      place-items: center;
      min-height: 100vh;
      background: #f4f4f4;
    }}

    main {{
      max-width: 1100px;
      width: 100%;
    }}

    h1 {{
      font-size: 20px;
      margin: 0 0 16px;
      font-weight: 650;
    }}

    img {{
      width: 100%;
      height: auto;
      image-rendering: pixelated;
      border: 1px solid #ccc;
      background: white;
      display: block;
    }}

    code {{
      display: block;
      margin-top: 16px;
      padding: 12px;
      overflow-wrap: anywhere;
      white-space: pre-wrap;
      background: #eee;
      border: 1px solid #ccc;
      font-size: 12px;
    }}
  </style>
</head>
<body>
  <main>
    <h1>Viking Sprite Sheet</h1>
    <img alt="Viking warrior animated sprite sheet" src="{data_uri}">
    <code>Image embedded as base64 data URI.</code>
  </main>
</body>
</html>
"""

out = Path("/mnt/data/viking_sprite_sheet_base64.html")
out.write_text(html_content, encoding="utf-8")

print(f"Created: {out}")
print(f"Source image: {src}")
print(f"HTML size: {out.stat().st_size:,} bytes")
