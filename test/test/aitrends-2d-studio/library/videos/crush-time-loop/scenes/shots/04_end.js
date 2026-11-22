// shots/04_end.js — 6:56-8:08: the climax at the party door (Loop 450 / 1,055), the confession, midnight, and Wednesday.
import { E } from './_lib.js';
import { FZ, FNZ, FX, FNX, ME, LEAH, LEAHCOAT, SAM, GUESTS, BARISTA, SL, CL, roll, bubble, notes, digital, loopRing, calendar, cup2d, panel2d, leah2d,
  face2d, scr3, burst, title, stamp, cross, check, heart, person, text, FONTS, alpha, rr, glow, circle, ring, U, ease, prog, clamp, lerp } from './_loop.js';
import { coffee, bowl, cerealStain, boombox, clockFace } from '../toon/sets_loop.js';
import { picture } from '../toon/sets3d.js';

const CAFE = ['diningHall', { cafe: true }];
const cafeDress = (st) => { st.add(boombox(2.5, 1.06, -4.85, 0)); st.add(picture(0.7, 0.3, clockFace('9:14', 'AM'), -2.5, 2.5, -5.97)); };
const N = 'LOOPS 500 + 1,105';
// the door: you got there first. Leah in her coat, facing you.
const DOOR = (time = '11:58') => [ 'party', { time } ];
const STAND = { me: [ME, 3.0, -2.95, FZ + 0.25, 'stand', 'calm'], leah: [LEAHCOAT, 2.55, -1.7, FNZ - 0.35, 'stand', 'surprised'], g1: [GUESTS[0], -1.5, -1.7, FZ + 0.5, 'stand', 'happy'] };
const SOLO_L = { leah: STAND.leah, g1: STAND.g1 }, SOLO_K = { me: STAND.me, g1: STAND.g1 };
const WIDE = { p: [-0.7, 1.5, -2.0], l: [2.8, 1.45, -2.3], p2: [-0.4, 1.5, -2.05] };
const LEAHC = { p: [4.1, 1.55, -3.0], l: [2.55, 1.42, -1.7], p2: [4.0, 1.53, -2.85] };
const KIPC = { p: [4.3, 1.55, -1.0], l: [3.0, 1.42, -2.95], p2: [4.2, 1.53, -1.2] };
const sit = (o = {}) => ({ hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [38, 4], shB: [38, 4], elA: 58, elB: 58, ...o });
const BOWL = { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [62, 10], elA: 75, shB: [10, 8], elB: 20 };

// ---------- climax ----------
SL(N)('c01', { set: DOOR(), cast: STAND, exprs: { me: [[0, 'calm'], [1.4, 'talk'], [5.0, 'calm']], leah: [[0, 'surprised'], [3.0, 'worried']] }, poses: { me: [[0, 'stand'], [1.4, 'explain']] }, cam: WIDE,
  o: (g, t, i, s) => { bubble(g, t, s, 'me', 'YOU ALWAYS GO AT 11:58.', 1.4, { off: 3.6 }); bubble(g, t, s, 'me', 'WHY?', 3.7); },
  caps: [['THIS TIME, YOU GET TO THE DOOR FIRST', 0.2]] });
SL(N)('c02', { set: DOOR(), cast: SOLO_L, exprs: { leah: [[0, 'sad'], [0.4, 'talk'], [7.6, 'sad']] }, poses: { leah: [[0, 'stand'], [0.4, 'crossArms']] }, cam: LEAHC,
  caps: [['"MY FIRST LOOP... AT 11:58..."', 0.4], ['"I WAS GOING TO TELL YOU I LIKED YOU."', 2.9, { size: 64 }], ['"AND I WALKED OUT INSTEAD."', 5.8]] });
SL(N)('c03', { set: DOOR(), cast: SOLO_L, exprs: { leah: [[0, 'sad'], [0.3, 'talk'], [6.0, 'worried']] }, cam: { ...LEAHC, p2: [3.9, 1.52, -2.7] },
  caps: [['"IF YOU DIDN\'T FEEL THE SAME..."', 0.3], ['"I\'D LIVE THAT ANSWER. FOREVER."', 3.3]] });
CL(N, 'red')('c04', 'red', (g, t, i, u, cx, cy) => { title(g, t, '1,006 LOOPS', cy - 400 * u, { at: 0.1, size: 80 }); loopRing(g, cx - 220 * u, cy, 170 * u, ease.inOut(prog(t, 0.3, 1.4)), '#fbfaf4'); loopRing(g, cx + 220 * u, cy, 170 * u, ease.inOut(prog(t, 0.5, 1.6)), '#ffd23f');
  const k = ease.outBack(prog(t, 1.8, 2.2)); if (k > 0) { g.save(); g.translate(cx - 220 * u, cy); g.scale(k, k); heart(g, 0, 0, 80 * u, '#ff4a6a'); g.restore(); g.save(); g.translate(cx + 220 * u, cy); g.scale(k, k); heart(g, 0, 0, 80 * u, '#ff4a6a'); g.restore(); }
  title(g, t, 'FOR THE EXACT SAME REASON AS YOU', cy + 330 * u, { at: 2.4, size: 62, color: '#ffd84a' }); });
