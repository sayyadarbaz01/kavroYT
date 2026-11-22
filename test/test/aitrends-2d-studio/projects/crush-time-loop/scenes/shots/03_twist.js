// shots/03_twist.js — 5:01-6:56: the twist (Leah is looping too, Loop 1,006), then two people in one loop: rooftop, restaurants, guitar/Japanese, the song, her 600 alone, Sam, 11:58.
import { E } from './_lib.js';
import { FZ, FNZ, FX, FNX, ME, LEAH, LEAHCOAT, SAM, GUESTS, CUSTOMERS, BARISTA, SL, CL, roll, bubble, notes, digital, loopRing, calendar, cup2d, bench2d, panel2d, guitar2d, book2d, leah2d,
  face2d, scr3, burst, title, stamp, cross, check, heart, person, text, FONTS, alpha, rr, glow, circle, ring, U, ease, prog, clamp, lerp } from './_loop.js';
import { guitar, speech, boombox, clockFace, holdGuitar, holdBook } from '../toon/sets_loop.js';
import { picture } from '../toon/sets3d.js';

const sit = (o = {}) => ({ hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [38, 4], shB: [38, 4], elA: 58, elB: 58, ...o });
const CAFE = ['diningHall', { cafe: true }], ROOF = 'rooftop', PARTY = 'party';
const cafeDress = (st) => { st.add(boombox(2.5, 1.06, -4.85, 0)); st.add(picture(0.7, 0.3, clockFace('9:14', 'AM'), -2.5, 2.5, -5.97)); };
const BARI = [BARISTA, -1.5, -5.75, FZ, 'stand', 'calm'];
const two = (k) => `LOOP ${k.toLocaleString('en-US')}`;
// the counter: you at the front, Leah behind you. Then you turn around to face her.
const LINE = { me: [ME, 0.6, -3.75, FNZ, 'stand', 'happy'], leah: [LEAH, 0.6, -2.75, FNZ, 'stand', 'calm'] };
const FACE = { me: [ME, 0.6, -3.75, FZ, 'stand', 'surprised'], leah: [LEAH, 0.6, -2.75, FNZ, 'stand', 'calm'] };
const PROFILE = { p: [2.6, 1.55, -3.15], l: [0.6, 1.42, -3.25] };
const LEAHCLOSE = { p: [2.0, 1.52, -4.05], l: [0.6, 1.42, -2.75], p2: [1.9, 1.5, -3.9] };
const KIPCLOSE = { p: [2.0, 1.52, -2.45], l: [0.6, 1.42, -3.75], p2: [1.9, 1.5, -2.6] };
const flick = (t, at) => (t < at ? 401 : t < at + 0.9 && Math.floor(t * 14) % 2 ? 401 : 1006);
// rooftop bench (top 0.47, back at z -3.13): sitters face +z
const RB = { leah: [LEAH, -0.45, -2.85, FZ, 'sit', 'calm'], me: [ME, 0.45, -2.85, FZ, 'sit', 'calm'] };
const ROOFCAM = { p: [0.0, 1.3, -0.4], l: [0.0, 1.0, -2.85], p2: [0.0, 1.28, -0.7] };
// party: you and Leah side by side, Sam in front
const PAIR = { me: [ME, 0.0, 0.3, FZ + 0.35, 'stand', 'happy'], leah: [LEAH, 0.85, 0.2, FZ - 0.35, 'stand', 'happy'], sam: [SAM, 2.3, 0.9, FNX + 0.25, 'stand', 'confused'] };

// ---------- the twist ----------
SL(401)('t01', { set: CAFE, b: cafeDress, cast: { ...LINE, b: BARI }, exprs: { me: [[0, 'happy'], [3.2, 'surprised']], leah: [[0, 'calm'], [2.6, 'happy']] },
  cam: { p: [3.4, 1.6, -2.2], l: [0.6, 1.35, -3.3], p2: [3.1, 1.58, -2.4] },
  o: (g, t, i, s) => { const [x, y] = scr3(s, [0.6, 1.75, -3.75]); notes(g, t, x, y, { n: 3, col: '#ffffff' }); if (t > 2.6) { const [x2, y2] = scr3(s, [0.6, 1.75, -2.75]); notes(g, t - 2.6, x2, y2, { n: 3, col: '#ffd23f' }); } digital(g, E.W - 210 * U(), 130 * U(), '9:14 AM', 54 * U(), { col: '#ffd23f' }); },
  caps: [['LOOP 401. 9:14.', 0.3, { dur: 2.2 }], ['SOMEONE BEHIND YOU IS HUMMING TOO', 2.7]] });
