// shots/_loop.js — If Blaze "What If You and Your Crush Were Stuck in a Time Loop?": cast (all adults, final-year college students),
// the loop counter badge (top left, never over a face), speech bubbles, and 2D drawings for cards.
import { E, V, ease, prog, clamp, lerp, THREE, box, cyl, ball } from './_lib.js';
import { S } from './_spec.js';
import { card, title, stamp, cross, check, heart, person } from './_info.js';
import { caption, coversFace, text, FONTS, alpha, rr, glow } from './_rank.js';
import { circle, ring } from '/engine/core.js';
import { KIP, OLDMAN } from '../toon/cast3d.js';
import { face2d, pigeon2d, scr3, phoneFrame, burst, thought } from './_mirror.js';

export const FZ = -Math.PI / 2, FNZ = Math.PI / 2, FX = 0, FNX = Math.PI;
export const U = () => E.H / 1080;
export { KIP, OLDMAN, face2d, pigeon2d, scr3, phoneFrame, burst, thought, caption, text, FONTS, alpha, rr, glow, circle, ring, title, stamp, cross, check, heart, person };
export { V, ease, prog, clamp, lerp };

// ---------- cast (everyone is 21 or older) ----------
export const ME = KIP;                                                                                       // you
export const LEAH = { top: 'cardigan', color: '#f2c84a', hair: 'pony', skin: '#f6e2cc', bigEyes: true, legs: '#3a4a7a', shoes: '#f4f4f4' };   // mustard cardigan, ponytail
export const LEAHCOAT = { ...LEAH, top: 'suit', color: '#c8506a' };                                          // party coat (leaving at 11:58)
export const SAM = { top: 'hoodie', color: '#3aa0e8', hair: 'curly', skin: '#d9a877', legs: '#5a5a68' };                      // roommate, blue hoodie
export const BARISTA = { top: 'tee', color: '#6a4024', hair: 'bun', legs: '#2a2a33' };
export const BIKER = { top: 'tee', color: '#e8453c', hair: 'spiky', legs: '#2a3a6a' };
export const PHONEWOMAN = { top: 'cardigan', color: '#5fb0a8', hair: 'bun', glasses: true, legs: '#3a3f4a' };
export const GUESTS = [{ top: 'tee', color: '#ff6ab0', hair: 'curly' }, { top: 'hoodie', color: '#8aff8a', hair: 'spiky' }, { top: 'cardigan', color: '#c88aff', hair: 'bun' },
  { top: 'tee', color: '#ffd23f', hair: 'pony' }, { top: 'suit', color: '#3ad8ff', hair: 'none' }, { top: 'hoodie', color: '#ff8a3a', hair: 'curly' }];
export const CUSTOMERS = [{ top: 'tee', color: '#9a6ad6', hair: 'curly' }, { top: 'hoodie', color: '#5a8a4a', hair: 'bun' }, { top: 'cardigan', color: '#d86a5a', hair: 'spiky' }, { top: 'tee', color: '#4a7ac8', hair: 'pony' }];

// ---------- the loop counter: "LOOP 27" top left ----------
export function loopBadge(g, n, o = {}) { if (n == null || n === '') return; const u = U(), x = 36 * u, y = 30 * u, str = typeof n === 'number' ? `LOOP ${n.toLocaleString('en-US')}` : String(n);
  g.save(); g.font = `900 ${34 * u}px "${FONTS.ui}"`; const w = g.measureText(str).width + 74 * u, h = 56 * u; coversFace(x, y, w, h, 'loop badge');
  g.fillStyle = 'rgba(14,14,22,.74)'; rr(g, x, y, w, h, 16 * u); g.fill(); g.strokeStyle = alpha(o.col || '#6fe6ff', 0.95); g.lineWidth = 3 * u; rr(g, x, y, w, h, 16 * u); g.stroke();
  // little loop arrow
  const ax = x + 28 * u, ay = y + h / 2; g.strokeStyle = o.col || '#6fe6ff'; g.lineWidth = 4 * u; g.beginPath(); g.arc(ax, ay, 12 * u, 0.4, Math.PI * 1.85); g.stroke();
  g.fillStyle = o.col || '#6fe6ff'; g.beginPath(); g.moveTo(ax + 13 * u, ay - 2 * u); g.lineTo(ax + 6 * u, ay - 12 * u); g.lineTo(ax + 18 * u, ay - 12 * u); g.fill();
  text(g, str, x + 46 * u + (w - 46 * u) / 2 - 8 * u, y + h / 2, { size: 34 * u, font: FONTS.ui, weight: 900, color: o.col || '#6fe6ff', align: 'center' }); g.restore(); }
