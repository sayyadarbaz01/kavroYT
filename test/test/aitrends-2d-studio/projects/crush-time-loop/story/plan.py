"""story/plan.py — writes story/shots.json for "What If You and Your Crush Were Stuck in a Time Loop?" (run: python3 story/plan.py).
Each row: (id, start_s, set, scene, sfx [(at, name, gain)], amb or None). A shot ends where the next one starts.
Loop reset = alarm (phonering) + glitch. The loop counter badge sits top left in every shot."""
import json, os
DUR = 488.05
W = lambda g=-14: (0.05, 'whoosh', g)
P = lambda at, g=-11: (at, 'pop', g)
RESET = [(0.05, 'glitch', -14), (0.2, 'phonering', -16)]
ROOM, CAFE, PARK, NIGHT = ('roomtone', -30), ('murmur', -30), ('wind', -32), ('wind', -34)
PARTY = ('murmur', -26)
ROWS = [
 # ---- hook
 ('h01', 0.0, 'dorm', 'Dorm, 7:00 AM: the alarm rings, Kip sits up. LOOP 1', RESET, ROOM),
 ('h02', 2.48, 'card', 'A clock hits 7:00 and loops back around: EVERY MORNING AT 7', [W(), (0.6, 'clock', -14), (2.0, 'glitch', -14)], None),
 ('h03', 5.56, 'park', 'The quad: Leah crosses with earphones in; Kip frozen. THAT\'S LEAH', [(0.2, 'shimmer', -16), (1.2, 'heartbeat', -16)], PARK),
 ('h04', 8.74, 'card', 'Calendar: LAST DAY OF SENIOR YEAR; TONIGHT: GRADUATION PARTY', [W(), P(0.6), (2.6, 'ding', -14)], None),
 ('h05', 13.54, 'card', 'Map of the US: a plane flies coast to coast. SHE MOVES AWAY', [W(), (0.8, 'whoosh', -16)], None),
 ('h06', 16.82, 'park', 'Kip opens his mouth, a bus roars past, she is gone. YOU DIDN\'T.', [(0.6, 'carpass', -12), (2.3, 'hit', -14)], PARK),
 ('h07', 19.02, 'dorm', 'Alarm. 7:00 AM again. LOOP 2', RESET + [(1.6, 'counter', -12)], ROOM),
 ('h08', 22.67, 'card', 'Promise: the coffee order, LOOP 1,006, what breaks the loop', [W(), P(1.2), P(3.9), P(6.4)], None),
 # ---- loops 2 to 10: panic
 ('l01', 31.79, 'dorm', 'Kip bolt upright: IT WAS A DREAM?', [(0.3, 'swish', -16)], ROOM),
 ('l02', 34.75, 'dorm', 'Sam at his desk with cereal says the exact same thing', [(0.4, 'tick', -14)], ROOM),
 ('l03', 38.47, 'dorm', 'Sam: LAST DAY. LAST PARTY. LAST CHANCE. TELL HER OR I WILL.', [P(0.3), P(1.4), P(2.4)], ROOM),
 ('l04', 43.33, 'dorm', 'Same hoodie, same cereal spill on the same hoodie', [(1.2, 'pop', -10)], ROOM),
 ('l05', 46.39, 'diningHall', 'Campus cafe: the radio, 9:14, the cheesy song. REMEMBER THAT SONG', [(0.4, 'blip', -12), (4.9, 'ding', -12)], CAFE),
 ('l06', 52.65, 'diningHall', 'Leah in line ahead of Kip. LOOP 1 you missed it, LOOP 2 you notice', [(1.6, 'pop', -12)], CAFE),
 ('l07', 58.43, 'diningHall', 'Leah turns: OAT LATTE, EXTRA HOT, NO FOAM. RIGHT?', [(0.2, 'shimmer', -16)], CAFE),
 ('l08', 60.97, 'diningHall', 'Kip stunned: YOU HAVEN\'T ORDERED YET. NEVER TOLD HER.', [(0.1, 'hit', -12), (3.1, 'stinger', -16)], CAFE),
 ('l09', 66.23, 'card', 'LOOPS 3, 4, 5 go badly: trip, spilled coffee', [RESET[0], (1.0, 'counter', -12), (3.0, 'impact', -12), (4.1, 'swish', -12)], None),
 ('l10', 71.45, 'park', 'A frisbee hits Kip in the face mid HEY LEAH', [(1.1, 'impact', -10)], PARK),
 ('l11', 74.55, 'dorm', 'Kip shakes Sam by the shoulders: I\'M STUCK IN A TIME LOOP', [(0.2, 'glitch', -16), (2.6, 'swish', -16)], ROOM),
 ('l12', 83.55, 'dorm', 'Sam: PROVE IT. Kip: IN 10 SECONDS YOU SPILL CEREAL. A pigeon hits the window.', [P(0.1), (3.2, 'impact', -10)], ROOM),
 ('l13', 87.65, 'dorm', 'Sam covered in cereal: OKAY. THAT\'S CREEPY.', [(0.2, 'pop', -12)], ROOM),
 ('l14', 91.91, 'card', 'IF THE DAY RESETS: ZERO CONSEQUENCES', [W(), (1.6, 'ding', -12)], None),
 ('l15', 95.59, 'card', 'LOOPS 6-8: Sam eats a cake, rides a shopping cart, dyes his hair green', [W(), P(1.5), P(4.2), P(6.6)], None),
 ('l16', 103.87, 'dorm', 'Sam wakes with no memory; Kip explains it all over again, exhausted', [(0.3, 'phonering', -20), (2.4, 'tick', -14)], ROOM),
 ('l17', 108.55, 'card', 'LOOP 9: ESCAPE. A bus ticket to a city 4 hours away', [W(), (1.2, 'ding', -14)], None),
 ('l18', 113.15, 'busInside', 'Night bus: Kip at the window, scenery racing past. OUTRUN IT?', [(0.2, 'hum', -24)], ('city', -36)),
 ('l19', 115.99, 'busInside', 'The clock hits 12:00, a white flash', [(0.5, 'clock', -14), (2.6, 'riser', -14), (3.3, 'flash', -10)], ('city', -36)),
 ('l20', 121.87, 'dorm', 'Back in the dorm. LOOP 10. IT\'S NOT THE PLACE. IT\'S THE DAY.', RESET + [(2.3, 'hit', -12)], ROOM),
 ('l21', 126.37, 'card', 'YOU\'LL HAVE TO WIN IT: a trophy', [W(), (0.8, 'powerup', -14)], None),
 # ---- loops 11 to 50: the plan
 ('p01', 129.23, 'dorm', 'LOOP 11: a whiteboard covered in the day\'s timeline. GET ORGANIZED', [(0.2, 'swish', -16), P(1.6)], ROOM),
 ('p02', 134.53, 'card', 'The rules: RESETS AT 7. ONLY MEMORY CARRIES OVER. UNLIMITED PRACTICE.', [W(), P(0.4), P(1.6), (3.6, 'ding', -12)], None),
 ('p03', 139.95, 'card', 'Leah dossier: band, book, HATES MUSHROOMS (learned on LOOP 12)', [W(), P(1.3), P(2.3), (5.4, 'hit', -12)], None),
 ('p04', 147.81, 'dorm', 'LOOP 19: Kip writes THE PERFECT SPEECH', [(0.3, 'tick', -16), (2.2, 'shimmer', -16)], ('roomtone', -32)),
 ('p05', 151.51, 'party', 'Party: Kip recites the speech; Leah polite', [(0.2, 'blip', -14)], PARTY),
 ('p06', 156.87, 'party', 'Leah: DID YOU MEMORIZE THAT?', [(0.3, 'hit', -14)], PARTY),
 ('p07', 159.87, 'dorm', 'LOOP 20: Kip facepalms. IT SOUNDS REHEARSED. BECAUSE IT IS.', RESET + [(1.4, 'swish', -16)], ROOM),
 ('p08', 162.99, 'card', 'LOOPS 21-26: masks FUNNY / MYSTERIOUS / CASUAL; 50 versions, same polite smile', [(0.05, 'counter', -12), P(0.6), P(1.6), P(2.6), (4.6, 'ding', -14)], None),
 ('p09', 171.49, 'party', 'LOOP 27 MYSTERIOUS: sunglasses indoors; Leah offers a glass of water', [(0.2, 'swish', -14), (5.4, 'pop', -12)], PARTY),
 ('p10', 180.41, 'party', 'LOOP 33 MUSICAL: one chord, very confidently, four minutes', [(3.8, 'hit', -14), (4.6, 'hit', -15), (5.4, 'hit', -16)], PARTY),
 ('p11', 188.23, 'card', 'LOOP 41 FATE: 5 bump-ins on a campus map in one day', [W(), P(1.9), P(2.4), P(2.9), P(3.4), P(3.9)], None),
 ('p12', 193.85, 'park', 'Leah worried: ARE YOU... FOLLOWING ME? Kip: NO. THE UNIVERSE IS.', [(2.6, 'stinger', -18), (4.4, 'ding', -14)], PARK),
 ('p13', 200.07, 'card', 'LOOP 42: you do not say that again (cringe stamp)', [RESET[0], (0.4, 'hit', -10)], None),
 ('p14', 201.91, 'park', 'LOOP 50, sunset: Leah alone on the bench in the quad, staring at the sky', [(0.3, 'shimmer', -18)], NIGHT),
 ('p15', 212.81, 'park', 'Close on Leah on the bench: LIKE SHE\'S TIRED', [], NIGHT),
 ('p16', 217.33, 'card', 'The bench glows: THE MOST IMPORTANT PLACE IN THIS STORY', [(0.1, 'riser', -16), (2.2, 'hit', -12)], None),
 # ---- loops 51 to 400: getting better at life
 ('b01', 222.27, 'park', 'LOOP 51: Kip stops trying and watches the day happen', [(0.2, 'shimmer', -18)], PARK),
 ('b02', 226.73, 'card', 'Unlimited Tuesdays: guitar, cooking (not toast), Japanese from a library book', [W(), P(2.7), P(3.8), P(5.5)], None),
 ('b03', 236.55, 'card', 'REAL NUMBER: FSI, about 88 weeks, around 2,200 class hours for Japanese', [(0.1, 'stinger', -16), (2.2, 'counter', -12), (6.0, 'counter', -12)], None),
 ('b04', 248.57, 'card', 'In a time loop: a lot of Tuesdays (calendar flips)', [W(), (0.6, 'tick', -14)], None),
 ('b05', 251.47, 'park', 'A bike chain snaps at 11:02, a woman drops her phone at 3:40', [(1.9, 'hit', -14), (4.2, 'pop', -12)], PARK),
 ('b06', 258.05, 'park', 'Kip fixes the bike and returns the phone. EVERY SINGLE LOOP', [(0.3, 'ding', -14), (1.4, 'ding', -14)], PARK),
 ('b07', 261.67, 'park', 'LOOP 300, sunset: Kip sits at the other end of Leah\'s bench', [(0.3, 'shimmer', -18)], NIGHT),
 ('b08', 269.59, 'park', 'LONG DAY, HUH? / YOU HAVE NO IDEA. The most real thing in 300 loops', [(2.0, 'shimmer', -18)], NIGHT),
 ('b09', 277.59, 'card', 'LOOPS 301, 302, 303...: the bench every day, hour talks, sky', [(0.05, 'counter', -12), P(1.3), P(2.5), P(4.4)], None),
 ('b10', 284.25, 'park', 'She never mentions yesterday, but seems less tired each day', [(3.7, 'shimmer', -16)], NIGHT),
 ('b11', 290.91, 'diningHall', 'LOOP 400: Kip hums the song at the cafe', [(0.2, 'blip', -14)], CAFE),
 ('b12', 296.43, 'card', 'HUMMING THAT TERRIBLE SONG CHANGES EVERYTHING', [(0.1, 'riser', -16), (2.6, 'hit', -12)], None),
 # ---- midpoint twist: loop 401
 ('t01', 301.41, 'diningHall', 'LOOP 401, 9:14: someone behind Kip is humming too', [(0.2, 'blip', -14), (3.6, 'heartbeat', -14)], CAFE),
 ('t02', 307.29, 'diningHall', 'It\'s Leah, and she knows every word', [(0.1, 'hit', -12)], CAFE),
 ('t03', 310.07, 'diningHall', 'YOU KNOW THIS SONG. / IT\'S... CATCHY. / NO, IT ISN\'T. IT\'S TERRIBLE.', [P(0.2), P(2.0), (3.4, 'hit', -14)], CAFE),
 ('t04', 316.45, 'card', 'The song: out on a Tuesday, 3 weeks ago, nobody played it again... except at 9:14', [W(), (1.2, 'counter', -14), (4.9, 'ding', -12)], None),
 ('t05', 324.21, 'diningHall', 'Leah, quiet: HOW MANY LOOPS ARE YOU ON?', [(0.2, 'heartbeat', -14)], CAFE),
 ('t06', 326.91, 'diningHall', 'Kip: 401.', [(0.2, 'pop', -12)], CAFE),
 ('t07', 328.49, 'diningHall', 'Leah: I\'M ON 1,006. The counter flickers.', [(0.6, 'stinger', -12), (0.7, 'glitch', -14)], CAFE),
 ('t08', 330.73, 'card', 'Bars: YOU 401, LEAH 1,006: 600 loops longer', [W(), (0.5, 'counter', -12), (2.6, 'hit', -12)], None),
 ('t09', 334.57, 'card', 'The coffee order: she watched you order it 1,000+ times', [W(), (1.2, 'counter', -12), (4.0, 'ding', -12)], None),
 # ---- loops 401 to 450: two people, one day
 ('w01', 339.41, 'card', 'NOW THERE ARE TWO OF YOU: two loop counters side by side', [(0.1, 'shimmer', -14), (1.3, 'ding', -12)], None),
 ('w02', 343.01, 'rooftop', 'Kip and Leah sneak into the rooftop observatory', [(0.3, 'shimmer', -16)], NIGHT),
 ('w03', 345.17, 'card', 'Every restaurant in town, in one day, 50 times', [W(), P(0.5), P(1.0), P(1.5), P(2.0), (2.6, 'counter', -14)], None),
 ('w04', 348.83, 'park', 'Kip teaches her guitar; she teaches him Japanese', [(0.4, 'hit', -18), (1.4, 'pop', -14)], PARK),
 ('w05', 352.53, 'diningHall', '9:13 countdown, then both sing loudly and badly while the cafe stares', [(1.5, 'tick', -12), (2.2, 'tick', -12), (2.9, 'tick', -12), (4.0, 'cheer', -20)], CAFE),
 ('w06', 362.15, 'card', 'Her 600 loops alone: juggling, a deer friend in the woods', [W(), P(2.9), P(4.4)], None),
 ('w07', 369.79, 'card', '100 loops in a row asleep, too sad to get up', [(0.2, 'slowmo', -16)], None),
 ('w08', 374.31, 'rooftop', 'Leah on the roof: 600 DAYS OF THE SAME TUESDAY', [], NIGHT),
 ('w09', 380.41, 'party', 'Sam baffled at the two of them: SINCE WHEN ARE YOU TWO A THING?', [P(6.6)], PARTY),
 ('w10', 390.73, 'party', 'Sam: IT\'S BEEN ONE DAY. Leah: SURE, SAM.', [(1.6, 'pop', -12)], PARTY),
 ('w11', 393.59, 'rooftop', 'Leah: the first loop I was supposed to tell someone something important', [(0.2, 'heartbeat', -16)], NIGHT),
 ('w12', 404.71, 'rooftop', 'TELL WHO? She doesn\'t answer.', [(0.2, 'tick', -14)], NIGHT),
 ('w13', 406.25, 'party', 'Every night at 11:58 she leaves: Leah walks out the door', [(0.4, 'clock', -14), (3.6, 'hit', -14)], PARTY),
 # ---- climax: loop 450
 ('c01', 416.59, 'party', 'LOOP 450: Kip reaches the door first. YOU ALWAYS GO AT 11:58. WHY?', [(0.1, 'riser', -16), (3.4, 'heartbeat', -14)], PARTY),
 ('c02', 423.13, 'party', 'Leah: at 11:58 I was going to tell you I liked you, and I walked out', [(0.2, 'heartbeat', -18)], PARTY),
 ('c03', 431.47, 'party', 'If you didn\'t feel the same, I\'d live that answer forever', [(5.6, 'stinger', -18)], PARTY),
 ('c04', 438.11, 'card', '1,006 loops: the exact same reason as you (two hearts)', [W(), (2.0, 'shimmer', -14)], None),
 ('c05', 443.97, 'party', 'Kip has no speech; he threw it away 400 loops ago', [(1.3, 'swish', -14)], PARTY),
 ('c06', 447.85, 'card', 'Flashback, freshman chemistry: goggles upside down, walked into a cabinet', [W(), P(2.2), (6.0, 'impact', -10)], None),
 ('c07', 456.09, 'party', 'Leah laughs: I REMEMBER THE CABINET.', [(0.3, 'pop', -14)], PARTY),
 ('c08', 458.17, 'card', 'The clock: 11:59... 12:00... 12:01', [(0.2, 'clock', -12), (2.1, 'tick', -10), (2.4, 'shimmer', -12)], None),
 # ---- ending
 ('e01', 462.05, 'dorm', '7:00 AM. Kip flinches. The calendar: WEDNESDAY. Counter: blank', [(0.1, 'phonering', -18), (3.9, 'ding', -12)], ROOM),
 ('e02', 467.25, 'card', 'Phone buzz: Leah: OAT LATTE, EXTRA HOT, NO FOAM?', [(0.1, 'phonebuzz', -14), (1.8, 'pop', -12)], None),
 ('e03', 471.37, 'diningHall', 'Cafe, 9:14: the song comes on, both groan, two coffees', [(0.2, 'blip', -14), (3.3, 'pop', -12)], CAFE),
 ('e04', 477.53, 'dorm', 'Sam still has cereal on his hoodie. Some things don\'t need a time loop.', [(0.4, 'pop', -12), (2.4, 'ding', -14)], ROOM),
 ('e05', 482.01, 'card', 'Question: TIME LOOP WITH YOUR CRUSH or NEVER A SECOND CHANCE? Tell me in the comments', [W(), P(1.0), P(2.6), (4.9, 'ding', -12)], None),
]
MUSIC = [(0, 22.67, 'mystery', 0.4), (22.67, 31.79, 'wonder', 0.45), (31.79, 108.55, 'playful', 0.45), (108.55, 129.23, 'tension', 0.45),
         (129.23, 201.91, 'playful', 0.5), (201.91, 222.27, 'calm', 0.4), (222.27, 261.67, 'hopeful', 0.4), (261.67, 296.43, 'calm', 0.4),
         (296.43, 330.73, 'mystery', 0.45), (330.73, 339.41, 'wonder', 0.45), (339.41, 374.31, 'playful', 0.5), (374.31, 380.41, 'sad', 0.4),
         (380.41, 393.59, 'playful', 0.45), (393.59, 416.59, 'mystery', 0.4), (416.59, 458.17, 'sad', 0.45), (458.17, 471.37, 'hopeful', 0.45),
         (471.37, DUR, 'triumph', 0.45)]
shots = []
for k, (sid, st, sset, scene, sfx, amb) in enumerate(ROWS):
    en = ROWS[k + 1][1] if k + 1 < len(ROWS) else DUR
    d = dict(id=sid, start=st, end=en, line='', scene=scene, set=sset, bars=None, **{'in': {'type': 'fade', 'dur': 0.4} if k == 0 else {'type': 'cut'}},
             sfx=[dict(at=a, name=n, gain=g) for a, n, g in sfx if a < en - st], params={}, notes='')
    if amb: d['amb'] = dict(name=amb[0], gain=amb[1])
    shots.append(d)
out = dict(title='What If You and Your Crush Were Stuck in a Time Loop?', duration=DUR, shots=shots, music=[dict(start=a, end=b, mood=m, intensity=i) for a, b, m, i in MUSIC])
json.dump(out, open(os.path.join(os.path.dirname(__file__), 'shots.json'), 'w'), indent=1)
print(len(shots), 'shots, min', round(min(s['end'] - s['start'] for s in shots), 2), 'max', round(max(s['end'] - s['start'] for s in shots), 2))
