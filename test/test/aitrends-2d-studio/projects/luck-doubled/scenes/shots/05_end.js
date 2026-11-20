// shots/05_end.js — 6:41-8:14: the words under the 30, the choice, winding it back, the luck pours out, the suits come back, a week later: TAILS. KEEP or GIVE IT BACK?
import { walkPose } from '../toon/toon.js';
import { text, FONTS, alpha, rr, circle } from '/engine/core.js';
import { ME, fig, shot, cam, C, pose, expr, held, bandFlash, vignette, shout, scr, steelBed, THREE, box, ball, E, V, ease, prog, clamp, lerp, SETS } from './_lib.js';
import { DEV } from '../toon/cast3d.js';
import { cast, phone } from './00_kit.js';
import { FACE_Z, FACE_NZ, FACE_X, FACE_NX, U, tag, watchFace, darkGold, secAngle } from './_luck.js';
import { S3, S2, suv, can, SUIT, mult, coin, flow } from './_luckkit.js';
import { watchBack } from './02_discovery.js';
import { card, title, stamp } from './_info.js';

const SIT = (extra = {}) => ({ hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, ...extra });
const HOSP = (st) => SETS.hospital(st);
const DEVBED = (e, extra = {}) => ({ of: DEV, x: -0.9, z: 0.5, r: FACE_X, y: 0.3, p: [[0, { hipA: 85, hipB: 85, knA: 5, knB: 5, drop: 0.36, spine: [-10, 0], shA: [30, 15], elA: 80, ...extra }]], e });
const bedBuild = (st, s, withCan = true) => { steelBed(st, -1.6, 0.5); cast(s.A[0], 'B'); if (withCan) { s.can = can(1); st.add(s.can); } };

// t01 — hour 29: the line scratched under the 30. Up close, it's tiny words.
S2('t01', (g, t, info) => { darkGold(g, t); const z = lerp(0.9, 2.2, ease.inOut(prog(t, 0.5, 6.5))); watchBack(g, t, { zoom: z, words: ease.inOut(prog(t, 3.6, 4.8)) });
  shout(g, t, 'HOUR 29', { at: 0.1, y: E.H * 0.12, size: V(100, 92), color: '#ffd23a', dur: 3.4, shake: 0 }); });

// t02 — "Luck can't be made. Only moved."
S2('t02', (g, t) => { darkGold(g, t, 1); const u = U(); title(g, t, "LUCK CAN'T BE MADE.", E.H * 0.42, { at: 0.1, size: 100, color: '#f2d58a', u }); title(g, t, 'ONLY MOVED.', E.H * 0.6, { at: 1.0, size: 120, color: '#ffd23a', u }); vignette(g, '#000', 0.5); });

// t03 — at hour thirty you'll be a billion times luckier, and Dev won't be alive to see it. Unless you move it first.
S3('t03', HOSP, [DEVBED([[0, 'sleepy']]), { of: ME, x: 0.2, z: -0.8, r: FACE_Z + 0.2, p: [[0, 'stand'], [3.6, { shA: [60, 20], elA: 100, head: [0, -12] }]], e: [[0, 'worried'], [4.0, 'sad'], [6.2, 'determined']] }],
  C([0.75, 1.55, 0.75], [0.2, 1.4, -0.8]), C([0.7, 1.53, 0.6], [0.2, 1.4, -0.8]),
  (g, t) => { mult(g, t, '×1,000,000,000', 0.4); shout(g, t, 'HOUR 30', { at: 0.3, x: E.W * 0.3, y: E.H * 0.14, size: V(96, 90), color: '#ffd23a', shake: 0 }); shout(g, t, 'UNLESS YOU MOVE IT FIRST.', { at: 5.6, y: E.H * 0.86, size: V(80, 74), shake: 0 }); },
  { mood: 'indoor', build: (st, s) => bedBuild(st, s, false) });

