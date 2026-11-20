// shots/sets.js — one wide view per set (plus a drone view of the suburb roofs) to check for glitches.
import { registerShot } from '/engine/core.js';
import { toonFigure } from '../toon/toon.js';
import { SETS, van } from '../toon/sets3d.js';
import { KIP } from '../toon/cast3d.js';
const fig = (st, x, z, rotY = 0, pose = 'stand', expr = 'neutral') => { const f = toonFigure(KIP, { pose, expr }); f.position.set(x, 0, z); f.rotation.y = rotY; st.add(f); return f; };
const shot = (id, build, cam) => registerShot(id, { kind: '3d', init(T) { const st = T.stage({ mood: 'sunny', fov: 38, fog: false }); build(st); return { stage: st }; }, draw(s, t, i, T) { T.dolly(s.stage.camera, t, [[0, cam], [i.dur, cam]]); } });
const list = [
  ['s01', (st) => { SETS.suburb(st, { cars: true }); fig(st, 0, 1, 0.4); }, { pos: [6, 2.2, 9], look: [0, 1.5, -2] }],
  ['s02', (st) => { SETS.suburb(st, { cars: true }); fig(st, 0, 1, 0.4); }, { pos: [14, 16, 20], look: [0, 0, -2] }],
  ['s03', (st) => { SETS.suburbNight(st); st.add(van(4, 5.2, 0)); fig(st, 0, 1.2, 0.3); }, { pos: [8, 2.0, 10], look: [1, 1.2, 1] }],
  ['s04', (st) => { SETS.park(st); fig(st, 0, 0, 0.3); }, { pos: [5, 2, 7], look: [0, 1.2, -4] }],
  ['s05', (st) => { SETS.beach(st); fig(st, 0, 2, -1.2); }, { pos: [2, 1.6, 8], look: [0, 1.4, -10] }],
  ['s06', (st) => { SETS.street(st, { tokyo: true }); fig(st, 0, 0, -0.5); }, { pos: [8, 2, 2.5], look: [0, 3, 0] }],
  ['s07', (st) => { SETS.paris(st); fig(st, -1, -1, 0.4); }, { pos: [3, 2, 6], look: [0, 2.5, -4] }],
  ['s08', (st) => { SETS.mountain(st); const f = fig(st, 0, -1, -0.8, 'handsUp', 'awe'); f.position.y = 1.0; }, { pos: [6, 3, 7], look: [0, 3, -8] }],
  ['s09', (st) => { SETS.hospital(st); fig(st, 0, -0.5, -0.4); }, { pos: [3.5, 1.9, 5], look: [0, 1.4, -2] }],
  ['s10', (st) => { SETS.lab(st); fig(st, -1, 0, 0.3); }, { pos: [4, 2.0, 5.5], look: [0, 1.5, -2] }],
  ['s11', (st) => { SETS.kitchen(st); fig(st, 0, 0, 0.5); }, { pos: [3.2, 1.8, 3.6], look: [0, 1.2, -1] }],
  ['s12', (st) => { SETS.classroom(st); fig(st, 0, 3.6, -1.6); }, { pos: [5, 3.2, 6], look: [0, 1, 0] }],
  ['s13', (st) => { SETS.bedroom(st, { night: true }); fig(st, 0, 0, 0.3); }, { pos: [2.5, 1.8, 3.3], look: [-1, 1.1, -1.5] }],
  ['s14', (st) => { SETS.hallway(st); fig(st, 0, 0, -Math.PI / 2); }, { pos: [0.6, 1.6, 6], look: [0, 1.3, -4] }],
  ['s15', (st) => { SETS.gym(st); fig(st, 0, 0, 0.3); }, { pos: [8, 3.5, 7], look: [0, 1.5, -3] }],
  ['s16', (st) => { SETS.winterCamp(st); fig(st, 1.2, 0.8, -2.4); }, { pos: [4, 1.8, 4], look: [0, 0.9, 0] }],
  ['s17', (st) => { SETS.fireStreet(st); fig(st, 0, 2.6, 0.3); }, { pos: [5, 2.0, 8], look: [0, 2.5, -2] }],
  ['s18', (st) => { SETS.fireRoom(st); fig(st, 0, 0, 0.3); }, { pos: [3, 1.8, 3.8], look: [0, 1.2, -1.5] }],
  ['s19', (st) => { SETS.street(st); fig(st, 0, 0, -0.5); }, { pos: [8, 2, 2.5], look: [0, 3, 0] }],
  ['s20', (st) => { SETS.suburb(st, { bus: true }); fig(st, 0, 1, 0.4); }, { pos: [-10, 9, 14], look: [0, 1, -4] }],
];
list.forEach(([id, b, c]) => shot(id, b, c));
