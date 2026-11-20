// shots/test.js — test reel for the toon kit (hero, faces, every set). Replaced once the new voiceover is timed.
import { registerShot, ease, clamp } from '/engine/core.js';
import { toonFigure, posesAt, breathe, walkPose } from '../toon/toon.js';
import { SETS, newsVan } from '../toon/sets3d.js';
import { HERO, FRIEND, SCI, KIDS, GRANDMA } from '../toon/cast3d.js';

const fig = (st, of, x, z, rotY = 0, pose = 'stand', expr = 'neutral') => { const f = toonFigure(of, { pose, expr }); f.position.set(x, 0, z); f.rotation.y = rotY; st.add(f); return f; };
const shot = (id, build, anim) => registerShot(id, { kind: '3d', init(T, info) { const st = T.stage({ mood: 'sunny', fov: 38, fog: false }); const s = { stage: st }; build(st, s, T); return s; }, draw(s, t, info, T) { anim(s, t, info, T); } });

shot('t01', (st, s) => { SETS.suburb(st, { bus: true, cars: true }); s.h = fig(st, HERO, 0, 1.0, 0); },
  (s, t, i, T) => { s.h.position.x = -3 + t * 1.4; s.h.setPose(walkPose(t * 6.28 * 0.9)); s.h.act(t, 'smile'); T.dolly(s.stage.camera, t, [[0, { pos: [2, 2.2, 8], look: [-1, 1.1, 0] }], [i.dur, { pos: [4, 1.8, 6.5], look: [1.5, 1.1, 0.5] }]]); });
shot('t02', (st, s) => { SETS.classroom(st); s.h = fig(st, HERO, 0, 0, -Math.PI / 2 + 0.5, 'stand'); s.h.position.set(-0.6, 0, 0.4); },
  (s, t, i, T) => { const ex = ['neutral', 'happy', 'surprised', 'shocked', 'worried', 'smirk', 'determined', 'sad'][Math.min(7, Math.floor(t / (i.dur / 8)))]; s.h.act(t, ex); s.h.setPose(breathe(posesAt(t, [[0, 'stand']]), t)); T.dolly(s.stage.camera, t, [[0, { pos: [0.1, 1.4, 1.6], look: [-0.6, 1.33, 0.4] }], [i.dur, { pos: [0.0, 1.38, 1.4], look: [-0.6, 1.33, 0.4] }]]); });
shot('t03', (st, s, T) => { const a = SETS.classroom(st); s.kids = a.seats.slice(0, 8).map(([x, z], k) => fig(st, KIDS[k % 6], x - 0.62, z, Math.PI / 2, 'sitDesk', 'neutral')); s.h = fig(st, HERO, 2.6 - 0.62, 2.4, Math.PI / 2, 'sitDesk'); s.t = fig(st, SCI, 0, -3.6, 0, 'explain'); s.t.rotation.y = -Math.PI / 2 + Math.PI; },
  (s, t, i, T) => { s.h.act(t, t > 1 ? 'smirk' : 'neutral'); s.kids.forEach((k, j) => k.act(t + j, t > 1.2 ? 'shocked' : 'neutral', 3 + j * 0.2)); T.dolly(s.stage.camera, t, [[0, { pos: [5, 3.4, 6], look: [0, 0.8, 0] }], [i.dur, { pos: [3.5, 2.8, 5.6], look: [0.5, 0.8, 0.5] }]]); });
shot('t04', (st, s) => { SETS.bedroom(st, { night: true }); s.h = fig(st, HERO, -2.4, -2.2, -0.6, 'sit'); s.h.position.y = 0.2; },
  (s, t, i, T) => { s.h.act(t, 'awe'); s.h.setPose(breathe(posesAt(t, [[0, 'sit'], [1.2, 'holdFront']]), t)); T.dolly(s.stage.camera, t, [[0, { pos: [1.5, 1.6, 2.5], look: [-2.4, 1.0, -2.3] }], [i.dur, { pos: [0.6, 1.5, 1.6], look: [-2.4, 1.0, -2.3] }]]); });
shot('t05', (st, s) => { s.a = SETS.lab(st); s.h = fig(st, HERO, 1.5, -1, -1.0, 'stand', 'nervous'); s.sc = fig(st, SCI, -1.8, 0.6, 0.3, 'point', 'thinking'); },
  (s, t, i, T) => { s.h.act(t, 'worried'); s.sc.act(t, 'thinking'); s.a.ring.position.y = 0.2 + 2.3 * (0.5 + 0.5 * Math.sin(t * 1.5)); T.orbit(s.stage.camera, t, { target: [0, 1.1, -0.4], radius: 6.5, height: 2.4, from: 0.5, to: 1.0, dur: i.dur }); });
