// shots/02_discovery.js — 0:33-4:20: mirror, Dev, hallway, dog, vending machine, the rule, money test, cleaner, Dev at lunch,
// more tests, library + Maya, the pen (-22), the door (-6,000), Dev's door.
import { ME, E, V, ease, prog, clamp, lerp, held, box, cyl, THREE, vignette } from './_lib.js';
import { card } from './_info.js';
import { S } from './_spec.js';
import { R412, STUDENTS, DEV, caption, rankTag, roll, fmt, text, FONTS, alpha, rr, glow } from './_rank.js';
import { phone as phoneUI } from './_kit.js';
import { dog, tray, phone, mopBucket, mop, notebook } from '../toon/sets_campus.js';
import { sportsCar } from '../toon/sets3d.js';
import { SCI } from '../toon/cast3d.js';

export const FZ = -Math.PI / 2, FNZ = Math.PI / 2, FX = 0, FNX = Math.PI;
export const KIPN = 6914377020, DEVN = 2201456088;
export const MAYA = { top: 'hoodie', color: '#3f8a4a', hair: 'pony', legs: '#2a2a33' };          // co-lead: high ponytail, green bomber
export const CLEANER = { top: 'tee', color: '#5a7a9a', hair: 'bun', legs: '#3a4a5a' };
export const RICH = { top: 'suit', color: '#e8e2d4', hair: 'spiky', glasses: true, legs: '#c8c0b0' };
export const RA = { top: 'tee', color: '#e8453c', hair: 'curly', legs: '#2a3a6a' };
export const GUITAR = { top: 'hoodie', color: '#8a6ad6', hair: 'pony' };
export const SPAG = { top: 'tee', color: '#f4f2ec', hair: 'curly' };
export const BARISTA = { top: 'tee', color: '#2f6a4a', hair: 'spiky', legs: '#3a2a24' };
export const LOUD = { top: 'hoodie', color: '#ffd23f', hair: 'spiky', glasses: true };
export const FRESH = { top: 'tee', color: '#ff9ab0', hair: 'pony' };
export const ATH = { top: 'tee', color: '#3a6ad8', hair: 'none' };
const ST = STUDENTS;
const T = (k, n, col, at, o) => [k, n, col, at, o];
const nothing = (at) => ['NOTHING.', at, { color: '#9aa4b0', size: V(110, 100) }];

// ---------- morning: mirror, Dev ----------
S('d01', { set: 'bedroom', cast: { me: [ME, 0, -0.6, FZ] },
  poses: { me: [[0, { shA: [72, 8], elA: 150, head: [0, 4] }]] }, exprs: { me: [[0, 'sleepy'], [3.0, 'surprised'], [4.6, 'shocked']] },
  b: (st, s) => { s.brush = cyl(0.008, 0.008, 0.16, '#5fb0ff'); st.add(s.brush); }, u: (s, t) => { held(s.brush, s.F.me, 'A', 0.06); s.brush.rotation.z = Math.sin(t * 18) * 0.3 * (t < 3); },
  cam: { f: 'me', d: 1.5, h: 1.52, side: 0, lh: 1.62, push: 0.08 }, tags: [T('me', KIPN, 'bad', 3.1, { up: 0.32, k: 0.09 })],
  o: (g, t) => { const u = E.H / 1080; g.save(); g.strokeStyle = '#e8e2d4'; g.lineWidth = 40 * u; rr(g, 120 * u, 40 * u, E.W - 240 * u, E.H - 80 * u, 60 * u); g.stroke();
    g.globalAlpha = 0.08; g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(E.W * 0.62, 60 * u); g.lineTo(E.W * 0.72, 60 * u); g.lineTo(E.W * 0.5, E.H); g.lineTo(E.W * 0.4, E.H); g.fill(); g.restore(); } });
S('d02', { set: 'bedroom', cast: { me: [ME, 0, -0.6, FZ] },
  poses: { me: [[0, 'stand'], [0.2, { shA: [10, 160], elA: 20 }], [0.7, { shA: [10, 110], elA: 40 }], [1.2, { shA: [10, 160], elA: 20 }], [1.7, { shA: [20, 130], elA: 30 }], [2.6, { shA: [40, 60], elA: 60 }]] },
  exprs: { me: [[0, 'determined'], [1.6, 'confused']] }, cam: { f: 'me', d: 2.4, h: 1.4, side: 0.4, lh: 1.5 },
  o: (g, t, i, s) => { const sway = Math.sin(t * 6) * 0.12 * clamp(t / 0.5); const f = s.F.me; const ox = f.position.x; f.position.x = ox + sway; rankTag(g, t, s, f, KIPN, { col: 'bad', hy: 1.47, up: 0.42, k: 0.1 }); f.position.x = ox;
    caption(g, t, 'LIKE A BALLOON', { at: 1.6 }); } });
S('d03', { set: 'bedroom', cast: { me: [ME, 1.2, -0.4, FZ + 0.5], dev: [DEV, -3.4, 1.6, FX] },
  walk: { dev: [-3.4, 1.6, -0.6, 0.2, 0, 2.8] }, poses: { dev: [[0, { head: [0, -6] }]], me: [[0, 'stand']] },
  exprs: { me: [[0, 'neutral'], [3.3, 'surprised']], dev: [[0, 'happy']] },
  carry: [{ prop: () => box(0.2, 0.3, 0.08, '#ffd23f', 0, 0, 0, { outline: 0.004 }), by: 'dev', arms: 'holdFront' }],
  cam: { p: [0.6, 1.5, 4.6], l: [-1.0, 1.2, 0], p2: [0.2, 1.45, 3.6], l2: [-0.4, 1.25, 0] }, tags: [T('dev', DEVN, 'mid', 3.65), T('me', KIPN, 'bad', 0.1, { k: 0.06 })] });
