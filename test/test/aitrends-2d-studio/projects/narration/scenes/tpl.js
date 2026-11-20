// tpl.js — shared shot templates. Every shot in story/shots.json names a template in params.tpl and
// passes its picture as params (location, cast, expressions, teleport timing, objects). all.js registers them.
import { E, V, S, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, rng, noise, shake, wordTime, talkAmount, seg, circle, ring, rr, poly, glow, alpha, shade, mix, linGrad, radGrad, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { place, LOC, ground, eiffel } from './sets/world.js';
import { WHO, YOU, POWER } from './cast.js';

// ---------- small shared helpers ----------
export const wt = (info, word, fb = 0.3) => { const w = word ? wordTime(word, info.shot.start - 0.05) : null; return w != null && w < info.shot.end ? w - info.shot.start : fb; };
export const atOf = (info, v, fb = 0.4) => (typeof v === 'string' ? wt(info, v, fb) : v ?? fb);
const CAMS = ['push', 'left', 'pull', 'right', 'push', 'rise'];
export function camOf(t, info, base = {}) {
  const k = ease.inOut(clamp(t / info.dur)), mv = info.cam || CAMS[parseInt(info.shot.id.slice(1)) % CAMS.length];
  const c = { z: base.z ?? 1, x: base.x ?? 0, y: base.y ?? 0, r: base.r ?? 0 };
  if (mv === 'push') c.z += 0.08 * k; else if (mv === 'pull') c.z += 0.08 * (1 - k);
  else if (mv === 'left') { c.x -= 50 * k - 25; c.z += 0.03; } else if (mv === 'right') { c.x += 50 * k - 25; c.z += 0.03; }
  else if (mv === 'rise') { c.y -= 40 * k - 20; c.z += 0.04 * k; } else if (mv === 'roll') { c.r += 0.03 * k - 0.015; c.z += 0.05 * k; }
  if (info.shakeAmp) { const [sx, sy] = shake(t, info.shakeAmp, 2.2); c.x += sx; c.y += sy; }
  return c;
}
const poseOf = (p) => (typeof p === 'string' ? POSES[p] || POSES.stand : p || POSES.stand);

// glitch: horizontal slice displacement + chroma tint, deterministic in t (motif grows through acts 4–5)
export function glitch(g, t, amt = 0.3, seed = 1) {
  if (amt <= 0) return; const c = g.canvas, W = c.width, H = c.height, r = rng(Math.floor(t * 12) * 7 + seed);
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  const n = Math.round(4 + amt * 14);
  for (let i = 0; i < n; i++) { if (r() > 0.35 + amt * 0.6) continue; const y = r() * H, h = (6 + r() * 60) * E.PX * (0.5 + amt), dx = (r() - 0.5) * 140 * E.PX * amt; g.drawImage(c, 0, y, W, h, dx, y, W, h); }
  g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 3; i++) { if (r() > amt) continue; const y = r() * H; g.fillStyle = alpha(i % 2 ? POWER.core : POWER.bad, 0.12 * amt); g.fillRect(0, y, W, (4 + r() * 30) * E.PX); }
  g.restore();
}
export function tint(g, color, a, op = 'soft-light') { g.save(); g.globalCompositeOperation = op; g.fillStyle = alpha(color, a); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.restore(); }

