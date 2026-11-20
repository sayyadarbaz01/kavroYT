// shots/03_joyride.js — 2:08-4:27: lightning, Roy Sullivan, Mom's card test, $50 bills, the Speedway, Powerball, PAID, Dev's battery, the Cavs game.
import { walkPose } from '../toon/toon.js';
import { text, FONTS, alpha, rr, circle, rng } from '/engine/core.js';
import { ME, MOM, fig, shot, face, cam, C, push, pose, expr, held, bandFlash, vignette, shout, impact, smoke, tears, scr, lie, THREE, box, cyl, ball, E, V, ease, prog, clamp, lerp, SETS } from './_lib.js';
import { DEV, COP } from '../toon/cast3d.js';
import { copCar, flashLights, vehicle } from '../toon/sets3d.js';
import { FACE_Z, FACE_NZ, FACE_X, FACE_NX, U, tag, watchFace, darkGold, secAngle, shake, ticket } from './_luck.js';
import { S3, S2, gun, wetSign, slurpee, storeFront, ROBBER, mult, coin, note, bill50, rain, bolt, pcard, tv } from './_luckkit.js';
import { card, title, stamp, cross, check, person } from './_info.js';

// ---------- storm ----------
// a tree built from two halves that split apart (k 0..1)
function splitTree() { const g = new THREE.Group(), h = []; for (const s of [-1, 1]) { const half = new THREE.Group(); half.add(box(0.14, 1.8, 0.28, '#7a5232', s * 0.07, 0.9, 0, { outline: 0.006 }));
  for (const [x, y, r] of [[0.3, 2.1, 0.6], [0.15, 2.6, 0.5], [0.5, 2.5, 0.42]]) half.add(ball(r, '#4a9a4a', s * x, y, 0, { outline: 0.008 })); g.add(half); h.push(half); } g.userData.h = h; return g; }
const STRIKE = 3.1;
S3('s01', (st) => SETS.suburbNight(st), [{ of: ME, x: -0.9, z: 0.3, r: FACE_X, p: [[0, 'stand']], e: [[0, 'neutral'], [STRIKE + 0.1, 'surprised'], [STRIKE + 1.0, 'calm']] }],
  C([-0.2, 1.2, 4.6], [0.6, 1.4, 0]), C([0.1, 1.15, 4.2], [0.6, 1.4, 0]),
  (g, t, i, s) => { rain(g, t, 0.55); tag(g, t, 'HOUR 3', 0.2); const p = scr(s, [1.1, 2.6, -0.6]); bolt(g, t, p[0] + 60, 0, p[0], p[1], STRIKE, 0.3); bandFlash(g, t, STRIKE, '#dfe8ff', 0.35); impact(g, t, p[0], p[1] + E.H * 0.1, E.H * 0.14, STRIKE, '#eaf2ff');
    if (t > STRIKE) smoke(g, t - STRIKE, p[0], p[1] + E.H * 0.12, E.H * 0.08, 0.6); },
  { night: true, build: (st, s) => { s.tr = splitTree(); s.tr.position.set(1.1, 0.14, -0.6); st.add(s.tr); },
    fx: (s, t) => { const f = s.A[0]; if (t < 1.5) { f.position.x = -0.9 + t * 0.9; f.setPose(walkPose(t * 5)); } const k = ease.out(clamp((t - STRIKE) / 0.5)); s.tr.userData.h.forEach((h, j) => { h.rotation.z = (j ? -1 : 1) * 0.35 * k; }); },
    after: (s, t) => shake(s.stage.camera, t, STRIKE, 0.06, 0.6) });