S('d04', { set: 'bedroom', cast: { me: [ME, 0.75, 0, FNX + 0.25], dev: [DEV, -0.75, 0, FX - 0.25] },
  poses: { dev: [[0, { shA: [50, 10], elA: 100, head: [0, -4] }]] }, exprs: { dev: [[0, 'confused']], me: [[0, 'neutral'], [1.9, 'smile']] },
  cam: { p: [0.1, 1.5, 2.9], l: [0, 1.4, 0], p2: [0.1, 1.48, 2.5] }, tags: [T('dev', DEVN, 'mid', 0), T('me', KIPN, 'bad', 0)] });

// ---------- hallway, dog, vending machine ----------
const hallCast = { me: [ME, 0.2, 6, FNZ], ra: [RA, -0.8, 1.5, FZ + 0.4], s1: [ST[0], 1.1, -1.5, FZ - 0.3], s2: [ST[1], -1.0, -4.5, FZ], s3: [ST[4], 0.9, -7, FX + 0.6] };
S('d05', { set: 'dormHall', cast: hallCast, walk: { me: [0.2, 3.6, 0.0, 1.6, 0, 4.8, 4.6] }, poses: { ra: [[0, 'explain']] }, exprs: { ra: [[0, 'smile']] },
  cam: { p: [0.6, 1.65, 6.6], l: [-0.1, 1.5, -2], p2: [0.4, 1.6, 5.0] },
  tags: [T('s1', 5104882310, 'mid', 0.3), T('s2', 3002117456, 'mid', 0.45), T('s3', 1457003219, 'mid', 0.6), T('ra', 788201334, 'mid', 2.3, { pulse: 1 })] });
S('d06', { set: 'dormHall', cast: { me: [ME, 0.8, 0.5, FNX - 0.3], g: [GUITAR, -1.3, -0.4, FZ + 0.9, 'sit', 'happy'] },
  b: (st, s) => { s.gtr = new THREE.Group(); s.gtr.add(box(0.36, 0.44, 0.1, '#c8783a', 0, 0, 0, { outline: 0.006 })); s.gtr.add(box(0.06, 0.5, 0.04, '#5a3a24', 0, 0.45, 0)); st.add(s.gtr); s.F.g.position.y = 0; s.F.g.userData.noSnap = true; },
  u: (s, t) => { const f = s.F.g; s.gtr.position.set(f.position.x + 0.15, 0.7, f.position.z + 0.18); s.gtr.rotation.set(0, f.rotation.y, 0.9); },
  poses: { g: [[0, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [50, 20], elA: 80, shB: [40, 10], elB: 60, head: [10, 6] }]] },
  cam: { p: [0.1, 1.45, 4.6], l: [-0.3, 1.0, 0.2], p2: [0.0, 1.42, 4.0] }, tags: [T('g', 3302117456, 'mid', 1.9)], caps: [['2:00 A.M.', 0.3, { y: E.H * 0.14, color: '#b48cff' }]],
  o: (g, t) => { for (let k = 0; k < 4; k++) { const ph = (t * 0.7 + k / 4) % 1; text(g, '♪', E.W * (0.32 + k * 0.05), E.H * (0.55 - ph * 0.3), { size: V(56, 52), color: '#ffd23f', alpha: Math.sin(ph * Math.PI), font: FONTS.ui, weight: 900 }); } } });
S('d07', { set: 'park', cast: { me: [ME, 0.9, 0.3, FNX, 'crouch', 'happy'] },
  b: (st, s) => { s.dog = dog(-0.1, 0.3, 0); st.add(s.dog); }, u: (s, t) => { s.dog.userData.tail.rotation.x = 0.6 + Math.sin(t * 16) * 0.5; },
  exprs: { me: [[0, 'smile'], [2.5, 'happy']] }, cam: { p: [0.4, 1.15, 3.6], l: [0.4, 0.75, 0.3], p2: [0.4, 1.1, 3.2] },
  caps: [['NO NUMBER', 0.6, { y: E.H * 0.85, color: '#5fe08a' }], ['LUCKY DOG.', 2.6, {}]] });
S('d08', { set: 'dormHall', cast: { me: [ME, -0.4, -10.6, FNZ + 0.5, 'crossArms', 'angry'] },
  cam: { p: [-1.3, 1.55, -7.4], l: [0.4, 1.15, -12.0], p2: [-1.2, 1.5, -8.0] }, exprs: { me: [[0, 'angry'], [3.4, 'smirk']] },
  o: (g, t, i, s) => { const fake = { position: { x: 0.9, y: 0.6, z: -12.4 }, visible: true }; rankTag(g, t, s, fake, 8000000001, { at: 2.3, col: 'bad', hy: 1.47, k: 0.1, pulse: 1 }); caption(g, t, 'IT ATE MY DOLLAR', { at: 0.4, dur: 2.2 }); } });

// ---------- the rule ----------
card('d09', 'dark', (g, t, info, u, cx, cy) => {
  caption(g, t, 'THE RULE', { at: 0.1, y: cy - 330 * u, size: 70 * u, color: '#9aa4b0' });
  const row = (str, n, col, at, y) => { const a = ease.out(prog(t, at, at + 0.3)); if (a <= 0) return; g.save(); g.globalAlpha = a; text(g, n, cx - 40 * u, y, { size: 96 * u, font: FONTS.ui, weight: 900, color: col, align: 'right', glow: 30 * u, glowColor: alpha(col, 0.6) }); text(g, str, cx + 20 * u, y, { size: 60 * u, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'left' }); g.restore(); };
  row('= BEST HUMAN ALIVE', '#1', '#ffd23f', 2.0, cy - 170 * u); row('= THE WORST', '#8,000,000,000', '#ff4a4a', 4.0, cy);
  caption(g, t, 'EVERYONE GETS RANKED', { at: 5.7, y: cy + 210 * u, size: 84 * u, color: '#5fe08a' });
});
const parkCrowd = { me: [ME, 0, 0.6, FX], a: [ST[2], -3, 1.2, FX], b: [ST[3], 3.5, 0.1, FNX], c: [ST[5], 6, 1.0, FNX], d: [ST[7], -6, 0.0, FX] };
S('d10', { set: 'park', cast: parkCrowd, walk: { me: [-1, 0.6, 2.5, 0.6], a: [-4, 1.2, -0.5, 1.2], b: [4.5, 0.1, 1.0, 0.1], c: [7, 1.0, 3.5, 1.0], d: [-7, 0, -3.5, 0] },
  exprs: { me: [[0, 'worried']] }, cam: { p: [0.8, 2.2, 7.5], l: [0.5, 1.3, 0.5], p2: [1.4, 2.0, 6.5] },
  tags: [T('a', 4419002651, 'mid', 0.2), T('b', 2650981007, 'mid', 0.3), T('c', 6120004433, 'mid', 0.4), T('d', 912334870, 'mid', 0.5), T('me', KIPN, 'bad', 0.6)],
  caps: [['NOBODY ELSE CAN SEE IT', 0.2, { dur: 1.3 }], ['NOBODY EXPLAINS IT', 1.5, {}]] });
