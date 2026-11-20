// tpl2.js — insert close-ups and navy blueprint diagrams (atoms, energy, risk).
import { E, V, S, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, rng, seg, circle, ring, rr, poly, glow, alpha, shade, mix, linGrad, text, FONTS } from '/engine/core.js';
import { POSES } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { place, LOC, eiffel } from './sets/world.js';
import { YOU, POWER } from './cast.js';
import { camOf, atOf, post, glitch, thought } from './tpl.js';

const INK = () => S().ink, GOLD = () => S().ui.gold, CREAM = () => S().ui.cream;
const label = (g, str, x, y, a = 1, col = null, size = V(40, 44)) => text(g, str, x, y, { size, color: col || CREAM(), font: FONTS.ui, weight: 900, spacing: 3, alpha: a });

// ---------- inserts ----------
export function insertShot(g, t, info) {
  const loc = info.loc || 'park', M = mood(LOC[loc]?.mood || 'dusk'), cam = camOf(t, info, { z: 1.0 });
  blurLayer(g, 16, (g) => place(g, t, { z: 1.8, x: 120, y: -200 }, loc)); veil(g, '#0c0812', 0.35);
  layer(g, cam, 1, (g) => OBJ[info.obj]?.(g, t, info, M));
  FX.dust(g, t, { count: 30, color: M.rim, a: 0.3 });
  post(g, t, info);
}
function arm(g, x, y, ang, len, w, sleeve) { const ex = x - Math.cos(ang) * len, ey = y - Math.sin(ang) * len; seg(g, [[x, y], [ex, ey]], w, INK()); seg(g, [[x - Math.cos(ang) * len * 0.45, y - Math.sin(ang) * len * 0.45], [ex - Math.cos(ang) * 400, ey - Math.sin(ang) * 400]], w * 1.4, sleeve); }
const OBJ = {
  hand(g, t, info, M) {
    const x = E.W / 2, y = E.H * 0.56, s = 1.6, gl = info.glow ?? 1, fl = info.flicker ? (Math.floor(t * 14) % 4 ? 1 : 0.2) : 1;
    arm(g, x - 60, y + 40, -2.6, 500, 70, YOU.color);
    rr(g, x - 110, y - 20, 220, 70, 35); g.fillStyle = INK(); g.fill();
    const snap = info.snap ? atOf(info, info.snap, 0.6) : null;
    for (let i = 0; i < 4; i++) { const curl = snap != null && t > snap ? 0.9 : 0; seg(g, [[x - 80 + i * 52, y - 10], [x - 80 + i * 52 + curl * 20, y - 10 - (110 - i * 8) * (1 - curl * 0.7)]], 34, INK()); }
    seg(g, [[x + 100, y + 10], [x + 160 - (snap != null && t > snap ? 60 : 0), y - 60]], 34, INK());
    seg(g, [[x - 120, y - 20], [x - 60, y - 22]], 5, alpha(M.rim, 0.8));
    if (snap != null && t > snap) FX.rings(g, x + 60, y - 70, t - snap, { count: 3, r0: 20, r1: 260, speed: 1.6, color: POWER.core, a: 0.6 * (1 - prog(t, snap, snap + 1)) });
    g.save(); g.globalCompositeOperation = 'lighter'; const r = rng(3);
    for (let i = 0; i < 40 * gl; i++) { const a = r() * 6.28, d = 60 + ((t * 60 + r() * 200) % 200), px = x + Math.cos(a) * d * 1.4, py = y - 60 + Math.sin(a) * d * 0.8; circle(g, px, py, 2 + r() * 3, alpha(i % 3 ? POWER.core : POWER.edge, 0.8 * fl * (1 - d / 260))); }
    glow(g, x, y - 40, 300, POWER.core, 0.3 * gl * fl); g.restore();
    if (info.veins) for (let i = 0; i < 5; i++) seg(g, [[x - 300 - i * 30, y + 160 + i * 14], [x - 160 - i * 10, y + 90 + i * 8], [x - 70 + i * 30, y + 20]], 3, alpha(POWER.core, 0.6 * fl));
  },
  feet(g, t, info, M) {
    const y = E.H * 0.7; g.fillStyle = linGrad(g, 0, y - 60, 0, E.H, [mix('#d8b48a', M.dark, 0.3), mix('#a07a5a', M.dark, 0.55)]); g.fillRect(-100, y - 60, E.W + 200, E.H);
    for (const dx of [-160, 120]) { seg(g, [[E.W / 2 + dx, -100], [E.W / 2 + dx + 10, y - 30]], 60, INK()); rr(g, E.W / 2 + dx - 40, y - 60, 170, 56, 28); g.fillStyle = INK(); g.fill(); seg(g, [[E.W / 2 + dx - 30, -100], [E.W / 2 + dx - 26, y - 70]], 4, alpha(M.rim, 0.7)); }
    const w = (Math.sin(t * 1.1 - 1.2) * 0.5 + 0.5); g.fillStyle = alpha('#eaf4ff', 0.55); g.beginPath(); g.moveTo(-100, E.H); for (let x = -100; x <= E.W + 100; x += 40) g.lineTo(x, E.H - w * 230 + Math.sin(x * 0.01 + t * 2) * 12); g.lineTo(E.W + 100, E.H); g.fill();
    for (let i = 0; i < 30; i++) circle(g, (i * 137) % E.W, y + 40 + ((i * 53) % 200), 2, alpha('#fff3dc', 0.4));
  },
  clock(g, t, info, M) {
    const x = E.W / 2, y = E.H * 0.5, r = 280, mode = info.mode || 'spin';
    if (mode === 'gold') { const rr2 = rng(4); for (let i = 0; i < 40; i++) { const cx = rr2() * E.W, cy = ((rr2() * E.H + t * 260) % (E.H + 60)) - 30; g.save(); g.translate(cx, cy); g.scale(Math.cos(t * 4 + i), 1); circle(g, 0, 0, 22, GOLD()); ring(g, 0, 0, 16, 3, shade(GOLD(), -0.3)); g.restore(); } }
    const sp = mode === 'spin' ? 3600 * 6 * t * t : mode === 'stop' ? 3600 * (1 - Math.exp(-t * 3)) : 300 * t;
    glow(g, x, y, r * 1.6, mode === 'gold' ? GOLD() : M.key, 0.25);
    FX.clock(g, x, y, r, 8 * 3600 + sp, { face: mode === 'gold' ? '#ffe9b0' : '#efe9e0' });
    if (info.plane) { const px = x + r + 220, py = y - 120; g.save(); g.translate(px, py); g.fillStyle = CREAM(); g.beginPath(); g.ellipse(0, 0, 110, 18, 0, 0, 7); g.fill(); poly(g, [[-10, 0], [-60, -80], [-30, -80], [30, 0]], CREAM()); poly(g, [[-10, 0], [-60, 80], [-30, 80], [30, 0]], CREAM()); poly(g, [[-100, 0], [-120, -40], [-90, -40], [-80, 0]], CREAM()); g.restore(); const k = ease.out(prog(t, 0.6, 1.0)); seg(g, [[px - 150, py - 110], [px - 150 + 300 * k, py - 110 + 220 * k]], 18, POWER.bad); }
  },
  phone(g, t, info, M) {
    const x = E.W / 2, y = E.H * 0.52, w = 340, h = 640, frozen = info.frozen;
    arm(g, x + 40, y + 260, -1.9, 400, 80, YOU.color);
    rr(g, x - w / 2, y - h / 2, w, h, 40); g.fillStyle = '#0c0c12'; g.fill(); rr(g, x - w / 2 + 16, y - h / 2 + 40, w - 32, h - 80, 20); g.fillStyle = frozen ? '#1a2438' : '#16202e'; g.fill(); glow(g, x, y, 400, '#9fd8ff', 0.18);
    if (!frozen) {
      const k1 = ease.outBack(prog(t, 0.3, 0.7)), k2 = ease.outBack(prog(t, 1.2, 1.6));
      if (k1 > 0) { g.save(); g.translate(x - 30, y - 140); g.scale(k1, k1); rr(g, -110, -60, 220, 160, 22); g.fillStyle = '#2a3a58'; g.fill(); eiffel(g, 0, 90, 0.22, '#cfe0ff', GOLD()); g.restore(); }
      if (k2 > 0) { g.save(); g.translate(x + 40, y + 100); g.scale(k2, k2); rr(g, -110, -40, 220, 80, 30); g.fillStyle = '#3a8a5a'; g.fill(); text(g, 'LUNCH?', 0, 2, { size: 40, color: '#fff', font: FONTS.ui, weight: 900 }); g.restore(); }
      text(g, 'PARIS', x, y - h / 2 + 76, { size: 30, color: CREAM(), font: FONTS.ui, weight: 900, spacing: 4 });
    } else { const r = rng(Math.floor(t * 10)); for (let i = 0; i < 18; i++) { g.fillStyle = alpha(['#ff4fa8', '#3fe6ff', '#ffffff'][i % 3], 0.5); g.fillRect(x - w / 2 + 16, y - h / 2 + 40 + r() * (h - 80), w - 32, 4 + r() * 18); } text(g, '!', x, y, { size: 160, color: POWER.bad, font: FONTS.title, weight: 700 }); }
  },
  laptops(g, t, info, M) { for (let i = 0; i < 3; i++) { const x = E.W / 2 - 520 + i * 520, y = E.H * 0.72, sp = (Math.floor(t * 9) + i * 2) % 4 === 0; g.save(); g.translate(x, y); g.scale(2.2, 2.2); poly(g, [[-70, 0], [70, 0], [60, -90], [-60, -90]], '#1a1a24'); g.fillStyle = sp ? '#ffffff' : '#2a4a6a'; g.fillRect(-52, -82, 104, 70); g.fillStyle = '#3a3a48'; g.fillRect(-80, 0, 160, 10); g.restore(); if (sp) { glow(g, x, y - 110, 300, '#bfe8ff', 0.7); for (let k = 0; k < 8; k++) seg(g, [[x, y - 110], [x + Math.cos(k * 0.8 + t * 9) * 220, y - 110 + Math.sin(k * 0.8 + t * 9) * 160]], 3, '#fff2b0'); } FX.sparkle(g, x + 120, y - 200, 30, '#fff2b0', sp ? 1 : 0.2); } },
  tv(g, t, info, M) {
    const x = E.W / 2, y = E.H * 0.48, w = 1100, h = 620; rr(g, x - w / 2 - 20, y - h / 2 - 20, w + 40, h + 40, 20); g.fillStyle = '#0c0c12'; g.fill();
    g.save(); g.beginPath(); g.rect(x - w / 2, y - h / 2, w, h); g.clip(); g.translate(x - w / 2, y - h / 2); g.scale(w / E.W, h / E.H); place(g, t, { z: 1.1 }, 'streetNight'); g.restore();
    g.fillStyle = '#c9242a'; g.fillRect(x - w / 2, y + h / 2 - 120, w, 70); text(g, 'BREAKING NEWS', x - w / 2 + 30, y + h / 2 - 85, { size: 40, color: '#fff', font: FONTS.ui, weight: 900, align: 'left', spacing: 2 });
    g.fillStyle = '#121a30'; g.fillRect(x - w / 2, y + h / 2 - 50, w, 50); text(g, info.ticker || 'MYSTERY PERSON APPEARS OUT OF THIN AIR  ·  WITNESSES STUNNED  ·  ', x - w / 2 + 20 - ((t * 160) % 600), y + h / 2 - 25, { size: 28, color: CREAM(), font: FONTS.ui, weight: 800, align: 'left' });
    const k = 0.5 + 0.5 * Math.sin(t * 9); glow(g, x + 200, y - 30, 160, POWER.core, 0.4 * k); circle(g, x + 200, y - 120, 26, INK()); seg(g, [[x + 200, y - 94], [x + 200, y - 20]], 16, INK());
    glow(g, x, y, 900, '#9fc8ff', 0.12);
  },
  magazine(g, t, info, M) { cover(g, t, E.W / 2, E.H * 0.5, 1, info.title || 'THE TELEPORTER', 'magazine'); },
  books(g, t, info, M) { for (let i = 0; i < 3; i++) cover(g, t, E.W / 2 - 420 + i * 420, E.H * 0.52 + (i % 2) * 30, 0.62, 'THE TELEPORTER', 'book', i); const k = ease.outBack(prog(t, 0.8, 1.2)); if (k > 0) { g.save(); g.translate(E.W / 2 + 560, E.H * 0.22); g.scale(k, k); circle(g, 0, 0, 90, POWER.bad); text(g, 'BEST', 0, -18, { size: 34, color: '#fff', font: FONTS.ui, weight: 900 }); text(g, 'SELLER', 0, 22, { size: 30, color: '#fff', font: FONTS.ui, weight: 900 }); g.restore(); } },
  journal(g, t, info, M) { cover(g, t, E.W / 2, E.H * 0.5, 1, 'SCIENCE', 'journal'); },
  cup(g, t, info, M) { const x = E.W / 2 + 120, y = E.H * 0.7; blurLayer(g, 6, (g) => eiffel(g, E.W / 2 - 520, E.H * 0.8, 1.1, shade(M.dark, -0.3), M.practical)); g.fillStyle = '#f2ece4'; g.beginPath(); g.ellipse(x, y + 20, 220, 40, 0, 0, 7); g.fill(); rr(g, x - 110, y - 160, 220, 170, 40); g.fill(); g.strokeStyle = '#f2ece4'; g.lineWidth = 24; g.beginPath(); g.arc(x + 130, y - 90, 50, -1.2, 1.2); g.stroke(); g.fillStyle = '#4a2a1a'; g.beginPath(); g.ellipse(x, y - 160, 100, 20, 0, 0, 7); g.fill(); for (let i = 0; i < 4; i++) { g.strokeStyle = alpha('#ffffff', 0.25); g.lineWidth = 6; g.beginPath(); g.moveTo(x - 40 + i * 26, y - 180); g.bezierCurveTo(x - 80 + i * 26 + Math.sin(t * 2 + i) * 30, y - 260, x + i * 26, y - 320, x - 30 + i * 26 + Math.sin(t * 1.5 + i) * 30, y - 400); g.stroke(); } seg(g, [[x - 100, y - 150], [x - 100, y - 20]], 6, alpha(M.rim, 0.7)); },
  calendar(g, t, info, M) { const x0 = E.W / 2 - 560, y0 = E.H * 0.2, cw = 160, ch = 110; rr(g, x0 - 30, y0 - 90, 7 * cw + 60, 5 * ch + 130, 20); g.fillStyle = 'rgba(14,22,40,.95)'; g.fill(); ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].forEach((d, i) => label(g, d, x0 + i * cw + cw / 2, y0 - 40, 0.8, null, 28)); const cols = ['#3fb950', '#ff6f61', '#6fe6ff', '#ffd47e', '#b48cff']; for (let i = 0; i < 35; i++) { const k = ease.outBack(prog(t, i * 0.05, i * 0.05 + 0.3)), cx = x0 + (i % 7) * cw + cw / 2, cy = y0 + Math.floor(i / 7) * ch + ch / 2; rr(g, cx - cw / 2 + 6, cy - ch / 2 + 6, cw - 12, ch - 12, 8); g.fillStyle = alpha('#ffffff', 0.04); g.fill(); if (k > 0) { g.save(); g.translate(cx, cy); g.scale(k, k); rr(g, -cw / 2 + 12, -ch / 2 + 14, cw - 24, ch - 28, 8); g.fillStyle = cols[i % 5]; g.fill(); g.restore(); } } },
  roulette(g, t, info, M) { const x = E.W / 2, y = E.H * 0.55, r = 360, a = t * 2.2; circle(g, x, y, r + 30, '#3a2418'); for (let i = 0; i < 24; i++) { g.fillStyle = i === 0 ? '#2a8a4a' : i % 2 ? '#b8242a' : '#16121a'; g.beginPath(); g.moveTo(x, y); g.arc(x, y, r, a + (i / 24) * 6.283, a + ((i + 1) / 24) * 6.283); g.fill(); } circle(g, x, y, r * 0.55, '#5a3a24'); circle(g, x, y, 40, GOLD()); const ba = -t * 4 + 1, br = r * (0.86 - 0.1 * clamp(t / info.dur)); circle(g, x + Math.cos(ba) * br, y + Math.sin(ba) * br, 22, POWER.core); glow(g, x + Math.cos(ba) * br, y + Math.sin(ba) * br, 80, POWER.core, 0.6); ring(g, x + Math.cos(ba) * br, y + Math.sin(ba) * br, 34, 2, alpha(POWER.edge, 0.7)); },
  scale(g, t, info, M) {
    const x = E.W / 2, y = E.H * 0.34, tip = key(t, [[0, 0], [info.dur * 0.6, info.tip ?? 0.25]]) + Math.sin(t * 2) * 0.02, L = 460, c = GOLD();
    seg(g, [[x, y], [x, E.H * 0.86]], 20, shade(c, -0.4)); rr(g, x - 160, E.H * 0.84, 320, 30, 10); g.fillStyle = shade(c, -0.4); g.fill(); circle(g, x, y, 26, c);
    const lx = x - Math.cos(tip) * L, ly = y - Math.sin(tip) * L, rx = x + Math.cos(tip) * L, ry = y + Math.sin(tip) * L; seg(g, [[lx, ly], [rx, ry]], 14, c);
    const pan = (px, py, lbl, col) => { seg(g, [[px, py], [px - 120, py + 200]], 3, c); seg(g, [[px, py], [px + 120, py + 200]], 3, c); g.fillStyle = c; g.beginPath(); g.ellipse(px, py + 200, 150, 26, 0, 0, Math.PI); g.fill(); glow(g, px, py + 150, 120, col, 0.35); circle(g, px, py + 150, 46, col); label(g, lbl, px, py + 280, 1, CREAM(), 34); };
    pan(lx, ly, info.left || 'THRILL', POWER.core); pan(rx, ry, info.right || 'YOU', POWER.bad);
  },
  dice(g, t, info, M) { FX.stars(g, t, { area: [0, 0, E.W, E.H], count: 200 }); for (let i = 0; i < 2; i++) { const x = E.W / 2 - 200 + i * 400, y = E.H * 0.5 + Math.sin(t * 1.4 + i) * 40; g.save(); g.translate(x, y); g.rotate(t * (0.9 + i * 0.4) + i); rr(g, -110, -110, 220, 220, 34); g.fillStyle = '#e8e4f4'; g.fill(); g.strokeStyle = alpha(POWER.core, 0.8); g.lineWidth = 4; g.stroke(); const pips = i ? [[-50, -50], [50, 50], [0, 0]] : [[-50, -50], [50, -50], [-50, 50], [50, 50]]; for (const [px, py] of pips) { circle(g, px, py, 18, POWER.edge); glow(g, px, py, 40, POWER.core, 0.5); } g.restore(); } },
  bags(g, t, info, M) { for (const [dx, c] of [[-220, '#c9a77a'], [180, '#b8946a']]) { const x = E.W / 2 + dx, y = E.H * 0.82; rr(g, x - 170, y - 360, 340, 380, 20); g.fillStyle = c; g.fill(); seg(g, [[x - 60, y - 360], [x - 90, y - 560]], 40, '#e0b070'); seg(g, [[x - 20, y - 360], [x + 10, y - 540]], 34, '#d8a060'); circle(g, x + 70, y - 380, 50, '#5fb04a'); circle(g, x + 120, y - 360, 42, '#c9442a'); seg(g, [[x - 170, y - 340], [x - 170, y]], 6, alpha(M.rim, 0.6)); } },
};
function cover(g, t, x, y, s, title, kind, seed = 0) {
  g.save(); g.translate(x, y); g.scale(s, s); g.rotate(-0.04 + seed * 0.05 + Math.sin(t * 0.8) * 0.01);
  const w = 560, h = 760; rr(g, -w / 2 + 14, -h / 2 + 18, w, h, 10); g.fillStyle = 'rgba(0,0,0,.4)'; g.fill();
  rr(g, -w / 2, -h / 2, w, h, 10); g.fillStyle = kind === 'journal' ? '#e8e4dc' : kind === 'book' ? ['#2a2a4a', '#4a1a2a', '#1a3a3a'][seed % 3] : '#c9242a'; g.fill();
  if (kind === 'journal') { text(g, title, 0, -h / 2 + 90, { size: 96, color: '#b8242a', font: FONTS.serif, weight: 900 }); for (let i = 0; i < 3; i++) { g.strokeStyle = '#2a3a6a'; g.lineWidth = 4; g.beginPath(); g.ellipse(0, 40, 200, 70, i * 1.05 + t * 0.4, 0, 7); g.stroke(); } circle(g, 0, 40, 30, POWER.bad); text(g, 'QUANTUM TELEPORTATION IN A HUMAN?', 0, h / 2 - 90, { size: 26, color: '#1a1a2a', font: FONTS.ui, weight: 900 }); }
  else { text(g, title, 0, -h / 2 + (kind === 'book' ? 120 : 80), { size: kind === 'book' ? 58 : 66, color: kind === 'book' ? GOLD() : '#ffffff', font: FONTS.title, weight: 700, spacing: 3 });
    g.save(); g.beginPath(); g.rect(-w / 2 + 30, -h / 2 + 140, w - 60, h - 220); g.clip(); g.fillStyle = kind === 'book' ? alpha('#000', 0.3) : '#1a1a24'; g.fillRect(-w / 2, -h / 2, w, h);
    const r = rng(4); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 80; i++) circle(g, (r() - 0.5) * 220, 40 - r() * 380 + 200, 3 + r() * 5, alpha(i % 2 ? POWER.core : POWER.edge, 0.7)); g.globalCompositeOperation = 'source-over';
    circle(g, 0, -40, 70, alpha(INK(), 0.5)); g.fillStyle = alpha(YOU.color, 0.5); g.fillRect(-90, 40, 180, 300); text(g, '?', 0, -40, { size: 100, color: '#ffffff', font: FONTS.title, weight: 700 }); g.restore();
    if (kind !== 'book') text(g, 'WHO IS THE MYSTERY JUMPER?', 0, h / 2 - 50, { size: 26, color: '#ffffff', font: FONTS.ui, weight: 900 }); }
  g.restore();
}