// s02 — you don't even flinch. Your hair isn't even wet.
S3('s02', (st) => SETS.suburbNight(st), [{ of: ME, x: 0.38, z: 0.3, r: FACE_Z + 0.5, p: [[0, 'stand'], [1.2, 'shrug']], e: [[0, 'calm'], [1.0, 'smirk']] }],
  C([1.25, 1.5, 1.6], [0.38, 1.45, 0.3]), C([1.15, 1.48, 1.4], [0.38, 1.45, 0.3]),
  (g, t) => { rain(g, t, 0.45, 5); shout(g, t, 'NOT EVEN WET.', { at: 1.6, y: E.H * 0.86, size: V(96, 90), shake: 0 }); }, { night: true });

// s03 — Roy Sullivan, a park ranger in Virginia, hit by lightning seven times. Survived all seven.
card('s03', 'blue', (g, t, info, u, cx, cy, acc) => { title(g, t, 'ROY SULLIVAN', cy - 330 * u, { at: 0.2, size: 88 }); title(g, t, 'PARK RANGER · VIRGINIA', cy - 240 * u, { at: 0.8, size: 46, color: '#9fd0ff' });
  person(g, cx, cy + 120 * u, 300 * u, '#ffffff'); g.fillStyle = '#6a8a3a'; g.fillRect(cx - 90 * u, cy - 75 * u, 180 * u, 22 * u); g.fillRect(cx - 50 * u, cy - 120 * u, 100 * u, 50 * u);
  for (let k = 0; k < 7; k++) { const at = 2.4 + k * 0.55; if (t < at) continue; const x = cx + (k - 3) * 150 * u, a = 1 - clamp((t - at) / 0.5) * 0.6; g.save(); g.strokeStyle = alpha('#ffe85a', a); g.lineWidth = 12 * u; g.lineJoin = 'round'; g.beginPath(); g.moveTo(x + 20 * u, cy + 220 * u); g.lineTo(x - 15 * u, cy + 290 * u); g.lineTo(x + 15 * u, cy + 290 * u); g.lineTo(x - 20 * u, cy + 370 * u); g.stroke(); g.restore(); }
  if (t > 6.4) stamp(g, t, '7 STRIKES · SURVIVED ALL 7', cx, cy + 440 * u, { at: 6.4, color: '#6fe6a0', size: 56, rot: -0.04 }); });

// s04 — the unluckiest man alive? Or the luckiest? Depends which end of the lightning you're on. Hold that thought.
card('s04', 'dark', (g, t, info, u, cx, cy) => { title(g, t, 'UNLUCKIEST?', cy - 60 * u, { at: 0.1, size: 100, x: cx - 420 * u, color: '#ff8a6a' }); title(g, t, 'LUCKIEST?', cy - 60 * u, { at: 2.0, size: 100, x: cx + 420 * u, color: '#ffd23a' });
  bolt(g, t, cx, cy - 400 * u, cx, cy + 200 * u, 3.2, 1.6); if (t > 5.1) title(g, t, 'HOLD THAT THOUGHT.', cy + 300 * u, { at: 5.1, size: 70 }); });

// ---------- Mom's card test (kitchen) ----------
const KIT = (st) => SETS.kitchen(st);
S3('m01', KIT, [{ of: MOM, x: 2.0, z: 1.75, r: FACE_X + 0.3, p: [[0, 'crossArms']], e: [[0, 'neutral'], [2.0, 'confused']] },
  { of: ME, x: 3.4, z: 1.85, r: FACE_NX - 0.2, p: [[0, 'explain']], e: [[0, 'talk'], [3.0, 'smirk']] }],
  C([2.7, 1.6, 3.95], [2.7, 1.25, 1.7]), C([2.7, 1.58, 3.8], [2.7, 1.25, 1.7]), (g, t) => tag(g, t, 'HOUR 4', 0.2), { mood: 'indoor', fov: 50 });

