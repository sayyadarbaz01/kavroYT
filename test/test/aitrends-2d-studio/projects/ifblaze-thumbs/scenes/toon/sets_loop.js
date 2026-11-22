// toon/sets_loop.js — sets and props for If Blaze "What If You and Your Crush Were Stuck in a Time Loop?" (Nov 2026).
// Rooms are open toward +z: put the camera on the +z side. Every seat is a solid box whose top is 0.47 m so seated figures pass the float check.
import * as THREE from 'three';
import { M, box, cyl, ball, glow, picture, light, tex, room, planks, checker, groundPlane, sky } from './sets3d.js';

const label = (str, bg, fg, font = 0.62) => (g, W, H) => { g.fillStyle = bg; g.fillRect(0, 0, W, H); g.fillStyle = fg; let fs = H * font; do { g.font = `900 ${fs}px Nunito`; fs -= 2; } while (g.measureText(str).width > W * 0.88);
  g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(str, W / 2, H / 2 + fs * 0.05); };
// digital clock face (a picture), e.g. clock('7:00', 'AM')
export const clockFace = (str, sub = '') => (g, W, H) => { g.fillStyle = '#141418'; g.fillRect(0, 0, W, H); g.fillStyle = '#ff3a3a'; g.font = `900 ${H * 0.62}px Nunito`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(str, W * (sub ? 0.44 : 0.5), H * 0.52);
  if (sub) { g.font = `900 ${H * 0.24}px Nunito`; g.fillText(sub, W * 0.86, H * 0.68); } };

// ---------- props (all held props are built at the origin; carry places them) ----------
export function coffee(c = '#f4f4f4') { const g = new THREE.Group(); g.add(cyl(0.045, 0.035, 0.13, c, 0, 0, 0, { outline: 0.004 })); g.add(cyl(0.048, 0.048, 0.02, '#6a4024', 0, 0.07, 0)); g.add(cyl(0.047, 0.042, 0.04, '#c89a68', 0, -0.01, 0)); return g; }
export function bowl() { const g = new THREE.Group(); g.add(cyl(0.11, 0.07, 0.07, '#f4f4f4', 0, 0, 0, { outline: 0.004 })); for (let k = 0; k < 7; k++) g.add(ball(0.018, '#e8b84a', Math.cos(k) * 0.06, 0.035, Math.sin(k * 1.7) * 0.06)); return g; }
export function guitar() { const g = new THREE.Group(); g.add(cyl(0.2, 0.2, 0.09, '#c8702c', 0, 0, 0, { rot: [Math.PI / 2, 0, 0], outline: 0.005 })); g.add(cyl(0.16, 0.16, 0.091, '#c8702c', 0.22, 0, 0, { rot: [Math.PI / 2, 0, 0] }));
  g.add(cyl(0.05, 0.05, 0.095, '#2a1a10', 0.05, 0, 0, { rot: [Math.PI / 2, 0, 0] })); g.add(box(0.6, 0.05, 0.03, '#5a3a24', 0.6, 0, 0, { outline: 0.003 })); g.add(box(0.1, 0.07, 0.035, '#2a1a10', 0.94, 0, 0)); return g; }