SL(N)('c05', { set: DOOR(), cast: SOLO_K, exprs: { me: [[0, 'worried'], [2.0, 'thinking']] }, poses: { me: [[0, 'stand'], [2.0, 'shrug']] }, cam: KIPC,
  caps: [['YOU DON\'T HAVE A SPEECH', 0.2], ['YOU THREW IT AWAY 400 LOOPS AGO', 2.0]] });
CL(N, 'teal')('c06', 'teal', (g, t, i, u, cx, cy) => { title(g, t, 'SO YOU TELL HER ABOUT FRESHMAN CHEMISTRY', cy - 410 * u, { at: 0.1, size: 58 });
  panel2d(g, t, cx - 320 * u, cy + 20 * u, 560 * u, 560 * u, 1.0, 'GOGGLES. UPSIDE DOWN.', (g, x, y) => { const u0 = U(); face2d(g, x, y, 120 * u0, { cap: false, mole: false, expr: 'o' }); g.strokeStyle = '#3a6ad8'; g.lineWidth = 14 * u0; g.fillStyle = alpha('#9fd6ff', 0.6);
    for (const s of [-1, 1]) { g.beginPath(); g.ellipse(x + s * 50 * u0, y + 50 * u0, 46 * u0, 34 * u0, 0, 0, 7); g.fill(); g.stroke(); } g.beginPath(); g.moveTo(x - 120 * u0, y + 50 * u0); g.lineTo(x + 120 * u0, y + 50 * u0); g.stroke(); }, { bg: '#e8f4ff' });
  panel2d(g, t, cx + 320 * u, cy + 20 * u, 560 * u, 560 * u, 3.8, 'STRAIGHT INTO A CABINET', (g, x, y) => { const u0 = U(); g.fillStyle = '#a0683e'; rr(g, x + 20 * u0, y - 180 * u0, 180 * u0, 340 * u0, 10 * u0); g.fill(); g.strokeStyle = '#6a4024'; g.lineWidth = 6 * u0; g.strokeRect(x + 40 * u0, y - 160 * u0, 140 * u0, 140 * u0); g.strokeRect(x + 40 * u0, y - 0, 140 * u0, 140 * u0);
    person(g, x - 60 * u0, y + 150 * u0, 280 * u0, '#141218'); burst(g, t, x + 20 * u0, y - 60 * u0, 80 * u0, 4.2, '#ffd23f'); }, { bg: '#fff0d8' });
  title(g, t, 'SHE WAS THERE.', cy + 400 * u, { at: 6.4, size: 60, color: '#ffd84a' }); });
SL(N)('c07', { set: DOOR(), cast: SOLO_L, exprs: { leah: [[0, 'joy'], [0.2, 'happy']] }, poses: { leah: [[0, 'cheer'], [1.0, { shA: [30, 30], elA: 120, shB: [20, 10], elB: 30 }]] }, cam: LEAHC,
  caps: [['"I REMEMBER THE CABINET."', 0.2]] });
CL((t) => (t < 2.6 ? N : ''), 'dark')('c08', 'dark', (g, t, i, u, cx, cy) => { const str = t < 1.3 ? '11:59 PM' : t < 2.6 ? '12:00 AM' : '12:01 AM'; const sh = t > 1.3 && t < 1.6 ? Math.sin(t * 90) * 8 * u : 0;
  digital(g, cx + sh, cy, str, 150 * u, { col: t < 2.6 ? '#ff3a3a' : '#6fe6a0' }); if (t > 2.6) { const k = ease.out(prog(t, 2.6, 3.4)); glow(g, cx, cy, 500 * u * k, '#6fe6a0', 0.35); } title(g, t, 'MIDNIGHT', cy - 300 * u, { at: 0.1, size: 70 }); });

// ---------- ending ----------
SL('')('e01', { set: ['dorm', { wed: true }], cast: { me: [ME, -2.0, -1.95, FZ, 'sit', 'scared'] }, exprs: { me: [[0, 'scared'], [1.6, 'surprised'], [3.4, 'joy']] },
  poses: { me: [[0, sit({ spine: [-14, 0], shA: [40, 40], elA: 60, shB: [40, 40], elB: 60 })], [0.5, sit({ spine: [6, 0] })], [3.4, sit({ shA: [10, 160], elA: 20, shB: [10, 160], elB: 20 })]] },
  cams: [[0, { p: [-0.7, 1.35, 0.9], l: [-2.0, 1.0, -1.95] }], [1.6, { p: [-0.75, 1.6, 0.2], l: [-1.0, 1.7, -2.98] }], [3.3, { p: [-0.7, 1.35, 0.9], l: [-2.0, 1.0, -1.95] }]],
  o: (g, t) => { const u = U(), x = E.W - 230 * u, y = 120 * u; digital(g, x, y, '7:00 AM', 64 * u); }, caps: [['7:00 AM. YOU FLINCH.', 0.2], ['THE CALENDAR SAYS...', 1.7], ['WEDNESDAY.', 3.3, { size: 120 }]] });
