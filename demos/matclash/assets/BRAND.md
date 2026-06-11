# Mat Clash — Brand Notes (harvested 2026-06-10)

Source: matclash.com (Shopify, Alchemy 4.2.5 theme) + langfordesign.com/licensing.
Art and IP: Mat Clash Wrestling, Inc. / original characters and art by Langfordesign.
For internal demo use only — no public distribution without owner sign-off.

## Colors (from live theme CSS)

| Role | Hex | Where seen |
|---|---|---|
| Page background | `#0a0909` | Site-wide background (near-black) |
| Surface darks | `#0e0e0e`, `#1d1c1c`, `#202020`, `#3b3a3a` | Sections, cards, borders |
| Primary red | `#e41c26` | All buttons (custom CSS forces it), logo "MAT", sale badges. Variants in CSS: `#e02229`, `#fa0b0b`, plain `red` |
| Gold | `#c99527` | Accents; logo "CLASH" chrome gold; lightning motif reads brighter (#f5c84c-ish in art) |
| White | `#ffffff` | Text on dark, button labels |

Payment-icon colors (`#006fcf` Amex blue, `#f48120` Discover orange) appear in the CSS — not brand colors, ignore.

## Typography

- **Oswald** (weights 400 + 700, self-hosted Shopify font) — theme-wide body and headings. Condensed sans; all-caps usage everywhere.
- **Anton** (Google Fonts import, `font-family: 'Anton', sans-serif`) — custom hero/section headings. Hero overlay heading: 60px, ~1rem letter-spacing, all caps.
- **Logo lettering** is custom comic/chrome art (beveled metallic letters with dark outline), not a web font. Closest free stand-ins for mockups: Anton or Bakbak with a chrome gradient.

## Logo usage

- `logo-matclash.png` (1080x1080) — primary stacked wordmark: red "MAT" over gold-chrome "CLASH", slight arch/tilt, always on black. Site header uses it at ~150px. The file has a baked black background (NOT transparent) — keep it on black or mask it.
- `logo-matclash-youtube-avatar.jpg` (900x900) — round badge variant on the gold-lightning-on-black texture. Good for favicons/app icons.
- On character cards the logo appears arched behind the figure as a watermark/backdrop.

## Buttons / UI chrome

- Buttons: solid `#e41c26`, white text, **border-radius 0** (hard square corners), generous padding (8px 24px). Custom CSS uses `!important` to force red everywhere — red buttons are a deliberate brand rule.
- Tagline on the hero: "THE WRESTLING UNIVERSE FOR THE NEXT GENERATION".

## Visual tone of the card art (for matching)

- **Style**: 80s Saturday-morning-cartoon meets comic book (owner's stated intent: "combination of my love for wrestling with comics and 80's cartoons"). Bold black outlines, cel shading, exaggerated musculature, dynamic poses.
- **Character roster cards** (`character-*.jpg`, all 1080x1920): full-body figure centered on black, golden lightning bolts radiating behind, arched MAT CLASH logo watermark mid-card, character name top-center in chartreuse/yellow-green block capitals (slight arc). Wrestling singlets in loud neon colors (pink, teal, yellow, red); roster mixes humans and monsters (red ogre Bracket, grey golem Hammer, green Xane/Mat Beast, masked Gritty, ghost-white Stance).
- **Move/action cards** (`card-*.{jpg,png,webp}`): light/white card frame, big diagonal move-name banner in bold caps (color-coded per move), radial energy burst behind the scene art, circular point-value badge top-right (orange/red with +N), flavor text below the banner, small wave/series mark bottom-left. Some cards (Clone) use a dark navy frame instead.
- **Color coding seen on move banners**: orange (Escape), red (Reversal/Stalling), teal/green (Takedown, Resilience), purple/magenta (Nearfall), gold (Mat Beast specials).
- **Photography/product shots**: decks on dark backgrounds with the lightning texture; apparel line is black with red/white print (skipped in this harvest).
- Energy motif throughout = **electric lightning** (gold on black). When in doubt: black background, gold lightning, red CTA.

## Quick palette block

```css
--mc-black: #0a0909;
--mc-surface: #1d1c1c;
--mc-red: #e41c26;
--mc-gold: #c99527;
--mc-lightning: #f5c84c; /* sampled from art, approximate */
--mc-white: #ffffff;
--mc-name-green: #c8e64c; /* character-name caps, approximate sample */
font-family: 'Anton', 'Oswald', sans-serif; /* headings */
font-family: 'Oswald', sans-serif; /* body */
border-radius: 0; /* buttons */
```
