// shots/03_gym.js — 1:05–1:59: dodgeball, arm-wrestling, zero fear (wall, nettles), the ghost pepper.
import { ME, JAY, fig, shot, face, pose, expr, cam, push, C, lie, scr, headOf, handPos, kitchen, shout, steam, impact, vignette, pepper, held, ballMesh, POSE, E, V, ease, prog, clamp, lerp, SETS, box, cyl } from './_lib.js';
import { tears } from './_lib.js';
import { label } from '../toon/fx.js';
import { KIDS } from '../toon/cast3d.js';
import * as FX from '/engine/fx2d.js';
import { glow as glow2 } from '/engine/core.js';
import { card, title, stamp, cross, brain, muscle, flameIcon, U, text, FONTS, rr } from './_info.js';

// ---------- gym ----------
const LEO = [-2, 0];
function gym(st, s, o = {}) {
  SETS.gym(st); s.me = fig(st, ME, LEO[0], LEO[1], 0, 'ready');
  s.kids = [[4.6, 0, 0], [5.2, -2.2, 1], [5.4, 2.0, 2], [-4.6, -2.0, 3], [-5.0, 2.2, 4]].map(([x, z, k]) => fig(st, KIDS[k], x, z, x > 0 ? Math.PI : 0, 'ready', 'determined'));
  s.ball = ballMesh(); st.add(s.ball); s.ball.position.set(0, 0.11, 0.6); for (const z of [-1.6, 2.4]) { const b = ballMesh(); b.position.set(0.05, 0.11, z); st.add(b); }
}
const bob = (s, t) => s.kids.forEach((k, j) => { pose(k, t + j, [[0, { ...POSE.ready, drop: 0.06 + 0.03 * Math.sin(t * 5 + j) }]]); k.act(t + j, 'determined', 3 + j * 0.3); });
const arc = (a, b, k, h = 0.6) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k) + Math.sin(k * Math.PI) * h, lerp(a[2], b[2], k)];

// b01 — wide: dodgeball in gym class
shot('b01', (st, s) => gym(st, s),
  (s, t, i, T) => { bob(s, t); pose(s.me, t, [[0, { ...POSE.ready, drop: 0.06 + 0.03 * Math.sin(t * 5) }]]); expr(s.me, t, [[0, 'happy']]); cam(T, s, t, i, C([-7.5, 3.4, 8.5], [0.5, 0.9, 0]), C([-5.5, 2.8, 7.2], [0.8, 0.9, 0])); },
  (g, t) => label(g, t, 'GYM CLASS', { at: 0.3 }));

// b02 — a 50 km/h throw, square in the face
shot('b02', (st, s) => gym(st, s),
  (s, t, i, T) => { bob(s, t); const th = s.kids[0]; pose(th, t, [[0, 'ready'], [0.5, { shA: [-40, 150], elA: 30, spine: [-8, 0] }], [1.0, { shA: [95, 10], elA: 5, spine: [14, 0] }]], 0.2); th.act(t, 'angry');
    const hit = 2.9, from = [4.4, 1.6, 0.25], face0 = [LEO[0] + 0.28, 1.47, 0]; if (t < 1.0) held(s.ball, th); else if (t < hit) s.ball.position.set(...arc(from, face0, ease.linear(prog(t, 1.0, hit)), 0.15)); else s.ball.position.set(...arc(face0, [LEO[0] + 2.2, 0.11, 1.4], prog(t, hit, hit + 0.8), 0.8));
    pose(s.me, t, [[0, 'ready'], [hit, { ...POSE.ready, head: [0, 10], spine: [-10, 0] }], [hit + 0.25, 'ready']], 0.12); expr(s.me, t, [[0, 'neutral']]);
    cam(T, s, t, i, C([1.4, 1.5, 5.0], [1.2, 1.2, 0]), C([-0.2, 1.4, 3.6], [-1.2, 1.3, 0])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, [LEO[0] + 0.3, 1.47, 0]); impact(g, t, x, y, ppm * 0.6, 2.9); label(g, t, '50 KM/H', { at: 1.1, color: '#ffd23a' }); if (t > 1.0 && t < 2.9) { const [bx, by, bp] = scr(s, s.ball.position.toArray()); g.save(); g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = bp * 0.05; for (const d of [-1, 0, 1]) { g.beginPath(); g.moveTo(bx + bp * 0.15, by + d * bp * 0.06); g.lineTo(bx + bp * 0.7, by + d * bp * 0.06); g.stroke(); } g.restore(); } });

