// shots/_mirror.js — If Blaze "What If Humans Never Invented Mirrors?": cast (all adults), Gary, the room badge, 2D drawings for cards.
import { E, V, ease, prog, clamp, lerp, THREE, box, cyl, ball } from './_lib.js';
import { S } from './_spec.js';
import { card } from './_info.js';
import { caption, coversFace, text, FONTS, alpha, rr, glow } from './_rank.js';
import { circle, ring } from '/engine/core.js';
import { KIP } from '../toon/cast3d.js';
import { pigeon, animPigeon } from '../toon/sets_mirror.js';

export const FZ = -Math.PI / 2, FNZ = Math.PI / 2, FX = 0, FNX = Math.PI;
export const U = () => E.H / 1080;
export { KIP, pigeon, animPigeon, caption, text, FONTS, alpha, rr, glow, circle, ring };

// ---------- cast (all adults) ----------
export const KIPBAD = { ...KIP, cap: null, hair: 'spiky' };                                        // after the barber
export const LOUIS = { top: 'suit', color: '#2a3a8a', hair: 'curly', legs: '#e8e2d4', shoes: '#c8302c' };
export const BARBER = { top: 'tee', color: '#f2f2f2', hair: 'bun', glasses: true, legs: '#2a2a33' };
export const DESCRIBER = { top: 'suit', color: '#2a2a33', hair: 'pony', glasses: true, legs: '#2a2a33' };
export const FRIEND1 = { top: 'hoodie', color: '#f08a2a', hair: 'curly' };
export const FRIEND2 = { top: 'cardigan', color: '#8a6ad6', hair: 'bun', glasses: true };
export const DATE = { top: 'cardigan', color: '#c8506a', hair: 'pony', legs: '#2a2a33' };
export const TEACHER = { top: 'tee', color: '#2a2a33', hair: 'bun', legs: '#2a2a33' };
export const DANCERS = [{ top: 'tee', color: '#ff8ab0', hair: 'pony' }, { top: 'tee', color: '#5fe08a', hair: 'spiky' }, { top: 'tee', color: '#3a9ad8', hair: 'bun' }, { top: 'tee', color: '#ffd23f', hair: 'curly' }];
export const PHOTOG = { top: 'suit', color: '#6a4024', hair: 'spiky', glasses: true, cap: true, capColor: '#2a2a33' };
export const DENTIST = { top: 'labcoat', glasses: true, hair: 'bun' };
export const LIFTER = { top: 'tee', color: '#c8302c', hair: 'none', legs: '#2a2a33' };
export const BALD = { top: 'tee', color: '#3a6ad8', hair: 'none', legs: '#3a3f4a' };
export const MESSY = [   // the street: nobody has seen themselves in years
  { top: 'hoodie', color: '#e8453c', hair: 'curly', legs: '#5fe08a' }, { top: 'tee', color: '#ffd23f', hair: 'spiky', legs: '#c8302c' },
  { top: 'cardigan', color: '#5fe08a', hair: 'pony', legs: '#8a6ad6' }, { top: 'suit', color: '#ff8ab0', hair: 'bun', legs: '#ffd23f' },
  { top: 'tee', color: '#8a6ad6', hair: 'curly', legs: '#e8a03a' }, { top: 'hoodie', color: '#3a9ad8', hair: 'spiky', legs: '#ff8ab0' }];
// leaves stuck in someone's hair (lost a fight with a hedge)
export function leaves(f, n = 5, seed = 1) { let r = seed; const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < n; i++) { const l = box(0.07, 0.012, 0.04, i % 2 ? '#3a8a3a' : '#5aa84a', 0, 0, 0); const a = rnd() * 6.28; l.position.set(Math.cos(a) * 0.2, 0.18 + rnd() * 0.08, Math.sin(a) * 0.2); l.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3); f.parts.head.add(l); } }
// a hat on someone's head (stacked for Louis); returns the group
export function hat(f, k = 1, c = '#c8302c') { const g = new THREE.Group(); for (let i = 0; i < k; i++) { g.add(cyl(0.2 - i * 0.005, 0.22 - i * 0.005, 0.22, i % 2 ? '#ffd23f' : c, 0, 0.32 + i * 0.22, 0, { outline: 0.005 })); g.add(cyl(0.3, 0.3, 0.02, '#2a2a33', 0, 0.22 + i * 0.22, 0)); }
  if (k > 0) g.add(ball(0.06, '#ffffff', 0, 0.32 + k * 0.22, 0)); f.parts.head.add(g); return g; }
