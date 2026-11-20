// shots/01_hook.js — 0:00-0:41 cold open: walking out of Miami General, the bus, the nurse, the HUD, five stars, title, Day 1.
import { walkPose } from '../toon/toon.js';
import { bus, starMesh } from '../toon/sets3d.js';
import { titleCard } from '/engine/ui2d.js';
import { text, FONTS, alpha, rr, circle } from '/engine/core.js';
import { ME, NURSE, fig, shot, face, cam, C, push, pose, expr, held, bandFlash, vignette, shout, THREE, box, E, V, ease, prog, clamp, lerp, SETS } from './_lib.js';

const FACE_Z = -Math.PI / 2;                     // figures face +z (toward the street / camera)
const U = () => E.H / 1080;

// ---------- props + overlays ----------
// long hospital bill held in the right hand
function bill() { const g = new THREE.Group(); g.add(box(0.22, 0.62, 0.008, '#fbfaf4', 0, -0.31, 0, { outline: 0.004 }));
  for (let k = 0; k < 9; k++) g.add(box(0.15, 0.012, 0.009, k === 8 ? '#d8302c' : '#9aa0aa', 0, -0.06 - k * 0.06, 0.002)); return g; }
// HUD: round minimap bottom-left + health bar, optional money counter top-right
function hud(g, t, o = {}) {
  const { at = 0, hp = 1, money = null, moneyAt = 0 } = o, u = U(), a = ease.out(prog(t, at, at + 0.35)); if (a <= 0) return;
  const r = 120 * u, x = 70 * u + r, y = E.H - 90 * u - r, s = 0.7 + 0.3 * ease.outBack(prog(t, at, at + 0.4));
  g.save(); g.globalAlpha = a; g.translate(x, y); g.scale(s, s);
  g.save(); g.beginPath(); g.arc(0, 0, r, 0, 7); g.clip(); g.fillStyle = '#2b3a33'; g.fillRect(-r, -r, 2 * r, 2 * r);
  g.rotate(0.35 + t * 0.03); g.strokeStyle = '#9aa4ae'; g.lineWidth = 16 * u; g.beginPath(); g.moveTo(-r * 1.4, r * 0.15); g.lineTo(r * 1.4, r * 0.15); g.stroke();
  g.lineWidth = 9 * u; for (const k of [-0.9, -0.2, 0.55]) { g.beginPath(); g.moveTo(k * r, -r * 1.3); g.lineTo(k * r, r * 1.3); g.stroke(); }
  g.fillStyle = '#4f8a5a'; g.fillRect(-r * 0.15, -r * 0.6, r * 0.32, r * 0.4); g.fillStyle = '#d8302c'; g.fillRect(r * 0.3, -r * 0.7, r * 0.25, r * 0.25); g.restore();
  g.strokeStyle = '#141218'; g.lineWidth = 10 * u; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke();
  g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(0, -18 * u); g.lineTo(13 * u, 14 * u); g.lineTo(0, 7 * u); g.lineTo(-13 * u, 14 * u); g.closePath(); g.fill();
  const bw = 2 * r, by = r + 22 * u; g.fillStyle = 'rgba(20,18,24,.7)'; rr(g, -r, by, bw, 18 * u, 6 * u); g.fill();
  g.fillStyle = '#5fd36a'; rr(g, -r + 3 * u, by + 3 * u, (bw - 6 * u) * clamp(hp), 12 * u, 4 * u); g.fill(); g.restore();
  if (money != null) { const m = ease.out(prog(t, moneyAt, moneyAt + 0.3)); if (m > 0) { const n = Math.round(money * ease.inOut(prog(t, moneyAt, moneyAt + 0.9)));
    text(g, '$' + n.toLocaleString('en-US'), E.W - 90 * u, 110 * u, { size: 84 * u, font: FONTS.ui, weight: 900, color: '#8fe08a', align: 'right', alpha: m, stroke: 12 * u, strokeColor: '#141218' }); } }
}
// small dated tag (top-left)
function tag(g, t, str, at = 0.2) { const u = U(), a = ease.out(prog(t, at, at + 0.3)); if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = `900 ${44 * u}px "${FONTS.ui}"`;
  const w = g.measureText(str).width + 48 * u; g.fillStyle = 'rgba(20,18,24,.78)'; rr(g, 60 * u, 60 * u, w, 72 * u, 14 * u); g.fill();
  text(g, str, 60 * u + w / 2, 97 * u, { size: 44 * u, font: FONTS.ui, weight: 900, color: '#ffd23a', align: 'center' }); g.restore(); }
