// shots/02_science.js — 0:33–1:05: the red palm, how pain works, the brutal rule, collapse, title, "invincible".
import { ME, JAY, fig, shot, face, pose, expr, cam, push, C, lie, scr, headOf, handPos, kitchen, shout, meter, vignette, POSE, E, V, ease, prog, clamp, lerp, SETS } from './_lib.js';
import { label, flash } from '../toon/fx.js';
import { walkPose } from '../toon/toon.js';
import * as FX from '/engine/fx2d.js';
import { text, FONTS, glow as glow2 } from '/engine/core.js';
import { card, title, stamp, cross, brain, signal, siren, person, bar, U } from './_info.js';

const HK = [0.05, -2.62];
const kit = (st, s, rot = Math.PI / 2 + 0.9) => { kitchen(st); s.me = fig(st, ME, HK[0], HK[1], rot); };

// a01 — close-up: the palm glows angry red, Leo still smiling
shot('a01', (st, s) => kit(st, s),
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand'], [0.3, { shA: [70, 14], elA: 95, head: [0, -10] }]]); expr(s.me, t, [[0, 'smile'], [1.2, 'surprised']]);
    const f = face(s.me, 1.05, 0.2, 1.38); cam(T, s, t, i, f, push(f, 0.12)); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, handPos(s.me)); const k = ease.out(prog(t, 0.6, 2.0)); glow2(g, x, y, ppm * 0.22, '#ff2a1a', 0.85 * k); label(g, t, 'TURNING RED', { at: 1.2, color: '#ff8a7a' }); });

// a02 — the pain signal: fingertip to brain in 10 ms
card('a02', 'blue', (g, t, i, u, cx, cy) => {
  const hx = cx - 560 * u, hy = cy + 300 * u, bx = cx + 480 * u, by = cy - 180 * u;
  person(g, hx + 40 * u, hy + 120 * u, 300 * u, '#ffffff', 0.9); g.save(); g.fillStyle = '#ffd84a'; g.beginPath(); g.arc(hx + 140 * u, hy - 60 * u, 22 * u, 0, 7); g.fill(); g.restore();
  brain(g, bx, by, 140 * u, ease.out(prog(t, 0.1, 0.5)));
  signal(g, t, [[hx + 140 * u, hy - 60 * u], [cx - 200 * u, cy + 120 * u], [cx + 120 * u, cy - 40 * u], [bx - 120 * u, by + 40 * u]], 0.6, 1.6);
  if (t > 2.2) glow2(g, bx, by, 260 * u, '#ffe85a', 0.6 * (1 - prog(t, 2.2, 3.4)));
  const ms = Math.min(10, Math.max(0, (t - 0.6) / 1.6 * 10)); text(g, `${ms.toFixed(1)} ms`, cx - 60 * u, cy + 330 * u, { size: 110 * u, font: FONTS.ui, weight: 900, color: '#ffe85a', alpha: ease.out(prog(t, 0.5, 0.8)) });
  title(g, t, 'PAIN SIGNAL', 140 * u, { at: 0.1 }); });

// a03 — pain is the body's emergency siren
card('a03', 'red', (g, t, i, u, cx, cy) => { const k = ease.outBack(prog(t, 0, 0.5)); siren(g, t, cx, cy + 80 * u, 170 * u * k, 1); title(g, t, "YOUR BODY'S", cy - 330 * u, { size: 60, at: 0.2 }); title(g, t, 'EMERGENCY SIREN', cy + 330 * u, { size: 100, at: 0.6 }); });