// ---------- teleport effect ----------
// returns figure visibility 0..1 for mode in/out/both/fail at time `at` (and `at2` for both), drawing particles and light.
export function teleport(g, t, x, y, s, mode, at = 0.4, at2 = 1e9, seed = 1, col = POWER) {
  const H = 220 * s, cx = x, cy = y - H / 2; let vis = 1;
  const burst = (t0, dirIn) => {
    const k = (t - t0) / 0.9; if (k < -0.7 || k > 1.2) return;
    const r = rng(seed + Math.round(t0 * 10)); g.save(); g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 70; i++) {
      const px = cx + (r() - 0.5) * 70 * s, py = y - r() * H, a = r() * 6.28, d = (40 + r() * 220) * s, up = (60 + r() * 200) * s;
      const u = dirIn ? clamp(-k / 0.7) : clamp(k); if (u <= 0 && !dirIn) continue;
      const qx = px + Math.cos(a) * d * ease.out(u), qy = py + Math.sin(a) * d * 0.4 * ease.out(u) - up * u;
      const al = (dirIn ? (k < 0 ? 1 - u : 1 - clamp(k * 2)) : 1 - u) * 0.9; if (al <= 0) continue;
      circle(g, qx, qy, (2 + r() * 4) * s, alpha(i % 3 ? col.core : col.edge, al)); if (i % 6 === 0) glow(g, qx, qy, 18 * s, col.core, al * 0.6);
    }
    const flash = 1 - clamp(Math.abs(t - t0) / 0.35);
    if (flash > 0) { g.fillStyle = linGrad(g, cx - 60 * s, 0, cx + 60 * s, 0, [alpha(col.core, 0), alpha(col.hot, 0.55 * flash), alpha(col.core, 0)]); g.fillRect(cx - 60 * s, y - H * 2.2, 120 * s, H * 2.2); glow(g, cx, cy, 260 * s, col.core, 0.7 * flash); }
    g.restore();
    if (Math.abs(t - t0) < 1.1) FX.rings(g, cx, cy, t - t0, { count: 2, r0: 30 * s, r1: 240 * s, speed: 1.2, color: col.core, a: 0.5 * (1 - clamp(Math.abs(t - t0) / 1.1)) });
  };
  if (mode === 'out' || mode === 'both') { const o = mode === 'both' ? at2 : at; vis = Math.min(vis, 1 - prog(t, o, o + 0.3)); burst(o, false); }
  if (mode === 'in' || mode === 'both') { vis = Math.min(vis, prog(t, at, at + 0.25)); burst(at, true); }
  if (mode === 'fail') { const k = prog(t, at, at + 1.6); if (k > 0 && k < 1) { vis = 0.55 + 0.45 * (Math.floor(t * 18) % 3 ? 1 : 0); const r = rng(seed); g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 30; i++) { const px = cx + (r() - 0.5) * 120 * s + Math.sin(t * 40 + i) * 6, py = y - r() * H; circle(g, px, py, 3 * s, alpha(i % 2 ? POWER.bad : col.core, 0.7 * (1 - k))); } g.restore(); FX.rings(g, cx, cy, t - at, { count: 3, r0: 40 * s, r1: 200 * s, speed: 1.6, color: POWER.bad, a: 0.5 * (1 - k) }); } }
  if (mode === 'ghost') vis = 0.35 + 0.15 * Math.sin(t * 9);
  return vis;
}

// a figure from a cast entry {w, x, pose, poses, expr, exprs, facing, s, walk, prop, tp, at, at2, alpha}
export function actor(g, t, info, c, GY, M, base) {
  const s = (c.s ?? 1) * base, of = WHO[c.w] || YOU;
  let x = E.W / 2 + (c.x ?? 0), pose = c.poses ? posesAt(t, c.poses.map(([a, p]) => [a, poseOf(p)])) : poseOf(c.pose);
  if (c.walk) { const ph = t * 6.28 * (c.run ? 1.6 : 0.9); pose = walkPose(ph, { run: !!c.run }); x += c.walk * t * (c.run ? 420 : 160) * s; }
  else if (!c.still) pose = breathe(pose, t, 1, (c.x ?? 0) | 0);
  const y = GY + (c.y ?? 0);
  const expr = c.exprs ? c.exprs.reduce((e, [a, v]) => (t >= atOf(info, a) ? v : e), c.expr || 'neutral') : c.expr || 'neutral';
  let vis = c.alpha ?? 1;
  if (c.tp) vis *= teleport(g, t, x, y, s, c.tp, atOf(info, c.at, 0.4), atOf(info, c.at2, 1e9), (c.x | 0) + 3);
  if (vis > 0.01) drawFigure(g, { x, y, s, facing: c.facing ?? 1, outfit: of, pose, expr, rot: c.rot, prop: c.prop, alpha: vis, blink: (t % (2.9 + (c.x | 0) % 7 * 0.1)) > 2.8 + (c.x | 0) % 7 * 0.1, look: c.look, talk: c.talk ? talkAmount(info.globalT, info.shot.start, info.shot.end) : 0,
    rim: { color: c.tp && Math.abs(t - atOf(info, c.at, 0.4)) < 0.6 ? POWER.core : M.rim, dir: c.rimDir || [0.4, -1], w: 4.5 }, trail: c.trail, shadow: c.rot ? false : undefined });
  return { x, y, s };
}

