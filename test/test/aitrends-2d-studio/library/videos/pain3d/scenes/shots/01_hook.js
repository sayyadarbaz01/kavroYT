// shots/01_hook.js — 0:00–0:33 cold open: toe vs steel bed, Lego, the boiling pan, Jay screams.
import { posesAt, breathe, walkPose, POSE } from '../toon/toon.js';
import { label, screen } from '../toon/fx.js';
import { ME, JAY, fig, shot, face, fwd, handPos, steelBed, pan, lego, holdPan, kitchen, impact, shout, steam, meter,
  E, V, ease, prog, clamp, lerp, SETS } from './_lib.js';

const STOP = 0.77;                                  // hero x where his toe meets the steel footboard (x = 0.9)
const bedroom = (st, s, x = STOP) => { SETS.bedroom(st); steelBed(st); s.me = fig(st, ME, x, 0, 0); };
const KICK = { ...POSE.stand, hipA: 55, knA: 10, shA: [-20, 12], shB: [25, 12], spine: [-6, 0] };
const BACK = { ...POSE.stand, hipA: -35, knA: 45, shA: [20, 12], shB: [-15, 12], spine: [6, 0] };
const toeAt = (s) => screen(s.stage.camera, [s.me.position.x + 0.12, 0.08, s.me.position.z + 0.08]);

// p01 — wide: walking across the bedroom, toe slams the steel bed frame
shot('p01', (st, s) => bedroom(st, s, -2.4),
  (s, t, i, T) => { const hit = 3.2, x = Math.min(STOP, -2.4 + t * 1.0); s.me.position.x = x;
    s.me.setPose(t < hit - 0.35 ? walkPose(t * 6.28 * 0.9) : posesAt(t - (hit - 0.35), [[0, BACK], [0.3, KICK], [0.55, POSE.stand]], 0.22)); s.me.act(t, t < hit ? 'happy' : 'surprised');
    T.dolly(s.stage.camera, t, [[0, { pos: [-1.6, 1.7, 4.6], look: [-0.6, 0.8, 0] }], [i.dur, { pos: [0.2, 1.4, 3.6], look: [0.6, 0.7, 0] }]]); },
  (g, t, i, s) => { const [x, y, ppm] = toeAt(s); impact(g, t, x, y, ppm * 0.35, 3.2); });

// p02 — insert: the toe against steel, HARD.
shot('p02', (st, s) => bedroom(st, s),
  (s, t, i, T) => { s.me.setPose(posesAt(t, [[0, KICK], [0.25, POSE.stand]], 0.2)); s.me.act(t, 'surprised');
    T.dolly(s.stage.camera, t, [[0, { pos: [0.55, 0.24, 1.35], look: [0.85, 0.12, 0.05] }], [i.dur, { pos: [0.62, 0.2, 1.1], look: [0.85, 0.12, 0.05] }]]); },
  (g, t, i, s) => { const [x, y, ppm] = toeAt(s); impact(g, t, x, y, ppm * 0.25, 0.02); shout(g, t, 'HARD.', { at: 0.1, y: E.H * 0.22 }); });

// p03 — close-up: eyes squeezed shut, bracing for the sting
shot('p03', (st, s) => bedroom(st, s),
  (s, t, i, T) => { const k = ease.inOut(prog(t, 0.1, 1.2)); s.me.setPose(breathe({ ...POSE.stand, shA: [10, 20 + 20 * k], shB: [10, 20 + 20 * k], elA: 40 * k, elB: 40 * k, spine: [8 * k, 0], head: [0, -8 * k] }, t)); s.me.act(t, t < 0.5 ? 'worried' : 'sleepy');
    const f = face(s.me, 1.2 - 0.3 * ease.inOut(t / i.dur), 0.3); T.dolly(s.stage.camera, t, [[0, f], [i.dur, f]]); },
  (g, t) => { const k = prog(t, 0.6, 2.8); g.save(); g.globalAlpha = 0.25 * k; g.fillStyle = '#e8302c'; g.fillRect(0, 0, E.W, E.H); g.restore(); });

// p04 — nothing. blank face, meter flat at 0
shot('p04', (st, s) => bedroom(st, s),
  (s, t, i, T) => { s.me.setPose(breathe(POSE.stand, t)); s.me.act(t, t < 0.25 ? 'sleepy' : 'neutral'); const f = face(s.me, 0.95, 0.25); T.dolly(s.stage.camera, t, [[0, f], [i.dur, { ...f, pos: [f.pos[0] - 0.08, f.pos[1], f.pos[2]] }]]); },
  (g, t) => { meter(g, t, 0, { at: 0.05 }); shout(g, t, 'NOTHING.', { at: 0.2, size: V(96, 90), shake: 0 }); });

