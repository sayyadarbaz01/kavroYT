// shots/01_hook.js — 0:00-31.5 cold open: HOUR 24 watch, Powerball again, meteor miss, Route 33 green wave,
// Dev's car flips at night, title, the watch ticking backward ("who's been paying for it").
import { walkPose } from '../toon/toon.js';
import { vehicle } from '../toon/sets3d.js';
import { titleCard } from '/engine/ui2d.js';
import { registerShot, text, FONTS, alpha, rr, circle, rng } from '/engine/core.js';
import { ME, MOM, fig, shot, face, cam, C, push, pose, expr, held, bandFlash, vignette, shout, impact, smoke, scr, THREE, box, cyl, ball, E, V, ease, prog, clamp, lerp, SETS } from './_lib.js';
import { DEV } from '../toon/cast3d.js';

import { FACE_Z, U, basic, tag, watchFace, darkGold, secAngle, ticket, trafficLight, setLamp, meteor, crater, shake } from './_luck.js';

// ---------- shots ----------
// h01 — HOUR 24: macro of the brass watch, gold glow, the second hand ticks
registerShot('h01', { draw(g, t, info) { darkGold(g, t); watchFace(g, t, { sec: secAngle(t + 0.6, 12), glowK: 0.7 + 0.3 * Math.sin(t * 4) });
  shout(g, t, 'HOUR 24', { at: 0.15, y: E.H * 0.13, size: V(120, 110), color: '#ffd23a', shake: 0 }); } });

// h02 — Powerball, again: Kip holds the ticket up, Mom screams
shot('h02', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, 0, 0.1, FACE_Z + 0.15, 'holdFront', 'surprised'); s.mom = fig(st, MOM, 1.05, -0.25, FACE_Z - 0.35, 'stand', 'happy'); s.tk = ticket(); st.add(s.tk); },
  (s, t, i, T) => { pose(s.me, t, [[0, { shA: [70, 10], elA: 60, head: [0, -8] }], [0.85, 'cheer']]); expr(s.me, t, [[0, 'surprised'], [0.85, 'joy']]);
    pose(s.mom, t, [[0, 'stand'], [0.95, 'cheer'], [1.6, 'handsUp'], [2.2, 'cheer'], [2.8, 'handsUp']]); expr(s.mom, t, [[0, 'happy'], [0.95, 'joy']]);
    held(s.tk, s.me, 'A', 0.06); s.tk.rotation.set(0, FACE_Z + Math.PI / 2 + 0.15, 0);
    cam(T, s, t, i, C([1.2, 1.35, 4.4], [0.45, 1.25, 0]), C([1.0, 1.4, 3.6], [0.45, 1.3, 0])); },
  (g, t) => { shout(g, t, 'WINNER!', { at: 0.9, y: E.H * 0.17, size: V(130, 120), color: '#ffd23a' }); tag(g, t, '2ND TIME TODAY', 2.05); });

