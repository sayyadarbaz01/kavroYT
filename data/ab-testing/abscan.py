"""Load each channel's /videos page N times as a new logged-out visitor and record, per video,
the title and thumbnail file served. Different values across loads = a live Test & compare."""
import json, re, sys, urllib.request, collections, concurrent.futures as cf, time
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
chans = [l.strip().split('|') for l in open(sys.argv[1]) if l.strip()]
N = int(sys.argv[2]); out = sys.argv[3]

def find(o, key):
    if isinstance(o, dict):
        if key in o: yield o[key]
        for v in o.values(): yield from find(v, key)
    elif isinstance(o, list):
        for v in o: yield from find(v, key)

def load(url):
    req = urllib.request.Request(url + '/videos', headers={'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9'})
    html = urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'replace')
    m = re.search(r'var ytInitialData = (\{.*?\});</script>', html, re.S)
    data = json.loads(m.group(1)); rows = []
    for lv in find(data, 'lockupViewModel'):
        vid = lv.get('contentId')
        title = next(find(lv.get('metadata', {}), 'content'), None)
        img = next((s['url'] for s in find(lv.get('contentImage', {}), 'sources') for s in s if '/vi/' in s.get('url', '')), '')
        thumb = img.split('/vi/')[1].split('/')[1].split('?')[0] if img else ''
        rows.append((vid, title, thumb))
    return rows

jobs = [(name, url, i) for name, url in chans for i in range(N)]
res = collections.defaultdict(lambda: collections.defaultdict(lambda: {'titles': collections.Counter(), 'thumbs': collections.Counter()}))
ok = collections.Counter()
def run(j):
    name, url, i = j
    for t in range(3):
        try: return name, load(url)
        except Exception as e: time.sleep(2)
    return name, None
with cf.ThreadPoolExecutor(8) as ex:
    for name, rows in ex.map(run, jobs):
        if not rows: continue
        ok[name] += 1
        for vid, title, thumb in rows:
            r = res[name][vid]; r['titles'][title] += 1; r['thumbs'][thumb] += 1
json.dump({'loads': ok, 'channels': {n: {v: {k: dict(c) for k, c in d.items()} for v, d in vs.items()} for n, vs in res.items()}}, open(out, 'w'), indent=1)
for n in res:
    vs = res[n]; tt = [v for v, d in vs.items() if len(d['titles']) > 1]; th = [v for v, d in vs.items() if any('custom' in k for k in d['thumbs']) and len(d['thumbs']) > 1]
    print(f"{n:16s} loads={ok[n]:2d} videos={len(vs):2d} title-tests={len(tt)} thumb-tests={len(th)}")