// ---------- stage: any location, any cast, teleports and extras ----------
const SIZE = { wide: 1.0, med: 1.65, close: 2.3 };
export function stage(g, t, info) {
  const sz = SIZE[info.size || 'wide'], loc = info.loc || 'park';
  const GY0 = ground(), focusY = sz > 1 ? (GY0 - 120 * sz) - E.H * 0.52 : 0;
  const cam = camOf(t, info, { z: info.z ?? (sz > 1.2 ? 1 + (sz - 1) * 0.12 : 1), y: info.camY ?? focusY * 0.5, x: info.camX ?? 0 });
  const { GY, M } = place(g, t, cam, loc);
  if (info.storm) FX.rain(g, t, { count: 260 });
  layer(g, cam, 1, (g) => {
    if (info.extraBack) extra(g, t, info, info.extraBack, GY, M, sz);
    (info.cast || []).forEach((c) => actor(g, t, info, c, GY, M, sz));
    if (info.extra) extra(g, t, info, info.extra, GY, M, sz);
  });
  if ([].concat(info.extra || []).includes('thought')) thought(g, t, info.vision || 'paris', E.W * 0.68, E.H * 0.3, V(190, 170));
  atmos(g, t, LOC[loc], M);
  if (info.crowdFg) blurLayer(g, 10, (g) => FX.crowd(g, t, { y: E.H - 60, rows: 2, rowH: 50, size: 4.5, color: shade(M.dark, -0.4), cheer: info.cheer ?? 0.6 }), cam, 1.6);
  if (info.fg) blurLayer(g, 12, (g) => fgProp(g, info.fg, M), cam, 1.7);
  post(g, t, info);
}
export function atmos(g, t, L, M) {
  if (!L) return;
  if (L.snow) FX.snow(g, t, { count: 180, speed: 120 });
  if (L.rain) FX.rain(g, t, { count: 300 });
  if (L.dust) FX.dust(g, t, { count: 40, color: L.dust, a: 0.35 });
  else FX.dust(g, t, { count: 30, color: alpha(M.rim, 1), a: 0.25 });
}
export function post(g, t, info) {
  if (info.cool) tint(g, '#4a6aff', info.cool);
  if (info.warn) tint(g, POWER.bad, info.warn * (0.6 + 0.4 * Math.sin(t * 8)));
  if (info.glitch) glitch(g, t, typeof info.glitch === 'number' ? info.glitch : 0.3, parseInt(info.shot.id.slice(1)));
  if (info.badge) UI.badge(g, { str: info.badge, a: ease.out(prog(t, atOf(info, info.badgeAt, 0.4), atOf(info, info.badgeAt, 0.4) + 0.4)) });
  if (info.readout) UI.readout(g, { label: info.readout[0], value: info.readout[1], x: V(140, 90), y: E.H - V(190, 620), a: ease.out(prog(t, atOf(info, info.readoutAt, 0.5), atOf(info, info.readoutAt, 0.5) + 0.4)) * clamp((info.dur - t) / 0.3) });
}
function fgProp(g, kind, M) {
  const c = shade(M.dark, -0.5);
  if (kind === 'plant') { for (let i = 0; i < 7; i++) { g.save(); g.translate(120, E.H + 40); g.rotate(-0.9 + i * 0.22); rr(g, -24, -420, 48, 420, 24); g.fillStyle = c; g.fill(); g.restore(); } }
  else if (kind === 'glass') { rr(g, E.W - 260, E.H - 360, 120, 300, 30); g.fillStyle = alpha('#cfe0ff', 0.35); g.fill(); }
  else if (kind === 'rail') { g.fillStyle = c; g.fillRect(-100, E.H - 160, E.W + 200, 24); for (let x = 0; x < E.W; x += 140) g.fillRect(x, E.H - 160, 16, 200); }
  else if (kind === 'heads') FX.crowd(g, 0, { y: E.H - 30, rows: 1, rowH: 50, size: 6, color: c });
}

