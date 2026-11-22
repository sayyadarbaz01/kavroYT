// shots/04_big.js — 6:33-9:01: Room 6 (cars, Newton, JWST, lasers, dentist, periscope, parking garage), Room 7 (the twist, Gallup), the ending.
import { E, V, ease, prog, clamp, lerp, box, cyl, ball, THREE } from './_lib.js';
import { card, title, stamp, cross, check, person, heart } from './_info.js';
import { FZ, FNZ, FX, FNX, KIP, FRIEND1, FRIEND2, DENTIST, MESSY, SR, CR, roomCard, face2d, pigeon, animPigeon, pigeon2d, eagle2d, scr3, burst, text, FONTS, alpha, rr, glow, circle, ring, U } from './_mirror.js';
import { S } from './_spec.js';
import { convertible } from '../toon/sets_mirror.js';
import { car } from '../toon/sets3d.js';
import { cup } from './_kit.js';

const ME = KIP, R6 = SR(6), C6 = CR(6), R7 = SR(7), C7 = CR(7);
const rays = (g, pts, col, u, k = 1) => { g.save(); g.strokeStyle = col; g.lineWidth = 6 * u; g.shadowColor = col; g.shadowBlur = 14 * u; g.beginPath(); const n = pts.length - 1, f = k * n; pts.forEach((p, j) => { if (j > f + 1) return; if (j === 0) g.moveTo(...p); else if (j <= f) g.lineTo(...p); else { const q = f - (j - 1); g.lineTo(lerp(pts[j - 1][0], p[0], q), lerp(pts[j - 1][1], p[1], q)); } }); g.stroke(); g.restore(); };
const hexes = (g, cx, cy, r, u, a = 1, blur = 0) => { g.save(); g.globalAlpha *= a; const pos = [[0, 0]]; for (let k = 0; k < 6; k++) { const ang = (k * Math.PI) / 3 + Math.PI / 6; pos.push([Math.cos(ang) * r * 1.75, Math.sin(ang) * r * 1.75]); } for (let k = 0; k < 12; k++) { const ang = (k * Math.PI) / 6 + (k % 2 ? 0 : Math.PI / 6); const d = k % 2 ? r * 3.03 : r * 3.5; pos.push([Math.cos(ang) * d, Math.sin(ang) * d]); }
  pos.slice(1, 19).forEach(([x, y]) => { g.fillStyle = '#ffd23f'; g.strokeStyle = '#8a5a14'; g.lineWidth = 3 * u; g.beginPath(); for (let j = 0; j < 6; j++) { const aa = (j * Math.PI) / 3; j ? g.lineTo(cx + x + Math.cos(aa) * r * 0.95, cy + y + Math.sin(aa) * r * 0.95) : g.moveTo(cx + x + Math.cos(aa) * r * 0.95, cy + y + Math.sin(aa) * r * 0.95); } g.closePath(); g.fill(); g.stroke(); }); g.restore(); };
const galaxy = (g, x, y, r, t, blur = 0, u = U()) => { g.save(); if (blur) g.filter = `blur(${blur}px)`; g.globalCompositeOperation = 'lighter'; for (let n = 0; n < 160; n++) { const a = n * 0.35 + t * 0.2, d = (n / 160) * r; const px = x + Math.cos(a) * d, py = y + Math.sin(a) * d * 0.45; circle(g, px, py, (2 + (n % 3)) * u, n % 4 ? 'rgba(180,200,255,.8)' : 'rgba(255,220,160,.9)'); } glow(g, x, y, r * 0.4, '#fff0d0', 0.6); g.restore(); };

// ---------- room 6: the big stuff breaks ----------
roomCard(6, 'red');
const lanes = [-4.5, -1.5, 1.5, 4.5], COLS = ['#3a6ea5', '#ffd23f', '#5fe08a', '#f2f2f2', '#8a6ad6', '#e8453c'];
const traffic = (st, s, n = 8) => { s.cars = []; for (let k = 0; k < n; k++) { const c = car(0, 0, COLS[k % 6], 0); c.userData = { x0: -30 + k * 9, z: lanes[k % 4], v: 8 + (k % 3) * 2 }; st.add(c); s.cars.push(c); } };
R6('r602', { set: 'highway', cast: {}, b: (st, s) => traffic(st, s), u: (s, t) => s.cars.forEach((c) => { c.position.set(c.userData.x0 + c.userData.v * t, 0, c.userData.z); }),
  cam: { p: [-8, 6, 16], l: [6, 0, 0], p2: [2, 6, 16], l2: [14, 0, 0] },
  o: (g, t) => { const u = U(), k = ease.outBack(prog(t, 2.6, 3.0)); if (k <= 0) return; g.save(); g.translate(E.W * 0.82, E.H * 0.25); g.scale(k, k); g.fillStyle = '#2a2a33'; rr(g, -130 * u, -50 * u, 260 * u, 100 * u, 30 * u); g.fill(); g.fillStyle = '#cfe0ec'; rr(g, -110 * u, -35 * u, 220 * u, 70 * u, 20 * u); g.fill(); g.restore(); cross(g, t, E.W * 0.82, E.H * 0.25, 120 * u, 2.8); },
  caps: [['CARS: NO REARVIEW MIRRORS', 2.7]] });
