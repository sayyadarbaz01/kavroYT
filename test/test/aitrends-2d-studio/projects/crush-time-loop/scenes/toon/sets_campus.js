// toon/sets_campus.js — college sets for If Blaze (Nov 2026): dorm hallway, dining hall (+ cafe counter), library, bus interior,
// and props (vending machine, dog, phone, notebook, umbrella box, mop bucket). Rooms are open toward +z: put the camera on the +z side.
import * as THREE from 'three';
import { M, box, cyl, ball, glow, picture, light, tmat, mottled, tex, window3, room, planks, checker, nightLight } from './sets3d.js';

const ceilLights = (st, w, d, h, step = 3) => { for (let z = -d / 2 + 1.5; z < d / 2; z += step) { const m = glow(Math.min(1.4, w * 0.3), 0.3, '#ffffff', 0, h - 0.02, z); m.rotation.x = Math.PI / 2; st.add(m); } };
const ceiling = (st, w, d, h, c = '#f2eee6') => st.add(M(new THREE.PlaneGeometry(w, d), c, 0, h, 0, { cast: false, rot: [Math.PI / 2, 0, 0] }));
const signTex = (str, bg, fg) => (g, W, H) => { g.fillStyle = bg; g.fillRect(0, 0, W, H); g.fillStyle = fg; let fs = H * 0.7; do { g.font = `900 ${fs}px Nunito`; fs -= 2; } while (g.measureText(str).width > W * 0.88); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(str, W / 2, H / 2 + 2); };

// ---------- props ----------
export function vendingMachine(x, z, rotY = 0) {   // front faces +z before rotation
  const g = new THREE.Group(); g.add(box(1.0, 1.9, 0.8, '#c8302c', 0, 0.95, 0, { outline: 0.012 }));
  g.add(picture(0.62, 1.2, (c, W, H) => { c.fillStyle = '#1a2230'; c.fillRect(0, 0, W, H); const cols = ['#ffd23f', '#5fe08a', '#3a9ad8', '#ff8a5a', '#c88aff'];
    for (let r = 0; r < 5; r++) for (let k = 0; k < 4; k++) { c.fillStyle = cols[(r + k) % 5]; c.fillRect(20 + k * (W - 40) / 4, 20 + r * (H - 40) / 5, (W - 40) / 4 - 14, (H - 40) / 5 - 22); c.fillStyle = '#8a9aaa'; c.fillRect(20 + k * (W - 40) / 4, 20 + r * (H - 40) / 5 + (H - 40) / 5 - 16, (W - 40) / 4 - 14, 6); } }, -0.12, 1.15, 0.405));
  g.add(box(0.2, 0.5, 0.02, '#2a2a34', 0.36, 1.2, 0.41)); g.add(box(0.6, 0.18, 0.02, '#141418', -0.12, 0.35, 0.41));
  g.position.set(x, 0, z); g.rotation.y = rotY; return g;
}
export function dog(x, z, rotY = 0, c = '#d89a4a') {   // small campus dog facing +x; userData.tail wags
  const g = new THREE.Group(); g.add(box(0.55, 0.24, 0.26, c, 0, 0.32, 0, { outline: 0.008 }));
  for (const [a, b] of [[0.2, 0.09], [0.2, -0.09], [-0.2, 0.09], [-0.2, -0.09]]) g.add(box(0.07, 0.22, 0.07, c, a, 0.11, b));
  g.add(box(0.26, 0.22, 0.24, c, 0.36, 0.5, 0, { outline: 0.008 })); g.add(box(0.12, 0.1, 0.14, '#f2e2c8', 0.52, 0.45, 0, { outline: 0.005 })); g.add(ball(0.03, '#141418', 0.59, 0.48, 0));
  for (const s of [-1, 1]) { g.add(ball(0.025, '#141418', 0.48, 0.55, s * 0.07)); g.add(M(new THREE.ConeGeometry(0.06, 0.12, 4), c, 0.33, 0.66, s * 0.08, { outline: 0.005 })); }
  const tail = box(0.05, 0.05, 0.2, c, 0, 0, 0.1); const tp = new THREE.Group(); tp.add(tail); tp.position.set(-0.28, 0.42, 0); tp.rotation.set(0.6, Math.PI / 2, 0); g.add(tp); g.userData.tail = tp;
  g.position.set(x, 0, z); g.rotation.y = rotY; return g;
}
export const phone = (c = '#1a1a22') => { const g = new THREE.Group(); g.add(box(0.075, 0.15, 0.01, c, 0, 0, 0, { outline: 0.003 })); g.add(box(0.066, 0.135, 0.002, '#3a6ad8', 0, 0, 0.006)); return g; };
export const notebook = (open = true) => { const g = new THREE.Group(); g.add(box(open ? 0.46 : 0.23, 0.012, 0.3, '#fbfaf4', 0, 0.006, 0, { outline: 0.003 })); for (let k = 0; k < 6; k++) g.add(box(0.18, 0.003, 0.008, '#3a4a8a', open ? 0.12 : 0, 0.013, -0.1 + k * 0.04)); if (open) g.add(box(0.005, 0.014, 0.3, '#9aa0aa', 0, 0.007, 0)); return g; };
export function umbrellaBox(x, z) { const g = new THREE.Group(); g.add(box(0.5, 0.3, 0.35, '#a0683e', 0, 0.15, 0, { outline: 0.008 })); ['#e8453c', '#3a9ad8', '#ffd23f', '#5fe08a', '#c88aff'].forEach((c, k) => { g.add(cyl(0.025, 0.025, 0.55, c, -0.18 + k * 0.09, 0.4, 0, { rot: [0.15 * (k - 2), 0, 0] })); g.add(cyl(0.012, 0.012, 0.1, '#3a3a48', -0.18 + k * 0.09, 0.72, 0)); }); g.position.set(x, 0, z); return g; }
export function mopBucket(x, z) { const g = new THREE.Group(); g.add(cyl(0.2, 0.17, 0.3, '#ffd23f', 0, 0.15, 0, { outline: 0.008 })); g.add(cyl(0.015, 0.015, 1.3, '#9a7a5a', 0.05, 0.75, 0, { rot: [0, 0, 0.18] })); g.position.set(x, 0, z); return g; }
export function mop() { const g = new THREE.Group(); g.add(cyl(0.015, 0.015, 1.3, '#9a7a5a', 0, 0, 0)); g.add(cyl(0.12, 0.08, 0.14, '#e8e2d4', 0, -0.68, 0, { outline: 0.005 })); return g; }
export function tray(c = '#5a8ad8') { const g = new THREE.Group(); g.add(box(0.42, 0.02, 0.3, c, 0, 0, 0, { outline: 0.003 })); g.add(cyl(0.07, 0.07, 0.03, '#f4f4f4', -0.08, 0.025, 0)); g.add(box(0.09, 0.06, 0.06, '#e8453c', 0.1, 0.04, 0.05)); return g; }
export function trashBin(x, z) { const g = new THREE.Group(); g.add(cyl(0.22, 0.18, 0.7, '#3a7a5a', 0, 0.35, 0, { outline: 0.008 })); g.position.set(x, 0, z); return g; }

