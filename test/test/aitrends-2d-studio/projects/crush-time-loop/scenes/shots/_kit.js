// shots/00_kit.js — shared props + overlays for the GTA video (wanted stars, HUD, tags, phone UI, bill, chairs).
import { THREE, E, V, ease, prog, clamp, lerp, box, cyl } from './_lib.js';
import { starMesh } from '../toon/sets3d.js';
import { coversFace } from './_rank.js';
import { text, FONTS, alpha, rr, circle } from '/engine/core.js';
export const U = () => E.H / 1080;
export const FACE_Z = -Math.PI / 2;       // facing +z (toward the street / camera)
export const FACE_NZ = Math.PI / 2;       // facing -z
export const FACE_X = 0;                  // facing +x
export const FACE_NX = Math.PI;           // facing -x

// ---------- 3D props ----------
export function bill(len = 0.62) { const g = new THREE.Group(); g.add(box(0.22, len, 0.008, '#fbfaf4', 0, -len / 2, 0, { outline: 0.004 }));
  for (let k = 0; k < Math.floor(len / 0.07); k++) g.add(box(0.15, 0.012, 0.009, '#9aa0aa', 0, -0.06 - k * 0.06, 0.002)); return g; }
export function chair(x, z, rotY = 0, c = '#8a5a3a') { const g = new THREE.Group(); g.add(box(0.45, 0.05, 0.45, c, 0, 0.45, 0, { outline: 0.006 })); g.add(box(0.05, 0.5, 0.45, c, -0.2, 0.72, 0, { outline: 0.006 }));
  for (const [a, b] of [[0.18, 0.18], [0.18, -0.18], [-0.18, 0.18], [-0.18, -0.18]]) g.add(box(0.04, 0.45, 0.04, '#5a3a24', a, 0.22, b)); g.position.set(x, 0, z); g.rotation.y = rotY; return g; }
export function cup(c = '#f4f4f4') { const g = new THREE.Group(); g.add(cyl(0.045, 0.035, 0.11, c, 0, 0.055, 0, { outline: 0.004 })); g.add(cyl(0.047, 0.047, 0.02, '#5a3a24', 0, 0.11, 0)); return g; }
export function cast(f, side = 'A') { const m = cyl(0.07, 0.07, 0.24, '#fbfaf4', 0, -0.1, 0, { outline: 0.004 }); f.parts.arms[side].el.add(m); return m; }
// wanted stars over a figure's head, always facing the camera
export function stars(st, n = 5, r = 0.11) { const g = new THREE.Group(); const list = []; for (let i = 0; i < n; i++) { const m = starMesh(r); g.add(m); list.push(m); } st.add(g); return { g, list }; }
export function placeStars(S, f, cam3, t, at = 0, step = 0.22, o = {}) { const { lit = S.list.length, y = 2.08, blink = 0, fade = 1 } = o;
  S.g.position.set(f.position.x, (f.position.y || 0) + y, f.position.z); S.g.lookAt(cam3.position.x, S.g.position.y, cam3.position.z);
  S.list.forEach((m, i) => { const k = ease.outBack(prog(t, at + i * step, at + i * step + 0.25)) * fade; m.visible = k > 0.01 && i < lit && (!blink || Math.sin(t * blink) > -0.3);
    m.position.set((i - (S.list.length - 1) / 2) * r2(S), Math.sin(t * 3 + i) * 0.015, 0); m.scale.set(k, -k, k); m.material.color.setHSL(0.13, 1, 0.55 + 0.12 * Math.sin(t * 6 + i * 0.9)); }); }
const r2 = (S) => S.list[0].geometry.parameters?.shapes ? 0.27 : 0.27;