R6('r603', { set: ['highway', { scroll: 16 }], cast: { me: [ME, -0.1, 1.12, FX, 'sit', 'determined'] },
  b: (st, s) => { st.add(convertible(0, 1.5, 0, '#e8453c')); s.other = car(-7, -1.5, '#3a6ea5', 0); st.add(s.other); },
  u: (s, t) => { const tw = ease.inOut(prog(t, 0.8, 1.6)) * (1 - ease.inOut(prog(t, 2.6, 3.2))); s.F.me.rotation.y = FX + tw * 1.9; s.F.me.parts.neck.rotation.y = tw * 0.7; s.other.position.x = -7 + t * 2.2; },
  poses: { me: [[0, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [60, 10], shB: [60, 10], elA: 40, elB: 40 }], [0.8, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [30, 60], shB: [60, 10], elA: 30, elB: 40 }], [2.8, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [60, 10], shB: [60, 10], elA: 40, elB: 40 }]] },
  exprs: { me: [[0, 'determined'], [0.8, 'worried'], [2.4, 'scared']] }, cam: { p: [3.4, 1.9, 5.2], l: [-0.2, 1.0, 1.0], p2: [3.0, 1.8, 4.6], subj: ['me'] },
  caps: [['TURN AROUND...', 0.8, { dur: 2.3 }], ['...AND HOPE.', 2.4]] });
R6('r604', { set: 'highway', cast: {}, b: (st, s) => traffic(st, s, 10),
  u: (s, t) => s.cars.forEach((c, k) => { const w = Math.sin(t * 3 + k * 1.3) * 1.4; c.position.set(c.userData.x0 + 6 + c.userData.v * t, 0, c.userData.z + w); c.rotation.y = -Math.cos(t * 3 + k * 1.3) * 0.35; }),
  cam: { p: [10, 14, 18], l: [10, 0, 0], p2: [11, 13, 16] }, o: (g, t) => { if (t > 0.8 && t < 1.1) { g.save(); g.globalAlpha = 0.4; g.fillStyle = '#ffffff'; g.fillRect(0, 0, E.W, E.H); g.restore(); } }, caps: [['EVERY HIGHWAY LOOKS LIKE THIS', 0.2]] });
C6('r605', 'blue', (g, t, i, u, cx, cy, acc) => { const k = ease.outBack(prog(t, 0.1, 0.4)); g.save(); g.translate(cx, cy - 60 * u); g.scale(k, k); g.rotate(Math.sin(t * 30) * 0.1 * clamp(1 - t)); g.fillStyle = '#bfe8ff'; rr(g, -60 * u, -160 * u, 120 * u, 60 * u, 10 * u); g.fill(); g.beginPath(); g.moveTo(-40 * u, -100 * u); g.lineTo(-140 * u, 140 * u); g.lineTo(140 * u, 140 * u); g.lineTo(40 * u, -100 * u); g.closePath(); g.fillStyle = alpha('#bfe8ff', 0.4); g.fill(); g.strokeStyle = '#ffffff'; g.lineWidth = 8 * u; g.stroke(); g.restore();
  title(g, t, 'SCIENCE TAKES A HIT TOO', cy + 260 * u, { at: 0.2, size: 74 }); });
C6('r606', 'dark', (g, t, i, u, cx, cy, acc) => { title(g, t, '1668: ISAAC NEWTON', cy - 400 * u, { at: 0.1, size: 74, color: '#ffd23f' }); const x0 = cx - 520 * u, x1 = cx + 360 * u, y0 = cy - 20 * u;
  g.fillStyle = '#4a5068'; rr(g, x0, y0 - 130 * u, x1 - x0, 260 * u, 20 * u); g.fill(); g.strokeStyle = '#9aa4b0'; g.lineWidth = 6 * u; rr(g, x0, y0 - 130 * u, x1 - x0, 260 * u, 20 * u); g.stroke();
  g.strokeStyle = '#cfe0ec'; g.lineWidth = 18 * u; g.beginPath(); g.arc(x1 + 260 * u, y0, 320 * u, Math.PI * 0.88, Math.PI * 1.12); g.stroke();
  const k = ease.inOut(prog(t, 1.4, 3.4)); for (const dy of [-80, 0, 80]) rays(g, [[x0 - 160 * u, y0 + dy * u], [x1 - 50 * u, y0 + dy * u], [x0 + 200 * u, y0]], '#fff4a0', u, k);
  title(g, t, 'A CURVED MIRROR', cy + 220 * u, { at: 4.8, size: 64, color: '#cfe0ec' }); title(g, t, 'INSTEAD OF A LENS', cy + 310 * u, { at: 5.6, size: 54 }); });
