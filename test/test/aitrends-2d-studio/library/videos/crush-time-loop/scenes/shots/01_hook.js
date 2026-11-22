// shots/01_hook.js — 0:00-2:09: the hook (Loop 1-2), then Loops 2-10: Sam, the cafe song, the coffee order, the frisbee, proof, Sam's free loops, the bus escape.
import { E } from './_lib.js';
import { FZ, FNZ, FX, FNX, ME, LEAH, SAM, BARISTA, CUSTOMERS, SL, CL, roll, bubble, notes, clock2d, digital, loopRing, calendar, cup2d, usMap, panel2d, leah2d, face2d, pigeon2d,
  scr3, burst, title, stamp, cross, check, person, text, FONTS, alpha, rr, glow, circle, ring, U, ease, prog, clamp, lerp } from './_loop.js';
import { coffee, bowl, frisbee, cerealStain, boombox } from '../toon/sets_loop.js';
import { picture } from '../toon/sets3d.js';
import { clockFace } from '../toon/sets_loop.js';

const DORM = 'dorm', PARK = 'park', CAFE = ['diningHall', { cafe: true }];
const BED = [-2.0, -1.95], CHAIR = [2.3, -1.85];
const sit = (o = {}) => ({ hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [38, 4], shB: [38, 4], elA: 58, elB: 58, ...o });
const BOWL = { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [62, 10], elA: 75, shB: [10, 8], elB: 20 };
const SAMSEAT = (expr = 'neutral') => [SAM, CHAIR[0], CHAIR[1], FNX + 0.5, 'sit', expr];
// alarm clock overlay (top right): digital 7:00 AM, ringing
const alarm = (g, t, on = 1) => { const u = U(), x = E.W - 230 * u, y = 120 * u, sh = on * Math.sin(t * 40) * 6 * u; digital(g, x + sh, y, '7:00 AM', 64 * u); if (on) { burst(g, t % 0.5, x, y, 150 * u, 0, '#ffd23f'); } };
// the cafe: barista behind the counter, a radio on the counter, the 9:14 clock on the back wall
const cafeDress = (st, s) => { st.add(boombox(2.5, 1.06, -4.85, 0)); st.add(picture(0.7, 0.3, clockFace('9:14', 'AM'), -2.5, 2.5, -5.97)); };
const BARI = [BARISTA, 1.0, -5.75, FZ, 'stand', 'calm'];

// ---------- hook ----------
const L1 = SL(1), L2 = SL(2);
L1('h01', { set: DORM, cast: { me: [ME, BED[0], BED[1], FZ, 'sit', 'sleepy'] }, exprs: { me: [[0, 'sleepy'], [1.2, 'surprised']] },
  poses: { me: [[0, sit({ spine: [-10, 0], head: [0, 10] })], [1.0, sit({ spine: [8, 0], shA: [20, 30], elA: 40 })]] },
  cam: { p: [-0.7, 1.35, 0.7], l: [-2.0, 1.0, -1.95], p2: [-0.85, 1.3, 0.5] }, o: (g, t) => alarm(g, t), caps: [['7:00 AM', 0.3]] });
CL(1, 'dark')('h02', 'dark', (g, t, i, u, cx, cy) => { const k = ease.inOut(prog(t, 0.9, 2.2)); digital(g, cx, cy - 20 * u, t < 0.6 ? '6:59' : '7:00', 130 * u); loopRing(g, cx, cy - 20 * u, 300 * u, k);
  title(g, t, 'EVERY MORNING AT 7', cy + 360 * u, { at: 0.3, size: 80, color: '#6fe6ff' }); title(g, t, 'THE SAME DAY STARTS AGAIN', cy - 400 * u, { at: 1.4, size: 60 }); });
L1('h03', { set: PARK, cast: { leah: [LEAH, -2.6, 0.2, FX, 'stand', 'calm'], me: [ME, 2.0, 1.3, FNX + 0.45, 'stand', 'awe'] },
  walk: { leah: [-2.6, 0.2, 0.9, 0.2, 0.0, 3.2, 5.2] }, exprs: { me: [[0, 'awe'], [1.6, 'smile']] },
  cam: { p: [0.2, 1.55, 5.2], l: [0.3, 1.3, 0.6], p2: [0.4, 1.55, 4.7] }, caps: [['THAT\'S LEAH', 0.2, { dur: 1.3 }], ['YOU\'VE LIKED HER FOR 3 YEARS', 1.4]] });
