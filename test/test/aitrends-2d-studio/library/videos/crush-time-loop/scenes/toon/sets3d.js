// toon/sets3d.js — bright low-poly toon sets. Each builder adds to a three-kit stage and returns anchor points.
// 1 unit = 1 m. Characters face +x by default; most sets leave a clear "stage" around the origin.
import * as THREE from 'three';
import { toon, withOutline, LIGHT } from './toon.js';

const rngf = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
export function M(geo, color, x = 0, y = 0, z = 0, o = {}) {
  const m = new THREE.Mesh(geo, typeof color === 'string' ? toon(color, o.mat) : color); m.position.set(x, y, z);
  m.castShadow = o.cast ?? true; m.receiveShadow = true; if (o.outline) withOutline(m, o.outline); if (o.rot) m.rotation.set(...o.rot); return m;
}
export const box = (w, h, d, c, x, y, z, o) => M(new THREE.BoxGeometry(w, h, d), c, x, y, z, o);
export const cyl = (rt, rb, h, c, x, y, z, o, seg = 16) => M(new THREE.CylinderGeometry(rt, rb, h, seg), c, x, y, z, o);
export const ball = (r, c, x, y, z, o) => M(new THREE.SphereGeometry(r, 16, 12), c, x, y, z, o);
export const glow = (w, h, c, x, y, z, rotY = 0) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c) })); m.position.set(x, y, z); m.rotation.y = rotY; return m; };
export function tex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; }
export const picture = (w, h, draw, x, y, z, rotY = 0) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex(512, Math.round(512 * h / w), draw) })); m.position.set(x, y, z); m.rotation.y = rotY; return m; };

// ---------- lighting rig for the toon look: bright sun + sky fill, sun direction feeds the ink rim shader ----------
export function light(st, o = {}) {
  const { THREE: _ } = { THREE };
  st.sun.color.set(o.sun || '#fff4e0'); st.sun.intensity = o.sunI ?? 2.6; st.sun.position.set(...(o.sunPos || [-8, 12, 7]));
  st.hemi.color.set(o.sky || '#cfe4ff'); st.hemi.groundColor.set(o.ground || '#8a7a68'); st.hemi.intensity = o.fill ?? 1.5;
  LIGHT.dir.copy(st.sun.position).normalize(); if (o.rim) LIGHT.rim.set(o.rim); else LIGHT.rim.set('#fff1d6');
  const R = st.composer.renderer; R.toneMapping = THREE.NeutralToneMapping; R.toneMappingExposure = o.exposure ?? 1.0;
  st.bloom.strength = o.bloom ?? 0.15; st.bloom.threshold = 0.95;
}
function skyTex(stops) { return tex(4, 256, (g, w, h) => { const gr = g.createLinearGradient(0, 0, 0, h); stops.forEach((c, i) => gr.addColorStop(i / (stops.length - 1), c)); g.fillStyle = gr; g.fillRect(0, 0, w, h); }); }
export function sky(st, stops) { st.scene.background = skyTex(stops); }
// tiling colour-variation texture: big surfaces (grass, snow, walls) never look like flat plastic.
// lines = vertical panel seams per tile, grime = dirt fading up from the bottom edge (walls)
export function mottled(base, o = {}) {
  const { size = 512, blobs = 260, v = 0.06, lines = 0, grime = 0, rep = [1, 1], seed = 9 } = o;
  const t = tex(size, size, (g, W, H) => { g.fillStyle = base; g.fillRect(0, 0, W, H); const r = rngf(seed), c = new THREE.Color(base), L = c.getHSL({}).l, vv = v * Math.min(1, 0.25 + L * 1.1);
    g.globalAlpha = 0.35; for (let i = 0; i < blobs; i++) { const x = r() * W, y = r() * H, rad = 8 + r() * 46; g.fillStyle = c.clone().offsetHSL(0, 0, (r() - 0.5) * 2 * vv).getStyle();
      for (const dx of [-W, 0, W]) for (const dy of [-H, 0, H]) { g.beginPath(); g.arc(x + dx, y + dy, rad, 0, 7); g.fill(); } } g.globalAlpha = 1;
    if (lines) { g.strokeStyle = 'rgba(0,0,0,.08)'; g.lineWidth = 2; for (let x = 0; x <= W; x += W / lines) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); } }
    if (grime) { const gr = g.createLinearGradient(0, H, 0, H * 0.65); gr.addColorStop(0, 'rgba(40,30,20,' + grime + ')'); gr.addColorStop(1, 'rgba(40,30,20,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...rep); return t;
}
export const tmat = (map) => new THREE.MeshToonMaterial({ map, gradientMap: toon('#fff').gradientMap });
// big ground plane with colour variation (600 m so its edge is always lost in the fog = no hard horizon line)
export const groundPlane = (st, c, o = {}) => st.add(M(new THREE.PlaneGeometry(600, 600), tmat(mottled(c, { rep: [120, 120], v: o.v ?? 0.07, seed: o.seed ?? 3 })), 0, 0, 0, { cast: false, rot: [-Math.PI / 2, 0, 0] }));

// ---------- props ----------
export function tree(x, z, s = 1, c = '#5aa84a') { const g = new THREE.Group(); g.add(cyl(0.12 * s, 0.16 * s, 1.6 * s, '#7a5236', 0, 0.8 * s, 0)); g.add(ball(0.9 * s, c, 0, 2.1 * s, 0, { outline: 0.02 })); g.add(ball(0.6 * s, c, 0.5 * s, 1.7 * s, 0.3 * s)); g.add(ball(0.55 * s, c, -0.45 * s, 1.8 * s, -0.25 * s)); g.position.set(x, 0, z); return g; }
export function pine(x, z, s = 1, c = '#2f7a4a') { const g = new THREE.Group(); g.add(cyl(0.1 * s, 0.12 * s, 0.6 * s, '#6a4a30', 0, 0.3 * s, 0)); for (let i = 0; i < 3; i++) g.add(M(new THREE.ConeGeometry((1 - i * 0.25) * s, 1.2 * s, 7), c, 0, (0.9 + i * 0.6) * s, 0)); g.position.set(x, 0, z); return g; }
export function house(x, z, o = {}) {
  const { w = 6, d = 5, h = 3.2, wall = '#e8b48a', roof = '#8a4a3a', rotY = 0, floors = 1 } = o, g = new THREE.Group();
  const H = h * floors; g.add(box(w, H, d, wall, 0, H / 2, 0, { outline: 0.02 }));
  { const hw = d / 2 + 0.35, rh = d * 0.42, L = w + 0.5, sh = new THREE.Shape(); sh.moveTo(-hw, 0); sh.lineTo(hw, 0); sh.lineTo(0, rh); sh.closePath();
    const geo = new THREE.ExtrudeGeometry(sh, { depth: L, bevelEnabled: false }); geo.translate(0, 0, -L / 2);
    g.add(M(geo, roof, 0, H, 0, { rot: [0, Math.PI / 2, 0], outline: 0.02 })); g.add(box(0.5, 0.9, 0.5, '#8a7a72', w * 0.25, H + rh * 0.55, d * 0.12, { outline: 0.01 })); } // gable roof + chimney
  for (let f = 0; f < floors; f++) for (const wx of [-w * 0.3, w * 0.3]) { g.add(box(0.06, 1.1, 1.1, '#ffffff', d / 2 + 0.01, f * h + 1.7, wx)); g.add(box(0.05, 0.95, 0.95, '#8fc4ec', d / 2 + 0.04, f * h + 1.7, wx, { cast: false })); }
  g.children.forEach((m) => { if (m.geometry.parameters?.width === 0.06) m.position.x = w / 2 + 0.01; if (m.geometry.parameters?.width === 0.05) m.position.x = w / 2 + 0.04; });
  g.add(box(0.06, 2.0, 1.0, '#6a3e2a', w / 2 + 0.02, 1.0, 0)); g.add(box(1.2, 0.18, 1.6, '#cfc6b8', w / 2 + 0.6, 0.09, 0));
  g.position.set(x, 0, z); g.rotation.y = rotY; return g;
}
export function fence(x0, x1, z, c = '#ffffff') { const g = new THREE.Group(); for (let x = x0; x <= x1; x += 0.4) g.add(box(0.08, 0.8, 0.08, c, x, 0.4, z)); g.add(box(x1 - x0, 0.06, 0.04, c, (x0 + x1) / 2, 0.6, z)); g.add(box(x1 - x0, 0.06, 0.04, c, (x0 + x1) / 2, 0.3, z)); return g; }
export function car(x, z, c = '#d64a33', rotY = 0) { const g = new THREE.Group(); g.add(box(4, 0.8, 1.8, c, 0, 0.7, 0, { outline: 0.015 })); g.add(box(2.2, 0.7, 1.6, c, -0.2, 1.4, 0, { outline: 0.015 })); g.add(box(2.0, 0.55, 1.62, '#9fd0f0', -0.2, 1.42, 0, { cast: false })); for (const [wx, wz] of [[1.3, 0.85], [1.3, -0.85], [-1.3, 0.85], [-1.3, -0.85]]) g.add(cyl(0.38, 0.38, 0.25, '#1a1a20', wx, 0.38, wz, { rot: [Math.PI / 2, 0, 0] })); g.position.set(x, 0, z); g.rotation.y = rotY; return g; }
export function bus(x, z, rotY = 0) { const g = new THREE.Group(); g.add(box(9, 2.6, 2.4, '#f2b51e', 0, 1.6, 0, { outline: 0.02 })); for (let i = 0; i < 6; i++) g.add(box(1.0, 0.8, 0.02, '#9fd0f0', -3.4 + i * 1.3, 2.2, 1.21, { cast: false })); g.add(box(9.02, 0.12, 2.42, '#1a1a20', 0, 1.2, 0)); for (const wx of [3, -3]) for (const wz of [1.1, -1.1]) g.add(cyl(0.5, 0.5, 0.3, '#1a1a20', wx, 0.5, wz, { rot: [Math.PI / 2, 0, 0] })); g.position.set(x, 0, z); g.rotation.y = rotY; return g; }
export function lampPost(x, z) { const g = new THREE.Group(); g.add(cyl(0.06, 0.08, 4, '#3a3a48', 0, 2, 0)); g.add(box(0.6, 0.12, 0.25, '#3a3a48', 0.25, 4, 0)); g.add(glow(0.4, 0.12, '#fff4c8', 0.35, 3.93, 0)); g.children[2].rotation.x = Math.PI / 2; g.position.set(x, 0, z); return g; }
export function bench(x, z, rotY = 0) { const g = new THREE.Group(); g.add(box(0.5, 0.06, 1.8, '#a0683e', 0, 0.48, 0, { outline: 0.01 })); g.add(box(0.06, 0.45, 1.8, '#a0683e', -0.25, 0.75, 0, { outline: 0.01 })); for (const zz of [-0.8, 0.8]) g.add(box(0.5, 0.48, 0.06, '#3a3a48', 0, 0.24, zz)); g.position.set(x, 0, z); g.rotation.y = rotY; return g; }
export function desk(x, z, rotY = 0, withChair = true) { const g = new THREE.Group(); g.add(box(0.7, 0.05, 1.1, '#d8b88a', 0, 0.74, 0, { outline: 0.01 })); for (const [a, b] of [[0.3, 0.5], [0.3, -0.5], [-0.3, 0.5], [-0.3, -0.5]]) g.add(box(0.04, 0.74, 0.04, '#5a5a68', a, 0.37, b)); if (withChair) { g.add(box(0.42, 0.05, 0.42, '#3a6ea5', -0.62, 0.45, 0, { outline: 0.01 })); g.add(box(0.05, 0.45, 0.42, '#3a6ea5', -0.85, 0.7, 0, { outline: 0.01 })); for (const [a, b] of [[-0.45, 0.18], [-0.45, -0.18], [-0.8, 0.18], [-0.8, -0.18]]) g.add(box(0.03, 0.45, 0.03, '#5a5a68', a, 0.22, b)); } g.position.set(x, 0, z); g.rotation.y = rotY; return g; }
export function window3(x, y, z, w, h, rotY = 0, skyC = ['#8ec4f0', '#d8eefc']) { const g = new THREE.Group(); g.add(picture(w, h, (c, W, H) => { const gr = c.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, skyC[0]); gr.addColorStop(1, skyC[1]); c.fillStyle = gr; c.fillRect(0, 0, W, H); c.fillStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.ellipse(W * 0.3, H * 0.35, W * 0.12, H * 0.06, 0, 0, 7); c.fill(); c.fillStyle = '#6aa85a'; c.fillRect(0, H * 0.8, W, H * 0.2); }, 0, 0, 0)); for (const [bw, bh, bx, by] of [[w + 0.12, 0.08, 0, h / 2], [w + 0.12, 0.08, 0, -h / 2], [0.08, h, -w / 2, 0], [0.08, h, w / 2, 0], [0.06, h, 0, 0]]) g.add(box(bw, bh, 0.08, '#ffffff', bx, by, 0.02)); g.position.set(x, y, z); g.rotation.y = rotY; return g; }

// ---------- rooms ----------
// a room: floor + 3 walls (back wall at x = -d/2 facing +x by default, open toward the camera side +z) — walls are planes facing inward
function room(st, o) {
  const { w = 10, d = 8, h = 3.2, wall = '#e6d6b8', floor = '#b89068', floorTex = null } = o;
  const f = M(new THREE.PlaneGeometry(w, d), floorTex ? new THREE.MeshToonMaterial({ map: floorTex, gradientMap: toon('#fff').gradientMap }) : floor, 0, 0, 0, { cast: false, rot: [-Math.PI / 2, 0, 0] }); st.add(f);
  const wm = (len, seed) => tmat(mottled(wall, { rep: [Math.max(1, Math.round(len / 4)), 1], v: 0.035, lines: o.panels ?? 0, grime: o.grime ?? 0.1, seed }));
  const back = M(new THREE.PlaneGeometry(w, h), wm(w, 4), 0, h / 2, -d / 2, { cast: false }); st.add(back);
  const left = M(new THREE.PlaneGeometry(d, h), wm(d, 5), -w / 2, h / 2, 0, { cast: false, rot: [0, Math.PI / 2, 0] }); st.add(left);
  const right = M(new THREE.PlaneGeometry(d, h), wm(d, 6), w / 2, h / 2, 0, { cast: false, rot: [0, -Math.PI / 2, 0] }); st.add(right);
  st.add(box(w, 0.12, 0.04, '#ffffff', 0, 0.06, -d / 2 + 0.02));
  return { w, d, h };
}
const checker = (a, b, n = 8) => { const t = tex(256, 256, (g, W, H) => { for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { g.fillStyle = (i + j) % 2 ? a : b; g.fillRect(i * W / n, j * H / n, W / n, H / n); } }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 4); return t; };
const planks = (c = '#c08a5a') => { const t = tex(256, 256, (g, W, H) => { g.fillStyle = c; g.fillRect(0, 0, W, H); g.strokeStyle = 'rgba(0,0,0,.18)'; g.lineWidth = 3; for (let y = 0; y <= H; y += 32) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); } }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 4); return t; };

