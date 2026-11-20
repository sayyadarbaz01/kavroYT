"""Build story/shots.json and scenes/all.js from the shot table below.
Each row: (approx start s, template, params, scene description[, extras]). Starts snap to the nearest word start,
then move 0.15 s earlier. Run: python3 story/build_shots.py (from the project folder)."""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__)); PROJ = os.path.dirname(HERE)
words = json.load(open(os.path.join(PROJ, 'timeline/words.json')))['words']
cfg = json.load(open(os.path.join(PROJ, 'config.json')))
DUR = round(cfg['duration'] + 1.5, 2)

def Y(x=-200, pose='stand', expr='neutral', **k): return dict(w='you', x=x, pose=pose, expr=expr, **k)
def C(w, x=200, pose='stand', expr='neutral', facing=-1, **k): return dict(w=w, x=x, pose=pose, expr=expr, facing=facing, **k)
def S(loc, cast=(), size='wide', **k): return ('stage', dict(loc=loc, cast=list(cast), size=size, **k))
def F(expr, loc, who='you', **k): return ('face', dict(expr=expr, loc=loc, who=who, **k))
def I(obj, loc='park', **k): return ('insert', dict(obj=obj, loc=loc, **k))
def B(kind, **k): return ('bp', dict(kind=kind, **k))
def G(cities, **k): return ('globe', dict(cities=cities, **k))
def L(s, loc='parkSunset', **k): return ('line', dict(str=s, loc=loc, **k))
def T3(v, **k): return ('t3d', dict(v=v, **k))
def MT(locs, **k): return ('montage', dict(locs=locs, **k))

R = []
def row(t, spec, scene, **x): R.append((t, spec, scene, x))

