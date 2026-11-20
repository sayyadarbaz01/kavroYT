// shots/04_reveal.js — 4:27-6:41: things bend, the bus, the dog, the news, Dev's bad week, the suits, Dev's car on the news, it TAKES, hour 24, the hospital.
import { walkPose } from '../toon/toon.js';
import { text, FONTS, alpha, rr, circle, rng } from '/engine/core.js';
import { ME, MOM, fig, shot, face, cam, C, push, pose, expr, held, bandFlash, vignette, shout, impact, smoke, scr, steelBed, THREE, box, cyl, ball, E, V, ease, prog, clamp, lerp, SETS } from './_lib.js';
import { DEV } from '../toon/cast3d.js';
import { bus, vehicle } from '../toon/sets3d.js';
import { cast, phone } from './00_kit.js';
import { FACE_Z, FACE_NZ, FACE_X, FACE_NX, U, tag, watchFace, darkGold, secAngle, shake } from './_luck.js';
import { S3, S2, dog, trot, suv, can, SUIT, mult, note, tv, flow } from './_luckkit.js';
import { card, title, stamp, cross, check, person, phoneIcon } from './_info.js';

const SIT = (extra = {}) => ({ hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, ...extra });
// little toon head icon of Kip for the TV
function kipHead(g, x, y, r) { circle(g, x, y, r, '#f6f3ec'); g.fillStyle = '#1b1b20'; g.beginPath(); g.arc(x, y - r * 0.15, r * 1.02, Math.PI, 0); g.fill(); g.fillRect(x - r * 0.2, y - r * 0.25, r * 1.5, r * 0.18);
  text(g, 'K', x, y - r * 0.42, { size: r * 0.5, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center' }); circle(g, x - r * 0.35, y + r * 0.2, r * 0.13, '#141418'); circle(g, x + r * 0.35, y + r * 0.2, r * 0.13, '#141418'); }

// f01 — hour 16: 65,000 times luckier. And now things start bending.
shot('f01', (st, s) => { SETS.suburb(st, { cars: true }); s.me = fig(st, ME, 0, 0.2, FACE_Z); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand']]); expr(s.me, t, [[0, 'awe']]); T.drone(s.stage.camera, t, { target: [0, 1, 2], dur: i.dur, from: { h: 18, r: 22, a: 0.4 }, to: { h: 9, r: 13, a: -0.1 } }); s.stage.camera.rotateZ(0.18 * Math.sin(t * 0.9)); },
  (g, t) => { tag(g, t, 'HOUR 16', 0.2); mult(g, t, '×65,536', 0.8); shout(g, t, 'THINGS START BENDING', { at: 4.2, y: E.H * 0.86, size: V(90, 84), shake: 0 }); });

// f02 — a school bus skids on black ice... and stops one inch from your knees
const STOP = 2.6;
S3('f02', 'suburb', [{ of: ME, x: 0, z: 3.4, r: FACE_NX + 0.3, p: [[0, 'stand'], [1.0, 'shocked']], e: [[0, 'neutral'], [0.9, 'shocked'], [STOP + 0.8, 'smirk']] }],
  C([3.2, 1.0, 7.2], [-1.2, 1.1, 3.4]), C([2.6, 0.9, 6.4], [-1.0, 1.0, 3.4]),
  (g, t) => { shout(g, t, 'BLACK ICE', { at: 0.3, y: E.H * 0.14, size: V(80, 74), dur: STOP, shake: 0 }); shout(g, t, '1 INCH.', { at: STOP + 0.2, y: E.H * 0.86, size: V(120, 110), color: '#ffd23a', shake: 0 }); },
  { build: (st, s) => { s.b = bus(-30, 3.4, 0); st.add(s.b); st.add(box(9, 0.006, 2.4, '#bfe0f0', -8, 0.03, 3.4, { cast: false })); },
    fx: (s, t) => { const k = ease.out(clamp(t / STOP)); s.b.position.x = lerp(-30, -4.88, k); s.b.rotation.y = Math.sin(k * Math.PI) * 0.12; }, after: (s, t) => shake(s.stage.camera, t, STOP, 0.03, 0.3) });

// f03 — a stray dog follows you home with a Rolex in its mouth
S3('f03', 'suburb', [{ of: ME, x: 1.4, z: 0.1, r: FACE_NX + 0.4, p: [[0, 'stand'], [1.8, { shA: [60, 15], elA: 30, spine: [15, 0] }]], e: [[0, 'confused'], [1.8, 'happy']] }],
  C([0.2, 1.1, 3.2], [0.4, 0.7, 0.1]), C([0.3, 1.05, 2.8], [0.6, 0.7, 0.1]),
  (g, t) => shout(g, t, 'IS THAT A ROLEX?', { at: 1.4, y: E.H * 0.86, size: V(90, 84), shake: 0 }),
  { build: (st, s) => { s.d = dog(); st.add(s.d); }, fx: (s, t) => { const k = clamp(t / 1.8); s.d.position.set(lerp(-3.5, 0.75, k), 0.14, 0.15); if (k < 1) trot(s.d, t); else s.d.userData.tail.rotation.x = Math.sin(t * 16) * 0.6; } });

// f04 — the local news: THE LUCKIEST KID IN OHIO
S2('f04', (g, t) => tv(g, t, 'THE LUCKIEST KID IN OHIO', 'POWERBALL · METEOR MISS · HALF-COURT SHOT', (g2, tt, x, y, w, h) => { const gr = g2.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, '#6fa8e0'); gr.addColorStop(1, '#2a4a7a'); g2.fillStyle = gr; g2.fillRect(x, y, w, h);
  kipHead(g2, x + w * 0.5, y + h * 0.36, h * 0.2 * (1 + 0.02 * tt)); text(g2, '★', x + w * 0.25, y + h * 0.3, { size: h * 0.12, color: '#ffd23a', align: 'center' }); text(g2, '★', x + w * 0.75, y + h * 0.3, { size: h * 0.12, color: '#ffd23a', align: 'center' }); }));

// f05 — Dev comes over with his hand wrapped in a dish towel. "Neighbor's dog bit me. Then my dog ran away."
const BED = (st) => SETS.bedroom(st, { night: true });
S3('f05', BED, [{ of: DEV, x: -2.0, z: -1.85, r: FACE_Z - 0.3, y: 0.22, p: [[0, SIT({ shB: [50, 10], elB: 90 })], [3.0, SIT({ shB: [50, 10], elB: 90, shA: [40, 20], elA: 60 })]], e: [[0, 'sad'], [3.0, 'talk'], [5.4, 'worried'], [7.0, 'smile']] },
  { of: ME, x: -2.95, z: -1.85, r: FACE_Z + 0.3, y: 0.22, p: [[0, 'sit']], e: [[0, 'worried']] }],
  C([0.4, 1.45, 1.7], [-2.45, 0.95, -1.9]), C([-0.1, 1.4, 1.2], [-2.45, 0.95, -1.9]),
  (g, t) => { shout(g, t, '"NEIGHBOR\'S DOG BIT ME."', { at: 3.1, y: E.H * 0.86, size: V(72, 66), dur: 5.2, shake: 0 }); shout(g, t, '"THEN MY DOG RAN AWAY."', { at: 5.3, y: E.H * 0.86, size: V(72, 66), shake: 0 }); },
  { mood: 'indoor', build: (st, s) => { s.towel = ball(0.09, '#f4f0e8', 0, 0, 0, { outline: 0.005 }); st.add(s.towel); }, fx: (s, t) => held(s.towel, s.A[0], 'B') });

// f06 — Dev laughs it off. But he keeps staring at your watch.
S3('f06', BED, [{ of: DEV, x: -2.0, z: -1.85, r: FACE_Z - 0.75, y: 0.22, p: [[0, SIT({ head: [0, -12] })]], e: [[0, 'happy'], [1.2, 'thinking']] }],
  C([-2.7, 1.2, -1.05], [-2.0, 1.05, -1.85]), C([-2.62, 1.18, -1.15], [-2.0, 1.05, -1.85]),
  (g, t) => { const k = ease.inOut(prog(t, 1.2, 3.0)); if (k > 0) vignette(g, '#0a0c18', 0.5 * k); }, { mood: 'indoor' });

// f07 — hour 20: a black SUV outside your house; a hedge fund in New York wants to rent you. By the hour.
S3('f07', 'suburb', [], C([6.5, 1.6, 9.5], [0, 1.2, 3.2]), C([5.5, 1.5, 8.5], [0, 1.2, 3.2]),
  (g, t) => { tag(g, t, 'HOUR 20', 0.2); phone(g, t, { at: 2.6, who: 'UNKNOWN · NEW YORK', msgs: [{ at: 3.3, txt: 'Hedge fund here.' }, { at: 4.5, txt: "We'd like to rent you." }, { at: 5.8, txt: 'By the hour.' }] }); },
  { build: (st) => st.add(suv(0, 3.3, 0)) });

// f08 — two men in dark suits slide a number across your kitchen table: $50,000,000 for one weekend of picking stocks
const KIT = (st) => SETS.kitchen(st);
S3('f08', KIT, [{ of: SUIT, x: 2.3, z: 1.5, r: FACE_NZ + 0.4, p: [[0, 'stand'], [4.2, { shA: [60, 10], elA: 30, spine: [15, 0] }]], e: [[0, 'neutral']] },
  { of: SUIT, x: 4.1, z: 1.5, r: FACE_NZ - 0.4, p: [[0, 'crossArms']], e: [[0, 'neutral']] },
  { of: MOM, x: 2.6, z: -0.25, r: FACE_Z + 0.2, p: [[0, 'crossArms']], e: [[0, 'worried']] }, { of: ME, x: 3.7, z: -0.25, r: FACE_Z - 0.2, p: [[0, 'stand']], e: [[0, 'worried'], [5.5, 'shocked']] }],
  C([0.6, 2.1, 3.7], [3.2, 0.95, 0.6]), C([0.9, 2.05, 3.5], [3.2, 0.95, 0.6]),
  (g, t) => { shout(g, t, 'WHO DO YOU WORK FOR?', { at: 2.8, y: E.H * 0.14, size: V(76, 70), dur: 4.4, shake: 0 }); note(g, t, ['$50,000,000', 'ONE WEEKEND.', 'PICKING STOCKS.'], E.W * 0.5, E.H * 0.52, 5.0, { bg: '#fbfaf4', w: 640, h: 400, size: 62, rot: -0.02 }); },
  { mood: 'indoor', fov: 48 });

// f09 — you say no. Mom says no louder. "We'll come back at hour thirty." How do they know about hour thirty?
S3('f09', KIT, [{ of: MOM, x: 2.6, z: -0.25, r: FACE_Z + 0.2, p: [[0, 'crossArms'], [1.0, 'point']], e: [[0, 'angry']] }, { of: ME, x: 3.7, z: -0.25, r: FACE_Z - 0.2, p: [[0, 'crossArms']], e: [[0, 'determined'], [5.8, 'scared']] },
  { of: SUIT, x: 1.7, z: 1.4, r: FACE_NZ + 0.6, p: [[0, 'stand']], e: [[0, 'smirk']] }],
  C([4.7, 1.7, 3.6], [2.7, 1.2, 0.5]), C([4.55, 1.68, 3.35], [2.7, 1.2, 0.5]),
  (g, t) => { shout(g, t, 'NO.', { at: 0.1, x: E.W * 0.3, y: E.H * 0.15, size: V(100, 92), dur: 2.6, shake: 0 }); shout(g, t, 'NO!!', { at: 1.0, x: E.W * 0.62, y: E.H * 0.15, size: V(130, 120), color: '#ff5a4a', dur: 2.6 });
    shout(g, t, '"WE\'LL COME BACK AT HOUR 30."', { at: 2.9, y: E.H * 0.86, size: V(72, 66), dur: 5.8, shake: 0 }); shout(g, t, 'HOW DO THEY KNOW?', { at: 5.9, y: E.H * 0.86, size: V(90, 84), color: '#ffd23a', shake: 0 }); if (t > 5.9) vignette(g, '#05060c', 0.5); },
  { mood: 'indoor' });

// v01 — the other story on the news: the worst luck anyone's ever seen. They don't say his name. They show his car.
S2('v01', (g, t) => tv(g, t, t < 11 ? 'WORST LUCK IN OHIO?' : "WHO IS THE CITY'S UNLUCKIEST MAN?", 'LOST HIS JOB · LOST HIS DOG · PHONE IN A STORM DRAIN', (g2, tt, x, y, w, h) => { g2.fillStyle = '#2a2e3a'; g2.fillRect(x, y, w, h);
  const items = [['JOB', 7.1], ['DOG', 7.8], ['PHONE', 8.6]]; if (tt < 11) items.forEach(([l, at], k) => { const a = ease.outBack(prog(tt, at, at + 0.35)); if (a <= 0) return; const cx = x + w * (0.25 + k * 0.25), cy = y + h * 0.36; g2.save(); g2.translate(cx, cy); g2.scale(a, a); circle(g2, 0, 0, h * 0.13, '#3a4050'); text(g2, l, 0, h * 0.02, { size: h * 0.06, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center' }); g2.strokeStyle = '#ff3a3a'; g2.lineWidth = h * 0.02; g2.beginPath(); g2.moveTo(-h * 0.1, -h * 0.1); g2.lineTo(h * 0.1, h * 0.1); g2.stroke(); g2.restore(); });
  else { const cx = x + w * 0.5, cy = y + h * 0.42, s = h * 0.18 * (1 + 0.03 * (tt - 11)); g2.fillStyle = '#f08a2a'; rr(g2, cx - s * 2, cy - s * 0.4, s * 4, s * 0.8, s * 0.15); g2.fill(); rr(g2, cx - s * 1.1, cy - s * 0.95, s * 2, s * 0.6, s * 0.12); g2.fill(); g2.fillStyle = '#6a8cb0'; g2.fillRect(cx - s * 0.95, cy - s * 0.85, s * 1.7, s * 0.42); circle(g2, cx - s * 1.2, cy + s * 0.45, s * 0.38, '#141418'); circle(g2, cx + s * 1.2, cy + s * 0.45, s * 0.38, '#141418'); } }, { bg: '#2a2e3a' }));

// v02 — it's Dev's car. So you count the ticks.
S3('v02', 'suburb', [{ of: ME, x: 0.38, z: 0.3, r: FACE_Z + 0.5, p: [[0, 'stand'], [1.6, { shA: [60, 20], elA: 100, head: [0, -15] }]], e: [[0, 'shocked'], [1.6, 'worried']] }],
  C([1.4, 1.5, 1.9], [0.38, 1.35, 0.3]), C([1.32, 1.48, 1.75], [0.38, 1.35, 0.3]),
  (g, t) => { shout(g, t, "IT'S DEV'S CAR.", { at: 0.1, y: E.H * 0.86, size: V(96, 90), dur: 1.4, shake: 0 }); vignette(g, '#05060c', 0.35); }, { setOpts: {} });

// v03 — the pizza. His shin. That dead battery. His job.  (four panels, a backward tick on each)
S2('v03', (g, t) => { const u = U(); g.fillStyle = '#0c0e18'; g.fillRect(0, 0, E.W, E.H); const P = [['THE PIZZA', '#f2c050'], ['HIS SHIN', '#c8302c'], ['DEAD BATTERY', '#f08a2a'], ['HIS JOB', '#9aa0aa']];
  P.forEach(([l, c], k) => { const at = 0.1 + k * 0.85, a = ease.outBack(prog(t, at, at + 0.3)); if (a <= 0) return; const x = E.W * (0.125 + k * 0.25), y = E.H * 0.5; g.save(); g.translate(x, y); g.scale(a, a);
    g.fillStyle = alpha(c, 0.18); rr(g, -200 * u, -260 * u, 400 * u, 520 * u, 24 * u); g.fill(); g.strokeStyle = c; g.lineWidth = 6 * u; g.stroke(); circle(g, 0, -60 * u, 110 * u, '#e6d4ac'); g.strokeStyle = '#2a2016'; g.lineWidth = 6 * u;
    g.beginPath(); g.moveTo(0, -60 * u); const ang = -0.2 - ease.outBack(prog(t, at + 0.15, at + 0.3)) * 0.2; g.lineTo(Math.sin(ang) * 90 * u, -60 * u - Math.cos(ang) * 90 * u); g.stroke();
    text(g, '◀ TICK', 0, 110 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#ff5a4a', align: 'center' }); text(g, l, 0, 200 * u, { size: 44 * u, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center' }); g.restore(); }); });

// v04 — it was never counting down. The watch doesn't make luck. It TAKES it. From whoever's closest. And nobody's closer than Dev.
card('v04', 'red', (g, t, info, u, cx, cy) => { title(g, t, 'IT WAS NEVER COUNTING DOWN.', cy - 360 * u, { at: 0.1, size: 64 });
  person(g, cx - 450 * u, cy + 160 * u, 380 * u, '#f08a2a'); person(g, cx + 450 * u, cy + 160 * u, 380 * u, '#f6f3ec'); text(g, 'DEV', cx - 450 * u, cy + 330 * u, { size: 50 * u, font: FONTS.ui, weight: 900, color: '#f08a2a', align: 'center' }); text(g, 'YOU', cx + 450 * u, cy + 330 * u, { size: 50 * u, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center' });
  flow(g, t, [cx - 450 * u, cy - 20 * u], [cx + 450 * u, cy - 20 * u], ease.inOut(prog(t, 2.0, 3.6)));
  if (t > 2.4) stamp(g, t, 'IT TAKES', cx, cy - 170 * u, { at: 2.4, color: '#ffd23a', size: 110 }); if (t > 5.6) title(g, t, "NOBODY'S CLOSER THAN DEV.", cy + 430 * u, { at: 5.6, size: 58, color: '#ffb0a0' }); });

// v05 — so you try to be unlucky: rip up a scratcher, throw it out the window... the wind blows it back. $500.
S2('v05', (g, t) => { const u = U(); const gr = g.createLinearGradient(0, 0, 0, E.H); gr.addColorStop(0, '#8ec4f0'); gr.addColorStop(1, '#d8eefc'); g.fillStyle = gr; g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = '#2a2a34'; rr(g, E.W * 0.08, E.H * 0.1, E.W * 0.84, E.H * 0.8, 60 * u); g.fill(); g.clearRect && 0; g.fillStyle = gr; rr(g, E.W * 0.12, E.H * 0.16, E.W * 0.76, E.H * 0.68, 40 * u); g.fill(); // car window
  const out = ease.in(prog(t, 2.2, 3.4)), back = ease.out(prog(t, 4.6, 5.8)), k = out - back * out, x = lerp(E.W * 0.5, E.W * 1.05, k), y = E.H * 0.5 - Math.sin(k * Math.PI) * 120 * u;
  const split = clamp((t - 1.2) / 0.4) * (1 - back);
  for (const s of [-1, 1]) { g.save(); g.translate(x + s * split * 60 * u, y); g.rotate(s * split * 0.4 + t * k * 3); g.fillStyle = '#ffd23a'; rr(g, -120 * u + (s > 0 ? 120 * u : 0) - (s > 0 ? 120 * u : 0), -170 * u, 240 * u * 0.5 + 0, 340 * u, 12 * u); g.fill(); g.restore(); }
  if (t < 1.2 || back > 0.9) { g.save(); g.translate(x, y); g.fillStyle = '#ffd23a'; rr(g, -120 * u, -170 * u, 240 * u, 340 * u, 12 * u); g.fill(); text(g, t > 6 ? '$500' : '???', 0, 20 * u, { size: 70 * u, font: FONTS.ui, weight: 900, color: '#c8102e', align: 'center' }); g.restore(); }
  shout(g, t, 'BE UNLUCKY. ON PURPOSE.', { at: 0.1, y: E.H * 0.12, size: V(80, 74), dur: 4.4, shake: 0 }); shout(g, t, 'WINNER. $500.', { at: 6.2, y: E.H * 0.12, size: V(100, 92), color: '#6fe6a0', shake: 0 });
  shout(g, t, "YOU CAN'T LOSE.", { at: 9.6, y: E.H * 0.88, size: V(96, 90), color: '#ff5a4a', shake: 0 }); });

// v06 — you call him. He doesn't pick up.
S2('v06', (g, t) => { g.fillStyle = '#0c0e18'; g.fillRect(0, 0, E.W, E.H); phone(g, t, { at: 0.05, who: 'DEV 🍕', msgs: [{ at: 0.3, txt: 'Calling...', from: 'me' }, { at: 1.4, txt: 'No answer.' }] }); });

// v07 — the watch hits hour 24. 16 million times luckier. That's the second Powerball. That's the meteor. That's the empty road.
S2('v07', (g, t) => { const u = U(), red = t > 5 ? 1 : 0; darkGold(g, t, red); if (t < 5.6) { watchFace(g, t, { sec: secAngle(t, 50), glowK: 0.8 }); shout(g, t, 'HOUR 24', { at: 0.1, y: E.H * 0.12, size: V(110, 100), color: '#ffd23a', shake: 0 }); mult(g, t, '×16,777,216', 1.6); }
  else { const P = [['2ND POWERBALL', '1 IN 85 QUADRILLION', 5.7], ['THE METEOR', 'ONE STEP AWAY', 9.5], ['THE EMPTY ROAD', '', 10.6]];
    P.forEach(([a, b, at], k) => { const s = ease.outBack(prog(t, at, at + 0.35)); if (s <= 0) return; const x = E.W * (0.2 + k * 0.3), y = E.H * 0.5; g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = 'rgba(255,255,255,.08)'; rr(g, -260 * u, -200 * u, 520 * u, 400 * u, 24 * u); g.fill();
      text(g, a, 0, -40 * u, { size: 54 * u, font: FONTS.ui, weight: 900, color: k === 2 ? '#ff8a6a' : '#ffd23a', align: 'center' }); if (b) text(g, b, 0, 50 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center' }); g.restore(); }); } });

// ---------- hospital ----------
const HOSP = (st, s) => { SETS.hospital(st); };
const DEVBED = { of: DEV, x: -0.9, z: 0.5, r: FACE_X, y: 0.3, p: [[0, { hipA: 85, hipB: 85, knA: 5, knB: 5, drop: 0.36, spine: [-10, 0], shA: [30, 15], elA: 80 }]] };
S3('h11', HOSP, [{ ...DEVBED, e: [[0, 'sad'], [4.9, 'talk'], [6.5, 'smile']] }, { of: ME, x: -0.2, z: -0.8, r: FACE_Z + 0.3, p: [[0, 'stand']], e: [[0, 'worried'], [5.5, 'sad']] }],
  C([1.9, 1.6, 3.5], [-0.4, 1.0, 0.2]), C([1.65, 1.55, 3.1], [-0.4, 1.0, 0.2]),
  (g, t) => { shout(g, t, 'BROKEN ARM · 3 STITCHES', { at: 0.9, y: E.H * 0.14, size: V(76, 70), dur: 4.8, shake: 0 }); shout(g, t, '"DUDE. I THINK I\'M CURSED."', { at: 4.9, y: E.H * 0.86, size: V(78, 72), shake: 0 }); },
  { mood: 'indoor', build: (st, s) => { steelBed(st, -1.6, 0.5); cast(s.A[0], 'B'); } });

S3('h12', HOSP, [{ ...DEVBED, e: [[0, 'smile'], [3.5, 'calm']] }],
  C([0.7, 1.25, 1.9], [-0.85, 1.05, 0.5]), C([0.6, 1.23, 1.75], [-0.85, 1.05, 0.5]),
  (g, t) => { shout(g, t, 'WARM. DENTED.', { at: 1.9, y: E.H * 0.86, size: V(84, 78), dur: 5.6, shake: 0 }); shout(g, t, 'HE HELD IT THE WHOLE RIDE.', { at: 5.6, y: E.H * 0.86, size: V(76, 70), shake: 0 }); },
  { mood: 'indoor', build: (st, s) => { steelBed(st, -1.6, 0.5); cast(s.A[0], 'B'); s.can = can(1); st.add(s.can); }, fx: (s, t) => held(s.can, s.A[0], 'A', 0.05) });
