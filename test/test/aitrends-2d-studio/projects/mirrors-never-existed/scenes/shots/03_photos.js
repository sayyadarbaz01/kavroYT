// shots/03_photos.js — 4:47-6:33: Room 5 (photographs become power: Cornelius, front cameras, Gary sees himself, photo booths, dating apps, filters).
import { E, V, ease, prog, clamp, lerp, box, cyl, ball, THREE, tears } from './_lib.js';
import { title, stamp, cross, check, person, heart } from './_info.js';
import { FZ, FNZ, FX, FNX, KIP, FRIEND1, FRIEND2, PHOTOG, MESSY, BALD, SR, CR, roomCard, face2d, pigeon, animPigeon, pigeon2d, eagle2d, thought, scr3, burst, phoneFrame, text, FONTS, alpha, rr, glow, circle, ring, U } from './_mirror.js';
import { camera3 } from '../toon/sets_mirror.js';
import { phone } from '../toon/sets_campus.js';

const ME = KIP, R5 = SR(5), C5 = CR(5);
const lift = (s, y = 0.14) => Object.values(s.F).forEach((f) => (f.position.y = y));
const PH = { shA: [55, 12], elA: 115, shB: [10, 8], elB: 20 };
const flash = (g, t, at, x = E.W / 2, y = E.H / 2) => { const k = 1 - clamp(Math.abs(t - at) / 0.18); if (k <= 0) return; g.save(); g.globalCompositeOperation = 'lighter'; glow(g, x, y, E.H * 0.5, '#ffffff', k * 0.9); g.restore(); };
const sepia = (g, x, y, w, h, u) => { g.fillStyle = '#e8d8b8'; rr(g, x - w / 2 - 20 * u, y - h / 2 - 20 * u, w + 40 * u, h + 40 * u, 10 * u); g.fill(); const gr = g.createRadialGradient(x, y, 0, x, y, w); gr.addColorStop(0, '#c8a878'); gr.addColorStop(1, '#5a4024'); g.fillStyle = gr; g.fillRect(x - w / 2, y - h / 2, w, h); };
const profile = (g, x, y, w, h, u, draw) => phoneFrame(g, x, y, w, h, (g2, px, py, pw, ph) => { g2.fillStyle = '#ffffff'; g2.fillRect(px, py, pw, ph); g2.fillStyle = '#ff4a7a'; g2.fillRect(px, py, pw, 90 * u); text(g2, 'MATCHR', px + pw / 2, py + 45 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); draw(g2, px, py + 90 * u, pw, ph - 90 * u); });

roomCard(5, 'dark');
R5('r502', { set: 'street', cast: { ph: [PHOTOG, 2.1, -3.5, FNX, 'stand', 'smirk'], q0: [MESSY[0], -0.4, -3.5, FX, 'stand', 'awe'], q1: [MESSY[2], -1.4, -3.5, FX, 'stand', 'smile'], q2: [MESSY[4], -2.4, -3.5, FX, 'stand', 'neutral'], q3: [MESSY[5], -3.4, -3.5, FX, 'stand', 'worried'] },
  poses: { ph: [[0, { shA: [70, 10], elA: 90, shB: [70, 10], elB: 90 }], [4.5, { shA: [10, 150], elA: 30 }]] }, exprs: { q0: [[0, 'awe'], [1.2, 'joy']] },
  b: (st, s) => { lift(s); const c = camera3(1.35, -3.5, FNX); c.position.y = 0.14; st.add(c); s.cam3 = c; },
  cam: { p: [-0.6, 1.9, 2.6], l: [-0.4, 1.3, -3.5], p2: [-0.2, 1.8, 1.8] },
  o: (g, t, i, s) => { const [x, y] = scr3(s, [1.1, 1.6, -3.5]); flash(g, t, 1.2, x, y); flash(g, t, 4.0, x, y); },
  caps: [['THE ONLY WAY TO REALLY SEE YOURSELF', 0.4, { dur: 4.3 }], ['PHOTOGRAPHERS: MOST POWERFUL PEOPLE ALIVE', 4.4, { size: V(70, 64) }]] });