CL(1, 'gold')('h04', 'gold', (g, t, i, u, cx, cy) => { calendar(g, cx - 360 * u, cy - 40 * u, 300 * u, 'TUESDAY', 14);
  const k = ease.outBack(prog(t, 2.4, 2.8)); if (k > 0) { g.save(); g.translate(cx + 360 * u, cy - 60 * u); g.scale(k, k); g.fillStyle = '#141218'; g.beginPath(); g.moveTo(-170 * u, -20 * u); g.lineTo(0, -90 * u); g.lineTo(170 * u, -20 * u); g.lineTo(0, 50 * u); g.fill();
    g.fillRect(-90 * u, 0, 180 * u, 90 * u); g.strokeStyle = '#ffd23f'; g.lineWidth = 8 * u; g.beginPath(); g.moveTo(140 * u, -30 * u); g.lineTo(140 * u, 80 * u); g.stroke(); circle(g, 140 * u, 90 * u, 14 * u, '#ffd23f'); g.restore(); }
  title(g, t, 'LAST DAY OF SENIOR YEAR', cy - 380 * u, { at: 0.2, size: 74 }); title(g, t, 'TONIGHT: THE GRADUATION PARTY', cy + 300 * u, { at: 2.6, size: 62, color: '#ffd84a' }); });
CL(1, 'blue')('h05', 'blue', (g, t, i, u, cx, cy) => { usMap(g, cx, cy, 1100 * u, ease.inOut(prog(t, 0.6, 2.8))); leah2d(g, cx - 440 * u, cy - 200 * u, 60 * u);
  title(g, t, 'AFTER TONIGHT, SHE MOVES', cy - 400 * u, { at: 0.2, size: 70 }); title(g, t, 'TO THE OTHER SIDE OF THE COUNTRY', cy + 380 * u, { at: 1.0, size: 58, color: '#6fe6ff' }); });
L1('h06', { set: PARK, cast: { me: [ME, 1.3, 1.0, FNX + 0.6, 'stand', 'determined'], leah: [LEAH, -0.4, -0.5, FX + 0.3, 'stand', 'calm'] },
  poses: { me: [[0, 'stand'], [0.3, { shA: [40, 40], elA: 50, head: [0, 4] }]] }, exprs: { me: [[0, 'determined'], [0.3, 'talk'], [1.3, 'sad']] },
  u: (s, t) => { s.F.leah.visible = t < 1.0; }, cam: { p: [0.9, 1.55, 4.3], l: [0.4, 1.35, 0.1] },
  o: (g, t) => { const u = U(), q = prog(t, 0.5, 1.3); if (q <= 0 || q >= 1) return; const x = lerp(E.W * 1.4, -E.W * 0.6, q); g.fillStyle = '#f2b51e'; rr(g, x - E.W * 0.45, E.H * 0.18, E.W * 0.9, E.H * 0.66, 40 * u); g.fill();
    g.fillStyle = '#9fd0f0'; for (let k = 0; k < 6; k++) rr(g, x - E.W * 0.4 + k * E.W * 0.14, E.H * 0.24, E.W * 0.11, E.H * 0.2, 12 * u), g.fill(); g.fillStyle = '#141418'; for (const wx of [-0.3, 0.3]) circle(g, x + wx * E.W, E.H * 0.84, 80 * u, '#141418');
    text(g, 'CAMPUS EXPRESS', x, E.H * 0.6, { size: 70 * u, font: FONTS.ui, weight: 900, color: '#141418' }); },
  caps: [['YOU WERE GOING TO TELL HER TODAY', 0.0, { dur: 0.5 }], ['YOU DIDN\'T.', 1.3, { size: 110 }]] });
