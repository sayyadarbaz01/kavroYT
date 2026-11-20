"""story/build_shots.py: writes story/shots.json for "What If Your Luck Doubled Every Hour?" (cuts land on sentence starts). Full video."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
S = lambda at, name, gain=-12, **k: {"at": at, "name": name, "gain": gain, **k}
A = lambda name, gain=-26: {"name": name, "gain": gain}
# (id, start, scene, set, sfx, ambience)  end = next start
CUTS = [
 ("h01", 0.0, "Macro: Kip's brass watch glowing gold, HOUR 24", "card", [S(0.15, "stinger", -10), S(0.6, "tick", -8), S(1.1, "tick", -8)], None),
 ("h02", 1.54, "Suburb: Kip holds up the Powerball ticket, Mom screams, WINNER, 2ND TIME TODAY", "suburb", [S(0.9, "hit", -10), S(1.0, "cheer", -20, dur=2.6), S(2.05, "pop", -12)], A("city", -30)),
 ("h03", 5.26, "Meteor slams the sidewalk where Kip stood; he stepped left to tie his shoe", "suburb", [S(0.95, "whoosh", -10, dur=0.8), S(1.68, "impact", -4), S(1.7, "flash", -8)], A("city", -30)),
 ("h04", 9.76, "Close: Kip kneeling, tying his shoe, smoking crater behind him, 1 SECOND AGO", "suburb", [S(0.1, "pop", -14)], A("wind", -30)),
 ("h05", 13.02, "Drone over Route 33: every traffic light turns green in a wave", "suburb", [S(0.9 + 0.22 * k, "blip", -16, pitch=1 + 0.08 * k) for k in range(7)] + [S(2.3, "shimmer", -14)], A("city", -28)),
 ("h06", 16.9, "Night, across town: Dev's orange car flips over on an empty road, then quiet", "suburbNight", [S(0, "carpass", -12, dur=3.6), S(3.75, "impact", -6), S(4.65, "hit", -8), S(4.7, "glitch", -16)], A("wind", -28)),
 ("h07", 22.34, "Title over a low angle of Kip, watch glowing gold", "suburb", [S(0.05, "stinger", -8), S(0, "whoosh", -14, dur=1.2)], None),
 ("h08", 24.8, "Macro: the second hand ticks, then jumps BACKWARD; tiny 30 engraving glints; red creeps in", "card", [S(0.0, "clock", -14, dur=6.6)] + [S(b, "tick", -6, pitch=0.7) for b in (1.0, 2.6, 4.2, 5.5)] + [S(4.6, "heartbeat", -12, dur=2.0)], None),
 ("d01", 31.48, "Monday hour 0: Kip opens a small package on the sidewalk", "suburb", [S(0.2, "pop", -14)], A("city", -30)),
 ("d02", 36.22, "Macro: the watch in the box with a paper tag WIND ONCE", "card", [S(0.6, "swish", -14)], None),
 ("d03", 39.7, "Macro: winding the crown, TICK, gold flash", "card", [S(0.2, "clock", -16, dur=1.5), S(1.8, "tick", -4), S(1.82, "shimmer", -14)], None),
 ("d04", 42.18, "Bedroom: Dev on the bed eating Kip's cereal", "bedroom", [], A("roomtone")),
 ("d05", 45.66, "Bedroom: coin flips, heads ten times", "bedroom", [S(a - 0.8, "swish", -16) for a in (1.64, 3.1)] + [S(a, "ding", -18, pitch=1 + 0.05 * k) for k, a in enumerate((1.64, 3.1, 4.0, 4.2, 4.4, 4.6, 4.8, 5.0, 5.2, 5.4))], A("roomtone")),
 ("d06", 51.48, "Bedroom: Dev grabs the slice, it falls face down, SPLAT", "bedroom", [S(4.6, "hit", -10), S(4.62, "pop", -12)], A("roomtone")),
 ("d07", 58.2, "Bedroom: the watch ticks louder, HOUR 1, the room leans", "bedroom", [S(0.3, "tick", -4), S(1.3, "tick", -4), S(2.1, "powerup", -12), S(2.6, "riser", -14, dur=3)], A("roomtone")),
 ("d08", 64.8, "Card: roadmap HOUR 6 / HOUR 12 / HOUR 20", "card", [S(0.2, "hit", -12), S(3.3, "hit", -12), S(5.9, "hit", -10)], None),
 ("r01", 73.8, "Card: RULE 1, luck doubles every hour, not +1 but x2", "card", [S(0.1, "hit", -10), S(3.8, "buzz", -14), S(4.4, "ding", -14)], None),
 ("r02", 79.1, "Card: hour 1 x2, hour 2 x4, hour 10 x1,024", "card", [S(0.2, "pop", -12), S(3.0, "pop", -12), S(4.6, "riser", -14, dur=1.0)], None),
 ("r03", 85.8, "Card: the penny trick, day 1 to 30, $5.3 million", "card", [S(2.8, "counter", -14, dur=6.4), S(9.6, "hit", -10)], None),
 ("r04", 97.9, "Card: RULE 2, it doesn't come off, no buckle", "card", [S(0.1, "hit", -10), S(2.2, "pop", -12)], None),
 ("r05", 101.2, "Garage: soap, butter, bolt cutters snap, half hits Dev's shin", "storage", [S(0.3, "pop", -16), S(0.9, "pop", -16), S(1.7, "pop", -16), S(3.4, "impact", -8), S(3.85, "hit", -10)], A("roomtone")),
 ("r06", 106.3, "Garage: Dev hops holding his shin, Kip has no scratch", "storage", [S(2.2, "pop", -12)], A("roomtone")),
 ("r07", 110.3, "Macro: RULE 3, the second hand jumps backward, counting down?", "card", [S(0.1, "hit", -10), S(4.2, "tick", -4, pitch=0.7), S(6.6, "tick", -4, pitch=0.7), S(7.9, "stinger", -12)], None),
 ("r08", 120.2, "Macro: the back of the watch, a tiny 30 and a scratched line", "card", [S(1.0, "shimmer", -14), S(4.4, "hit", -10), S(5.5, "heartbeat", -12, dur=2)], None),
 ("s01", 127.7, "Storm at night: lightning splits the oak tree next to Kip", "suburbNight", [S(3.1, "thunder", -4), S(3.1, "flash", -8)], A("rain", -18)),
 ("s02", 134.7, "Close: Kip calm in the rain, NOT EVEN WET", "suburbNight", [S(1.6, "pop", -14)], A("rain", -20)),
 ("s03", 138.0, "Card: Roy Sullivan, 7 lightning strikes, survived all 7", "card", [S(2.4 + 0.55 * k, "flash", -16) for k in range(7)] + [S(6.4, "hit", -10)], None),
 ("s04", 147.0, "Card: unluckiest? or luckiest? hold that thought", "card", [S(3.2, "thunder", -12)], None),
 ("m01", 153.3, "Kitchen: Kip tells Mom, she crosses her arms, HOUR 4", "kitchen", [], A("roomtone")),
 ("m02", 158.5, "Kitchen: Mom holds up cards, Q hearts 7 clubs A spades, 52/52", "kitchen", [S(2.2, "pop", -12), S(3.2, "pop", -12), S(4.2, "pop", -12), S(5.0, "counter", -14, dur=2)], A("roomtone")),
 ("m03", 166.6, "Kitchen: Mom stunned, NOBODY TELLS YOUR AUNT", "kitchen", [S(2.8, "pop", -14)], A("roomtone")),
 ("j01", 172.8, "Suburb: $50 bills find Kip, then a wallet: keep it, moving to Florida", "suburb", [S(1.6, "ding", -14), S(2.6, "ding", -14), S(8.0, "pop", -12)], A("city", -28)),
 ("j02", 182.9, "Speedway: Kip at the door, a robber in a ski mask walks in", "street", [S(4.0, "heartbeat", -14, dur=3)], A("city", -26)),
 ("j03", 190.4, "Speedway: the gun jams, CLICK, robber slips on a wet spot, out cold", "street", [S(1.0, "tick", -6), S(2.4, "whoosh", -12), S(2.85, "impact", -8)], A("city", -26)),
 ("j04", 197.2, "Speedway: cop car, wanted in 3 states, $10,000 reward, free Slurpee", "street", [S(0, "buzz", -18, dur=2), S(2.2, "counter", -14), S(5.6, "pop", -12)], A("city", -26)),
 ("j05", 205.8, "Card: Powerball hour 12, six balls, odds 1 in 292 million", "card", [S(1.8 + 0.35 * k, "pop", -12, pitch=1 + 0.06 * k) for k in range(6)] + [S(5.1, "hit", -10)], None),
 ("j06", 216.4, "Kroger lot: you win, Mom cries, you cry a little", "suburb", [S(0.1, "stinger", -10), S(0.2, "cheer", -22, dur=2)], A("city", -30)),
 ("j07", 222.1, "Close: the bank letter on the fridge, PAID in red Sharpie", "card", [S(6.2, "swish", -10, dur=0.8)], A("roomtone", -30)),
 ("j08", 231.0, "Kitchen night: Mom stands looking at the fridge for a long time", "kitchen", [], A("roomtone", -28)),
 ("j09", 234.9, "Night highway: Dev with a dead battery, hood up, CLASSIC DEV", "suburbNight", [S(3.9, "pop", -14)], A("wind", -26)),
 ("j10", 240.0, "Cavs game: courtside with Mom, the T-shirt lands in Kip's lap", "gym", [S(4.4, "kick", -10), S(6.7, "hit", -12)], A("cheer", -26)),
 ("j11", 248.3, "Cavs game: half-court shot, SWISH", "gym", [S(3.2, "whoosh", -14), S(5.0, "swish", -6), S(5.1, "cheer", -12, dur=3)], A("murmur", -24)),
 ("j12", 254.2, "Macro: KIP KIP chant, the watch jolts backward, 12 HOURS LEFT", "card", [S(0, "cheer", -14, dur=2.4), S(2.6, "tick", -2, pitch=0.6), S(2.62, "impact", -10), S(6.2, "heartbeat", -12, dur=4)], None),
 ("f01", 266.5, "Drone over the suburb, the camera tilts: THINGS START BENDING", "suburb", [S(0.8, "powerup", -14), S(4.2, "riser", -14, dur=2)], A("wind", -28)),
 ("f02", 272.9, "A school bus skids on black ice and stops 1 inch from Kip", "suburb", [S(0, "carpass", -10, dur=2.6), S(2.6, "hit", -10)], A("city", -28)),
 ("f03", 277.4, "A stray dog trots up with a Rolex in its mouth", "suburb", [S(1.4, "pop", -14)], A("city", -30)),
 ("f04", 280.6, "TV news: THE LUCKIEST KID IN OHIO", "card", [S(0.3, "stinger", -12)], None),
 ("f05", 285.7, "Bedroom night: Dev with his hand in a dish towel, bad week", "bedroom", [], A("roomtone")),
 ("f06", 294.3, "Close: Dev laughs it off but stares at the watch", "bedroom", [S(1.2, "heartbeat", -16, dur=2)], A("roomtone")),
 ("f07", 297.5, "Hour 20: a black SUV outside; a hedge fund texts: rent you by the hour", "suburb", [S(2.6, "phonebuzz", -12)], A("city", -28)),
 ("f08", 304.7, "Kitchen: two men in dark suits slide $50,000,000 across the table", "kitchen", [S(5.0, "swish", -12)], A("roomtone")),
 ("f09", 315.4, "Kitchen: no, NO, we'll come back at hour 30, how do they know?", "kitchen", [S(1.0, "hit", -12), S(5.9, "stinger", -10)], A("roomtone")),
 ("v01", 323.8, "TV news: the worst luck in Ohio, lost job, dog, phone, then the car", "card", [S(7.1, "pop", -14), S(7.8, "pop", -14), S(8.6, "pop", -14), S(11.2, "hit", -8)], None),
 ("v02", 337.6, "Close: Kip shocked, it's Dev's car", "suburb", [S(0.1, "impact", -12)], A("wind", -30)),
 ("v03", 345.8, "Four panels: the pizza, his shin, the battery, his job, each a backward tick", "card", [S(0.25 + 0.85 * k, "tick", -4, pitch=0.7) for k in range(4)], None),
 ("v04", 349.8, "Card: it was never counting down, IT TAKES, gold flows from Dev to you", "card", [S(2.0, "riser", -14, dur=1.6), S(2.4, "hit", -8)], None),
 ("v05", 357.9, "Car window: rip up a scratcher, the wind blows it back, $500 winner", "card", [S(1.2, "swish", -12), S(2.2, "whoosh", -12), S(4.6, "whoosh", -12), S(6.2, "ding", -12), S(9.6, "hit", -10)], A("wind", -24)),
 ("v06", 370.1, "Phone: calling Dev... no answer", "card", [S(0.3, "phonering", -14, dur=1.6)], None),
 ("v07", 372.2, "Macro: HOUR 24, x16,777,216; recap panels: Powerball, meteor, empty road", "card", [S(0.1, "tick", -4), S(1.6, "powerup", -12), S(5.7, "hit", -10), S(9.5, "hit", -10), S(10.6, "impact", -10)], None),
 ("h11", 385.6, "Hospital: Dev in bed with an arm cast, I think I'm cursed", "hospital", [S(0.9, "pop", -14)], A("hum", -26)),
 ("h12", 393.2, "Close: Dev holding the warm, dented Dr Pepper", "hospital", [], A("hum", -26)),
 ("t01", 401.1, "Macro: hour 29, zoom on the scratched line, it is tiny words", "card", [S(0.1, "tick", -8), S(3.6, "shimmer", -12)], None),
 ("t02", 408.4, "Card: LUCK CAN'T BE MADE. ONLY MOVED.", "card", [S(0.1, "stinger", -8)], None),
 ("t03", 411.2, "Hospital: Kip by the bed, hour 30 = a billion, unless you move it", "hospital", [S(0.3, "heartbeat", -14, dur=4)], A("hum", -26)),
 ("t04", 418.5, "Card: college, a house for Mom, a cure, grandpa had this watch", "card", [S(2.4, "pop", -12), S(3.8, "pop", -12), S(5.6, "pop", -12), S(8.4, "shimmer", -14)], None),
 ("t05", 430.5, "Hospital: Dev asleep holding the can, it's not even close", "hospital", [], A("hum", -26)),
 ("t06", 438.0, "Hospital: Kip holds Dev's hand, winds the watch backward, TICK", "hospital", [S(2.0, "clock", -14, dur=2), S(4.0, "tick", -2, pitch=0.6), S(4.02, "shimmer", -10)], A("hum", -28)),
 ("t07", 442.7, "Hospital: gold light pours from Kip into Dev; lottery money, $50s, green lights GONE", "hospital", [S(0.2, "riser", -12, dur=2), S(2.6, "whoosh", -16), S(3.8, "whoosh", -16), S(4.8, "whoosh", -16), S(6.6, "hit", -10)], A("hum", -28)),
 ("t08", 451.4, "Phone: boss wants him back Monday, the shelter found his dog", "card", [S(0.1, "phonebuzz", -12), S(1.3, "blip", -12), S(3.1, "blip", -12)], None),
 ("t09", 457.7, "Macro: the watch stops, JUST A WATCH", "card", [S(0.3, "tick", -8), S(0.9, "tick", -10)], None),
 ("t10", 462.7, "Night: the black SUV pulls up, two suits look at the wrist, you actually gave it back", "suburbNight", [S(0, "carpass", -12, dur=2.4), S(8.7, "pop", -16)], A("wind", -28)),
 ("t11", 473.5, "Night: the SUV drives away, they've done this before", "suburbNight", [S(0.8, "carpass", -12, dur=3), S(4.2, "stinger", -12)], A("wind", -28)),
 ("e01", 480.1, "A week later: Dev with a cast digs a quarter out of the couch", "bedroom", [S(0.2, "whoosh", -16)], A("roomtone")),
 ("e02", 484.3, "Coin flip: TAILS, you lose, both laugh", "bedroom", [S(0, "swish", -14), S(0.8, "ding", -12), S(1.0, "cheer", -24, dur=1.5)], A("roomtone")),
 ("e03", 487.9, "End card: KEEP or GIVE IT BACK? Comment", "card", [S(4.5, "hit", -10), S(4.9, "hit", -10)], None),
]
END = 494.45
MUSIC = [(0, 16.9, "triumph", 0.6), (16.9, 22.34, "dark", 0.5), (22.34, 73.8, "mystery", 0.55), (73.8, 127.7, "wonder", 0.5), (127.7, 172.8, "mystery", 0.5), (172.8, 266.5, "playful", 0.6),
         (266.5, 323.8, "tension", 0.55), (323.8, 401.1, "dark", 0.55), (401.1, 457.7, "sad", 0.5), (457.7, 480.1, "mystery", 0.45), (480.1, END, "hopeful", 0.55)]
shots = []
for i, (sid, a, scene, st, sfx, amb) in enumerate(CUTS):
    b = CUTS[i + 1][1] if i + 1 < len(CUTS) else END
    d = {"id": sid, "start": a, "end": b, "line": "", "scene": scene, "set": st, "bars": None, "in": {"type": "fade", "dur": 0.3} if i == 0 else {"type": "cut"}, "sfx": sfx, "params": {}, "notes": ""}
    if amb: d["amb"] = amb
    shots.append(d)
music = [{"start": a, "end": b, "mood": m, "intensity": k} for a, b, m, k in MUSIC]
json.dump({"title": "What If Your Luck Doubled Every Hour?", "duration": END, "music": music, "shots": shots}, open(os.path.join(H, "shots.json"), "w", encoding="utf-8"), indent=1)
print(len(shots), "shots, duration", END)
