// shots/01_hook.js — 0:00-2:05: the blank bathroom wall, the messy street, Gary, the promise, Room 1 (the rewind, Versailles, Liebig).
import { E, V, ease, prog, clamp, lerp, box, cyl, ball, THREE } from './_lib.js';
import { S } from './_spec.js';
import { card, title, stamp, cross, check, person } from './_info.js';
import { FZ, FNZ, FX, FNX, KIP, MESSY, LOUIS, leaves, hat, crown, SR, CR, roomCard, face2d, pigeon, animPigeon, pigeon2d, eagle2d, thought, scr3, text, FONTS, alpha, rr, glow, circle, ring, U } from './_mirror.js';

const ME = KIP, R1 = SR(1), C1 = CR(1);
const lift = (s, y = 0.14) => Object.values(s.F).forEach((f) => (f.position.y = y));
const mirrorCam = (z = -0.95, x = 0) => ({ p: [x + 0.15, 1.5, -2.35], l: [x, 1.42, z], p2: [x + 0.08, 1.5, -2.2], subj: ['me'] });
const qmarks = (g, t, s, at) => { if (t < at) return; const [x, y] = scr3(s, [s.F.me.position.x, 2.0, s.F.me.position.z]), u = U(); for (let i = 0; i < 3; i++) { const k = ease.outBack(prog(t, at + i * 0.25, at + i * 0.25 + 0.3)); if (k <= 0) continue;
  text(g, '?', x + (i - 1) * 90 * u, y - 40 * u + Math.sin(t * 4 + i) * 8 * u, { size: 90 * u * k, font: FONTS.title, weight: 900, color: '#ffd23f', stroke: 10 * u, strokeColor: '#141218' }); } };

// ---------- hook ----------
S('h01', { set: 'bathroom', cast: { me: [ME, 2.8, 0.6, FNX] },
  walk: { me: { path: [[2.8, 0.6], [0.9, 0.0], [0, -1.5]], t0: 0.2, t1: 2.7, spd: 5.2, face: FNZ } },
  exprs: { me: [[0, 'sleepy'], [3.0, 'confused']] }, poses: { me: [[0, 'stand'], [3.2, 'shrug']] },
  cam: { p: [1.4, 1.7, 2.3], l: [0.2, 1.4, -2.3], p2: [0.6, 1.62, 1.2], l2: [0, 1.5, -2.4] }, caps: [['NO MIRROR.', 3.0]] });
S('h02', { set: 'bathroom', cast: { me: [ME, 0, -0.95, FNZ] }, exprs: { me: [[0, 'confused'], [1.2, 'worried']] }, poses: { me: [[0, 'stand'], [1.1, 'shrug']] },
  cam: mirrorCam(), caps: [['NOT BROKEN.', 0.1, { dur: 1.15 }], ['NOT MISSING.', 1.2]] });
card('h03', 'dark', (g, t, i, u, cx, cy, acc) => {
  const a = 1 - ease.inOut(prog(t, 1.0, 2.2)), j = t > 1.0 && t < 2.2 ? Math.sin(t * 60) * 14 * u : 0; g.save(); g.globalAlpha = a;
  g.strokeStyle = '#d4a83a'; g.lineWidth = 26 * u; g.beginPath(); g.ellipse(cx + j, cy - 60 * u, 190 * u, 260 * u, 0, 0, 7); g.stroke();
  const gr = g.createLinearGradient(cx - 190 * u, cy - 320 * u, cx + 190 * u, cy + 200 * u); gr.addColorStop(0, '#dfeaf2'); gr.addColorStop(0.5, '#a8bccc'); gr.addColorStop(1, '#f4f8fb'); g.fillStyle = gr; g.beginPath(); g.ellipse(cx + j, cy - 60 * u, 178 * u, 248 * u, 0, 0, 7); g.fill(); g.restore();
  g.save(); g.setLineDash([18 * u, 14 * u]); g.globalAlpha = 1 - a; g.strokeStyle = alpha('#ffffff', 0.4); g.lineWidth = 6 * u; g.beginPath(); g.ellipse(cx, cy - 60 * u, 190 * u, 260 * u, 0, 0, 7); g.stroke(); g.restore();
  title(g, t, 'IT NEVER EXISTED.', cy + 300 * u, { at: 0.1, size: 92 }); title(g, t, 'NOBODY EVER INVENTED ONE.', cy + 400 * u, { at: 1.8, size: 64, color: '#b48cff' }); });
