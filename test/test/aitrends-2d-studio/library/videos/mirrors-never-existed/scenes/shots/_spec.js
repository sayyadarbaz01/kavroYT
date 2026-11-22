// shots/_spec.js — data-driven shots for "See Everyone's Rank". One call per shot:
//   S(id, { set: ['diningHall', {cafe:true}] | (st, s) => {...}, mood,
//           cast: { me: [ME, x, z, rotY, 'sitDesk', 'neutral'], dev: [DEV, ...] },
//           poses: { me: [[t, 'pose'|{...}], ...] }, exprs: { me: [[t, 'expr'], ...] },
//           walk: { me: [x0, z0, x1, z1, t0, t1, speed] }                  straight walk
//               | { me: { path: [[x,z], [x,z], ...], t0, t1, spd, face, enter } }   walk along waypoints (go AROUND furniture); enter: hidden until t0
//           carry: [{ prop: (st) => obj, by: 'c' | [[t, 'c'], [t2, 'f']], arms: 'holdFront' | {...}, both: true, dy: 0, from, to }]
//                  the prop is placed at the holder's hand(s) every frame, and the holder's arms are locked in `arms`
//                  (also while walking, so legs walk and arms carry). Never place a held prop by coordinates.
//           cam: { f: 'me', d: 2.2, h: 1.45, side: 0.3, lh: 1.35, push: 0.12, pan: 0, a }   frontal on a figure
//              | { two: ['me', 'dev'], d, h, side, lh, push, a }                         frontal two-shot
//              | { p: [x,y,z], l: [x,y,z], p2, l2 }                                      explicit dolly
//           cams: [[t, camSpec], ...]                                                    cuts inside the shot
//           tags: [['dev', 2201456088 | (t) => n, 'mid', at, {opts}]], caps: [['TEXT', at, {opts}]],
//           b(st, s), u(s, t, i, T), o(g, t, i, s) })
// Glitch checks run on every rendered frame and are collected in window.GLITCHES (render.mjs --check prints them):
//   collide   a standing/walking figure's feet are inside furniture (table, bench, chair, bed, counter...)
//   edge      more than 15% of a head is outside the frame (heads cut by the frame look broken)
//   overlap   two heads cover each other on screen
//   tooclose  a head fills more than 60% of the frame height, or a figure the camera is NOT framing is big in the foreground
//   caption   a caption still covers a face after automatic re-placement
//   float     a seated figure has no seat (chair, bench, bed, bus seat) under the hips
//   hidden    a cast member's face is blocked by furniture or a prop between it and the camera (lamp, shelf, door frame)
// Walking figures are allowed to cross the frame edge and pass behind each other (entrances/exits).
import * as THREE from 'three';
import { walkPose } from '../toon/toon.js';
import { SETS } from '../toon/sets3d.js';
import { CAMPUS } from '../toon/sets_campus.js';
import { MIRROR } from '../toon/sets_mirror.js';
import { fig, shot, pose, expr, E, ease, clamp, lerp, handPos } from './_lib.js';
import { rankTag, caption, ASLEEP, setFaces } from './_rank.js';

