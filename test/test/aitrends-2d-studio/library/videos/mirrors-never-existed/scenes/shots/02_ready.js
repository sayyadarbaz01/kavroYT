// shots/02_ready.js — 2:05-4:47: Room 2 (getting ready: makeup, spinach, barber, Gary, describers, gym), Room 3 (home), Room 4 (dating, the flipped face).
import { E, V, ease, prog, clamp, lerp, box, cyl, ball, THREE } from './_lib.js';
import { title, stamp, cross, check, person, heart, brain } from './_info.js';
import { FZ, FNZ, FX, FNX, KIP, KIPBAD, BARBER, DESCRIBER, FRIEND1, FRIEND2, DATE, TEACHER, DANCERS, LIFTER, MESSY, badHair, leaves, SR, CR, roomCard, face2d, pigeon, animPigeon, scr3, burst, text, FONTS, alpha, rr, glow, circle, ring, U } from './_mirror.js';
import { phone } from '../toon/sets_campus.js';

const ME = KIP, R2 = SR(2), C2 = CR(2), R3 = SR(3), C3 = CR(3), R4 = SR(4), C4 = CR(4);
const lift = (s, y = 0.14) => Object.values(s.F).forEach((f) => (f.position.y = y));
const bubble = (g, t, s, k, str, at, o = {}) => { const a = ease.outBack(prog(t, at, at + 0.3)) * (t < (o.off ?? 99) ? 1 : 0); if (a <= 0) return; const f = s.F[k], u = U(); const [x, y] = scr3(s, [f.position.x + (o.dx || 0), (f.position.y || 0) + (o.hy || 2.15), f.position.z]);
  g.save(); g.translate(x, y); g.scale(a, a); g.font = `900 ${40 * u}px "${FONTS.ui}"`; const w = g.measureText(str).width + 50 * u, h = 72 * u; g.fillStyle = '#ffffff'; g.strokeStyle = '#141218'; g.lineWidth = 4 * u; rr(g, -w / 2, -h, w, h, 22 * u); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(-14 * u, -2 * u); g.lineTo(0, 22 * u); g.lineTo(14 * u, -2 * u); g.fill(); text(g, str, 0, -h / 2, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#141218' }); g.restore(); };
const lipstick = () => { const g = new THREE.Group(); g.add(cyl(0.018, 0.018, 0.07, '#d4a83a', 0, 0, 0, { outline: 0.003 })); g.add(cyl(0.014, 0.014, 0.04, '#e8304a', 0, 0.05, 0)); return g; };
const scissors = () => { const g = new THREE.Group(); g.add(box(0.12, 0.012, 0.02, '#c8c8d0', 0.04, 0, 0, { rot: [0, 0, 0.25] })); g.add(box(0.12, 0.012, 0.02, '#c8c8d0', 0.04, 0, 0, { rot: [0, 0, -0.25] })); g.add(M3(new THREE.TorusGeometry(0.02, 0.006, 6, 12), '#e8453c')); return g; };
const M3 = (geo, c) => new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color: c }));
const clip = () => { const g = new THREE.Group(); g.add(box(0.22, 0.3, 0.012, '#a0683e', 0, 0, 0, { outline: 0.003 })); g.add(box(0.18, 0.24, 0.004, '#fbfaf4', 0, -0.01, 0.008)); return g; };
const barbell = () => { const g = new THREE.Group(); g.add(cyl(0.015, 0.015, 1.5, '#c8c8d0', 0, 0, 0, { rot: [Math.PI / 2, 0, 0] })); for (const z of [-0.62, 0.62]) g.add(cyl(0.18, 0.18, 0.06, '#2a2a33', 0, 0, z, { rot: [Math.PI / 2, 0, 0], outline: 0.004 })); return g; };
const HOLD = { shA: [70, 12], shB: [70, 12], elA: 30, elB: 30 };

// ---------- room 2: getting ready ----------
roomCard(2, 'teal');
C2('r202', 'teal', (g, t, i, u, cx, cy, acc) => { person(g, cx - 160 * u, cy + 150 * u, 400 * u, '#9ff2d8'); person(g, cx + 160 * u, cy + 150 * u, 400 * u, '#ffd8c8');
  const k = ease.outBack(prog(t, 0.6, 1.0)); if (k > 0) { g.save(); g.translate(cx, cy - 250 * u); g.scale(k, k); circle(g, 0, 0, 60 * u, '#ffd23f'); text(g, '1+1', 0, 0, { size: 50 * u, font: FONTS.ui, weight: 900, color: '#141218' }); g.restore(); }
  title(g, t, 'GETTING READY = A TEAM SPORT', cy + 330 * u, { at: 0.3, size: 70 }); });
