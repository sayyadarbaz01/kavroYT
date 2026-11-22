// toon/toon.js — cel-shaded 3D toon kit: materials, outlines, and a jointed character with face expressions.
// Characters are ~1.55 m, big round glossy ink heads with a cream rim crescent, chunky hoodies, thin ink legs.
// They face +x (same convention as three-kit). Right side = +z.
import * as THREE from 'three';

const C = (c) => new THREE.Color(c);
let _grad = null;
let _soft = null; // gentler 3-band ramp for light skin so the shadow side doesn't look dirty
export function softGradientMap() {
  if (_soft) return _soft;
  const d = new Uint8Array([205, 205, 205, 255, 232, 232, 232, 255, 255, 255, 255, 255]);
  _soft = new THREE.DataTexture(d, 3, 1, THREE.RGBAFormat); _soft.minFilter = _soft.magFilter = THREE.NearestFilter; _soft.needsUpdate = true; return _soft;
}
export function gradientMap() {
  if (_grad) return _grad;
  const d = new Uint8Array([110, 110, 110, 255, 190, 190, 190, 255, 255, 255, 255, 255]);
  _grad = new THREE.DataTexture(d, 3, 1, THREE.RGBAFormat); _grad.minFilter = _grad.magFilter = THREE.NearestFilter; _grad.needsUpdate = true; return _grad;
}
const _mats = new Map();
// cel-shaded colour material (cached by colour)
export function toon(c, o = {}) {
  const k = c + JSON.stringify(o); if (_mats.has(k)) return _mats.get(k);
  const m = new THREE.MeshToonMaterial({ color: C(c), gradientMap: gradientMap(), ...o }); _mats.set(k, m); return m;
}
// outline: inverted hull pushed along normals (constant world thickness)
const _ol = new Map();
export function outlineMat(th = 0.012, c = '#141218') {
  const k = th + c; if (_ol.has(k)) return _ol.get(k);
  // fog-aware so outlines fade with the scene instead of staying as dark lines in the distance
  const m = new THREE.ShaderMaterial({ side: THREE.BackSide, fog: true, uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { th: { value: th }, col: { value: C(c) } }]),
    vertexShader: `uniform float th;
#include <fog_pars_vertex>
void main(){ vec3 p = position + normal * th; vec4 mvPosition = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mvPosition;
#include <fog_vertex>
}`,
    fragmentShader: `uniform vec3 col;
#include <fog_pars_fragment>
void main(){ gl_FragColor = vec4(col, 1.0);
#include <fog_fragment>
}` });
  _ol.set(k, m); return m;
}
export function withOutline(mesh, th = 0.012) { const o = new THREE.Mesh(mesh.geometry, outlineMat(th)); o.castShadow = false; mesh.add(o); return mesh; }