// t04 — college. A house nobody can take. Maybe a cure. Grandpa probably thought the same thing.
card('t04', 'gold', (g, t, info, u, cx, cy) => { title(g, t, 'A BILLION TIMES LUCKIER IS A LOT.', cy - 360 * u, { at: 0.1, size: 58 });
  const I = [['COLLEGE', 2.4], ['A HOUSE FOR MOM', 3.8], ['A CURE?', 5.6]]; I.forEach(([l, at], k) => { const a = ease.outBack(prog(t, at, at + 0.35)); if (a <= 0) return; const x = cx + (k - 1) * 520 * u; g.save(); g.translate(x, cy); g.scale(a, a); g.fillStyle = 'rgba(255,255,255,.12)'; rr(g, -230 * u, -150 * u, 460 * u, 300 * u, 30 * u); g.fill(); text(g, l, 0, 20 * u, { size: 56 * u, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center' }); g.restore(); });
  if (t > 8.4) title(g, t, 'GRANDPA HAD THIS WATCH TOO.', cy + 300 * u, { at: 8.4, size: 64, color: '#ffd23a' }); });

// t05 — then you look at Dev, asleep, still holding that dented can. "It's not even close."
S3('t05', HOSP, [DEVBED([[0, 'sleepy']], { head: [0, 10] })],
  C([0.7, 1.25, 1.9], [-0.85, 1.05, 0.5]), C([0.6, 1.23, 1.75], [-0.85, 1.05, 0.5]),
  (g, t) => { shout(g, t, "IT'S NOT EVEN CLOSE.", { at: 5.2, y: E.H * 0.86, size: V(96, 90), shake: 0 }); },
  { mood: 'indoor', build: (st, s) => bedBuild(st, s), fx: (s, t) => held(s.can, s.A[0], 'A', 0.05) });

// t06 — you take Dev's good hand, and you wind the watch backward. Once. Tick.
const WIND = 4.0;
S3('t06', HOSP, [DEVBED([[0, 'sleepy']]), { of: ME, x: -0.45, z: -0.55, r: FACE_Z - 0.2, p: [[0, 'stand'], [1.0, { shA: [60, 10], elA: 40, shB: [55, 20], elB: 100, head: [0, -15] }]], e: [[0, 'sad'], [WIND, 'calm']] }],
  C([1.4, 1.5, 2.9], [-0.6, 1.0, 0.1]), C([1.2, 1.45, 2.6], [-0.6, 1.0, 0.1]),
  (g, t) => { shout(g, t, 'TICK.', { at: WIND, y: E.H * 0.14, size: V(120, 110), color: '#ffd23a', shake: 0 }); bandFlash(g, t, WIND, '#ffe8a0', 0.3); },
  { mood: 'indoor', build: (st, s) => bedBuild(st, s), fx: (s, t) => held(s.can, s.A[0], 'A', 0.05) });

// t07 — every win pours out of you like water out of a bathtub. The lottery money. Every $50 bill. All those green lights. Gone.
S3('t07', HOSP, [DEVBED([[0, 'sleepy'], [6.5, 'calm']]), { of: ME, x: -0.45, z: -0.55, r: FACE_Z - 0.2, p: [[0, { shA: [60, 10], elA: 40, shB: [55, 20], elB: 100, head: [0, -15] }]], e: [[0, 'calm']] }],
  C([1.6, 1.6, 3.4], [-0.5, 1.0, 0.9]), C([1.4, 1.55, 3.1], [-0.5, 1.0, 0.9]),
  (g, t, i, s) => { const a = scr(s, [-0.45, 1.2, -0.55]), b = scr(s, [-0.6, 0.9, 0.5]); flow(g, t, a, b, ease.inOut(prog(t, 0.2, 2.0)) * (1 - prog(t, 7.2, 8.6)), '#ffd23a', 70);
    [['LOTTERY MONEY', 2.6], ['EVERY $50 BILL', 3.8], ['ALL THOSE GREEN LIGHTS', 4.8]].forEach(([l, at], k) => shout(g, t, l, { at, x: E.W * 0.78, y: E.H * (0.25 + k * 0.12), size: V(58, 54), dur: 6.4, shake: 0 }));
    shout(g, t, 'GONE.', { at: 6.6, y: E.H * 0.86, size: V(120, 110), shake: 0 }); },
  { mood: 'indoor', build: (st, s) => bedBuild(st, s), fx: (s, t) => held(s.can, s.A[0], 'A', 0.05) });

// t08 — Dev's phone buzzes. His boss wants him back Monday. A shelter on Route 33 found his dog. Wagging.
S2('t08', (g, t) => { g.fillStyle = '#dfeaf0'; g.fillRect(0, 0, E.W, E.H); phone(g, t, { at: 0.05, who: "DEV'S PHONE", msgs: [{ at: 1.3, txt: 'Boss: come back Monday' }, { at: 3.1, txt: 'Shelter Rt 33: we found' }, { at: 3.5, txt: 'your dog! 🐶 (wagging)' }] }); });

// t09 — then the watch stops. For the first time in thirty hours, it's just a watch.
S2('t09', (g, t) => { const u = U(); g.fillStyle = '#14120e'; g.fillRect(0, 0, E.W, E.H); watchFace(g, t, { sec: secAngle(Math.min(t, 0.9), 33), glowK: Math.max(0, 0.5 - t * 0.4) });
  shout(g, t, 'JUST A WATCH.', { at: 2.0, y: E.H * 0.88, size: V(96, 90), color: '#f2e6c8', shake: 0 }); });

// t10 — right on time, the black SUV pulls up. The two men look at your wrist. The second hand isn't moving. "Huh. You actually gave it back."
const PARK = 2.4;
S3('t10', (st) => SETS.suburbNight(st), [{ of: ME, x: 0.3, z: 0.2, r: FACE_Z + 0.3, p: [[0, 'stand'], [5.6, { shA: [60, 10], elA: 90 }]], e: [[0, 'worried'], [8.8, 'confused']] },
  { of: SUIT, x: -1.8, z: 2.8, r: FACE_NZ, p: [[0, 'stand']], e: [[0, 'neutral'], [8.6, 'smirk']] }, { of: SUIT, x: 2.2, z: 2.8, r: FACE_NZ, p: [[0, 'crossArms']], e: [[0, 'neutral']] }],
  C([5.0, 1.7, -0.3], [0.2, 1.2, 2.0]), C([4.4, 1.65, -0.2], [0.2, 1.2, 1.8]),
  (g, t) => { tag(g, t, 'HOUR 30', 0.2); shout(g, t, '"HUH. YOU ACTUALLY GAVE IT BACK."', { at: 8.7, y: E.H * 0.86, size: V(72, 66), shake: 0 }); },
  { night: true, build: (st, s) => { s.v = suv(-14, 4.8, 0); st.add(s.v); },
    fx: (s, t) => { const k = ease.out(clamp(t / PARK)); s.v.position.x = lerp(-14, 0.3, k); const w = clamp((t - PARK - 0.6) / 2.2); [[s.A[1], -1.8, -0.8], [s.A[2], 2.2, 1.4]].forEach(([f, x0, x1]) => { f.visible = t > PARK + 0.5; f.position.x = lerp(x0, x1, w); f.position.z = lerp(3.5, 1.3, w); if (w > 0 && w < 1) f.setPose(walkPose(t * 4.5)); }); } });

// t11 — then they get in the SUV and drive away. You never find out who they were. But you're pretty sure they've done this before.
S3('t11', (st) => SETS.suburbNight(st), [{ of: ME, x: 0.3, z: 0.2, r: FACE_Z + 0.6, p: [[0, 'stand']], e: [[0, 'confused'], [3.0, 'thinking']] }],
  C([3.5, 1.4, 6.8], [0.6, 1.2, 2.4]), C([3.2, 1.38, 6.2], [0.8, 1.2, 2.4]),
  (g, t) => { shout(g, t, "THEY'VE DONE THIS BEFORE.", { at: 4.2, y: E.H * 0.86, size: V(84, 78), shake: 0 }); const k = ease.inOut(prog(t, 4.0, 6.6)); if (k > 0) vignette(g, '#03040a', 0.6 * k); },
  { night: true, build: (st, s) => { s.v = suv(0.3, 4.2, 0); st.add(s.v); }, fx: (s, t) => { s.v.position.x = 0.3 + Math.max(0, t - 0.8) ** 2 * 2.2; } });

// e01 — a week later, Dev digs a quarter out of your couch. "Flip for the last slice?"
const BED = (st) => SETS.bedroom(st);
S3('e01', BED, [{ of: DEV, x: -2.0, z: -1.85, r: FACE_Z - 0.3, y: 0.22, p: [[0, SIT({ shA: [40, 10], elA: 30, spine: [20, 0] })], [2.0, SIT({ shA: [80, 10], elA: 60 })]], e: [[0, 'thinking'], [2.0, 'smirk']] },
  { of: ME, x: -2.95, z: -1.85, r: FACE_Z + 0.3, y: 0.22, p: [[0, 'sit']], e: [[0, 'smile']] }],
  C([0.4, 1.45, 1.7], [-2.45, 0.95, -1.9]), C([-0.1, 1.4, 1.2], [-2.45, 0.95, -1.9]),
  (g, t) => { tag(g, t, 'A WEEK LATER', 0.2); shout(g, t, '"FLIP FOR THE LAST SLICE?"', { at: 2.8, y: E.H * 0.86, size: V(76, 70), shake: 0 }); },
  { mood: 'indoor', build: (st, s) => cast(s.A[0], 'B') });

// e02 — tails. You lose. Best thing that's happened to you all week.
S3('e02', BED, [{ of: DEV, x: -2.0, z: -1.85, r: FACE_Z - 0.3, y: 0.22, p: [[0, 'sit'], [1.0, SIT({ shA: [150, 20], elA: 20, shB: [150, 20], elB: 20 })]], e: [[0, 'surprised'], [1.0, 'joy']] },
  { of: ME, x: -2.95, z: -1.85, r: FACE_Z + 0.3, y: 0.22, p: [[0, 'sit']], e: [[0, 'surprised'], [1.0, 'joy']] }],
  C([0.0, 1.4, 1.3], [-2.45, 1.0, -1.9]), C([-0.3, 1.38, 1.0], [-2.45, 1.0, -1.9]),
  (g, t) => { coin(g, t, E.W * 0.5, E.H * 0.42, 70 * U(), 'T', 0, 0.8); shout(g, t, 'TAILS. YOU LOSE.', { at: 0.9, y: E.H * 0.15, size: V(100, 92), color: '#ffd23a', shake: 0 }); shout(g, t, 'BEST THING ALL WEEK.', { at: 1.6, y: E.H * 0.86, size: V(84, 78), shake: 0 }); },
  { mood: 'indoor', build: (st, s) => cast(s.A[0], 'B') });

// e03 — would you give it back? A billion times luckier, or your best friend? Comment KEEP or GIVE IT BACK.
card('e03', 'dark', (g, t, info, u, cx, cy) => { title(g, t, 'WOULD YOU GIVE IT BACK?', cy - 330 * u, { at: 0.1, size: 84 });
  title(g, t, '×1,000,000,000 LUCK', cy - 60 * u, { at: 1.9, size: 66, x: cx - 440 * u, color: '#ffd23a' }); title(g, t, 'OR', cy - 60 * u, { at: 2.6, size: 60 }); title(g, t, 'YOUR BEST FRIEND', cy - 60 * u, { at: 3.1, size: 66, x: cx + 440 * u, color: '#f08a2a' });
  if (t > 4.5) { stamp(g, t, 'KEEP', cx - 330 * u, cy + 230 * u, { at: 4.5, color: '#ffd23a', size: 100, rot: -0.06 }); stamp(g, t, 'GIVE IT BACK', cx + 300 * u, cy + 230 * u, { at: 4.9, color: '#6fe6a0', size: 100, rot: 0.05 });
    title(g, t, 'COMMENT 👇', cy + 420 * u, { at: 5.2, size: 54 }); } });
