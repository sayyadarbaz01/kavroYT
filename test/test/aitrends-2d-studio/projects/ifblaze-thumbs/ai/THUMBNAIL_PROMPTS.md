# Thumbnail prompts for the 3 launch videos (9+ target)

For Google Flow (Nano Banana Pro), or ChatGPT image. Each prompt is **complete and standalone**: paste the whole block.

**Why AI art:** the top competitors (IQ 2.92M, Left 1.89M, Lie 961k) all use rich 2D illustration: a lit, detailed room, two characters with opposite emotions (smug vs panicking), and story props (an F paper next to an A+). Our 3D toon renders cap out around 7.5. This art closes that gap, and `ai_compose.py` adds the glowing number tags and the big text afterwards, so the words are crisp and spelled right.

**Attach these reference images** (all in `ai/refs/`):
- Every prompt: `kip_front.jpeg`, `kip_side.jpeg` (Kip, who is "you")
- Rank prompts: also `classmate_412.png`
- Mirrors prompts: also `gary_pigeon.png`
- Loop prompts: also `leah.png`
- `cast_lineup.png` shows everyone together, if the tool takes only one image.

**Settings:** 16:9, 2K, 3–4 tries per prompt. Keep the try where Kip looks most like his reference and both faces read clearly when you shrink the image to phone size.

**Save the picked image** as `ai/art/<name>.png` (names below), then run:
```bash
python3 ai_compose.py
```

| File name | Video | Concept | Text added later | The click gap |
|---|---|---|---|---|
| `rank_a.png` | Rank | Sleeper vs try-hard | **#412** vs **#6.9 BILLION** | Why is the sleeping guy ranked higher? |
| `rank_b.png` | Rank | The bus driver | **#3** vs **#6.9 BILLION**, "WHY IS HE #3?" | What did a bus driver do to be #3 on Earth? |
| `mirrors_a.png` | Mirrors | Empty mirror | "NEVER SEEN MY FACE" | What would you even look like? |
| `mirrors_b.png` | Mirrors | Gary's phone | "HE THOUGHT HE WAS AN EAGLE" | A pigeon who never saw himself |
| `loop_a.png` | Time Loop | 9:14 café reveal | **LOOP 401** vs **LOOP 1,006**, "SHE REMEMBERS?!" | She's been looping 600 days longer? |
| `loop_b.png` | Time Loop | The coffee order | **LOOP 2**, "SHE KNOWS MY ORDER?!" | How does she know? |

Use the **A** image as the main thumbnail and upload **B** as a second option in YouTube Studio's *Test & compare*, so YouTube picks the winner from real clicks.

Rules every prompt already includes: all characters are adults (college seniors); nothing suggestive; nothing that isn't in the video; no text in the art; bottom-right corner empty for the length badge.

---

## Shared blocks (already pasted into every prompt below)

**KIP:** a simple cartoon young man, a college senior. Round white head and white hands, small glossy dark oval eyes with a white shine dot, small simple mouth, no nose, no ears showing. Black six-panel baseball cap with a curved brim and a white letter "K" on the front. Black hoodie with two white drawstrings and a small gold lightning-bolt logo on the chest. Dark gray joggers, red sneakers with white soles, brass wristwatch on his right wrist. Big round head, slim body.

**STYLE:** polished 2D digital cartoon illustration in the style of hit animated storytime YouTube thumbnails: bold thick dark outlines, cel shading with soft gradients, strong cinematic rim light, a detailed fully lit background with soft depth-of-field blur, exaggerated readable cartoon emotions, rich saturated colors, very high contrast so the faces read at phone size.

---

