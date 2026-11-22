"""Remove the visible Gemini sparkle from the bottom-right corner of your own Gemini / Nano Banana images.

The sparkle is a white star alpha-blended over the picture:  shown = a*255 + (1-a)*original.
gemini_mark_alpha.png holds the measured alpha `a` (192x192 box, star centred 112 px from the right and
bottom edges of a 2752x1536 image). Reversing the blend restores the original pixels exactly; a tiny
Google's invisible SynthID watermark is not touched.

    python3 remove_mark.py in.png [out.png]     # default: overwrite in place
"""
import os, sys
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
REF_W = 2752                     # image width the mask was measured on
BOX = 192                        # mask box size at REF_W; its bottom-right corner is the image corner

def _alpha(scale):
    a = Image.open(os.path.join(HERE, 'gemini_mark_alpha.png'))
    n = max(8, round(BOX * scale))
    return np.asarray(a.resize((n, n), Image.LANCZOS)).astype(np.float32) / 255.0

def has_mark(img, thresh=0.7):
    """True if the star-shaped area is brightened the way a 51%-white overlay would brighten it.
    Ratio is ~1.0 on a marked image and ~0 on a clean one."""
    arr = np.asarray(img.convert('RGB')).astype(np.float32); H, W, _ = arr.shape
    a = _alpha(W / REF_W); n = a.shape[0]
    g = arr[H - n:, W - n:].mean(axis=2)
    bg = float(np.median(g[a < 0.002])); strong = a > 0.3
    if strong.sum() < 50 or bg > 235: return False
    ratio = float(np.median((g[strong] - bg) / a[strong])) / (255.0 - bg)
    return ratio > thresh

def remove(img):
    img = img.convert('RGB'); arr = np.asarray(img).astype(np.float32); H, W, _ = arr.shape
    a = _alpha(W / REF_W); n = a.shape[0]
    box = arr[H - n:, W - n:]; A = a[..., None]
    fixed = (box - A * 255.0) / np.clip(1.0 - A, 0.05, 1.0)
    out = arr.copy(); out[H - n:, W - n:] = np.where(A > 0.004, fixed, box)
    out = out.clip(0, 255).astype(np.uint8)
    return Image.fromarray(out)

if __name__ == '__main__':
    if len(sys.argv) < 2: sys.exit(__doc__)
    src = sys.argv[1]; dst = sys.argv[2] if len(sys.argv) > 2 else src
    im = Image.open(src)
    if not has_mark(im): print('no sparkle found, unchanged:', src); sys.exit(0)
    remove(im).save(dst); print('cleaned:', dst)