// five wanted stars over a figure's head (3D, always facing the camera)
function stars(st, n = 5) { const g = new THREE.Group(); const list = []; for (let i = 0; i < n; i++) { const m = starMesh(0.11); g.add(m); list.push(m); } st.add(g); return { g, list }; }
function placeStars(S, f, cam3, t, at = 0, step = 0.22) { S.g.position.set(f.position.x, 2.08, f.position.z); S.g.lookAt(cam3.position.x, 2.08, cam3.position.z);
  S.list.forEach((m, i) => { const k = ease.outBack(prog(t, at + i * step, at + i * step + 0.25)); m.visible = k > 0; m.position.set((i - (S.list.length - 1) / 2) * 0.27, Math.sin(t * 3 + i) * 0.015, 0); m.scale.set(k, -k, k);
    m.material.color.setHSL(0.13, 1, 0.55 + 0.12 * Math.sin(t * 6 + i * 0.9)); }); }   // steady gold with a soft pulse (no white flicker)

// ---------- shots ----------
// k01 — the hospital doors slide open, Kip walks out holding a long bill
shot('k01', (st, s) => { SETS.miami(st, { hospital: true }); s.me = fig(st, ME, 0, -3.4, FACE_Z); s.bill = bill(); st.add(s.bill); s.doors = st.hospitalDoors; },
  (s, t, i, T) => { const k = ease.inOut(prog(t, 0.0, 0.7)); s.doors[0].position.x = -0.66 - 1.2 * k; s.doors[1].position.x = 0.66 + 1.2 * k;
    s.me.position.z = -3.4 + t * 1.0; const wp = walkPose(t * 5.2); s.me.setPose({ ...wp, shA: [62, 14], elA: 78, head: [0, -10] });   // walks out reading the bill held up in front expr(s.me, t, [[0, 'neutral'], [1.8, 'confused']]);   // walks out of the lobby the whole shot, no pose snaps
    held(s.bill, s.me, 'A', 0.28); s.bill.rotation.set(-0.35, Math.PI, 0.0);
    cam(T, s, t, i, C([3.4, 1.3, 8.6], [0, 2.3, -1.4]), C([2.2, 1.35, 6.2], [0, 1.6, -0.6])); },
  (g, t) => shout(g, t, '$5,000', { at: 2.1, x: E.W * 0.74, y: E.H * 0.3, size: V(110, 100), color: '#ff5a4a' }));