## rank_a: "#412" vs "#6.9 BILLION"
```
The attached images are character references. Image 1 and image 2 are Kip. Image 3 is the classmate. Keep both designs exactly; draw the whole image as a polished 2D illustration.

KIP (keep exactly as the references): a simple cartoon young man, a college senior. Round white head and white hands, small glossy dark oval eyes with a white shine dot, small simple mouth, no nose, no ears showing. Black six-panel baseball cap with a curved brim and a white letter "K" on the front. Black hoodie with two white drawstrings and a small gold lightning-bolt logo on the chest. Dark gray joggers, red sneakers with white soles, brass wristwatch on his right wrist. Big round head, slim body.

CLASSMATE (keep exactly as image 3): a college senior in the same simple cartoon style. Round solid glossy black head with a few round puffs of curly black hair on top, small white dot eyes, small white mouth, black hands. Gray hoodie with two white drawstrings, dark joggers.

STYLE: polished 2D digital cartoon illustration in the style of hit animated storytime YouTube thumbnails: bold thick dark outlines, cel shading with soft gradients, strong cinematic rim light, a detailed fully lit background with soft depth-of-field blur, exaggerated readable cartoon emotions, rich saturated colors, very high contrast so the faces read at phone size. 16:9 wide frame, 2K.

SCENE: A university lecture hall, late afternoon, warm golden sunlight streaming through tall windows, rows of wooden desks rising behind, a big green chalkboard with chalk graphs in the far background, other students as soft blurred silhouettes. Two students sit side by side at the same long desk, seen from the front at eye level.

LEFT (centered at about 30% of the width): the classmate is fast asleep, head resting on his folded arms on top of a messy open notebook, eyes closed, a peaceful happy little smile, a shiny line of drool on the notebook page, a soft cool green glow lighting him from above. He looks completely relaxed.

RIGHT (centered at about 70% of the width): Kip sits bolt upright, wide awake and horrified, eyes huge, mouth wide open in a shocked scream, sweat drops flying off his head, one white hand pointing at the sleeping classmate. In front of Kip on the desk: a tall neat stack of textbooks, a notebook full of colorful highlighter lines and sticky tabs, three empty coffee cups. A harsh red glow lights Kip from above. He has done every reading and it is not fair.

Both heads at about the same height, around 55% down from the top, both faces fully visible and turned toward the camera. Leave clean empty space directly above each head (the top 35% of the frame) for glowing number tags to be added later.

No text, no letters, no numbers, no logos, no watermarks anywhere in the image. No writing on the chalkboard, notebooks or books.

Do not change either character's design from the references. Both are adults. No real brand logos, no real people, no extra characters wearing Kip's outfit. Keep the bottom-right corner empty (the video length badge goes there). Nothing important touching the edges.
```
**Text added later:** green tag **#412** over the sleeper, red tag **#6.9 BILLION** over Kip.

---

## rank_b: "WHY IS HE #3?"
```
The attached images are character references. Image 1 and image 2 are Kip. Keep his design exactly; draw the whole image as a polished 2D illustration.

KIP (keep exactly as the references): a simple cartoon young man, a college senior. Round white head and white hands, small glossy dark oval eyes with a white shine dot, small simple mouth, no nose, no ears showing. Black six-panel baseball cap with a curved brim and a white letter "K" on the front. Black hoodie with two white drawstrings and a small gold lightning-bolt logo on the chest. Dark gray joggers, red sneakers with white soles, brass wristwatch on his right wrist. Big round head, slim body.

BUS DRIVER: a friendly older man in the same simple cartoon style and proportions: round warm brown head, short gray hair and a neat gray mustache, small kind smiling eyes, a navy driver's cap and a navy uniform jacket.

STYLE: polished 2D digital cartoon illustration in the style of hit animated storytime YouTube thumbnails: bold thick dark outlines, cel shading with soft gradients, strong cinematic rim light, a detailed fully lit background with soft depth-of-field blur, exaggerated readable cartoon emotions, rich saturated colors, very high contrast so the faces read at phone size. 16:9 wide frame, 2K.

SCENE: Inside a city bus on a rainy morning, seen from the aisle. Rain streaks on the big windows, blue-gray light outside, warm yellow lights inside the bus.

LEFT (centered at about 30% of the width): the bus driver turns around in his seat with a big warm smile, holding out a bright yellow umbrella toward the viewer. A small open box of more folded umbrellas sits by his seat. A soft golden glow and a few sparkles surround him, like he is something special.

RIGHT (centered at about 70% of the width): Kip sits in the front passenger seat, soaked, with rain drops on his cap, staring at the driver in total disbelief: eyes huge, jaw dropped, both white hands gripping his head. A cold red glow lights Kip from above.

Both heads at about the same height, around 55% down from the top, both faces fully visible. Leave clean empty space above each head and across the top 30% of the frame for big text and number tags to be added later.

No text, no letters, no numbers, no logos, no watermarks anywhere in the image. No route number or signs on the bus.

Do not change Kip's design from the references. All characters are adults. No real brand logos, no real people, no extra characters wearing Kip's outfit. Keep the bottom-right corner empty (the video length badge goes there). Nothing important touching the edges.
```
**Text added later:** gold tag **#3** over the driver, red tag **#6.9 BILLION** over Kip, "WHY IS HE #3?" across the top.

