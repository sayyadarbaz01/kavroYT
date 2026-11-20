// shots/02_discovery.js — 0:31-2:08: the watch arrives, wind once, Dev + coin flips, pizza, hour one, roadmap, RULES 1-3.
import { walkPose } from '../toon/toon.js';
import { text, FONTS, alpha, rr, circle } from '/engine/core.js';
import { ME, fig, shot, face, cam, C, push, pose, expr, held, bandFlash, vignette, shout, impact, scr, THREE, box, cyl, E, V, ease, prog, clamp, lerp, SETS } from './_lib.js';
import { DEV } from '../toon/cast3d.js';
import { FACE_Z, FACE_NZ, FACE_X, FACE_NX, U, tag, watchFace, darkGold, secAngle, shake } from './_luck.js';
import { S3, S2, bowl, pizza, cutters, mult, coin, note } from './_luckkit.js';
import { card, title, stamp, cross, check } from './_info.js';

// brass back of the watch: tiny "30" + a scratched line under it; words 0..1 turns the line into tiny words; zoom scales the plate
export function watchBack(g, t, o = {}) { const u = U(), { R = E.H * 0.36, words = 0, glint = 0, zoom = 1 } = o, x = E.W / 2, y = E.H / 2, r = R * zoom;
  g.save(); const cs = g.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); cs.addColorStop(0, '#f6dc94'); cs.addColorStop(0.7, '#c8a24a'); cs.addColorStop(1, '#7a5a1e'); circle(g, x, y, r, cs);
  g.strokeStyle = alpha('#5a4214', 0.6); g.lineWidth = 6 * u; g.beginPath(); g.arc(x, y, r * 0.88, 0, 7); g.stroke();
  for (let i = 0; i < 18; i++) { g.strokeStyle = alpha('#ffffff', 0.08); g.beginPath(); g.arc(x, y, r * (0.2 + i * 0.04), 0, 7); g.stroke(); }
  text(g, '30', x, y + r * 0.05, { size: r * 0.42, font: FONTS.ui, weight: 900, color: '#6a4a14', align: 'center' });
  const ly = y + r * 0.28, a = 1 - words; g.strokeStyle = alpha('#5a3a10', a); g.lineWidth = 5 * u; g.beginPath(); g.moveTo(x - r * 0.42, ly); g.lineTo(x - r * 0.1, ly - 3 * u); g.lineTo(x + r * 0.2, ly + 2 * u); g.lineTo(x + r * 0.42, ly - 2 * u); g.stroke();
  if (words > 0) text(g, "LUCK CAN'T BE MADE. ONLY MOVED.", x, ly + r * 0.02, { size: r * 0.075, font: FONTS.ui, weight: 900, color: '#5a3a10', align: 'center', alpha: words });
  if (glint > 0) { const gx = x - r + glint * r * 2; g.save(); g.beginPath(); g.arc(x, y, r, 0, 7); g.clip(); g.globalCompositeOperation = 'lighter'; const gr = g.createLinearGradient(gx - r * 0.3, 0, gx + r * 0.3, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, 'rgba(255,250,220,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); g.restore(); }
  g.restore(); }

// bedroom: figures sit on the bed edge (bed front edge at z -1.95, seat height 0.22)
const BED = (st) => SETS.bedroom(st);
const BEDCAM = C([0.4, 1.45, 1.7], [-2.45, 0.95, -1.9]), BEDCAM2 = C([-0.1, 1.4, 1.2], [-2.45, 0.95, -1.9]);

// d01 — Monday, hour zero: a small package on the porch steps; Kip opens it on the sidewalk
S3('d01', 'suburb', [{ of: ME, x: 0.2, z: 0.1, r: FACE_Z + 0.2, p: [[0, 'holdFront'], [2.4, { shA: [75, 10], elA: 50, shB: [60, 10], elB: 70, head: [0, -16] }]], e: [[0, 'thinking'], [2.5, 'surprised']] }],
  C([1.6, 1.4, 3.8], [0.2, 1.1, 0]), C([1.2, 1.35, 3.0], [0.2, 1.1, 0]),
  (g, t) => tag(g, t, 'MONDAY · HOUR 0', 0.2),
  { build: (st, s) => { s.pk = box(0.34, 0.2, 0.26, '#c8a070', 0, 0, 0, { outline: 0.006 }); st.add(s.pk); }, fx: (s, t) => { held(s.pk, s.A[0], 'A', -0.02); s.pk.rotation.y = FACE_Z + 0.2; } });

// d02 — the watch in the box, a paper tag on a string: WIND ONCE
S2('d02', (g, t) => { darkGold(g, t); watchFace(g, t, { x: E.W * 0.42, sec: secAngle(t, 5), glowK: 0.35 });
  const u = U(), tx = E.W * 0.72, ty = E.H * 0.5; g.strokeStyle = '#d8c8a0'; g.lineWidth = 4 * u; g.beginPath(); g.moveTo(E.W * 0.42 + E.H * 0.36, E.H * 0.5); g.quadraticCurveTo(tx - 120 * u, ty + 80 * u, tx - 60 * u, ty); g.stroke();
  note(g, t, ['WIND', 'ONCE.'], tx, ty, 0.6, { bg: '#f2e6c8', w: 300, h: 300, size: 74, rot: 0.08 }); });

// d03 — you wind it once... TICK (gold flash)
S2('d03', (g, t) => { darkGold(g, t); const w = ease.inOut(prog(t, 0.2, 1.4)); watchFace(g, t, { sec: secAngle(Math.max(0, t - 1.8), 0), glowK: 0.35 + 0.65 * clamp((t - 1.8) * 3) * (1 - clamp((t - 2.2) * 2)) });
  const u = U(); g.save(); g.translate(E.W / 2 + E.H * 0.36, E.H / 2); g.rotate(w * Math.PI * 2); g.fillStyle = '#e8c870'; g.fillRect(-14 * u, -28 * u, 28 * u, 56 * u); g.restore();
  bandFlash(g, t, 1.82, '#ffe8a0', 0.25); shout(g, t, 'TICK.', { at: 1.8, y: E.H * 0.14, size: V(120, 110), color: '#ffd23a', shake: 0 }); });

// d04 — Dev on your bed eating your cereal, like he pays rent here
S3('d04', BED, [{ of: DEV, x: -2.0, z: -1.85, r: FACE_Z, y: 0.22, p: [[0, { ...{}, hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [40, 10], elA: 110, shB: [30, 10], elB: 80 }]], e: [[0, 'neutral'], [1.5, 'smile']] },
  { of: ME, x: -0.3, z: -2.7, r: FACE_NX + 0.1, p: [[0, 'crossArms']], e: [[0, 'neutral'], [1.8, 'confused']] }],
  C([1.8, 1.55, 2.0], [-1.1, 1.0, -2.0]), C([1.5, 1.5, 1.7], [-1.1, 1.0, -2.0]), null,
  { build: (st, s) => { s.b = bowl(); st.add(s.b); }, fx: (s, t) => { const f = s.A[0]; f.updateMatrixWorld(true); const v = new THREE.Vector3(); f.parts.arms.B.hand.getWorldPosition(v); s.b.position.set(v.x, v.y - 0.04, v.z); } });

// d05 — "Flip for the last slice?" Heads. Heads. Ten flips, ten heads.
const FLIPS = [1.64, 3.1, 4.0, 4.2, 4.4, 4.6, 4.8, 5.0, 5.2, 5.4];
S3('d05', BED, [{ of: DEV, x: -2.0, z: -1.85, r: FACE_Z - 0.3, y: 0.22, p: [[0, 'sit']], e: [[0, 'smirk'], [3.2, 'confused'], [5.0, 'shocked']] },
  { of: ME, x: -2.95, z: -1.85, r: FACE_Z + 0.3, y: 0.22, p: [[0, 'sit'], [1.4, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [70, 10], elA: 30 }]], e: [[0, 'neutral'], [1.7, 'happy'], [4.8, 'smirk']] }],
  BEDCAM, BEDCAM2,
  (g, t) => { const u = U(); FLIPS.forEach((at, k) => { if (k < 2) coin(g, t, E.W * 0.5, E.H * 0.42, 70 * u, 'H', at - 0.8, 0.8); });
    const n = FLIPS.filter((a) => t >= a).length; if (n > 0) { shout(g, t, n === 1 ? 'HEADS!' : n === 2 ? 'HEADS AGAIN!' : `${n}/10 HEADS`, { at: FLIPS[0], y: E.H * 0.16, size: V(100, 92), color: '#ffd23a', shake: 0 }); }
    if (t > 3.9) for (let k = 0; k < Math.min(10, n); k++) coin(g, t, E.W * (0.22 + k * 0.062), E.H * 0.86, 30 * u, 'H', 0, 0.01); });