# ---------------- ACT 1: wonder ----------------
row(0.0, S('park', [Y(-120, 'lie', 'sleepy', rot=-1.5707, still=1, exprs=[[1.6, 'neutral']])], extraBack='birds', cam='pull'), 'Wide park at golden morning, you lie on the grass waking, birds overhead, slow pull-out', bars='scope', **{'in': {'type': 'fade', 'dur': 0.8}})
row(2.6, S('park', [Y(-60, 'sit', 'smile', poses=[[0, 'sit'], [1.2, 'sitBack']])], size='med', extraBack='birds', fg='plant'), 'Medium: you sit up on the grass, birds chirping in the tree, plant foreground')
row(4.3, F('confused', 'park', look=[0.6, -0.2]), 'Giant face: you look around, the world looks strangely ordinary')
row(6.5, F('thinking', 'park', exprs=[[0.6, 'surprised']], sparkles=1), 'Giant face: a faint cyan shimmer circles your head, "anything but normal"', **{'in': {'type': 'cut'}})
row(8.5, I('hand', 'park', glow=0.6), 'Insert: your hand tingles with cyan particles')
row(10.6, S('park', [Y(-40, 'holdFront', 'awe')], size='med', extra='ripple', rippleX=-40), 'Medium: you stare at your glowing hands, rings of potential pulse')
row(12.6, S('park', [Y(-120, 'stand', 'determined', tp='out', at='vanish')], size='med'), 'Medium park: with a thought you vanish in a cyan particle burst')
row(15.3, S('beach', [Y(-200, 'stand', 'awe', tp='in', at=0.3)]), 'Wide beach at golden hour: you reappear in a column of light, waves behind')
row(18.3, I('feet', 'beach'), 'Insert: bare feet on warm damp sand, the tide washes in')
row(20.2, S('beach', [Y(-300, 'relaxed', 'smile')], cam='right'), 'Wide beach: you stand at the water line, the morning tide rolls in')
row(22.5, F('awe', 'beach', vision='tokyo'), 'Giant face, awe: a vision bubble flashes images of distant cities')
row(25.0, G(['BEACH', 'HIGHLANDS', 'PARIS', 'TOKYO'], plane=1), 'Blueprint globe: arcs jet across continents, a plane icon gets crossed out')
row(28.8, S('tokyo', [Y(-160, 'stand', 'joy', tp='in', at=0.2)], cam='left'), 'Wide Tokyo at night: neon signs, you pop in on the street')
row(31.0, S('tokyo', [Y(-60, 'wave', 'happy')], size='med', crowdFg=1, cheer=0.1), 'Medium: you wave in bustling Tokyo, crowd heads blurred in front')
row(32.4, S('highlands', [Y(-200, 'cheer', 'joy', tp='in', at=0.2)], cam='pull'), 'Wide Scottish Highlands: misty hills, standing stones, you appear arms raised', **{'in': {'type': 'whip', 'dir': 1}})
row(36.3, ('title', dict(lines=['WHAT IF', 'YOU COULD TELEPORT?'])), 'Title card over the dusk park, faint cyan particles', bars='scope', **{'in': {'type': 'flash', 'dur': 0.4}})
row(39.6, B('speed'), 'Blueprint: a thought travels brain to pin instantly, TRAVEL TIME 0.000 s')
row(42.0, F('joy', 'highlands'), 'Giant face, grinning: sounds amazing, right?')
row(43.3, B('compare', rows=[{'label': 'AIRCRAFT', 'v': 0.92}, {'label': 'YOU', 'v': 0.02}]), 'Blueprint bars: aircraft crawls across the globe, you are instant')
row(48.2, S('beach', [Y(-100, 'stand', 'worried')], mood='dusk', cam='push'), 'Wide beach at dusk: you look down at the dark water, much beneath the surface')
row(52.2, B('scan'), 'Blueprint: your line figure is scanned, labels MIND and BODY')
row(55.9, B('dis'), 'Blueprint: your figure disassembles into a cloud of atoms')
row(59.6, B('re'), 'Blueprint: the atoms fly across and reassemble in flawless order')
row(63.7, B('misplace'), 'Blueprint grid: one red atom drifts out of place', **{'in': {'type': 'flash', 'dur': 0.3}})
row(67.8, B('map'), 'Blueprint grid with question marks: does it remember where everything was?')
row(71.4, F('worried', 'parkSunset', glitch=0.15), 'Giant face, worried, a first faint glitch: hazardous and personal')
row(76.6, I('clock', 'bedroom', mode='spin', plane=1), 'Insert: a clock spins wildly, plane crossed out: the cost beyond jet lag')
row(80.7, L('THE RULES', 'park'), 'Chapter line THE RULES over the blurred park', **{'in': {'type': 'dip', 'dur': 0.6}})
row(82.2, F('sleepy', 'park', vision='himalaya'), 'Giant face eyes closed, a vision of a destination forms')
row(85.4, B('lock', vision='himalaya'), 'Blueprint: the mental picture of the peaks zooms out of your head and locks')
row(88.2, S('himalaya', [Y(-180, 'stand', 'awe', tp='in', at=0.3)], cam='pull'), 'Wide Himalayas: snowy peaks, snow blowing, you appear in a light column')
row(91.0, F('awe', 'himalaya', side=1), 'Giant face in awe, snow drifting, wind-chilled air')
row(94.1, S('himalaya', [Y(-40, 'cheer', 'joy')], size='med'), 'Medium: you throw your arms up on the summit')
row(96.0, L('EVERY LEAP HAS RULES', 'himalaya'), 'Line EVERY LEAP HAS RULES over the blurred peaks')
row(98.5, B('meter', label='ENERGY NEEDED'), 'Blueprint energy meter fills to the red')
row(101.5, B('nuke', at='nuclear'), 'Blueprint: a mushroom cloud draws itself, label ≈ 1 NUCLEAR BOMB', **{'in': {'type': 'flash', 'dur': 0.3}})
row(104.6, S('bedroom', [Y(-260, 'stand', 'sleepy', tp='out', at=1.8)], size='med'), 'Medium bedroom at sunrise: you step from bed and vanish')
row(107.6, S('office', [Y(-120, 'stand', 'neutral', tp='in', at=0.2)], size='med', extra='emp', empAt=0.3), 'Medium office: you land at your desk, a shock ring rolls out')
row(110.0, S('street', [Y(-500, 'stand', 'smile', walk=1)], extra='sunOrb'), 'Wide street: you walk with a tiny blazing sun hovering beside you')
row(112.3, B('precision'), 'Blueprint crosshair: one atom snaps exactly to centre, PRECISION')
row(115.1, B('count', at='7'), 'Blueprint: atom figure, big readout 7 × 10^27 ATOMS IN YOUR BODY')
row(119.2, B('cycle'), 'Blueprint: atoms unpack and repack in a loop')
row(123.4, B('slots'), 'Blueprint: atoms fly into their exact grid slots one by one')
row(125.5, F('awe', 'lab', sparkles=1), 'Giant face, wonder, sparkles: practically magic')
row(128.6, B('impossible'), 'Blueprint: atoms jitter, red X: IMPOSSIBLE (FOR NOW)')
row(132.6, S('street', [Y(-300, 'stand', 'smile', tp='both', at=0.3, at2=1.8)], cam='right'), 'Wide street: you pop in and out of a sidewalk spot')
row(135.5, S('street', [], extra='ripple', cam='push'), 'Wide street: the empty spot you left ripples, energy distorting the air')
row(141.1, S('lab', [C('doc', -160, 'point', 'thinking', facing=1), Y(220, 'stand', 'worried', facing=-1)], size='med', extra='chart', chartLabel='MOLECULAR DISASSEMBLY'), 'Medium lab: the scientist points at a rising chart: molecular disassembly', **{'in': {'type': 'dip', 'dur': 0.5}})
row(145.3, F('confused', 'lab', glitch=0.3), 'Giant face glitching: losing your sense of self')
row(149.8, S('electronics', [Y(-300, 'stand', 'neutral')], size='wide'), 'Wide room of screens: everything that relies on electronics')
row(154.0, S('electronics', [Y(-100, 'stand', 'nervous', tp='out', at=1.2)], extra='sparks', sparkAt=1.3), 'You vanish and the screens spark and die')
row(158.0, S('paris', [Y(-260, 'stand', 'smile', tp='in', at=0.3)], cam='left'), 'Wide Paris café street, Eiffel Tower in the distance, you appear for lunch')
row(161.1, S('paris', [], extra='laptops', cam='right'), 'Wide: a row of laptops on café tables spark in your wake')
row(164.4, G(['HOME', 'PARIS', 'TOKYO', 'NEW YORK']), 'Globe: glamorous arcs hop around the world')
row(169.2, S('bedroomNight', [C('friend', 200, 'sit', 'shocked', facing=-1, y=-70), Y(-260, 'wave', 'smile', tp='in', at=0.3)], size='med'), 'Medium night bedroom: you appear at 3 a.m., your friend sits up in bed shocked')
row(173.9, I('clock', 'bedroomNight', mode='spin'), 'Insert: clock hands whirl, jet lag without the jet')
row(177.6, F('determined', 'streetNight', veins=1, aura=1, flashes=1), 'Giant face, energy glowing in your veins, camera flashes around you')
row(181.0, I('dice', 'void'), 'Insert: two glowing atom dice tumble through space: a cosmic gamble')
row(184.4, L('THE RISKS ARE BIGGER', 'parkSunset', red=1), 'Line THE RISKS ARE BIGGER in red over the dusk park')