// b03 — not even a blink
shot('b03', (st, s) => gym(st, s),
  (s, t, i, T) => { pose(s.me, t, [[0, 'ready']]); s.me.setExpr('neutral'); s.ball.position.set(...arc([LEO[0] + 0.32, 1.45, 0], [LEO[0] + 1.4, 1.0, 0.9], prog(t, 0, 1.0), 0.3)); const f = face(s.me, 1.1, 0.3, 1.42); cam(T, s, t, i, f, push(f, 0.12)); },
  (g, t) => { label(g, t, 'BLINKS: 0', { at: 0.4 }); });

// b04 — smile, throw it back
shot('b04', (st, s) => gym(st, s),
  (s, t, i, T) => { const th = s.kids[0], hit = 1.5; pose(s.me, t, [[0, 'ready'], [0.4, { shA: [-40, 150], elA: 30, spine: [-8, 0] }], [0.9, { shA: [95, 10], elA: 5, spine: [14, 0] }], [1.6, 'cheer']], 0.2); expr(s.me, t, [[0, 'smile'], [1.5, 'happy']]);
    if (t < 0.9) held(s.ball, s.me); else s.ball.position.set(...arc([LEO[0] + 0.4, 1.6, 0.2], [4.6, 1.2, 0], prog(t, 0.9, hit), 0.2)); if (t > hit) s.ball.position.set(...arc([4.6, 1.2, 0], [6.5, 0.11, 1], prog(t, hit, hit + 0.7), 0.6));
    pose(th, t, [[0, 'ready'], [hit, 'fall']], 0.15); lie(th, ease.in(prog(t, hit, hit + 0.4)) * 0.95); th.act(t, t < hit ? 'determined' : 'shocked'); s.kids.slice(1).forEach((k, j) => { pose(k, t, [[0, 'ready'], [hit + 0.2, 'shocked']]); k.act(t + j, t < hit + 0.2 ? 'determined' : 'surprised'); });
    cam(T, s, t, i, C([-4.6, 1.9, 1.6], [3, 1.0, -0.2]), C([-4.2, 1.8, 1.3], [4, 1.0, -0.2])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, [4.6, 1.3, 0]); impact(g, t, x, y, ppm * 0.6, 1.5, '#ff8a3a'); });

// ---------- arm-wrestling ----------
function arm(st, s) { SETS.gym(st); st.add(box(0.9, 0.06, 0.6, '#c08a5a', 0, 0.75, 0, { outline: 0.008 })); st.add(box(0.12, 0.72, 0.12, '#5a5a68', 0, 0.36, 0)); for (const x of [-0.75, 0.75]) st.add(cyl(0.2, 0.2, 0.42, '#3a6ea5', x, 0.21, 0, { outline: 0.006 }));
  s.me = fig(st, ME, -0.75, 0, 0, 'sit'); s.opp = [0, 2, 4].map((k) => fig(st, KIDS[k], 0.75, 0, Math.PI, 'sit', 'determined')); s.jay = fig(st, JAY, -1.6, 1.6, -0.9); }
const WR = { ...POSE.sit, shA: [75, 2], elA: 95 }, WIN = { ...POSE.sit, shA: [75, -25], elA: 95, spine: [6, 8] }, LOSE = { ...POSE.sit, shA: [75, 40], elA: 80, spine: [-6, -10] };

// b05 — thirty wins in a row
shot('b05', (st, s) => arm(st, s),
  (s, t, i, T) => { const slot = Math.min(2, Math.floor(t / 1.0)), k = t - slot * 1.0; s.opp.forEach((o, j) => { o.visible = j === slot; pose(o, k, [[0, WR], [0.35, LOSE]], 0.12); o.act(k, k < 0.35 ? 'determined' : 'shocked'); });
    pose(s.me, k, [[0, WR], [0.35, WIN]], 0.12); expr(s.me, t, [[0, 'smile']]); s.jay.visible = false; cam(T, s, t, i, C([0.3, 1.5, 2.5], [0, 0.95, 0]), C([0.1, 1.3, 2.0], [0, 0.95, 0])); },
  (g, t, i) => { const u = U(), n = Math.min(30, Math.floor(1 + (t / i.dur) * 32)); text(g, `WINS: ${n}`, E.W - 320 * u, 130 * u, { size: 90 * u, font: FONTS.ui, weight: 900, color: '#ffd23a', stroke: 12 * u, strokeColor: 'rgba(0,0,0,.4)' }); label(g, t, 'IN A ROW', { at: 0.4 }); });