const CARDS = [['Q♥', true, 2.2], ['7♣', false, 3.2], ['A♠', false, 4.2]];
S3('m02', KIT, [{ of: MOM, x: 2.1, z: 0.9, r: FACE_X + 0.3, p: [[0, { shA: [80, 10], elA: 40, head: [0, -4] }]], e: [[0, 'confused'], [5.6, 'surprised']] }],
  C([3.6, 1.55, 3.1], [2.1, 1.25, 0.9]), C([3.45, 1.55, 2.85], [2.1, 1.25, 0.9]),
  (g, t) => { const u = U(); CARDS.forEach(([l, red, at], k) => { if (t > at) pcard(g, E.W * 0.7 + k * 30 * u, E.H * 0.45 + k * 10 * u, 300 * u, l, red, 1, -0.1 + k * 0.08); if (t > at) shout(g, t, l, { at, x: E.W * 0.3, y: E.H * 0.2, size: V(110, 100), dur: at + 0.95, shake: 0, color: red ? '#ff5a5a' : '#ffffff' }); });
    if (t > 5.0) { const n = Math.min(52, Math.floor(3 + 49 * prog(t, 5.0, 7.0))); shout(g, t, `${n}/52 RIGHT`, { at: 5.0, y: E.H * 0.86, size: V(100, 92), color: '#6fe6a0', shake: 0 }); } },
  { mood: 'indoor' });

S3('m03', KIT, [{ of: MOM, x: 2.1, z: 0.9, r: FACE_X + 0.45, p: [[0, 'stand'], [0.4, { shA: [40, 10], elA: 60, shB: [40, 10], elB: 60 }]], e: [[0, 'shocked'], [2.6, 'smirk']] }],
  C([3.3, 1.55, 2.5], [2.1, 1.35, 0.9]), C([3.2, 1.53, 2.3], [2.1, 1.35, 0.9]),
  (g, t) => shout(g, t, '"NOBODY TELLS YOUR AUNT."', { at: 2.8, y: E.H * 0.86, size: V(78, 72), shake: 0 }), { mood: 'indoor' });

// ---------- $50 bills + wallet ----------
S3('j01', 'suburb', [{ of: ME, x: 0.3, z: 0.2, r: FACE_Z + 0.2, p: [[0, 'stand'], [0.8, { shA: [40, 10], elA: 20, spine: [25, 0], head: [0, 20] }], [3.4, 'cheer'], [6.6, 'holdFront']], e: [[0, 'surprised'], [1.0, 'happy'], [7.0, 'confused']] }],
  C([1.6, 1.4, 3.6], [0.3, 1.0, 0.2]), C([1.3, 1.35, 3.0], [0.3, 1.0, 0.2]),
  (g, t) => { const u = U(); tag(g, t, 'HOUR 9', 0.2); mult(g, t, '×512', 0.6); if (t > 1.6) bill50(g, E.W * 0.3, E.H * 0.7 - Math.sin(t * 2) * 10 * u, 90 * u, -0.2); if (t > 2.6) bill50(g, E.W * 0.68, E.H * 0.66 - Math.cos(t * 2) * 10 * u, 90 * u, 0.25);
    note(g, t, ['KEEP IT.', "I'M MOVING", 'TO FLORIDA.'], E.W * 0.5, E.H * 0.5, 8.0, { w: 560, h: 420, size: 64 }); });

// ---------- the Speedway ----------
const SW = (st) => { SETS.street(st); storeFront(st, 0, -6.4); };
S3('j02', SW, [{ of: ME, x: 0.6, z: -3.0, r: FACE_Z + 0.3, p: [[0, 'stand']], e: [[0, 'happy'], [4.3, 'surprised']] },
  { of: ROBBER, x: -6, z: -3.3, r: FACE_X, p: [[0, 'stand']], e: [[0, 'angry']] }],
  C([2.4, 1.5, 2.6], [0, 1.3, -4]), C([2.0, 1.45, 2.0], [-0.5, 1.3, -4]),
  (g, t) => { tag(g, t, 'HOUR 10', 0.2); mult(g, t, '×1,024', 0.6); },
  { fx: (s, t) => { const r = s.A[1]; if (t > 2.4) { const k = clamp((t - 2.4) / 3); r.position.x = lerp(-6, -0.6, k); if (k < 1) r.setPose(walkPose(t * 5)); } } });

