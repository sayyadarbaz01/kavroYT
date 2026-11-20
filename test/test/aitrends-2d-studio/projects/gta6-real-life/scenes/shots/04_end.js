// shots/04_end.js — 3:58-5:28: Friday's five-star stream, the storage unit, Mom at the door, the twist, the kitchen table, the question.
import { walkPose } from '../toon/toon.js';
import { copCar, flashLights, sportsCar, heli } from '../toon/sets3d.js';
import { ME, MOM, fig, shot, face, cam, C, push, pose, expr, held, bandFlash, vignette, shout, THREE, box, cyl, E, V, ease, prog, clamp, lerp, SETS, scr, headOf } from './_lib.js';
import { card, title, stamp, cross, check, person } from './_info.js';
import { U, FACE_Z, FACE_NZ, FACE_X, FACE_NX, chair, stars, placeStars, hud, tag, pin, phone, live, clockFace, text, FONTS, alpha, rr } from './00_kit.js';

// convertible sports car (cabin hidden) with Kip in the driver seat
const convertible = (st, x, z) => { const c = sportsCar(x, z, 0); c.children[1].visible = false; c.children[2].visible = false; st.add(c); return c; };
const driver = { hipA: 80, hipB: 80, knA: 80, knB: 80, drop: 0.36, shA: [60, 14], shB: [60, 14], elA: 40, elB: 40, spine: [8, 0] };
const seat = (s, x, z) => { s.car.position.set(x, 0.02, z); s.me.position.set(x - 0.3, 0.42, z + 0.4); };
const police = (g, t, a = 0.18) => { const on = Math.sin(t * 14) > 0; g.save(); g.globalAlpha = a; g.fillStyle = on ? '#ff2a2a' : '#2a5aff'; g.fillRect(0, 0, E.W, E.H); g.restore(); };
const kitchenTable = (st) => { SETS.kitchen(st); st.add(chair(3.2, 1.25, -Math.PI / 2)); st.add(chair(3.2, -0.05, Math.PI / 2)); };
const momAtTable = (st) => { const m = fig(st, MOM, 3.2, 1.3, FACE_NZ, 'sitDesk', 'neutral'); m.position.y = 0.06; m.userData.noSnap = true; return m; };
const kipAtTable = (st) => { const k = fig(st, ME, 3.2, -0.1, FACE_Z, 'sitDesk', 'calm'); k.position.y = 0.06; k.userData.noSnap = true; return k; };
const sitHands = { hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [45, 10], shB: [45, 10], elA: 75, elB: 75 };

// D01 — Friday night: the stream goes live, five stars on I-95
shot('d01', (st, s) => { SETS.miamiNight(st); s.car = convertible(st, -30, 3.0); s.me = fig(st, ME, -30, 3.4, FACE_X); s.me.userData.noSnap = true; s.cops = [-38, -44, -50].map((x, k) => { const c = copCar(x, k % 2 ? 5.2 : 3.0, 0); st.add(c); return c; }); s.st = stars(st, 5); },
  (s, t, i, T) => { const x = -30 + t * 9; seat(s, x, 3.0); s.me.setPose(driver); expr(s.me, t, [[0, 'joy'], [3.5, 'determined']]); s.cops.forEach((c, k) => { c.position.x = x - 9 - k * 6 + Math.sin(t + k) * 0.6; flashLights(c, t); });
    cam(T, s, t, i, C([x + 7, 2.4, 9.6], [x, 1.2, 3.6]), C([x + 5, 2.0, 8.6], [x - 2, 1.2, 3.6])); placeStars(s.st, s.me, s.stage.camera, t, 0.6, 0.18, { y: 1.55 }); },
  (g, t) => { live(g, t, '6,000,000', 0.1); shout(g, t, 'FRIDAY NIGHT · I-95', { at: 0.4, y: E.H * 0.86, size: V(64, 56), shake: 0 }); });
// D02 — four helicopters, twenty cop cars
shot('d02', (st, s) => { SETS.miamiNight(st); s.car = convertible(st, 0, 3.0); s.me = fig(st, ME, 0, 3.4, FACE_X); s.me.userData.noSnap = true;
    s.cops = Array.from({ length: 8 }, (_, k) => { const c = copCar(-8 - (k % 4) * 6, k < 4 ? 3.0 : 5.6, 0); st.add(c); return c; }); s.h = [[-6, 14, 0], [6, 16, 6], [-16, 18, 7], [14, 15, -2]].map(([x, y, z]) => { const hh = heli(x, y, z, 0.3); st.add(hh); return hh; }); },
  (s, t, i, T) => { const x = t * 9; seat(s, x, 3.0); s.me.setPose(driver); s.cops.forEach((c, k) => { c.position.x = x - 8 - (k % 4) * 6; flashLights(c, t + k); }); s.h.forEach((hh, k) => { hh.position.x = x + [-6, 6, -16, 14][k]; hh.userData.rotor.rotation.y = t * 30 + k; });
    cam(T, s, t, i, C([x - 22, 22, 26], [x - 6, 2, 3])); },
  (g, t) => { live(g, t, '6,000,000', 0); shout(g, t, '4 HELICOPTERS · 20 COP CARS', { at: 0.3, y: E.H * 0.86, size: V(64, 56), shake: 0 }); });