// ---------- blueprint diagrams ----------
// atoms laid out on a stick figure (feet at x, y); deterministic
function figAtoms(x, y, s, n = 160, pose = POSES.stand) {
  const p = pose, segs = [[p.sh, p.hip], [p.sh, p.eF], [p.eF, p.hF], [p.sh, p.eB], [p.eB, p.hB], [p.hip, p.kF], [p.kF, p.fF], [p.hip, p.kB], [p.kB, p.fB]];
  const r = rng(11), pts = [];
  for (let i = 0; i < n; i++) {
    if (i < n * 0.28) { const a = r() * 6.28, d = 26 * Math.sqrt(r()); pts.push([x + (p.head[0] + Math.cos(a) * d) * s, y + (p.head[1] + Math.sin(a) * d) * s]); }
    else { const [a, b] = segs[Math.floor(r() * segs.length)], u = r(); pts.push([x + (lerp(a[0], b[0], u) + (r() - 0.5) * 12) * s, y + (lerp(a[1], b[1], u) + (r() - 0.5) * 12) * s]); }
  }
  return pts;
}
const cloudPt = (i, cx, cy, R, t = 0) => { const r = rng(100 + i), a = r() * 6.28 + t * (0.2 + r() * 0.3), d = R * Math.sqrt(r()); return [cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.7]; };
function atom(g, x, y, r, col, a = 1) { circle(g, x, y, r, alpha(col, a)); if (r > 3) glow(g, x, y, r * 3, col, 0.25 * a); }