// k02 — flashback: Kip in the road, a city bus at 40 mph, red flash
shot('k02', (st, s) => { SETS.miami(st); s.me = fig(st, ME, 0.9, 3.6, 0); s.bus = bus(-40, 4, 0); st.add(s.bus); },
  (s, t, i, T) => { const hit = 2.0; s.bus.position.x = lerp(-40, -4.2, clamp(t / hit)); s.me.rotation.y = lerp(0, Math.PI * 0.95, ease.out(prog(t, 0.6, 1.2)));
    pose(s.me, t, [[0, 'stand'], [1.1, 'shocked']]); expr(s.me, t, [[0, 'happy'], [1.0, 'shocked']]);
    cam(T, s, t, i, C([7.5, 0.9, 7.6], [-4, 1.4, 3.8]), C([6.4, 0.8, 6.8], [-2, 1.4, 3.8])); },
  (g, t, i) => { shout(g, t, '40 MPH', { at: 0.5, y: E.H * 0.18, size: V(100, 92), dur: 2.0 }); bandFlash(g, t, 2.05, '#ff2a1a', 0.35);
    if (t > 2.05) { const k = clamp((t - 2.15) * 2.5); g.save(); g.fillStyle = alpha('#06080a', k); g.fillRect(0, 0, E.W, E.H);
      const u = U(), y = E.H * 0.55, x0 = E.W * 0.12, x1 = E.W * 0.88, head = lerp(x0, x1, clamp((t - 2.3) / 0.9)); g.strokeStyle = alpha('#5fff7a', k); g.lineWidth = 5 * u; g.shadowColor = '#5fff7a'; g.shadowBlur = 14 * u;
      g.beginPath(); g.moveTo(x0, y); const bx = x0 + (x1 - x0) * 0.25; if (head > bx) { g.lineTo(bx, y); g.lineTo(bx + 20 * u, y - 110 * u); g.lineTo(bx + 40 * u, y + 70 * u); g.lineTo(bx + 60 * u, y); } g.lineTo(head, y); g.stroke(); g.restore(); } });

// k03 — close-up: not a scratch; Kip pats his chest, confused
shot('k03', (st, s) => { SETS.miami(st, { hospital: true }); s.me = fig(st, ME, 0.3, 0.4, FACE_Z + 0.35); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand'], [1.0, { shA: [55, 20], elA: 110, shB: [50, 18], elB: 105, head: [0, -14] }], [2.2, 'shrug']]);
    expr(s.me, t, [[0, 'shocked'], [1.2, 'surprised'], [2.1, 'confused']]); const f = face(s.me, 2.0, 0.35, 1.45); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => shout(g, t, 'NO SCRATCH?', { at: 1.6, y: E.H * 0.86, size: V(96, 90), shake: 0 }));

// k04 — the nurse in the doorway, arms crossed, deadpan
shot('k04', (st, s) => { SETS.miami(st, { hospital: true }); st.hospitalDoors[0].position.x = -1.86; st.hospitalDoors[1].position.x = 1.86;
    s.nurse = fig(st, NURSE, 0, -1.2, FACE_Z + 0.25, 'crossArms', 'sleepy'); s.me = fig(st, ME, 2.05, 1.15, Math.PI / 2 + 0.75, 'stand', 'confused'); s.me.visible = false; },   // nurse alone in frame (no half head at the edge)
  (s, t, i, T) => { pose(s.nurse, t, [[0, 'crossArms'], [1.4, { shA: [30, 10], shB: [30, 10], elA: 115, elB: 115, head: [0, -6] }], [2.3, 'crossArms']]);
    expr(s.nurse, t, [[0, 'sleepy'], [2.2, 'smirk'], [3.6, 'sleepy']]); expr(s.me, t, [[0, 'confused']]);
    cam(T, s, t, i, C([2.1, 1.6, 2.6], [-0.2, 1.35, -1.2]), C([1.85, 1.58, 2.2], [-0.15, 1.38, -1.2])); });

// k05 — POV: a tiny map in the corner of your eye, the health bar refilling
shot('k05', (st, s) => { SETS.miami(st, { hospital: true }); },
  (s, t, i, T) => cam(T, s, t, i, C([5.0, 1.55, 1.3], [40, 1.6, 3.0]), C([5.8, 1.55, 1.3], [40, 1.5, 3.4])),
  (g, t, i) => { vignette(g, '#000', 0.35); hud(g, t, { at: 0.75, hp: lerp(0.35, 1, ease.inOut(prog(t, 3.1, 4.8))) }); });

// k06 — low angle: Kip on the sidewalk, five stars pop over his head; then it goes quiet
shot('k06', (st, s) => { SETS.miami(st, { hospital: true }); s.me = fig(st, ME, 7.4, 0.3, FACE_Z + 0.2); s.stars = stars(st); },   // clear of the planter palm
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand'], [2.4, { shA: [10, 14], shB: [10, 14], head: [0, 10] }]]); expr(s.me, t, [[0, 'smirk'], [2.5, 'worried']]);
    cam(T, s, t, i, C([9.1, 0.6, 3.3], [7.4, 1.75, 0.1]), C([8.55, 0.8, 2.4], [7.4, 1.8, 0.2])); placeStars(s.stars, s.me, s.stage.camera, t, 0.4); },
  (g, t) => { const d = ease.inOut(prog(t, 2.6, 4.2)); if (d > 0) { vignette(g, '#05060c', 0.75 * d); g.save(); g.globalAlpha = 0.35 * d; g.fillStyle = '#0a1020'; g.fillRect(0, 0, E.W, E.H); g.restore(); } });