S('d11', { set: 'park', cast: { me: [ME, 0, 0.5, FZ + 0.3, 'think', 'thinking'] }, exprs: { me: [[0, 'thinking'], [1.6, 'determined']] },
  cam: { f: 'me', d: 1.6, h: 1.5, side: 0.3, lh: 1.5 }, caps: [['$ MONEY?', 0.2, { y: E.H * 0.2, color: '#8fe08a', size: V(120, 110) }]] });

// ---------- money test: rich kid, cleaner ----------
S('d12', { set: 'street', cast: { r: [RICH, 0.6, 4.3, FZ + 0.6, 'crossArms', 'smirk'], me: [ME, -3.5, 3.6, FX + 0.2] },
  b: (st, s) => { const car = sportsCar(0, 2.4, 0.18); st.add(car); for (const x of [-2.6, 0, 2.6]) st.add(box(0.1, 0.01, 4.2, '#f4f4f4', x - 1.3, 0.012, 2.4, { cast: false })); },
  cam: { p: [-7.5, 2.3, 5.3], l: [0, 0.9, 2.6], p2: [-6.5, 2.1, 5.3] }, tags: [T('r', 1904550118, 'bad', 3.4, { pulse: 1 })], caps: [['NOT GREAT.', 5.6, {}]] });
const DH = 'diningHall';
S('d13', { set: DH, cast: { c: [CLEANER, 1.0, 1.0, FZ + 0.4] }, poses: { c: [[0, { spine: [14, 0], head: [0, -8] }]] }, exprs: { c: [[0, 'smile']] },
  b: (st) => st.add(mopBucket(2.0, 1.4)),
  carry: [{ prop: () => { const g = new THREE.Group(), m = mop(); m.rotation.z = 0.5; m.position.set(0.17, -0.31, 0); g.add(m); return g; }, by: 'c', both: false, arms: { shA: [38, 4], elA: 40, shB: [20, 8], elB: 30 }, ry: (t) => Math.sin(t * 3) * 0.25 }],
  cam: { f: 'c', d: 2.4, h: 1.45, side: 0.6, lh: 1.25, push: 0.12 }, tags: [T('c', 9844, 'good', 1.6, { pulse: 1 })] });
S('d14', { set: DH, cast: { c: [CLEANER, 3.2, 4.4, FNX + 0.6], a: [ST[0], -4.5, -0.42, FZ, 'sitDesk'], b: [ST[1], 0, -0.42, FZ, 'sitDesk'], d: [ST[2], 4.5, -0.42, FZ, 'sitDesk'], e: [ST[6], -4.5, 3.0, FNZ, 'sitDesk'], f: [ST[7], 0, 3.0, FNZ, 'sitDesk'] },
  b: (st, s) => { for (const k of ['a', 'b', 'd']) s.F[k].position.z = -1.98 + 0.0; for (const k of ['e', 'f']) s.F[k].position.z = 2.98; },
  cam: { p: [0.5, 3.6, 9.0], l: [0.5, 0.9, 0.5], p2: [0.5, 3.8, 9.8] },
  tags: [T('a', 4102330981, 'mid', 0.1), T('b', 2950117004, 'mid', 0.2), T('d', 5530220018, 'mid', 0.3), T('e', 1880441207, 'mid', 0.4), T('f', 3770095112, 'mid', 0.5), T('c', 9844, 'good', 0.8, { pulse: 1 })] });
S('d15', { set: DH, cast: { me: [ME, 0, -1.98, FZ, 'sitDesk', 'neutral'] }, poses: { me: [[0, 'sitDesk'], [1.4, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [45, 10], elA: 120, shB: [30, 10], elB: 60, head: [0, -16] }]] },
  exprs: { me: [[0, 'thinking'], [3.4, 'confused']] }, b: (st, s) => { s.ph = phone(); st.add(s.ph); }, u: (s) => { held(s.ph, s.F.me, 'A', 0.06); s.ph.rotation.set(-0.5, 0, 0); },
  cam: { f: 'me', d: 1.7, h: 1.35, side: 0.35, lh: 1.05 }, caps: [['NOT MONEY', 0.1, { dur: 1.5, color: '#ff5a4a' }]],
  o: (g, t) => { phoneUI(g, t, { cx: 0.8, who: 'Celebrity Live', at: 1.6, off: 99, msgs: [{ txt: '⭐ Movie star', at: 2.0 }, { txt: '⭐ Pop singer', at: 2.4 }, { txt: '⭐ Athlete', at: 2.8 }], notif: { at: 3.4, title: 'RANK', txt: 'no number' } }); } });
