"""story/plan.py — writes story/shots.json for "What If Humans Never Invented Mirrors?" (run: python3 story/plan.py).
Each row: (id, start_s, set, scene, sfx [(at, name, gain)], amb or None). A shot ends where the next one starts."""
import json, os
DUR = 541.47
W = lambda g=-14: (0.05, 'whoosh', g)
P = lambda at, g=-11: (at, 'pop', g)
ROWS = [
 # ---- hook
 ('h01', 0.0, 'bathroom', 'Kip walks into the bathroom, stops at the sink: the wall above it is blank', [(0.3, 'footstep', -18), (2.6, 'hit', -14)], ('roomtone', -30)),
 ('h02', 4.62, 'bathroom', 'From the wall: Kip stares at it. NOT BROKEN. NOT MISSING.', [P(0.2), P(1.2)], ('roomtone', -30)),
 ('h03', 6.94, 'card', 'A mirror outline fades to nothing: NEVER EXISTED. NOBODY INVENTED ONE.', [W(), (1.0, 'glitch', -16)], None),
 ('h04', 11.22, 'bathroom', 'Kip fixes his cap by touch, pats his head, no idea what it looks like', [(1.0, 'swish', -16), (3.4, 'blip', -12)], ('roomtone', -30)),
 ('h05', 16.36, 'street', 'Neither does anyone else: the street wide, messy people walking', [W(-16)], ('city', -26)),
 ('h06', 19.08, 'street', 'Leaves in hair, clashing clothes: LOST A FIGHT WITH A HEDGE. Nobody minds.', [P(0.6), (3.0, 'pop', -12)], ('city', -26)),
 ('h07', 25.14, 'street', 'Except Gary, a pigeon on a bollard, chest out. He thinks he is an eagle.', [(0.3, 'ding', -14), (3.4, 'shimmer', -16)], ('city', -28)),
 ('h08', 30.62, 'card', 'Promise: no space telescopes, much stranger dating', [W(), P(3.7), P(5.5)], None),
 ('h09', 37.0, 'card', 'Promise: the face you think is yours, and people who might be happier', [W(), P(0.8), P(6.2)], None),
 # ---- room 1
 ('room1', 44.54, 'card', 'ROOM 1 OF 7: THE REWIND, a door opens', [(0.05, 'riser', -16), (0.6, 'hit', -12)], None),
 ('r102', 46.88, 'card', 'Rewind clock spins back: 8,000 YEARS AGO', [(0.1, 'clock', -14), (2.6, 'hit', -12)], None),
 ('r103', 50.72, 'card', 'Polished obsidian mirror; map pin: Catalhoyuk, Turkey', [W(), P(2.5), P(5.2)], None),
 ('r104', 58.6, 'pond', 'Kip crouches at a still pond: the only way to see your face', [W(-18)], ('wind', -30)),
 ('r105', 62.44, 'card', 'NOBODY POLISHES THAT ROCK; your face: others see it, you do not', [W(), (1.2, 'hit', -12), P(4.0)], None),
 ('r106', 70.54, 'card', 'Rare and expensive: a mirror on a price tag', [W(), (1.6, 'ding', -14)], None),
 ('r107', 74.38, 'card', 'Murano near Venice, 1500s, glass vases', [W(), P(1.5)], None),
 ('r108', 79.48, 'card', 'Glassworkers barred from leaving: a padlock', [W(), (1.6, 'hit', -12)], None),
 ('r109', 84.16, 'versailles', 'Louis XIV walks down the Hall of Mirrors', [(0.2, 'shimmer', -16)], ('roomtone', -30)),
 ('r110', 90.42, 'versailles', 'Wide: 357 MIRRORS counter', [(0.2, 'counter', -12), (1.6, 'ding', -12)], ('roomtone', -30)),
 ('r111', 93.12, 'versailles', 'Louis poses: IT WAS A FLEX, I am so rich', [(0.2, 'hit', -12), (2.0, 'pop', -12)], ('roomtone', -30)),
 ('r112', 99.86, 'versailles', 'In this world: 357 BLANK PANELS, Louis confused', [(0.2, 'glitch', -14)], ('roomtone', -30)),
 ('r113', 106.02, 'versailles', 'Louis in a tower of hats: HATS.', [(0.1, 'pop', -9)], ('roomtone', -30)),
 ('r114', 107.56, 'card', '1835: Justus von Liebig coats glass with silver', [W(), (1.5, 'shimmer', -14)], None),
 ('r115', 114.62, 'card', 'The cheap clear mirror; in this world he goes home early: crossed out', [W(), (2.8, 'hit', -12)], None),
 ('r116', 119.32, 'bathroom', 'Blank bathroom wall; Kip yawns: until tomorrow morning', [(0.2, 'swish', -18)], ('roomtone', -30)),
 # ---- room 2
 ('room2', 125.66, 'card', 'ROOM 2 OF 7: GETTING READY', [(0.05, 'riser', -16), (0.6, 'hit', -12)], None),
 ('r202', 127.88, 'card', 'A TEAM SPORT: two people, a whistle', [W(), (1.0, 'whistle', -16)], None),
 ('r203', 130.78, 'bedroom', 'A couple does each other\'s makeup', [P(0.3)], ('roomtone', -30)),
 ('r204', 132.34, 'bedroom', 'Roommates check each other\'s teeth: SPINACH?', [P(0.6)], ('roomtone', -30)),
 ('r205', 134.66, 'street', 'DO I HAVE SOMETHING ON MY FACE? the most common question on Earth', [P(0.2), (2.0, 'ding', -14)], ('city', -28)),
 ('r206', 138.92, 'barber', 'Kip in the barber chair, scissors: pure trust', [(0.4, 'swish', -14), (1.2, 'swish', -14)], ('roomtone', -30)),
 ('r207', 141.46, 'barber', 'Kip stands up, cannot see it; barber: TRUST ME. IT\'S GREAT.', [(5.3, 'ding', -14)], ('roomtone', -30)),
 ('r208', 148.1, 'street', 'Kip\'s hair is a disaster; friends give thumbs up: LOOKS GREAT', [(0.1, 'hit', -12), P(1.8)], ('city', -28)),
 ('r209', 151.36, 'card', 'SOCIETY RUNS ON THIS LIE stamp', [W(), (0.5, 'hit', -10)], None),
 ('r210', 153.38, 'street', 'Gary puffs his chest: MAJESTIC', [(0.6, 'shimmer', -14)], ('city', -28)),
 ('r211', 156.3, 'store', 'Clothing store, no mirror; Kip steps out of the fitting booth; a describer waits', [(1.6, 'swish', -16)], ('murmur', -32)),
 ('r212', 162.86, 'store', 'Describer: THE JACKET SAYS CONFIDENCE. THE PANTS SAY...', [P(0.2), (3.0, 'tick', -12)], ('murmur', -32)),
 ('r213', 168.02, 'store', 'Kip needs two honest friends', [P(2.2)], ('murmur', -32)),
 ('r214', 175.54, 'card', 'Beauty industry: lipstick you will never see on yourself', [W(), P(2.0)], None),
 ('r215', 180.56, 'card', 'Ad billboard: YOUR FRIENDS WILL GASP', [W(), (4.0, 'cheer', -18)], None),
 ('r216', 187.58, 'gym', 'Gym, no mirror wall: bad form, no mirror selfie', [(0.3, 'kick', -14), (2.4, 'kick', -14)], ('roomtone', -30)),
 ('r217', 193.8, 'card', 'Two problems solved, one created: check check cross', [W(), P(0.8), P(1.4), (2.2, 'hit', -12)], None),
 # ---- room 3
 ('room3', 197.68, 'card', 'ROOM 3 OF 7: YOUR HOME FEELS SMALLER', [(0.05, 'riser', -16), (0.6, 'hit', -12)], None),
 ('r302', 200.82, 'card', 'Designer trick: a big mirror doubles a tiny room; gone', [W(), (2.6, 'shimmer', -14), (5.8, 'glitch', -14)], None),
 ('r303', 207.92, 'tiny', 'Kip in a tiny apartment: JUST TINY', [(0.2, 'pop', -12)], ('roomtone', -30)),
 ('r304', 210.98, 'studio', 'Dance studio, blank wall: dancers watch each other', [], ('murmur', -32)),
 ('r305', 216.96, 'studio', 'Teacher yells; YELLING ALREADY HAPPENS', [(0.1, 'whistle', -12)], ('murmur', -32)),
 ('r306', 219.3, 'card', 'Not your apartment: your LOVE LIFE', [W(), (2.9, 'ding', -12)], None),
 # ---- room 4
 ('room4', 224.3, 'card', 'ROOM 4 OF 7: DATING', [(0.05, 'riser', -16), (0.6, 'hit', -12)], None),
 ('r402', 226.3, 'tiny', 'Kip about to leave, cannot check himself', [(0.6, 'swish', -16)], ('roomtone', -30)),
 ('r403', 229.98, 'restaurant', 'Kip walks into the restaurant; his date looks up', [(0.3, 'footstep', -18), (3.0, 'hit', -14)], ('murmur', -30)),
 ('r404', 234.42, 'restaurant', 'The date\'s face: GOOD FACE? BAD FACE?', [P(0.2), P(1.2)], ('murmur', -30)),
 ('r405', 236.54, 'restaurant', 'Ketchup on Kip\'s forehead; YOU WILL NEVER KNOW', [(0.3, 'pop', -10)], ('murmur', -30)),
 ('r406', 239.76, 'card', 'REAL SCIENCE: atom', [(0.1, 'stinger', -16)], None),
 ('r407', 243.22, 'card', 'Your mirror face is flipped left to right; nobody else sees it', [W(), (1.5, 'swish', -12)], None),
 ('r408', 250.38, 'card', '1977 study: two photos, true and flipped', [W(), P(1.5), P(3.2)], None),
 ('r409', 256.44, 'card', 'You pick the flipped one, friends pick the true one', [W(), (1.4, 'ding', -14), (4.8, 'ding', -14)], None),
 ('r410', 263.56, 'card', 'MERE-EXPOSURE EFFECT: we like what we know', [W(), (0.4, 'hit', -12)], None),
 ('r411', 267.44, 'bedroom', 'Kip sees a photo of himself and cringes', [(0.4, 'phonebuzz', -18), (3.2, 'hit', -14)], ('roomtone', -30)),
 ('r412', 274.84, 'park', 'Friends describe Kip to Kip', [P(2.8)], ('wind', -32)),
 ('r413', 281.06, 'card', 'ONE WAY LEFT: a camera', [W(), (2.9, 'flash', -12)], None),
 # ---- room 5
 ('room5', 287.1, 'card', 'ROOM 5 OF 7: PHOTOGRAPHS BECOME POWER', [(0.05, 'riser', -16), (0.6, 'hit', -12)], None),
 ('r502', 290.44, 'street', 'Photographer at a tripod, a long queue: MOST POWERFUL PEOPLE ALIVE', [(1.2, 'flash', -12), (4.0, 'flash', -12)], ('city', -28)),
 ('r503', 299.22, 'card', '1839 Robert Cornelius, the first selfie (sepia frame)', [(0.1, 'ding', -12), (2.5, 'flash', -12)], None),
 ('r504', 310.34, 'card', 'Our world: history book. This world: celebrity, camera flashes', [W(), (2.3, 'flash', -12), (2.6, 'flash', -14)], None),
 ('r505', 319.32, 'card', 'Front camera launch: BIGGEST PRODUCT LAUNCH IN HISTORY', [W(), (0.8, 'cheer', -16)], None),
 ('r506', 323.2, 'street', 'People see their faces on phones for the first time and cry', [(0.4, 'phonering', -20)], ('city', -30)),
 ('r507', 326.22, 'street', 'Someone screams', [(0.1, 'hit', -10)], ('city', -30)),
 ('r508', 327.8, 'street', 'Gary sees himself on a phone: NOT AN EAGLE. He takes it badly', [(0.3, 'blip', -12), (2.7, 'stinger', -14), (4.6, 'hit', -12)], ('city', -30)),
 ('r509', 333.72, 'boothStreet', 'Photo booth glowing like a temple; a queue', [(0.3, 'shimmer', -14)], ('city', -30)),
 ('r510', 340.32, 'boothStreet', 'Yearly photo strip: OH. I HAVE A MOLE.', [(0.2, 'flash', -12), (3.4, 'hit', -12)], ('city', -30)),
 ('r511', 346.9, 'card', 'Dating apps: photo date stamps; older than a year = LYING', [W(), P(2.0), (8.8, 'buzz', -12)], None),
 ('r512', 357.76, 'card', 'Profile photo from 2009 with hair; he is bald now', [W(), (2.9, 'hit', -12)], None),
 ('r513', 365.08, 'card', 'Beauty filters make no sense: a filter on a face you know', [W(), (2.4, 'shimmer', -14)], None),
 ('r514', 371.5, 'card', 'First face you ever see is filtered: WHICH ONE IS REAL?', [W(), P(1.0), P(4.6)], None),
 ('r515', 379.28, 'park', 'Kip: THAT\'S NOT WHAT I LOOK LIKE. Friend: THAT\'S EXACTLY WHAT YOU LOOK LIKE', [P(0.2), P(1.6), (5.4, 'hit', -14)], ('wind', -32)),
 ('r516', 386.08, 'card', 'Your face is the small stuff; big things stop working', [W(), (2.6, 'glitch', -12)], None),
 # ---- room 6
 ('room6', 393.18, 'card', 'ROOM 6 OF 7: THE BIG STUFF BREAKS', [(0.05, 'riser', -16), (0.6, 'hit', -12)], None),
 ('r602', 395.79, 'highway', 'Highway: cars with no rearview mirrors', [(0.5, 'carpass', -14)], ('wind', -30)),
 ('r603', 400.36, 'highway', 'Kip in a convertible turns his whole body to change lanes', [(0.8, 'carpass', -16)], ('wind', -30)),
 ('r604', 403.9, 'highway', 'EVERY HIGHWAY LOOKS LIKE THIS: cars zigzag', [(0.2, 'carpass', -12), (0.9, 'impact', -14)], ('wind', -30)),
 ('r605', 405.92, 'card', 'SCIENCE TAKES A HIT', [W(), (0.4, 'hit', -12)], None),
 ('r606', 407.32, 'card', 'Newton 1668: reflecting telescope, curved mirror gathers light', [W(), (4.8, 'shimmer', -14)], None),
 ('r607', 415.42, 'card', 'JWST: 18 gold mirror segments, galaxies far away', [W(), (1.2, 'shimmer', -12)], None),
 ('r608', 424.06, 'card', 'It never launches: the universe stays blurry', [(0.1, 'glitch', -12)], None),
 ('r609', 429.64, 'card', 'Lasers bounce between mirrors: NO LASERS', [W(), (0.6, 'buzz', -16), (2.9, 'hit', -12)], None),
 ('r610', 434.06, 'card', 'No laser eye surgery, no barcode scanners', [P(0.2), (1.5, 'blip', -10)], None),
 ('r611', 437.86, 'card', 'Cats have nothing to chase', [P(0.6)], None),
 ('r612', 440.18, 'dentist', 'Dentist loses the tiny mirror on a stick', [(0.6, 'swish', -16)], ('roomtone', -30)),
 ('r613', 443.06, 'dentist', 'Dentist squints into the mouth: HMM.', [(2.4, 'tick', -12)], ('roomtone', -30)),
 ('r614', 447.34, 'card', 'The simple periscope: a tube with two mirrors, never exists', [W(), (2.4, 'glitch', -14)], None),
 ('r615', 451.36, 'card', 'Submarines use prisms: Navy fine; science fair project not', [W(), (3.8, 'ding', -14), (5.6, 'hit', -12)], None),
 ('r616', 458.94, 'garage', 'Blind corner in a parking garage: the round safety mirror, GONE', [(2.6, 'glitch', -12)], ('roomtone', -28)),
 ('r617', 462.22, 'garage', 'Two cars nose to nose at the corner: GAME OF CHICKEN', [(0.2, 'carpass', -14), (1.4, 'hit', -12)], ('roomtone', -28)),
 # ---- room 7
 ('room7', 465.14, 'card', 'ROOM 7 OF 7: THE TWIST', [(0.05, 'riser', -16), (0.6, 'hit', -12)], None),
 ('r702', 467.42, 'card', 'JUST WORSE? ... MAYBE NOT.', [W(), (2.8, 'ding', -12)], None),
 ('r703', 471.08, 'card', '1970 Gordon Gallup: a chimp in front of a mirror', [W(), (5.2, 'pop', -12)], None),
 ('r704', 480.58, 'card', 'THE MIRROR TEST for self-recognition', [W(), (1.2, 'ding', -14)], None),
 ('r705', 484.48, 'card', 'Human timeline: pass it at 18 months to 2 years', [W(), P(1.6), P(3.0)], None),
 ('r706', 489.04, 'card', 'THAT\'S ME. ...then worrying what me looks like', [(0.2, 'shimmer', -14), (3.2, 'hit', -12)], None),
 ('r707', 495.26, 'pond', 'Puddles and photos: the moment comes rarely', [], ('wind', -30)),
 ('r708', 501.34, 'park', 'Looking outward: Kip and friends laughing together', [(1.0, 'cheer', -22)], ('wind', -30)),
 ('r709', 506.84, 'park', 'You judge people by how they act: Kip helps a friend', [P(2.0)], ('wind', -30)),
 ('r710', 511.2, 'park', 'Gary with pigeon friends: they call him EAGLE. He goes with it.', [(0.6, 'shimmer', -14), (3.0, 'cheer', -20)], ('wind', -30)),
 # ---- ending
 ('e01', 516.78, 'bathroom', 'Our world: Kip in front of a real mirror, looks a little off', [(0.3, 'shimmer', -16)], ('roomtone', -30)),
 ('e02', 521.92, 'card', 'ONE: the flipped version; friends love the true face', [W(), (2.6, 'ding', -12)], None),
 ('e03', 528.02, 'park', 'TWO: Gary struts in the sun, best life of anyone in this video', [(0.4, 'shimmer', -14)], ('wind', -30)),
 ('e04', 534.0, 'card', 'Question: WORLD WITHOUT MIRRORS or SEE WHAT EVERYONE THINKS? Tell me in the comments', [W(), P(1.0), P(3.4), (6.4, 'ding', -12)], None),
]
MUSIC = [(0, 11.22, 'mystery', 0.45), (11.22, 44.54, 'playful', 0.45), (44.54, 84.16, 'wonder', 0.4), (84.16, 125.66, 'playful', 0.5),
         (125.66, 197.68, 'playful', 0.45), (197.68, 239.76, 'calm', 0.4), (239.76, 287.1, 'mystery', 0.4), (287.1, 327.8, 'wonder', 0.45),
         (327.8, 333.72, 'sad', 0.5), (333.72, 393.18, 'playful', 0.45), (393.18, 405.92, 'action', 0.5), (405.92, 440.18, 'wonder', 0.45),
         (440.18, 465.14, 'playful', 0.45), (465.14, 495.26, 'mystery', 0.4), (495.26, 528.02, 'hopeful', 0.45), (528.02, DUR, 'triumph', 0.5)]
shots = []
for k, (sid, st, sset, scene, sfx, amb) in enumerate(ROWS):
    en = ROWS[k + 1][1] if k + 1 < len(ROWS) else DUR
    d = dict(id=sid, start=st, end=en, line='', scene=scene, set=sset, bars=None, **{'in': {'type': 'fade', 'dur': 0.4} if k == 0 else {'type': 'cut'}},
             sfx=[dict(at=a, name=n, gain=g) for a, n, g in sfx if a < en - st], params={}, notes='')
    if amb: d['amb'] = dict(name=amb[0], gain=amb[1])
    shots.append(d)
out = dict(title='What If Humans Never Invented Mirrors?', duration=DUR, shots=shots, music=[dict(start=a, end=b, mood=m, intensity=i) for a, b, m, i in MUSIC])
json.dump(out, open(os.path.join(os.path.dirname(__file__), 'shots.json'), 'w'), indent=1)
print(len(shots), 'shots, min', min(s['end'] - s['start'] for s in shots), 'max', max(s['end'] - s['start'] for s in shots))