const nAt = (n, t) => (typeof n === 'function' ? n(t) : n);
// S() / card() with the loop badge; n may be a function of t (a counter that rolls)
// caps: each caption stays up until the next one starts (a 'dur' on the last caption is its end time if larger than 'at', else a length)
const capsFix = (c) => c && c.map(([str, at = 0.2, o = {}], k) => { const nx = c[k + 1]; const oo = { ...o }; if (nx) oo.dur = (nx[1] ?? 0.2) - 0.1; else if (oo.dur != null && oo.dur <= at + 0.3) oo.dur = at + oo.dur; return [str, at, oo]; });
export const SL = (n) => (id, sp) => S(id, { ...sp, caps: capsFix(sp.caps), o: (g, t, i, s) => { if (sp.o) sp.o(g, t, i, s); loopBadge(g, nAt(n, t), sp.badge); } });
export const CL = (n, theme) => (id, th, draw) => card(id, th || theme, (g, t, i, u, cx, cy, acc) => { draw(g, t, i, u, cx, cy, acc); loopBadge(g, nAt(n, t)); });
export const roll = (a, b, t0, t1) => (t) => Math.round(lerp(a, b, ease.inOut(prog(t, t0, t1))));

// speech bubble above a cast member (screen space)
export function bubble(g, t, s, k, str, at, o = {}) { const a = ease.outBack(prog(t, at, at + 0.3)) * (t < (o.off ?? 99) ? 1 : 0); if (a <= 0) return; const f = s.F[k], u = U(); if (!f) return;
  const [x, y] = scr3(s, [f.position.x + (o.dx || 0), (f.position.y || 0) + (o.hy || 2.15), f.position.z + (o.dz || 0)]); const size = (o.size || 38) * u;
  g.save(); g.translate(x, y); g.scale(a, a); g.font = `900 ${size}px "${FONTS.ui}"`; const w = g.measureText(str).width + 50 * u, h = size * 1.8; g.fillStyle = '#ffffff'; g.strokeStyle = '#141218'; g.lineWidth = 4 * u; rr(g, -w / 2, -h, w, h, 22 * u); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(-14 * u, -2 * u); g.lineTo(0, 22 * u); g.lineTo(14 * u, -2 * u); g.fill(); text(g, str, 0, -h / 2, { size, font: FONTS.ui, weight: 900, color: '#141218' }); g.restore(); }
// floating music notes from a screen point
export function notes(g, t, x, y, o = {}) { const u = U(), n = o.n || 5, col = o.col || '#ffd23f'; g.save(); for (let i = 0; i < n; i++) { const ph = (t * (o.spd || 0.6) + i / n) % 1, xx = x + Math.sin(ph * 6 + i) * 30 * u + (o.dir || 1) * ph * 60 * u, yy = y - ph * 160 * u;
    g.globalAlpha = (1 - ph) * (o.a ?? 1); g.fillStyle = col; g.strokeStyle = col; g.lineWidth = 4 * u; g.beginPath(); g.ellipse(xx, yy, 11 * u, 8 * u, -0.4, 0, 7); g.fill(); g.beginPath(); g.moveTo(xx + 9 * u, yy); g.lineTo(xx + 9 * u, yy - 34 * u); g.lineTo(xx + 22 * u, yy - 26 * u); g.stroke(); } g.restore(); }

// ---------- 2D drawings ----------
// analog clock; h, m in hours/minutes
export function clock2d(g, x, y, r, h, m, o = {}) { const u = U(); g.save(); circle(g, x, y, r, o.face || '#fbfaf4'); ring(g, x, y, r, r * 0.08, o.rim || '#141218');
  for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; circle(g, x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8, r * 0.04, '#141218'); }
  g.strokeStyle = '#141218'; g.lineCap = 'round'; const ha = ((h % 12) + m / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = (m / 60) * Math.PI * 2 - Math.PI / 2;
  g.lineWidth = r * 0.1; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(ha) * r * 0.5, y + Math.sin(ha) * r * 0.5); g.stroke(); g.lineWidth = r * 0.06; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(ma) * r * 0.75, y + Math.sin(ma) * r * 0.75); g.stroke();
  circle(g, x, y, r * 0.07, o.rim || '#e8453c'); g.restore(); }
// digital clock readout
export function digital(g, x, y, str, size, o = {}) { const u = U(); g.save(); g.font = `900 ${size}px "${FONTS.ui}"`; const w = g.measureText(str).width + size * 0.8, h = size * 1.35; g.fillStyle = '#141418'; rr(g, x - w / 2, y - h / 2, w, h, size * 0.2); g.fill();
  g.strokeStyle = o.rim || '#3a3a48'; g.lineWidth = 6 * u; rr(g, x - w / 2, y - h / 2, w, h, size * 0.2); g.stroke(); g.shadowColor = o.col || '#ff3a3a'; g.shadowBlur = 20 * u; text(g, str, x, y + size * 0.04, { size, font: FONTS.ui, weight: 900, color: o.col || '#ff3a3a' }); g.restore(); }
