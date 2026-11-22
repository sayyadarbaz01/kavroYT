#!/usr/bin/env bash
# sync.sh: move work between laptops through GitHub (origin/main).
#   bash sync.sh push "what changed"   # send this laptop's work to GitHub
#   bash sync.sh pull                  # get the latest on this laptop, then refresh packages
# .gitignore decides what is sent: no node_modules, videos, renders, images, logs or secrets.
set -euo pipefail
cd "$(dirname "$0")"
case "${1:-}" in
  push)
    git add -A
    if git diff --cached --quiet; then echo "Nothing new to commit."; else git commit -m "${2:-Update $(date +%F)}"; fi
    git pull --rebase --autostash origin main
    git push origin main ;;
  pull)
    git pull --rebase --autostash origin main
    bash setup.sh ;;
  *) echo 'usage: bash sync.sh push "message"   |   bash sync.sh pull'; exit 1 ;;
esac
