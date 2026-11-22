---
name: remove-gemini-mark
description: Remove the visible Gemini sparkle logo from the bottom-right corner of the user's own Gemini / Nano Banana generated images (thumbnail art). Use when the user says "remove the watermark/logo/sparkle" on images they generated in Gemini, or as the cleaning step inside the youtube-thumbnail skill.
---

# Remove the Gemini sparkle

Only for images the user generated themselves in Gemini. Google's invisible SynthID watermark stays in the pixels, so the image is still identifiable as AI-made. Never use it on other people's images or on stock / photo watermarks.

## How it works
The sparkle is a white star blended over the picture at up to 51% opacity, always 112 px from the bottom-right corner on 2752x1536 output (scaled for other sizes). `scripts/gemini_mark_alpha.png` is its measured opacity map. `scripts/remove_mark.py` reverses the blend and restores the real pixels underneath: no blur, no smudge.

## Use
```bash
python3 "$(git rev-parse --show-toplevel)/.claude/skills/remove-gemini-mark/scripts/remove_mark.py" in.png out.png
```
- No second path = overwrite in place. If no sparkle is detected it leaves the file unchanged.
- `ai_compose.py` in `projects/ifblaze-thumbs/ai/` calls it automatically on every art file.
- After cleaning, zoom on the bottom-right 240x240 corner and check that nothing is left. If Gemini changes the mark's size or place, re-measure the alpha on a flat-coloured image (see the comment at the top of the script).
