// shots/03_turn.js — 4:20-8:20: the realization (cleaner, #412, Maya), memories, the bus driver (#3), gaming the rule,
// Dev confronts, the group project (falls to 1.2B), tutoring with Maya + Priya, the snacks, ending question.
import { ME, E, V, ease, prog, clamp, lerp, held, box, cyl, THREE } from './_lib.js';
import { card } from './_info.js';
import { S } from './_spec.js';
import { R412, STUDENTS, DEV, caption, rankTag, roll, fmt, text, FONTS, alpha, rr, glow, lectureHall } from './_rank.js';
import { phone as phoneUI } from './_kit.js';
import { tray, phone, notebook } from '../toon/sets_campus.js';
import { SCI, GRANDMA } from '../toon/cast3d.js';

const FZ = -Math.PI / 2, FNZ = Math.PI / 2, FX = 0, FNX = Math.PI;
const KIPN = 6914371091, DEVN = 2201456088, KIPLOW = 1218004515;
const MAYA = { top: 'hoodie', color: '#3f8a4a', hair: 'pony', legs: '#2a2a33' };
const CLEANER = { top: 'tee', color: '#5a7a9a', hair: 'bun', legs: '#3a4a5a' };
const FRESH = { top: 'tee', color: '#ff9ab0', hair: 'pony' };
const ORDERLY = { ...R412, color: '#5fb0a8', legs: '#5fb0a8' };
const DRIVER = { top: 'suit', color: '#4a7ac8', hair: 'none', cap: true, capColor: '#2a4a7a', legs: '#1d2e5a' };
const OLDMAN = { top: 'cardigan', color: '#8a7a6a', hair: 'none', glasses: true, legs: '#4a4a52' };
const PRIYA = { top: 'cardigan', color: '#e8a0c0', hair: 'bun', glasses: true };
const ST = STUDENTS;
const T = (k, n, col, at, o) => [k, n, col, at, o];
const SIT = (o = {}) => ({ hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, ...o });
const U = () => E.H / 1080;
// fullscreen tint (memories, danger)
const tint = (g, col, a) => { g.save(); g.globalAlpha = a; g.fillStyle = col; g.fillRect(0, 0, E.W, E.H); g.restore(); };
const hall = (st, s) => { lectureHall(st, s, ME); s.me.visible = false; s.r412.visible = false; [0, 1, 2, 6].forEach((k) => (s.studs[k].visible = false)); };

// ---------- the realization ----------
S('d46', { set: ['bedroom', { night: true }], cast: { me: [ME, 0, -0.6, FZ, 'think', 'thinking'] }, poses: { me: [[0, 'think'], [2.4, 'shocked']] }, exprs: { me: [[0, 'thinking'], [2.4, 'shocked']] },
  cam: { f: 'me', d: 2.2, h: 1.45, side: 0.3, lh: 1.4, push: 0.2 }, caps: [['THAT NIGHT', 0.2, { y: E.H * 0.14, dur: 2, color: '#9fb4ff' }], ['SO MUCH WORSE', 2.5, {}]] });
card('d47', 'leather', (g, t, info, u, cx, cy) => {
  const a = ease.outBack(prog(t, 0.05, 0.4)); g.save(); g.translate(cx, cy); g.rotate(-0.02); g.scale(a, a); g.fillStyle = '#fbfaf4'; rr(g, -520 * u, -380 * u, 1040 * u, 760 * u, 14 * u); g.fill();
  g.strokeStyle = '#a8b4d0'; g.lineWidth = 3 * u; for (let k = 0; k < 11; k++) { g.beginPath(); g.moveTo(-470 * u, -260 * u + k * 60 * u); g.lineTo(470 * u, -260 * u + k * 60 * u); g.stroke(); }
  g.strokeStyle = '#e88080'; g.beginPath(); g.moveTo(-400 * u, -380 * u); g.lineTo(-400 * u, 380 * u); g.stroke(); g.restore();
  const line = (str, n, col, at, y) => { const k = prog(t, at, at + 0.5); if (k <= 0) return; g.save(); g.beginPath(); g.rect(cx - 370 * u, y - 50 * u, 900 * u * k, 100 * u); g.clip();
    text(g, str, cx - 360 * u, y, { size: 58 * u, font: FONTS.hand || FONTS.ui, weight: 800, color: '#22263a', align: 'left' }); text(g, n, cx + 470 * u, y, { size: 58 * u, font: FONTS.ui, weight: 900, color: col, align: 'right' }); g.restore(); };
  line('The cleaner', '#9,844', '#2fa05a', 2.1, cy - 200 * u); line('Holding the door', '-5,907', '#2fa05a', 2.8, cy - 60 * u); line('Rich kid (never tips)', '#1.9B', '#d83a3a', 3.7, cy + 80 * u);
});
card('d48', 'dark', (g, t, info, u, cx, cy) => {
  const a = ease.out(prog(t, 0.1, 0.4)); text(g, 'NOT WHAT YOU HAVE', cx, cy - 140 * u, { size: 90 * u, font: FONTS.ui, weight: 900, color: '#9aa4b0', alpha: a, align: 'center' });
  const k = ease.inOut(prog(t, 1.2, 1.6)); if (k > 0) { g.save(); g.strokeStyle = '#ff4a4a'; g.lineWidth = 12 * u; g.beginPath(); g.moveTo(cx - 470 * u, cy - 140 * u); g.lineTo(cx - 470 * u + 940 * u * k, cy - 140 * u); g.stroke(); g.restore(); }
  caption(g, t, 'WHAT YOU DO', { at: 2.3, y: cy + 40 * u, size: 110 * u, color: '#5fe08a' }); caption(g, t, 'FOR OTHER PEOPLE', { at: 2.6, y: cy + 170 * u, size: 110 * u, color: '#5fe08a' });
});
S('d49', { set: 'diningHall', cast: { c: [CLEANER, -0.55, 0.5, FX - 0.5], f: [FRESH, 0.55, 0.5, FNX + 0.5] },
  poses: { c: [[0, 'stand'], [1.5, 'holdFront'], [3.2, 'wave']], f: [[0, 'stand'], [2.2, 'holdFront'], [3.0, 'cheer']] }, exprs: { c: [[0, 'smile']], f: [[0, 'worried'], [2.4, 'joy']] },
  carry: [{ prop: () => box(0.14, 0.03, 0.1, '#5a3a24', 0, 0, 0, { outline: 0.004 }), by: [[0, 'c'], [2.6, 'f']], both: false, arms: { c: { shA: [50, 10], elA: 40 }, f: { shA: [50, 10], elA: 40 } }, from: 1.5 }],
  cam: { two: ['c', 'f'], d: 2.8, h: 1.5, lh: 1.35, push: 0.15 }, tags: [T('c', 9844, 'good', 0.3, { pulse: 1 }), T('f', 5502113990, 'mid', 0.5)], caps: [['EVERY DAY · 30 YEARS', 4.3, {}]] });