# ---------------- ACT 2: joyride ----------------
row(188.3, S('bedroom', [Y(-80, 'cheer', 'determined')], size='med'), 'Medium bedroom morning: you stretch, ready to test the power', **{'in': {'type': 'dip', 'dur': 0.6}})
row(191.2, T3('traffic', label='TUESDAY 8:14'), '3D: crane down over a gridlocked street of cars')
row(194.1, F('smirk', 'street'), 'Giant face, smirk: but not for you')
row(195.8, S('street', [Y(-100, 'think', 'sleepy')], extraBack='cars', size='med', cam='push'), 'Medium: you stand among stuck cars, eyes closed, picturing the living room')
row(199.9, S('living', [Y(-160, 'sit', 'smile', tp='in', at=0.4, y=-60), C('friend', 260, 'handsOnHead', 'shocked')], size='med'), 'Medium living room: you pop onto the couch, friend jumps in shock')
row(204.5, S('living', [Y(-160, 'sitBack', 'smirk', y=-60), C('friend', 260, 'shrug', 'confused')], size='med', badge='1ST', badgeAt=1.0), 'Medium: you lounge, badge 1ST: always first to arrive')
row(208.6, F('thinking', 'kitchen'), 'Giant face thinking: need groceries?')
row(210.2, S('grocery', [Y(-200, 'stand', 'happy', tp='in', at=1.0)], cam='left'), 'Wide supermarket aisle: shelves of bread and produce, you appear')
row(214.5, S('grocery', [C('plain', 300, 'stand', 'sleepy', facing=1), C('plain', 420, 'stand', 'neutral', facing=1), C('plain', 540, 'phone', 'neutral', facing=1, prop='phone'), Y(-300, 'stand', 'smile', tp='both', at=0.3, at2=2.8)], size='wide'), 'Wide: a queue waits at the counter, you pop in and out past it')
row(218.7, S('lawn', [Y(-260, 'stand', 'smile', tp='in', at=0.2), C('plain', 300, 'facepalm', 'confused')], extra=['bags', 'keys'], keysX=520), 'Wide lawn: you arrive with groceries while a neighbour still pats for his car keys')
row(223.0, I('phone', 'living'), 'Insert: phone message with the Eiffel Tower: LUNCH?')
row(227.8, S('kitchen', [Y(-200, 'think', 'sleepy')], size='med', extra='thought', vision='paris'), 'Medium kitchen: you stand eyes closed, a vision of the Eiffel Tower forms')
row(233.0, S('paris', [Y(-200, 'sit', 'happy', tp='in', at=0.3, y=-10), C('friend', 220, 'sit', 'joy', facing=-1)], size='med', extra=['chairs', 'table']), 'Medium Paris café: you appear seated across from your friend, Eiffel in view')
row(236.6, I('cup', 'paris'), 'Insert: espresso steams, the Eiffel Tower blurred behind')
row(239.6, S('paris', [Y(-200, 'sitBack', 'smirk'), C('friend', 220, 'sit', 'happy', facing=-1)], size='med', extra=['chairs', 'table'], cam='push'), 'Medium: you lean back smirking, cheating reality itself')
row(243.8, MT(['living', 'beach', 'street', 'paris'], expr='joy'), 'Montage: you pop into one place after another, surprise visits and escapes')
row(248.3, S('living', [C('friend', 200, 'sad', 'sad'), Y(-200, 'wave', 'smile', tp='in', at=0.8)], size='med'), 'Medium living room: your sad friend, then you appear with a wave')
row(252.9, I('clock', 'office', mode='stop'), 'Insert: clock hands settle and stop: never late again')
row(255.3, B('network'), 'Blueprint: phones light up one by one, the news spreads')
row(258.3, S('party', [Y(-60, 'cheer', 'joy'), C('plain', -460, 'cheer', 'happy', facing=1), C('plain', 400, 'cheer', 'happy')], extra='confetti', crowdFg=1), 'Wide party at night: coloured lights, confetti, you in the centre')
row(260.2, G(['HAWAII', 'NEW YORK', 'MARRAKECH', 'PARIS']), 'Globe: weekend arcs hop across oceans')
row(265.0, S('ocean', [], extra=['swim', 'dolphins'], cam='right'), 'Wide ocean: you swim as dolphins leap off the Hawaiian coast')
row(268.2, S('broadway', [Y(-120, 'cheer', 'joy', tp='in', at=0.2)], crowdFg=1), 'Wide Broadway at night: marquee lights, you pop in by the crowd')
row(271.2, F('smile', 'marrakech'), 'Giant face, smiling, warm lantern light: a quiet evening?')
row(274.2, S('marrakech', [Y(-200, 'stand', 'smile', walk=0.8)], cam='left'), 'Wide Marrakech market at dusk: lanterns glow, you stroll past stalls')
row(278.4, MT(['grocery', 'office', 'living'], expr='happy'), 'Montage: errands, tasks, visits, instantly')
row(283.0, G(['HOME'], planet=1), 'You stand on top of a tiny planet: the world is your playground')
row(288.0, I('clock', 'office', mode='gold'), 'Insert: a golden clock under falling coins: tycoon of hours')
row(291.8, S('park', [Y(-60, 'cheer', 'joy')], size='med', extra='ripple', rippleX=-60), 'Medium park: you laugh with sparkles of power all around')

