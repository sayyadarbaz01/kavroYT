// shots/02_day1.js — 0:41-2:04: Mom's crossword, the first star, Dev, Rule 1 (half health), Rule 2 (respawn + the bill).
import { walkPose } from '../toon/toon.js';
import { copCar, foodTruck, vehicle, flashLights, stairs } from '../toon/sets3d.js';
import { DEV, DOCTOR } from '../toon/cast3d.js';
import { ME, NURSE, MOM, fig, shot, face, cam, C, push, pose, expr, held, bandFlash, vignette, shout, THREE, box, cyl, E, V, ease, prog, clamp, lerp, SETS, scr, headOf } from './_lib.js';
import { card, title, stamp, cross, check, brain, ecg, bone, person } from './_info.js';
import { U, FACE_Z, FACE_NZ, FACE_X, FACE_NX, chair, cup, cast, bill, stars, placeStars, hud, tag, pin, respawnWipe, text, FONTS, alpha, rr } from './00_kit.js';

const crosswalk = (st, x = 0) => { for (let z = 1.2; z < 7.4; z += 0.8) st.add(box(2.4, 0.024, 0.4, '#f4f4f4', x, 0.022, z + 0.2, { cast: false })); };
const kitchenTable = (st, s) => { SETS.kitchen(st); st.add(chair(3.2, 1.25, -Math.PI / 2)); st.add(chair(3.2, -0.05, Math.PI / 2)); st.add(box(0.35, 0.01, 0.25, '#f4f2ec', 3.1, 0.765, 0.75, { cast: false })); };
const momAtTable = (st) => { const m = fig(st, MOM, 3.2, 1.3, FACE_NZ, 'sitDesk', 'neutral'); m.position.y = 0.06; m.userData.noSnap = true; return m; };

// A01 — kitchen: Mom at the table with her crossword, Kip comes in
shot('a01', (st, s) => { kitchenTable(st, s); s.mom = momAtTable(st); s.me = fig(st, ME, -4.4, 1.5, FACE_X); },
  (s, t, i, T) => { s.me.position.x = -4.4 + Math.min(t, 2.6) * 1.0; s.me.setPose(t < 2.6 ? walkPose(t * 5.4) : walkPose(0)); expr(s.me, t, [[0, 'neutral'], [2.4, 'smirk']]);
    pose(s.mom, t, [[0, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [55, 10], elA: 80, shB: [55, 10], elB: 80, head: [0, -16] }]]); expr(s.mom, t, [[0, 'neutral']]);
    cam(T, s, t, i, C([-0.6, 2.3, 6.6], [0.2, 1.0, 0.6]), C([-0.2, 2.2, 6.2], [0.6, 1.0, 0.6])); s.p = scr(s, headOf(s.mom)); }, (g, t, i, s) => { if (s.p) pin(g, t, 'MOM', s.p[0], s.p[1] + 150 * U(), 0.8); }, { mood: 'indoor' });
// A02 — close: Mom doesn't look up from the crossword
shot('a02', (st, s) => { kitchenTable(st, s); s.mom = momAtTable(st); },
  (s, t, i, T) => { pose(s.mom, t, [[0, { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [55, 10], elA: 80, shB: [55, 10], elB: 80, head: [0, -18] }]]); expr(s.mom, t, [[0, 'neutral'], [1.6, 'smirk']]);
    const f = { pos: [2.85, 1.5, -0.75], look: [3.2, 1.1, 1.3] }; cam(T, s, t, i, f, push(f, 0.08)); }, null, { mood: 'indoor' });