SL(401)('t02', { set: CAFE, b: cafeDress, cast: { leah: FACE.leah }, exprs: { leah: [[0, 'happy']] }, cam: LEAHCLOSE,
  o: (g, t, i, s) => { const [x, y] = scr3(s, [0.6, 1.75, -2.75]); notes(g, t, x, y, { n: 4, col: '#ffd23f' }); }, caps: [['IT\'S LEAH. SHE KNOWS EVERY WORD.', 0.3]] });
SL(401)('t03', { set: CAFE, b: cafeDress, cast: FACE, exprs: { me: [[0, 'surprised'], [0.2, 'talk'], [1.7, 'surprised'], [3.8, 'talk'], [5.6, 'smirk']], leah: [[0, 'smile'], [1.9, 'talk'], [3.4, 'smile']] },
  poses: { me: [[0, 'stand'], [3.8, 'point']] }, cam: PROFILE,
  o: (g, t, i, s) => { bubble(g, t, s, 'me', 'YOU KNOW THIS SONG.', 0.2, { off: 1.8 }); bubble(g, t, s, 'leah', 'IT\'S... CATCHY.', 1.9, { off: 3.7 }); bubble(g, t, s, 'me', 'NO, IT ISN\'T. IT\'S TERRIBLE.', 3.8); } });
CL(401, 'dark')('t04', 'dark', (g, t, i, u, cx, cy) => { title(g, t, 'THAT SONG CAME OUT ON A TUESDAY', cy - 410 * u, { at: 0.1, size: 62 }); title(g, t, '3 WEEKS AGO', cy - 320 * u, { at: 1.0, size: 52, color: '#9fd6ff' });
  const x0 = cx - 560 * u, x1 = cx + 560 * u, yb = cy + 160 * u; g.strokeStyle = '#ffffff'; g.lineWidth = 4 * u; g.beginPath(); g.moveTo(x0, yb); g.lineTo(x1, yb); g.stroke();
  const k = ease.inOut(prog(t, 1.6, 4.6)); g.strokeStyle = '#6fe6ff'; g.lineWidth = 10 * u; g.lineJoin = 'round'; g.beginPath(); g.moveTo(x0, yb - 300 * u); const n = 40;
  for (let j = 1; j <= n * k; j++) { const q = j / n, x = lerp(x0, x1, q), y = q < 0.1 ? yb - 300 * u + q * 2800 * u : yb - 10 * u; g.lineTo(x, Math.min(yb - 10 * u, y)); } g.stroke();
  text(g, 'PLAYS PER DAY', x0 + 140 * u, yb + 50 * u, { size: 34 * u, font: FONTS.ui, weight: 900, color: '#9fd6ff' }); title(g, t, 'NOBODY PLAYED IT AGAIN...', cy + 300 * u, { at: 3.4, size: 58 });
  if (t > 5.4) { const s = ease.outBack(prog(t, 5.4, 5.8)); g.save(); g.translate(x1 - 120 * u, yb - 160 * u); g.scale(s, s); digital(g, 0, 0, '9:14', 60 * U(), { col: '#ffd23f' }); g.restore(); title(g, t, '...EXCEPT AT THIS CAFE. AT 9:14.', cy + 400 * u, { at: 5.4, size: 52, color: '#ffd84a' }); } });
