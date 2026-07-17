# CLAUDE.md — Alpha Captain Website (Alpha-Captain-site)

Marketing website for the Alpha Captain app (alphacaptain.app), the
promotional prep app for future fire service Company Officers. Published by
Code 3 Tek LLC. Vite + React + TypeScript + Tailwind 4; see README for the
stack and brand tokens.

## Git rules (Kyle's standing law)

- Kyle commits manually. NEVER auto-commit or push unless explicitly told.
- When asked to commit: `git status` first, individual `git add` per file,
  `git status` again, commit, push, `git log --oneline -3` to verify.
- PowerShell 5.1 word-splits here-strings passed to `git commit -m @'...'@`.
  Write the message to a temp file and `git commit -F <file>` instead.

## Deploy (Hostinger, scripted over SSH) — LIVE since 2026-07-16

`bash scripts/deploy.sh` builds and deploys `dist/` to PRODUCTION
(https://alphacaptain.app). Add `--dry-run` to build, connect, back up and
report without changing the server. Claude may run it when asked — no
manual upload step.

- The script runs `npm run build` itself every time, so a deploy can never
  ship a stale `dist/`. Deploy the CONTENTS of `dist/`, never the repo root.
- Target lives in `scripts/deploy.env` (gitignored, copy from
  `deploy.env.example`). Auth is the SSH key `~/.ssh/alpha_medic_deploy` —
  ONE key for the whole Hostinger Business plan (host 156.67.73.17, port
  65002, user u186382827); the same SSH user covers every domain on the
  plan, so a separate key would add no isolation.
- Docroot: `domains/alphacaptain.app/public_html`. Each domain on the plan
  has its own docroot under `domains/<domain>/` — the domain folder itself
  is NOT the docroot (there's a `DO_NOT_UPLOAD_HERE` marker at the domain
  root).
- Strategy is wipe-and-replace of the whole docroot. The site is fully
  static today — if a server-side endpoint that writes data is ever added,
  exclude its data dir from the wipe and back it up per deploy (see
  alpha-medic-web's deploy.sh `am_private` handling for the pattern).
- Every run backs up the remote docroot to `.deploy-backups/` (gitignored)
  before wiping, then verifies: HTTP 200, index.html byte-size match,
  bogus URL → 404.
- Archive with `tar.exe`, NEVER PowerShell Compress-Archive — it writes
  backslash entry paths that break extraction on Linux (broke a real
  Hostinger deploy 2026-07-14). The script checks for backslash entries and
  refuses to upload if any exist.
- Do NOT touch `domains/gray-emu-127153.hostingersite.com` — that's Alpha
  Medic's staging site.

## Hosting / DNS history (2026-07-16 switch)

alphacaptain.app was a never-published Hostinger Website Builder site. It
was deleted (mailbox checkbox left UNCHECKED — live Hostinger mailboxes
exist on this domain) and re-added as a Custom PHP/HTML website on the
Business plan. SSL was issued automatically within a minute.

DNS zone backup from before the switch: `Desktop\alphacaptain-DNS-backup.txt`
(mirrors the code3tek convention). KEEP IT — it was needed:

- Hostinger's "connect domain" flow REBUILT the zone and silently DROPPED
  the three DKIM CNAMEs (`hostingermail-{a,b,c}._domainkey`) and the
  `_dmarc` TXT record. MX, SPF and autoconfig/autodiscover survived. The
  records were restored by hand from the backup the same day.
- After ANY hosting-level change on this domain, verify mail DNS against
  the authoritative nameservers (not your resolver's cache):
  `nslookup -type=mx alphacaptain.app helios.dns-parking.com` — expect
  mx1.hostinger.com (pri 5) / mx2.hostinger.com (pri 10), plus SPF, three
  DKIM CNAMEs and `_dmarc` per the backup file.
- Mailboxes for @alphacaptain.app live in Hostinger mail (hPanel > Emails),
  NOT Google Workspace (that's code3tek.com's setup — different domain,
  different story).

## hPanel automation notes (browser pane)

- Kyle logs into hPanel himself; never type his password or touch 2FA.
- DNS editor for this (externally-registered) domain lives at
  `/external-domain/alphacaptain.app/dns` — the regular
  `/domain/<name>/dns` URL 404s ("Order not found").
- Ref-based clicks silently miss in the pane (devicePixelRatio 1.25);
  coordinate clicks in screenshot-pixel space work. `scroll_to` by ref
  works. Keep the viewport at 1280x800.
- The permission classifier may block typing DNS record values into hPanel
  forms; when it does, give Kyle the exact records to enter and verify
  afterwards with nslookup against the authoritative nameservers.

## Local preview

`.claude/launch.json` defines the dev server for the Claude preview pane
(`npm run dev`, Vite). `npm run preview` serves the production build.
