// sets/world.js — every location in the film as data + painters. place(g, t, cam, loc) draws the set and
// returns { GY, CX, M, L }. Characters go on at depth 1 afterwards. Walls, floors and skies extend past the frame.
import { E, V, mood, layer, backdrop, rr, seg, circle, poly, linGrad, radGrad, glow, alpha, shade, mix, rng, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

// out: outdoor sets. far: horizon painter. mid: mid-ground painter. floor: ground type. sky: extra sky detail.
// in: indoor sets. view: what the window shows. props: furniture painter.
export const LOC = {
  park:       { mood: 'golden', out: 1, far: 'skyline', mid: 'trees', floor: 'grass', sky: 'sun', dust: '#ffe2bd' },
  parkSunset: { mood: 'dusk', out: 1, far: 'skyline', mid: 'trees', floor: 'grass', sky: 'sunLow', dust: '#ffd2a8' },
  beach:      { mood: 'golden', out: 1, far: 'ocean', mid: 'palms', floor: 'sand', sky: 'sunSea', dust: '#fff0d8' },
  tokyo:      { mood: 'night', out: 1, far: 'neon', mid: 'neonFacades', floor: 'road', sky: 'stars', dust: '#ff9ad8' },
  highlands:  { mood: 'golden', out: 1, far: 'hills', mid: 'stones', floor: 'grass', sky: 'sun', fog: 1, dust: '#ffe9c8' },
  himalaya:   { mood: 'storm', out: 1, far: 'peaks', mid: 'none', floor: 'snow', sky: 'sunCold', snow: 1 },
  street:     { mood: 'golden', out: 1, far: 'skyline', mid: 'facades', floor: 'road', sky: 'sun', lamps: 1, dust: '#ffe2bd' },
  streetNight:{ mood: 'night', out: 1, far: 'skyline', mid: 'facades', floor: 'road', sky: 'moon', lamps: 1, dust: '#bcd0ff' },
  paris:      { mood: 'golden', out: 1, far: 'eiffel', mid: 'cafeFront', floor: 'cobble', sky: 'sun', dust: '#ffe2bd' },
  ocean:      { mood: 'golden', out: 1, far: 'ocean', mid: 'none', floor: 'water', sky: 'sunSea', dust: '#fff0d8' },
  broadway:   { mood: 'night', out: 1, far: 'skyline', mid: 'marquee', floor: 'road', sky: 'stars', lamps: 1, dust: '#ffd59a' },
  marrakech:  { mood: 'dusk', out: 1, far: 'minaret', mid: 'stalls', floor: 'cobble', sky: 'sunLow', dust: '#ffcf8a' },
  lawn:       { mood: 'golden', out: 1, far: 'trees', mid: 'house', floor: 'grass', sky: 'sun', dust: '#ffe2bd' },
  storm:      { mood: 'storm', out: 1, far: 'skyline', mid: 'none', floor: 'road', sky: 'storm', rain: 1 },
  void:       { mood: 'void', out: 1, far: 'none', mid: 'none', floor: 'none', sky: 'stars' },
  bedroom:    { mood: 'interiorWarm', view: 'sunrise', props: 'bed' },
  bedroomNight:{ mood: 'interiorCool', view: 'night', props: 'bed', dark: 1 },
  office:     { mood: 'interiorCool', view: 'city', props: 'desk' },
  living:     { mood: 'interiorWarm', view: 'sunrise', props: 'couch' },
  party:      { mood: 'interiorCool', view: 'night', props: 'couch', party: 1 },
  grocery:    { mood: 'interiorCool', view: 'none', props: 'shelves', bright: 1 },
  kitchen:    { mood: 'interiorWarm', view: 'sunrise', props: 'kitchen' },
  lab:        { mood: 'interiorCool', view: 'city', props: 'lab' },
  studio:     { mood: 'interiorCool', view: 'none', props: 'studio', dark: 1 },
  hotel:      { mood: 'interiorCool', view: 'night', props: 'bed', dark: 1 },
  bathroom:   { mood: 'interiorCool', view: 'none', props: 'bath', dark: 1 },
  electronics:{ mood: 'interiorCool', view: 'night', props: 'screens', dark: 1 },
};

export const ground = () => E.H * V(0.8, 0.68);

export function place(g, t, cam, name = 'park', o = {}) {
  const L = LOC[name] || LOC.park, M = mood(o.mood || L.mood), GY = ground(), CX = E.W / 2;
  if (L.out) outdoor(g, t, cam, L, M, GY, CX, o); else indoor(g, t, cam, L, M, GY, CX, o);
  return { GY, CX, M, L };
}

// ---------------- outdoor ----------------
function outdoor(g, t, cam, L, M, GY, CX, o) {
  const dark = shade(M.dark, -0.2);
  layer(g, cam, 0.1, (g) => {
    backdrop(g, M.sky);
    if (L.sky === 'stars' || L.mood === 'night' || L.mood === 'void') FX.stars(g, t, { area: [-E.W, -E.H, E.W * 3, GY + E.H * 0.6], count: 260 });
    if (L.sky === 'sun') FX.sun(g, CX + 520, GY - 520, 60, '#fff3dc', M.key, 5);
    if (L.sky === 'sunLow' || L.sky === 'sunSea') FX.sun(g, CX + 380, GY - 300, 80, '#fff3dc', M.key, 6);
    if (L.sky === 'sunCold') FX.sun(g, CX - 520, GY - 600, 50, '#ffffff', '#cfe0ff', 4);
    if (L.sky === 'moon') FX.moon(g, CX + 560, GY - 640, 44);
    if (L.sky === 'storm') { FX.clouds(g, { y: GY - 900, h: 380, color: '#0b0e1c', a: 0.6, seed: 4, count: 9 }); const fl = Math.max(0, Math.sin(t * 2.3) - 0.93) * 14; if (fl > 0) { const lx = CX - 400 + (Math.floor(t * 2.3 / 6.28) % 3) * 400; FX.lightning(g, { x1: lx, y1: GY - 900, x2: lx - 80, y2: GY - 260, seed: Math.floor(t), a: Math.min(1, fl) }); } }
    if (L.sky === 'sun' || L.sky === 'sunLow') FX.clouds(g, { y: GY - 760, h: 200, color: '#ffe7c7', a: 0.14, seed: 3 });
    if (L.sky === 'sunLow' || L.sky === 'sun') FX.godRays(g, CX + (L.sky === 'sun' ? 520 : 380), GY - (L.sky === 'sun' ? 520 : 300), { count: 12, angle: Math.PI * 0.75, spread: 1.6, len: 1800, a: 0.04, t });
  });
  layer(g, cam, 0.3, (g) => far(g, t, L, M, GY, CX));
  layer(g, cam, 0.6, (g) => mid(g, t, L, M, GY, CX));
  layer(g, cam, 0.9, (g) => {
    floor(g, t, L, M, GY, CX);
    if (L.lamps) for (const x of [-900, -260, 420, 1060]) { FX.lampPost(g, CX + x, GY - 10, 340, { light: M.practical, a: 0.2 }); FX.pool(g, CX + x + 40, GY + 10, 170, 30, M.practical, 0.25); }
  });
  if (L.fog) FX.fog(g, GY - 260, 260, M.fog, 0.35);
}

function far(g, t, L, M, GY, CX) {
  const c = mix(M.sky[M.sky.length - 1], M.dark, 0.72), c2 = mix(M.sky[1] || M.sky[0], M.dark, 0.55);
  switch (L.far) {
    case 'skyline': FX.skyline(g, { x: -E.W, y: GY - 120, w: E.W * 3, minH: 120, maxH: 420, color: c, windowColor: alpha(M.practical, 0.6), lit: L.mood === 'night' || L.mood === 'storm' ? 0.35 : 0.12, seed: 8 }); break;
    case 'neon': {
      FX.skyline(g, { x: -E.W, y: GY - 80, w: E.W * 3, minH: 220, maxH: 620, color: shade(M.wall, -0.3), windowColor: alpha(M.practical, 0.7), lit: 0.4, seed: 14 });
      const r = rng(31); for (let i = 0; i < 26; i++) { const x = -E.W + r() * E.W * 3, y = GY - 200 - r() * 380, w = 30 + r() * 40, h = 90 + r() * 120, col = ['#ff4fa8', '#3fe6ff', '#ffd45a', '#9b6bff'][i % 4]; const fl = 0.75 + 0.25 * Math.sin(t * 3 + i * 2.1); rr(g, x, y, w, h, 6); g.fillStyle = alpha(col, 0.8 * fl); g.fill(); glow(g, x + w / 2, y + h / 2, 160, col, 0.25 * fl); for (let k = 0; k < 3; k++) { g.fillStyle = alpha('#ffffff', 0.6); g.fillRect(x + w * 0.3, y + 14 + k * h / 3.4, w * 0.4, 8); } }
      break; }
    case 'hills': FX.hills(g, { y: GY - 300, amp: 120, color: mix(c2, M.sky[2] || M.sky[1], 0.4), seed: 3, freq: 0.002 }); FX.hills(g, { y: GY - 170, amp: 90, color: c2, seed: 6, freq: 0.003 }); FX.hills(g, { y: GY - 60, amp: 50, color: shade(M.grass, -0.45), seed: 9, freq: 0.004 }); break;
    case 'peaks': {
      const peaks = [[-700, 640], [-180, 820], [380, 700], [900, 860], [1500, 620], [2100, 760], [-1200, 720]];
      for (const [x, h] of peaks) { poly(g, [[CX + x - h * 0.9, GY], [CX + x, GY - h], [CX + x + h * 0.9, GY]], shade(M.wall, -0.1)); poly(g, [[CX + x - h * 0.26, GY - h * 0.7], [CX + x, GY - h], [CX + x + h * 0.26, GY - h * 0.7], [CX + x + 30, GY - h * 0.62], [CX + x - 40, GY - h * 0.66]], '#e8eeff'); poly(g, [[CX + x, GY - h], [CX + x + h * 0.9, GY], [CX + x + h * 0.3, GY]], alpha('#000000', 0.22)); }
      FX.fog(g, GY - 260, 300, '#cfd8ff', 0.25); break; }
    case 'ocean': {
      const hy = GY - 150; g.fillStyle = linGrad(g, 0, hy, 0, GY + 200, [mix(M.sky[2] || M.sky[1], '#2a4a6a', 0.5), '#1d3550', '#122236']); g.fillRect(-E.W, hy, E.W * 3, E.H);
      g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 26; i++) { const y = hy + 6 + i * i * 0.6, w = 260 - i * 6; g.fillStyle = alpha(M.key, 0.35 - i * 0.012); g.fillRect(CX + 380 - w / 2 + Math.sin(t * 1.5 + i) * 18, y, w, 3); } g.restore();
      break; }
    case 'eiffel': {
      FX.skyline(g, { x: -E.W, y: GY - 140, w: E.W * 3, minH: 80, maxH: 200, color: c, windowColor: alpha(M.practical, 0.5), lit: 0.12, seed: 22 });
      eiffel(g, CX + 360, GY - 120, 1.25, shade(c, -0.2), M.practical); break; }
    case 'minaret': {
      FX.skyline(g, { x: -E.W, y: GY - 120, w: E.W * 3, minH: 60, maxH: 160, color: c, windowColor: alpha(M.practical, 0.6), lit: 0.25, seed: 41 });
      const x = CX - 420, y = GY - 120; g.fillStyle = c; g.fillRect(x - 40, y - 520, 80, 520); g.fillRect(x - 52, y - 540, 104, 30); g.fillRect(x - 30, y - 620, 60, 80); circle(g, x, y - 640, 18, c);
      for (const d of [-1, 1]) { g.beginPath(); g.arc(CX + d * 620, y, 120, Math.PI, 0); g.fillStyle = c; g.fill(); } break; }
    case 'trees': for (let i = -8; i < 12; i++) FX.tree(g, CX + i * 190 + (i % 3) * 30, GY - 90, 1.3 + (i % 2) * 0.3, c); break;
  }
}