const SLIP = 2.4;
S3('j03', SW, [{ of: ROBBER, x: -0.6, z: -3.3, r: FACE_X + 0.4, p: [[0, { shA: [80, 10], elA: 10 }], [1.0, { shA: [80, 10], elA: 10, head: [0, 10] }]], e: [[0, 'angry'], [1.0, 'confused'], [SLIP, 'shocked']] },
  { of: ME, x: 0.6, z: -3.0, r: FACE_NX + 0.9, p: [[0, 'handsUp'], [SLIP + 1.0, 'stand']], e: [[0, 'scared'], [SLIP + 0.6, 'surprised'], [SLIP + 2.0, 'smirk']] }],
  C([0.3, 1.4, 0.4], [-0.1, 1.0, -3.2]), C([0.2, 1.3, 0.1], [-0.2, 0.8, -3.2]),
  (g, t, i, s) => { shout(g, t, 'CLICK.', { at: 1.0, y: E.H * 0.16, size: V(100, 92), dur: SLIP, shake: 0 }); const p = scr(s, [-0.9, 0.3, -3.3]); impact(g, t, p[0], p[1], E.H * 0.12, SLIP + 0.45, '#ffffff'); shout(g, t, 'OUT COLD.', { at: 4.0, y: E.H * 0.86, size: V(100, 92), shake: 0 }); },
  { build: (st, s) => { s.gun = gun(); st.add(s.gun); st.add(wetSign(-1.6, -2.6)); s.wet = cyl(0.5, 0.5, 0.005, '#8fc4ec', -0.9, 0.012, -3.3, { cast: false }); st.add(s.wet); },
    fx: (s, t) => { const r = s.A[0]; if (t < SLIP) { held(s.gun, r, 'A'); s.gun.rotation.set(0, r.rotation.y, 0); } else { const k = ease.out(clamp((t - SLIP) / 0.45)); r.userData.noSnap = true; r.rotation.y = FACE_X + 0.4; r.rotation.x = 0; r.position.x = -0.6 - 0.4 * k; r.rotation.z = -(k * Math.PI) / 2; r.position.y = 0.17 * k; s.gun.position.set(-0.2 + k * 0.6, lerp(1.1, 0.03, k), -3.0); } } });

S3('j04', SW, [{ of: ME, x: 0.6, z: -2.6, r: FACE_Z + 0.4, p: [[0, 'stand'], [4.3, { shA: [70, 10], elA: 120, head: [0, -4] }]], e: [[0, 'surprised'], [2.4, 'happy'], [4.5, 'smirk']] },
  { of: COP, x: -1.0, z: -2.8, r: FACE_Z - 0.5, p: [[0, 'stand'], [2.0, { shA: [70, 10], elA: 40 }]], e: [[0, 'neutral'], [2.0, 'smile']] }],
  C([1.2, 1.5, 2.6], [-0.2, 1.2, -2.7]), C([0.9, 1.45, 1.9], [-0.1, 1.2, -2.7]),
  (g, t) => { shout(g, t, 'WANTED IN 3 STATES', { at: 0.3, y: E.H * 0.14, size: V(84, 78), dur: 2.0, shake: 0 }); shout(g, t, 'REWARD $10,000', { at: 2.2, y: E.H * 0.14, size: V(96, 90), color: '#6fe6a0', dur: 4.2, shake: 0 });
    shout(g, t, 'FREE SLURPEE.', { at: 5.6, y: E.H * 0.86, size: V(92, 86), color: '#5fd8ff', shake: 0 }); },
  { build: (st, s) => { s.cc = copCar(-4.5, 0.2, 0); st.add(s.cc); s.sl = slurpee(); st.add(s.sl); }, fx: (s, t) => { flashLights(s.cc, t); held(s.sl, s.A[0], 'A', 0.04); } });