// a looping arrow ring around a point (k: 0..1 draw progress)
export function loopRing(g, x, y, r, k = 1, col = '#6fe6ff') { const u = U(); g.save(); g.strokeStyle = col; g.lineWidth = r * 0.12; g.lineCap = 'round'; const a0 = -Math.PI / 2, a1 = a0 + Math.PI * 2 * 0.9 * k; g.beginPath(); g.arc(x, y, r, a0, a1); g.stroke();
  if (k > 0.05) { const hx = x + Math.cos(a1) * r, hy = y + Math.sin(a1) * r, d = a1 + Math.PI / 2; g.fillStyle = col; g.beginPath(); g.moveTo(hx + Math.cos(d) * r * 0.26, hy + Math.sin(d) * r * 0.26); g.lineTo(hx + Math.cos(d + 2.3) * r * 0.2, hy + Math.sin(d + 2.3) * r * 0.2); g.lineTo(hx + Math.cos(d - 2.3) * r * 0.2, hy + Math.sin(d - 2.3) * r * 0.2); g.fill(); } g.restore(); }
// tear-off calendar page
export function calendar(g, x, y, w, day, num, o = {}) { const u = U(), h = w * 1.15; g.save(); g.fillStyle = '#ffffff'; rr(g, x - w / 2, y - h / 2, w, h, w * 0.08); g.fill(); g.fillStyle = o.col || '#e8453c'; rr(g, x - w / 2, y - h / 2, w, h * 0.3, w * 0.08); g.fill(); g.fillRect(x - w / 2, y - h / 2 + h * 0.2, w, h * 0.1);
  text(g, day, x, y - h * 0.35, { size: w * 0.15, font: FONTS.ui, weight: 900, color: '#ffffff' }); text(g, String(num), x, y + h * 0.12, { size: w * 0.5, font: FONTS.title, weight: 900, color: '#141218' }); g.restore(); }
// coffee cup icon (2D)
export function cup2d(g, x, y, r, o = {}) { g.save(); g.fillStyle = o.col || '#fbfaf4'; g.beginPath(); g.moveTo(x - r * 0.7, y - r); g.lineTo(x + r * 0.7, y - r); g.lineTo(x + r * 0.55, y + r); g.lineTo(x - r * 0.55, y + r); g.closePath(); g.fill();
  g.fillStyle = '#6a4024'; g.fillRect(x - r * 0.78, y - r * 1.18, r * 1.56, r * 0.24); g.fillStyle = '#c89a68'; g.fillRect(x - r * 0.64, y - r * 0.2, r * 1.26, r * 0.5); if (o.label) text(g, o.label, x, y + r * 0.05, { size: r * 0.32, font: FONTS.ui, weight: 900, color: '#3a2010' }); g.restore(); }
// a bench icon (2D)
export function bench2d(g, x, y, w, col = '#a0683e') { g.save(); g.fillStyle = col; g.fillRect(x - w / 2, y - w * 0.08, w, w * 0.08); g.fillRect(x - w / 2, y - w * 0.32, w, w * 0.08); g.fillRect(x - w * 0.42, y, w * 0.06, w * 0.18); g.fillRect(x + w * 0.36, y, w * 0.06, w * 0.18); g.restore(); }
// a simple map of the US with a dotted flight from left to right (k: 0..1)
export function usMap(g, x, y, w, k = 1) { const u = U(), h = w * 0.55; g.save(); g.fillStyle = '#4a8a5a'; g.beginPath(); const P = [[-0.48, -0.25], [-0.2, -0.35], [0.25, -0.32], [0.42, -0.42], [0.5, -0.2], [0.38, 0.05], [0.42, 0.3], [0.2, 0.22], [0.05, 0.42], [-0.1, 0.3], [-0.3, 0.32], [-0.48, 0.1]];
  P.forEach(([a, b], i) => (i ? g.lineTo(x + a * w, y + b * h * 1.6) : g.moveTo(x + a * w, y + b * h * 1.6))); g.closePath(); g.fill(); g.strokeStyle = '#2a5a3a'; g.lineWidth = 4 * u; g.stroke();
  const ax = x - 0.4 * w, ay = y - 0.05 * h, bx = x + 0.38 * w, by = y - 0.1 * h; circle(g, ax, ay, 12 * u, '#ffd23f'); circle(g, bx, by, 12 * u, '#e8453c');
  g.setLineDash([12 * u, 10 * u]); g.strokeStyle = '#ffffff'; g.lineWidth = 5 * u; g.beginPath(); for (let i = 0; i <= 40 * k; i++) { const q = i / 40; const px = lerp(ax, bx, q), py = lerp(ay, by, q) - Math.sin(q * Math.PI) * h * 0.4; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); g.setLineDash([]);
  const q = k, px = lerp(ax, bx, q), py = lerp(ay, by, q) - Math.sin(q * Math.PI) * h * 0.4; g.save(); g.translate(px, py); g.rotate(Math.cos(q * Math.PI) * -0.5); g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(26 * u, 0); g.lineTo(-20 * u, -8 * u); g.lineTo(-20 * u, 8 * u); g.fill(); g.fillRect(-6 * u, -22 * u, 10 * u, 44 * u); g.restore(); g.restore(); }
