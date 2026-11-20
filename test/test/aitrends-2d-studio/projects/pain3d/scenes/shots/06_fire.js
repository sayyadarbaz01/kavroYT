// shots/06_fire.js — 3:49–4:56: Thursday night, the burning building, the rescue inside.
import { ME, JAY, fig, shot, face, pose, expr, cam, push, C, lie, scr, headOf, handPos, shout, impact, vignette, smoke, snow, embers, heat, held, bandFlash, POSE, THREE, E, V, ease, prog, clamp, lerp, SETS, box, cyl } from './_lib.js';
import { flame, flick } from '../toon/sets3d.js';
import { walkPose } from '../toon/toon.js';
import { MOM, GIRL } from '../toon/cast3d.js';
import { label } from '../toon/fx.js';
import { glow as glow2 } from '/engine/core.js';
import { card, title, stamp, siren, lungs, heart, ecg, person, thermo, U, text, FONTS, rr, circle, alpha } from './_info.js';

// ---------- outside: building door at x=0,z=-2; lawn; sidewalk z≈2.6 ----------
function street(st, s, o = {}) { s.c = SETS.fireStreet(st); s.me = fig(st, ME, o.me?.[0] ?? -0.6, o.me?.[1] ?? 2.6, o.me?.[2] ?? 0); s.jay = fig(st, JAY, o.jay?.[0] ?? 0.2, o.jay?.[1] ?? 2.75, o.jay?.[2] ?? 0); if (o.calm) s.c.flames.forEach((f) => (f.visible = false)); }
const fl = (s, t) => flick(s.c.flames, t);
const winSmoke = (g, t, s, amt = 1) => { for (const x of [-4.4, -2.2, 2.2, 4.4]) { const [px, py, ppm] = scr(s, [x, 5.6, -1.9]); smoke(g, t + x, px, py, ppm * 0.9, amt, 5 + Math.round(x)); } };
const walkBoth = (s, t, x0, sp = 1.0) => { s.me.position.x = x0 + t * sp; s.jay.position.x = x0 + 0.8 + t * sp; s.me.setPose(walkPose(t * 6.28 * 0.9)); s.jay.setPose(walkPose(t * 6.28 * 0.9 + 1.4)); };

shot('g01', (st, s) => street(st, s, { calm: true }),
  (s, t, i, T) => { walkBoth(s, t, -7); expr(s.me, t, [[0, 'neutral']]); expr(s.jay, t, [[0, 'smile']]); cam(T, s, t, i, C([-9, 2.4, 10], [-5, 2.0, 1]), C([-7.5, 2.2, 9], [-4, 1.8, 1])); },
  (g, t) => { snow(g, t, 160, 0.85); label(g, t, 'THURSDAY EVENING', { at: 0.3 }); label(g, t, '-8 °C', { at: 0.9, y: V(190, 230), size: V(48, 52), color: '#bfe8ff' }); });

shot('g02', (st, s) => street(st, s, { calm: true }),
  (s, t, i, T) => { walkBoth(s, t, -3.4); expr(s.me, t, [[0, 'neutral']]); expr(s.jay, t, [[0, 'neutral']]); const x = s.me.position.x; cam(T, s, t, i, C([x + 3.2, 1.3, 6.6], [x - 0.5, 2.6, 0]), C([x + 2.6, 1.2, 6.0], [x - 0.5, 2.8, 0])); },
  (g, t) => { snow(g, t, 120, 0.7); label(g, t, 'ABANDONED BUILDING', { at: 0.4 }); });

shot('g03', (st, s) => street(st, s, { me: [0.6, 2.6, Math.PI / 2], jay: [1.4, 2.7, Math.PI / 2] }),
  (s, t, i, T) => { fl(s, t); for (const f of [s.me, s.jay]) { pose(f, t, [[0, { head: [0, 14] }], [1.2, { ...POSE.shocked, head: [0, 14] }]]); expr(f, t, [[0, 'surprised'], [1.2, 'shocked']]); } cam(T, s, t, i, C([1.0, 0.4, 5.6], [0, 4.5, -2]), C([0.9, 0.5, 4.9], [0, 5.0, -2])); },
  (g, t, i, s) => { winSmoke(g, t, s, 1); snow(g, t, 80, 0.5); label(g, t, 'SECOND FLOOR', { at: 0.6, color: '#ffb25a' }); });