R2('r203', { set: 'bedroom', cast: { a: [FRIEND2, -0.42, 0.2, FX, 'stand', 'determined'], b: [DATE, 0.42, 0.2, FNX, 'stand', 'calm'] },
  carry: [{ prop: () => lipstick(), by: 'a', both: false, arms: { shA: [78, 4], elA: 28, shB: [10, 8], elB: 20 } }], exprs: { b: [[0, 'calm'], [0.8, 'smile']] },
  cam: { two: ['a', 'b'], a: FZ, d: 2.5, h: 1.5, side: 0, lh: 1.42 }, caps: [['COUPLES DO EACH OTHER\'S MAKEUP', 0.2]] });
R2('r204', { set: 'bedroom', cast: { a: [FRIEND1, -0.4, 0.3, FX, 'stand', 'thinking'], b: [ME, 0.42, 0.3, FNX, 'stand', 'joy'] },
  poses: { a: [[0, { spine: [18, 0], head: [0, -6], shA: [60, 8], elA: 60 }]] }, cam: { two: ['a', 'b'], a: FZ, d: 2.4, h: 1.45, side: 0.1, lh: 1.4 },
  o: (g, t, i, s) => { const [x, y] = scr3(s, [0.62, 1.32, 0.3]); if (t > 0.3) circle(g, x, y, 5 * U(), '#3a9a3a'); }, caps: [['SPINACH?', 0.6]] });
R2('r205', { set: 'street', cast: { a: [MESSY[1], -0.55, -3.6, FX + 0.5, 'stand', 'worried'], b: [MESSY[2], 0.55, -3.6, FNX - 0.5, 'stand', 'thinking'] },
  poses: { a: [[0, { shA: [55, 12], elA: 140, head: [0, 4] }]], b: [[0, 'think'], [1.6, 'shrug']] }, b: (st, s) => lift(s),
  cam: { two: ['a', 'b'], a: FZ, d: 3.0, h: 1.65, side: 0, lh: 1.55 }, caps: [['"DO I HAVE SOMETHING ON MY FACE?"', 0.1, { dur: 1.5 }], ['#1 QUESTION ON EARTH', 1.6]] });
R2('r206', { set: 'barber', cast: { me: [KIPBAD, 0, -0.6, FZ, 'sit', 'worried'], barber: [BARBER, 0.6, -1.05, -2.45, 'stand', 'determined'] },
  carry: [{ prop: () => scissors(), by: 'barber', both: false, arms: { shA: [70, 25], elA: 50, shB: [30, 10], elB: 40 }, rz: (t) => Math.sin(t * 16) * 0.3 }],
  cam: { p: [0.4, 1.45, 2.4], l: [0.2, 1.1, -0.8], p2: [0.3, 1.4, 1.9] }, caps: [['A HAIRCUT = PURE TRUST', 0.5]] });
R2('r207', { set: 'barber', cast: { me: [ME, 0.7, -0.1, FZ], barber: [BARBER, -0.6, -0.2, FZ + 0.6, 'stand', 'smile'] },
  walk: { me: { path: [[0.7, -0.1], [1.2, 0.5], [1.4, 1.0]], t0: 0.2, t1: 1.6, face: FZ + 0.7 } },
  poses: { me: [[0, 'stand'], [1.7, { shA: [20, 150], elA: 110 }], [3.0, 'shrug']], barber: [[0, 'relaxed'], [4.9, { shA: [60, 40], elA: 100 }]] }, exprs: { me: [[0, 'neutral'], [1.7, 'worried']], barber: [[0, 'smile'], [4.9, 'joy']] },
  cam: { two: ['me', 'barber'], a: FZ + 0.25, d: 3.6, h: 1.55, side: 0, lh: 1.35 }, caps: [['YOU CAN\'T SEE IT.', 1.5, { dur: 5.0 }], ['"TRUST ME. IT\'S GREAT."', 5.1]] });
R2('r208', { set: 'street', cast: { me: [KIPBAD, 0, -3.5, FZ, 'stand', 'smile'], a: [FRIEND1, -1.3, -3.2, FZ + 0.5, 'cheer', 'joy'], b: [FRIEND2, 1.3, -3.2, FZ - 0.5, 'cheer', 'joy'] },
  b: (st, s) => { lift(s); badHair(s.F.me); }, poses: { a: [[0, { shA: [50, 30], elA: 100 }]], b: [[0, { shB: [50, 30], elB: 100 }]] },
  cam: { p: [0, 1.7, 0.4], l: [0, 1.5, -3.5], p2: [0, 1.65, -0.2] }, caps: [['IT DOES NOT LOOK GREAT.', 0.1, { dur: 1.65 }], ['EVERYONE: "LOOKS GREAT!"', 1.7]] });