// ---------- extras drawn in the character plane ----------
function extra(g, t, info, kinds, GY, M, sz) {
  for (const k of [].concat(kinds)) switch (k) {
    case 'birds': { const r = rng(7); for (let i = 0; i < 9; i++) { const bx = ((r() * E.W * 1.4 + t * (60 + r() * 60)) % (E.W * 1.4)) - 200, by = GY - 520 - r() * 220 + Math.sin(t * 2 + i) * 20, w = Math.sin(t * 12 + i * 2) * 10; seg(g, [[bx - 16, by - w], [bx, by], [bx + 16, by - w]], 3.5, shade(M.dark, -0.4)); } break; }
    case 'cars': { const cols = ['#c9442a', '#3a6ea5', '#e8c04a', '#5a5a6a', '#7a3a8a', '#d8d8e0']; for (let lane = 0; lane < 2; lane++) for (let i = -4; i < 6; i++) { const x = E.W / 2 + i * 300 + lane * 150 + Math.sin(t * 0.7 + i) * 4, y = GY + 40 + lane * 120; car(g, x, y, (1 + lane * 0.2), cols[(i + 4 + lane * 3) % 6], M); } break; }
    case 'confetti': { const r = rng(9); for (let i = 0; i < 90; i++) { const x = r() * E.W, y = ((r() * E.H + t * (90 + r() * 80)) % (E.H + 40)) - 20; g.save(); g.translate(x + Math.sin(t * 3 + i) * 20, y); g.rotate(t * 4 + i); g.fillStyle = ['#ff4fa8', '#3fe6ff', '#ffd45a', '#9b6bff', '#ffffff'][i % 5]; g.fillRect(-5, -3, 10, 6); g.restore(); } break; }
    case 'flashes': { const r = rng(13); for (let i = 0; i < 14; i++) { const ph = r() * 6.28, f = Math.max(0, Math.sin(t * (5 + r() * 4) + ph) - 0.85) * 6.5; if (f > 0) { const x = r() * E.W, y = GY - 200 - r() * 300; glow(g, x, y, 160, '#ffffff', f); FX.sparkle(g, x, y, 50, '#ffffff', f); } } break; }
    case 'sparks': { const k0 = atOf(info, info.sparkAt, 0.5); if (t < k0) break; const r = rng(17); g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 60; i++) { const sx = E.W * (0.1 + r() * 0.8), sy = GY - 260 - r() * 380, a = r() * 6.28, d = ((t - k0) * (100 + r() * 300)) % 160; if ((Math.floor(t * 8) + i) % 4) continue; seg(g, [[sx, sy], [sx + Math.cos(a) * d, sy + Math.sin(a) * d + d * d * 0.004]], 2.5, alpha('#fff2b0', 0.8)); } g.restore(); if (Math.floor(t * 9) % 3 === 0) veil(g, '#000', 0.35); break; }
    case 'dolphins': for (let i = 0; i < 3; i++) { const ph = ((t * 0.55 + i * 0.37) % 1), x = E.W / 2 - 600 + i * 520 + ph * 260, y = GY - 140 - Math.sin(ph * Math.PI) * 260, ang = Math.cos(ph * Math.PI) * -0.9; if (ph < 0.95) dolphin(g, x, y, ang, 1.1, shade('#3a5a7a', -0.2)); } break;
    case 'swim': { const x = E.W / 2 - 120, y = GY - 150; circle(g, x, y - 26, 26, S().ink); g.fillStyle = YOU.color; g.fillRect(x - 40, y - 4, 80, 14); FX.rings(g, x, y, t, { count: 3, r0: 40, r1: 160, speed: 0.6, color: '#cfe8ff', a: 0.3 }); break; }
    case 'ripple': { const x = E.W / 2 + (info.rippleX ?? 0); for (let i = 0; i < 4; i++) { const k = ((t * 0.5 + i / 4) % 1); g.strokeStyle = alpha(POWER.core, 0.4 * (1 - k)); g.lineWidth = 3; g.beginPath(); g.ellipse(x, GY - 110, 60 + k * 420, 110 + k * 260, 0, 0, 7); g.stroke(); } glow(g, x, GY - 110, 200, POWER.edge, 0.2 + 0.1 * Math.sin(t * 5)); break; }
    case 'sunOrb': { const c = info.cast?.[0], x = E.W / 2 + (c?.x ?? 0) + (c?.walk ? c.walk * t * 160 * sz : 0), y = GY - 200 * sz; glow(g, x, y, 260, '#ffd59a', 0.55); circle(g, x, y, 34, '#fff3dc'); FX.godRays(g, x, y, { count: 12, spread: 6.28, len: 500, a: 0.08, t }); break; }
    case 'weight': { const c = info.cast?.[0], x = E.W / 2 + (c?.x ?? 0) + (c?.walk ? c.walk * t * 160 * sz : 0) - 60 * sz, y = GY - 230 * sz; circle(g, x, y, 60 * sz, shade(M.dark, -0.5)); ring(g, x, y, 60 * sz, 4, alpha(POWER.edge, 0.6)); glow(g, x, y, 120 * sz, POWER.edge, 0.2); break; }
    case 'bags': { const x = E.W / 2 + (info.cast?.[0]?.x ?? 0) + 60 * sz, y = GY - 60 * sz; rr(g, x - 30 * sz, y - 60 * sz, 60 * sz, 70 * sz, 8); g.fillStyle = '#c9a77a'; g.fill(); seg(g, [[x - 6 * sz, y - 60 * sz], [x - 14 * sz, y - 100 * sz]], 10 * sz, '#e0b070'); circle(g, x + 12 * sz, y - 64 * sz, 12 * sz, '#5fb04a'); break; }
    case 'hose': { const x = E.W / 2 + 420, y = GY - 140; g.strokeStyle = alpha('#cfe8ff', 0.7); g.lineWidth = 5; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 120, y - 60 + i * 4, x + 220 + i * 10, y + 80); g.stroke(); } break; }
    case 'table': { const x = E.W / 2 + (info.tableX ?? 0); g.fillStyle = '#1e1418'; g.fillRect(x - 130, GY - 160, 260, 14); seg(g, [[x, GY - 150], [x, GY]], 10, '#1e1418'); rr(g, x + 30, GY - 192, 28, 32, 5); g.fillStyle = '#f2ece4'; g.fill(); for (let i = 0; i < 3; i++) seg(g, [[x + 44 + Math.sin(t * 2 + i) * 4, GY - 200 - i * 12], [x + 44 + Math.sin(t * 2 + i + 1) * 4, GY - 210 - i * 12]], 2, alpha('#ffffff', 0.3)); break; }
    case 'chairs': for (const d of [-1, 1]) { g.save(); g.translate(E.W / 2 + d * (info.chairDX ?? 200), 0); g.scale(d * -1, 1); FX.chair(g, 0, GY, 1.6 * sz / 1.65, '#24181e'); g.restore(); } break;
    case 'laptops': for (let i = 0; i < 5; i++) { const x = E.W / 2 - 700 + i * 260, y = GY - 150, sp = (Math.floor(t * 10) + i) % 3 === 0; laptop(g, x, y, 1, sp, t); } break;
    case 'shadows': { g.save(); g.globalAlpha = 0.5; for (const c of info.cast || []) { const x = E.W / 2 + (c.x ?? 0); poly(g, [[x - 20, GY], [x + 20, GY], [x + 900 + t * 40, GY + 260], [x + 820 + t * 40, GY + 300]], '#000'); } g.restore(); break; }
    case 'emp': { const k0 = atOf(info, info.empAt, 0.5); if (t > k0) { FX.rings(g, E.W / 2 + (info.cast?.[0]?.x ?? 0), GY - 120 * sz, t - k0, { count: 3, r0: 40, r1: 900, speed: 0.9, color: POWER.core, a: 0.45 }); } break; }
    case 'scanbeam': { const x = E.W / 2 + 520, sy = GY - 440 + ((t * 220) % 440); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha('#7fd0d6', 0.25); g.fillRect(x - 170, sy - 8, 340, 16); g.restore(); break; }
    case 'chart': { const x = E.W / 2 - 860, y = GY - 600; rr(g, x, y, 420, 260, 14); g.fillStyle = 'rgba(14,22,40,.92)'; g.fill(); const p = ease.inOut(prog(t, 0.3, info.dur - 0.4)); g.strokeStyle = POWER.bad; g.lineWidth = 5; g.beginPath(); for (let i = 0; i <= 60 * p; i++) g.lineTo(x + 30 + i * 6, y + 220 - Math.pow(i / 60, 2) * 170 - Math.sin(i * 1.3) * 6); g.stroke(); text(g, info.chartLabel || 'MOLECULAR TENSION', x + 30, y + 34, { size: 24, color: S().ui.cream, font: FONTS.ui, weight: 900, align: 'left', spacing: 2 }); break; }
    case 'keys': { const x = E.W / 2 + (info.keysX ?? 360), y = GY - 4; ring(g, x, y - 12, 12, 4, '#d8c070'); seg(g, [[x + 10, y - 8], [x + 46, y - 4]], 6, '#c8c8d0'); FX.sparkle(g, x + 20, y - 14, 16, '#ffffff', 0.5 + 0.5 * Math.sin(t * 5)); break; }
    case 'rope': { g.strokeStyle = '#8a1a2a'; g.lineWidth = 8; g.beginPath(); for (let x = -200; x < E.W + 200; x += 260) { g.moveTo(x, GY - 90); g.quadraticCurveTo(x + 130, GY - 50, x + 260, GY - 90); } g.stroke(); for (let x = -200; x < E.W + 200; x += 260) { g.fillStyle = '#d8b060'; g.fillRect(x - 6, GY - 120, 12, 120); } g.fillStyle = alpha('#a0182a', 0.85); g.fillRect(-E.W, GY - 10, E.W * 3, 60); break; }
  }
}
function car(g, x, y, s, c, M) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -110, -60, 220, 50, 16); g.fillStyle = shade(c, -0.35); g.fill(); rr(g, -70, -100, 130, 50, 18); g.fill(); g.fillStyle = alpha('#9fc8ff', 0.35); g.fillRect(-56, -92, 46, 34); g.fillRect(-4, -92, 50, 34); circle(g, -66, -10, 22, '#0c0a10'); circle(g, 66, -10, 22, '#0c0a10'); glow(g, 108, -40, 40, '#ff4a3a', 0.6); g.restore(); }
function dolphin(g, x, y, a, s, c) { g.save(); g.translate(x, y); g.rotate(a); g.scale(s, s); g.fillStyle = c; g.beginPath(); g.ellipse(0, 0, 90, 26, 0, 0, 7); g.fill(); poly(g, [[-80, 0], [-130, -26], [-120, 0], [-130, 26]], c); poly(g, [[0, -20], [-26, -54], [-30, -18]], c); poly(g, [[86, -4], [118, 2], [86, 8]], c); g.fillStyle = alpha('#cfe8ff', 0.4); g.fillRect(-60, -24, 120, 4); g.restore(); }
function laptop(g, x, y, s, spark, t) { g.save(); g.translate(x, y); g.scale(s, s); poly(g, [[-70, 0], [70, 0], [60, -90], [-60, -90]], '#1a1a24'); g.fillStyle = spark ? '#ffffff' : '#2a4a6a'; g.fillRect(-52, -82, 104, 70); g.fillStyle = '#3a3a48'; g.fillRect(-80, 0, 160, 10); if (spark) { glow(g, 0, -50, 120, '#bfe8ff', 0.6); for (let i = 0; i < 5; i++) seg(g, [[0, -50], [Math.cos(i * 1.3 + t * 9) * 70, -50 + Math.sin(i * 1.3 + t * 9) * 60]], 2, '#fff2b0'); } g.restore(); }