# ---------------- ACT 3: fame ----------------
row(296.8, S('parkSunset', [Y(-200, 'relaxed', 'neutral')], cam='pull'), 'Wide park at dusk, clouds gathering: adventures change course', **{'in': {'type': 'dip', 'dur': 0.6}})
row(300.2, S('street', [Y(-80, 'stand', 'nervous'), C('plain', 260, 'point', 'surprised'), C('plain', 420, 'phone', 'surprised', prop='phone'), C('plain', -420, 'point', 'shocked', facing=1)], size='wide'), 'Wide street: passers-by point and raise phones at you')
row(304.9, I('tv', 'living'), 'Insert: TV BREAKING NEWS, a silhouette appears from thin air')
row(307.7, S('streetNight', [Y(0, 'stand', 'surprised')], size='med', extra='flashes', crowdFg=1), 'Medium night: camera flashes pop around you')
row(310.2, I('magazine', 'office'), 'Insert: magazine cover THE TELEPORTER, a blurred faceless figure')
row(316.9, S('streetNight', [Y(-40, 'wave', 'nervous')], size='med', extra=['rope', 'flashes'], crowdFg=1), 'Medium: red carpet, ropes, flashbulbs: fame wraps you up')
row(318.7, S('streetNight', [Y(-200, 'wave', 'smile', walk=0.5)], extra=['rope', 'flashes']), 'Wide red carpet: you walk into the world of celebrity')
row(322.6, S('studio', [C('host', -380, 'explain', 'happy', facing=1), Y(300, 'sit', 'nervous', facing=-1, y=-60)], size='med', crowdFg=1, cheer=0.8), 'Wide talk show: host gestures, you sit on the couch, audience heads in front')
row(327.6, I('books', 'office'), 'Insert: stacks of THE TELEPORTER books, BESTSELLER badge')
row(333.0, I('journal', 'lab'), 'Insert: science journal cover with an atom diagram')
row(337.6, S('streetNight', [Y(-160, 'stand', 'smile', tp='both', at=0.3, at2=2.6)], extra='flashes'), 'Wide: you teleport across the world, flashes in your wake')
row(341.3, B('stairs'), 'Blueprint: your figure jumps step by step from UNKNOWN to RENOWNED')
row(345.3, F('nervous', 'streetNight', mics=1, flashes=1), 'Giant face, nervous, microphones push in from every side')
row(347.1, T3('lab'), '3D: orbit around a lab, a scanning ring rises around you as the scientist points', **{'in': {'type': 'dip', 'dur': 0.5}})
row(353.0, S('lab', [C('doc', -200, 'holdFront', 'smile', facing=1, prop='tablet'), Y(260, 'stand', 'neutral', facing=-1)], size='med'), 'Medium lab: the scientist with a tablet, eager to study you')
row(355.4, S('lab', [Y(520, 'stand', 'nervous', x_=1)], extra='scanbeam'), 'Wide lab: you stand inside the scanner ring, a beam sweeps you')
row(359.6, S('lab', [C('doc', -300, 'explain', 'happy', facing=1), C('doc', -560, 'think', 'thinking', facing=1), Y(240, 'stand', 'confused', facing=-1)], size='med', extra='chart', chartLabel='THEORY #47'), 'Medium: two scientists argue theories in front of a chart')
row(362.6, F('nervous', 'lab'), 'Giant face, nervous: it is also a lot')
row(364.3, I('calendar', 'hotel'), 'Insert: a calendar fills up block by block')
row(370.2, MT(['studio', 'lab', 'hotel'], expr='neutral'), 'Montage: interview, experiment, hotel suite')
row(375.6, S('hotel', [Y(-60, 'sit', 'sleepy', y=-60)], size='med'), 'Medium hotel suite at night: you sit on the bed, tired')
row(378.9, F('worried', 'hotel', glitch=0.2, cool=0.2), 'Giant face, worried, a cold glitch: the magic tightens its grip')

