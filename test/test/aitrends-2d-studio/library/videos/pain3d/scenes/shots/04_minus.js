// shots/04_minus.js — 1:59–3:07: the silent nightmare (cheek, heel, appendix) and thermal destruction (campfire, water, ice).
import { ME, JAY, fig, shot, face, pose, expr, cam, push, C, lie, scr, headOf, handPos, kitchen, shout, impact, vignette, smoke, snow, held, drips, POSE, THREE, E, V, ease, prog, clamp, lerp, SETS, box, cyl } from './_lib.js';
import { flick } from '../toon/sets3d.js';
import { walkPose } from '../toon/toon.js';
import { label } from '../toon/fx.js';
import { glow as glow2 } from '/engine/core.js';
import { card, title, stamp, cross, check, person, shield, bone, bell, plug, thermo, flameIcon, snowflake, cup, ice, cells, U, text, FONTS, rr, circle, alpha } from './_info.js';

card('d01', 'red', (g, t, i, u, cx, cy) => { title(g, t, 'MINUS:', cy - 200 * u, { size: 110, at: 0 }); stamp(g, t, 'THE SILENT BIOLOGICAL NIGHTMARE', cx, cy + 60 * u, { at: 0.5, size: 64, color: '#ffffff', rot: -0.04 }); });

card('d02', 'teal', (g, t, i, u, cx, cy) => { title(g, t, 'PAIN IS NOT YOUR', cy - 260 * u, { size: 70, at: 0 }); title(g, t, 'ENEMY', cy - 140 * u, { size: 110, at: 0.4, color: '#ff8a7a' }); cross(g, t, cx, cy - 140 * u, 120 * u, 1.0);
  const k = ease.outBack(prog(t, 1.9, 2.3)); if (k > 0) shield(g, cx, cy + 130 * u, 130 * u * k); title(g, t, 'PAIN = PROTECTOR', cy + 350 * u, { size: 80, at: 2.1 }); });

// d03 — your own worst enemy
shot('d03', (st, s) => { SETS.bedroom(st, { night: true }); s.me = fig(st, ME, 0, 0.5, 0.4); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand']]); expr(s.me, t, [[0, 'smile']]); const f = face(s.me, 1.3, 0.1); cam(T, s, t, i, f, push(f, 0.25)); },
  (g, t) => { vignette(g, '#c8102e', 0.35 + 0.15 * Math.sin(t * 5)); label(g, t, 'YOUR OWN WORST ENEMY', { at: 1.1, color: '#ff8a7a' }); });

// ---------- pizza (kitchen island) ----------
function pizza() { const g = new THREE.Group(); const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(0.2, -0.06); sh.lineTo(0.2, 0.06); sh.closePath(); const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.015, bevelEnabled: false }), new THREE.MeshBasicMaterial({ color: '#f2c04a' })); m.rotation.x = -Math.PI / 2; g.add(m);
  for (const [x, z] of [[0.12, 0.02], [0.16, -0.03]]) { const p = cyl(0.015, 0.015, 0.02, '#c8302c', x, 0.012, z); g.add(p); } g.add(box(0.03, 0.03, 0.13, '#c08a3a', 0.2, 0.008, 0)); return g; }
function eat(st, s) { kitchen(st); s.me = fig(st, ME, 2.4, 0.6, 0); s.jay = fig(st, JAY, 4.15, 0.75, Math.PI); s.pz = pizza(); st.add(s.pz); }
const BITE = { shA: [45, 12], elA: 145 };
const chew = (s, t) => expr(s.me, t, [[0, (Math.floor(t * 5) % 2) ? 'talk' : 'neutral']]);

shot('d04', (st, s) => eat(st, s),
  (s, t, i, T) => { pose(s.me, t, [[0, BITE]]); chew(s, t); held(s.pz, s.me, 'A', 0.02); s.pz.rotation.y = Math.PI; pose(s.jay, t, [[0, 'relaxed']]); s.jay.act(t, 'smile'); const f = face(s.me, 1.05, 0.45, 1.4); cam(T, s, t, i, f, push(f, 0.12)); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, headOf(s.me)); if (t > 1.6) glow2(g, x + ppm * 0.1, y + ppm * 0.08, ppm * 0.14, '#ff1a2a', 0.8); impact(g, t, x + ppm * 0.1, y + ppm * 0.08, ppm * 0.18, 1.6, '#ff5a5a'); label(g, t, 'CHEWING PIZZA', { at: 0.2 }); label(g, t, 'BIT THROUGH CHEEK', { at: 1.7, y: V(190, 230), size: V(44, 48), color: '#ff8a7a' }); });