C5('r503', 'leather', (g, t, i, u, cx, cy, acc) => { const k = ease.outBack(prog(t, 0.2, 0.6)); title(g, t, 'FUN FACT: 1839', cy - 390 * u, { at: 0.1, size: 80, color: '#f2c890' });
  if (k > 0) { g.save(); g.translate(cx - 260 * u, cy - 20 * u); g.scale(k, k); sepia(g, 0, 0, 340 * u, 420 * u, u); g.save(); g.globalAlpha = 0.85; circle(g, 0, -30 * u, 95 * u, '#efe0c0'); g.fillStyle = '#3a2410'; g.beginPath(); g.arc(0, -70 * u, 100 * u, Math.PI * 1.05, Math.PI * 1.95); g.fill(); for (let n = -3; n <= 3; n++) circle(g, n * 26 * u, -128 * u + Math.abs(n) * 8 * u, 26 * u, '#3a2410');
    for (const sx of [-1, 1]) circle(g, sx * 34 * u, -30 * u, 9 * u, '#3a2410'); g.fillStyle = '#3a2410'; rr(g, -110 * u, 70 * u, 220 * u, 140 * u, 30 * u); g.fill(); g.restore(); g.restore(); }
  title(g, t, 'ROBERT CORNELIUS', cy - 90 * u, { at: 1.0, size: 64, x: cx + 330 * u }); title(g, t, 'TOOK A PHOTO OF HIMSELF', cy, { at: 1.6, size: 46, x: cx + 330 * u, color: '#f2c890' });
  stamp(g, t, 'THE FIRST SELFIE', cx + 330 * u, cy + 190 * u, { at: 7.2, size: 64, color: '#ffd23f' }); flash(g, t, 2.5); });