S('h04', { set: 'bathroom', cast: { me: [ME, 0, -0.95, FNZ] },
  poses: { me: [[0, 'stand'], [0.6, { shA: [20, 150], elA: 115, head: [0, 6] }], [1.6, { shB: [20, 150], elB: 115, head: [0, -6] }], [2.6, { shA: [20, 150], elA: 115, shB: [20, 150], elB: 115 }], [3.6, 'shrug']] },
  exprs: { me: [[0, 'determined'], [2.0, 'thinking'], [3.6, 'confused']] }, cam: mirrorCam(), caps: [['NO IDEA WHAT IT LOOKS LIKE', 2.4]], o: (g, t, i, s) => qmarks(g, t, s, 3.5) });
S('h05', { set: 'street', cast: Object.fromEntries(MESSY.map((m, k) => ['p' + k, [m, -9 + k * 3, -3.3 - (k % 3) * 0.5, FX]])),
  walk: Object.fromEntries(MESSY.map((m, k) => ['p' + k, k % 2 ? [7 - k * 2.2, -3.6 - (k % 3) * 0.4, -3 - k * 2.2, -3.6 - (k % 3) * 0.4, 0, 2.72, 5.2] : [-8 + k * 2, -3.3 - (k % 3) * 0.4, 2 + k * 2, -3.3 - (k % 3) * 0.4, 0, 2.72, 5.2]])),
  b: (st, s) => { lift(s); Object.values(s.F).forEach((f, k) => leaves(f, 4 + (k % 3), k + 2)); }, cam: { p: [0, 2.3, 5.0], l: [0, 1.3, -4], p2: [0, 2.0, 3.8] } });
S('h06', { set: 'street', cast: { a: [MESSY[0], -1.3, -3.4, FZ + 0.3, 'explain', 'joy'], b: [MESSY[3], 0, -3.8, FZ, 'relaxed', 'smile'], c: [MESSY[4], 1.3, -3.4, FZ - 0.3, 'shrug', 'happy'] },
  poses: { a: [[0, 'explain'], [2.0, 'cheer'], [3.0, 'explain']], c: [[0, 'shrug'], [3.4, 'wave']] }, exprs: { b: [[0, 'smile'], [3.0, 'joy']] },
  b: (st, s) => { lift(s); leaves(s.F.a, 6, 3); leaves(s.F.b, 5, 7); leaves(s.F.c, 7, 11); s.F.b.parts.head.rotation.z = 0.08; },
  cam: { p: [0.3, 1.65, 0.6], l: [0, 1.4, -3.6], p2: [0, 1.6, -0.2] }, caps: [['LOST A FIGHT WITH A HEDGE', 0.6, { dur: 2.9 }], ['AND NOBODY MINDS', 3.0]] });
