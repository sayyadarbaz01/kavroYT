// shots/thumbs.js — text-free thumbnail art for the three If Blaze launch videos. Labels and captions are added by tools in out/compose.py.
// Each concept is registered twice: 'tN' (full) and 'tNb' (same camera, cast hidden) so the composer can cut a clean character mask.
import { ME, fig, shot, cam, C, pose, expr, box, THREE } from './_lib.js';
import { S } from './_spec.js';
import { lectureHall, ASLEEP } from './_rank.js';
import { LEAH, SAM, FX, FZ } from './_loop.js';
import { R412 } from './_rank.js';
import { panel, pigeon, animPigeon } from '../toon/sets_mirror.js';

const SIT = { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36 };
// figures cast no shadow here, so (full - hidden) is a clean character mask
const noShadow = (...os) => os.forEach((o) => o && o.traverse((m) => { m.castShadow = false; }));
const noSun = (st) => st.scene.traverse((l) => { if (l.isDirectionalLight) l.castShadow = false; });
// front fill light, so faces and props are lit from the camera side
const fill = (st, x, y, z, k = 1.6) => { const l = new THREE.DirectionalLight('#ffffff', k); l.position.set(x, y, z); st.scene.add(l); };

// T1 — Rank: lecture hall. Classmate asleep on his notes (screen left), Kip staring at him in shock (screen right).
for (const hide of [false, true]) shot(hide ? 't1b' : 't1', (st, s) => { lectureHall(st, s, ME); [0, 1, 2, 3, 4, 6, 7].forEach((j) => (s.studs[j].visible = false)); noShadow(s.me, s.r412); noSun(st); },
  (s, t, i, T) => { (s.studs || []).forEach((k) => { pose(k, 0, [[0, 'sitDesk']]); expr(k, 0, [[0, 'neutral']]); });
    pose(s.me, 0, [[0, { ...SIT, shA: [15, 82], elA: 6, shB: [95, 25], elB: 150, spine: [-4, 0], head: [-30, 4] }]]); s.me.setExpr('tShock');
    pose(s.r412, 0, [[0, { ...SIT, shA: [55, 10], shB: [55, 10], elA: 75, elB: 75, spine: [16, 12], head: [8, -14] }]]); s.r412.setExpr('tDrool'); s.r412.setExpr('sleepy');
    if (hide) { s.me.visible = s.r412.visible = false; }
    cam(T, s, t, i, C([0.62, 1.3, -0.98], [0.62, 1.2, 1.02])); },
  undefined, { mood: 'night' });

// T2 — Mirrors: empty gold frame on an orange wall, Gary on top, Kip worried with a hand on his cheek.
for (const hide of [false, true]) S(hide ? 't2b' : 't2', { mood: 'sunny',
  set: (st, s) => { st.add(box(14, 6, 0.2, '#ff8a1e', 0, 3, 0.0)); st.add(box(14, 0.1, 8, '#c85a12', 0, -0.05, 2)); fill(st, 1.5, 3, 6, 2.2);
    s.frame = panel(1.0, 1.15, -0.66, 1.12, 0.3, 0, false, '#f2c23a'); st.add(s.frame);
    { const inner = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.15), new THREE.MeshBasicMaterial({ color: '#1c2244' })); inner.position.set(0, 0, 0.04); s.frame.add(inner); }   // flat navy panel, recoloured by compose.py
    s.gary = pigeon(-0.66, 0.3, -0.9, 1.0); s.gary.position.y = 1.755; st.add(s.gary); noShadow(s.frame, s.gary); },
  cast: { me: [ME, 0.74, 1.5, FZ - 0.22, 'stand', 'tWorry'] },
  poses: { me: [[0, { shA: [100, 22], elA: 152, shB: [100, 22], elB: 152, head: [10, 4] }]] },
  b: (st, s) => { noShadow(s.F.me); noSun(st); },
  u: (s, t) => { animPigeon(s.gary, 0, { puff: 1 }); if (hide) s.F.me.visible = s.frame.visible = s.gary.visible = false; },
  cam: { p: [0.16, 1.45, 3.2], l: [0.16, 1.9, 0] } });

// T3 — Time loop: the bench at sunset, Kip (screen left) and Leah (screen right) turning to each other in surprise.
for (const hide of [false, true]) S(hide ? 't3b' : 't3', { set: ['park', { sunset: true }], mood: 'dusk',
  cast: { leah: [LEAH, 4.05, -2.2, FX - 0.3, 'sit', 'tGasp'], me: [ME, 4.05, -1.35, FX + 0.3, 'sit', 'tShock'] },
  poses: { me: [[0, { ...SIT, shA: [38, 4], shB: [38, 4], elA: 58, elB: 58, head: [6, 4] }]], leah: [[0, { ...SIT, shA: [38, 4], shB: [38, 4], elA: 58, elB: 58, head: [-6, 4] }]] },
  b: (st, s) => { noShadow(...Object.values(s.F)); noSun(st); fill(st, 8, 3, -1.8, 1.2); const b = new THREE.Box3(), z = new THREE.Vector3(); st.scene.traverse((m) => { if (!m.isMesh) return; b.setFromObject(m); b.getSize(z); if (z.y > 2.2 && z.x < 0.5 && z.z < 0.5) m.parent.visible = false; }); },   // no lamp posts behind the heads
  u: (s) => { if (hide) Object.values(s.F).forEach((f) => (f.visible = false)); },
  cam: { p: [5.85, 1.36, -1.78], l: [4.05, 1.3, -1.78] } });

// R1 — character reference lineup for AI image tools: plain light backdrop, everyone front-on, neutral.
S('r1', { mood: 'sunny',
  set: (st, s) => { st.add(box(20, 8, 0.2, '#f1f1f1', 0, 4, -1.2)); st.add(box(20, 0.1, 10, '#e4e4e4', 0, -0.05, 3)); fill(st, 0, 3, 8, 1.4);
    st.add(box(0.4, 0.9, 0.4, '#bdbdbd', 3.15, 0.45, 0)); s.gary = pigeon(3.15, 0, 0, 1.6); s.gary.position.y = 0.9; st.add(s.gary); },
  cast: { me: [ME, -2.05, 0, FZ, 'stand', 'neutral'], leah: [LEAH, -0.75, 0, FZ, 'stand', 'happy'], sam: [SAM, 0.65, 0, FZ, 'stand', 'neutral'], r4: [R412, 1.85, 0, FZ, 'stand', 'neutral'] },
  b: (st, s) => { noShadow(...Object.values(s.F), s.gary); noSun(st); },
  cam: { p: [0.55, 1.0, 5.0], l: [0.55, 0.95, 0] } });