function mid(g, t, L, M, GY, CX) {
  const wall = shade(M.wall, -0.3), wd = shade(M.wall, -0.6);
  switch (L.mid) {
    case 'trees': for (const [x, s] of [[-860, 2.4], [-520, 1.9], [640, 2.2], [980, 2.6], [-1400, 2.2], [1500, 2.3]]) FX.tree(g, CX + x, GY - 10, s, shade(M.dark, -0.1));
      bench(g, CX - 40, GY - 20, wd); break;
    case 'palms': for (const [x, s] of [[-780, 1.2], [860, 1.4], [-1400, 1.1]]) palm(g, CX + x, GY - 30, s, shade(M.dark, -0.2)); break;
    case 'stones': for (const x of [-700, -420, 520, 860]) { rr(g, CX + x, GY - 150, 60, 150, 20); g.fillStyle = wd; g.fill(); g.fillStyle = alpha(M.rim, 0.3); g.fillRect(CX + x + 6, GY - 146, 6, 140); } break;
    case 'facades': for (let i = -4; i <= 4; i++) FX.facade(g, { x: CX + i * 420 - 200, y: GY - 10, w: 400, h: 380 + (i % 2) * 120, color: shade(wall, (i % 3) * 0.05), win: M.practical, dark: wd, cols: 4, rows: 3, lit: L.mood === 'night' ? 0.6 : 0.2, seed: 11 + i, door: i % 2 === 0 }); break;
    case 'neonFacades': for (let i = -4; i <= 4; i++) { FX.facade(g, { x: CX + i * 420 - 200, y: GY - 10, w: 400, h: 320, color: shade(M.wall, -0.4), win: '#ff9ad8', dark: wd, cols: 4, rows: 2, lit: 0.5, seed: 61 + i }); const col = i % 2 ? '#3fe6ff' : '#ff4fa8'; rr(g, CX + i * 420 - 150, GY - 360, 300, 46, 10); g.fillStyle = alpha(col, 0.9); g.fill(); glow(g, CX + i * 420, GY - 337, 260, col, 0.35); } break;
    case 'cafeFront': {
      g.fillStyle = linGrad(g, 0, GY - 520, 0, GY, [shade(wall, 0.05), wd]); g.fillRect(-E.W, GY - 520, E.W * 3, 520);
      for (let i = -5; i <= 5; i++) { const wx = CX + i * 320 - 110; FX.windowFrame(g, { x: wx, y: GY - 380, w: 220, h: 260, cols: 2, frame: wd, bar: 8 }, (g, x, y, w, h) => { g.fillStyle = linGrad(g, 0, y, 0, y + h, [M.practical, shade(M.practical, -0.6)]); g.fillRect(x, y, w, h); }); glow(g, wx + 110, GY - 250, 220, M.practical, 0.12); }
      for (let x = -E.W, k = 0; x < E.W * 2; x += 60, k++) { g.fillStyle = k % 2 ? '#e8dccb' : '#2f5a8a'; g.fillRect(x, GY - 470, 60, 56); g.beginPath(); g.arc(x + 30, GY - 414, 30, 0, Math.PI); g.fill(); }
      g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(-E.W, GY - 470, E.W * 3, 10); break; }
    case 'marquee': {
      for (let i = -4; i <= 4; i++) FX.facade(g, { x: CX + i * 440 - 210, y: GY - 10, w: 420, h: 560, color: shade(wall, -0.1), win: M.practical, dark: wd, cols: 4, rows: 4, lit: 0.55, seed: 71 + i });
      const mx = CX - 380, my = GY - 380; rr(g, mx, my, 760, 130, 10); g.fillStyle = '#1a1422'; g.fill(); glow(g, CX, my + 65, 520, '#ffd59a', 0.35);
      for (let k = 0; k < 40; k++) { const on = (Math.floor(t * 6) + k) % 3 ? 1 : 0.3; circle(g, mx + 10 + k * 19, my + 8, 5, alpha('#fff0c0', on)); circle(g, mx + 10 + k * 19, my + 122, 5, alpha('#fff0c0', on)); }
      text(g, 'BROADWAY', CX, my + 66, { size: 70, color: '#ffe6a8', font: FONTS.title, weight: 700, spacing: 8, glow: 24, glowColor: 'rgba(255,200,120,.8)' });
      break; }
    case 'stalls': {
      for (let i = -5; i <= 5; i++) { const x = CX + i * 340; poly(g, [[x - 160, GY - 300], [x + 160, GY - 300], [x + 190, GY - 240], [x - 190, GY - 240]], ['#8a2a2a', '#c9762a', '#5a2a6a'][(i + 6) % 3]); g.fillStyle = wd; g.fillRect(x - 150, GY - 240, 300, 240); g.fillStyle = shade(M.wall, -0.1); g.fillRect(x - 170, GY - 120, 340, 16);
        for (let k = 0; k < 6; k++) circle(g, x - 120 + k * 48, GY - 132, 16, ['#e0902a', '#c9442a', '#e8c04a', '#7a3a8a'][k % 4]); }
      for (let i = -10; i <= 10; i++) { const x = CX + i * 170, y = GY - 380 + Math.sin(i * 1.7) * 30; seg(g, [[x, y - 60], [x, y - 20]], 2, wd); rr(g, x - 14, y - 22, 28, 38, 8); g.fillStyle = '#ffcf8a'; g.fill(); glow(g, x, y, 90, '#ffb860', 0.5 + 0.1 * Math.sin(t * 3 + i)); }
      break; }
    case 'house': {
      const hx = CX + 120, hw = 900, hh = 380; g.fillStyle = wall; g.fillRect(hx - hw / 2, GY - hh, hw, hh); poly(g, [[hx - hw / 2 - 40, GY - hh], [hx, GY - hh - 220], [hx + hw / 2 + 40, GY - hh]], wd);
      for (const dx of [-300, 200]) FX.windowFrame(g, { x: hx + dx, y: GY - 300, w: 160, h: 140, cols: 2, rows: 2, frame: wd, bar: 8 }, (g, x, y, w, h) => { g.fillStyle = shade(M.practical, -0.5); g.fillRect(x, y, w, h); });
      FX.door(g, { x: hx - 40, y: GY, w: 110, h: 230, color: wd });
      for (let x = -E.W; x < E.W * 2; x += 40) { g.fillStyle = shade(M.wall, 0.1); g.fillRect(x, GY - 90, 12, 90); } g.fillRect(-E.W, GY - 74, E.W * 3, 10);
      break; }
  }
}

