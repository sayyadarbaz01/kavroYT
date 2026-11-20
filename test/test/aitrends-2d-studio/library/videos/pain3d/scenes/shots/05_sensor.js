// shots/05_sensor.js — 3:07–3:49: Jay becomes Leo's full-time human sensor; the wristband.
import { ME, JAY, fig, shot, face, pose, expr, cam, push, C, scr, headOf, handPos, shout, cone, held, POSE, THREE, E, V, ease, prog, clamp, lerp, SETS, box, cyl } from './_lib.js';
import { walkPose } from '../toon/toon.js';
import { label } from '../toon/fx.js';
import { glow as glow2, wordTime } from '/engine/core.js';
import { card, title, stamp, check, U, text, FONTS, rr, circle, alpha } from './_info.js';

// suburb two-shot: Leo (-0.7) facing +x, Jay (0.7) facing -x
function duo(st, s) { SETS.suburb(st); s.me = fig(st, ME, -0.7, 0.6, 0); s.jay = fig(st, JAY, 0.7, 0.6, Math.PI); }
function hazard(g, x, y, r) { g.save(); g.fillStyle = '#ffd23a'; g.strokeStyle = '#141218'; g.lineWidth = r * 0.1; g.beginPath(); g.moveTo(x, y - r); g.lineTo(x + r * 1.1, y + r * 0.8); g.lineTo(x - r * 1.1, y + r * 0.8); g.closePath(); g.fill(); g.stroke(); text(g, '!', x, y + r * 0.15, { size: r * 1.2, font: FONTS.ui, weight: 900, color: '#141218' }); g.restore(); }

shot('f01', (st, s) => duo(st, s),
  (s, t, i, T) => { pose(s.jay, t, [[0, 'crossArms'], [1.6, 'think']]); expr(s.jay, t, [[0, 'worried']]); pose(s.me, t, [[0, 'relaxed']]); expr(s.me, t, [[0, 'happy']]); const f = face(s.jay, 1.6, 0.9, 1.4); cam(T, s, t, i, f, push(f, 0.12)); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, headOf(s.me)); const k = ease.outBack(prog(t, 0.7, 1.1)); if (k > 0) hazard(g, x, y - ppm * 0.6, ppm * 0.25 * k); label(g, t, 'WALKING HAZARD', { at: 0.9, color: '#ffd23a' }); });

