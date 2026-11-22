# kavroYT

Code, plans and research for the If Blaze "What If" channel.

| Folder | What is in it |
|---|---|
| `test/test/aitrends-2d-studio/` | The video studio: renderer (`render.mjs`), toon kit, tools, one folder per video in `projects/` |
| `test/test/CLAUDE.md` | Rules and how-tos for the studio (read this first) |
| `.claude/skills/`, `.claude/agents/` | Claude Code skills: YouTube research, audit, trends, marketing, thumbnails, Gemini-mark removal |
| `data/` | Raw research data (yt-dlp JSON) |
| `reports/` | Research reports and upload plans |

## Set up a new laptop (macOS)

1. Install [Homebrew](https://brew.sh) and Git (`xcode-select --install` gives both Git and Python 3).
2. Clone and run the setup script:

```bash
git clone https://github.com/sayyadarbaz01/kavroYT.git
cd kavroYT
bash setup.sh
```

`setup.sh` installs Node, ffmpeg and yt-dlp with Homebrew, runs `npm ci` and the Playwright Chromium download in the studio, installs the Python packages from `requirements.txt`, and ends with `tools/doctor.py`. Every line of the doctor report should start with `OK`.

3. Open Claude Code in the `kavroYT` folder so the skills in `.claude/` load.

## Keep two laptops in sync

```bash
bash sync.sh push "what changed"
```

```bash
bash sync.sh pull
```

Run `push` on the laptop where you worked, then `pull` on the other one. `pull` re-runs `setup.sh`, so new packages are installed too.

## Not in Git

`.gitignore` keeps these out. Copy them by hand (AirDrop, USB drive) if you need them on the other laptop:

- Rendered videos and frames: `projects/*/out/`, `projects/*/build/`
- Thumbnails and AI art: `projects/*/seo/thumbnail.jpg`, `projects/ifblaze-thumbs/ai/art/`, `projects/ifblaze-thumbs/ai/out/`
- `node_modules/` (rebuilt by `setup.sh`), Python caches, Whisper models (downloaded on first use)
- Logs (`*.err`, `*.log`), `.env` files, keys and other secrets

The voiceovers (`projects/*/input/voiceover.mp3`), the cast reference images (`projects/ifblaze-thumbs/ai/refs/`) and the Gemini-mark mask are kept in Git, because re-rendering and thumbnail work need them.