// d06 — "Okay, you're cheating." Dev grabs the slice. It slides off the plate. Face down. On the carpet.
const DROP = 4.4;
S3('d06', BED, [{ of: DEV, x: -2.0, z: -1.85, r: FACE_Z - 0.3, y: 0.22, p: [[0, 'sit'], [1.8, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [55, 15], elA: 60 }]], e: [[0, 'angry'], [2.0, 'smirk'], [DROP + 0.1, 'shocked']] },
  { of: ME, x: -2.95, z: -1.85, r: FACE_Z + 0.3, y: 0.22, p: SITP(), e: [[0, 'smirk'], [DROP + 0.2, 'happy']] }],
  BEDCAM, BEDCAM2,
  (g, t) => { shout(g, t, "YOU'RE CHEATING!", { at: 0.1, y: E.H * 0.15, size: V(92, 86), dur: 2.0, shake: 0 }); shout(g, t, 'SPLAT.', { at: DROP + 0.45, y: E.H * 0.86, size: V(110, 100), color: '#ff9a3a' }); },
  { build: (st, s) => { s.pz = pizza(); st.add(s.pz); }, fx: (s, t) => { const f = s.A[0]; f.updateMatrixWorld(true); const v = new THREE.Vector3(); f.parts.arms.A.hand.getWorldPosition(v);
    if (t < DROP) { s.pz.position.set(v.x, v.y, v.z + 0.05); s.pz.rotation.set(0, 0.3, 0); } else { const k = clamp((t - DROP) / 0.4); s.pz.position.set(v.x + 0.15 * k, lerp(v.y, 0.03, k * k), v.z + 0.25 * k); s.pz.rotation.set(Math.PI * ease.out(k), 0.3, 0); } } });