shot('f02', (st, s) => duo(st, s),
  (s, t, i, T) => { pose(s.jay, t, [[0, 'relaxed'], [0.4, { shA: [60, 70], elA: 145 }]]); expr(s.jay, t, [[0, 'determined']]); const f = face(s.jay, 1.3, -0.2); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => { const u = U(), y = (t * 0.6 % 1) * E.H; g.save(); g.fillStyle = 'rgba(111,230,255,.18)'; g.fillRect(0, y - 6 * u, E.W, 12 * u); g.restore(); const k = ease.outBack(prog(t, 0.6, 1.0));
    if (k > 0) { g.save(); g.translate(E.W * 0.78, E.H * 0.3); g.scale(k, k); g.fillStyle = '#1f7a6a'; rr(g, -230 * u, -70 * u, 460 * u, 140 * u, 30 * u); g.fill(); g.strokeStyle = '#9ff2d8'; g.lineWidth = 6 * u; g.stroke(); text(g, 'HUMAN SENSOR', 0, 0, { size: 54 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); g.restore(); }
    label(g, t, 'FULL-TIME', { at: 0.3 }); });

// ---------- bedroom at night ----------
function flashlight() { const g = new THREE.Group(); g.add(cyl(0.025, 0.03, 0.18, '#3a3a48', 0, 0, 0, { rot: [0, 0, Math.PI / 2], outline: 0.004 })); g.add(cyl(0.04, 0.03, 0.04, '#d8d8e0', 0.1, 0, 0, { rot: [0, 0, Math.PI / 2] })); return g; }
function mirror() { const g = new THREE.Group(); g.add(cyl(0.08, 0.08, 0.012, '#d8d8e0', 0, 0, 0, { rot: [Math.PI / 2, 0, 0], outline: 0.004 })); g.add(cyl(0.065, 0.065, 0.014, '#cfefff', 0, 0, 0, { rot: [Math.PI / 2, 0, 0] })); g.add(cyl(0.012, 0.012, 0.12, '#3a3a48', 0, -0.13, 0)); return g; }
function room(st, s) { SETS.bedroom(st, { night: true }); s.me = fig(st, ME, -0.3, 0.6, 0); s.jay = fig(st, JAY, 1.0, 0.8, Math.PI); s.fl = flashlight(); st.add(s.fl); s.mi = mirror(); st.add(s.mi); s.nb = box(0.14, 0.02, 0.2, '#e8453c', 0, 0, 0, { outline: 0.004 }); st.add(s.nb); s.nb.visible = false; }
const props = (s) => { held(s.fl, s.jay, 'A'); s.fl.rotation.y = s.jay.rotation.y; held(s.mi, s.jay, 'B', 0.08); };

shot('f03', (st, s) => room(st, s),
  (s, t, i, T) => { pose(s.jay, t, [[0, 'stand'], [0.3, { shA: [60, 14], elA: 70 }], [1.4, { shA: [60, 14], elA: 70, shB: [60, 14], elB: 70 }]]); expr(s.jay, t, [[0, 'determined']]); props(s); s.mi.visible = t > 1.3; s.me.visible = false;
    const f = face(s.jay, 1.5, 0.1, 1.3); cam(T, s, t, i, f, push(f, 0.12)); },
  (g, t) => { label(g, t, 'MEDICAL FLASHLIGHT', { at: 0.4 }); label(g, t, '+ MIRROR', { at: 1.5, y: V(190, 230), size: V(48, 52) }); });

shot('f04', (st, s) => room(st, s),
  (s, t, i, T) => { pose(s.me, t, [[0, 'relaxed']]); s.me.act(t, 'neutral'); pose(s.jay, t, [[0, 'relaxed']]); props(s); cam(T, s, t, i, C([0.5, 1.7, 1.6], [0.3, 2.1, -3.4]), C([0.4, 1.8, 1.0], [0.3, 2.15, -3.4])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, [0.3, 2.2, -3.45]); const r = ppm * 0.35, u = U(); circle(g, x, y, r, '#f4f0e8'); g.save(); g.strokeStyle = '#141218'; g.lineWidth = r * 0.08; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke();
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; g.beginPath(); g.moveTo(x + Math.cos(a) * r * 0.85, y + Math.sin(a) * r * 0.85); g.lineTo(x + Math.cos(a) * r * 0.95, y + Math.sin(a) * r * 0.95); g.stroke(); }
    const mm = ease.inOut(prog(t, 0.2, 1.0)) * 0.999 - 0.25, ha = -Math.PI / 2 + (8 / 12) * Math.PI * 2; g.lineCap = 'round'; g.lineWidth = r * 0.1; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(ha) * r * 0.5, y + Math.sin(ha) * r * 0.5); g.stroke();
    g.lineWidth = r * 0.06; const ma = -Math.PI / 2 + (mm + 0.25 + 0.75) * Math.PI * 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(ma) * r * 0.8, y + Math.sin(ma) * r * 0.8); g.stroke(); g.restore();
    label(g, t, '8:00 PM', { at: 0.9 }); label(g, t, 'EVERY SINGLE NIGHT', { at: 1.3, y: V(190, 230), size: V(44, 48), color: '#ffd23a' }); });

shot('f05', (st, s) => room(st, s),
  (s, t, i, T) => { pose(s.me, t, [[0, { shA: [5, 80], elA: 10, shB: [5, 80], elB: 10 }]]); expr(s.me, t, [[0, 'neutral']]); pose(s.jay, t, [[0, { shA: [70, 10], elA: 20, head: [0, -6] }]]); expr(s.jay, t, [[0, 'determined']]); props(s); s.mi.visible = false;
    cam(T, s, t, i, C([0.4, 1.6, 3.4], [0.2, 0.9, 0.6]), C([0.3, 1.5, 2.8], [0.2, 0.9, 0.6])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, s.fl.position.toArray()); const [mx, my] = scr(s, [-0.3, 0.7 + 0.5 * Math.sin(t * 2.2), 0.6]); const ang = Math.atan2(my - y, mx - x); cone(g, x, y, ang, ppm * 2.2, 0.16, 0.45); label(g, t, 'FULL-BODY INSPECTION', { at: 0.4 }); });