---

## mirrors_a: "NEVER SEEN MY FACE"
```
The attached images are character references. Image 1 and image 2 are Kip. Image 3 is Gary the pigeon. Keep both designs exactly; draw the whole image as a polished 2D illustration.

KIP (keep exactly as the references): a simple cartoon young man, a college senior. Round white head and white hands, small glossy dark oval eyes with a white shine dot, small simple mouth, no nose, no ears showing. Black six-panel baseball cap with a curved brim and a white letter "K" on the front. Black hoodie with two white drawstrings and a small gold lightning-bolt logo on the chest. Dark gray joggers, red sneakers with white soles, brass wristwatch on his right wrist. Big round head, slim body.

GARY (keep as image 3): a plump gray city pigeon with an iridescent green and purple neck, an orange eye and orange legs, drawn in the same cartoon style.

STYLE: polished 2D digital cartoon illustration in the style of hit animated storytime YouTube thumbnails: bold thick dark outlines, cel shading with soft gradients, strong cinematic rim light, a detailed fully lit background with soft depth-of-field blur, exaggerated readable cartoon emotions, rich saturated colors, very high contrast so the faces read at phone size. 16:9 wide frame, 2K.

SCENE: A small bright bathroom in the morning, teal tiles, a white sink with a toothbrush cup and a tube of toothpaste, warm sunlight from a small window.

LEFT (centered at about 33% of the width): above the sink hangs an ornate golden mirror frame, but inside the frame there is NO mirror and NO reflection at all, only the plain teal tiled wall showing through the empty frame. A faint cold blue glow comes out of the empty frame. Gary the pigeon stands proudly on top of the frame, chest puffed out, head held high like a majestic eagle.

RIGHT (centered at about 70% of the width, head and shoulders, big in the frame): Kip faces the empty frame but turns his face toward the camera in panic: eyes huge, mouth open in a shaky worried wobble, sweat drops flying, both white hands pressed against his own cheeks, feeling his face because he has no idea what it looks like. A small smear of red ketchup on his forehead that he cannot see. Warm orange light on Kip against the cool blue frame glow.

Kip's face fully visible. Leave clean empty space in the top-right 35% of the frame above Kip for big text to be added later.

No text, no letters, no numbers, no logos, no watermarks anywhere in the image.

Do not change Kip's or Gary's design from the references. Kip is an adult. No real brand logos, no real people, no extra characters wearing Kip's outfit. Keep the bottom-right corner empty (the video length badge goes there). Nothing important touching the edges.
```
**Text added later:** "NEVER SEEN" white and "MY FACE" yellow, stacked, top-right.

---

