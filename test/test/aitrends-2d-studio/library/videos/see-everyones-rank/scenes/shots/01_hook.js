// shots/01_hook.js — 0:00-0:33 cold open: #412 in the lecture hall, a rank over every head, Kip's own #6,914,377,020,
// #412 asleep, the three promises (what it measures, who is #3, billions in five seconds), title.
import { titleCard } from '/engine/ui2d.js';
import { walkPose } from '../toon/toon.js';
import { ME, fig, shot, face, cam, C, push, pose, expr, vignette, shout, E, V, ease, prog, clamp, lerp, SETS, scr } from './_lib.js';
import { card, person } from './_info.js';
import { lectureHall, rankTag, roll, caption, fmt, ASLEEP, U, text, FONTS, alpha, rr, glow } from './_rank.js';

const sitAll = (s, t) => { (s.studs || []).forEach((k, j) => { pose(k, t + j * 0.7, [[0, 'sitDesk']]); expr(k, t + j, [[0, 'neutral']]); }); };
// numbers over the other students in the wide shot (millions and billions; nobody near the top)
const OTHERS = [5104882310, 788201334, 3302117456, 1457003219, 7210554812, 2650981007, 4419002651, 912334870];

// r01 — lecture hall two-shot: the guy next to Kip gets a green #412
shot('r01', (st, s) => { lectureHall(st, s, ME); [0, 1, 2, 3, 4].forEach((j) => (s.studs[j].visible = false)); },
  (s, t, i, T) => { sitAll(s, t); pose(s.me, t, [[0, 'sitDesk'], [1.7, { ...{ hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [55, 10], shB: [55, 10], elA: 75, elB: 75 }, head: [-28, 2] }]]);
    expr(s.me, t, [[0, 'neutral'], [1.9, 'surprised']]); pose(s.r412, t, [[0, 'sitDesk']]); expr(s.r412, t, [[0, 'sleepy']]);
    cam(T, s, t, i, C([0.75, 1.42, -1.75], [0.62, 1.22, 1.02]), C([0.72, 1.38, -1.35], [0.64, 1.22, 1.02])); },
  (g, t, i, s) => { rankTag(g, t, s, s.r412, 412, { at: 1.95, col: 'good', up: 0.32, k: 0.1, max: 90, pulse: 1 }); }, { mood: 'indoor' });

// r02 — wide from the front of the hall: a number over every head. ON EARTH. Out of 8 billion.
shot('r02', (st, s) => { lectureHall(st, s, ME); [0, 1, 2, 6].forEach((j) => (s.studs[j].visible = false)); },
  (s, t, i, T) => { sitAll(s, t); pose(s.me, t, [[0, 'sitDesk']]); expr(s.me, t, [[0, 'surprised']]); pose(s.r412, t, [[0, 'sitDesk']]); expr(s.r412, t, [[0, 'sleepy']]);
    cam(T, s, t, i, C([0.4, 2.75, -2.3], [0.3, 0.75, 1.7]), C([0.3, 3.1, -3.4], [0.2, 0.75, 1.7])); },
  (g, t, i, s) => { s.studs.forEach((f, j) => f.visible && rankTag(g, t, s, f, OTHERS[j], { at: 0.25 + j * 0.12, col: 'mid', k: 0.12, min: 18, max: 44 }));
    rankTag(g, t, s, s.r412, 412, { at: 0.1, col: 'good', k: 0.15, min: 26, max: 60, pulse: 1 });
    caption(g, t, 'ON EARTH', { at: 2.9, y: E.H * 0.16, size: V(104, 96), color: '#5fe08a' });
    caption(g, t, 'OUT OF 8,000,000,000', { at: 4.4, y: E.H * 0.88, size: V(76, 72) }); }, { mood: 'indoor' });

// r03 — close-up: Kip's own number rolls up in red to #6,914,377,020
shot('r03', (st, s) => { lectureHall(st, s, ME); },
  (s, t, i, T) => { sitAll(s, t); pose(s.me, t, [[0, 'sitDesk'], [2.9, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [55, 10], shB: [55, 10], elA: 75, elB: 75, spine: [-8, 0], head: [0, 10] }]]);
    expr(s.me, t, [[0, 'neutral'], [1.0, 'surprised'], [3.0, 'shocked']]); pose(s.r412, t, [[0, 'sitDesk']]);
    const a = C([0.22, 1.24, -0.55], [0, 1.3, 1.02]), b = C([0.18, 1.24, -0.25], [0, 1.31, 1.02]); cam(T, s, t, i, a, b); },
  (g, t, i, s) => { const n = roll(t, 0, 6914377020, 1.2, 3.0); if (t > 1.15) rankTag(g, t, s, s.me, n, { at: 1.15, col: 'bad', up: 0.3, k: 0.11, max: 96, pulse: t > 3 ? 1 : 0 });
    caption(g, t, 'AND YOU?', { at: 0.15, dur: 1.1, y: E.H * 0.86 }); }, { mood: 'indoor' });

