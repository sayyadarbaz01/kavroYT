// shots/03_mid.js — 2:04-3:58: Rule 3 (stars), the forgetting clue, the science, Thursday's joyride, going viral, Tank, the police briefing.
import { walkPose } from '../toon/toon.js';
import { vehicle, flashLights, copCar, sportsCar, dirtBike, jetSki, golfCart, parkingGarage, palm } from '../toon/sets3d.js';
import { DEV, TANK, COP, KIDS } from '../toon/cast3d.js';
import { ME, NURSE, fig, shot, face, cam, C, push, pose, expr, held, bandFlash, vignette, shout, THREE, box, cyl, E, V, ease, prog, clamp, lerp, SETS, scr, headOf } from './_lib.js';
import { card, title, stamp, cross, check, person, phoneIcon } from './_info.js';
import { U, FACE_Z, FACE_NZ, FACE_X, FACE_NX, bill, stars, placeStars, hud, tag, pin, phone, respawnWipe, text, FONTS, alpha, rr } from './00_kit.js';

const star2d = (g, x, y, r, fill) => { g.save(); g.fillStyle = fill; g.strokeStyle = '#141218'; g.lineWidth = r * 0.12; g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr2 = i % 2 ? r * 0.45 : r; g.lineTo(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2); } g.closePath(); g.fill(); g.stroke(); g.restore(); };
const dumpster = (st, x, z) => { st.add(box(1.8, 1.2, 1.0, '#2f6a4a', x, 0.74, z, { outline: 0.012 })); st.add(box(1.85, 0.08, 1.05, '#24523a', x, 1.38, z)); };
const sitGround = { hipA: 88, hipB: 88, knA: 5, knB: 5, drop: 0.62, shA: [-25, 28], shB: [-25, 28], elA: 15, elB: 15 };

// B01 — Rule 3: stars
card('b01', 'dark', (g, t, i, u, cx, cy) => { title(g, t, 'RULE 3', cy - 280 * u, { size: 70, color: '#b48cff' }); title(g, t, 'BREAK A LAW, GET STARS', cy - 180 * u, { size: 66, at: 0.3 });
  for (let k = 0; k < 5; k++) { const on = t > 1.0 + k * 0.5; star2d(g, cx + (k - 2) * 170 * u, cy + 10 * u, 70 * u, on ? '#ffd23a' : 'rgba(255,255,255,.15)'); }
  title(g, t, 'ONE STAR = ONE COP', cy + 170 * u, { size: 52, at: 4.4 }); title(g, t, 'FIVE STARS = HELICOPTERS', cy + 250 * u, { size: 52, at: 6.0, color: '#ff8a6a' }); });
// B02 — out of their sight long enough, and they forget you
shot('b02', (st, s) => { SETS.miami(st); dumpster(st, -1.8, -0.85); s.me = fig(st, ME, -0.4, -0.9, FACE_NX + 0.5, 'crouch', 'worried'); s.st = stars(st, 3); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'crouch']]); expr(s.me, t, [[0, 'worried'], [2.8, 'smirk']]); cam(T, s, t, i, C([2.4, 1.4, 3.4], [-1.2, 0.9, -0.6]), C([1.9, 1.3, 2.8], [-1.0, 0.9, -0.7]));
    placeStars(s.st, s.me, s.stage.camera, t + 2, 0, 0.2, { y: 1.55, fade: 1 - ease.inOut(prog(t, 1.4, 3.4)) }); }, (g, t) => tag(g, t, 'JUST LIKE IN THE GAME', 0.4));