shot('g04', (st, s) => { street(st, s, { me: [-1.2, 2.6, Math.PI / 2], jay: [-0.4, 2.7, Math.PI / 2] }); s.mom = fig(st, MOM, 1.6, 2.4, Math.PI / 2 + 0.5); },
  (s, t, i, T) => { fl(s, t); pose(s.mom, t, [[0, 'handsUp'], [2.3, { shA: [80, 60], elA: 20, shB: [80, 60], elB: 20, spine: [-6, 0] }]]); expr(s.mom, t, [[0, 'scared'], [2.3, 'shocked']]); const f = face(s.mom, 1.3, 0.3, 1.45); cam(T, s, t, i, f, push(f, 0.15)); },
  (g, t) => { glow2(g, E.W * 0.1, E.H * 0.1, E.H * 0.8, '#ff6a1a', 0.35); snow(g, t, 60, 0.5); shout(g, t, 'MY BABY IS INSIDE!', { at: 2.36, y: E.H * 0.84, size: V(96, 84) }); });

card('g05', 'red', (g, t, i, u, cx, cy) => { siren(g, t, cx - 360 * u, cy + 40 * u, 130 * u, 1); const left = Math.max(0, 300 - t * 0.9), m = Math.floor(left / 60), sec = Math.floor(left % 60);
  text(g, `${m}:${String(sec).padStart(2, '0')}`, cx + 260 * u, cy + 20 * u, { size: 220 * u, font: FONTS.ui, weight: 900, color: '#ffffff', stroke: 16 * u, strokeColor: 'rgba(0,0,0,.4)' }); title(g, t, 'FIREFIGHTERS', 150 * u, { size: 90, at: 0 }); title(g, t, 'MINUTES AWAY', cy + 330 * u, { size: 70, at: 0.4, color: '#ffb0a0' }); });

// ---------- inside: fireRoom (door in the left wall at z=1.5, bed back-right) ----------
function inside(st, s, o = {}) { s.c = SETS.fireRoom(st); s.me = fig(st, ME, o.me?.[0] ?? -2, o.me?.[1] ?? 0.4, o.me?.[2] ?? 0); }
const fr = (s, t) => flick(s.c.flames, t);
shot('g06', (st, s) => { inside(st, s); s.me.visible = false; s.steps = []; for (let k = 0; k < 7; k++) { const b = box(1.3, 0.16, 0.5, '#8a5a34', -1.2, 0.3 + k * 0.38, -1.0 - k * 0.38, { outline: 0.008 }); st.add(b); s.steps.push(b); const f = flame(-1.2 + (k % 2 ? 0.3 : -0.3), 0.38 + k * 0.38, -1.0 - k * 0.38, 0.6); st.add(f); s.c.flames.push(f); b.userData.f = f; } },
  (s, t, i, T) => { fr(s, t); s.steps.forEach((b, k) => { const d = Math.max(0, t - 1.0 - (6 - k) * 0.12); const y0 = 0.3 + k * 0.38; b.position.y = Math.max(0.08, y0 - 4.9 * d * d); b.rotation.z = Math.min(0.9, d * 2.5) * (k % 2 ? 1 : -1); b.userData.f.position.y = b.position.y + 0.08; });
    cam(T, s, t, i, C([2.2, 1.4, 2.6], [-1.2, 1.4, -2.2]), C([1.8, 1.2, 2.1], [-1.2, 1.0, -2.2])); },
  (g, t) => { embers(g, t, 70); heat(g, t, 0.3); label(g, t, 'STAIRCASE COLLAPSING', { at: 1.2, color: '#ffb25a' }); bandFlash(g, t, 1.2, '#ffb070', 0.25); });

shot('g07', (st, s) => street(st, s, { me: [0.6, 2.6, Math.PI / 2], jay: [1.4, 2.7, Math.PI / 2] }),
  (s, t, i, T) => { fl(s, t); pose(s.me, t, [[0, 'stand']]); expr(s.me, t, [[0, 'determined']]); const a = s.me.rotation.y; const f = { pos: [s.me.position.x + 0.3, 1.47, s.me.position.z - 1.1], look: [s.me.position.x, 1.45, s.me.position.z] }; cam(T, s, t, i, f, push(f, 0.15)); },
  (g, t) => { glow2(g, E.W / 2, 0, E.H, '#ff6a1a', 0.35); snow(g, t, 50, 0.5); label(g, t, 'NO HESITATION', { at: 0.3 }); });