// ---------- sets ----------
export const CAMPUS = {
  // dorm hallway: 4 m wide corridor running along z, doors on both side walls, vending machine at the far end (z = -12.6)
  dormHall(st, o = {}) {
    light(st, { sunPos: [2, 10, 6], fill: 1.8 }); st.scene.background = new THREE.Color('#e8e0d0');
    room(st, { w: 4, d: 26, h: 3, wall: '#e8dcc4', floorTex: checker('#cfc6b8', '#bdb4a6', 8), panels: 0, grime: 0.06 }); ceiling(st, 4, 26, 3); ceilLights(st, 4, 26, 3, 4);
    for (let z = -11; z <= 10; z += 3.4) for (const s of [-1, 1]) { st.add(box(0.06, 2.15, 1.0, '#8a5a3a', s * 1.97, 1.075, z, { outline: 0.01 })); st.add(box(0.07, 2.25, 1.12, '#f2f2f2', s * 1.985, 1.12, z));
      st.add(picture(0.22, 0.12, signTex(String(200 + Math.round((z + 11) / 3.4) * 2 + (s > 0 ? 1 : 0)), '#2a2a34', '#ffffff'), s * 1.93, 1.75, z, s > 0 ? -Math.PI / 2 : Math.PI / 2)); st.add(ball(0.035, '#d8b04a', s * 1.92, 1.0, z + 0.36)); }
    st.add(picture(1.4, 0.9, (g, W, H) => { g.fillStyle = '#b8864a'; g.fillRect(0, 0, W, H); const cs = ['#ffffff', '#ffd23f', '#8ad0ff', '#ff9ab0', '#b8f0a0']; for (let k = 0; k < 9; k++) { g.fillStyle = cs[k % 5]; g.save(); g.translate(30 + (k % 3) * (W - 60) / 3 + 20, 30 + Math.floor(k / 3) * (H - 60) / 3 + 10); g.rotate((k % 2 ? 1 : -1) * 0.06); g.fillRect(0, 0, (W - 60) / 3 - 30, (H - 60) / 3 - 20); g.restore(); } }, -1.95, 1.5, 1.7, Math.PI / 2));
    st.vending = vendingMachine(0.9, -12.4, 0); st.add(st.vending);
    st.groundAt = () => 0; return { vending: [0.9, 0, -12.4] };
  },
  // dining hall: 16 x 12, serving counter on the back wall, long tables with stools, double glass doors in the right wall (x = 8, z = 2).
  // o.cafe: a coffee-shop counter instead (barista behind it at z = -4.3)
  diningHall(st, o = {}) {
    light(st, { sunPos: [6, 12, 8], fill: 1.75 }); st.scene.background = new THREE.Color('#efe6d4');
    room(st, { w: 16, d: 12, h: 3.6, wall: o.cafe ? '#6a4a3a' : '#e8dcc0', floorTex: o.cafe ? planks('#8a5a3a') : checker('#d8cdb8', '#c4b8a2', 10), panels: 2, grime: 0.06 }); ceiling(st, 16, 12, 3.6); ceilLights(st, 16, 12, 3.6, 3);
    st.add(box(10, 1.0, 0.9, o.cafe ? '#3a2a24' : '#b8c0c8', 0, 0.5, -5.0, { outline: 0.015 })); st.add(box(10.1, 0.06, 1.0, o.cafe ? '#d8b88a' : '#e8eef2', 0, 1.03, -5.0));
    if (o.cafe) { st.add(box(0.6, 0.55, 0.45, '#2a2a30', -2, 1.33, -5.1, { outline: 0.01 })); st.add(box(0.6, 0.45, 0.4, '#c8c8d0', 2.2, 1.28, -5.1, { outline: 0.01 }));
      st.add(picture(4, 1.2, signTex('COFFEE  ·  TEA  ·  SNACKS', '#1a1a20', '#ffd23f'), 0, 2.6, -5.98)); for (let k = 0; k < 5; k++) st.add(cyl(0.05, 0.04, 0.12, '#f4f4f4', -0.8 + k * 0.3, 1.12, -4.75, { outline: 0.004 })); }
    else { for (let k = 0; k < 6; k++) st.add(box(1.2, 0.08, 0.6, '#c8ccd2', -3.5 + k * 1.4, 1.1, -5.0, { outline: 0.006 })); st.add(picture(4.4, 1.0, signTex('DINING HALL', '#2a5a8a', '#ffffff'), 0, 2.7, -5.98)); }
    const tables = o.cafe ? [[-4, 0], [4, 0], [-4, 3], [4, 3]] : [[-4.5, -1.2], [0, -1.2], [4.5, -1.2], [-4.5, 2.2], [0, 2.2], [4.5, 2.2]];
    for (const [x, z] of tables) { st.add(box(o.cafe ? 1.2 : 3.2, 0.06, 1.0, o.cafe ? '#c89a68' : '#d8b88a', x, 0.76, z, { outline: 0.01 })); for (const a of [-1, 1]) st.add(box(0.06, 0.74, 0.06, '#5a5a68', x + a * (o.cafe ? 0.5 : 1.45), 0.37, z));
      for (const s of [-1, 1]) st.add(box(o.cafe ? 1.0 : 3.0, 0.06, 0.32, '#3a6ea5', x, 0.46, z + s * 0.78, { outline: 0.008 })); }
    // double doors in the right wall (glass panels slide on hinges: st.doors[0..1] rotate around their outer edge)
    st.add(box(0.1, 2.5, 2.3, '#9aa0aa', 7.96, 1.25, 2, { outline: 0.01 })); st.doors = [-1, 1].map((s) => { const pv = new THREE.Group(); pv.position.set(7.9, 0, 2 + s * 1.05);
      const p = box(0.05, 2.3, 1.0, '#bfe0f0', 0, 1.15, -s * 0.5, { outline: 0.008 }); p.material.transparent = true; p.material.opacity = 0.55; pv.add(p); pv.add(box(0.07, 0.06, 0.5, '#5a5a68', -0.05, 1.1, -s * 0.75)); st.add(pv); pv.userData.s = s; return pv; });
    for (const z of [-3, 4.5]) st.add(window3(-7.97, 1.9, z, 2.2, 1.4, Math.PI / 2));
    st.groundAt = () => 0; return { door: [7.9, 0, 2] };
  },
  // library: shelves on the back and left walls, two long tables with green lamps along x (z = -1.2 and 1.8)
  library(st, o = {}) {
    const night = o.night; light(st, night ? { sun: '#ffd8a0', sunI: 1.6, sunPos: [3, 8, 6], fill: 1.1, sky: '#d8c0a0' } : { sunPos: [5, 10, 8], fill: 1.6, sun: '#ffe8c8' }); st.scene.background = new THREE.Color('#e8d8bc');
    room(st, { w: 14, d: 12, h: 4, wall: '#d8c09a', floorTex: planks('#8a5a3a'), panels: 3, grime: 0.05 }); ceiling(st, 14, 12, 4, '#efe2c8');
    const books = (W, H) => (g) => { const r = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646; })(); g.fillStyle = '#5a3a24'; g.fillRect(0, 0, W, H); const rows = 5, rh = H / rows;
      const cs = ['#c8302c', '#2a5ad8', '#e8b02a', '#3a8a4a', '#6a3a8a', '#e8e2d4', '#2a2a34', '#d8784a'];
      for (let y = 0; y < rows; y++) { let x = 6; while (x < W - 10) { const w = 8 + r() * 14, h = rh * (0.62 + r() * 0.28); g.fillStyle = cs[Math.floor(r() * cs.length)]; g.fillRect(x, y * rh + rh - h - 6, w, h); x += w + 2; } g.fillStyle = '#3a2414'; g.fillRect(0, y * rh + rh - 6, W, 6); } };
    for (const x of [-4.5, 0, 4.5]) { st.add(box(4.2, 3.2, 0.5, '#5a3a24', x, 1.6, -5.72, { outline: 0.012 })); st.add(picture(4.0, 3.0, books(512, 384), x, 1.6, -5.46)); }
    for (const z of [-3, 1.5]) { st.add(box(0.5, 3.2, 4.2, '#5a3a24', -6.72, 1.6, z, { outline: 0.012 })); st.add(picture(4.0, 3.0, books(512, 384), -6.46, 1.6, z, Math.PI / 2)); }
    for (const z of [-1.2, 1.8]) { st.add(box(6.0, 0.07, 1.2, '#9a6a3e', 0.5, 0.76, z, { outline: 0.01 })); for (const a of [-2.8, 2.8]) st.add(box(0.08, 0.74, 1.0, '#6a4428', 0.5 + a, 0.37, z));
      for (const x of [-1.5, 0.5, 2.5]) { st.add(cyl(0.02, 0.02, 0.32, '#c8a24a', x, 0.95, z)); const sh = cyl(0.14, 0.1, 0.12, '#2f7a4a', x, 1.12, z, { outline: 0.006 }); st.add(sh); st.add(glow(0.18, 0.02, '#fff0b0', x, 1.05, z, 0)); }
      for (let k = -2; k <= 2; k++) for (const s of [-1, 1]) { const c = new THREE.Group(); c.add(box(0.42, 0.05, 0.42, '#7a4a2a', 0, 0.45, 0, { outline: 0.008 })); c.add(box(0.42, 0.45, 0.05, '#7a4a2a', 0, 0.7, s * 0.2)); for (const [a, b] of [[0.18, 0.18], [0.18, -0.18], [-0.18, 0.18], [-0.18, -0.18]]) c.add(box(0.03, 0.45, 0.03, '#4a2a1a', a, 0.22, b)); c.position.set(0.5 + k * 1.2, 0, z + s * 0.85); st.add(c); } }
    if (night) { const l = new THREE.PointLight('#ffd890', 5, 8, 1.4); l.position.set(0.5, 1.6, 0.3); st.add(l); }
    st.groundAt = () => 0; return { tables: [[0.5, -1.2], [0.5, 1.8]] };
  },
  // bus interior: aisle along z (front at z = -5.6), seats in rows on both sides (x = +-0.75), driver at x = -0.55, z = -5.2 facing -z.
  // passengers face -z (toward the front). st.scenery scrolls past the windows: call st.scroll(t).
  busInside(st, o = {}) {
    const night = o.night, rain = o.rain; light(st, night ? { sun: '#c8d4ff', sunI: 1.0, sunPos: [3, 8, 4], fill: 1.0, sky: '#8a9ac8' } : { sunPos: [4, 10, 6], fill: 1.7 });
    st.scene.background = new THREE.Color(night ? '#1a2238' : '#a8d0f0');
    st.add(M(new THREE.PlaneGeometry(2.6, 14), tmat(mottled('#3a3d48', { rep: [2, 8], v: 0.05, seed: 3 })), 0, 0, -0.5, { cast: false, rot: [-Math.PI / 2, 0, 0] }));
    st.add(M(new THREE.PlaneGeometry(2.6, 14), '#e8e8ec', 0, 2.3, -0.5, { cast: false, rot: [Math.PI / 2, 0, 0] }));
    for (const s of [-1, 1]) { st.add(M(new THREE.PlaneGeometry(14, 0.9), '#c8ccd4', s * 1.3, 0.45, -0.5, { cast: false, rot: [0, -s * Math.PI / 2, 0] })); st.add(M(new THREE.PlaneGeometry(14, 0.45), '#c8ccd4', s * 1.3, 2.08, -0.5, { cast: false, rot: [0, -s * Math.PI / 2, 0] }));
      st.add(cyl(0.025, 0.025, 14, '#c8c8d0', s * 1.0, 2.0, -0.5, { rot: [Math.PI / 2, 0, 0] })); }
    // scenery strip behind the windows (both sides), scrolled by st.scroll
    const scen = tex(1024, 128, (g, W, H) => { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, night ? '#1a2440' : '#9fd0f2'); gr.addColorStop(1, night ? '#2a3050' : '#dceaf6'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      for (let x = 0; x < W; x += 60) { g.fillStyle = night ? '#2a2e48' : ['#c8b8a0', '#a8b8c8', '#d8c0a8'][x / 60 % 3]; const h = 40 + ((x * 37) % 50); g.fillRect(x, H - h, 52, h); if (night) { g.fillStyle = '#ffd890'; for (let k = 0; k < 4; k++) g.fillRect(x + 8 + (k % 2) * 22, H - h + 10 + Math.floor(k / 2) * 18, 10, 8); } }
      g.fillStyle = night ? '#141824' : '#5a8a4a'; g.fillRect(0, H - 14, W, 14); });
    scen.wrapS = THREE.RepeatWrapping; scen.repeat.set(3, 1);
    for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(14, 1.15), new THREE.MeshBasicMaterial({ map: scen })); w.position.set(s * 1.42, 1.48, -0.5); w.rotation.y = -s * Math.PI / 2; st.add(w); }
    for (let z = -5; z <= 6; z += 1.4) for (const s of [-1, 1]) st.add(box(0.06, 1.2, 0.08, '#8a8f9a', s * 1.3, 1.48, z));
    if (rain) for (let k = 0; k < 40; k++) st.add(box(0.004, 0.08, 0.004, '#cfe8ff', (k % 2 ? 1 : -1) * 1.29, 1.1 + ((k * 37) % 80) / 100, -5 + ((k * 53) % 1100) / 100));
    st.scroll = (t) => { scen.offset.x = (t * 0.06) % 1; };
    st.seats = []; for (let z = -3.4; z <= 5.2; z += 0.95) for (const s of [-1, 1]) { const g = new THREE.Group(); g.add(box(0.85, 0.12, 0.5, '#2a5ad8', 0, 0.48, 0, { outline: 0.008 })); g.add(box(0.85, 0.62, 0.1, '#2a5ad8', 0, 0.82, 0.25, { outline: 0.008 })); g.add(box(0.06, 0.45, 0.06, '#8a8f9a', 0, 0.22, 0)); g.position.set(s * 0.78, 0, z); st.add(g); st.seats.push([s * 0.78, z]); }
    for (const z of [-2, 1.5, 4.5]) st.add(cyl(0.025, 0.025, 2.3, '#e8c84a', 0.32, 1.15, z));
    // driver area
    st.add(box(2.6, 1.2, 0.3, '#2a2a34', 0, 0.6, -6.0, { outline: 0.01 })); const wind = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.0), new THREE.MeshBasicMaterial({ color: night ? '#1a2440' : '#bfe4fa' })); wind.position.set(0, 1.75, -6.1); st.add(wind);
    st.add(box(0.55, 0.12, 0.5, '#3a3a44', -0.55, 0.5, -5.15, { outline: 0.008 })); st.add(box(0.55, 0.7, 0.1, '#3a3a44', -0.55, 0.88, -4.9, { outline: 0.008 }));
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.025, 6, 24), new THREE.MeshToonMaterial({ color: '#1a1a20' })); wheel.position.set(-0.55, 1.0, -5.62); wheel.rotation.x = -0.9; st.add(wheel); st.wheel = wheel;
    st.add(umbrellaBox(-1.0, -4.45));   // beside the driver, clear of his legs
    st.groundAt = () => 0; return { driver: [-0.55, -5.15] };
  },
};
