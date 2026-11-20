// shots/_luckkit.js — generic 3D shot helper, props and 2D overlays for the rest of the Luck video.
import { registerShot, text, FONTS, alpha, rr, circle, rng } from '/engine/core.js';
import { fig, shot, cam, pose, expr, THREE, box, cyl, ball, E, ease, prog, clamp, lerp, SETS } from './_lib.js';
import { vehicle, picture } from '../toon/sets3d.js';
import { FACE_Z, U, basic } from './_luck.js';
export { bus, tree, steelBedProp } from './_luckalias.js';

// ---------- generic 3D shot: actors = [{ of, x, z, r, p: poseKeys, e: exprKeys, y (sit height, no snap) }] ----------
// o.fx(s, t, i, T) runs every frame after poses; o.build(st, s, T) adds props; a/b = camera start/end {pos, look}
export function S3(id, set, actors, a, b, overlay, o = {}) {
  shot(id, (st, s, T) => { (typeof set === 'function' ? set : SETS[set])(st, o.setOpts || {}); if (o.night) s.stage.time = 'night';
      s.A = actors.map((c) => { const f = fig(st, c.of, c.x, c.z, c.r ?? FACE_Z); if (c.y != null) { f.position.y = c.y; f.userData.noSnap = true; } return f; });
      if (o.build) o.build(st, s, T); },
    (s, t, i, T) => { actors.forEach((c, k) => { const f = s.A[k]; pose(f, t, c.p || [[0, 'stand']]); expr(f, t, c.e || [[0, 'neutral']]); if (c.y != null) f.position.y = c.y; });
      if (o.fx) o.fx(s, t, i, T); cam(T, s, t, i, a, b); if (o.after) o.after(s, t, i, T); },
    overlay, { mood: o.mood || 'sunny', fov: o.fov || 38 });
}
// 2D-only shot
export const S2 = (id, draw) => registerShot(id, { draw(g, t, info) { draw(g, t, info); } });

// ---------- props ----------
export function bowl() { const g = new THREE.Group(); g.add(cyl(0.09, 0.06, 0.06, '#f4f4f4', 0, 0.03, 0, { outline: 0.004 })); g.add(cyl(0.085, 0.085, 0.01, '#e8c070', 0, 0.055, 0)); return g; }
export function pizza() { const g = new THREE.Group(); const m = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.025, 3, 1, false, 0, Math.PI * 0.4), new THREE.MeshToonMaterial({ color: '#f2c050' })); g.add(m);
  g.add(ball(0.022, '#c8302c', 0.08, 0.016, 0.03)); g.add(ball(0.022, '#c8302c', 0.11, 0.016, 0.08)); return g; }
export function cutters() { const g = new THREE.Group(); g.add(box(0.7, 0.04, 0.04, '#c8302c', -0.2, 0, 0.04, { outline: 0.004 })); g.add(box(0.7, 0.04, 0.04, '#c8302c', -0.2, 0, -0.04, { outline: 0.004 }));
  g.add(box(0.2, 0.06, 0.12, '#8a8e98', 0.25, 0, 0, { outline: 0.004 })); return g; }
export function can(dent = 0) { const g = new THREE.Group(); const c = cyl(0.035, 0.035, 0.12, '#8a1a24', 0, 0, 0, { outline: 0.004 }); c.scale.x = 1 - dent * 0.3; g.add(c); g.add(cyl(0.032, 0.032, 0.006, '#c8c8d0', 0, 0.062, 0)); return g; }
export function slurpee() { const g = new THREE.Group(); g.add(cyl(0.05, 0.035, 0.16, '#e8453c', 0, 0, 0, { outline: 0.004 })); g.add(ball(0.05, '#3ac8ff', 0, 0.09, 0)); g.add(cyl(0.006, 0.006, 0.12, '#ffffff', 0.02, 0.14, 0)); return g; }
export function gun() { const g = new THREE.Group(); g.add(box(0.16, 0.05, 0.035, '#1e1e24', 0.05, 0, 0, { outline: 0.004 })); g.add(box(0.04, 0.09, 0.03, '#1e1e24', -0.02, -0.05, 0, { outline: 0.004 })); return g; }
export function wetSign(x, z) { const g = new THREE.Group(); const m = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.6, 4), new THREE.MeshToonMaterial({ color: '#ffd23a' })); m.position.y = 0.3; g.add(m); g.position.set(x, 0, z); return g; }
export function dog(c = '#c89a5a') { const g = new THREE.Group(); g.add(box(0.55, 0.22, 0.22, c, 0, 0.36, 0, { outline: 0.006 })); g.add(box(0.2, 0.18, 0.18, c, 0.33, 0.5, 0, { outline: 0.006 })); g.add(box(0.1, 0.07, 0.11, '#8a6a3a', 0.46, 0.46, 0));
  g.add(ball(0.02, '#141418', 0.43, 0.55, 0.06)); g.add(ball(0.02, '#141418', 0.43, 0.55, -0.06)); for (const s of [-1, 1]) g.add(box(0.05, 0.1, 0.03, '#8a6a3a', 0.3, 0.62, s * 0.07));
  const legs = []; for (const [lx, lz] of [[0.2, 0.08], [0.2, -0.08], [-0.2, 0.08], [-0.2, -0.08]]) { const l = box(0.05, 0.26, 0.05, c, lx, 0.13, lz, { outline: 0.004 }); legs.push(l); g.add(l); }
  const tail = box(0.18, 0.04, 0.04, c, -0.34, 0.5, 0); tail.rotation.z = 0.7; g.add(tail);
  const rolex = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.016, 6, 16), basic('#ffd23a')); rolex.position.set(0.52, 0.45, 0); g.add(rolex); g.userData = { legs, tail, rolex }; return g; }
