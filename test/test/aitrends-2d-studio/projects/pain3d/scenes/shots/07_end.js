// shots/07_end.js — 4:56–6:35: out of the fire, Jay saves Leo, the real condition (CIP), Project I-F, end card.
import { ME, JAY, fig, shot, face, pose, expr, cam, push, C, lie, scr, headOf, handPos, shout, impact, vignette, smoke, snow, held, bandFlash, POSE, THREE, E, V, ease, prog, clamp, lerp, SETS, box, cyl } from './_lib.js';
import { flame, flick, van } from '../toon/sets3d.js';
import { walkPose } from '../toon/toon.js';
import { MOM, GIRL, AGENT } from '../toon/cast3d.js';
import { label } from '../toon/fx.js';
import { glow as glow2 } from '/engine/core.js';
import { card, title, stamp, check, cross, person, helix, tongue, bone, goggles, heart, shield, snowflake, flameIcon, phoneIcon, U, text, FONTS, rr, circle, ring, alpha } from './_info.js';

// ---------- outside again (fireStreet; Leo lies on the lawn at x=0.4, z=0.4, head toward -x) ----------
function street(st, s) { s.c = SETS.fireStreet(st); s.me = fig(st, ME, 0, -1.6, -Math.PI / 2); s.jay = fig(st, JAY, 3.2, 2.8, Math.PI); s.girl = fig(st, GIRL, 0, 0, 0, 'sit', 'scared'); s.bl = cyl(0.3, 0.36, 0.75, '#3a7ad8', 0, 0, 0, { outline: 0.008 }); st.add(s.bl); s.mom = fig(st, MOM, 1.9, 1.7, Math.PI * 0.85); }
const fl = (s, t) => flick(s.c.flames, t);
const carry = (s) => { s.me.setPose({ ...POSE.carry, shB: [30, 4], elB: 80 }); const h = handPos(s.me); s.girl.position.set(h[0], h[1] - 0.55, h[2]); s.girl.rotation.y = s.me.rotation.y; s.bl.position.set(h[0], h[1] - 0.17, h[2]); s.bl.scale.setScalar(0.95); };
const down = (s) => { s.me.position.set(0.4, 0, 0.4); s.me.rotation.y = 0; s.me.setPose('sleep'); lie(s.me, 1); s.girl.visible = s.bl.visible = false; };
function ext() { const g = new THREE.Group(); g.add(cyl(0.09, 0.09, 0.45, '#d8302c', 0, 0, 0, { outline: 0.006 })); g.add(cyl(0.02, 0.02, 0.12, '#1a1a20', 0.05, 0.27, 0, { rot: [0, 0, -0.8] })); return g; }

shot('h01', (st, s) => street(st, s),
  (s, t, i, T) => { fl(s, t); const k = ease.out(prog(t, 0.1, 2.6)); s.me.position.set(lerp(0, 0.9, k), 0, lerp(-1.6, 0.9, k)); s.me.rotation.y = -Math.PI / 2 + 0.35 * k; carry(s); if (t < 2.6) { const w = walkPose(t * 6.28 * 1.2, true); s.me.setPose({ ...w, shA: POSE.carry.shA, elA: POSE.carry.elA, shB: [30, 4], elB: 80 }); }
    expr(s.me, t, [[0, 'determined']]); expr(s.girl, t, [[0, 'scared']]); s.jay.visible = false; s.mom.visible = false; cam(T, s, t, i, C([3.6, 1.5, 5.6], [0.3, 1.4, -1.0]), C([3.2, 1.4, 5.0], [0.6, 1.2, 0])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, [0, 1.2, -1.9]); smoke(g, t, x, y, ppm * 1.4, 1.2); impact(g, t, x, y, ppm * 1.0, 0.2, '#ffb070'); snow(g, t, 120, 0.7); label(g, t, 'ICY NIGHT AIR', { at: 0.9, color: '#bfe8ff' }); });

