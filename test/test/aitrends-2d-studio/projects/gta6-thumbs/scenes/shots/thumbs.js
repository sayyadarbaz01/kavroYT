// shots/thumbs.js — text-free thumbnail art for "What If GTA 6 Was Real Life?" (3 concepts). Text is added later with compose.py.
// Every concept keeps Kip's face on the RIGHT third (text goes on the left, bottom-right stays clear for the duration badge).
import { copCar, flashLights } from '../toon/sets3d.js';
import { ME, MOM, fig, shot, cam, pose, expr, held, vignette, E, SETS } from './_lib.js';
import { FACE_Z, FACE_X, bill, stars, placeStars, hud } from './00_kit.js';

// red/blue police light wash from both sides
const police = (g) => { for (const [x, c] of [[0, 'rgba(255,40,40,.42)'], [E.W, 'rgba(40,90,255,.42)']]) { const gr = g.createRadialGradient(x, E.H * 0.35, 0, x, E.H * 0.35, E.W * 0.55); gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = gr; g.fillRect(0, 0, E.W, E.H); g.restore(); } };
// T1 — shocked close-up in the road, five glowing wanted stars, cop cars racing up the street behind (night)
shot('t1', (st, s) => { SETS.miamiNight(st); s.me = fig(st, ME, 0, 3.4, FACE_X - 0.55, 'shocked', 'shocked'); s.st = stars(st, 5, 0.15);
    s.cops = [[-7, 3.0], [-12, 5.2], [-18, 3.2]].map(([x, z]) => { const c = copCar(x, z, 0); st.add(c); return c; }); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'shocked']]); expr(s.me, t, [[0, 'shocked']]); s.cops.forEach((c, k) => flashLights(c, k * 0.21));
    cam(T, s, t, i, { pos: [2.05, 1.74, 3.82], look: [-0.6, 1.7, 3.82] }); placeStars(s.st, s.me, s.stage.camera, 9, 0, 0, { y: 2.08 }); s.st.list.forEach((m) => m.material.color.set('#ffd23a')); },
  (g) => { police(g); vignette(g, '#05060c', 0.3); });
// T2 — the respawn bill: a giant hospital bill unrolling to the ground outside Miami General, health bar at half
shot('t2', (st, s) => { SETS.miami(st, { hospital: true }); s.me = fig(st, ME, 0.9, 0.55, FACE_Z - 0.25, 'stand', 'shocked'); s.b = bill(1.9); s.b.scale.set(1.6, 1, 1); st.add(s.b); },
  (s, t, i, T) => { pose(s.me, t, [[0, { shA: [70, 10], elA: 50, shB: [55, 10], elB: 60, head: [0, -8] }]]); expr(s.me, t, [[0, 'shocked']]); held(s.b, s.me, 'A', 0.25); s.b.rotation.set(0.12, 0, 0);
    cam(T, s, t, i, { pos: [0.55, 1.45, 2.85], look: [0.2, 1.2, 0.5] }); },
  (g) => hud(g, 9, { at: 0, hp: 0.5 }));
// T3 — the twist: Mom at the door smiles at a stranger. You.
shot('t3', (st, s) => { SETS.suburb(st); s.mom = fig(st, MOM, -1.15, -1.75, FACE_Z + 0.4, 'stand', 'smile'); s.me = fig(st, ME, 1.45, 0.25, FACE_Z + 0.55, 'stand', 'sad'); },
  (s, t, i, T) => { pose(s.mom, t, [[0, { shA: [25, 12], elA: 70, head: [0, 4] }]]); expr(s.mom, t, [[0, 'smile']]); pose(s.me, t, [[0, { shA: [5, 8], shB: [5, 8], head: [0, -4] }]]); expr(s.me, t, [[0, 'worried']]);
    cam(T, s, t, i, { pos: [2.25, 1.55, 2.55], look: [0.05, 1.62, -0.6] }); },
  (g) => vignette(g, '#05060c', 0.25));