// k07 — title: drone descends over Miami at sunset
shot('k07', (st, s) => { SETS.miami(st, { sunset: true }); s.me = fig(st, ME, 0, 0.2, FACE_Z); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand']]); T.drone(s.stage.camera, t, { target: [0, 1, 4], dur: i.dur, from: { h: 42, r: 52, a: -0.35 }, to: { h: 22, r: 32, a: 0.05 } }); },
  (g, t, i) => { vignette(g, '#0a0610', 0.55); g.save(); g.globalAlpha = 0.3; g.fillStyle = '#0a0610'; g.fillRect(0, 0, E.W, E.H); g.restore(); titleCard(g, t, { lines: ['WHAT IF', 'GTA 6 RULES WERE REAL LIFE?'], dur: i.dur }); }, { mood: 'sunset' });

// k08 — Day 1: Monday morning, Kip sits on the edge of his bed and blinks at the corner of his eye
shot('k08', (st, s) => { SETS.bedroom(st); s.me = fig(st, ME, -2.4, -1.85, FACE_Z, 'sit', 'sleepy'); s.me.position.y = 0.22; },
  (s, t, i, T) => { pose(s.me, t, [[0, 'sit'], [1.4, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [45, 12], elA: 100, shB: [20, 8], elB: 40, head: [10, 4] }]]);
    expr(s.me, t, [[0, 'sleepy'], [1.2, 'blink'], [1.6, 'surprised']]); cam(T, s, t, i, C([0.9, 1.45, 1.9], [-2.4, 0.95, -1.9]), C([0.3, 1.4, 1.3], [-2.4, 1.0, -1.9])); },
  (g, t) => tag(g, t, 'DAY 1 · MONDAY', 0.3), { mood: 'indoor' });

// k09 — POV in the bedroom: map, health bar, money counter = $312
shot('k09', (st, s) => { SETS.bedroom(st); },
  (s, t, i, T) => cam(T, s, t, i, C([-2.3, 1.15, -1.7], [2.5, 1.0, 1.5]), C([-2.2, 1.15, -1.6], [2.5, 1.0, 2.2])),
  (g, t) => { hud(g, t, { at: 0.2, hp: ease.out(prog(t, 2.4, 3.2)), money: 312, moneyAt: 3.6 }); }, { mood: 'indoor' });

// k10 — close-up: deadpan. "Rude."
shot('k10', (st, s) => { SETS.bedroom(st); s.me = fig(st, ME, -2.4, -1.85, FACE_Z + 0.25, 'sit', 'sleepy'); s.me.position.y = 0.22; },
  (s, t, i, T) => { pose(s.me, t, [[0, 'sit']]); expr(s.me, t, [[0, 'sleepy']]); const f = face(s.me, 1.35, 0.25, 1.3); cam(T, s, t, i, f); },
  (g, t) => shout(g, t, 'RUDE.', { at: 0.25, y: E.H * 0.84, size: V(110, 100), shake: 0 }), { mood: 'indoor' });
