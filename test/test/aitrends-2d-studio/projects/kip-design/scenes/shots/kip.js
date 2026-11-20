// shots/kip.js — design sheet for the upgraded Kip (glow, big eyes, bolt logo, watch, survival variant).
import { registerShot } from '/engine/core.js';
import { toonFigure } from '../toon/toon.js';
import { SETS } from '../toon/sets3d.js';
import { KIP, KIP_SURVIVAL } from '../toon/cast3d.js';

const OLD = { top: 'hoodie', color: '#1fa38f', cap: true, capColor: '#e8453c', glow: '#3fe0c5', bigEyes: true, logo: '#ffd23f', watch: '#c8a24a' };
const fig = (st, of, x, z, rotY = 0, pose = 'stand', expr = 'neutral') => { const f = toonFigure(of, { pose, expr }); f.position.set(x, 0, z); f.rotation.y = rotY; st.add(f); return f; };
const shot = (id, build, cam, mood = 'sunny') => registerShot(id, { kind: '3d',
  init(T) { const st = T.stage({ mood, fov: 34, fog: false }); const s = { stage: st }; build(st, s); return s; },
  draw(s, t, i, T) { T.dolly(s.stage.camera, t, [[0, cam], [i.dur, cam]]); } });

shot('k1', (st, s) => { SETS.park(st); fig(st, KIP, 0, 0, 0.0, 'relaxed', 'smile'); }, { pos: [1.9, 1.4, 0.45], look: [0, 1.25, 0] });
shot('k2', (st, s) => { SETS.suburb(st); fig(st, KIP, 0, 1.0, 0.5, 'wave', 'happy'); }, { pos: [3.4, 1.3, 2.9], look: [0, 0.85, 1.0] });
shot('k3', (st, s) => { SETS.fireStreet(st); fig(st, KIP, 0, 2.6, 0.3, 'shocked', 'scared'); }, { pos: [2.2, 1.45, 3.4], look: [0, 1.15, 2.6] });
shot('k4', (st, s) => { SETS.fireStreet(st); fig(st, KIP_SURVIVAL, 0, 2.6, 0.6, 'ready', 'determined'); }, { pos: [3.0, 1.2, 4.4], look: [0, 0.8, 2.6] });
shot('k5', (st, s) => { SETS.park(st); fig(st, KIP, 0, 0, 0.2, 'shocked', 'shocked'); }, { pos: [1.25, 1.4, 0.35], look: [0, 1.33, 0] });
shot('k6', (st, s) => { SETS.park(st); fig(st, OLD, 0, 0.75, 0.0, 'stand', 'smile'); fig(st, KIP, 0, -0.75, 0.0, 'stand', 'smile'); }, { pos: [3.4, 1.2, 0], look: [0, 1.0, 0] });