shot('t06', (st, s) => { SETS.hallway(st); s.h = fig(st, HERO, 0, 0, -Math.PI / 2); s.k = [fig(st, KIDS[0], -1.8, -4, Math.PI / 2, 'phone'), fig(st, KIDS[1], 1.8, -7, -Math.PI / 2, 'crossArms')]; },
  (s, t, i, T) => { s.h.position.z = -t * 1.3 + 2; s.h.setPose(walkPose(t * 5.6)); s.h.act(t, 'happy'); T.dolly(s.stage.camera, t, [[0, { pos: [0.6, 1.6, 6], look: [0, 1.2, 0] }], [i.dur, { pos: [0.6, 1.5, 3], look: [0, 1.2, -3] }]]); });
shot('t07', (st, s) => { SETS.beach(st, { sunset: true }); s.h = fig(st, HERO, 0, 2, -Math.PI / 2, 'cheer', 'joy'); },
  (s, t, i, T) => { s.h.act(t, 'joy'); s.h.setPose(breathe(posesAt(t, [[0, 'cheer']]), t)); T.dolly(s.stage.camera, t, [[0, { pos: [0, 1.4, 8], look: [0, 1.6, -10] }], [i.dur, { pos: [1.5, 1.3, 6.5], look: [0, 1.6, -10] }]]); });
shot('t08', (st, s) => { SETS.park(st, { sunset: true }); s.h = fig(st, HERO, 4.1, -1.8, -Math.PI / 2, 'sit', 'calm'); s.h.position.y = 0.12; },
  (s, t, i, T) => { s.h.act(t, 'calm'); T.orbit(s.stage.camera, t, { target: [4, 0.9, -1.8], radius: 5.5, height: 1.8, from: 0.6, to: 1.1, dur: i.dur }); });
shot('t09', (st, s) => { SETS.street(st, { tokyo: true }); s.h = fig(st, HERO, 0, 0, -0.5, 'wave', 'joy'); },
  (s, t, i, T) => { s.h.act(t, 'joy'); T.dolly(s.stage.camera, t, [[0, { pos: [7, 1.8, 3], look: [0, 1.5, 0] }], [i.dur, { pos: [5, 1.6, 2], look: [0, 1.5, 0] }]]); });
shot('t10', (st, s) => { SETS.paris(st); s.h = fig(st, HERO, -3.6, -1.5, 0, 'sit', 'happy'); s.h.position.y = 0.1; s.f = fig(st, FRIEND, -2.4, -1.5, Math.PI, 'sit', 'happy'); s.f.position.y = 0.1; },
  (s, t, i, T) => { s.h.act(t, 'happy'); s.f.act(t, 'smile', 2.9); T.dolly(s.stage.camera, t, [[0, { pos: [-1, 1.6, 4.5], look: [-3, 1.2, -1.5] }], [i.dur, { pos: [0.5, 1.8, 5], look: [-2, 1.4, -2] }]]); });
shot('t11', (st, s) => { SETS.mountain(st); s.h = fig(st, HERO, 0, -1, -0.8, 'handsUp', 'awe'); s.h.position.y = 1.0; },
  (s, t, i, T) => { s.h.act(t, 'awe'); T.orbit(s.stage.camera, t, { target: [0, 1.8, -1], radius: 6, height: 2.8, from: 1.2, to: 1.8, dur: i.dur }); });
shot('t12', (st, s) => { SETS.hospital(st); s.h = fig(st, HERO, 0, -0.5, -0.4, 'shocked', 'shocked'); s.g = fig(st, GRANDMA, -2, -3.1, 0.6, 'sit', 'surprised'); s.g.position.y = 0.0; },
  (s, t, i, T) => { s.h.act(t, 'shocked'); T.dolly(s.stage.camera, t, [[0, { pos: [3.5, 1.7, 4], look: [0, 1.3, -1.5] }], [i.dur, { pos: [2.6, 1.6, 3.2], look: [0, 1.3, -1.5] }]]); });
shot('t13', (st, s) => { SETS.park(st); s.h = fig(st, HERO, 0, 0, 0, 'stand', 'happy'); },
  (s, t, i, T) => { s.h.setExpr('happy'); T.dolly(s.stage.camera, t, [[0, { pos: [0.9, 1.7, 1.6], look: [0, 1.35, 0] }], [i.dur, { pos: [0.9, 1.7, 1.6], look: [0, 1.35, 0] }]]); });