shot('g08', (st, s) => street(st, s, { me: [1.5, 2.6, 1.91], jay: [2.4, 2.8, Math.PI / 2] }),
  (s, t, i, T) => { fl(s, t); const k = prog(t, 0.2, 2.2); s.me.position.set(lerp(1.5, 0, k), 0, lerp(2.6, -1.4, k)); s.me.setPose(walkPose(t * 6.28 * 1.6, true)); expr(s.me, t, [[0, 'determined']]); s.me.visible = k < 0.98; pose(s.jay, t, [[0, 'shocked'], [0.8, 'point']]); expr(s.jay, t, [[0, 'shocked']]);
    cam(T, s, t, i, C([3.6, 1.6, 5.6], [0.6, 1.3, 0]), C([3.2, 1.6, 5.0], [0.2, 1.6, -1.5])); },
  (g, t, i, s) => { winSmoke(g, t, s, 0.8); snow(g, t, 60, 0.5); });

shot('g09', (st, s) => street(st, s, { me: [0, -1.6, 1.91], jay: [1.6, 2.6, 1.9] }),
  (s, t, i, T) => { fl(s, t); s.me.visible = false; pose(s.jay, t, [[0, { shA: [80, 10], elA: 10, shB: [-10, 10], spine: [10, 0] }], [1.3, 'handsUp']]); expr(s.jay, t, [[0, 'shocked']]); const f = face(s.jay, 1.4, 0.25, 1.45); cam(T, s, t, i, f, push(f, 0.15)); },
  (g, t) => { glow2(g, E.W * 0.3, E.H * 0.2, E.H * 0.7, '#ff6a1a', 0.3); shout(g, t, 'LEO! STOP!', { at: 0.02, y: E.H * 0.17 }); shout(g, t, 'YOU DO NOT HAVE SUPER HEALING!', { at: 1.3, y: E.H * 0.85, size: V(76, 64) }); });

shot('g10', (st, s) => street(st, s, { me: [0, -1.6, 0], jay: [1.6, 2.9, 1.9] }),
  (s, t, i, T) => { fl(s, t); s.me.visible = false; pose(s.jay, t, [[0, 'handsUp']]); expr(s.jay, t, [[0, 'scared']]); cam(T, s, t, i, C([3.4, 1.9, 7.5], [0, 3.5, -2]), C([3.0, 1.7, 6.6], [0, 3.8, -2])); },
  (g, t, i, s) => { winSmoke(g, t, s, 1); snow(g, t, 80, 0.6); });

shot('g11', (st, s) => inside(st, s, { me: [-3.4, 1.5, 0] }),
  (s, t, i, T) => { fr(s, t); pose(s.me, t, [[0, 'stand']]); expr(s.me, t, [[0, 'calm'], [0.8, 'determined']]); const f = face(s.me, 1.2, 0.3); cam(T, s, t, i, f, push(f, 0.12)); },
  (g, t) => { embers(g, t, 50); shout(g, t, 'NO FEAR', { at: 0.3, x: E.W * 0.75, y: E.H * 0.3, size: V(90, 80), shake: 0 }); shout(g, t, 'NO PAIN', { at: 1.9, x: E.W * 0.75, y: E.H * 0.45, size: V(90, 80), shake: 0 }); });

shot('g12', (st, s) => { inside(st, s, { me: [-5.4, 1.5, 0] }); s.door = box(0.08, 2.2, 1.2, '#6a3a24', -4.9, 1.1, 1.5, { outline: 0.01 }); st.add(s.door); s.df = flame(-4.8, 0.2, 1.5, 1.2); st.add(s.df); },
  (s, t, i, T) => { fr(s, t); flick([s.df], t); const hit = 0.4, k = prog(t, hit, hit + 0.6); s.door.position.set(-4.9 + k * 2.4, 1.1 - k * k * 1.0, 1.5 + k * 0.3); s.door.rotation.z = -k * 1.4; s.me.position.x = -5.4 + Math.max(0, t - 0.2) * 1.6; s.me.setPose(walkPose(t * 6.28 * 1.4, true)); expr(s.me, t, [[0, 'determined']]);
    cam(T, s, t, i, C([-1.2, 1.4, 3.6], [-4.5, 1.1, 1.4]), C([-1.0, 1.3, 3.3], [-3.6, 1.1, 1.4])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, [-4.8, 1.2, 1.5]); impact(g, t, x, y, ppm * 0.9, 0.4, '#ffb070'); embers(g, t, 60); bandFlash(g, t, 0.4, '#ffd0a0', 0.2); });