S('d16', { set: DH, cast: { me: [ME, -0.5, -1.98, FZ, 'sitDesk'], dev: [DEV, 2.8, -0.2, FNX] }, walk: { dev: { path: [[3.4, 0.3], [1.68, -0.42]], t0: 0, t1: 1.0, spd: 5 } },
  poses: { me: [[0, 'sitDesk'], [1.1, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [50, 30], elA: 50, shB: [30, 20], elB: 40 }]], dev: [[0, 'sitDesk']] },
  carry: [{ prop: () => tray(), by: 'dev', to: 1.0 }],
  u: (s, t) => { const f = s.F.dev; if (t >= 1.0) { f.position.set(lerp(1.68, 0.6, ease.inOut(clamp((t - 1.0) / 0.5))), 0, -0.42); f.rotation.y = FNZ; f.userData.walking = t < 1.5; s.carry[0].o.position.set(0.6, 0.8, -1.0); s.carry[0].o.rotation.set(0, 0, 0); } },
  exprs: { me: [[0, 'surprised']], dev: [[0, 'happy']] }, cam: { p: [2.6, 1.5, -3.6], l: [0, 1.0, -1.1], p2: [2.2, 1.45, -3.2] }, tags: [T('dev', DEVN, 'mid', 0.2), T('me', KIPN, 'bad', 0.2)] });
const lunch = { me: [ME, -0.5, -1.98, FZ, 'sitDesk'], dev: [DEV, 0.6, -0.42, FNZ, 'sitDesk'] };
const lunchB = (st, s) => { s.tr = tray(); st.add(s.tr); s.tr.position.set(0.6, 0.8, -1.0); s.tr2 = tray('#e8a03a'); st.add(s.tr2); s.tr2.position.set(-0.5, 0.8, -1.45); };
S('d17', { set: DH, cast: lunch, b: lunchB, poses: { dev: [[0, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [60, 10], elA: 20, shB: [20, 10], elB: 40, head: [0, 6] }]] }, exprs: { dev: [[0, 'confused']], me: [[0, 'neutral']] },
  cam: { f: 'dev', d: 2.1, h: 1.3, side: -0.3, lh: 1.15 }, tags: [T('dev', DEVN, 'mid', 0.1)], caps: [['2.2 BILLION', 3.9, {}]] });
S('d18', { set: DH, cast: lunch, b: lunchB, exprs: { dev: [[0, 'thinking'], [2.3, 'neutral'], [3.3, 'smirk']], me: [[0, 'worried']] },
  cams: [[0, { f: 'dev', d: 1.5, h: 1.3, side: -0.25, lh: 1.08 }], [1.0, { f: 'me', d: 1.5, h: 1.3, side: 0.25, lh: 1.08 }], [2.3, { f: 'dev', d: 1.1, h: 1.22, side: 0, lh: 1.1, push: 0.05 }]],
  tags: [T('dev', DEVN, 'mid', 0)], caps: [['MID.', 2.4, { size: V(120, 110) }]] });
S('d19', { set: DH, cast: lunch, b: (st, s) => { lunchB(st, s); s.fry = box(0.012, 0.09, 0.012, '#ffd23f'); st.add(s.fry); }, u: (s) => held(s.fry, s.F.dev, 'A', 0.03),
  poses: { dev: [[0, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [60, 12], elA: 140, head: [0, 6] }]] }, exprs: { dev: [[0, 'happy'], [1.0, 'curious']], me: [[0, 'worried'], [2.0, 'sad']] },
  cams: [[0, { f: 'dev', d: 1.4, h: 1.28, side: -0.25, lh: 1.1 }], [1.9, { f: 'me', d: 1.2, h: 1.25, side: 0.2, lh: 1.12, push: 0.08 }]], tags: [T('me', KIPN, 'bad', 1.9, { k: 0.07 })] });

// ---------- more tests ----------
S('d20', { set: 'classroom', cast: { p: [SCI, 0, -3.6, FZ, 'explain'] }, poses: { p: [[0, 'explain'], [2.5, 'point'], [4.5, 'explain']] }, exprs: { p: [[0, 'smile']] },
  cam: { f: 'p', d: 3.0, h: 1.55, side: 0.5, lh: 1.45, push: 0.15 }, tags: [T('p', 1450882104, 'bad', 2.0, { pulse: 1 })], caps: [['3 DEGREES · WROTE THE TEXTBOOK', 1.4, { y: E.H * 0.88, size: V(60, 56) }]] });
S('d21', { set: 'gym', cast: { a: [ATH, -1.5, 0, FZ + 0.3, 'cheer'], b: [{ ...ATH, color: '#e8453c' }, 0, -0.6, FZ, 'handsUp'], c: [{ ...ATH, color: '#2a2a34', hair: 'pony' }, 1.6, 0.2, FZ - 0.3, 'ready'] },
  poses: { a: [[0, 'cheer'], [1, 'holdFront'], [2, 'cheer']], b: [[0, 'handsUp'], [1.2, 'holdFront'], [2.4, 'handsUp']] }, exprs: { a: [[0, 'determined']], b: [[0, 'determined']], c: [[0, 'smirk']] },
  cam: { p: [0, 1.5, 5.2], l: [0, 1.3, 0], p2: [0, 1.45, 4.4] }, tags: [T('a', 4980225113, 'mid', 1.3), T('b', 3310662097, 'mid', 1.45), T('c', 6020114587, 'mid', 1.6)], caps: [['NOT LOOKS', 0.1, { dur: 1.2 }]] });
S('d22', { set: DH, cast: { g: [SPAG, 0.4, 1.0, FZ + 0.3] }, exprs: { g: [[0, 'happy']] }, poses: { g: [[0, 'relaxed'], [1.2, 'wave']] },
  b: (st, s) => { const f = s.F.g; [[0.06, 1.18], [-0.08, 1.05], [0.02, 0.95]].forEach(([x, y]) => { const m = cyl(0.04, 0.04, 0.01, '#c8302c', x, y, 0.17, { rot: [Math.PI / 2, 0, 0] }); f.add(m); }); },
  cam: { f: 'g', d: 2.0, h: 1.45, side: 0.3, lh: 1.3, push: 0.12 }, tags: [T('g', 80000, 'good', 1.5, { pulse: 1 })] });