// D03 — close-up: for the first time, you're scared
shot('d03', (st, s) => { SETS.miamiNight(st); s.car = convertible(st, 0, 3.0); s.me = fig(st, ME, 0, 3.4, FACE_X); s.me.userData.noSnap = true; },
  (s, t, i, T) => { seat(s, 0, 3.0); pose(s.me, t, [[0, driver], [2.2, { ...driver, head: [-20, 0] }], [3.2, driver]]); expr(s.me, t, [[0, 'worried'], [1.0, 'scared']]); const f = face(s.me, 1.25, 0.25, s.me.position.y + 1.08); cam(T, s, t, i, f, push(f, 0.12)); },
  (g, t) => { police(g, t); shout(g, t, 'NO RESPAWN FOR JAIL', { at: 2.8, y: E.H * 0.86, size: V(70, 62), shake: 0 }); });
// D04 — phone: Mom. "Where are you? Come home." You turn it off.
card('d04', 'dark', (g, t, i) => phone(g, t, { who: 'MOM', at: 0.05, off: 4.4, msgs: [{ from: 'them', txt: 'Where are you?', at: 1.4 }, { from: 'them', txt: 'Come home.', at: 2.4 }] }));
// D05 — storage unit: you pull the roll-up door down
shot('d05', (st, s) => { const a = SETS.storage(st); s.door = a.door; s.me = fig(st, ME, 0.2, 1.0, FACE_Z, 'handsUp', 'scared'); },
  (s, t, i, T) => { const k = ease.inOut(prog(t, 1.2, 3.0)); s.door.position.y = lerp(3.6, 1.4, k); pose(s.me, t, [[0, 'handsUp'], [3.0, 'stand'], [3.6, 'sad']]); expr(s.me, t, [[0, 'scared'], [3.2, 'worried']]);
    if (t > 3.2) { s.me.rotation.y = FACE_NZ; s.me.position.z = 1.0 - Math.min(0.45, (t - 3.2) * 0.6); s.me.setPose(walkPose((t - 3.2) * 4)); }
    cam(T, s, t, i, C([-1.6, 1.6, -1.2], [0.2, 1.3, 1.2]), C([-1.3, 1.5, -1.0], [0.2, 1.3, 1.2])); },
  (g, t) => { const k = 1 - ease.inOut(prog(t, 1.2, 3.0)); if (k > 0.05) police(g, t, 0.12 * k); tag(g, t, 'HIALEAH · STORAGE UNIT', 0.2); });
// D06 — three days: beef jerky, the stars blink... and blink... and go out
shot('d06', (st, s) => { SETS.storage(st); s.me = fig(st, ME, -1.0, -0.6, FACE_Z + 0.5, 'crouch', 'sad'); s.j = box(0.02, 0.14, 0.03, '#7a3a24', 0, 0, 0); st.add(s.j); s.st = stars(st, 5); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'crouch'], [0.6, { hipA: 70, hipB: 70, knA: 120, knB: 120, drop: 0.35, spine: [25, 0], shA: [80, 10], elA: 140, shB: [40, 10], elB: 60 }]]); expr(s.me, t, [[0, 'sad'], [7.6, 'happy']]); held(s.j, s.me, 'A', 0.05);
    cam(T, s, t, i, C([0.9, 1.3, 1.0], [-1.0, 0.8, -0.6]), C([0.6, 1.2, 0.7], [-1.0, 0.85, -0.6])); placeStars(s.st, s.me, s.stage.camera, t + 3, 0, 0.1, { y: 1.45, blink: t < 6.2 ? lerp(10, 4, t / 6.2) : 0, fade: 1 - prog(t, 6.2, 8.2) }); },
  (g, t) => { tag(g, t, t < 2.8 ? 'DAY 5' : t < 5.6 ? 'DAY 6' : 'DAY 7', 0.1); });
