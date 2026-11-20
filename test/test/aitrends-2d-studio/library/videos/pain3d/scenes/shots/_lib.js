// shots/_lib.js — shared helpers for "What If You Felt Zero Pain": shot wrapper, props (steel bed, pan, lego), kitchen set, 2D overlays.
import * as THREE from 'three';
import { E, V, registerShot, ease, prog, clamp, lerp, rng, circle, glow, alpha, text, FONTS } from '/engine/core.js';
import { toonFigure } from '../toon/toon.js';
import { SETS, M, box, cyl, ball, light, window3 } from '../toon/sets3d.js';
import { HERO, FRIEND } from '../toon/cast3d.js';

export const ME = HERO;            // Leo — red cap, teal hoodie (fixed)
export const JAY = FRIEND;         // Jay — orange hoodie
export const fig = (st, of, x, z, rotY = 0, pose = 'stand', expr = 'neutral') => { const f = toonFigure(of, { pose, expr }); f.position.set(x, 0, z); f.rotation.y = rotY; st.add(f); return f; };
export const shot = (id, build, anim, overlay, o = {}) => registerShot(id, { kind: '3d',
  init(T, info) { const st = T.stage({ mood: o.mood || 'sunny', fov: o.fov || 38, fog: false }); const s = { stage: st, T }; build(st, s, T); return s; },
  draw(s, t, info, T) { anim(s, t, info, T); }, overlay: overlay ? (g, t, info, s) => overlay(g, t, info, s) : undefined });
// close-up camera in front of a figure (figures face +x rotated by rotY)
export const face = (f, back = 1.15, side = 0.35, h = 1.47) => { const a = f.rotation.y; return { pos: [f.position.x + Math.cos(a) * back + Math.sin(a) * side, h, f.position.z - Math.sin(a) * back + Math.cos(a) * side], look: [f.position.x, h - 0.02, f.position.z] }; };
export const fwd = (f) => [Math.cos(f.rotation.y), -Math.sin(f.rotation.y)];
const _v = new THREE.Vector3();
export function handPos(f, side = 'A') { f.updateMatrixWorld(true); f.parts.arms[side].hand.getWorldPosition(_v); return [_v.x, _v.y, _v.z]; }

// ---------- props ----------
// steel bed: footboard (posts + rails) at x = x0 facing -x, mattress running toward +x
export function steelBed(st, x0 = 0.9, z0 = -0.3, len = 2.1, wid = 1.3) {
  const g = new THREE.Group(), steel = '#8a96a8';
  for (const z of [-wid / 2, wid / 2]) { g.add(cyl(0.035, 0.035, 0.95, steel, 0, 0.475, z, { outline: 0.006 })); g.add(cyl(0.035, 0.035, 0.75, steel, len, 0.375, z, { outline: 0.006 })); g.add(box(len, 0.06, 0.05, steel, len / 2, 0.3, z, { outline: 0.006 })); }
  for (const y of [0.1, 0.9]) g.add(cyl(0.03, 0.03, wid, steel, 0, y, 0, { rot: [Math.PI / 2, 0, 0], outline: 0.006 }));
  for (let k = 1; k < 6; k++) g.add(cyl(0.015, 0.015, 0.8, steel, 0, 0.5, -wid / 2 + (k * wid) / 6));
  g.add(box(len - 0.1, 0.22, wid - 0.08, '#f4f4f4', len / 2, 0.44, 0, { outline: 0.01 })); g.add(box(len * 0.55, 0.06, wid - 0.06, '#3a5ad8', len * 0.4, 0.57, 0));
  g.add(box(0.45, 0.14, wid * 0.7, '#ffffff', len - 0.35, 0.62, 0, { outline: 0.008 }));
  g.position.set(x0, 0, z0); st.add(g); return g;
}
export function pan() { const g = new THREE.Group(); g.add(cyl(0.16, 0.13, 0.06, '#2a2a34', 0, 0.03, 0, { outline: 0.008 })); g.add(cyl(0.14, 0.14, 0.005, '#c8902a', 0, 0.062, 0)); g.add(box(0.26, 0.03, 0.04, '#1a1a20', 0.28, 0.05, 0, { outline: 0.005 })); return g; } // handle toward +x
export function lego(x, z) { const g = new THREE.Group(); g.add(box(0.16, 0.06, 0.08, '#e8302c', 0, 0.03, 0, { outline: 0.004 })); for (const a of [-0.06, -0.02, 0.02, 0.06]) for (const b of [-0.02, 0.02]) g.add(cyl(0.012, 0.012, 0.02, '#e8302c', a, 0.07, b)); g.position.set(x, 0, z); return g; }
// put a pan in a figure's hand: handle end at the hand, pan out in front
export function holdPan(p, f, side = 'A') { const h = handPos(f, side), [fx, fz] = fwd(f); p.position.set(h[0] + fx * 0.3, h[1] - 0.05, h[2] + fz * 0.3); p.rotation.set(0, f.rotation.y + Math.PI, 0); }

