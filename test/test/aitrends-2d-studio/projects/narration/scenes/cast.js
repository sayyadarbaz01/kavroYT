// cast.js — one outfit per recurring character. Signature colour = identity; keep it identical in every shot.
export const YOU = { top: 'hoodie', color: '#d64a33', head: 'none' };                                   // "you", the teleporter
export const FRIEND = { top: 'tshirt', color: '#3a6ea5', head: 'cap', headColor: '#f2c21a' };          // best friend (couch, Paris)
export const DOC = { top: 'labcoat', face: 'glasses', head: 'none' };                                  // lab scientist
export const HOST = { top: 'suit', color: '#2a2a3a', head: 'cap', headColor: '#3fb950' };              // talk-show host
export const NEIGHBOR = { top: 'tracksuit', color: '#8a5ad6', head: 'bun' };                           // neighbour on the lawn
export const PLAIN = { top: 'none', head: 'none' };                                                    // background people
export const WHO = { you: YOU, friend: FRIEND, doc: DOC, host: HOST, neighbor: NEIGHBOR, plain: PLAIN };
export const CAST = [YOU, FRIEND, DOC, HOST, NEIGHBOR];
// the power: cyan core + violet edge, used by every teleport, glitch and atom diagram
export const POWER = { core: '#6fe6ff', edge: '#b48cff', hot: '#eafcff', bad: '#ff5a6a' };