// A03 — Kip smirks: she has no idea (HUD still in the corner of his eye)
shot('a03', (st, s) => { kitchenTable(st, s); s.me = fig(st, ME, -1.6, 1.4, FACE_Z + 0.5); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand']]); expr(s.me, t, [[0, 'smirk']]); const f = face(s.me, 1.5, 0.3, 1.42); cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => hud(g, t, { at: 0, hp: 1 }), { mood: 'indoor' });
// A04 — Biscayne Boulevard: you cross against the light... ding
shot('a04', (st, s) => { SETS.miami(st); crosswalk(st); s.me = fig(st, ME, 0, 0.5, FACE_Z); s.st = stars(st, 1); },
  (s, t, i, T) => { s.me.position.z = 0.5 + Math.min(t, 3.4) * 0.9; s.me.setPose(walkPose(t * 5.4)); expr(s.me, t, [[0, 'smirk'], [3.4, 'surprised']]);
    cam(T, s, t, i, C([7.5, 1.7, 9.5], [0, 1.2, 3]), C([6.0, 1.6, 8.2], [0, 1.3, 3.5])); placeStars(s.st, s.me, s.stage.camera, t, 3.45); },
  (g, t) => { tag(g, t, 'BISCAYNE BLVD', 0.2); shout(g, t, 'DING!', { at: 3.45, y: E.H * 0.2, color: '#ffd23a' }); });
// A05 — the star over your head; a cop car turns the corner
shot('a05', (st, s) => { SETS.miami(st); crosswalk(st); s.me = fig(st, ME, 0, 4.0, FACE_Z + 0.6); s.st = stars(st, 1); s.cop = copCar(-30, 2.4, 0); st.add(s.cop); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand'], [2.3, 'shocked']]); expr(s.me, t, [[0, 'happy'], [2.3, 'shocked']]); s.cop.position.x = lerp(-30, -9, ease.out(clamp((t - 1.9) / 2))); flashLights(s.cop, t);
    s.me.rotation.y = lerp(FACE_Z + 0.6, Math.PI * 0.9, ease.inOut(prog(t, 2.2, 2.7))); cam(T, s, t, i, C([3.2, 1.5, 8.6], [-1, 1.7, 4]), C([2.6, 1.45, 7.6], [-2, 1.6, 3.6])); placeStars(s.st, s.me, s.stage.camera, t + 2, 0); });
// A06 — you panic and duck behind a Cuban coffee truck; the star blinks
shot('a06', (st, s) => { SETS.miami(st); s.truck = foodTruck(1.5, 6.0, 0, 'CAFECITO'); st.add(s.truck); s.me = fig(st, ME, 1.2, 7.7, FACE_NZ, 'crouch', 'scared'); s.st = stars(st, 1); s.cop = copCar(-14, 2.4, 0); st.add(s.cop); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'crouch']]); expr(s.me, t, [[0, 'scared']]); s.cop.position.x = -14 + t * 2.2; flashLights(s.cop, t);
    cam(T, s, t, i, C([-5.4, 1.3, 8.7], [1.2, 0.8, 7.0]), C([-4.8, 1.25, 8.7], [1.2, 0.8, 7.0])); placeStars(s.st, s.me, s.stage.camera, t + 2, 0, 0.22, { y: 1.55, blink: t > 1.6 ? 9 : 0 }); },
  (g, t) => tag(g, t, 'CUBAN COFFEE TRUCK', 0.3));
// A07 — then it's gone, and the cop drives right past you
shot('a07', (st, s) => { SETS.miami(st); s.truck = foodTruck(1.5, 6.0, 0, 'CAFECITO'); st.add(s.truck); s.me = fig(st, ME, 1.2, 7.7, FACE_NZ, 'crouch', 'scared'); s.cop = copCar(-10, 3.0, 0); st.add(s.cop); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'crouch'], [1.6, 'stand']]); expr(s.me, t, [[0, 'scared'], [1.4, 'happy']]); s.cop.position.x = -10 + t * 7; flashLights(s.cop, t);
    cam(T, s, t, i, C([-5.2, 1.35, 8.6], [2.5, 0.9, 6.0]), C([-4.6, 1.4, 8.6], [3.0, 0.9, 6.0])); });
// A08 — Dev with two coffees: "Bro. What are you doing?"
shot('a08', (st, s) => { SETS.miami(st); s.dev = fig(st, DEV, 3.6, 8.4, FACE_NX - 0.6, 'holdFront', 'confused'); s.me = fig(st, ME, 1.4, 8.1, 0.6, 'stand', 'surprised'); s.c1 = cup(); s.c2 = cup(); st.add(s.c1, s.c2); },
  (s, t, i, T) => { pose(s.dev, t, [[0, 'holdFront']]); expr(s.dev, t, [[0, 'confused']]); held(s.c1, s.dev, 'A', -0.02); held(s.c2, s.dev, 'B', -0.02); pose(s.me, t, [[0, 'stand']]); expr(s.me, t, [[0, 'surprised']]);
    cam(T, s, t, i, C([2.4, 1.55, 4.4], [2.5, 1.25, 8.3]), C([2.4, 1.55, 5.0], [2.5, 1.3, 8.3])); });