function floor(g, t, L, M, GY, CX) {
  switch (L.floor) {
    case 'grass': g.fillStyle = linGrad(g, 0, GY - 20, 0, GY + 400, [shade(M.grass, -0.35), shade(M.grass, -0.7)]); g.fillRect(-E.W, GY - 20, E.W * 3, E.H * 2);
      { const r = rng(5); g.strokeStyle = alpha(shade(M.grass, -0.1), 0.6); g.lineWidth = 2; for (let i = 0; i < 260; i++) { const x = -E.W + r() * E.W * 3, y = GY + r() * 260; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 3 + Math.sin(t + i) * 2, y - 10 - r() * 8); g.stroke(); } } break;
    case 'sand': g.fillStyle = linGrad(g, 0, GY - 30, 0, GY + 400, [mix('#d8b48a', M.dark, 0.35), mix('#a07a5a', M.dark, 0.6)]); g.fillRect(-E.W, GY - 30, E.W * 3, E.H * 2);
      { const w = (Math.sin(t * 0.9) * 0.5 + 0.5) * 40; g.fillStyle = alpha('#eaf4ff', 0.5); g.beginPath(); g.moveTo(-E.W, GY - 30); for (let x = -E.W; x <= E.W * 2; x += 40) g.lineTo(x, GY - 30 + w + Math.sin(x * 0.01 + t) * 8); g.lineTo(E.W * 2, GY - 30); g.fill(); } break;
    case 'snow': g.fillStyle = linGrad(g, 0, GY - 20, 0, GY + 400, ['#c9d2ec', '#7a86aa']); g.fillRect(-E.W, GY - 20, E.W * 3, E.H * 2); break;
    case 'water': g.fillStyle = linGrad(g, 0, GY - 160, 0, GY + 400, ['#1d3550', '#0c1626']); g.fillRect(-E.W, GY - 160, E.W * 3, E.H * 2);
      g.strokeStyle = alpha(M.key, 0.25); g.lineWidth = 3; for (let k = 0; k < 14; k++) { const y = GY - 140 + k * k * 4; g.beginPath(); for (let x = -E.W; x < E.W * 2; x += 30) g.lineTo(x, y + Math.sin(x * 0.012 + t * 2 + k) * (3 + k)); g.stroke(); } break;
    case 'road': g.fillStyle = linGrad(g, 0, GY - 20, 0, GY + 400, [shade(M.road, -0.1), shade(M.dark, -0.3)]); g.fillRect(-E.W, GY - 20, E.W * 3, E.H * 2);
      g.fillStyle = shade(M.road, 0.15); g.fillRect(-E.W, GY - 24, E.W * 3, 10);
      for (let x = -E.W; x < E.W * 2; x += 220) { g.fillStyle = alpha('#f2e6c8', 0.35); g.fillRect(x, GY + 120, 110, 8); }
      if (L.mood === 'night' || L.rain) { g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, 0, GY, 0, GY + 300, [alpha(M.practical, 0.12), alpha(M.practical, 0)]); g.fillRect(-E.W, GY, E.W * 3, 300); g.restore(); } break;
    case 'cobble': g.fillStyle = linGrad(g, 0, GY - 20, 0, GY + 400, [shade(M.floor, 0.05), shade(M.dark, -0.2)]); g.fillRect(-E.W, GY - 20, E.W * 3, E.H * 2);
      FX.floorLines(g, GY - 20, GY + 600, 'rgba(0,0,0,.25)', 0.08); break;
    case 'none': default: break;
  }
}