S('d23', { set: ['diningHall', { cafe: true }], cast: { b: [BARISTA, 0.5, -4.3, FZ, 'holdFront'], me: [ME, -1.4, -2.4, FNZ + 0.5] }, exprs: { b: [[0, 'happy']], me: [[0, 'neutral'], [4.6, 'deadpan']] },
  b: (st, s) => { s.cup = cyl(0.05, 0.04, 0.13, '#f4f4f4', 0, 0, 0, { outline: 0.004 }); st.add(s.cup); }, u: (s, t) => held(s.cup, s.F.b, 'A', 0.06),
  cams: [[0, { f: 'b', d: 2.3, h: 1.5, side: 0.4, lh: 1.4 }], [4.4, { p: [0.75, 1.42, -3.55], l: [0.62, 1.15, -4.0], subj: ['b'] }]], tags: [T('b', 640000, 'good', 1.6, { pulse: 1 })],
  o: (g, t, i, s) => { if (t > 4.4) { const u = E.H / 1080, a = ease.out(prog(t, 4.5, 4.8)); text(g, '"KYP"', E.W * 0.5, E.H * 0.55, { size: 120 * u, font: FONTS.ui, weight: 900, color: '#2a2a34', alpha: a, stroke: 8 * u, strokeColor: '#ffffff' }); } } });
S('d24', { set: 'busInside', cast: { l: [LOUD, 0.78, 0.44, FNZ, 'sitDesk'], me: [ME, -0.78, -0.51, FNZ, 'sitDesk'] },
  b: (st, s) => { s.spk = box(0.22, 0.1, 0.08, '#141418', 0, 0, 0, { outline: 0.005 }); st.add(s.spk); }, u: (s, t) => { held(s.spk, s.F.l, 'A', 0.04); s.spk.scale.setScalar(1 + 0.08 * Math.abs(Math.sin(t * 14))); },
  poses: { l: [[0, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [60, 30], elA: 60, head: [0, 10] }]], me: [[0, 'sitDesk']] }, exprs: { l: [[0, 'happy']], me: [[0, 'angry'], [6.0, 'smirk']] },
  cam: { p: [0, 1.9, -2.6], l: [0, 1.0, 0.2], p2: [0.1, 1.85, -2.1] }, tags: [T('l', 7990004121, 'bad', 3.0, { pulse: 1 })], caps: [['NO HEADPHONES', 0.3, { y: E.H * 0.14, dur: 2.6 }]],
  o: (g, t) => { for (let k = 0; k < 6; k++) { const ph = (t * 0.9 + k / 6) % 1; text(g, k % 2 ? '♪' : '♫', E.W * (0.6 + Math.sin(k * 2) * 0.1), E.H * (0.6 - ph * 0.4), { size: V(64, 60), color: '#ff5aa0', alpha: Math.sin(ph * Math.PI), font: FONTS.ui, weight: 900 }); } } });

// ---------- Dev: do me ----------
const dorm2 = { me: [ME, 0.8, 0, FNX + 0.3], dev: [DEV, -0.9, -0.2, FX - 0.3, 'stand'] };
const devBed = (st, s) => { s.F.dev.position.set(-1.0, 0, -0.3); s.F.dev.rotation.y = FZ + 0.6; s.F.me.position.set(0.6, 0, -0.4); s.F.me.rotation.y = FNX + 0.9; };
S('d25', { set: 'bedroom', cast: dorm2, b: devBed, poses: { dev: [[0, 'stand'], [2.5, { shA: [20, 60], elA: 30, shB: [20, 60], elB: 30 }]] }, exprs: { dev: [[0, 'happy'], [3.5, 'curious']], me: [[0, 'neutral']] },
  cam: { two: ['me', 'dev'], d: 3.2, h: 1.5, lh: 1.4, a: FZ, push: 0.1 }, tags: [T('dev', DEVN, 'mid', 0.1)] });
S('d26', { set: 'bedroom', cast: dorm2, b: devBed, poses: { me: [[0, 'shrug'], [2.3, 'explain']] }, exprs: { me: [[0, 'worried'], [2.3, 'determined']] },
  cam: { f: 'me', d: 1.7, h: 1.5, side: -0.3, lh: 1.45, push: 0.1 }, caps: [['THE SCORE', 2.6, { dur: 1.4, color: '#ffd23f' }], ['BUT NOT THE GAME', 4.0, {}]] });
S('d27', { set: 'bedroom', cast: dorm2, b: devBed, poses: { dev: [[0, { spine: [-10, 0], head: [0, 14], shA: [5, 6], shB: [5, 6] }]] }, exprs: { dev: [[0, 'determined'], [1.2, 'surprised'], [3.0, 'sad']], me: [[0, 'deadpan']] },
  cams: [[0, { f: 'dev', d: 2.6, h: 1.4, side: 0.2, lh: 1.2 }], [2.9, { f: 'me', d: 1.6, h: 1.5, side: -0.3, lh: 1.45 }]], tags: [T('dev', DEVN, 'mid', 0)], caps: [['NO.', 1.1, { dur: 1.5 }]] });

// ---------- library, Maya ----------
const LIB = 'library';
S('d28', { set: LIB, cast: { me: [ME, 4.5, 5.0, FNZ] }, walk: { me: [4.5, 5.2, 3.6, 2.8, 0, 4.4, 4.6] }, exprs: { me: [[0, 'neutral'], [3.2, 'worried']] },
  cam: { p: [2.0, 1.55, -3.2], l: [3.6, 1.3, 3.4], p2: [2.2, 1.5, -2.6] }, tags: [T('me', KIPN, 'bad', 0.3)] });