// r04 — #412 asleep on his desk, drooling on his notes
shot('r04', (st, s) => { lectureHall(st, s, ME); },
  (s, t, i, T) => { sitAll(s, t); s.r412.setPose(ASLEEP); expr(s.r412, t, [[0, 'sleepy']]); pose(s.me, t, [[0, 'sitDesk']]);
    cam(T, s, t, i, C([2.35, 1.3, -0.85], [0.95, 0.92, 1.0]), C([2.2, 1.26, -0.6], [1.0, 0.9, 1.0])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, [s.r412.position.x - 0.05, 0.86, s.r412.position.z - 0.32]);
    const k = (t * 0.55) % 1, len = ppm * 0.05 * (0.3 + k); g.save(); g.fillStyle = 'rgba(190,230,255,.85)'; g.beginPath(); g.ellipse(x, y + len, ppm * 0.008, len, 0, 0, 7); g.fill(); g.restore();
    for (let z = 0; z < 3; z++) { const ph = (t * 0.6 + z / 3) % 1; text(g, 'z', x + ppm * (0.1 + ph * 0.25), y - ppm * (0.25 + ph * 0.35), { size: ppm * (0.05 + ph * 0.05), font: FONTS.ui, weight: 900, color: '#ffffff', alpha: Math.sin(ph * Math.PI), stroke: 5, strokeColor: '#141218' }); }
    rankTag(g, t, s, s.r412, 412, { at: 0.3, col: 'good', hy: 0.88, up: 0.3, k: 0.09, max: 80 }); }, { mood: 'indoor' });

// r05 — Kip and his stack of books vs #412 asleep beside him: something is seriously wrong here
shot('r05', (st, s) => { lectureHall(st, s, ME); },
  (s, t, i, T) => { sitAll(s, t); s.r412.setPose(ASLEEP); expr(s.r412, t, [[0, 'sleepy']]);
    pose(s.me, t, [[0, 'sitDesk'], [0.4, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [60, 12], elA: 70, shB: [40, 10], elB: 90, head: [0, 4] }], [2.4, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [40, 40], shB: [40, 40], elA: 100, elB: 100, head: [-18, 0] }]]);
    expr(s.me, t, [[0, 'smirk'], [2.3, 'confused'], [3.4, 'angry']]);
    cam(T, s, t, i, C([0.15, 1.3, -0.95], [0.4, 1.05, 1.0]), C([0.6, 1.36, -1.45], [0.62, 1.0, 1.0])); },
  (g, t, i, s) => { rankTag(g, t, s, s.me, 6914377020, { at: 0.05, col: 'bad', up: 0.32, k: 0.07, max: 60 }); rankTag(g, t, s, s.r412, 412, { at: 0.05, col: 'good', hy: 0.88, up: 0.3, k: 0.07, max: 60 });
    caption(g, t, 'EVERY READING', { at: 0.15, dur: 2.1, y: E.H * 0.86 }); caption(g, t, 'SOMETHING IS WRONG', { at: 2.35, y: E.H * 0.86, color: '#ff5a4a' }); }, { mood: 'indoor' });

// ---------- the three promises (2D cards) ----------
const pill = (g, str, x, y, size, col, a = 1, sc = 1) => { g.save(); g.translate(x, y); g.scale(sc, sc); g.globalAlpha = a; g.font = `900 ${size}px "${FONTS.ui}"`;
  const w = g.measureText(str).width + size * 0.8, h = size * 1.35; glow(g, 0, 0, w * 0.7, col, 0.3); g.fillStyle = 'rgba(14,14,22,.85)'; rr(g, -w / 2, -h / 2, w, h, h * 0.3); g.fill();
  g.strokeStyle = col; g.lineWidth = size * 0.07; rr(g, -w / 2, -h / 2, w, h, h * 0.3); g.stroke(); text(g, str, 0, 0, { size, font: FONTS.ui, weight: 900, color: col, align: 'center', glow: size * 0.4, glowColor: alpha(col, 0.7) }); g.restore(); };
const pop = (t, at) => ease.outBack(prog(t, at, at + 0.35));