export function crown(f) { const g = new THREE.Group(); g.add(cyl(0.18, 0.18, 0.1, '#ffd23f', 0, 0.27, 0, { outline: 0.005 })); for (let i = 0; i < 6; i++) { const a = (i / 6) * 6.28; g.add(ball(0.035, i % 2 ? '#e8453c' : '#ffd23f', Math.cos(a) * 0.17, 0.35, Math.sin(a) * 0.17)); } f.parts.head.add(g); return g; }
// the barber's work: uneven tufts
export function badHair(f) { const g = new THREE.Group(); [[0.1, 0.25, 0.1, 0.5], [-0.12, 0.22, -0.08, -0.7], [0, 0.28, -0.15, 0.2], [0.05, 0.2, 0.2, 1.1], [-0.15, 0.15, 0.15, -1.2]].forEach(([x, y, z, r], k) => {
    const c = M2(new THREE.ConeGeometry(0.06, 0.14 + k * 0.03, 6), '#1b1b20'); c.position.set(x, y, z); c.rotation.set(r, 0, r * 0.7); g.add(c); }); f.parts.head.add(g); return g; }
const M2 = (geo, c) => new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color: c }));

// ---------- room badge: "ROOM N OF 7" top left (never over a face) ----------
const ROOMS = ['', 'THE REWIND', 'GETTING READY', 'YOUR HOME FEELS SMALLER', 'DATING', 'PHOTOGRAPHS BECOME POWER', 'THE BIG STUFF BREAKS', 'THE TWIST'];
export function roomBadge(g, n) { if (!n) return; const u = U(), x = 36 * u, y = 30 * u, str = `ROOM ${n} OF 7`; g.save(); g.font = `900 ${30 * u}px "${FONTS.ui}"`; const w = g.measureText(str).width + 36 * u, h = 50 * u;
  coversFace(x, y, w, h, 'room badge'); g.fillStyle = 'rgba(14,14,22,.72)'; rr(g, x, y, w, h, 14 * u); g.fill(); g.strokeStyle = alpha('#ffd23f', 0.9); g.lineWidth = 3 * u; rr(g, x, y, w, h, 14 * u); g.stroke();
  text(g, str, x + w / 2, y + h / 2, { size: 30 * u, font: FONTS.ui, weight: 900, color: '#ffd23f', align: 'center' }); g.restore(); }
// S() with the room badge
export const SR = (n) => (id, sp) => S(id, { ...sp, o: (g, t, i, s) => { if (sp.o) sp.o(g, t, i, s); roomBadge(g, n); } });
// card() with the room badge
export const CR = (n) => (id, theme, draw) => card(id, theme, (g, t, i, u, cx, cy, acc) => { draw(g, t, i, u, cx, cy, acc); roomBadge(g, n); });
// the big room title card: "ROOM 3" + name, with a door opening
export function roomCard(n, theme = 'gold') { card(`room${n}`, theme, (g, t, i, u, cx, cy, acc) => {
  const k = ease.outBack(prog(t, 0.05, 0.5)), dw = 300 * u, dh = 470 * u, dx = cx - dw / 2, dy = cy - dh / 2 - 40 * u;
  g.save(); g.translate(cx, cy); g.scale(k, k); g.translate(-cx, -cy); g.fillStyle = '#fff6d8'; rr(g, dx - 18 * u, dy - 18 * u, dw + 36 * u, dh + 18 * u, 20 * u); g.fill(); glow(g, cx, cy - 40 * u, 260 * u, acc, 0.5);
  const op = ease.inOut(prog(t, 0.4, 1.1)); g.fillStyle = '#6a4024'; g.beginPath(); g.moveTo(dx, dy); g.lineTo(dx + dw * (1 - op * 0.75), dy + dh * 0.06 * op); g.lineTo(dx + dw * (1 - op * 0.75), dy + dh * (1 - 0.06 * op)); g.lineTo(dx, dy + dh); g.fill();
  circle(g, dx + dw * (1 - op * 0.75) - 34 * u, cy, 14 * u, '#ffd23f'); text(g, String(n), dx + dw * (1 - op * 0.75) / 2 + dx * 0, dy + dh * 0.28, { size: 110 * u * (1 - op * 0.6), font: FONTS.title, weight: 900, color: '#ffd23f', align: 'left' }); g.restore();
  const a = ease.out(prog(t, 0.35, 0.7)); text(g, `ROOM ${n} OF 7`, cx, cy + 300 * u, { size: 64 * u, font: FONTS.ui, weight: 900, color: '#ffffff', alpha: a, stroke: 10 * u, strokeColor: '#141218' });
  text(g, ROOMS[n], cx, cy + 385 * u, { size: 54 * u, font: FONTS.ui, weight: 900, color: '#ffd23f', alpha: ease.out(prog(t, 0.6, 0.95)), stroke: 9 * u, strokeColor: '#141218' }); }); }