SL(roll(1, 2, 1.4, 1.8))('h07', { set: DORM, cast: { me: [ME, BED[0], BED[1], FZ, 'sit', 'sleepy'] }, exprs: { me: [[0, 'sleepy'], [1.2, 'confused']] },
  poses: { me: [[0, sit({ spine: [-10, 0] })], [1.0, sit({ spine: [6, 0], shA: [30, 20], elA: 90, head: [-10, 0] })]] }, cam: { p: [-0.9, 1.3, 0.6], l: [-2.0, 1.0, -1.95] },
  o: (g, t) => alarm(g, t), caps: [['AND THEN THE DAY STARTS AGAIN', 0.6]] });
CL(2, 'dark')('h08', 'dark', (g, t, i, u, cx, cy) => { title(g, t, 'BY THE END OF THIS VIDEO', cy - 400 * u, { at: 0.1, size: 64 });
  panel2d(g, t, cx - 600 * u, cy + 20 * u, 560 * u, 520 * u, 1.0, 'WHY SHE KNOWS YOUR ORDER', (g, x, y) => { cup2d(g, x, y, 90 * U()); text(g, '?', x + 120 * U(), y - 80 * U(), { size: 110 * U(), font: FONTS.title, weight: 900, color: '#e8453c' }); }, { bg: '#f2e0c8' });
  panel2d(g, t, cx, cy + 20 * u, 560 * u, 520 * u, 3.7, 'WHAT HAPPENS ON...', (g, x, y) => digital(g, x, y, 'LOOP 1,006', 52 * U(), { col: '#6fe6ff' }), { bg: '#1a2238' });
  panel2d(g, t, cx + 600 * u, cy + 20 * u, 560 * u, 520 * u, 6.2, 'WHAT BREAKS THE LOOP', (g, x, y) => { loopRing(g, x, y, 90 * U(), 1, '#6fe6ff'); g.save(); g.strokeStyle = '#ffffff'; g.lineWidth = 16 * U(); g.beginPath(); g.moveTo(x - 30 * U(), y - 120 * U()); g.lineTo(x + 10 * U(), y - 20 * U()); g.lineTo(x - 20 * U(), y + 20 * U()); g.lineTo(x + 30 * U(), y + 120 * U()); g.stroke(); g.restore(); }, { bg: '#1a2238' }); });

// ---------- loops 2-10: panic ----------
L2('l01', { set: DORM, cast: { me: [ME, BED[0], BED[1], FZ, 'sit', 'confused'] }, poses: { me: [[0, sit({ spine: [10, 0], shA: [40, 30], elA: 100, shB: [40, 30], elB: 100 })], [1.4, sit({ spine: [4, 0], head: [-14, 0] })]] },
  exprs: { me: [[0, 'confused'], [1.5, 'thinking']] }, cam: { f: 'me', d: 2.5, h: 1.2, side: 0.4, lh: 0.95, push: 0.1 }, caps: [['IT WAS A DREAM... RIGHT?', 0.4]] });
L2('l02', { set: DORM, cast: { me: [ME, 0.6, -0.9, 0.5, 'stand', 'worried'], sam: SAMSEAT('happy') }, carry: [{ prop: () => bowl(), by: 'sam', both: false, arms: BOWL }],
  exprs: { sam: [[0, 'happy'], [1.5, 'talk']], me: [[0, 'worried'], [1.6, 'shocked']] }, cam: { p: [1.1, 1.55, 2.0], l: [1.45, 1.15, -1.4], p2: [1.15, 1.5, 1.6] },
  caps: [['YOUR ROOMMATE SAM', 0.2, { dur: 1.6 }], ['SAYS THE EXACT SAME THING', 1.8]] });
