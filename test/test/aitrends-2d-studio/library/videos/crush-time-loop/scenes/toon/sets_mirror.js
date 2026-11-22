// toon/sets_mirror.js — sets for If Blaze "What If Humans Never Invented Mirrors?" (Nov 2026).
// Rooms are open toward +z: put the camera on the +z side. Every wall where a mirror would hang is BLANK unless o.mirror.
// Seats: every seat is a solid box whose top is 0.47 m (same as the kit chair) so seated figures pass the float check.
import * as THREE from 'three';
import { M, box, cyl, ball, glow, picture, light, tmat, mottled, tex, window3, room, planks, checker, groundPlane, sky, tree, lampPost, bench, car, rngf } from './sets3d.js';

const tiles = (a, b, n = 10) => { const t = tex(256, 256, (g, W, H) => { g.fillStyle = a; g.fillRect(0, 0, W, H); g.strokeStyle = b; g.lineWidth = 4; for (let i = 0; i <= n; i++) { g.beginPath(); g.moveTo((i * W) / n, 0); g.lineTo((i * W) / n, H); g.stroke(); g.beginPath(); g.moveTo(0, (i * H) / n); g.lineTo(W, (i * H) / n); g.stroke(); } }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 2); return t; };
const wallPlane = (st, w, h, map, x, y, z, rotY = 0) => { const m = M(new THREE.PlaneGeometry(w, h), new THREE.MeshToonMaterial({ map }), x, y, z, { cast: false }); m.rotation.y = rotY; st.add(m); return m; };
const sign = (str, bg, fg) => (g, W, H) => { g.fillStyle = bg; g.fillRect(0, 0, W, H); g.fillStyle = fg; let fs = H * 0.7; do { g.font = `900 ${fs}px Nunito`; fs -= 2; } while (g.measureText(str).width > W * 0.88); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(str, W / 2, H / 2 + fs * 0.05); };

// ---------- props ----------
// a seat that passes the float check: solid box, top at 0.47 m
export function seat(x, z, rotY = 0, c = '#8a5a3a', back = true) { const g = new THREE.Group(); g.add(box(0.46, 0.06, 0.46, c, 0, 0.44, 0, { outline: 0.006 })); g.add(box(0.4, 0.4, 0.4, c, 0, 0.2, 0));
  if (back) g.add(box(0.06, 0.55, 0.46, c, -0.22, 0.74, 0, { outline: 0.006 })); g.position.set(x, 0, z); g.rotation.y = rotY; return g; }
export function table(x, z, w = 0.9, d = 0.9, c = '#f4ece0', cloth = '#c8302c') { const g = new THREE.Group(); g.add(box(w, 0.05, d, cloth, 0, 0.74, 0, { outline: 0.008 })); g.add(cyl(0.06, 0.06, 0.72, '#3a3a44', 0, 0.36, 0)); g.add(cyl(0.3, 0.3, 0.03, '#3a3a44', 0, 0.015, 0));
  g.position.set(x, 0, z); return g; }
