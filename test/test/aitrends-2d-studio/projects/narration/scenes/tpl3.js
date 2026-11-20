// tpl3.js — globe maps, montages, tightrope, falling, mirror, freeze-frames, end screen, and 3D shots.
import { E, V, S, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, rng, seg, circle, ring, rr, poly, glow, alpha, shade, mix, linGrad, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { place, LOC, ground } from './sets/world.js';
import { YOU, WHO, CAST, POWER } from './cast.js';
import { camOf, atOf, post, glitch, tint, actor, atmos, teleport } from './tpl.js';

// lon/lat for the places the narrator names
const CITY = { HOME: [-74, 40.7], TOKYO: [139.7, 35.7], HIGHLANDS: [-4.5, 57], HIMALAYAS: [86.9, 28], PARIS: [2.35, 48.85], HAWAII: [-157.8, 21.3], 'NEW YORK': [-74, 40.7], MARRAKECH: [-8, 31.6], BEACH: [-80, 25.8] };

function globeRot(info, t) {
  const cs = (info.cities || ['HOME']).map((n) => (CITY[n] || [0, 0])[0]); if (info.planet) return 20 + t * 8;
  const segT = info.dur / Math.max(1, cs.length - 1), i = Math.min(cs.length - 2, Math.floor(t / segT)), u = ease.inOut(clamp((t - Math.max(0, i) * segT) / segT));
  if (cs.length < 2) return -cs[0];
  let a = cs[Math.max(0, i)], b = cs[Math.max(0, i) + 1]; if (b - a > 180) b -= 360; if (a - b > 180) b += 360; return -lerp(a, b, u);
}
export function globeShot(g, t, info) {
  const planet = info.planet;
  if (planet) { const M = mood('night'); g.fillStyle = linGrad(g, 0, 0, 0, E.H, M.sky); g.fillRect(0, 0, E.W, E.H); FX.stars(g, t, { area: [0, 0, E.W, E.H], count: 260 }); }
  else UI.blueprint(g);
  const cam = camOf(t, info, { z: 1 }); g.save(); g.translate(E.W / 2, E.H / 2); g.scale(cam.z, cam.z); g.translate(-E.W / 2, -E.H / 2);
  const cx = E.W / 2, cy = planet ? E.H * 1.02 : E.H * 0.52, R = planet ? 560 : 400, rot = info.rot0 ?? globeRot(info, t), bp = planet ? '#6a8ad8' : UI.bpStroke(), gold = S().ui.gold;
  const proj = ([lon, lat]) => { const l = ((lon + rot) * Math.PI) / 180, p = (lat * Math.PI) / 180; return [cx + R * Math.cos(p) * Math.sin(l), cy - R * Math.sin(p) * 0.98, Math.cos(p) * Math.cos(l)]; };
  g.fillStyle = planet ? '#16244a' : alpha(bp, 0.06); g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill(); glow(g, cx, cy, R * 1.25, bp, 0.18);
  g.strokeStyle = alpha(bp, 0.35); g.lineWidth = 2;
  for (let lon = -180; lon < 180; lon += 30) { g.beginPath(); let first = true; for (let lat = -90; lat <= 90; lat += 6) { const [x, y, z] = proj([lon, lat]); if (z < 0) { first = true; continue; } first ? g.moveTo(x, y) : g.lineTo(x, y); first = false; } g.stroke(); }
  for (let lat = -60; lat <= 60; lat += 30) { g.beginPath(); let first = true; for (let lon = -180; lon <= 180; lon += 6) { const [x, y, z] = proj([lon, lat]); if (z < 0) { first = true; continue; } first ? g.moveTo(x, y) : g.lineTo(x, y); first = false; } g.stroke(); }
  ring(g, cx, cy, R, 4, alpha(bp, 0.8));
  const cities = info.cities || ['HOME', 'TOKYO', 'HIGHLANDS'], seg_ = info.dur / Math.max(1, cities.length - 1);
  cities.forEach((n, i) => { const [x, y, z] = proj(CITY[n] || [0, 0]); if (z < 0) return; const on = t > (i - 1) * seg_ + Math.min(0.7, seg_ * 0.8) - 0.05 || i === 0; circle(g, x, y, 9, on ? gold : alpha(bp, 0.6)); if (on) { glow(g, x, y, 50, gold, 0.6); text(g, n, x, y - 34, { size: 30, color: S().ui.cream, font: FONTS.ui, weight: 900, spacing: 2 }); } });
  for (let i = 0; i < cities.length - 1; i++) { const a = proj(CITY[cities[i]] || [0, 0]), b = proj(CITY[cities[i + 1]] || [0, 0]); if (a[2] < 0 || b[2] < 0) continue; const p = ease.inOut(prog(t, i * seg_, i * seg_ + Math.min(0.7, seg_ * 0.8))); if (p <= 0) continue; const mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 160; g.strokeStyle = POWER.core; g.lineWidth = 4; g.beginPath(); for (let k = 0; k <= 30 * p; k++) { const u = k / 30, x = (1 - u) ** 2 * a[0] + 2 * (1 - u) * u * mx + u * u * b[0], y = (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * my + u * u * b[1]; k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); if (p < 1) { const u = p, x = (1 - u) ** 2 * a[0] + 2 * (1 - u) * u * mx + u * u * b[0], y = (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * my + u * u * b[1]; glow(g, x, y, 60, POWER.core, 0.9); } else FX.rings(g, b[0], b[1], t - i * seg_, { count: 2, r0: 10, r1: 60, color: POWER.core, a: 0.5 }); }
  if (info.plane) { const x = E.W * 0.82, y = E.H * 0.2; g.fillStyle = alpha(S().ui.cream, 0.8); g.beginPath(); g.ellipse(x, y, 90, 15, 0, 0, 7); g.fill(); poly(g, [[x - 10, y], [x - 50, y - 64], [x - 24, y - 64], [x + 24, y]], alpha(S().ui.cream, 0.8)); poly(g, [[x - 10, y], [x - 50, y + 64], [x - 24, y + 64], [x + 24, y]], alpha(S().ui.cream, 0.8)); const k = ease.out(prog(t, 0.5, 0.9)); seg(g, [[x - 120, y - 90], [x - 120 + 240 * k, y - 90 + 180 * k]], 14, POWER.bad); }
  if (planet) { const M = mood('night'); drawFigure(g, { x: cx, y: cy - R + 4, s: 1.3, facing: 1, outfit: YOU, pose: POSES.cheer, expr: 'joy', rim: { color: POWER.core, dir: [0, -1] } }); glow(g, cx, cy - R - 120, 300, POWER.core, 0.15); }
  g.restore(); post(g, t, info);
}

// quick cuts through several places: the hero pops in at each one
export function montageShot(g, t, info) {
  const locs = info.locs || ['park', 'paris', 'tokyo'], n = locs.length, segT = info.dur / n, i = Math.min(n - 1, Math.floor(t / segT)), lt = t - i * segT;
  const cam = { z: 1.05 + 0.05 * lt / segT, x: (i % 2 ? 1 : -1) * 30 * lt / segT };
  const { GY, M } = place(g, t, cam, locs[i]);
  layer(g, cam, 1, (g) => actor(g, lt, { ...info, shot: { ...info.shot, start: info.shot.start + i * segT } }, { w: 'you', x: (i % 2 ? 160 : -160), s: 1.3, pose: ['wave', 'cheer', 'point', 'relaxed'][i % 4], expr: info.expr || 'happy', tp: 'in', at: 0.15 }, GY, M, 1));
  atmos(g, t, LOC[locs[i]], M);
  if (lt < 0.12) veil(g, '#ffffff', 0.6 * (1 - lt / 0.12));
  if (info.dim) veil(g, '#0a0614', info.dim);
  post(g, t, info);
}

// walking a tightrope over the night city
export function ropeShot(g, t, info) {
  const M = mood('night'), cam = camOf(t, info, { z: 1.05 }), wob = Math.sin(t * 1.7) * 0.12 + Math.sin(t * 4.3) * 0.04 * (info.wobble ?? 1);
  layer(g, cam, 0.1, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, E.H * 2, ['#05060f', M.sky[0], M.sky[1]]); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); FX.stars(g, t, { area: [-E.W, -E.H, E.W * 3, E.H], count: 300 }); FX.moon(g, E.W * 0.8, E.H * 0.18, 40); });
  layer(g, cam, 0.4, (g) => { FX.skyline(g, { x: -E.W, y: E.H * 1.25, w: E.W * 3, minH: 200, maxH: 520, color: '#0c0e1e', windowColor: alpha(M.practical, 0.8), lit: 0.45, seed: 30 }); FX.fog(g, E.H * 0.7, 400, '#2a3060', 0.4); });
  const y = E.H * 0.62, x = E.W / 2;
  layer(g, cam, 1, (g) => { g.strokeStyle = '#cfc8b8'; g.lineWidth = 4; g.beginPath(); g.moveTo(-E.W, y - 40); g.quadraticCurveTo(x, y + 24, E.W * 2, y - 40); g.stroke();
    const bal = { ...POSES.stand, eF: [44, -184], hF: [92, -196], eB: [-40, -184], hB: [-88, -176], fF: [10, 0], fB: [-14, 0] };
    g.save(); g.translate(x, y + 6); g.rotate(wob); drawFigure(g, { x: 0, y: 0, s: 1.4, facing: 1, outfit: YOU, pose: bal, expr: info.expr || 'nervous', rim: { color: M.rim, dir: [0.6, -1] }, shadow: false }); g.restore(); });
  FX.dust(g, t, { count: 30, color: '#bcd0ff', a: 0.3 }); post(g, t, info);
}