// a thought / vision bubble that shows another location, used for "picture the place" beats
export function thought(g, t, loc, x, y, r) {
  g.save(); for (let i = 0; i < 3; i++) circle(g, x - r * 0.9 - i * 34, y + r * 0.8 + i * 30, 12 - i * 3, alpha(POWER.core, 0.7));
  g.beginPath(); g.arc(x, y, r, 0, 7); g.clip(); g.translate(x, y); g.scale(r / (E.H * 0.42), r / (E.H * 0.42)); g.translate(-E.W / 2, -E.H * 0.55);
  place(g, t, { z: 1, x: 0 }, loc); g.restore(); ring(g, x, y, r, 6, alpha(POWER.core, 0.9)); glow(g, x, y, r * 1.4, POWER.core, 0.25);
}

// ---------- face: giant close-up over the blurred location ----------
export function faceShot(g, t, info) {
  const loc = info.loc || 'park', M = mood(LOC[loc]?.mood || 'dusk'), side = info.side ?? -1;
  blurLayer(g, 14, (g) => place(g, t, { z: 1.6, x: side * 160, y: -140 }, loc)); veil(g, '#0c0812', 0.38);
  if (LOC[loc]?.snow) FX.snow(g, t, { count: 120, speed: 90 });
  const r = V(300, 330) * (1 + 0.05 * ease.inOut(t / info.dur)), cx = E.W / 2 + (info.fx ?? (info.vision ? -260 : 0)), cy = E.H * V(0.6, 0.55);
  const expr = info.exprs ? info.exprs.reduce((e, [a, v]) => (t >= atOf(info, a) ? v : e), info.expr || 'neutral') : info.expr || 'neutral';
  const [sx, sy] = info.shakeAmp ? shake(t, info.shakeAmp, 3) : [0, 0];
  if (info.aura) { glow(g, cx, cy, r * 2.2, POWER.core, 0.25 + 0.1 * Math.sin(t * 6)); }
  bigFace(g, cx + sx, cy + sy, r, { outfit: WHO[info.who] || YOU, expr, look: info.look || [0, 0], rimColor: info.aura ? POWER.core : M.rim, rimSide: side, blink: (t % 3.3) > 3.2, talk: info.talk ? talkAmount(info.globalT, info.shot.start, info.shot.end) : 0, tilt: info.tilt || 0 });
  if (info.veins) { g.save(); g.globalCompositeOperation = 'lighter'; const r2 = rng(5); for (let i = 0; i < 9; i++) { let x = cx + (r2() - 0.5) * r * 1.6, y = cy + r * 0.9 + r2() * r * 0.4; g.strokeStyle = alpha(POWER.core, 0.5 + 0.3 * Math.sin(t * 6 + i)); g.lineWidth = 3; g.beginPath(); g.moveTo(x, y); for (let k = 0; k < 6; k++) { x += (r2() - 0.5) * 50; y -= 30 + r2() * 20; g.lineTo(x, y); } g.stroke(); } g.restore(); }
  if (info.sparkles) for (let i = 0; i < 10; i++) { const a = i * 0.63 + t * 0.6, d = r * (1.15 + 0.15 * Math.sin(t * 2 + i)); FX.sparkle(g, cx + Math.cos(a) * d, cy + Math.sin(a) * d, 14 + 6 * Math.sin(t * 5 + i), POWER.core, 0.7); }
  if (info.vision) thought(g, t, info.vision, cx + r * 1.55, cy - r * 0.55, V(200, 160));
  if (info.mics) for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI - Math.PI, mx = cx + Math.cos(a) * r * 1.5 + (i % 2 ? -1 : 1) * 40, my = E.H + 20; const k = ease.out(prog(t, i * 0.15, i * 0.15 + 0.5)); seg(g, [[mx, my], [lerp(mx, cx + Math.cos(a) * r * 1.1, k), lerp(my, cy + r * 0.6, k)]], 26, S().ink); circle(g, lerp(mx, cx + Math.cos(a) * r * 1.1, k), lerp(my, cy + r * 0.6, k) - 20, 30, '#3a3a48'); }
  if (info.flashes) extra(g, t, info, 'flashes', E.H * 0.9, M, 1);
  post(g, t, info);
}

