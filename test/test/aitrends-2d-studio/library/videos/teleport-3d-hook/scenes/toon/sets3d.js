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

// ---------- props ----------
export function tree(x, z, s = 1, c = '#5aa84a') { const g = new THREE.Group(); g.add(cyl(0.12 * s, 0.16 * s, 1.6 * s, '#7a5236', 0, 0.8 * s, 0)); g.add(ball(0.9 * s, c, 0, 2.1 * s, 0, { outline: 0.02 })); g.add(ball(0.6 * s, c, 0.5 * s, 1.7 * s, 0.3 * s)); g.add(ball(0.55 * s, c, -0.45 * s, 1.8 * s, -0.25 * s)); g.position.set(x, 0, z); return g; }
export function pine(x, z, s = 1, c = '#2f7a4a') { const g = new THREE.Group(); g.add(cyl(0.1 * s, 0.12 * s, 0.6 * s, '#6a4a30', 0, 0.3 * s, 0)); for (let i = 0; i < 3; i++) g.add(M(new THREE.ConeGeometry((1 - i * 0.25) * s, 1.2 * s, 7), c, 0, (0.9 + i * 0.6) * s, 0)); g.position.set(x, 0, z); return g; }
export function house(x, z, o = {}) {
  const { w = 6, d = 5, h = 3.2, wall = '#e8b48a', roof = '#8a4a3a', rotY = 0, floors = 1 } = o, g = new THREE.Group();
  const H = h * floors; g.add(box(w, H, d, wall, 0, H / 2, 0, { outline: 0.02 }));
  const rf = M(new THREE.CylinderGeometry(0.01, d * 0.72, w + 0.4, 4, 1), roof, 0, H + d * 0.33, 0, { rot: [0, Math.PI / 4, Math.PI / 2], outline: 0.02 }); rf.scale.set(1, 1, 0.65); g.add(rf);
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
  const back = M(new THREE.PlaneGeometry(w, h), wall, 0, h / 2, -d / 2, { cast: false }); st.add(back);
  const left = M(new THREE.PlaneGeometry(d, h), wall, -w / 2, h / 2, 0, { cast: false, rot: [0, Math.PI / 2, 0] }); st.add(left);
  const right = M(new THREE.PlaneGeometry(d, h), wall, w / 2, h / 2, 0, { cast: false, rot: [0, -Math.PI / 2, 0] }); st.add(right);
  st.add(box(w, 0.12, 0.04, '#ffffff', 0, 0.06, -d / 2 + 0.02));
  return { w, d, h };
}
const checker = (a, b, n = 8) => { const t = tex(256, 256, (g, W, H) => { for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { g.fillStyle = (i + j) % 2 ? a : b; g.fillRect(i * W / n, j * H / n, W / n, H / n); } }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 4); return t; };
const planks = (c = '#c08a5a') => { const t = tex(256, 256, (g, W, H) => { g.fillStyle = c; g.fillRect(0, 0, W, H); g.strokeStyle = 'rgba(0,0,0,.18)'; g.lineWidth = 3; for (let y = 0; y <= H; y += 32) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); } }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 4); return t; };