export function candle(x, y, z) { const g = new THREE.Group(); g.add(cyl(0.025, 0.025, 0.14, '#f4ece0', 0, 0.07, 0)); g.add(glow(0.05, 0.08, '#ffd27a', 0, 0.18, 0)); g.position.set(x, y, z); return g; }
// a blank panel where a mirror would be (or a real mirror when shiny)
export function panel(w, h, x, y, z, rotY = 0, shiny = false, frame = '#c8a24a') { const g = new THREE.Group(); g.add(box(w + 0.12, h + 0.12, 0.05, frame, 0, 0, 0, { outline: 0.008 }));
  g.add(picture(w, h, (c, W, H) => { if (shiny) { const gr = c.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#dfeaf2'); gr.addColorStop(0.45, '#a8bccc'); gr.addColorStop(0.55, '#f4f8fb'); gr.addColorStop(1, '#9fb2c2'); c.fillStyle = gr; c.fillRect(0, 0, W, H); c.globalAlpha = 0.5; c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(W * 0.15, 0); c.lineTo(W * 0.32, 0); c.lineTo(W * 0.1, H); c.lineTo(0, H); c.fill(); }
    else { c.fillStyle = '#efe4cc'; c.fillRect(0, 0, W, H); c.strokeStyle = 'rgba(120,90,40,.18)'; c.lineWidth = 6; c.strokeRect(14, 14, W - 28, H - 28); } }, 0, 0, 0.03));
  g.position.set(x, y, z); g.rotation.y = rotY; return g; }

// ---------- Gary the pigeon (prop, faces +x; ~0.5 m tall cartoon). userData: head, wings[2], chest ----------
export function pigeon(x = 0, z = 0, rotY = 0, s = 1) {
  const g = new THREE.Group(), root = new THREE.Group(); g.add(root);
  const body = ball(0.16, '#8a93a6', 0, 0.24, 0, { outline: 0.008 }); body.scale.set(1.35, 1, 0.95); root.add(body);
  const chest = ball(0.13, '#7a6a9a', 0.1, 0.3, 0, { outline: 0.006 }); chest.scale.set(1, 1.05, 0.9); root.add(chest);
  const neck = cyl(0.075, 0.095, 0.14, '#4f9a7a', 0.13, 0.4, 0, { outline: 0.006 }); root.add(neck);
  const head = new THREE.Group(); head.position.set(0.15, 0.5, 0); root.add(head);
  head.add(ball(0.085, '#9aa3b6', 0, 0, 0, { outline: 0.006 }));
  const beak = M(new THREE.ConeGeometry(0.025, 0.08, 8), '#3a3a40', 0.1, -0.01, 0, { outline: 0.004 }); beak.rotation.z = -Math.PI / 2; head.add(beak);
  head.add(ball(0.018, '#f2f2f2', 0.075, 0.018, 0)); for (const sz of [-1, 1]) { head.add(ball(0.026, '#ff8a2a', 0.045, 0.025, sz * 0.06)); head.add(ball(0.013, '#141418', 0.058, 0.027, sz * 0.075)); }
  const wings = [-1, 1].map((sz) => { const w = new THREE.Group(); w.position.set(-0.02, 0.32, sz * 0.13); const m = ball(0.14, '#6f7890', -0.08, 0, 0, { outline: 0.006 }); m.scale.set(1.35, 0.5, 0.35); m.rotation.z = 0.2; w.add(m);
    const tip = ball(0.08, '#3a3f4a', -0.24, -0.03, 0); tip.scale.set(1.2, 0.4, 0.4); w.add(tip); root.add(w); return w; });
  const tail = box(0.18, 0.03, 0.13, '#5a6274', -0.27, 0.22, 0, { outline: 0.005 }); tail.rotation.z = 0.35; root.add(tail);
  for (const sz of [-1, 1]) { root.add(cyl(0.012, 0.012, 0.1, '#e86a5a', 0.02, 0.05, sz * 0.05)); root.add(box(0.07, 0.01, 0.04, '#e86a5a', 0.04, 0.005, sz * 0.05)); }
  root.scale.setScalar(s); g.userData = { head, wings, chest, root, body };
  g.position.set(x, 0, z); g.rotation.y = rotY; return g;
}
// pigeon motion: bob (walking head bob), flap (0..1), puff (chest out 0..1), fall (0..1 tips over)
export function animPigeon(p, t, o = {}) { const { bob = 0, flap = 0, puff = 0, fall = 0, look = 0 } = o, d = p.userData;
  d.head.position.x = 0.15 + bob * 0.04 * Math.sin(t * 12); d.head.rotation.y = look; d.head.rotation.z = puff * 0.25;
  d.wings.forEach((w, k) => { w.rotation.x = (k ? -1 : 1) * flap * (0.4 + 0.8 * Math.abs(Math.sin(t * 16))); });
  d.chest.scale.set(1 + puff * 0.35, 1.05 + puff * 0.3, 0.9 + puff * 0.3); d.root.rotation.x = fall * 1.5; d.root.position.y = fall * 0.12; }

// convertible (open top, faces +x): driver seat at local (−0.1, z −0.38); passenger z +0.38. Seat top 0.47 m.
export function convertible(x, z, rotY = 0, c = '#e8453c') { const g = new THREE.Group(); g.add(box(3.8, 0.42, 1.7, c, 0, 0.42, 0, { outline: 0.015 }));
  g.add(box(1.1, 0.3, 1.7, c, 1.3, 0.78, 0, { outline: 0.012 })); g.add(box(0.7, 0.3, 1.7, c, -1.55, 0.78, 0, { outline: 0.012 }));
  for (const sz of [-0.38, 0.38]) { g.add(box(0.46, 0.06, 0.46, '#2a2a33', -0.1, 0.44, sz)); g.add(box(0.1, 0.6, 0.46, '#2a2a33', -0.38, 0.75, sz, { outline: 0.006 })); }
  g.add(M(new THREE.TorusGeometry(0.16, 0.03, 8, 20), '#1a1a20', 0.42, 0.88, -0.38, { rot: [0, Math.PI / 2, 0] }));
  for (const [a, b] of [[1.25, 0.86], [1.25, -0.86], [-1.25, 0.86], [-1.25, -0.86]]) g.add(cyl(0.34, 0.34, 0.22, '#141418', a, 0.34, b, { rot: [Math.PI / 2, 0, 0] }));
  for (const b of [0.6, -0.6]) g.add(glow(0.2, 0.12, '#fff4c8', 1.91, 0.55, b, Math.PI / 2));
  g.position.set(x, 0, z); g.rotation.y = rotY; return g; }

export function camera3(x, z, rotY = 0) { const g = new THREE.Group(); for (const a of [0, 2.1, 4.2]) { const l = cyl(0.015, 0.015, 1.4, '#2a2a33', Math.cos(a) * 0.18, 0.68, Math.sin(a) * 0.18); l.rotation.set(Math.sin(a) * 0.2, 0, -Math.cos(a) * 0.2); g.add(l); }
  g.add(box(0.3, 0.22, 0.22, '#2a2a33', 0, 1.45, 0, { outline: 0.006 })); g.add(cyl(0.07, 0.08, 0.22, '#141418', 0.24, 1.45, 0, { rot: [0, 0, Math.PI / 2] })); g.add(box(0.22, 0.6, 0.02, '#c8c8d0', -0.3, 1.9, 0.0, { rot: [0, 0, 0] }));
  g.position.set(x, 0, z); g.rotation.y = rotY; return g; }

const ceilGlow = (st, xs, y, c = '#ffffff') => xs.forEach((x) => { const m = glow(1.2, 0.3, c, x, y, -0.5); m.rotation.x = Math.PI / 2; st.add(m); });

export const MIRROR = {
  // bathroom: sink counter on the back wall (z -2.5..-2.0, top 0.88). Wall above the sink is blank (o.mirror: a real mirror).
  // stand at the sink: (0, -1.55) facing -z. "Mirror camera": p [0,1.55,-2.3] looking +z at the face.
  bathroom(st, o = {}) {
    light(st, { sunPos: [4, 9, 8], fill: 1.7 }); st.scene.background = new THREE.Color('#d8e8ec');
    room(st, { w: 6, d: 5, h: 2.8, wall: '#cfe6e8', floorTex: checker('#f4f4f2', '#bcd0d8', 10) });
    wallPlane(st, 6, 1.1, tiles('#f4f8f8', '#c4d8dc', 10), 0, 0.55, -2.49);
    st.add(box(1.6, 0.88, 0.5, '#f4f4f2', 0, 0.44, -2.25, { outline: 0.01 })); st.add(box(1.7, 0.05, 0.55, '#e8e2d4', 0, 0.9, -2.25));
    st.add(cyl(0.22, 0.18, 0.08, '#ffffff', 0, 0.92, -2.2, { outline: 0.005 })); st.add(cyl(0.015, 0.015, 0.22, '#c8c8d0', 0, 1.03, -2.42)); st.add(box(0.15, 0.02, 0.02, '#c8c8d0', 0, 1.13, -2.36));
    st.add(cyl(0.03, 0.03, 0.18, '#5fb0ff', 0.55, 1.0, -2.3)); st.add(cyl(0.03, 0.03, 0.14, '#ff8ab0', 0.65, 0.98, -2.32));
    if (o.mirror) st.add(panel(1.2, 1.0, 0, 1.75, -2.47, 0, true, '#e8e2d4'));
    st.add(box(0.5, 0.42, 0.65, '#ffffff', 2.3, 0.21, -2.0, { outline: 0.01 })); st.add(box(0.5, 0.55, 0.22, '#ffffff', 2.3, 0.7, -2.38, { outline: 0.01 }));
    st.add(box(0.06, 0.7, 0.4, '#5fb0a8', -2.96, 1.4, -1.2)); st.add(cyl(0.01, 0.01, 0.5, '#c8c8d0', -2.94, 1.78, -1.2, { rot: [Math.PI / 2, 0, 0] }));
    st.add(box(1.6, 0.6, 0.9, '#ffffff', -2.1, 0.3, 1.6, { outline: 0.01 }));
    return { sink: [0, 0, -1.55] };
  },
  // hall of mirrors: long gallery along x (-12..12), back wall z -4 lined with 17 arched panels (shiny unless o.blank), chandeliers.
  versailles(st, o = {}) {
    light(st, { sunPos: [2, 12, 10], fill: 1.8, sun: '#fff1d6' }); st.scene.background = new THREE.Color('#f2e2c0');
    room(st, { w: 26, d: 8, h: 5.4, wall: '#f2e4c4', floorTex: checker('#c89a5a', '#a87a3a', 12) });
    for (let k = -8; k <= 8; k++) { const x = k * 1.5; st.add(panel(1.0, 3.2, x, 2.2, -3.95, 0, !o.blank, '#d4a83a')); st.add(box(0.18, 4.6, 0.12, '#e8d4a0', x + 0.75, 2.3, -3.9)); }
    st.add(box(26, 0.3, 0.2, '#d4a83a', 0, 4.4, -3.9)); st.add(box(26, 0.12, 0.2, '#d4a83a', 0, 0.06, -3.9));
    for (const x of [-9, -4.5, 0, 4.5, 9]) { st.add(cyl(0.01, 0.01, 0.9, '#d4a83a', x, 4.95, -0.5)); for (let a = 0; a < 6; a++) st.add(glow(0.09, 0.12, '#fff2b8', x + Math.cos(a) * 0.35, 4.45, -0.5 + Math.sin(a) * 0.35)); st.add(ball(0.18, '#d4a83a', x, 4.4, -0.5, { outline: 0.006 })); }
    for (let k = -6; k <= 6; k++) st.add(window3(k * 2, 2.2, 4.6, 1.0, 2.6, Math.PI)); // (windows face the mirrors, behind the camera)
    return { hall: [0, 0, 0] };
  },
  // barber shop: barber chair at (0, -0.6) facing +z (seat top 0.47), counter on the back wall, blank wall above it, striped pole at x -3.
  barber(st, o = {}) {
    light(st, { sunPos: [5, 9, 8], fill: 1.6 }); st.scene.background = new THREE.Color('#e6d6b8');
    room(st, { w: 9, d: 6, h: 3, wall: '#e8dcc4', floorTex: checker('#f2f2f2', '#2a2a33', 12) });
    st.add(box(4, 0.85, 0.5, '#5a3a24', 0, 0.43, -2.75, { outline: 0.01 })); st.add(box(3.6, 1.2, 0.04, '#efe4cc', 0, 1.75, -2.98));
    for (const [x, c] of [[-1.2, '#3a8ad8'], [-0.9, '#5fe08a'], [1.0, '#e8453c'], [1.3, '#ffd23f']]) st.add(cyl(0.04, 0.04, 0.2, c, x, 0.95, -2.7));
    const ch = new THREE.Group(); ch.add(box(0.5, 0.06, 0.5, '#c8302c', 0, 0.44, 0, { outline: 0.008 })); ch.add(box(0.44, 0.38, 0.44, '#2a2a33', 0, 0.2, 0)); ch.add(box(0.5, 0.7, 0.08, '#c8302c', 0, 0.8, -0.24, { outline: 0.008 }));
    for (const sx of [-1, 1]) ch.add(box(0.06, 0.06, 0.4, '#2a2a33', sx * 0.27, 0.64, 0)); ch.position.set(0, 0, -0.6); st.add(ch);
    const pole = new THREE.Group(); pole.add(cyl(0.12, 0.12, 1.1, '#ffffff', 0, 0, 0, { outline: 0.006 })); for (let i = 0; i < 4; i++) { const r = box(0.26, 0.08, 0.26, i % 2 ? '#c8302c' : '#2a5ad8', 0, -0.4 + i * 0.27, 0); r.rotation.z = 0.5; pole.add(r); }
    pole.position.set(-3.8, 1.8, -2.6); st.add(pole); st.add(picture(1.8, 0.5, sign('BARBER', '#2a2a33', '#ffd23f'), 2.5, 2.4, -2.98));
    st.add(seat(3.6, 0.8, Math.PI, '#8a5a3a')); st.add(seat(3.6, 1.6, Math.PI, '#8a5a3a'));
    return { chair: [0, 0, -0.6] };
  },
  // clothing store: fitting booth at x -2.6 (curtain), racks at x 2.2..3.6 (back), a counter at x 3.4, z 1.4. Open floor x -1.5..2, z -1..2.
  store(st, o = {}) {
    light(st, { sunPos: [4, 10, 8], fill: 1.7 }); st.scene.background = new THREE.Color('#f2e8dc');
    room(st, { w: 10, d: 7, h: 3.2, wall: '#f4ece0', floorTex: planks('#d8c0a0') });
    const booth = new THREE.Group(); booth.add(box(1.4, 2.3, 0.08, '#e8dcc4', 0, 1.15, -0.7)); booth.add(box(0.08, 2.3, 1.4, '#e8dcc4', -0.7, 1.15, 0)); booth.add(box(0.08, 2.3, 1.4, '#e8dcc4', 0.7, 1.15, 0));
    booth.add(box(1.4, 0.06, 1.4, '#c8a878', 0, 2.33, 0)); const cur = box(1.3, 1.9, 0.04, '#c8302c', 0, 1.25, 0.68, { outline: 0.006 }); booth.add(cur); booth.position.set(-3.3, 0, -2.6); st.add(booth); st.userData = { ...(st.userData || {}), curtain: cur };
    const cols = ['#3a6ad8', '#e8453c', '#5fe08a', '#ffd23f', '#8a6ad6', '#2a2a33', '#f2f2f2'];
    for (const [x, z] of [[2.6, -2.7], [-0.6, -2.9]]) { st.add(box(1.8, 0.04, 0.04, '#9a9aa4', x, 1.7, z)); for (const sx of [-0.85, 0.85]) st.add(cyl(0.02, 0.02, 1.7, '#9a9aa4', x + sx, 0.85, z));
      for (let k = 0; k < 8; k++) st.add(box(0.2, 0.7, 0.42, cols[k % 7], x - 0.75 + k * 0.21, 1.3, z, { outline: 0.004 })); }
    st.add(box(1.6, 1.0, 0.7, '#5a3a24', 3.6, 0.5, 1.6, { outline: 0.01 })); st.add(picture(2.4, 0.5, sign('NO MIRRORS. ASK STAFF.', '#2a2a33', '#ffffff'), 2.0, 2.6, -3.48));
    return { booth: [-3.3, 0, -1.6] };
  },
  // dentist: reclined chair, seat top 0.47 at (0, 0) facing +x; lamp on an arm; tray at (0.9, -0.6).
  dentist(st, o = {}) {
    light(st, { sunPos: [4, 10, 8], fill: 1.8 }); st.scene.background = new THREE.Color('#e4f0f2');
    room(st, { w: 8, d: 6, h: 3, wall: '#e4f2f0', floorTex: checker('#f4f4f2', '#d4e4e8', 10) });
    const ch = new THREE.Group(); ch.add(box(0.6, 0.06, 0.55, '#5fb0a8', 0, 0.44, 0, { outline: 0.008 })); ch.add(box(0.5, 0.38, 0.4, '#d8d8e0', 0, 0.2, 0));
    const back = box(0.08, 0.9, 0.55, '#5fb0a8', -0.52, 0.85, 0, { outline: 0.008 }); back.rotation.z = 0.55; ch.add(back); ch.add(box(0.7, 0.06, 0.5, '#5fb0a8', 0.6, 0.3, 0, { outline: 0.006, rot: [0, 0, -0.35] }));
    st.add(ch); st.add(cyl(0.03, 0.03, 1.8, '#d8d8e0', -1.0, 0.9, -0.8)); st.add(box(1.2, 0.04, 0.04, '#d8d8e0', -0.45, 1.8, -0.6)); st.add(box(0.3, 0.08, 0.2, '#f4f4f4', 0.15, 1.75, -0.4, { outline: 0.005 })); st.add(glow(0.2, 0.06, '#fffbe0', 0.15, 1.7, -0.29));
    st.add(box(0.5, 0.04, 0.35, '#d8d8e0', 1.0, 0.95, -0.9)); st.add(cyl(0.02, 0.02, 0.95, '#d8d8e0', 1.0, 0.47, -0.9));
    st.add(box(1.8, 0.9, 0.6, '#f4f4f4', -2.6, 0.45, -2.6, { outline: 0.01 })); st.add(picture(1.2, 0.8, (c, W, H) => { c.fillStyle = '#ffffff'; c.fillRect(0, 0, W, H); c.fillStyle = '#3a9ad8'; c.font = `900 ${H * 0.18}px Nunito`; c.textAlign = 'center'; c.fillText('BRUSH TWICE', W / 2, H * 0.3); c.fillStyle = '#f4f4f4'; c.strokeStyle = '#3a9ad8'; c.lineWidth = 8; c.beginPath(); c.moveTo(W * 0.35, H * 0.45); c.quadraticCurveTo(W * 0.5, H * 0.4, W * 0.65, H * 0.45); c.lineTo(W * 0.6, H * 0.9); c.lineTo(W * 0.5, H * 0.65); c.lineTo(W * 0.4, H * 0.9); c.closePath(); c.fill(); c.stroke(); }, 1.6, 1.8, -2.98));
    return { chair: [0, 0, 0] };
  },
  // dance studio: wooden floor, long BLANK back wall with a barre (thin), a speaker. Open floor x -5..5, z -2.5..3.
  studio(st, o = {}) {
    light(st, { sunPos: [3, 10, 9], fill: 1.7 }); st.scene.background = new THREE.Color('#efe4d0');
    room(st, { w: 14, d: 9, h: 3.6, wall: '#f0e6d6', floorTex: planks('#c89a62') });
    st.add(cyl(0.025, 0.025, 12, '#a0683e', 0, 1.05, -4.25, { rot: [0, 0, Math.PI / 2] })); for (const x of [-5.5, 0, 5.5]) st.add(cyl(0.015, 0.015, 0.4, '#9a9aa4', x, 1.05, -4.4, { rot: [Math.PI / 2, 0, 0] }));
    st.add(box(0.6, 1.0, 0.5, '#2a2a33', -6.2, 0.5, -3.8, { outline: 0.01 })); st.add(picture(3, 0.6, sign('DANCE', '#c8302c', '#ffffff'), 0, 2.8, -4.48));
    for (const z of [-2.5, 0, 2.5]) st.add(window3(6.97, 1.9, z, 2, 1.5, -Math.PI / 2));
    return {};
  },
  // restaurant: date table at (0, 0); chairs at x -0.7 (facing +x) and x +0.7 (facing -x). Door side x -4. Other tables at x ±3.2, z -1.8.
  restaurant(st, o = {}) {
    light(st, { sunPos: [4, 9, 8], fill: 1.1, sun: '#ffd8b0', sunI: 1.6 }); st.scene.background = new THREE.Color('#3a2430');
    room(st, { w: 10, d: 8, h: 3.2, wall: '#7a3a40', floorTex: planks('#6a4630') });
    const tb = (x, z) => { st.add(table(x, z)); st.add(seat(x - 0.7, z, 0, '#3a2a24')); st.add(seat(x + 0.7, z, Math.PI, '#3a2a24')); st.add(candle(x, 0.77, z)); };
    tb(0, 0); tb(-3.2, -2.2); tb(3.2, -2.2);
    for (const x of [-3, 0, 3]) { st.add(cyl(0.005, 0.005, 1, '#2a2a2a', x, 2.7, -1)); st.add(ball(0.12, '#ffd27a', x, 2.2, -1)); }
    const pl = new THREE.PointLight('#ffb070', 5, 6, 1.5); pl.position.set(0, 2.0, 0.5); st.add(pl);
    st.add(box(0.1, 2.2, 1.1, '#3a2a24', -4.95, 1.1, 1.5));
    return { table: [0, 0, 0] };
  },
  // tiny apartment: 3.6 x 3.2 room, bed along the back wall, a lamp, no space. Stand at (0.6, 0.4).
  tiny(st, o = {}) {
    light(st, { sunPos: [3, 8, 6], fill: 1.5 }); st.scene.background = new THREE.Color('#d8c8b0');
    room(st, { w: 3.6, d: 3.2, h: 2.6, wall: '#c8d0b8', floorTex: planks('#a87a4a') });
    st.add(box(1.9, 0.45, 0.95, '#f4f4f4', -0.7, 0.23, -1.1, { outline: 0.01 })); st.add(box(1.9, 0.1, 0.97, '#3a6ad8', -0.7, 0.5, -1.1));
    st.add(box(0.5, 0.6, 0.4, '#a0683e', 1.4, 0.3, -1.3, { outline: 0.01 })); st.add(ball(0.12, '#ffe8b0', 1.4, 0.75, -1.3));
    st.add(picture(1.4, 0.9, (c, W, H) => { c.fillStyle = '#e8dcc4'; c.fillRect(0, 0, W, H); c.strokeStyle = 'rgba(0,0,0,.15)'; c.lineWidth = 6; c.strokeRect(12, 12, W - 24, H - 24); }, 0.9, 1.6, -1.58));
    return {};
  },
  // highway: 4 lanes along x at z -4.5, -1.5, 1.5, 4.5; grass both sides; distant hills.
  highway(st, o = {}) {
    light(st, { sunPos: [-8, 14, 8] }); sky(st, ['#5f9ee0', '#a9d0f0', '#e4eef6']); groundPlane(st, '#7aa862', { seed: 12 });
    st.add(box(400, 0.02, 12.4, '#4a4e58', 0, 0.01, 0, { cast: false }));
    const mov = new THREE.Group(); st.add(mov); for (const z of [-3, 0, 3]) for (let x = -200; x < 200; x += 5) mov.add(box(2.2, 0.022, 0.14, z === 0 ? '#ffd23f' : '#f2f2f2', x, 0.02, z, { cast: false }));
    for (const z of [-6.3, 6.3]) st.add(box(400, 0.3, 0.12, '#c8c8d0', 0, 0.45, z));
    const r = rngf(5), blk = [...Array(5)].map(() => [r() * 5, -12 - r() * 8, 1 + r() * 0.5]); for (let b = -150; b < 150; b += 25) blk.forEach(([dx, z, sc], k) => mov.add(tree(b + k * 5 + dx, z, sc)));
    if (o.scroll) st.scroll = (t) => { mov.position.x = -((t * o.scroll) % 25); };
    st.scene.fog = new THREE.Fog(new THREE.Color('#e4eef6'), 40, 140);
    return { lanes: [-4.5, -1.5, 1.5, 4.5] };
  },
  // parking garage: concrete floor, pillars, a blind corner (wall from x -1 to -10 at z -1), lane along x and along z.
  garage(st, o = {}) {
    light(st, { sunPos: [2, 10, 6], fill: 1.0, sunI: 1.1 }); st.scene.background = new THREE.Color('#5a5c62');
    groundPlane(st, '#8a8a8e', { seed: 4, v: 0.04 }); st.add(M(new THREE.PlaneGeometry(60, 60), '#7a7a80', 0, 3.2, 0, { cast: false, rot: [Math.PI / 2, 0, 0] }));
    st.add(box(9, 3.2, 0.4, '#b8b4ac', -5.5, 1.6, -1.2, { outline: 0.012 })); st.add(box(0.4, 3.2, 9, '#b8b4ac', -1.2, 1.6, -5.5, { outline: 0.012 }));
    for (const [x, z] of [[3, -4], [3, 4], [-4, 4], [8, -4], [8, 4]]) st.add(box(0.6, 3.2, 0.6, '#c8c4bc', x, 1.6, z, { outline: 0.01 }));
    for (let x = -10; x < 12; x += 2.6) st.add(box(0.1, 0.02, 2.4, '#f2f2f2', x, 0.02, 3.6, { cast: false }));
    st.add(picture(1.2, 0.4, sign('LEVEL 2', '#ffd23f', '#2a2a33'), -5, 2.4, -0.99));
    for (const z of [-6, 0, 6]) { const m = glow(1.6, 0.2, '#f4f8ff', 2, 3.18, z); m.rotation.x = Math.PI / 2; st.add(m); }
    if (o.mirror) { const m = new THREE.Group(); m.add(M(new THREE.CircleGeometry(0.45, 24), '#cfe0ec', 0, 0, 0.01)); m.add(M(new THREE.TorusGeometry(0.45, 0.05, 8, 24), '#ff8a2a', 0, 0, 0)); m.position.set(-1.2, 2.5, -1.0); m.rotation.y = Math.PI / 4; st.add(m); }
    return {};
  },
  // photo booth on the street (o.booth): the booth at (0, -2.2) with a curtain facing +z, temple glow.
  boothStreet(st, o = {}) {
    light(st, { sunPos: [-6, 12, 8], fill: 1.4 }); sky(st, ['#5a68b0', '#c890a8', '#f0c8a0']); groundPlane(st, '#8a8a90', { seed: 9 });
    st.add(box(60, 0.14, 4, '#cfc6b8', 0, 0.07, -2.2, { cast: false })); st.add(box(60, 6, 0.4, '#d8c8b0', 0, 3, -4.4, { outline: 0.02 }));
    for (let x = -20; x <= 20; x += 2.4) st.add(box(1.2, 1.4, 0.04, '#8fc4ec', x, 3.6, -4.18, { cast: false }));
    const b = new THREE.Group(); b.add(box(1.4, 2.4, 1.2, '#c8302c', 0, 1.2, 0, { outline: 0.012 })); b.add(box(1.0, 1.9, 0.04, '#ffd23f', 0.0, 1.1, 0.62, { outline: 0.006 }));
    b.add(picture(1.3, 0.4, sign('PHOTOS', '#2a2a33', '#ffd23f'), 0, 2.2, 0.62)); b.add(glow(2.4, 3.2, '#ffe8a0', 0, 1.6, -0.62)); b.position.set(0, 0.14, -2.6); st.add(b);
    for (const x of [-6, 6]) st.add(lampPost(x, -1.2));
    st.groundAt = (x, z) => (z >= -4.2 && z <= -0.2 ? 0.14 : 0);
    return { booth: [0, 0, -2.6] };
  },
  // pond in the park: still water disc at (0, -1.2), r 1.3 (flat, walkable edge), trees, grass.
  pond(st, o = {}) {
    light(st, { sunPos: [-8, 14, 8] }); sky(st, ['#6fa8e0', '#a9d0f0', '#dceaf6']); groundPlane(st, '#79a362', { seed: 21 });
    const w = M(new THREE.CircleGeometry(1.3, 40), '#5aa0d0', 0, 0.02, -1.2, { cast: false, rot: [-Math.PI / 2, 0, 0] }); st.add(w); st.add(M(new THREE.RingGeometry(1.3, 1.45, 40), '#8a7a5a', 0, 0.021, -1.2, { cast: false, rot: [-Math.PI / 2, 0, 0] }));
    for (const [x, z, s] of [[-4, -4, 1.2], [3.5, -5, 1], [6, -2, 0.9], [-6, -1, 1.1], [-2, -7, 1.3]]) st.add(tree(x, z, s));
    for (const [x, z] of [[-1.8, -0.6], [1.6, -2.2], [2.0, -0.3]]) st.add(ball(0.18, '#9a9aa4', x, 0.08, z, { outline: 0.005 }));
    st.scene.fog = new THREE.Fog(new THREE.Color('#dceaf6'), 30, 90);
    return { water: [0, 0, -1.2] };
  },
};