S('h07', { set: 'street', cast: {},
  b: (st, s) => { st.add(cyl(0.12, 0.14, 0.75, '#3a3a48', 0, 0.515, -3.0, { outline: 0.008 })); s.gary = pigeon(0, -3.0, -0.7); s.gary.position.y = 0.89; st.add(s.gary); },
  u: (s, t) => animPigeon(s.gary, t, { bob: t < 3 ? 1 : 0, puff: ease.out(prog(t, 3.1, 3.6)), look: t > 3.1 ? 0.3 : Math.sin(t * 2) * 0.4 }),
  cam: { p: [1.0, 1.3, -1.3], l: [0, 1.15, -3.0], p2: [0.8, 1.25, -1.6] },
  o: (g, t, i, s) => { const u = U(), [x, y] = scr3(s, [0, 1.55, -3.0]); const k = ease.outBack(prog(t, 0.3, 0.6)); if (k > 0) { g.save(); g.translate(x, y - 30 * u); g.scale(k, k); g.fillStyle = '#ffd23f'; rr(g, -110 * u, -40 * u, 220 * u, 80 * u, 20 * u); g.fill(); text(g, 'GARY', 0, 0, { size: 56 * u, font: FONTS.ui, weight: 900, color: '#141218' }); g.restore(); }
    thought(g, t, E.W * 0.78, E.H * 0.28, 420 * u, 300 * u, 3.1, (g2) => eagle2d(g2, 0, 10 * u, 110 * u)); if (t > 3.3) text(g, 'EAGLE.', E.W * 0.78, E.H * 0.53, { size: 70 * u, font: FONTS.ui, weight: 900, color: '#ffffff', stroke: 12 * u, strokeColor: '#141218', alpha: ease.out(prog(t, 3.3, 3.6)) }); } });
card('h08', 'blue', (g, t, i, u, cx, cy, acc) => { title(g, t, 'BY THE END OF THIS VIDEO', cy - 380 * u, { at: 0.1, size: 70 });
  const L = cx - 400 * u, R = cx + 400 * u; const k1 = ease.outBack(prog(t, 3.3, 3.7)); if (k1 > 0) { g.save(); g.translate(L, cy); g.scale(k1, k1); g.rotate(-0.5); g.fillStyle = '#e8e2d4'; rr(g, -200 * u, -50 * u, 330 * u, 100 * u, 20 * u); g.fill(); g.fillStyle = '#9aa4b0'; rr(g, 120 * u, -70 * u, 60 * u, 140 * u, 12 * u); g.fill(); g.restore();
    g.strokeStyle = '#e8e2d4'; g.lineWidth = 14 * u; g.beginPath(); g.moveTo(L, cy + 40 * u); g.lineTo(L - 100 * u, cy + 230 * u); g.moveTo(L, cy + 40 * u); g.lineTo(L + 100 * u, cy + 230 * u); g.stroke(); cross(g, t, L, cy, 150 * u, 3.8); text(g, 'NO SPACE TELESCOPES', L, cy + 310 * u, { size: 52 * u, font: FONTS.ui, weight: 900, color: '#ffffff', alpha: k1 > 0 ? 1 : 0 }); }
  const k2 = ease.outBack(prog(t, 5.2, 5.6)); if (k2 > 0) { g.save(); g.translate(R, cy); g.scale(k2, k2); heart2(g, 0, 0, 150 * u); text(g, '?', 0, -10 * u, { size: 150 * u, font: FONTS.title, weight: 900, color: '#ffffff' }); g.restore(); text(g, 'MUCH STRANGER DATING', R, cy + 310 * u, { size: 52 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); } });
const heart2 = (g, x, y, r, col = '#ff3a6a') => { g.fillStyle = col; g.beginPath(); g.moveTo(x, y + r * 0.9); g.bezierCurveTo(x - r * 1.6, y - r * 0.1, x - r * 0.7, y - r * 1.3, x, y - r * 0.45); g.bezierCurveTo(x + r * 0.7, y - r * 1.3, x + r * 1.6, y - r * 0.1, x, y + r * 0.9); g.fill(); };
card('h09', 'teal', (g, t, i, u, cx, cy, acc) => { const k = ease.outBack(prog(t, 0.2, 0.6)); if (k > 0) { face2d(g, cx - 560 * u, cy - 40 * u, 150 * u * k, {}); face2d(g, cx - 200 * u, cy - 40 * u, 150 * u * k, { flip: true }); text(g, '?', cx - 380 * u, cy - 40 * u, { size: 110 * u, font: FONTS.title, weight: 900, color: '#ffd23f' }); }
  title(g, t, 'WHICH FACE IS YOURS?', cy + 260 * u, { at: 0.6, size: 60, x: cx - 380 * u });
  const k2 = ease.outBack(prog(t, 6.0, 6.4)); if (k2 > 0) { face2d(g, cx + 420 * u, cy - 40 * u, 170 * u * k2, { cap: false, expr: 'smile' }); for (let n = 0; n < 6; n++) { const a = n * 1.05 + t; circle(g, cx + 420 * u + Math.cos(a) * 240 * u, cy - 40 * u + Math.sin(a) * 240 * u, 14 * u, '#ffd23f'); } }
  title(g, t, 'HAPPIER THAN YOU?', cy + 260 * u, { at: 6.2, size: 60, x: cx + 420 * u }); });

// ---------- room 1: the rewind ----------
roomCard(1, 'gold');
C1('r102', 'leather', (g, t, i, u, cx, cy, acc) => { const r = 230 * u; circle(g, cx, cy - 60 * u, r, '#fff6d8'); ring(g, cx, cy - 60 * u, r, 16 * u, '#3a2010');
  for (let h = 0; h < 12; h++) { const a = (h / 12) * 6.28; circle(g, cx + Math.sin(a) * r * 0.82, cy - 60 * u - Math.cos(a) * r * 0.82, 9 * u, '#3a2010'); }
  const sp = -t * t * 3; for (const [len, w, m] of [[0.55, 14, 1], [0.8, 8, 12]]) { const a = sp * m; g.strokeStyle = '#3a2010'; g.lineWidth = w * u; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx, cy - 60 * u); g.lineTo(cx + Math.sin(a) * r * len, cy - 60 * u - Math.cos(a) * r * len); g.stroke(); }
  text(g, '◀◀', cx, cy - 360 * u, { size: 80 * u, font: FONTS.ui, weight: 900, color: '#f2c890', alpha: 0.5 + 0.5 * Math.sin(t * 8) });
  const n = Math.round(lerp(0, 8000, ease.inOut(prog(t, 0.3, 2.4)))); title(g, t, `${n.toLocaleString('en-US')} YEARS AGO`, cy + 300 * u, { at: 0.3, size: 96, color: '#f2c890' }); });