export const trot = (d, t) => { d.userData.legs.forEach((l, k) => { l.rotation.z = Math.sin(t * 12 + (k === 0 || k === 3 ? Math.PI : 0)) * 0.5; }); d.userData.tail.rotation.x = Math.sin(t * 14) * 0.5; };
export const suv = (x, z, r = 0) => vehicle(x, z, r, { body: '#15161c', cab: '#15161c', van: true, win: '#2a3040', len: 4.8, h: 1.9 });
export function sign3(str, w, h, x, y, z, bg = '#e8302c', fg = '#ffffff', rotY = 0) { return picture(w, h, (g, W, H) => { g.fillStyle = bg; g.fillRect(0, 0, W, H); g.fillStyle = fg; let fs = 160; do { g.font = '900 ' + fs + 'px Nunito'; fs -= 4; } while (g.measureText(str).width > W * 0.9 && fs > 20); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(str, W / 2, H / 2 + 2); }, x, y, z, rotY); }
// convenience store front facing +z, centred at x, wall at z
export function storeFront(st, x = 0, z = -6.2) { const g = new THREE.Group(); g.add(box(10, 4, 0.4, '#e8e4dc', 0, 2, 0, { outline: 0.012 })); g.add(box(10.2, 0.9, 0.5, '#e8302c', 0, 3.6, 0.1, { outline: 0.01 }));
  g.add(box(4, 2.2, 0.05, '#9fd0f0', -2.4, 1.3, 0.22, { cast: false })); g.add(box(1.4, 2.3, 0.06, '#7fb0d0', 1.5, 1.15, 0.22, { cast: false })); g.add(sign3('SPEEDWAY', 4.5, 0.7, 0, 3.6, 0.37));
  g.position.set(x, 0, z); st.add(g); return g; }
export const SUIT = { top: 'suit', color: '#1e2028', hair: 'none', glasses: true, legs: '#1e2028' };
export const ROBBER = { top: 'hoodie', color: '#2a2e3a', skin: '#141418', legs: '#3a3a44' };

// ---------- 2D overlays ----------
// TV news frame: headline in a red lower third; draw(g, t, x, y, w, h) paints the picture inside the screen
export function tv(g, t, headline, sub, draw, o = {}) { const u = U(), W = E.W * 0.78, H = W * 9 / 16, x = (E.W - W) / 2, y = (E.H - H) / 2 - 20 * u;
  g.fillStyle = '#1a1612'; g.fillRect(0, 0, E.W, E.H); g.fillStyle = '#2a2420'; rr(g, x - 30 * u, y - 30 * u, W + 60 * u, H + 60 * u, 30 * u); g.fill();
  g.save(); rr(g, x, y, W, H, 12 * u); g.clip(); g.fillStyle = o.bg || '#3a5a8a'; g.fillRect(x, y, W, H); if (draw) draw(g, t, x, y, W, H);
  const k = ease.out(prog(t, 0.3, 0.7)); g.fillStyle = '#c8102e'; g.fillRect(x, y + H * 0.74, W * k, H * 0.14); g.fillStyle = '#141418'; g.fillRect(x, y + H * 0.88, W * k, H * 0.08);
  text(g, headline, x + 30 * u, y + H * 0.81 + 4 * u, { size: H * 0.075, font: FONTS.ui, weight: 900, color: '#ffffff', alpha: k, align: 'left' });
  if (sub) text(g, sub, x + 30 * u, y + H * 0.92 + 2 * u, { size: H * 0.04, font: FONTS.ui, weight: 800, color: '#ffd23a', alpha: k, align: 'left' });
  text(g, 'LIVE', x + 50 * u, y + 50 * u, { size: 36 * u, font: FONTS.ui, weight: 900, color: '#ff3a3a' }); g.restore(); }