S('d50', { set: 'hospital', cast: { o: [ORDERLY, -5, 0.6, FX], g: [GRANDMA, 1.4, -0.6, FZ + 0.6] }, walk: { o: [-5, 0.6, 0.6, 0.0, 0, 4.6, 4.4] },
  poses: { o: [[0, 'holdFront'], [5.0, 'holdFront'], [7.0, 'explain']], g: [[0, 'relaxed'], [5.4, 'holdFront'], [8.4, 'wave']] }, exprs: { o: [[0, 'sleepy'], [5.0, 'smile']], g: [[0, 'neutral'], [5.4, 'happy']] },
  carry: [{ prop: (st, s) => { const g = new THREE.Group(); g.add(tray('#e8e8ec')); s.cup = cyl(0.04, 0.035, 0.1, '#f4f4f4', 0, 0.065, 0, { outline: 0.004 }); g.add(s.cup); return g; }, by: 'o' }],
  u: (s, t) => { const f = s.F.o; if (t > 4.6) f.rotation.y = FNX + 0.9; if (t >= 5.8) { if (s.cup.parent !== s.stage.scene) s.stage.scene.add(s.cup); held(s.cup, s.F.g, 'A', 0.05); } },
  cams: [[0, { p: [-0.6, 1.6, 4.8], l: [-0.9, 1.2, 0], p2: [0.3, 1.6, 4.8], l2: [0.3, 1.2, 0] }], [5.0, { two: ['o', 'g'], d: 2.8, h: 1.55, lh: 1.4, a: FZ, push: 0.12 }]],
  tags: [T('o', 412, 'gold', 0.4, { pulse: 1 })], caps: [['3:00 A.M.', 0.3, { y: E.H * 0.85, dur: 2.2, color: '#9fe0d8' }], ['NIGHT-SHIFT ORDERLY', 2.7, { dur: 2.2 }], ['NOT LAZY', 7.3, { dur: 1.0 }], ['EXHAUSTED FROM HELPING', 8.4, {}]] });
S('d51', { set: 'library', cast: { maya: [MAYA, 1.7, -2.05, FZ, 'sitDesk'], a: [ST[1], 0.5, -0.35, FNZ, 'sitDesk'], b: [ST[3], -0.7, 0.95, FZ, 'sitDesk'] },
  poses: { maya: [[0, SIT({ shA: [55, 30], elA: 60, shB: [50, 10], elB: 100, head: [0, -6] })], [2, SIT({ shA: [70, 60], elA: 30, shB: [50, 10], elB: 100 })], [4, SIT({ shA: [55, 30], elA: 60, shB: [50, 10], elB: 100, head: [10, 0] })]] },
  exprs: { maya: [[0, 'smile'], [4, 'happy']] }, b: (st, s) => { s.nb = notebook(true); st.add(s.nb); s.nb.position.set(1.7, 0.8, -1.2); },
  cams: [[0, { p: [4.5, 1.7, -0.4], l: [1.7, 1.0, -1.5], p2: [4.3, 1.65, -0.6] }], [5.6, { f: 'maya', d: 1.7, h: 1.3, side: 0.3, lh: 1.12, push: 0.1 }]],
  tags: [T('maya', 31207, 'good', 6.0, { pulse: 1 })], caps: [['FREE TUTORING · FRESHMEN', 4.0, { y: E.H * 0.14, dur: 1.8 }]] });

// ---------- memories ----------
S('d52', { set: 'bedroom', cast: { me: [ME, 0, -0.6, FZ, 'stand', 'worried'] }, poses: { me: [[0, 'stand'], [2.1, 'think'], [5.0, 'facepalm']] }, exprs: { me: [[0, 'worried'], [2.1, 'thinking'], [5.0, 'sad']] },
  cam: { f: 'me', d: 2.0, h: 1.5, side: 0.25, lh: 1.5, push: 0.25 }, tags: [T('me', KIPN, 'bad', 0.2, { up: 0.32 })], caps: [['19 YEARS', 3.0, { y: E.H * 0.85, dur: 2.2 }], ['WHAT HAVE YOU BEEN DOING?', 5.4, {}]] });
