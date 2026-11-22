---
name: youtube-thumbnail
description: Make 9.5+/10 click-worthy YouTube thumbnails for the If Blaze "What If" videos. Generates 2D illustrated art in Gemini (Nano Banana) through Claude in Chrome with the real cast as references, scores every try out of 100 and keeps only 95+, then adds glowing number tags and a 2-3 word headline with ai_compose.py. Use when the user says "make thumbnails", "thumbnail for my video", "/youtube-thumbnail", or gives a video and asks for a thumbnail.
---

# YouTube thumbnail maker (If Blaze)

One run = an A and a B thumbnail for each video the user names. A is the main thumbnail; B goes into YouTube Studio's *Test & compare*.

## Paths
- Studio: `test/test/aitrends-2d-studio/` (paths are relative to the kavroYT repo root)
- Thumbnail kit: `projects/ifblaze-thumbs/ai/`
  - `refs/`: cast reference images (Kip front/side, Leah, Sam, classmate_412, Gary, cast_lineup)
  - `art/<name>.png`: picked AI art (only 95+ tries are saved here)
  - `ai_compose.py`: adds tags + headline, writes `out/<name>.jpg` (1280x720), `_1920.png`, `_phone.jpg`
  - `THUMBNAIL_PROMPTS.md`: full prompt examples for the first 3 videos
- Each video: `projects/<video>/seo/thumbnail.jpg` (A version is installed here), `seo/<video>.en.srt` (captions = the story)
- New cast member? Add them to the `r1` lineup shot in `projects/ifblaze-thumbs/scenes/shots/thumbs.js`, render with `node render.mjs --project projects/ifblaze-thumbs --stills 13 --scale 1 --style bright --format png`, crop into `refs/`.