// falling through the void, atoms peeling off
export function fallShot(g, t, info) {
  const M = mood('void'); g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#020308', '#0a0e1a', '#121a2e']); g.fillRect(0, 0, E.W, E.H);
  const r = rng(3); for (let i = 0; i < 120; i++) { const x = r() * E.W, y = ((r() * E.H - t * (600 + r() * 600)) % E.H + E.H) % E.H; seg(g, [[x, y], [x, y + 40 + r() * 60]], 2, alpha('#8fb8e8', 0.25)); }
  const x = E.W / 2 + Math.sin(t * 0.8) * 60, y = E.H * 0.62, rot = t * 0.9;
  drawFigure(g, { x, y, s: 1.6, facing: 1, outfit: YOU, pose: POSES.fall, expr: 'scared', rot, rim: { color: POWER.core, dir: [0, 1] }, shadow: false });
  g.save(); g.globalCompositeOperation = 'lighter'; const r2 = rng(9); for (let i = 0; i < 60; i++) { const ph = (t * 0.7 + r2()) % 1; circle(g, x + (r2() - 0.5) * 180 + Math.sin(i + t) * 20, y - 200 - ph * 600, 3 + r2() * 4, alpha(i % 2 ? POWER.core : POWER.edge, 0.8 * (1 - ph))); } g.restore();
  post(g, t, info);
}