export const SETS = {
  suburb(st, o = {}) {
    light(st, { sunPos: [-10, 14, 8] }); sky(st, ['#6fa8e0', '#a9d0f0', '#dceaf6']);
    groundPlane(st, '#79a362');
    st.add(box(200, 0.02, 7, '#4d5260', 0, 0.01, 4, { cast: false })); for (let x = -90; x < 90; x += 4) st.add(box(1.8, 0.022, 0.15, '#f2e6c8', x, 0.02, 4, { cast: false }));
    st.add(box(200, 0.14, 2, '#cfc6b8', 0, 0.07, 0, { cast: false })); st.add(box(200, 0.14, 2, '#cfc6b8', 0, 0.07, 8.5, { cast: false }));
    const walls = ['#e8b48a', '#a8d0e8', '#f2d48a', '#e8a0a0', '#c8e0b0'], roofs = ['#8a4a3a', '#5a6a8a', '#a0583a', '#6a4a6a', '#4a6a4a'];
    for (let i = -4; i <= 4; i++) { st.add(house(i * 9, -5, { wall: walls[(i + 5) % 5], roof: roofs[(i + 5) % 5], rotY: -Math.PI / 2, floors: 1 + ((i + 9) % 3 === 0 ? 1 : 0) })); st.add(fence(i * 9 - 3.5, i * 9 + 3.5, -1.3)); st.add(tree(i * 9 + 4.3, -2.2, 0.9 + ((i + 9) % 2) * 0.2)); }
    for (let i = -4; i <= 4; i++) st.add(house(i * 10 + 3, 15, { wall: walls[(i + 7) % 5], roof: roofs[(i + 6) % 5], rotY: Math.PI / 2 }));
    for (const x of [-12, 6, 22]) st.add(lampPost(x, 1.2));
    st.add(cyl(0.05, 0.05, 1.1, '#5a5a68', 2.4, 0.55, -0.6)); st.add(box(0.5, 0.35, 0.3, '#3a6ea5', 2.4, 1.2, -0.6, { outline: 0.01 }));
    if (o.bus) st.add(bus(o.busX ?? 14, 3, 0));
    if (o.cars) { st.add(car(-8, 5.2, '#d64a33')); st.add(car(18, 2.6, '#3a6ea5', Math.PI)); }
    st.scene.fog = new THREE.Fog(new THREE.Color('#dceaf6'), 40, 120);
    st.groundAt = (x, z) => (z >= -1 && z <= 1) || (z >= 7.5 && z <= 9.5) ? 0.14 : (z > 1 && z < 7.5) ? 0.02 : 0;   // stand on sidewalks/road
    return { door: [0, 0, -1.8], street: [0, 0, 0] };
  },
  classroom(st, o = {}) {
    light(st, { sunPos: [6, 10, 10], fill: 1.7 }); st.scene.background = new THREE.Color('#e6d6b8');
    room(st, { w: 12, d: 10, wall: '#efe2c4', floorTex: planks('#c89a68') });
    st.add(box(4.2, 1.6, 0.06, '#ffffff', 0, 1.7, -4.95, { outline: 0.015 })); st.add(box(4.4, 0.08, 0.15, '#a0a0aa', 0, 0.88, -4.9));
    st.add(picture(3.8, 1.3, (g, W, H) => { g.fillStyle = '#ffffff'; g.fillRect(0, 0, W, H); g.strokeStyle = '#2a3a8a'; g.lineWidth = 5; for (let r = 0; r < 4; r++) { g.beginPath(); for (let x = 30; x < W - 30; x += 6) g.lineTo(x, 40 + r * 40 + Math.sin(x * 0.12 + r) * 6); g.stroke(); } }, 0, 1.72, -4.9));
    for (const z of [-3, 0, 3]) st.add(window3(5.97, 1.8, z, 2, 1.4, -Math.PI / 2));
    for (let r = 0; r < 3; r++) for (let c = -1; c <= 1; c++) st.add(desk(c * 2.6, -1.6 + r * 2.0, -Math.PI / 2));
    st.add(box(1.4, 0.8, 0.7, '#a0683e', -3.6, 0.4, -3.8, { outline: 0.01 }));
    st.add(cyl(0.3, 0.3, 0.05, '#ffffff', 3.4, 2.6, -4.95, { rot: [Math.PI / 2, 0, 0], outline: 0.01 }));
    st.add(picture(0.8, 1.1, (g, W, H) => { g.fillStyle = '#1a2a5a'; g.fillRect(0, 0, W, H); g.fillStyle = '#f2b51e'; g.beginPath(); g.arc(W / 2, H * 0.45, W * 0.25, 0, 7); g.fill(); g.strokeStyle = '#e8a0a0'; g.lineWidth = 10; g.beginPath(); g.ellipse(W / 2, H * 0.45, W * 0.42, W * 0.1, -0.3, 0, 7); g.stroke(); }, -5.95, 2.0, -2, Math.PI / 2));
    st.add(box(0.04, 2.1, 1.0, '#8a5a3a', -5.97, 1.05, 2.5));
    return { teacher: [0, 0, -3.8], seats: [[-2.6, -1.6], [0, -1.6], [2.6, -1.6], [-2.6, 0.4], [0, 0.4], [2.6, 0.4], [-2.6, 2.4], [0, 2.4], [2.6, 2.4]] };
  },
  bedroom(st, o = {}) {
    const night = o.night; light(st, night ? { sun: '#9fb4ff', sunI: 1.2, sky: '#5a6aa0', fill: 0.9, sunPos: [6, 8, 6], rim: '#cfe0ff' } : { sunPos: [6, 9, 8], fill: 1.6 });
    st.scene.background = new THREE.Color(night ? '#1e2440' : '#e6d6b8');
    room(st, { w: 8, d: 7, wall: night ? '#4a5078' : '#a8c8e0', floorTex: planks(night ? '#5a4a58' : '#b07a4a') });
    st.add(box(2.1, 0.45, 1.3, '#f4f4f4', -2.6, 0.3, -2.6, { outline: 0.012 })); st.add(box(2.1, 0.12, 1.32, night ? '#3a4a8a' : '#e8453c', -2.4, 0.56, -2.6)); st.add(box(0.5, 0.16, 1.0, '#ffffff', -3.4, 0.62, -2.6)); st.add(box(0.08, 1.1, 1.4, '#a0683e', -3.68, 0.55, -2.6));
    st.add(picture(1.5, 1.0, (g, W, H) => { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#ff9a6a'); gr.addColorStop(0.55, '#ffd28a'); gr.addColorStop(0.56, '#3a9ad8'); gr.addColorStop(1, '#f2d8a0'); g.fillStyle = gr; g.fillRect(0, 0, W, H); g.fillStyle = '#fff3c0'; g.beginPath(); g.arc(W * 0.6, H * 0.52, W * 0.09, 0, 7); g.fill(); g.strokeStyle = '#2a4a2a'; g.lineWidth = 10; g.beginPath(); g.moveTo(W * 0.15, H); g.quadraticCurveTo(W * 0.2, H * 0.5, W * 0.12, H * 0.3); g.stroke(); }, -2.4, 1.9, -3.47));
    st.add(window3(3.97, 1.7, -1, 1.6, 1.3, -Math.PI / 2, night ? ['#0e1430', '#2a3060'] : ['#8ec4f0', '#d8eefc']));
    st.add(desk(2.6, 1.6, Math.PI, true)); st.add(box(0.5, 0.32, 0.04, '#2a2a34', 2.6, 1.0, 1.7, { rot: [0, Math.PI / 2, 0] }));
    if (night) { const lamp = new THREE.PointLight('#ffd28a', 6, 6, 1.5); lamp.position.set(-1.2, 1.2, -2.8); st.add(lamp); st.add(ball(0.12, '#ffe8b0', -1.2, 0.95, -2.9)); }
    return { bed: [-2.4, 0.62, -2.6], center: [0, 0, 0] };
  },
  lab(st, o = {}) {
    light(st, { sunPos: [4, 10, 8], sun: '#ffffff', fill: 1.9, sky: '#e8f4ff', rim: '#e8f6ff' }); st.scene.background = new THREE.Color('#dfe8ee');
    room(st, { w: 14, d: 10, h: 3.6, wall: '#dfe6ec', floorTex: checker('#d4dbe2', '#c2cbd4', 8), panels: 2, grime: 0.08 });
    st.add(box(14, 0.9, 0.03, '#9aa8b8', 0, 0.45, -4.98, { cast: false }));
    for (const [y, z] of [[3.35, -4.85], [3.15, -4.7]]) st.add(cyl(0.06, 0.06, 14, '#a8b0bc', 0, y, z, { rot: [0, 0, Math.PI / 2] }));
    for (const x of [2.6, 4.9]) { st.add(box(2.0, 0.05, 0.4, '#b8c0c8', x + 0.4, 2.0, -4.8)); st.add(box(2.0, 0.05, 0.4, '#b8c0c8', x + 0.4, 2.6, -4.8));
      for (let k = 0; k < 5; k++) { const c = ['#6fd8a8', '#ff8a5a', '#6fb8ff', '#ffd45a', '#c88aff'][k]; st.add(cyl(0.07, 0.09, 0.26, c, x - 0.4 + k * 0.38, 2.16, -4.8, { outline: 0.005 })); st.add(cyl(0.06, 0.06, 0.2, '#e8eef2', x - 0.2 + k * 0.32, 2.73, -4.8, { outline: 0.005 })); } }
    st.add(picture(1.2, 1.5, (g, W, H) => { g.fillStyle = '#1a2a4a'; g.fillRect(0, 0, W, H); g.strokeStyle = '#6fd8ff'; g.lineWidth = 8; for (let k = 0; k < 3; k++) { g.beginPath(); g.ellipse(W / 2, H * 0.45, W * 0.38, W * 0.13, k * 1.05, 0, 7); g.stroke(); } g.fillStyle = '#ffd45a'; g.beginPath(); g.arc(W / 2, H * 0.45, 18, 0, 7); g.fill(); }, -6.95, 2.0, -2.5, Math.PI / 2));
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 2.6, 32, 1, true), new THREE.MeshPhysicalMaterial({ color: '#cfefff', transparent: true, opacity: 0.22, roughness: 0.05, side: THREE.DoubleSide, depthWrite: false })); tube.position.set(o.tubeX ?? 1.5, 1.4, -1); st.add(tube);
    st.add(cyl(1.0, 1.0, 0.14, '#b8c4cc', o.tubeX ?? 1.5, 0.07, -1, { outline: 0.012 })); st.add(cyl(1.0, 1.0, 0.18, '#b8c4cc', o.tubeX ?? 1.5, 2.75, -1, { outline: 0.012 }));
    const ringG = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.03, 8, 48), new THREE.MeshBasicMaterial({ color: '#6fe6ff' })); ringG.rotation.x = Math.PI / 2; ringG.position.set(o.tubeX ?? 1.5, 0.16, -1); st.add(ringG);
    { const hz = new THREE.Mesh(new THREE.RingGeometry(1.25, 1.45, 48), new THREE.MeshToonMaterial({ map: tex(256, 32, (g, W, H) => { for (let x = -H, k = 0; x < W; x += 16, k++) { g.fillStyle = k % 2 ? '#1a1a1a' : '#f2c21e'; g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 16, 0); g.lineTo(x + 16 + H, H); g.lineTo(x + H, H); g.fill(); } }), gradientMap: toon('#fff').gradientMap })); hz.rotation.x = -Math.PI / 2; hz.position.set(o.tubeX ?? 1.5, 0.006, -1); st.add(hz); } // hazard ring
    for (const [x, z] of [[-4, -4.2], [-1.5, -4.2], [4.5, -4.2]]) { st.add(box(1.8, 0.95, 0.8, '#c8d0d8', x, 0.48, z, { outline: 0.012 })); st.add(box(1.2, 0.7, 0.05, '#1a2230', x, 1.5, z - 0.2, { outline: 0.01 })); st.add(glow(1.08, 0.58, '#6fd8e8', x, 1.5, z - 0.17)); }
    for (const x of [-4.5, 0, 4.5]) st.add(glow(2.4, 0.3, '#ffffff', x, 3.58, 0, 0)), st.children?.length;
    st.scene.children.filter((m) => m.geometry?.parameters?.width === 2.4).forEach((m) => (m.rotation.x = Math.PI / 2));
    return { tube: [o.tubeX ?? 1.5, 0, -1], ring: ringG, consoles: [[-4, -3.6], [-1.5, -3.6]] };
  },
  hallway(st, o = {}) {
    light(st, { sunPos: [4, 10, 6], fill: 1.8 }); st.scene.background = new THREE.Color('#dfe6ee');
    st.add(M(new THREE.PlaneGeometry(6, 60), new THREE.MeshToonMaterial({ map: checker('#e8e8e8', '#9aa4b0', 8), gradientMap: toon('#fff').gradientMap }), 0, 0, 0, { cast: false, rot: [-Math.PI / 2, 0, 0] }));
    for (const sx of [-1, 1]) { st.add(M(new THREE.PlaneGeometry(60, 3.4), '#e8e2d4', sx * 3, 1.7, 0, { cast: false, rot: [0, -sx * Math.PI / 2, 0] }));
      for (let z = -28; z < 28; z += 0.62) { st.add(box(0.5, 1.9, 0.58, '#3a72b8', sx * 2.72, 0.95, z, { outline: 0.008 })); st.add(box(0.02, 0.2, 0.06, '#c8d0d8', sx * 2.46, 1.2, z + 0.18)); } }
    st.add(M(new THREE.PlaneGeometry(6, 60), '#f4f0e8', 0, 3.4, 0, { cast: false, rot: [Math.PI / 2, 0, 0] }));
    for (let z = -26; z < 26; z += 4) st.add(glow(1.2, 0.3, '#ffffff', 0, 3.38, z)), 0;
    st.scene.children.filter((m) => m.geometry?.parameters?.width === 1.2).forEach((m) => (m.rotation.x = Math.PI / 2));
    const cols = ['#e8453c', '#f2b51e', '#3a9ad8', '#6db55a']; for (let z = -24; z < 24; z += 0.5) { const f = M(new THREE.ConeGeometry(0.1, 0.2, 3), cols[Math.abs(Math.round(z * 2)) % 4], 0, 3.0 - Math.abs(Math.sin(z * 0.6)) * 0.15, z, { rot: [Math.PI, 0, 0], cast: false }); st.add(f); }
    return {};
  },
  beach(st, o = {}) {
    const sunset = o.sunset; light(st, sunset ? { sun: '#ffc890', sunPos: [-20, 6, -10], fill: 1.3, sky: '#ffd0b0', rim: '#ffd9a8' } : { sunPos: [-10, 14, 6] });
    sky(st, sunset ? ['#5a6ab8', '#e89a8a', '#ffc98a', '#ffd2a8'] : ['#4f98e0', '#9fd0f2', '#d8ecf8']);
    st.add(M(new THREE.PlaneGeometry(600, 80), tmat(mottled('#ead2a0', { rep: [120, 16], v: 0.05, seed: 8 })), 0, 0, 20, { cast: false, rot: [-Math.PI / 2, 0, 0] }));
    const water = M(new THREE.PlaneGeometry(400, 200), new THREE.MeshToonMaterial({ color: '#2a8ad0', gradientMap: toon('#fff').gradientMap }), 0, 0.03, -100, { cast: false, rot: [-Math.PI / 2, 0, 0] }); st.add(water);
    st.add(box(400, 0.02, 1.2, '#eaf6ff', 0, 0.05, -0.4, { cast: false }));
    for (const [x, z, s] of [[-8, 4, 1.2], [9, 6, 1.4], [-16, 8, 1.1]]) { const g = new THREE.Group(); g.add(M(new THREE.CylinderGeometry(0.14, 0.22, 5 * s, 8), '#a07a4a', 0.3, 2.5 * s, 0, { rot: [0, 0, -0.12] })); for (let i = 0; i < 7; i++) { const lf = box(2.2 * s, 0.05, 0.5 * s, '#3a9a4a', 0, 0, 0); lf.position.set(0.6 + Math.cos(i * 0.9) * 1.0 * s, 5 * s, Math.sin(i * 0.9) * 1.0 * s); lf.rotation.set(0, -i * 0.9, -0.4); g.add(lf); } g.position.set(x, 0, z); st.add(g); }
    if (sunset) { const sun = new THREE.Mesh(new THREE.CircleGeometry(6, 32), new THREE.MeshBasicMaterial({ color: '#fff0c0' })); sun.position.set(-20, 6, -120); st.add(sun); }
    st.scene.fog = new THREE.Fog(new THREE.Color(sunset ? '#ffd2a8' : '#d8ecf8'), 60, 180);
    return { water };
  },
  park(st, o = {}) {
    const sunset = o.sunset; light(st, sunset ? { sun: '#ffc890', sunPos: [-14, 5, -6], fill: 1.2, sky: '#ffc8b0', rim: '#ffd9a8' } : { sunPos: [-10, 14, 6] });
    sky(st, sunset ? ['#4a5ab0', '#e08a8a', '#ffb87a', '#f2c09a'] : ['#6fa8e0', '#a9d0f0', '#dceaf6']);
    groundPlane(st, sunset ? '#5f8a52' : '#79a362', { seed: 5 });
    st.add(M(new THREE.PlaneGeometry(2.4, 200), '#d8c49a', 0, 0.01, 0, { cast: false, rot: [-Math.PI / 2, 0, Math.PI / 2] }));
    const r = rngf(7); for (let i = 0; i < 40; i++) { const x = (r() - 0.5) * 80, z = -6 - r() * 40; st.add(r() < 0.5 ? tree(x, z, 0.9 + r() * 0.6, sunset ? '#3a7a4a' : '#5aa84a') : pine(x, z, 1 + r() * 0.6)); }
    for (const x of [-6, 4]) st.add(bench(x, -1.8, 0)); for (const x of [-10, 0, 10]) st.add(lampPost(x, -1.4));
    if (sunset) { const sun = new THREE.Mesh(new THREE.CircleGeometry(5, 32), new THREE.MeshBasicMaterial({ color: '#fff0c0' })); sun.position.set(-40, 6, -100); st.add(sun); }
    st.scene.fog = new THREE.Fog(new THREE.Color(sunset ? '#f2c09a' : '#dceaf6'), 30, 110);
    return { bench: [4, 0, -1.8] };
  },
  street(st, o = {}) { // city street: Tokyo (neon) or generic downtown
    const tokyo = o.tokyo; light(st, tokyo ? { sun: '#ffe8d0', sunPos: [-6, 12, 8], fill: 1.4 } : { sunPos: [-8, 14, 6] });
    sky(st, tokyo ? ['#5a68b0', '#c890a8', '#e8b0a0'] : ['#6fa8e0', '#a9d0f0', '#dceaf6']);
    groundPlane(st, '#4d5260', { v: 0.05, seed: 7 });
    for (const z of [-4, 4]) st.add(box(200, 0.14, 3, '#cfc6b8', 0, 0.07, z, { cast: false }));
    const r = rngf(tokyo ? 11 : 5), cols = tokyo ? ['#e8e0d8', '#c8d0e0', '#e0c8c0', '#d8d8c0'] : ['#d8c8b0', '#b8c8d8', '#e0b8a0', '#c8c0d0'];
    for (const sx of [-1, 1]) for (let x = -60; x < 60; x += 6) { const h = 6 + r() * (tokyo ? 14 : 10); st.add(box(5.6, h, 6, cols[Math.floor(r() * 4)], x, h / 2, sx * 9, { outline: 0.02 }));
      for (let f = 1; f < h / 2.5; f++) { for (const wx of [-1.6, 0, 1.6]) st.add(box(0.9, 1.0, 0.04, r() < 0.25 ? '#ffd890' : '#8fc4ec', x + wx, f * 2.5, sx * (9 - 3.02), { cast: false })); st.add(box(5.7, 0.12, 0.18, '#a8a098', x, f * 2.5 - 0.75, sx * (9 - 3.05), { cast: false })); }
      st.add(box(1.2, 0.8, 1.0, '#9a9aa4', x - 1.2, h + 0.4, sx * 9, { outline: 0.01 })); if (r() < 0.5) st.add(cyl(0.6, 0.6, 1.4, '#7a6a5a', x + 1.4, h + 0.9, sx * 9 + 1, { outline: 0.01 }));
      if (tokyo) { const sc = ['#ff4f8a', '#3fd8ff', '#ffd45a', '#8a5aff'][Math.floor(r() * 4)]; st.add(glow(1.2, 2.6, sc, x + 2, 4 + r() * 3, sx * 5.9, sx > 0 ? Math.PI : 0)); st.add(box(5.6, 0.25, 1.2, '#e8453c', x, 2.8, sx * 5.4)); } }
    st.scene.fog = new THREE.Fog(new THREE.Color(tokyo ? '#e8b0a0' : '#dceaf6'), 30, 90);
    return {};
  },
  paris(st, o = {}) {
    light(st, { sun: '#fff0d8', sunPos: [-10, 12, 8] }); sky(st, ['#7fb0e0', '#bcdaf2', '#e8eef4']);
    groundPlane(st, '#c4b496', { v: 0.05, seed: 11 });
    for (let x = -30; x < 30; x += 7) { st.add(box(6.6, 9, 6, '#ece0c8', x, 4.5, -8, { outline: 0.02 })); st.add(box(6.8, 1.2, 6.2, '#5a6a80', x, 9.6, -8)); for (let f = 0; f < 3; f++) for (const wx of [-2, 0, 2]) st.add(box(1.0, 1.4, 0.04, '#8fc4ec', x + wx, 2 + f * 2.6, -4.98, { cast: false })); }
    for (let x = -10; x < 10; x += 0.8) st.add(box(0.8, 0.5, 1.4, Math.round(x / 0.8) % 2 ? '#c8302c' : '#ffffff', x, 3.2, -4.3, { rot: [0.5, 0, 0] }));
    for (const x of [-3, 1.5]) { st.add(cyl(0.5, 0.5, 0.04, '#ffffff', x, 0.74, -1.5, { outline: 0.008 })); st.add(cyl(0.04, 0.04, 0.74, '#3a3a48', x, 0.37, -1.5)); st.add(cyl(0.05, 0.04, 0.08, '#ffffff', x + 0.15, 0.8, -1.4)); }
    const ef = new THREE.Group(), c = '#7a6a5a'; ef.add(M(new THREE.CylinderGeometry(0.6, 7, 14, 4, 1), c, 0, 7, 0, { rot: [0, Math.PI / 4, 0] })); ef.add(M(new THREE.CylinderGeometry(0.2, 1.4, 16, 4, 1), c, 0, 21, 0, { rot: [0, Math.PI / 4, 0] })); ef.add(box(8, 0.6, 8, c, 0, 6, 0)); ef.add(box(3, 0.5, 3, c, 0, 14, 0)); ef.position.set(18, 0, -60); st.add(ef);
    st.scene.fog = new THREE.Fog(new THREE.Color('#e8eef4'), 40, 140);
    return { tables: [[-3, -1.5], [1.5, -1.5]] };
  },
  mountain(st, o = {}) {
    light(st, { sun: '#fff6e8', sunPos: [-10, 10, 8], fill: 1.4, sky: '#c8daf2', ground: '#8a96a8' }); sky(st, ['#3a78d0', '#8ab8ec', '#dde8f4']);
    groundPlane(st, '#e2eaf4', { v: 0.06, seed: 13 });
    const r = rngf(3), rock = ['#6a7488', '#7a8498', '#5f687a'];
    for (let i = 0; i < 16; i++) { const x = (r() - 0.5) * 160, z = -30 - r() * 70, h = 14 + r() * 28, seg = 6 + Math.floor(r() * 3), ry = r() * 3, pk = new THREE.Group();
      pk.add(M(new THREE.ConeGeometry(h * 0.7, h, seg), rock[i % 3], 0, h / 2, 0, { rot: [0, ry, 0] })); const sc = 0.32 + r() * 0.14;
      pk.add(M(new THREE.ConeGeometry(h * 0.7 * sc * 1.04, h * sc, seg), '#f4f7fb', 0, h * (1 - sc / 2) + 0.05, 0, { rot: [0, ry, 0] })); pk.position.set(x, 0, z); st.add(pk); }
    const ridge = M(new THREE.SphereGeometry(14, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), '#d6e0ee', -4, -2, -18, { cast: false }); ridge.scale.set(2.2, 0.45, 0.8); st.add(ridge);
    for (let i = 0; i < 30; i++) { const a = r() * Math.PI - Math.PI, d = 9 + r() * 18; st.add(pine(Math.cos(a) * d * 1.4, Math.sin(a) * d - 4, 0.9 + r() * 0.7, '#2f5a4a')); }
    for (let i = 0; i < 9; i++) { const rk = M(new THREE.DodecahedronGeometry(0.3 + r() * 0.5, 0), rock[i % 3], (r() - 0.5) * 12, 0.1, -1.5 - r() * 6, { outline: 0.01, rot: [r() * 3, r() * 3, 0] }); rk.scale.y = 0.6; st.add(rk); }
    st.add(M(new THREE.ConeGeometry(3, 2, 9), tmat(mottled('#e8eef8', { v: 0.05, seed: 2 })), 0, 0.2, -1, { cast: false }));
    st.add(cyl(0.025, 0.025, 1.4, '#5a4a3a', 0.4, 1.4, -1.2)); st.add(box(0.02, 0.32, 0.5, '#e8453c', 0.4, 1.9, -0.95, { outline: 0.005 })); // summit flag
    st.scene.fog = new THREE.Fog(new THREE.Color('#dde8f4'), 40, 140);
    return { peak: [0, 1.2, -1] };
  },
  hospital(st, o = {}) {
    light(st, { sun: '#ffffff', sunPos: [4, 10, 6], fill: 1.8, sky: '#eaf6ff' }); st.scene.background = new THREE.Color('#d8e6e4');
    room(st, { w: 16, d: 8, wall: '#d4e6e0', floorTex: checker('#e2e8ea', '#c8d2d6', 6), panels: 2, grime: 0.08 });
    st.add(box(16, 1.0, 0.03, '#7fb0aa', 0, 0.5, -3.98, { cast: false })); st.add(box(16, 0.05, 0.08, '#c8d4d8', 0, 1.02, -3.96, { cast: false })); // wainscot band + handrail
    for (const sx of [-1, 1]) st.add(box(0.03, 1.0, 8, '#7fb0aa', sx * 7.98, 0.5, 0, { cast: false }));
    for (let x = -6; x <= 6; x += 0.7) { st.add(box(0.6, 0.06, 0.5, '#3a8a9a', x, 0.45, -3.4)); st.add(box(0.6, 0.5, 0.06, '#3a8a9a', x, 0.72, -3.65)); }
    for (const x of [-2.5, 2.5]) { st.add(box(1.4, 0.85, 0.06, '#1a2230', x, 2.2, -3.95, { outline: 0.01 })); st.add(glow(1.28, 0.74, '#7fd8e8', x, 2.2, -3.91)); }
    for (const x of [-6.6, 6.6]) { st.add(box(1.3, 2.3, 0.06, '#9ab8c4', x, 1.15, -3.96, { outline: 0.01 })); st.add(box(0.5, 0.6, 0.02, '#cfe8f4', x, 1.7, -3.92, { cast: false })); st.add(box(0.04, 0.2, 0.06, '#e8e8e8', x + 0.45, 1.1, -3.9)); } // doors with windows
    st.add(picture(2.2, 0.45, (g, W, H) => { g.fillStyle = '#2a6a7a'; g.fillRect(0, 0, W, H); g.fillStyle = '#fff'; g.font = '900 64px Nunito'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('WAITING AREA', W / 2, H / 2 + 2); }, 0, 2.95, -3.95));
    st.add(cyl(0.28, 0.28, 0.05, '#ffffff', 4.6, 2.5, -3.95, { rot: [Math.PI / 2, 0, 0], outline: 0.01 })); st.add(box(0.02, 0.18, 0.01, '#222222', 4.6, 2.55, -3.92)); st.add(box(0.13, 0.02, 0.01, '#222222', 4.65, 2.5, -3.92)); // clock
    st.add(cyl(0.22, 0.17, 0.4, '#c88a5a', -7.2, 0.2, -3.3, { outline: 0.01 })); for (let k = 0; k < 6; k++) st.add(ball(0.28, '#4a8a4a', -7.2 + Math.cos(k) * 0.18, 0.7 + (k % 3) * 0.18, -3.3 + Math.sin(k) * 0.18)); // plant
    st.add(box(0.9, 1.05, 3.2, '#e8eef0', 6.6, 0.52, 1.0, { outline: 0.012 })); st.add(box(0.95, 0.06, 3.25, '#7fb0aa', 6.6, 1.07, 1.0)); // reception desk
    for (const x of [-5, 0, 5]) { const l = glow(2.0, 0.5, '#ffffff', x, 3.18, 0); l.rotation.x = Math.PI / 2; st.add(l); }
    return { screens: [[-2.5, 2.2, -3.91], [2.5, 2.2, -3.91]] };
  },
};
// news vans with satellite dishes
export function newsVan(x, z, rotY = 0) { const g = new THREE.Group(); g.add(box(4.6, 2.0, 2.0, '#f4f4f4', 0, 1.3, 0, { outline: 0.015 })); g.add(box(4.62, 0.4, 2.02, '#c8302c', 0, 1.1, 0)); g.add(cyl(0.6, 0.1, 0.2, '#e8e8e8', -1, 2.6, 0, { rot: [0, 0, 0.8] })); for (const wx of [1.5, -1.5]) for (const wz of [0.95, -0.95]) g.add(cyl(0.4, 0.4, 0.25, '#1a1a20', wx, 0.4, wz, { rot: [Math.PI / 2, 0, 0] })); g.position.set(x, 0, z); g.rotation.y = rotY; return g; }