const ALL = { ...SETS, ...CAMPUS, ...MIRROR };
const INDOOR = ['bedroom', 'classroom', 'hallway', 'kitchen', 'gym', 'dormHall', 'diningHall', 'library', 'busInside', 'lab', 'hospital', 'bathroom', 'versailles', 'barber', 'store', 'dentist', 'studio', 'restaurant', 'tiny', 'garage'];
const dir = (r) => [Math.cos(r), -Math.sin(r)];
const GL = (window.GLITCHES = window.GLITCHES || []);
const glitch = (id, i, t, kind, msg) => { if (GL.length < 5000) GL.push({ id, t: +(i.globalT ?? t).toFixed(2), lt: +t.toFixed(2), kind, msg }); };
const HEAD_R = 0.25;                                     // toon head radius (world m)
const _v = new THREE.Vector3(), _u = new THREE.Vector3(), _b = new THREE.Box3(), _sz = new THREE.Vector3(), _ray = new THREE.Raycaster(), _d = new THREE.Vector3();
// solid meshes that can hide a face (not figures, not glass, not glow sprites, not floor/walls behind the camera's subject)
const blockers = (s) => { if (s._blk) return s._blk; const figs = new Set(); [...Object.values(s.F), ...(s.studs || [])].forEach((f) => f.traverse((m) => figs.add(m)));
  const out = []; s.stage.scene.traverse((m) => { if (!m.isMesh || figs.has(m) || (m.material && (m.material.transparent || m.material.blending === THREE.AdditiveBlending))) return;
    _b.setFromObject(m); _b.getSize(_sz); if ([_sz.x, _sz.y, _sz.z].filter((v) => v < 0.08).length >= 2) return;   // sticks, pens, poles: too thin to hide a face
    out.push(m); }); return (s._blk = out); };
// fraction of 5 rays (centre + 4 around the face) from the camera to the head that hit something solid first
function blocked(s, cam, f, head) { const objs = blockers(s), right = new THREE.Vector3(1, 0, 0).applyQuaternion(cam.quaternion), up = new THREE.Vector3(0, 1, 0).applyQuaternion(cam.quaternion); let n = 0, what = '';
  for (const [a, b] of [[0, 0], [0.6, 0], [-0.6, 0], [0, 0.6], [0, -0.5]]) { const tgt = head.clone().addScaledVector(right, a * HEAD_R).addScaledVector(up, b * HEAD_R); _d.copy(tgt).sub(cam.position); const L = _d.length(); _ray.set(cam.position, _d.normalize()); _ray.far = L - 0.05;
    const hit = _ray.intersectObjects(objs, false).find((h) => h.object.visible && (() => { let p = h.object; while (p) { if (!p.visible) return false; p = p.parent; } return true; })()); if (hit) { n++; if (!what) { _b.setFromObject(hit.object); _b.getSize(_sz); what = `${_sz.x.toFixed(2)}x${_sz.y.toFixed(2)}x${_sz.z.toFixed(2)} m near (${hit.point.x.toFixed(1)}, ${hit.point.y.toFixed(1)}, ${hit.point.z.toFixed(1)})`; } } }
  return { frac: n / 5, what }; }

function frontal(F, c, t, dur) {
  const ks = c.two || [c.f], fs = ks.map((k) => F[k]); const mx = fs.reduce((a, f) => a + f.position.x, 0) / fs.length, mz = fs.reduce((a, f) => a + f.position.z, 0) / fs.length;
  let r = c.a; if (r == null) { if (fs.length > 1) { const v = [Math.cos(fs[0].rotation.y) + Math.cos(fs[1].rotation.y), -Math.sin(fs[0].rotation.y) - Math.sin(fs[1].rotation.y)]; r = Math.atan2(-v[1], v[0]); } else r = fs[0].rotation.y; }
  r += (c.pan || 0) * (t / dur); const [dx, dz] = dir(r), k = ease.inOut(clamp(t / dur)), d = (c.d ?? 2.2) * (1 - (c.push ?? 0.1) * k), side = c.side ?? 0.3;
  const lx = mx + (c.lx || 0), lz = mz + (c.lz || 0);
  return { pos: [lx + dx * d + dz * side, c.h ?? 1.45, lz + dz * d - dx * side], look: [lx, c.lh ?? 1.3, lz] };
}
// position on a waypoint path at progress q (0..1), plus heading
function onPath(pts, q) {
  const seg = []; let L = 0; for (let k = 1; k < pts.length; k++) { const l = Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); seg.push(l); L += l; }
  let d = q * L; for (let k = 0; k < seg.length; k++) { if (d <= seg[k] || k === seg.length - 1) { const a = pts[k], b = pts[k + 1], u = seg[k] ? Math.min(1, d / seg[k]) : 1; return { x: lerp(a[0], b[0], u), z: lerp(a[1], b[1], u), r: Math.atan2(-(b[1] - a[1]), b[0] - a[0]) }; } d -= seg[k]; }
  const e = pts[pts.length - 1]; return { x: e[0], z: e[1], r: 0 };
}
const holderAt = (by, t) => { if (typeof by === 'string') return by; let k = by[0][1]; for (const [at, w] of by) if (t >= at) k = w; return k; };
// furniture boxes (world AABB) for the collision check: mid-height solid things with a real footprint
function obstacles(scene, skip) {
  const out = []; scene.updateMatrixWorld(true);
  scene.traverse((m) => {
    if (!m.isMesh || skip.has(m) || m.userData.noCollide) return; let p = m.parent; while (p) { if (skip.has(p) || p.userData.noCollide) return; p = p.parent; }
    _b.setFromObject(m); _b.getSize(_sz);
    if (_sz.x < 0.15 || _sz.z < 0.15 || _sz.x > 12 || _sz.z > 12 || _b.min.y > 0.9 || _b.max.y < 0.3) return;
    out.push({ x0: _b.min.x, x1: _b.max.x, z0: _b.min.z, z1: _b.max.z, top: _b.max.y, w: +_sz.x.toFixed(2), d: +_sz.z.toFixed(2) });
  });
  return out;
}