// floating "LUCK ×N" multiplier (top-right)
export function mult(g, t, str, at = 0.2) { const u = U(), a = ease.outBack(prog(t, at, at + 0.35)); if (a <= 0) return; g.save(); g.translate(E.W - 230 * u, 130 * u); g.scale(a, a);
  text(g, 'LUCK', 0, -52 * u, { size: 34 * u, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center', stroke: 6 * u, strokeColor: '#141218' });
  text(g, str, 0, 18 * u, { size: 78 * u, font: FONTS.ui, weight: 900, color: '#ffd23a', align: 'center', stroke: 11 * u, strokeColor: '#141218' }); g.restore(); }
// 2D coin spin landing on H / T
export function coin(g, t, x, y, r, face = 'H', at = 0, dur = 0.8) { if (t < at) return; const k = prog(t, at, at + dur), sx = k < 1 ? Math.abs(Math.cos(k * 18)) : 1, yy = y - Math.sin(k * Math.PI) * r * 2.2;
  g.save(); g.translate(x, yy); g.scale(Math.max(0.08, sx), 1); circle(g, 0, 0, r, '#c8902a'); circle(g, 0, 0, r * 0.84, '#f6d26a');
  if (k >= 1) text(g, face, 0, r * 0.3, { size: r * 0.95, font: FONTS.ui, weight: 900, color: '#8a5a14', align: 'center' }); g.restore(); }
export function bill50(g, x, y, s, rot = 0, a = 1) { const u = U(); g.save(); g.globalAlpha = a; g.translate(x, y); g.rotate(rot); g.fillStyle = '#7fbf7a'; rr(g, -s, -s * 0.45, 2 * s, 0.9 * s, 8 * u); g.fill(); g.strokeStyle = '#3a7a3a'; g.lineWidth = 5 * u; rr(g, -s * 0.9, -s * 0.36, 1.8 * s, 0.72 * s, 6 * u); g.stroke();
  text(g, '$50', 0, s * 0.14, { size: s * 0.42, font: FONTS.ui, weight: 900, color: '#1f5a2a', align: 'center' }); g.restore(); }
export function note(g, t, lines, x, y, at = 0, o = {}) { const { rot = -0.05, bg = '#ffe86a', w = 560, h = 360, size = 56, col = '#2a2a34' } = o, u = U(), k = ease.outBack(prog(t, at, at + 0.35)); if (k <= 0) return; g.save(); g.translate(x, y); g.rotate(rot); g.scale(k, k);
  g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(-w * u / 2 + 12 * u, -h * u / 2 + 14 * u, w * u, h * u); g.fillStyle = bg; g.fillRect(-w * u / 2, -h * u / 2, w * u, h * u);
  lines.forEach((l, i) => text(g, l, 0, -h * u * 0.5 + (i + 1) * h * u / (lines.length + 1) + size * u * 0.3, { size: size * u, font: FONTS.ui, weight: 900, color: col, align: 'center' })); g.restore(); }
// golden light flowing from a to b (screen points), k 0..1
export function flow(g, t, a, b, k, col = '#ffd23a', n = 50) { if (k <= 0) return; const u = U(), r = rng(9); g.save(); g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) { const ph = (t * 0.7 + r()) % 1; if (ph > k) continue; const x = lerp(a[0], b[0], ph) + Math.sin(ph * 9 + i) * 40 * u, y = lerp(a[1], b[1], ph) - Math.sin(ph * Math.PI) * 120 * u;
    circle(g, x, y, (6 + r() * 8) * u, alpha(col, 0.65 * Math.sin(ph * Math.PI))); } g.restore(); }
export function rain(g, t, a = 0.6, seed = 3) { const u = U(), r = rng(seed); g.save(); g.strokeStyle = alpha('#bcd4ff', a); g.lineWidth = 2 * u;
  for (let i = 0; i < 160; i++) { const x = (r() * E.W + t * 80 * u) % E.W, y = (r() * E.H + t * 1400 * u * (0.7 + r() * 0.3)) % E.H; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 8 * u, y + 34 * u); g.stroke(); } g.restore(); }
// lightning bolt from (x, y0) down to (x2, y1)
export function bolt(g, t, x, y0, x2, y1, at, dur = 0.35, seed = 2) { const k = 1 - clamp((t - at) / dur); if (t < at || k <= 0) return; const u = U(), r = rng(seed); g.save(); g.globalCompositeOperation = 'lighter';
  g.strokeStyle = alpha('#eaf2ff', k); g.lineWidth = 9 * u; g.shadowColor = '#9fc4ff'; g.shadowBlur = 30 * u; g.beginPath(); g.moveTo(x, y0);
  for (let i = 1; i <= 9; i++) { const f = i / 9; g.lineTo(lerp(x, x2, f) + (i < 9 ? (r() - 0.5) * 90 * u : 0), lerp(y0, y1, f)); } g.stroke(); g.restore(); }
// simple playing card
export function pcard(g, x, y, h, label, red, a = 1, rot = 0) { const u = U(), w = h * 0.7; g.save(); g.globalAlpha = a; g.translate(x, y); g.rotate(rot); g.fillStyle = '#ffffff'; rr(g, -w / 2, -h / 2, w, h, 16 * u); g.fill(); g.strokeStyle = '#c8c8d0'; g.lineWidth = 4 * u; g.stroke();
  text(g, label, 0, h * 0.12, { size: h * 0.32, font: FONTS.ui, weight: 900, color: red ? '#d8202c' : '#141418', align: 'center' }); g.restore(); }