export function bpShot(g, t, info) {
  UI.blueprint(g); const bp = UI.bpStroke(), gold = GOLD(), d = info.dur, k = info.kind;
  const cam = camOf(t, info, { z: 1 }); g.save(); g.translate(E.W / 2, E.H / 2); g.scale(cam.z, cam.z); g.translate(-E.W / 2 - cam.x * 0.3, -E.H / 2 - cam.y * 0.3);
  const fx = E.W / 2, fy = E.H * 0.8, fs = 2.2;
  const L = (s, x = E.W / 2, y = E.H * 0.13, at = 0.2, col = null) => label(g, s, x, y, ease.out(prog(t, at, at + 0.4)) * clamp((d - t) / 0.3), col);
  switch (k) {
    case 'scan': { UI.lineFigure(g, { x: fx, y: fy, s: fs, color: alpha(bp, 0.9) }); const sy = lerp(fy - 500, fy, (Math.sin(t * 1.6) * 0.5 + 0.5)); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, 0, sy - 30, 0, sy + 30, [alpha(gold, 0), alpha(gold, 0.5), alpha(gold, 0)]); g.fillRect(fx - 300, sy - 30, 600, 60); g.restore(); seg(g, [[fx - 320, sy], [fx + 320, sy]], 2, gold); L(info.label || 'BODY SCAN'); UI.callout(g, t, { at: [fx + 20, fy - 440], to: [fx + 420, fy - 560], str: 'MIND', start: 0.8 }); UI.callout(g, t, { at: [fx, fy - 260], to: [fx - 440, fy - 300], str: 'BODY', start: 1.2 }); break; }
    case 'dis': case 're': case 'cycle': case 'wrong': {
      const A = figAtoms(k === 're' || k === 'wrong' ? E.W * 0.72 : E.W * 0.3, fy, fs), B = A.map((_, i) => cloudPt(i, k === 're' || k === 'wrong' ? E.W * 0.3 : E.W * 0.7, E.H * 0.48, 300, t));
      let u = k === 'dis' ? ease.inOut(prog(t, 0.3, d * 0.8)) : k === 'cycle' ? 0.5 - 0.5 * Math.cos(t * 1.8) : 1 - ease.inOut(prog(t, 0.2, d * 0.75));
      if (k === 'wrong') { const W = figAtoms(E.W * 0.72, fy, fs, 160, { ...POSES.stand, hF: [40, -230], hB: [-50, -60], head: [30, -200] }); A.splice(0, A.length, ...W); }
      A.forEach(([ax, ay], i) => { const [bx, by] = B[i], uu = clamp(u * 1.4 - (i % 20) * 0.02); const x = lerp(ax, bx, uu), y = lerp(ay, by, uu) - Math.sin(uu * Math.PI) * 120; atom(g, x, y, 4.5, i % 9 === 0 ? gold : bp, 0.9); });
      if (k !== 'cycle') { g.setLineDash([12, 14]); seg(g, [[E.W * 0.4, E.H * 0.5], [E.W * 0.6, E.H * 0.5]], 3, alpha(bp, 0.4)); g.setLineDash([]); poly(g, [[E.W * 0.6, E.H * 0.5 - 14], [E.W * 0.6 + 24, E.H * 0.5], [E.W * 0.6, E.H * 0.5 + 14]], alpha(bp, 0.6)); }
      L(info.label || (k === 'dis' ? 'DISASSEMBLE' : k === 're' ? 'REASSEMBLE' : k === 'cycle' ? 'UNPACK · REPACK' : 'REASSEMBLED... DIFFERENTLY'), E.W / 2, E.H * 0.13, 0.2, k === 'wrong' ? POWER.bad : null);
      if (k === 'wrong') { const p = ease.out(prog(t, d * 0.75, d * 0.75 + 0.3)); if (p > 0) { ring(g, E.W * 0.72 + 40 * fs, fy - 230 * fs, 50 * p, 5, POWER.bad); ring(g, E.W * 0.72 - 50 * fs, fy - 60 * fs, 50 * p, 5, POWER.bad); } }
      break; }
    case 'misplace': case 'slots': case 'map': case 'rules': {
      const cols = 14, rows = 8, gx = E.W / 2 - cols * 40, gy = E.H * 0.25; const bad = k === 'misplace' ? [5 * cols + 8] : k === 'rules' ? [3, 17, 40, 66, 90, 101] : [];
      for (let i = 0; i < cols * rows; i++) { const cx = gx + (i % cols) * 80 + 40, cy = gy + Math.floor(i / cols) * 80 + 40; ring(g, cx, cy, 12, 2, alpha(bp, 0.3));
        let x = cx, y = cy, col = bp; const arr = k === 'slots' ? prog(t, i * 0.025, i * 0.025 + 0.4) : 1;
        if (k === 'slots') { const [sx, sy] = cloudPt(i, E.W / 2, E.H * 1.3, 400); x = lerp(sx, cx, ease.out(arr)); y = lerp(sy, cy, ease.out(arr)); }
        if (bad.includes(i)) { const o = ease.out(prog(t, 0.6, 1.4)); x += o * (k === 'rules' ? (i % 2 ? 1 : -1) * 220 : 160); y += o * (k === 'rules' ? -160 + (i % 3) * 80 : 120); col = POWER.bad; if (o > 0) { g.setLineDash([6, 8]); seg(g, [[cx, cy], [x, y]], 2, alpha(POWER.bad, 0.6)); g.setLineDash([]); } }
        if (k === 'map') { const known = ((i * 37) % 11) > 3 || t > 0.4 + (i % 13) * 0.12; if (!known) { text(g, '?', cx, cy, { size: 30, color: alpha(gold, 0.8), font: FONTS.ui, weight: 900 }); continue; } }
        atom(g, x, y, 9, col, 0.95); }
      if (k === 'misplace') { const p = ease.out(prog(t, 1.2, 1.6)); if (p > 0) { const cx = gx + 8 * 80 + 40 + 160, cy = gy + 5 * 80 + 40 + 120; ring(g, cx, cy, 50 * p, 5, POWER.bad); glow(g, cx, cy, 120, POWER.bad, 0.4 * p); } L(info.label || '1 ATOM OUT OF PLACE', E.W / 2, E.H * 0.13, 1.4, POWER.bad); }
      else L(info.label || (k === 'slots' ? 'EVERY ATOM, ITS PLACE' : k === 'map' ? 'WHERE WAS EVERYTHING?' : 'RULES BROKEN'), E.W / 2, E.H * 0.13, 0.3, k === 'rules' ? POWER.bad : null);
      break; }
    case 'lock': { UI.lineFigure(g, { x: E.W * 0.3, y: fy, s: fs, color: alpha(bp, 0.9) }); const hx = E.W * 0.3 + 6 * fs, hy = fy - 208 * fs; const k2 = ease.inOut(prog(t, 0.3, 1.4)); const fxx = lerp(hx, E.W * 0.66, k2), fyy = lerp(hy, E.H * 0.42, k2), w = lerp(40, 520, k2), h = w * 0.62;
      g.save(); g.beginPath(); g.rect(fxx - w / 2, fyy - h / 2, w, h); g.clip(); g.translate(fxx - w / 2, fyy - h / 2); g.scale(w / E.W, h / E.H); place(g, t, { z: 1 }, info.vision || 'himalaya'); g.restore(); seg(g, [[fxx - w / 2, fyy - h / 2], [fxx + w / 2, fyy - h / 2], [fxx + w / 2, fyy + h / 2], [fxx - w / 2, fyy + h / 2], [fxx - w / 2, fyy - h / 2]], 4, gold);
      g.setLineDash([10, 10]); seg(g, [[hx, hy], [fxx - w / 2, fyy]], 2, alpha(gold, 0.6)); g.setLineDash([]);
      const lk = ease.outBack(prog(t, 1.5, 1.9)); if (lk > 0) { g.save(); g.translate(fxx + w / 2 - 10, fyy + h / 2 - 10); g.scale(lk, lk); rr(g, -34, -20, 68, 54, 8); g.fillStyle = gold; g.fill(); g.strokeStyle = gold; g.lineWidth = 8; g.beginPath(); g.arc(0, -20, 22, Math.PI, 0); g.stroke(); g.restore(); }
      L('DESTINATION LOCKED', E.W * 0.66, E.H * 0.78, 1.6, gold); break; }
    case 'nuke': { const x = E.W * (info.fig ? 0.62 : 0.5), y = E.H * 0.82, k2 = ease.out(prog(t, 0.3, 1.8)); const fl = 1 - prog(t, 0.3, 0.9); if (fl > 0) glow(g, x, y - 100, 900, '#fff6e0', fl * 0.8);
      g.strokeStyle = gold; g.lineWidth = 5; g.beginPath(); g.moveTo(x - 40, y); g.quadraticCurveTo(x - 30, y - 200 * k2, x - 50, y - 380 * k2); g.moveTo(x + 40, y); g.quadraticCurveTo(x + 30, y - 200 * k2, x + 50, y - 380 * k2); g.stroke();
      for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI, r = 170 * k2; ring(g, x + Math.cos(a) * r * 1.3 - 0, y - 420 * k2 - Math.sin(a) * r * 0.6, 70 * k2, 4, alpha(gold, 0.8)); } g.beginPath(); g.ellipse(x, y, 360 * k2, 40 * k2, 0, 0, 7); g.stroke();
      if (info.fig) { UI.lineFigure(g, { x: E.W * 0.25, y, s: 1.8, color: alpha(bp, 0.9) }); glow(g, E.W * 0.25, y - 220, 200 * (0.6 + 0.4 * Math.sin(t * 6)), POWER.core, 0.4); label(g, '=', E.W * 0.42, E.H * 0.55, 1, gold, 90); }
      L(info.label || '≈ 1 NUCLEAR BOMB', E.W / 2, E.H * 0.13, atOf(info, info.at, 0.6), gold); break; }
    case 'precision': { const x = E.W / 2, y = E.H * 0.52, off = info.off ? ease.inOut(prog(t, 0.5, 1.6)) * 180 : 0; for (const r of [80, 160, 240]) ring(g, x, y, r, 3, alpha(bp, 0.6)); seg(g, [[x - 300, y], [x + 300, y]], 2, alpha(bp, 0.6)); seg(g, [[x, y - 300], [x, y + 300]], 2, alpha(bp, 0.6));
      const ax = lerp(E.W * 0.1, x + off, ease.out(prog(t, 0.2, 1.2))), ay = lerp(E.H * 0.2, y + off * 0.6, ease.out(prog(t, 0.2, 1.2))); atom(g, ax, ay, 18, info.off ? POWER.bad : gold); FX.rings(g, ax, ay, t, { count: 2, r0: 20, r1: 80, color: info.off ? POWER.bad : gold, a: 0.5 });
      L(info.label || (info.off ? 'MISCALCULATION' : 'PRECISION'), x, E.H * 0.13, 0.4, info.off ? POWER.bad : null); break; }
    case 'count': { const A = figAtoms(E.W * 0.27, fy, fs, 220); A.forEach(([x, y], i) => atom(g, x + Math.sin(t * 2 + i) * 2, y, 4, i % 7 ? bp : gold, 0.9)); const at = atOf(info, info.at, 0.5); const p = ease.out(prog(t, at, at + 1.2));
      if (info.long) { const digits = '7' + ','.repeat(0); const full = '7,000,000,000,000,000,000,000,000,000'; const n = Math.round(full.length * p); text(g, full.slice(0, n), E.W * 0.68, E.H * 0.44, { size: V(54, 40), color: gold, font: FONTS.ui, weight: 900, glow: 16, glowColor: alpha(gold, 0.6) }); label(g, 'ATOMS', E.W * 0.68, E.H * 0.56, p); }
      else { const a = ease.outBack(prog(t, at, at + 0.5)); g.save(); g.translate(E.W * 0.66, E.H * 0.46); g.scale(a, a); text(g, '7 × 10', -40, 0, { size: 150, color: gold, font: FONTS.ui, weight: 900, glow: 20, glowColor: alpha(gold, 0.6) }); text(g, '27', 210, -70, { size: 80, color: gold, font: FONTS.ui, weight: 900 }); g.restore(); label(g, 'ATOMS IN YOUR BODY', E.W * 0.66, E.H * 0.62, a); }
      break; }
    case 'impossible': { const A = figAtoms(E.W / 2, fy, fs); const at = atOf(info, 'impossible', d * 0.6); A.forEach(([x, y], i) => { const j = t > at ? (Math.sin(i * 7.1 + t * 9) * 26) : Math.sin(i * 3.1) * 40 * (1 - prog(t, 0, at)); atom(g, x + j, y + j * 0.5, 4.5, t > at && i % 5 === 0 ? POWER.bad : bp, 0.9); });
      const p = ease.outBack(prog(t, at, at + 0.4)); if (p > 0) { g.save(); g.translate(E.W / 2, E.H * 0.48); g.scale(p, p); seg(g, [[-200, -200], [200, 200]], 26, POWER.bad); seg(g, [[200, -200], [-200, 200]], 26, POWER.bad); g.restore(); label(g, 'IMPOSSIBLE (FOR NOW)', E.W / 2, E.H * 0.13, p, POWER.bad); } else L('CURRENT TECH', E.W / 2, E.H * 0.13); break; }
    case 'emp': { UI.lineFigure(g, { x: fx, y: fy, s: fs, color: alpha(bp, 0.9), pose: POSES.relaxed }); FX.rings(g, fx, fy - 240, t, { count: 4, r0: 80, r1: 900, speed: 0.7, color: POWER.core, a: 0.55 }); for (let i = 0; i < 6; i++) { const a = i * 1.05 + 0.3, r = 520; const x = fx + Math.cos(a) * r, y = fy - 240 + Math.sin(a) * r * 0.6; rr(g, x - 50, y - 34, 100, 68, 8); g.strokeStyle = (Math.floor(t * 6) + i) % 3 ? alpha(bp, 0.7) : POWER.bad; g.lineWidth = 3; g.stroke(); if ((Math.floor(t * 6) + i) % 3 === 0) FX.sparkle(g, x, y, 30, '#fff2b0', 0.9); } L(info.label || 'WALKING EMP', E.W / 2, E.H * 0.13, atOf(info, 'EMP', 0.4), gold); break; }
    case 'stairs': { for (let i = 0; i < 6; i++) { const x = E.W * 0.18 + i * 240, y = E.H * 0.85 - i * 100; seg(g, [[x, y], [x + 240, y], [x + 240, y - 100]], 4, alpha(bp, 0.7)); } const step = Math.min(5, Math.floor(t / (d / 6))), x = E.W * 0.18 + step * 240 + 120, y = E.H * 0.85 - step * 100; UI.lineFigure(g, { x, y, s: 1.2, color: gold }); FX.rings(g, x, y - 120, t % (d / 6), { count: 2, r0: 20, r1: 140, speed: 2, color: POWER.core, a: 0.5 }); label(g, 'UNKNOWN', E.W * 0.22, E.H * 0.94, 1, alpha(bp, 0.8), 34); label(g, 'RENOWNED', E.W * 0.82, E.H * 0.24, ease.out(prog(t, d * 0.7, d * 0.8)), gold, 44); break; }
    case 'counter': { const at = atOf(info, info.at, 0.3); for (let i = 0; i < 3; i++) { g.save(); g.translate(E.W * 0.3 + i * 130, E.H * 0.55 + (i % 2) * 110); g.rotate(t * (i % 2 ? -0.8 : 0.8)); for (let k2 = 0; k2 < 10; k2++) { g.rotate(0.628); g.fillStyle = alpha(bp, 0.7); g.fillRect(-14, -90, 28, 24); } ring(g, 0, 0, 72, 16, alpha(bp, 0.7)); g.restore(); } const n = Math.floor(lerp(812, 1284, ease.inOut(prog(t, at, d)))); label(g, 'JUMPS', E.W * 0.7, E.H * 0.36, 1, alpha(bp, 0.8)); text(g, n.toLocaleString('en-US'), E.W * 0.7, E.H * 0.5, { size: 140, color: gold, font: FONTS.ui, weight: 900, glow: 16, glowColor: alpha(gold, 0.6) }); label(g, 'COST: ???', E.W * 0.7, E.H * 0.66, ease.out(prog(t, d * 0.5, d * 0.6)), POWER.bad); break; }
    case 'cracks': case 'scramble': case 'unbalance': case 'spiral': {
      const A = figAtoms(E.W / 2, fy, fs, 200); A.forEach(([x, y], i) => { let px = x, py = y, col = i % 9 ? bp : gold;
        if (k === 'scramble') { const j = A[(i * 37 + Math.floor(t * 3) * 11) % A.length]; const u = 0.5 - 0.5 * Math.cos(t * 2 + i * 0.1); px = lerp(x, j[0], u * 0.6); py = lerp(y, j[1], u * 0.6); col = [bp, gold, POWER.bad, POWER.edge][(i + Math.floor(t * 4)) % 4]; }
        if (k === 'unbalance') { const tilt = 0.25 * ease.inOut(prog(t, 0.3, d)) + Math.sin(t * 3) * 0.04, dx = x - E.W / 2, dy = y - fy; px = E.W / 2 + dx * Math.cos(tilt) - dy * Math.sin(tilt); py = fy + dx * Math.sin(tilt) + dy * Math.cos(tilt); if (i % 4 === 0) { px += Math.sin(t * 5 + i) * 30 * tilt * 4; col = tilt > 0.15 && i % 8 === 0 ? POWER.bad : col; } }
        if (k === 'spiral') { const u = ease.in(prog(t, 0.2, d)), a = Math.atan2(y - E.H * 0.5, x - E.W / 2) + u * 6, r = Math.hypot(x - E.W / 2, y - E.H * 0.5) * (1 - u * 0.85); px = E.W / 2 + Math.cos(a) * r; py = E.H * 0.5 + Math.sin(a) * r; }
        atom(g, px, py, 4.5, col, 0.9); });
      if (k === 'cracks') { const p = ease.out(prog(t, 0.4, d * 0.8)); g.strokeStyle = POWER.bad; g.lineWidth = 4; const r = rng(8); for (let c = 0; c < 4; c++) { let x = E.W / 2 + (r() - 0.5) * 80, y = fy - 300 - r() * 150; g.beginPath(); g.moveTo(x, y); for (let s2 = 0; s2 < 6 * p; s2++) { x += (r() - 0.5) * 80; y += 20 + r() * 40; g.lineTo(x, y); } g.stroke(); } }
      if (k === 'unbalance') { seg(g, [[E.W / 2 - 360, fy + 10], [E.W / 2 + 360, fy + 10]], 6, alpha(bp, 0.6)); poly(g, [[E.W / 2, fy + 10], [E.W / 2 - 40, fy + 80], [E.W / 2 + 40, fy + 80]], alpha(bp, 0.6)); }
      L(info.label || { cracks: 'HIDDEN COSTS', scramble: 'IDENTITY: SCRAMBLED', unbalance: 'DELICATE BALANCE', spiral: 'OUT OF CONTROL' }[k], E.W / 2, E.H * 0.13, 0.4, k === 'cracks' || k === 'scramble' ? POWER.bad : null); break; }
    case 'speed': { const a = [E.W * 0.22, E.H * 0.5], b = [E.W * 0.78, E.H * 0.5]; ring(g, a[0], a[1], 110, 4, gold); for (const dx of [-0.32, 0.32]) { g.strokeStyle = gold; g.lineWidth = 5; g.beginPath(); g.ellipse(a[0] + dx * 70, a[1], 30, 44, 0, 0, 7); g.stroke(); }
      g.fillStyle = gold; g.beginPath(); g.arc(b[0], b[1] - 40, 60, Math.PI, 0); g.lineTo(b[0], b[1] + 80); g.closePath(); g.fill(); circle(g, b[0], b[1] - 40, 24, '#0b1324');
      const p = (t * 1.4) % 1; glow(g, lerp(a[0] + 120, b[0] - 70, p), a[1], 80, POWER.core, 0.9); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, a[0], 0, lerp(a[0] + 120, b[0] - 70, p), 0, [alpha(POWER.core, 0), alpha(POWER.core, 0.6)]); g.fillRect(a[0] + 120, a[1] - 4, lerp(0, b[0] - a[0] - 190, p), 8); g.restore();
      label(g, 'THOUGHT', a[0], a[1] + 170); label(g, 'ARRIVAL', b[0], b[1] + 170); UI.readout(g, { label: 'TRAVEL TIME', value: '0.000 s', x: E.W / 2, y: E.H * 0.82, align: 'center', a: ease.out(prog(t, 0.6, 1)) }); break; }
    case 'network': { const N = 14, pts = Array.from({ length: N }, (_, i) => { const r = rng(40 + i); return [E.W * (0.12 + r() * 0.76), E.H * (0.2 + r() * 0.62)]; }); pts[0] = [E.W / 2, E.H / 2];
      for (let i = 1; i < N; i++) { const on = prog(t, 0.2 + i * 0.12, 0.5 + i * 0.12), j = Math.floor(i / 2.2); seg(g, [pts[j], [lerp(pts[j][0], pts[i][0], on), lerp(pts[j][1], pts[i][1], on)]], 3, alpha(gold, 0.6)); }
      pts.forEach(([x, y], i) => { const on = t > 0.5 + i * 0.12; rr(g, x - 22, y - 38, 44, 76, 8); g.fillStyle = on ? gold : alpha(bp, 0.4); g.fill(); if (on) glow(g, x, y, 70, gold, 0.4); }); UI.lineFigure(g, { x: E.W / 2, y: E.H / 2 - 50, s: 0.5, color: POWER.core }); break; }
    case 'meter': case 'drain': { const x0 = E.W * 0.2, w = E.W * 0.6, y = E.H * 0.5, h = 120; rr(g, x0, y - h / 2, w, h, 20); g.strokeStyle = bp; g.lineWidth = 5; g.stroke(); rr(g, x0 + w + 6, y - 30, 24, 60, 6); g.fillStyle = bp; g.fill();
      const p = k === 'meter' ? ease.inOut(prog(t, 0.3, d * 0.8)) : 1 - ease.in(prog(t, 0.2, d * 0.85)); const col = k === 'meter' ? (p > 0.8 ? POWER.bad : gold) : (p < 0.3 ? POWER.bad : gold); rr(g, x0 + 12, y - h / 2 + 12, Math.max(10, (w - 24) * p), h - 24, 12); g.fillStyle = col; g.fill(); glow(g, x0 + 12 + (w - 24) * p, y, 120, col, 0.5);
      label(g, info.label || 'ENERGY NEEDED', E.W / 2, y - 140); text(g, Math.round(p * 100) + '%', E.W / 2, y + 150, { size: 90, color: col, font: FONTS.ui, weight: 900, glow: 16, glowColor: alpha(col, 0.6) }); break; }
    case 'compare': UI.compareBars(g, t, { rows: info.rows || [{ label: 'AIRCRAFT', v: 0.9 }, { label: 'YOU', v: 0.02 }], x: V(260, 120), y: E.H * 0.4, w: V(1300, 840), start: 0.3 }); L(info.label || 'TIME TO CROSS THE GLOBE', E.W / 2, E.H * 0.18); break;
  }
  g.restore();
  post(g, t, info);
}
