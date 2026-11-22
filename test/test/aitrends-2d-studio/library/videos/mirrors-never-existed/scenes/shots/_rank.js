// shots/_rank.js — If Blaze "See Everyone's Rank": adult cast, lecture hall, and the floating rank tag.
import { THREE, E, V, ease, prog, clamp, lerp, SETS, box, cyl, fig, scr } from './_lib.js';
import { text, FONTS, alpha, rr, glow } from '/engine/core.js';
import { DEV } from '../toon/cast3d.js';

export const U = () => E.H / 1080;
export const FACE_NZ = Math.PI / 2;          // seated students face the board (-z)

// ---------- cast (all adults) ----------
export const R412 = { top: 'hoodie', color: '#6b7684', hair: 'curly', legs: '#3a3f4a' };   // the guy next to Kip, #412 (night-shift orderly)
export const STUDENTS = [
  { top: 'tee', color: '#3a9ad8', hair: 'spiky' }, { top: 'hoodie', color: '#c8506a', hair: 'pony' }, { top: 'cardigan', color: '#8a6ad6', hair: 'bun', glasses: true },
  { top: 'tee', color: '#6db55a', hair: 'none' }, { top: 'hoodie', color: '#e8a03a', hair: 'curly' }, { top: 'tee', color: '#e8e2d4', hair: 'pony', legs: '#2a3a6a' },
  { top: 'suit', color: '#4a5a6a', hair: 'spiky' }, { top: 'hoodie', color: '#2a8a8a', hair: 'bun' },
];
export { DEV };

// ---------- lecture hall: classroom set, desks turned to face the board, adult students seated ----------
// seats are desk centres; the student sits 0.62 m behind (+z) facing -z. Kip is in the middle row centre, #412 right beside him.
export const SEATS = [[-2.6, -1.6], [0, -1.6], [2.6, -1.6], [-2.6, 0.4], [2.6, 0.4], [-2.6, 2.4], [0, 2.4], [2.6, 2.4]];
export const KIP_SEAT = [0, 0.4], R412_SEAT = [1.25, 0.4];
export function lectureHall(st, s, ME, o = {}) {
  SETS.classroom(st);
  st.scene.traverse((m) => { if (m.isGroup && m.children.length > 8 && Math.abs(m.rotation.y + Math.PI / 2) < 0.01 && m.position.y === 0) m.rotation.y = Math.PI / 2; });
  const extra = SETS_desk(R412_SEAT[0], R412_SEAT[1]); st.add(extra);
  s.studs = (o.studs === false ? [] : SEATS).map(([x, z], k) => fig(st, STUDENTS[k % STUDENTS.length], x, z + 0.62, FACE_NZ, 'sitDesk', 'neutral'));
  s.me = fig(st, ME, KIP_SEAT[0], KIP_SEAT[1] + 0.62, FACE_NZ, 'sitDesk', 'neutral');
  s.r412 = fig(st, R412, R412_SEAT[0], R412_SEAT[1] + 0.62, FACE_NZ, 'sitDesk', 'neutral');
  // notebook + pen on #412's desk, a stack of books on Kip's
  s.notes = box(0.34, 0.012, 0.26, '#fbfaf4', R412_SEAT[0], 0.77, R412_SEAT[1] + 0.12, { outline: 0.003 }); st.add(s.notes);
  s.books = new THREE.Group(); ['#c8302c', '#2a5ad8', '#e8b02a', '#3a8a4a', '#6a3a8a'].forEach((c, k) => s.books.add(box(0.3 - k * 0.01, 0.05, 0.22, c, 0, 0.025 + k * 0.052, 0, { outline: 0.003, rot: [0, (k % 2 ? 0.08 : -0.06), 0] })));
  s.books.position.set(KIP_SEAT[0] - 0.22, 0.77, KIP_SEAT[1] + 0.05); st.add(s.books);
  return s;
}
import { desk as SETS_deskRaw } from '../toon/sets3d.js';
const SETS_desk = (x, z) => SETS_deskRaw(x, z, Math.PI / 2);

// asleep on the desk: folded arms, head down
export const ASLEEP = { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, spine: [34, 0], shA: [70, 22], shB: [70, 22], elA: 120, elB: 120, head: [8, -24] };

// head point of a seated figure (world), and the tag anchor above it
export const seatedHead = (f, up = 0, hy = 1.12) => [f.position.x, (f.position.y || 0) + hy + up, f.position.z];

