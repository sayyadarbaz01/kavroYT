# Background Design Research: Competitors vs Kip's 3D Sets (Nov 18, 2026)

Frames come from the middle of real competitor videos (YouTube's auto-generated mid-video frames), not from thumbnails.
- Competitor frames: [competitors_1.jpg](competitors_1.jpg), [competitors_2.jpg](competitors_2.jpg)
- Our current sets: [our_sets.jpg](our_sets.jpg)

## 1. Channels studied

| Channel | 2D / 3D | Proof (views) | Background look |
|---|---|---|---|
| **Beanie Survives** | 2D | 2.97M top, 112K subs | Painterly and desaturated. Textured stone and concrete, hazy far mountains, dark interiors lit by one window. Feels like a film. |
| **DoodleSurvivals** | 2D | 1.72M top | Close-up faces over heavily **blurred** dark backgrounds (bokeh), orange/blue **rim light** on the character, tiny day counter. |
| **Kit vs The End** | 2D | 1.19M top | Detailed, lived-in interiors (control room, bunker greenhouse), **fog/haze**, coloured light (purple grow lights, red emergency). |
| **Ifverse** | 2D | 4.6M top | Dark purple palette, glowing lights, silhouettes with rim light. Moody and cinematic. |
| **Stick It Out** | 2D | 157K | Realistic rooms full of props (kitchen, supermarket freezers), **warm lamp pools**, soft shadows. |
| **Archival Survival** | 2D | 321K | Clean vector interiors, pastel and slightly desaturated, story props (water jugs, notebook). |
| **StickFallout** | 2D | 608K best, 23K recent | Very flat pale-blue rooms, few props. Its recent videos are weak. |
| **Hundred Days In** | 2D | 91K best | Bright and colourful, with good **light changes** (sunset, flashlight cone at night, snow). |
| **Stickvolve** | 2D | 235K | Side-view cross-sections (ground above, bunker below), muted greens. |
| **The Infographics Show** | 2D | 15.5M subs | Flat saturated vector style. Works for news, not survival. |

## 2. Biggest finding
**None of the top survival or what-if channels use 3D. They are all 2D.** That means Kip's 3D look is a real way to stand out. But the 3D sets we have now look like a **cheap mobile game** next to their cinematic painted backgrounds. The issue isn't 3D itself. It's how the sets are coloured, lit, filled and finished.

## 3. Eight rules the top channels follow
1. **Muted colour with one accent.** Greys, greens and dusty blues, with one bright colour (a cap, a fire, a warning light). Beanie, Kit vs The End, Stick It Out.
2. **Atmosphere and depth.** Far things get hazier and bluer. Fog, dust and mist. Beanie, Kit vs The End.
3. **Blurred background in close-ups.** The face is sharp and the room behind it is soft. DoodleSurvivals, Ifverse.
4. **Light with a visible source.** Window light, lamp pools, flashlight cones, red emergency light, campfire. Never flat light coming from nowhere.
5. **Rim light** separates the character from the background. DoodleSurvivals, Ifverse.
6. **Lived-in detail.** 15 to 30 props per scene, and the props tell the story (water jugs, radio, maps, boarded windows, tally marks on walls).
7. **Wear and texture.** Stains, cracks, dirt and uneven paint. Nothing is perfectly clean.
8. **Night is readable.** Dark blue-grey with warm practical lights, never pure black or flat navy.

## 4. Our current sets: problems and glitches

| Set | Problems |
|---|---|
| park, beach, suburb | Colours too saturated (toy-green grass, pure blue sky). **Hard horizon line** where ground meets sky. Empty ground. |
| suburb, suburbNight | **Glitch:** trees clip into houses and roofs. The flat triangle trees look like paper. |
| suburbNight | **Glitch:** the van is a pure black box with no shading. |
| hospital, lab, mountain | Big **blank white walls and planes**, no props, no texture. Mountain is just white planes. |
| street | Blown-out pink haze, flat building walls. |
| fireStreet, fireRoom | Too dark and flat, with one-colour lighting. The character disappears. |
| kitchen, classroom, gym, hallway | Fine, but too clean: no clutter, no wear, perfect floors. |
| all close-ups | Background is as sharp as the character (no depth of field). |
| all | Very light vignette and grain. The `bright` style is set to sat 1.06 and vignette 0.22, which gives a game look instead of a film look. |

## 5. How to make our 3D look cinematic (and clean)
**Render settings (applies to every video):**
- New grade **"cinema"**: saturation about 0.85, contrast 1.08, slightly cool shadows, vignette 0.35, grain 0.035.
- **Turn fog on for every outdoor set**, matched to the sky colour at the horizon. This removes the hard horizon line and adds depth.
- **Depth-of-field blur** (three.js BokehPass) on close-ups, focused on Kip's face.
- **Soft contact shadows / ambient occlusion** so objects sit on the floor and don't float.

**Lighting per set:**
- Daytime: low warm sun plus cool sky fill.
- Indoors: window light shafts (the engine already supports them) and warm lamp pools.
- Night: blue moonlight plus warm windows and streetlights. Zombie scenes: flickering lights, red emergency light, flashlight cones.

**Set dressing:**
- Build a **zombie prop kit** once and reuse it: barricades, boarded windows, abandoned cars, debris, papers, broken glass, sandbags, supply crates, water jugs, radio, map wall, tally marks.
- Add wear: colour variation and dirt on floors and walls, stains, cracks.
- Background layers: distant hills or city silhouettes fading into fog, never an empty sky.

**Glitch checklist (check every set before rendering):**
- [ ] No objects clipping through each other (trees through roofs, characters through furniture)
- [ ] No flicker where two surfaces overlap (z-fighting)
- [ ] Nothing floating above the ground (check the shadows touch)
- [ ] No pure black or pure white surfaces
- [ ] Camera never sees the edge of the set or empty void
- [ ] Night scenes: the character is still readable at phone size
- [ ] Kip's eyes are not hidden by the brim or shadows

## 6. New sets for the content plan, built to these rules

| Set | Look |
|---|---|
| Plane cabin | Dim cabin, oxygen masks hanging, flickering aisle lights, storm flashes through the windows |
| Mall (Christmas) | Fake snow, dead escalators, boarded shopfronts, warm Christmas lights against cold blue night |
| Hunger-style arena | Misty forest, hazy far mountains, golden light shafts |
| Desert planet | Orange haze, two suns, heat shimmer, dunes fading into fog |
| Frozen zombie city | Blue-grey snow fog, frozen cars, warm light from one window |
| Rooftop / tower | Smoky city skyline fading into fog, water tanks, laundry lines, a supply cache |

## 7. Priority order
1. "cinema" grade + fog + depth of field (one code change, upgrades every set at once)
2. Fix the existing glitches (suburb trees, black van, blank white walls)
3. Zombie prop kit
4. New sets as each video needs them