// ---------------- indoor ----------------
function indoor(g, t, cam, L, M, GY, CX, o) {
  const wall = shade(M.wall, L.dark ? -0.45 : -0.25), wd = shade(M.wall, -0.65);
  layer(g, cam, 0.5, (g) => {
    g.fillStyle = linGrad(g, 0, -E.H, 0, GY, [shade(wall, -0.4), wall]); g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H);
    for (let x = -E.W; x < E.W * 2; x += 600) { g.fillStyle = alpha('#000', 0.12); g.fillRect(x, -E.H, 14, GY + E.H); }
    if (L.view !== 'none') {
      const wx = CX - 340 + (o.windowX || 0), wy = GY - 640, ww = 680, wh = 380;
      FX.windowFrame(g, { x: wx, y: wy, w: ww, h: wh, cols: 3, frame: wd, bar: 10, blinds: L.view === 'city' ? 5 : 0 }, (g, x, y, w, h) => {
        const sky = L.view === 'night' ? mood('night').sky : L.view === 'city' ? mood('dusk').sky : mood('golden').sky;
        g.fillStyle = linGrad(g, 0, y, 0, y + h, sky); g.fillRect(x, y, w, h);
        if (L.view === 'sunrise') FX.sun(g, x + w * 0.62, y + h * 0.7, 46, '#fff7e6', M.key, 4);
        if (L.view === 'night') { FX.stars(g, 0, { area: [x, y, w, h * 0.6], count: 30 }); FX.moon(g, x + w * 0.75, y + h * 0.25, 22); }
        FX.skyline(g, { x, y: y + h, w, maxH: h * 0.55, color: alpha(shade(wall, -0.3), 0.85), windowColor: alpha(L.view === 'night' ? '#ffb860' : M.practical, 0.7), lit: L.view === 'night' ? 0.4 : 0.15, seed: 4 });
      });
      if (L.view !== 'night') FX.godRays(g, wx + ww / 2, wy + wh / 2, { count: 8, angle: Math.PI * 0.6, spread: 0.7, len: 900, a: 0.05, t });
      glow(g, wx + ww / 2, wy + wh / 2, 600, L.view === 'night' ? '#6a7ad0' : M.key, 0.14);
    }
    props(g, t, L, M, GY, CX, wall, wd, 'back');
  });
  layer(g, cam, 0.85, (g) => {
    g.fillStyle = linGrad(g, 0, GY - 30, 0, GY + 500, [shade(M.floor, L.dark ? -0.2 : 0.05), shade(M.dark, -0.3)]); g.fillRect(-E.W, GY - 30, E.W * 3, E.H * 2);
    g.fillStyle = shade(wall, -0.5); g.fillRect(-E.W, GY - 36, E.W * 3, 8);
    FX.floorLines(g, GY - 30, GY + 600, 'rgba(0,0,0,.2)', 0.07);
    FX.pool(g, CX + (L.view !== 'none' ? 0 : 0), GY + 20, 520, 80, L.view === 'night' ? '#8aa0ff' : M.key, L.bright ? 0.35 : 0.2);
    props(g, t, L, M, GY, CX, wall, wd, 'front');
  });
  if (L.party) { g.save(); g.globalCompositeOperation = 'lighter'; const cols = ['#ff4fa8', '#3fe6ff', '#ffd45a', '#9b6bff']; for (let i = 0; i < 4; i++) { const a = t * 1.3 + i * 1.6; FX.lightCone(g, E.W * (0.15 + i * 0.23), -20, { angle: Math.PI / 2 + Math.sin(a) * 0.5, spread: 0.18, len: 1100, color: cols[i], a: 0.16 }); } g.restore(); }
}