// ---------- 2D overlays ----------
export function hud(g, t, o = {}) {
  const { at = 0, hp = 1, money = null, moneyAt = 0, moneyFrom = 0 } = o, u = U(), a = ease.out(prog(t, at, at + 0.35)); if (a <= 0) return;
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
  if (money != null) { const m = ease.out(prog(t, moneyAt, moneyAt + 0.3)); if (m > 0) { const n = Math.round(lerp(moneyFrom, money, ease.inOut(prog(t, moneyAt, moneyAt + 0.9))));
    text(g, '$' + n.toLocaleString('en-US'), E.W - 90 * u, 110 * u, { size: 84 * u, font: FONTS.ui, weight: 900, color: '#8fe08a', align: 'right', alpha: m, stroke: 12 * u, strokeColor: '#141218' }); } }
}
export function tag(g, t, str, at = 0.2, col = '#ffd23a') { const u = U(), a = ease.out(prog(t, at, at + 0.3)); if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = `900 ${44 * u}px "${FONTS.ui}"`;
  const w = g.measureText(str).width + 48 * u; g.fillStyle = 'rgba(20,18,24,.78)'; rr(g, 60 * u, 60 * u, w, 72 * u, 14 * u); g.fill();
  text(g, str, 60 * u + w / 2, 97 * u, { size: 44 * u, font: FONTS.ui, weight: 900, color: col, align: 'center' }); g.restore(); }
// name pin under a character (screen point)
export function pin(g, t, str, x, y, at = 0.3) { const u = U(), a = ease.out(prog(t, at, at + 0.3)); if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = `900 ${38 * u}px "${FONTS.ui}"`;
  const w = g.measureText(str).width + 36 * u; g.fillStyle = '#ffd23a'; rr(g, x - w / 2, y, w, 56 * u, 12 * u); g.fill(); text(g, str, x, y + 29 * u, { size: 38 * u, font: FONTS.ui, weight: 900, color: '#141218', align: 'center' }); g.restore(); }
// phone screen in the middle of the frame with chat bubbles [{from:'them'|'me', txt, at}] or a big notification
export function phone(g, t, o = {}) { const { msgs = [], who = '', at = 0, off = 99, notif = null } = o, u = U(), a = ease.out(prog(t, at, at + 0.35)) * (t < off ? 1 : 1 - clamp((t - off) / 0.25)); if (a <= 0) return;
  // phone sits in the right third by default (o.cx: centre x as a fraction of the width), never over the middle of the frame where faces are
  const sc = o.scale ?? 0.78, W = 520 * u, H = 900 * u, x = E.W * (o.cx ?? 0.8) - W * sc / 2, y = E.H / 2 - H * sc / 2 + (1 - a) * 80 * u; coversFace(x - 18 * u * sc, y - 18 * u * sc, (W + 36 * u) * sc, (H + 36 * u) * sc, 'phone screen'); g.save(); g.globalAlpha = a;
  g.translate(x, y); g.scale(sc, sc); g.translate(-x, -y);
  g.fillStyle = '#101014'; rr(g, x - 18 * u, y - 18 * u, W + 36 * u, H + 36 * u, 60 * u); g.fill(); g.fillStyle = t < off ? '#f4f4f6' : '#000'; rr(g, x, y, W, H, 46 * u); g.fill();
  g.fillStyle = '#e4e4ea'; g.fillRect(x, y + 40 * u, W, 110 * u); text(g, who, x + W / 2, y + 100 * u, { size: 44 * u, font: FONTS.ui, weight: 900, color: '#141218', align: 'center' });
  let yy = y + 210 * u; for (const m of msgs) { const k = ease.outBack(prog(t, m.at, m.at + 0.3)); if (k <= 0) continue; g.font = `800 ${50 * u}px "${FONTS.ui}"`; const tw = Math.min(W * 0.86, g.measureText(m.txt).width + 56 * u);
    const bx = m.from === 'me' ? x + W - tw - 30 * u : x + 30 * u; g.save(); g.translate(bx + tw / 2, yy + 40 * u); g.scale(k, k); g.fillStyle = m.from === 'me' ? '#2a7cff' : '#e4e4ea'; rr(g, -tw / 2, -48 * u, tw, 96 * u, 40 * u); g.fill();
    text(g, m.txt, 0, 0, { size: 50 * u, font: FONTS.ui, weight: 800, color: m.from === 'me' ? '#fff' : '#141218', align: 'center' }); g.restore(); yy += 110 * u; }
  if (notif) { const k = ease.outBack(prog(t, notif.at, notif.at + 0.35)); if (k > 0) { g.save(); g.translate(x + W / 2, y + H * 0.42); g.scale(k, k); g.fillStyle = 'rgba(40,40,48,.92)'; rr(g, -W * 0.44, -90 * u, W * 0.88, 180 * u, 30 * u); g.fill();
    text(g, notif.title, -W * 0.38, -40 * u, { size: 34 * u, font: FONTS.ui, weight: 900, color: '#9aa0aa' }); text(g, notif.txt, -W * 0.38, 25 * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); g.restore(); } }
  g.restore(); }