C1('r103', 'leather', (g, t, i, u, cx, cy, acc) => { const k = ease.outBack(prog(t, 0.2, 0.7)), x = cx - 380 * u;
  if (k > 0) { g.save(); g.translate(x, cy - 40 * u); g.scale(k, k); g.fillStyle = '#141218'; g.beginPath(); g.moveTo(-200 * u, 40 * u); g.quadraticCurveTo(-210 * u, -170 * u, 0, -190 * u); g.quadraticCurveTo(220 * u, -170 * u, 200 * u, 30 * u); g.quadraticCurveTo(160 * u, 190 * u, 0, 190 * u); g.quadraticCurveTo(-170 * u, 190 * u, -200 * u, 40 * u); g.fill();
    const sh = ease.inOut(prog(t, 1.8, 3.0)); g.globalAlpha = sh; const gr = g.createRadialGradient(-40 * u, -50 * u, 0, 0, 0, 180 * u); gr.addColorStop(0, '#9aa4b0'); gr.addColorStop(0.4, '#3a3f4a'); gr.addColorStop(1, '#141218'); g.fillStyle = gr; g.beginPath(); g.ellipse(0, 0, 150 * u, 140 * u, 0, 0, 7); g.fill(); g.globalAlpha = 1; g.restore(); }
  title(g, t, 'POLISHED OBSIDIAN', cy + 260 * u, { at: 2.0, size: 64, x }); title(g, t, '(VOLCANIC GLASS)', cy + 340 * u, { at: 3.6, size: 44, x, color: '#f2c890' });
  const k2 = ease.outBack(prog(t, 5.0, 5.4)), mx = cx + 420 * u; if (k2 > 0) { g.save(); g.translate(mx, cy - 40 * u); g.scale(k2, k2); g.fillStyle = '#e8d4a0'; g.beginPath(); g.moveTo(-260 * u, -60 * u); g.lineTo(-120 * u, -140 * u); g.lineTo(140 * u, -130 * u); g.lineTo(260 * u, -40 * u); g.lineTo(200 * u, 90 * u); g.lineTo(-60 * u, 110 * u); g.lineTo(-240 * u, 60 * u); g.closePath(); g.fill();
    g.fillStyle = '#e8453c'; g.beginPath(); g.arc(30 * u, -40 * u, 34 * u, Math.PI, 0); g.lineTo(30 * u, 40 * u); g.closePath(); g.fill(); circle(g, 30 * u, -40 * u, 13 * u, '#ffffff'); g.restore();
    title(g, t, 'ÇATALHÖYÜK, TURKEY', cy + 260 * u, { at: 5.2, size: 56, x: mx }); title(g, t, '~8,000 YEARS OLD', cy + 340 * u, { at: 5.6, size: 44, x: mx, color: '#f2c890' }); } });