export const kitchen = (st) => SETS.kitchen(st);

// ---------- 2D overlays ----------
export function impact(g, t, x, y, r, at = 0, col = '#ffd23a') {
  const k = prog(t, at, at + 0.35); if (t < at || k >= 1) return; const s = ease.out(k) * r, a = 1 - k * k;
  g.save(); g.translate(x, y); g.fillStyle = alpha(col, a); g.strokeStyle = alpha('#ffffff', a); g.lineWidth = r * 0.06; g.beginPath();
  for (let i = 0; i < 20; i++) { const ang = (i / 20) * Math.PI * 2, rr = i % 2 ? s * 0.45 : s; g.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr); } g.closePath(); g.fill(); g.stroke();
  g.restore(); glow(g, x, y, r * 1.4, '#ffffff', 0.5 * a);
}
// comic shout text (white, black stroke, pop + shake)
export function shout(g, t, str, o = {}) {
  const { x = E.W / 2, y = E.H * 0.2, size = V(120, 110), at = 0, color = '#ffffff', dur = 99, shake = 1 } = o;
  const a = ease.out(prog(t, at, at + 0.12)) * clamp((dur - t) / 0.2); if (a <= 0) return;
  const sc = 0.6 + 0.4 * ease.outBack(prog(t, at, at + 0.3)), j = shake * Math.sin(t * 60) * size * 0.02 * (1 - prog(t, at, at + 0.6));
  g.save(); g.translate(x + j, y); g.rotate(-0.04); g.scale(sc, sc);
  text(g, str, 0, 0, { size, color, font: FONTS.ui, weight: 900, align: 'center', alpha: a, stroke: size * 0.16, strokeColor: '#141218' }); g.restore();
}
// rising steam / smoke wisps from a screen point
export function steam(g, t, x, y, w, amt = 1, col = '#ffffff', seed = 3) {
  if (amt <= 0) return; const r = rng(seed); g.save();
  for (let i = 0; i < 26; i++) { const ph = (t * (0.5 + r() * 0.5) + r()) % 1, ox = (r() - 0.5) * w, rad = w * (0.08 + 0.18 * ph);
    circle(g, x + ox + Math.sin(t * 2 + i) * w * 0.15 * ph, y - ph * w * 2.2, rad, alpha(col, 0.32 * amt * Math.sin(ph * Math.PI))); }
  g.restore();
}
// pain meter (vertical bar) — fills to `v` (0..1) and shows the % reading
export function meter(g, t, v, o = {}) {
  const { x = E.W - V(180, 140), y = E.H * 0.24, h = E.H * 0.5, w = V(56, 60), at = 0.1, label = 'PAIN' } = o;
  const a = ease.out(prog(t, at, at + 0.3)); if (a <= 0) return; g.save(); g.globalAlpha = a;
  g.fillStyle = 'rgba(20,18,24,.55)'; g.fillRect(x - w / 2 - 8, y - 8, w + 16, h + 16); g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(x - w / 2, y, w, h);
  const fh = h * v; const gr = g.createLinearGradient(0, y + h, 0, y); gr.addColorStop(0, '#ffd23a'); gr.addColorStop(1, '#e8302c'); g.fillStyle = gr; g.fillRect(x - w / 2, y + h - fh, w, fh);
  text(g, label, x, y - V(40, 40), { size: V(36, 38), font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center', stroke: 6, strokeColor: '#141218' });
  text(g, `${Math.round(v * 100)}%`, x, y + h + V(52, 52), { size: V(48, 50), font: FONTS.ui, weight: 900, color: v < 0.05 ? '#6fe6ff' : '#ff5a4a', align: 'center', stroke: 7, strokeColor: '#141218' });
  g.restore();
}
export { THREE, E, V, ease, prog, clamp, lerp, SETS, box, cyl, ball };

// ---------- compact shot DSL ----------
import { posesAt as _posesAt, breathe as _breathe, POSE as _POSE } from '../toon/toon.js';
import { screen as _screen } from '../toon/fx.js';
export { _POSE as POSE, _screen as screen };
// pose keys [[t, 'name' | {...}], ...] with breathing
export const pose = (f, t, keys, dur = 0.3) => f.setPose(_breathe(_posesAt(t, keys.map(([k, p]) => [k, typeof p === 'string' ? _POSE[p] : { ..._POSE.stand, ...p }]), dur), t, f.position.x));
// expression keys [[t, 'expr'], ...]
export const expr = (f, t, keys) => { let e = keys[0][1]; for (const k of keys) if (t >= k[0]) e = k[1]; f.act(t, e); };
export const cam = (T, s, t, i, a, b) => T.dolly(s.stage.camera, t, [[0, a], [i.dur, b || a]]);
export const push = (c, k = 0.15) => ({ pos: c.pos.map((v, j) => v + (c.look[j] - v) * k), look: c.look });
export const C = (pos, look) => ({ pos, look });
// lie a figure on its back (k 0..1)
export const lie = (f, k) => { f.rotation.z = (k * Math.PI) / 2; f.position.y = 0.17 * k; };
export const scr = (s, p) => _screen(s.stage.camera, p);
export const headOf = (f) => [f.position.x, f.position.y + 1.47, f.position.z];

// ---------- more overlays ----------
export function snow(g, t, n = 120, a = 0.8, seed = 9) { const r = rng(seed); g.save(); for (let i = 0; i < n; i++) { const x = (r() * E.W + Math.sin(t * 0.8 + i) * 30 + t * 20) % E.W, y = (r() * E.H + t * (40 + r() * 60) * E.H / 1080) % E.H; circle(g, x, y, (1.5 + r() * 3) * E.H / 1080, alpha('#ffffff', a * (0.4 + r() * 0.6))); } g.restore(); }
export function embers(g, t, n = 60, a = 0.9, seed = 4) { const r = rng(seed); g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < n; i++) { const ph = (t * (0.15 + r() * 0.25) + r()) % 1, x = r() * E.W + Math.sin(t * 2 + i) * 20, y = E.H * (1.05 - ph * 1.1); circle(g, x, y, (2 + r() * 3) * E.H / 1080, alpha(i % 3 ? '#ff8a2a' : '#ffd84a', a * Math.sin(ph * Math.PI))); } g.restore(); }
export function smoke(g, t, x, y, w, amt = 1, seed = 5) { steam(g, t * 0.6, x, y, w, amt * 1.6, '#24222a', seed); }
export function heat(g, t, a = 0.25) { g.save(); const gr = g.createRadialGradient(E.W / 2, E.H / 2, E.H * 0.3, E.W / 2, E.H / 2, E.H * 0.95); gr.addColorStop(0, 'rgba(255,120,40,0)'); gr.addColorStop(1, `rgba(255,80,20,${a * (0.85 + 0.15 * Math.sin(t * 9))})`); g.fillStyle = gr; g.fillRect(0, 0, E.W, E.H); g.restore(); }
export function vignette(g, col = '#000', a = 0.45) { g.save(); const gr = g.createRadialGradient(E.W / 2, E.H / 2, E.H * 0.35, E.W / 2, E.H / 2, E.H); gr.addColorStop(0, alpha(col, 0)); gr.addColorStop(1, alpha(col, a)); g.fillStyle = gr; g.fillRect(0, 0, E.W, E.H); g.restore(); }
export function tears(g, t, x, y, r, at = 0) { if (t < at) return; for (let i = 0; i < 4; i++) { const ph = ((t - at) * 0.9 + i * 0.25) % 1; for (const sx of [-1, 1]) { const px = x + sx * r * 0.45, py = y + ph * r * 1.6; g.save(); g.fillStyle = alpha('#7fd0ff', 0.9 * (1 - ph)); g.beginPath(); g.ellipse(px, py, r * 0.05, r * 0.08, 0, 0, 7); g.fill(); g.restore(); } } }
export function drips(g, t, x, y, h, at = 0, col = '#c8102e') { if (t < at) return; for (let i = 0; i < 5; i++) { const k = clamp((t - at - i * 0.25) * 0.8); const px = x + (i - 2) * h * 0.06; g.save(); g.strokeStyle = col; g.lineWidth = h * 0.025; g.lineCap = 'round'; g.beginPath(); g.moveTo(px, y); g.lineTo(px, y + h * 0.35 * k); g.stroke(); circle(g, px, y + h * 0.35 * k, h * 0.022, col); g.restore(); } }
export function cone(g, x, y, ang, len, spread, a = 0.35, col = '#fff6c8') { g.save(); g.globalCompositeOperation = 'lighter'; const gr = g.createRadialGradient(x, y, 0, x, y, len); gr.addColorStop(0, alpha(col, a)); gr.addColorStop(1, alpha(col, 0)); g.fillStyle = gr; g.beginPath(); g.moveTo(x, y); g.arc(x, y, len, ang - spread, ang + spread); g.closePath(); g.fill(); g.restore(); }
export function bandFlash(g, t, at, col = '#ffffff', dur = 0.3) { const k = 1 - clamp(Math.abs(t - at) / dur); if (k > 0) { g.save(); g.globalAlpha = k * k * 0.8; g.fillStyle = col; g.fillRect(0, 0, E.W, E.H); g.restore(); } }
export function pepper() { const g = new THREE.Group(); g.add(ball(0.035, '#e8401a', 0, 0, 0, { outline: 0.004 })); g.children[0].scale.set(1, 1.5, 1); g.add(cyl(0.006, 0.006, 0.03, '#3a8a3a', 0, 0.06, 0)); return g; }
export const held = (p, f, side = 'A', dy = 0) => { const h = handPos(f, side); p.position.set(h[0], h[1] + dy, h[2]); };
export const ballMesh = (c = '#e8453c', r = 0.11) => ball(r, c, 0, 0, 0, { outline: 0.006 });