// glossy ink: dark body with a crisp cream rim crescent on the lit side and a small specular dot
export const LIGHT = { dir: new THREE.Vector3(-0.5, 0.8, 0.45).normalize(), rim: C('#fff1d6') };
let _ink = null;
export function inkMat() {
  if (_ink) return _ink;
  _ink = new THREE.ShaderMaterial({ uniforms: { L: { value: LIGHT.dir }, rimC: { value: LIGHT.rim }, base: { value: C('#101015') } },
    vertexShader: 'varying vec3 vN; varying vec3 vP; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vP = w.xyz; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: `uniform vec3 L; uniform vec3 rimC; uniform vec3 base; varying vec3 vN; varying vec3 vP;
      void main(){ vec3 N = normalize(vN); vec3 V = normalize(cameraPosition - vP); float lit = dot(N, L);
        float fres = 1.0 - max(dot(N, V), 0.0);
        float rim = smoothstep(0.58, 0.64, fres) * smoothstep(-0.05, 0.2, lit);
        float spec = smoothstep(0.993, 0.997, dot(N, normalize(L + V)));
        vec3 c = base * (0.85 + 0.35 * step(0.2, lit)) + rimC * rim * 0.95 + vec3(0.9) * spec * 0.45;
        gl_FragColor = vec4(c, 1.0); }` });
  return _ink;
}

// ---------- faces ----------
// eyes: dot | happy | ring | wide | closed | glasses ; mouth: smile | grin | o | flat | frown | wavy | smirk
export const EXPR = {
  neutral: { eyes: 'dot', mouth: 'smallSmile' }, smile: { eyes: 'dot', mouth: 'smile' }, happy: { eyes: 'happy', mouth: 'grin' }, joy: { eyes: 'happy', mouth: 'grin', brows: 'up' },
  surprised: { eyes: 'ring', mouth: 'o', brows: 'up' }, shocked: { eyes: 'wide', mouth: 'oBig', brows: 'up' }, scared: { eyes: 'ring', mouth: 'wavy', brows: 'worried' },
  worried: { eyes: 'dot', mouth: 'wavy', brows: 'worried' }, sad: { eyes: 'dot', mouth: 'frown', brows: 'worried' }, determined: { eyes: 'dot', mouth: 'flat', brows: 'angry' },
  angry: { eyes: 'dot', mouth: 'frown', brows: 'angry' }, smirk: { eyes: 'dot', mouth: 'smirk', brows: 'one' }, sleepy: { eyes: 'closed', mouth: 'flat' },
  blink: { eyes: 'closed', mouth: 'smallSmile' }, thinking: { eyes: 'dot', mouth: 'flat', brows: 'one', look: [0.35, -0.3] }, confused: { eyes: 'dot', mouth: 'wavy', brows: 'one' },
  awe: { eyes: 'wide', mouth: 'o', brows: 'up' }, calm: { eyes: 'closed', mouth: 'smile' }, talk: { eyes: 'dot', mouth: 'oSmall' },
  // thumbnail faces: exaggerated so they read at phone size
  tShock: { eyes: 'huge', mouth: 'scream', brows: 'high' }, tGasp: { eyes: 'huge', mouth: 'oHuge', brows: 'high' },
  tWorry: { eyes: 'huge', mouth: 'wavyBig', brows: 'worried' }, tDrool: { eyes: 'closed', mouth: 'drool' },
};
const _faceTex = new Map();
// big = Kip's upgraded face: bigger eyes with dark pupils + sparkle, bolder brows (reads at thumbnail size)
// fg = feature colour for light-skinned heads (dark eyes/mouth on a white head); null = white features on ink
function faceTexture(name, glasses, big = false, fg = null) {
  const k = name + (glasses ? 'g' : '') + (big ? 'B' : '') + (fg || ''); if (_faceTex.has(k)) return _faceTex.get(k);
  const S = 512, c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d');
  const e = EXPR[name] || EXPR.neutral, W = fg || '#ffffff', INK = '#101015', lk = e.look || [0, 0];
  g.fillStyle = W; g.strokeStyle = W; g.lineCap = 'round'; g.lineJoin = 'round';
  const ey = S * 0.44, ex = S * (big ? 0.18 : 0.17), cx = S / 2;
  g.translate(cx, S * 0.5); g.scale(1.3, 1.3); g.translate(-cx, -S * 0.5);
  for (const sx of [-1, 1]) { const x = cx + sx * ex;
    g.save(); if (big) { g.translate(x, ey); g.scale(1.3, 1.3); g.translate(-x, -ey); }
    if (glasses) { g.lineWidth = 12; g.beginPath(); g.arc(x, ey, 46, 0, 7); g.stroke(); }
    const pupilEye = fg ? (rx, ry, pr, off) => { // dark glossy eye + white sparkle (for white heads)
      g.beginPath(); g.ellipse(x + lk[0] * off * 0.6, ey + lk[1] * off * 0.6, rx * 0.8, ry * 0.85, 0, 0, 7); g.fill();
      g.fillStyle = '#ffffff'; g.beginPath(); g.arc(x + lk[0] * off - rx * 0.28, ey + lk[1] * off - ry * 0.32, pr * 0.42, 0, 7); g.fill(); g.fillStyle = W; }
    : (rx, ry, pr, off) => { g.beginPath(); g.ellipse(x, ey, rx, ry, 0, 0, 7); g.fill();
      g.fillStyle = INK; g.beginPath(); g.arc(x + lk[0] * off + sx * 2, ey + lk[1] * off + 2, pr, 0, 7); g.fill();
      g.fillStyle = W; g.beginPath(); g.arc(x + lk[0] * off - pr * 0.35, ey + lk[1] * off - pr * 0.4, pr * 0.32, 0, 7); g.fill(); };
    switch (e.eyes) {
      case 'happy': g.lineWidth = 16; g.beginPath(); g.arc(x, ey + 10, 26, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); break;
      case 'closed': g.lineWidth = 14; g.beginPath(); g.arc(x, ey - 6, 26, Math.PI * 0.15, Math.PI * 0.85); g.stroke(); break;
      case 'ring': if (big) { pupilEye(30, 32, 9, 12); break; } g.lineWidth = 12; g.beginPath(); g.arc(x, ey, 30, 0, 7); g.stroke(); g.beginPath(); g.arc(x + lk[0] * 10, ey + lk[1] * 10, 12, 0, 7); g.fill(); break;
      case 'wide': if (big) { pupilEye(34, 36, 11, 12); break; } g.beginPath(); g.arc(x, ey, 34, 0, 7); g.fill(); g.fillStyle = INK; g.beginPath(); g.arc(x + lk[0] * 12, ey + lk[1] * 12, 14, 0, 7); g.fill(); g.fillStyle = W; break;
      case 'huge': { g.restore(); g.save(); const rx = 50, ry = 58; g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(x, ey, rx, ry, 0, 0, 7); g.fill(); g.lineWidth = 9; g.strokeStyle = INK; g.stroke();
        g.fillStyle = INK; g.beginPath(); g.arc(x - sx * 4 + lk[0] * 16, ey + 4 + lk[1] * 16, 14, 0, 7); g.fill(); g.fillStyle = '#ffffff'; g.beginPath(); g.arc(x - sx * 4 - 5, ey - 2, 5, 0, 7); g.fill(); g.fillStyle = W; g.strokeStyle = W; break; }
      default: if (big) { pupilEye(24, 30, 12, 8); break; } g.beginPath(); g.ellipse(x + lk[0] * 14, ey + lk[1] * 14, 17, 22, 0, 0, 7); g.fill();
    }
    g.restore();
    g.lineWidth = big ? 16 : 13; const by = ey - (big ? 70 : 58);
    if (e.brows === 'high') { g.lineWidth = 17; g.beginPath(); g.arc(x, by - 8, 32, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); }
    if (e.brows === 'up') { g.beginPath(); g.arc(x, by + 16, 28, Math.PI * 1.2, Math.PI * 1.8); g.stroke(); }
    if (e.brows === 'worried') { g.beginPath(); g.moveTo(x - sx * 30, by + 4); g.lineTo(x + sx * 26, by - 12); g.stroke(); }
    if (e.brows === 'angry') { g.beginPath(); g.moveTo(x - sx * 30, by - 14); g.lineTo(x + sx * 24, by + 8); g.stroke(); }
    if (e.brows === 'one' && sx > 0) { g.beginPath(); g.moveTo(x - 26, by - 4); g.lineTo(x + 26, by - 14); g.stroke(); }
  }
  const my = S * 0.64; g.lineWidth = 15;
  switch (e.mouth) {
    case 'smile': g.beginPath(); g.arc(cx, my - 30, 46, 0.35, Math.PI - 0.35); g.stroke(); break;
    case 'smallSmile': g.beginPath(); g.arc(cx, my - 20, 28, 0.45, Math.PI - 0.45); g.stroke(); break;
    case 'grin': g.beginPath(); g.moveTo(cx - 54, my - 14); g.quadraticCurveTo(cx, my + 70, cx + 54, my - 14); g.closePath(); g.fill(); break;
    case 'o': g.beginPath(); g.ellipse(cx, my, 18, 24, 0, 0, 7); g.fill(); break;
    case 'oSmall': g.beginPath(); g.ellipse(cx, my, 14, 12, 0, 0, 7); g.fill(); break;
    case 'oBig': g.lineWidth = 13; g.beginPath(); g.ellipse(cx, my + 6, 26, 32, 0, 0, 7); g.stroke(); break;
    case 'flat': g.beginPath(); g.moveTo(cx - 28, my); g.lineTo(cx + 28, my); g.stroke(); break;
    case 'frown': g.beginPath(); g.arc(cx, my + 32, 34, Math.PI + 0.5, Math.PI * 2 - 0.5); g.stroke(); break;
    case 'smirk': g.beginPath(); g.moveTo(cx - 26, my + 4); g.quadraticCurveTo(cx + 8, my + 14, cx + 38, my - 14); g.stroke(); break;
    case 'scream': { g.beginPath(); g.ellipse(cx, my + 26, 34, 58, 0, 0, 7); g.fill(); g.save(); g.clip(); g.fillStyle = '#e8506a'; g.beginPath(); g.ellipse(cx, my + 76, 26, 20, 0, 0, 7); g.fill(); g.restore(); break; }   // jaw drop
    case 'oHuge': { g.beginPath(); g.ellipse(cx, my + 14, 30, 40, 0, 0, 7); g.fill(); g.save(); g.clip(); g.fillStyle = '#e8506a'; g.beginPath(); g.ellipse(cx, my + 50, 22, 16, 0, 0, 7); g.fill(); g.restore(); break; }
    case 'wavyBig': g.lineWidth = 17; g.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20; g.lineTo(cx - 56 + u * 112, my + 8 + Math.sin(u * Math.PI * 3) * 13); } g.stroke(); break;
    case 'drool': g.beginPath(); g.ellipse(cx - 6, my + 4, 20, 14, 0, 0, 7); g.fill(); g.fillStyle = '#8fd8ff'; g.beginPath(); g.moveTo(cx + 8, my + 6); g.quadraticCurveTo(cx + 22, my + 50, cx + 16, my + 92); g.arc(cx + 16, my + 100, 12, -Math.PI / 2, Math.PI * 1.5); g.quadraticCurveTo(cx + 4, my + 50, cx + 8, my + 6); g.fill(); g.fillStyle = W; break;
    case 'wavy': g.beginPath(); for (let i = 0; i <= 16; i++) { const u = i / 16; g.lineTo(cx - 40 + u * 80, my + Math.sin(u * Math.PI * 2) * 9); } g.stroke(); break;
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; _faceTex.set(k, t); return t;
}

// ---------- poses (degrees) ----------
// sh:[forward, out] per arm (A = right/+z, B = left/-z), el: elbow bend, hip: forward swing, kn: knee bend,
// spine:[lean forward, side], head:[turn, nod], drop: hip drop in m
const Z = { shA: [0, 6], shB: [0, 6], elA: 8, elB: 8, hipA: 0, hipB: 0, knA: 0, knB: 0, spine: [0, 0], head: [0, 0], drop: 0 };
export const POSE = {
  stand: Z,
  relaxed: { ...Z, shA: [-6, 10], shB: [6, 10], elA: 14, elB: 14, hipA: 4, hipB: -3 },
  wave: { ...Z, shA: [10, 150], elA: 40, head: [0, 4] },
  cheer: { ...Z, shA: [10, 160], shB: [10, 160], elA: 20, elB: 20, head: [0, 10] },
  point: { ...Z, shA: [88, 8], elA: 4, head: [0, 0] },
  think: { ...Z, shA: [50, 4], elA: 135, shB: [30, 20], elB: 90, head: [0, 8] },
  shocked: { ...Z, shA: [60, 70], shB: [60, 70], elA: 140, elB: 140, spine: [-6, 0], head: [0, 6] },
  handsUp: { ...Z, shA: [20, 120], shB: [20, 120], elA: 60, elB: 60, spine: [-8, 0] },
  shrug: { ...Z, shA: [10, 40], shB: [10, 40], elA: 100, elB: 100, head: [0, 6] },
  sad: { ...Z, shA: [4, 4], shB: [4, 4], spine: [18, 0], head: [0, -20] },
  phone: { ...Z, shA: [40, 10], elA: 120, head: [0, -18] },
  holdFront: { ...Z, shA: [45, 12], shB: [45, 12], elA: 60, elB: 60 },
  crossArms: { ...Z, shA: [30, 10], shB: [30, 10], elA: 115, elB: 115 },
  explain: { ...Z, shA: [50, 30], elA: 50, shB: [30, 20], elB: 40 },
  sit: { ...Z, hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [38, 4], shB: [38, 4], elA: 58, elB: 58 },
  sitDesk: { ...Z, hipA: 88, hipB: 88, knA: 92, knB: 92, drop: 0.36, shA: [55, 10], shB: [55, 10], elA: 75, elB: 75 },
  kneel: { ...Z, hipA: 80, knA: 90, hipB: -10, knB: 100, drop: 0.32, spine: [12, 0], head: [0, -12] },
  crouch: { ...Z, hipA: 70, hipB: 70, knA: 120, knB: 120, drop: 0.35, spine: [25, 0], shA: [40, 10], shB: [40, 10] },
  ready: { ...Z, hipA: 20, hipB: -10, knA: 30, knB: 20, drop: 0.06, shA: [30, 30], shB: [-20, 30], elA: 70, elB: 70, spine: [10, 0] },
  fall: { ...Z, shA: [30, 150], shB: [-20, 120], elA: 30, elB: 20, hipA: 40, knA: 60, hipB: -20, knB: 20 },
  facepalm: { ...Z, shA: [70, 10], elA: 150, spine: [10, 0], head: [0, -14] },
  carry: { ...Z, shA: [30, 4], elA: 80, shB: [-5, 6] },
  sleep: { ...Z, shA: [5, 10], shB: [5, 10], head: [0, -6] },
};
export function walkPose(phase, run = false) {
  const s = Math.sin(phase), c = Math.cos(phase), A = run ? 48 : 28;
  return { ...Z, hipA: s * A, hipB: -s * A, knA: Math.max(0, -c) * (run ? 70 : 38) + 6, knB: Math.max(0, c) * (run ? 70 : 38) + 6,
    shA: [-s * A * 0.9, 8], shB: [s * A * 0.9, 8], elA: run ? 85 : 20, elB: run ? 85 : 20, spine: [run ? 14 : 4, 0], drop: Math.abs(c) * (run ? 0.04 : 0.02), head: [0, 0] };
}
export function blend(a, b, k) {
  const o = {}; for (const key of Object.keys(Z)) { const x = a[key] ?? Z[key], y = b[key] ?? Z[key]; o[key] = Array.isArray(x) ? x.map((v, i) => v + (y[i] - v) * k) : x + (y - x) * k; } return o;
}
export function posesAt(t, keys, dur = 0.35) {
  let cur = typeof keys[0][1] === 'string' ? POSE[keys[0][1]] : keys[0][1];
  for (let i = 1; i < keys.length; i++) { const [at, p] = keys[i]; const P = typeof p === 'string' ? POSE[p] : p; if (t < at) break; const k = Math.min(1, (t - at) / dur); cur = blend(cur, P, k * k * (3 - 2 * k)); }
  return cur;
}
export const breathe = (p, t, seed = 0) => ({ ...p, spine: [p.spine[0] + Math.sin(t * 1.6 + seed) * 1.5, p.spine[1]], shA: [p.shA[0], p.shA[1] + Math.sin(t * 1.6 + seed) * 1.5], shB: [p.shB[0], p.shB[1] + Math.sin(t * 1.6 + seed) * 1.5], head: [p.head[0] + Math.sin(t * 0.7 + seed) * 2, p.head[1]] });

// ---------- character ----------
// outfit: { top:'hoodie'|'tee'|'labcoat'|'suit'|'cardigan', color, cap, capColor, hair:'none'|'curly'|'bun'|'spiky', glasses, legs, kid, skirt }
export function toonFigure(outfit = {}, o = {}) {
  const ink = inkMat(), D = (x) => (x * Math.PI) / 180;
  const root = new THREE.Group(), body = new THREE.Group(); root.add(body);
  const sc = (o.s || 1) * (outfit.kid ? 0.82 : 1); body.scale.setScalar(sc);
  const cloth = toon(outfit.top === 'labcoat' ? '#f2f2f4' : outfit.color || '#1fa38f');
  const mesh = (geo, m, outline = 0) => { const x = new THREE.Mesh(geo, m); x.castShadow = true; x.receiveShadow = false; if (outline) withOutline(x, outline); return x; };
  const legLen = 0.36, hipY = legLen * 2 + 0.05;
  const hips = new THREE.Group(); hips.position.y = hipY; body.add(hips);
  const spine = new THREE.Group(); hips.add(spine);
  // torso: chunky hoodie / tee / coat
  const tall = outfit.top === 'labcoat' ? 0.5 : 0.3;
  const torso = mesh(new THREE.CapsuleGeometry(0.16, tall, 6, 16), cloth, 0.012); torso.position.y = 0.2 - (tall - 0.3) / 2; torso.scale.set(0.95, 1, 1.12); spine.add(torso);
  if (outfit.top === 'labcoat') { const coat = mesh(new THREE.CylinderGeometry(0.17, 0.22, 0.4, 16, 1, true), toon('#f2f2f4', { side: THREE.DoubleSide }), 0); coat.position.y = -0.12; spine.add(coat); }
  if (!outfit.top || outfit.top === 'hoodie') {
    const hood = mesh(new THREE.TorusGeometry(0.13, 0.06, 8, 18), cloth, 0.01); hood.position.set(-0.06, 0.44, 0); hood.rotation.set(0, Math.PI / 2, 0.35); spine.add(hood);
    const hc = new THREE.Color(outfit.color || '#1fa38f'), dark = hc.getHSL({}).l < 0.25;
    const pocket = mesh(new THREE.BoxGeometry(0.02, 0.09, 0.22), toon((dark ? hc.clone().lerp(new THREE.Color('#ffffff'), 0.05) : hc.clone().multiplyScalar(0.8)).getStyle())); pocket.position.set(0.155, 0.12, 0); spine.add(pocket);
    for (const z of [-0.04, 0.04]) { const st = mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.12, 6), toon('#f4f4f4')); st.position.set(0.17, 0.33, z); spine.add(st); }
  }
  if (outfit.bag) { const bm = toon(outfit.bag); const bag = mesh(new THREE.BoxGeometry(0.16, 0.34, 0.3), bm, 0.01); bag.position.set(-0.24, 0.22, 0); spine.add(bag); const flap = mesh(new THREE.BoxGeometry(0.17, 0.08, 0.31), toon(new THREE.Color(outfit.bag).multiplyScalar(0.75).getStyle())); flap.position.set(-0.24, 0.36, 0); spine.add(flap); root.bag = bag; }
  // logo: lightning bolt badge on the hoodie chest (Kip's brand mark)
  if (outfit.logo) {
    const sh = new THREE.Shape(); [[0.012, 0.05], [-0.022, 0.0], [0.0, 0.0], [-0.014, -0.05], [0.026, 0.008], [0.004, 0.008], [0.02, 0.05]].forEach(([a, b], i) => i ? sh.lineTo(a, b) : sh.moveTo(a, b));
    const bolt = mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.012, bevelEnabled: false }), toon(outfit.logo), 0.004);
    bolt.scale.setScalar(1.25); bolt.rotation.y = Math.PI / 2; bolt.position.set(0.148, 0.22, -0.07); spine.add(bolt); root.logo = bolt;
  }
  // dirt: scuffs on the hoodie (survival variant)
  if (outfit.dirt) { const bc = new THREE.Color(outfit.color || '#1fa38f'); const dm = toon(bc.getHSL({}).l < 0.25 ? '#6e5c48' : bc.multiplyScalar(0.55).getStyle());
    for (const [y, z, s] of [[0.05, 0.08, 1], [0.3, -0.1, 0.7], [-0.02, -0.06, 0.8], [0.16, 0.12, 0.6]]) { const d = mesh(new THREE.SphereGeometry(0.03, 10, 8), dm); d.scale.set(0.3, s, s * 1.3); d.position.set(0.15, y, z); spine.add(d); } }
  if (outfit.top === 'suit') { const tie = mesh(new THREE.BoxGeometry(0.02, 0.2, 0.05), toon('#c9302c')); tie.position.set(0.165, 0.28, 0); spine.add(tie); }
  // neck + head
  const neck = new THREE.Group(); neck.position.y = 0.46; spine.add(neck);
  const head = new THREE.Group(); head.position.y = 0.26; neck.add(head);
  // skin: light head + hands with an ink outline and dark features (default = glossy ink head, white features)
  const skinM = outfit.skin ? new THREE.MeshToonMaterial({ color: C(outfit.skin), gradientMap: softGradientMap() }) : ink, faceFg = outfit.skin ? (outfit.faceColor || '#141218') : null;
  const R = 0.27; const skull = mesh(new THREE.SphereGeometry(R, 40, 28), skinM, outfit.skin ? 0.012 : 0); head.add(skull);
  const faceM = new THREE.MeshBasicMaterial({ map: faceTexture('neutral', outfit.glasses, outfit.bigEyes, faceFg), transparent: true, depthWrite: false });
  const face = new THREE.Mesh(new THREE.SphereGeometry(R * 1.004, 32, 24, Math.PI - 0.62, 1.24, 1.0, 1.15), faceM); face.renderOrder = 2; head.add(face);
  // glow: coloured rim around the ink head so it never vanishes on dark/night sets
  if (outfit.glow) { const halo = new THREE.Mesh(skull.geometry, outlineMat(0.016, outfit.glow)); halo.castShadow = false; skull.add(halo); }
  // plaster: small white cross bandage on the upper cheek (survival variant)
  if (outfit.plaster) { const pm = toon(outfit.skin ? '#d9a877' : '#f4ead8'); for (const r of [0.5, -0.5]) { const p = mesh(new THREE.BoxGeometry(0.012, 0.03, 0.1), pm); p.position.set(R * 0.83, R * 0.32, -R * 0.42); p.rotation.set(r, 0.5, 0); head.add(p); } }
  // cap: 'real' = six-panel baseball cap: seams, top button, curved brim, back strap, front logo letter
  if (outfit.cap === 'real') {
    const capC = outfit.capColor || '#1b1b20', cm = toon(capC), seamM = toon(new THREE.Color(capC).lerp(new THREE.Color('#ffffff'), 0.16).getStyle());
    const crownG = new THREE.Group(); crownG.position.y = 0.012; crownG.scale.set(1.06, 0.95, 1.0); head.add(crownG);
    const CR = R * 1.04, low = Math.PI * 0.44;
    crownG.add(mesh(new THREE.SphereGeometry(CR, 40, 18, 0, Math.PI * 2, 0, low), cm, 0.008));
    const e0 = Math.PI / 2 - low; // seams start at the crown's bottom edge
    for (let i = 0; i < 3; i++) { const sg = new THREE.Group(); sg.rotation.y = (i * Math.PI) / 3; crownG.add(sg);
      const s = new THREE.Mesh(new THREE.TorusGeometry(CR * 1.003, 0.0035, 4, 40, Math.PI - 2 * e0), seamM); s.rotation.z = e0; sg.add(s); }
    const btn = mesh(new THREE.SphereGeometry(0.024, 12, 8), cm, 0.004); btn.scale.y = 0.5; btn.position.y = CR; crownG.add(btn);
    const strap = mesh(new THREE.BoxGeometry(0.02, 0.035, 0.11), seamM); strap.position.set(-CR * 0.99, CR * 0.12, 0); crownG.add(strap);
    if (outfit.capLogo) { // logo letter on the front panel
      const cv = document.createElement('canvas'); cv.width = cv.height = 256; const g2 = cv.getContext('2d');
      g2.fillStyle = outfit.capLogoColor || '#ffffff'; g2.textAlign = 'center'; g2.textBaseline = 'middle'; g2.font = '900 215px Nunito, "Arial Black", sans-serif';
      g2.fillText(outfit.capLogo, 128, 146); const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 4;
      const lg = new THREE.Mesh(new THREE.SphereGeometry(CR * 1.006, 24, 12, Math.PI - 0.5, 1.0, 0.44, 0.66), new THREE.MeshBasicMaterial({ map: tx, transparent: true, depthWrite: false }));
      lg.renderOrder = 3; crownG.add(lg); root.capLogo = lg; }
    // curved brim: wedge of a thin disc, sides bent down like a worn cap
    const bg = new THREE.CylinderGeometry(R * 1.1, R * 1.1, 0.02, 36, 1, false, Math.PI * 0.5 - 1.0, 2.0), bp = bg.attributes.position;
    for (let i = 0; i < bp.count; i++) { const z = bp.getZ(i); bp.setY(i, bp.getY(i) - 1.5 * z * z); } bg.computeVertexNormals();
    const brim = mesh(bg, cm, 0.008); brim.position.set(0.11, R * 0.5, 0); brim.rotation.z = -0.2; head.add(brim);
    const under = mesh(bg, toon(outfit.brimUnder || '#4a4a55')); under.scale.set(0.97, 1, 0.97); under.position.y = -0.006; // inset so its edge never z-fights the brim edge under.castShadow = false; brim.add(under); // lighter under-brim, like a real cap
  } else if (outfit.cap) { const cm = toon(outfit.capColor || '#e8453c');
    const dome = mesh(new THREE.SphereGeometry(R * 1.03, 32, 14, 0, Math.PI * 2, 0, Math.PI * 0.42), cm, 0); dome.position.y = 0.01; head.add(dome);
    const brim = mesh(new THREE.CylinderGeometry(R * 0.95, R * 0.95, 0.018, 28, 1, false, Math.PI * 0.5 - 0.95, 1.9), cm, 0.008); brim.position.set(0.1, R * 0.56, 0); brim.rotation.z = -0.28; head.add(brim);
    const band = mesh(new THREE.TorusGeometry(R * 0.86, 0.012, 6, 32), toon('#ffffff')); band.rotation.x = Math.PI / 2; band.position.y = R * 0.55; head.add(band); }
  if (outfit.hair === 'curly') for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; const b = mesh(new THREE.SphereGeometry(0.09, 12, 10), ink); b.position.set(Math.cos(a) * 0.17 - 0.04, 0.2 + (i % 2) * 0.03, Math.sin(a) * 0.17); head.add(b); }
  if (outfit.hair === 'bun') { const b = mesh(new THREE.SphereGeometry(0.1, 14, 12), ink); b.position.set(-0.14, 0.24, 0); head.add(b); }
  if (outfit.hair === 'spiky') for (let i = 0; i < 7; i++) { const sp = mesh(new THREE.ConeGeometry(0.06, 0.16, 6), ink); const a = -0.9 + i * 0.3; sp.position.set(-0.05 + Math.sin(a) * 0.05, 0.25, Math.sin(a) * 0.16); sp.rotation.set(Math.sin(a) * 0.6, 0, 0.3); head.add(sp); }
  if (outfit.hair === 'pony' && outfit.skin) { const d = mesh(new THREE.SphereGeometry(R * 1.04, 32, 14, 0, Math.PI * 2, 0, Math.PI * 0.4), ink, 0); d.rotation.z = 0.35; head.add(d); }
  if (outfit.hair === 'pony') { const p = mesh(new THREE.CapsuleGeometry(0.06, 0.22, 4, 8), ink); p.position.set(-0.27, -0.02, 0); p.rotation.z = -0.4; head.add(p); }
  // arms
  const limb = (r, len, m) => { const g = new THREE.Group(); const x = mesh(new THREE.CapsuleGeometry(r, len, 4, 10), m, m === ink ? 0 : 0.01); x.position.y = -len / 2; g.add(x); return g; };
  const sleeveLong = outfit.top !== 'tee';
  const arms = {};
  for (const [side, z] of [['A', 0.2], ['B', -0.2]]) {
    const sh = new THREE.Group(); sh.position.set(0, 0.36, z); spine.add(sh);
    const up = limb(0.058, 0.22, cloth); sh.add(up);
    const el = new THREE.Group(); el.position.y = -0.28; up.add(el);
    const lo = limb(sleeveLong ? 0.052 : 0.034, 0.2, sleeveLong ? cloth : ink); el.add(lo);
    const hand = mesh(new THREE.SphereGeometry(0.045, 14, 10), skinM, outfit.skin ? 0.006 : 0); hand.position.y = -0.27; el.add(hand);
    arms[side] = { sh, el, hand };
    // watch: brass pocket-watch strapped to the right wrist (ties to the "Kip's Watch" series)
    if (outfit.watch && side === 'A') { const w = new THREE.Group(); w.position.y = -0.2; el.add(w);
      const strap = mesh(new THREE.TorusGeometry(0.056, 0.013, 8, 20), toon('#5a3a22')); strap.rotation.x = Math.PI / 2; w.add(strap);
      const caseM = mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.018, 20), toon(outfit.watch), 0.004); caseM.rotation.x = Math.PI / 2; caseM.position.z = 0.062; w.add(caseM);
      const dial = mesh(new THREE.CircleGeometry(0.027, 20), toon('#fff3d6')); dial.position.z = 0.0725; w.add(dial);
      const tick = mesh(new THREE.BoxGeometry(0.004, 0.02, 0.002), toon('#141218')); tick.position.set(0, 0.008, 0.074); w.add(tick);
      root.watch = w; }
    // bandage: wrapped left forearm (survival variant)
    if (outfit.bandage && side === 'B') for (const y of [-0.08, -0.12, -0.16]) { const b = mesh(new THREE.TorusGeometry(0.054, 0.011, 6, 18), toon('#f4ead8')); b.rotation.x = Math.PI / 2 + (y * 2); b.position.y = y; el.add(b); }
  }
  // legs
  const legs = {}, legM = outfit.legs ? toon(outfit.legs) : ink;
  for (const [side, z] of [['A', 0.08], ['B', -0.08]]) {
    const hp = new THREE.Group(); hp.position.set(0, 0, z); hips.add(hp);
    const th = limb(0.036, legLen - 0.05, legM); hp.add(th);
    const kn = new THREE.Group(); kn.position.y = -legLen; th.add(kn);
    const sh = limb(0.034, legLen - 0.05, legM); kn.add(sh);
    if (outfit.shoes) { // sneakers: white sole, coloured upper, white laces
      const shoe = new THREE.Group(); shoe.position.y = -legLen; kn.add(shoe);
      const sole = mesh(new THREE.CapsuleGeometry(0.05, 0.1, 4, 12), toon(outfit.sole || '#f4f4f4'), 0.006); sole.rotation.z = Math.PI / 2; sole.scale.set(0.36, 1, 0.98); sole.position.set(0.05, -0.03, 0); shoe.add(sole);
      const up = mesh(new THREE.CapsuleGeometry(0.045, 0.08, 4, 12), toon(outfit.shoes), 0.006); up.rotation.z = Math.PI / 2; up.scale.set(0.86, 1, 0.95); up.position.set(0.035, 0.002, 0); shoe.add(up);
      for (const lx of [0.055, 0.085]) { const l = mesh(new THREE.BoxGeometry(0.012, 0.006, 0.05), toon('#ffffff')); l.position.set(lx, 0.034 - (lx - 0.055) * 0.5, 0); l.rotation.z = -0.3; shoe.add(l); }
    } else { const foot = mesh(new THREE.CapsuleGeometry(0.045, 0.08, 4, 8), ink); foot.rotation.z = Math.PI / 2; foot.position.set(0.04, -legLen, 0); kn.add(foot); }
    legs[side] = { hp, kn };
  }
  if (outfit.skirt) { const sk = mesh(new THREE.ConeGeometry(0.22, 0.3, 16, 1, true), toon(outfit.skirt, { side: THREE.DoubleSide }), 0.01); sk.position.y = -0.06; hips.add(sk); }

  root.parts = { hips, spine, neck, head, arms, legs, face, faceM };
  root.userData.focus = true; // cinema style auto depth-of-field focuses on figures
  root.setPose = (p) => {
    const P = typeof p === 'string' ? POSE[p] || POSE.stand : { ...Z, ...p };
    hips.position.y = hipY - P.drop;
    spine.rotation.set(D(P.spine[1]), 0, -D(P.spine[0]));
    neck.rotation.set(0, D(P.head[0]), D(P.head[1]));
    arms.A.sh.rotation.set(-D(P.shA[1]), 0, D(P.shA[0])); arms.A.el.rotation.set(0, 0, D(P.elA));
    arms.B.sh.rotation.set(D(P.shB[1]), 0, D(P.shB[0])); arms.B.el.rotation.set(0, 0, D(P.elB));
    legs.A.hp.rotation.set(0, 0, D(P.hipA)); legs.A.kn.rotation.set(0, 0, -D(P.knA));
    legs.B.hp.rotation.set(0, 0, D(P.hipB)); legs.B.kn.rotation.set(0, 0, -D(P.knB));
    return root;
  };
  // arms only (keeps legs/spine from the current pose): used to hold props while walking
  root.setArms = (p) => {
    const P = typeof p === 'string' ? POSE[p] || POSE.stand : { ...Z, ...p };
    arms.A.sh.rotation.set(-D(P.shA[1]), 0, D(P.shA[0])); arms.A.el.rotation.set(0, 0, D(P.elA));
    arms.B.sh.rotation.set(D(P.shB[1]), 0, D(P.shB[0])); arms.B.el.rotation.set(0, 0, D(P.elB));
    return root;
  };
  let curExpr = null;
  root.setExpr = (name) => { if (name === curExpr) return root; curExpr = name; faceM.map = faceTexture(name, outfit.glasses, outfit.bigEyes, faceFg); faceM.needsUpdate = true; return root; };
  // expression with automatic blinking (period differs per character)
  root.act = (t, expr, period = 3.3) => root.setExpr((t % period) > period - 0.13 && !['sleepy', 'calm', 'happy', 'joy'].includes(expr) ? 'blink' : expr);
  root.setPose(o.pose || 'stand'); root.setExpr(o.expr || 'neutral');
  return root;
}