R1('r104', { set: 'pond', cast: { me: [ME, 0, 0.35, FNZ, 'crouch', 'awe'] }, exprs: { me: [[0, 'awe'], [2.2, 'smile']] },
  cam: { p: [0.8, 1.45, -2.7], l: [0, 0.55, 0.0], p2: [0.6, 1.35, -2.45], subj: ['me'] },
  o: (g, t, i, s) => { const [x, y] = scr3(s, [0, 0.03, -0.45]), u = U(); g.save(); g.globalAlpha = 0.35 + 0.1 * Math.sin(t * 2); g.translate(x, y); g.scale(1, -0.55); face2d(g, Math.sin(t * 3) * 4 * u, 0, 70 * u, {}); g.restore();
    for (let n = 0; n < 3; n++) { const ph = (t * 0.5 + n / 3) % 1; g.save(); g.globalAlpha = (1 - ph) * 0.5; g.strokeStyle = '#ffffff'; g.lineWidth = 3 * u; g.beginPath(); g.ellipse(x, y, 60 * u + ph * 200 * u, (60 * u + ph * 200 * u) * 0.3, 0, 0, 7); g.stroke(); g.restore(); }
  }, caps: [['THE ONLY MIRROR: A STILL POND', 0.4]] });
C1('r105', 'dark', (g, t, i, u, cx, cy, acc) => { const x = cx - 420 * u, k = ease.outBack(prog(t, 0.1, 0.5));
  if (k > 0) { g.save(); g.translate(x, cy - 60 * u); g.scale(k, k); g.fillStyle = '#141218'; g.beginPath(); g.ellipse(0, 0, 190 * u, 150 * u, 0.2, 0, 7); g.fill(); g.strokeStyle = '#3a3f4a'; g.lineWidth = 6 * u; g.stroke(); g.restore(); cross(g, t, x, cy - 60 * u, 150 * u, 1.0); }
  title(g, t, 'NOBODY POLISHES IT', cy + 210 * u, { at: 0.3, size: 58, x });
  const R = cx + 360 * u; if (t > 2.9) { face2d(g, R, cy - 120 * u, 120 * u * ease.outBack(prog(t, 2.9, 3.3)), {}); for (const sx of [-1, 1]) person(g, R + sx * 260 * u, cy + 40 * u, 230 * u, '#9ff2d8', ease.out(prog(t, 3.0, 3.3))); }
  title(g, t, 'OTHER PEOPLE SEE IT', cy + 170 * u, { at: 3.2, size: 54, x: R, color: '#6fe6a0' }); title(g, t, 'YOU BASICALLY DON\'T', cy + 260 * u, { at: 6.2, size: 54, x: R, color: '#ff6a6a' }); });