C2('r209', 'red', (g, t, i, u, cx, cy, acc) => { for (let n = 0; n < 5; n++) person(g, cx - 480 * u + n * 240 * u, cy + 120 * u, 300 * u, '#ffd8c8', 0.8); stamp(g, t, 'SOCIETY RUNS ON THIS LIE', cx, cy - 250 * u, { at: 0.4, size: 82 }); });
R2('r210', { set: 'street', cast: {},
  b: (st, s) => { st.add(cyl(0.12, 0.14, 0.75, '#3a3a48', 0, 0.515, -3.0, { outline: 0.008 })); s.gary = pigeon(0, -3.0, -1.0, 1.1); s.gary.position.y = 0.89; st.add(s.gary); },
  u: (s, t) => animPigeon(s.gary, t, { puff: 0.6 + 0.4 * ease.out(prog(t, 0.8, 1.3)), look: 0.4 }),
  cam: { p: [0.7, 1.3, -1.4], l: [0, 1.15, -3.0], p2: [0.6, 1.25, -1.6] },
  o: (g, t) => { const u = U(); for (let n = 0; n < 8; n++) { const ph = (t * 0.7 + n / 8) % 1, a = n * 0.8; g.save(); g.globalCompositeOperation = 'lighter'; glow(g, E.W * 0.5 + Math.cos(a) * 300 * u, E.H * 0.42 + Math.sin(a) * 260 * u - ph * 60 * u, 30 * u, '#ffd23f', (1 - ph) * 0.7); g.restore(); } },
  caps: [['GARY AGREES.', 0.1, { dur: 1.1 }], ['GARY LOOKS MAJESTIC.', 1.15]] });
R2('r211', { set: 'store', cast: { me: [ME, -3.3, -1.6, FZ, 'stand', 'neutral'], d: [DESCRIBER, -0.4, -0.7, FNX - 0.3, 'stand', 'calm'] },
  walk: { me: { path: [[-3.3, -1.6], [-2.6, -0.8], [-1.6, -0.4]], t0: 1.4, t1: 3.2, enter: true, face: FX - 0.3 } },
  carry: [{ prop: () => clip(), by: 'd', arms: { shA: [55, 10], elA: 80, shB: [20, 8], elB: 30 }, both: false, rx: -0.6 }],
  cam: { p: [-1.2, 1.75, 3.6], l: [-1.8, 1.3, -1.2], p2: [-1.0, 1.7, 3.0] }, caps: [['NO MIRROR IN THE FITTING ROOM', 0.4, { dur: 3.9 }], ['STORES HIRE PROFESSIONAL DESCRIBERS', 4.0]] });
const PINK = { ...ME, legs: '#ff8ab0', color: '#3a6ad8' };
R2('r212', { set: 'store', cast: { me: [PINK, -1.5, -0.4, FX - 0.3, 'stand', 'happy'], d: [DESCRIBER, -0.3, -0.75, FNX - 0.3, 'explain', 'talk'] },
  carry: [{ prop: () => clip(), by: 'd', arms: { shA: [20, 8], elA: 30, shB: [55, 10], elB: 80 }, both: false, rx: -0.6 }],
  poses: { me: [[0, { shA: [10, 40], shB: [10, 40], elA: 20, elB: 20 }], [3.3, 'stand']] }, exprs: { me: [[0, 'joy'], [2.0, 'neutral'], [3.4, 'worried']], d: [[0, 'talk'], [2.0, 'thinking'], [3.4, 'talk']] },
  cam: { two: ['me', 'd'], a: FZ, d: 2.9, h: 1.5, side: 0, lh: 1.35 }, caps: [['"THE JACKET SAYS CONFIDENCE."', 0.1, { dur: 1.9 }], ['"THE PANTS SAY..."', 2.0, { dur: 3.35 }], ['"WE\'LL COME BACK TO THE PANTS."', 3.4]] });