S('d53', { set: 'park', cast: { me: [ME, 4, 0.9, FNX], b: [ST[3], -3, 0.2, FX, 'carry', 'worried'] }, walk: { me: [4, 0.9, -4, 0.9, 0, 5.0, 6.5], b: [-3, 0.2, 0.2, 0.2, 0, 6.6, 3.2] },
  carry: [{ prop: () => box(0.62, 0.55, 0.5, '#c8955a', 0, 0, 0, { outline: 0.01 }), by: 'b', arms: { shA: [80, 30], elA: 30, shB: [80, 30], elB: 30 }, dy: 0.05 }],
  b: (st, s) => { s.ph = phone(); st.add(s.ph); }, u: (s) => held(s.ph, s.F.me, 'A', 0.06),
  cam: { p: [0.4, 1.6, 7.0], l: [0.2, 1.1, 0.5], p2: [0.2, 1.55, 6.4] }, caps: [['LATE?', 1.6, { y: E.H * 0.14, dur: 2.6 }], ["(YOU WEREN'T)", 4.4, {}]],
  o: (g, t) => { tint(g, '#c8a060', 0.18); } });
S('d54', { set: 'bedroom', cast: { me: [ME, 0, -0.6, FZ, 'phone', 'neutral'] }, exprs: { me: [[0, 'neutral'], [2.4, 'sad']] },
  b: (st, s) => { s.ph = phone(); st.add(s.ph); }, u: (s) => held(s.ph, s.F.me, 'A', 0.06),
  cam: { f: 'me', d: 2.3, h: 1.45, side: 0.4, lh: 1.35 }, caps: [['BORROWED NOTES · NEVER RETURNED', 2.6, {}]],
  o: (g, t) => { tint(g, '#c8a060', 0.14); phoneUI(g, t, { who: 'Mom', at: 0.1, off: 2.3, msgs: [{ txt: 'Missed call', at: 0.4 }, { txt: 'Missed call', at: 0.9 }, { txt: 'Call me back? ❤️', at: 1.4 }] }); } });
S('d55', { set: 'bedroom', cast: { me: [ME, 0.2, -0.6, FZ + 0.3, 'stand', 'sad'] },
  poses: { me: [[0, { spine: [16, 0], head: [0, -16], shA: [8, 8], shB: [8, 8] }]] }, exprs: { me: [[0, 'sad'], [4.2, 'worried']] },
  cam: { f: 'me', d: 2.9, h: 1.5, side: 0.4, lh: 1.3, push: 0.15 }, caps: [['NONE OF IT WAS EVIL', 0.2, { dur: 2.0 }], ['NOTHING TERRIBLE', 2.3, { dur: 1.8 }], ['JUST NOTHING AT ALL.', 4.2, {}]] });

// ---------- the bus driver: #3 ----------
const BUS = ['busInside', { night: true, rain: true }];
const busLit = (st) => { for (const z of [-4.6, -1.2]) { const l = new THREE.PointLight('#fff2d8', 7, 7, 1.2); l.position.set(0, 2.1, z); st.add(l); }
  st.scene.traverse((m) => { if (m.isMesh && Math.abs(m.position.x + 0.55) < 0.01 && Math.abs(m.position.z + 4.9) < 0.01) m.visible = false; }); }; // driver faces the aisle: hide his seat back
const driver = { d: [DRIVER, -0.55, -5.15, FZ + 1.0, 'sit', 'smile'] };
S('d56', { set: BUS, cast: { ...driver, me: [ME, 0.78, -1.5, FNZ, 'sitDesk'], a: [ST[1], -0.78, -2.45, FNZ, 'sitDesk'], b: [ST[6], -0.78, -0.55, FNZ, 'sitDesk'] },
  exprs: { me: [[0, 'sad'], [4.5, 'shocked']] }, b: busLit, cams: [[0, { p: [0.05, 1.95, 1.5], l: [-0.3, 1.0, -5.0] }], [4.3, { p: [0.15, 1.45, -3.3], l: [-0.5, 1.1, -5.15] }]],
  tags: [T('a', 4880212345, 'mid', 0.3), T('b', 6230998017, 'mid', 0.4), T('d', 3, 'gold', 4.5, { pulse: 1, size: 1.6 })], caps: [['THREE.', 4.7, { y: E.H * 0.85, color: '#ffd23f', size: V(140, 130) }]] });
S('d57', { set: BUS, cast: { ...driver, p: [ST[5], 0.5, -5.6, FNX + 0.6] }, walk: { p: [0.6, -5.6, 0.5, -5.0, 1.6, 3.4, 4.4] },
  poses: { d: [[0, 'sit'], [1.3, SIT({ shA: [10, 160], elA: 20 })], [2.6, 'sit']] }, exprs: { d: [[0, 'smile'], [1.3, 'happy']], p: [[0, 'smile']] },
  b: busLit, cam: { p: [-0.15, 1.55, -2.2], l: [-0.2, 1.1, -5.0], p2: [-0.15, 1.52, -2.5] }, tags: [T('d', 3, 'gold', 0.2)], caps: [['"MORNING, SAM!"', 1.4, { y: E.H * 0.85 }]] });