shot('g13', (st, s) => inside(st, s, { me: [-3.2, 0.6, 0] }),
  (s, t, i, T) => { fr(s, t); s.me.position.x = -3.2 + t * 0.5; s.me.setPose(walkPose(t * 6.28 * 0.7)); expr(s.me, t, [[0, 'determined']]); const x = s.me.position.x; cam(T, s, t, i, C([x + 2.2, 1.3, 3.0], [x, 1.0, 0.6]), C([x + 1.8, 1.25, 2.6], [x, 1.0, 0.6])); },
  (g, t) => { heat(g, t, 0.45); embers(g, t, 90); label(g, t, 'INTENSE HEAT', { at: 0.3, color: '#ffb25a' }); });

card('g14', 'dark', (g, t, i, u, cx, cy) => { lungs(g, cx, cy + 40 * u, 230 * u, ease.inOut(prog(t, 0.3, 2.2))); title(g, t, 'TOXIC SMOKE', 140 * u, { size: 90, at: 0 }); for (let k = 0; k < 18; k++) { const ph = (t * 0.4 + k / 18) % 1; circle(g, cx + Math.sin(k * 3.1) * 120 * u, cy - 320 * u + ph * 260 * u, (20 + ph * 30) * u, alpha('#2a2830', 0.5 * (1 - ph))); } });

shot('g15', (st, s) => { inside(st, s, { me: [-6, 0, 0] }); s.me.visible = false; s.nh = fig(st, { top: 'tee', color: '#a0a8b8' }, -0.5, 0.6, 0.4); },
  (s, t, i, T) => { fr(s, t); pose(s.nh, t, [[0, { spine: [14, 0], shA: [40, 10], elA: 90 }], [1.6, 'kneel']], 0.35); expr(s.nh, t, [[0, 'scared'], [1.6, 'sad']]); cam(T, s, t, i, C([1.6, 1.5, 3.0], [-0.5, 0.8, 0.6]), C([1.3, 1.2, 2.5], [-0.5, 0.6, 0.6])); },
  (g, t) => { heat(g, t, 0.35); label(g, t, 'NORMAL HUMAN', { at: 0.2 }); label(g, t, 'SEARING PAIN', { at: 1.7, y: V(190, 230), size: V(48, 52), color: '#ff8a7a' }); });

shot('g16', (st, s) => inside(st, s, { me: [-3.6, -0.6, 0] }),
  (s, t, i, T) => { fr(s, t); s.me.position.x = -3.6 + Math.max(0, t - 0.5) * 1.2; s.me.setPose(t < 0.5 ? POSE.stand : walkPose(t * 6.28 * 0.85)); expr(s.me, t, [[0, 'calm'], [0.6, 'determined']]); const x = s.me.position.x;
    cam(T, s, t, i, C([x + 3.2, 1.0, 2.6], [x, 1.1, -0.6]), C([x + 2.6, 1.0, 2.2], [x + 0.5, 1.1, -0.6])); },
  (g, t) => { embers(g, t, 80); heat(g, t, 0.3); shout(g, t, 'YOU?', { at: 0.05, y: E.H * 0.18, shake: 0, dur: 1.2 }); label(g, t, 'THROUGH THE INFERNO', { at: 1.0, color: '#ffb25a' }); });