# ---------------- ACT 4: the cost ----------------
row(383.7, S('streetNight', [Y(-120, 'kneel', 'sad', tp='in', at=0.3)], size='med'), 'Medium: you land from a jump and sink to one knee', **{'in': {'type': 'dip', 'dur': 0.5}})
row(386.4, B('cracks', label='A SUBTLE SHIFT'), 'Blueprint: hairline red cracks spread through your atom figure')
row(392.0, S('lab', [C('doc', -200, 'point', 'worried', facing=1), Y(240, 'stand', 'worried', facing=-1)], size='med', extra='chart'), 'Medium lab: the scientist warns, chart MOLECULAR TENSION climbs red')
row(398.6, S('streetNight', [Y(-500, 'sad', 'sad', walk=0.6)], extra='weight'), 'Wide night street: you trudge with a dark weight hanging on you')
row(401.5, B('counter', at=0.3), 'Blueprint gears turn, a JUMPS counter climbs: COST ???')
row(407.9, F('nervous', 'streetNight', glitch=0.45), 'Giant face with a heavy glitch: subtle glitches')
row(410.3, I('roulette', 'void'), 'Insert: a roulette wheel spins with a glowing atom ball')
row(413.6, S('kitchen', [], extra='thought', vision='kitchen', cam='push'), 'Wide: your kitchen, the destination you think you are going to')
row(416.5, S('lawn', [Y(-160, 'stand', 'shocked', tp='in', at=0.2), C('neighbor', 340, 'holdFront', 'shocked', facing=-1)], extra='hose'), 'Wide: you land on the neighbour’s lawn, the neighbour drops the hose')
row(420.0, S('streetNight', [Y(-60, 'wave', 'smile')], size='med', extra='flashes'), 'Medium: still smiling for the flashes, the envy of many')
row(421.8, F('thinking', 'streetNight', exprs=[[1.2, 'worried']]), 'Giant face: the smile fades into a nagging thought')
row(426.1, S('parkSunset', [Y(-60, 'stand', 'confused')], size='med', glitch=0.25), 'Medium park at dusk, the picture blurs and glitches around you')
row(432.4, S('storm', [Y(-300, 'stand', 'worried')], cam='pull'), 'Wide: storm clouds gather over the city, distant lightning: calm before the storm')
row(437.0, T3('storm', label='REALITY CHECK'), '3D: a dark rain-soaked city, camera sinks toward you', **{'in': {'type': 'dip', 'dur': 0.5}})
row(440.8, F('scared', 'storm', glitch=0.3), 'Giant face in the rain, scared: something unsettling')
row(444.4, B('drain', label='YOUR ENERGY'), 'Blueprint: your energy battery drains to red')
row(449.7, B('nuke', fig=1, at='nuclear'), 'Blueprint: your figure = a nuclear blast, every teleport', **{'in': {'type': 'flash', 'dur': 0.3}})
row(454.7, S('parkSunset', [Y(-60, 'kneel', 'sad')], size='med', warn=0.15), 'Medium park: you kneel, exhausted and drained')
row(457.8, B('count', at='billion', long=1), 'Blueprint: 7,000,000,000,000,000,000,000,000,000 types out digit by digit')
row(463.0, B('slots', label='ONE BY ONE'), 'Blueprint: each atom moved precisely, one by one')
row(467.9, B('cracks'), 'Blueprint: cracks spread: HIDDEN COSTS')
row(472.4, I('scale', 'void', left='JUMPS', right='YOU', tip=0.3), 'Insert: a balance scale tips as the jumps pile up')
row(477.1, S('parkSunset', [Y(-60, 'facepalm', 'nervous')], size='close', glitch=0.35), 'Close: you scratch at a flickering arm, a small glitch')
row(481.9, S('electronics', [Y(-300, 'stand', 'neutral')], cam='push'), 'Wide room of screens and desks: and then the electronics', **{'in': {'type': 'dip', 'dur': 0.4}})
row(485.3, S('electronics', [Y(-100, 'stand', 'surprised', tp='in', at=0.2)], extra=['emp', 'sparks'], empAt=0.3, sparkAt=0.4), 'You appear: a shock ring, screens spark and crash')
row(487.9, I('phone', 'electronics', frozen=1), 'Insert: a phone screen freezes in coloured static')
row(489.7, S('office', [Y(-120, 'stand', 'scared')], size='med', extra='sparks', sparkAt=0.1), 'Medium office: the lights flicker on and off')
row(491.6, S('lab', [C('doc', -120, 'shrug', 'nervous', facing=1), Y(260, 'crossArms', 'angry', facing=-1)], size='med'), 'Medium lab: the scientist shrugs, you cross your arms')
row(495.5, S('office', [Y(-100, 'stand', 'nervous', tp='in', at=0.2)], extra=['emp', 'sparks'], empAt=0.3, sparkAt=0.3), 'Office: you enter, a short-circuit symphony of sparks')
row(500.4, B('emp'), 'Blueprint: EMP rings radiate from your figure, devices spark: WALKING EMP')
row(503.5, F('nervous', 'office'), 'Giant face, sheepish and sweating: talk about disruptive')
row(505.0, S('streetNight', [Y(-500, 'sad', 'sad', walk=0.5)], extra='weight'), 'Wide: you walk bent under a heavy burden')
row(510.3, ('rope', dict(expr='nervous')), 'You walk a tightrope high above the night city')
row(515.0, F('scared', 'storm', warn=0.25), 'Giant face, scared, red pulse: the real nightmare creeps in')
row(517.3, B('precision', off=1), 'Blueprint crosshair: the atom misses centre: MISCALCULATION')
row(519.5, S('streetNight', [Y(-200, 'stand', 'worried')], extra='shadows', cam='pull'), 'Wide dark street: your shadow stretches long, the darker it gets')
row(522.9, S('streetNight', [Y(0, 'wave', 'smile')], size='med', extra='flashes', crowdFg=1), 'Medium: you smile for the cameras, always the star')
row(526.6, F('sad', 'streetNight', flashes=1), 'Giant face, sad, flashes behind: are you doing irreparable harm?')
row(530.6, S('hotel', [Y(-60, 'sit', 'sad', y=-60)], size='med', cool=0.2), 'Medium hotel: you sit alone, the dream turned dreary')
row(534.9, ('rope', dict(expr='scared', wobble=3)), 'Tightrope: the rope sways harder: when might this dance falter?')
row(541.7, B('spiral'), 'Blueprint: your atoms spiral inward: OUT OF CONTROL')

