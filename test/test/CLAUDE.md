# Video projects — standing rules

The user makes "What if…?" narrated YouTube videos with the aiTrends 2D Studio (`aitrends-2d-studio/`).

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
- Variants: `KIP_SCHOOL` (blue school bag) and `KIP_SURVIVAL` for "Kip Survives" episodes (brown backpack, bandaged arm, cheek plaster, mud on the hoodie).
- Keep the brim at `R * 0.5` and the crown edge at `Math.PI * 0.44` in `toon.js`. Lower values hide Kip's eyes.
- Design sheet: `projects/kip-design/` (`node render.mjs --project projects/kip-design --sheet`).
- Never change Kip's colours or design. Reuse the supporting cast (FRIEND orange hoodie, SCI scientists, KIDS, GRANDMA, REPORTER, MOM) and the existing sets (suburb, classroom, bedroom, lab, hallway, beach, park, street/tokyo, paris, mountain, hospital). Only add new sets or characters when the script needs them.
- Do not copy the IFOLOGY reference channel's hero (yellow cap + green hoodie), music, scripts or storylines. Match the style category only.
- **Never use "Project I-F"** (the agency, the woman in the gray coat, "a boy who stops time / teleports / heals"): the user flagged it as a copy of IFOLOGY. Our own running storylines are **Kip Tries**, **Kip's Watch** (the brass pocket watch Kip can't take off) and **Kip Survives**.

## Shot library — save everything, reuse first (mandatory)
Every shot, set and character from every video is kept in `aitrends-2d-studio/library/`: `catalog.json` + `INDEX.md`, code snapshots in `library/videos/<slug>/`, thumbnails in `library/thumbs/`.
- **Before building any shots**, search the library for each planned scene: `python3 library/catalog.py find <words>`. For a visual pick, use `python3 library/catalog.py sheet <words> --out <scratch>.png`, then read the PNG. Reuse matching shots by copying their code from `library/videos/<slug>/scenes/...` and re-timing them. Reuse sets as-is (`set/<name>` entries in `toon-kit/sets3d.js`). Write new code only for scenes that have no match.
- **After a video is finished** (final render done), archive it, run from `aitrends-2d-studio/`: `python3 library/catalog.py add --project projects/<slug>`. Every shot needs a concrete `scene` description and a `set` name in `shots.json`, so it can be found later.
- **When a new 3D set is added** to a project, also add it to `toon-kit/sets3d.js`. Then re-run `python3 library/catalog.py add-sets --file toon-kit/sets3d.js --thumbs <dir with <set>.png>`, using one rendered still per set.
- New reusable characters go into `toon-kit/cast3d.js`.

## Workflow the user expects
1. Write an original script in the reference structure: hook → title → discovery → RULE 1/2/3 → real science → joyride → fame/problem → cost → twist → ending question.
2. The user records the voiceover. Keep the narration exactly as spoken.
3. Before the full render, send a 30 s preview with music + SFX.
4. Generated music: `music.gainDb` −22 (very quiet bed; −15, −10.5 and −6 were too loud).
5. Start each new video in a fresh session to save tokens.

Reference projects: `aitrends-2d-studio/projects/teleport3d/` (3D hook preview), `projects/narration/` (old 2D version).