## Hard rules
1. Only show what is in the video. Read `seo/<video>.en.srt` first and build each concept from a real scene or line.
2. All characters are adults (college seniors). Nothing suggestive: no hugging, touching, beds, swimwear, romance poses.
3. Characters must look exactly like they do in the videos (on-model). See "Cast spec" below. Off-model = reject.
4. The art has no text. Words are added by `ai_compose.py` so they are crisp and spelled right.
5. Headline is 2-3 words, a question or shock ("WHY HIM?!", "MY FACE?!", "SHE KNOWS?!"). Number tags are short ("#412", "LOOP 1,006").
6. Save a try only if it scores 95/100 or more. Otherwise fix and regenerate.
7. No visible logo on a finished thumbnail. `ai_compose.py` runs the `remove-gemini-mark` skill on every art file automatically (it reverses the sparkle's blend, so no smudge). To clean a file by hand: `python3 "$(git rev-parse --show-toplevel)/.claude/skills/remove-gemini-mark/scripts/remove_mark.py" art/<name>.png`. After building, zoom on the bottom-right corner of each `out/<name>.jpg` to confirm it is clean. Google's invisible SynthID stays in the image; never claim the image is not AI-made.
8. No thumbnail can guarantee a CTR. Say so; tell the user to run Test & compare and read CTR after 48 h.

## Cast spec (paste into every prompt)
- **Kip** ("you"): flat pure white round face with thick black outline, no blush, no nose, no face shading. Normal eyes: small solid black glossy ovals with one white shine dot. Shocked eyes: two big round white eyes with thick black outline and a small black pupil dot. Laughing eyes: two black upside-down U curves. Black six-panel cap with a WHITE letter K. Black hoodie, two white drawstrings, small gold lightning bolt. Dark gray joggers, red sneakers, brass watch on right wrist.
- **Leah**: big round pale cream head, thick black outline, flat color, big simple solid black oval eyes with one shine dot, no nose, no anime eyes, no eyelashes, smooth black hair cap with one high ponytail, mustard-yellow cardigan, navy jeans, white sneakers.
- **Sam**: round tan head, curly black hair puffs, blue hoodie.
- **Classmate #412**: round glossy solid black head, round puffs of curly black hair, small white dot eyes, gray hoodie.
- **Gary**: plump gray pigeon, iridescent green and purple neck, orange eye, orange legs.

## Steps

### 1. Concepts (2 per video)
From the captions pick two moments with a clear click gap. What wins for competitors (2-3M views):
- two characters with opposite emotions (calm/smug vs panicking)
- a story prop that explains the gap (F paper vs A+, drool on notes, empty mirror frame, coffee cup she already knows)
- one glowing number tag per character when the video has numbers
Write a table: name (`<video>_a`, `<video>_b`), scene, tags, 2-3 word headline, click gap.

### 2. Prompt template
```
Images 1 and 2 are Kip, image 3 is <X>: copy their designs exactly. Polished 2D digital cartoon YouTube thumbnail, bold thick dark outlines, cel shading, cinematic rim light, rich saturated colors, very high contrast, full-bleed 16:9 with no borders.
COMPOSITION: medium shot from the waist up (or close-up from the chest up). <Char A> on the left third, <Char B> on the right third, a normal distance apart. Heads in the MIDDLE band: tops of heads at 30% down from the top, chins at 65%. The whole top 28% of the image is empty soft background for text.
SCENE: <place, light, story props>.
<CHAR A>: <cast spec> + <emotion, pose>. <light colour> light on them.
<CHAR B>: <cast spec> + <opposite emotion>. <contrasting light colour>.
Both are adult college seniors, not touching, nothing romantic. No text, no letters, no digits, no logos anywhere. Bottom-right corner plain.
```
Never put percentages like "35% width" in the prompt: Gemini once printed "35% 72%" under the image. Describe position as "left third" / "right third".

### 3. Generate in Gemini via Claude in Chrome
Load the Chrome tools in one ToolSearch call (tabs_context_mcp, navigate, computer, find, file_upload, javascript_tool, browser_batch).
1. Open the Gemini app URL the user gives (or `https://gemini.google.com/u/1/app`).
2. Copy the needed refs to the session scratchpad first (`file_upload` refuses paths with the trailing-space folder name).
3. Click "Upload and tools" (+). While the menu is open, the hidden file inputs exist. Tag them with JS:
   `[...document.querySelectorAll('input[type=file]')].forEach((x,k)=>x.setAttribute('aria-label','FILEIN'+k+(x.accept.startsWith('image')?'IMG':'')))`
   then `find "FILEIN1IMG"` and `file_upload` the refs to that ref. Never click "Upload files" (native dialog).
4. Press Escape. In a NEW chat, open the + menu again and click "Create image", then set Aspect ratio to 16:9.
5. Insert the prompt with JS (typing newlines would send early):
   `const e=document.querySelector('rich-textarea .ql-editor, [contenteditable=true]');e.focus();document.execCommand('insertText',false,PROMPT)` (one line, no newlines).
6. Click "Send message", wait about 30 s, scroll the last big `img` into view, screenshot/zoom it.
7. Edits ("keep this exact image, change only X") keep the layout: use them for small fixes (cap letter colour, clock hands, remove a smear). To change framing, start a NEW chat; edits inside one chat keep the old composition.

### 4. Score each try out of 100 (save only 95+)
| Points | Check |
|---|---|
| 25 | Emotion contrast reads instantly at phone size (shrink to 320x180) |
| 20 | Characters on-model (cast spec), cap K white, no extra fingers or melted hands |
| 15 | Faces big: each head about 30-40% of image height |
| 15 | Story prop / click gap visible without text |
| 10 | Clear space for tags + headline that doesn't cover faces |
| 10 | Rich lit background, high contrast, saturated |
| 5 | Zero stray text, digits, borders, nothing reading as blood or injury |
Any hard-rule break = automatic fail. Tell the user each score and why.

### 5. Save
Click the download icon on the image (top-right of the image card). The file lands in `~/Downloads/Gemini_Generated_Image_*.png`; move it to `projects/ifblaze-thumbs/ai/art/<name>.png`.

### 6. Add text
1. Make a grid sheet of the art (10% lines) and look where the heads and empty areas are.
2. Edit `SPECS` in `ai_compose.py`: `tags` = (text, colour, x, y, size, rotation); `titles` = (text, colour, x, y, size, max width as fraction of W, rotation). Colours: GREEN = good/low number, RED = bad/huge number, GOLD = special, YELLOW headline.
3. Put tags just above each head (arrow points down at it), never touching the top edge (y >= 0.095). Put the headline in the biggest empty area: top band first, else bottom-left over a dark area.
4. `python3 ai_compose.py` then view `out/` as a grid. Check: no text over faces, nothing cut at edges, readable at phone size.
5. `python3 ai_compose.py --install` copies each `_a` to its video's `seo/thumbnail.jpg`.

### 7. Report
Show the final grid, list each score, the saved paths, and the upload advice: A as main thumbnail, B in Test & compare, check CTR after 48 h and keep the winner.