const mayaSeat = { maya: [MAYA, 1.7, -2.05, FZ, 'sitDesk'] };
S('d29', { set: LIB, cast: { ...mayaSeat, s1: [ST[2], -0.7, -2.05, FZ, 'sitDesk'], s2: [ST[5], 0.5, 2.65, FNZ, 'sitDesk'] }, b: (st, s) => { s.nb = notebook(); st.add(s.nb); s.nb.position.set(1.7, 0.8, -1.5); },
  poses: { maya: [[0, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [55, 10], elA: 90, shB: [50, 10], elB: 100, head: [0, -10] }]] }, exprs: { maya: [[0, 'neutral']] },
  cams: [[0, { p: [0.6, 1.9, 4.8], l: [1.2, 1.0, -1.5] }], [3.2, { f: 'maya', d: 1.7, h: 1.3, side: 0.3, lh: 1.12, push: 0.12 }]], tags: [T('maya', 31207, 'good', 5.0, { pulse: 1 })], caps: [['THURSDAY · 3RD ROW', 1.5, { y: E.H * 0.14, dur: 1.8, size: V(60, 56) }]] });
card('d30', 'dark', (g, t, info, u, cx, cy) => {
  const a = ease.out(prog(t, 0.1, 0.4)); text(g, 'MAYA', cx - 420 * u, cy - 170 * u, { size: 64 * u, font: FONTS.ui, weight: 900, color: '#ffffff', alpha: a, align: 'center' }); text(g, 'YOU', cx + 420 * u, cy - 170 * u, { size: 64 * u, font: FONTS.ui, weight: 900, color: '#ffffff', alpha: a, align: 'center' });
  const pillS = (str, x, col, at) => { const k = ease.outBack(prog(t, at, at + 0.35)); if (k <= 0) return; g.save(); g.translate(x, cy); g.scale(k, k); g.font = `900 ${84 * u}px "${FONTS.ui}"`; const w = g.measureText(str).width + 60 * u, h = 110 * u; glow(g, 0, 0, w * 0.7, col, 0.3); g.fillStyle = 'rgba(14,14,22,.85)'; rr(g, -w / 2, -h / 2, w, h, 30 * u); g.fill(); g.strokeStyle = col; g.lineWidth = 6 * u; rr(g, -w / 2, -h / 2, w, h, 30 * u); g.stroke(); text(g, str, 0, 0, { size: 84 * u, font: FONTS.ui, weight: 900, color: col, align: 'center' }); g.restore(); };
  pillS('#31,207', cx - 420 * u, '#5fe08a', 0.3); pillS('#6,914,377,020', cx + 420 * u, '#ff4a4a', 4.7);
  caption(g, t, 'TOP 32,000', { at: 1.6, y: cy + 150 * u, x: cx - 420 * u, size: 56 * u, color: '#5fe08a' }); caption(g, t, 'BOTTOM BILLION', { at: 4.9, y: cy + 150 * u, x: cx + 420 * u, size: 56 * u, color: '#ff4a4a' });
  caption(g, t, 'WAY OUT OF YOUR LEAGUE', { at: 7.0, y: cy + 330 * u, size: 84 * u });
});
S('d31', { set: LIB, cast: { me: [ME, 4.6, 3.6, FNX + 0.6], dev: [DEV, 5.4, 3.0, FNX + 1.2] },
  poses: { dev: [[0, 'point'], [3.4, 'shrug'], [6.6, 'point']], me: [[0, 'stand'], [1.6, { shA: [10, 20], shB: [10, 20], head: [20, -6] }]] }, exprs: { dev: [[0, 'happy'], [3.4, 'confused'], [6.6, 'determined']], me: [[0, 'worried']] },
  cams: [[0, { two: ['me', 'dev'], d: 3.0, h: 1.5, lh: 1.4, push: 0.15 }]], tags: [T('dev', DEVN, 'mid', 0), T('me', KIPN, 'bad', 0)] });
S('d32', { set: LIB, cast: { me: [ME, 4.8, 4.6, FNX], fr: [FRESH, 2.6, 4.0, FZ + 0.4] }, walk: { me: [4.8, 4.6, 3.4, 4.3, 0, 1.2, 4.6] },
  poses: { fr: [[0, 'stand'], [1.2, { shA: [30, 10], elA: 40, head: [0, -18] }], [3.2, 'stand']], me: [[0, 'stand'], [1.3, 'crouch'], [2.4, { shA: [60, 10], elA: 20 }], [3.6, 'stand']] },
  b: (st, s) => { s.pen = cyl(0.008, 0.008, 0.14, '#2a5ad8', 3.0, 0.02, 4.25, { rot: [0, 0, Math.PI / 2] }); st.add(s.pen); },
  u: (s, t) => { if (t > 2.6) held(s.pen, s.F.me, 'A', 0); if (t > 3.2) held(s.pen, s.F.fr, 'A', 0); }, exprs: { fr: [[0, 'surprised'], [3.2, 'smile']], me: [[0, 'neutral']] },
  cam: { p: [1.4, 1.5, 8.2], l: [3.1, 0.9, 4.2], p2: [1.6, 1.45, 7.6] }, tags: [T('fr', 5502113990, 'mid', 0.2)] });
S('d33', { set: LIB, cast: { me: [ME, 3.4, 4.3, FZ + 0.2] }, exprs: { me: [[0, 'neutral'], [2.0, 'surprised'], [4.8, 'awe']] },
  cam: { f: 'me', d: 1.5, h: 1.6, side: 0.1, lh: 1.72, push: 0.12 }, tags: [T('me', (t) => (t < 4.8 ? KIPN + (t > 2.0 && t < 4.6 ? Math.round(Math.sin(t * 30) * 9) : 0) : roll(t, KIPN, KIPN - 22, 4.8, 5.4)), 'bad', 0, { up: 0.3, k: 0.1, max: 96 })],
  caps: [['-22', 5.0, { y: E.H * 0.82, color: '#5fe08a', size: V(140, 130) }]] });