# ---------------- ACT 5: horror and reflection ----------------
row(543.4, S('parkSunset', [Y(-200, 'stand', 'neutral')], cam='pull'), 'Wide park at sunset again, things have shifted', **{'in': {'type': 'dip', 'dur': 0.8}})
row(546.6, S('parkSunset', [Y(-60, 'ready', 'determined', tp='fail', at=0.6)], size='med', warn=0.15), 'Medium: you try another hop, the teleport sputters red')
row(550.2, F('shocked', 'parkSunset', glitch=0.25), 'Giant face, shocked: something is off')
row(551.4, S('parkSunset', [Y(-60, 'kneel', 'scared')], size='med', glitch=0.4, warn=0.2), 'Medium: you clutch your chest and drop to a knee, your body protests')
row(555.2, ('freeze', dict(badge='UNSTABLE', glitch=0.15)), 'FREEZE: your body mid-breakup, atoms hanging in the air, badge UNSTABLE', bars='scope', **{'in': {'type': 'flash', 'dur': 0.4}})
row(561.2, B('scramble'), 'Blueprint: atoms swap places and colours: IDENTITY SCRAMBLED')
row(564.9, B('rules'), 'Blueprint grid: red atoms break out of their slots: RULES BROKEN')
row(569.0, F('scared', 'void', glitch=0.6), 'Giant face dissolving in glitches: losing touch with yourself')
row(574.2, S('parkSunset', [Y(-60, 'stand', 'scared', trail={'count': 4, 'dx': -50, 'a': 0.3})], size='med', glitch=0.3), 'Medium: ghost copies trail behind you, a threat to who you are')
row(580.8, ('mirror', dict()), 'Bathroom mirror: your reflection shifts colour and smirks back at you', bars='scope')
row(585.1, ('freeze', dict(badge='DISASSEMBLY', expr='cry', loc='bathroom')), 'FREEZE: your body breaking into particles in the bathroom: not fiction', **{'in': {'type': 'flash', 'dur': 0.3}})
row(589.9, MT(['parkSunset', 'streetNight', 'void'], expr='worried', glitch=0.35), 'Montage of jumps, your presence twisting, shading')
row(594.5, S('void', [Y(-60, 'stand', 'scared', tp='ghost')], size='med', glitch=0.3), 'Medium in the void: your body flickers between shades')
row(597.1, B('wrong'), 'Blueprint: you reassemble with limbs out of place')
row(600.4, S('void', [Y(-60, 'sad', 'cry', alpha=0.5)], size='med', glitch=0.25, cool=0.3), 'Medium void: you fade toward nothing, risk of erasing yourself')
row(606.7, L('WILL YOU VANISH?', 'void', red=1), 'Line WILL YOU VANISH? in the void')
row(610.6, F('confused', 'void', glitch=0.4), 'Giant face, confused: what makes you, you?')
row(612.2, ('fall', dict()), 'You fall through a dark void, atoms streaming off')
row(618.0, F('scared', 'storm', shakeAmp=6), 'Giant face in the storm, primal terror')
row(625.2, I('scale', 'void', left='TRAVEL', right='EXISTENCE', tip=0.35), 'Insert: the scale: TRAVEL vs EXISTENCE')
row(627.1, L('WORTH CEASING TO EXIST?', 'void', red=1), 'Line WORTH CEASING TO EXIST?')
row(631.1, I('scale', 'void', left='POWER', right='YOU', tip=-0.3), 'Insert: the scale tilts the other way: power gambit')
row(635.7, S('parkSunset', [Y(-200, 'stand', 'sad')], extra='shadows', cam='pull'), 'Wide park at dusk, shadows lengthen')
row(639.6, MT(['tokyo', 'paris', 'broadway', 'marrakech'], expr='smile', dim=0.45), 'Darkened montage of every dream: a thousand dreams, nightmares')
row(644.7, F('determined', 'parkSunset', exprs=[[2.0, 'sad']]), 'Giant face: could you halt this ride?')
row(648.6, T3('park'), '3D orbit: you sit on the park bench at sunset', **{'in': {'type': 'dip', 'dur': 0.8}})
row(654.8, S('parkSunset', [Y(-60, 'sit', 'thinking', y=-60)], size='med', fg='plant'), 'Medium: on the bench, wiser now, plant foreground')
row(659.0, I('hand', 'parkSunset', glow=0.5, flicker=1), 'Insert: your hand, its glow flickering: a perilous gamble')
row(664.3, F('sleepy', 'parkSunset'), 'Giant face, tired and uncertain')
row(669.1, S('parkSunset', [Y(-60, 'sit', 'thinking', y=-60)], size='med', extra='thought', vision='paris'), 'Medium bench: a faint vision of Paris still tugs at your mind')
row(674.2, S('parkSunset', [Y(-40, 'sit', 'thinking', y=-60)], cam='pull'), 'Wide bench at sunset: you ponder the high stakes')
row(679.2, I('hand', 'parkSunset', snap=0.9, glow=1), 'Insert: you snap your fingers, rings of power burst')
row(681.6, G(['HOME', 'TOKYO', 'PARIS', 'HAWAII', 'NEW YORK']), 'Globe: everywhere at once')
row(684.5, B('unbalance'), 'Blueprint: your atom figure tips off balance')
row(690.4, S('parkSunset', [Y(-60, 'sit', 'worried', y=-60)], size='med', glitch=0.3, cool=0.15), 'Medium bench: your hand flickers with molecular chaos')
row(696.7, S('parkSunset', [Y(-40, 'sit', 'sad', y=-60)], cam='pull', z=1.15), 'Wide pull-out: you on the bench, small against the shimmering sunset')
row(703.5, ('end', dict(question='Would you ever risk it again?')), 'End screen: the question, comment bubble, subscribe pill, the whole cast', **{'in': {'type': 'fade', 'dur': 0.8}})