// the mirror: you on the left, a reflection that is not quite you
export function mirrorShot(g, t, info) {
  const cam = camOf(t, info, { z: 1.1, y: -40 }); const { GY, M } = place(g, t, cam, 'bathroom');
  const mx = E.W / 2 + 230, my = GY - 690, mw = 440, mh = 500;
  layer(g, cam, 0.5, (g) => { g.save(); g.beginPath(); g.rect(mx - mw / 2, my, mw, mh); g.clip();
    const wrong = ease.inOut(prog(t, 0.6, info.dur * 0.8)); g.globalAlpha = 0.85 - 0.3 * wrong * (0.5 + 0.5 * Math.sin(t * 7));
    drawFigure(g, { x: mx - 30, y: my + mh * 0.42 + 208 * 2.2, s: 2.2, facing: -1, outfit: { ...YOU, color: mix(YOU.color, POWER.edge, wrong) }, pose: POSES.stand, expr: wrong > 0.5 ? 'smirk' : 'worried', look: [-0.3, 0], rim: { color: POWER.core, dir: [1, -0.4] }, shadow: false });
    g.restore(); glitch(g, t, 0.15 + 0.4 * wrong, 5); ring(g, mx, my + mh / 2, 0, 0, '#000'); });
  layer(g, cam, 1, (g) => drawFigure(g, { x: E.W / 2 - 330, y: GY + 120, s: 2.4, facing: 1, outfit: YOU, pose: POSES.stand, expr: 'scared', rim: { color: M.rim, dir: [1, -0.5] } }));
  FX.dust(g, t, { count: 20, color: '#cfe0ff', a: 0.25 }); post(g, t, info);
}

// freeze-frame: the hero mid-dissolve, particles hanging, cool tint, badge
export function freezeShot(g, t, info) {
  const cam = { z: 1.02 + 0.03 * t, r: -0.02 + 0.008 * t }; const loc = info.loc || 'parkSunset';
  const { GY, M } = place(g, 0, { z: 1.25, y: -60 }, loc); veil(g, '#0a0614', 0.25);
  layer(g, cam, 1, (g) => { const x = E.W / 2, s = 2.0, H = 220 * s; drawFigure(g, { x, y: GY + 60, s, facing: 1, outfit: YOU, pose: POSES.handsOnHead, expr: info.expr || 'scared', alpha: 0.8, rim: { color: POWER.core, dir: [0, -1] }, shadow: false });
    const r = rng(21); g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 260; i++) { const px = x + (r() - 0.5) * 140 * s, py = GY + 60 - r() * H, a = r() * 6.28, d = (30 + r() * 300) * (r() < 0.5 ? 1 : 0.3); const qx = px + Math.cos(a) * d + Math.sin(t * 0.6 + i) * 3, qy = py + Math.sin(a) * d * 0.6 - d * 0.3; circle(g, qx, qy, 2 + r() * 5, alpha([POWER.core, POWER.edge, POWER.bad][i % 3], 0.85)); } g.restore();
    FX.rings(g, x, GY + 60 - H / 2, t, { count: 3, r0: 160, r1: 640, speed: 0.3, color: '#e8f0ff', a: 0.3 }); });
  FX.drops(g, t, { count: 30, color: '#d8e4ff', rMax: 8, drift: 2 });
  tint(g, '#5070ff', 0.35);
  UI.badge(g, { str: info.badge || 'UNSTABLE', a: ease.out(prog(t, 0.3, 0.8)), color: POWER.bad });
  if (info.glitch) glitch(g, t, info.glitch, 9);
}