L2('l03', { set: DORM, cast: { sam: SAMSEAT('happy') }, carry: [{ prop: () => bowl(), by: 'sam', both: false, arms: BOWL }],
  poses: { sam: [[0, BOWL], [2.6, { ...BOWL, shB: [60, 30], elB: 40 }]] }, exprs: { sam: [[0, 'talk'], [3.2, 'smirk']] },
  cam: { f: 'sam', d: 2.4, h: 1.2, side: -0.3, lh: 0.95 },
  o: (g, t, i, s) => { bubble(g, t, s, 'sam', 'LAST DAY.', 0.2, { hy: 1.75, dx: -0.2, off: 1.3 }); bubble(g, t, s, 'sam', 'LAST PARTY.', 1.3, { hy: 1.75, dx: -0.2, off: 2.3 }); bubble(g, t, s, 'sam', 'LAST CHANCE.', 2.3, { hy: 1.75, dx: -0.2, off: 3.3 }); },
  caps: [['"TELL HER, OR I WILL."', 3.3]] });
L2('l04', { set: DORM, cast: { sam: SAMSEAT('happy') }, carry: [{ prop: () => bowl(), by: 'sam', both: false, arms: BOWL }],
  b: (st, s) => { s.stain = cerealStain(s.F.sam, 10); s.stain.visible = false; }, u: (s, t) => { s.stain.visible = t > 1.2; },
  poses: { sam: [[0, BOWL], [1.0, sit({ shA: [70, 10], elA: 40, shB: [10, 8], elB: 20, spine: [6, 0] })], [1.4, BOWL]] }, exprs: { sam: [[0, 'happy'], [1.25, 'shocked'], [2.0, 'sad']] },
  cam: { f: 'sam', d: 2.3, h: 1.2, side: -0.25, lh: 0.9 }, caps: [['SAME HOODIE', 0.1, { dur: 1.3 }], ['SAME CEREAL ON THE SAME HOODIE', 1.4]] });
L2('l05', { set: CAFE, cast: { b: BARI, c1: [CUSTOMERS[0], -2.4, 1.6, FX + 0.3, 'stand', 'calm'] }, b: cafeDress,
  cam: { p: [1.4, 1.55, -1.9], l: [2.2, 1.25, -4.8], p2: [1.6, 1.5, -2.3] },
  o: (g, t, i, s) => { const [x, y] = scr3(s, [2.5, 1.35, -4.85]); notes(g, t, x, y, { n: 6 }); const u = U(); digital(g, E.W - 210 * u, 130 * u, '9:14 AM', 54 * u, { col: '#ffd23f' }); },
  caps: [['THE CAMPUS CAFE, 9:14', 0.3, { dur: 4.3 }], ['REMEMBER THAT SONG.', 4.9]] });
const QUEUE = { leah: [LEAH, 0.6, -3.75, FNZ, 'stand', 'calm'], me: [ME, 0.6, -2.75, FNZ, 'stand', 'neutral'] };
L2('l06', { set: CAFE, cast: QUEUE, b: cafeDress, cam: { p: [3.4, 1.6, -2.2], l: [0.6, 1.35, -3.3], p2: [3.1, 1.58, -2.0] },
  caps: [['LEAH IS IN LINE AHEAD OF YOU', 0.2, { dur: 1.5 }], ['LOOP 1: YOU MISSED WHAT SHE SAID', 1.6, { dur: 2.3 }], ['LOOP 2: YOU DON\'T.', 4.0]] });
L2('l07', { set: CAFE, cast: { ...QUEUE, leah: [LEAH, 0.6, -3.75, FNZ, 'stand', 'calm'] }, b: cafeDress,
  u: (s, t) => { s.F.leah.rotation.y = lerp(FNZ, FZ + 0.35, ease.inOut(prog(t, 0, 0.5))); }, exprs: { leah: [[0, 'calm'], [0.5, 'smile']] },
  cam: { p: [2.1, 1.6, -2.3], l: [0.6, 1.42, -3.6] }, caps: [['"OAT LATTE, EXTRA HOT, NO FOAM. RIGHT?"', 0.3]] });
L2('l08', { set: CAFE, cast: { me: [ME, 0.6, -2.75, FZ + 0.7, 'stand', 'shocked'], b: BARI }, b: cafeDress, exprs: { me: [[0, 'shocked'], [3.0, 'confused']] },
  poses: { me: [[0, { shA: [20, 20], elA: 30, shB: [20, 20], elB: 30 }]] }, cam: { p: [1.9, 1.55, -1.0], l: [0.6, 1.42, -2.75], p2: [1.7, 1.52, -1.3], subj: ['me'] },
  caps: [['YOU HAVEN\'T ORDERED YET', 0.2, { dur: 2.8 }], ['YOU\'VE NEVER TOLD HER YOUR ORDER', 3.1]] });