SL(401)('t05', { set: CAFE, b: cafeDress, cast: { leah: FACE.leah }, exprs: { leah: [[0, 'calm'], [0.3, 'talk'], [1.8, 'calm']] }, cam: LEAHCLOSE, caps: [['"HOW MANY LOOPS ARE YOU ON?"', 0.3]] });
SL(401)('t06', { set: CAFE, b: cafeDress, cast: { me: FACE.me }, exprs: { me: [[0, 'shocked'], [0.3, 'talk'], [1.0, 'shocked']] }, cam: KIPCLOSE, caps: [['"...401."', 0.2, { size: 110 }]] });
SL((t) => flick(t, 0.9))('t07', { set: CAFE, b: cafeDress, cast: { leah: FACE.leah }, exprs: { leah: [[0, 'calm'], [0.2, 'talk'], [1.2, 'smile']] }, cam: LEAHCLOSE, caps: [['"I\'M ON 1,006."', 0.2, { size: 100 }]] });
CL(1006, 'red')('t08', 'red', (g, t, i, u, cx, cy) => { const bw = 1100 * u, k1 = ease.out(prog(t, 0.3, 0.9)), k2 = ease.out(prog(t, 0.9, 2.0));
  g.fillStyle = '#fbfaf4'; rr(g, cx - bw / 2, cy - 170 * u, bw * 0.4 * k1, 110 * u, 20 * u); g.fill(); text(g, 'YOU: 401', cx - bw / 2 + 220 * u, cy - 115 * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#141218' });
  g.fillStyle = '#ffd23f'; rr(g, cx - bw / 2, cy + 10 * u, bw * k2, 110 * u, 20 * u); g.fill(); if (k2 > 0.3) text(g, 'LEAH: 1,006', cx - bw / 2 + 260 * u, cy + 65 * u, { size: 46 * u, font: FONTS.ui, weight: 900, color: '#141218' });
  title(g, t, 'SHE\'S BEEN STUCK 600 LOOPS LONGER', cy + 330 * u, { at: 2.0, size: 62, color: '#ffffff' }); });
CL(1006, 'gold')('t09', 'gold', (g, t, i, u, cx, cy) => { cup2d(g, cx - 260 * u, cy, 150 * u, { label: 'OAT' }); title(g, t, 'THE COFFEE ORDER?', cy - 400 * u, { at: 0.1, size: 72 });
  const n = Math.round(lerp(0, 1000, ease.inOut(prog(t, 0.8, 3.4)))); g.strokeStyle = '#141218'; g.lineWidth = 6 * u; for (let j = 0; j < Math.min(25, n / 40); j++) { const x = cx + 120 * u + (j % 5) * 70 * u, y = cy - 150 * u + Math.floor(j / 5) * 70 * u; for (let m = 0; m < 4; m++) { g.beginPath(); g.moveTo(x + m * 12 * u, y); g.lineTo(x + m * 12 * u, y + 50 * u); g.stroke(); } g.beginPath(); g.moveTo(x - 6 * u, y + 40 * u); g.lineTo(x + 46 * u, y + 10 * u); g.stroke(); }
  title(g, t, `SHE WATCHED YOU ORDER IT ${n.toLocaleString('en-US')}${n >= 1000 ? '+' : ''} TIMES`, cy + 330 * u, { at: 0.8, size: 56, color: '#ffffff' }); });

// ---------- two people in one loop ----------
CL('LOOPS 402 + 1,007', 'teal')('w01', 'teal', (g, t, i, u, cx, cy) => { title(g, t, 'NOW THERE ARE TWO OF YOU', cy - 380 * u, { at: 0.1, size: 74 });
  loopRing(g, cx - 280 * u, cy + 40 * u, 170 * u, ease.inOut(prog(t, 0.4, 1.6)), '#fbfaf4'); loopRing(g, cx + 280 * u, cy + 40 * u, 170 * u, ease.inOut(prog(t, 0.6, 1.8)), '#ffd23f');
  digital(g, cx - 280 * u, cy + 40 * u, '402', 64 * u); digital(g, cx + 280 * u, cy + 40 * u, '1,007', 64 * u, { col: '#ffd23f' }); text(g, 'YOU', cx - 280 * u, cy + 280 * u, { size: 50 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); text(g, 'LEAH', cx + 280 * u, cy + 280 * u, { size: 50 * u, font: FONTS.ui, weight: 900, color: '#ffd23f' }); });
SL('LOOPS 402 + 1,007')('w02', { set: ROOF, mood: 'night', cast: { me: [ME, -3.4, 1.0, FX, 'stand', 'happy'], leah: [LEAH, -2.6, 0.0, FX, 'stand', 'smile'] },
  walk: { me: [-3.4, 1.0, -0.6, 0.6, 0, 2.2, 5.2], leah: [-2.6, 0.0, 0.5, -0.3, 0, 2.2, 5.2] }, cam: { p: [1.6, 1.6, 3.6], l: [-0.8, 1.2, -0.4] }, caps: [['YOU SNEAK INTO THE ROOFTOP OBSERVATORY', 0.2, { size: 58 }]] });
CL('LOOPS 402 + 1,007', 'gold')('w03', 'gold', (g, t, i, u, cx, cy) => { title(g, t, 'EVERY RESTAURANT IN TOWN', cy - 400 * u, { at: 0.1, size: 70 }); title(g, t, 'IN ONE DAY', cy - 310 * u, { at: 0.6, size: 54, color: '#141218' });
  for (let j = 0; j < 12; j++) { const at = 0.8 + j * 0.15, k = ease.outBack(prog(t, at, at + 0.3)); if (k <= 0) continue; const x = cx + ((j % 6) - 2.5) * 200 * u, y = cy + (Math.floor(j / 6) - 0.5) * 220 * u + 40 * u;
    g.save(); g.translate(x, y); g.scale(k, k); g.fillStyle = '#fbfaf4'; rr(g, -70 * u, -40 * u, 140 * u, 100 * u, 10 * u); g.fill(); g.fillStyle = ['#e8453c', '#3a6ad8', '#3adf6a'][j % 3]; g.beginPath(); g.moveTo(-85 * u, -40 * u); g.lineTo(0, -95 * u); g.lineTo(85 * u, -40 * u); g.fill(); g.restore(); }
  if (t > 2.6) stamp(g, t, '50 TIMES', cx, cy + 360 * u, { at: 2.6, size: 80 }); });
SL('LOOPS 450 + 1,055')('w04', { set: 'park', cast: { me: [ME, -5.95, -1.3, FX, 'sit', 'happy'], leah: [LEAH, -5.95, -2.3, FX, 'sit', 'smile'] },
  b: (st, s) => { holdGuitar(s.F.me, true); holdBook(s.F.leah, true); },
  poses: { me: [[0, sit({ shA: [48, -6], elA: 70, shB: [62, 30], elB: 35 })]], leah: [[0, sit({ shA: [52, 2], elA: 62, shB: [52, 2], elB: 62 })]] },
  cam: { p: [-3.3, 1.35, -0.6], l: [-5.95, 0.95, -1.8], p2: [-3.5, 1.32, -0.9] }, o: (g, t, i, s) => { const [x, y] = scr3(s, [-5.95, 1.5, -1.3]); notes(g, t, x, y, { n: 3 }); },
  caps: [['YOU TEACH HER GUITAR', 0.2, { dur: 1.7 }], ['SHE TEACHES YOU JAPANESE', 1.9]] });
SL('LOOPS 450 + 1,055')('w05', { set: CAFE, b: cafeDress, cast: { me: [ME, 0.2, -3.4, FZ, 'stand', 'calm'], leah: [LEAH, 1.2, -3.4, FZ, 'stand', 'calm'], c1: [CUSTOMERS[0], -1.1, -2.2, 0.7, 'stand', 'neutral'], c2: [CUSTOMERS[1], 2.2, -2.0, 2.29, 'stand', 'neutral'], b: BARI },
  poses: { me: [[0, 'stand'], [3.1, 'cheer']], leah: [[0, 'stand'], [3.1, 'cheer']], c1: [[0, 'stand'], [3.6, 'shocked']], c2: [[0, 'stand'], [3.8, 'facepalm']] },
  exprs: { me: [[0, 'calm'], [3.1, 'joy']], leah: [[0, 'smirk'], [3.1, 'joy']], c1: [[0, 'neutral'], [3.6, 'shocked']], c2: [[0, 'neutral'], [3.8, 'confused']] },
  cam: { p: [0.7, 1.7, 2.3], l: [0.6, 1.3, -2.6], p2: [0.7, 1.65, 1.6] },
  o: (g, t, i, s) => { digital(g, E.W - 210 * U(), 130 * U(), t < 3.0 ? '9:13 AM' : '9:14 AM', 54 * U(), { col: '#ffd23f' }); if (t > 3.0) { for (const x of [0.2, 1.2]) { const [sx, sy] = scr3(s, [x, 1.9, -3.4]); notes(g, t, sx, sy, { n: 5, spd: 1.2 }); } } },
  caps: [['9:13. YOU BOTH COUNT DOWN.', 0.3, { dur: 2.6 }], ['THEN YOU SING IT. LOUDLY. BADLY.', 3.2, { dur: 3.2 }], ['THE WHOLE CAFE STARES', 6.6]] });
CL(roll(1, 600, 0.3, 7.0), 'teal')('w06', 'teal', (g, t, i, u, cx, cy) => { title(g, t, 'HER 600 LOOPS ALONE', cy - 410 * u, { at: 0.1, size: 72 });
  panel2d(g, t, cx - 320 * u, cy + 20 * u, 560 * u, 560 * u, 0.8, 'SHE LEARNED TO JUGGLE', (g, x, y) => { const u0 = U(); leah2d(g, x, y + 80 * u0, 60 * u0); for (let k = 0; k < 3; k++) { const a = t * 4 + k * 2.1; circle(g, x + Math.cos(a) * 110 * u0, y - 60 * u0 + Math.sin(a) * 60 * u0, 22 * u0, ['#e8453c', '#3a6ad8', '#3adf6a'][k]); } }, { bg: '#ffe8c8' });
  panel2d(g, t, cx + 320 * u, cy + 20 * u, 560 * u, 560 * u, 3.4, 'A DEER FRIEND IN THE WOODS', (g, x, y) => { const u0 = U(); g.fillStyle = '#b8783a'; g.beginPath(); g.ellipse(x + 40 * u0, y + 20 * u0, 110 * u0, 55 * u0, 0, 0, 7); g.fill(); for (const lx of [-30, 0, 80, 110]) g.fillRect(x + lx * u0, y + 50 * u0, 14 * u0, 90 * u0);
    circle(g, x - 70 * u0, y - 50 * u0, 40 * u0, '#b8783a'); g.strokeStyle = '#6a4024'; g.lineWidth = 8 * u0; g.beginPath(); g.moveTo(x - 80 * u0, y - 85 * u0); g.lineTo(x - 100 * u0, y - 140 * u0); g.moveTo(x - 60 * u0, y - 85 * u0); g.lineTo(x - 40 * u0, y - 140 * u0); g.stroke(); circle(g, x - 85 * u0, y - 55 * u0, 6 * u0, '#141218'); heart(g, x + 40 * u0, y - 110 * u0, 26 * u0); }, { bg: '#d8f0d0' }); });
CL(roll(600, 700, 0.5, 3.8), 'dark')('w07', 'dark', (g, t, i, u, cx, cy) => { g.fillStyle = '#3a4a7a'; rr(g, cx - 380 * u, cy + 20 * u, 760 * u, 160 * u, 20 * u); g.fill(); g.fillStyle = '#fbfaf4'; rr(g, cx - 360 * u, cy - 20 * u, 200 * u, 80 * u, 30 * u); g.fill();
  leah2d(g, cx - 240 * u, cy - 40 * u, 60 * u, { expr: 'flat' }); g.fillStyle = '#c8506a'; rr(g, cx - 160 * u, cy - 10 * u, 520 * u, 110 * u, 40 * u); g.fill();
  for (let k = 0; k < 3; k++) { const q = (t * 0.6 + k / 3) % 1; text(g, 'Z', cx - 180 * u + q * 120 * u, cy - 140 * u - q * 180 * u, { size: (40 + q * 50) * u, font: FONTS.title, weight: 900, color: alpha('#9fd6ff', 1 - q) }); }
  title(g, t, '100 LOOPS IN A ROW, SHE JUST SLEPT', cy - 400 * u, { at: 0.1, size: 62 }); title(g, t, 'TOO SAD TO GET UP', cy + 330 * u, { at: 1.6, size: 60, color: '#9fd6ff' }); });
SL('LOOPS 470 + 1,075')('w08', { set: ROOF, mood: 'night', cast: RB, exprs: { leah: [[0, 'sad'], [0.4, 'talk'], [3.4, 'sad']] }, poses: { leah: [[0, sit({ head: [0, 14] })]], me: [[0, sit({ head: [0, 4] })]] }, cam: ROOFCAM,
  o: (g, t, i, s) => bubble(g, t, s, 'leah', '600 DAYS OF THE SAME TUESDAY.', 0.4, { hy: 1.75 }), caps: [['YOU HAVE NO IDEA WHAT THAT DOES TO YOU', 3.4, { size: 56 }]] });
SL('LOOPS 480 + 1,085')('w09', { set: PARTY, cast: PAIR, exprs: { sam: [[0, 'confused'], [3.4, 'talk'], [7.0, 'shocked']], me: [[0, 'happy'], [5.0, 'smile']], leah: [[0, 'happy'], [5.0, 'smirk']] },
  poses: { sam: [[0, 'stand'], [3.4, 'shrug']] }, cams: [[0, { p: [0.5, 1.6, 4.7], l: [0.9, 1.3, 0.4], p2: [0.6, 1.58, 4.3] }], [5.6, { p: [3.6, 1.55, 2.4], l: [2.3, 1.45, 0.9] }]],
  o: (g, t, i, s) => bubble(g, t, s, 'sam', 'SINCE WHEN ARE YOU TWO A THING?', 3.4, { off: 9.0, dx: -0.9 }), caps: [['SAM HAS NO IDEA WHAT\'S GOING ON', 0.3, { dur: 2.9 }]] });
SL('LOOPS 480 + 1,085')('w10', { set: PARTY, cast: PAIR, exprs: { sam: [[0, 'talk'], [1.2, 'confused']], leah: [[0, 'smirk'], [1.3, 'talk'], [2.3, 'smile']] }, cam: { p: [0.5, 1.6, 4.7], l: [0.9, 1.3, 0.4] },
  o: (g, t, i, s) => { bubble(g, t, s, 'sam', 'IT\'S BEEN ONE DAY.', 0.0, { off: 1.3 }); bubble(g, t, s, 'leah', 'SURE, SAM.', 1.3); } });
SL('LOOPS 490 + 1,095')('w11', { set: ROOF, mood: 'night', cast: RB, poses: { leah: [[0, sit({ head: [0, 6], shA: [30, 8], elA: 70, shB: [30, 8], elB: 70 })]], me: [[0, sit({ head: [0, 4] })]] },
  exprs: { leah: [[0, 'calm'], [0.4, 'talk'], [9.6, 'sad']], me: [[0, 'calm']] }, cam: { p: [-0.9, 1.25, -1.0], l: [-0.4, 1.05, -2.85], p2: [-0.8, 1.22, -1.3] },
  caps: [['"THE FIRST LOOP..."', 0.4, { dur: 2.6 }], ['"I WAS SUPPOSED TO TELL SOMEONE SOMETHING."', 3.2, { dur: 4.0, size: 58 }], ['"SOMETHING IMPORTANT."', 7.4]] });
SL('LOOPS 490 + 1,095')('w12', { set: ROOF, mood: 'night', cast: { ...RB, leah: [LEAH, -0.45, -2.85, FZ + 0.6, 'sit', 'sad'] }, exprs: { me: [[0, 'talk'], [0.8, 'confused']] }, cam: ROOFCAM,
  o: (g, t, i, s) => bubble(g, t, s, 'me', 'TELL WHO?', 0.1, { hy: 1.75 }) });
SL('LOOPS 499 + 1,104')('w13', { set: [PARTY, { time: '11:58' }], cast: { me: [ME, -0.6, 0.9, -0.9, 'stand', 'sad'], leah: [LEAHCOAT, 1.2, 0.4, FNZ, 'stand', 'sad'], g1: [GUESTS[0], -1.5, -1.7, FZ + 0.5, 'stand', 'happy'] },
  walk: { leah: { path: [[1.2, 0.4], [3.0, -1.6], [3.0, -3.9]], t0: 2.4, t1: 7.4, spd: 5.2 } }, u: (s, t) => { s.F.leah.visible = s.F.leah.position.z > -2.7; },
  cam: { p: [-1.6, 1.6, 4.0], l: [1.4, 1.35, -1.4] }, caps: [['EVERY NIGHT, AT 11:58...', 0.4, { dur: 3.6 }], ['SHE LEAVES THE PARTY', 4.4, { dur: 3.0 }], ['ALWAYS AT 11:58', 7.8]] });