shot('h02', (st, s) => street(st, s),
  (s, t, i, T) => { fl(s, t); s.me.position.set(0.9, 0, 0.9); s.me.rotation.y = -Math.PI / 2 + 0.75; s.jay.visible = false; const hand = 0.8; s.mom.position.set(1.7, 0, 1.6);
    if (t < hand) carry(s); else { pose(s.me, t, [[hand, POSE.carry], [hand + 0.3, { spine: [12, 0], shA: [20, 10], shB: [20, 10] }]]); s.mom.setPose(POSE.carry); const h = handPos(s.mom); s.girl.position.set(h[0], h[1] - 0.55, h[2]); s.girl.rotation.y = s.mom.rotation.y; s.bl.position.set(h[0], h[1] - 0.17, h[2]); }
    if (t < hand) pose(s.mom, t, [[0, 'holdFront']]); expr(s.mom, t, [[0, 'scared'], [hand, 'happy']]); expr(s.me, t, [[0, 'neutral'], [hand + 0.3, 'sleepy']]); expr(s.girl, t, [[0, 'scared'], [hand + 0.2, 'smile']]);
    cam(T, s, t, i, C([1.2, 1.5, 4.0], [1.3, 1.1, 1.2]), C([1.1, 1.45, 3.6], [1.3, 1.1, 1.2])); },
  (g, t) => snow(g, t, 90, 0.6));

shot('h03', (st, s) => street(st, s),
  (s, t, i, T) => { fl(s, t); s.jay.visible = false; s.girl.visible = s.bl.visible = false; s.mom.visible = false; const f0 = 0.9, k = ease.in(prog(t, f0, f0 + 0.5)); s.me.position.set(0.4, 0, 0.4); s.me.rotation.y = 0;
    pose(s.me, t, [[0, { spine: [14, 0], knA: 20, knB: 20, drop: 0.04 }], [f0, 'fall'], [f0 + 0.6, 'sleep']]); lie(s.me, k); expr(s.me, t, [[0, 'sleepy']]);
    cam(T, s, t, i, C([2.6, 1.0, 2.8], [0, 0.6, 0.4]), C([2.2, 0.7, 2.3], [-0.2, 0.3, 0.4])); },
  (g, t) => { snow(g, t, 100, 0.6); label(g, t, 'FREEZING GRASS', { at: 1.6, color: '#bfe8ff' }); });

shot('h04', (st, s) => { street(st, s); s.ex = ext(); st.add(s.ex); },
  (s, t, i, T) => { fl(s, t); down(s); s.mom.visible = false; const k = ease.inOut(prog(t, 0, 2.2)); s.jay.position.set(lerp(3.6, 1.6, k), 0, lerp(3.0, 0.9, k)); s.jay.rotation.y = Math.PI + 0.4; s.jay.setPose(t < 2.2 ? { ...walkPose(t * 6.28 * 1.5, true), shA: [40, 10], elA: 60 } : POSE.holdFront); held(s.ex, s.jay, 'A', -0.05); expr(s.jay, t, [[0, 'scared']]);
    cam(T, s, t, i, C([3.0, 1.6, 4.6], [1.0, 0.7, 0.6]), C([2.6, 1.4, 4.0], [1.0, 0.6, 0.6])); },
  (g, t) => { snow(g, t, 90, 0.6); label(g, t, 'FIRE EXTINGUISHER', { at: 0.6, color: '#ff8a7a' }); });

shot('h05', (st, s) => { street(st, s); s.ex = ext(); st.add(s.ex); },
  (s, t, i, T) => { fl(s, t); down(s); s.mom.visible = false; s.jay.position.set(1.5, 0, 0.9); s.jay.rotation.y = Math.PI + 0.4; pose(s.jay, t, [[0, { shA: [70, 10], elA: 20, shB: [50, 10], elB: 60, spine: [10, 0] }]]); held(s.ex, s.jay, 'A', -0.05); expr(s.jay, t, [[0, 'determined']]);
    cam(T, s, t, i, C([1.2, 1.5, 3.0], [0.6, 0.4, 0.5]), C([1.0, 1.4, 2.6], [0.4, 0.3, 0.5])); },
  (g, t, i, s) => { const [x0, y0] = scr(s, s.ex.position.toArray()), [x1, y1, ppm] = scr(s, [0.3, 0.2, 0.4]); g.save(); for (let k = 0; k < 60; k++) { const ph = (t * 2.2 + k / 60) % 1, sp = Math.sin(k * 7.1) * ppm * 0.25 * ph; circle(g, lerp(x0, x1, ph) + sp, lerp(y0, y1, ph) + Math.cos(k * 3.3) * ppm * 0.15 * ph, ppm * (0.03 + 0.07 * ph), alpha('#ffffff', 0.85 * (1 - ph * 0.5))); } g.restore(); snow(g, t, 60, 0.5); });