// ================= sets added for "What If You Felt Zero Pain" =================
// flames: two nested unlit cones; animate with flick(list, t)
let _flameGeo = null;
const flameGeo = () => _flameGeo || (_flameGeo = new THREE.LatheGeometry(Array.from({ length: 15 }, (_, k) => { const t = k / 14; return new THREE.Vector2(0.3 * Math.sin(Math.PI * Math.pow(t, 0.45)) + 0.001, t * 0.85); }), 12));
export function flame(x, y, z, s = 1) { const g = new THREE.Group(), fm = (c, op) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: op, depthWrite: false });
  const o = new THREE.Mesh(flameGeo(), fm('#ff5a14', 0.9)); g.add(o);
  const i = new THREE.Mesh(flameGeo(), fm('#ffb02a', 0.95)); i.scale.set(0.62, 0.7, 0.62); i.position.y = 0.01; g.add(i);
  const c = new THREE.Mesh(flameGeo(), fm('#fff4c0', 1)); c.scale.set(0.3, 0.38, 0.3); c.position.y = 0.02; g.add(c);
  o.renderOrder = 4; i.renderOrder = 5; c.renderOrder = 6;
  g.position.set(x, y, z); g.scale.setScalar(s); g.userData.s = s; return g; }
export function flick(arr, t) { arr.forEach((f, i) => { const s = f.userData.s, k = 1 + 0.22 * Math.sin(t * 14 + i * 1.7) + 0.12 * Math.sin(t * 23 + i * 0.9); f.scale.set(s * (1.1 - 0.1 * k), s * k, s * (1.1 - 0.1 * k)); f.rotation.y = t * 2 + i; }); }
export function fireLight(st, x, y, z, i = 8, d = 9) { const l = new THREE.PointLight('#ff8a3a', i, d, 1.4); l.position.set(x, y, z); st.add(l); return l; }
const nightLight = (st, o = {}) => { light(st, { sun: '#9fb4ff', sunI: 1.15, sky: '#56669c', fill: 1.0, sunPos: [6, 10, 8], rim: '#cfe0ff', ground: '#2e2e40', ...o });
  if (!st.rimLight) { const l = new THREE.DirectionalLight('#8aa8ff', o.rimI ?? 1.2); l.position.set(-4, 7, -12); st.add(l); st.rimLight = l; } };