C6('r607', 'gold', (g, t, i, u, cx, cy, acc) => { g.fillStyle = '#05060c'; g.fillRect(0, 0, E.W, E.H); const r = 52 * u * ease.outBack(prog(t, 0.2, 1.0)); if (r > 0) hexes(g, cx - 340 * u, cy - 40 * u, r, u);
  galaxy(g, cx + 420 * u, cy - 40 * u, 280 * u, t); title(g, t, 'JAMES WEBB SPACE TELESCOPE', cy - 400 * u, { at: 0.1, size: 62, color: '#ffd23f' }); title(g, t, '18 GOLD-COATED MIRRORS', cy + 300 * u, { at: 1.5, size: 56, x: cx - 340 * u }); title(g, t, 'BILLIONS OF LIGHT-YEARS', cy + 300 * u, { at: 5.6, size: 56, x: cx + 420 * u, color: '#bfe8ff' }); });
C6('r608', 'dark', (g, t, i, u, cx, cy, acc) => { g.fillStyle = '#05060c'; g.fillRect(0, 0, E.W, E.H); const bl = 2 + ease.inOut(prog(t, 2.6, 4.0)) * 26; galaxy(g, cx, cy - 40 * u, 340 * u, t, bl * u);
  stamp(g, t, 'NEVER LAUNCHES', cx, cy - 320 * u, { at: 0.2, size: 80 }); title(g, t, 'THE UNIVERSE STAYS BLURRY', cy + 320 * u, { at: 2.8, size: 64 }); });
C6('r609', 'red', (g, t, i, u, cx, cy, acc) => { const L = cx - 460 * u, R = cx + 460 * u; for (const x of [L, R]) { g.fillStyle = '#cfe0ec'; rr(g, x - 20 * u, cy - 170 * u, 40 * u, 260 * u, 10 * u); g.fill(); }
  const on = t < 2.8; if (on) { const ph = (t * 3) % 2, x = ph < 1 ? lerp(L, R, ph) : lerp(R, L, ph - 1); g.save(); g.globalCompositeOperation = 'lighter'; g.strokeStyle = '#ff3a3a'; g.lineWidth = 14 * u; g.shadowColor = '#ff3a3a'; g.shadowBlur = 30 * u; g.beginPath(); g.moveTo(L, cy - 40 * u); g.lineTo(R, cy - 40 * u); g.stroke(); glow(g, x, cy - 40 * u, 70 * u, '#ff6a6a', 0.9); g.restore(); }
  title(g, t, 'LASERS BOUNCE LIGHT BETWEEN MIRRORS', cy - 360 * u, { at: 0.1, size: 58 }); stamp(g, t, 'NO LASERS', cx, cy + 260 * u, { at: 2.9, size: 100 }); });
C6('r610', 'dark', (g, t, i, u, cx, cy, acc) => { const L = cx - 340 * u, R = cx + 340 * u, k1 = ease.outBack(prog(t, 0.1, 0.5)), k2 = ease.outBack(prog(t, 1.4, 1.8));
  if (k1 > 0) { g.save(); g.translate(L, cy - 60 * u); g.scale(k1, k1); g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(0, 0, 160 * u, 90 * u, 0, 0, 7); g.fill(); circle(g, 0, 0, 70 * u, '#3a6ad8'); circle(g, 0, 0, 32 * u, '#141218'); g.restore(); cross(g, t, L, cy - 60 * u, 120 * u, 0.6); text(g, 'LASER EYE SURGERY', L, cy + 140 * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); }
  if (k2 > 0) { g.save(); g.translate(R, cy - 60 * u); g.scale(k2, k2); g.fillStyle = '#ffffff'; g.fillRect(-150 * u, -90 * u, 300 * u, 180 * u); for (let n = 0; n < 22; n++) g.fillRect(-130 * u + n * 12 * u, -70 * u, (n % 3 ? 4 : 8) * u, 120 * u); g.fillStyle = '#ffffff'; g.restore(); cross(g, t, R, cy - 60 * u, 120 * u, 1.9); text(g, 'BARCODE SCANNERS', R, cy + 140 * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); } });