shot('h06', (st, s) => street(st, s),
  (s, t, i, T) => { fl(s, t); down(s); s.mom.visible = false; s.jay.position.set(-0.2, 0, 1.0); s.jay.rotation.y = Math.PI / 2; pose(s.jay, t, [[0, { ...POSE.kneel, shA: [70, 10], elA: 40 }]]); expr(s.jay, t, [[0, 'worried']]);
    cam(T, s, t, i, C([0.6, 1.0, 2.2], [-0.6, 0.4, 0.5]), C([0.4, 0.9, 1.8], [-0.7, 0.35, 0.5])); },
  (g, t) => { label(g, t, 'PULSE', { at: 0.3, color: '#ff8a7a' }); const u = U(); for (let k = 0; k < 3; k++) { const ph = (t * 3.2 + k / 3) % 1; ring(g, E.W * 0.8, E.H * 0.3, 40 * u + ph * 90 * u, 5 * u, alpha('#ff5a6a', 1 - ph)); } });

shot('h07', (st, s) => street(st, s),
  (s, t, i, T) => { fl(s, t); down(s); s.mom.visible = false; s.jay.position.set(-0.2, 0, 1.0); s.jay.rotation.y = Math.PI / 2 + 0.2; pose(s.jay, t, [[0, { ...POSE.kneel, shA: [70, 30], elA: 40, shB: [70, 30], elB: 40 }]]); expr(s.jay, t, [[0, 'scared']]);
    const f = { pos: [-0.35, 1.15, 0.0], look: [-0.2, 1.05, 1.0] }; cam(T, s, t, i, f, push(f, 0.12)); },
  (g, t) => { shout(g, t, 'LEO!', { at: 0.02, y: E.H * 0.16 }); shout(g, t, 'STAY AWAKE!', { at: 0.55, y: E.H * 0.84, size: V(96, 84), dur: 1.45 }); shout(g, t, 'LOOK AT ME!', { at: 1.5, y: E.H * 0.84, size: V(96, 84) }); });

shot('h08', (st, s) => street(st, s),
  (s, t, i, T) => { fl(s, t); down(s); s.mom.visible = false; s.jay.visible = false; expr(s.me, t, [[0, 'sleepy'], [0.5, 'sad']]); const hd = [0.4 - 1.47, 0.25, 0.4]; cam(T, s, t, i, C([hd[0] + 0.15, 1.15, hd[2] + 0.1], hd), C([hd[0] + 0.12, 1.0, hd[2] + 0.08], hd)); },
  (g, t) => { vignette(g, '#000', 0.5); snow(g, t, 60, 0.5); shout(g, t, 'I DO NOT FEEL ANYTHING...', { at: 0.3, y: E.H * 0.85, size: V(72, 60), shake: 0 }); });

shot('h09', (st, s) => street(st, s),
  (s, t, i, T) => { fl(s, t); down(s); s.mom.visible = false; s.jay.position.set(-0.2, 0, 1.0); s.jay.rotation.y = Math.PI / 2 + 0.2; pose(s.jay, t, [[0, { ...POSE.kneel, shA: [70, 30], elA: 40, shB: [70, 30], elB: 40 }], [1.3, { ...POSE.kneel, shA: [20, 120], elA: 60 }]]); expr(s.jay, t, [[0, 'angry'], [1.3, 'scared']]);
    const f = { pos: [-0.4, 1.15, 0.05], look: [-0.2, 1.05, 1.0] }; cam(T, s, t, i, f, push(f, 0.1)); },
  (g, t) => { shout(g, t, 'THAT IS THE PROBLEM!', { at: 0.02, y: E.H * 0.16, size: V(90, 78) }); shout(g, t, 'YOU ARE BURNING UP!', { at: 1.4, y: E.H * 0.84, size: V(96, 84) }); });