CL(roll(3, 5, 0.3, 4.6), 'red')('l09', 'red', (g, t, i, u, cx, cy) => { title(g, t, 'LOOPS 3, 4 AND 5 GO BADLY', cy - 400 * u, { at: 0.2, size: 70 });
  panel2d(g, t, cx - 300 * u, cy + 20 * u, 480 * u, 460 * u, 2.8, 'YOU TRIP INTO HER', (g, x, y) => { g.save(); g.translate(x, y + 60 * U()); g.rotate(-0.9); person(g, 0, 60 * U(), 220 * U(), '#2a2a33'); g.restore(); person(g, x + 120 * U(), y + 100 * U(), 220 * U(), '#f2c84a'); }, { bg: '#f8d8d0' });
  panel2d(g, t, cx + 300 * u, cy + 20 * u, 480 * u, 460 * u, 4.0, 'YOU SPILL HER COFFEE', (g, x, y) => { g.save(); g.translate(x, y); g.rotate(1.2); cup2d(g, 0, 0, 80 * U()); g.restore(); g.fillStyle = '#8a5a3a'; g.beginPath(); g.ellipse(x + 60 * U(), y + 110 * U(), 150 * U(), 30 * U(), 0, 0, 7); g.fill(); }, { bg: '#f8d8d0' }); });
SL(5)('l10', { set: PARK, cast: { me: [ME, 0.5, 0.6, FZ + 0.9, 'stand', 'happy'], leah: [LEAH, -2.2, -0.6, FX + 0.4, 'stand', 'calm'] },
  b: (st, s) => { s.fr = frisbee(); st.add(s.fr); }, poses: { me: [[0, 'wave'], [1.15, 'shocked']] }, exprs: { me: [[0, 'happy'], [0.3, 'talk'], [1.15, 'shocked']], leah: [[0, 'calm'], [1.3, 'surprised']] },
  u: (s, t) => { const q = clamp(t / 1.1), f = s.F.me; s.fr.visible = t < 1.25; s.fr.position.set(lerp(6, f.position.x + 0.1, q), lerp(1.8, 1.55, q) + Math.sin(q * Math.PI) * 0.4, lerp(-1, f.position.z, q)); s.fr.rotation.y = t * 20; },
  cam: { p: [1.2, 1.55, 4.0], l: [-0.2, 1.3, 0.0] },
  o: (g, t, i, s) => { bubble(g, t, s, 'me', 'HEY, LEAH—', 0.2, { off: 1.1 }); if (t > 1.1) { const f = s.F.me, [x, y] = scr3(s, [f.position.x, 1.55, f.position.z]); burst(g, t, x, y, 140 * U(), 1.1, '#ffd23f'); } }, caps: [['A FRISBEE. TO THE FACE.', 1.5]] });
SL(5)('l11', { set: DORM, cast: { me: [ME, 0.9, -0.6, 0.73, 'stand', 'worried'], sam: SAMSEAT('neutral') }, carry: [{ prop: () => bowl(), by: 'sam', both: false, arms: BOWL }],
  poses: { me: [[0, { shA: [70, 10], elA: 20, shB: [70, 10], elB: 20, spine: [14, 0] }], [0.4, { shA: [74, 14], elA: 30, shB: [74, 14], elB: 30, spine: [18, 0] }], [0.8, { shA: [70, 10], elA: 20, shB: [70, 10], elB: 20, spine: [14, 0] }], [4.4, 'explain']] },
  exprs: { me: [[0, 'scared'], [4.4, 'talk']], sam: [[0, 'confused']] }, cam: { p: [3.15, 1.5, 1.5], l: [1.5, 1.2, -1.2], p2: [3.0, 1.48, 1.2] },
  caps: [['"I\'M STUCK IN A TIME LOOP."', 2.7, { dur: 2.5 }], ['"YOU\'VE SAID \'TELL HER OR I WILL\' FIVE TIMES."', 5.3, { size: 60 }]] });