Object.assign(SETS, {
  // back wall z=-4 with counter + stove at x=0; fridge right; doorway in the left wall at z=1.5
  // kitchen: back wall z=-4 with counter + stove at x=0, fridge right, doorway in the left wall at z=1.5
  kitchen(st, o = {}) {
  light(st, { sunPos: [5, 10, 8], fill: 1.7 }); st.scene.background = new THREE.Color('#f2e6cc');
  const W = 10, D = 8, H = 3.2;
  st.add(M(new THREE.PlaneGeometry(W, D), '#d8c8a8', 0, 0, 0, { cast: false, rot: [-Math.PI / 2, 0, 0] }));
  for (let i = -5; i < 5; i++) for (let j = -4; j < 4; j++) if ((i + j) % 2 === 0) st.add(box(1, 0.006, 1, '#c8b494', i + 0.5, 0.004, j + 0.5, { cast: false }));
  st.add(M(new THREE.PlaneGeometry(W, H), '#f6e2b0', 0, H / 2, -D / 2, { cast: false }));
  st.add(M(new THREE.PlaneGeometry(D, H), '#f0d8a0', -W / 2, H / 2, 0, { cast: false, rot: [0, Math.PI / 2, 0] }));
  st.add(M(new THREE.PlaneGeometry(D, H), '#f0d8a0', W / 2, H / 2, 0, { cast: false, rot: [0, -Math.PI / 2, 0] }));
  for (let x = -4.4; x < 2.6; x += 0.3) for (let y = 0.95; y < 1.6; y += 0.3) st.add(box(0.28, 0.28, 0.01, (Math.round(x * 3.4 + y * 3.4)) % 2 ? '#ffffff' : '#bfe0e8', x + 0.15, y + 0.15, -3.99, { cast: false }));
  st.add(box(7, 0.9, 0.7, '#3a8a7a', -1, 0.45, -3.6, { outline: 0.012 })); st.add(box(7.1, 0.06, 0.75, '#f4f0e8', -1, 0.93, -3.58, { outline: 0.008 }));
  for (let x = -4.1; x < 2.4; x += 0.9) { st.add(box(0.84, 0.75, 0.02, '#4a9a8a', x + 0.42, 0.45, -3.24)); st.add(box(0.12, 0.03, 0.03, '#e8e8e8', x + 0.42, 0.75, -3.22)); }
  for (let x = -4.1; x < 2.4; x += 0.9) st.add(box(0.84, 0.75, 0.4, '#e8f0ec', x + 0.42, 2.25, -3.78, { outline: 0.01 }));
  st.add(box(1.0, 0.04, 0.6, '#2a2a34', 0, 0.97, -3.6, { outline: 0.008 }));
  for (const [x, z] of [[-0.24, -3.45], [0.24, -3.45], [-0.24, -3.75], [0.24, -3.75]]) { st.add(cyl(0.12, 0.12, 0.01, '#3a3a44', x, 0.995, z)); }
  const burner = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.012, 6, 24), new THREE.MeshBasicMaterial({ color: '#ff5a2a' })); burner.rotation.x = Math.PI / 2; burner.position.set(-0.24, 1.005, -3.45); st.add(burner);
  st.add(box(1.0, 0.7, 0.5, '#d0d4d8', 0, 2.2, -3.75, { outline: 0.01 }));
  st.add(box(0.95, 2.1, 0.75, '#e8eef2', 3.3, 1.05, -3.5, { outline: 0.014 })); st.add(box(0.03, 0.5, 0.04, '#8a96a8', 2.85, 1.3, -3.1)); st.add(box(0.96, 0.02, 0.76, '#b8c0c8', 3.3, 1.45, -3.5));
  st.add(window3(-2.6, 2.05, -3.97, 1.4, 0.8, 0));
  st.add(box(0.06, 2.3, 1.3, '#4a3a30', -4.97, 1.15, 1.5)); for (const z of [0.82, 2.18]) st.add(box(0.12, 2.4, 0.08, '#ffffff', -4.94, 1.2, z, { outline: 0.006 })); st.add(box(0.12, 0.08, 1.44, '#ffffff', -4.94, 2.36, 1.5, { outline: 0.006 }));
  st.add(box(1.2, 0.75, 0.8, '#c08a5a', 3.2, 0.375, 0.6, { outline: 0.012 })); st.add(box(1.25, 0.05, 0.85, '#d8a878', 3.2, 0.76, 0.6));
  return { stove: [-0.24, 1.0, -3.45], door: [-4.5, 0, 1.5] };
},
  // school gym: wood court, centre line along z at x=0 (dodgeball teams at ±x), bleachers on the back wall
  gym(st, o = {}) {
    light(st, { sunPos: [4, 12, 8], fill: 1.8 }); st.scene.background = new THREE.Color('#dfe8ee');
    room(st, { w: 22, d: 14, h: 6, wall: '#c8d8e8', floorTex: planks('#d8a868') });
    st.add(box(0.1, 0.012, 14, '#ffffff', 0, 0.006, 0, { cast: false })); const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.05, 4, 48), toon('#e8453c')); ring.rotation.x = Math.PI / 2; ring.position.y = 0.01; st.add(ring);
    for (let k = 0; k < 4; k++) st.add(box(18, 0.4 * (k + 1), 0.8, k % 2 ? '#3a6ea5' : '#4a7eb5', 0, 0.2 * (k + 1), -4.0 - k * 0.8, { outline: 0.01 }));
    st.add(box(0.1, 1.1, 1.8, '#ffffff', -10.9, 3.4, 0, { outline: 0.01 })); { const hp = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.025, 6, 24), toon('#ff6a1a')); hp.rotation.x = Math.PI / 2; hp.position.set(-10.5, 3.0, 0); st.add(hp); }
    for (let x = -9; x <= 9; x += 3) st.add(window3(x, 4.8, -6.97, 1.6, 0.9, 0));
    st.add(picture(3, 1, (g, W, H) => { g.fillStyle = '#e8453c'; g.fillRect(0, 0, W, H); g.fillStyle = '#fff'; let fs = 120; do { g.font = '900 ' + fs + 'px Nunito'; fs -= 4; } while (g.measureText('GO TIGERS!').width > W * 0.9 && fs > 20); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('GO TIGERS!', W / 2, H / 2); }, 0, 3.3, -6.96));
    return { };
  },
  // winter night campfire: snow, pines, fire at origin, log bench at x=-1.3 along z
  winterCamp(st, o = {}) {
    nightLight(st, { sunI: 0.8, fill: 0.8 }); sky(st, ['#0a1030', '#1a2a5a', '#2a3a68']);
    groundPlane(st, '#dfe8f4', { v: 0.06, seed: 19 });
    const r = rngf(13); for (let i = 0; i < 46; i++) { const a = r() * 6.28, d = 8 + r() * 30; let px = Math.cos(a) * d, pz = Math.sin(a) * d - 6; const dd = Math.hypot(px, pz); if (dd < 10) { px *= 10 / dd; pz *= 10 / dd; } st.add(pine(px, pz, 1.2 + r() * 0.8, '#1f5a3a')); }
    for (let i = 0; i < 9; i++) { const a = (i / 9) * 6.28; st.add(ball(0.14, '#8a8a96', Math.cos(a) * 0.55, 0.06, Math.sin(a) * 0.55, { outline: 0.006 })); }
    for (const a of [0.3, 1.9, 3.5]) st.add(cyl(0.07, 0.07, 0.9, '#6a4a30', Math.cos(a) * 0.15, 0.12, Math.sin(a) * 0.15, { rot: [0, a, Math.PI / 2 - 0.3] }));
    const fire = [flame(0, 0.05, 0, 1.0), flame(0.15, 0.05, 0.1, 0.7), flame(-0.12, 0.05, -0.08, 0.75)]; fire.forEach((f) => st.add(f)); fireLight(st, 0, 0.8, 0, 14, 12);
    st.add(cyl(0.22, 0.22, 2.2, '#7a5236', -1.3, 0.22, 0, { rot: [Math.PI / 2, 0, 0], outline: 0.008 }));
    const moon = new THREE.Mesh(new THREE.CircleGeometry(3, 32), new THREE.MeshBasicMaterial({ color: '#f4f0e0' })); moon.position.set(-30, 26, -80); st.add(moon);
    st.scene.fog = new THREE.Fog(new THREE.Color('#2a3a68'), 20, 70);
    return { fire, bench: [-1.3, 0, 0] };
  },
  // night street with the abandoned apartment building (front door at x=0, z=-2), frosty lawn, sidewalk z≈2.5, road beyond
  fireStreet(st, o = {}) {
    nightLight(st); sky(st, ['#060a1c', '#141c3a', '#262c4a']);
    groundPlane(st, '#3a3f52', { v: 0.06, seed: 17 });
    st.add(box(200, 0.03, 3.6, '#5a7a62', 0, 0.015, -0.2, { cast: false })); st.add(box(200, 0.14, 2, '#8a8a90', 0, 0.07, 2.6, { cast: false }));
    const bw = 12, bd = 7, bh = 10.5; st.add(box(bw, bh, bd, '#7a4434', 0, bh / 2, -2 - bd / 2, { outline: 0.02 })); st.add(box(bw + 0.3, 0.4, bd + 0.3, '#4a2a24', 0, bh, -2 - bd / 2));
    const r = rngf(21), wins = [];
    for (let f = 0; f < 3; f++) for (let k = -2; k <= 2; k++) { const x = k * 2.2, y = 1.9 + f * 3.2; if (f === 0 && k === 0) continue; const lit = f === 1;
      st.add(box(1.2, 1.5, 0.05, lit ? '#ff9a3a' : (r() < 0.4 ? '#1a1a22' : '#3a4458'), x, y, -1.97, { cast: false })); if (lit) { const w = glow(1.1, 1.4, '#ffb04a', x, y, -1.93); st.add(w); wins.push([x, y]); }
      st.add(box(1.4, 0.1, 0.2, '#5a3a2a', x, y - 0.8, -1.9)); }
    st.add(box(1.6, 2.4, 0.06, '#1a1414', 0, 1.2, -1.97)); st.add(box(1.9, 0.15, 0.3, '#5a3a2a', 0, 2.5, -1.9)); for (let k = 0; k < 3; k++) st.add(box(2.4, 0.15, 0.4, '#6a6a70', 0, 0.075 + k * 0.15, -1.6 + (2 - k) * 0.4 - 0.4));
    const fl = []; for (const [x, y] of wins) if (r() < 0.75) { const f = flame(x, y - 0.6, -1.85, 0.9 + r() * 0.5); fl.push(f); st.add(f); } fireLight(st, 0, 5, 0.5, 7, 14);
    for (const sx of [-1, 1]) { const h = 7 + r() * 3; st.add(box(8, h, 7, sx < 0 ? '#3a3a4a' : '#4a3a48', sx * 11, h / 2, -5.5, { outline: 0.02 })); }
    for (const x of [-7, 7]) { st.add(lampPost(x, 1.6)); const l = new THREE.PointLight('#ffd890', 6, 10, 1.5); l.position.set(x + 0.35, 3.8, 1.6); st.add(l); }
    st.scene.fog = new THREE.Fog(new THREE.Color('#262c4a'), 25, 80);
    return { flames: fl, door: [0, 0, -1.9] };
  },
  // burning room: charred walls, bed back-right, staircase left, doorway in the left wall at z=1.5
  fireRoom(st, o = {}) {
    light(st, { sun: '#ffe2c8', sunI: 1.5, sky: '#9a7a80', ground: '#3a2420', fill: 1.3, sunPos: [3, 8, 6], rim: '#ffc890', exposure: 1.0, bloom: 0.35 }); st.scene.background = new THREE.Color('#2a1814');
    room(st, { w: 10, d: 8, h: 3.2, wall: '#6e4a3c', floorTex: planks('#5a3a2a'), grime: 0.25 }); st.scene.fog = new THREE.Fog(new THREE.Color('#3a2420'), 6, 24);
    st.add(box(1.4, 0.4, 2.1, '#d8d0c8', 3.0, 0.3, -2.6, { outline: 0.01 })); st.add(box(1.42, 0.1, 1.5, '#8a5a9a', 3.0, 0.55, -2.3)); for (const [x, z] of [[2.35, -3.6], [3.65, -3.6], [2.35, -1.6], [3.65, -1.6]]) st.add(box(0.06, 0.3, 0.06, '#6a4a30', x, 0.15, z));
    for (let k = 0; k < 8; k++) st.add(box(1.2, 0.18, 0.42, '#6a4028', -3.8, 0.09 + k * 0.36, -0.9 - k * 0.42, { outline: 0.006 }));
    st.add(box(0.06, 2.3, 1.3, '#120a08', -4.97, 1.15, 1.5));
    const fl = [], r = rngf(31); for (const [x, z, s] of [[-3.6, -2.5, 1.3], [-4.2, -1.2, 1.1], [-3.2, -3.4, 1.4], [4.3, 0.5, 1.2], [-1.5, -3.6, 1.0], [1.0, -3.6, 1.2], [4.4, -1.0, 0.9], [-4.5, 3.0, 1.0], [0.2, 3.2, 0.8]]) { const f = flame(x, 0, z, s); fl.push(f); st.add(f); }
    fireLight(st, -3, 1.5, -2, 8, 10); fireLight(st, 3.5, 1.5, 0, 6, 9);
    return { flames: fl, bed: [3.0, 0, -2.6] };
  },
  // the hero's street at night (suburb with dark sky and lit lamps)
  suburbNight(st, o = {}) {
    const r = SETS.suburb(st, o); nightLight(st); sky(st, ['#060a1c', '#141c3a', '#2a3050']);
    st.scene.children.forEach((m) => { if (m.geometry?.parameters?.width === 600) m.material = tmat(mottled('#3a5444', { rep: [120, 120], v: 0.07, seed: 3 })); });
    for (const x of [-12, 6, 22]) { const l = new THREE.PointLight('#ffd890', 9, 12, 1.4); l.position.set(x + 0.35, 3.8, 1.2); st.add(l); }
    st.scene.fog = new THREE.Fog(new THREE.Color('#2a3050'), 25, 90); return r;
  },
});
export function van(x, z, rotY = 0, c = '#3a3d4a') { const g = new THREE.Group();
  g.add(box(4.8, 1.9, 2.0, c, 0, 1.25, 0, { outline: 0.015 })); g.add(box(4.82, 0.1, 2.02, '#55586a', 0, 0.62, 0)); g.add(box(4.82, 0.06, 2.02, '#6a6e80', 0, 1.6, 0));
  g.add(box(0.05, 0.75, 1.7, '#5a6e90', 2.41, 1.72, 0, { cast: false })); for (const sz of [1, -1]) { g.add(box(1.2, 0.6, 0.04, '#4a5a78', 1.5, 1.75, sz * 1.01, { cast: false })); g.add(box(0.04, 1.3, 0.02, '#1e2028', 0.6, 1.15, sz * 1.01)); }
  for (const sz of [0.7, -0.7]) { g.add(box(0.04, 0.2, 0.35, '#fff2c8', 2.42, 0.95, sz, { cast: false })); g.add(box(0.04, 0.18, 0.25, '#c8302c', -2.42, 0.95, sz, { cast: false })); }
  g.add(box(0.25, 0.25, 2.1, '#1e2028', 2.45, 0.45, 0)); g.add(box(0.25, 0.25, 2.1, '#1e2028', -2.45, 0.45, 0));
  for (const wx of [1.6, -1.6]) for (const wz of [0.95, -0.95]) { g.add(cyl(0.4, 0.4, 0.25, '#141418', wx, 0.4, wz, { rot: [Math.PI / 2, 0, 0] })); g.add(cyl(0.18, 0.18, 0.26, '#8a8e98', wx, 0.4, wz, { rot: [Math.PI / 2, 0, 0] })); }
  g.position.set(x, 0, z); g.rotation.y = rotY; return g; }