shot('h10', (st, s) => { street(st, s); s.gold = box(1.5, 0.12, 0.6, '#f2c84a', -0.3, 0.2, 0.4, { outline: 0.008 }); st.add(s.gold); s.bk = cyl(0.13, 0.11, 0.24, '#3a7ad8', 0, 0, 0, { outline: 0.005 }); st.add(s.bk); },
  (s, t, i, T) => { fl(s, t); down(s); s.mom.visible = false; s.gold.scale.set(ease.out(prog(t, 0.2, 1.4)) + 0.01, 1, 1); s.gold.position.x = 0.4 - 0.75 * s.gold.scale.x; s.jay.position.set(-0.4, 0, 1.0); s.jay.rotation.y = Math.PI / 2;
    pose(s.jay, t, [[0, { ...POSE.kneel, shA: [70, 10], elA: 30, shB: [70, 10], elB: 30 }], [2.0, { ...POSE.stand, shA: [100, 10], elA: 20, spine: [14, 0] }]], 0.4); held(s.bk, s.jay, 'A', -0.08); s.bk.visible = t > 1.8; s.bk.rotation.x = t > 2.2 ? 1.6 : 0; expr(s.jay, t, [[0, 'determined']]);
    cam(T, s, t, i, C([1.6, 1.8, 2.8], [-0.4, 0.5, 0.5]), C([1.4, 1.6, 2.4], [-0.4, 0.5, 0.5])); },
  (g, t, i, s) => { label(g, t, 'EMERGENCY BLANKETS', { at: 0.4, color: '#ffd23a' }); if (t > 2.2) { const [x, y, ppm] = scr(s, s.bk.position.toArray()); for (let k = 0; k < 40; k++) { const ph = (t * 1.8 + k / 40) % 1; circle(g, x + Math.sin(k * 5.3) * ppm * 0.15, y + ph * ppm * 0.8, ppm * 0.025, alpha('#9fd8ff', 0.9 * (1 - ph))); } label(g, t, '+ ICE WATER', { at: 2.3, y: V(190, 230), size: V(48, 52), color: '#9fd8ff' }); } });

shot('h11', (st, s) => { street(st, s); s.gold = box(1.5, 0.12, 0.6, '#f2c84a', -0.35, 0.2, 0.4, { outline: 0.008 }); st.add(s.gold); },
  (s, t, i, T) => { fl(s, t); down(s); s.mom.visible = false; s.jay.position.set(-0.3, 0, 1.2); s.jay.rotation.y = Math.PI / 2; pose(s.jay, t, [[0, 'kneel'], [2.0, { ...POSE.kneel, spine: [20, 0], head: [0, -15] }]]); expr(s.jay, t, [[0, 'worried'], [1.0, 'calm']]); expr(s.me, t, [[0, 'sleepy'], [2.4, 'smile']]);
    cam(T, s, t, i, C([-0.4, 4.6, 1.2], [-0.4, 0, 0.6]), C([-0.4, 3.6, 1.0], [-0.4, 0, 0.6])); },
  (g, t) => { snow(g, t, 70, 0.6); label(g, t, 'YOU SURVIVE', { at: 0.3, color: '#9ff2a0' }); label(g, t, 'BECAUSE JAY CHECKED', { at: 1.6, y: V(190, 230), size: V(48, 52) }); });

// ---------- the real condition ----------
card('h12', 'blue', (g, t, i, u, cx, cy) => { title(g, t, 'IS ANY OF THIS REAL?', cy - 180 * u, { size: 90, at: 0 }); stamp(g, t, 'YES.', cx, cy + 120 * u, { at: 1.7, size: 200, color: '#6fe6a0' }); });

