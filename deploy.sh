#!/usr/bin/env bash
set -euo pipefail

# Vision Genesis — Cloudflare Pages deploy
#
# First run: opens a browser tab to authenticate with Cloudflare.
#            If you don't have a CF account yet, it will let you sign up.
# Subsequent runs: deploys directly with no prompts.
#
# Usage:
#   ./deploy.sh
#
# Result:
#   Site live at https://vision-genesis-ai.pages.dev
#   (Custom domain visiongenesisai.com is a separate one-time setup —
#    see README.md.)

cd "$(dirname "$0")"

PROJECT_NAME="vision-genesis-ai"

if ! command -v node >/dev/null 2>&1; then
  echo "✗ node is required. Install it with: brew install node"
  exit 1
fi

if [ ! -d "public" ] || [ ! -f "public/index.html" ]; then
  echo "✗ public/index.html not found. Run from the vg-site/ directory root."
  exit 1
fi

echo "→ Deploying public/ to Cloudflare Pages (project: $PROJECT_NAME)"
echo

npx --yes wrangler@latest pages deploy public/ \
  --project-name "$PROJECT_NAME" \
  --commit-dirty=true

echo
echo "✓ Deployed."
echo "→ Production URL: https://${PROJECT_NAME}.pages.dev"
echo
echo "To attach visiongenesisai.com, see README.md → Connect custom domain."
