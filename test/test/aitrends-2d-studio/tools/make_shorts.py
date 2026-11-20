"""Cut vertical 9:16 Shorts from a finished long video, with word-by-word burned captions.

Layout (1080x1920): blurred zoomed copy of the frame as background, the real frame (center-cropped 86%)
in the middle, a hook banner on top, captions below the frame. Encodes on the GPU (h264_qsv).

usage: python tools/make_shorts.py --project projects/gta6-real-life --spec projects/gta6-real-life/shorts.json
"""
import argparse, json, os, re, subprocess, sys
sys.stdout.reconfigure(encoding='utf-8')

ap = argparse.ArgumentParser()
ap.add_argument('--project', required=True)
ap.add_argument('--spec', required=True)
ap.add_argument('--only', help='render one short id')
ap.add_argument('--stills', action='store_true', help='write check stills instead of rendering')
a = ap.parse_args()
P = a.project
spec = json.load(open(a.spec, encoding='utf-8'))
words = json.load(open(os.path.join(P, 'timeline/words.json'), encoding='utf-8'))
words = words.get('words', words)
FIX = spec.get('fix', {})

W, H = 1080, 1920
VW, VH = 1440, 810          # source scaled to this, then center-cropped to 1080 wide
VY = 540                    # top of the video frame on the canvas
CAP_Y = VY + VH + 190       # caption baseline area

def ts(t):
    h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60
    return f'{h}:{m:02d}:{s:05.2f}'

def clean(w):
    w = w.strip()
    return FIX.get(w, w)

def build_ass(short, path):
    # collect words inside each segment and shift them onto the short's timeline
    out, off = [], 0.0
    for s0, s1 in short['segments']:
        for x in words:
            if x['start'] >= s0 - 0.02 and x['end'] <= s1 + 0.05:
                out.append({'w': clean(x['word']), 'a': x['start'] - s0 + off, 'b': x['end'] - s0 + off})
        off += s1 - s0
    # join number pieces like "$5" ",000"
    merged = []
    for x in out:
        if merged and re.fullmatch(r',\d{3}[.,?!]?', x['w']):
            merged[-1]['w'] += x['w']; merged[-1]['b'] = x['b']
        else:
            merged.append(x)
    for (old, new) in short.get('replace', []):
        for x in merged:
            if x['w'] == old: x['w'] = new
    # groups of up to 3 words, break at sentence ends
    groups, cur = [], []
    for x in merged:
        cur.append(x)
        if len(cur) == 3 or x['w'][-1:] in '.?!,':
            groups.append(cur); cur = []
    if cur: groups.append(cur)
    hdr = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Arial Black,92,&H00FFFFFF,&H00FFFFFF,&H00000000,&H96000000,1,0,0,0,100,100,0,0,1,7,4,5,60,60,0,1
Style: Hook,Arial Black,84,&H00FFFFFF,&H00FFFFFF,&H00000000,&H96000000,1,0,0,0,100,100,0,0,1,6,3,5,50,50,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    lines = []
    total = off
    hook = short['hook'].replace('|', '\\N').replace('*', '')
    hk = re.sub(r'\*([^*]+)\*', r'{\\c&H3FD2FF&}\1{\\c&HFFFFFF&}', short['hook']).replace('|', '\\N')
    lines.append(f'Dialogue: 1,{ts(0)},{ts(total)},Hook,,0,0,0,,{{\\pos({W//2},{VY//2 + 20})}}{hk}')
    for gi, g in enumerate(groups):
        g_end = groups[gi + 1][0]['a'] if gi + 1 < len(groups) and groups[gi + 1][0]['a'] - g[-1]['b'] < 0.6 else g[-1]['b'] + 0.25
        for wi, x in enumerate(g):
            a0 = x['a'] if wi else g[0]['a']
            a1 = g[wi + 1]['a'] if wi + 1 < len(g) else g_end
            txt = ' '.join((f'{{\\c&H3FD2FF&}}{y["w"].upper()}{{\\c&HFFFFFF&}}' if yi == wi else y['w'].upper()) for yi, y in enumerate(g))
            pop = '{\\fscx108\\fscy108\\t(0,80,\\fscx100\\fscy100)}' if wi == 0 else ''
            lines.append(f'Dialogue: 0,{ts(a0)},{ts(max(a1, a0 + 0.05))},Cap,,0,0,0,,{{\\pos({W//2},{CAP_Y})}}{pop}{txt}')
    open(path, 'w', encoding='utf-8').write(hdr + '\n'.join(lines) + '\n')
    return total

src = os.path.join(P, spec['source'])
os.makedirs(os.path.join(P, 'out/shorts'), exist_ok=True)
for short in spec['shorts']:
    if a.only and short['id'] != a.only: continue
    ass = os.path.join(P, 'build', f"{short['id']}.ass")
    total = build_ass(short, ass)
    n = len(short['segments'])
    parts, fl = [], []
    for k, (s0, s1) in enumerate(short['segments']):
        d = s1 - s0
        fl.append(f'[0:v]trim={s0}:{s1},setpts=PTS-STARTPTS,fps=24,settb=AVTB[v{k}]')
        fl.append(f'[0:a]atrim={s0}:{s1},asetpts=PTS-STARTPTS,afade=t=in:d=0.04,afade=t=out:st={d-0.06:.3f}:d=0.06[a{k}]')
        parts.append(f'[v{k}][a{k}]')
    fl.append(''.join(parts) + f'concat=n={n}:v=1:a=1[vc][ac]')
    fl.append('[vc]split[f][b]')
    fl.append(f'[b]scale=-2:{H},crop={W}:{H},boxblur=28:2,eq=brightness=-0.18:saturation=1.1[bg]')
    fl.append(f'[f]scale={VW}:{VH}:flags=lanczos,crop={W}:{VH}[fg]')
    assp = ass.replace('\\', '/').replace(':', '\\:')
    fl.append(f"[bg][fg]overlay=0:{VY},ass='{assp}',fade=t=out:st={total-0.4:.2f}:d=0.4[vout]")
    fl.append(f'[ac]afade=t=out:st={total-0.4:.2f}:d=0.4,loudnorm=I=-14:TP=-1.5:LRA=11[aout]')
    outp = os.path.join(P, 'out/shorts', short['file'])
    if a.stills:
        sd = os.path.join(P, 'build/short_stills', short['id']); os.makedirs(sd, exist_ok=True)
        cmd = ['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', src, '-filter_complex', ';'.join(fl), '-map', '[vout]', '-vf', 'fps=1/2', '-s', '360x640', os.path.join(sd, '%02d.jpg')]
        # -vf can't combine with filter_complex output; render a low-res temp then sample
        cmd = ['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', src, '-filter_complex', ';'.join(fl) + ';[vout]fps=1/2,scale=360:640[st];[aout]anullsink', '-map', '[st]', os.path.join(sd, '%02d.jpg')]
    else:
        cmd = ['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', src, '-filter_complex', ';'.join(fl), '-map', '[vout]', '-map', '[aout]',
               '-c:v', 'h264_qsv', '-global_quality', '20', '-look_ahead', '1', '-pix_fmt', 'nv12', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', outp]
    print(short['id'], f'{total:.1f}s', '->', outp if not a.stills else 'stills')
    r = subprocess.run(cmd)
    if r.returncode: sys.exit(r.returncode)