function rescue(st, s) { inside(st, s, { me: [1.6, -1.3, 0] }); s.girl = fig(st, GIRL, 2.9, -1.35, Math.PI, 'crouch', 'scared'); s.bl = cyl(0.3, 0.36, 0.75, '#3a7ad8', 0, 0, 0, { outline: 0.008 }); st.add(s.bl); s.bl.visible = false; }
shot('g17', (st, s) => rescue(st, s),
  (s, t, i, T) => { fr(s, t); pose(s.me, t, [[0, 'stand'], [0.6, 'kneel']], 0.4); expr(s.me, t, [[0, 'determined'], [0.9, 'smile']]); pose(s.girl, t, [[0, 'crouch']]); expr(s.girl, t, [[0, 'scared'], [1.6, 'surprised']]);
    cam(T, s, t, i, C([2.6, 0.9, 1.0], [2.6, 0.5, -1.8]), C([2.4, 0.8, 0.6], [2.6, 0.5, -1.8])); },
  (g, t) => { embers(g, t, 40); label(g, t, 'UNDER THE BED', { at: 0.5 }); });

shot('g18', (st, s) => rescue(st, s),
  (s, t, i, T) => { fr(s, t); const k = prog(t, 0.4, 1.0); if (t < 0.9) pose(s.me, t, [[0, 'kneel']]); else pose(s.me, t, [[0.9, 'kneel'], [1.0, { ...POSE.carry, shB: [30, 4], elB: 80 }]], 0.3); s.bl.visible = t > 0.3;
    if (t > 1.0) { const h = handPos(s.me); s.girl.position.set(h[0] + 0.05, h[1] - 0.55, h[2] - 0.15); s.girl.setPose(POSE.sit); } s.bl.position.set(s.girl.position.x, s.girl.position.y + 0.38, s.girl.position.z); s.bl.scale.setScalar(ease.out(k) * 0.9 + 0.1);
    expr(s.me, t, [[0, 'determined']]); expr(s.girl, t, [[0, 'scared']]); cam(T, s, t, i, C([2.4, 1.3, 1.8], [2.2, 0.8, -1.3]), C([2.2, 1.3, 1.5], [2.1, 1.0, -1.3])); },
  (g, t) => { embers(g, t, 40); label(g, t, 'WET BLANKET', { at: 0.5, color: '#9fd0ff' }); });

function carryRoom(st, s) { inside(st, s, { me: [0.4, 0.4, Math.PI] }); s.girl = fig(st, GIRL, 0, 0, 0, 'sit', 'scared'); s.bl = cyl(0.3, 0.36, 0.75, '#3a7ad8', 0, 0, 0, { outline: 0.008 }); st.add(s.bl); }
const carryGirl = (s) => { s.me.setPose({ ...POSE.carry, shB: [30, 4], elB: 80 }); const h = handPos(s.me); s.girl.position.set(h[0], h[1] - 0.55, h[2]); s.girl.rotation.y = s.me.rotation.y; s.bl.position.set(h[0], h[1] - 0.17, h[2]); s.bl.scale.setScalar(0.95); };
shot('g19', (st, s) => { carryRoom(st, s); s.beam = box(2.0, 0.22, 0.22, '#5a3a24', 0, 0, 0, { outline: 0.01 }); st.add(s.beam); s.bf = [flame(0, 0, 0, 0.6), flame(0, 0, 0, 0.5)]; s.bf.forEach((f) => st.add(f)); },
  (s, t, i, T) => { fr(s, t); flick(s.bf, t); s.me.position.x = 0.4 - t * 0.35; carryGirl(s); const hit = 2.3, d = Math.max(0, t - 1.6); const by = Math.max(1.55, 3.3 - 4.9 * d * d * 2);
    s.beam.position.set(s.me.position.x + 0.15, t < hit ? by : 1.4 - Math.min(1.25, (t - hit) * 3), s.me.position.z); s.beam.rotation.set(0.3, 0.6, t < hit ? 0.2 : 0.9); s.bf.forEach((f, k) => f.position.set(s.beam.position.x - 0.4 + k * 0.8, s.beam.position.y + 0.08, s.beam.position.z));
    if (t > hit) s.me.setPose({ ...POSE.carry, spine: [28, 0], knA: 30, knB: 30, drop: 0.08 }); expr(s.me, t, [[0, 'determined'], [hit, 'neutral']]); expr(s.girl, t, [[0, 'scared']]);
    cam(T, s, t, i, C([2.2, 1.6, 3.2], [0, 1.4, 0.4]), C([1.9, 1.5, 2.8], [-0.2, 1.2, 0.4])); },
  (g, t, i, s) => { embers(g, t, 50); const [x, y, ppm] = scr(s, [s.me.position.x, 1.45, 0.4]); impact(g, t, x, y, ppm * 0.9, 2.35, '#ffb070'); shout(g, t, 'CRACK!', { at: 2.42, y: E.H * 0.2, size: V(140, 120) }); });