# ---------------- build ----------------
starts = [w['start'] for w in words]
def snap(t):
    if t <= 0.01: return 0.0
    best = min(starts, key=lambda s: abs(s - t))
    return round(max(0.0, (best if abs(best - t) < 0.8 else t) - 0.15), 2)

AMB = {'park': ('wind', -28), 'parkSunset': ('wind', -28), 'highlands': ('wind', -24), 'himalaya': ('wind', -20), 'beach': ('wind', -26), 'ocean': ('wind', -26),
       'tokyo': ('city', -24), 'street': ('city', -24), 'streetNight': ('city', -26), 'paris': ('murmur', -28), 'broadway': ('murmur', -24), 'marrakech': ('murmur', -26), 'lawn': ('wind', -30),
       'storm': ('rain', -18), 'party': ('murmur', -22), 'studio': ('murmur', -26), 'lab': ('hum', -28), 'electronics': ('hum', -24), 'office': ('roomtone', -28)}
def sfx_for(tpl, p, intr):
    out = []
    for c in p.get('cast', []):
        if c.get('tp') in ('in', 'both'):
            a = c.get('at', 0.4); a = a if isinstance(a, (int, float)) else 0.4; out.append({'at': max(0, a - 0.25), 'name': 'whoosh', 'gain': -10}); out.append({'at': a, 'name': 'shimmer', 'gain': -12})
        if c.get('tp') in ('out',):
            a = c.get('at', 0.4); a = a if isinstance(a, (int, float)) else 0.6; out.append({'at': a, 'name': 'whoosh', 'gain': -9})
        if c.get('tp') == 'both': out.append({'at': c.get('at2', 1.8), 'name': 'whoosh', 'gain': -10})
        if c.get('tp') == 'fail': out.append({'at': c.get('at', 0.6), 'name': 'glitch', 'gain': -8})
    if p.get('glitch'): out.append({'at': 0.1, 'name': 'glitch', 'gain': -16})
    if tpl == 'bp': out.append({'at': 0.3, 'name': 'blip', 'gain': -14})
    if tpl == 'bp' and p.get('kind') in ('count', 'counter', 'meter', 'drain'): out.append({'at': 0.5, 'name': 'counter', 'gain': -16})
    if tpl == 'bp' and p.get('kind') == 'nuke': out.append({'at': 0.3, 'name': 'impact', 'gain': -6})
    if tpl == 'bp' and p.get('kind') in ('misplace', 'impossible', 'wrong', 'rules'): out.append({'at': 1.2, 'name': 'stinger', 'gain': -10})
    if tpl == 'insert': out.append({'at': 0.2, 'name': 'pop', 'gain': -14})
    if tpl == 'insert' and p.get('obj') == 'clock': out.append({'at': 0.3, 'name': 'clock', 'gain': -12})
    if tpl == 'freeze': out.append({'at': 0.0, 'name': 'freeze', 'gain': -5})
    if tpl == 'title': out.append({'at': 0.0, 'name': 'riser', 'gain': -10})
    if tpl == 'line': out.append({'at': 0.2, 'name': 'stinger', 'gain': -10})
    if tpl in ('montage',): out.append({'at': 0.0, 'name': 'whoosh', 'gain': -10})
    ex = p.get('extra', []); ex = ex if isinstance(ex, list) else [ex]
    if 'flashes' in ex or p.get('flashes'): out.append({'at': 0.2, 'name': 'flash', 'gain': -14})
    if 'sparks' in ex or 'emp' in ex: out.append({'at': p.get('sparkAt', p.get('empAt', 0.4)), 'name': 'buzz', 'gain': -10})
    if 'confetti' in ex or p.get('cheer', 0) > 0.5: out.append({'at': 0.2, 'name': 'cheer', 'gain': -16})
    if tpl == 'stage' and p.get('loc') == 'studio': out.append({'at': 0.1, 'name': 'applause', 'gain': -18})
    if intr.get('type') == 'flash' and tpl != 'freeze': out.append({'at': 0.0, 'name': 'flash', 'gain': -10})
    return out