// ================= sets added for "What If GTA 6 Rules Were Real Life?" =================
// palm tree: curved trunk + drooping fronds
export function palm(x, z, s = 1, lean = 0.12) { const g = new THREE.Group();
  for (let k = 0; k < 6; k++) { const seg = cyl(0.13 * s * (1 - k * 0.06), 0.15 * s * (1 - k * 0.06), 0.9 * s, k % 2 ? '#a07a4a' : '#8f6a3e', lean * k * k * 0.12 * s, 0.45 * s + k * 0.88 * s, 0); seg.rotation.z = -lean * k * 0.18; g.add(seg); }
  const top = new THREE.Vector3(lean * 25 * 0.12 * s, 5.4 * s, 0);
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2, lf = new THREE.Group(); lf.position.copy(top); lf.rotation.y = a;
    for (let j = 0; j < 4; j++) { const p = box(0.55 * s, 0.04, 0.32 * s * (1 - j * 0.18), j % 2 ? '#3f9a4e' : '#4aa85a', 0.35 * s + j * 0.48 * s, -j * j * 0.09 * s, 0); p.rotation.z = -0.25 - j * 0.22; lf.add(p); } g.add(lf); }
  g.position.set(x, 0, z); return g; }
// gold wanted-level star (flat, glowing): returns a mesh facing +z
export function starMesh(r = 0.12, c = '#ffd23a') { const sh = new THREE.Shape(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r; i ? sh.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : sh.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: r * 0.25, bevelEnabled: false }), new THREE.MeshBasicMaterial({ color: new THREE.Color(c) })); withOutline(m, r * 0.08); m.scale.y = -1; return m; }
Object.assign(SETS, {
  // Miami street: road along x (center z = 4), sidewalk z = 0 (hospital side) and z = 8.5, pastel art-deco blocks, palms.
  // o.hospital: hospital front centered at x = 0, doors at (0, z = -1.48), sign above. Fronts face +z.
  miami(st, o = {}) {
    const sunset = o.sunset; light(st, sunset ? { sun: '#ffc890', sunPos: [-14, 6, 10], fill: 1.3, sky: '#ffc8b0', rim: '#ffd9a8' } : { sunPos: [-10, 14, 10], sun: '#fff1d6' });
    sky(st, sunset ? ['#4a5ab0', '#e08a8a', '#ffb87a', '#f2c09a'] : ['#4f98e0', '#9fd0f2', '#dcecf6']);
    groundPlane(st, '#7aa868', { seed: 21 });
    st.add(box(300, 0.02, 7, '#4d5260', 0, 0.01, 4, { cast: false })); for (let x = -140; x < 140; x += 4) st.add(box(1.8, 0.022, 0.15, '#f2e6c8', x, 0.02, 4, { cast: false }));
    // sidewalks: building side runs from the building fronts (z = -1.5) to the curb (z = 1); far side z = 7.5..9.5. Curb height 0.14.
    const swM = tmat(mottled('#d8cfc0', { rep: [80, 1], v: 0.04, seed: 5 }));
    st.add(M(new THREE.BoxGeometry(300, 0.14, 2.5), swM, 0, 0.07, -0.25, { cast: false })); st.add(M(new THREE.BoxGeometry(300, 0.14, 2), swM, 0, 0.07, 8.5, { cast: false }));
    // ground height under any point: used to stand characters on curbs/floors instead of sinking into them
    st.groundAt = (x, z) => (z >= -1.55 && z <= 1.0) || (z >= 7.5 && z <= 9.5) ? 0.14 : (z > 1.0 && z < 7.5) ? 0.02 : (o.hospital && z < -1.5 && z > -9.5 && Math.abs(x) < 1.6) ? 0.14 : 0;
    const deco = ['#f4b6c2', '#9fe0d8', '#ffe29a', '#c8b8f0', '#ffcfa0', '#a8d8f0'], r = rngf(o.seed || 41);
    for (const side of [-1, 1]) for (let x = -96; x <= 96; x += 12) { if (o.hospital && side < 0 && Math.abs(x) < 12) continue;
      const z = side < 0 ? -5 : 13.5, h = 6 + Math.floor(r() * 3) * 2.6, c = deco[Math.floor(r() * deco.length)], g = new THREE.Group();
      g.add(box(10.6, h, 7, c, 0, h / 2, 0, { outline: 0.02 })); for (let f = 1; f < h / 2.6; f++) g.add(box(10.7, 0.18, 7.1, '#ffffff', 0, f * 2.6, 0, { cast: false }));
      g.add(box(2.2, h + 1.2, 0.4, '#ffffff', -3.2, (h + 1.2) / 2, 3.5, { outline: 0.012 }));
      for (let f = 0; f < h / 2.6 - 0.5; f++) for (const wx of [0, 2.2, 4.2]) g.add(box(1.2, 1.1, 0.05, r() < 0.2 ? '#ffe8b0' : '#7fb8d8', wx - 0.8, 1.5 + f * 2.6, 3.52, { cast: false }));
      g.position.set(x, 0, z); if (side > 0) g.rotation.y = Math.PI; st.add(g); }
    for (let x = -90; x <= 90; x += 9) { if (o.hospital && Math.abs(x) < 3) continue; st.add(palm(x + 3.2, -0.6, 0.9 + r() * 0.25)); st.add(palm(x - 1.5, 9.1, 0.85 + r() * 0.3)); }
    for (const x of [-20, 14, 40]) st.add(lampPost(x, 1.0));
    if (o.hospital) {
      const H = new THREE.Group(), W = 22, D = 8, HH = 10;
      // front walls with a real doorway (3.2 m x 2.7 m) into a lit lobby, so people can walk out of the building
      const wallM = tmat(mottled('#eef2f2', { v: 0.03, lines: 6, seed: 7 })), OW = 3.2, OH = 2.7, side = (W - OW) / 2;
      for (const sx of [-1, 1]) H.add(M(new THREE.BoxGeometry(side, HH, D), wallM, sx * (OW / 2 + side / 2), HH / 2, -D / 2, { outline: 0.02 }));
      H.add(M(new THREE.BoxGeometry(OW, HH - OH, D), wallM, 0, OH + (HH - OH) / 2, -D / 2, { outline: 0.02 }));
      const lobbyM = '#dfe8ea'; H.add(box(OW, OH, 0.1, lobbyM, 0, OH / 2, -D + 0.05, { cast: false })); H.add(box(OW, 0.14, D, '#c4ced2', 0, 0.07, -D / 2, { cast: false }));   // lobby floor level with the sidewalk
      for (let z = -1.5; z > -D; z -= 2) { const l = glow(1.2, 0.3, '#ffffff', 0, OH - 0.02, z); l.rotation.x = Math.PI / 2; H.add(l); }
      H.add(box(0.9, 1.0, 0.5, '#e8eef0', 0.9, 0.64, -D + 0.6, { outline: 0.01 })); const lobbyLight = new THREE.PointLight('#fff4e0', 4, 8, 1.5); lobbyLight.position.set(0, 2.3, -3); H.add(lobbyLight);
      for (let f = 1; f < 4; f++) for (let k = -4; k <= 4; k++) if (k) H.add(box(1.5, 1.4, 0.05, '#8ec8e8', k * 2.3, f * 2.6 + 0.6, 0.02, { cast: false }));
      H.add(box(6.5, 0.35, 2.6, '#2a6a8a', 0, 3.2, 1.0, { outline: 0.015 })); for (const x of [-3, 3]) H.add(cyl(0.12, 0.12, 3.2, '#e8eef2', x, 1.6, 2.1, { outline: 0.008 }));
      const glass = new THREE.MeshPhysicalMaterial({ color: '#bfe4f4', transparent: true, opacity: 0.45, roughness: 0.1, depthWrite: false });
      const dl = M(new THREE.BoxGeometry(1.3, 2.6, 0.06), glass, -0.66, 1.3, 0.05, { cast: false }), dr = M(new THREE.BoxGeometry(1.3, 2.6, 0.06), glass, 0.66, 1.3, 0.05, { cast: false }); H.add(dl, dr);
      H.add(box(2.8, 0.14, 0.12, '#9aa8b4', 0, 2.65, 0.06)); H.add(box(3.0, 0.012, 1.1, '#9aa4ac', 0, 0.146, 0.7, { cast: false }));   // entrance mat sits on top of the sidewalk
      H.add(picture(4.4, 0.9, (g, W2, H2) => { g.fillStyle = '#ffffff'; g.fillRect(0, 0, W2, H2); g.fillStyle = '#d8302c'; const c = H2 * 0.62, cx = H2 * 0.6, cy = H2 / 2; g.fillRect(cx - c / 6, cy - c / 2, c / 3, c); g.fillRect(cx - c / 2, cy - c / 6, c, c / 3);
        g.fillStyle = '#1d4f8a'; g.font = '900 ' + Math.round(H2 * 0.5) + 'px Nunito'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText('MIAMI GENERAL', H2 * 1.15, cy + 2); }, 0, 4.3, 0.04));
      for (const x of [-4.6, 4.6]) { H.add(box(1.2, 0.6, 1.2, '#c8bca8', x, 0.3, 1.2, { outline: 0.01 })); H.add(palm(x, 1.2, 0.85)); H.children[H.children.length - 1].position.y = 0.55; }
      H.position.set(0, 0, -1.5); st.add(H); st.hospitalDoors = [dl, dr];
    }
    st.scene.fog = new THREE.Fog(new THREE.Color(sunset ? '#f2c09a' : '#dcecf6'), 45, 150);
    return { doors: [0, 0, -1.4], sidewalk: [0, 0, 0], road: [0, 0, 4] };
  },
});