// B03 — remember that rule (whisper, dark)
shot('b03', (st, s) => { SETS.miami(st); s.me = fig(st, ME, 0, 0.3, FACE_Z + 0.3, 'stand', 'smirk'); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand']]); expr(s.me, t, [[0, 'smirk']]); const f = face(s.me, 1.25, 0.2, 1.47); cam(T, s, t, i, f, push(f, 0.15)); },
  (g, t) => { vignette(g, '#05060c', 0.7); g.save(); g.globalAlpha = 0.3; g.fillStyle = '#0a1020'; g.fillRect(0, 0, E.W, E.H); g.restore(); stamp(g, t, 'READ THE FINE PRINT', E.W / 2, E.H * 0.85, { at: 0.8, size: 64 }); });
// B04 — Wednesday: skipping school on the beach
shot('b04', (st, s) => { SETS.beach(st); st.add(box(1.0, 0.01, 1.9, '#e8453c', 0.3, 0.008, 2.2, { cast: false })); s.me = fig(st, ME, 0.3, 2.0, FACE_NZ); s.me.userData.noSnap = true; },
  (s, t, i, T) => { pose(s.me, t, [[0, sitGround]]); expr(s.me, t, [[0, 'calm']]); cam(T, s, t, i, C([4.6, 1.4, 5.4], [0, 0.6, 0.5]), C([4.0, 1.3, 4.6], [0, 0.6, 0.5])); }, (g, t) => tag(g, t, 'WEDNESDAY', 0.2));
// B05 — Dev texts: "hey who is this lol"
shot('b05', (st, s) => { SETS.beach(st, { sunset: true }); s.me = fig(st, ME, 0.3, 2.0, FACE_NZ); s.me.userData.noSnap = true; },
  (s, t, i, T) => { pose(s.me, t, [[0, sitGround]]); cam(T, s, t, i, C([4.0, 1.4, 4.6], [0, 0.6, 0.5])); },
  (g, t) => { g.save(); g.globalAlpha = 0.45; g.fillStyle = '#05060c'; g.fillRect(0, 0, E.W, E.H); g.restore(); phone(g, t, { who: 'DEV', at: 0.1, msgs: [{ from: 'them', txt: 'hey who is this lol', at: 0.9 }] }); }, { mood: 'sunset' });
// B06 — you laugh. Dev's always been terrible with names.
shot('b06', (st, s) => { SETS.beach(st, { sunset: true }); s.me = fig(st, ME, 0.3, 2.0, FACE_NZ + 0.8); s.me.userData.noSnap = true; },
  (s, t, i, T) => { pose(s.me, t, [[0, { ...sitGround, shA: [40, 10], elA: 120 }]]); expr(s.me, t, [[0, 'joy'], [1.5, 'smile']]); const f = face(s.me, 1.4, 0.2, 0.95); cam(T, s, t, i, f, push(f, 0.08)); }, null, { mood: 'sunset' });
// B07 — how real is any of this?
card('b07', 'blue', (g, t, i, u, cx, cy) => { title(g, t, 'HOW REAL IS ANY OF THIS?', cy - 80 * u, { size: 80 }); title(g, t, 'WEIRDLY... RULE 3 IS THE MOST REAL', cy + 60 * u, { size: 56, at: 2.2, color: '#6fe6ff' }); });
// B08 — 1885: Hermann Ebbinghaus and the nonsense words
card('b08', 'leather', (g, t, i, u, cx, cy) => { const fx = cx - 380 * u, fy = cy - 20 * u; g.fillStyle = '#3a2410'; rr(g, fx - 170 * u, fy - 220 * u, 340 * u, 440 * u, 16 * u); g.fill(); g.fillStyle = '#d8c4a0'; rr(g, fx - 145 * u, fy - 195 * u, 290 * u, 390 * u, 10 * u); g.fill();
  person(g, fx, fy + 140 * u, 300 * u, '#6a5034'); title(g, t, 'HERMANN EBBINGHAUS', fy + 280 * u, { size: 40, x: fx, color: '#f2c890' }); title(g, t, '1885', cy - 300 * u, { size: 90, color: '#f2c890' });
  const words = ['DAX', 'BOK', 'YAT', 'ZOF', 'KIB', 'MUV', 'PEL', 'ROJ']; words.forEach((w, k) => { const a = clamp((t - 0.6 - k * 0.3) * 3) * (1 - clamp((t - 6 - k * 0.35) * 1.5));
    if (a > 0) text(g, w, cx + 220 * u + (k % 2) * 220 * u, cy - 150 * u + Math.floor(k / 2) * 100 * u, { size: 72 * u, font: FONTS.ui, weight: 900, color: '#fff3d6', align: 'center', alpha: a }); });
  title(g, t, 'MEMORIZED NONSENSE WORDS... AND TIMED HOW FAST HE FORGOT', cy + 300 * u, { size: 40, at: 1.5 }); });
// B09 — the forgetting curve
card('b09', 'blue', (g, t, i, u, cx, cy) => { title(g, t, 'THE FORGETTING CURVE', cy - 300 * u, { size: 70, color: '#6fe6ff' }); const x0 = cx - 500 * u, y0 = cy + 180 * u, w = 1000 * u, h = 380 * u;
  g.strokeStyle = '#ffffff'; g.lineWidth = 6 * u; g.beginPath(); g.moveTo(x0, y0 - h); g.lineTo(x0, y0); g.lineTo(x0 + w, y0); g.stroke(); text(g, 'MEMORY', x0 - 20 * u, y0 - h - 30 * u, { size: 34 * u, font: FONTS.ui, weight: 900, color: '#cfe8ff' }); text(g, '1 DAY', x0 + w * 0.3, y0 + 45 * u, { size: 34 * u, font: FONTS.ui, weight: 900, color: '#cfe8ff', align: 'center' });
  const k = ease.inOut(prog(t, 0.3, 2.0)); g.strokeStyle = '#ffd23a'; g.lineWidth = 10 * u; g.beginPath(); for (let j = 0; j <= 60 * k; j++) { const p = j / 60, yy = y0 - h * (0.18 + 0.82 * Math.exp(-p * 6)); j ? g.lineTo(x0 + w * p, yy) : g.moveTo(x0 + w * p, yy); } g.stroke();
  title(g, t, 'OUT OF SIGHT = OUT OF MIND', cy + 290 * u, { size: 58, at: 2.2, color: '#ffd23a' }); });
// B10 — real cops: plate reader cameras
shot('b10', (st, s) => { SETS.miami(st); const pole = new THREE.Group(); pole.add(cyl(0.08, 0.1, 4.5, '#3a3a48', 0, 2.25, 0)); pole.add(box(0.5, 0.3, 0.35, '#20222a', 0.2, 4.4, 0.2, { outline: 0.008 })); pole.add(box(0.06, 0.12, 0.12, '#ff3a3a', 0.47, 4.4, 0.32)); pole.position.set(0, 0.14, 0.8); st.add(pole);
    s.car = vehicle(-24, 2.6, 0, { body: '#3a6ea5' }); st.add(s.car); },
  (s, t, i, T) => { s.car.position.x = -24 + t * 6.5; cam(T, s, t, i, C([5.5, 2.4, 9.0], [0, 2.4, 2.4]), C([4.8, 2.3, 8.4], [0, 2.2, 2.4])); s.p = scr(s, [s.car.position.x + 2.2, 0.6, 2.6]); },
  (g, t, i, s) => { const u = U(), on = s.p && s.p[0] > E.W * 0.25 && s.p[0] < E.W * 0.85; if (on) { g.save(); g.strokeStyle = '#5fff7a'; g.lineWidth = 5 * u; g.strokeRect(s.p[0] - 70 * u, s.p[1] - 40 * u, 140 * u, 80 * u);
    text(g, 'PLATE READ ✓', s.p[0], s.p[1] - 70 * u, { size: 36 * u, font: FONTS.ui, weight: 900, color: '#5fff7a', align: 'center', stroke: 6 * u, strokeColor: '#05060c' }); g.restore(); } tag(g, t, 'REAL LIFE: PLATE READERS', 0.2); });
// B11 — but in your world, it does... (ominous)
shot('b11', (st, s) => { SETS.miami(st, { sunset: true }); s.me = fig(st, ME, 0, 0.3, FACE_Z + 0.2); s.st = stars(st, 2); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand'], [1.8, { head: [0, 14] }]]); expr(s.me, t, [[0, 'smirk'], [2.4, 'worried']]); cam(T, s, t, i, C([1.4, 0.7, 3.2], [0, 1.7, 0.2]), C([1.0, 0.85, 2.4], [0, 1.8, 0.3]));
    placeStars(s.st, s.me, s.stage.camera, t + 2, 0, 0.2, { blink: t > 2 ? 7 : 0 }); }, (g, t) => vignette(g, '#05060c', 0.5 + 0.3 * prog(t, 2, 4.5)), { mood: 'sunset' });

// ---------- Thursday: the best day of your life ----------
const brickell = (st) => { SETS.miami(st); st.add(parkingGarage(-9, 4, { w: 12, d: 12, floors: 4 })); st.add(parkingGarage(9, 4, { w: 12, d: 12, floors: 4 })); };
const riderPose = { hipA: 70, hipB: 70, knA: 90, knB: 90, drop: 0.2, shA: [70, 14], shB: [70, 14], elA: 30, elB: 30, spine: [20, 0] };
const ride = (s, bx, by) => { s.bike.position.set(bx, by, 4); s.me.position.set(bx - 0.25, by + 0.32, 4); };
shot('c01', (st, s) => { brickell(st); }, (s, t, i, T) => T.drone(s.stage.camera, t, { target: [0, 6, 4], dur: i.dur, from: { h: 40, r: 46, a: -0.6 }, to: { h: 24, r: 30, a: 0.1 } }), (g, t) => tag(g, t, 'THURSDAY · BRICKELL', 0.2));
shot('c02', (st, s) => { brickell(st); s.bike = dirtBike(-12, 4, 0); st.add(s.bike); s.me = fig(st, ME, -12, 4, FACE_X); s.me.userData.noSnap = true; },
  (s, t, i, T) => { const x = -13 + t * 6.0, y = 12.18 + (x > -3 ? Math.max(-2, 3.0 * ((x + 3) / 5) - 3.2 * ((x + 3) / 5) ** 2) : 0); ride(s, x, y); s.me.setPose(riderPose); expr(s.me, t, [[0, 'determined'], [1.8, 'joy']]);
    cam(T, s, t, i, C([-6, 13.5, -6], [-4, 12.6, 4]), C([1, 13.8, -7], [2, 12.8, 4])); }, (g, t) => shout(g, t, 'NO PARACHUTE', { at: 0.4, y: E.H * 0.15, size: V(70, 64), shake: 0 }));
shot('c03', (st, s) => { brickell(st); s.bike = dirtBike(1, 4, 0); st.add(s.bike); s.me = fig(st, ME, 1, 4, FACE_X); s.me.userData.noSnap = true; },
  (s, t, i, T) => { const k = clamp(t / 0.9); ride(s, 1.5 + k * 0.6, 12.6 - k * k * 11); s.me.setPose('fall'); expr(s.me, t, [[0, 'shocked']]); cam(T, s, t, i, C([0, 13.5, -8], [1.6, 8, 4]), C([0, 12.5, -8], [1.6, 4, 4])); },
  (g, t) => { shout(g, t, 'MISS.', { at: 0.05, y: E.H * 0.2 }); respawnWipe(g, t, 0.5, 0.8); });
shot('c04', (st, s) => { brickell(st); s.bike = dirtBike(-12, 4, 0); st.add(s.bike); s.me = fig(st, ME, -12, 4, FACE_X); s.me.userData.noSnap = true; },
  (s, t, i, T) => { const x = Math.min(6, -4 + t * 7.0), air = x > -3 && x < 3, y = 12.18 + (air ? 3.0 * ((x + 3) / 6) * (1 - (x + 3) / 6) * 1.2 : 0); ride(s, x, y); s.me.setPose(t > 1.5 ? { ...riderPose, shA: [10, 150], shB: [10, 150] } : riderPose); expr(s.me, t, [[0, 'determined'], [1.0, 'joy']]);
    cam(T, s, t, i, C([0, 13.2, -6.5], [0, 12.6, 4])); }, (g, t) => shout(g, t, 'SECOND TRY', { at: 0.1, y: E.H * 0.15, size: V(80, 70), shake: 0 }));
// C05 — jet ski across Biscayne Bay, three stars; then under a pier
shot('c05', (st, s) => { SETS.beach(st); const pier = new THREE.Group(); pier.add(box(4, 0.3, 30, '#8a6a4a', 0, 1.6, 0, { outline: 0.012 })); for (let z = -14; z <= 14; z += 3) for (const x of [-1.8, 1.8]) pier.add(cyl(0.15, 0.15, 3, '#6a4a30', x, 0.3, z)); pier.position.set(24, 0, -14); st.add(pier);
    s.ski = jetSki(-30, -10, 0); st.add(s.ski); s.me = fig(st, ME, -30, -10, FACE_X); s.me.userData.noSnap = true; s.st = stars(st, 3); },
  (s, t, i, T) => { const under = t > 3.6; const x = under ? 24 : -30 + t * 14, z = under ? -12 : -10; s.ski.position.set(x, 0.05 + Math.sin(t * 9) * 0.04, z); s.ski.rotation.z = under ? 0 : Math.sin(t * 7) * 0.05; s.me.position.set(x - 0.3, 0.33, z); s.me.setPose(under ? { ...riderPose, spine: [30, 0], head: [0, -10] } : riderPose); expr(s.me, t, [[0, 'joy'], [3.6, 'smirk']]);
    if (under) cam(T, s, t, i, C([30, 1.1, -6], [24, 1.0, -12])); else cam(T, s, t, i, C([x + 7, 2.2, -2], [x, 0.8, -10])); placeStars(s.st, s.me, s.stage.camera, t, 0.8, 0.2, { y: 1.75, fade: under ? 1 - prog(t, 4.2, 6.3) : 1 }); },
  (g, t) => { if (t < 3.6) shout(g, t, '60 MPH', { at: 0.3, y: E.H * 0.15, size: V(80, 70), dur: 3.4 }); else tag(g, t, 'UNDER THE PIER', 3.7); });
// C06 — golf cart onto the field during Dolphins practice, two stars, gone in 30 seconds
shot('c06', (st, s) => { SETS.field(st); s.cart = golfCart(-20, 0, 0); st.add(s.cart); s.me = fig(st, ME, -20, 0, FACE_X); s.me.userData.noSnap = true; s.st = stars(st, 2);
    s.pl = [0, 1, 2, 3].map((k) => fig(st, { top: 'tee', color: '#0b8a9a', hair: k % 2 ? 'spiky' : 'none' }, 4 + k * 2.2, -4 - (k % 2) * 1.5, FACE_Z + 0.4, 'stand', 'surprised')); },
  (s, t, i, T) => { const x = -20 + t * 6.5; s.cart.position.x = x; s.me.position.set(x - 0.4, 0.5, 0); s.me.setPose({ hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [55, 10], shB: [55, 10], elA: 60, elB: 60 }); expr(s.me, t, [[0, 'joy']]);
    s.pl.forEach((p, k) => { pose(p, t + k * 0.3, [[0, 'stand'], [1.2 + k * 0.2, 'shocked']]); expr(p, t, [[0, 'surprised'], [1.4, 'shocked']]); });
    cam(T, s, t, i, C([x + 6, 2.2, 9], [x + 2, 1, 0]), C([x + 4, 2.0, 8], [x + 2, 1, 0])); placeStars(s.st, s.me, s.stage.camera, t, 3.0, 0.2, { y: 1.75, fade: 1 - prog(t, 4.6, 5.6) }); },
  (g, t) => { tag(g, t, 'DOLPHINS PRACTICE', 0.2); if (t > 4.7) shout(g, t, 'GONE IN 30 SECONDS', { at: 4.7, y: E.H * 0.85, size: V(70, 64), shake: 0 }); });
// C07 — every respawn comes with a bill: $41,000
shot('c07', (st, s) => { SETS.miami(st, { hospital: true }); st.hospitalDoors[0].position.x = -1.86; st.hospitalDoors[1].position.x = 1.86; s.nurse = fig(st, NURSE, -0.3, -1.0, FACE_Z + 0.3, 'holdFront', 'sleepy'); s.me = fig(st, ME, 1.1, 0.2, FACE_NX - 0.8, 'stand', 'worried');
    s.b = bill(1.4); st.add(s.b); },
  (s, t, i, T) => { pose(s.nurse, t, [[0, { shA: [70, 10], elA: 20 }]]); expr(s.nurse, t, [[0, 'sleepy']]); held(s.b, s.nurse, 'A', 0.05); s.b.rotation.set(0, FACE_Z + 0.3 + Math.PI / 2, 0); pose(s.me, t, [[0, 'stand'], [2.6, 'facepalm']]); expr(s.me, t, [[0, 'worried'], [2.6, 'sad']]);
    cam(T, s, t, i, C([2.4, 1.5, 3.3], [0.2, 1.2, -0.5]), C([2.0, 1.5, 2.8], [0.2, 1.2, -0.5])); }, (g, t) => hud(g, t, { at: 0, hp: 1, money: 41000, moneyAt: 2.2 }));
// C08 — "That's not how hospitals work, sweetie." She knows you by name now.
shot('c08', (st, s) => { SETS.miami(st, { hospital: true }); st.hospitalDoors[0].position.x = -1.86; st.hospitalDoors[1].position.x = 1.86; s.nurse = fig(st, NURSE, 0, -1.1, FACE_Z + 0.2, 'crossArms', 'sleepy'); },
  (s, t, i, T) => { pose(s.nurse, t, [[0, 'crossArms'], [2.1, 'wave']]); expr(s.nurse, t, [[0, 'sleepy'], [2.1, 'smile']]); const f = face(s.nurse, 1.6, 0.3, 1.45); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => { if (t > 2.1) shout(g, t, 'HI KIP.', { at: 2.2, y: E.H * 0.85, size: V(80, 72), shake: 0 }); });
// C09 — somebody posts the dirt bike jump: 40 million views
card('c09', 'dark', (g, t, i, u, cx, cy) => { phoneIcon(g, cx - 380 * u, cy, 420 * u, '#1a1a22'); title(g, t, '#RESPAWNKID', cy - 230 * u, { size: 96, x: cx + 230 * u, color: '#ff5a4a' });
  const n = Math.round(40000000 * ease.inOut(prog(t, 0.6, 3.2))); text(g, n.toLocaleString('en-US'), cx + 230 * u, cy + 20 * u, { size: 110 * u, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'center' }); title(g, t, 'VIEWS BY DINNER', cy + 170 * u, { size: 56, x: cx + 230 * u, at: 2.4 }); });
// C10 — that night: a white Lamborghini outside your house; Tank
shot('c10', (st, s) => { SETS.suburbNight(st); s.car = sportsCar(-20, 3.0, 0); st.add(s.car); s.tank = fig(st, TANK, -1.5, 5.0, FACE_NZ - 0.2, 'stand', 'smirk'); s.tank.visible = false; s.me = fig(st, ME, -0.4, -0.2, FACE_Z + 0.4, 'stand', 'surprised'); },
  (s, t, i, T) => { const k = ease.out(clamp(t / 2.4)); s.car.position.x = lerp(-20, 0.4, k); s.tank.visible = t > 3.2; pose(s.tank, t, [[0, 'stand'], [4.2, 'point']]); expr(s.tank, t, [[0, 'smirk']]); pose(s.me, t, [[0, 'stand']]); expr(s.me, t, [[0, 'surprised']]);
    cam(T, s, t, i, C([-4.5, 1.6, 7.6], [0.2, 1.0, 1.4]), C([-3.6, 1.5, 6.8], [0.4, 1.0, 1.6])); s.p = scr(s, [-1.5, 2.25, 5.0]); },
  (g, t) => { if (t > 3.6) pin(g, t, 'TANK · 6M FOLLOWERS', E.W * 0.66, E.H * 0.08, 3.6); });
// C11 — "Fifty grand. One stream. You hit five stars live, and you get away."
shot('c11', (st, s) => { SETS.suburbNight(st); s.car = sportsCar(0.4, 3.0, 0); st.add(s.car); s.tank = fig(st, TANK, 1.6, 2.2, FACE_NX + 0.6, 'point', 'smirk'); },
  (s, t, i, T) => { pose(s.tank, t, [[0, 'explain']]); expr(s.tank, t, [[0, 'smirk'], [2.5, 'happy']]); const f = face(s.tank, 1.6, -0.3, 1.47); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => { const u = U(); [['$50,000', 0.2], ['1 STREAM', 1.2], ['5 STARS · LIVE', 2.2]].forEach(([str, at], k) => shout(g, t, str, { at, x: E.W * 0.2, y: E.H * (0.3 + k * 0.17), size: V(76, 68), shake: 0, color: k ? '#ffffff' : '#8fe08a' })); });
// C12 — fifty grand pays the hospital. So you say yes.
shot('c12', (st, s) => { SETS.suburbNight(st); s.me = fig(st, ME, -0.4, -0.2, FACE_Z + 0.6, 'stand', 'worried'); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand'], [1.6, { head: [0, -12] }], [2.0, { head: [0, 8] }], [2.4, { head: [0, -10] }], [2.8, 'stand']]); expr(s.me, t, [[0, 'worried'], [1.8, 'determined']]); const f = face(s.me, 1.5, 0.2, 1.45); cam(T, s, t, i, f, push(f, 0.08)); },
  (g, t) => { hud(g, t, { at: 0, hp: 1, money: 41000, moneyAt: 0, moneyFrom: 41000 }); shout(g, t, 'DEAL.', { at: 2.0, y: E.H * 0.85, shake: 0 }); });
// C13 — police briefing: "Whatever you do, don't lose sight of that kid."
shot('c13', (st, s) => { const a = SETS.classroom(st); s.cops = a.seats.slice(0, 6).map(([x, z], k) => fig(st, COP, x - 0.62, z, Math.PI / 2, 'sitDesk', 'neutral')); s.cap = fig(st, COP, 1.2, -3.7, -Math.PI / 2 + 0.4, 'point', 'determined'); },
  (s, t, i, T) => { s.cops.forEach((c, k) => { c.position.y = 0; c.userData.noSnap = true; expr(c, t + k, [[0, 'neutral'], [4.6, 'surprised']]); }); pose(s.cap, t, [[0, 'explain'], [4.8, 'point']]); expr(s.cap, t, [[0, 'determined']]);
    cam(T, s, t, i, C([4.5, 2.6, 4.5], [0, 1.4, -3]), C([3.6, 2.3, 3.6], [0, 1.5, -3.2])); },
  (g, t) => { const u = U(), a = ease.out(prog(t, 0.6, 1.0)); g.save(); g.globalAlpha = a; g.fillStyle = '#0c0e18'; rr(g, E.W * 0.35, E.H * 0.1, E.W * 0.3, E.H * 0.32, 12 * u); g.fill();
    g.fillStyle = '#f6f3ec'; g.beginPath(); g.arc(E.W * 0.5, E.H * 0.22, 60 * u, 0, 7); g.fill(); g.fillStyle = '#1b1b20'; g.beginPath(); g.arc(E.W * 0.5, E.H * 0.2, 62 * u, Math.PI, 0); g.fill();
    text(g, 'PERSON OF INTEREST', E.W * 0.5, E.H * 0.37, { size: 34 * u, font: FONTS.ui, weight: 900, color: '#ff5a4a', align: 'center' }); g.restore(); tag(g, t, 'MIAMI POLICE', 0.2); }, { mood: 'indoor' });