// A09 — that's Dev, best friend since second grade
shot('a09', (st, s) => { SETS.miami(st); s.dev = fig(st, DEV, 3.6, 8.4, FACE_NX - 0.6, 'holdFront', 'neutral'); s.me = fig(st, ME, 1.4, 8.1, 0.6, 'stand', 'smirk'); s.c1 = cup(); s.c2 = cup(); st.add(s.c1, s.c2); },
  (s, t, i, T) => { pose(s.dev, t, [[0, 'holdFront']]); expr(s.dev, t, [[0, 'neutral'], [1.2, 'smile']]); held(s.c1, s.dev, 'A', -0.02); held(s.c2, s.dev, 'B', -0.02); pose(s.me, t, [[0, 'stand']]); expr(s.me, t, [[0, 'smirk']]);
    cam(T, s, t, i, C([3.0, 1.5, 5.6], [3.4, 1.35, 8.4]), C([3.1, 1.5, 6.1], [3.4, 1.35, 8.4])); },
  (g, t) => pin(g, t, 'DEV', E.W * 0.5, E.H * 0.84, 0.2));
// A10 — "Science."
shot('a10', (st, s) => { SETS.miami(st); s.me = fig(st, ME, 1.4, 8.1, 0.5, 'stand', 'determined'); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand']]); expr(s.me, t, [[0, 'determined']]); const f = face(s.me, 1.3, 0.2, 1.45); cam(T, s, t, i, f); },
  (g, t) => shout(g, t, 'SCIENCE.', { at: 0.1, y: E.H * 0.85, shake: 0 }));

// ---------- rules (2D cards) ----------
card('a11', 'dark', (g, t, i, u, cx, cy) => { title(g, t, 'THE RULES HAVE', cy - 120 * u, { size: 70 }); title(g, t, 'FINE PRINT', cy + 10 * u, { size: 130, at: 0.5, color: '#ffd23a' }); stamp(g, t, 'READ IT', cx, cy + 190 * u, { at: 1.6 }); });
card('a12', 'teal', (g, t, i, u, cx, cy) => { title(g, t, 'RULE 1', cy - 260 * u, { size: 70, color: '#9ff2d8' }); title(g, t, 'HEALTH COMES BACK ON ITS OWN', cy - 160 * u, { size: 58, at: 0.3 });
  const w = 900 * u, x = cx - w / 2, y = cy + 10 * u, k = ease.inOut(prog(t, 0.8, 2.4)) * 0.5; g.fillStyle = 'rgba(20,18,24,.7)'; rr(g, x, y, w, 70 * u, 18 * u); g.fill(); g.fillStyle = '#5fd36a'; rr(g, x + 8 * u, y + 8 * u, (w - 16 * u) * k, 54 * u, 12 * u); g.fill();
  g.strokeStyle = '#ffffff'; g.setLineDash([12 * u, 10 * u]); g.lineWidth = 4 * u; g.beginPath(); g.moveTo(cx, y - 20 * u); g.lineTo(cx, y + 90 * u); g.stroke(); g.setLineDash([]);
  title(g, t, 'BUT ONLY HALFWAY', cy + 170 * u, { size: 80, at: 2.3, color: '#ff8a6a' }); title(g, t, '(EXACTLY LIKE GTA 5)', cy + 260 * u, { size: 44, at: 4.3, color: '#cfd6da' }); });
// A13 — Tuesday: you trip down the school stairs
shot('a13', (st, s) => { SETS.hallway(st); st.add(stairs(0, -2, 10)); s.me = fig(st, ME, 0, -4.6, FACE_Z); s.me.position.y = 1.62; s.me.userData.noSnap = true; },
  (s, t, i, T) => { const k = ease.in(clamp((t - 0.6) / 1.3)); s.me.position.z = -4.6 + k * 3.2; s.me.position.y = Math.max(0, Math.min(1.62, ((-2 - s.me.position.z) / 0.32 + 1) * 0.18)) + Math.sin(k * Math.PI * 3) * 0.08 * (1 - k);
    pose(s.me, t, [[0, 'stand'], [0.6, 'fall'], [2.0, 'kneel']]); expr(s.me, t, [[0, 'neutral'], [0.6, 'shocked'], [2.0, 'sad']]);
    cam(T, s, t, i, C([2.6, 1.7, 2.6], [0, 0.8, -2.2]), C([2.2, 1.4, 2.0], [0, 0.6, -1.6])); }, (g, t) => { tag(g, t, 'TUESDAY', 0.1); bandFlash(g, t, 2.0, '#ffffff', 0.15); }, { mood: 'indoor' });
card('a14', 'blue', (g, t, i, u, cx, cy) => { title(g, t, '10 SECONDS LATER', cy - 250 * u, { size: 70 }); bone(g, cx, cy + 20 * u, 210 * u, 1 - 0.5 * ease.inOut(prog(t, 0.4, 1.4)));
  title(g, t, 'HALF HEALED', cy + 230 * u, { size: 80, at: 1.2, color: '#9ff2d8' }); });
card('a15', 'red', (g, t, i, u, cx, cy) => { title(g, t, 'THE OTHER HALF IS REAL LIFE', cy - 240 * u, { size: 60 }); bone(g, cx - 420 * u, cy + 20 * u, 130 * u, 0.5);
  title(g, t, '6-8 WEEKS', cy + 20 * u, { size: 120, at: 0.8, color: '#ffd23a', x: cx + 170 * u }); title(g, t, 'TO HEAL A BROKEN BONE', cy + 210 * u, { size: 54, at: 1.4 }); });
// A16 — a cast on an arm that's only half broken; the doctor stares at the X-ray
shot('a16', (st, s) => { SETS.hospital(st); s.me = fig(st, ME, 0.8, 0.4, FACE_NX + 0.4, 'stand', 'neutral'); cast(s.me, 'A'); s.doc = fig(st, DOCTOR, -1.2, 0.0, 0.3, 'think', 'confused'); },
  (s, t, i, T) => { pose(s.me, t, [[0, { shA: [40, 14], elA: 95 }]]); expr(s.me, t, [[0, 'neutral'], [1.6, 'smirk']]); pose(s.doc, t, [[0, 'think']]); expr(s.doc, t, [[0, 'confused']]);
    cam(T, s, t, i, C([2.2, 1.6, 4.2], [-0.2, 1.2, 0]), C([1.8, 1.55, 3.6], [-0.2, 1.2, 0])); }, null, { mood: 'indoor' });
// A17 — the chart: three question marks
card('a17', 'blue', (g, t, i, u, cx, cy) => { const w = 560 * u, h = 720 * u; g.fillStyle = '#b08a5a'; rr(g, cx - w / 2 - 20 * u, cy - h / 2 - 20 * u, w + 40 * u, h + 40 * u, 24 * u); g.fill(); g.fillStyle = '#fbfaf4'; rr(g, cx - w / 2, cy - h / 2, w, h, 10 * u); g.fill();
  text(g, 'PATIENT: KIP', cx, cy - h / 2 + 80 * u, { size: 44 * u, font: FONTS.ui, weight: 900, color: '#1d4f8a', align: 'center' }); text(g, 'ARM: BROKEN?', cx, cy - h / 2 + 150 * u, { size: 38 * u, font: FONTS.ui, weight: 800, color: '#55606a', align: 'center' });
  const k = ease.outBack(prog(t, 0.6, 1.0)); if (k > 0) text(g, '???', cx, cy + 90 * u, { size: 230 * u * k, font: FONTS.ui, weight: 900, color: '#e8302c', align: 'center' }); });
card('a18', 'teal', (g, t, i, u, cx, cy) => { title(g, t, 'RULE 2', cy - 260 * u, { size: 70, color: '#9ff2d8' }); title(g, t, 'IF YOU DIE, YOU RESPAWN', cy - 150 * u, { size: 70, at: 0.4 });
  const k = ease.inOut(prog(t, 2.6, 4.2)); person(g, lerp(cx - 300 * u, cx + 260 * u, k), cy + 120 * u, 180 * u, '#ffffff'); g.fillStyle = '#ffffff'; rr(g, cx + 180 * u, cy - 20 * u, 240 * u, 240 * u, 20 * u); g.fill();
  g.fillStyle = '#d8302c'; g.fillRect(cx + 285 * u, cy + 30 * u, 30 * u, 120 * u); g.fillRect(cx + 240 * u, cy + 75 * u, 120 * u, 30 * u); title(g, t, 'OUTSIDE THE CLOSEST HOSPITAL', cy + 320 * u, { size: 46, at: 2.8 }); });
// A19 — flashback: chasing an ice cream truck into the street. Don't ask.
shot('a19', (st, s) => { SETS.miami(st); s.truck = vehicle(6, 4.6, 0, { body: '#fbe8f0', van: true, len: 5, h: 2.2, w: 2.1, sign: (g2, W, H) => { g2.fillStyle = '#ffffff'; g2.fillRect(0, 0, W, H); g2.fillStyle = '#e8508a'; g2.font = '900 ' + Math.round(H * 0.4) + 'px Nunito'; g2.textAlign = 'center'; g2.textBaseline = 'middle'; g2.fillText('ICE CREAM', W / 2, H / 2 + 2); } }); st.add(s.truck);
    s.me = fig(st, ME, -3, 3.4, FACE_X); },
  (s, t, i, T) => { s.truck.position.x = 6 + t * 3.2; s.me.position.x = -3 + t * 3.0; s.me.setPose(walkPose(t * 9, true)); expr(s.me, t, [[0, 'joy']]);
    cam(T, s, t, i, C([-2, 1.4, 7.2], [2, 1.1, 3.4]), C([4, 1.4, 7.2], [8, 1.1, 3.4])); }, (g, t) => shout(g, t, "DON'T ASK.", { at: 3.0, y: E.H * 0.84, shake: 0 }));
card('a20', 'red', (g, t, i, u, cx, cy) => { title(g, t, 'IN REAL LIFE, NO RESPAWN', cy - 250 * u, { size: 66 }); brain(g, cx - 250 * u, cy + 20 * u, 150 * u, 1);
  const k = clamp(t / 5); text(g, '0' + Math.floor(5 - k * 5 + 0.0001) + ':00', cx + 230 * u, cy + 40 * u, { size: 150 * u, font: FONTS.ui, weight: 900, color: '#ffd23a', align: 'center' });
  title(g, t, 'NO OXYGEN = ABOUT 5 MINUTES', cy + 240 * u, { size: 52, at: 1.2 }); });
// A21 — you walk out of the hospital two minutes later at full health
shot('a21', (st, s) => { SETS.miami(st, { hospital: true }); st.hospitalDoors[0].position.x = -1.86; st.hospitalDoors[1].position.x = 1.86; s.me = fig(st, ME, 0, -2.2, FACE_Z); },
  (s, t, i, T) => { s.me.position.z = -2.2 + t * 0.9; s.me.setPose(walkPose(t * 5.4)); expr(s.me, t, [[0, 'happy']]); cam(T, s, t, i, C([2.6, 1.4, 6.2], [0, 1.6, -1.0]), C([1.8, 1.4, 5.0], [0, 1.4, -0.4])); },
  (g, t) => { hud(g, t, { at: 0, hp: 1 }); tag(g, t, '2 MINUTES LATER', 0.1); });
card('a22', 'gold', (g, t, i, u, cx, cy) => { title(g, t, "SO WHAT'S THE CATCH?", cy - 250 * u, { size: 66 }); title(g, t, 'IN GTA', cy - 90 * u, { size: 60, at: 1.2, color: '#ffd84a' });
  title(g, t, 'HOSPITAL BILL: UP TO $5,000', cy + 40 * u, { size: 70, at: 1.8 }); });
card('a23', 'red', (g, t, i, u, cx, cy) => { title(g, t, 'IN REAL LIFE', cy - 250 * u, { size: 66, color: '#ff8a6a' }); title(g, t, 'THEY BILL YOU ANYWAY', cy - 140 * u, { size: 60, at: 0.6 });
  const k = ease.inOut(prog(t, 1.4, 3.0)); text(g, '$' + Math.round(k * 10400).toLocaleString('en-US'), cx, cy + 60 * u, { size: 160 * u, font: FONTS.ui, weight: 900, color: '#ffd23a', align: 'center', alpha: clamp(k * 4) });
  title(g, t, 'AVERAGE US HOSPITAL STAY', cy + 230 * u, { size: 50, at: 2.6 }); });
