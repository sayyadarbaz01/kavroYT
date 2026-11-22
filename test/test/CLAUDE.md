# Video projects — standing rules

The user makes "What if…?" narrated YouTube videos with the aiTrends 2D Studio (`aitrends-2d-studio/`).

## Channel: If Blaze (@IfBlaze), from Nov 22, 2026
- The channel is **If Blaze, handle @IfBlaze** (the user's own channel, empty until launch Day 1).
- Channel plan: `CHANNEL_PLAN.md`. Full launch plan with packaging, descriptions, calendar and checks: `../../../reports/viral-whatif/launch-plan.md`. Branding (avatar, banner, Kip bust): `../../../reports/viral-whatif/branding/`.
- Launch scripts: `../../../reports/viral-whatif/scripts/01-see-everyones-rank.md`, `02-mirrors-never-existed.md`, `03-crush-time-loop.md`. Video 1 project: `aitrends-2d-studio/projects/see-everyones-rank/`.
- Audience: US, ages 16 to 30. Write in **US English** (mom, favor, realize, freshman, parking lot, apartment, pants). Spell numbers out in narration ("four hundred and twelve"), never digits.
- **Adults only.** Every character is 18 or older. Stories are set at college, at work or in adult life, never in a high school. Romance only between clearly adult characters. Kip is a college student (19 in video 1). Reuse `classroom` as a lecture hall, not a school room.
- Four pillars (rotate, never the same one two days in a row): **See Everyone's X**, **Never Existed** (rooms explainer), **Loops and Restarts**, **Day-Counter With Someone**.

## Default style: 3D toon (always, unless the user asks otherwise)
- Use the **3D toon kit** in `aitrends-2d-studio/toon-kit/`. Do not use the old moody 2D look by default.
- For every new video, copy the kit into the new project: `cp -r aitrends-2d-studio/toon-kit/{toon.js,sets3d.js,cast3d.js,fx.js} projects/<slug>/scenes/toon/`. Background research and set rules: `research/BACKGROUND_RESEARCH.md`. Build shots in `scenes/shots/` the same way as `toon-kit/example_hook.js`. The examples import from `../toon/`.
- Project config: `"style": "cinema"` for new videos (old projects keep `"bright"`), `"bars": "none"`, 16:9 1080p 24 fps.
- **Cinema style** (`engine/styles.js` + `engine/three-kit.js`), automatic on every 3D shot:
  - **Day / dusk / night / indoor colour grade**, picked from the set's fog or sky colour. Day is warm sun with cool shadows, dusk is orange highlights with purple shadows, night is blue-teal with low saturation (fire, lamps and windows stay warm). Override per shot with `s.stage.time = 'night'` (or `'day'`, `'dusk'`, `'indoor'`) in `init`.
  - **Depth of field**: auto-focuses on the toon figure nearest the frame centre. Close-ups get a blurred background, and wide shots (focus over 9 m) stay sharp. Override with `s.stage.dof = false` or `{ focus: 2.5, strength: 1.5 }`.
  - **Atmospheric fog**: outdoor set fog is pulled closer (near ×0.3, far ×0.5). Outlines fade with the fog.
  - DOF renders the scene twice, so cinema renders take longer than `bright`.
- **GPU only** (strict user rule): `render.mjs` draws frames on the GPU (`--gl gpu`, ANGLE/D3D11 on the Intel HD Graphics 520) and encodes video on the GPU with Intel Quick Sync (`h264_qsv`, `--encoder qsv` is the default; `--encoder x264` is the CPU fallback). For any new ffmpeg encode, use `-c:v h264_qsv`. Transcription also runs on the GPU (see below).
- **On the Mac (Apple M4, Nov 2026):** `render.mjs` and `tools/make_shorts.py` encode with Apple VideoToolbox (`h264_videotoolbox`, the Mac's GPU encoder) by default; `--encoder x264` is still the CPU fallback. `tools/transcribe.py` defaults to `--engine faster --model small` (models cached in `~/.cache/huggingface`), because the OpenVINO Intel-GPU setup exists only on the Windows PC.
- **Transcribe on the GPU** (default): `python tools/transcribe.py --project projects/<slug> --script input/script.txt --lang en`. It runs Whisper base on the Intel GPU through OpenVINO GenAI (`.venv-ov/` environment, model in `models/whisper-base-ov/`, helper `tools/ov_whisper.py`). About 70 s for 5.5 min of audio, with word timings within 0.02 s of the CPU version. The CPU fallback is `--engine faster` (needs `--model <local faster-whisper path>` because the Hugging Face download fails with an SSL error).
- **Miami set** `SETS.miami(st, { hospital, sunset })`: art-deco street, palms, Miami General hospital front (`st.hospitalDoors` slide open). Props: `palm()`, `starMesh()` (wanted stars). Cast: `NURSE`. GTA project: `projects/gta6-real-life/`.
- **Drone shots**: `T.drone(s.stage.camera, t, { target: [x, y, z], dur: i.dur, mode })`. Modes: `'descend'` (default: high wide sweep that drops onto the target), `'reveal'` (starts close and rises up and back), `'topdown'` (straight down, slowly turning). Fine-tune with `from` / `to: { h, r, a }` (height, distance, angle). Check the path doesn't fly through tall trees or roofs.
- Look test reel: `projects/cinema-test/` (12 shots: day, dusk, night, indoor, 3 drone moves).
- **Glitch check before EVERY final render** (strict user rule): render stills across the whole video (`node render.mjs --project P --stills <every 1-2 s> --scale 0.4`), look at every contact sheet, and fix everything first. Watch for: feet sinking (sets need `st.groundAt`, figures snap via `_lib.js snapToGround`), cameras inside buildings (black or white frames), props or palms blocking faces, half heads at frame edges, text over faces, characters hidden behind other characters or cars, pose snaps. Only then render the final.
- **Set glitch check**: `projects/set-check/` renders one view of every set (`node render.mjs --project projects/set-check --sheet`). Copy the latest `toon-kit/sets3d.js` into it first, then run it after any set change.
- Set-building rules in `sets3d.js` (Nov 2026 glitch fixes):
  - Use `groundPlane(st, colour)` (600 m textured ground) and `mottled()` / `tmat()` for big surfaces, never a flat-colour plane.
  - Make the fog colour equal the sky's bottom colour so there is no hard horizon line.
  - `room()` walls get colour variation and grime automatically (`panels`, `grime` options).
  - Houses use real gable roofs. The old sideways-pyramid roof made the "giant triangles".
  - Keep trees and props out of the camera area (winterCamp keeps a 10 m clearing).
  - Fit sign text to its canvas.
  - Flames are teardrop shapes, not cones.
  - Night sets get a cool back rim light from `nightLight()`. The `bright` style and the `sunny`/`sunset`/`indoor` moods live in `engine/styles.js`. If the engine is ever reinstalled from the plugin, re-add them.

## The hero — same character in every video
- The hero is named **Kip** in every video (narration, on-screen text, titles). Older videos called him Leo.
- **KIP** in `toon-kit/cast3d.js` (`HERO` is the same object): white head and hands `skin: '#f6f3ec'` with dark big eyes `bigEyes: true`, black hoodie `#2a2a33`, black six-panel cap `cap: 'real'`, `capColor: '#1b1b20'` with a white **K** on the front `capLogo: 'K'` (seams, top button, curved brim with lighter underside, back strap), dark joggers `legs: '#2e2e36'`, red sneakers with white soles `shoes: '#e8453c'`, gold bolt chest logo `logo: '#ffd23f'`, and a brass watch on the right wrist `watch: '#c8a24a'` (`fig.watch`).
- Variants: `KIP_SCHOOL` (blue bag, use as a college backpack) and `KIP_SURVIVAL` for Day-Counter survival stories (brown backpack, bandaged arm, cheek plaster, mud on the hoodie).
- Keep the brim at `R * 0.5` and the crown edge at `Math.PI * 0.44` in `toon.js`. Lower values hide Kip's eyes.
- Design sheet: `projects/kip-design/` (`node render.mjs --project projects/kip-design --sheet`).
- Never change Kip's colours or design. Reuse the supporting cast (FRIEND orange hoodie, SCI scientists, KIDS, GRANDMA, REPORTER, MOM) and the existing sets (suburb, classroom, bedroom, lab, hallway, beach, park, street/tokyo, paris, mountain, hospital). Only add new sets or characters when the script needs them.
- Do not copy the IFOLOGY reference channel's hero (yellow cap + green hoodie), music, scripts or storylines. Match the style category only.
- **Never use "Project I-F"** (the agency, the woman in the gray coat, "a boy who stops time / teleports / heals"): the user flagged it as a copy of IFOLOGY. Kip is the "you" of every story, and the series are the four pillars above.
- Recurring @IfBlaze cast besides Kip: co-lead (adult woman, high ponytail, green bomber jacket), rival (gray blazer), friend. Add them to `cast3d.js` when a script first needs them, then reuse.

## Shot library — save everything, reuse first (mandatory)
Every shot, set and character from every video is kept in `aitrends-2d-studio/library/`: `catalog.json` + `INDEX.md`, code snapshots in `library/videos/<slug>/`, thumbnails in `library/thumbs/`.
- **Before building any shots**, search the library for each planned scene: `python3 library/catalog.py find <words>`. For a visual pick, use `python3 library/catalog.py sheet <words> --out <scratch>.png`, then read the PNG. Reuse matching shots by copying their code from `library/videos/<slug>/scenes/...` and re-timing them. Reuse sets as-is (`set/<name>` entries in `toon-kit/sets3d.js`). Write new code only for scenes that have no match.
- **After a video is finished** (final render done), archive it, run from `aitrends-2d-studio/`: `python3 library/catalog.py add --project projects/<slug>`. Every shot needs a concrete `scene` description and a `set` name in `shots.json`, so it can be found later.
- **When a new 3D set is added** to a project, also add it to `toon-kit/sets3d.js`. Then re-run `python3 library/catalog.py add-sets --file toon-kit/sets3d.js --thumbs <dir with <set>.png>`, using one rendered still per set.
- New reusable characters go into `toon-kit/cast3d.js`.

## Workflow the user expects
1. Write an original script in the @IfBlaze structure (about 10 to 11 min): hook that contradicts status in the first 10 s and promises three payoffs → discovery → escalations → midpoint twist → temptation/cost → climax → ending → one question for the comments. Put a re-hook line about every 60 to 90 s, add a retention map, and fact-check every real claim with sources.
2. Voiceover is **ElevenLabs v3**, one narrator voice. For each script, write `scripts/<slug>_voiceover_elevenlabs_v3.txt` (inline tags like `[curious]`, `[deadpan]`, `[whispers]`, `...` pauses), the same text split into `_part1..N` files under about 3,200 characters at story breaks, and `scripts/<slug>_voiceover_clean.txt` (no tags), copied to the project as `input/script.txt`. The user saves the mp3 as `input/voiceover.mp3`. Keep the narration exactly as spoken.
3. Before the full render, send a 30 s preview with music + SFX.
4. Generated music: `music.gainDb` −22 (very quiet bed; −15, −10.5 and −6 were too loud).
5. Start each new video in a fresh session to save tokens.

Reference projects: `aitrends-2d-studio/projects/teleport3d/` (3D hook preview), `projects/narration/` (old 2D version).

## Zero glitches (mandatory, added Nov 22, 2026 after the user found 11 glitches in video 1)
- Build every 3D shot with `S()` from `scenes/shots/_spec.js` (copy it from `projects/see-everyones-rank` into new projects). Hand-written shots skip the checks.
- Held props (trays, boxes, mops, bags, umbrellas, wallets): always `carry: [{ prop, by, arms, both }]`. Never place a held prop by coordinates in `u()`, and never call `setPose` in `u()` on a walking figure (it freezes the legs).
- Walks that pass furniture use waypoints: `walk: { k: { path: [[x,z], ...], t0, t1, face, enter } }`. Walk around tables and benches, and enter rooms through doors, never through walls.
- Seated figures sit only on a real seat: chair, bench or bus seat. Nobody sits on a bed. In the library, chairs are at x = -1.9, -0.7, 0.5, 1.7, 2.9.
- Phone and other overlays go in the side thirds (`phone(g, t, { cx: 0.8 })`), never over a face.
- Explicit close-up cameras name their subject with `subj: ['k']`.
- Before every render, run `node render.mjs --project P --check --step 2 --scale 0.5` and fix shots until it prints "No glitches found". The checks are collide, float, edge (more than 15% of a head cut), overlap, tooclose (including big foreground heads), hidden (face behind furniture) and caption/overlay over a face. A full render runs the check automatically and stops if it finds a glitch. Never pass `--force` for a final video.
- After the check passes, look at stills of every prop shot (`--stills t1,t2 --scale 0.6`). The check can't see a prop that looks wrong in a hand.
