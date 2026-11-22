// shots/02_plan.js — 2:09-5:01: Loops 11-50 (the plan, the speech, the personalities, fate), then Loops 51-400 (skills, good deeds, the bench).
import { E, THREE } from './_lib.js';
import { FZ, FNZ, FX, FNX, ME, LEAH, SAM, BIKER, PHONEWOMAN, GUESTS, CUSTOMERS, BARISTA, SL, CL, roll, bubble, notes, digital, loopRing, calendar, cup2d, bench2d, panel2d, guitar2d, mushroom, book2d, leah2d,
  face2d, scr3, burst, title, stamp, cross, check, heart, person, text, FONTS, alpha, rr, glow, circle, ring, U, ease, prog, clamp, lerp } from './_loop.js';
import { speech, waterGlass, guitar, sunglasses, bike, boombox, clockFace, holdGuitar } from '../toon/sets_loop.js';
import { phone } from '../toon/sets_campus.js';
import { picture } from '../toon/sets3d.js';

const sit = (o = {}) => ({ hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [38, 4], shB: [38, 4], elA: 58, elB: 58, ...o });
const PARTY = 'party', PARK = 'park', SUNSET = ['park', { sunset: true }], CAFE = ['diningHall', { cafe: true }];
const cafeDress = (st) => { st.add(boombox(2.5, 1.06, -4.85, 0)); st.add(picture(0.7, 0.3, clockFace('9:14', 'AM'), -2.5, 2.5, -5.97)); };
// the party: you and Leah in the middle of the room, guests around
const GUEST = { g1: [GUESTS[0], -1.5, -1.7, FZ + 0.5, 'stand', 'happy'], g2: [GUESTS[1], 3.3, -1.7, FZ - 0.4, 'stand', 'smile'], g3: [GUESTS[2], -3.0, -3.05, FZ, 'sit', 'happy'] };
const DUO = { me: [ME, 0.1, 0.5, 0.35, 'stand', 'neutral'], leah: [LEAH, 1.25, 0.1, FNX + 0.35, 'stand', 'smile'] };
const DUOCAM = { p: [0.7, 1.55, 3.7], l: [0.7, 1.3, 0.2], p2: [0.7, 1.52, 3.4] };
// the bench in the quad (x 4, length along z): sitters face +x
const LB = [4.05, -2.3], KB = [4.05, -1.25];
const BENCHCAM = { p: [7.2, 1.35, -0.6], l: [4.1, 0.95, -1.8], p2: [6.9, 1.3, -0.9] };

// ---------- loops 11-50: the plan ----------
SL(11)('p01', { set: ['dorm', { board: true }], cast: { me: [ME, -2.4, -0.7, FNX + 0.4, 'point', 'determined'] }, poses: { me: [[0, 'think'], [1.4, 'point']] },
  cam: { p: [-0.3, 1.6, 2.7], l: [-3.0, 1.4, 0.4], p2: [-0.5, 1.58, 2.4] }, caps: [['LOOP 11: GET ORGANIZED', 0.3]] });
CL(11, 'blue')('p02', 'blue', (g, t, i, u, cx, cy) => { title(g, t, 'THE RULES', cy - 400 * u, { at: 0.1, size: 90, color: '#6fe6ff' });
  ['THE DAY RESETS AT 7:00 AM', 'ONLY YOUR MEMORY CARRIES OVER', 'UNLIMITED PRACTICE'].forEach((s, k) => { const at = 0.8 + k * 1.3, y = cy - 140 * u + k * 170 * u; if (t < at) return;
    check(g, t, cx - 520 * u, y, 46 * u, at); title(g, t, s, y, { at, size: 66, x: cx + 60 * u }); }); });