export function endShot(g, t, info) {
  UI.endScreen(g, t, { question: info.question || 'Would you ever risk it again?', cast: CAST, moodColors: ['#140e22', '#24183a', '#3a2238'], rim: POWER.core });
}

// ---------- 3D ----------
export const threeD = {
  init(T, info) {
    const v = info.v || 'city', mn = { traffic: 'golden', paris: 'golden', park: 'dusk', lab: 'interiorCool' }[v] || (v === 'storm' ? 'storm' : 'night'), M = mood(mn);
    const st = T.stage({ mood: mn, fov: 38, fog: v === 'lab' ? [10, 40] : [25, 110], keyPos: [-12, 14, -10], keyIntensity: v === 'city' || v === 'storm' ? 1.4 : 3.2, ambient: v === 'city' || v === 'storm' ? 1.2 : v === 'lab' ? 2.4 : 1.9 });
    const out = { stage: st, figs: [] }, TH = T.THREE;
    const lamp = (c, i, d, x, y, z) => { const l = new TH.PointLight(new TH.Color(c), i, d, 1.4); l.position.set(x, y, z); st.add(l); return l; };
    if (v !== 'lab') st.add(T.ground(300, 300, M.floor, T.tiles(M.floor, 12, [30, 30])));
    if (v === 'traffic' || v === 'city' || v === 'storm' || v === 'paris') {
      st.add(T.box(10, 0.02, 300, M.road, 0, 0.01, 0));
      for (let i = -12; i <= 12; i++) for (const sx of [-1, 1]) { const h = 6 + ((i * 7 + (sx > 0 ? 3 : 0)) % 9) * 2.2; const b = T.building(7, h, 7, { color: shade(M.wall, -0.2), win: M.practical, lit: v === 'traffic' || v === 'paris' ? 0.15 : 0.55, seed: 10 + i * 3 + sx }); b.position.set(sx * 10, 0, i * 9); st.add(b); }
      if (v === 'traffic') { const cols = ['#c9442a', '#3a6ea5', '#e8c04a', '#5a5a6a', '#7a3a8a', '#d8d8e0']; out.cars = []; for (let i = -14; i < 14; i++) for (const lx of [-2.5, 2.5]) { const c = T.box(1.8, 1.0, 4, cols[(i + 20 + (lx > 0 ? 2 : 0)) % 6], lx, 0.6, i * 6 + (lx > 0 ? 2 : 0)); st.add(c, T.box(1.6, 0.7, 2.2, '#2a2a3a', lx, 1.3, i * 6 + (lx > 0 ? 2 : 0) - 0.2)); } }
      if (v === 'paris') { const ef = new T.THREE.Group(); const c = shade(M.dark, -0.1); ef.add(T.cone(6, 30, c, 0, 15, 0, 4), T.box(8, 0.6, 8, c, 0, 8, 0), T.box(4, 0.5, 4, c, 0, 18, 0), T.cyl(0.15, 0.15, 6, c, 0, 32, 0)); ef.position.set(0, 0, -90); st.add(ef); }
      for (let i = -6; i <= 6; i++) lamp(v === 'traffic' || v === 'paris' ? '#ffd59a' : '#ffb860', v === 'traffic' || v === 'paris' ? 30 : 50, 16, (i % 2 ? 1 : -1) * 5, 4, i * 12);
      const you = T.figure3D(YOU, { rim: v === 'city' || v === 'storm' ? POWER.core : M.rim, pose: POSES.stand }); you.position.set(0, 0, 0); st.add(you); out.figs.push(you);
    }
    if (v === 'park') { st.add(T.ground(120, 120, shade(M.grass, -0.2))); const sun = T.sphere(3, T.basic('#ffd9a0'), 10, 8, -60); st.add(sun); lamp('#ffc68a', 80, 18, 3, 3.5, 2); lamp('#ffd59a', 30, 10, -2, 2.5, -1); for (let i = 0; i < 26; i++) { const a = i * 2.4, r = 9 + (i % 5) * 4; st.add(T.tree3D(Math.cos(a) * r, Math.sin(a) * r - 4, 1 + (i % 3) * 0.3, '#2a1f2a')); } st.add(T.box(2.2, 0.08, 0.6, '#1e1418', 0, 0.5, 0), T.box(2.2, 0.5, 0.08, '#1e1418', 0, 0.85, -0.28)); for (const x of [-1, 1]) st.add(T.box(0.08, 0.5, 0.5, '#1e1418', x, 0.25, 0)); const you = T.figure3D(YOU, { rim: M.rim, pose: POSES.sit }); you.position.set(0, 0.05, 0.1); you.rotation.y = -Math.PI / 2; st.add(you); out.figs.push(you); for (let i = -6; i <= 6; i++) { const b = T.building(6, 10 + (i % 4) * 5, 6, { color: shade(M.wall, -0.3), win: M.practical, lit: 0.3, seed: 50 + i }); b.position.set(i * 8, 0, -40); st.add(b); } }
    if (v === 'lab') { st.add(T.ground(40, 40, '#3e4468', T.tiles('#3e4468', 10, [8, 8]))); st.add(T.box(30, 8, 0.4, '#4a5080', 0, 4, -6)); lamp('#9fe0ff', 60, 14, 0, 3.5, 1); lamp('#cbd6ff', 30, 12, -4, 4, 3); const ring3 = new T.THREE.Mesh(new T.THREE.TorusGeometry(1.6, 0.18, 12, 48), T.mat('#cfe0ff')); ring3.position.set(0, 1.6, 0); st.add(ring3); out.ring = ring3; for (const x of [-4, 4]) { const w = T.windowPane(2.4, 1.4, { glowColor: '#7fd0d6', cols: 1, rows: 1, power: 1 }); w.position.set(x, 2.2, -5.75); st.add(w); }
      const you = T.figure3D(YOU, { rim: POWER.core, pose: POSES.stand }); st.add(you); out.figs.push(you); const doc = T.figure3D(WHO.doc, { rim: '#b8c6ff', pose: POSES.point }); doc.position.set(-3, 0, 1); doc.rotation.y = 0.3; st.add(doc); }
    return out;
  },
  draw(s, t, info, T) {
    const v = info.v || 'city', d = info.dur;
    if (v === 'traffic') T.dolly(s.stage.camera, t, [[0, { pos: [0, 16, 34], look: [0, 0, 0] }], [d, { pos: [0.5, 5, 13], look: [0, 1, 0] }]]);
    else if (v === 'city' || v === 'storm') T.dolly(s.stage.camera, t, [[0, { pos: [0, 40, 60], look: [0, 0, -10] }], [d, { pos: [0, 18, 26], look: [0, 1, 0] }]]);
    else if (v === 'paris') T.dolly(s.stage.camera, t, [[0, { pos: [0, 3, 22], look: [0, 6, -60] }], [d, { pos: [0, 10, 40], look: [0, 12, -80] }]]);
    else if (v === 'park') T.orbit(s.stage.camera, t, { target: [0, 1.4, -2], radius: [7, 5], height: [1.8, 1.3], from: 0.6, to: 1.2, dur: d });
    else if (v === 'lab') { s.ring.rotation.x = Math.PI / 2; s.ring.position.y = 0.2 + 1.6 * (0.5 + 0.5 * Math.sin(t * 1.4)); T.orbit(s.stage.camera, t, { target: [0, 1, 0], radius: 7, height: 2.6, from: -0.8, to: 0.2, dur: d }); }
  },
  overlay(g, t, info) {
    const v = info.v; if (v === 'storm') { FX.rain(g, t, { count: 300 }); const f = Math.max(0, Math.sin(t * 2.1) - 0.94) * 14; if (f > 0) veil(g, '#dfe6ff', Math.min(0.5, f)); }
    if (v === 'city') FX.dust(g, t, { count: 30, color: '#bcd0ff', a: 0.3 }); else FX.dust(g, t, { count: 30, color: '#ffe2bd', a: 0.3 });
    if (info.label) UI.readout(g, { label: null, value: info.label, x: V(140, 90), y: V(140, 160), a: ease.out(prog(t, 0.4, 0.8)) * clamp((info.dur - t) / 0.3) });
    post(g, t, info);
  },
};