C6('r611', 'teal', (g, t, i, u, cx, cy, acc) => { g.save(); g.translate(cx, cy + 40 * u); g.fillStyle = '#2a2a33'; g.beginPath(); g.ellipse(0, 40 * u, 200 * u, 110 * u, 0, 0, 7); g.fill(); circle(g, 150 * u, -70 * u, 90 * u, '#2a2a33');
  for (const sx of [100, 200]) { g.beginPath(); g.moveTo(sx * u - 40 * u, -130 * u); g.lineTo(sx * u - 10 * u, -200 * u); g.lineTo(sx * u + 20 * u, -130 * u); g.fill(); } for (const ex of [120, 185]) circle(g, ex * u, -80 * u, 14 * u, '#ffd23f');
  g.strokeStyle = '#2a2a33'; g.lineWidth = 26 * u; g.lineCap = 'round'; g.beginPath(); g.moveTo(-190 * u, 40 * u); g.quadraticCurveTo(-320 * u, -40 * u, -260 * u, -180 * u); g.stroke(); g.restore();
  text(g, '?', cx + 330 * u, cy - 160 * u, { size: 160 * u, font: FONTS.title, weight: 900, color: '#ffd23f' }); title(g, t, 'CATS HAVE NOTHING TO CHASE', cy + 330 * u, { at: 0.4, size: 66 }); });
R6('r612', { set: 'dentist', cast: { p: [MESSY[3], 0.15, 0, FX, 'sit', 'surprised'], d: [DENTIST, 0.55, -0.8, -2.24, 'stand', 'confused'] },
  poses: { p: [[0, { hipA: 86, hipB: 86, knA: 70, knB: 70, drop: 0.36, spine: [-30, 0], head: [0, 12], shA: [10, 8], shB: [10, 8], elA: 20, elB: 20 }]], d: [[0, { shA: [40, 20], elA: 60, shB: [40, 20], elB: 60, spine: [15, 0] }], [1.4, 'shrug']] },
  cam: { p: [1.9, 1.65, 2.5], l: [0.15, 1.05, -0.3], p2: [1.7, 1.6, 2.2] }, caps: [['NO TINY MIRROR ON A STICK', 0.4]] });
R6('r613', { set: 'dentist', cast: { p: [MESSY[3], 0.15, 0, FX, 'sit', 'surprised'], d: [DENTIST, 0.55, -0.8, -2.24, 'stand', 'thinking'] },
  poses: { p: [[0, { hipA: 86, hipB: 86, knA: 70, knB: 70, drop: 0.36, spine: [-30, 0], head: [0, 12], shA: [10, 8], shB: [10, 8], elA: 20, elB: 20 }]], d: [[0, { shA: [30, 10], elA: 40, spine: [28, 0], head: [0, -10] }]] },
  exprs: { d: [[0, 'thinking'], [2.4, 'confused']] }, cam: { p: [1.9, 1.6, 0.9], l: [0.3, 1.25, -0.6], p2: [1.75, 1.58, 0.75], subj: ['d'] }, caps: [['"HMM."', 2.4, { size: V(110, 100) }]] });
C6('r614', 'blue', (g, t, i, u, cx, cy, acc) => { const x0 = cx - 80 * u; g.fillStyle = '#9aa4b0'; g.fillRect(x0, cy - 300 * u, 160 * u, 520 * u); g.fillRect(x0, cy - 300 * u, 320 * u, 140 * u); g.fillRect(x0 - 160 * u, cy + 80 * u, 320 * u, 140 * u);
  g.strokeStyle = '#cfe0ec'; g.lineWidth = 12 * u; g.beginPath(); g.moveTo(x0, cy - 300 * u); g.lineTo(x0 + 160 * u, cy - 160 * u); g.moveTo(x0, cy + 80 * u); g.lineTo(x0 + 160 * u, cy + 220 * u); g.stroke();
  rays(g, [[x0 + 420 * u, cy - 230 * u], [x0 + 80 * u, cy - 230 * u], [x0 + 80 * u, cy + 150 * u], [x0 - 300 * u, cy + 150 * u]], '#fff4a0', u, ease.inOut(prog(t, 0.6, 2.2)));
  title(g, t, 'A TUBE + TWO MIRRORS', cy - 400 * u, { at: 0.2, size: 64 }); if (t > 2.4) { g.save(); g.globalAlpha = 0.6; g.fillStyle = '#0c2142'; g.fillRect(0, 0, E.W, E.H); g.restore(); stamp(g, t, 'NEVER EXISTS', cx, cy, { at: 2.4, size: 96 }); } });