card('h13', 'teal', (g, t, i, u, cx, cy) => { const w = 1200 * u, h = 640 * u, k = ease.outBack(prog(t, 0, 0.4)); g.save(); g.translate(cx, cy + 40 * u); g.scale(k, k); g.fillStyle = '#f4f0e0'; rr(g, -w / 2, -h / 2, w, h, 24 * u); g.fill(); g.fillStyle = '#f2c84a'; rr(g, -w / 2, -h / 2 - 50 * u, 360 * u, 80 * u, 20 * u); g.fill();
  text(g, 'MEDICAL FILE', -w / 2 + 180 * u, -h / 2 - 12 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#3a2a10' }); g.restore();
  title(g, t, 'CONGENITAL', cy - 120 * u, { size: 96, at: 3.3, color: '#1f5a50' }); title(g, t, 'INSENSITIVITY', cy + 20 * u, { size: 96, at: 3.6, color: '#1f5a50' }); title(g, t, 'TO PAIN', cy + 160 * u, { size: 96, at: 3.9, color: '#e8453c' });
  title(g, t, 'A REAL-WORLD CONDITION', cy + 290 * u, { size: 48, at: 0.4, color: '#3a3a48' }); });

card('h14', 'teal', (g, t, i, u, cx, cy) => { ['C', 'I', 'P'].forEach((c, k) => title(g, t, c, cy, { x: cx + (k - 1) * 300 * u, size: 300, at: 0.1 + k * 0.4 })); });

card('h15', 'blue', (g, t, i, u, cx, cy) => { helix(g, t, cx - 300 * u, cy, 760 * u, 7); title(g, t, 'SCN9A GENE', 150 * u, { size: 90, at: 0.1, x: cx + 300 * u }); stamp(g, t, 'MUTATION', cx + 300 * u, cy - 40 * u, { at: 1.5, size: 80 });
  title(g, t, 'PAIN SIGNALS: 0', cy + 220 * u, { size: 76, at: 3.0, x: cx + 300 * u, color: '#6fe6ff' }); });

card('h16', 'dark', (g, t, i, u, cx, cy) => { const items = [[tongue, 'BITTEN TONGUES', 0.1], [(gg, x, y, r) => bone(gg, x, y, r, 1), 'BROKEN BONES', 3.5], [goggles, 'PROTECTIVE GOGGLES', 5.4]];
  items.forEach(([fn, str, at], k) => { const x = cx + (k - 1) * 560 * u, kk = ease.outBack(prog(t, at, at + 0.4)); if (kk <= 0) return; g.save(); g.translate(x, cy - 20 * u); g.scale(kk, kk); circle(g, 0, 0, 200 * u, 'rgba(255,255,255,.08)'); fn(g, 0, 0, 120 * u); g.restore(); title(g, t, str, cy + 280 * u, { x, size: 48, at: at + 0.2 }); });
  title(g, t, 'CHILDREN WITH CIP', 140 * u, { size: 80, at: 0 }); });

card('h17', 'gold', (g, t, i, u, cx, cy) => { title(g, t, 'PAIN IS NOT A CURSE', cy - 220 * u, { size: 90, at: 0 }); const k = ease.outBack(prog(t, 1.8, 2.3)); if (k > 0) { shield(g, cx, cy + 40 * u, 140 * u * k, '#6fe6a0'); heart(g, cx, cy + 40 * u, 60 * u * k); }
  title(g, t, 'IT IS HUMAN SURVIVAL', cy + 300 * u, { size: 90, at: 1.9, color: '#ffd84a' }); });

// ---------- that night ----------
function bed(st, s) { SETS.bedroom(st, { night: true }); s.me = fig(st, ME, -2.4, -1.75, -Math.PI / 2, 'sit'); s.me.position.y = 0.2; const wh = '#f4f4f4';
  s.bnd = [new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.035, 6, 24), new THREE.MeshToonMaterial({ color: wh })), cyl(0.07, 0.07, 0.16, wh, 0, 0, 0, { outline: 0.004 })]; s.bnd.forEach((b) => st.add(b)); s.ph = box(0.08, 0.15, 0.012, '#1a1a22', 0, 0, 0, { outline: 0.003 }); st.add(s.ph); }
const bandage = (s) => { const h = headOf(s.me); s.bnd[0].position.set(h[0], h[1] + 0.06, h[2]); s.bnd[0].rotation.set(Math.PI / 2 + 0.2, 0, 0.1); const a = handPos(s.me, 'B'); s.bnd[1].position.set(a[0], a[1] + 0.12, a[2]); };

shot('i01', (st, s) => bed(st, s),
  (s, t, i, T) => { pose(s.me, t, [[0, { ...POSE.sit, spine: [14, 0], head: [0, -10], shA: [20, 10], elA: 50, shB: [20, 10], elB: 50 }]]); expr(s.me, t, [[0, 'sad']]); bandage(s); s.ph.visible = false; cam(T, s, t, i, C([0.4, 1.6, 1.0], [-2.4, 0.8, -1.8]), C([-0.2, 1.4, 0.4], [-2.4, 0.8, -1.8])); },
  (g, t) => { label(g, t, 'THAT NIGHT', { at: 0.3 }); });