CL(roll(11, 12, 4.4, 5.2), 'teal')('p03', 'teal', (g, t, i, u, cx, cy) => { title(g, t, 'EVERYTHING LEAH LIKES', cy - 410 * u, { at: 0.1, size: 72 }); leah2d(g, cx - 640 * u, cy + 20 * u, 120 * u);
  panel2d(g, t, cx - 160 * u, cy + 30 * u, 380 * u, 440 * u, 0.9, 'HER FAVORITE BAND', (g, x, y) => guitar2d(g, x, y, 110 * U()), { bg: '#ffe8c8' });
  panel2d(g, t, cx + 260 * u, cy + 30 * u, 380 * u, 440 * u, 2.4, 'HER FAVORITE BOOK', (g, x, y) => book2d(g, x, y, 90 * U(), '#c8506a', 'BOOK'), { bg: '#e8e0ff' });
  panel2d(g, t, cx + 680 * u, cy + 30 * u, 380 * u, 440 * u, 4.4, 'HATES MUSHROOMS', (g, x, y) => mushroom(g, x, y, 100 * U()), { bg: '#ffd8d0', x: true });
  if (t > 5.4) stamp(g, t, 'LEARNED ON LOOP 12', cx + 680 * u, cy - 260 * u, { at: 5.4, size: 44 }); });
SL(19)('p04', { set: 'dorm', cast: { me: [ME, 2.3, -1.85, FNZ, 'sitDesk', 'determined'] }, cam: { p: [0.9, 1.45, -0.4], l: [2.3, 1.0, -2.3] },
  o: (g, t) => panel2d(g, t, E.W * 0.28, E.H * 0.46, 520 * U(), 520 * U(), 0.6, 'THE PERFECT SPEECH', (g, x, y) => { const u = U(); for (let k = 0; k < 7; k++) { g.fillStyle = '#3a5ad8'; g.fillRect(x - 170 * u, y - 150 * u + k * 46 * u, (k % 3 === 2 ? 220 : 340) * u, 12 * u); } }, { bg: '#fbfaf4' }),
  caps: [['LOOP 19', 0.2, { dur: 1.2 }], ['YOU WRITE THE PERFECT SPEECH', 1.5]] });
SL(19)('p05', { set: PARTY, cast: { ...DUO, ...GUEST }, carry: [{ prop: () => speech(), by: 'me', both: false, arms: { shA: [55, 10], elA: 60, shB: [8, 6], elB: 12 } }],
  exprs: { me: [[0, 'talk']], leah: [[0, 'smile'], [3.0, 'calm']] }, cam: DUOCAM, caps: [['YOU RECITE IT. WORD FOR WORD.', 0.3, { dur: 2.6 }], ['SHE SMILES. POLITELY.', 3.0]] });
SL(19)('p06', { set: PARTY, cast: { ...DUO, g2: GUEST.g2 }, exprs: { leah: [[0, 'confused'], [0.4, 'talk'], [1.8, 'confused']] }, poses: { leah: [[0, 'stand'], [0.4, 'explain']] },
  cam: { p: [2.7, 1.55, 2.3], l: [1.25, 1.45, 0.1] }, caps: [['"DID YOU... MEMORIZE THAT?"', 0.4]] });
SL(20)('p07', { set: 'dorm', cast: { me: [ME, -0.2, -0.6, FZ, 'facepalm', 'sad'] }, cam: { f: 'me', d: 2.7, h: 1.4, side: 0.3, lh: 1.25, push: 0.1 },
  caps: [['IT SOUNDS REHEARSED.', 0.2, { dur: 1.4 }], ['BECAUSE IT IS.', 1.6, { size: 100 }]] });
CL(roll(21, 26, 0.5, 5.0), 'dark')('p08', 'dark', (g, t, i, u, cx, cy) => { title(g, t, 'NEW PLAN: BE SOMEONE ELSE', cy - 410 * u, { at: 0.1, size: 66 });
  [['FUNNY', '#ffd23f', 'smile'], ['MYSTERIOUS', '#8a6aff', 'flat'], ['CASUAL', '#6fe6a0', 'smile']].forEach(([lab, col, ex], k) => { const at = 0.7 + k * 1.1, x = cx + (k - 1) * 520 * u, y = cy - 40 * u, a = ease.outBack(prog(t, at, at + 0.35)); if (a <= 0) return;
    g.save(); g.translate(x, y); g.scale(a, a); g.fillStyle = col; g.beginPath(); g.ellipse(0, 0, 150 * u, 180 * u, 0, 0, 7); g.fill(); face2d(g, 0, 0, 130 * u, { cap: false, mole: false, expr: ex }); g.restore(); text(g, lab, x, y + 240 * u, { size: 50 * u, font: FONTS.ui, weight: 900, color: col }); });
  if (t > 5.2) { const k = ease.outBack(prog(t, 5.2, 5.6)); title(g, t, '50 VERSIONS OF YOU', cy + 330 * u, { at: 5.2, size: 64 }); for (let n = 0; n < 5; n++) leah2d(g, cx + (n - 2) * 180 * u, cy + 440 * u, 44 * u * k, { expr: 'flat' }); } });
