"""Add number tags and headline text to the AI-generated thumbnail art.

Drop the picked images into ai/art/ (rank_a.png, rank_b.png, mirrors_a.png, ...), then run:
    python3 ai_compose.py            # builds every thumbnail whose art exists, into ai/out/
    python3 ai_compose.py rank_a     # only that one
    python3 ai_compose.py --install  # also copies each video's A version to its seo/thumbnail.jpg

Positions are fractions of the frame (0..1), matching the layout each prompt asks for.
If the AI put a head somewhere else, nudge that tag's x/y in SPECS and run again.
"""
import os, sys, shutil
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from PIL import Image, ImageOps
from compose import W, H, GREEN, RED, YELLOW, WHITE, label, put, fit_text, vignette
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), *[os.pardir] * 6))   # kavroYT repo root
sys.path.insert(0, os.path.join(REPO, '.claude', 'skills', 'remove-gemini-mark', 'scripts'))
from remove_mark import has_mark, remove as remove_mark   # strips the visible Gemini sparkle from our own art

HERE = os.path.dirname(os.path.abspath(__file__))
ART, OUT = os.path.join(HERE, 'art'), os.path.join(HERE, 'out')
PROJECTS = os.path.dirname(os.path.dirname(HERE))
GOLD = (255, 196, 40)

# tags: (text, colour, x, y, size, rotation). titles: (text, colour, x, y, size, max width as a fraction of W, rotation)
SPECS = {
    'rank_a': {'video': 'see-everyones-rank',
        'tags': [('#412', GREEN, 0.25, 0.125, 110, 3), ('#6.9 BILLION', RED, 0.72, 0.105, 85, -3)],
        'titles': [('WHY HIM?!', YELLOW, 0.25, 0.88, 170, 0.40, -2)]},
    'rank_b': {'video': 'see-everyones-rank',
        'tags': [('#3', GOLD, 0.09, 0.27, 140, 4), ('#6.9 BILLION', RED, 0.61, 0.095, 78, -3)],
        'titles': [('WHY #3?!', YELLOW, 0.24, 0.88, 180, 0.40, -2)]},
    'mirrors_a': {'video': 'mirrors-never-existed',
        'titles': [('MY FACE?!', YELLOW, 0.25, 0.87, 190, 0.44, -2)]},
    'mirrors_b': {'video': 'mirrors-never-existed',
        'titles': [('NOT AN EAGLE', YELLOW, 0.73, 0.10, 160, 0.48, -2)]},
    'loop_a': {'video': 'crush-time-loop',
        'tags': [('LOOP 401', GREEN, 0.24, 0.10, 88, 3), ('LOOP 1,006', RED, 0.80, 0.115, 88, -3)],
        'titles': [('SHE REMEMBERS?!', YELLOW, 0.50, 0.90, 130, 0.50, -1.5)]},
    'loop_b': {'video': 'crush-time-loop',
        'tags': [('LOOP 2', GREEN, 0.87, 0.10, 78, -3)],
        'titles': [('SHE KNOWS?!', YELLOW, 0.50, 0.12, 170, 0.46, -2)]},
}

EXTS = ('.png', '.jpg', '.jpeg', '.webp')
def art_path(name):
    return next((os.path.join(ART, name + e) for e in EXTS if os.path.exists(os.path.join(ART, name + e))), None)

def fit_frame(path):
    """Any size or aspect in, exactly 1920x1080 out (cover-crop from the centre)."""
    im = Image.open(path).convert('RGB')
    if has_mark(im): im = remove_mark(im)
    return ImageOps.fit(im, (W, H), Image.LANCZOS)

def build(name):
    sp = SPECS[name]; img = vignette(fit_frame(art_path(name)), 0.35)
    for text, col, x, y, size, rot in sp.get('tags', []):
        img = label(img, text, size, col, x * W, y * H, rot=rot)
    for text, col, x, y, size, mw, rot in sp.get('titles', []):
        img = put(img, fit_text(text, size, mw * W, fill=col, sw=max(14, size // 9)), x * W, y * H, rot=rot)
    img.save(os.path.join(OUT, name + '_1920.png'))
    small = img.resize((1280, 720), Image.LANCZOS); q = 93
    while True:   # YouTube limit is 2 MB; stay well under
        small.save(os.path.join(OUT, name + '.jpg'), quality=q, subsampling=0)
        if os.path.getsize(os.path.join(OUT, name + '.jpg')) < 1_500_000 or q <= 70: break
        q -= 5
    small.resize((320, 180), Image.LANCZOS).save(os.path.join(OUT, name + '_phone.jpg'), quality=90)
    print('wrote', os.path.join(OUT, name + '.jpg'))
    return sp['video']

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    want = [a for a in sys.argv[1:] if not a.startswith('--')] or list(SPECS)
    unknown = [n for n in want if n not in SPECS]
    if unknown: sys.exit(f'unknown thumbnail(s): {unknown}; choose from {list(SPECS)}')
    missing = [n for n in want if not art_path(n)]
    for n in missing: print('skip', n, '(no art/' + n + '.png/.jpg/.webp yet)')
    for n in want:
        if n in missing: continue
        video = build(n)
        if '--install' in sys.argv and n.endswith('_a'):
            dst = os.path.join(PROJECTS, video, 'seo', 'thumbnail.jpg'); shutil.copy(os.path.join(OUT, n + '.jpg'), dst); print('installed', dst)