// D07 — Monday morning: you walk home. You did it.
shot('d07', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, -6, 0.3, FACE_X); },
  (s, t, i, T) => { s.me.position.x = -6 + t * 1.4; s.me.setPose(walkPose(t * 5.6)); expr(s.me, t, [[0, 'happy'], [1.6, 'joy']]); cam(T, s, t, i, C([2.5, 1.5, 6.4], [-3, 1.1, 0]), C([3.0, 1.5, 6.0], [-1.5, 1.1, 0])); },
  (g, t) => { tag(g, t, 'DAY 8 · MONDAY', 0.1); hud(g, t, { at: 0, hp: 1 }); });
// D08 — your mom opens the door. She looks right at you.
shot('d08', (st, s) => { SETS.suburb(st); s.mom = fig(st, MOM, 0, -1.75, FACE_Z, 'stand', 'neutral'); s.me = fig(st, ME, 1.25, -0.5, FACE_NZ - 0.6, 'stand', 'happy'); },
  (s, t, i, T) => { pose(s.mom, t, [[0, 'stand'], [0.8, { head: [0, -4] }]]); expr(s.mom, t, [[0, 'neutral'], [1.2, 'smile']]); pose(s.me, t, [[0, 'wave']]); expr(s.me, t, [[0, 'happy']]);
    cam(T, s, t, i, C([-0.9, 1.6, 1.5], [0.2, 1.35, -1.6]), C([-0.7, 1.58, 1.1], [0.2, 1.35, -1.6])); });
// D09 — "Hi. Can I help you?"
shot('d09', (st, s) => { SETS.suburb(st); s.mom = fig(st, MOM, 0, -1.75, FACE_Z + 0.3, 'stand', 'smile'); },
  (s, t, i, T) => { pose(s.mom, t, [[0, { shA: [20, 10], elA: 60 }]]); expr(s.mom, t, [[0, 'smile']]); const f = face(s.mom, 1.4, 0.2, 1.47); cam(T, s, t, i, f, push(f, 0.08)); });
// D10 — that's when it hits you
shot('d10', (st, s) => { SETS.suburb(st); s.me = fig(st, ME, 0.5, -0.4, FACE_NZ - 0.3 + Math.PI, 'stand', 'shocked'); },
  (s, t, i, T) => { pose(s.me, t, [[0, 'stand']]); expr(s.me, t, [[0, 'shocked']]); const f = face(s.me, 1.2, 0.0, 1.47); cam(T, s, t, i, f, push(f, 0.25)); }, (g, t) => vignette(g, '#05060c', 0.7));
// D11 — rule three never said "cops". It said "they".
card('d11', 'red', (g, t, i, u, cx, cy) => { title(g, t, 'RULE 3 NEVER SAID', cy - 260 * u, { size: 60 }); title(g, t, 'COPS', cy - 120 * u, { size: 120, at: 0.3, color: '#ffffff' }); cross(g, t, cx, cy - 120 * u, 95 * u, 1.6);
  title(g, t, 'IT SAID "THEY"', cy + 70 * u, { size: 110, at: 2.6, color: '#ffd23a' }); title(g, t, 'EVERYONE WHO LOST SIGHT OF YOU', cy + 220 * u, { size: 56, at: 4.4 }); });
// D12 — Dev after one day. Your teachers. And now Mom, after three.
card('d12', 'dark', (g, t, i, u, cx, cy) => { [['DEV', '1 DAY', 0.2], ['TEACHERS', '', 1.4], ['MOM', '3 DAYS', 3.0]].forEach(([who, d, at], k) => { const x = cx + (k - 1) * 440 * u, a = ease.out(prog(t, at, at + 0.4)), fadeOut = 1 - 0.75 * ease.inOut(prog(t, at + 0.8, at + 1.6));
    if (a <= 0) return; person(g, x, cy + 120 * u, 300 * u, '#ffffff', a * fadeOut); title(g, t, who, cy + 230 * u, { size: 60, at, x }); if (d) title(g, t, d, cy - 240 * u, { size: 56, at: at + 0.3, x, color: '#ff8a6a' }); });
  title(g, t, 'FORGOTTEN', cy - 330 * u, { size: 70, at: 4.0, color: '#b48cff' }); });