SL(5)('l12', { set: DORM, cast: { me: [ME, 0.6, -0.9, 0.5, 'stand', 'determined'], sam: SAMSEAT('smirk') }, carry: [{ prop: () => bowl(), by: [[0, 'sam']], both: false, arms: BOWL }],
  poses: { sam: [[0, BOWL], [3.25, sit({ shA: [80, 30], elA: 30, shB: [80, 30], elB: 30, spine: [-12, 0] })]], me: [[0, 'stand'], [1.0, 'point']] }, exprs: { sam: [[0, 'smirk'], [3.25, 'shocked']], me: [[0, 'determined']] },
  cam: { p: [1.1, 1.55, 2.0], l: [1.45, 1.2, -1.6] },
  o: (g, t, i, s) => { bubble(g, t, s, 'sam', 'PROVE IT.', 0.1, { hy: 1.7, off: 1.0 }); const [wx, wy] = scr3(s, [0.4, 1.65, -2.98]), u = U();
    if (t > 3.2) { burst(g, t, wx, wy, 120 * u, 3.2, '#ffffff'); pigeon2d(g, wx, wy + (t - 3.2) * 90 * u, 50 * u, { sad: true }); text(g, 'THUNK!', wx, wy - 120 * u, { size: 60 * u, font: FONTS.ui, weight: 900, color: '#ffd23f', stroke: 8 * u, strokeColor: '#141218' });
      const [bx, by] = scr3(s, [CHAIR[0] - 0.3, 1.0, CHAIR[1] + 0.1]); for (let k = 0; k < 18; k++) { const q = t - 3.25, a = k * 0.9; circle(g, bx + Math.cos(a) * q * 300 * u, by - Math.sin(a) * q * 200 * u + q * q * 300 * u, 8 * u, k % 3 ? '#e8b84a' : '#f4f4f4'); } } },
  caps: [['"IN TEN SECONDS, YOU SPILL CEREAL ON YOUR HOODIE."', 1.0, { dur: 2.2, size: 58 }]] });
SL(5)('l13', { set: DORM, cast: { sam: SAMSEAT('shocked') }, b: (st, s) => cerealStain(s.F.sam, 22), exprs: { sam: [[0, 'shocked'], [2.0, 'smirk']] },
  poses: { sam: [[0, sit({ shA: [30, 30], elA: 60, shB: [30, 30], elB: 60 })], [2.0, sit({ shA: [20, 40], elA: 100, shB: [10, 8], elB: 20 })]] }, cam: { f: 'sam', d: 2.4, h: 1.2, side: -0.3, lh: 0.9 },
  caps: [['"OKAY. OKAY. THAT\'S CREEPY."', 0.3]] });
CL(5, 'teal')('l14', 'teal', (g, t, i, u, cx, cy) => { title(g, t, 'IF THE DAY RESETS...', cy - 380 * u, { at: 0.1, size: 72 }); const k = ease.outBack(prog(t, 0.6, 1.0)); if (k > 0) text(g, '0', cx, cy - 20 * u, { size: 380 * u * k, font: FONTS.title, weight: 900, color: '#9ff2d8' });
  title(g, t, 'CONSEQUENCES', cy + 260 * u, { at: 1.4, size: 90, color: '#ffffff' }); });
