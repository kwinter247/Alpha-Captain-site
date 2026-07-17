#!/usr/bin/env bash
# Deploy the built site (dist/) to Hostinger public_html over SSH.
#
#   bash scripts/deploy.sh            # build + deploy
#   bash scripts/deploy.sh --dry-run  # build, connect, back up, report - change nothing
#
# Strategy: build fresh (never ship a stale dist/), back up the remote
# docroot, then wipe-and-replace it with the contents of dist/.
#
# This site is fully static (no PHP, no server-side form). If a server-side
# endpoint that WRITES data is ever added, stop wiping blindly: exclude its
# data dir from the wipe and back it up per deploy (see alpha-medic-web's
# deploy.sh am_private handling for the pattern).
#
# Adapted from C:\Users\KyleW\alpha-medic-web\scripts\deploy.sh (2026-07-16).

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG="$REPO/scripts/deploy.env"
KEY="$HOME/.ssh/alpha_medic_deploy"   # shared key for the whole Hostinger plan (one SSH user)
DRY_RUN=0
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

die() { echo "ERROR: $*" >&2; exit 1; }
step() { echo ""; echo "==> $*"; }

[[ -f "$CONFIG" ]] || die "missing $CONFIG - copy deploy.env.example and fill it in"
# shellcheck disable=SC1090
source "$CONFIG"
: "${SSH_HOST:?not set in deploy.env}"
: "${SSH_USER:?not set in deploy.env}"
: "${SSH_PORT:=65002}"
: "${REMOTE_ROOT:?not set in deploy.env - e.g. domains/alphacaptain.app/public_html}"
: "${SITE_URL:?not set in deploy.env - the URL to verify after deploy}"
[[ -f "$KEY" ]] || die "missing deploy key at $KEY"

SSH="ssh -i $KEY -p $SSH_PORT -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15 $SSH_USER@$SSH_HOST"

step "Building (npm run build)"
(cd "$REPO" && npm run build) || die "build failed - nothing deployed"
[[ -f "$REPO/dist/index.html" ]] || die "build produced no dist/index.html"

step "Preflight: connecting to $SSH_USER@$SSH_HOST:$SSH_PORT"
$SSH "echo connected; pwd" || die "SSH failed. Check hPanel SSH access is ON and the key is installed."
$SSH "test -d $REMOTE_ROOT" || die "remote $REMOTE_ROOT does not exist - has the domain been switched to PHP/HTML hosting?"

step "Backing up remote docroot"
BACKUP_DIR="$REPO/.deploy-backups"
mkdir -p "$BACKUP_DIR"
STAMP="$($SSH 'date +%Y%m%d-%H%M%S')"
BACKUP="$BACKUP_DIR/public_html-$STAMP.tar.gz"
if $SSH "cd $REMOTE_ROOT && tar -czf - . 2>/dev/null" > "$BACKUP" && [[ -s "$BACKUP" ]]; then
  echo "  saved $BACKUP ($(wc -c < "$BACKUP") bytes)"
else
  rm -f "$BACKUP"
  BACKUP=""
  echo "  remote docroot empty or unreadable - nothing to back up (fine on first deploy)"
fi

step "Building archive from dist/"
PAYLOAD="$REPO/.deploy-payload.tar.gz"
rm -f "$PAYLOAD"
# tar.exe, not Compress-Archive: the latter writes backslash entry paths that
# break extraction on Linux (broke a Hostinger deploy 2026-07-14).
tar.exe -czf "$PAYLOAD" -C "$REPO/dist" .
echo "  $(tar -tzf "$PAYLOAD" | wc -l) entries, $(wc -c < "$PAYLOAD") bytes"
tar -tzf "$PAYLOAD" | grep '\\' && die "archive contains backslash paths - refusing to deploy"

if [[ $DRY_RUN -eq 1 ]]; then
  step "DRY RUN - would now wipe $REMOTE_ROOT and extract:"
  tar -tzf "$PAYLOAD" | head -30
  rm -f "$PAYLOAD"
  echo ""
  echo "Dry run complete. Nothing on the server was changed."
  exit 0
fi

step "Uploading"
scp -i "$KEY" -P "$SSH_PORT" -q "$PAYLOAD" "$SSH_USER@$SSH_HOST:~/deploy-payload-ac.tar.gz"

step "Wiping $REMOTE_ROOT and extracting"
$SSH "set -e
      cd $REMOTE_ROOT
      find . -mindepth 1 -maxdepth 1 -exec rm -rf {} +
      tar -xzf ~/deploy-payload-ac.tar.gz -C .
      rm -f ~/deploy-payload-ac.tar.gz
      echo '  extracted:'; ls -1 | sed 's/^/    /'"
rm -f "$PAYLOAD"

step "Verifying $SITE_URL"
CODE="$(curl -s -o /dev/null -w '%{http_code}' "$SITE_URL/" || echo 000)"
echo "  $SITE_URL/ -> HTTP $CODE"
[[ "$CODE" == "200" ]] || die "homepage returned $CODE"
LIVE_SIZE="$(curl -s "$SITE_URL/" | wc -c)"
LOCAL_SIZE="$(wc -c < "$REPO/dist/index.html")"
echo "  index.html: local ${LOCAL_SIZE}b / live ${LIVE_SIZE}b"
[[ "$LIVE_SIZE" == "$LOCAL_SIZE" ]] && echo "  sizes match" || echo "  WARNING: size mismatch - possible cache"
CODE404="$(curl -s -o /dev/null -w '%{http_code}' "$SITE_URL/definitely-not-a-real-page" || echo 000)"
echo "  bogus URL -> HTTP $CODE404 (want 404)"

echo ""
echo "Deployed. Backup: ${BACKUP:-none}"
