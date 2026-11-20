// toon/cast3d.js — 3D cast. Our own hero design: red cap + teal hoodie (one signature combo, fixed all video).
// KIP (final, Nov 2026): white head + black hoodie + black six-panel cap with a white K + red sneakers + gold bolt logo + brass watch.
export const KIP = { top: 'hoodie', color: '#2a2a33', skin: '#f6f3ec', bigEyes: true, cap: 'real', capColor: '#1b1b20', capLogo: 'K',
  logo: '#ffd23f', watch: '#c8a24a', legs: '#2e2e36', shoes: '#e8453c', sole: '#f4f4f4' };
export const HERO = KIP;                                                                   // old name, same character
export const KIP_SCHOOL = { ...KIP, bag: '#3a5ad8' };                                       // school scenes
export const KIP_SURVIVAL = { ...KIP, bag: '#6b5a3a', bandage: true, plaster: true, dirt: true };   // "Kip Survives" episodes
export const FRIEND = { top: 'hoodie', color: '#f08a2a', hair: 'curly' };              // best friend, orange hoodie
export const SCI = { top: 'labcoat', glasses: true, hair: 'spiky' };                    // scientist
export const SCI2 = { top: 'labcoat', glasses: true, hair: 'bun' };
export const GRANDMA = { top: 'tee', color: '#e8a0c0', hair: 'bun', glasses: true, skirt: '#8a5a9a' };
export const REPORTER = { top: 'suit', color: '#2a3a6a', hair: 'pony' };
export const MOM = { top: 'tee', color: '#8a5ad6', hair: 'pony' };
export const KIDS = [{ top: 'tee', color: '#3a9ad8', kid: true }, { top: 'hoodie', color: '#e8a0a0', kid: true, hair: 'pony' }, { top: 'tee', color: '#6db55a', kid: true, hair: 'spiky' },
  { top: 'tee', color: '#f2b51e', kid: true, hair: 'curly' }, { top: 'hoodie', color: '#8a5ad6', kid: true }, { top: 'tee', color: '#e8e8e8', kid: true, hair: 'bun' }];
export const AGENT = { top: 'suit', color: '#8a8f98', hair: 'bun', glasses: true };          // mysterious woman in a grey coat (Project I-F)
export const GIRL = { top: 'hoodie', color: '#f2a0c8', kid: true, hair: 'pony' };    // little girl (rescue)
export const NURSE = { top: 'tee', color: '#5fb0a8', hair: 'bun', legs: '#5fb0a8' };   // hospital nurse in teal scrubs ("That's not how hospitals work, sweetie.")
export const KIP_BILL = { ...KIP };                                                    // alias for shots where Kip holds the hospital bill
export const DEV = FRIEND;                                                               // Dev, Kip's best friend (orange hoodie, curly hair)
export const TANK = { top: 'hoodie', color: '#f2f2f2', hair: 'spiky', glasses: true, legs: '#2a2a33' };   // streamer: white hoodie + shades
export const COP = { top: 'suit', color: '#1d2e5a', cap: true, capColor: '#1d2e5a', legs: '#1d2e5a' };   // Miami police officer
export const DOCTOR = SCI;                                                               // doctor in a lab coat