SL(27)('p09', { set: PARTY, cast: { ...DUO, ...GUEST }, b: (st, s) => sunglasses(s.F.me), carry: [{ prop: () => waterGlass(), by: 'leah', both: false, arms: { shA: [70, 12], elA: 30, shB: [6, 6], elB: 10 } }],
  poses: { me: [[0, 'crossArms']] }, exprs: { me: [[0, 'smirk']], leah: [[0, 'confused'], [5.0, 'worried']] }, cam: DUOCAM,
  caps: [['LOOP 27: MYSTERIOUS', 0.2, { dur: 2.0 }], ['SUNGLASSES. INDOORS. AT NIGHT.', 2.4, { dur: 2.5 }], ['SHE ASKS IF YOU NEED A GLASS OF WATER', 5.1]] });
SL(33)('p10', { set: PARTY, cast: { me: [ME, 0.1, 0.5, FZ + 0.45, 'stand', 'joy'], leah: [LEAH, 1.25, 0.1, FNX + 0.35, 'stand', 'worried'], g1: GUEST.g1, g2: GUEST.g2 },
  b: (st, s) => holdGuitar(s.F.me), poses: { me: [[0, { shA: [48, -6], elA: 70, shB: [62, 30], elB: 35 }]] }, exprs: { g1: [[0, 'confused']], g2: [[0, 'scared']], leah: [[0, 'worried'], [4.0, 'sad']] },
  cam: DUOCAM, o: (g, t, i, s) => { const f = s.F.me, [x, y] = scr3(s, [f.position.x, 1.5, f.position.z]); notes(g, t, x, y, { n: 4, spd: 0.4 }); digital(g, E.W - 220 * U(), 130 * U(), `${Math.min(4, Math.floor(t / 1.9))}:${String(Math.floor((t * 31) % 60)).padStart(2, '0')}`, 54 * U(), { col: '#ffd23f' }); },
  caps: [['LOOP 33: MUSICAL', 0.2, { dur: 1.8 }], ['ONE CHORD.', 2.1, { dur: 1.9 }], ['VERY CONFIDENTLY. FOR FOUR MINUTES.', 4.1]] });
