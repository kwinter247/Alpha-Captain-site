// One-time asset pipeline: pulls from the local Alpha Captain asset library,
// resizes and converts to WebP into public/img.
import sharp from 'sharp'
import { mkdirSync, copyFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ASSETS = 'C:/Users/KyleW/Desktop/Alpha Captain/Assets'
const KIT = `${ASSETS}/alpha_captain_brand_kit`
const OUT = fileURLToPath(new URL('../public/img/', import.meta.url))
mkdirSync(OUT, { recursive: true })

const jobs = [
  // Hero / section backgrounds — flatten, cap width, moderate quality
  { src: `${ASSETS}/Bg-Heros/Night_Fire_street (3).png`, out: 'bg-night-street.webp', width: 2400, quality: 74 },
  { src: `${ASSETS}/Bg-Heros/ChatGPT Image May 16, 2026, 12_50_19 PM.png`, out: 'bg-inferno-watch.webp', width: 2400, quality: 74 },
  { src: `${ASSETS}/Bg-Heros/ChatGPT Image May 16, 2026, 12_50_36 PM.png`, out: 'bg-street-walk.webp', width: 2400, quality: 74 },
  { src: `${ASSETS}/Bg-Heros/ChatGPT Image May 16, 2026, 12_50_39 PM.png`, out: 'bg-hallway.webp', width: 2400, quality: 74 },
  { src: `${ASSETS}/Bg-Heros/ChatGPT Image May 16, 2026, 12_51_13 PM.png`, out: 'bg-helmet-desk.webp', width: 1800, quality: 76 },
  // Phone exports (transparent, with shadow) — keep alpha
  { src: `${ASSETS}/Phone Exports/alpha-captain-01-shadow.png`, out: 'phone-home.webp', width: 900, quality: 82, alpha: true },
  { src: `${ASSETS}/Phone Exports/alpha-captain-02-shadow.png`, out: 'phone-study.webp', width: 900, quality: 82, alpha: true },
  { src: `${ASSETS}/Phone Exports/alpha-captain-03-shadow.png`, out: 'phone-tracks.webp', width: 900, quality: 82, alpha: true },
  { src: `${ASSETS}/Phone Exports/alpha-captain-04-shadow.png`, out: 'phone-scenarios.webp', width: 900, quality: 82, alpha: true },
  { src: `${ASSETS}/Phone Exports/alpha-captain-06-shadow.png`, out: 'phone-simulation.webp', width: 900, quality: 82, alpha: true },
  { src: `${ASSETS}/Phone Exports/alpha-captain-07-shadow.png`, out: 'phone-interview.webp', width: 900, quality: 82, alpha: true },
  { src: `${ASSETS}/Phone Exports/alpha-captain-09-shadow.png`, out: 'phone-progress.webp', width: 900, quality: 82, alpha: true },
  // Brand marks — keep alpha, light resize
  { src: `${KIT}/01_emblem_transparent/alpha-captain-emblem-transparent-master.png`, out: 'emblem.webp', width: 640, quality: 90, alpha: true },
  { src: `${KIT}/09_monochrome/alpha-captain-emblem-mono-white-detail.png`, out: 'emblem-mono-white.webp', width: 900, quality: 88, alpha: true },
  { src: `${KIT}/03_primary_lockups_transparent/alpha-captain-horizontal-lockup-dark-silver-transparent.png`, out: 'lockup-horizontal.webp', width: 1200, quality: 90, alpha: true },
  { src: `${KIT}/03_primary_lockups_transparent/alpha-captain-stacked-lockup-dark-silver-transparent.png`, out: 'lockup-stacked.webp', width: 900, quality: 90, alpha: true },
  { src: `${KIT}/02_wordmark_transparent/alpha-captain-wordmark-dark-bg-silver-transparent.png`, out: 'wordmark.webp', width: 1200, quality: 90, alpha: true },
]

for (const j of jobs) {
  let img = sharp(j.src).resize({ width: j.width, withoutEnlargement: true })
  if (!j.alpha) img = img.flatten({ background: '#050505' })
  const info = await img.webp({ quality: j.quality }).toFile(path.join(OUT, j.out))
  console.log(`${j.out}  ${(info.size / 1024).toFixed(0)} KB`)
}

// Straight copies
copyFileSync(`${KIT}/05_app_icons/favicon.ico`, path.join(OUT, '../favicon.ico'))
copyFileSync(`${KIT}/06_social_and_marketing/alpha-captain-og-image-1200x630.png`, path.join(OUT, 'og-image.png'))
console.log('favicon + og image copied')