S('d58', { set: BUS, cast: { ...driver, s: [ST[4], 0.45, -4.7, FNX - 0.4] }, walk: { s: [0.7, -5.65, 0.45, -4.7, 0, 1.0, 5] },
  poses: { d: [[0, 'sit'], [2.4, SIT({ shA: [60, 30], elA: 20 })], [5.5, 'sit']], s: [[0, 'stand'], [3.0, 'holdFront'], [5.0, 'cheer']] }, exprs: { s: [[0, 'sad'], [3.0, 'surprised'], [4.0, 'joy']], d: [[0, 'smile']] },
  b: (st, s) => { busLit(st); s.um = cyl(0.025, 0.025, 0.55, '#3a9ad8', 0, 0, 0); st.add(s.um); }, u: (s, t) => { s.um.visible = t >= 2.4; if (t >= 2.4) held(s.um, t < 3.0 ? s.F.d : s.F.s, 'A', 0); },
  cam: { p: [-0.15, 1.55, -2.1], l: [-0.15, 1.15, -5.0], p2: [-0.15, 1.52, -2.4] }, tags: [T('d', 3, 'gold', 0.2)], caps: [['SPARE UMBRELLAS', 2.4, { y: E.H * 0.14, dur: 2.2 }], ['5 GIVEN AWAY THIS MONTH', 4.7, {}]] });
S('d59', { set: BUS, cast: { ...driver, me: [ME, 0.15, -4.6, FNX - 0.75, 'stand', 'sad'] }, walk: { me: { path: [[0.15, -4.6], [0.45, -4.0]], t0: 2.9, t1: 3.4, spd: 5, face: FNX - 0.75 } },
  poses: { d: [[0, SIT({ head: [-10, 0] })], [3.5, SIT({ shA: [20, 70], elA: 40, shB: [20, 70], elB: 40 })], [4.4, SIT({ shA: [50, 40], elA: 60 })]], me: [[0, 'stand'], [1.0, 'explain'], [3.0, 'stand']] },
  exprs: { d: [[0, 'smile'], [3.5, 'calm'], [4.4, 'happy']], me: [[0, 'sad'], [1.0, 'confused'], [4.4, 'awe']] },
  b: busLit, cams: [[0, { p: [1.0, 1.6, -5.5], l: [-0.3, 1.2, -4.75] }], [3.4, { p: [-0.35, 1.35, -4.1], l: [-0.55, 1.1, -5.15], p2: [-0.38, 1.33, -4.22], subj: ['d'] }]],
  tags: [T('d', 3, 'gold', 0)], caps: [['"SOMEBODY\'S GOT TO MAKE THE BUS NICE."', 4.5, { size: V(56, 52) }]] });
S('d60', { set: BUS, cast: { ...driver, me: [ME, 0.78, -1.5, FNZ, 'sitDesk', 'awe'] }, b: busLit,
  cam: { p: [-0.2, 1.75, 1.4], l: [-0.35, 1.05, -5.0], p2: [-0.25, 1.7, 0.9] }, tags: [T('d', 3, 'gold', 0.1, { pulse: 1 })], caps: [['#3 ON THE PLANET', 0.3, { y: E.H * 0.16, color: '#ffd23f' }], ['NEVER GOING TO KNOW', 2.3, {}]] });

// ---------- gaming the rule ----------
S('d61', { set: ['bedroom', { night: true }], cast: { me: [ME, 0, -0.6, FZ, 'think', 'thinking'] }, poses: { me: [[0, 'think'], [1.7, 'crossArms']] }, exprs: { me: [[0, 'thinking'], [1.7, 'smirk']] },
  cam: { f: 'me', d: 1.8, h: 1.4, side: 0.3, lh: 1.45, push: 0.2 }, caps: [['NOW YOU KNOW THE RULE', 0.2, { dur: 1.5 }], ['DANGEROUS', 2.0, { color: '#ff4a4a' }]],
  o: (g, t) => tint(g, '#ff2a2a', 0.1 * ease.out(prog(t, 1.7, 2.4))) });
S('d62', { set: 'park', cast: { me: [ME, 1.6, 0.5, FZ + 0.4, 'crouch', 'determined'], w: [ST[0], -4, -1.6, FX] }, walk: { w: [-4, -1.6, 3.5, -1.6, 0, 5.4, 3.5] },
  poses: { me: [[0, 'crouch'], [2.6, { shA: [80, 10], elA: 20, spine: [30, 0], head: [-40, 0] }], [3.6, 'crouch']] }, exprs: { me: [[0, 'determined'], [2.6, 'smirk']] },
  b: (st, s) => { s.can = cyl(0.035, 0.035, 0.12, '#e8302c', 1.95, 0.06, 0.6); st.add(s.can); }, u: (s, t) => { if (t > 1.0) held(s.can, s.F.me, 'A', 0); },
  cam: { p: [1.8, 1.3, 4.6], l: [1.2, 0.8, 0.3], p2: [1.7, 1.25, 4.1] }, caps: [['GAMING IT', 1.8, { y: E.H * 0.14, dur: 1.3, color: '#ff5a4a' }], ['ONLY WHERE PEOPLE CAN SEE', 3.1, {}]] });