## mirrors_b: "HE THOUGHT HE WAS AN EAGLE"
```
The attached images are character references. Image 1 and image 2 are Kip. Image 3 is Gary the pigeon. Keep both designs exactly; draw the whole image as a polished 2D illustration.

KIP (keep exactly as the references): a simple cartoon young man, a college senior. Round white head and white hands, small glossy dark oval eyes with a white shine dot, small simple mouth, no nose, no ears showing. Black six-panel baseball cap with a curved brim and a white letter "K" on the front. Black hoodie with two white drawstrings and a small gold lightning-bolt logo on the chest. Dark gray joggers, red sneakers with white soles, brass wristwatch on his right wrist. Big round head, slim body.

GARY (keep as image 3): a plump gray city pigeon with an iridescent green and purple neck, an orange eye and orange legs, drawn in the same cartoon style.

STYLE: polished 2D digital cartoon illustration in the style of hit animated storytime YouTube thumbnails: bold thick dark outlines, cel shading with soft gradients, strong cinematic rim light, a detailed fully lit background with soft depth-of-field blur, exaggerated readable cartoon emotions, rich saturated colors, very high contrast so the faces read at phone size. 16:9 wide frame, 2K.

SCENE: A sunny city street corner with blurred shop fronts and a park bench, bright warm daylight, blue sky.

LEFT-CENTER (centered at about 38% of the width, big in the frame): Gary the pigeon stands on the bench, staring at a smartphone screen held in front of him. On the phone screen is a clear picture of Gary himself, a plain gray pigeon. Gary is devastated: eyes huge and watery, beak wide open, feathers puffed up in shock, a single tear. Behind Gary, a huge faint ghostly silhouette of a majestic eagle with spread wings (his old self-image) is cracking and shattering into glowing pieces.

RIGHT (centered at about 75% of the width): Kip holds the phone out toward Gary with one hand and covers his mouth with the other, trying very hard not to laugh, eyes squeezed into happy crescents, shoulders shaking, a little sweat drop.

Both faces fully visible. Leave clean empty space across the top 30% of the frame for big text to be added later.

No text, no letters, no numbers, no logos, no watermarks anywhere in the image, including on the phone and the shops.

Do not change Kip's or Gary's design from the references. Kip is an adult. No real brand logos, no real people, no extra characters wearing Kip's outfit. Keep the bottom-right corner empty (the video length badge goes there). Nothing important touching the edges.
```
**Text added later:** "HE THOUGHT HE WAS" white, "AN EAGLE" yellow, across the top.

---

## loop_a: "LOOP 401" vs "LOOP 1,006"
```
The attached images are character references. Image 1 and image 2 are Kip. Image 3 is Leah. Keep both designs exactly; draw the whole image as a polished 2D illustration.

KIP (keep exactly as the references): a simple cartoon young man, a college senior. Round white head and white hands, small glossy dark oval eyes with a white shine dot, small simple mouth, no nose, no ears showing. Black six-panel baseball cap with a curved brim and a white letter "K" on the front. Black hoodie with two white drawstrings and a small gold lightning-bolt logo on the chest. Dark gray joggers, red sneakers with white soles, brass wristwatch on his right wrist. Big round head, slim body.

LEAH (keep exactly as image 3): a college senior in the same simple cartoon style. Round pale cream head and hands, big expressive dark eyes, short black hair with a high ponytail, a mustard-yellow cardigan, navy jeans, white sneakers. Fully clothed, friendly, not glamorous.

STYLE: polished 2D digital cartoon illustration in the style of hit animated storytime YouTube thumbnails: bold thick dark outlines, cel shading with soft gradients, strong cinematic rim light, a detailed fully lit background with soft depth-of-field blur, exaggerated readable cartoon emotions, rich saturated colors, very high contrast so the faces read at phone size. 16:9 wide frame, 2K.

SCENE: A cozy campus café in the morning, warm wooden counter, hanging lights, a chalkboard menu with only drawn coffee cup doodles, an old radio on the counter with glowing musical notes floating out of it. On the wall between the two characters, a round wall clock showing exactly 9:14. Faint glowing circular loop arrows swirl around the clock like time repeating. Two paper coffee cups on the counter.

LEFT (centered at about 30% of the width): Kip, standing in line, has just spun around and stares at Leah in total shock: eyes huge, mouth wide open, sweat drops flying. Cool cyan light on Kip.

RIGHT (centered at about 70% of the width): Leah looks back at Kip with huge startled eyes and a small open "o" mouth, one hand raised in front of her lips like she just got caught humming the song, a hint of a knowing look. Warm pink-orange light on Leah.

They stand a normal distance apart, not touching. Both heads at about the same height, around 55% down from the top, both faces fully visible and turned three-quarters toward the camera. Leave clean empty space directly above each head and across the top 30% of the frame for text and number tags to be added later.

No text, no letters, no numbers, no logos, no watermarks anywhere in the image, except the clock face, which shows the time 9:14 with hands only (no digits needed).

Do not change either character's design from the references. Both are adults. Nothing romantic or suggestive, no hugging, no touching. No real brand logos, no real people, no extra characters wearing Kip's outfit. Keep the bottom-right corner empty (the video length badge goes there). Nothing important touching the edges.
```
**Text added later:** green tag **LOOP 401** over Kip, red tag **LOOP 1,006** over Leah, "SHE REMEMBERS?!" across the top.