// ---------- Powerball ----------
card('j05', 'gold', (g, t, info, u, cx, cy) => { title(g, t, 'HOUR 12 · LUCK ×4,096', cy - 360 * u, { at: 0.1, size: 60, color: '#ffd23a' });
  [12, 27, 33, 41, 58, 9].forEach((n, k) => { const at = 1.8 + k * 0.35, a = ease.outBack(prog(t, at, at + 0.35)); if (a <= 0) return; const x = cx + (k - 2.5) * 190 * u, y = cy - 110 * u;
    g.save(); g.translate(x, y); g.scale(a, a); circle(g, 0, 0, 80 * u, k === 5 ? '#e8302c' : '#ffffff'); text(g, String(n), 0, 26 * u, { size: 72 * u, font: FONTS.ui, weight: 900, color: k === 5 ? '#ffffff' : '#141418', align: 'center' }); g.restore(); });
  if (t > 5.1) title(g, t, 'ODDS: 1 IN 292,000,000', cy + 110 * u, { at: 5.1, size: 76 });
  if (t > 8.2) title(g, t, "(MOM BUYS IT. YOU'RE 17.)", cy + 260 * u, { at: 8.2, size: 56, color: '#f2e6c8' }); });

S3('j06', (st) => SETS.suburb(st, { cars: true }), [{ of: MOM, x: 0.95, z: 0.15, r: FACE_Z - 0.5, p: [[0, 'cheer'], [1.4, { shA: [30, 30], elA: 120, shB: [30, 30], elB: 120, head: [0, -15] }]], e: [[0, 'joy'], [1.2, 'sad']] },
  { of: ME, x: 0, z: 0.25, r: FACE_Z + 0.4, p: [[0, 'cheer'], [2.6, { shA: [20, 10], elA: 130, head: [0, -10] }]], e: [[0, 'joy'], [2.4, 'sad'], [4.8, 'smirk']] }],
  C([0.9, 1.45, 3.4], [0.45, 1.3, 0.2]), C([0.8, 1.45, 2.8], [0.45, 1.35, 0.2]),
  (g, t, i, s) => { tag(g, t, 'KROGER PARKING LOT', 0.2); shout(g, t, 'YOU WIN.', { at: 0.1, y: E.H * 0.15, size: V(120, 110), color: '#ffd23a', dur: 2.2 }); const pm = scr(s, [0.95, 1.5, 0.15]); tears(g, t, pm[0], pm[1], E.H * 0.06, 1.3);
    const pk = scr(s, [0, 1.5, 0.25]); tears(g, t, pk[0], pk[1], E.H * 0.05, 3.1); shout(g, t, "DON'T TELL ANYONE.", { at: 4.6, y: E.H * 0.86, size: V(84, 78), shake: 0 }); },
  { build: (st, s) => { s.tk = ticket(); st.add(s.tk); }, fx: (s, t) => { held(s.tk, s.A[1], 'A', 0.06); s.tk.rotation.set(0, FACE_Z + Math.PI / 2 + 0.4, 0); } });