function SITP() { return [[0, 'sit']]; }

// d07 — but then the watch ticks louder. Hour one. The whole room leans toward you.
S3('d07', BED, [{ of: ME, x: -2.95, z: -1.85, r: FACE_Z + 0.3, y: 0.22, p: [[0, 'sit'], [1.6, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [60, 20], elA: 100, head: [0, -10] }]], e: [[0, 'neutral'], [0.4, 'surprised'], [2.4, 'awe']] }],
  C([-1.6, 1.25, -0.4], [-2.95, 1.05, -1.85]), C([-1.9, 1.2, -0.75], [-2.95, 1.05, -1.85]),
  (g, t) => { tag(g, t, 'HOUR 1', 0.3); mult(g, t, '×2', 2.1); const k = ease.inOut(prog(t, 2.6, 5.0)); if (k > 0) { g.save(); g.globalAlpha = 0.25 * k; g.fillStyle = '#ffcf5a'; g.fillRect(0, 0, E.W, E.H); g.restore(); vignette(g, '#3a2600', 0.5 * k); } },
  { after: (s, t) => { const k = ease.inOut(prog(t, 2.6, 5.5)); s.stage.camera.rotateZ(0.14 * k); } });

// d08 — the roadmap: in six hours... by hour twelve... at hour twenty
card('d08', 'dark', (g, t, info, u, cx, cy, acc) => {
  const P = [['HOUR 6', 'NEVER LOSE A COIN FLIP', 0.2], ['HOUR 12', 'MONEY FINDS YOU', 3.3], ['HOUR 20', 'PEOPLE IN SUITS', 5.9]];
  P.forEach(([h, s, at], k) => { const x = E.W * (0.2 + k * 0.3), y = cy, a = ease.outBack(prog(t, at, at + 0.4)); if (a <= 0) return; g.save(); g.translate(x, y); g.scale(a, a);
    g.fillStyle = 'rgba(255,255,255,.08)'; rr(g, -250 * u, -300 * u, 500 * u, 600 * u, 30 * u); g.fill(); g.strokeStyle = alpha(acc, 0.6); g.lineWidth = 5 * u; g.stroke();
    text(g, h, 0, -200 * u, { size: 70 * u, font: FONTS.ui, weight: 900, color: '#ffd23a', align: 'center' });
    if (k === 0) { circle(g, 0, 10 * u, 95 * u, '#c8902a'); circle(g, 0, 10 * u, 80 * u, '#f6d26a'); text(g, 'H', 0, 40 * u, { size: 90 * u, font: FONTS.ui, weight: 900, color: '#8a5a14', align: 'center' }); }
    if (k === 1) for (let j = 0; j < 4; j++) { g.save(); g.translate((j - 1.5) * 30 * u, 10 * u - j * 18 * u); g.rotate(-0.2 + j * 0.12); g.fillStyle = '#7fbf7a'; rr(g, -110 * u, -50 * u, 220 * u, 100 * u, 8 * u); g.fill(); text(g, '$', 0, 22 * u, { size: 70 * u, font: FONTS.ui, weight: 900, color: '#1f5a2a', align: 'center' }); g.restore(); }
    if (k === 2) for (const sx of [-1, 1]) { g.fillStyle = '#141418'; circle(g, sx * 70 * u, -40 * u, 40 * u, '#141418'); rr(g, sx * 70 * u - 55 * u, 0, 110 * u, 150 * u, 20 * u); g.fill(); g.fillStyle = '#ffffff'; g.fillRect(sx * 70 * u - 10 * u, 0, 20 * u, 60 * u); }
    text(g, s, 0, 230 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center' }); g.restore(); }); });

// r01 — RULE 1: your luck doubles every hour, on the hour. Not adds. Doubles.
card('r01', 'gold', (g, t, info, u, cx, cy) => { stamp(g, t, 'RULE 1', cx, cy - 300 * u, { at: 0.1, color: '#ffd23a', size: 90 });
  title(g, t, 'YOUR LUCK DOUBLES', cy - 80 * u, { at: 0.8, size: 96 }); title(g, t, 'EVERY HOUR', cy + 40 * u, { at: 1.2, size: 96, color: '#ffd23a' });
  title(g, t, '+1', cy + 250 * u, { at: 3.5, size: 150, x: cx - 240 * u }); cross(g, t, cx - 240 * u, cy + 220 * u, 110 * u, 3.8);
  title(g, t, '×2', cy + 250 * u, { at: 4.2, size: 150, x: cx + 240 * u, color: '#6fe6a0' }); check(g, t, cx + 400 * u, cy + 200 * u, 60 * u, 4.4); });

// r02 — hour 1 ×2, hour 2 ×4, hour 10 over a thousand
card('r02', 'gold', (g, t, info, u, cx, cy) => { const B = [['HOUR 1', '×2', 2, 0.2], ['HOUR 2', '×4', 4, 3.0], ['HOUR 10', '×1,024', 1024, 4.6]];
  B.forEach(([h, s, v, at], k) => { const x = cx + (k - 1) * 420 * u, base = cy + 300 * u, hh = (k === 2 ? 560 : 60 + k * 60) * u * ease.out(prog(t, at, at + 1.0)); if (t < at) return;
    g.fillStyle = k === 2 ? '#ffd23a' : '#f2e6c8'; rr(g, x - 110 * u, base - hh, 220 * u, hh, 16 * u); g.fill();
    text(g, s, x, base - hh - 30 * u, { size: (k === 2 ? 96 : 70) * u, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center', stroke: 10 * u, strokeColor: 'rgba(0,0,0,.45)' });
    text(g, h, x, base + 70 * u, { size: 50 * u, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center' }); }); });

// r03 — the penny trick: one cent doubled every day for 30 days = $5.3 million
card('r03', 'teal', (g, t, info, u, cx, cy) => { title(g, t, 'THAT SOUNDS SLOW.', cy - 330 * u, { at: 0.1, size: 70 });
  const day = Math.min(30, Math.max(1, Math.floor(1 + 29 * ease.in(prog(t, 2.8, 9.2))))); const amt = 0.01 * Math.pow(2, day - 1);
  if (t > 1.3) { title(g, t, 'THE PENNY TRICK', cy - 210 * u, { at: 1.3, size: 84, color: '#9ff2d8' }); }
  if (t > 2.6) { const n = Math.min(26, day); for (let k = 0; k < n; k++) { const x = cx - 560 * u + (k % 13) * 90 * u, y = cy + 220 * u - Math.floor(k / 13) * 30 * u; circle(g, x, y - (k % 3) * 4 * u, 34 * u, '#b8743a'); circle(g, x, y - (k % 3) * 4 * u, 27 * u, '#d8945a'); }
    text(g, `DAY ${day}`, cx, cy - 40 * u, { size: 80 * u, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center' });
    text(g, '$' + amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), cx, cy + 80 * u, { size: 120 * u, font: FONTS.ui, weight: 900, color: day >= 30 ? '#ffd23a' : '#ffffff', align: 'center', stroke: 12 * u, strokeColor: 'rgba(0,0,0,.4)' }); }
  if (t > 9.6) stamp(g, t, 'IT EATS EVERYTHING', cx, cy + 370 * u, { at: 9.6, color: '#ff5a4a', size: 70 }); });

// r04 — RULE 2: it doesn't come off. No buckle.
card('r04', 'red', (g, t, info, u, cx, cy) => { stamp(g, t, 'RULE 2', cx, cy - 280 * u, { at: 0.1, color: '#ffd23a', size: 90 }); title(g, t, "IT DOESN'T COME OFF", cy - 40 * u, { at: 0.8, size: 96 });
  title(g, t, 'NO BUCKLE.', cy + 160 * u, { at: 2.2, size: 84, color: '#ff8a6a' }); });

// r05 — soap, butter... and Dev's dad's bolt cutters. They snap in half; the broken half hits Dev's shin.
const SNAP = 3.4;
S3('r05', 'storage', [{ of: ME, x: -0.75, z: -0.3, r: FACE_X + 0.5, p: [[0, { shA: [80, 15], elA: 10, head: [0, -6] }]], e: [[0, 'worried'], [SNAP + 0.1, 'surprised']] },
  { of: DEV, x: 0.75, z: -0.1, r: FACE_NX - 0.5, p: [[0, { shA: [70, 10], elA: 30, shB: [70, 10], elB: 30 }], [SNAP, 'shocked']], e: [[0, 'determined'], [SNAP + 0.05, 'shocked'], [SNAP + 0.5, 'angry']] }],
  C([0.1, 1.5, 3.4], [0, 1.0, -0.2]), C([0.05, 1.45, 3.1], [0, 1.0, -0.2]),
  (g, t, i, s) => { shout(g, t, 'SOAP.', { at: 0.3, x: E.W * 0.25, y: E.H * 0.15, size: V(80, 74), dur: SNAP, shake: 0 }); shout(g, t, 'BUTTER.', { at: 0.9, x: E.W * 0.5, y: E.H * 0.15, size: V(80, 74), dur: SNAP, shake: 0 }); shout(g, t, 'BOLT CUTTERS.', { at: 1.7, x: E.W * 0.76, y: E.H * 0.15, size: V(80, 74), dur: SNAP, shake: 0 });
    const p = scr(s, [0, 1.0, -0.05]); impact(g, t, p[0], p[1], E.H * 0.16, SNAP, '#ffd84a'); bandFlash(g, t, SNAP, '#ffffff', 0.2); },
  { mood: 'indoor', build: (st, s) => { s.c = cutters(); st.add(s.c); s.half = box(0.3, 0.04, 0.04, '#c8302c', 0, 0, 0, { outline: 0.004 }); st.add(s.half); },
    fx: (s, t) => { const f = s.A[1]; f.updateMatrixWorld(true); const v = new THREE.Vector3(); f.parts.arms.A.hand.getWorldPosition(v); s.c.position.set(v.x - 0.2, v.y, v.z); s.c.rotation.set(0, 0.2, 0);
      const k = clamp((t - SNAP) / 0.5); s.half.visible = t > SNAP; s.half.position.set(lerp(-0.05, 0.62, k), lerp(1.0, 0.35, k) + Math.sin(k * Math.PI) * 0.3, lerp(-0.05, 0.2, k)); s.half.rotation.z = k * 9; },
    after: (s, t) => shake(s.stage.camera, t, SNAP, 0.04, 0.4) });

// r06 — Dev hops around the garage holding his shin. You don't have a scratch.
S3('r06', 'storage', [{ of: DEV, x: 0.55, z: 0.1, r: FACE_NX - 0.6, p: [[0, { hipA: 70, knA: 100, shA: [60, 20], elA: 100, shB: [60, 20], elB: 100, spine: [20, 0] }]], e: [[0, 'angry']] },
  { of: ME, x: -0.6, z: -0.15, r: FACE_X + 0.5, p: [[0, 'stand'], [1.8, { shA: [40, 15], elA: 95, head: [0, -10] }]], e: [[0, 'surprised'], [1.6, 'smirk']] }],
  C([0.0, 1.5, 3.4], [0, 1.0, -0.2]), C([-0.05, 1.45, 3.1], [-0.1, 1.0, -0.2]),
  (g, t) => shout(g, t, 'NOT A SCRATCH.', { at: 2.2, y: E.H * 0.86, size: V(96, 90), shake: 0 }),
  { mood: 'indoor', fx: (s, t) => { const f = s.A[0]; f.userData.noSnap = true; f.position.y = Math.abs(Math.sin(t * 7)) * 0.16; f.position.x = 0.55 + Math.sin(t * 2.2) * 0.2; } });

// r07 — RULE 3: every time you win something big, the second hand jumps BACKWARD. One tick. So it's counting down. To what?
S2('r07', (g, t) => { darkGold(g, t); watchFace(g, t, { x: E.W * 0.62, sec: secAngle(t, 20, [4.2, 6.6]), glowK: 0.4 });
  const u = U(); stamp(g, t, 'RULE 3', E.W * 0.22, E.H * 0.24, { at: 0.1, color: '#ffd23a', size: 90, u });
  shout(g, t, 'BACKWARD.', { at: 4.25, x: E.W * 0.22, y: E.H * 0.5, size: V(84, 78), color: '#ff5a4a', shake: 0 }); shout(g, t, 'COUNTING DOWN?', { at: 5.6, x: E.W * 0.22, y: E.H * 0.66, size: V(66, 60), shake: 0 });
  shout(g, t, 'TO WHAT?', { at: 7.9, x: E.W * 0.22, y: E.H * 0.8, size: V(66, 60), color: '#ffd23a', shake: 0 }); });

// r08 — on the back of the watch: a tiny 30, and a line scratched under it. Something happens at hour thirty.
S2('r08', (g, t, info) => { darkGold(g, t, t > 5 ? 1 : 0); watchBack(g, t, { zoom: 0.9 + 0.12 * ease.inOut(prog(t, 0, info.dur)), glint: prog(t, 1.0, 2.4) });
  shout(g, t, '30 HOURS', { at: 4.4, y: E.H * 0.12, size: V(110, 100), color: '#ffd23a', shake: 0 }); if (t > 5.4) vignette(g, '#3a0604', 0.6 * clamp((t - 5.4) / 1.2)); });