CL('', 'blue')('e02', 'blue', (g, t, i, u, cx, cy) => { const k = ease.outBack(prog(t, 0.2, 0.6)); if (k <= 0) return; const sh = t < 1.2 ? Math.sin(t * 70) * 6 * u : 0; g.save(); g.translate(cx + sh, cy); g.scale(k, k);
  g.fillStyle = '#141418'; rr(g, -230 * u, -420 * u, 460 * u, 840 * u, 50 * u); g.fill(); g.fillStyle = '#eef2f8'; rr(g, -206 * u, -390 * u, 412 * u, 780 * u, 34 * u); g.fill();
  text(g, 'LEAH', 0, -330 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#141218' }); const b = ease.outBack(prog(t, 0.9, 1.3)); if (b > 0) { g.save(); g.translate(-20 * u, -120 * u); g.scale(b, b); g.fillStyle = '#ffd23f'; rr(g, -170 * u, -80 * u, 340 * u, 160 * u, 30 * u); g.fill();
    text(g, 'OAT LATTE,', 0, -30 * u, { size: 34 * u, font: FONTS.ui, weight: 900, color: '#141218' }); text(g, 'EXTRA HOT,', 0, 10 * u, { size: 34 * u, font: FONTS.ui, weight: 900, color: '#141218' }); text(g, 'NO FOAM?', 0, 50 * u, { size: 34 * u, font: FONTS.ui, weight: 900, color: '#141218' }); g.restore(); }
  g.restore(); title(g, t, 'BZZT.', cy - 430 * u, { at: 0.2, size: 60, x: cx + 420 * u }); });
SL('')('e03', { set: CAFE, b: cafeDress, cast: { me: [ME, 0.1, -3.2, 0.25, 'stand', 'happy'], leah: [LEAH, 1.2, -3.2, FNX - 0.25, 'stand', 'happy'], b: [BARISTA, -1.4, -5.75, FZ, 'stand', 'calm'] },
  carry: [{ prop: () => coffee(), by: 'me', both: false, arms: { shA: [55, 10], elA: 70, shB: [6, 6], elB: 10 } }, { prop: () => coffee(), by: 'leah', both: false, arms: { shA: [55, 10], elA: 70, shB: [6, 6], elB: 10 } }],
  exprs: { me: [[0, 'happy'], [1.8, 'sleepy'], [3.6, 'joy']], leah: [[0, 'happy'], [1.8, 'sleepy'], [3.6, 'joy']] }, cam: { p: [0.65, 1.6, -0.6], l: [0.65, 1.35, -3.3], p2: [0.65, 1.58, -0.9] },
  o: (g, t, i, s) => { const [x, y] = scr3(s, [2.5, 1.35, -4.85]); notes(g, t, x, y, { n: 5 }); digital(g, E.W - 210 * U(), 130 * U(), '9:14 AM', 54 * U(), { col: '#ffd23f' }); },
  caps: [['9:14. THE SONG COMES ON.', 0.3], ['YOU BOTH GROAN.', 1.8], ['TWO COFFEES.', 3.6]] });
SL('')('e04', { set: ['dorm', { wed: true }], cast: { me: [ME, 0.6, -0.9, 0.5, 'stand', 'joy'], sam: [SAM, 2.3, -1.85, FNX + 0.5, 'sit', 'confused'] }, b: (st, s) => cerealStain(s.F.sam, 14),
  carry: [{ prop: () => bowl(), by: 'sam', both: false, arms: BOWL }], poses: { sam: [[0, BOWL]], me: [[0, 'stand'], [0.6, 'point']] }, exprs: { me: [[0, 'joy']], sam: [[0, 'confused'], [2.4, 'sad']] },
  cam: { p: [1.1, 1.55, 2.0], l: [1.45, 1.2, -1.5] }, caps: [['SAM STILL SPILLS HIS CEREAL', 0.2], ['SOME THINGS DON\'T NEED A TIME LOOP', 2.2, { size: 64 }]] });
CL('', 'dark')('e05', 'dark', (g, t, i, u, cx, cy) => { title(g, t, 'WOULD YOU RATHER...', cy - 410 * u, { at: 0.1, size: 74 });
  panel2d(g, t, cx - 360 * u, cy, 600 * u, 520 * u, 0.8, 'A TIME LOOP WITH YOUR CRUSH', (g, x, y) => { const u0 = U(); loopRing(g, x, y, 120 * u0, 1, '#6fe6ff'); heart(g, x, y, 50 * u0, '#ff4a6a'); }, { bg: '#1a2238' });
  panel2d(g, t, cx + 360 * u, cy, 600 * u, 520 * u, 1.8, 'NEVER A SECOND CHANCE', (g, x, y) => { const u0 = U(); digital(g, x, y, '1x', 80 * u0, { col: '#ffd23f' }); }, { bg: '#1a2238' });
  text(g, 'OR', cx, cy - 20 * u, { size: 70 * u, font: FONTS.title, weight: 900, color: '#ffd84a' }); title(g, t, 'TELL ME IN THE COMMENTS', cy + 400 * u, { at: 3.0, size: 64, color: '#6fe6ff' }); });