shot('d05', (st, s) => eat(st, s),
  (s, t, i, T) => { pose(s.me, t, [[0, BITE]]); chew(s, t); held(s.pz, s.me, 'A', 0.02); s.pz.rotation.y = Math.PI; pose(s.jay, t, [[0, 'relaxed'], [1.2, 'point']]); expr(s.jay, t, [[0, 'neutral'], [1.2, 'shocked']]);
    cam(T, s, t, i, C([3.3, 1.5, 3.2], [3.2, 1.15, 0.6]), C([3.1, 1.4, 2.6], [3.0, 1.1, 0.6])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, [2.55, 1.32, 0.62]); drips(g, t, x, y, ppm * 1.0, 1.3); label(g, t, 'BLOOD', { at: 1.6, color: '#ff6a6a' }); });

shot('d06', (st, s) => eat(st, s),
  (s, t, i, T) => { pose(s.jay, t, [[0, 'point'], [0.5, 'handsUp']]); expr(s.jay, t, [[0, 'shocked']]); s.pz.visible = false; s.me.setPose(BITE); const f = face(s.jay, 1.4, -0.3); cam(T, s, t, i, f, push(f, 0.15)); },
  (g, t) => { shout(g, t, 'MATE!', { at: 0.02, y: E.H * 0.18 }); shout(g, t, 'STOP CHEWING!', { at: 0.55, y: E.H * 0.84, size: V(96, 84) }); });

// d07 — four days on a fractured heel
shot('d07', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, -3, 0.6, 0); },
  (s, t, i, T) => { s.me.position.x = -3 + t * 0.9; const w = walkPose(t * 6.28 * 0.75); s.me.setPose({ ...w, spine: [8, 6 * Math.sin(t * 4.7)], head: [0, -4] }); expr(s.me, t, [[0, 'neutral']]); const x = s.me.position.x;
    cam(T, s, t, i, C([x + 0.5, 1.3, 4.6], [x, 0.8, 0.6]), C([x + 0.2, 1.2, 4.0], [x, 0.7, 0.6])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, [s.me.position.x - 0.02, 0.06, 0.52]); const u = U(), k = ease.outBack(prog(t, 0.5, 0.9)); if (k > 0) { const cx = E.W * 0.8, cy = E.H * 0.62, r = 170 * u * k; g.save(); g.strokeStyle = 'rgba(255,255,255,.6)'; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(x, y); g.lineTo(cx, cy); g.stroke();
      g.fillStyle = '#0e1a2e'; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill(); g.strokeStyle = '#6fe6ff'; g.lineWidth = 6 * u; g.stroke(); bone(g, cx, cy, r * 0.55, 1, '#cfe8ff'); text(g, 'X-RAY', cx, cy + r * 0.75, { size: 30 * u, font: FONTS.ui, weight: 900, color: '#6fe6ff' }); g.restore(); }
    label(g, t, `DAY ${Math.min(4, 1 + Math.floor(t / (i.dur / 4)))}`, { at: 0.1 }); label(g, t, 'FRACTURED HEEL', { at: 1.0, y: V(190, 230), size: V(44, 48), color: '#ff8a7a' }); });

// d08 — "my shoe is just tight"
shot('d08', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, 0, 0.6, 0.5); },
  (s, t, i, T) => { pose(s.me, t, [[0, { head: [0, -22], spine: [10, 0] }], [0.9, 'shrug']]); expr(s.me, t, [[0, 'confused'], [0.9, 'smile']]); cam(T, s, t, i, C([2.0, 1.0, 3.0], [0, 0.6, 0.6]), C([1.9, 1.3, 2.9], [0, 1.0, 0.6])); },
  (g, t) => { shout(g, t, 'WHY?', { at: 0.05, y: E.H * 0.18, shake: 0 }); label(g, t, 'JUST A TIGHT SHOE?', { at: 0.8, y: E.H - V(110, 160) }); });

card('d09', 'dark', (g, t, i, u, cx, cy) => { person(g, cx, cy + 380 * u, 760 * u, alpha('#ffffff', 0.85)); const k = 0.6 + 0.4 * prog(t, 0, 2.6), p = 1 + 0.12 * Math.sin(t * 9) * k;
  glow2(g, cx + 60 * u, cy + 90 * u, 140 * u * k * p, '#ff2a1a', 0.9); circle(g, cx + 60 * u, cy + 90 * u, 30 * u * k * p, '#ff3a2a'); title(g, t, 'APPENDIX', 140 * u, { size: 90, at: 0.1 }); stamp(g, t, 'ABOUT TO BURST', cx + 430 * u, cy + 90 * u, { at: 1.3, size: 60 }); });