shot('g20', (st, s) => { carryRoom(st, s); s.back = [flame(0, 0, 0, 0.45), flame(0, 0, 0, 0.38), flame(0, 0, 0, 0.3)]; s.back.forEach((f) => st.add(f)); },
  (s, t, i, T) => { fr(s, t); flick(s.back, t); s.me.position.x = 0.0 - t * 0.35; carryGirl(s); s.me.setPose({ ...POSE.carry, spine: [10, 0], shB: [30, 4], elB: 80 }); const x = s.me.position.x;
    s.back.forEach((f, k) => { f.position.set(x + 0.18, 0.95 + k * 0.18, 0.4 + (k - 1) * 0.12); f.visible = t > 0.1 + k * 0.2; }); expr(s.me, t, [[0, 'neutral']]); expr(s.girl, t, [[0, 'scared']]);
    cam(T, s, t, i, C([x + 1.8, 1.5, 2.0], [x, 1.1, 0.4]), C([x + 1.5, 1.4, 1.7], [x, 1.1, 0.4])); },
  (g, t, i, s) => { embers(g, t, 40); const [x, y, ppm] = scr(s, [s.me.position.x + 0.15, 1.1, 0.4]); if (t > 1.8) for (let k = 0; k < 8; k++) circle(g, x + Math.sin(k * 2.3) * ppm * 0.15, y + Math.cos(k * 1.7) * ppm * 0.2, ppm * 0.02 * ease.outBack(prog(t, 1.8 + k * 0.08, 2.1 + k * 0.08)), '#ffd0c0');
    label(g, t, 'JACKET ON FIRE', { at: 0.1, color: '#ffb25a' }); label(g, t, 'SKIN BLISTERS', { at: 1.8, y: V(190, 230), size: V(48, 52), color: '#ff8a7a' }); });

shot('g21', (st, s) => carryRoom(st, s),
  (s, t, i, T) => { fr(s, t); carryGirl(s); expr(s.me, t, [[0, 'calm'], [1.0, 'neutral']]); s.girl.visible = s.bl.visible = false; const f = face(s.me, 1.0, 0.25); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => { embers(g, t, 40); label(g, t, 'YOU FEEL NOTHING', { at: 0.2 }); shout(g, t, 'ZERO PAIN', { at: 1.35, y: E.H * 0.84, shake: 0 }); });

card('g22', 'red', (g, t, i, u, cx, cy) => { const p = 1 + 0.1 * Math.max(0, Math.sin(t * 20)); heart(g, cx - 450 * u, cy, 110 * u * p); ecg(g, t, cx - 250 * u, cy + 20 * u, 800 * u, 120 * u, 1 + 4 * prog(t, 0, 2.5));
  const bpm = Math.round(lerp(70, 190, ease.out(prog(t, 0.2, 2.6)))); text(g, `${bpm} BPM`, cx + 150 * u, cy + 260 * u, { size: 130 * u, font: FONTS.ui, weight: 900, color: '#ffffff', stroke: 12 * u, strokeColor: 'rgba(0,0,0,.4)' }); title(g, t, 'YOUR HEART', 150 * u, { size: 80, at: 0 }); });

card('g23', 'red', (g, t, i, u, cx, cy) => { person(g, cx - 200 * u, cy + 330 * u, 640 * u, '#ffffff', 0.9); glow2(g, cx - 200 * u, cy, 300 * u, '#ff3a1a', 0.5 + 0.2 * Math.sin(t * 6)); thermo(g, cx + 280 * u, cy + 280 * u, 560 * u, 0.3 + 0.7 * ease.inOut(prog(t, 0.2, 2.4)));
  title(g, t, 'SILENT', 150 * u, { size: 90, at: 0 }); stamp(g, t, 'THERMAL SHOCK', cx, cy + 420 * u, { at: 1.4, size: 76 }); });