shot('f06', (st, s) => room(st, s),
  (s, t, i, T) => { const spin = ease.inOut(prog(t, 0.1, 0.8)); s.me.rotation.y = spin * Math.PI; pose(s.me, t, [[0, 'stand'], [1.2, { shA: [10, 95], elA: 140, shB: [10, 95], elB: 140 }], [2.3, { shA: [10, 20], hipB: -45, knB: 90 }]], 0.25); expr(s.me, t, [[0, 'neutral'], [1.2, 'smirk']]);
    pose(s.jay, t, [[0, { shA: [70, 10], elA: 20 }]]); expr(s.jay, t, [[0, 'determined']]); props(s); s.mi.visible = false; cam(T, s, t, i, C([0.6, 1.5, 3.0], [-0.2, 0.9, 0.6]), C([0.4, 1.4, 2.6], [-0.2, 0.9, 0.6])); },
  (g, t) => { shout(g, t, 'TURN AROUND.', { at: 0.05, y: E.H * 0.86, size: V(64, 56), shake: 0, dur: 1.15 }); shout(g, t, 'SHOW ME YOUR ELBOWS.', { at: 1.2, y: E.H * 0.86, size: V(64, 56), shake: 0, dur: 2.35 }); shout(g, t, 'CHECK YOUR HEELS.', { at: 2.4, y: E.H * 0.86, size: V(64, 56), shake: 0 }); });