R2('r213', { set: 'store', cast: { me: [PINK, 0.4, -0.6, FZ, 'stand', 'worried'], a: [FRIEND1, -1.0, -0.2, FX - 0.6, 'crossArms', 'thinking'], b: [FRIEND2, 1.8, -0.2, FNX + 0.6, 'think', 'confused'] },
  u: (s, t) => { if (t > 3.0) s.F.b.parts.neck.rotation.y = Math.sin(t * 7) * 0.4 * clamp((5.5 - t) / 0.5); },
  cam: { p: [0.4, 1.7, 3.6], l: [0.4, 1.3, -0.4], p2: [0.4, 1.65, 3.2] },
  caps: [['SHOPPING ALONE: IMPOSSIBLE', 0.2, { dur: 2.3 }], ['YOU NEED TWO HONEST FRIENDS', 2.3, { dur: 4.7 }], ['(HARDER TO FIND THAN A GOOD JACKET)', 4.8, { size: V(64, 60) }]] });
C2('r214', 'red', (g, t, i, u, cx, cy, acc) => { const k = ease.outBack(prog(t, 0.2, 0.6)); if (k > 0) { g.save(); g.translate(cx - 300 * u, cy - 40 * u); g.scale(k, k); g.rotate(0.3); g.fillStyle = '#d4a83a'; rr(g, -50 * u, -40 * u, 100 * u, 220 * u, 12 * u); g.fill(); g.fillStyle = '#e8304a'; g.beginPath(); g.moveTo(-40 * u, -40 * u); g.lineTo(-40 * u, -150 * u); g.lineTo(40 * u, -190 * u); g.lineTo(40 * u, -40 * u); g.fill(); g.restore(); }
  face2d(g, cx + 320 * u, cy - 40 * u, 160 * u, { a: 0.25 + 0.1 * Math.sin(t * 3) }); text(g, '?', cx + 320 * u, cy - 40 * u, { size: 200 * u, font: FONTS.title, weight: 900, color: '#ffffff' });
  title(g, t, 'SOLD TO YOU...', cy + 280 * u, { at: 0.4, size: 64 }); title(g, t, '...YOU\'LL NEVER SEE IT ON YOURSELF', cy + 370 * u, { at: 1.8, size: 58, color: '#ff8a6a' }); });
C2('r215', 'gold', (g, t, i, u, cx, cy, acc) => { g.fillStyle = '#fff6d8'; rr(g, cx - 640 * u, cy - 330 * u, 1280 * u, 560 * u, 30 * u); g.fill(); g.strokeStyle = '#2a1a06'; g.lineWidth = 14 * u; rr(g, cx - 640 * u, cy - 330 * u, 1280 * u, 560 * u, 30 * u); g.stroke();
  text(g, '"LOOK YOUR BEST"', cx, cy - 220 * u, { size: 70 * u, font: FONTS.ui, weight: 900, color: '#9a8a70' }); cross(g, t, cx, cy - 220 * u, 120 * u, 2.6, '#e8304a');
  for (let n = 0; n < 3; n++) face2d(g, cx - 330 * u + n * 330 * u, cy - 20 * u, 90 * u * ease.outBack(prog(t, 3.6 + n * 0.15, 4.0 + n * 0.15)) || 0.01, { cap: false, mole: false, expr: 'o' });
  title(g, t, 'YOUR FRIENDS WILL GASP.', cy + 160 * u, { at: 3.4, size: 86, color: '#e8304a' }); });
R2('r216', { set: 'gym', cast: { l: [LIFTER, -0.6, 0, FZ, 'stand', 'determined'], f: [FRIEND1, 1.4, 0.3, FZ - 0.3, 'phone', 'confused'] },
  carry: [{ prop: () => barbell(), by: 'l', arms: { shA: [10, 150], elA: 125, shB: [10, 150], elB: 125 }, dy: 0.02 }, { prop: () => phone(), by: 'f', both: false, arms: { shA: [60, 12], elA: 100, shB: [10, 8], elB: 20 } }],
  poses: { l: [[0, 'stand'], [0.5, { hipA: 60, hipB: 60, knA: 100, knB: 60, drop: 0.3, spine: [40, 12] }], [1.3, 'stand'], [2.1, { hipA: 60, hipB: 60, knA: 70, knB: 110, drop: 0.3, spine: [45, -14] }], [2.9, 'stand'], [3.7, { hipA: 60, hipB: 60, knA: 100, knB: 100, drop: 0.3, spine: [50, 0] }], [4.5, 'stand']] },
  exprs: { l: [[0, 'determined'], [2.1, 'scared']], f: [[0, 'neutral'], [4.2, 'confused']] },
  cam: { p: [0.4, 1.6, 4.2], l: [0.4, 1.2, -0.5], p2: [0.4, 1.55, 3.6] }, caps: [['NO FORM CHECK', 2.1, { dur: 4.1 }], ['NO MIRROR SELFIE', 4.2]] });