// p05 — absolutely nothing: confused look down at the foot
shot('p05', (st, s) => bedroom(st, s),
  (s, t, i, T) => { s.me.setPose(breathe(posesAt(t, [[0, POSE.stand], [0.5, { ...POSE.shrug, head: [0, -18] }]]), t)); s.me.act(t, 'confused'); const f = face(s.me, 1.25, 0.45, 1.35); T.dolly(s.stage.camera, t, [[0, f], [i.dur, { ...f, pos: [f.pos[0], f.pos[1] + 0.1, f.pos[2] - 0.15] }]]); },
  (g, t) => meter(g, t, 0, { at: 0 }));

// p06 — medium: kick it again, harder. NO PAIN
shot('p06', (st, s) => bedroom(st, s),
  (s, t, i, T) => { s.me.setPose(posesAt(t, [[0, POSE.stand], [0.6, { ...BACK, hipA: -55, knA: 60 }], [1.2, { ...KICK, hipA: 70 }], [1.6, POSE.stand], [2.6, POSE.shrug]], 0.25)); s.me.act(t, t < 0.6 ? 'determined' : t < 2.6 ? 'neutral' : 'smirk');
    T.dolly(s.stage.camera, t, [[0, { pos: [1.0, 1.25, 2.9], look: [0.6, 0.6, 0] }], [i.dur, { pos: [0.9, 1.15, 2.4], look: [0.6, 0.6, 0] }]]); },
  (g, t, i, s) => { const [x, y, ppm] = toeAt(s); impact(g, t, x, y, ppm * 0.45, 1.25, '#ff8a3a'); meter(g, t, 0, { at: 1.6 }); shout(g, t, 'NO PAIN', { at: 2.65, y: E.H * 0.2 }); });

// p07 — insert floor: bare foot comes down on a Lego brick
shot('p07', (st, s) => { SETS.bedroom(st); steelBed(st); st.add(lego(0.02, 0.6)); s.me = fig(st, ME, -0.04, 0.52, 0); },
  (s, t, i, T) => { const lift = { ...POSE.stand, hipA: 35, knA: 55 }; const land = ease.inOut(prog(t, 0.6, 1.0)); s.me.setPose(posesAt(t, [[0, lift], [0.6, lift], [1.0, POSE.stand]], 0.4)); s.me.position.y = 0.065 * land; s.me.act(t, 'neutral');
    T.dolly(s.stage.camera, t, [[0, { pos: [0.55, 0.16, 1.35], look: [0, 0.12, 0.6] }], [i.dur, { pos: [0.42, 0.12, 1.1], look: [0, 0.1, 0.6] }]]); },
  (g, t, i, s) => { const [x, y, ppm] = screen(s.stage.camera, [0.02, 0.08, 0.6]); impact(g, t, x, y, ppm * 0.2, 1.0, '#ff5a4a'); label(g, t, 'LEGO BRICK', { at: 0.3 }); });

// p08 — zero flinch: a calm smirking shrug
shot('p08', (st, s) => bedroom(st, s),
  (s, t, i, T) => { s.me.setPose(breathe(posesAt(t, [[0, POSE.stand], [0.3, POSE.shrug]]), t)); s.me.act(t, 'smirk'); const f = face(s.me, 1.1, -0.3); T.dolly(s.stage.camera, t, [[0, f], [i.dur, { ...f, pos: [f.pos[0] - 0.15, f.pos[1], f.pos[2]] }]]); },
  (g, t) => shout(g, t, 'ZERO FLINCH', { at: 0.15, y: E.H * 0.82, size: V(100, 90), shake: 0 }));

// ---------- kitchen ----------
const HERO_K = [0.05, -2.62], FACE_STOVE = Math.PI / 2;
const GRAB = { ...POSE.stand, shA: [75, 8], elA: 25, spine: [6, 0] }, HOLD = { ...POSE.stand, shA: [65, 6], elA: 50 };
const kit = (st, s) => { kitchen(st); s.me = fig(st, ME, HERO_K[0], HERO_K[1], FACE_STOVE); s.pan = pan(); st.add(s.pan); s.jay = fig(st, JAY, -4.4, 1.5, 0.74); };
const panOnStove = (p) => { p.position.set(-0.24, 1.0, -3.45); p.rotation.set(0, -Math.PI / 2, 0); };
const panScreen = (s) => screen(s.stage.camera, [s.pan.position.x, s.pan.position.y + 0.08, s.pan.position.z]);