// ---------- 2D drawings ----------
// cartoon face (white head like Kip's, cap optional). flip mirrors it left-right. mole: a dot on one cheek. part: hair parting line.
export function face2d(g, x, y, r, o = {}) { const { flip = false, mole = true, expr = 'smile', cap = true, skin = '#f6f3ec', a = 1, filter = 0 } = o; g.save(); g.globalAlpha *= a; g.translate(x, y); if (flip) g.scale(-1, 1);
  circle(g, 0, 0, r, skin); ring(g, 0, 0, r, r * 0.06, '#141218');
  if (cap) { g.fillStyle = '#1b1b20'; g.beginPath(); g.arc(0, -r * 0.15, r * 1.0, Math.PI * 1.05, Math.PI * 1.95); g.closePath(); g.fill(); g.fillRect(r * 0.2, -r * 0.42, r * 1.05, r * 0.16); text(g, 'K', -r * 0.05, -r * 0.62, { size: r * 0.42, font: FONTS.ui, weight: 900, color: '#ffffff' }); }
  else { g.fillStyle = '#1b1b20'; g.beginPath(); g.arc(0, -r * 0.1, r * 0.98, Math.PI * 1.08, Math.PI * 1.92); g.closePath(); g.fill(); g.strokeStyle = skin; g.lineWidth = r * 0.06; g.beginPath(); g.moveTo(-r * 0.35, -r * 0.95); g.lineTo(-r * 0.25, -r * 0.45); g.stroke(); }
  for (const sx of [-1, 1]) circle(g, sx * r * 0.36, r * 0.02, r * (sx < 0 ? 0.12 : 0.1), '#141218');
  g.strokeStyle = '#141218'; g.lineWidth = r * 0.07; g.lineCap = 'round'; g.beginPath(); g.moveTo(-r * 0.55, -r * 0.24); g.lineTo(-r * 0.18, -r * 0.3); g.stroke(); g.beginPath(); g.moveTo(r * 0.18, -r * 0.28); g.lineTo(r * 0.52, -r * 0.18); g.stroke();
  g.beginPath(); if (expr === 'smile') g.arc(r * 0.06, r * 0.32, r * 0.3, 0.2, Math.PI - 0.5); else if (expr === 'o') g.arc(0, r * 0.45, r * 0.13, 0, 7); else if (expr === 'flat') { g.moveTo(-r * 0.25, r * 0.45); g.lineTo(r * 0.25, r * 0.45); } else { g.arc(0, r * 0.65, r * 0.25, Math.PI + 0.4, -0.4); } g.stroke();
  if (mole) circle(g, r * 0.5, r * 0.35, r * 0.05, '#6a4024');
  if (filter) { g.globalAlpha *= filter; circle(g, -r * 0.5, r * 0.3, r * 0.14, '#ff9ab0'); circle(g, r * 0.5, r * 0.3, r * 0.14, '#ff9ab0'); for (const sx of [-1, 1]) { g.fillStyle = '#ffffff'; g.beginPath(); g.arc(sx * r * 0.4, -r * 0.02, r * 0.04, 0, 7); g.fill(); } }
  g.restore(); }
// Gary in 2D (side view, facing right). puff 0..1
export function pigeon2d(g, x, y, r, o = {}) { const { puff = 0, sad = false, a = 1 } = o; g.save(); g.globalAlpha *= a; g.translate(x, y);
  g.fillStyle = '#5a6274'; g.beginPath(); g.moveTo(-r * 0.9, -r * 0.1); g.lineTo(-r * 1.5, r * 0.1); g.lineTo(-r * 0.8, r * 0.3); g.fill();
  g.fillStyle = '#8a93a6'; g.beginPath(); g.ellipse(0, 0, r * 1.05, r * 0.72, 0, 0, 7); g.fill(); g.fillStyle = '#7a6a9a'; g.beginPath(); g.ellipse(r * 0.45, -r * 0.1, r * (0.5 + puff * 0.2), r * (0.55 + puff * 0.2), 0, 0, 7); g.fill();
  g.fillStyle = '#4f9a7a'; g.beginPath(); g.ellipse(r * 0.6, -r * 0.62, r * 0.32, r * 0.3, 0, 0, 7); g.fill(); circle(g, r * 0.72, -r * 0.95, r * 0.36, '#9aa3b6');
  g.fillStyle = '#3a3a40'; g.beginPath(); g.moveTo(r * 1.0, -r * 1.0); g.lineTo(r * 1.35, -r * 0.9); g.lineTo(r * 1.0, -r * 0.82); g.fill(); circle(g, r * 0.85, -r * 1.02, r * 0.1, '#ff8a2a'); circle(g, r * 0.88, -r * 1.02, r * 0.05, '#141218');
  if (sad) { g.strokeStyle = '#141218'; g.lineWidth = r * 0.05; g.beginPath(); g.moveTo(r * 0.72, -r * 1.2); g.lineTo(r * 0.98, -r * 1.12); g.stroke(); }
  g.fillStyle = '#6f7890'; g.beginPath(); g.ellipse(-r * 0.2, -r * 0.05, r * 0.65, r * 0.32, 0.2, 0, 7); g.fill(); g.strokeStyle = '#e86a5a'; g.lineWidth = r * 0.08; for (const lx of [-0.05, 0.2]) { g.beginPath(); g.moveTo(r * lx, r * 0.65); g.lineTo(r * lx, r * 1.0); g.lineTo(r * (lx + 0.18), r * 1.0); g.stroke(); }
  g.restore(); }