shot('i02', (st, s) => bed(st, s),
  (s, t, i, T) => { pose(s.me, t, [[0, { ...POSE.sit, shA: [45, 10], elA: 110, head: [0, -18] }]]); expr(s.me, t, [[0, 'neutral'], [0.4, 'surprised']]); bandage(s); held(s.ph, s.me, 'A', 0.06); s.ph.rotation.set(-0.6, -Math.PI / 2, 0); s.ph.position.x += Math.sin(t * 60) * 0.004;
    const h = s.ph.position; cam(T, s, t, i, C([h.x + 0.35, h.y + 0.25, h.z + 0.45], [h.x, h.y, h.z]), C([h.x + 0.3, h.y + 0.22, h.z + 0.38], [h.x, h.y, h.z])); },
  (g, t, i, s) => { const [x, y, ppm] = scr(s, s.ph.position.toArray()); const a = Math.abs(Math.sin(t * 14)); g.save(); g.strokeStyle = alpha('#ffffff', 0.8 * a); g.lineWidth = ppm * 0.012; for (const sx of [-1, 1]) for (let k = 1; k <= 2; k++) { g.beginPath(); g.arc(x, y, ppm * 0.1 * k, sx > 0 ? -0.6 : Math.PI - 0.6, sx > 0 ? 0.6 : Math.PI + 0.6); g.stroke(); } g.restore(); label(g, t, 'BZZZ', { at: 0.1 }); });