// p09 — kitchen wide: grabs the boiling pan off the stove bare-handed
shot('p09', (st, s) => { kit(st, s); s.jay.visible = false; },
  (s, t, i, T) => { const grab = 1.4; s.me.setPose(breathe(posesAt(t, [[0, POSE.stand], [grab - 0.4, GRAB], [grab + 0.4, HOLD]], 0.35), t)); s.me.act(t, t < grab ? 'neutral' : 'smile');
    if (t < grab) panOnStove(s.pan); else holdPan(s.pan, s.me);
    T.dolly(s.stage.camera, t, [[0, { pos: [2.6, 1.8, 1.6], look: [-0.2, 1.0, -3.0] }], [i.dur, { pos: [1.9, 1.6, 0.6], look: [-0.1, 1.0, -3.1] }]]); },
  (g, t, i, s) => { const [x, y, ppm] = panScreen(s); steam(g, t, x, y, ppm * 0.3); label(g, t, '200 °C', { at: 0.4, color: '#ffb25a' }); });

// p10 — insert: the hand sizzles on the hot handle, PAIN 0%
shot('p10', (st, s) => { kit(st, s); s.jay.visible = false; },
  (s, t, i, T) => { s.me.setPose(breathe(HOLD, t)); s.me.act(t, 'smile'); holdPan(s.pan, s.me); const h = handPos(s.me);
    T.dolly(s.stage.camera, t, [[0, { pos: [h[0] + 0.85, h[1] + 0.3, h[2] + 0.55], look: [h[0] - 0.05, h[1] - 0.05, h[2] - 0.15] }], [i.dur, { pos: [h[0] + 0.6, h[1] + 0.22, h[2] + 0.4], look: [h[0] - 0.05, h[1] - 0.05, h[2] - 0.15] }]]); },
  (g, t, i, s) => { const [hx, hy, ppm] = screen(s.stage.camera, handPos(s.me)); steam(g, t, hx, hy, ppm * 0.18, 1, '#ffffff', 7); const [x, y] = panScreen(s); steam(g, t, x, y, ppm * 0.3, 0.8);
    g.save(); g.globalCompositeOperation = 'lighter'; const k = 0.4 + 0.2 * Math.sin(t * 20); g.fillStyle = `rgba(255,90,40,${0.25 * k})`; g.beginPath(); g.arc(hx, hy, ppm * 0.06, 0, 7); g.fill(); g.restore();
    label(g, t, 'SIZZLE', { at: 0.2, color: '#ffb25a' }); meter(g, t, 0, { at: 1.4 }); });

// p11 — Jay bursts into the doorway: BRO! DROP THE PAN!
shot('p11', (st, s) => kit(st, s),
  (s, t, i, T) => { s.jay.setPose(posesAt(t, [[0, POSE.shocked], [0.85, POSE.point], [1.4, POSE.handsUp]], 0.2)); s.jay.act(t, 'shocked'); s.me.setPose(HOLD); holdPan(s.pan, s.me);
    const f = face(s.jay, 1.7, 0.25, 1.3); T.dolly(s.stage.camera, t, [[0, f], [i.dur, { pos: f.pos.map((v, k) => lerp(v, s.jay.position.toArray()[k] + [0, 1.4, 0][k], 0.22)), look: f.look }]]); },
  (g, t) => { shout(g, t, 'BRO!', { at: 0.05, y: E.H * 0.2 }); shout(g, t, 'DROP THE PAN!', { at: 0.87, y: E.H * 0.82, size: V(100, 84) }); });

// p12 — two-shot: Jay screams from the doorway; Leo turns, pan in hand: "What? It does not hurt!"
shot('p12', (st, s) => kit(st, s),
  (s, t, i, T) => { const turn = ease.inOut(prog(t, 0.6, 1.6)); s.me.rotation.y = lerp(FACE_STOVE, 3.85, turn); s.me.setPose(breathe(posesAt(t, [[0, HOLD], [2.1, { ...HOLD, shB: [10, 45], elB: 100 }], [3.0, { ...HOLD, shA: [100, 6], elA: 30 }]], 0.3), t));
    s.me.act(t, t < 2.1 ? 'neutral' : t < 2.9 ? 'confused' : 'smile'); holdPan(s.pan, s.me);
    s.jay.setPose(breathe(posesAt(t, [[0, POSE.point], [1.2, POSE.handsUp], [2.6, POSE.facepalm]], 0.25), t)); s.jay.act(t, t < 2.6 ? 'shocked' : 'worried');
    T.dolly(s.stage.camera, t, [[0, { pos: [2.3, 1.9, 4.3], look: [-2.2, 0.9, -0.55] }], [i.dur, { pos: [1.9, 1.75, 3.8], look: [-2.2, 0.9, -0.55] }]]); },
  (g, t, i, s) => { const [x, y, ppm] = panScreen(s); steam(g, t, x, y, ppm * 0.3, 0.7); shout(g, t, 'WHAT?', { at: 2.18, x: E.W * 0.72, y: E.H * 0.2, size: V(90, 80), shake: 0, dur: 3.1 }); });

