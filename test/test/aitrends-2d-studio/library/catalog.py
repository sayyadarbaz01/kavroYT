"""library/catalog.py — the shot library: every shot and set from every finished video, searchable and reusable.

  python3 library/catalog.py add --project projects/<slug>        # archive a video: code snapshot + thumbnails + catalog rows
  python3 library/catalog.py add-sets --file toon-kit/sets3d.js --thumbs <dir with <set>.png>
  python3 library/catalog.py find classroom teleport               # search (all words must match)
  python3 library/catalog.py sheet classroom --out /tmp/pick.png   # contact sheet of matches, to pick shots visually
  python3 library/catalog.py index                                 # rebuild library/INDEX.md

Each row says where the code lives (library/videos/<slug>/scenes/...) so a shot can be copied into a new project
and re-timed, and which set/template it uses so the set can be reused with new acting."""
import argparse, glob, json, os, re, shutil, subprocess, sys

LIB = os.path.dirname(os.path.abspath(__file__)); STUDIO = os.path.dirname(LIB)
CAT = os.path.join(LIB, 'catalog.json')

def load():
    return json.load(open(CAT)) if os.path.exists(CAT) else {'entries': []}

def save(cat):
    cat['entries'].sort(key=lambda e: e['key']); json.dump(cat, open(CAT, 'w'), indent=1)

