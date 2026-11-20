// shots/_luck.js — shared props + overlays for the Luck video (watch macro, tags, props, generic 3D shot helper).
import { walkPose } from '../toon/toon.js';
import { registerShot, text, FONTS, alpha, rr, circle, rng } from '/engine/core.js';
import { ME, MOM, fig, shot, face, cam, C, push, pose, expr, held, bandFlash, vignette, shout, impact, smoke, scr, THREE, box, cyl, ball, E, V, ease, prog, clamp, lerp, SETS } from './_lib.js';
export const FACE_Z = -Math.PI / 2, FACE_NZ = Math.PI / 2, FACE_X = 0, FACE_NX = Math.PI;
export const U = () => E.H / 1080;
export const basic = (c, o = 1) => new THREE.MeshBasicMaterial({ color: c, transparent: o < 1, opacity: o, depthWrite: o >= 1 });
// ---------- 2D helpers ----------
export function tag(g, t, str, at = 0.2, col = '#ffd23a') { const u = U(), a = ease.out(prog(t, at, at + 0.3)); if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = `900 ${44 * u}px "${FONTS.ui}"`;
  const w = g.measureText(str).width + 48 * u; g.fillStyle = 'rgba(20,18,24,.78)'; rr(g, 60 * u, 60 * u, w, 72 * u, 14 * u); g.fill();
  text(g, str, 60 * u + w / 2, 97 * u, { size: 44 * u, font: FONTS.ui, weight: 900, color: col, align: 'center' }); g.restore(); }

// big brass watch face (macro close-up). sec = second-hand angle (radians, 0 = 12 o'clock), glow 0..1, engrave 0..1 shows the tiny "30" + scratch
export function watchFace(g, t, o = {}) {
  const u = U(), { x = E.W / 2, y = E.H / 2, R = E.H * 0.33, sec = 0, glowK = 0.5, engrave = 0, red = 0 } = o;
  g.save();
  // warm glow behind the case
  const gl = g.createRadialGradient(x, y, R * 0.6, x, y, R * 2.1); gl.addColorStop(0, alpha(red > 0.5 ? '#ff5a3a' : '#ffcf5a', 0.55 * glowK)); gl.addColorStop(1, alpha('#ffcf5a', 0)); g.fillStyle = gl; g.fillRect(0, 0, E.W, E.H);
  // strap
  g.fillStyle = '#3a2618'; g.fillRect(x - R * 0.42, y - R * 1.9, R * 0.84, R * 0.9); g.fillRect(x - R * 0.42, y + R, R * 0.84, R * 0.9);
  g.strokeStyle = '#24160c'; g.lineWidth = 6 * u; for (const k of [-1, 1]) { g.beginPath(); g.moveTo(x + k * R * 0.32, y - R * 1.9); g.lineTo(x + k * R * 0.32, y - R); g.moveTo(x + k * R * 0.32, y + R); g.lineTo(x + k * R * 0.32, y + R * 1.9); g.stroke(); }
  // brass case + crown
  g.fillStyle = '#9a7428'; g.fillRect(x + R * 1.02, y - R * 0.1, R * 0.16, R * 0.2);
  const cs = g.createLinearGradient(x - R, y - R, x + R, y + R); cs.addColorStop(0, '#f2d58a'); cs.addColorStop(0.5, '#c8a24a'); cs.addColorStop(1, '#7a5a1e');
  circle(g, x, y, R * 1.06, cs); circle(g, x, y, R * 0.94, '#5a4214');
  // dial
  const dl = g.createRadialGradient(x - R * 0.2, y - R * 0.25, R * 0.1, x, y, R); dl.addColorStop(0, '#fbf3df'); dl.addColorStop(1, '#e6d4ac'); circle(g, x, y, R * 0.9, dl);
  for (let i = 0; i < 60; i++) { const a = (i / 60) * Math.PI * 2, big = i % 5 === 0, r0 = R * (big ? 0.74 : 0.8), r1 = R * 0.86;
    g.strokeStyle = '#2a2016'; g.lineWidth = (big ? 7 : 2.5) * u; g.beginPath(); g.moveTo(x + Math.sin(a) * r0, y - Math.cos(a) * r0); g.lineTo(x + Math.sin(a) * r1, y - Math.cos(a) * r1); g.stroke(); }
  [['12', 0], ['3', 3], ['6', 6], ['9', 9]].forEach(([s, h]) => { const a = (h / 12) * Math.PI * 2; text(g, s, x + Math.sin(a) * R * 0.6, y - Math.cos(a) * R * 0.6 + R * 0.07, { size: R * 0.2, font: FONTS.ui, weight: 900, color: '#2a2016', align: 'center' }); });
  // engraving under the 6: a tiny "30" and a scratched line
  if (engrave > 0) { g.globalAlpha = engrave; text(g, '30', x, y + R * 0.3, { size: R * 0.12, font: FONTS.ui, weight: 900, color: '#8a2a1a', align: 'center' });
    g.strokeStyle = '#8a2a1a'; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(x - R * 0.13, y + R * 0.36); g.lineTo(x - R * 0.04, y + R * 0.345); g.lineTo(x + R * 0.05, y + R * 0.36); g.lineTo(x + R * 0.13, y + R * 0.35); g.stroke(); g.globalAlpha = 1; }
  // hands: hour, minute (fixed), second (given)
  const hand = (ang, len, w, col) => { g.strokeStyle = col; g.lineWidth = w * u; g.lineCap = 'round'; g.beginPath(); g.moveTo(x - Math.sin(ang) * len * 0.15, y + Math.cos(ang) * len * 0.15); g.lineTo(x + Math.sin(ang) * len, y - Math.cos(ang) * len); g.stroke(); };
  hand(-0.55, R * 0.42, 12, '#1e1810'); hand(1.95, R * 0.66, 8, '#1e1810'); hand(sec, R * 0.78, 3.5, red > 0.5 ? '#d8302c' : '#b8302a'); circle(g, x, y, 10 * u, '#1e1810');
  // glass shine
  g.globalAlpha = 0.22; g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(x - R * 0.32, y - R * 0.42, R * 0.45, R * 0.16, -0.6, 0, 7); g.fill();
  g.restore();
}
// dark gold background with drifting dust
export function darkGold(g, t, red = 0) { const u = U(), gr = g.createRadialGradient(E.W / 2, E.H / 2, 0, E.W / 2, E.H / 2, E.W * 0.7); gr.addColorStop(0, red ? '#2a0c0a' : '#2a1d0a'); gr.addColorStop(1, '#07050a'); g.fillStyle = gr; g.fillRect(0, 0, E.W, E.H);
  const r = rng(7); for (let i = 0; i < 50; i++) circle(g, (r() * E.W + t * 14 * u * (r() - 0.3)) % E.W, (r() * E.H - t * 10 * u * r() + E.H) % E.H, (1 + r() * 2.5) * u, alpha(red ? '#ff7a5a' : '#ffd88a', 0.22)); }