// ---------- PAID ----------
S2('j07', (g, t, info) => { const u = U(); g.fillStyle = '#e8eef2'; g.fillRect(0, 0, E.W, E.H); g.fillStyle = '#d8e0e6'; g.fillRect(0, E.H * 0.5, E.W, 6 * u);
  const z = 1 + 0.06 * t / info.dur; g.save(); g.translate(E.W / 2, E.H / 2); g.scale(z, z); g.rotate(-0.03);
  g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(-380 * u + 14 * u, -470 * u + 16 * u, 760 * u, 940 * u); g.fillStyle = '#fbfaf4'; g.fillRect(-380 * u, -470 * u, 760 * u, 940 * u);
  circle(g, 0, -500 * u, 34 * u, '#e8302c'); text(g, 'FIRST OHIO BANK', 0, -380 * u, { size: 52 * u, font: FONTS.ui, weight: 900, color: '#1d3a6a', align: 'center' });
  text(g, 'FINAL NOTICE', 0, -270 * u, { size: 70 * u, font: FONTS.ui, weight: 900, color: '#c8102e', align: 'center' });
  for (let k = 0; k < 9; k++) g.fillStyle = '#c8ccd4', g.fillRect(-300 * u, -180 * u + k * 60 * u, (k % 3 === 2 ? 380 : 600) * u, 16 * u);
  text(g, 'FORECLOSURE', 0, 420 * u, { size: 44 * u, font: FONTS.ui, weight: 900, color: '#8a96a8', align: 'center' });
  const k = prog(t, 6.2, 7.0); if (k > 0) { g.save(); g.rotate(-0.25); g.globalAlpha = 0.92; g.strokeStyle = '#d8202c'; g.lineWidth = 26 * u; g.lineCap = 'round'; g.lineJoin = 'round';
    const S = [[-280, 60], [-280, -110], [-200, -110], [-180, -60], [-280, -30], [-120, 60], [-80, -110], [-30, 60], [-100, 0], [-50, 0], [20, -110], [20, 60], [90, -110], [90, 60], [170, 60], [220, -20], [170, -110], [90, -110]];
    g.beginPath(); S.slice(0, Math.max(2, Math.floor(S.length * k))).forEach(([x, y], i) => (i ? g.lineTo(x * u, y * u) : g.moveTo(x * u, y * u))); g.stroke(); g.restore();
    text(g, 'PAID', 0, 80 * u, { size: 230 * u, font: FONTS.ui, weight: 900, color: '#d8202c', align: 'center', alpha: ease.out(prog(t, 6.8, 7.4)) }); }
  g.restore(); });

S3('j08', (st) => SETS.kitchen(st), [{ of: MOM, x: 3.2, z: -2.3, r: FACE_NZ + 0.15, p: [[0, 'stand']], e: [[0, 'calm']] }],
  C([1.2, 1.5, 1.8], [3.2, 1.3, -2.8]), C([1.4, 1.5, 1.4], [3.2, 1.3, -2.8]), (g) => vignette(g, '#0a0c18', 0.55), { mood: 'indoor' });

// ---------- Dev: dead battery ----------
S3('j09', (st) => SETS.suburbNight(st), [{ of: DEV, x: 1.7, z: 5.6, r: FACE_Z - 0.3, p: [[0, 'phone']], e: [[0, 'worried'], [2.5, 'sad']] }],
  C([3.6, 1.5, 10.0], [1.0, 1.0, 4.3]), C([3.3, 1.45, 9.2], [1.0, 1.0, 4.3]),
  (g, t) => { tag(g, t, 'MEANWHILE · DEV', 0.2, '#ffb05a'); shout(g, t, 'CLASSIC DEV.', { at: 3.9, y: E.H * 0.86, size: V(96, 90), shake: 0 }); },
  { night: true, build: (st, s) => { const c = vehicle(0, 4.3, 0, { body: DEV.color, cab: '#c8641a' }); st.add(c); const hood = box(1.2, 0.06, 1.7, DEV.color, 1.85, 1.5, 4.3, { outline: 0.006 }); hood.rotation.z = 0.9; st.add(hood); } });