// an eagle silhouette (what Gary thinks he is)
export function eagle2d(g, x, y, r, col = '#6a4024', a = 1) { g.save(); g.globalAlpha *= a; g.translate(x, y); g.fillStyle = col; g.beginPath(); g.moveTo(0, -r * 0.1);
  g.quadraticCurveTo(-r * 0.6, -r * 0.7, -r * 1.6, -r * 0.5); g.lineTo(-r * 1.2, -r * 0.3); g.lineTo(-r * 1.5, -r * 0.1); g.lineTo(-r * 1.0, -r * 0.05); g.lineTo(-r * 1.2, r * 0.15); g.quadraticCurveTo(-r * 0.5, r * 0.1, -r * 0.2, r * 0.35); g.lineTo(-r * 0.3, r * 0.8); g.lineTo(0, r * 0.55); g.lineTo(r * 0.3, r * 0.8); g.lineTo(r * 0.2, r * 0.35); g.quadraticCurveTo(r * 0.5, r * 0.1, r * 1.2, r * 0.15); g.lineTo(r * 1.0, -r * 0.05); g.lineTo(r * 1.5, -r * 0.1); g.lineTo(r * 1.2, -r * 0.3); g.lineTo(r * 1.6, -r * 0.5); g.quadraticCurveTo(r * 0.6, -r * 0.7, 0, -r * 0.1); g.fill();
  circle(g, 0, -r * 0.3, r * 0.22, '#f4f4f4'); g.fillStyle = '#ffd23f'; g.beginPath(); g.moveTo(r * 0.12, -r * 0.3); g.lineTo(r * 0.35, -r * 0.2); g.lineTo(r * 0.1, -r * 0.18); g.fill(); g.restore(); }
// thought bubble with a drawing inside (screen position)
export function thought(g, t, x, y, w, h, at, inside) { const k = ease.outBack(prog(t, at, at + 0.4)); if (k <= 0) return; const u = U(); g.save(); g.translate(x, y); g.scale(k, k); g.fillStyle = '#ffffff'; g.strokeStyle = '#141218'; g.lineWidth = 5 * u;
  g.beginPath(); g.ellipse(0, 0, w / 2, h / 2, 0, 0, 7); g.fill(); g.stroke(); for (const [bx, by, br] of [[-w * 0.3, h * 0.62, 18], [-w * 0.42, h * 0.85, 11]]) { g.beginPath(); g.arc(bx, by, br * u, 0, 7); g.fill(); g.stroke(); }
  inside(g); g.restore(); }
// screen position of a 3D point
export function scr3(s, p) { const v = new THREE.Vector3(...p).project(s.stage.camera); return [(v.x + 1) / 2 * E.W, (1 - v.y) / 2 * E.H]; }
// phone screen in 2D (portrait): draw(g, x, y, w, h) inside
export function phoneFrame(g, x, y, w, h, draw) { const u = U(); g.save(); g.fillStyle = '#141418'; rr(g, x - w / 2 - 14 * u, y - h / 2 - 14 * u, w + 28 * u, h + 28 * u, 40 * u); g.fill(); g.save(); rr(g, x - w / 2, y - h / 2, w, h, 28 * u); g.clip(); draw(g, x - w / 2, y - h / 2, w, h); g.restore(); g.restore(); }
// shout lines around a point
export function burst(g, t, x, y, r, at = 0, col = '#ffffff') { const k = prog(t, at, at + 0.3); if (k <= 0) return; g.save(); g.strokeStyle = col; g.lineWidth = r * 0.06; g.lineCap = 'round'; for (let i = 0; i < 10; i++) { const a = (i / 10) * 6.28 + 0.2; g.globalAlpha = 1 - k * 0.3; g.beginPath(); g.moveTo(x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7); g.lineTo(x + Math.cos(a) * r * (0.8 + 0.4 * k), y + Math.sin(a) * r * (0.8 + 0.4 * k)); g.stroke(); } g.restore(); }
export { V, ease, prog, clamp, lerp };