function props(g, t, L, M, GY, CX, wall, wd, part) {
  const dark = shade(M.dark, -0.2);
  switch (L.props) {
    case 'bed': if (part === 'front') FX.bed(g, { x: CX + 180, y: GY - 6, w: 520, color: mix(M.wall, '#5a5aa0', 0.5), frame: dark, pillow: '#d8d4e8' }); else lampShade(g, CX + 820, GY - 130, M); break;
    case 'desk': if (part === 'front') { desk(g, CX + 240, GY, dark); FX.screen(g, { x: CX + 140, y: GY - 300, w: 200, h: 120, glowC: '#7fd0d6', a: 0.25 }, (g, x, y, w, h) => { g.fillStyle = alpha('#7fd0d6', 0.5); for (let i = 0; i < 5; i++) g.fillRect(x + 14, y + 16 + i * 20, w * (0.3 + ((i * 37) % 50) / 100), 8); }); FX.chair(g, CX + 120, GY, 1.6, dark); } else FX.clock(g, CX - 700, GY - 560, 40, 9 * 3600 + t * 60, { face: '#e9e2ea' }); break;
    case 'couch': if (part === 'front') couch(g, CX, GY, L.party ? '#3a3a6a' : mix(M.wall, '#8a4a3a', 0.4), dark); else { lampShade(g, CX - 700, GY - 140, M); FX.screen(g, { x: CX + 560, y: GY - 420, w: 260, h: 150, glowC: '#9fc8ff', a: 0.2 }, () => {}); frame(g, CX - 560, GY - 520, M); } break;
    case 'shelves': if (part === 'back') { for (let k = -3; k <= 3; k++) shelf(g, CX + k * 460, GY, M, k); for (let k = -3; k <= 3; k++) { rr(g, CX + k * 460 - 120, GY - 760, 240, 24, 6); g.fillStyle = '#e8f6ff'; g.fill(); glow(g, CX + k * 460, GY - 748, 300, '#cfefff', 0.3); } } else FX.counter(g, { x: CX + 380, y: GY, w: 520, h: 120, color: dark, top: shade(M.wall, 0.1), doors: 4 }); break;
    case 'kitchen': if (part === 'back') { g.fillStyle = shade(wall, -0.25); g.fillRect(CX - 1100, GY - 760, 760, 200); g.fillRect(CX + 360, GY - 760, 760, 200); rr(g, CX + 700, GY - 400, 200, 400, 10); g.fillStyle = '#cfd2dc'; g.fill(); g.fillStyle = '#9a9eb0'; g.fillRect(CX + 870, GY - 330, 8, 90); } else { FX.counter(g, { x: CX - 1100, y: GY, w: 760, h: 140, color: dark, top: shade(M.wall, 0.15), doors: 6 }); FX.counter(g, { x: CX - 300, y: GY, w: 900, h: 140, color: dark, top: shade(M.wall, 0.15), doors: 7 }); } break;
    case 'lab': if (part === 'back') { for (const x of [-760, 520]) FX.screen(g, { x: CX + x, y: GY - 520, w: 260, h: 160, glowC: '#7fd0d6', a: 0.25 }, (g, x, y, w, h) => { g.strokeStyle = '#7fd0d6'; g.lineWidth = 2; g.beginPath(); for (let i = 0; i < 30; i++) g.lineTo(x + 8 + i * 8, y + h / 2 - Math.sin(i * 0.8 + t * 3) * 30 * (i % 6 === 0 ? 1.6 : 0.6)); g.stroke(); }); } else { FX.counter(g, { x: CX - 1000, y: GY, w: 640, h: 120, color: dark, top: shade(M.wall, 0.1), doors: 5 }); scanner(g, CX + 520, GY, t, M); } break;
    case 'studio': if (part === 'back') { for (let i = 0; i < 5; i++) FX.lightCone(g, CX - 800 + i * 400, -40, { angle: Math.PI / 2 + (i - 2) * 0.12, spread: 0.22, len: 1000, color: '#cfd8ff', a: 0.1 }); rr(g, CX - 360, GY - 640, 720, 320, 16); g.fillStyle = '#121a30'; g.fill(); glow(g, CX, GY - 480, 500, '#4a7aff', 0.25); text(g, 'THE DAY SHOW', CX, GY - 480, { size: 64, color: '#cfe0ff', font: FONTS.title, weight: 700, spacing: 6, glow: 20, glowColor: 'rgba(120,160,255,.8)' }); } else { couch(g, CX + 260, GY, '#2a3a6a', dark); desk(g, CX - 420, GY, dark); } break;
    case 'bath': if (part === 'back') { rr(g, CX - 260, GY - 700, 520, 560, 20); g.fillStyle = '#8a96b8'; g.fill(); rr(g, CX - 240, GY - 680, 480, 520, 14); g.fillStyle = linGrad(g, 0, GY - 680, 0, GY - 160, ['#2a3458', '#1a2038']); g.fill(); glow(g, CX, GY - 720, 300, '#e8f0ff', 0.35); } else { FX.counter(g, { x: CX - 400, y: GY, w: 800, h: 140, color: dark, top: '#c9d0e0', doors: 4 }); } break;
    case 'screens': if (part === 'back') { for (let i = -3; i <= 3; i++) for (let j = 0; j < 2; j++) FX.screen(g, { x: CX + i * 300 - 110, y: GY - 640 + j * 200, w: 220, h: 140, glowC: '#7fd0d6', a: 0.18 }, (g, x, y, w, h) => { g.fillStyle = alpha('#7fd0d6', 0.4); for (let k = 0; k < 4; k++) g.fillRect(x + 12, y + 16 + k * 26, w * (0.3 + ((i * 7 + j * 3 + k * 13) % 50) / 100), 9); }); } else { desk(g, CX - 520, GY, dark); desk(g, CX + 520, GY, dark); } break;
  }
}

