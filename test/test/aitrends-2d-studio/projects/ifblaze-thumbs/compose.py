#!/usr/bin/env python3
"""Compose the three If Blaze thumbnails from the rendered stills (build/stills): neon character outline, number labels, caption.
Run:  python3 compose.py     (after: node render.mjs --project projects/ifblaze-thumbs --stills 1,3,5,7,9,11 --scale 1 --style bright --format png)
Writes out/<name>_1920.png and out/<name>.jpg (1280x720, under 2 MB)."""
import os
import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ST = os.path.join(HERE, 'build', 'stills'); OUT = os.path.join(HERE, 'out'); os.makedirs(OUT, exist_ok=True)
IMPACT = '/System/Library/Fonts/Supplemental/Impact.ttf'
W, H = 1920, 1080
GREEN, RED, YELLOW, WHITE, INK = (70, 255, 130), (255, 60, 70), (255, 222, 40), (255, 255, 255), (12, 10, 20)

def load(t): return Image.open(os.path.join(ST, f'bright_{t}s_{t}.00.png')).convert('RGB').resize((W, H), Image.LANCZOS)

def mask_of(full, empty, thr=14):
    d = np.asarray(ImageChops.difference(full, empty).filter(ImageFilter.GaussianBlur(1.2))).max(axis=2)
    m = Image.fromarray(((d > thr) * 255).astype('uint8'))
    return m.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.MinFilter(9)).filter(ImageFilter.MedianFilter(5))

def tint(img, mul, sat=1.0):
    a = np.asarray(img).astype('float32') * np.array(mul, dtype='float32')
    return ImageEnhance.Color(Image.fromarray(a.clip(0, 255).astype('uint8'))).enhance(sat)

def radial(color, cx, cy, r, strength=1.0):
    y, x = np.mgrid[0:H, 0:W]; d = np.sqrt((x - cx) ** 2 + (y - cy) ** 2) / r
    a = (np.clip(1 - d, 0, 1) ** 2 * strength)[..., None]
    return Image.fromarray((np.array(color, dtype='float32') * a).clip(0, 255).astype('uint8'))

def screen(a, b): return ImageChops.screen(a, b)

def outline(base, mask, color, ring=7, glow=34, k=1.0):
    grown = mask.filter(ImageFilter.MaxFilter(ring * 2 + 1))
    halo = grown.filter(ImageFilter.GaussianBlur(glow)).point(lambda v: min(255, int(v * 1.25 * k)))
    layer = Image.new('RGB', (W, H), color)
    base = screen(base, Image.composite(layer, Image.new('RGB', (W, H)), halo))
    return Image.composite(Image.new('RGB', (W, H), tuple(min(255, int(c * 0.35 + 165)) for c in color)), base, grown.filter(ImageFilter.GaussianBlur(1.2)))

def vignette(img, a=0.5):
    y, x = np.mgrid[0:H, 0:W]; d = np.sqrt(((x - W / 2) / (W / 2)) ** 2 + ((y - H / 2) / (H / 2)) ** 2)
    k = (1 - np.clip(d - 0.55, 0, 1) * a)[..., None]
    return Image.fromarray((np.asarray(img).astype('float32') * k).clip(0, 255).astype('uint8'))