// "LIVE" badge + viewer count + scrolling chat (streams)
export function live(g, t, viewers = '6,000,000', at = 0) { const u = U(), a = ease.out(prog(t, at, at + 0.3)); if (a <= 0) return; g.save(); g.globalAlpha = a;
  g.fillStyle = '#e8302c'; rr(g, 60 * u, 60 * u, 150 * u, 64 * u, 10 * u); g.fill(); text(g, 'LIVE', 135 * u, 92 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#fff', align: 'center' });
  g.fillStyle = 'rgba(20,18,24,.7)'; rr(g, 225 * u, 60 * u, 300 * u, 64 * u, 10 * u); g.fill(); text(g, '👁 ' + viewers, 375 * u, 92 * u, { size: 36 * u, font: FONTS.ui, weight: 900, color: '#fff', align: 'center' });
  const lines = ['LETS GOOO', 'he is insane', '5 STARS', 'respawn kid!!', 'no way', 'RUN', 'this is real??', 'W', 'helicopters lol'];
  for (let i = 0; i < 6; i++) { const k = Math.floor(t * 3) + i, yy = E.H * 0.42 + i * 52 * u; text(g, lines[k % lines.length], E.W - 330 * u, yy, { size: 32 * u, font: FONTS.ui, weight: 800, color: '#ffffff', alpha: 0.35 + i * 0.1, stroke: 6 * u, strokeColor: '#141218' }); }
  g.restore(); }
// big respawn wipe: white flash + spinning ring
export function respawnWipe(g, t, at, dur = 0.9) { const k = prog(t, at, at + dur); if (k <= 0 || k >= 1) return; const u = U(), a = Math.sin(k * Math.PI); g.save(); g.globalAlpha = a; g.fillStyle = '#ffffff'; g.fillRect(0, 0, E.W, E.H);
  g.strokeStyle = '#2a7cff'; g.lineWidth = 18 * u; g.beginPath(); g.arc(E.W / 2, E.H / 2, 120 * u, k * 9, k * 9 + 4.2); g.stroke(); text(g, 'RESPAWNING', E.W / 2, E.H / 2 + 200 * u, { size: 56 * u, font: FONTS.ui, weight: 900, color: '#141218', align: 'center' }); g.restore(); }
// wall clock face, top-right (hh:mm advancing from a to b over the shot)
export function clockFace(g, t, dur, a = [7, 0], b = [9, 0]) { const u = U(), x = E.W - 170 * u, y = 170 * u, r = 110 * u, m0 = a[0] * 60 + a[1], m1 = b[0] * 60 + b[1], m = lerp(m0, m1, ease.inOut(clamp(t / dur)));
  g.save(); g.fillStyle = '#f4f2ec'; g.strokeStyle = '#141218'; g.lineWidth = 10 * u; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke();
  const hand = (ang, len, w) => { g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(ang) * len, y - Math.cos(ang) * len); g.stroke(); };
  hand(((m / 60) % 12) / 12 * Math.PI * 2, r * 0.5, 12 * u); hand((m % 60) / 60 * Math.PI * 2, r * 0.8, 7 * u); g.restore(); }
export { text, FONTS, alpha, rr, circle };