// E01 — the choice: hide and be free... or be remembered
card('e01', 'dark', (g, t, i, u, cx, cy) => { const L = cx - E.W * 0.25, R = cx + E.W * 0.25, aL = ease.out(prog(t, 0.2, 0.6)), aR = ease.out(prog(t, 8.2, 8.7));
  g.save(); g.globalAlpha = aL; g.fillStyle = 'rgba(10,12,20,.6)'; rr(g, 60 * u, 120 * u, E.W / 2 - 90 * u, E.H - 240 * u, 30 * u); g.fill(); g.restore();
  title(g, t, 'KEEP HIDING', cy - 300 * u, { size: 70, at: 0.2, x: L, color: '#9aa0aa' }); ['FREE', 'NO BILLS', 'NO RECORD', 'NO COPS'].forEach((w, k) => { title(g, t, w, cy - 160 * u + k * 90 * u, { size: 54, at: 1.6 + k * 0.5, x: L }); });
  title(g, t, 'NOBODY REMEMBERS YOU', cy + 250 * u, { size: 50, at: 5.6, x: L, color: '#ff8a6a' });
  if (aR > 0) { g.save(); g.globalAlpha = aR; g.fillStyle = 'rgba(30,60,110,.5)'; rr(g, E.W / 2 + 30 * u, 120 * u, E.W / 2 - 90 * u, E.H - 240 * u, 30 * u); g.fill(); g.restore();
    title(g, t, 'TURN YOURSELF IN', cy - 300 * u, { size: 66, at: 8.2, x: R, color: '#6fe6ff' }); title(g, t, 'LIVE WHERE', cy - 60 * u, { size: 60, at: 9.0, x: R }); title(g, t, 'PEOPLE CAN SEE YOU', cy + 30 * u, { size: 60, at: 9.4, x: R }); } });
// E02 — the kitchen table: you don't leave her sight. One hour. Two.
shot('e02', (st, s) => { kitchenTable(st); s.mom = momAtTable(st); s.me = kipAtTable(st); },
  (s, t, i, T) => { pose(s.mom, t, [[0, { ...sitHands, head: [0, -6] }]]); expr(s.mom, t, [[0, 'neutral'], [5.0, 'confused']]); pose(s.me, t, [[0, sitHands]]); expr(s.me, t, [[0, 'calm'], [3, 'neutral']]);
    cam(T, s, t, i, C([6.4, 1.7, 0.6], [3.2, 1.0, 0.6]), C([5.6, 1.6, 0.6], [3.2, 1.0, 0.6])); },
  (g, t, i) => clockFace(g, t, i.dur, [7, 0], [9, 0]), { mood: 'indoor' });
// E03 — then she tilts her head: "Kip?"
shot('e03', (st, s) => { kitchenTable(st); s.mom = momAtTable(st); },
  (s, t, i, T) => { pose(s.mom, t, [[0, sitHands], [0.4, { ...sitHands, head: [12, 10] }]]); expr(s.mom, t, [[0, 'confused'], [1.3, 'surprised']]); const f = { pos: [3.15, 1.4, 0.3], look: [3.2, 1.12, 1.3] }; cam(T, s, t, i, f, push(f, 0.12)); }, null, { mood: 'indoor' });
// E04 — outside, the sirens are getting closer. You don't run.
shot('e04', (st, s) => { kitchenTable(st); s.me = kipAtTable(st); },
  (s, t, i, T) => { pose(s.me, t, [[0, sitHands]]); expr(s.me, t, [[0, 'calm']]); const f = face(s.me, 1.05, -0.25, 1.2); cam(T, s, t, i, f, push(f, 0.1)); }, (g, t) => police(g, t, 0.08 + 0.1 * prog(t, 0, 3.4)), { mood: 'indoor' });
// E05 — real life doesn't have a respawn button (Kip to camera)
shot('e05', (st, s) => { kitchenTable(st); s.me = kipAtTable(st); },
  (s, t, i, T) => { pose(s.me, t, [[0, sitHands]]); expr(s.me, t, [[0, 'calm'], [2.6, 'smile']]); const f = face(s.me, 1.0, 0.0, 1.18); cam(T, s, t, i, f, push(f, 0.12)); }, (g, t) => police(g, t, 0.06), { mood: 'indoor' });
// E06 — the question
card('e06', 'dark', (g, t, i, u, cx, cy) => { title(g, t, 'WOULD YOU...', cy - 280 * u, { size: 60 }); title(g, t, 'HIDE', cy - 120 * u, { size: 140, at: 0.4, x: cx - 360 * u, color: '#9aa0aa' }); title(g, t, 'OR', cy - 120 * u, { size: 70, at: 0.9 });
  title(g, t, 'TURN IN', cy - 120 * u, { size: 140, at: 1.4, x: cx + 360 * u, color: '#6fe6ff' }); title(g, t, 'BE FORGOTTEN, OR BE REMEMBERED?', cy + 60 * u, { size: 58, at: 2.0 }); stamp(g, t, 'COMMENT BELOW', cx, cy + 250 * u, { at: 3.6, color: '#ffd23a' }); });