// second hand: ticks forward once a second; each entry in `back` makes it jump one tick BACKWARD at that time
export function secAngle(t, start = 0, back = []) { const fwd = Math.floor(t) + ease.outBack(clamp((t % 1) / 0.12)) - 1; let n = fwd + 1; for (const b of back) n -= 2 * ease.outBack(prog(t, b, b + 0.12)); return ((start + n) / 60) * Math.PI * 2; }

// ---------- 3D props ----------
export function ticket() { const g = new THREE.Group(); g.add(box(0.2, 0.11, 0.006, '#ffffff', 0, 0, 0, { outline: 0.003 })); g.add(box(0.2, 0.025, 0.007, '#d8302c', 0, 0.04, 0)); g.add(box(0.12, 0.012, 0.007, '#3a5ad8', 0, -0.01, 0)); return g; }
export function trafficLight(x, z) { const g = new THREE.Group(); g.add(cyl(0.07, 0.09, 4.2, '#3a3a44', 0, 2.1, 0)); g.add(box(0.12, 0.12, 2.2, '#3a3a44', 0, 4.1, 1.05));
  g.add(box(0.5, 1.4, 0.45, '#24242c', 0, 3.4, 2.05, { outline: 0.01 })); const mats = [];
  [['#ff3a2a', 3.82], ['#ffb82a', 3.4], ['#3aff6a', 2.98]].forEach(([c, y]) => { const m = basic('#2a2a30'); const s = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 10), m); s.position.set(0, y, 2.29); g.add(s); mats.push([m, c]); });
  g.userData.lamps = mats; g.position.set(x, 0, z); return g; }
export const setLamp = (L, i) => L.userData.lamps.forEach(([m, c], k) => m.color.set(k === i ? c : '#2a2a30'));
export function meteor() { const g = new THREE.Group(), core = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 12), basic('#fff0b0')), halo = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), basic('#ff8a2a', 0.55));
  g.add(core, halo); const trail = []; for (let i = 0; i < 12; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.36 * (1 - i / 13), 12, 8), basic(i < 4 ? '#ffb040' : '#ff6a2a', 0.6 * (1 - i / 12))); trail.push(m); g.add(m); }
  g.userData.trail = trail; return g; }
export function crater(x, z) { const g = new THREE.Group(); g.add(cyl(0.95, 0.7, 0.06, '#2e2a26', 0, 0.16, 0, { cast: false })); g.add(cyl(0.55, 0.4, 0.07, '#1a1614', 0, 0.17, 0, { cast: false }));
  const r = rng(5); for (let i = 0; i < 14; i++) { const a = r() * 7, d = 0.8 + r() * 0.5; g.add(ball(0.06 + r() * 0.08, '#4a4440', Math.cos(a) * d, 0.2, Math.sin(a) * d, { outline: 0.004 })); }
  g.add(ball(0.2, '#5a3a2a', 0.05, 0.25, 0, { outline: 0.008 })); g.position.set(x, 0, z); return g; }
export const shake = (cam3, t, at, amt = 0.06, dur = 0.6) => { const k = 1 - clamp((t - at) / dur); if (t < at || k <= 0) return; cam3.position.x += Math.sin(t * 71) * amt * k; cam3.position.y += Math.cos(t * 53) * amt * k; };