// ---------- the Cavs game ----------
const GYM = (st) => SETS.gym(st);
S3('j10', GYM, [{ of: MOM, x: 0.45, z: -3.75, r: FACE_Z, y: 0.02, p: [[0, 'sit'], [6.9, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [150, 20], elA: 20, shB: [150, 20], elB: 20 }]], e: [[0, 'happy'], [6.9, 'joy']] },
  { of: ME, x: -0.45, z: -3.75, r: FACE_Z, y: 0.02, p: [[0, 'sit'], [6.7, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [60, 10], elA: 60, shB: [60, 10], elB: 60 }]], e: [[0, 'happy'], [6.8, 'surprised']] }],
  C([1.4, 1.2, 0.2], [0, 0.85, -3.8]), C([1.1, 1.15, -0.6], [0, 0.85, -3.8]),
  (g, t) => { tag(g, t, 'HOUR 14 · COURTSIDE', 0.2); shout(g, t, 'T-SHIRT CANNON!', { at: 4.4, y: E.H * 0.15, size: V(84, 78), dur: 6.6, shake: 0 }); },
  { mood: 'indoor', build: (st, s) => { s.sh = ball(0.13, '#e8302c', 0, 0, 0, { outline: 0.006 }); s.sh.scale.set(1.3, 0.7, 1); st.add(s.sh); },
    fx: (s, t) => { const k = clamp((t - 5.0) / 1.7); s.sh.visible = t > 5.0; s.sh.position.set(lerp(6, -0.45, k), 0.62 + Math.sin(k * Math.PI) * 4, lerp(2, -3.5, k)); s.sh.rotation.z = k * 12; } });

const SWISH = 5.0, HOOP = [-10.5, 3.0, 0];
S3('j11', GYM, [{ of: ME, x: 0, z: 0.6, r: FACE_NX, p: [[0, 'stand'], [2.6, { shA: [150, 10], elA: 40, shB: [140, 10], elB: 50, head: [0, 10] }], [3.4, 'stand'], [SWISH + 0.1, 'cheer']], e: [[0, 'worried'], [2.6, 'determined'], [SWISH + 0.1, 'joy']] }],
  C([3.8, 1.7, 4.6], [-3.0, 1.8, 0]), C([3.2, 1.8, 4.0], [-4.5, 2.0, 0]),
  (g, t, i, s) => { shout(g, t, 'HALF-COURT SHOT', { at: 0.2, y: E.H * 0.14, size: V(84, 78), dur: 3.0, shake: 0 }); shout(g, t, 'SWISH!', { at: SWISH, y: E.H * 0.2, size: V(140, 130), color: '#ffd23a' }); const p = scr(s, HOOP); impact(g, t, p[0], p[1], E.H * 0.1, SWISH, '#ff8a2a'); },
  { mood: 'indoor', build: (st, s) => { s.b = ball(0.12, '#e8782a', 0, 0, 0, { outline: 0.006 }); st.add(s.b); },
    fx: (s, t) => { const f = s.A[0]; const k = clamp((t - 3.2) / (SWISH - 3.2)); if (t < 3.2) held(s.b, f, 'A', 0.08); else s.b.position.set(lerp(-0.2, HOOP[0], k), lerp(2.0, HOOP[1] + 0.1, k) + Math.sin(k * Math.PI) * 4.5 - (t > SWISH ? (t - SWISH) * 2 : 0), lerp(0.6, HOOP[2], k)); } });

// j12 — 20,000 people chant your name. The watch ticks backward so hard you feel it in your teeth. 12 hours left.
S2('j12', (g, t, info) => { const red = t > 2.6 ? 1 : 0; darkGold(g, t, red); const jolt = Math.max(0, 1 - Math.abs(t - 2.6) * 4); watchFace(g, t, { x: E.W / 2 + Math.sin(t * 80) * 14 * jolt, sec: secAngle(t, 10, [2.6, 2.75, 2.9]), glowK: 0.5, red: red * 0.8 });
  shout(g, t, 'KIP! KIP! KIP!', { at: 0.05, y: E.H * 0.13, size: V(96, 90), dur: 2.4, color: '#ffd23a' }); bandFlash(g, t, 2.6, '#ff5a3a', 0.25);
  shout(g, t, '12 HOURS LEFT', { at: 6.2, y: E.H * 0.87, size: V(100, 92), color: '#ff5a4a', shake: 0 }); if (t > 6.4) vignette(g, '#3a0604', 0.5); });