// ---------------- prop helpers ----------------
export function eiffel(g, x, y, s, c, light) {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = c;
  g.beginPath(); g.moveTo(-170, 0); g.quadraticCurveTo(-60, -200, -26, -420); g.lineTo(-10, -620); g.lineTo(10, -620); g.lineTo(26, -420); g.quadraticCurveTo(60, -200, 170, 0); g.lineTo(110, 0); g.quadraticCurveTo(0, -150, -110, 0); g.closePath(); g.fill();
  g.fillRect(-90, -190, 180, 16); g.fillRect(-46, -410, 92, 12); g.fillRect(-4, -700, 8, 90);
  for (let i = 0; i < 14; i++) circle(g, -120 + i * 18 + Math.sin(i) * 4, -60 - i * 30 * (i < 7 ? 1 : 1.25) + 0, 2.2, alpha(light, 0.8));
  glow(g, 0, -700, 50, light, 0.6); g.restore();
}
export function bench(g, x, y, c) { g.fillStyle = c; g.fillRect(x - 140, y - 70, 280, 14); g.fillRect(x - 140, y - 130, 280, 12); g.fillRect(x - 140, y - 106, 280, 10); for (const d of [-120, 110]) g.fillRect(x + d, y - 70, 12, 70); }
function palm(g, x, y, s, c) { g.strokeStyle = c; g.lineWidth = 16 * s; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 40 * s, y - 220 * s, x + 20 * s, y - 420 * s); g.stroke(); for (let i = 0; i < 7; i++) { const a = -Math.PI + i * 0.5; g.lineWidth = 10 * s; g.beginPath(); g.moveTo(x + 20 * s, y - 420 * s); g.quadraticCurveTo(x + 20 * s + Math.cos(a) * 120 * s, y - 470 * s + Math.sin(a) * 40 * s, x + 20 * s + Math.cos(a) * 200 * s, y - 380 * s + Math.abs(Math.sin(a)) * 60 * s); g.stroke(); } }
function desk(g, x, y, c) { g.fillStyle = c; g.fillRect(x - 220, y - 160, 440, 18); g.fillRect(x - 200, y - 142, 14, 142); g.fillRect(x + 186, y - 142, 14, 142); g.fillRect(x + 60, y - 142, 120, 100); }
function couch(g, x, y, c, dark) { rr(g, x - 300, y - 230, 600, 130, 30); g.fillStyle = shade(c, -0.2); g.fill(); rr(g, x - 320, y - 130, 640, 100, 24); g.fillStyle = c; g.fill(); for (const d of [-330, 270]) { rr(g, x + d, y - 170, 60, 150, 24); g.fillStyle = shade(c, -0.1); g.fill(); } g.fillStyle = dark; g.fillRect(x - 290, y - 30, 16, 30); g.fillRect(x + 274, y - 30, 16, 30); }
function lampShade(g, x, y, M) { seg(g, [[x, y + 130], [x, y]], 6, shade(M.dark, -0.2)); poly(g, [[x - 50, y], [x + 50, y], [x + 34, y - 70], [x - 34, y - 70]], mix(M.practical, '#ffffff', 0.2)); glow(g, x, y - 20, 260, M.practical, 0.45); }
function frame(g, x, y, M) { rr(g, x, y, 200, 140, 6); g.fillStyle = shade(M.dark, -0.2); g.fill(); g.fillStyle = linGrad(g, 0, y + 12, 0, y + 128, mood('golden').sky); g.fillRect(x + 12, y + 12, 176, 116); }
function shelf(g, x, y, M, k) {
  const c = shade(M.wall, -0.5); g.fillStyle = c; g.fillRect(x - 180, y - 520, 360, 520);
  const r = rng(20 + k), cols = ['#e0902a', '#c9442a', '#5fb04a', '#e8c04a', '#d8b080', '#7a3a8a'];
  for (let row = 0; row < 4; row++) { const sy = y - 470 + row * 120; g.fillStyle = shade(M.wall, 0.1); g.fillRect(x - 170, sy + 80, 340, 10); for (let i = 0; i < 7; i++) { const col = cols[Math.floor(r() * cols.length)]; if (row % 2) { rr(g, x - 160 + i * 47, sy + 30, 40, 50, 16); g.fillStyle = col; g.fill(); } else circle(g, x - 140 + i * 47, sy + 60, 18, col); } }
}
function scanner(g, x, y, t, M) { g.strokeStyle = '#cfe0ff'; g.lineWidth = 24; g.beginPath(); g.ellipse(x, y - 220, 170, 240, 0, 0, 7); g.stroke(); g.strokeStyle = alpha('#7fd0d6', 0.6); g.lineWidth = 4; g.beginPath(); g.ellipse(x, y - 220, 150, 220, 0, 0, 7); g.stroke(); const sy = y - 440 + ((t * 220) % 440); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha('#7fd0d6', 0.35); g.fillRect(x - 150, sy, 300, 6); g.restore(); }