// ---------- GTA video props: vehicles, helicopter, stunt rides, garages, stairs ----------
// generic boxy vehicle facing +x. o: { body, cab, stripe, len, h, w, lightbar, sign: draw(g, W, H), win, van }
export function vehicle(x, z, rotY = 0, o = {}) {
  const { body = '#e8e8e8', cab = body, stripe = null, len = 4.4, h = 1.5, w = 1.9, lightbar = false, sign = null, win = '#6a8cb0', van = false } = o, g = new THREE.Group();
  g.add(box(len, h * 0.55, w, body, 0, 0.35 + h * 0.275, 0, { outline: 0.015 }));
  if (van) { g.add(box(len * 0.98, h * 0.55, w * 0.98, cab, -len * 0.01, 0.35 + h * 0.825, 0, { outline: 0.015 })); g.add(box(0.04, h * 0.4, w * 0.8, win, len / 2 + 0.01, 0.35 + h * 0.85, 0, { cast: false })); }
  else { g.add(box(len * 0.5, h * 0.42, w * 0.94, cab, -len * 0.06, 0.35 + h * 0.76, 0, { outline: 0.015 })); g.add(box(len * 0.46, h * 0.32, w * 0.95, win, -len * 0.06, 0.35 + h * 0.77, 0, { cast: false })); }
  if (stripe) g.add(box(len * 1.002, 0.14, w * 1.004, stripe, 0, 0.35 + h * 0.4, 0, { cast: false }));
  for (const sz of [0.6, -0.6]) { g.add(box(0.04, 0.12, 0.3, '#fff4c8', len / 2 + 0.01, 0.62, sz * w / 1.9, { cast: false })); g.add(box(0.04, 0.12, 0.26, '#d8302c', -len / 2 - 0.01, 0.62, sz * w / 1.9, { cast: false })); }
  for (const wx of [len * 0.32, -len * 0.32]) for (const wz of [w / 2 - 0.05, -w / 2 + 0.05]) { g.add(cyl(0.36, 0.36, 0.24, '#141418', wx, 0.36, wz, { rot: [Math.PI / 2, 0, 0] })); g.add(cyl(0.16, 0.16, 0.25, '#9aa0aa', wx, 0.36, wz, { rot: [Math.PI / 2, 0, 0] })); }
  if (lightbar) { const lb = new THREE.Group(); lb.position.set(-len * 0.06, 0.35 + h * 0.98, 0);
    const r = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.5), new THREE.MeshBasicMaterial({ color: '#ff2a2a' })); r.position.z = 0.28;
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.5), new THREE.MeshBasicMaterial({ color: '#2a5aff' })); b.position.z = -0.28; lb.add(r, b); g.add(lb); g.userData.lights = [r, b]; }
  if (sign) for (const sz of [1, -1]) g.add(picture(len * 0.6, h * 0.42, sign, -len * 0.05, 0.35 + h * (van ? 0.85 : 0.3), sz * (w / 2 + 0.012), sz > 0 ? 0 : Math.PI));
  g.position.set(x, 0, z); g.rotation.y = rotY; return g;
}
// police light bar flashing red / blue
export const flashLights = (v, t) => { const L = v.userData.lights; if (!L) return; const on = Math.sin(t * 16) > 0; L[0].material.color.set(on ? '#ff2a2a' : '#4a0a0a'); L[1].material.color.set(on ? '#20203a' : '#3a6aff'); };
const signText = (label, fg, bg) => (g, W, H) => { g.fillStyle = bg; g.fillRect(0, 0, W, H); g.fillStyle = fg; g.font = '900 ' + Math.round(H * 0.42) + 'px Nunito'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(label, W / 2, H / 2 + 2); };
export const copCar = (x, z, rotY = 0) => vehicle(x, z, rotY, { body: '#f4f4f4', cab: '#1a1c24', stripe: '#1a1c24', lightbar: true, sign: signText('POLICE', '#1d3a8a', '#f4f4f4') });
export const foodTruck = (x, z, rotY = 0, label = 'CAFECITO', body = '#ffd23a') => vehicle(x, z, rotY, { body, van: true, len: 5, h: 2.2, w: 2.1, sign: signText(label, '#c8302c', '#ffffff') });
export const sportsCar = (x, z, rotY = 0, body = '#f6f6f6') => { const g = vehicle(x, z, rotY, { body, cab: '#20222a', len: 4.6, h: 1.05, w: 2.0, win: '#20222a' }); g.add(box(0.5, 0.08, 1.9, '#20222a', -2.2, 1.05, 0)); return g; };
export function heli(x, y, z, rotY = 0, spot = true) {
  const g = new THREE.Group(), b = ball(0.9, '#20263a', 0, 0, 0, { outline: 0.02 }); b.scale.set(1.6, 0.9, 0.9); g.add(b); g.add(ball(0.6, '#7fb0d8', 0.9, 0.05, 0));
  g.add(box(3.0, 0.22, 0.22, '#20263a', -2.2, 0.15, 0)); g.add(box(0.1, 0.8, 0.5, '#20263a', -3.6, 0.45, 0));
  const rotor = box(5.5, 0.04, 0.22, '#141418', 0, 0.95, 0); g.add(rotor); for (const sz of [0.55, -0.55]) g.add(box(1.8, 0.06, 0.06, '#141418', -0.2, -0.95, sz));
  if (spot) { const beam = new THREE.Mesh(new THREE.ConeGeometry(2.4, 14, 20, 1, true), new THREE.MeshBasicMaterial({ color: '#fff6d0', transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide })); beam.position.set(0.6, -7.2, 0); g.add(beam); }
  g.userData.rotor = rotor; g.position.set(x, y, z); g.rotation.y = rotY; return g;
}
export function dirtBike(x, z, rotY = 0, c = '#e8453c') { const g = new THREE.Group(); for (const wx of [0.7, -0.7]) g.add(M(new THREE.TorusGeometry(0.34, 0.09, 8, 20), '#141418', wx, 0.42, 0));
  g.add(box(1.2, 0.25, 0.25, c, 0, 0.85, 0, { outline: 0.01, rot: [0, 0, 0.12] })); g.add(box(0.5, 0.14, 0.3, '#1a1a20', -0.25, 1.0, 0)); g.add(box(0.08, 0.6, 0.6, '#c8c8d0', 0.68, 1.05, 0, { rot: [0, 0, -0.35] }));
  g.position.set(x, 0, z); g.rotation.y = rotY; return g; }