shots, ids = [], {}
for i, (t, (tpl, params), scene, x) in enumerate(R):
    sid = f's{i + 1:03d}'; st = snap(t)
    shots.append({'id': sid, 'start': st, 'end': None, 'line': '', 'scene': scene, 'set': params.get('loc'), 'bars': x.get('bars'),
                  'in': x.get('in', {'type': 'cut'}), 'sfx': [], 'params': dict(tpl=tpl, **params), 'notes': ''})
    ids[sid] = tpl
for i, s in enumerate(shots): s['end'] = shots[i + 1]['start'] if i + 1 < len(shots) else DUR
for s in shots:
    s['line'] = ' '.join(w['word'] for w in words if s['start'] <= w['start'] - 0.0 < s['end'] and w['start'] >= s['start']).strip()
    p = s['params']; s['sfx'] = sfx_for(p['tpl'], p, s['in'])
    a = AMB.get(p.get('loc')) or ({'face': AMB.get(p.get('loc')), 'insert': AMB.get(p.get('loc'))}.get(p['tpl']))
    if a: s['amb'] = {'name': a[0], 'gain': a[1] - (4 if p['tpl'] in ('face', 'insert') else 0)}
    if p['tpl'] == 't3d': s['amb'] = {'name': {'traffic': 'city', 'storm': 'rain', 'lab': 'hum', 'park': 'wind', 'city': 'city', 'paris': 'murmur'}[p['v']], 'gain': -24}
    for c in s['sfx']: c['at'] = round(min(max(0, c['at']), max(0, s['end'] - s['start'] - 0.2)), 2)

music = [
    {'start': 0, 'end': 36.2, 'mood': 'wonder', 'intensity': 0.35}, {'start': 36.2, 'end': 52.1, 'mood': 'hopeful', 'intensity': 0.5},
    {'start': 52.1, 'end': 80.6, 'mood': 'mystery', 'intensity': 0.35}, {'start': 80.6, 'end': 98.4, 'mood': 'wonder', 'intensity': 0.45},
    {'start': 98.4, 'end': 188.2, 'mood': 'mystery', 'intensity': 0.45}, {'start': 188.2, 'end': 243.7, 'mood': 'playful', 'intensity': 0.55},
    {'start': 243.7, 'end': 296.7, 'mood': 'triumph', 'intensity': 0.6}, {'start': 296.7, 'end': 347.0, 'mood': 'action', 'intensity': 0.5},
    {'start': 347.0, 'end': 383.6, 'mood': 'tension', 'intensity': 0.35}, {'start': 383.6, 'end': 436.9, 'mood': 'tension', 'intensity': 0.5},
    {'start': 436.9, 'end': 543.3, 'mood': 'dark', 'intensity': 0.55}, {'start': 543.3, 'end': 625.1, 'mood': 'dark', 'intensity': 0.75},
    {'start': 625.1, 'end': 648.5, 'mood': 'sad', 'intensity': 0.4}, {'start': 648.5, 'end': 703.4, 'mood': 'calm', 'intensity': 0.3},
    {'start': 703.4, 'end': DUR, 'mood': 'hopeful', 'intensity': 0.35}]
title = 'What If You Could Teleport?'
json.dump({'title': title, 'duration': DUR, 'shots': shots, 'music': music, 'sfx': []}, open(os.path.join(PROJ, 'story/shots.json'), 'w'), indent=1)
cfg['title'] = title; json.dump(cfg, open(os.path.join(PROJ, 'config.json'), 'w'), indent=2)

open(os.path.join(PROJ, 'scenes/all.js'), 'w').write(
"// all.js — GENERATED by story/build_shots.py: registers every shot id with its template (params live in story/shots.json).\n"
"import { registerShot } from '/engine/core.js';\n"
"import { stage, faceShot, lineShot, titleShot } from './tpl.js';\nimport { insertShot, bpShot } from './tpl2.js';\n"
"import { globeShot, montageShot, ropeShot, fallShot, mirrorShot, freezeShot, endShot, threeD } from './tpl3.js';\n"
"const DRAW = { stage, face: faceShot, line: lineShot, title: titleShot, insert: insertShot, bp: bpShot, globe: globeShot, montage: montageShot, rope: ropeShot, fall: fallShot, mirror: mirrorShot, freeze: freezeShot, end: endShot };\n"
f"const IDS = {json.dumps(ids)};\n"
"for (const [id, tpl] of Object.entries(IDS)) registerShot(id, tpl === 't3d' ? { kind: '3d', ...threeD } : { draw: (g, t, info) => DRAW[tpl](g, t, info) });\n")

d = [s['end'] - s['start'] for s in shots]; d.sort()
print(f"{len(shots)} shots, duration {DUR}, median {d[len(d)//2]:.2f}s, min {d[0]:.2f}, max {d[-1]:.2f}")
for s in shots:
    if s['end'] - s['start'] < 0.8 or s['end'] - s['start'] > 8: print('  check', s['id'], round(s['end'] - s['start'], 2), s['line'][:60])