// h03 — the meteor: Kip walks toward camera, steps left to tie his shoe, it slams where he stood
const HIT = 1.68, MX = -3.2, MZ = -0.85, KZ = 0.75;
shot('h03', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, MX + 1.15, MZ, Math.PI); s.m = meteor(); st.add(s.m); s.cr = crater(MX, MZ); s.cr.visible = false; st.add(s.cr); },
  (s, t, i, T) => { const walkEnd = 1.05; if (t < walkEnd) { s.me.position.x = MX + 1.15 - t * 1.1; s.me.setPose(walkPose(t * 5.4)); }
    else { s.me.position.x = MX + 1.15 - walkEnd * 1.1; const k = ease.inOut(prog(t, walkEnd, walkEnd + 0.3)); s.me.position.z = lerp(MZ, KZ, k); s.me.rotation.y = lerp(Math.PI, Math.PI / 2 + 0.25, k); pose(s.me, t, [[walkEnd, 'stand'], [walkEnd + 0.3, 'kneel']], 0.25); }
    expr(s.me, t, [[0, 'neutral'], [HIT + 0.05, 'shocked']]);
    const a = prog(t, HIT - 0.7, HIT), p0 = [MX + 13, 6.5, MZ + 5], p1 = [MX, 0.3, MZ]; s.m.visible = t < HIT && t > HIT - 0.7;
    const P = (k) => p0.map((v, j) => lerp(v, p1[j], k)); s.m.position.set(...P(a)); s.m.userData.trail.forEach((m, j) => { const q = P(Math.max(0, a - (j + 1) * 0.035)); m.position.set(q[0] - s.m.position.x, q[1] - s.m.position.y, q[2] - s.m.position.z); });
    s.cr.visible = t >= HIT;
    cam(T, s, t, i, C([MX - 6.2, 1.2, 0.0], [MX + 0.4, 0.9, 0.0]), C([MX - 5.6, 1.15, 0.0], [MX + 0.4, 0.85, 0.0])); shake(s.stage.camera, t, HIT, 0.09, 0.8); },
  (g, t, i, s) => { bandFlash(g, t, HIT, '#fff2c8', 0.3); const p = scr(s, [MX, 0.3, MZ]); impact(g, t, p[0], p[1], E.H * 0.22, HIT, '#ffb040');
    if (t > HIT) smoke(g, t - HIT, p[0], p[1], E.H * 0.16, clamp(1.2 - (t - HIT) * 0.2)); });

// h04 — one second ago: Kip still kneeling, tying his shoe, the smoking crater right behind him
shot('h04', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, MX, KZ, Math.PI - 0.35, 'kneel', 'shocked'); s.cr = crater(MX, MZ); st.add(s.cr); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'kneel']]);
    expr(s.me, t, [[0, 'shocked'], [1.3, 'confused'], [2.4, 'smirk']]);
    cam(T, s, t, i, C([MX - 3.6, 1.0, 1.9], [MX, 0.6, -0.05]), C([MX - 3.2, 0.98, 1.75], [MX, 0.6, -0.05])); },
  (g, t, i, s) => { const p = scr(s, [MX, 0.25, MZ]); smoke(g, t + 3, p[0], p[1], E.H * 0.14, 0.7); shout(g, t, '1 SECOND AGO', { at: 0.1, y: E.H * 0.87, size: V(96, 90), shake: 0 }); });

// h05 — Route 33 from above: every traffic light flips to green in a wave, just for you
const LX = [-24, -16, -8, 0, 8, 16, 24];
shot('h05', (st, s) => { SETS.suburb(st, { cars: true }); s.L = LX.map((x) => { const l = trafficLight(x, 1.25); st.add(l); return l; }); s.me = fig(st, ME, 0.6, 0.2, FACE_Z); },
  (s, t, i, T) => { s.L.forEach((l, j) => setLamp(l, t < 0.9 + j * 0.22 ? 0 : 2)); pose(s.me, t, [[0, 'stand'], [1.6, 'cheer']]); expr(s.me, t, [[0, 'neutral'], [1.6, 'joy']]);
    T.drone(s.stage.camera, t, { target: [0, 1, 3], dur: i.dur, from: { h: 26, r: 30, a: -0.55 }, to: { h: 12, r: 17, a: -0.25 } }); },
  (g, t) => { tag(g, t, 'ROUTE 33', 0.2, '#5fff7a'); shout(g, t, 'ALL GREEN', { at: 2.3, y: E.H * 0.86, size: V(100, 92), color: '#5fff7a', shake: 0 }); });