// a04 — "You? Zero sirens." Leo grins, a dead siren crossed out beside him
shot('a04', (st, s) => kit(st, s, Math.PI / 2 + 1.2),
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand'], [0.6, 'shrug']]); expr(s.me, t, [[0, 'neutral'], [0.5, 'smirk']]); const f = face(s.me, 1.1, -0.35); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t, i, s) => { const u = U(), x = E.W * 0.78, y = E.H * 0.42; siren(g, t, x, y, 110 * u * ease.outBack(prog(t, 0.1, 0.4)), 0); cross(g, t, x, y - 20 * u, 150 * u, 0.85); shout(g, t, 'ZERO SIRENS', { at: 0.85, y: E.H * 0.84, size: V(96, 84), shake: 0 }); });

// a05 — the pain receptors in the skin go dark
card('a05', 'dark', (g, t, i, u, cx, cy) => {
  const w = 1300 * u, x0 = cx - w / 2, y0 = cy - 120 * u, dead = ease.inOut(prog(t, 0.7, 1.7));
  for (const [c, h, y] of [['#f2b8a0', 70, 0], ['#e88a8a', 170, 70], ['#f2d88a', 140, 240]]) { g.fillStyle = c; g.fillRect(x0, y0 + y * u, w, h * u); }
  for (let k = 0; k < 9; k++) { const x = x0 + (k + 0.5) * w / 9, y = y0 + 110 * u; g.strokeStyle = dead > 0.5 ? '#7a7a88' : '#ffe85a'; g.lineWidth = 7 * u; g.beginPath(); g.moveTo(x, y0 + 380 * u); g.quadraticCurveTo(x + 30 * u, y + 120 * u, x, y); g.stroke();
    const col = dead > (k / 9) ? '#7a7a88' : '#ffe85a'; g.save(); g.fillStyle = col; g.beginPath(); g.arc(x, y, 22 * u, 0, 7); g.fill(); g.restore(); if (dead <= k / 9) glow2(g, x, y, 60 * u, '#ffe85a', 0.5); else cross(g, t, x, y, 20 * u, 0.7 + k * 0.1); }
  title(g, t, 'PAIN RECEPTORS', cy - 330 * u, { at: 0.1 }); stamp(g, t, 'OFFLINE', cx, cy + 370 * u, { at: 1.9, size: 90 }); });

// a06 — one brutal rule
card('a06', 'red', (g, t, i, u, cx, cy) => { title(g, t, 'YOUR BODY FOLLOWS', cy - 200 * u, { size: 64, at: 0.1 }); stamp(g, t, 'ONE BRUTAL RULE', cx, cy + 40 * u, { at: 0.6, size: 120, color: '#ffffff', rot: -0.06 }); });

// a07 — pain 0 %, damage 100 %
card('a07', 'dark', (g, t, i, u, cx, cy) => { const w = 1000 * u, x = cx - w / 2 - 80 * u;
  bar(g, t, x, cy - 120 * u, w, 70 * u, 0, '#6fe6ff', 'PAIN', 0.1); bar(g, t, x, cy + 160 * u, w, 70 * u, 1, '#ff3a3a', 'PHYSICAL DAMAGE', 1.0);
  title(g, t, 'THE RULE', 150 * u, { size: 70, at: 0 }); stamp(g, t, '100% REAL', cx + 420 * u, cy + 380 * u, { at: 3.3, size: 80 }); });

// a08 — strolling happily... until the body collapses
shot('a08', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, -3, 0.6, 0); },
  (s, t, i, T) => { const fall = 1.9, k = ease.in(prog(t, fall, fall + 0.45)); s.me.position.x = -3 + Math.min(t, fall) * 1.1;
    if (t < fall) s.me.setPose(walkPose(t * 6.28 * 0.95)); else pose(s.me, t, [[0, 'fall'], [fall + 0.5, 'sleep']]);
    lie(s.me, k); expr(s.me, t, [[0, 'happy'], [fall - 0.2, 'surprised'], [fall + 0.5, 'sleepy']]);
    cam(T, s, t, i, C([1.5, 1.5, 5.6], [-1, 0.8, 0.6]), C([0.6, 1.1, 4.2], [-0.6, 0.5, 0.6])); },
  (g, t) => { if (t > 2.3) vignette(g, '#c8102e', 0.35 * prog(t, 2.3, 3.2)); label(g, t, 'COLLAPSE', { at: 2.4, color: '#ff8a7a' }); });

// a09 — title card
shot('a09', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, 0, 0.8, -0.5); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'cheer']]); expr(s.me, t, [[0, 'happy']]); cam(T, s, t, i, C([3.4, 1.4, 4.6], [0, 1.4, 0.6]), C([4.0, 1.6, 5.4], [0, 1.5, 0.6])); },
  (g, t, i) => { g.save(); g.globalAlpha = 0.35 * ease.out(prog(t, 0, 0.6)); g.fillStyle = '#0a1020'; g.fillRect(0, 0, E.W, E.H); g.restore();
    const a = ease.out(prog(t, 0.3, 0.9)) * clamp((i.dur - t) / 0.4); g.save(); g.translate(E.W / 2, E.H * 0.46); const sc = 1 + 0.02 * t; g.scale(sc, sc);
    text(g, 'WHAT IF YOU FELT', 0, -V(70, 70), { size: V(60, 60), font: FONTS.serif, weight: 900, color: '#ffffff', alpha: a, spacing: 4, glow: 18, glowColor: 'rgba(255,120,80,.6)' });
    text(g, 'ZERO PAIN?', 0, V(45, 45), { size: V(160, 140), font: FONTS.serif, weight: 900, color: '#ffffff', alpha: ease.out(prog(t, 0.7, 1.3)) * clamp((i.dur - t) / 0.4), spacing: 6, glow: 30, glowColor: 'rgba(255,90,60,.85)' });
    g.restore(); FX.dust(g, t, { count: 40, color: '#ffb07a', a: 0.5 * a }); flash(g, t, 0.7, 0.3, '#fff0e0'); });

// a10 — invincible?
shot('a10', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, 0, 0.8, -0.6); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand'], [0.9, { shA: [10, 160], elA: 10, shB: [20, 40], elB: 120, spine: [-4, 0] }]], 0.4); expr(s.me, t, [[0, 'neutral'], [0.9, 'determined']]);
    cam(T, s, t, i, C([2.4, 0.35, 2.9], [0, 1.3, 0.8]), C([1.9, 0.3, 2.3], [0, 1.4, 0.8])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, headOf(s.me)); glow2(g, x, y + ppm * 0.4, ppm * 1.6, '#ffd84a', 0.45 * ease.out(prog(t, 0.9, 1.6))); FX.dust(g, t, { count: 30, color: '#ffe8a0', a: 0.6 }); shout(g, t, 'INVINCIBLE?', { at: 1.4, y: E.H * 0.18, size: V(110, 96), shake: 0 }); });