shot('f07', (st, s) => room(st, s),
  (s, t, i, T) => { pose(s.jay, t, [[0, { shA: [50, 14], elA: 100 + 8 * Math.sin(t * 9), shB: [45, 14], elB: 90, head: [0, -16] }]]); expr(s.jay, t, [[0, 'determined']]); s.fl.visible = s.mi.visible = false; s.nb.visible = true; held(s.nb, s.jay, 'B', 0.02);
    const f = face(s.jay, 1.4, 0.4, 1.3); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => { const u = U(), x = E.W * 0.74, y = E.H * 0.22, w = 420 * u, h = 560 * u, k = ease.outBack(prog(t, 0, 0.35)); g.save(); g.translate(x + w / 2, y + h / 2); g.scale(k, k); g.translate(-w / 2, -h / 2); g.rotate(0.03);
    g.fillStyle = '#fffbea'; rr(g, 0, 0, w, h, 20 * u); g.fill(); g.strokeStyle = 'rgba(58,90,216,.3)'; g.lineWidth = 2 * u; for (let yy = 90 * u; yy < h; yy += 60 * u) { g.beginPath(); g.moveTo(20 * u, yy); g.lineTo(w - 20 * u, yy); g.stroke(); }
    text(g, "LEO'S SKIN LOG", w / 2, 50 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#e8453c' });
    [['SCRATCH', 0.2], ['BRUISE', 2.5], ['BURN', 3.9]].forEach(([str, at], k2) => { if (t > at) { text(g, str, 40 * u, 170 * u + k2 * 120 * u, { size: 56 * u, font: FONTS.ui, weight: 900, color: '#2a3a8a', align: 'left' }); check(g, t, w - 80 * u, 170 * u + k2 * 120 * u, 34 * u, at + 0.2, '#1fa38f'); } }); g.restore(); });

// f08 — the leather band: KEEP CHECK YOUR SKIN, LEO (each word stamps on the word)
card('f08', 'leather', (g, t, i, u, cx, cy) => { const w = 1500 * u, h = 260 * u, k = ease.out(prog(t, 0, 0.6));
  g.save(); g.translate(cx, cy + 20 * u); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.fillStyle = '#8a4a24'; rr(g, -w / 2, -h / 2, w, h, h * 0.3); g.fill(); g.strokeStyle = '#f2c890'; g.setLineDash([18 * u, 12 * u]); g.lineWidth = 5 * u; rr(g, -w / 2 + 22 * u, -h / 2 + 22 * u, w - 44 * u, h - 44 * u, h * 0.22); g.stroke(); g.setLineDash([]);
  g.fillStyle = '#c8c8d0'; rr(g, w / 2 - 120 * u, -50 * u, 70 * u, 100 * u, 12 * u); g.fill(); g.restore();
  const s0 = i.shot.start, words = ['KEEP', 'CHECK', 'YOUR', 'SKIN,', 'LEO'], wt = ['keep', 'check', 'your', 'skin', 'leo'].map((m, j) => (wordTime(m, s0 + 4.5) ?? s0 + 5 + j * 0.45) - s0);
  let x = cx - 560 * u; words.forEach((str, j) => { const ww = (str.length * 52 + 50) * u; if (t >= wt[j]) { const kk = ease.out(prog(t, wt[j], wt[j] + 0.18)); text(g, str, x + ww / 2, cy + 20 * u, { size: 96 * u * lerp(1.5, 1, kk), font: FONTS.ui, weight: 900, color: '#3a1a08', alpha: kk }); } x += ww; });
  title(g, t, 'A CUSTOM LEATHER BAND', 150 * u, { size: 70, at: 0.4, color: '#f2c890' }); });

shot('f09', (st, s) => duo(st, s),
  (s, t, i, T) => { s.jay.visible = false; pose(s.me, t, [[0, 'relaxed'], [0.3, 'wave']]); expr(s.me, t, [[0, 'happy']]); const f = face(s.me, 1.25, 0.3); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => shout(g, t, 'LEO', { at: 0.15, x: E.W * 0.78, y: E.H * 0.3, size: V(160, 140), shake: 0 }));

function band() { const m = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.018, 6, 16), new THREE.MeshToonMaterial({ color: '#8a4a24' })); return m; }
shot('f10', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, -2.5, 0.6, 0); s.b = band(); st.add(s.b); },
  (s, t, i, T) => { s.me.position.x = -2.5 + t * 1.1; const w = walkPose(t * 6.28 * 0.9); s.me.setPose(t > 1.6 ? { ...w, shA: [20, 150], elA: 30 } : w); expr(s.me, t, [[0, 'happy']]); held(s.b, s.me, 'A', 0.06); s.b.rotation.set(Math.PI / 2, 0, 0); const x = s.me.position.x;
    cam(T, s, t, i, C([x + 2.4, 1.4, 4.0], [x, 1.0, 0.6]), C([x + 1.8, 1.3, 3.4], [x, 1.0, 0.6])); },
  (g, t) => label(g, t, 'EVERYWHERE', { at: 0.3 }));

shot('f11', (st, s) => duo(st, s),
  (s, t, i, T) => { pose(s.me, t, [[0, 'relaxed'], [0.6, 'shrug']]); expr(s.me, t, [[0, 'smirk']]); pose(s.jay, t, [[0, 'crossArms']]); expr(s.jay, t, [[0, 'neutral'], [1.2, 'angry']]); cam(T, s, t, i, C([0, 1.5, 3.4], [0, 1.2, 0.6]), C([-0.1, 1.45, 2.9], [0, 1.2, 0.6])); },
  (g, t) => shout(g, t, 'WHAT ARE YOU... MY MOM?', { at: 0.2, y: E.H * 0.16, size: V(80, 70), shake: 0 }));

shot('f12', (st, s) => duo(st, s),
  (s, t, i, T) => { pose(s.jay, t, [[0, 'crossArms'], [0.8, 'point']]); expr(s.jay, t, [[0, 'angry']]); const f = face(s.jay, 1.2, -0.3); cam(T, s, t, i, f, push(f, 0.15)); },
  (g, t) => { shout(g, t, 'SOMEONE HAS TO!', { at: 0.15, y: E.H * 0.16, size: V(96, 84) }); label(g, t, '...BEFORE YOU BLOW UP YOUR OWN BODY', { at: 1.4, y: E.H - V(110, 160), size: V(44, 44) }); });