CL(roll(6, 8, 1.0, 6.8), 'gold')('l15', 'gold', (g, t, i, u, cx, cy) => { title(g, t, 'SO SAM USES HIS FREE LOOPS', cy - 410 * u, { at: 0.1, size: 64 });
  panel2d(g, t, cx - 600 * u, cy + 20 * u, 560 * u, 560 * u, 1.3, 'AN ENTIRE CAKE', (g, x, y) => { const U0 = U(); g.fillStyle = '#ff9ab0'; rr(g, x - 130 * U0, y - 20 * U0, 260 * U0, 120 * U0, 14 * U0); g.fill(); g.fillStyle = '#fbfaf4'; rr(g, x - 110 * U0, y - 90 * U0, 220 * U0, 80 * U0, 14 * U0); g.fill(); g.fillStyle = '#e8453c'; g.fillRect(x - 6 * U0, y - 150 * U0, 12 * U0, 60 * U0); circle(g, x, y - 160 * U0, 12 * U0, '#ffd23f'); }, { bg: '#ffeedd' });
  panel2d(g, t, cx, cy + 20 * u, 560 * u, 560 * u, 4.0, 'A CART DOWN THE HILL', (g, x, y) => { const U0 = U(); g.save(); g.translate(x, y); g.rotate(0.3); g.strokeStyle = '#7a8290'; g.lineWidth = 8 * U0; g.strokeRect(-130 * U0, -70 * U0, 240 * U0, 110 * U0); for (let k = 1; k < 5; k++) { g.beginPath(); g.moveTo(-130 * U0 + k * 48 * U0, -70 * U0); g.lineTo(-130 * U0 + k * 48 * U0, 40 * U0); g.stroke(); }
    circle(g, -100 * U0, 80 * U0, 18 * U0, '#141418'); circle(g, 80 * U0, 80 * U0, 18 * U0, '#141418'); g.restore(); face2d(g, x - 10 * U0, y - 110 * U0, 50 * U0, { cap: false, mole: false, expr: 'o' }); }, { bg: '#d8ecff' });
  panel2d(g, t, cx + 600 * u, cy + 20 * u, 560 * u, 560 * u, 6.4, 'GREEN HAIR', (g, x, y) => { const U0 = U(); for (let k = 0; k < 10; k++) { const a = Math.PI + (k / 9) * Math.PI; circle(g, x + Math.cos(a) * 110 * U0, y - 10 * U0 + Math.sin(a) * 110 * U0, 40 * U0, '#3adf6a'); } face2d(g, x, y + 10 * U0, 100 * U0, { cap: false, mole: false }); }, { bg: '#e8ffe8' }); });
SL(roll(6, 8, 0, 4))('l16', { set: DORM, cast: { me: [ME, 0.6, -0.9, 0.5, 'stand', 'sleepy'], sam: SAMSEAT('sleepy') }, b: (st, s) => {}, carry: [{ prop: () => bowl(), by: 'sam', both: false, arms: BOWL }],
  poses: { me: [[0, 'explain'], [2.4, 'facepalm']], sam: [[0, BOWL]] }, exprs: { me: [[0, 'talk'], [2.4, 'sleepy']], sam: [[0, 'sleepy'], [1.2, 'confused']] },
  cam: { p: [1.1, 1.55, 2.0], l: [1.45, 1.2, -1.5] }, caps: [['HE WAKES UP WITH NO MEMORY OF IT', 0.2, { dur: 2.1 }], ['SO YOU EXPLAIN IT. AGAIN.', 2.4]] });