card('d63', 'blue', (g, t, info, u, cx, cy) => {
  const post = (y, at, small) => { const k = ease.outBack(prog(t, at, at + 0.3)); if (k <= 0) return; g.save(); g.translate(cx, y); g.scale(k, k); g.fillStyle = '#ffffff'; rr(g, -440 * u, -110 * u, 880 * u, 220 * u, 24 * u); g.fill();
    g.fillStyle = '#2a2a33'; g.beginPath(); g.arc(-360 * u, -40 * u, 40 * u, 0, Math.PI * 2); g.fill(); text(g, 'kip', -300 * u, -50 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#141218', align: 'left' });
    text(g, small, -380 * u, 40 * u, { size: 44 * u, font: FONTS.ui, weight: 800, color: '#333', align: 'left' }); text(g, '❤ 3', 400 * u, 60 * u, { size: 36 * u, font: FONTS.ui, weight: 900, color: '#e8453c', align: 'right' }); g.restore(); };
  post(cy - 260 * u, 0.1, 'Volunteered today 🙏 #grateful'); post(cy, 0.7, 'Still thinking about volunteering 🙏'); post(cy + 260 * u, 1.3, 'Volunteering changed me 🙏🙏');
  const a = ease.out(prog(t, 1.8, 2.1)); text(g, '1 HOUR · 3 POSTS', cx, cy + 440 * u, { size: 72 * u, font: FONTS.ui, weight: 900, color: '#ffd23f', alpha: a, align: 'center' });
});
S('d64', { set: 'street', cast: { me: [ME, -0.4, 4.3, FZ], o: [OLDMAN, 0.3, 4.3, FZ, 'stand', 'angry'] }, walk: { me: [-0.4, 4.3, -0.4, 0.4, 0, 4.1, 3.0], o: [0.3, 4.3, 0.3, 0.4, 0, 4.1, 2.4] },
  exprs: { me: [[0, 'happy']], o: [[0, 'confused'], [1.8, 'angry']] }, cam: { p: [-3.6, 1.6, 5.4], l: [0, 0.9, 2.2], p2: [-3.0, 1.55, 5.3] },
  caps: [['HE DID NOT WANT TO CROSS', 2.0, {}]] });
S('d65', { set: 'street', cast: { me: [ME, -0.4, -3.6, FZ, 'stand', 'neutral'], o: [OLDMAN, 0.3, 0.4, FNZ] }, walk: { o: [0.3, 0.4, 0.4, 4.3, 0.2, 4.9, 2.4] },
  poses: { me: [[0, 'stand'], [2.4, 'shrug']] }, exprs: { me: [[0, 'neutral'], [1.5, 'confused'], [2.4, 'sad']] },
  cam: { f: 'me', d: 2.4, h: 1.5, side: 0.4, lh: 1.5 }, tags: [T('me', KIPN, 'bad', 0.1)], caps: [['NOT ONCE.', 1.5, { dur: 0.9 }], ['IT CAN TELL', 2.5, {}]] });
const two = { me: [ME, 0.75, 0, FNX + 0.25], dev: [DEV, -0.75, 0, FX - 0.25] };
S('d66', { set: 'bedroom', cast: two, poses: { dev: [[0, 'crossArms'], [2.9, 'point'], [4.6, 'explain'], [9.1, 'crossArms']], me: [[0, 'stand'], [7.1, 'explain']] },
  exprs: { dev: [[0, 'angry'], [2.9, 'confused'], [9.1, 'smirk']], me: [[0, 'worried'], [7.1, 'determined']] },
  cams: [[0, { f: 'dev', d: 2.0, h: 1.5, side: 0, lh: 1.45, a: FZ + 0.6 }], [4.6, { two: ['me', 'dev'], d: 2.8, h: 1.5, lh: 1.4, a: FZ }], [7.1, { f: 'me', d: 2.0, h: 1.5, side: 0, lh: 1.45, a: FZ - 0.6 }], [9.1, { f: 'dev', d: 1.7, h: 1.5, side: 0, lh: 1.5, a: FZ + 0.6, push: 0.08 }]],
  caps: [['YOU TRIED TO TUTOR THE DOG', 4.7, { dur: 2.2 }], ['"YOU\'RE WELCOME!"', 9.3, {}]] });

// ---------- the group project ----------
const front = { me: [ME, -1.0, -3.4, FZ], dev: [DEV, 1.0, -3.4, FZ], p: [SCI, 3.6, -2.6, FNX + 0.6, 'holdFront'] };
const slide = (g, t, a0, a1) => { const a = ease.out(prog(t, a0, a0 + 0.3)) * (1 - ease.out(prog(t, a1 - 0.3, a1))); if (a <= 0) return; const u = U(), cx = E.W / 2, cy = E.H * 0.42;
  g.save(); g.globalAlpha = a; g.fillStyle = '#ffffff'; rr(g, cx - 560 * u, cy - 300 * u, 1120 * u, 600 * u, 18 * u); g.fill(); g.strokeStyle = '#2a5ad8'; g.lineWidth = 10 * u; rr(g, cx - 560 * u, cy - 300 * u, 1120 * u, 600 * u, 18 * u); g.stroke();
  text(g, 'GLOBAL SUPPLY CHAINS', cx, cy - 120 * u, { size: 76 * u, font: FONTS.ui, weight: 900, color: '#1a2a5a', align: 'center' }); text(g, 'by KIP', cx, cy + 20 * u, { size: 110 * u, font: FONTS.ui, weight: 900, color: '#2a5ad8', align: 'center' });
  const k = ease.out(prog(t, 5.6, 5.9)); text(g, '(and dev)', cx + 400 * u, cy + 250 * u, { size: 26 * u, font: FONTS.ui, weight: 700, color: '#8a8f9a', align: 'center', alpha: k }); g.restore(); };
S('d67', { set: hall, mood: 'indoor', cast: front, poses: { me: [[0, 'explain'], [3.7, 'point']], dev: [[0, 'stand'], [5.6, 'shrug']], p: [[0, 'holdFront'], [7.8, 'explain']] },
  exprs: { me: [[0, 'happy']], dev: [[0, 'neutral'], [5.6, 'sad']], p: [[0, 'neutral'], [7.8, 'thinking']] },
  cams: [[0, { p: [0, 1.75, 4.6], l: [0, 1.3, -3], p2: [0, 1.7, 3.8] }], [7.8, { f: 'p', d: 2.2, h: 1.55, side: 0.2, lh: 1.5, push: 0.1 }]],
  tags: [T('me', KIPN, 'bad', 0.3), T('dev', DEVN, 'mid', 0.3)], caps: [['GROUP PROJECT', 0.2, { y: E.H * 0.14, dur: 2.0 }], ['"WHO DID THE RESEARCH?"', 8.6, {}]],
  o: (g, t) => slide(g, t, 3.6, 7.8) });
S('d68', { set: hall, mood: 'indoor', cast: front, poses: { me: [[0, 'stand'], [1.0, 'think']] }, exprs: { me: [[0, 'smirk'], [1.4, 'thinking'], [2.9, 'worried']] },
  cam: { f: 'me', d: 1.5, h: 1.55, side: 0.15, lh: 1.6, push: 0.15 }, tags: [T('me', (t) => KIPN + (t > 1.0 && t < 2.9 ? Math.round(Math.sin(t * 30) * 4000) : 0), 'bad', 0, { up: 0.3, max: 96 })],
  caps: [['TAKE THE CREDIT?', 0.4, { dur: 2.2 }], ['THE NUMBER WOULD KNOW.', 3.0, { color: '#ff5a4a' }]], o: (g, t) => tint(g, '#ff2a2a', 0.08 * (t > 1.0 && t < 2.9)) });
S('d69', { set: hall, mood: 'indoor', cast: front, poses: { me: [[0, 'point'], [2.0, 'explain']], dev: [[0, 'stand'], [1.3, 'shrug']] }, exprs: { me: [[0, 'determined'], [2.0, 'smile']], dev: [[0, 'surprised'], [1.6, 'awe']] },
  b: (st, s) => { s.F.me.rotation.y = FZ + 0.9; }, u: (s) => { s.F.me.rotation.y = FZ + 0.9; }, cam: { two: ['me', 'dev'], d: 3.0, h: 1.5, lh: 1.4, a: FZ, push: 0.12 },
  tags: [T('me', KIPN, 'bad', 0)], caps: [['"DEV DID THE RESEARCH."', 0.2, { dur: 2.0 }]] });
S('d70', { set: hall, mood: 'indoor', cast: front, poses: { me: [[0, 'stand'], [1.7, 'shocked']] }, exprs: { me: [[0, 'neutral'], [0.6, 'surprised'], [1.7, 'awe']] },
  cam: { f: 'me', d: 1.6, h: 1.55, side: 0.1, lh: 1.65, push: 0.12 }, tags: [T('me', (t) => roll(t, KIPN, 3900000000, 0.5, 4.5), 'good', 0, { up: 0.3, max: 100 })],
  caps: [['BILLIONS.', 3.4, { y: E.H * 0.84, color: '#5fe08a', size: V(140, 130) }]] });
card('d71', 'dark', (g, t, info, u, cx, cy) => {
  const n = roll(t, 3900000000, 1300000000, 0, 10.6); text(g, fmt(n), cx, cy - 60 * u, { size: 170 * u, font: FONTS.ui, weight: 900, color: '#5fe08a', align: 'center', glow: 40 * u, glowColor: alpha('#5fe08a', 0.5) });
  const line = (str, at, to) => { const a = ease.out(prog(t, at, at + 0.4)) * (1 - ease.out(prog(t, to - 0.3, to))); if (a > 0) text(g, str, cx, cy + 170 * u, { size: 64 * u, font: FONTS.ui, weight: 900, color: '#ffffff', alpha: a, align: 'center' }); };
  line('NEVER ABOUT ONE MOMENT', 0.1, 2.4); line('EVERY TIME YOU GAVE IT AWAY', 2.4, 6.3); line('EVERYONE YOU SKIPPED · STILL WAITING', 6.3, 11);
});
S('d72', { set: hall, mood: 'indoor', cast: front, poses: { me: [[0, 'stand'], [3.6, 'cheer'], [4.6, 'stand']], dev: [[0, 'stand'], [3.6, 'wave']] }, exprs: { me: [[0, 'awe'], [2.5, 'neutral'], [3.6, 'happy']], dev: [[0, 'happy']] },
  cams: [[0, { f: 'me', d: 1.6, h: 1.55, side: 0.1, lh: 1.65 }], [3.4, { two: ['me', 'dev'], d: 3.0, h: 1.5, lh: 1.4, a: FZ, push: 0.1 }]],
  tags: [T('me', (t) => roll(t, 1300000000, KIPLOW, 0, 0.8), 'bad', 0, { up: 0.3 }), T('dev', DEVN, 'mid', 3.4)],
  caps: [['1.2 BILLION', 0.4, { y: E.H * 0.84, dur: 2.0, size: V(120, 110) }], ['STILL NOT GREAT', 2.5, { dur: 1.1 }], ['NOW YOU KNOW HOW', 3.7, { color: '#5fe08a' }]] });

// ---------- Maya, Thursday, Priya, snacks ----------
S('d73', { set: 'dormHall', cast: { me: [ME, 0.6, 2.6, FNX + 0.4], maya: [MAYA, -0.6, 2.6, FX - 0.4] },
  poses: { maya: [[0, 'stand'], [1.6, 'explain'], [4.9, 'point'], [6.5, 'explain']], me: [[0, 'stand'], [3.5, 'shrug'], [8.2, { shA: [30, 30], elA: 100, head: [0, -6] }]] },
  exprs: { maya: [[0, 'smile'], [4.9, 'happy']], me: [[0, 'surprised'], [3.5, 'neutral'], [5.0, 'awe'], [8.2, 'shocked'], [10.0, 'happy']] },
  cams: [[0, { p: [0, 1.55, 6.0], l: [0, 1.35, 2.6], p2: [0, 1.52, 5.4] }], [4.9, { f: 'maya', d: 1.8, h: 1.5, side: 0, lh: 1.45, a: FZ + 0.6 }], [8.2, { f: 'me', d: 1.6, h: 1.52, side: 0, lh: 1.5, a: FZ - 0.6, push: 0.1 }]],
  tags: [T('maya', 31207, 'good', 0.2), T('me', KIPLOW, 'bad', 0.3)], caps: [['"THURSDAY?"', 5.0, { dur: 1.4 }], ['ECON. ME.', 10.0, { color: '#ffd23f' }]] });
const tutor = { me: [ME, -1.9, -2.05, FZ, 'sitDesk'], pr: [PRIYA, -0.7, -2.05, FZ, 'sitDesk'] };
// tutoring table: no reading lamp at x -1.5 (it sat right in front of Kip's face)
const nbB = (st, s) => { s.nb = notebook(true); st.add(s.nb); s.nb.position.set(-1.3, 0.8, -1.45); st.scene.traverse((m) => { if (Math.abs(m.position.x + 1.5) < 0.01 && Math.abs(m.position.z + 1.2) < 0.01) m.visible = false; }); };
S('d74', { set: 'library', cast: tutor, b: nbB,
  poses: { me: [[0, 'sitDesk'], [6.6, SIT({ shA: [60, 40], elA: 40, shB: [30, 10], elB: 60 })], [8.0, SIT({ shA: [70, 60], elA: 20 })]], pr: [[0, SIT({ spine: [14, 0], head: [0, -14], shA: [40, 10], elA: 100, shB: [40, 10], elB: 100 })]] },
  exprs: { me: [[0, 'smile'], [6.6, 'happy']], pr: [[0, 'worried'], [6.6, 'thinking']] },
  cams: [[0, { two: ['me', 'pr'], d: 2.4, h: 1.35, lh: 1.1, a: FZ }], [2.0, { f: 'pr', d: 1.7, h: 1.3, side: -0.45, lh: 1.12 }], [6.6, { two: ['me', 'pr'], d: 2.2, h: 1.32, lh: 1.1, a: FZ, push: 0.08 }]],
  tags: [T('pr', 4108552901, 'mid', 2.2)], caps: [['THURSDAY', 0.2, { y: E.H * 0.14, dur: 1.6, color: '#ffd23f' }], ['SUPPLY & DEMAND', 6.8, { y: E.H * 0.14, dur: 2.5 }], ['…THE ONE THAT EATS DOLLARS', 9.5, {}]] });
S('d75', { set: 'library', cast: tutor, b: nbB, poses: { pr: [[0, SIT({ head: [10, 0] })], [0.4, SIT({ shA: [10, 160], elA: 20, shB: [10, 160], elB: 20 })], [2.0, 'sitDesk']], me: [[0, 'sitDesk']] },
  exprs: { pr: [[0, 'surprised'], [0.4, 'joy'], [3, 'happy']], me: [[0, 'smile'], [1.2, 'joy'], [6.2, 'calm']] },
  cams: [[0, { f: 'pr', d: 1.7, h: 1.3, side: -0.45, lh: 1.15 }], [6.2, { two: ['me', 'pr'], d: 2.8, h: 1.45, lh: 1.1, a: FZ, push: 0.1 }]],
  caps: [['SHE GETS IT', 0.3, { dur: 1.3, color: '#5fe08a' }], ["YOU FORGET IT'S THERE", 7.5, {}]] });
S('d76', { set: 'library', cast: { ...tutor, dev: [DEV, 3.9, -0.1, FNZ] }, walk: { dev: { path: [[3.9, -0.1], [3.9, -2.75], [-1.3, -2.75]], t0: 0, t1: 3.8, spd: 6, face: FZ } },
  poses: { dev: [[0, 'holdFront'], [2.6, 'holdFront'], [4.6, { shA: [30, 30], elA: 110, head: [-20, -6] }], [9.8, 'cheer']] }, exprs: { dev: [[0, 'happy'], [3.3, 'surprised'], [4.6, 'curious'], [8.5, 'joy']], me: [[0, 'smile'], [6.7, 'happy']], pr: [[0, 'happy']] },
  b: nbB, carry: [{ prop: () => box(0.2, 0.22, 0.12, '#e8453c', 0, 0, 0, { outline: 0.005 }), by: 'dev', to: 4.6 }],
  u: (s, t) => { if (t >= 4.6) { s.carry[0].o.position.set(-1.0, 0.9, -1.75); s.carry[0].o.rotation.set(0, 0.3, 0); } },
  cams: [[0, { p: [0.4, 1.6, 4.4], l: [0.6, 1.1, -0.8] }], [3.0, { p: [-1.3, 1.75, 0.6], l: [-1.3, 1.35, -2.4], p2: [-1.3, 1.72, 0.3] }], [4.6, { two: ['me', 'dev'], d: 3.0, h: 1.5, lh: 1.25, a: FZ }], [9.6, { p: [-1.3, 1.85, 0.4], l: [-1.3, 1.35, -2.5], p2: [-1.3, 1.83, 0.1], subj: ['dev'] }]],
  tags: [T('dev', (t) => roll(t, DEVN, DEVN - 140, 3.4, 3.9), 'mid', 3.0, { pulse: 1 })], caps: [['NOBODY ASKED HIM TO', 2.1, { y: E.H * 0.14, dur: 1.2 }], ['"IT WAS THE SNACKS."', 8.6, {}]] });

// ---------- the end ----------
S('d77', { set: 'park', cast: { me: [ME, -3, 0.6, FX], maya: [MAYA, -2.1, 1.2, FX] }, walk: { me: [-3, 0.6, 2.5, 0.6, 0, 5.5, 4.2], maya: [-2.1, 1.2, 3.4, 1.2, 0, 5.5, 4.2] },
  exprs: { me: [[0, 'calm'], [3.8, 'happy']], maya: [[0, 'happy']] }, cam: { p: [-1.8, 1.6, 6.0], l: [-0.6, 1.2, 1.0], p2: [0.8, 1.6, 6.0], l2: [1.6, 1.2, 1.0] },
  tags: [T('me', KIPLOW, 'bad', 2.5, { k: 0.06 })], caps: [['A WEEK LATER', 0.2, { y: E.H * 0.14, dur: 2.0, color: '#ffd23f' }], ["YOU DON'T NEED IT ANYMORE", 3.8, {}]] });
S('d78', { set: 'bedroom', cast: { dev: [DEV, 0, -0.6, FZ, 'cheer', 'joy'] }, poses: { dev: [[0, 'cheer'], [1.2, 'crossArms'], [2.4, 'point']] }, exprs: { dev: [[0, 'joy'], [2.4, 'smirk']] },
  cam: { f: 'dev', d: 2.2, h: 1.5, side: 0.3, lh: 1.45 }, tags: [T('dev', 1904220117, 'mid', 0.1, { pulse: 1 })], caps: [['VERY PROUD', 2.4, { dur: 1.2 }]],
  o: (g, t) => { if (t < 3.6) return; const u = U(), a = ease.out(prog(t, 3.6, 3.85)); g.save(); g.globalAlpha = a; g.fillStyle = '#eef0f2'; g.fillRect(0, 0, E.W, E.H); g.fillStyle = '#d4d8dc'; g.fillRect(E.W * 0.1, 0, 30 * u, E.H);
    ['#e8453c', '#3a9ad8', '#5fe08a'].forEach((c, k) => { g.fillStyle = c; g.beginPath(); g.arc(E.W * (0.25 + k * 0.25), E.H * 0.2, 30 * u, 0, Math.PI * 2); g.fill(); });
    g.translate(E.W / 2, E.H * 0.55); g.rotate(-0.04); g.fillStyle = '#ffe36a'; g.fillRect(-380 * u, -260 * u, 760 * u, 520 * u);
    text(g, 'DEV', 0, -110 * u, { size: 120 * u, font: FONTS.hand || FONTS.ui, weight: 900, color: '#22263a', align: 'center' }); text(g, '1.9 BILLION', 0, 60 * u, { size: 100 * u, font: FONTS.hand || FONTS.ui, weight: 900, color: '#22263a', align: 'center' });
    text(g, '(a legend)', 0, 180 * u, { size: 50 * u, font: FONTS.hand || FONTS.ui, weight: 700, color: '#5a5a6a', align: 'center' }); g.restore(); } });
S('d79', { set: 'dormHall', cast: { me: [ME, 0.2, -6, FZ], dev: [DEV, -0.5, -6.4, FZ] }, walk: { me: [0.2, -8.4, 0.2, -10.6, 0, 3.0, 3.4], dev: [-0.5, -8.8, -0.5, -11.0, 0, 3.0, 3.4] },
  b: (st, s) => {}, u: (s, t) => { if (t > 3.0) { s.F.me.rotation.y = FNZ + 0.7; s.F.dev.rotation.y = FNZ + 0.5; } },
  exprs: { me: [[0, 'happy'], [3.5, 'deadpan']], dev: [[0, 'happy'], [3.5, 'smirk']] }, cam: { p: [-1.3, 1.55, -6.4], l: [0.4, 1.15, -12.0], p2: [-1.2, 1.5, -7.0] },
  o: (g, t, i, s) => { const fake = { position: { x: 0.9, y: 0.6, z: -12.4 }, visible: true }; rankTag(g, t, s, fake, 8000000001, { at: 0.4, col: 'bad', hy: 1.47, k: 0.1, pulse: 1 }); caption(g, t, 'SOME THINGS NEVER CHANGE', { at: 3.5 }); } });
card('d80', 'dark', (g, t, info, u, cx, cy) => {
  caption(g, t, "IF YOU COULD SEE EVERYONE'S RANK…", { at: 1.4, y: cy - 220 * u, size: 70 * u, color: '#ffffff' });
  caption(g, t, 'WOULD YOU WANT TO SEE YOURS?', { at: 2.8, y: cy - 80 * u, size: 96 * u, color: '#5fe08a' });
  caption(g, t, 'OR NEVER KNOW?', { at: 4.6, y: cy + 60 * u, size: 96 * u, color: '#ff4a4a' });
  caption(g, t, 'TELL ME IN THE COMMENTS ↓', { at: 6.3, y: cy + 240 * u, size: 64 * u, color: '#ffd23f' });
});