export function S(id, sp) {
  const name = typeof sp.set === 'function' ? null : (Array.isArray(sp.set) ? sp.set[0] : sp.set);
  const mood = sp.mood || (name && INDOOR.includes(name) ? 'indoor' : 'sunny');
  shot(id, (st, s, T) => {
    if (typeof sp.set === 'function') sp.set(st, s); else s.anchors = ALL[name](st, (Array.isArray(sp.set) && sp.set[1]) || {});
    s.F = {}; for (const [k, v] of Object.entries(sp.cast || {})) { const [of, x, z, r = 0, p = 'stand', e = 'neutral'] = v; const f = fig(st, of, x, z, r, typeof p === 'string' ? p : 'stand', e);
      f.userData.hy = typeof p === 'string' && p.startsWith('sit') ? 1.12 : 1.47; s.F[k] = f; }
    s.carry = (sp.carry || []).map((c) => { const o = c.prop(st, s); if (!o.parent) st.add(o); o.userData.noCollide = true; return { ...c, o }; });
    if (sp.b) sp.b(st, s, T);
    const skip = new Set([...Object.values(s.F), ...s.carry.map((c) => c.o)]); Object.values(s).forEach((v) => { if (v && v.isObject3D && v !== s.stage) skip.add(v); });   // props stored on s are moving props, not furniture
    (s.studs || []).forEach((f) => skip.add(f)); if (s.me) skip.add(s.me); if (s.r412) skip.add(s.r412);
    s.obst = obstacles(s.stage.scene, skip);
  }, (s, t, i, T) => {
    for (const [k, f] of Object.entries(s.F)) {
      const w = sp.walk?.[k]; f.userData.walking = false;
      if (w) {
        if (Array.isArray(w)) { const [x0, z0, x1, z1, t0 = 0, t1 = i.dur, spd = 5.2] = w, q = clamp((t - t0) / (t1 - t0)); f.position.x = lerp(x0, x1, q); f.position.z = lerp(z0, z1, q);
          if (t >= t0 && q < 1) { f.rotation.y = Math.atan2(-(z1 - z0), x1 - x0); f.setPose(walkPose(t * spd)); f.userData.walking = true; } }
        else { const { path, t0 = 0, t1 = i.dur, spd = 5.2, face, enter } = w, q = clamp((t - t0) / (t1 - t0)), p = onPath(path, q); f.position.x = p.x; f.position.z = p.z; if (enter) f.visible = t >= t0;   // enter: not in the scene until the walk starts
          if (t >= t0 && q < 1) { f.rotation.y = p.r; f.setPose(walkPose(t * spd)); f.userData.walking = true; } else if (q >= 1 && face != null) f.rotation.y = face; }
        if (f.userData.walking) { expr(f, t, sp.exprs?.[k] || [[0, 'neutral']]); continue; }
      }
      const pk = sp.poses?.[k] || [[0, f.userData.basePose || (sp.cast[k][4] || 'stand')]];
      if (pk === 'asleep') { f.setPose(ASLEEP); f.userData.hy = 0.88; } else pose(f, t + (k.length % 3) * 0.4, pk);
      expr(f, t, sp.exprs?.[k] || [[0, sp.cast[k][5] || 'neutral']]);
    }
    if (s.stage.scroll) s.stage.scroll(t);
    if (sp.u) sp.u(s, t, i, T);
    // carried props: lock the holder's arms, then snap the prop to the hand(s)
    for (const c of s.carry) {
      const on = t >= (c.from ?? -1) && t < (c.to ?? 1e9); c.o.visible = on || c.keep !== false; if (!on) continue;
      const hk = holderAt(c.by, t), f = s.F[hk]; if (!f) continue; const arms = c.arms && typeof c.arms === 'object' && !('shA' in c.arms || 'elA' in c.arms || 'shB' in c.arms) ? c.arms[hk] : c.arms; f.setArms(arms || 'holdFront');
      const a = handPos(f, 'A'), b = c.both === false ? a : handPos(f, 'B');
      c.o.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + (typeof c.dy === 'function' ? c.dy(t) : c.dy || 0), (a[2] + b[2]) / 2); const fv = (v) => (typeof v === 'function' ? v(t) : v || 0); c.o.rotation.set(fv(c.rx), f.rotation.y + fv(c.ry), fv(c.rz));
    }
    let c = sp.cam, tt = t, dd = i.dur;
    if (sp.cams) { let j = 0; sp.cams.forEach(([at], k) => { if (t >= at) j = k; }); c = sp.cams[j][1]; tt = t - sp.cams[j][0]; dd = (sp.cams[j + 1]?.[0] ?? i.dur) - sp.cams[j][0]; }
    s._camF = c && (c.two || (c.f ? [c.f] : null) || c.subj) || [];   // explicit cams name their close-up subject with subj: ['k']
    if (c) {
      if (c.p) { const k = ease.inOut(clamp(tt / dd)), p2 = c.p2 || c.p, l2 = c.l2 || c.l; s.stage.camera.position.set(...c.p.map((v, j) => lerp(v, p2[j], k))); s.stage.camera.lookAt(...c.l.map((v, j) => lerp(v, l2[j], k))); }
      else { const v = frontal(s.F, c, tt, dd); s.stage.camera.position.set(...v.pos); s.stage.camera.lookAt(...v.look); }
    }
    // collision check: feet of standing/walking figures must not be inside furniture
    for (const [k, f] of Object.entries(s.F)) {
      if (!f.visible || f.userData.noSnap) continue; const seated = f.parts.legs.A.hp.rotation.z > 1.35;
      if (seated) { f.parts.hips.getWorldPosition(_v); const hx = _v.x, hz = _v.z, hy = _v.y, m = 0.18;
        if (!s.obst.some((o) => hx > o.x0 - m && hx < o.x1 + m && hz > o.z0 - m && hz < o.z1 + m && o.top > hy - 0.12 && o.top < hy + 0.18)) glitch(id, i, t, 'float', `'${k}' sits on nothing at (${hx.toFixed(2)}, ${hz.toFixed(2)}), hips ${hy.toFixed(2)} m up`); continue; }
      const x = f.position.x, z = f.position.z, m = 0.1;
      for (const o of s.obst) if (x > o.x0 - m && x < o.x1 + m && z > o.z0 - m && z < o.z1 + m) { glitch(id, i, t, 'collide', `'${k}' at (${x.toFixed(2)}, ${z.toFixed(2)}) inside furniture ${o.w}x${o.d} m at x ${o.x0.toFixed(1)}..${o.x1.toFixed(1)}, z ${o.z0.toFixed(1)}..${o.z1.toFixed(1)}`); break; }
    }
  }, (g, t, i, s) => {
    // screen-space heads of every visible figure (cast + extra lecture-hall figures)
    const cam = s.stage.camera; cam.updateMatrixWorld(); const faces = [];
    const all = [...Object.entries(s.F), ...(s.studs || []).map((f, n) => ['student' + n, f])];
    for (const [k, f] of all) {
      if (!f.visible) continue; f.parts.head.getWorldPosition(_v); _u.copy(_v).applyMatrix4(cam.matrixWorldInverse); if (_u.z > -0.05) continue;   // behind the camera
      _u.copy(_v).project(cam); const cx = (_u.x + 1) / 2 * E.W, cy = (1 - _u.y) / 2 * E.H;
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(cam.quaternion).multiplyScalar(HEAD_R).add(_v).project(cam); const r = Math.hypot(((up.x + 1) / 2 * E.W) - cx, ((1 - up.y) / 2 * E.H) - cy);
      if (cx + r < 0 || cx - r > E.W || cy + r < 0 || cy - r > E.H) continue; faces.push({ k, cx, cy, r, cast: !k.startsWith('student'), walk: !!f.userData.walking, head: _v.clone(), f });
    }
    for (const h of faces) {
      if (h.r > E.H * 0.6 || (h.r > E.H * 0.33 && !s._camF.includes(h.k))) { glitch(id, i, t, 'tooclose', `'${h.k}' head fills the frame (in front of the lens)`); continue; }   // big heads only for the figure the camera is framing
      if (h.r > E.H * 0.42) continue;                                                     // deliberate extreme close-up
      const out = Math.max(h.walk ? 0 : -(h.cx - h.r), h.walk ? 0 : h.cx + h.r - E.W, -(h.cy - h.r), h.cy + h.r - E.H) / (2 * h.r);
      if (out > 0.15) glitch(id, i, t, 'edge', `'${h.k}' head ${Math.round(out * 100)}% outside the frame`);
    }
    for (const h of faces) { if (!h.cast || h.walk || h.r < E.H * 0.03 || h.r > E.H * 0.42) continue;
      const fy = h.f.rotation.y, tc = [cam.position.x - h.head.x, cam.position.z - h.head.z]; if (Math.cos(fy) * tc[0] - Math.sin(fy) * tc[1] <= 0) continue;   // facing away: no face to hide
      const bl = blocked(s, cam, h.f, h.head); if (bl.frac >= 0.2) glitch(id, i, t, 'hidden', `'${h.k}' face blocked by ${bl.what}`); }
    for (let a = 0; a < faces.length; a++) for (let b = a + 1; b < faces.length; b++) { const A = faces[a], B = faces[b], d = Math.hypot(A.cx - B.cx, A.cy - B.cy);
      if ((A.cast || B.cast) && !A.walk && !B.walk && d < Math.min(A.r, B.r) * 1.1) glitch(id, i, t, 'overlap', `heads of '${A.k}' and '${B.k}' cover each other`); }
    setFaces(faces, (str) => glitch(id, i, t, 'caption', `caption "${str}" covers a face`));
    for (const [k, n, col = 'mid', at = 0.2, o = {}] of sp.tags || []) { const f = s.F[k]; if (!f || !f.visible) continue; rankTag(g, t, s, f, typeof n === 'function' ? n(t) : n, { at, col, hy: f.userData.hy, k: 0.1, max: 84, ...o }); }
    for (const [str, at = 0.2, o = {}] of sp.caps || []) caption(g, t, str, { at, ...o });
    if (sp.o) sp.o(g, t, i, s);
    setFaces(null);
  }, { mood, fov: sp.fov });
}