C1('r106', 'gold', (g, t, i, u, cx, cy, acc) => { const sw = Math.sin(t * 3) * 0.12; g.save(); g.translate(cx, cy - 80 * u); g.fillStyle = '#d4a83a'; rr(g, -150 * u, -200 * u, 300 * u, 400 * u, 30 * u); g.fill(); g.fillStyle = '#cfe0ec'; rr(g, -125 * u, -175 * u, 250 * u, 350 * u, 20 * u); g.fill(); g.restore();
  g.save(); g.translate(cx + 150 * u, cy - 260 * u); g.rotate(sw + 0.3); g.strokeStyle = '#3a2010'; g.lineWidth = 5 * u; g.beginPath(); g.moveTo(0, 0); g.lineTo(60 * u, 60 * u); g.stroke(); g.fillStyle = '#fff6d8'; rr(g, 30 * u, 50 * u, 230 * u, 110 * u, 16 * u); g.fill(); text(g, '$$$$$', 145 * u, 105 * u, { size: 56 * u, font: FONTS.ui, weight: 900, color: '#2a8a4a' }); g.restore();
  title(g, t, 'RARE & EXPENSIVE', cy + 280 * u, { at: 1.4, size: 90, color: '#ffd23f' }); });
C1('r107', 'blue', (g, t, i, u, cx, cy, acc) => { g.fillStyle = alpha('#6fe6ff', 0.12); g.fillRect(0, cy - 300 * u, E.W, 520 * u); const k = ease.outBack(prog(t, 0.2, 0.6));
  if (k > 0) { g.save(); g.translate(cx - 300 * u, cy - 40 * u); g.scale(k, k); g.fillStyle = '#e8d4a0'; g.beginPath(); g.ellipse(0, 0, 200 * u, 110 * u, -0.2, 0, 7); g.fill(); text(g, 'MURANO', 0, 0, { size: 50 * u, font: FONTS.ui, weight: 900, color: '#3a2010' }); g.restore();
    g.save(); g.translate(cx + 320 * u, cy + 120 * u); g.scale(k, k); g.fillStyle = '#d8c8a0'; g.beginPath(); g.ellipse(0, 0, 240 * u, 90 * u, 0.1, 0, 7); g.fill(); text(g, 'VENICE', 0, 0, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#3a2010' }); g.restore(); }
  ['#ff6a8a', '#6fe6ff', '#ffd23f', '#9ff2d8', '#c88aff'].forEach((c, n) => { const kk = ease.outBack(prog(t, 1.4 + n * 0.25, 1.8 + n * 0.25)); if (kk <= 0) return; const x = cx - 600 * u + n * 300 * u, y = cy + 330 * u; g.save(); g.translate(x, y); g.scale(kk, kk); g.globalAlpha = 0.85; g.fillStyle = c;
    g.beginPath(); g.moveTo(-30 * u, -90 * u); g.lineTo(30 * u, -90 * u); g.quadraticCurveTo(10 * u, -40 * u, 60 * u, 10 * u); g.quadraticCurveTo(70 * u, 70 * u, 0, 70 * u); g.quadraticCurveTo(-70 * u, 70 * u, -60 * u, 10 * u); g.quadraticCurveTo(-10 * u, -40 * u, -30 * u, -90 * u); g.fill(); g.restore(); });
  title(g, t, 'THE 1500s: BEST MIRRORS ON EARTH', cy - 380 * u, { at: 0.5, size: 64 }); });
C1('r108', 'red', (g, t, i, u, cx, cy, acc) => { person(g, cx - 160 * u, cy + 130 * u, 380 * u, '#ffd8c8'); const sh = Math.sin(t * 20) * 5 * u * (t > 2.3 && t < 2.8);
  g.save(); g.translate(cx + 230 * u + sh, cy - 20 * u); g.fillStyle = '#ffd23f'; rr(g, -90 * u, -20 * u, 180 * u, 150 * u, 20 * u); g.fill(); g.strokeStyle = '#ffd23f'; g.lineWidth = 26 * u; g.beginPath(); g.arc(0, -20 * u, 60 * u, Math.PI, 0); g.stroke(); circle(g, 0, 50 * u, 20 * u, '#7a1a1e'); g.restore();
  title(g, t, 'VENICE KEPT THE SECRET', cy - 360 * u, { at: 0.2, size: 66 }); stamp(g, t, 'BARRED FROM LEAVING', cx, cy + 330 * u, { at: 2.3, size: 72 }); });

// Versailles: Louis XIV
const KING = { louis: [LOUIS, -6, -1.0, FX, 'stand', 'smirk'] };
R1('r109', { set: 'versailles', cast: { ...KING, c1: [{ top: 'suit', color: '#8a2a3a', hair: 'curly' }, -1.7, -2.6, FZ, 'stand', 'awe'], c2: [{ top: 'suit', color: '#2a6a4a', hair: 'bun' }, -0.5, -2.6, FZ, 'stand', 'awe'] },
  walk: { louis: [-6, -1.0, 2.2, -1.0, 0.2, 5.6, 4.6] }, poses: { louis: [[0, 'stand'], [5.6, 'cheer']], c1: [[0, { spine: [25, 0], head: [0, 10] }]], c2: [[0, { spine: [25, 0], head: [0, 10] }]] },
  exprs: { louis: [[0, 'smirk'], [5.6, 'joy']] }, b: (st, s) => crown(s.F.louis),
  cam: { p: [-3.7, 1.7, 3.4], l: [-3.5, 1.5, -2], p2: [1.3, 1.7, 3.4], l2: [1.5, 1.5, -2] }, caps: [['THE HALL OF MIRRORS', 0.8, { dur: 3.6 }], ['VERSAILLES, FRANCE', 3.7]] });
R1('r110', { set: 'versailles', cast: { louis: [LOUIS, 0, -1.2, FZ, 'cheer', 'joy'] }, b: (st, s) => crown(s.F.louis),
  cam: { p: [6.5, 2.6, 3.6], l: [-2, 2.0, -3.5], p2: [5.6, 2.4, 3.4] },
  o: (g, t, i, s) => { const n = Math.round(lerp(1, 357, ease.out(prog(t, 0.1, 1.6)))); const u = U(); text(g, String(n), E.W / 2, E.H * 0.2, { size: 190 * u, font: FONTS.title, weight: 900, color: '#ffd23f', stroke: 18 * u, strokeColor: '#141218' }); }, caps: [['MIRRORS. ONE ROOM.', 1.3]] });
R1('r111', { set: 'versailles', cast: { louis: [LOUIS, 0, -1.4, FZ + 0.25, 'stand', 'smirk'] }, b: (st, s) => crown(s.F.louis),
  poses: { louis: [[0, { shA: [20, 100], elA: 120, shB: [20, 100], elB: 120 }], [1.6, { shA: [20, 100], elA: 120, shB: [-10, 30], elB: 90, head: [0, -15] }], [3.2, 'explain'], [5.0, { shA: [10, 150], shB: [10, 150], elA: 20, elB: 20 }]] },
  exprs: { louis: [[0, 'smirk'], [3.2, 'talk'], [5.0, 'joy']] }, cam: { f: 'louis', d: 2.6, h: 1.55, side: 0.6, lh: 1.45, push: 0.15 },
  caps: [['IT WAS A FLEX.', 0.3, { dur: 2.9 }], ['"I CAN LOOK AT MYSELF 357 TIMES."', 3.0]] });
R1('r112', { set: ['versailles', { blank: true }], cast: { louis: [LOUIS, 0, -1.4, FZ, 'stand', 'confused'] }, b: (st, s) => crown(s.F.louis),
  poses: { louis: [[0, 'stand'], [1.2, { head: [0, 30] }], [2.4, { head: [0, -30] }], [3.6, 'shrug']] }, exprs: { louis: [[0, 'confused'], [3.6, 'sad']] },
  cam: { f: 'louis', d: 4.0, h: 1.8, side: -0.8, lh: 1.7, push: 0.1 }, caps: [['357 BLANK PANELS', 0.4, { dur: 3.9 }], ['NOW WHAT?', 4.0]] });
R1('r113', { set: ['versailles', { blank: true }], cast: { louis: [LOUIS, 0, -1.4, FZ, 'cheer', 'joy'] }, b: (st, s) => { s.hats = hat(s.F.louis, 6); },
  u: (s, t) => { s.hats.rotation.z = Math.sin(t * 5) * 0.06; }, cam: { f: 'louis', d: 4.2, h: 2.0, side: 0.4, lh: 2.1 }, caps: [['HATS.', 0.15, { size: V(130, 120) }]] });
C1('r114', 'blue', (g, t, i, u, cx, cy, acc) => { title(g, t, '1835', cy - 380 * u, { at: 0.2, size: 110, color: '#6fe6ff' }); title(g, t, 'JUSTUS VON LIEBIG, GERMAN CHEMIST', cy - 270 * u, { at: 1.2, size: 52 });
  const w = 560 * u, h = 360 * u, x = cx - w / 2, y = cy - 140 * u; g.fillStyle = alpha('#bfe8ff', 0.35); rr(g, x, y, w, h, 18 * u); g.fill(); g.strokeStyle = '#ffffff'; g.lineWidth = 6 * u; rr(g, x, y, w, h, 18 * u); g.stroke();
  const k = ease.inOut(prog(t, 3.2, 4.6)); if (k > 0) { g.save(); rr(g, x, y, w * k, h, 18 * u); g.clip(); const gr = g.createLinearGradient(x, y, x + w, y + h); gr.addColorStop(0, '#f4f8fb'); gr.addColorStop(0.5, '#a8bccc'); gr.addColorStop(1, '#eef4f8'); g.fillStyle = gr; g.fillRect(x, y, w, h); g.restore();
    g.save(); g.globalCompositeOperation = 'lighter'; glow(g, x + w * k, y + h / 2, 120 * u, '#ffffff', 0.5 * (1 - k)); g.restore(); }
  title(g, t, 'GLASS + A THIN LAYER OF SILVER', cy + 300 * u, { at: 2.9, size: 58 }); title(g, t, '= THE CHEAP, CLEAR MIRROR', cy + 380 * u, { at: 5.0, size: 58, color: '#6fe6ff' }); });
C1('r115', 'dark', (g, t, i, u, cx, cy, acc) => { const k = ease.outBack(prog(t, 0.1, 0.5)); if (k > 0) { g.save(); g.translate(cx, cy - 80 * u); g.scale(k, k); g.fillStyle = '#e8e2d4'; rr(g, -170 * u, -220 * u, 340 * u, 440 * u, 24 * u); g.fill(); g.fillStyle = '#cfe0ec'; rr(g, -150 * u, -200 * u, 300 * u, 400 * u, 18 * u); g.fill(); g.restore(); }
  title(g, t, 'IN YOUR BATHROOM TODAY', cy + 260 * u, { at: 0.3, size: 58 }); cross(g, t, cx, cy - 80 * u, 220 * u, 2.6); stamp(g, t, 'HE GOES HOME EARLY', cx, cy + 370 * u, { at: 2.8, size: 64 }); });
R1('r116', { set: 'bathroom', cast: { me: [ME, 0, -0.95, FNZ, 'stand', 'sleepy'] },
  poses: { me: [[0, { shA: [10, 160], shB: [10, 160], elA: 30, elB: 30, head: [-10, 0] }], [1.4, 'stand'], [3.5, 'shrug']] }, exprs: { me: [[0, 'sleepy'], [1.9, 'calm'], [3.5, 'worried']] },
  cam: mirrorCam(), caps: [['SOUNDS FINE.', 1.9, { dur: 3.4 }], ['UNTIL TOMORROW MORNING...', 3.5]] });
