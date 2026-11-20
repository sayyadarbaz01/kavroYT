// shots/hook.js — the 30 s cold open: late for school, the bus leaves, first teleport, classroom, title.
import * as THREE from 'three';
import { E, V, S, registerShot, ease, prog, clamp, lerp, text, alpha, glow, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { toonFigure, posesAt, breathe, walkPose, POSE } from '../toon/toon.js';
import { SETS, bus, box, cyl } from '../toon/sets3d.js';
import { HERO, KIDS, SCI } from '../toon/cast3d.js';
import { screen, teleport, aura, label, flash, POWER } from '../toon/fx.js';

const ME = { ...HERO, bag: '#3a5ad8' };
const fig = (st, of, x, z, rotY = 0, pose = 'stand', expr = 'neutral') => { const f = toonFigure(of, { pose, expr }); f.position.set(x, 0, z); f.rotation.y = rotY; st.add(f); return f; };
const shot = (id, build, anim, overlay) => registerShot(id, { kind: '3d',
  init(T, info) { const st = T.stage({ mood: 'sunny', fov: 38, fog: false }); const s = { stage: st }; build(st, s, T); return s; },
  draw(s, t, info, T) { anim(s, t, info, T); }, overlay: overlay ? (g, t, info, s) => overlay(g, t, info, s) : undefined });
const face = (cam, f, back = 1.15, side = 0.35, h = 1.47) => { const a = f.rotation.y; return { pos: [f.position.x + Math.cos(a) * back + Math.sin(a) * side, h, f.position.z - Math.sin(a) * back + Math.cos(a) * side], look: [f.position.x, h - 0.02, f.position.z] }; };
// classroom with seated classmates; the hero's desk is front-right, empty until he appears
function classroom(st, s) {
  SETS.classroom(st);
  const seats = [[-2.6, -1.6], [0, -1.6], [2.6, -1.6], [-2.6, 0.4], [0, 0.4], [-2.6, 2.4], [0, 2.4], [2.6, 2.4]];
  s.kids = seats.map(([x, z], k) => fig(st, KIDS[k % 6], x, z + 0.62, Math.PI / 2, 'sitDesk', 'neutral'));
  s.me = fig(st, ME, 2.6, 0.4 + 0.62, Math.PI / 2, 'sitDesk', 'neutral');
  s.nb = s.kids[4];                               // classmate next to the hero (juice box)
  s.teacher = fig(st, SCI, 0.4, -3.6, -Math.PI / 2, 'explain', 'neutral');
  const jb = new THREE.Group(); jb.add(box(0.07, 0.11, 0.05, '#f2b51e', 0, 0.055, 0, { outline: 0.004 })); jb.add(cyl(0.006, 0.006, 0.08, '#ffffff', 0.015, 0.14, 0)); jb.position.set(0.15, 0.77, 0.2); st.add(jb); s.jb = jb;
}
// classroom desks face the board (-z); fix the desk rotation the set builder uses
function fixDesks(st) { st.scene.traverse((o) => { if (o.isGroup && o.children.length > 8 && Math.abs(o.rotation.y + Math.PI / 2) < 0.01 && o.position.y === 0) o.rotation.y = Math.PI / 2; }); }

// h01 — 7:58, the hero sprints down the street
shot('h01', (st, s) => { SETS.suburb(st, { bus: true, busX: 30 }); s.me = fig(st, ME, 0, 0.6, 0); },
  (s, t, i, T) => { s.me.position.x = -4 + t * 3.2; s.me.setPose(walkPose(t * 6.28 * 1.6, true)); s.me.act(t, 'worried'); const x = s.me.position.x;
    T.dolly(s.stage.camera, t, [[0, { pos: [x + 3.5, 1.3, 4.2], look: [x, 1.0, 0.6] }], [i.dur, { pos: [x + 2.6, 1.2, 3.6], look: [x, 1.05, 0.6] }]]); },
  (g, t) => { label(g, t, '7:58 AM', { at: 0.3 }); label(g, t, 'CLASS STARTS 8:00', { at: 0.9, y: V(180, 230), size: V(32, 38) }); });

// h02 — the bus pulls away, the hero stops dead
shot('h02', (st, s) => { SETS.suburb(st); s.bus = bus(2, 3, 0); st.add(s.bus); s.me = fig(st, ME, -6, 0.8, 0); },
  (s, t, i, T) => { s.bus.position.x = 2 + Math.max(0, t - 0.2) ** 1.6 * 4; const stop = 1.4; s.me.position.x = -6 + Math.min(t, stop) * 3.2;
    s.me.setPose(t < stop ? walkPose(t * 6.28 * 1.6, true) : posesAt(t - stop, [[0, walkPose(0, true)], [0, 'point']], 0.25)); s.me.act(t, t > stop ? 'shocked' : 'worried');
    T.dolly(s.stage.camera, t, [[0, { pos: [-9, 1.6, 2.6], look: [0, 1.2, 2] }], [i.dur, { pos: [-7.5, 1.5, 2.2], look: [4, 1.2, 2.5] }]]); });

// h03 — close-up: shock, then worry, 3 KM
shot('h03', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, 0, 0.8, -0.9, 'shocked', 'shocked'); },
  (s, t, i, T) => { s.me.setPose(breathe(posesAt(t, [[0, 'shocked'], [1.0, 'shrug']]), t)); s.me.act(t, t < 1.0 ? 'shocked' : 'worried'); const f = face(null, s.me, 1.0 - 0.1 * t / i.dur); T.dolly(s.stage.camera, t, [[0, f], [i.dur, f]]); },
  (g, t) => { label(g, t, 'SCHOOL: 3 KM', { at: 0.6, x: E.W - V(110, 80), align: 'right' }); });

