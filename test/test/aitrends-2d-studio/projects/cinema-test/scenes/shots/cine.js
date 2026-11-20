// shots/cine.js — test reel for the cinema style: day / dusk / night grades, depth of field, drone moves.
import { registerShot } from '/engine/core.js';
import { toonFigure, walkPose } from '../toon/toon.js';
import { SETS } from '../toon/sets3d.js';
import { KIP, FRIEND } from '../toon/cast3d.js';

const fig = (st, of, x, z, rotY = 0, pose = 'stand', expr = 'neutral') => { const f = toonFigure(of, { pose, expr }); f.position.set(x, 0, z); f.rotation.y = rotY; st.add(f); return f; };
const shot = (id, build, anim) => registerShot(id, { kind: '3d', init(T) { const st = T.stage({ mood: 'sunny', fov: 38, fog: false }); const s = { stage: st }; build(st, s); return s; }, draw(s, t, i, T) { anim(s, t, i, T); } });
const still = (cam) => (s, t, i, T) => T.dolly(s.stage.camera, t, [[0, cam], [i.dur, cam]]);

shot('c01', (st, s) => { SETS.park(st); fig(st, KIP, 0, 0, 0.1, 'relaxed', 'smile'); }, still({ pos: [1.6, 1.45, 0.5], look: [0, 1.3, 0] }));
shot('c02', (st, s) => { SETS.suburb(st, { cars: true }); s.k = fig(st, KIP, 0, 1.0, 0); }, (s, t, i, T) => { s.k.position.x = -2 + t * 1.2; s.k.setPose(walkPose(t * 5.6)); s.k.act(t, 'happy'); T.dolly(s.stage.camera, t, [[0, { pos: [3, 2, 7], look: [-1, 1.1, 0.5] }], [i.dur, { pos: [4.5, 1.8, 6], look: [1.5, 1.1, 0.5] }]]); });
shot('c03', (st, s) => { SETS.suburb(st, { cars: true }); fig(st, KIP, 0, 1.0, 0.4, 'wave', 'happy'); }, (s, t, i, T) => T.drone(s.stage.camera, t, { target: [0, 1, 1], dur: i.dur }));
shot('c04', (st, s) => { SETS.suburbNight(st); fig(st, KIP, 0, 1.2, 0.3, 'stand', 'worried'); }, still({ pos: [4, 1.6, 4.5], look: [0, 1.1, 1.2] }));
shot('c05', (st, s) => { SETS.fireStreet(st); fig(st, KIP, 0, 2.6, 0.3, 'shocked', 'scared'); }, still({ pos: [2.2, 1.45, 3.4], look: [0, 1.15, 2.6] }));
shot('c06', (st, s) => { SETS.park(st, { sunset: true }); fig(st, KIP, 0, 0, 0.4, 'relaxed', 'calm'); }, still({ pos: [3.5, 1.5, 2.5], look: [0, 1.1, 0] }));
shot('c07', (st, s) => { SETS.kitchen(st); fig(st, KIP, 0, 0, 0.5, 'explain', 'smile'); }, still({ pos: [3.2, 1.6, 2.6], look: [0, 1.1, 0] }));
shot('c08', (st, s) => { SETS.beach(st, { sunset: true }); fig(st, KIP, 0, 2, -Math.PI / 2, 'cheer', 'joy'); }, still({ pos: [1.5, 1.3, 6.5], look: [0, 1.6, -10] }));
shot('c09', (st, s) => { const c = SETS.winterCamp(st); fig(st, KIP, 0.8, 0.6, -2.2, 'stand', 'calm'); }, still({ pos: [3.5, 1.6, 3.5], look: [0, 0.9, 0] }));
shot('c10', (st, s) => { SETS.park(st); fig(st, KIP, 0, 0, 0.3, 'cheer', 'joy'); fig(st, FRIEND, 1, -0.8, 0.8, 'wave', 'happy'); }, (s, t, i, T) => T.drone(s.stage.camera, t, { target: [0, 1, 0], dur: i.dur, mode: 'reveal', to: { h: 12, r: 18, a: -0.6 } }));
shot('c11', (st, s) => { SETS.hospital(st); fig(st, KIP, 0, -0.5, -0.4, 'shocked', 'shocked'); }, still({ pos: [3.5, 1.7, 4], look: [0, 1.3, -1.5] }));
shot('c12', (st, s) => { SETS.suburb(st, { cars: true }); s.k = fig(st, KIP, 0, 1.0, 0); }, (s, t, i, T) => { s.k.position.x = -1 + t * 0.9; s.k.setPose(walkPose(t * 5.6)); T.drone(s.stage.camera, t, { target: [0, 0, 1], dur: i.dur, mode: 'topdown' }); });