// a frame/panel with a title for montage cards
// largest font size (up to 'size') at which 'str' fits in 'maxW' px
export function fit(g, str, size, maxW) { g.save(); g.font = `900 ${size}px "${FONTS.ui}"`; const w = g.measureText(str).width; g.restore(); return w > maxW ? size * maxW / w : size; }
export function panel2d(g, t, x, y, w, h, at, lab, draw, o = {}) { const k = ease.outBack(prog(t, at, at + 0.35)); if (k <= 0) return; const u = U(); g.save(); g.translate(x, y); g.scale(k, k); g.rotate(o.rot || 0);
  g.fillStyle = '#fbfaf4'; rr(g, -w / 2, -h / 2, w, h, 16 * u); g.fill(); g.fillStyle = o.bg || '#cfe8f4'; rr(g, -w / 2 + 14 * u, -h / 2 + 14 * u, w - 28 * u, h - 90 * u, 10 * u); g.fill();
  g.save(); rr(g, -w / 2 + 14 * u, -h / 2 + 14 * u, w - 28 * u, h - 90 * u, 10 * u); g.clip(); draw(g, 0, -38 * u); g.restore(); text(g, lab, 0, h / 2 - 40 * u, { size: fit(g, lab, 34 * u, w - 40 * u), font: FONTS.ui, weight: 900, color: '#141218' });
  if (o.x) cross(g, t, 0, -38 * u, Math.min(w, h) * 0.32, at + 0.5); g.restore(); }
// a guitar icon (2D)
export function guitar2d(g, x, y, r, rot = -0.6) { g.save(); g.translate(x, y); g.rotate(rot); g.fillStyle = '#c8702c'; g.beginPath(); g.ellipse(0, r * 0.5, r * 0.55, r * 0.5, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(0, -r * 0.15, r * 0.42, r * 0.38, 0, 0, 7); g.fill();
  circle(g, 0, r * 0.2, r * 0.14, '#2a1a10'); g.fillStyle = '#5a3a24'; g.fillRect(-r * 0.07, -r * 1.4, r * 0.14, r * 1.2); g.fillRect(-r * 0.12, -r * 1.6, r * 0.24, r * 0.22); g.restore(); }
// a mushroom icon (2D)
export function mushroom(g, x, y, r) { g.save(); g.fillStyle = '#f4ece0'; g.fillRect(x - r * 0.25, y - r * 0.1, r * 0.5, r * 0.8); g.fillStyle = '#c8302c'; g.beginPath(); g.arc(x, y, r * 0.8, Math.PI, 0); g.fill(); for (const [a, b] of [[-0.4, -0.35], [0.2, -0.5], [0.45, -0.15]]) circle(g, x + a * r, y + b * r, r * 0.1, '#ffffff'); g.restore(); }
// a book (2D)
export function book2d(g, x, y, r, col = '#3a6ad8', lab = '') { g.save(); g.fillStyle = col; rr(g, x - r * 0.7, y - r, r * 1.4, r * 2, r * 0.1); g.fill(); g.fillStyle = '#fbfaf4'; g.fillRect(x + r * 0.55, y - r * 0.92, r * 0.1, r * 1.84); if (lab) text(g, lab, x - r * 0.05, y, { size: fit(g, lab, r * 0.42, r * 1.1), font: FONTS.ui, weight: 900, color: '#ffffff' }); g.restore(); }
// Leah's face in 2D (ponytail, no cap)
export function leah2d(g, x, y, r, o = {}) { g.save(); g.globalAlpha *= o.a ?? 1; g.fillStyle = '#1b1b20'; g.beginPath(); g.ellipse(x - r * 1.0, y + r * 0.1, r * 0.25, r * 0.6, 0.5, 0, 7); g.fill(); face2d(g, x, y, r, { cap: false, mole: false, expr: o.expr || 'smile' }); g.restore(); }