// b06 — how? the muscle fibres tear
card('b06', 'red', (g, t, i, u, cx, cy) => { title(g, t, 'HOW?', 150 * u, { size: 110, at: 0 }); muscle(g, t, cx, cy + 40 * u, 900 * u, 320 * u, ease.inOut(prog(t, 0.6, 2.0))); title(g, t, 'MUSCLES TEARING', cy + 330 * u, { size: 70, at: 0.9, color: '#ffb0a0' }); });

// b07 — the brain can't force you to quit
card('b07', 'dark', (g, t, i, u, cx, cy) => { brain(g, cx - 330 * u, cy, 170 * u, ease.out(prog(t, 0, 0.4)));
  const k = ease.outBack(prog(t, 0.4, 0.8)); if (k > 0) { g.save(); g.translate(cx + 300 * u, cy - 40 * u); g.scale(k, k); g.fillStyle = '#ffffff'; rr(g, -240 * u, -110 * u, 480 * u, 220 * u, 50 * u); g.fill(); g.beginPath(); g.moveTo(-200 * u, 60 * u); g.lineTo(-300 * u, 140 * u); g.lineTo(-150 * u, 90 * u); g.fill(); text(g, 'QUIT!', 0, 0, { size: 120 * u, font: FONTS.ui, weight: 900, color: '#e8302c' }); g.restore(); }
  cross(g, t, cx + 300 * u, cy - 40 * u, 150 * u, 1.3); title(g, t, 'NO STOP SIGNAL', cy + 330 * u, { size: 70, at: 1.5 }); });

// b08 — the arm bends backward, Leo still smiles
shot('b08', (st, s) => arm(st, s),
  (s, t, i, T) => { s.opp.forEach((o, j) => (o.visible = j === 0)); const o = s.opp[0], k = ease.inOut(prog(t, 0.5, 2.6));
    s.me.setPose({ ...POSE.sit, shA: [75, 2 + 40 * k], elA: 95 - 150 * k, spine: [-4 * k, -8 * k] }); expr(s.me, t, [[0, 'smile']]); pose(o, t, [[0, WR], [0.5, WIN]], 0.4); o.act(t, k > 0.4 ? 'scared' : 'determined'); s.jay.visible = false;
    cam(T, s, t, i, C([-0.2, 1.25, 1.3], [-0.3, 1.0, 0]), C([-0.3, 1.15, 1.0], [-0.35, 1.0, 0])); },
  (g, t) => { if (t > 1.4) vignette(g, '#c8102e', 0.3); label(g, t, 'BENDING BACKWARD', { at: 1.2, color: '#ff8a7a' }); });

// b09 — Jay: STOP! You're going to snap your elbow!
shot('b09', (st, s) => arm(st, s),
  (s, t, i, T) => { s.opp.forEach((o, j) => (o.visible = j === 0)); pose(s.jay, t, [[0, 'handsUp'], [0.6, 'point']]); expr(s.jay, t, [[0, 'shocked']]); s.me.setPose({ ...POSE.sit, shA: [75, 42], elA: -55 }); s.me.act(t, 'smile');
    const f = face(s.jay, 1.5, 0.2, 1.35); cam(T, s, t, i, f, push(f, 0.15)); },
  (g, t) => { shout(g, t, 'STOP!', { at: 0.02, y: E.H * 0.18 }); shout(g, t, 'YOU ARE GOING TO SNAP YOUR ELBOW!', { at: 0.6, y: E.H * 0.84, size: V(72, 60) }); });