export function jetSki(x, z, rotY = 0, c = '#ffd23a') { const g = new THREE.Group(); g.add(box(2.6, 0.45, 0.9, c, 0, 0.25, 0, { outline: 0.012 })); g.add(M(new THREE.ConeGeometry(0.45, 0.8, 4), c, 1.6, 0.25, 0, { rot: [0, Math.PI / 4, -Math.PI / 2] }));
  g.add(box(0.9, 0.22, 0.5, '#1a1a20', -0.3, 0.58, 0)); g.add(box(0.08, 0.45, 0.6, '#1a1a20', 0.55, 0.75, 0)); g.position.set(x, 0, z); g.rotation.y = rotY; return g; }
export function golfCart(x, z, rotY = 0) { const g = new THREE.Group(); g.add(box(2.4, 0.55, 1.3, '#f4f4f4', 0, 0.62, 0, { outline: 0.012 })); g.add(box(2.4, 0.06, 1.35, '#3a8a4a', -0.1, 2.0, 0, { outline: 0.01 }));
  for (const sx of [0.9, -1.0]) for (const sz of [0.6, -0.6]) g.add(cyl(0.03, 0.03, 1.3, '#c8c8d0', sx, 1.35, sz)); g.add(box(0.5, 0.35, 1.1, '#2a4a8a', -0.5, 1.05, 0));
  for (const wx of [0.75, -0.75]) for (const wz of [0.6, -0.6]) g.add(cyl(0.26, 0.26, 0.18, '#141418', wx, 0.26, wz, { rot: [Math.PI / 2, 0, 0] })); g.position.set(x, 0, z); g.rotation.y = rotY; return g; }