C6('r615', 'teal', (g, t, i, u, cx, cy, acc) => { const L = cx - 400 * u, R = cx + 400 * u; g.fillStyle = '#2a3a4a'; g.beginPath(); g.ellipse(L, cy, 240 * u, 80 * u, 0, 0, 7); g.fill(); g.fillRect(L - 30 * u, cy - 200 * u, 30 * u, 140 * u); g.fillRect(L - 30 * u, cy - 200 * u, 70 * u, 30 * u);
  g.fillStyle = alpha('#bfe8ff', 0.7); g.beginPath(); g.moveTo(L + 40 * u, cy - 200 * u); g.lineTo(L + 70 * u, cy - 170 * u); g.lineTo(L + 40 * u, cy - 170 * u); g.fill(); text(g, 'PRISMS', L, cy + 140 * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); check(g, t, L, cy - 330 * u, 60 * u, 3.8);
  title(g, t, 'THE NAVY IS FINE', cy + 300 * u, { at: 3.7, size: 54, x: L }); g.fillStyle = '#e8d4a0'; rr(g, R - 180 * u, cy - 120 * u, 360 * u, 240 * u, 14 * u); g.fill(); text(g, 'SCIENCE FAIR', R, cy - 60 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#3a2010' }); g.fillStyle = '#9aa4b0'; g.fillRect(R - 20 * u, cy - 20 * u, 40 * u, 110 * u);
  cross(g, t, R, cy, 140 * u, 5.4); title(g, t, 'EVERY PROJECT IS NOT', cy + 300 * u, { at: 5.5, size: 54, x: R, color: '#ff8a6a' }); });
R6('r616', { set: 'garage', cast: {},
  b: (st, s) => { const m = new THREE.Group(); m.add(new THREE.Mesh(new THREE.CircleGeometry(0.45, 24), new THREE.MeshToonMaterial({ color: '#cfe0ec' }))); const rim = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.05, 8, 24), new THREE.MeshToonMaterial({ color: '#ff8a2a' })); m.add(rim);
    m.position.set(-0.9, 2.45, -0.9); m.rotation.y = Math.PI / 4; st.add(m); s.mirror = m; st.add(car(-6, 1.2, '#3a6ea5', 0)); },
  u: (s, t) => { s.mirror.visible = t < 2.6 || (t < 2.9 && Math.sin(t * 80) > 0); }, cam: { p: [1.8, 1.9, 4.8], l: [-1.0, 1.6, -1.0], p2: [1.6, 1.85, 4.2] },
  caps: [['ROUND SAFETY MIRRORS ON BLIND CORNERS?', 0.3, { dur: 2.5, size: V(66, 60) }], ['GONE.', 2.6, { size: V(120, 110) }]] });
R6('r617', { set: 'garage', cast: {},
  b: (st, s) => { s.a = car(-12, 1.1, '#e8453c', 0); s.b = car(1.1, -12, '#5fe08a', -Math.PI / 2); st.add(s.a); st.add(s.b); },
  u: (s, t) => { const k = ease.out(prog(t, 0, 1.3)); s.a.position.x = lerp(-12, -2.6, k); s.b.position.z = lerp(-12, -2.6, k); },
  cam: { p: [6.5, 6.5, 7.5], l: [-1.0, 0, -1.0] }, o: (g, t, i, s) => { const [x, y] = scr3(s, [-0.4, 1.2, -0.4]); burst(g, t, x, y, 180 * U(), 1.3, '#ffd23f'); }, caps: [['A GAME OF CHICKEN', 1.2]] });