// b10 — Jay hides his eyes
shot('b10', (st, s) => arm(st, s),
  (s, t, i, T) => { s.opp.forEach((o, j) => (o.visible = j === 0)); pose(s.jay, t, [[0, 'shocked'], [0.2, { shA: [70, 14], elA: 150, shB: [70, 14], elB: 150, spine: [10, 0], head: [0, -10] }]]); expr(s.jay, t, [[0, 'scared'], [0.3, 'sleepy']]);
    const f = face(s.jay, 1.3, -0.3, 1.4); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => label(g, t, "CAN'T WATCH", { at: 0.3 }));

// b11 — Leo: relax... I am fine!
shot('b11', (st, s) => arm(st, s),
  (s, t, i, T) => { s.opp.forEach((o, j) => (o.visible = j === 0)); s.jay.visible = false; pose(s.me, t, [[0, { ...POSE.sit, shA: [75, 42], elA: -55 }], [0.4, { ...POSE.sit, shA: [10, 150], elA: 40, shB: [75, 2], elB: 95 }]], 0.35); expr(s.me, t, [[0, 'smile'], [0.6, 'happy']]);
    const f = face(s.me, 1.25, 0.3, 1.15); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => shout(g, t, 'RELAX... I AM FINE!', { at: 0.3, y: E.H * 0.84, size: V(80, 70), shake: 0 }));

// ---------- zero fear ----------
card('c01', 'teal', (g, t, i, u, cx, cy) => { title(g, t, 'PLUS: ZERO FEAR', 150 * u, { size: 96, at: 0 });
  const box2 = (x, str, col, at) => { const k = ease.outBack(prog(t, at, at + 0.35)); if (k <= 0) return; g.save(); g.translate(x, cy + 30 * u); g.scale(k, k); g.fillStyle = col; rr(g, -200 * u, -90 * u, 400 * u, 180 * u, 40 * u); g.fill(); text(g, str, 0, 0, { size: 90 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); g.restore(); };
  box2(cx - 360 * u, 'PAIN', '#e8453c', 0.5); box2(cx + 360 * u, 'FEAR', '#8a5ad6', 1.2);
  const a = ease.out(prog(t, 0.9, 1.3)); g.save(); g.globalAlpha = a; g.strokeStyle = '#ffffff'; g.lineWidth = 14 * u; g.beginPath(); g.moveTo(cx - 130 * u, cy + 30 * u); g.lineTo(cx + 120 * u, cy + 30 * u); g.stroke(); g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(cx + 150 * u, cy + 30 * u); g.lineTo(cx + 100 * u, cy - 5 * u); g.lineTo(cx + 100 * u, cy + 65 * u); g.fill(); g.restore();
  cross(g, t, cx - 360 * u, cy + 30 * u, 150 * u, 2.6); cross(g, t, cx + 360 * u, cy + 30 * u, 150 * u, 3.0); });

shot('c02', (st, s) => { SETS.park(st); s.me = fig(st, ME, 0, 0.3, -0.5); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand'], [0.6, 'crossArms']]); expr(s.me, t, [[0, 'determined'], [1.0, 'smirk']]); const f = face(s.me, 1.2, 0.25); cam(T, s, t, i, f, push(f, 0.15)); },
  (g, t, i, s) => { FX.dust(g, t, { count: 30, color: '#ffe8a0', a: 0.5 }); shout(g, t, 'FEARLESS', { at: 1.1, y: E.H * 0.18, shake: 0 }); });

// c03 — off a three-metre wall without hesitating
shot('c03', (st, s) => { SETS.park(st); st.add(box(1.2, 3, 3.5, '#b8a890', -0.4, 1.5, 0.5, { outline: 0.014 })); st.add(box(1.3, 0.12, 3.6, '#8a7a68', -0.4, 3.02, 0.5)); s.me = fig(st, ME, -0.3, 0.5, 0); s.me.position.y = 3.05; },
  (s, t, i, T) => { const j0 = 0.6, j1 = 1.5, k = prog(t, j0, j1); s.me.position.x = lerp(-0.3, 1.4, ease.out(k)); s.me.position.y = t < j0 ? 3.05 : t < j1 ? 3.05 * (1 - k * k) + Math.sin(k * Math.PI) * 0.5 : 0;
    pose(s.me, t, [[0, 'stand'], [j0 - 0.2, 'crouch'], [j0, 'cheer'], [j1, 'crouch'], [j1 + 0.6, 'stand']], 0.18); expr(s.me, t, [[0, 'determined'], [j0, 'happy']]);
    cam(T, s, t, i, C([4.2, 2.0, 7.2], [0.4, 1.8, 0.5]), C([4.6, 1.5, 6.4], [0.6, 1.0, 0.5])); },
  (g, t, i, s) => { const [x, y0] = scr(s, [-1.15, 0, 2.4]), [, y1] = scr(s, [-1.15, 3, 2.4]); const a = ease.out(prog(t, 0.2, 0.5)); g.save(); g.globalAlpha = a; g.strokeStyle = '#ffd23a'; g.lineWidth = 5 * U(); g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke(); g.restore();
    label(g, t, '3 METERS', { at: 0.3, color: '#ffd23a' }); const [lx, ly, ppm] = scr(s, [1.4, 0, 0.5]); impact(g, t, lx, ly, ppm * 0.5, 1.5, '#ffffff'); });

// c04 — nettles like soft grass
shot('c04', (st, s) => { SETS.park(st); const r = (k) => (Math.sin(k * 12.9898) * 43758.5453) % 1; for (let k = 0; k < 140; k++) { const x = -0.5 + Math.abs(r(k)) * 5, z = -1.2 + Math.abs(r(k + 99)) * 2.4, h = 0.35 + Math.abs(r(k + 7)) * 0.4; const c = cyl(0.0, 0.05, h, k % 3 ? '#2f7a3a' : '#3a9a4a', x, h / 2, z); st.add(c); } s.me = fig(st, ME, -1.5, 0, 0); },
  (s, t, i, T) => { s.me.position.x = -1.5 + t * 1.25; s.me.setPose(walkP(t)); expr(s.me, t, [[0, 'happy']]); const x = s.me.position.x; cam(T, s, t, i, C([x + 1.5, 1.4, 3.6], [x, 0.8, 0]), C([x + 1.2, 1.3, 3.2], [x, 0.8, 0])); },
  (g, t) => { label(g, t, 'STINGING NETTLES', { at: 0.3, color: '#9ff28a' }); });
import { walkPose } from '../toon/toon.js';
const walkP = (t, sp = 0.9) => walkPose(t * 6.28 * sp);

// ---------- ghost pepper (kitchen island: Leo at x=2.3 facing +x, Jay across at x=4.1) ----------
function pep(st, s) { kitchen(st); s.me = fig(st, ME, 2.4, 0.6, 0); s.jay = fig(st, JAY, 4.15, 0.75, Math.PI); s.p = pepper(); st.add(s.p); }
const EAT = { shA: [40, 12], elA: 150, head: [0, 4] };
shot('c05', (st, s) => pep(st, s),
  (s, t, i, T) => { pose(s.me, t, [[0, { shA: [60, 10], elA: 60 }], [1.2, EAT], [1.8, { shA: [40, 10], elA: 90 }]], 0.3); expr(s.me, t, [[0, 'smile'], [1.3, 'talk'], [1.8, 'smile']]); if (t < 1.5) held(s.p, s.me); else s.p.visible = false;
    pose(s.jay, t, [[0, 'crossArms'], [1.4, 'shocked']]); expr(s.jay, t, [[0, 'worried'], [1.4, 'shocked']]); cam(T, s, t, i, C([3.3, 1.55, 3.4], [3.2, 1.15, 0.6]), C([3.1, 1.45, 2.8], [3.1, 1.2, 0.6])); },
  (g, t) => { label(g, t, 'GHOST PEPPER', { at: 0.2, color: '#ff7a4a' }); label(g, t, '1,000,000+ SHU', { at: 0.7, y: V(190, 230), size: V(44, 48), color: '#ffd23a' }); });

shot('c06', (st, s) => pep(st, s),
  (s, t, i, T) => { s.p.visible = false; pose(s.me, t, [[0, 'stand']]); expr(s.me, t, [[0, 'smile']]); s.jay.visible = false; const f = face(s.me, 1.0, 0.2); cam(T, s, t, i, f, push(f, 0.12)); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, headOf(s.me)); tears(g, t, x, y - ppm * 0.02, ppm * 0.3, 0.3); glow2(g, x, y + ppm * 0.15, ppm * 0.35, '#ff3a1a', 0.35 + 0.1 * Math.sin(t * 8)); label(g, t, 'EYES WATERING', { at: 0.4 }); });

shot('c07', (st, s) => pep(st, s),
  (s, t, i, T) => { s.p.visible = false; pose(s.me, t, [[0, 'stand'], [0.25, 'shrug']]); expr(s.me, t, [[0, 'confused']]); s.jay.setPose(POSE.shocked); s.jay.act(t, 'shocked'); const f = face(s.me, 1.3, -0.4, 1.4); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => shout(g, t, 'IS THIS SPICY?', { at: 0.25, y: E.H * 0.18, size: V(96, 84), shake: 0 }));

shot('c08', (st, s) => pep(st, s),
  (s, t, i, T) => { s.p.visible = false; pose(s.jay, t, [[0, 'shocked'], [2.9, 'point']]); expr(s.jay, t, [[0, 'scared'], [2.9, 'shocked']]); s.me.setPose(POSE.shrug); s.me.act(t, 'smile'); const f = face(s.jay, 1.2, 0.25, 1.45); cam(T, s, t, i, f, push(f, 0.25)); },
  (g, t) => { if (t > 2.9) vignette(g, '#3a0a10', 0.4); shout(g, t, 'YOU ARE A MONSTER!', { at: 3.0, y: E.H * 0.84, size: V(96, 84) }); });