def thumb(src, dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-vf', 'scale=480:-2', '-q:v', '4', dst], check=True)

def where_defined(scenes, sid):
    """file that registers this shot id (custom code), or None when a generic template draws it"""
    for f in glob.glob(os.path.join(scenes, '**', '*.js'), recursive=True):
        if re.search(r"(registerShot|shot)\(\s*'%s'" % re.escape(sid), open(f, encoding='utf-8').read()): return f
    return None

def add(project, slug=None):
    P = os.path.join(STUDIO, project) if not os.path.isabs(project) else project
    slug = slug or os.path.basename(P.rstrip('/'))
    cfg = json.load(open(os.path.join(P, 'config.json'))); story = json.load(open(os.path.join(P, 'story', 'shots.json')))
    vdir = os.path.join(LIB, 'videos', slug)
    if os.path.exists(vdir): shutil.rmtree(vdir)
    shutil.copytree(os.path.join(P, 'scenes'), os.path.join(vdir, 'scenes'))
    os.makedirs(os.path.join(vdir, 'story'), exist_ok=True)
    for f in ('shots.json', 'bible.md', 'build_shots.py'):
        if os.path.exists(os.path.join(P, 'story', f)): shutil.copy(os.path.join(P, 'story', f), os.path.join(vdir, 'story', f))
    shutil.copy(os.path.join(P, 'config.json'), os.path.join(vdir, 'config.json'))
    stills = {os.path.basename(f).split('_')[0]: f for f in glob.glob(os.path.join(P, 'build', 'sheets', '*_*.png')) if not os.path.basename(f).startswith('sheet')}
    cat = load(); cat['entries'] = [e for e in cat['entries'] if e.get('video') != slug]
    style = cfg.get('style'); kind3d = '3d' if style == 'bright' else '2d'
    n = 0
    for s in story['shots']:
        p = s.get('params') or {}; sid = s['id']
        f = where_defined(os.path.join(vdir, 'scenes'), sid)
        th = None
        if sid in stills:
            th = os.path.join('thumbs', slug, sid + '.jpg'); thumb(stills[sid], os.path.join(LIB, th))
        cat['entries'].append({'key': f'{slug}/{sid}', 'kind': 'shot', 'video': slug, 'title': story.get('title') or cfg.get('title'), 'look': kind3d,
            'style': style, 'template': p.get('tpl') or ('3d-custom' if f else None), 'set': s.get('set') or p.get('loc') or p.get('v'),
            'scene': s.get('scene', ''), 'line': s.get('line', ''), 'dur': round(s['end'] - s['start'], 2), 'params': p,
            'code': os.path.relpath(f, LIB) if f else os.path.join('videos', slug, 'scenes', '(template — see params.tpl)'), 'thumb': th})
        n += 1
    save(cat); index(); print(f'archived {slug}: {n} shots, {sum(1 for k in stills)} thumbnails -> library/videos/{slug}')

def add_sets(file, thumbs=None, video='toon-kit'):
    src = open(os.path.join(STUDIO, file) if not os.path.isabs(file) else file, encoding='utf-8').read()
    names = re.findall(r'^  (\w+)\(st, o = \{\}\) \{', src, re.M)
    cat = load(); cat['entries'] = [e for e in cat['entries'] if not (e['kind'] == 'set' and e['video'] == video)]
    for nme in names:
        th = None
        if thumbs and os.path.exists(os.path.join(thumbs, nme + '.png')):
            th = os.path.join('thumbs', 'sets', nme + '.jpg'); thumb(os.path.join(thumbs, nme + '.png'), os.path.join(LIB, th))
        opts = sorted(set(re.findall(r'o\.(\w+)', src[src.index(f'  {nme}(st'):].split('\n  },')[0])))
        cat['entries'].append({'key': f'set/{nme}', 'kind': 'set', 'video': video, 'look': '3d', 'set': nme, 'scene': f'3D set "{nme}" (SETS.{nme}(st, {{{", ".join(opts)}}}))',
            'code': os.path.relpath(os.path.join(STUDIO, file), LIB), 'thumb': th, 'template': None, 'line': '', 'dur': 0, 'params': {'options': opts}})
    save(cat); index(); print(f'catalogued {len(names)} sets: {", ".join(names)}')

def match(e, words):
    hay = ' '.join(str(e.get(k, '')) for k in ('key', 'kind', 'look', 'template', 'set', 'scene', 'line', 'title')).lower() + ' ' + json.dumps(e.get('params', {})).lower()
    return all(w.lower() in hay for w in words)

def find(words, limit=40):
    hits = [e for e in load()['entries'] if match(e, words)]
    for e in hits[:limit]: print(f"{e['key']:<22} {e['look']:<3} {str(e.get('set')):<13} {str(e.get('template')):<10} {e['scene'][:70]}\n{'':22} code: {e['code']}  thumb: {e.get('thumb')}")
    print(f'{len(hits)} match(es)'); return hits

def sheet(words, out, cols=4):
    from PIL import Image, ImageDraw
    hits = [e for e in find(words) if e.get('thumb')][:32]
    if not hits: print('nothing with thumbnails'); return
    W, H, pad = 480, 270, 34; img = Image.new('RGB', (cols * W, ((len(hits) + cols - 1) // cols) * (H + pad)), (18, 18, 22)); d = ImageDraw.Draw(img)
    for i, e in enumerate(hits):
        x, y = (i % cols) * W, (i // cols) * (H + pad); im = Image.open(os.path.join(LIB, e['thumb'])).convert('RGB'); im.thumbnail((W, H)); img.paste(im, (x, y))
        d.text((x + 6, y + H + 8), f"{e['key']}  [{e.get('set')}]", fill=(235, 235, 235))
    img.save(out); print('sheet ->', out)

def index():
    cat = load(); by = {}
    for e in cat['entries']: by.setdefault(e['video'], []).append(e)
    lines = ['# Shot library', '', 'Every shot and set from finished videos. Search: `python3 library/catalog.py find <words>`; visual pick: `... sheet <words> --out pick.png`.', '',
             f"{len(cat['entries'])} entries across {len(by)} sources.", '']
    for v, es in sorted(by.items()):
        lines += [f'## {v} — {es[0].get("title") or ""} ({len(es)} entries, {es[0]["look"]})', '', '| key | set | template | scene |', '|---|---|---|---|']
        lines += [f"| {e['key']} | {e.get('set') or ''} | {e.get('template') or ''} | {e['scene'].replace('|', '/')[:90]} |" for e in es] + ['']
    open(os.path.join(LIB, 'INDEX.md'), 'w').write('\n'.join(lines))

if __name__ == '__main__':
    ap = argparse.ArgumentParser(); sub = ap.add_subparsers(dest='cmd', required=True)
    a = sub.add_parser('add'); a.add_argument('--project', required=True); a.add_argument('--name')
    b = sub.add_parser('add-sets'); b.add_argument('--file', required=True); b.add_argument('--thumbs')
    c = sub.add_parser('find'); c.add_argument('words', nargs='*')
    d = sub.add_parser('sheet'); d.add_argument('words', nargs='*'); d.add_argument('--out', required=True)
    sub.add_parser('index')
    x = ap.parse_args()
    if x.cmd == 'add': add(x.project, x.name)
    elif x.cmd == 'add-sets': add_sets(x.file, x.thumbs)
    elif x.cmd == 'find': find(x.words)
    elif x.cmd == 'sheet': sheet(x.words, x.out)
    else: index()