// r06 — what does the number really measure?
card('r06', 'dark', (g, t, info, u, cx, cy) => {
  const flick = Math.floor(t * 14); const q = '#' + [7, 1, 9, 3].map((d, j) => (flick + j * 3) % 10).join('') + ',???,???,???';
  pill(g, q, cx, cy - 40 * u, 110 * u, '#e8eef6', ease.out(prog(t, 0.1, 0.4)), 0.8 + 0.2 * pop(t, 0.1));
  for (let k = 0; k < 3; k++) { const a = pop(t, 2.55 + k * 0.12); if (a > 0) text(g, '?', cx + (k - 1) * 380 * u, cy - 260 * u + (k % 2) * 60 * u, { size: 150 * u * a, font: FONTS.ui, weight: 900, color: '#ffd23f', align: 'center', stroke: 14 * u, strokeColor: '#141218' }); }
  caption(g, t, 'WHAT DOES IT MEASURE?', { at: 1.6, y: cy + 190 * u, size: 86 * u });
});
// r07 — who is ranked #3 on the entire planet?
card('r07', 'gold', (g, t, info, u, cx, cy) => {
  const a = ease.out(prog(t, 0.0, 0.5)); glow(g, cx, cy + 40 * u, 420 * u, '#ffd23f', 0.35 * a);
  person(g, cx, cy + 260 * u, 420 * u, '#141218', a);
  if (t > 0.9) pill(g, '#3', cx, cy - 250 * u, 150 * u, '#ffd23f', 1, 0.7 + 0.3 * pop(t, 0.92));
  caption(g, t, 'ON THE ENTIRE PLANET', { at: 1.5, y: E.H * 0.88, size: 80 * u });
});
// r08 — one sentence moves you billions of places in five seconds
card('r08', 'red', (g, t, info, u, cx, cy) => {
  caption(g, t, 'ONE SENTENCE', { at: 0.2, y: cy - 250 * u, size: 92 * u });
  const n = roll(t, 6914377020, 1218004515, 1.7, 3.6); const fl = (j) => (t < 3.6 ? String((Math.floor(t * 30) * 7 + j * 3) % 10) : '?'), grp = (j) => fl(j) + fl(j + 1) + fl(j + 2);
  const shown = t < 1.7 ? fmt(n) : '#' + Math.floor(n / 1e9) + ',' + grp(0) + ',' + grp(3) + ',' + grp(6);
  const col = t < 1.7 ? '#ff4a4a' : t < 3.6 ? '#ffb03a' : '#5fe08a'; pill(g, shown, cx, cy, 120 * u, col, ease.out(prog(t, 0.05, 0.3)), 1 + 0.03 * Math.sin(t * 20) * (t > 1.7 && t < 3.6));
  if (t > 1.7) { const k = clamp((t - 1.7) / 0.3); g.save(); g.globalAlpha = k; g.fillStyle = col; const ax = cx + 640 * u, ay = cy - 60 * u + ((t * 3) % 1) * 40 * u; g.beginPath(); g.moveTo(ax - 50 * u, ay); g.lineTo(ax + 50 * u, ay); g.lineTo(ax, ay + 90 * u); g.closePath(); g.fill(); g.restore(); }
  caption(g, t, '5 SECONDS', { at: 2.9, y: cy + 230 * u, size: 110 * u, color: '#ffd23f' });
});

// r09 — title: drone over the campus park in the morning
shot('r09', (st, s) => { SETS.park(st); s.me = fig(st, ME, 0, 0.3, -Math.PI / 2); s.others = [[-6, 1.2, 0.3], [5, 0.6, Math.PI]].map(([x, z, r]) => fig(st, { top: 'hoodie', color: '#c8506a', hair: 'pony' }, x, z, r)); },
  (s, t, i, T) => { s.me.position.x = -2 + t * 1.1; s.me.rotation.y = 0; s.me.setPose(walkPose(t * 5.2)); expr(s.me, t, [[0, 'neutral']]);
    s.others.forEach((f, j) => { f.position.x += (j ? -1 : 1) * 0.0; f.setPose(walkPose(t * 5 + j)); });
    T.drone(s.stage.camera, t, { target: [0, 1, 0.4], dur: i.dur, from: { h: 18, r: 22, a: -0.3 }, to: { h: 9, r: 13, a: 0.05 } }); },
  (g, t, i) => { vignette(g, '#0a0610', 0.5); g.save(); g.globalAlpha = 0.28; g.fillStyle = '#0a0610'; g.fillRect(0, 0, E.W, E.H); g.restore();
    titleCard(g, t, { lines: ['WHAT IF YOU COULD', "SEE EVERYONE'S RANK?"], dur: i.dur }); });