export const SETS = {
  suburb(st, o = {}) {
    light(st, { sunPos: [-10, 14, 8] }); sky(st, ['#6fa8e0', '#a9d0f0', '#e6f2fb']);
    st.add(M(new THREE.PlaneGeometry(200, 200), '#6db55a', 0, 0, 0, { cast: false, rot: [-Math.PI / 2, 0, 0] }));
    st.add(box(200, 0.02, 7, '#4d5260', 0, 0.01, 4, { cast: false })); for (let x = -90; x < 90; x += 4) st.add(box(1.8, 0.022, 0.15, '#f2e6c8', x, 0.02, 4, { cast: false }));
    st.add(box(200, 0.14, 2, '#cfc6b8', 0, 0.07, 0, { cast: false })); st.add(box(200, 0.14, 2, '#cfc6b8', 0, 0.07, 8.5, { cast: false }));
    const walls = ['#e8b48a', '#a8d0e8', '#f2d48a', '#e8a0a0', '#c8e0b0'], roofs = ['#8a4a3a', '#5a6a8a', '#a0583a', '#6a4a6a', '#4a6a4a'];
    for (let i = -4; i <= 4; i++) { st.add(house(i * 9, -5, { wall: walls[(i + 5) % 5], roof: roofs[(i + 5) % 5], rotY: -Math.PI / 2, floors: 1 + ((i + 9) % 3 === 0 ? 1 : 0) })); st.add(fence(i * 9 - 3.5, i * 9 + 3.5, -1.3)); st.add(tree(i * 9 + 4.3, -2.2, 0.9 + ((i + 9) % 2) * 0.2)); }
    for (let i = -4; i <= 4; i++) st.add(house(i * 10 + 3, 15, { wall: walls[(i + 7) % 5], roof: roofs[(i + 6) % 5], rotY: Math.PI / 2 }));
    for (const x of [-12, 6, 22]) st.add(lampPost(x, 1.2));
    st.add(cyl(0.05, 0.05, 1.1, '#5a5a68', 2.4, 0.55, -0.6)); st.add(box(0.5, 0.35, 0.3, '#3a6ea5', 2.4, 1.2, -0.6, { outline: 0.01 }));
    if (o.bus) st.add(bus(o.busX ?? 14, 3, 0));
    if (o.cars) { st.add(car(-8, 5.2, '#d64a33')); st.add(car(18, 2.6, '#3a6ea5', Math.PI)); }
    st.scene.fog = new THREE.Fog(new THREE.Color('#d8eaf8'), 40, 120);
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
    room(st, { w: 14, d: 10, h: 3.6, wall: '#e8eef2', floorTex: checker('#d8dee4', '#c8d0d8', 8) });
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 2.6, 32, 1, true), new THREE.MeshPhysicalMaterial({ color: '#cfefff', transparent: true, opacity: 0.22, roughness: 0.05, side: THREE.DoubleSide, depthWrite: false })); tube.position.set(o.tubeX ?? 1.5, 1.4, -1); st.add(tube);
    st.add(cyl(1.0, 1.0, 0.14, '#b8c4cc', o.tubeX ?? 1.5, 0.07, -1, { outline: 0.012 })); st.add(cyl(1.0, 1.0, 0.18, '#b8c4cc', o.tubeX ?? 1.5, 2.75, -1, { outline: 0.012 }));
    const ringG = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.03, 8, 48), new THREE.MeshBasicMaterial({ color: '#6fe6ff' })); ringG.rotation.x = Math.PI / 2; ringG.position.set(o.tubeX ?? 1.5, 0.16, -1); st.add(ringG);
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
    sky(st, sunset ? ['#5a6ab8', '#e89a8a', '#ffc98a', '#ffe2b0'] : ['#4f98e0', '#9fd0f2', '#e6f4fb']);
    st.add(M(new THREE.PlaneGeometry(200, 80), '#f2d8a0', 0, 0, 20, { cast: false, rot: [-Math.PI / 2, 0, 0] }));
    const water = M(new THREE.PlaneGeometry(400, 200), new THREE.MeshToonMaterial({ color: '#2a8ad0', gradientMap: toon('#fff').gradientMap }), 0, 0.03, -100, { cast: false, rot: [-Math.PI / 2, 0, 0] }); st.add(water);
    st.add(box(400, 0.02, 1.2, '#eaf6ff', 0, 0.05, -0.4, { cast: false }));
    for (const [x, z, s] of [[-8, 4, 1.2], [9, 6, 1.4], [-16, 8, 1.1]]) { const g = new THREE.Group(); g.add(M(new THREE.CylinderGeometry(0.14, 0.22, 5 * s, 8), '#a07a4a', 0.3, 2.5 * s, 0, { rot: [0, 0, -0.12] })); for (let i = 0; i < 7; i++) { const lf = box(2.2 * s, 0.05, 0.5 * s, '#3a9a4a', 0, 0, 0); lf.position.set(0.6 + Math.cos(i * 0.9) * 1.0 * s, 5 * s, Math.sin(i * 0.9) * 1.0 * s); lf.rotation.set(0, -i * 0.9, -0.4); g.add(lf); } g.position.set(x, 0, z); st.add(g); }
    if (sunset) { const sun = new THREE.Mesh(new THREE.CircleGeometry(6, 32), new THREE.MeshBasicMaterial({ color: '#fff0c0' })); sun.position.set(-20, 6, -120); st.add(sun); }
    st.scene.fog = new THREE.Fog(new THREE.Color(sunset ? '#ffc9a0' : '#cfe8f8'), 60, 180);
    return { water };
  },
  park(st, o = {}) {
    const sunset = o.sunset; light(st, sunset ? { sun: '#ffc890', sunPos: [-14, 5, -6], fill: 1.2, sky: '#ffc8b0', rim: '#ffd9a8' } : { sunPos: [-10, 14, 6] });
    sky(st, sunset ? ['#4a5ab0', '#e08a8a', '#ffb87a', '#ffe0a8'] : ['#6fa8e0', '#a9d0f0', '#e6f2fb']);
    st.add(M(new THREE.PlaneGeometry(200, 200), sunset ? '#5a9a5a' : '#6db55a', 0, 0, 0, { cast: false, rot: [-Math.PI / 2, 0, 0] }));
    st.add(M(new THREE.PlaneGeometry(2.4, 200), '#d8c49a', 0, 0.01, 0, { cast: false, rot: [-Math.PI / 2, 0, Math.PI / 2] }));
    const r = rngf(7); for (let i = 0; i < 40; i++) { const x = (r() - 0.5) * 80, z = -6 - r() * 40; st.add(r() < 0.5 ? tree(x, z, 0.9 + r() * 0.6, sunset ? '#3a7a4a' : '#5aa84a') : pine(x, z, 1 + r() * 0.6)); }
    for (const x of [-6, 4]) st.add(bench(x, -1.8, 0)); for (const x of [-10, 0, 10]) st.add(lampPost(x, -1.4));
    if (sunset) { const sun = new THREE.Mesh(new THREE.CircleGeometry(5, 32), new THREE.MeshBasicMaterial({ color: '#fff0c0' })); sun.position.set(-40, 6, -100); st.add(sun); }
    st.scene.fog = new THREE.Fog(new THREE.Color(sunset ? '#f0b898' : '#d8eaf8'), 30, 110);
    return { bench: [4, 0, -1.8] };
  },
  street(st, o = {}) { // city street: Tokyo (neon) or generic downtown
    const tokyo = o.tokyo; light(st, tokyo ? { sun: '#ffe8d0', sunPos: [-6, 12, 8], fill: 1.4 } : { sunPos: [-8, 14, 6] });
    sky(st, tokyo ? ['#f0a0b0', '#ffd0b0', '#ffe8c8'] : ['#6fa8e0', '#a9d0f0', '#e6f2fb']);
    st.add(M(new THREE.PlaneGeometry(200, 200), '#4d5260', 0, 0, 0, { cast: false, rot: [-Math.PI / 2, 0, 0] }));
    for (const z of [-4, 4]) st.add(box(200, 0.14, 3, '#cfc6b8', 0, 0.07, z, { cast: false }));
    const r = rngf(tokyo ? 11 : 5), cols = tokyo ? ['#e8e0d8', '#c8d0e0', '#e0c8c0', '#d8d8c0'] : ['#d8c8b0', '#b8c8d8', '#e0b8a0', '#c8c0d0'];
    for (const sx of [-1, 1]) for (let x = -60; x < 60; x += 6) { const h = 6 + r() * (tokyo ? 14 : 10); st.add(box(5.6, h, 6, cols[Math.floor(r() * 4)], x, h / 2, sx * 9, { outline: 0.02 }));
      for (let f = 1; f < h / 2.5; f++) for (const wx of [-1.6, 0, 1.6]) st.add(box(0.9, 1.0, 0.04, '#8fc4ec', x + wx, f * 2.5, sx * (9 - 3.02), { cast: false }));
      if (tokyo) { const sc = ['#ff4f8a', '#3fd8ff', '#ffd45a', '#8a5aff'][Math.floor(r() * 4)]; st.add(glow(1.2, 2.6, sc, x + 2, 4 + r() * 3, sx * 5.9, sx > 0 ? Math.PI : 0)); st.add(box(5.6, 0.25, 1.2, '#e8453c', x, 2.8, sx * 5.4)); } }
    st.scene.fog = new THREE.Fog(new THREE.Color(tokyo ? '#ffd8c0' : '#d8eaf8'), 30, 90);
    return {};
  },
  paris(st, o = {}) {
    light(st, { sun: '#fff0d8', sunPos: [-10, 12, 8] }); sky(st, ['#7fb0e0', '#bcdaf2', '#f2eee0']);
    st.add(M(new THREE.PlaneGeometry(200, 200), '#c8b89a', 0, 0, 0, { cast: false, rot: [-Math.PI / 2, 0, 0] }));
    for (let x = -30; x < 30; x += 7) { st.add(box(6.6, 9, 6, '#ece0c8', x, 4.5, -8, { outline: 0.02 })); st.add(box(6.8, 1.2, 6.2, '#5a6a80', x, 9.6, -8)); for (let f = 0; f < 3; f++) for (const wx of [-2, 0, 2]) st.add(box(1.0, 1.4, 0.04, '#8fc4ec', x + wx, 2 + f * 2.6, -4.98, { cast: false })); }
    for (let x = -10; x < 10; x += 0.8) st.add(box(0.8, 0.5, 1.4, Math.round(x / 0.8) % 2 ? '#c8302c' : '#ffffff', x, 3.2, -4.3, { rot: [0.5, 0, 0] }));
    for (const x of [-3, 1.5]) { st.add(cyl(0.5, 0.5, 0.04, '#ffffff', x, 0.74, -1.5, { outline: 0.008 })); st.add(cyl(0.04, 0.04, 0.74, '#3a3a48', x, 0.37, -1.5)); st.add(cyl(0.05, 0.04, 0.08, '#ffffff', x + 0.15, 0.8, -1.4)); }
    const ef = new THREE.Group(), c = '#7a6a5a'; ef.add(M(new THREE.CylinderGeometry(0.6, 7, 14, 4, 1), c, 0, 7, 0, { rot: [0, Math.PI / 4, 0] })); ef.add(M(new THREE.CylinderGeometry(0.2, 1.4, 16, 4, 1), c, 0, 21, 0, { rot: [0, Math.PI / 4, 0] })); ef.add(box(8, 0.6, 8, c, 0, 6, 0)); ef.add(box(3, 0.5, 3, c, 0, 14, 0)); ef.position.set(18, 0, -60); st.add(ef);
    st.scene.fog = new THREE.Fog(new THREE.Color('#e8eef4'), 40, 140);
    return { tables: [[-3, -1.5], [1.5, -1.5]] };
  },
  mountain(st, o = {}) {
    light(st, { sun: '#ffffff', sunPos: [-10, 10, 8], fill: 1.6, sky: '#d8e8ff' }); sky(st, ['#3a78d0', '#8ab8ec', '#e0eefb']);
    st.add(M(new THREE.PlaneGeometry(200, 200), '#f4f8ff', 0, 0, 0, { cast: false, rot: [-Math.PI / 2, 0, 0] }));
    const r = rngf(3); for (let i = 0; i < 14; i++) { const x = (r() - 0.5) * 140, z = -30 - r() * 60, h = 14 + r() * 26; const pk = new THREE.Group(); pk.add(M(new THREE.ConeGeometry(h * 0.7, h, 6), '#7a8aa8', 0, h / 2, 0)); pk.add(M(new THREE.ConeGeometry(h * 0.28, h * 0.4, 6), '#ffffff', 0, h * 0.8, 0)); pk.position.set(x, 0, z); st.add(pk); }
    st.add(M(new THREE.ConeGeometry(3, 2, 7), '#e8eef8', 0, 0.2, -1, { cast: false }));
    st.scene.fog = new THREE.Fog(new THREE.Color('#e8f2ff'), 40, 140);
    return { peak: [0, 1.2, -1] };
  },
  hospital(st, o = {}) {
    light(st, { sun: '#ffffff', sunPos: [4, 10, 6], fill: 2.0, sky: '#eaf6ff' }); st.scene.background = new THREE.Color('#e4eef0');
    room(st, { w: 16, d: 8, wall: '#dceee8', floorTex: checker('#e8ecee', '#d0d8dc', 6) });
    for (let x = -6; x <= 6; x += 0.7) { st.add(box(0.6, 0.06, 0.5, '#3a8a9a', x, 0.45, -3.4)); st.add(box(0.6, 0.5, 0.06, '#3a8a9a', x, 0.72, -3.65)); }
    for (const x of [-5, 0, 5]) { st.add(box(1.4, 0.85, 0.06, '#1a2230', x, 2.2, -3.95, { outline: 0.01 })); st.add(glow(1.28, 0.74, '#7fd8e8', x, 2.2, -3.91)); }
    return { screens: [[-5, 2.2, -3.91], [0, 2.2, -3.91], [5, 2.2, -3.91]] };
  },
};
// news vans with satellite dishes
export function newsVan(x, z, rotY = 0) { const g = new THREE.Group(); g.add(box(4.6, 2.0, 2.0, '#f4f4f4', 0, 1.3, 0, { outline: 0.015 })); g.add(box(4.62, 0.4, 2.02, '#c8302c', 0, 1.1, 0)); g.add(cyl(0.6, 0.1, 0.2, '#e8e8e8', -1, 2.6, 0, { rot: [0, 0, 0.8] })); for (const wx of [1.5, -1.5]) for (const wz of [0.95, -0.95]) g.add(cyl(0.4, 0.4, 0.25, '#1a1a20', wx, 0.4, wz, { rot: [Math.PI / 2, 0, 0] })); g.position.set(x, 0, z); g.rotation.y = rotY; return g; }