S('d34', { set: LIB, cast: { ...mayaSeat, me: [ME, 2.55, -2.8, FZ - 0.5] }, poses: { me: [[0, 'wave'], [0.8, 'stand'], [6.2, { shA: [30, 30], elA: 100, shB: [10, 10], head: [0, -6] }]], maya: [[0, 'sitDesk']] },
  exprs: { maya: [[0, 'surprised'], [1.0, 'smile'], [6.6, 'happy']], me: [[0, 'smile'], [3.0, 'worried'], [6.2, 'shocked']] },
  cams: [[0, { p: [2.4, 1.7, 1.6], l: [2.1, 1.2, -2.2], p2: [2.4, 1.65, 1.0] }], [3.0, { f: 'maya', d: 1.6, h: 1.3, side: -0.3, lh: 1.12 }], [6.0, { p: [2.45, 1.6, 0.4], l: [2.55, 1.4, -2.8], p2: [2.45, 1.58, 0.0] }]],
  tags: [T('maya', 31207, 'good', 0)], caps: [['SECTION. ECON. ME.', 6.4, { color: '#ffd23f' }]] });
S('d35', { set: 'dormHall', cast: { me: [ME, 0, 2, FZ, 'stand', 'determined'] }, poses: { me: [[0, 'stand'], [2.2, 'ready'], [4.6, 'point']] }, exprs: { me: [[0, 'awe'], [2.0, 'determined']] },
  cam: { f: 'me', d: 2.0, h: 1.4, side: 0.3, lh: 1.5, push: 0.18 }, tags: [T('me', KIPN - 22, 'bad', 0)], caps: [['IT CAN MOVE', 2.3, { color: '#5fe08a' }]] });

// ---------- trying ----------
S('d36', { set: 'gym', cast: { me: [ME, 0, 0, FZ, 'handsUp', 'determined'] }, poses: { me: [[0, 'handsUp'], [0.5, 'holdFront'], [1.0, 'handsUp']] },
  b: (st, s) => { s.bar = cyl(0.025, 0.025, 1.6, '#3a3a44', 0, 0, 0, { rot: [0, 0, Math.PI / 2] }); for (const x of [-0.7, 0.7]) s.bar.add(cyl(0.18, 0.18, 0.08, '#141418', 0, x, 0)); st.add(s.bar); }, u: (s) => { held(s.bar, s.F.me, 'A', 0); s.bar.position.x = 0; },
  cam: { f: 'me', d: 2.6, h: 1.4, side: 0.2, lh: 1.3 }, tags: [T('me', KIPN - 22, 'bad', 0)], caps: [nothing(1.25)] });
card('d37', 'blue', (g, t, info, u, cx, cy) => { const a = ease.outBack(prog(t, 0.1, 0.45)); g.save(); g.translate(cx - 200 * u, cy); g.rotate(-0.05); g.scale(a, a); g.fillStyle = '#fbfaf4'; rr(g, -260 * u, -330 * u, 520 * u, 660 * u, 12 * u); g.fill();
  g.strokeStyle = '#9aa4c0'; g.lineWidth = 4 * u; for (let k = 0; k < 10; k++) { g.beginPath(); g.moveTo(-200 * u, -180 * u + k * 50 * u); g.lineTo(200 * u, -180 * u + k * 50 * u); g.stroke(); }
  text(g, 'A', 120 * u, -230 * u, { size: 180 * u, font: FONTS.ui, weight: 900, color: '#e8302c', align: 'center' }); g.restore();
  const n = fmt(KIPN - 22); g.save(); g.globalAlpha = ease.out(prog(t, 0.6, 0.9)); text(g, n, cx + 380 * u, cy, { size: 64 * u, font: FONTS.ui, weight: 900, color: '#ff4a4a', align: 'center' }); g.restore();
  caption(g, t, 'NOTHING.', { at: 1.55, y: cy + 400 * u, color: '#9aa4b0', size: 100 * u }); });
S('d38', { set: 'bedroom', cast: { me: [ME, 0.6, -0.4, FZ + 0.3, 'cheer', 'happy'], dev: [DEV, -1.2, 0, FZ - 0.4] }, poses: { me: [[0, 'cheer'], [2.4, 'shrug']], dev: [[0, 'stand'], [3.3, 'cheer'], [3.7, 'holdFront'], [4.1, 'cheer']] },
  exprs: { me: [[0, 'happy'], [2.4, 'sad']], dev: [[0, 'neutral'], [3.3, 'joy']] }, b: (st, s) => { s.F.me.parts && 0; },
  cam: { p: [0, 1.0, 3.8], l: [-0.2, 0.8, -0.2], p2: [-0.1, 1.2, 3.2], l2: [-0.2, 1.2, -0.2] }, caps: [['$$$ SNEAKERS', 0.3, { y: E.H * 0.14, dur: 2.1, color: '#8fe08a' }], nothing(2.5)] });

// ---------- the door ----------
const doorOpen = (s, k) => s.stage.doors && s.stage.doors.forEach((d) => (d.rotation.y = d.userData.s * k * 1.4));
S('d39', { set: DH, cast: { me: [ME, 7.2, 3.3, -2.0], a: [ST[0], 9.5, 2, FNX], b: [ST[3], 10.5, 1.6, FNX], c: [ST[5], 11.5, 2.3, FNX], d: [ST[1], 12.5, 1.8, FNX] },
  walk: Object.fromEntries(['a', 'b', 'c', 'd'].map((k, j) => { const x0 = 8.9 + j, x1 = -1.0 - j * 0.9, L = (x0 - 7.0) + 1.48 + (6.3 - x1); return [k, { path: [[x0, 1.7], [7.0, 1.7], [6.3, 0.5], [x1, 0.5]], t0: 0, t1: L / 1.7, spd: 5 }]; })),
  carry: ['a', 'b', 'c', 'd'].map((k, j) => ({ prop: () => tray(['#5a8ad8', '#e8a03a', '#5fb0a8', '#e8453c'][j]), by: k })),
  poses: { me: [[0, { shA: [70, 60], elA: 10 }]] }, exprs: { me: [[0, 'smile'], [4.8, 'shocked']] },
  u: (s) => doorOpen(s, 1),
  cams: [[0, { p: [4.2, 1.6, 6.4], l: [7.4, 1.2, 2.2] }], [4.4, { f: 'me', d: 1.7, h: 1.6, side: 0.2, lh: 1.65, push: 0.1 }]],
  tags: [T('me', (t) => roll(t, KIPN - 22, KIPN - 22 - 5907, 4.8, 5.8), 'bad', 0, { up: 0.32 })], caps: [['-5,907', 5.4, { y: E.H * 0.82, color: '#5fe08a', size: V(130, 120) }]] });