C2('r217', 'teal', (g, t, i, u, cx, cy, acc) => { const xs = [cx - 420 * u, cx, cx + 420 * u]; text(g, 'BAD FORM', xs[0], cy + 170 * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); text(g, 'SELFIES', xs[1], cy + 170 * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); text(g, 'INJURIES', xs[2], cy + 170 * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#ffffff' });
  check(g, t, xs[1], cy - 40 * u, 90 * u, 0.7); cross(g, t, xs[0], cy - 40 * u, 90 * u, 1.3, '#6fe6a0'); cross(g, t, xs[2], cy - 40 * u, 90 * u, 2.1);
  title(g, t, 'TWO PROBLEMS SOLVED. ONE CREATED.', cy - 330 * u, { at: 0.2, size: 66 }); });

// ---------- room 3: your home feels smaller ----------
roomCard(3, 'blue');
C3('r302', 'blue', (g, t, i, u, cx, cy, acc) => { const room = (x, w, a = 1) => { g.save(); g.globalAlpha *= a; g.fillStyle = '#efe4cc'; rr(g, x - w / 2, cy - 200 * u, w, 360 * u, 16 * u); g.fill(); g.fillStyle = '#c8a878'; g.fillRect(x - w / 2, cy + 100 * u, w, 60 * u); g.restore(); };
  const dbl = ease.inOut(prog(t, 2.2, 3.4)), gone = ease.inOut(prog(t, 5.6, 6.4)); const w = lerp(380 * u, 760 * u, dbl * (1 - gone));
  room(cx, w); g.fillStyle = '#3a6ad8'; rr(g, cx - 60 * u, cy - 40 * u, 120 * u, 140 * u, 10 * u); g.fill();
  if (dbl > 0 && gone < 1) { g.save(); g.globalAlpha = 1 - gone; g.fillStyle = '#cfe0ec'; rr(g, cx + 140 * u, cy - 170 * u, 120 * u, 220 * u, 8 * u); g.fill(); g.strokeStyle = '#d4a83a'; g.lineWidth = 8 * u; rr(g, cx + 140 * u, cy - 170 * u, 120 * u, 220 * u, 8 * u); g.stroke(); g.restore(); }
  title(g, t, 'THE DESIGNER\'S FAVORITE TRICK', cy - 360 * u, { at: 0.2, size: 64 }); title(g, t, 'BIG MIRROR = TWICE THE SIZE', cy + 300 * u, { at: 2.6, size: 60, color: '#6fe6ff' }); if (t > 5.8) cross(g, t, cx + 200 * u, cy - 60 * u, 110 * u, 5.8); });
R3('r303', { set: 'tiny', cast: { me: [ME, 0.3, 0.45, FZ, 'stand', 'worried'] }, poses: { me: [[0, 'stand'], [0.3, { shA: [0, 88], shB: [0, 88], elA: 6, elB: 6 }]] },
  cam: { f: 'me', d: 3.2, h: 1.55, side: 0, lh: 1.25, push: 0.1 }, caps: [['YOUR TINY APARTMENT: JUST TINY.', 0.3]] });
const DANCE = (k, ph) => [[0, 'stand'], [0.2 + ph, { shA: [10, 160], shB: [10, 60], elA: 20, elB: 30, hipA: 20 }], [1.0 + ph, { shA: [10, 60], shB: [10, 160], elA: 30, elB: 20, hipB: 20 }], [1.8 + ph, 'cheer'], [2.6 + ph, { shA: [10, 160], shB: [10, 60], elA: 20, elB: 30, hipA: 20 }], [3.4 + ph, 'wave'], [4.2 + ph, 'cheer']];
R3('r304', { set: 'studio', cast: { t: [TEACHER, 0, -3.0, FZ, 'point', 'angry'], d0: [DANCERS[0], -3, -0.6, FZ + 0.4], d1: [DANCERS[1], -1, -0.2, FZ + 0.25], d2: [DANCERS[2], 1, -0.2, FZ - 0.25], d3: [DANCERS[3], 3, -0.6, FZ - 0.4] },
  poses: { d0: DANCE(0, 0), d1: DANCE(1, 0.3), d2: DANCE(2, 0.15), d3: DANCE(3, 0.45), t: [[0, 'point'], [3.0, 'explain']] }, exprs: { d1: [[0, 'confused']], d2: [[0, 'determined']], t: [[0, 'angry'], [3.0, 'talk']] },
  u: (s, t) => { s.F.d1.parts.neck.rotation.y = 0.7; s.F.d2.parts.neck.rotation.y = -0.7; s.F.d0.parts.neck.rotation.y = -0.5; s.F.d3.parts.neck.rotation.y = 0.5; },
  cam: { p: [0, 2.3, 6.0], l: [0, 1.2, -1.0], p2: [0, 2.1, 5.2] }, caps: [['NO MIRROR WALL', 0.4, { dur: 2.4 }], ['DANCERS WATCH EACH OTHER', 2.5]] });
R3('r305', { set: 'studio', cast: { t: [TEACHER, 0, -1.0, FZ, 'point', 'angry'] }, poses: { t: [[0, 'point'], [0.8, { shA: [88, 30], elA: 4, spine: [10, 0] }], [1.5, 'point']] }, exprs: { t: [[0, 'angry']] },
  cam: { f: 't', d: 1.9, h: 1.5, side: 0.25, lh: 1.48, push: 0.12 }, o: (g, t, i, s) => { const [x, y] = scr3(s, [0, 1.47, -1.0]); burst(g, t % 0.6, x, y, 280 * U(), 0, '#ffffff'); },
  caps: [['"AGAIN! FROM THE TOP!"', 0.1, { dur: 0.95 }], ['THE YELLING ALREADY HAPPENS', 1.0]] });
C3('r306', 'red', (g, t, i, u, cx, cy, acc) => { g.save(); g.globalAlpha = 1 - ease.inOut(prog(t, 1.8, 2.4)); text(g, 'YOUR APARTMENT', cx, cy - 40 * u, { size: 90 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); g.restore(); cross(g, t, cx, cy - 40 * u, 160 * u, 1.2);
  const k = ease.outBack(prog(t, 2.8, 3.3)); if (k > 0) { g.save(); g.translate(cx, cy - 60 * u); g.scale(k * (1 + 0.05 * Math.sin(t * 8)), k * (1 + 0.05 * Math.sin(t * 8))); heart(g, 0, 0, 170 * u); g.restore(); } title(g, t, 'YOUR LOVE LIFE', cy + 260 * u, { at: 2.9, size: 96, color: '#ffd8c8' }); });

// ---------- room 4: dating ----------
roomCard(4, 'red');
R4('r402', { set: 'tiny', cast: { me: [ME, 0.3, 0.45, FZ, 'stand', 'determined'] },
  poses: { me: [[0, 'stand'], [0.4, { shA: [10, 40], shB: [10, 40], elA: 120, elB: 120 }], [1.4, { shA: [20, 150], elA: 110 }], [2.6, 'shrug']] }, exprs: { me: [[0, 'determined'], [1.4, 'thinking'], [2.6, 'worried']] },
  cam: { f: 'me', d: 2.6, h: 1.55, side: 0.3, lh: 1.4, push: 0.12 }, caps: [['YOU CAN\'T CHECK YOURSELF', 1.3]] });
R4('r403', { set: 'restaurant', cast: { me: [ME, -4.2, -1.5, FX], date: [DATE, 0.7, 0, FNX, 'sit', 'neutral'] },
  walk: { me: { path: [[-4.2, -1.5], [-2.4, -0.9], [-1.4, -0.55]], t0: 0.2, t1: 2.4, face: FX + 0.15 } }, exprs: { date: [[0, 'neutral'], [2.6, 'surprised']], me: [[0, 'smile']] },
  poses: { me: [[0, 'stand'], [2.5, 'wave']] }, cam: { p: [-2.4, 1.65, 3.1], l: [-0.5, 1.1, -0.2], p2: [-2.0, 1.6, 2.6] }, caps: [['YOU FIND OUT FROM YOUR DATE\'S FACE', 2.5]] });
R4('r404', { set: 'restaurant', cast: { date: [DATE, 0.7, 0, FNX, 'sit', 'surprised'] }, exprs: { date: [[0, 'surprised'], [1.15, 'smirk']] },
  cam: { f: 'date', d: 1.45, h: 1.2, side: 0.15, lh: 1.12, push: 0.08 }, caps: [['GOOD FACE?', 0.1, { dur: 1.15 }], ['BAD FACE?', 1.2]] });
R4('r405', { set: 'restaurant', cast: { me: [ME, -1.4, -0.55, FX + 0.15, 'wave', 'smile'] }, poses: { me: [[0, 'wave'], [1.2, 'relaxed']] }, exprs: { me: [[0, 'smile'], [1.6, 'joy']] },
  b: (st, s) => { const k = ball(0.06, '#d4202a', 0.235, 0.12, 0.05, { outline: 0.004 }); k.scale.set(0.4, 1, 1.3); s.F.me.parts.head.add(k); const d = ball(0.025, '#d4202a', 0.2, 0.02, 0.09); d.scale.set(0.5, 1.4, 0.8); s.F.me.parts.head.add(d); },
  cam: { f: 'me', d: 1.5, h: 1.52, side: 0.15, lh: 1.5, push: 0.08 }, caps: [['KETCHUP. ON YOUR FOREHEAD.', 0.3, { dur: 2.2 }], ['YOU WILL NEVER KNOW.', 2.3]] });
C4('r406', 'dark', (g, t, i, u, cx, cy, acc) => { g.save(); g.translate(cx, cy - 60 * u); g.rotate(t * 0.6); g.strokeStyle = acc; g.lineWidth = 8 * u; for (let n = 0; n < 3; n++) { g.save(); g.rotate((n * Math.PI) / 3); g.beginPath(); g.ellipse(0, 0, 220 * u, 70 * u, 0, 0, 7); g.stroke(); g.restore(); } g.restore(); circle(g, cx, cy - 60 * u, 40 * u, '#ffd23f');
  title(g, t, 'THIS PART IS REAL SCIENCE', cy + 280 * u, { at: 0.3, size: 74 }); });
C4('r407', 'blue', (g, t, i, u, cx, cy, acc) => { const fl = ease.inOut(prog(t, 1.2, 2.2)); face2d(g, cx - 380 * u, cy - 40 * u, 170 * u, {}); g.save(); g.translate(cx + 380 * u, cy - 40 * u); g.scale(1 - 2 * fl, 1); face2d(g, 0, 0, 170 * u, {}); g.restore();
  text(g, 'REAL YOU', cx - 380 * u, cy + 190 * u, { size: 48 * u, font: FONTS.ui, weight: 900, color: '#6fe6a0' }); text(g, 'MIRROR YOU', cx + 380 * u, cy + 190 * u, { size: 48 * u, font: FONTS.ui, weight: 900, color: '#6fe6ff' });
  g.strokeStyle = '#ffffff'; g.lineWidth = 8 * u; g.beginPath(); g.moveTo(cx - 120 * u, cy - 40 * u); g.lineTo(cx + 120 * u, cy - 40 * u); g.stroke(); title(g, t, 'FLIPPED LEFT TO RIGHT', cy - 360 * u, { at: 0.3, size: 66 }); title(g, t, 'NOBODY ELSE EVER SEES THIS ONE', cy + 320 * u, { at: 3.7, size: 56, color: '#ffd23f' }); });
C4('r408', 'teal', (g, t, i, u, cx, cy, acc) => { title(g, t, '1977 STUDY', cy - 380 * u, { at: 0.1, size: 90, color: '#9ff2d8' });
  [[cx - 300 * u, false, 'TRUE', 1.3], [cx + 300 * u, true, 'FLIPPED', 3.0]].forEach(([x, fl, lab, at]) => { const k = ease.outBack(prog(t, at, at + 0.35)); if (k <= 0) return; g.save(); g.translate(x, cy - 20 * u); g.scale(k, k); g.rotate(fl ? 0.05 : -0.05); g.fillStyle = '#fbfaf4'; rr(g, -190 * u, -230 * u, 380 * u, 460 * u, 12 * u); g.fill(); g.fillStyle = '#cfe8e0'; g.fillRect(-160 * u, -200 * u, 320 * u, 320 * u); face2d(g, 0, -40 * u, 120 * u, { flip: fl });
    text(g, lab, 0, 170 * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#141218' }); g.restore(); }); });
C4('r409', 'teal', (g, t, i, u, cx, cy, acc) => { face2d(g, cx - 300 * u, cy - 80 * u, 120 * u, { flip: false }); face2d(g, cx + 300 * u, cy - 80 * u, 120 * u, { flip: true });
  const pick = (x, lab, at, col) => { const k = ease.outBack(prog(t, at, at + 0.35)); if (k <= 0) return; check(g, t, x, cy - 80 * u, 150 * u, at, col); lab.forEach((l, n) => text(g, l, x, cy + (130 + n * 56) * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: col })); };
  pick(cx + 300 * u, ['YOU PICK', 'THE FLIPPED ONE'], 1.2, '#6fe6ff'); pick(cx - 300 * u, ['FRIENDS PICK', 'THE TRUE ONE'], 4.6, '#ffd23f');
  title(g, t, 'EACH PICKS THE VERSION THEY\'RE USED TO', cy + 330 * u, { at: 5.6, size: 52 }); });
C4('r410', 'dark', (g, t, i, u, cx, cy, acc) => { brain(g, cx, cy - 110 * u, 170 * u); const k = ease.outBack(prog(t, 0.3, 0.7)); if (k > 0) { g.save(); g.translate(cx + 210 * u, cy - 220 * u); g.scale(k, k); heart(g, 0, 0, 60 * u); g.restore(); }
  title(g, t, 'THE MERE-EXPOSURE EFFECT', cy + 200 * u, { at: 0.3, size: 80, color: '#b48cff' }); title(g, t, 'WE LIKE WHAT WE\'RE FAMILIAR WITH', cy + 300 * u, { at: 2.2, size: 54 }); });
R4('r411', { set: 'bedroom', cast: { me: [ME, 0.2, 0.3, FZ - 0.35, 'stand', 'neutral'] },
  carry: [{ prop: () => { const g = new THREE.Group(); g.add(box(0.2, 0.26, 0.006, '#fbfaf4', 0, 0, 0, { outline: 0.003 })); return g; }, by: 'me', arms: HOLD, rx: -0.3 }],
  exprs: { me: [[0, 'neutral'], [0.9, 'confused'], [3.0, 'scared']] },
  cam: { f: 'me', d: 2.2, h: 1.5, side: -0.5, lh: 1.35, push: 0.1 },
  o: (g, t, i, s) => { const u = U(), k = ease.outBack(prog(t, 0.6, 1.0)); if (k <= 0) return; g.save(); g.translate(E.W * 0.8, E.H * 0.42); g.scale(k, k); g.rotate(0.06); g.fillStyle = '#fbfaf4'; rr(g, -150 * u, -190 * u, 300 * u, 380 * u, 10 * u); g.fill(); g.fillStyle = '#d8e8f0'; g.fillRect(-130 * u, -170 * u, 260 * u, 270 * u); face2d(g, 0, -40 * u, 95 * u, {}); text(g, 'PHOTO', 0, 140 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#141218' }); g.restore(); },
  caps: [['WHY DO I LOOK ODD IN PHOTOS?', 0.6, { dur: 4.0 }], ['YOU KNOW THE REVERSED COPY', 4.1]] });
R4('r412', { set: 'park', cast: { me: [ME, 1.3, 0.4, FX - 0.5, 'stand', 'thinking'], a: [FRIEND1, 2.8, -0.2, FNX + 0.4, 'explain', 'talk'], b: [FRIEND2, 3.0, 0.9, FNX - 0.3, 'explain', 'smile'] },
  poses: { a: [[0, 'explain'], [2.0, { shA: [60, 40], elA: 60 }]], b: [[0, 'relaxed'], [3.0, 'explain']] }, exprs: { me: [[0, 'thinking'], [3.6, 'smile']] },
  cam: { p: [2.0, 1.65, 4.6], l: [2.1, 1.25, 0.3], p2: [2.0, 1.6, 4.1] },
  o: (g, t, i, s) => { bubble(g, t, s, 'a', '"BIG EYES."', 0.6, { off: 3.0 }); bubble(g, t, s, 'b', '"NICE SMILE."', 1.8, { off: 4.4 }); bubble(g, t, s, 'a', '"STRONG CAP."', 3.1); },
  caps: [['THE ONLY FACE YOU KNOW', 2.8, { dur: 6.0 }]] });
C4('r413', 'blue', (g, t, i, u, cx, cy, acc) => { const k = ease.outBack(prog(t, 0.3, 0.7)); if (k > 0) { g.save(); g.translate(cx, cy - 60 * u); g.scale(k, k); g.fillStyle = '#2a2a33'; rr(g, -200 * u, -120 * u, 400 * u, 260 * u, 30 * u); g.fill(); rr(g, -80 * u, -170 * u, 120 * u, 60 * u, 12 * u); g.fill(); circle(g, 0, 10 * u, 95 * u, '#6a7a8a'); circle(g, 0, 10 * u, 60 * u, '#141418'); circle(g, -20 * u, -10 * u, 16 * u, '#ffffff'); g.restore(); }
  if (t > 2.9) { g.save(); g.globalAlpha = 1 - clamp((t - 2.9) / 0.4); g.fillStyle = '#ffffff'; g.fillRect(0, 0, E.W, E.H); g.restore(); }
  title(g, t, 'EXACTLY ONE WAY LEFT', cy + 280 * u, { at: 0.5, size: 80 }); });