def text_layer(str_, size, fill, stroke=INK, sw=None, glow=None, tracking=0):
    f = ImageFont.truetype(IMPACT, size); sw = sw if sw is not None else max(6, size // 9)
    l, t, r, b = f.getbbox(str_, stroke_width=sw); pad = 90
    im = Image.new('RGBA', (r - l + pad * 2, b - t + pad * 2), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    if glow:
        g = Image.new('RGBA', im.size, (0, 0, 0, 0)); ImageDraw.Draw(g).text((pad - l, pad - t), str_, font=f, fill=glow + (255,), stroke_width=sw + 6, stroke_fill=glow + (255,))
        g = g.filter(ImageFilter.GaussianBlur(26)); im = Image.alpha_composite(im, g); im = Image.alpha_composite(im, g); d = ImageDraw.Draw(im)
    d.text((pad - l + 5, pad - t + 8), str_, font=f, fill=(0, 0, 0, 200), stroke_width=sw, stroke_fill=(0, 0, 0, 200))
    d.text((pad - l, pad - t), str_, font=f, fill=fill + (255,), stroke_width=sw, stroke_fill=stroke + (255,))
    return im

def put(img, layer, cx, cy, rot=0):
    if rot: layer = layer.rotate(rot, expand=True, resample=Image.BICUBIC)
    img = img.convert('RGBA'); img.alpha_composite(layer, (int(cx - layer.width / 2), int(cy - layer.height / 2))); return img.convert('RGB')

def label(img, str_, size, color, cx, cy, head=None, rot=0):
    """Glowing number in a dark pill, with an arrow down to a head point."""
    f = ImageFont.truetype(IMPACT, size); l, t, r, b = f.getbbox(str_); tw, th = r - l, b - t
    pw, ph = tw + size * 0.7, th + size * 0.62; pad = 110
    im = Image.new('RGBA', (int(pw + pad * 2), int(ph + pad * 2 + size * 0.5)), (0, 0, 0, 0))
    box = [pad, pad, pad + pw, pad + ph]; ax = pad + pw / 2
    def shape(d, fill, outl, wd):
        d.rounded_rectangle(box, radius=ph * 0.28, fill=fill, outline=outl, width=wd)
        d.polygon([(ax - size * 0.26, pad + ph - 2), (ax + size * 0.26, pad + ph - 2), (ax, pad + ph + size * 0.38)], fill=outl)
    g = Image.new('RGBA', im.size, (0, 0, 0, 0)); shape(ImageDraw.Draw(g), color + (255,), color + (255,), 10); g = g.filter(ImageFilter.GaussianBlur(30))
    im = Image.alpha_composite(im, g); im = Image.alpha_composite(im, g); d = ImageDraw.Draw(im)
    shape(d, (10, 10, 22, 245), color + (255,), max(8, size // 12))
    d.text((pad + pw / 2 - tw / 2 - l, pad + ph / 2 - th / 2 - t), str_, font=f, fill=color + (255,), stroke_width=3, stroke_fill=(0, 0, 0, 255))
    return put(img, im, cx, cy, rot)

def save(img, name):
    img = ImageEnhance.Contrast(ImageEnhance.Color(img).enhance(1.12)).enhance(1.06)
    img.save(os.path.join(OUT, name + '_1920.png')); small = img.resize((1280, 720), Image.LANCZOS); small.save(os.path.join(OUT, name + '.jpg'), quality=93, subsampling=0)
    small.resize((320, 180), Image.LANCZOS).save(os.path.join(OUT, name + '_phone.jpg'), quality=90); print('wrote', name)

def build(full_t, empty_t, bg_fn, ring_col, ring=7, glow=34, k=1.0):
    full, empty = load(full_t), load(empty_t); m = mask_of(full, empty)
    bg = bg_fn(full, empty); out = outline(bg, m, ring_col, ring, glow, k)
    return Image.composite(full, out, m.filter(ImageFilter.GaussianBlur(0.8))), m

def sweat(img, x, y, s=1.0, rot=0):
    """Cartoon sweat drop (light blue, ink outline, white shine)."""
    L = Image.new('RGBA', (int(120 * s), int(170 * s)), (0, 0, 0, 0)); d = ImageDraw.Draw(L); w, h = L.size
    pts = [(w / 2, 6 * s)] + [(w / 2 + np.sin(a) * w * 0.38, h * 0.62 - np.cos(a) * h * 0.3) for a in np.linspace(0.5, 2 * np.pi - 0.5, 30)]
    d.polygon(pts, fill=(140, 215, 255, 255), outline=INK + (255,), width=int(7 * s)); d.ellipse([w * 0.36, h * 0.5, w * 0.5, h * 0.66], fill=(255, 255, 255, 230))
    return put(img, L, x, y, rot)

def shock_lines(img, x, y, r, side=1, col=WHITE):
    """Three short burst strokes beside a head."""
    L = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(L)
    for a in (-0.55, 0, 0.55):
        ang = (0 if side > 0 else np.pi) + a; x0, y0 = x + np.cos(ang) * r, y + np.sin(ang) * r; x1, y1 = x + np.cos(ang) * (r + 70), y + np.sin(ang) * (r + 70)
        d.line([(x0, y0), (x1, y1)], fill=INK + (255,), width=22); d.line([(x0, y0), (x1, y1)], fill=col + (255,), width=12)
    return Image.alpha_composite(img.convert('RGBA'), L).convert('RGB')

def beams(img, a=0.22):
    """Soft diagonal window light from the top left."""
    L = Image.new('L', (W, H), 0); d = ImageDraw.Draw(L)
    for x0, wd in [(-200, 220), (220, 150), (560, 260)]: d.polygon([(x0, 0), (x0 + wd, 0), (x0 + wd + 700, H), (x0 + 700, H)], fill=int(255 * a))
    L = L.filter(ImageFilter.GaussianBlur(40)); return Image.composite(screen(img, Image.new('RGB', (W, H), (255, 236, 200))), img, L)

def loop_ring(img, cx, cy, r, col=(80, 230, 255), a0=290, a1=590, wd=30):
    """Big neon circular arrow (the loop) drawn behind the characters."""
    L = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(L); box = [cx - r, cy - r, cx + r, cy + r]
    d.arc(box, a0, a1, fill=col + (255,), width=wd)
    a = np.radians(a1 % 360); hx, hy = cx + np.cos(a) * r, cy + np.sin(a) * r; tx, ty = -np.sin(a), np.cos(a); nx, ny = np.cos(a), np.sin(a)
    d.polygon([(hx + tx * 70, hy + ty * 70), (hx + nx * 55, hy + ny * 55), (hx - nx * 55, hy - ny * 55)], fill=col + (255,))
    g = L.filter(ImageFilter.GaussianBlur(26)); out = Image.alpha_composite(img.convert('RGBA'), g); out = Image.alpha_composite(out, g); out = Image.alpha_composite(out, L)
    return out.convert('RGB')

def head(mask, x0, x1):
    """Top of the character in the column range [x0, x1] (fractions of width): (centre x of the head, top y)."""
    m = np.asarray(mask) > 127; sub = m[:, int(x0 * W):int(x1 * W)]; rows = np.where(sub.any(axis=1))[0]
    if not len(rows): return int((x0 + x1) / 2 * W), H // 2
    top = rows[0]; cols = np.where(sub[top:top + 150].any(axis=0))[0]
    return int(x0 * W + (cols[0] + cols[-1]) / 2), int(top)

def fit_text(str_, size, max_w, **kw):
    f = ImageFont.truetype(IMPACT, size); l, t, r, b = f.getbbox(str_)
    if r - l > max_w: size = int(size * max_w / (r - l))
    return text_layer(str_, size, **kw)

# ---------- 1. Rank ----------
def rank():
    def bg(full, empty):
        b = beams(tint(empty.filter(ImageFilter.GaussianBlur(1.6)), (0.40, 0.42, 0.74), 1.35), 0.2)
        b = screen(b, radial((60, 255, 140), 420, 420, 900, 0.42)); return screen(b, radial((255, 50, 80), 1500, 420, 900, 0.42))
    img, m = build(1, 3, bg, (120, 230, 255))
    img = vignette(img, 0.55)
    (ax, ay), (bx, by) = head(m, 0.0, 0.42), head(m, 0.6, 1.0)
    lx = min(max(ax, 345), 560); img = label(img, '#412', 205, GREEN, lx, max(232, ay - 190), rot=4)
    for dx, y, sz in [(330, 345, 112), (405, 262, 86), (466, 196, 64)]: img = put(img, text_layer('Z', sz, WHITE, sw=9), lx + dx, y, rot=-12)
    img = shock_lines(img, bx + 225, by + 190, 40, 1); img = sweat(img, bx - 195, by + 150, 0.8, 18)
    img = label(img, '#6.9 BILLION', 150, RED, min(bx + 10, 1420), max(160, by - 150), rot=-3)
    save(img, 'thumb_rank')

# ---------- 2. Mirrors ----------
def mirrors():
    def bg(full, empty):
        b = Image.new('RGB', (W, H), (255, 106, 0)); b = screen(b, radial((255, 220, 70), 800, 520, 1300, 0.8)); return vignette(b, 0.55)
    full = load(5); img, m = build(5, 7, bg, (255, 255, 255), ring=6, glow=30, k=0.7)
    # the blank panel inside the frame: cool grey, with a glowing "?" where a face should be
    a = np.asarray(full).astype(int); navy = (a[..., 0] < 50) & (a[..., 1] < 56) & (a[..., 2] > 45) & (a[..., 2] < 112) & (a[..., 2] > a[..., 0] + 25); navy[:, int(W * 0.5):] = False
    ys, xs = np.where(navy); x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    pm = Image.fromarray((navy * 255).astype('uint8')).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(3))
    grad = np.linspace(0, 1, y1 - y0 + 1)[:, None, None] * np.ones((1, x1 - x0 + 1, 1)); pan = (np.array([70, 86, 140]) * (1 - grad) + np.array([26, 30, 64]) * grad).astype('uint8')
    layer = img.copy(); layer.paste(Image.fromarray(pan), (x0, y0)); img = Image.composite(layer, img, pm)
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    img = put(img, text_layer('?', int((y1 - y0) * 0.44), WHITE, stroke=(40, 60, 120), sw=10, glow=(120, 190, 255)), cx, cy + 40)
    kx, ky = head(m, 0.55, 1.0); img = sweat(img, kx - 330, ky + 250, 0.85, 20); img = sweat(img, kx + 330, ky + 215, 0.7, -20)
    tx = int(W * 0.735)
    img = put(img, fit_text('NEVER SEEN', 200, 880, fill=WHITE, sw=20), tx, 150, rot=-2)
    img = put(img, fit_text('MY FACE', 250, 880, fill=YELLOW, sw=22), tx, 370, rot=-2)
    save(img, 'thumb_mirrors')

# ---------- 3. Time loop ----------
def loop():
    def bg(full, empty):
        b = tint(empty.filter(ImageFilter.GaussianBlur(2.2)), (0.62, 0.48, 0.86), 1.4)
        b = screen(b, radial((255, 150, 60), 960, 620, 900, 0.45)); return loop_ring(b, 960, 560, 270)
    img, m = build(9, 11, bg, (255, 120, 220))
    img = vignette(img, 0.55)
    (ax, ay), (bx, by) = head(m, 0.0, 0.5), head(m, 0.5, 1.0)
    img = label(img, 'LOOP 401', 120, GREEN, ax, ay - 105, rot=3)
    img = label(img, 'LOOP 1,006', 120, RED, bx, by - 105, rot=-3)
    img = sweat(img, bx + 225, by + 235, 0.8, -18)
    img = put(img, fit_text('SHE REMEMBERS?!', 175, 1500, fill=YELLOW, sw=20), W // 2, 120, rot=-1.5)
    save(img, 'thumb_time_loop')

if __name__ == '__main__':
    rank(); mirrors(); loop()