// ---------- room 7: the twist ----------
roomCard(7, 'gold');
C7('r702', 'dark', (g, t, i, u, cx, cy, acc) => { title(g, t, 'JUST WORSE?', cy - 120 * u, { at: 0.2, size: 120 }); title(g, t, 'MAYBE NOT.', cy + 80 * u, { at: 2.7, size: 120, color: '#ffd23f' }); });
C7('r703', 'teal', (g, t, i, u, cx, cy, acc) => { title(g, t, '1970: GORDON GALLUP', cy - 400 * u, { at: 0.1, size: 70, color: '#9ff2d8' }); const x = cx - 260 * u, y = cy;
  g.fillStyle = '#4a3020'; g.beginPath(); g.ellipse(x, y + 60 * u, 130 * u, 160 * u, 0, 0, 7); g.fill(); circle(g, x, y - 140 * u, 100 * u, '#4a3020'); for (const sx of [-1, 1]) circle(g, x + sx * 105 * u, y - 140 * u, 34 * u, '#c8a878'); g.fillStyle = '#c8a878'; g.beginPath(); g.ellipse(x, y - 120 * u, 70 * u, 60 * u, 0, 0, 7); g.fill();
  for (const sx of [-1, 1]) circle(g, x + sx * 28 * u, y - 150 * u, 10 * u, '#141218'); g.strokeStyle = '#4a3020'; g.lineWidth = 34 * u; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + 100 * u, y); g.quadraticCurveTo(x + 180 * u, y - 60 * u + Math.sin(t * 3) * 20 * u, x + 160 * u, y - 140 * u + Math.sin(t * 3) * 20 * u); g.stroke();
  g.fillStyle = '#d4a83a'; rr(g, cx + 160 * u, cy - 260 * u, 260 * u, 440 * u, 20 * u); g.fill(); g.fillStyle = '#cfe0ec'; rr(g, cx + 178 * u, cy - 242 * u, 224 * u, 404 * u, 14 * u); g.fill(); g.save(); g.globalAlpha = 0.5; g.translate(cx + 290 * u, cy - 120 * u); g.scale(-0.6, 0.6); circle(g, 0, 0, 100 * u, '#4a3020'); g.restore();
  title(g, t, 'AFTER SEVERAL DAYS: "THAT\'S ME."', cy + 320 * u, { at: 5.0, size: 58 }); });
C7('r704', 'blue', (g, t, i, u, cx, cy, acc) => { face2d(g, cx, cy - 40 * u, 180 * u, { cap: false }); const k = ease.outBack(prog(t, 0.6, 1.0)); if (k > 0) circle(g, cx - 40 * u, cy - 170 * u, 26 * u * k, '#e8304a'); check(g, t, cx + 300 * u, cy - 40 * u, 90 * u, 1.2);
  title(g, t, 'THE MIRROR TEST', cy - 380 * u, { at: 0.1, size: 90, color: '#6fe6ff' }); title(g, t, 'FOR SELF-RECOGNITION', cy + 250 * u, { at: 0.8, size: 60 }); });