// h04 — eyes closed, the power gathers
shot('h04', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, 0, 0.8, -1.1, 'stand', 'calm'); },
  (s, t, i, T) => { s.me.setPose(breathe(POSE.stand, t)); s.me.act(t, t < i.dur - 0.6 ? 'calm' : 'determined'); const k = ease.inOut(t / i.dur); const f = face(null, s.me, 1.3 - 0.45 * k, 0.15); T.dolly(s.stage.camera, t, [[0, f], [i.dur, f]]); s.k = k; },
  (g, t, i, s) => { const [x, y, ppm] = screen(s.stage.camera, [s.me.position.x, 1.49, s.me.position.z]); aura(g, t, x, y, ppm * 0.42, 0.25 + 0.75 * s.k); });

// h05 — wide: the hero vanishes from the sidewalk
shot('h05', (st, s) => { SETS.suburb(st, { cars: true }); s.me = fig(st, ME, 0, 0.8, -0.6, 'stand', 'determined'); },
  (s, t, i, T) => { s.me.setPose(breathe(POSE.stand, t)); s.me.act(t, 'determined'); T.dolly(s.stage.camera, t, [[0, { pos: [5.5, 1.6, 6], look: [0, 1.0, 0.8] }], [i.dur, { pos: [4.8, 1.5, 5.2], look: [0, 1.0, 0.8] }]]);
    s.me.visible = t < 0.95; },
  (g, t, i, s) => { const [x, y, ppm] = screen(s.stage.camera, [s.me.position.x, 0, s.me.position.z]); teleport(g, t, x, y, ppm * 1.6, 'out', 0.85, 3); });

// h06 — classroom: flash, the hero appears at his desk
shot('h06', (st, s) => { classroom(st, s); fixDesks(st); },
  (s, t, i, T) => { s.me.visible = t > 0.75; s.me.setPose(breathe(POSE.sitDesk, t)); s.me.act(t, 'neutral'); if (s.me.bag) s.me.bag.rotation.x = Math.sin(t * 9) * 0.25 * Math.exp(-(t - 0.75) * 2) * (t > 0.75 ? 1 : 0);
    s.kids.forEach((k, j) => { k.setPose(breathe(POSE.sitDesk, t, j)); k.act(t + j, 'neutral', 3 + j * 0.3); }); s.teacher.setPose(breathe(POSE.explain, t)); s.teacher.act(t, 'neutral');
    T.dolly(s.stage.camera, t, [[0, { pos: [5, 2.7, -4.4], look: [0.6, 0.8, 0.8] }], [i.dur, { pos: [4.4, 2.5, -4.0], look: [1.2, 0.8, 0.9] }]]); },
  (g, t, i, s) => { const [x, y, ppm] = screen(s.stage.camera, [s.me.position.x, 0, s.me.position.z]); teleport(g, t, x, y, ppm * 1.3, 'in', 0.75, 5); });