S('d40', { set: DH, cast: { me: [ME, 7.2, 3.3, -2.0] }, poses: { me: [[0, { shA: [70, 60], elA: 10 }], [2.6, 'shrug']] }, exprs: { me: [[0, 'smile'], [1.9, 'neutral'], [2.6, 'confused'], [3.8, 'thinking']] },
  u: (s) => doorOpen(s, 1), cam: { p: [4.4, 1.55, 6.8], l: [7.2, 1.2, 2.6], p2: [4.9, 1.5, 6.0] }, tags: [T('me', KIPN - 22 - 5907, 'bad', 0)], caps: [nothing(1.9), ['ONLY WHEN IT HELPED', 3.8, { color: '#5fe08a' }]] });
S('d41', { set: 'dormHall', cast: { me: [ME, 0.3, -3, FZ], dev: [DEV, -0.4, 3.4, FNZ] }, walk: { me: [0.3, -3, 0.2, 2.2, 0, 1.4, 9] },
  poses: { me: [[0, 'stand'], [1.4, 'cheer']] }, exprs: { me: [[0, 'joy']], dev: [[0, 'surprised']] },
  cam: { p: [0.6, 1.6, -4.6], l: [0, 1.3, 2.5], p2: [0.5, 1.55, -3.8] }, tags: [T('dev', DEVN, 'mid', 0)], caps: [['IT MOVED!', 1.4, { color: '#5fe08a' }]] });
S('d42', { set: 'dormHall', cast: { me: [ME, 0.45, 2.2, FNZ + 0.9], dev: [DEV, -0.45, 3.0, FZ + 0.6] }, poses: { me: [[0, 'explain'], [3.4, { shA: [60, 20], elA: 40, shB: [60, 20], elB: 40 }]], dev: [[0, 'crossArms'], [2.5, 'think']] },
  exprs: { me: [[0, 'happy']], dev: [[0, 'confused'], [2.5, 'thinking']] }, cam: { two: ['me', 'dev'], d: 2.6, h: 1.5, lh: 1.4, a: -1.2 }, tags: [T('dev', DEVN, 'mid', 0), T('me', KIPN - 5929, 'bad', 0)], caps: [['12 PEOPLE WITH TRAYS', 3.5, {}]] });
S('d43', { set: DH, cast: { dev: [DEV, 7.2, 3.3, -2.0, 'stand', 'determined'], me: [ME, 4.5, 5.0, FNZ - 1.2], a: [ST[2], 9.5, 0.2, FNX], b: [ST[6], 10.5, -0.3, FNX] },
  walk: { dev: [3.0, 5.0, 7.2, 3.3, 0, 1.6, 5.5], a: { path: [[10.5, 1.5], [7.0, 1.5], [6.3, 0.5], [3.4, 0.5]], t0: 3.5, t1: 7.2, spd: 5, enter: true }, b: { path: [[11.5, 1.5], [7.0, 1.5], [6.3, 0.5], [4.2, 0.5]], t0: 5.0, t1: 8.8, spd: 5, enter: true } },
  poses: { dev: [[0, { shA: [70, 60], elA: 10 }], [6.0, { shA: [70, 60], elA: 10, head: [0, -10] }]] }, exprs: { dev: [[0, 'determined'], [6.0, 'sleepy']], me: [[0, 'deadpan']] },
  u: (s, t) => { s.stage.doors[0].rotation.y = -1.4; s.stage.doors[1].rotation.y = 0; },
  cams: [[0, { p: [3.6, 1.6, 7.6], l: [6.8, 1.2, 2.6] }], [3.0, { p: [5.4, 2.6, 7.4], l: [8, 0.8, 0.6], p2: [5.6, 2.8, 8.0] }]],
  caps: [['10 MINUTES LATER', 3.2, { y: E.H * 0.14, color: '#ffd23f', size: V(70, 64) }]],
  o: (g, t) => { if (t > 3.0) { const u = E.H / 1080; g.save(); g.globalAlpha = 0.85; text(g, '⏱', E.W - 140 * u, 150 * u, { size: 90 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); g.restore(); } } });
S('d44', { set: DH, cast: { dev: [DEV, 7.2, 3.3, -2.0] }, poses: { dev: [[0, { shA: [70, 60], elA: 10 }], [2.6, 'shrug']] }, exprs: { dev: [[0, 'thinking'], [1.5, 'sad'], [2.6, 'angry']] },
  u: (s) => { s.stage.doors[0].rotation.y = -1.4; }, cam: { f: 'dev', d: 1.9, h: 1.6, side: 0.2, lh: 1.6, push: 0.1 }, tags: [T('dev', DEVN, 'mid', 0, { up: 0.3 })], caps: [['NOT EVEN A LITTLE', 1.5, { dur: 1.2 }], ['"IT\'S BROKEN."', 2.8, {}]] });
S('d45', { set: DH, cast: { me: [ME, 5.6, 4.0, FNX + 0.6], dev: [DEV, 7.0, 3.4, -2.0] }, poses: { me: [[0, 'explain']], dev: [[0, 'crossArms']] }, exprs: { me: [[0, 'smirk']], dev: [[0, 'angry']] },
  cam: { two: ['me', 'dev'], d: 3.0, h: 1.5, lh: 1.4, a: -1.75 }, tags: [T('me', KIPN - 5929, 'bad', 0)] });