// ---------- line: a big question / chapter line over the blurred location ----------
export function lineShot(g, t, info) {
  const loc = info.loc || 'parkSunset';
  blurLayer(g, 12, (g) => place(g, t, camOf(t, info, { z: 1.2 }), loc)); veil(g, '#0a0710', 0.5);
  atmos(g, t, LOC[loc], mood(LOC[loc]?.mood));
  UI.bigLine(g, t, { str: info.str || '', dur: info.dur, y: E.H * 0.48, size: info.textSize || V(84, 76), color: info.red ? POWER.bad : S().ui.gold });
  post(g, t, info);
}

// ---------- title card ----------
export function titleShot(g, t, info) {
  const cam = camOf(t, info, { z: 1.04 });
  const { GY, M } = place(g, t, cam, info.loc || 'parkSunset');
  layer(g, cam, 1, (g) => actor(g, t, info, { w: 'you', x: 0, s: 0.8, pose: 'stand', tp: 'ghost' }, GY, M, 1));
  veil(g, '#0a0710', 0.25);
  FX.drops(g, t, { count: 30, color: POWER.core, rMax: 6, drift: 6 });
  UI.titleCard(g, t, { lines: info.lines || ['WHAT IF', 'YOU COULD TELEPORT?'], dur: info.dur, y: E.H * V(0.36, 0.38) });
}