// d10 — fainting on the kitchen floor
shot('d10', (st, s) => { kitchen(st); s.me = fig(st, ME, 0.6, -1.4, 0.4); },
  (s, t, i, T) => { const f0 = 1.0, k = ease.in(prog(t, f0, f0 + 0.45)); pose(s.me, t, [[0, { spine: [10, 0], shA: [40, 10], elA: 100 }], [f0, 'fall'], [f0 + 0.6, 'sleep']]); lie(s.me, k); expr(s.me, t, [[0, 'worried'], [f0, 'sleepy']]);
    cam(T, s, t, i, C([3.0, 1.9, 2.2], [0.3, 0.6, -1.4]), C([2.4, 1.3, 1.4], [0.1, 0.3, -1.4])); },
  (g, t) => { if (t > 1.3) vignette(g, '#000', 0.55 * prog(t, 1.3, 2.4)); label(g, t, 'INTERNAL SHOCK', { at: 1.4, color: '#ff8a7a' }); });

card('d11', 'red', (g, t, i, u, cx, cy) => { person(g, cx, cy + 300 * u, 560 * u, '#ffffff'); for (let k = 0; k < 4; k++) { const ph = (t * 0.8 + k / 4) % 1; g.save(); g.strokeStyle = alpha('#ffd84a', 1 - ph); g.lineWidth = 8 * u; g.beginPath(); g.arc(cx, cy, 200 * u + ph * 420 * u, 0, 7); g.stroke(); g.restore(); }
  for (const [x, y, at] of [[-420, -200, 0.4], [430, -120, 0.9], [-380, 220, 1.4]]) { const kk = ease.outBack(prog(t, at, at + 0.3)); if (kk > 0) { g.save(); g.translate(cx + x * u, cy + y * u); g.scale(kk, kk); g.fillStyle = '#ffffff'; rr(g, -140 * u, -60 * u, 280 * u, 120 * u, 30 * u); g.fill(); text(g, 'HELP!', 0, 0, { size: 70 * u, font: FONTS.ui, weight: 900, color: '#e8302c' }); g.restore(); } }
  title(g, t, 'YOUR BODY IS SCREAMING', E.H - 110 * u, { size: 64, at: 0.2 }); });

card('d12', 'dark', (g, t, i, u, cx, cy) => { const pull = ease.inOut(prog(t, 0.9, 1.5)); bell(g, t, cx - 120 * u, cy - 80 * u, 150 * u, 1 - pull); plug(g, cx + 260 * u, cy + 200 * u, 70 * u, 30 * u + pull * 220 * u); title(g, t, 'THE ALARM SYSTEM', 140 * u, { size: 80, at: 0 }); stamp(g, t, 'DISCONNECTED', cx, cy + 380 * u, { at: 1.4, size: 80 }); });

// ---------- thermal destruction ----------
card('e01', 'red', (g, t, i, u, cx, cy) => { flameIcon(g, t, cx - 420 * u, cy + 40 * u, 150 * u); snowflake(g, cx + 420 * u, cy + 20 * u, 150 * u * ease.out(prog(t, 0.3, 0.7))); title(g, t, 'EVEN WORSE:', cy - 260 * u, { size: 80, at: 0 }); stamp(g, t, 'THERMAL DESTRUCTION', cx, cy + 300 * u, { at: 0.6, size: 80, color: '#ffd84a' }); });

const LOGX = -1.3, SITX = -1.25;
function camp(st, s) { s.c = SETS.winterCamp(st); s.me = fig(st, ME, SITX, 0, 0, 'sit'); s.me.position.y = 0.06; }
const fire = (s, t) => flick(s.c.fire, t);
shot('e02', (st, s) => camp(st, s),
  (s, t, i, T) => { fire(s, t); pose(s.me, t, [[0, { ...POSE.sit, shA: [50, 20], elA: 30, shB: [50, 20], elB: 30 }]]); expr(s.me, t, [[0, 'smile']]); cam(T, s, t, i, C([2.4, 1.7, 4.0], [-0.6, 0.6, 0]), C([1.8, 1.4, 3.2], [-0.6, 0.6, 0])); },
  (g, t) => { snow(g, t, 140); label(g, t, 'WINTER CAMPFIRE', { at: 0.3 }); });