export function speech() { const g = new THREE.Group(); g.add(box(0.21, 0.29, 0.004, '#fbfaf4', 0, 0, 0, { outline: 0.002 })); for (let k = 0; k < 6; k++) g.add(box(0.15, 0.008, 0.002, '#3a5ad8', 0, 0.1 - k * 0.035, 0.003)); return g; }
export function waterGlass() { const g = new THREE.Group(); const m = cyl(0.04, 0.035, 0.12, '#bfe8ff', 0, 0, 0); m.material.transparent = true; m.material.opacity = 0.7; g.add(m); return g; }
export function frisbee() { const g = new THREE.Group(); g.add(cyl(0.13, 0.13, 0.025, '#ff3a8a', 0, 0, 0, { outline: 0.004 })); return g; }
export function sunglasses(f) { const g = new THREE.Group(); for (const s of [-1, 1]) g.add(box(0.03, 0.07, 0.11, '#141418', 0.27, 0.04, s * 0.09)); g.add(box(0.02, 0.015, 0.08, '#141418', 0.28, 0.06, 0)); f.parts.head.add(g); return g; }
// cereal spilled down a hoodie (front of the chest)
export function cerealStain(f, n = 9) { const g = new THREE.Group(); for (let k = 0; k < n; k++) g.add(ball(0.022, k % 3 ? '#e8b84a' : '#f4f4f4', 0.2, 0.22 - (k % 4) * 0.06, -0.1 + ((k * 37) % 20) / 100)); (f.parts.spine || f.parts.torso || f).add(g); return g; }
export function greenHair(f) { const g = new THREE.Group(); for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; g.add(ball(0.1, '#3adf6a', Math.cos(a) * 0.17, 0.2, Math.sin(a) * 0.17)); } f.parts.head.add(g); return g; }
export function boombox(x, y, z, rotY = 0) { const g = new THREE.Group(); g.add(box(0.5, 0.26, 0.16, '#2a2a33', 0, 0.13, 0, { outline: 0.006 })); for (const s of [-1, 1]) g.add(cyl(0.08, 0.08, 0.02, '#8a8f9a', s * 0.15, 0.13, 0.08, { rot: [Math.PI / 2, 0, 0] }));
  g.add(box(0.12, 0.05, 0.02, '#5fe08a', 0, 0.2, 0.085)); g.add(cyl(0.008, 0.008, 0.3, '#c8c8d0', 0.2, 0.4, 0, { rot: [0, 0, -0.4] })); g.position.set(x, y, z); g.rotation.y = rotY; return g; }
export function bike(x, z, rotY = 0, c = '#3a9ad8') { const g = new THREE.Group(); for (const wx of [0.5, -0.5]) g.add(M(new THREE.TorusGeometry(0.3, 0.03, 8, 22), '#141418', wx, 0.33, 0));
  g.add(box(1.0, 0.05, 0.05, c, 0, 0.6, 0, { rot: [0, 0, 0.1] })); g.add(box(0.05, 0.4, 0.05, c, -0.15, 0.45, 0)); g.add(box(0.22, 0.05, 0.12, '#141418', -0.18, 0.68, 0)); g.add(box(0.05, 0.45, 0.05, c, 0.42, 0.55, 0, { rot: [0, 0, -0.3] })); g.add(box(0.04, 0.04, 0.45, '#2a2a33', 0.48, 0.8, 0));
  g.position.set(x, 0, z); g.rotation.y = rotY; return g; }
export function deer(x, z, rotY = 0) { const g = new THREE.Group(); g.add(box(0.9, 0.42, 0.34, '#b8783a', 0, 0.85, 0, { outline: 0.008 })); for (const [a, b] of [[0.35, 0.12], [0.35, -0.12], [-0.35, 0.12], [-0.35, -0.12]]) g.add(box(0.07, 0.65, 0.07, '#9a6030', a, 0.33, b));
  g.add(box(0.12, 0.4, 0.14, '#b8783a', 0.48, 1.15, 0, { rot: [0, 0, -0.4] })); g.add(box(0.28, 0.16, 0.16, '#b8783a', 0.62, 1.36, 0, { outline: 0.006 })); g.add(ball(0.03, '#141418', 0.76, 1.38, 0)); g.position.set(x, 0, z); g.rotation.y = rotY; return g; }