// ---------- the rank tag: glowing number in a dark pill with a small arrow down to the head ----------
// col: 'good' green, 'bad' red, 'gold' gold, or any CSS colour. num: string or number. size scales with distance unless fixed.
const COLS = { good: '#5fe08a', bad: '#ff4a4a', gold: '#ffd23f', mid: '#e8eef6' };
export function fmt(n) { return '#' + Math.round(n).toLocaleString('en-US'); }
export function rankTag(g, t, s, f, num, o = {}) {
  const { at = 0, col = 'good', up = 0.42, hy = 1.12, size = null, min = 22, max = 120, k = 0.16, fade = 1, pulse = 0 } = o;
  const a = ease.out(prog(t, at, at + 0.25)) * fade; if (a <= 0.01) return;
  const [x, y, ppm] = scr(s, seatedHead(f, up, hy)); if (x < -200 || x > E.W + 200) return;
  const sz = size ?? clamp(ppm * k, min, max), c = COLS[col] || col, str = typeof num === 'string' ? num : fmt(num);
  const sc = (0.6 + 0.4 * ease.outBack(prog(t, at, at + 0.35))) * (1 + pulse * 0.04 * Math.sin(t * 7));
  g.save(); g.translate(x, y); g.scale(sc, sc); g.globalAlpha = a;
  g.font = `900 ${sz}px "${FONTS.ui}"`; const w = g.measureText(str).width + sz * 0.7, h = sz * 1.3;
  if (o.edge !== false && (x - w * sc / 2 < 6 || x + w * sc / 2 > E.W - 6)) { g.restore(); return; }   // never a half tag at the frame edge
  glow(g, 0, -h / 2, w * 0.75, c, 0.28);
  g.fillStyle = 'rgba(14,14,22,.82)'; rr(g, -w / 2, -h, w, h, h * 0.32); g.fill();
  g.strokeStyle = alpha(c, 0.95); g.lineWidth = Math.max(2, sz * 0.07); rr(g, -w / 2, -h, w, h, h * 0.32); g.stroke();
  g.fillStyle = alpha(c, 0.95); g.beginPath(); g.moveTo(-sz * 0.22, 0); g.lineTo(sz * 0.22, 0); g.lineTo(0, sz * 0.3); g.closePath(); g.fill();
  text(g, str, 0, -h / 2, { size: sz, font: FONTS.ui, weight: 900, color: c, align: 'center', glow: sz * 0.4, glowColor: alpha(c, 0.7) });
  g.restore();
}
// rolling counter value from a to b between t0 and t1
export const roll = (t, a, b, t0, t1) => lerp(a, b, ease.inOut(prog(t, t0, t1)));
// faces on screen this frame (set by _spec.js S()); captions move off faces automatically
let FACES = null, onBlocked = null;
export const setFaces = (f, cb) => { FACES = f; onBlocked = cb || null; };
const hits = (x, y, w, h) => FACES && FACES.some((f) => { const nx = clamp(f.cx, x - w / 2, x + w / 2), ny = clamp(f.cy, y - h / 2, y + h / 2); return Math.hypot(f.cx - nx, f.cy - ny) < f.r * 1.05; });
// caption text, bottom or top (white, dark stroke). If it would cover a face it tries the bottom band, the top band,
// then the middle; if every spot covers a face it is reported as a 'caption' glitch.
// any other overlay (phone, card) calls this with its screen box; covering a face is reported as a glitch
export const coversFace = (x, y, w, h, what) => { if (hits(x + w / 2, y + h / 2, w, h)) { if (onBlocked) onBlocked(what); return true; } return false; };
export function caption(g, t, str, o = {}) {
  const { at = 0, size = V(84, 80), color = '#ffffff', dur = 99 } = o; let y = o.y ?? E.H * 0.86, x = o.x ?? E.W / 2;
  const a = ease.out(prog(t, at, at + 0.2)) * clamp((dur - t) / 0.2); if (a <= 0) return; const sc = 0.85 + 0.15 * ease.outBack(prog(t, at, at + 0.3));
  if (FACES && FACES.length) { g.font = `900 ${size}px "${FONTS.ui}"`; const w = g.measureText(str).width + size * 0.4, h = size * 1.2;
    if (hits(x, y, w, h)) { const xs = [x, E.W * 0.5, Math.max(w / 2 + 30, E.W * 0.25), Math.min(E.W - w / 2 - 30, E.W * 0.75)], ys = [y, E.H * 0.9, E.H * 0.1, E.H * 0.5];
      const alt = xs.flatMap((xx) => ys.map((yy) => [xx, yy])).find(([xx, yy]) => !hits(xx, yy, w, h)); if (alt) [x, y] = alt; else if (onBlocked) onBlocked(str); } }
  g.save(); g.translate(x, y); g.scale(sc, sc); text(g, str, 0, 0, { size, font: FONTS.ui, weight: 900, color, align: 'center', alpha: a, stroke: size * 0.14, strokeColor: '#141218' }); g.restore();
}
export { text, FONTS, alpha, rr, glow };
