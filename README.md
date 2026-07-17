# Alpha Captain — Marketing Site

Marketing website for [Alpha Captain](https://github.com/kwinter247/alpha-captain), the promotional prep app for future fire service Company Officers.

Dark, cinematic, imagery-first single-page site built with:

- **Vite + React + TypeScript**
- **Tailwind CSS 4** — brand tokens from the Alpha Captain brand kit
- **Motion** (framer-motion) — scroll reveals, parallax backgrounds, hero ember particles
- Self-hosted fonts: Archivo Variable (wide display caps), Inter Variable, IBM Plex Mono

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build && npm run preview
```

## Assets

Optimized WebP images live in `public/img/` and are generated from the local
Alpha Captain asset library (`Desktop/Alpha Captain/Assets`) by:

```bash
node scripts/optimize-images.mjs
```

(Requires the asset library on disk; paths are set at the top of the script.)

## Deploy (Hostinger, scripted over SSH)

```bash
bash scripts/deploy.sh            # build + deploy to https://alphacaptain.app
bash scripts/deploy.sh --dry-run  # build, connect, back up, report - change nothing
```

The script always runs `npm run build` first (a deploy can never ship a stale
`dist/`), backs up the remote docroot to `.deploy-backups/`, then
wipe-and-replaces the docroot with the contents of `dist/` and verifies the
live site (HTTP 200, index.html byte-size match, bogus URL → 404).

Target config lives in `scripts/deploy.env` (gitignored — copy from
`deploy.env.example`). Auth is the SSH key `~/.ssh/alpha_medic_deploy`;
no password is stored anywhere. See `CLAUDE.md` for hosting details and
hard-won gotchas.

## Brand

- Captain Red `#9D0505` · Flare `#E32B2B` · Ink `#050505` · Charcoal `#151515` · Gunmetal `#2B2D2F` · Silver `#B8B9BB`
- Display type: wide geometric bold uppercase (Archivo Variable, wdth 125)
- Section eyebrows use dispatch-style mono labels with a blinking status dot