C7('r705', 'gold', (g, t, i, u, cx, cy, acc) => { const x0 = cx - 600 * u, x1 = cx + 600 * u, y = cy; g.strokeStyle = '#fff6d8'; g.lineWidth = 12 * u; g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke();
  [[0, 'BIRTH'], [0.6, '18 MONTHS'], [0.8, '2 YEARS']].forEach(([f, lab], n) => { const x = lerp(x0, x1, f); circle(g, x, y, 20 * u, '#ffd23f'); text(g, lab, x, y + 70 * u, { size: 44 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); });
  const k = ease.inOut(prog(t, 1.4, 3.2)); g.fillStyle = alpha('#6fe6a0', 0.6); rr(g, lerp(x0, x1, 0.6), y - 40 * u, (x1 - x0) * 0.2 * k, 80 * u, 20 * u); g.fill();
  title(g, t, 'HUMANS USUALLY PASS IT', cy - 280 * u, { at: 0.2, size: 70 }); });
C7('r706', 'teal', (g, t, i, u, cx, cy, acc) => { face2d(g, cx, cy - 60 * u, 170 * u, { expr: t > 2.6 ? 'frown' : 'smile' }); title(g, t, '"THAT\'S ME."', cy + 240 * u, { at: 0.2, size: 96, color: '#9ff2d8' });
  if (t > 2.4) { for (let n = 0; n < 3; n++) { const k = ease.outBack(prog(t, 2.4 + n * 0.25, 2.7 + n * 0.25)); if (k > 0) text(g, '?', cx + (n - 1) * 140 * u, cy - 320 * u, { size: 100 * u * k, font: FONTS.title, weight: 900, color: '#ffd23f' }); } title(g, t, '...AND THE WORRYING STARTS', cy + 340 * u, { at: 2.6, size: 58 }); } });
R7('r707', { set: 'pond', cast: { me: [ME, 0.2, 0.4, FNZ - 0.2, 'stand', 'calm'] }, poses: { me: [[0, { head: [0, -14] }], [3.0, { head: [0, -6], shA: [10, 30], elA: 30 }]] }, exprs: { me: [[0, 'calm'], [3.0, 'smile']] },
  cam: { p: [1.4, 1.7, -2.8], l: [0.1, 0.9, 0.2], p2: [1.2, 1.6, -2.5], subj: ['me'] }, caps: [['THERE ARE STILL PUDDLES AND PHOTOS', 0.3, { dur: 4.3 }], ['BUT IT COMES RARELY', 4.6]] });
R7('r708', { set: 'park', cast: { me: [ME, 1.2, 0.5, FX - 0.5, 'stand', 'joy'], a: [FRIEND1, 2.5, -0.1, FNX + 0.6, 'explain', 'joy'], b: [FRIEND2, 2.7, 1.2, FNX - 0.6, 'cheer', 'happy'] },
  poses: { me: [[0, 'relaxed'], [1.0, { shA: [10, 40], shB: [10, 40], elA: 100, elB: 100, spine: [12, 0] }], [2.4, 'explain']], a: [[0, 'explain'], [1.6, 'cheer'], [3.0, 'explain']], b: [[0, 'relaxed'], [0.9, 'cheer'], [2.2, 'relaxed']] },
  cam: { p: [1.9, 1.7, 5.0], l: [2.0, 1.25, 0.4], p2: [1.9, 1.65, 4.4] }, caps: [['LOOKING OUTWARD, NOT AT YOURSELF', 0.5, { dur: 3.3 }], ['FRIENDS\' FACES > YOUR OWN', 3.4]] });
R7('r709', { set: 'park', cast: { me: [ME, 1.3, 0.4, FX - 0.2, 'stand', 'smile'], f: [FRIEND2, 2.5, 0.2, FNX + 0.2, 'stand', 'sad'] },
  carry: [{ prop: () => cup('#e8453c'), by: [[0, 'me'], [1.6, 'f']], both: false, arms: { me: { shA: [70, 12], elA: 30, shB: [10, 8], elB: 20 }, f: { shA: [70, 12], elA: 30, shB: [10, 8], elB: 20 } } }],
  exprs: { f: [[0, 'sad'], [1.7, 'joy']], me: [[0, 'smile']] }, cam: { two: ['me', 'f'], a: FZ, d: 3.0, h: 1.55, side: 0, lh: 1.35 }, caps: [['YOU\'D JUDGE PEOPLE BY HOW THEY ACT', 0.4]] });
R7('r710', { set: 'park', cast: {},
  b: (st, s) => { s.gary = pigeon(0.8, 0.4, -Math.PI / 2, 1.0); st.add(s.gary); s.pals = [[-0.7, 0.1, -0.9], [2.3, 0.0, -2.3], [-0.1, -1.0, -1.2], [1.7, -1.1, -2.0]].map(([x, z, r], k) => { const p = pigeon(x, z, r, 0.9); p.userData.body.material = p.userData.body.material.clone(); p.userData.body.material.color.set(['#9a9aa8', '#7a8290', '#a8a0a0', '#8a93a6'][k]); st.add(p); return p; }); },
  u: (s, t) => { animPigeon(s.gary, t, { puff: 0.4 + 0.6 * ease.out(prog(t, 2.8, 3.3)), look: 0.0 }); s.pals.forEach((p, k) => animPigeon(p, t + k, { bob: 1, flap: t > 2.8 && t < 4 ? 0.5 : 0 })); },
  cam: { p: [0.8, 0.9, 3.4], l: [0.8, 0.35, 0.5], p2: [0.8, 0.85, 3.0] },
  o: (g, t, i, s) => { const u = U(); s.pals.forEach((p, k) => { const at = 2.8 + k * 0.25, a = ease.outBack(prog(t, at, at + 0.3)); if (a <= 0) return; const [x, y] = scr3(s, [p.position.x, 0.75, p.position.z]); g.save(); g.translate(x, y); g.scale(a, a); g.fillStyle = '#ffffff'; g.strokeStyle = '#141218'; g.lineWidth = 4 * u; rr(g, -90 * u, -60 * u, 180 * u, 60 * u, 18 * u); g.fill(); g.stroke(); text(g, 'EAGLE!', 0, -30 * u, { size: 36 * u, font: FONTS.ui, weight: 900, color: '#141218' }); g.restore(); }); },
  caps: [['GARY DOESN\'T CARE WHAT THE PHONE SAID', 0.3, { dur: 2.4, size: V(66, 60) }], ['HIS FRIENDS CALL HIM AN EAGLE', 2.8, { dur: 1.5 }], ['HE\'S GOING WITH THAT.', 4.35]] });

// ---------- ending ----------
S('e01', { set: ['bathroom', { mirror: true }], cast: { me: [ME, -0.45, -1.5, FNZ + 0.15, 'stand', 'neutral'] }, poses: { me: [[0, 'stand'], [2.4, { shA: [20, 150], elA: 115 }]] },
  cam: { p: [1.4, 1.72, 0.7], l: [-0.1, 1.6, -2.4], p2: [1.2, 1.7, 0.4] },
  o: (g, t, i, s) => { const [x, y] = scr3(s, [0.1, 1.72, -2.45]), u = U(); g.save(); g.globalAlpha = 0.55; face2d(g, x, y, 95 * u, { flip: true, expr: t > 2.4 ? 'flat' : 'smile' }); g.restore(); }, caps: [['TOMORROW: "I LOOK A LITTLE OFF."', 2.3]] });
card('e02', 'teal', (g, t, i, u, cx, cy, acc) => { title(g, t, 'ONE:', cy - 400 * u, { at: 0.1, size: 80, color: '#9ff2d8' }); face2d(g, cx - 320 * u, cy - 60 * u, 150 * u, { flip: true }); face2d(g, cx + 320 * u, cy - 60 * u, 150 * u, {});
  text(g, 'WHAT YOU SEE', cx - 320 * u, cy + 150 * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); text(g, 'WHAT FRIENDS SEE', cx + 320 * u, cy + 150 * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#ffd23f' });
  const k = ease.outBack(prog(t, 2.6, 3.0)); if (k > 0) for (let n = 0; n < 3; n++) { g.save(); g.translate(cx + 320 * u + (n - 1) * 130 * u, cy - 280 * u - Math.sin(t * 3 + n) * 10 * u); g.scale(k, k); heart(g, 0, 0, 40 * u); g.restore(); }
  title(g, t, 'AND IT\'S THE ONE THEY LIKE', cy + 300 * u, { at: 2.7, size: 62 }); });
R7('e03', { set: 'park', cast: {},
  b: (st, s) => { s.gary = pigeon(-2, 0.3, 0, 1.1); st.add(s.gary); }, u: (s, t) => { s.gary.position.x = -2 + t * 0.55; animPigeon(s.gary, t, { bob: 1, puff: 0.7 }); },
  cam: { p: [0.2, 0.75, 3.0], l: [-0.6, 0.4, 0.3], p2: [1.2, 0.75, 3.0], l2: [0.8, 0.4, 0.3] },
  o: (g, t) => { const u = U(); g.save(); g.globalCompositeOperation = 'lighter'; glow(g, E.W * 0.85, E.H * 0.12, 260 * u, '#fff0b0', 0.5); g.restore(); },
  caps: [['TWO: A PIGEON WHO\'S NEVER SEEN HIMSELF', 0.3, { dur: 2.9, size: V(64, 60) }], ['...IS HAVING THE BEST LIFE OF ANYONE HERE', 3.1, { size: V(64, 60) }]] });
card('e04', 'dark', (g, t, i, u, cx, cy, acc) => { const L = cx - 420 * u, R = cx + 420 * u, k1 = ease.outBack(prog(t, 0.8, 1.2)), k2 = ease.outBack(prog(t, 3.3, 3.7));
  if (k1 > 0) { g.save(); g.translate(L, cy - 60 * u); g.scale(k1, k1); g.strokeStyle = '#d4a83a'; g.lineWidth = 16 * u; g.setLineDash([20 * u, 14 * u]); g.beginPath(); g.ellipse(0, 0, 130 * u, 180 * u, 0, 0, 7); g.stroke(); g.restore(); text(g, 'NO MIRRORS', L, cy + 190 * u, { size: 54 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); }
  if (k2 > 0) { g.save(); g.translate(R, cy - 60 * u); g.scale(k2, k2); face2d(g, 0, 0, 120 * u, {}); for (let n = 0; n < 4; n++) { const a = -Math.PI / 2 + (n - 1.5) * 0.6; g.fillStyle = '#ffffff'; rr(g, Math.cos(a) * 220 * u - 50 * u, Math.sin(a) * 200 * u - 25 * u, 100 * u, 50 * u, 14 * u); g.fill(); text(g, ['6/10', 'CUTE', 'HMM', 'OK'][n], Math.cos(a) * 220 * u, Math.sin(a) * 200 * u, { size: 28 * u, font: FONTS.ui, weight: 900, color: '#141218' }); } g.restore(); text(g, 'SEE WHAT EVERYONE THINKS', R, cy + 190 * u, { size: 50 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); }
  if (t > 1.6) text(g, 'OR', cx, cy - 60 * u, { size: 90 * u, font: FONTS.title, weight: 900, color: '#b48cff' }); title(g, t, 'WOULD YOU RATHER...', cy - 400 * u, { at: 0.1, size: 74 }); title(g, t, 'TELL ME IN THE COMMENTS!', cy + 350 * u, { at: 6.3, size: 70, color: '#ffd23f' }); });