CL(9, 'blue')('l17', 'blue', (g, t, i, u, cx, cy) => { title(g, t, 'LOOP 9: ESCAPE', cy - 380 * u, { at: 0.1, size: 90, color: '#6fe6ff' }); const k = ease.outBack(prog(t, 0.8, 1.2)); if (k <= 0) return;
  g.save(); g.translate(cx, cy); g.scale(k, k); g.rotate(-0.05); g.fillStyle = '#fbfaf4'; rr(g, -380 * u, -150 * u, 760 * u, 300 * u, 24 * u); g.fill(); g.setLineDash([14 * u, 12 * u]); g.strokeStyle = '#9aa0aa'; g.lineWidth = 5 * u; g.beginPath(); g.moveTo(180 * u, -150 * u); g.lineTo(180 * u, 150 * u); g.stroke(); g.setLineDash([]);
  text(g, 'BUS TICKET', -100 * u, -80 * u, { size: 44 * u, font: FONTS.ui, weight: 900, color: '#e8453c' }); text(g, 'CAMPUS  →  CITY', -100 * u, 0, { size: 52 * u, font: FONTS.ui, weight: 900, color: '#141218' }); text(g, '4 HOURS', -100 * u, 80 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#3a5ad8' });
  text(g, 'ONE WAY', 280 * u, 0, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#141218' }); g.restore(); });
const BUS = ['busInside', { night: true }];
SL(9)('l18', { set: BUS, mood: 'night', cast: { me: [ME, 0.78, -0.55, FNZ, 'sit', 'determined'] }, poses: { me: [[0, sit({ head: [-30, 0] })]] },
  cam: { p: [-0.25, 1.5, -2.5], l: [0.85, 1.2, -0.55], p2: [-0.2, 1.48, -2.3] }, caps: [['IF THE LOOP IS TIED TO CAMPUS...', 0.2, { size: 64 }]] });
SL(9)('l19', { set: BUS, mood: 'night', cast: { me: [ME, 0.78, -0.55, FNZ, 'sit', 'determined'] }, exprs: { me: [[0, 'determined'], [2.4, 'worried'], [3.0, 'shocked']] },
  cam: { p: [-0.25, 1.5, -2.4], l: [0.85, 1.2, -0.55] },
  o: (g, t) => { const u = U(); digital(g, E.W - 230 * u, 130 * u, t < 2.6 ? '11:59 PM' : '12:00 AM', 56 * u, { col: '#6fe6ff' }); const k = clamp((t - 3.1) / 0.25) * clamp((4.6 - t) / 0.8); if (k > 0) { g.save(); g.globalAlpha = k; g.fillStyle = '#ffffff'; g.fillRect(0, 0, E.W, E.H); g.restore(); } },
  caps: [['MIDNIGHT. THE MIDDLE OF NOWHERE.', 0.3, { dur: 2.7 }]] });
SL(10)('l20', { set: DORM, cast: { me: [ME, BED[0], BED[1], FZ, 'sit', 'shocked'] }, exprs: { me: [[0, 'shocked'], [2.2, 'determined']] },
  poses: { me: [[0, sit({ spine: [10, 0], shA: [30, 40], elA: 40, shB: [30, 40], elB: 40 })], [2.0, sit({ spine: [6, 0] })]] }, cam: { p: [-0.7, 1.35, 0.9], l: [-2.0, 1.0, -1.95], p2: [-0.85, 1.3, 0.6] },
  o: (g, t) => { const k = 1 - clamp(t / 0.5); if (k > 0) { g.save(); g.globalAlpha = k; g.fillStyle = '#ffffff'; g.fillRect(0, 0, E.W, E.H); g.restore(); } },
  caps: [['IT\'S NOT THE PLACE.', 0.6, { dur: 1.6 }], ['IT\'S THE DAY.', 2.2, { size: 100 }]] });
CL(10, 'gold')('l21', 'gold', (g, t, i, u, cx, cy) => { const k = ease.outBack(prog(t, 0.4, 0.8)); if (k > 0) { g.save(); g.translate(cx, cy - 60 * u); g.scale(k, k); g.fillStyle = '#ffd23f';
    g.beginPath(); g.moveTo(-150 * u, -170 * u); g.lineTo(150 * u, -170 * u); g.quadraticCurveTo(140 * u, 40 * u, 0, 60 * u); g.quadraticCurveTo(-140 * u, 40 * u, -150 * u, -170 * u); g.fill(); g.fillRect(-25 * u, 50 * u, 50 * u, 80 * u); g.fillRect(-110 * u, 120 * u, 220 * u, 50 * u);
    g.strokeStyle = '#ffd23f'; g.lineWidth = 22 * u; for (const s of [-1, 1]) { g.beginPath(); g.arc(s * 150 * u, -90 * u, 60 * u, s > 0 ? -1.4 : Math.PI - 1.8, s > 0 ? 1.8 : Math.PI + 1.4); g.stroke(); } text(g, 'TUESDAY', 0, -70 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#6a4014' }); g.restore(); }
  title(g, t, 'CAN\'T ESCAPE THE DAY?', cy - 400 * u, { at: 0.1, size: 70 }); title(g, t, 'THEN WIN IT.', cy + 330 * u, { at: 0.9, size: 100, color: '#ffd84a' }); });