CL(41, 'gold')('p11', 'gold', (g, t, i, u, cx, cy) => { title(g, t, 'LOOP 41: LET FATE DO IT', cy - 410 * u, { at: 0.1, size: 68 });
  const w = 1100 * u, h = 560 * u, x0 = cx - w / 2, y0 = cy - h / 2 + 30 * u; g.fillStyle = '#d8ecc8'; rr(g, x0, y0, w, h, 20 * u); g.fill(); g.strokeStyle = '#fbfaf4'; g.lineWidth = 26 * u;
  g.beginPath(); g.moveTo(x0, y0 + h * 0.5); g.lineTo(x0 + w, y0 + h * 0.5); g.moveTo(x0 + w * 0.3, y0); g.lineTo(x0 + w * 0.3, y0 + h); g.moveTo(x0 + w * 0.72, y0); g.lineTo(x0 + w * 0.72, y0 + h); g.stroke();
  [[0.3, 0.2], [0.55, 0.5], [0.72, 0.82], [0.12, 0.5], [0.88, 0.5]].forEach(([a, b], k) => { const at = 0.8 + k * 0.85, s = ease.outBack(prog(t, at, at + 0.3)); if (s <= 0) return; g.save(); g.translate(x0 + w * a, y0 + h * b); g.scale(s, s); heart(g, 0, 0, 34 * u, '#e8453c'); g.restore(); });
  const n = Math.min(5, Math.floor(prog(t, 0.8, 5.05) * 5 + (t > 0.8 ? 1 : 0))); if (n) text(g, `BUMP-INS TODAY: ${n}`, cx, cy + 380 * u, { size: 56 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); });
SL(41)('p12', { set: PARK, cast: { leah: [LEAH, -0.4, 0.15, 0.3, 'stand', 'worried'], me: [ME, 1.0, 0.6, FNX + 0.3, 'stand', 'smile'] }, poses: { me: [[0, 'stand'], [3.2, 'shrug']] },
  exprs: { leah: [[0, 'worried'], [1.0, 'talk'], [2.6, 'worried'], [5.0, 'confused']], me: [[0, 'smile'], [3.2, 'talk'], [4.6, 'smirk']] }, cam: { p: [0.3, 1.55, 4.2], l: [0.3, 1.3, 0.3] },
  o: (g, t, i, s) => { bubble(g, t, s, 'leah', 'ARE YOU... FOLLOWING ME?', 0.6, { off: 3.1 }); bubble(g, t, s, 'me', 'NO. THE UNIVERSE IS.', 3.2); } });
CL(42, 'red')('p13', 'red', (g, t, i, u, cx, cy) => { title(g, t, 'LOOP 42', cy - 300 * u, { at: 0.05, size: 90 }); stamp(g, t, 'NEVER SAY THAT AGAIN', cx, cy + 40 * u, { at: 0.35, size: 90 }); });
SL(50)('p14', { set: SUNSET, mood: 'dusk', cast: { leah: [LEAH, LB[0], LB[1], FX, 'sit', 'sad'], me: [ME, 0.6, 1.1, FX + 0.3, 'stand', 'thinking'] }, poses: { leah: [[0, sit({ head: [0, 16], spine: [10, 0] })]] },
  cam: { p: [7.6, 1.6, 2.8], l: [3.0, 1.0, -0.6], p2: [7.3, 1.55, 2.4] }, caps: [['LOOP 50', 0.3, { dur: 2.4 }], ['SUNSET. LEAH, ALONE ON A BENCH', 3.0, { dur: 3.6 }], ['JUST STARING AT THE SKY', 6.8]] });
SL(50)('p15', { set: SUNSET, mood: 'dusk', cast: { leah: [LEAH, LB[0], LB[1], FX, 'sit', 'sad'] }, poses: { leah: [[0, sit({ head: [0, 12], spine: [14, 0], shA: [42, 4], elA: 66, shB: [42, 4], elB: 66 })]] },
  exprs: { leah: [[0, 'sad'], [2.0, 'sleepy']] }, cam: { p: [6.0, 1.25, -1.0], l: [4.1, 1.05, -2.2], p2: [5.8, 1.22, -1.3] }, caps: [['SHE LOOKS... TIRED.', 0.8]] });
CL(50, 'gold')('p16', 'gold', (g, t, i, u, cx, cy) => { const k = ease.out(prog(t, 0.3, 1.2)); glow(g, cx, cy + 40 * u, 420 * u * (0.6 + 0.4 * k), '#ffd84a', 0.55 * k); bench2d(g, cx, cy + 120 * u, 520 * u);
  title(g, t, 'REMEMBER THIS BENCH', cy - 380 * u, { at: 0.2, size: 74 }); title(g, t, 'IT\'S THE MOST IMPORTANT PLACE IN THIS STORY', cy + 330 * u, { at: 1.6, size: 54, color: '#ffd84a' }); });

// ---------- loops 51-400: the long middle ----------
SL(51)('b01', { set: PARK, cast: { me: [ME, -6.05, -1.8, FX, 'sit', 'calm'], w1: [CUSTOMERS[0], -10, -4.2, FX, 'stand', 'happy'], w2: [CUSTOMERS[1], -3.5, -4.8, FNX, 'stand', 'calm'] }, poses: { me: [[0, sit({ spine: [-6, 0] })]] },
  walk: { w1: [-10, -4.2, -2.5, -4.2, 0, 4.5, 5.2], w2: [-3.5, -4.8, -9.5, -4.8, 0.5, 4.5, 5.2] },
  cam: { p: [-3.4, 1.35, 1.0], l: [-6.0, 0.95, -2.2], p2: [-3.6, 1.32, 0.7] }, caps: [['LOOP 51: YOU STOP TRYING', 0.2, { dur: 2.2 }], ['YOU JUST WATCH THE DAY HAPPEN', 2.5]] });
CL(roll(52, 140, 0.3, 9.5), 'teal')('b02', 'teal', (g, t, i, u, cx, cy) => { title(g, t, 'UNLIMITED TUESDAYS', cy - 410 * u, { at: 0.1, size: 76 });
  panel2d(g, t, cx - 600 * u, cy + 20 * u, 540 * u, 540 * u, 1.0, 'YOU LEARN GUITAR', (g, x, y) => guitar2d(g, x, y, 130 * U()), { bg: '#ffe8c8' });
  panel2d(g, t, cx, cy + 20 * u, 540 * u, 540 * u, 3.6, 'COOKING (NOT JUST TOAST)', (g, x, y) => { const u0 = U(); g.fillStyle = '#2a2a33'; g.beginPath(); g.ellipse(x, y + 30 * u0, 150 * u0, 50 * u0, 0, 0, 7); g.fill(); g.fillRect(x + 140 * u0, y + 20 * u0, 140 * u0, 22 * u0);
    circle(g, x - 30 * u0, y + 20 * u0, 40 * u0, '#fbfaf4'); circle(g, x - 30 * u0, y + 20 * u0, 18 * u0, '#ffc23a'); for (let k = 0; k < 3; k++) { g.strokeStyle = alpha('#ffffff', 0.7); g.lineWidth = 8 * u0; g.beginPath(); g.moveTo(x - 60 * u0 + k * 50 * u0, y - 50 * u0); g.quadraticCurveTo(x - 30 * u0 + k * 50 * u0, y - 110 * u0, x - 60 * u0 + k * 50 * u0, y - 160 * u0); g.stroke(); } }, { bg: '#d8f0e0' });
  panel2d(g, t, cx + 600 * u, cy + 20 * u, 540 * u, 540 * u, 6.2, 'JAPANESE, FROM A LIBRARY BOOK', (g, x, y) => book2d(g, x, y, 100 * U(), '#3a6ad8', 'JAPANESE'), { bg: '#e0e8ff' }); });
CL(140, 'blue')('b03', 'blue', (g, t, i, u, cx, cy) => { title(g, t, 'HOW LONG DOES JAPANESE TAKE?', cy - 410 * u, { at: 0.1, size: 64 });
  title(g, t, 'U.S. FOREIGN SERVICE INSTITUTE ESTIMATE', cy - 300 * u, { at: 0.8, size: 40, color: '#9fd6ff' });
  const k1 = ease.inOut(prog(t, 2.0, 5.5)), k2 = ease.inOut(prog(t, 5.5, 9.0)); const bw = 1000 * u;
  if (t > 2.0) { g.fillStyle = alpha('#ffffff', 0.12); rr(g, cx - bw / 2, cy - 120 * u, bw, 90 * u, 20 * u); g.fill(); g.fillStyle = '#6fe6ff'; rr(g, cx - bw / 2, cy - 120 * u, bw * k1, 90 * u, 20 * u); g.fill(); text(g, `ABOUT ${Math.round(88 * k1)} WEEKS`, cx, cy - 75 * u, { size: 52 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); }
  if (t > 5.5) { g.fillStyle = alpha('#ffffff', 0.12); rr(g, cx - bw / 2, cy + 60 * u, bw, 90 * u, 20 * u); g.fill(); g.fillStyle = '#ffd23f'; rr(g, cx - bw / 2, cy + 60 * u, bw * k2, 90 * u, 20 * u); g.fill(); text(g, `AROUND ${Math.round(2200 * k2).toLocaleString('en-US')} CLASS HOURS`, cx, cy + 105 * u, { size: 52 * u, font: FONTS.ui, weight: 900, color: '#141218' }); }
  title(g, t, 'FOR A FULL-TIME STUDENT', cy + 300 * u, { at: 9.4, size: 56 }); });
CL(roll(140, 220, 0, 2.8), 'gold')('b04', 'gold', (g, t, i, u, cx, cy) => { const n = Math.floor(t * 6); g.save(); g.translate(cx, cy); g.rotate(((n % 2) - 0.5) * 0.06); calendar(g, 0, 0, 360 * u, 'TUESDAY', 14); g.restore();
  title(g, t, 'IN A TIME LOOP, YOU HAVE A LOT OF TUESDAYS', cy - 400 * u, { at: 0.1, size: 58 }); });
SL(220)('b05', { set: PARK, cast: { biker: [BIKER, -1.3, 0.9, FZ + 0.6, 'stand', 'angry'], woman: [PHONEWOMAN, 1.6, 0.3, FX, 'stand', 'calm'] },
  b: (st, s) => { st.add(bike(-0.2, 0.55, 0.15)); s.ph = phone(); s.ph.rotation.x = -Math.PI / 2; s.ph.position.set(2.5, 0.02, 0.85); st.add(s.ph); },
  walk: { woman: [1.6, 0.3, 6.5, 0.3, 3.4, 6.6, 5.2] }, poses: { biker: [[0, 'facepalm'], [1.6, 'shrug']] }, u: (s, t) => { s.ph.visible = t > 3.9; },
  cam: { p: [0.9, 1.6, 5.2], l: [0.9, 1.0, 0.4] }, o: (g, t) => digital(g, E.W - 220 * U(), 130 * U(), t < 3.3 ? '11:02 AM' : '3:40 PM', 54 * U(), { col: '#ffd23f' }),
  caps: [['11:02: A BIKE CHAIN SNAPS', 0.3, { dur: 2.9 }], ['3:40: SHE DROPS HER PHONE', 3.5]] });
SL(roll(220, 290, 0, 3.4))('b06', { set: PARK, cast: { me: [ME, -0.95, 1.4, 0.83, 'stand', 'determined'], biker: [BIKER, -1.9, 0.4, 0.2, 'stand', 'happy'] }, b: (st) => st.add(bike(-0.2, 0.55, 0.15)),
  poses: { me: [[0, { hipA: 60, hipB: 60, knA: 100, knB: 100, drop: 0.22, spine: [30, 0], shA: [70, 10], elA: 20, shB: [70, 10], elB: 20 }]], biker: [[0, 'stand'], [1.4, 'cheer']] }, cam: { p: [0.6, 1.5, 4.0], l: [-0.8, 0.9, 0.6] }, caps: [['YOU FIX IT. YOU RETURN IT.', 0.2, { dur: 1.8 }], ['EVERY. SINGLE. LOOP.', 2.0]] });
SL(300)('b07', { set: SUNSET, mood: 'dusk', cast: { leah: [LEAH, LB[0], LB[1], FX, 'sit', 'sad'], me: [ME, KB[0], KB[1], FX, 'sit', 'calm'] }, poses: { leah: [[0, sit({ head: [0, 14] })]], me: [[0, sit({ head: [0, 8] })]] },
  cam: { p: [7.8, 1.5, 1.6], l: [4.1, 0.95, -1.8], p2: [7.4, 1.45, 1.2] }, caps: [['LOOP 300. SUNSET.', 0.3, { dur: 3.0 }], ['YOU SIT AT THE OTHER END OF HER BENCH', 3.5]] });
SL(300)('b08', { set: SUNSET, mood: 'dusk', cast: { leah: [LEAH, LB[0], LB[1], FX + 0.25, 'sit', 'sad'], me: [ME, KB[0], KB[1], FX - 0.25, 'sit', 'calm'] }, exprs: { me: [[0, 'calm'], [0.6, 'talk'], [1.8, 'calm']], leah: [[0, 'sad'], [2.4, 'talk'], [3.8, 'smile']] },
  cam: BENCHCAM, o: (g, t, i, s) => { bubble(g, t, s, 'me', 'LONG DAY, HUH?', 0.5, { hy: 1.75, off: 2.3 }); bubble(g, t, s, 'leah', 'YOU HAVE NO IDEA.', 2.4, { hy: 1.75, off: 5.0 }); },
  caps: [['THE MOST REAL THING ANYONE HAS SAID IN 300 LOOPS', 5.1, { size: 54 }]] });
CL(roll(301, 380, 0.4, 6.2), 'dark')('b09', 'dark', (g, t, i, u, cx, cy) => { const k = (t / 1.3) % 1, day = Math.sin(k * Math.PI); const sky = g.createLinearGradient(0, cy - 300 * u, 0, cy + 200 * u);
  sky.addColorStop(0, `rgb(${40 + 200 * day | 0},${50 + 110 * day | 0},${90 + 60 * day | 0})`); sky.addColorStop(1, `rgb(${255 * (0.4 + 0.6 * day) | 0},${140 * day + 60 | 0},${80 * day + 60 | 0})`); g.fillStyle = sky; rr(g, cx - 600 * u, cy - 300 * u, 1200 * u, 560 * u, 30 * u); g.fill();
  circle(g, cx - 400 * u + k * 800 * u, cy + 180 * u - day * 360 * u, 50 * u, '#ffd23f'); g.fillStyle = '#2a4a2a'; g.fillRect(cx - 600 * u, cy + 180 * u, 1200 * u, 80 * u); bench2d(g, cx, cy + 190 * u, 300 * u, '#141218');
  person(g, cx - 70 * u, cy + 170 * u, 170 * u, '#141218'); person(g, cx + 70 * u, cy + 170 * u, 170 * u, '#141218');
  title(g, t, 'THE SAME BENCH. EVERY DAY.', cy - 410 * u, { at: 0.1, size: 66 }); title(g, t, 'YOU TALK FOR HOURS', cy + 360 * u, { at: 2.4, size: 60, color: '#ffd84a' }); });
SL(380)('b10', { set: SUNSET, mood: 'dusk', cast: { leah: [LEAH, LB[0], LB[1], FX + 0.3, 'sit', 'smile'], me: [ME, KB[0], KB[1], FX - 0.3, 'sit', 'talk'] }, exprs: { leah: [[0, 'smile'], [2.6, 'happy']], me: [[0, 'talk'], [1.6, 'smile']] },
  poses: { leah: [[0, 'sit'], [2.6, sit({ head: [0, 10], shA: [40, 20], elA: 100 })]] }, cam: { p: [6.4, 1.3, -0.3], l: [4.1, 1.0, -1.85], p2: [6.2, 1.28, -0.5] },
  caps: [['SHE NEVER MENTIONS YESTERDAY', 0.3, { dur: 3.1 }], ['BUT EACH DAY, SHE SEEMS LESS TIRED', 3.6]] });
SL(400)('b11', { set: CAFE, b: cafeDress, cast: { me: [ME, 0.6, -3.75, FNZ + 0.95, 'stand', 'happy'], b: [BARISTA, 1.0, -5.75, FZ, 'stand', 'calm'] }, exprs: { me: [[0, 'happy'], [1.0, 'joy']] },
  cam: { p: [2.6, 1.6, -1.8], l: [0.8, 1.35, -4.0] }, o: (g, t, i, s) => { const f = s.F.me, [x, y] = scr3(s, [f.position.x, 1.75, f.position.z]); notes(g, t, x, y, { n: 4, col: '#ffffff' }); digital(g, E.W - 210 * U(), 130 * U(), '9:14 AM', 54 * U(), { col: '#ffd23f' }); },
  caps: [['LOOP 400: YOU\'RE HUMMING THE SONG', 0.3, { dur: 2.7 }], ['YOU KNOW EVERY WORD BY NOW', 3.1]] });
CL(400, 'red')('b12', 'red', (g, t, i, u, cx, cy) => { const k = ease.outBack(prog(t, 0.2, 0.6)); if (k > 0) { g.save(); g.translate(cx, cy - 20 * u); g.scale(k, k); g.fillStyle = '#ffffff'; circle(g, -60 * u, 120 * u, 70 * u, '#ffffff'); g.fillRect(0, -170 * u, 22 * u, 300 * u);
    g.beginPath(); g.moveTo(22 * u, -170 * u); g.quadraticCurveTo(140 * u, -120 * u, 120 * u, -20 * u); g.quadraticCurveTo(110 * u, -90 * u, 22 * u, -100 * u); g.fill(); g.restore(); }
  title(g, t, 'THAT TERRIBLE SONG', cy - 380 * u, { at: 0.1, size: 74 }); title(g, t, 'IS ABOUT TO CHANGE EVERYTHING', cy + 330 * u, { at: 1.4, size: 64, color: '#ffd84a' }); });