// open parking garage: concrete decks + columns, the open side faces +z
export function parkingGarage(x, z, o = {}) { const { w = 16, d = 12, floors = 4, fh = 3 } = o, g = new THREE.Group(), c = '#c8c4bc';
  for (let f = 1; f <= floors; f++) { g.add(box(w, 0.35, d, c, 0, f * fh, 0, { outline: 0.015 })); g.add(box(w, 0.9, 0.25, '#b0aca4', 0, f * fh + 0.6, d / 2, { outline: 0.01 })); }
  for (let cx = -w / 2 + 0.5; cx <= w / 2; cx += w / 4) for (const cz of [-d / 2 + 0.5, d / 2 - 0.5]) g.add(box(0.5, floors * fh, 0.5, '#b8b4ac', cx, (floors * fh) / 2, cz));
  g.position.set(x, 0, z); return g; }
// stairs rising toward -z from (x, z)
export function stairs(x, z, n = 10, o = {}) { const { w = 2.6, rise = 0.18, run = 0.32, c = '#cfc8bc' } = o, g = new THREE.Group();
  for (let k = 0; k < n; k++) g.add(box(w, rise * (k + 1), run, c, 0, (rise * (k + 1)) / 2, -k * run, { outline: 0.006 }));
  g.position.set(x, 0, z); return g; }
Object.assign(SETS, {
  // football field: turf with yard lines (along x), end zone, goalpost, bleachers behind (-z)
  field(st, o = {}) { light(st, { sunPos: [-10, 14, 8] }); sky(st, ['#4f98e0', '#9fd0f2', '#dcecf6']); groundPlane(st, '#5e9a52', { seed: 31 });
    for (let x = -50; x <= 50; x += 5) st.add(box(0.12, 0.012, 50, '#f4f4f4', x, 0.006, 0, { cast: false }));
    st.add(box(10, 0.011, 50, '#1d6a8a', 55, 0.005, 0, { cast: false }));
    const gp = new THREE.Group(); gp.add(cyl(0.12, 0.12, 3, '#ffd23a', 0, 1.5, 0)); gp.add(box(0.2, 0.2, 6, '#ffd23a', 0, 3, 0)); for (const sz of [-3, 3]) gp.add(cyl(0.08, 0.08, 6, '#ffd23a', 0, 6, sz)); gp.position.set(60, 0, 0); st.add(gp);
    for (let k = 0; k < 8; k++) st.add(box(110, 0.6 * (k + 1), 1.2, k % 2 ? '#2a8a9a' : '#e8803a', 0, 0.3 * (k + 1), -30 - k * 1.2, { outline: 0.01 }));
    st.scene.fog = new THREE.Fog(new THREE.Color('#dcecf6'), 60, 180); return {}; },
  // storage unit: corrugated walls, closed roll-up door at +z, cardboard boxes, one bare bulb
  storage(st, o = {}) { nightLight(st, { sunI: 0.4, fill: 0.7 }); st.scene.background = new THREE.Color('#14161c');
    const corr = (c) => tmat(tex(256, 256, (g, W, H) => { g.fillStyle = c; g.fillRect(0, 0, W, H); for (let x = 0; x < W; x += 16) { g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(x, 0, 6, H); g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(x + 8, 0, 3, H); } }));
    st.add(M(new THREE.PlaneGeometry(4, 3), '#6a6c70', 0, 0, 0, { cast: false, rot: [-Math.PI / 2, 0, 0] }));
    for (const [px, pz, ry, w] of [[0, -1.5, 0, 4], [-2, 0, Math.PI / 2, 3], [2, 0, -Math.PI / 2, 3]]) st.add(M(new THREE.PlaneGeometry(w, 2.8), corr('#8a8e96'), px, 1.4, pz, { cast: false, rot: [0, ry, 0] }));
    const door = M(new THREE.PlaneGeometry(4, 2.8), corr('#b84a3a'), 0, 1.4, 1.5, { cast: false, rot: [0, Math.PI, 0] }); st.add(door);
    for (const [bx, by, bz, s] of [[-1.4, 0, -1.0, 0.7], [-1.4, 0, -0.3, 0.5], [1.3, 0, -1.0, 0.8], [1.45, 0, -0.1, 0.45], [-1.4, 0.7, -1.0, 0.45]]) st.add(box(s, s, s, '#b08a5a', bx, by + s / 2, bz, { outline: 0.008 }));
    const bulb = new THREE.PointLight('#ffd890', 5, 6, 1.6); bulb.position.set(0, 2.5, 0); st.add(bulb); st.add(ball(0.06, '#fff4c8', 0, 2.55, 0));
    return { door }; },
});
// Miami at night: same street with a dark sky, moonlight, lit windows and streetlights
SETS.miamiNight = (st, o = {}) => { const r = SETS.miami(st, o); nightLight(st); sky(st, ['#060a1c', '#141c3a', '#2a3050']);
  st.scene.traverse((m) => { if (m.isMesh && m.material?.color && m.geometry?.parameters?.width === 1.2 && m.geometry.parameters.height === 1.1) m.material = new THREE.MeshBasicMaterial({ color: Math.random() < 0.45 ? '#ffd890' : '#1a2238' }); });
  for (const x of [-20, 14, 40]) { const l = new THREE.PointLight('#ffd890', 8, 12, 1.4); l.position.set(x + 0.35, 3.8, 1.0); st.add(l); }
  st.scene.fog = new THREE.Fog(new THREE.Color('#2a3050'), 30, 110); return r; };

export { room, planks, checker, nightLight, rngf };   // used by sets_campus.js