card('i03', 'dark', (g, t, i, u, cx, cy) => { const h = 860 * u, w = h * 0.52; g.save(); g.fillStyle = '#1a1a22'; rr(g, cx - w / 2, cy - h / 2, w, h, 60 * u); g.fill(); const sx = cx - w / 2 + 24 * u, sy = cy - h / 2 + 60 * u, sw = w - 48 * u, sh = h - 120 * u;
  g.fillStyle = '#0a0e1e'; g.fillRect(sx, sy, sw, sh); g.fillStyle = '#16161c'; g.fillRect(sx + sw * 0.15, sy + sh * 0.55, sw * 0.7, sh * 0.16); circle(g, sx + sw * 0.3, sy + sh * 0.72, sw * 0.06, '#000'); circle(g, sx + sw * 0.7, sy + sh * 0.72, sw * 0.06, '#000'); glow2(g, sx + sw * 0.5, sy + sh * 0.25, sw * 0.5, '#ffd890', 0.4);
  const k = 1 - prog(t, 0.3, 0.7); if (k > 0) { g.globalAlpha = k; circle(g, cx, cy, 80 * u, 'rgba(255,255,255,.85)'); g.fillStyle = '#1a1a22'; g.beginPath(); g.moveTo(cx - 25 * u, cy - 40 * u); g.lineTo(cx + 45 * u, cy); g.lineTo(cx - 25 * u, cy + 40 * u); g.fill(); g.globalAlpha = 1; }
  circle(g, sx + 40 * u, sy + 40 * u, 14 * u, Math.sin(t * 6) > 0 ? '#ff3a3a' : 'rgba(255,58,58,.3)'); text(g, 'VIDEO', sx + 110 * u, sy + 40 * u, { size: 30 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); g.restore(); title(g, t, 'A VIDEO CLIP', 110 * u, { size: 70, at: 0.2 }); });

const rec = (g, t) => { const u = U(); g.save(); g.fillStyle = 'rgba(0,0,0,.18)'; for (let y = 0; y < E.H; y += 6 * u) g.fillRect(0, y, E.W, 2 * u); g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 4 * u; const m = 50 * u, L = 70 * u;
  for (const [x, y, sx, sy] of [[m, m, 1, 1], [E.W - m, m, -1, 1], [m, E.H - m, 1, -1], [E.W - m, E.H - m, -1, -1]]) { g.beginPath(); g.moveTo(x, y + sy * L); g.lineTo(x, y); g.lineTo(x + sx * L, y); g.stroke(); }
  circle(g, m + 40 * u, m + 50 * u, 12 * u, Math.sin(t * 6) > 0 ? '#ff3a3a' : 'rgba(255,58,58,.3)'); text(g, 'REC', m + 90 * u, m + 50 * u, { size: 34 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); g.restore(); };

shot('i04', (st, s) => { SETS.suburbNight(st); st.add(van(6.4, 2.8)); },
  (s, t, i, T) => cam(T, s, t, i, C([13.5, 1.3, 11.0], [6.0, 2.0, 2.0]), C([12.6, 1.2, 10.0], [6.0, 2.1, 2.0])),
  (g, t) => { rec(g, t); label(g, t, 'BLACK VAN', { at: 0.4 }); label(g, t, 'UNDER YOUR STREETLIGHT', { at: 1.0, y: V(190, 230), size: V(44, 48), color: '#ffd890' }); });

shot('i05', (st, s) => { SETS.suburbNight(st); st.add(van(6.4, 2.8)); s.ag = fig(st, AGENT, 5.4, 4.6, -Math.PI / 2 + 0.15); },
  (s, t, i, T) => { pose(s.ag, t, [[0, 'stand'], [1.0, 'crossArms']]); expr(s.ag, t, [[0, 'neutral'], [1.2, 'smirk']]); const f = face(s.ag, 1.2, 0.0); cam(T, s, t, i, f, push(f, 0.2)); },
  (g, t) => { rec(g, t); label(g, t, 'WOMAN IN A GREY COAT', { at: 0.4 }); });

function dossier(id, theme, name, at, icon, col) {
  card(id, theme, (g, t, i, u, cx, cy) => { const w = 1000 * u, h = 620 * u, k = ease.outBack(prog(t, 0, 0.35)); g.save(); g.translate(cx, cy + 30 * u); g.scale(k, k); g.rotate(-0.02); g.fillStyle = '#d8c8a0'; rr(g, -w / 2, -h / 2, w, h, 20 * u); g.fill(); g.fillStyle = '#c8b890'; rr(g, -w / 2, -h / 2 - 40 * u, 300 * u, 70 * u, 16 * u); g.fill();
    g.fillStyle = '#20222c'; rr(g, -w / 2 + 50 * u, -h / 2 + 60 * u, 320 * u, 400 * u, 12 * u); g.fill(); person(g, -w / 2 + 210 * u, -h / 2 + 420 * u, 300 * u, alpha(col, 0.9)); icon(g, t, -w / 2 + 210 * u, -h / 2 + 140 * u, 60 * u);
    text(g, 'SUBJECT', 140 * u, -h / 2 + 110 * u, { size: 40 * u, font: FONTS.ui, weight: 900, color: '#6a5a3a' }); text(g, name, 140 * u, -h / 2 + 220 * u, { size: 64 * u, font: FONTS.ui, weight: 900, color: '#2a2210' }); g.restore();
    stamp(g, t, 'CLASSIFIED', cx + 200 * u, cy + 210 * u, { at, size: 70 }); });
}
const clockI = (g, t, x, y, r) => { ring(g, x, y, r, r * 0.12, '#ffffff'); g.save(); g.strokeStyle = '#ffffff'; g.lineWidth = r * 0.12; g.beginPath(); g.moveTo(x, y); g.lineTo(x, y - r * 0.7); g.moveTo(x, y); g.lineTo(x + r * 0.5, y); g.stroke(); g.restore(); };
const swirl = (g, t, x, y, r) => { for (let k = 0; k < 3; k++) ring(g, x, y, r * (0.4 + k * 0.3), r * 0.08, alpha('#6fe6ff', 1 - k * 0.25)); };
const plus = (g, t, x, y, r) => { g.save(); g.fillStyle = '#6fe6a0'; g.fillRect(x - r * 0.25, y - r, r * 0.5, r * 2); g.fillRect(x - r, y - r * 0.25, r * 2, r * 0.5); g.restore(); };
dossier('i06', 'dark', 'STOPS TIME', 1.0, clockI, '#ffd84a');
dossier('i07', 'dark', 'TELEPORTS', 0.9, swirl, '#6fe6ff');
dossier('i08', 'dark', 'HEALS FAST', 1.1, plus, '#6fe6a0');
card('i09', 'red', (g, t, i, u, cx, cy) => { for (let k = 0; k < 7; k++) flameIcon(g, t + k * 0.7, cx - 600 * u + k * 200 * u, E.H - 80 * u, 110 * u); person(g, cx, cy + 260 * u, 520 * u, '#141218'); g.save(); g.globalAlpha = 0.9; g.fillStyle = '#e8453c'; g.beginPath(); g.ellipse(cx, cy - 210 * u, 72 * u, 30 * u, 0, Math.PI, 0); g.fill(); g.restore();
  title(g, t, 'WE NEED SOMEONE WHO CAN', 120 * u, { size: 56, at: 0.1 }); title(g, t, 'WALK THROUGH FIRE', 210 * u, { size: 90, at: 0.6, color: '#ffd84a' }); stamp(g, t, 'SUBJECT: LEO', cx + 470 * u, cy + 80 * u, { at: 2.0, size: 64, color: '#ffffff' }); });
card('i10', 'dark', (g, t, i, u, cx, cy) => { const k = ease.outBack(prog(t, 0.1, 0.6)); title(g, t, 'WELCOME TO', cy - 300 * u, { size: 70, at: 0.1, color: '#b48cff' }); g.save(); g.translate(cx, cy + 40 * u); g.scale(k, k); ring(g, 0, 0, 230 * u, 16 * u, '#b48cff'); glow2(g, 0, 0, 380 * u, '#8a5aff', 0.45);
  text(g, 'PROJECT', 0, -70 * u, { size: 70 * u, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 8 }); text(g, 'I-F', 0, 50 * u, { size: 190 * u, font: FONTS.serif, weight: 900, color: '#ffffff', glow: 30, glowColor: 'rgba(180,140,255,.9)' }); g.restore(); });

shot('i11', (st, s) => bed(st, s),
  (s, t, i, T) => { pose(s.me, t, [[0, POSE.sit], [1.0, { ...POSE.sit, shA: [50, 4], elA: 135, head: [0, 6] }]]); expr(s.me, t, [[0, 'thinking'], [2.6, 'smirk']]); bandage(s); s.ph.visible = false; const f = face(s.me, 1.35, 0.1, 1.2); cam(T, s, t, i, f, push(f, 0.12)); },
  (g, t) => { const u = U(), k = ease.outBack(prog(t, 1.1, 1.5)); if (k > 0) { g.save(); g.translate(E.W * 0.8, E.H * 0.3); g.scale(k, k); g.fillStyle = '#ffffff'; rr(g, -120 * u, -80 * u, 240 * u, 160 * u, 30 * u); g.fill(); g.beginPath(); g.moveTo(-60 * u, 70 * u); g.lineTo(-100 * u, 130 * u); g.lineTo(-10 * u, 75 * u); g.fill(); for (let j = 0; j < 3; j++) circle(g, (j - 1) * 55 * u, 0, 16 * u, '#3a3a48'); g.restore(); }
    shout(g, t, 'WHAT WOULD YOU DO?', { at: 0.2, y: E.H * 0.85, size: V(90, 78), shake: 0 }); });

card('i12', 'blue', (g, t, i, u, cx, cy) => { const P = [['STOP TIME', '#ffd84a'], ['TELEPORT', '#6fe6ff'], ['HEALING', '#6fe6a0'], ['INVISIBLE', '#b48cff'], ['FLY', '#ff9ab0'], ['READ MINDS', '#ffb25a']];
  P.forEach(([str, c], k) => { const x = cx + ((k % 3) - 1) * 460 * u, y = cy - 40 * u + Math.floor(k / 3) * 250 * u, kk = ease.outBack(prog(t, 0.2 + k * 0.18, 0.5 + k * 0.18)); if (kk <= 0) return; g.save(); g.translate(x, y); g.scale(kk, kk); g.fillStyle = alpha(c, 0.2); g.strokeStyle = c; g.lineWidth = 6 * u; rr(g, -200 * u, -90 * u, 400 * u, 180 * u, 30 * u); g.fill(); g.stroke(); text(g, str, 0, 0, { size: 52 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); g.restore(); });
  title(g, t, 'WHICH SUPERPOWER NEXT?', 140 * u, { size: 84, at: 0 }); });

card('i13', 'dark', (g, t, i, u, cx, cy) => { const k1 = ease.outBack(prog(t, 0.2, 0.6)), k2 = ease.outBack(prog(t, 1.0, 1.4)); if (k1 > 0) { g.save(); g.translate(cx - 330 * u, cy); g.scale(k1, k1); g.fillStyle = '#ffffff'; rr(g, -200 * u, -80 * u, 400 * u, 160 * u, 80 * u); g.fill(); text(g, 'LIKE', 0, 0, { size: 64 * u, font: FONTS.ui, weight: 900, color: '#141218' }); g.restore(); }
  if (k2 > 0) { g.save(); g.translate(cx + 330 * u, cy); g.scale(k2, k2); g.fillStyle = '#e8302c'; rr(g, -260 * u, -80 * u, 520 * u, 160 * u, 30 * u); g.fill(); text(g, 'SUBSCRIBE', 0, 0, { size: 70 * u, font: FONTS.ui, weight: 900, color: '#ffffff' }); g.restore(); }
  title(g, t, 'WHAT IF YOU FELT ZERO PAIN?', 140 * u, { size: 60, at: 0 }); }); // Project I-F lines removed (copied IFOLOGY storyline)