C5('r504', 'gold', (g, t, i, u, cx, cy, acc) => { const L = cx - 400 * u, R = cx + 400 * u; g.fillStyle = '#8a3a2a'; rr(g, L - 150 * u, cy - 200 * u, 300 * u, 380 * u, 14 * u); g.fill(); g.fillStyle = '#fff6d8'; g.fillRect(L - 120 * u, cy - 170 * u, 240 * u, 320 * u); text(g, 'HISTORY', L, cy - 10 * u, { size: 50 * u, font: FONTS.ui, weight: 900, color: '#8a3a2a' });
  text(g, 'OUR WORLD', L, cy + 260 * u, { size: 50 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); const k = ease.outBack(prog(t, 1.8, 2.2));
  if (k > 0) { g.save(); g.translate(R, cy - 20 * u); g.scale(k, k); for (let n = 0; n < 5; n++) { const a = -Math.PI / 2 + (n * Math.PI * 2) / 5; g.fillStyle = '#ffd23f'; g.beginPath(); for (let j = 0; j < 10; j++) { const rr2 = j % 2 ? 90 * u : 210 * u, aa = -Math.PI / 2 + (j * Math.PI) / 5; j ? g.lineTo(Math.cos(aa) * rr2, Math.sin(aa) * rr2) : g.moveTo(Math.cos(aa) * rr2, Math.sin(aa) * rr2); } g.closePath(); g.fill(); break; }
    g.restore(); text(g, 'CELEBRITY', R, cy - 20 * u, { size: 52 * u, font: FONTS.ui, weight: 900, color: '#2a1a06' }); text(g, 'THIS WORLD', R, cy + 260 * u, { size: 50 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); }
  for (const [at, x, y] of [[2.3, R - 260 * u, cy - 220 * u], [2.6, R + 240 * u, cy - 160 * u], [3.1, R + 200 * u, cy + 160 * u], [3.6, R - 230 * u, cy + 120 * u]]) flash(g, t, at, x, y);
  title(g, t, 'HE SAW HIS OWN FACE BEFORE ALMOST ANYONE', cy - 380 * u, { at: 5.2, size: 54 }); });
C5('r505', 'dark', (g, t, i, u, cx, cy, acc) => { const k = ease.outBack(prog(t, 0.3, 0.8)); g.save(); g.globalCompositeOperation = 'lighter'; for (let n = 0; n < 6; n++) { const a = -Math.PI / 2 + (n - 2.5) * 0.25 + Math.sin(t + n) * 0.05; g.strokeStyle = alpha('#b48cff', 0.25); g.lineWidth = 60 * u; g.beginPath(); g.moveTo(cx, E.H); g.lineTo(cx + Math.cos(a) * E.H, E.H + Math.sin(a) * E.H * 1.2); g.stroke(); } g.restore();
  if (k > 0) { g.save(); g.translate(cx, cy - 60 * u); g.scale(k, k); phoneFrame(g, 0, 0, 230 * u, 420 * u, (g2, x, y, w, h) => { g2.fillStyle = '#cfe0ec'; g2.fillRect(x, y, w, h); face2d(g2, x + w / 2, y + h * 0.45, 80 * u, {}); }); circle(g, 0, -190 * u, 9 * u, '#6a7a8a'); g.restore(); }
  title(g, t, 'FRONT-FACING CAMERAS', cy + 270 * u, { at: 0.3, size: 70, color: '#b48cff' }); title(g, t, 'THE BIGGEST LAUNCH IN HISTORY', cy + 360 * u, { at: 1.4, size: 58 }); });
R5('r506', { set: 'street', cast: { a: [MESSY[1], -1.3, -3.4, FZ + 0.35, 'stand', 'sad'], b: [MESSY[3], 0, -3.7, FZ, 'stand', 'sad'], c: [MESSY[5], 1.3, -3.4, FZ - 0.35, 'stand', 'awe'] },
  carry: ['a', 'b', 'c'].map((k) => ({ prop: () => phone(), by: k, both: false, arms: PH, rx: -0.5 })), b: (st, s) => lift(s),
  cam: { p: [0, 1.7, 0.6], l: [0, 1.45, -3.6], p2: [0, 1.65, 0.0] },
  o: (g, t, i, s) => { for (const k of ['a', 'b', 'c']) { const f = s.F[k]; const [x, y] = scr3(s, [f.position.x, 1.6, f.position.z]); tears(g, t, x, y, 60 * U(), 0.6); } }, caps: [['SEEING THEIR FACE FOR THE FIRST TIME', 0.2]] });
R5('r507', { set: 'street', cast: { a: [MESSY[4], 0, -3.6, FZ, 'shocked', 'scared'] }, carry: [{ prop: () => phone(), by: 'a', both: false, arms: { shA: [70, 30], elA: 40, shB: [60, 70], elB: 140 }, rx: -0.5 }], b: (st, s) => lift(s),
  cam: { f: 'a', d: 1.9, h: 1.62, side: 0.2, lh: 1.58, push: 0.2 }, o: (g, t, i, s) => { const [x, y] = scr3(s, [0, 1.61, -3.6]); burst(g, t, x, y, 300 * U(), 0.05); }, caps: [['SOME WOULD SCREAM.', 0.15]] });
R5('r508', { set: 'street', cast: {},
  b: (st, s) => { st.add(cyl(0.12, 0.14, 0.75, '#3a3a48', 0, 0.515, -3.3, { outline: 0.008 })); s.gary = pigeon(0.35, -2.9, Math.PI * 0.75, 1); s.gary.position.y = 0.14; st.add(s.gary);
    s.ph = phone(); s.ph.scale.setScalar(3); s.ph.position.set(-0.05, 0.38, -3.05); s.ph.rotation.set(-0.35, 0.6, 0); st.add(s.ph); },
  u: (s, t) => animPigeon(s.gary, t, { bob: t < 1.0 ? 1 : 0, puff: t < 2.6 ? 1 : 1 - ease.out(prog(t, 2.6, 3.2)), fall: ease.inOut(prog(t, 4.5, 5.0)) }),
  cam: { p: [1.4, 0.75, -1.2], l: [0.1, 0.45, -3.0], p2: [1.25, 0.7, -1.5] },
  o: (g, t, i, s) => { const u = U(), k = ease.outBack(prog(t, 0.6, 1.0)); if (k > 0) { g.save(); g.translate(E.W * 0.2, E.H * 0.42); g.scale(k, k); phoneFrame(g, 0, 0, 240 * u, 430 * u, (g2, x, y, w, h) => { g2.fillStyle = '#cfe0ec'; g2.fillRect(x, y, w, h); pigeon2d(g2, x + w / 2, y + h * 0.55, 70 * u, { sad: t > 2.6 }); text(g2, 'YOU', x + w / 2, y + 40 * u, { size: 34 * u, font: FONTS.ui, weight: 900, color: '#141218' }); }); g.restore(); }
    thought(g, t, E.W * 0.72, E.H * 0.24, 360 * u, 260 * u, 1.2, (g2) => { eagle2d(g2, 0, 10 * u, 95 * u, '#6a4024', 1 - ease.out(prog(t, 2.6, 3.0))); if (t > 2.6) cross(g2, t, 0, 0, 100 * u, 2.6); }); },
  caps: [['GARY SEES HIMSELF. FIRST TIME.', 0.2, { dur: 2.5 }], ['HE IS NOT AN EAGLE.', 2.6, { dur: 1.75 }], ['HE TAKES IT BADLY.', 4.4]] });
R5('r509', { set: 'boothStreet', cast: { a: [FRIEND2, 1.4, -1.5, FNX - 0.2, 'stand', 'awe'], b: [MESSY[0], 2.3, -1.3, FNX - 0.2, 'stand', 'smile'], c: [MESSY[4], 3.15, -1.1, FNX - 0.2, 'stand', 'awe'], d: [MESSY[2], -1.4, -1.4, FX + 0.4, 'stand', 'awe'] },
  poses: { d: [[0, { spine: [30, 0], shA: [60, 10], shB: [60, 10], elA: 110, elB: 110 }], [2.0, 'stand'], [3.0, { spine: [30, 0], shA: [60, 10], shB: [60, 10], elA: 110, elB: 110 }]] }, b: (st, s) => lift(s),
  cam: { p: [0.6, 1.9, 4.6], l: [0.6, 1.3, -1.8], p2: [0.5, 1.8, 3.9] }, caps: [['PHOTO BOOTHS = TEMPLES', 0.3, { dur: 3.2 }], ['ONE PORTRAIT A YEAR', 3.4]] });
R5('r510', { set: 'boothStreet', cast: { a: [FRIEND2, 0.4, -0.9, FZ, 'stand', 'neutral'] }, b: (st, s) => lift(s),
  carry: [{ prop: () => { const g = new THREE.Group(); g.add(box(0.07, 0.24, 0.004, '#fbfaf4', 0, 0, 0, { outline: 0.002 })); return g; }, by: 'a', both: false, arms: PH, rx: -0.4 }],
  exprs: { a: [[0, 'neutral'], [3.2, 'surprised'], [4.9, 'shocked']] }, cam: { f: 'a', d: 2.0, h: 1.62, side: -0.35, lh: 1.5, push: 0.12 },
  o: (g, t, i, s) => { const u = U(), k = ease.outBack(prog(t, 0.4, 0.8)); if (k <= 0) return; g.save(); g.translate(E.W * 0.8, E.H * 0.45); g.scale(k, k); g.rotate(0.05); g.fillStyle = '#fbfaf4'; rr(g, -100 * u, -330 * u, 200 * u, 660 * u, 8 * u); g.fill();
    for (let n = 0; n < 4; n++) { g.fillStyle = '#d8e8f0'; g.fillRect(-85 * u, -315 * u + n * 160 * u, 170 * u, 145 * u); face2d(g, 0, -240 * u + n * 160 * u, 50 * u, { cap: false, expr: n === 3 ? 'o' : 'smile' }); }
    if (t > 3.2) ring(g, 25 * u, -222 * u + 3 * 160 * u, 26 * u, 5 * u, '#e8304a'); g.restore(); },
  caps: [['YOUR FACE: ONCE A YEAR', 0.2, { dur: 3.1 }], ['"OH. I HAVE A MOLE."', 3.2, { dur: 1.75 }], ['"WHEN DID I GET A MOLE?"', 5.0]] });
C5('r511', 'red', (g, t, i, u, cx, cy, acc) => { title(g, t, 'DATING APPS GET STRICT', cy - 400 * u, { at: 0.1, size: 70 });
  profile(g, cx - 330 * u, cy + 40 * u, 330 * u, 600 * u, u, (g2, x, y, w, h) => { g2.fillStyle = '#e8f0f4'; g2.fillRect(x + 20 * u, y + 20 * u, w - 40 * u, h * 0.6); face2d(g2, x + w / 2, y + 20 * u + h * 0.3, 80 * u, { cap: false });
    if (t > 1.8) text(g2, 'TAKEN: 3 DAYS AGO', x + w / 2, y + h * 0.75, { size: 30 * u, font: FONTS.ui, weight: 900, color: '#2a8a4a' }); if (t > 2.1) check(g2, t, x + w / 2, y + h * 0.88, 30 * u, 2.1, '#2a8a4a'); });
  profile(g, cx + 330 * u, cy + 40 * u, 330 * u, 600 * u, u, (g2, x, y, w, h) => { g2.fillStyle = '#e8f0f4'; g2.fillRect(x + 20 * u, y + 20 * u, w - 40 * u, h * 0.6); face2d(g2, x + w / 2, y + 20 * u + h * 0.3, 80 * u, { cap: true });
    if (t > 7.5) text(g2, 'TAKEN: 2 YEARS AGO', x + w / 2, y + h * 0.75, { size: 30 * u, font: FONTS.ui, weight: 900, color: '#c8302c' }); });
  stamp(g, t, 'LYING', cx + 330 * u, cy - 40 * u, { at: 8.6, size: 96 }); });
C5('r512', 'blue', (g, t, i, u, cx, cy, acc) => { profile(g, cx - 300 * u, cy + 20 * u, 330 * u, 620 * u, u, (g2, x, y, w, h) => { g2.fillStyle = '#e8f0f4'; g2.fillRect(x + 20 * u, y + 20 * u, w - 40 * u, h * 0.6);
    const fx = x + w / 2, fy = y + 20 * u + h * 0.32; g2.fillStyle = '#1b1b20'; for (let n = -4; n <= 4; n++) circle(g2, fx + n * 22 * u, fy - 70 * u + Math.abs(n) * 6 * u, 30 * u, '#1b1b20'); face2d(g2, fx, fy, 80 * u, { cap: false, mole: false });
    text(g2, 'PHOTO: 2009', x + w / 2, y + h * 0.78, { size: 34 * u, font: FONTS.ui, weight: 900, color: '#c8302c' }); });
  const k = ease.outBack(prog(t, 2.6, 3.0)); if (k > 0) { g.save(); g.translate(cx + 340 * u, cy - 20 * u); g.scale(k, k); circle(g, 0, 0, 170 * u, '#2a2a33'); face2d(g, 0, 0, 150 * u, { cap: false, mole: false, skin: '#f6f3ec' }); g.save(); g.beginPath(); g.arc(0, -10 * u, 150 * u, Math.PI * 1.05, Math.PI * 1.95); g.closePath(); g.fillStyle = '#f6f3ec'; g.fill(); g.strokeStyle = '#141218'; g.lineWidth = 9 * u; g.stroke(); g.restore(); circle(g, -60 * u, -110 * u, 14 * u, '#ffffff'); g.restore(); text(g, 'NOW', cx + 340 * u, cy + 230 * u, { size: 54 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); }
  title(g, t, 'NOBODY HAD THE HEART TO TELL HIM', cy - 400 * u, { at: 5.2, size: 58 }); });
C5('r513', 'teal', (g, t, i, u, cx, cy, acc) => { const f = 0.5 + 0.5 * Math.sin(t * 2.2); face2d(g, cx, cy - 60 * u, 190 * u, { filter: f }); for (let n = 0; n < 7; n++) { const a = n * 0.9 + t; g.save(); g.globalCompositeOperation = 'lighter'; glow(g, cx + Math.cos(a) * 280 * u, cy - 60 * u + Math.sin(a) * 240 * u, 30 * u, '#ffffff', f * 0.6); g.restore(); }
  title(g, t, 'BEAUTY FILTERS MAKE NO SENSE', cy - 400 * u, { at: 0.1, size: 66 }); title(g, t, 'OUR WORLD: A FACE YOU\'VE SEEN A MILLION TIMES', cy + 290 * u, { at: 2.3, size: 48 }); });
C5('r514', 'dark', (g, t, i, u, cx, cy, acc) => { face2d(g, cx - 320 * u, cy - 60 * u, 160 * u, { filter: 1 * ease.out(prog(t, 0.2, 0.6)) }); const k = ease.outBack(prog(t, 4.4, 4.8)); if (k > 0) face2d(g, cx + 320 * u, cy - 60 * u, 160 * u * k, {});
  text(g, 'FIRST FACE YOU EVER SEE', cx - 320 * u, cy + 170 * u, { size: 42 * u, font: FONTS.ui, weight: 900, color: '#ff9ab0' }); if (k > 0) text(g, '???', cx + 320 * u, cy + 170 * u, { size: 50 * u, font: FONTS.ui, weight: 900, color: '#ffffff' });
  title(g, t, 'WHICH ONE IS THE REAL YOU?', cy + 320 * u, { at: 4.8, size: 66, color: '#b48cff' }); });
R5('r515', { set: 'park', cast: { me: [ME, 1.5, 0.3, FX - 0.45, 'stand', 'angry'], f: [FRIEND1, 2.6, 0.3, FNX + 0.45, 'stand', 'smile'] },
  carry: [{ prop: () => phone(), by: 'f', both: false, arms: { shA: [70, 15], elA: 60, shB: [10, 8], elB: 20 }, rx: -0.2, ry: Math.PI }],
  poses: { me: [[0, { shA: [70, 20], elA: 40 }], [1.5, 'crossArms'], [5.2, 'sad']], f: [[0, 'relaxed'], [3.2, 'shrug']] }, exprs: { me: [[0, 'angry'], [1.6, 'confused'], [5.2, 'sad']], f: [[0, 'talk'], [1.6, 'talk'], [5.3, 'smirk']] },
  cam: { two: ['me', 'f'], a: FZ, d: 2.9, h: 1.55, side: 0, lh: 1.4 }, caps: [['"THAT\'S NOT WHAT I LOOK LIKE."', 0.1, { dur: 1.5 }], ['"THAT\'S EXACTLY WHAT YOU LOOK LIKE."', 1.6, { dur: 3.2, size: V(70, 64) }], ['"FOR 20 YEARS."', 3.25, { dur: 5.2 }], ['"WE JUST DIDN\'T WANT TO TELL YOU."', 5.3]] });
C5('r516', 'dark', (g, t, i, u, cx, cy, acc) => { const s = 1 - 0.6 * ease.inOut(prog(t, 1.4, 2.4)); face2d(g, cx, cy - 60 * u, 180 * u * s, {}); title(g, t, 'YOUR FACE IS THE SMALL STUFF', cy + 260 * u, { at: 0.2, size: 66 });
  if (t > 2.4) { const sh = Math.sin(t * 40) * 6 * u * (t < 3.2); g.save(); g.translate(sh, 0); for (const [x, r] of [[cx - 420 * u, 110], [cx + 420 * u, 130]]) { g.save(); g.translate(x, cy - 60 * u); g.rotate(t * (r > 120 ? -1 : 1) * (t < 3 ? 2 : 0.2)); g.fillStyle = '#9aa4b0'; for (let n = 0; n < 8; n++) { g.rotate(Math.PI / 4); g.fillRect(-18 * u, -r * u, 36 * u, 40 * u); } circle(g, 0, 0, r * 0.8 * u, '#9aa4b0'); circle(g, 0, 0, r * 0.3 * u, '#22263a'); g.restore(); } g.restore();
    title(g, t, 'THE BIG STUFF STOPS WORKING', cy + 350 * u, { at: 2.6, size: 58, color: '#ff6a6a' }); } });