// ---------- sets ----------
export const LOOP = {
  // dorm room (6.8 x 6): Kip's bed along the back-left (solid box, top 0.47, x -3.2..-1.2, z -2.8..-1.8); sit on it at (-2.0, -2.15) facing +z.
  // Sam's desk on the back-right at (2.3, -2.55) with a desk chair (top 0.47) at (2.3, -1.85): Sam sits there facing -z.
  // Window on the back wall at x 0.4 (Gary hits it). Whiteboard on the left wall. o.wed: the wall calendar says WEDNESDAY. o.board: timeline written on the whiteboard.
  dorm(st, o = {}) {
    light(st, { sunPos: [4, 9, 8], fill: 1.6 }); st.scene.background = new THREE.Color('#d8e4ec');
    room(st, { w: 6.8, d: 6, h: 2.8, wall: '#c6d8e6', floorTex: planks('#b48a5a') });
    st.add(box(2.0, 0.47, 1.0, '#f4f4f4', -2.2, 0.235, -2.3, { outline: 0.012 })); st.add(box(2.0, 0.06, 1.02, '#3a6ad8', -2.2, 0.47, -2.3)); st.add(box(0.45, 0.14, 0.8, '#ffffff', -3.0, 0.55, -2.3)); st.add(box(0.06, 0.9, 1.0, '#a0683e', -3.23, 0.45, -2.3));
    st.add(box(0.45, 0.5, 0.4, '#a0683e', -0.85, 0.25, -2.7, { outline: 0.008 })); st.add(picture(0.3, 0.13, clockFace('7:00', 'AM'), -0.85, 0.58, -2.49));
    st.add(box(1.3, 0.05, 0.6, '#d8b88a', 2.3, 0.74, -2.65, { outline: 0.008 })); for (const [a, b] of [[-0.6, -0.25], [0.6, -0.25], [-0.6, 0.25], [0.6, 0.25]]) st.add(box(0.05, 0.72, 0.05, '#5a5a68', 2.3 + a, 0.36, -2.65 + b));
    st.add(box(0.5, 0.32, 0.03, '#2a2a34', 2.0, 0.95, -2.85)); st.add(box(0.46, 0.47, 0.46, '#3a3a48', 2.3, 0.235, -1.85, { outline: 0.008 }));
    st.add(picture(1.2, 1.0, (g, W, H) => { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#8ec4f0'); gr.addColorStop(1, '#d8eefc'); g.fillStyle = gr; g.fillRect(0, 0, W, H); g.fillStyle = '#7ab05a'; g.fillRect(0, H * 0.75, W, H * 0.25);
      g.strokeStyle = '#f4f4f4'; g.lineWidth = 16; g.strokeRect(0, 0, W, H); g.beginPath(); g.moveTo(W / 2, 0); g.lineTo(W / 2, H); g.stroke(); }, 0.4, 1.65, -2.98));
    st.add(picture(0.5, 0.6, (g, W, H) => { g.fillStyle = '#ffffff'; g.fillRect(0, 0, W, H); g.fillStyle = '#e8453c'; g.fillRect(0, 0, W, H * 0.3); g.fillStyle = '#ffffff'; g.font = `900 ${H * 0.13}px Nunito`; g.textAlign = 'center'; g.fillText(o.wed ? 'WEDNESDAY' : 'TUESDAY', W / 2, H * 0.2);
      g.fillStyle = '#141418'; g.font = `900 ${H * 0.5}px Nunito`; g.fillText(o.wed ? '15' : '14', W / 2, H * 0.78); }, -1.0, 1.8, -2.98));
    st.add(picture(2.0, 1.1, (g, W, H) => { g.fillStyle = '#fbfbf8'; g.fillRect(0, 0, W, H); g.strokeStyle = '#9aa0aa'; g.lineWidth = 14; g.strokeRect(0, 0, W, H);
      if (o.board) { g.strokeStyle = '#2a4ad8'; g.lineWidth = 6; g.beginPath(); g.moveTo(W * 0.06, H * 0.5); g.lineTo(W * 0.94, H * 0.5); g.stroke(); g.font = `900 ${H * 0.085}px Nunito`; g.textAlign = 'center';
        [['7:00', 'RESET'], ['9:14', 'SONG'], ['11:02', 'BIKE'], ['3:40', 'PHONE'], ['SUNSET', 'BENCH'], ['11:58', 'PARTY']].forEach(([a, b], k) => { const x = W * (0.1 + k * 0.16); g.fillStyle = k === 4 ? '#e8453c' : '#2a4ad8'; g.beginPath(); g.arc(x, H * 0.5, 12, 0, 7); g.fill(); g.fillText(a, x, H * 0.36); g.fillStyle = '#141418'; g.fillText(b, x, H * 0.7); }); } }, -3.38, 1.5, 0.3, Math.PI / 2));
    st.add(box(0.8, 0.05, 0.25, '#a0683e', 3.25, 1.6, 0.6)); for (let k = 0; k < 5; k++) st.add(box(0.06, 0.24, 0.18, ['#e8453c', '#3a9ad8', '#ffd23f', '#5fe08a', '#c88aff'][k], 3.25, 1.75, 0.35 + k * 0.1));
    return { bed: [-2.0, 0, -2.15], chair: [2.3, 0, -1.85], window: [0.4, 1.65, -2.98] };
  },
  // house party at night (10 x 8): couch along the back-left (seat top 0.47, x -4.4..-2.0, z -3.5..-2.7), snack table at (-0.4, -3.3),
  // the front door on the back wall at x 3.0 (opening x 2.5..3.5), a wall clock above it (o.time, default 11:58). Open floor x -3..4, z -2..3.
  party(st, o = {}) {
    light(st, { sun: '#c8b0ff', sunI: 0.9, sky: '#7a6ab8', fill: 1.15, sunPos: [3, 9, 8], rim: '#ff9ad8', ground: '#2a2440' }); st.scene.background = new THREE.Color('#1a1428');
    room(st, { w: 10, d: 8, h: 3, wall: '#4a3a66', floorTex: planks('#6a4a3a') });
    for (const [c, x] of [['#c85aff', -3], ['#3ad8ff', 3]]) { const l = new THREE.PointLight(c, 5, 9, 1.5); l.position.set(x, 2.6, 0); st.add(l); }
    for (let k = 0; k < 24; k++) st.add(ball(0.04, ['#ffd23f', '#ff6ab0', '#6ae8ff', '#8aff8a'][k % 4], -4.8 + k * 0.42, 2.72 - Math.sin((k % 6) / 5 * Math.PI) * 0.12, -3.95));
    st.add(box(2.4, 0.47, 0.8, '#3a5a9a', -3.2, 0.235, -3.1, { outline: 0.012 })); st.add(box(2.4, 0.5, 0.2, '#3a5a9a', -3.2, 0.72, -3.42, { outline: 0.01 })); for (const s of [-1, 1]) st.add(box(0.18, 0.62, 0.8, '#3a5a9a', -3.2 + s * 1.2, 0.31, -3.1, { outline: 0.008 }));
    st.add(box(1.4, 0.05, 0.6, '#c89a68', -0.4, 0.75, -3.3, { outline: 0.008 })); for (const [a, b] of [[-0.6, -0.25], [0.6, -0.25], [-0.6, 0.25], [0.6, 0.25]]) st.add(box(0.05, 0.73, 0.05, '#3a3a44', -0.4 + a, 0.365, -3.3 + b));
    ['#e8453c', '#3a9ad8', '#ffd23f', '#e8453c', '#5fe08a'].forEach((c, k) => st.add(cyl(0.04, 0.035, 0.12, c, -0.9 + k * 0.25, 0.84, -3.25 + (k % 2) * 0.12)));
    st.add(cyl(0.18, 0.15, 0.1, '#e8b84a', -0.1, 0.83, -3.4, { outline: 0.004 }));
    st.add(box(0.12, 2.3, 0.12, '#e8e2d4', 2.44, 1.15, -3.94)); st.add(box(0.12, 2.3, 0.12, '#e8e2d4', 3.56, 1.15, -3.94)); st.add(box(1.24, 0.12, 0.12, '#e8e2d4', 3.0, 2.3, -3.94));
    st.add(glow(1.0, 2.2, '#0a0a14', 3.0, 1.1, -3.985)); st.add(box(0.06, 2.2, 0.9, '#8a5a3a', 2.52, 1.1, -3.5, { rot: [0, 0.5, 0], outline: 0.006 }));
    st.add(picture(0.6, 0.26, clockFace(o.time || '11:58', 'PM'), 3.0, 2.62, -3.98));
    st.add(box(0.5, 1.1, 0.45, '#1a1a22', 4.4, 0.55, -3.5, { outline: 0.008 })); for (const y of [0.35, 0.8]) st.add(cyl(0.15, 0.15, 0.02, '#4a4a58', 4.4, y, -3.26, { rot: [Math.PI / 2, 0, 0] }));
    st.add(picture(1.8, 0.5, label('CLASS OF 2026', '#ffd23f', '#2a1a40'), -0.4, 2.15, -3.98));
    return { door: [3.0, 0, -3.6], couch: [-3.2, 0, -3.0], table: [-0.4, 0, -3.3] };
  },
  // rooftop observatory at night: a flat roof (12 x 9, floor y 0), railing along z -3.6 (thin rails), a dome at (-3.6, -2.2),
  // a telescope on a tripod at (1.2, -2.0) pointing up-left, a bench along x at (0, -2.9) (seat top 0.47, sitters face +z), stars and a city glow beyond.
  rooftop(st, o = {}) {
    light(st, { sun: '#9fb4ff', sunI: 1.0, sky: '#4a5a90', fill: 0.95, sunPos: [4, 10, 8], rim: '#cfe0ff', ground: '#2a2a40' });
    st.scene.background = tex(1024, 512, (g, W, H) => { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#06081e'); gr.addColorStop(0.62, '#1a2458'); gr.addColorStop(1, '#4a3a6a'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      let r = 7; const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280); for (let k = 0; k < 260; k++) { g.fillStyle = `rgba(255,255,255,${0.4 + rnd() * 0.6})`; const s = rnd() < 0.1 ? 3 : 1.6; g.fillRect(rnd() * W, rnd() * H * 0.6, s, s); }
      for (let x = 0; x < W; x += 14) { const h = 20 + ((x * 53) % 60); g.fillStyle = '#10142c'; g.fillRect(x, H * 0.66 - h, 12, h + H); g.fillStyle = '#ffd890'; for (let k = 0; k < 3; k++) if ((x + k) % 3) g.fillRect(x + 3, H * 0.66 - h + 6 + k * 12, 3, 3); } });
    st.add(M(new THREE.PlaneGeometry(12, 9), '#5a5a68', 0, 0, 0, { cast: false, rot: [-Math.PI / 2, 0, 0] })); st.add(box(12, 0.3, 0.2, '#4a4a58', 0, 0.15, -4.4));
    for (let x = -5.8; x <= 5.8; x += 1.45) st.add(box(0.05, 1.0, 0.05, '#9aa0aa', x, 0.5, -3.6)); st.add(box(11.7, 0.05, 0.05, '#9aa0aa', 0, 1.0, -3.6)); st.add(box(11.7, 0.04, 0.04, '#9aa0aa', 0, 0.55, -3.6));
    st.add(cyl(1.3, 1.3, 1.2, '#d8d8e0', -3.6, 0.6, -2.2, { outline: 0.012 })); const dome = M(new THREE.SphereGeometry(1.3, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), '#e8e8f0', -3.6, 1.2, -2.2, { outline: 0.012 }); st.add(dome); st.add(box(0.3, 1.3, 0.05, '#2a2a40', -3.1, 1.75, -1.03, { rot: [0.5, 0, 0] }));
    const tel = new THREE.Group(); for (const a of [0, 2.1, 4.2]) { const l = cyl(0.015, 0.015, 1.25, '#2a2a33', Math.cos(a) * 0.22, 0.6, Math.sin(a) * 0.22); l.rotation.set(Math.sin(a) * 0.3, 0, -Math.cos(a) * 0.3); tel.add(l); }
    const tube = cyl(0.07, 0.09, 1.0, '#f4f4f4', 0, 1.35, 0, { outline: 0.006 }); tube.rotation.z = 0.9; tel.add(tube); tel.position.set(1.2, 0, -2.0); st.add(tel);
    st.add(box(1.8, 0.47, 0.5, '#7a5236', 0, 0.235, -2.9, { outline: 0.01 })); st.add(box(1.8, 0.45, 0.08, '#7a5236', 0, 0.7, -3.13, { outline: 0.008 }));
    for (const x of [-5, 4.6]) { const l = new THREE.PointLight('#ffe0a0', 2.5, 5, 1.6); l.position.set(x, 1.6, -3); st.add(l); st.add(ball(0.08, '#fff0c0', x, 1.2, -3.55)); }
    return { bench: [0, 0, -2.85], telescope: [1.2, 0, -2.0] };
  },
};

// held props parented to the figure (local frame: +x = the way the figure faces, y up). They move with the figure, so they never float or cut the ground.
// guitar across the body: face forward, neck to the left, tilted up
export function holdGuitar(f, seated = false) { const g = new THREE.Group(), gt = guitar(); gt.rotation.z = 0.75; gt.scale.setScalar(0.78); g.add(gt); g.rotation.y = Math.PI / 2; g.position.set(0.28, seated ? 0.68 : 0.98, 0.1); g.userData.held = true; f.add(g); return g; }
// an open book held up to read
export function book3d(c = '#c8506a') { const g = new THREE.Group(); g.add(box(0.2, 0.27, 0.03, c, 0, 0, 0, { outline: 0.004 })); g.add(box(0.185, 0.25, 0.034, '#fbfaf4', 0.006, 0, 0)); return g; }
export function holdBook(f, seated = false, c) { const g = new THREE.Group(), b = book3d(c); b.rotation.x = -0.5; g.add(b); g.rotation.y = Math.PI / 2; g.position.set(0.34, seated ? 0.8 : 1.12, 0); g.userData.held = true; f.add(g); return g; }
