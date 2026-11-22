#!/usr/bin/env bash
# setup.sh: make a fresh clone of kavroYT work like the main laptop.
# Safe to re-run any time (for example after `git pull`).
#   bash setup.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
STUDIO="$ROOT/test/test/aitrends-2d-studio"
have() { command -v "$1" >/dev/null 2>&1; }

echo "== 1/4 System tools (node, ffmpeg, yt-dlp, python3)"
if [ "$(uname)" = Darwin ]; then
  have python3 || { xcode-select --install || true; echo "Finish the Command Line Tools install, then run: bash setup.sh"; exit 1; }
  have brew || { echo "Install Homebrew first (https://brew.sh), then run: bash setup.sh"; exit 1; }
  for tool in node ffmpeg yt-dlp; do have "$tool" || brew install "$tool"; done
else
  for tool in python3 node ffmpeg yt-dlp; do have "$tool" || { echo "Install $tool, then run: bash setup.sh"; exit 1; }; done
fi

echo "== 2/4 Node packages + Chromium for rendering"
cd "$STUDIO"
npm ci
npx playwright install chromium

echo "== 3/4 Python packages"
# Same layout as the main laptop: packages go to the user site of `python3`.
# Homebrew's Python refuses plain pip installs (PEP 668); --user keeps it out of the system folders.
if ! python3 -m pip install --user -r "$ROOT/requirements.txt"; then
  python3 -m pip install --user --break-system-packages -r "$ROOT/requirements.txt"
fi

echo "== 4/4 Check"
python3 "$STUDIO/tools/doctor.py"
cat <<MSG

Done. Open Claude Code in: $ROOT
(the YouTube skills and agents load from $ROOT/.claude)
Whisper downloads its model the first time tools/transcribe.py runs.
MSG