// h07 — the classmate next to you drops his juice box
shot('h07', (st, s) => { classroom(st, s); fixDesks(st); s.jb.position.set(s.nb.position.x + 0.35, 0.77, s.nb.position.z - 0.35); },
  (s, t, i, T) => { const nb = s.nb; nb.setPose(posesAt(t, [[0, { ...POSE.sitDesk, shA: [70, 10], elA: 80 }], [0.5, { ...POSE.sitDesk, shA: [60, 70], shB: [60, 70], elA: 140, elB: 140, spine: [-6, 0], head: [0, 6] }]], 0.2)); nb.act(t, t < 0.5 ? 'neutral' : 'shocked');
    const ft = Math.max(0, t - 0.55); s.jb.position.y = Math.max(0.03, 0.77 + 0.3 * ft - 4.9 * ft * ft); s.jb.position.x = nb.position.x + 0.35 + ft * 0.4; s.jb.rotation.z = -ft * 7 * (s.jb.position.y > 0.031 ? 1 : 0) - (s.jb.position.y <= 0.031 ? 1.57 : 0);
    s.me.setPose(breathe(POSE.sitDesk, t)); s.me.act(t, 'neutral');
    const a = nb.rotation.y, fx = Math.cos(a), fz = -Math.sin(a); const cx = nb.position.x + fx * 1.8 + 0.7, cz = nb.position.z + fz * 1.8;
    T.dolly(s.stage.camera, t, [[0, { pos: [cx, 1.55, cz], look: [nb.position.x + 0.2, 0.95, nb.position.z - 0.15] }], [i.dur, { pos: [cx - 0.15, 1.5, cz + 0.15], look: [nb.position.x + 0.3, 0.88, nb.position.z - 0.2] }]]); });

// h08 — close-up: the hero smirks, bag still swinging
shot('h08', (st, s) => { classroom(st, s); fixDesks(st); },
  (s, t, i, T) => { s.me.setPose(breathe(posesAt(t, [[0, 'sitDesk']]), t)); s.me.act(t, t < 0.6 ? 'neutral' : 'smirk'); if (s.me.bag) s.me.bag.rotation.x = Math.sin(t * 7) * 0.12 * Math.exp(-t);
    const f = face(null, s.me, 1.05, 0.25, 1.12); T.dolly(s.stage.camera, t, [[0, f], [i.dur, { pos: [f.pos[0] - 0.12, f.pos[1], f.pos[2] - 0.05], look: f.look }]]); });

// h09 — orbit: every head turns to the new arrival
shot('h09', (st, s) => { classroom(st, s); fixDesks(st); },
  (s, t, i, T) => { s.me.setPose(breathe(POSE.sitDesk, t)); s.me.act(t, 'smirk');
    s.kids.forEach((k, j) => { const turn = ease.inOut(prog(t, 0.2 + j * 0.12, 0.6 + j * 0.12)); const dx = s.me.position.x - k.position.x, dz = s.me.position.z - k.position.z; const want = Math.atan2(-dz, dx) - k.rotation.y; k.setPose({ ...POSE.sitDesk, head: [clamp(want * 57.3, -70, 70) * turn, 0] }); k.act(t + j, turn > 0.5 ? 'surprised' : 'neutral', 3 + j * 0.2); });
    s.teacher.setPose(POSE.shocked); s.teacher.act(t, 'surprised');
    T.orbit(s.stage.camera, t, { target: [1.8, 0.9, 0.8], radius: [5.2, 4.2], height: [2.6, 2.0], from: 0.9, to: 0.3, dur: i.dur }); });

// h10 — title card
shot('h10', (st, s) => { classroom(st, s); fixDesks(st); },
  (s, t, i, T) => { s.me.setPose(breathe(POSE.sitDesk, t)); s.me.act(t, 'smile'); s.kids.forEach((k, j) => k.act(t + j, 'surprised', 3 + j * 0.2)); T.dolly(s.stage.camera, t, [[0, { pos: [6.5, 3.4, 5.5], look: [0.5, 1.0, 0] }], [i.dur, { pos: [7.2, 3.8, 6.2], look: [0.5, 1.2, 0] }]]); },
  (g, t, i) => { g.save(); g.globalAlpha = 0.35 * ease.out(prog(t, 0, 0.6)); g.fillStyle = '#0a1020'; g.fillRect(0, 0, E.W, E.H); g.restore();
    const a = ease.out(prog(t, 0.4, 1.0)) * clamp((i.dur - t) / 0.5), sc = 1 + 0.02 * t;
    g.save(); g.translate(E.W / 2, E.H * 0.46); g.scale(sc, sc);
    text(g, 'WHAT IF YOU COULD', 0, -V(60, 70), { size: V(56, 60), font: FONTS.serif, weight: 900, color: '#ffffff', alpha: a, spacing: 4, glow: 18, glowColor: 'rgba(120,220,255,.6)' });
    text(g, 'TELEPORT?', 0, V(40, 40), { size: V(150, 140), font: FONTS.serif, weight: 900, color: '#ffffff', alpha: ease.out(prog(t, 0.8, 1.4)) * clamp((i.dur - t) / 0.5), spacing: 6, glow: 30, glowColor: 'rgba(111,230,255,.85)' });
    g.restore(); FX.dust(g, t, { count: 40, color: POWER.core, a: 0.5 * a }); flash(g, t, 0.8, 0.3, '#dff8ff'); });
