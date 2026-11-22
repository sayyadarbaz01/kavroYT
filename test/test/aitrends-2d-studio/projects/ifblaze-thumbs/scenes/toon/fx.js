// toon/fx.js — 2D overlays for 3D shots: project world points to the screen, teleport bursts, glows, UI labels.
import * as THREE from 'three';
import { E, V, S, ease, prog, clamp, lerp, rng, circle, glow, alpha, linGrad, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const POWER = { core: '#6fe6ff', edge: '#b48cff', hot: '#ffffff' };
const _v = new THREE.Vector3();
// world [x,y,z] -> screen [x, y, pixelsPerMetre]
export function screen(camera, p) {
  _v.set(p[0], p[1], p[2]).project(camera); const x = (_v.x + 1) / 2 * E.W, y = (1 - _v.y) / 2 * E.H;
  const d = camera.position.distanceTo(new THREE.Vector3(...p)), ppm = E.H / (2 * Math.tan((camera.fov * Math.PI) / 360) * d);
  return [x, y, ppm];
}
// teleport burst around a body column (feet at screen x,y; height h px). mode 'out' | 'in'; returns body visibility 0..1
export function teleport(g, t, x, y, h, mode, at = 0.5, seed = 1) {
  const k = (t - at) / 0.9; let vis = mode === 'out' ? 1 - prog(t, at, at + 0.25) : prog(t, at, at + 0.2);
  if (k > -0.8 && k < 1.3) {
    const r = rng(seed); g.save(); g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 90; i++) {
      const px = x + (r() - 0.5) * h * 0.35, py = y - r() * h, a = r() * 6.28, d = (0.15 + r() * 0.9) * h, up = (0.2 + r() * 0.8) * h;
      const u = mode === 'out' ? clamp(k) : clamp(-k / 0.8); if (mode === 'out' && u <= 0) continue;
      const qx = px + Math.cos(a) * d * ease.out(u), qy = py + Math.sin(a) * d * 0.4 * ease.out(u) - up * u;
      const al = (mode === 'out' ? 1 - u : (k < 0 ? 1 - u : 1 - clamp(k * 2))) * 0.95; if (al <= 0) continue;
      circle(g, qx, qy, h * (0.006 + r() * 0.012), alpha(i % 3 ? POWER.core : POWER.edge, al)); if (i % 5 === 0) glow(g, qx, qy, h * 0.06, POWER.core, al * 0.6);
    }
    const fl = 1 - clamp(Math.abs(t - at) / 0.35);
    if (fl > 0) { g.fillStyle = linGrad(g, x - h * 0.2, 0, x + h * 0.2, 0, [alpha(POWER.core, 0), alpha(POWER.hot, 0.7 * fl), alpha(POWER.core, 0)]); g.fillRect(x - h * 0.2, y - h * 2.5, h * 0.4, h * 2.6); glow(g, x, y - h / 2, h * 1.2, POWER.core, 0.8 * fl); }
    g.restore();
    if (Math.abs(t - at) < 1.1) FX.rings(g, x, y - h / 2, t - at, { count: 2, r0: h * 0.1, r1: h * 1.1, speed: 1.2, color: POWER.core, a: 0.55 * (1 - clamp(Math.abs(t - at) / 1.1)) });
  }
  return clamp(vis);
}
// charging aura: swirling particles around a point (power building up)
export function aura(g, t, x, y, r, amt = 1) {
  if (amt <= 0) return; g.save(); g.globalCompositeOperation = 'lighter'; const R = rng(5);
  for (let i = 0; i < 50; i++) { const a = R() * 6.28 + t * (1 + R() * 2), d = r * (0.8 + R() * 0.7) * (1 - 0.3 * amt * ((t * 0.7 + R()) % 1)); circle(g, x + Math.cos(a) * d, y + Math.sin(a) * d * 0.8, r * 0.02 * (1 + R()), alpha(i % 2 ? POWER.core : POWER.edge, 0.8 * amt)); }
  glow(g, x, y, r * 1.6, POWER.core, 0.22 * amt); g.restore();
}
// reference-style white label (e.g. a time or year) top-left, pops in
export function label(g, t, str, o = {}) {
  const { x = V(110, 80), y = V(110, 150), size = V(64, 70), at = 0.2, dur = 99, color = '#ffffff', align = 'left' } = o;
  const a = ease.out(prog(t, at, at + 0.25)) * clamp((dur - t) / 0.25); if (a <= 0) return;
  const s = 0.85 + 0.15 * ease.outBack(prog(t, at, at + 0.35)); g.save(); g.translate(x, y); g.scale(s, s);
  text(g, str, 0, 0, { size, color, font: FONTS.ui, weight: 900, align, alpha: a, stroke: size * 0.12, strokeColor: 'rgba(0,0,0,.35)' }); g.restore();
}
export function flash(g, t, at, dur = 0.35, color = '#ffffff') { const k = 1 - clamp(Math.abs(t - at) / dur); if (k > 0) { g.save(); g.globalAlpha = k * k; g.fillStyle = color; g.fillRect(0, 0, E.W, E.H); g.restore(); } }