---

## loop_b: "SHE KNOWS MY ORDER?!"
```
The attached images are character references. Image 1 and image 2 are Kip. Image 3 is Leah. Keep both designs exactly; draw the whole image as a polished 2D illustration.

KIP (keep exactly as the references): a simple cartoon young man, a college senior. Round white head and white hands, small glossy dark oval eyes with a white shine dot, small simple mouth, no nose, no ears showing. Black six-panel baseball cap with a curved brim and a white letter "K" on the front. Black hoodie with two white drawstrings and a small gold lightning-bolt logo on the chest. Dark gray joggers, red sneakers with white soles, brass wristwatch on his right wrist. Big round head, slim body.

LEAH (keep exactly as image 3): a college senior in the same simple cartoon style. Round pale cream head and hands, big expressive dark eyes, short black hair with a high ponytail, a mustard-yellow cardigan, navy jeans, white sneakers. Fully clothed, friendly, not glamorous.

STYLE: polished 2D digital cartoon illustration in the style of hit animated storytime YouTube thumbnails: bold thick dark outlines, cel shading with soft gradients, strong cinematic rim light, a detailed fully lit background with soft depth-of-field blur, exaggerated readable cartoon emotions, rich saturated colors, very high contrast so the faces read at phone size. 16:9 wide frame, 2K.

SCENE: A cozy campus café counter in the morning, warm wooden counter, hanging lights, blurred customers in the background. Behind them, a large faint glowing clock face with circular loop arrows spinning around it, like the same day repeating.

LEFT (centered at about 30% of the width): Leah turns from the counter with a calm, slightly smug, knowing half-smile and one raised eyebrow, holding out a paper coffee cup toward Kip at arm's length, as if she already knew exactly what he orders. Warm golden light on her.

RIGHT (centered at about 70% of the width): Kip freezes mid-step, staring at the cup in disbelief: eyes huge, mouth dropped open, sweat drops flying, one white hand half raised. Cool blue light on Kip.

They stand a normal distance apart; only the cup is between them, nobody touches. Both heads at about the same height, around 55% down from the top, both faces fully visible. Leave clean empty space across the top 30% of the frame for big text to be added later.

No text, no letters, no numbers, no logos, no watermarks anywhere in the image. The coffee cup is plain with no writing.

Do not change either character's design from the references. Both are adults. Nothing romantic or suggestive, no hugging, no touching. No real brand logos, no real people, no extra characters wearing Kip's outfit. Keep the bottom-right corner empty (the video length badge goes there). Nothing important touching the edges.
```
**Text added later:** "SHE KNOWS MY ORDER?!" across the top, small green tag **LOOP 2** over Kip.

---

## Checklist before you pick a try
1. Kip has his cap with the white K, the black hoodie with the gold bolt, a white round face, no nose.
2. Both faces read clearly at phone size (shrink the image to the size of a thumbnail).
3. No stray letters or gibberish text anywhere (AI often adds fake writing on signs and books).
4. Bottom-right corner is empty.
5. Hands look right: no extra fingers, nothing melting.