shot('e03', (st, s) => camp(st, s),
  (s, t, i, T) => { fire(s, t); pose(s.me, t, [[0, POSE.sit]]); expr(s.me, t, [[0, 'calm']]); const f = face(s.me, 1.1, 0.35, 1.15); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => { snow(g, t, 90, 0.6); glow2(g, E.W * 0.85, E.H * 0.85, E.H * 0.6, '#ff8a3a', 0.3); label(g, t, 'NICE AND WARM', { at: 0.4, color: '#ffd23a' }); });

shot('e04', (st, s) => camp(st, s),
  (s, t, i, T) => { fire(s, t); pose(s.me, t, [[0, POSE.sit]]); expr(s.me, t, [[0, 'calm']]); cam(T, s, t, i, C([-0.5, 0.55, 1.5], [-0.75, 0.35, 0]), C([-0.55, 0.5, 1.2], [-0.75, 0.32, 0])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, [-0.85, 0.35, 0]); const k = prog(t, 0.3, 3.5); glow2(g, x, y, ppm * 0.4, '#ff2a1a', 0.7 * k); thermo(g, E.W * 0.86, E.H * 0.8, E.H * 0.55, 0.2 + 0.8 * ease.inOut(k)); label(g, t, '3RD-DEGREE BURNS', { at: 1.2, color: '#ff8a7a' }); });

shot('e05', (st, s) => camp(st, s),
  (s, t, i, T) => { fire(s, t); const up = 2.9; pose(s.me, t, [[0, POSE.sit], [up, 'shocked']], 0.25); s.me.position.y = t < up ? 0.06 : 0; s.me.position.x = t < up ? SITX : SITX - 0.4 * ease.out(prog(t, up, up + 0.4)); expr(s.me, t, [[0, 'calm'], [2.2, 'confused'], [up, 'shocked']]);
    cam(T, s, t, i, C([1.4, 1.2, 2.6], [-0.9, 0.7, 0]), C([1.1, 1.3, 2.2], [-1.0, 0.8, 0])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, [-0.9, 0.42, 0]); smoke(g, t, x, y, ppm * 0.4, prog(t, 0.2, 1.5)); label(g, t, 'PANTS CHARRING', { at: 1.2, color: '#ff8a7a' }); if (t > 2.9) shout(g, t, '!!', { at: 2.9, y: E.H * 0.2 }); });

card('e06', 'blue', (g, t, i, u, cx, cy) => { cup(g, t, cx - 330 * u, cy + 60 * u, 150 * u, '#7fc8ff', 0.4); cup(g, t, cx + 330 * u, cy + 60 * u, 150 * u, '#5aa8ff', 1);
  title(g, t, 'WARM?', cy + 330 * u, { x: cx - 330 * u, size: 80, at: 0.3 }); title(g, t, 'BOILING?', cy + 330 * u, { x: cx + 330 * u, size: 80, at: 0.9, color: '#ff8a7a' }); title(g, t, '?', cy - 300 * u, { size: 160, at: 1.4 }); });

card('e07', 'blue', (g, t, i, u, cx, cy) => { ice(g, cx - 330 * u, cy, 130 * u); cells(g, t, cx + 330 * u, cy, 200 * u, prog(t, 1.2, 3.4)); title(g, t, 'COLD?', cy + 330 * u, { x: cx - 330 * u, size: 80, at: 0.2 }); title(g, t, 'OR FREEZING YOUR CELLS?', cy + 330 * u, { x: cx + 330 * u, size: 56, at: 1.2, color: '#bfe8ff' }); });

card('e08', 'red', (g, t, i, u, cx, cy) => { const w = 1200 * u; g.fillStyle = '#f2b8a0'; g.fillRect(cx - w / 2, cy - 40 * u, w, 120 * u); g.fillStyle = '#e88a8a'; g.fillRect(cx - w / 2, cy + 80 * u, w, 90 * u);
  for (let k = 0; k < 5; k++) { flameIcon(g, t + k, cx - 500 * u + k * 110 * u, cy - 100 * u, 50 * u); snowflake(g, cx + 80 * u + k * 110 * u, cy - 110 * u + Math.sin(t * 3 + k) * 10 * u, 40 * u); }
  title(g, t, 'YOUR SKIN FIGHTS A WAR', 150 * u, { size: 76, at: 0 }); stamp(g, t, 'WARNINGS: 0', cx, cy + 340 * u, { at: 1.8, size: 90 }); });