// h06 — across town, at night: Dev's orange car flips over on an empty road. Then quiet.
const FLIP = 3.5;
shot('h06', (st, s) => { SETS.suburbNight(st); s.stage.time = 'night';
    s.piv = new THREE.Group(); s.car = vehicle(0, 0, 0, { body: DEV.color, cab: '#c8641a' }); s.car.position.y = -0.85; s.piv.add(s.car); st.add(s.piv);
    s.hl = new THREE.SpotLight('#fff2c8', 30, 30, 0.45, 0.6); s.hl.position.set(2.3, 0.7, 0); s.hl.target.position.set(12, 0, 0); s.car.add(s.hl, s.hl.target); },
  (s, t, i, T) => { const v = 9; let x, y = 0.85, rx = 0;
    if (t < FLIP) x = -30 + v * t; else { const k = prog(t, FLIP, FLIP + 1.25), e = ease.out(k); x = -30 + v * FLIP + 5 * e; y = 0.85 + Math.sin(k * Math.PI) * 1.3; rx = e * Math.PI * 3; }
    s.piv.position.set(x, y, 4.2); s.piv.rotation.x = rx;
    cam(T, s, t, i, C([-8, 2.2, 11.2], [-4, 0.9, 4]), C([0.5, 1.9, 11.4], [4.0, 0.8, 4])); shake(s.stage.camera, t, FLIP + 0.25, 0.05, 0.5); shake(s.stage.camera, t, FLIP + 1.15, 0.07, 0.6); },
  (g, t, i, s) => { tag(g, t, 'ACROSS TOWN', 0.2, '#9fc4ff'); const p = scr(s, [s.piv.position.x, 0.2, 4.2]); impact(g, t, p[0], p[1], E.H * 0.12, FLIP + 0.25, '#ffd84a'); impact(g, t, p[0], p[1], E.H * 0.16, FLIP + 1.15, '#ffd84a');
    if (t > FLIP + 1.2) smoke(g, t - FLIP, p[0], p[1] - E.H * 0.04, E.H * 0.1, 0.8); const d = ease.inOut(prog(t, FLIP + 1.4, i.dur)); if (d > 0) vignette(g, '#03040a', 0.7 * d); });

// h07 — title: low angle on Kip, the watch glowing gold on his wrist
shot('h07', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, 0, 0.1, FACE_Z + 0.25, 'stand', 'smirk'); },
  (s, t, i, T) => { pose(s.me, t, [[0, { shA: [55, 25], elA: 95, head: [0, -4] }]]); expr(s.me, t, [[0, 'smirk']]);
    cam(T, s, t, i, C([0.8, 0.5, 3.3], [0, 1.15, 0]), C([0.7, 0.55, 2.95], [0, 1.2, 0])); },
  (g, t, i) => { const gr = g.createRadialGradient(E.W / 2, E.H * 0.55, 0, E.W / 2, E.H / 2, E.W * 0.6); gr.addColorStop(0, 'rgba(255,190,70,0.10)'); gr.addColorStop(1, 'rgba(40,20,0,0.55)'); g.fillStyle = gr; g.fillRect(0, 0, E.W, E.H); const bd = g.createLinearGradient(0, E.H * 0.6, 0, E.H); bd.addColorStop(0, 'rgba(10,6,2,0)'); bd.addColorStop(0.45, 'rgba(10,6,2,0.72)'); bd.addColorStop(1, 'rgba(10,6,2,0.85)'); g.fillStyle = bd; g.fillRect(0, E.H * 0.6, E.W, E.H * 0.4);
    titleCard(g, t, { lines: ['WHAT IF', 'YOUR LUCK DOUBLED EVERY HOUR?'], dur: i.dur + 0.3, y: E.H * 0.8 }); });

// h08 — here's how it started: the second hand ticks... then jumps BACKWARD. A tiny "30" glints. Who's been paying?
registerShot('h08', { draw(g, t, info) { const red = clamp((t - 4.5) / 1.5); darkGold(g, t, red > 0.4 ? 1 : 0);
  const R = E.H * (0.33 + 0.05 * ease.inOut(prog(t, 0, info.dur)));
  watchFace(g, t, { R, sec: secAngle(t, 40, [1.0, 2.6, 4.2, 5.5]), glowK: 0.45 + 0.2 * Math.sin(t * 3), engrave: ease.out(prog(t, 1.5, 2.1)), red });
  shout(g, t, 'HOUR 30', { at: 1.55, y: E.H * 0.12, size: V(96, 90), color: '#ffd23a', dur: 4.3, shake: 0 });
  if (red > 0) vignette(g, '#3a0604', 0.75 * red); } });
