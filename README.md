# Vision Genesis website

Static marketing site for Vision Genesis. Cream paper + oxblood, Cormorant Garamond + Source Serif 4 + Inter + IBM Plex Mono. Owner-operated partnership of business operators and AI-native architects.

## Project structure

```
vg-site/
├── public/                 # Deploy artifact — only this gets pushed to the host
│   ├── index.html
│   └── assets/
│       ├── logo-oxblood.svg     # Header
│       ├── logo-black.svg       # Footer
│       ├── logo-color.svg       # Reserved (cream on dark)
│       ├── logo-with-bg.svg     # Reserved (logo on burgundy block)
│       ├── logo-symbol.svg      # Monogram only
│       ├── favicon-32.png
│       ├── favicon.png
│       └── apple-touch-icon.png
├── docs/                   # Internal references — NEVER deployed
│   ├── COPY-EDIT.md             # Editable source for copy passes
│   ├── PHILOSOPHY-AND-COPY.md   # Philosophy doc from advisory board synthesis
│   ├── AI-BUILDER-PROMPT.md     # Brief for Lovable / v0 / etc.
│   └── archive/
│       └── index-v0-rejected.html
├── README.md
├── deploy.sh
└── .gitignore
```

## Local preview

```bash
cd public
python3 -m http.server 8765
# Open http://localhost:8765
```

## Deploy

### One-command Cloudflare Pages deploy (recommended)

```bash
./deploy.sh
```

First run will open a browser to log in to Cloudflare (sign up free if needed). Subsequent runs deploy directly.

After deploy, the site is live at `https://vision-genesis-ai.pages.dev`.

### Alternative: Vercel

```bash
cd public
npx --yes vercel --prod
```

(Vercel uses a magic-link email for auth on first run.)

## Connect the custom domain (`visiongenesisai.com`)

This is a one-time setup after the first deploy. **Do not change MX records** — those route email to Google Workspace and must stay intact.

### Steps (Cloudflare Pages path)

1. In the Cloudflare Pages dashboard, open the `vision-genesis-ai` project.
2. Go to **Custom domains** → **Set up a custom domain**.
3. Enter `visiongenesisai.com` (and optionally also add `www.visiongenesisai.com`).
4. Cloudflare will display the DNS records you need to set.
5. Sign in to **Squarespace Domains** (where the domain currently lives — it migrated there from Google Domains as part of the Google Workspace setup).
6. Open the DNS settings for `visiongenesisai.com`.
7. Update the **A / AAAA / CNAME** records to match what Cloudflare specified. Typically this is a CNAME pointing to `vision-genesis-ai.pages.dev` for `www`, and an A/AAAA pointing at Cloudflare's IPs for the apex.
8. **Leave the MX records alone.** They point to Google Workspace mail servers — changing them would break email delivery to `vision@visiongenesisai.com`.
9. Save. DNS propagation typically takes 5–60 minutes.

### Verification

After DNS propagates:
- `dig visiongenesisai.com` should resolve to Cloudflare IPs
- `https://visiongenesisai.com` should serve the site
- `dig MX visiongenesisai.com` should still show Google Workspace mail servers (`*.aspmx.l.google.com`)

If MX records changed accidentally, restore from the Squarespace Domains DNS history or re-add the standard Google Workspace MX records:
```
1   ASPMX.L.GOOGLE.COM
5   ALT1.ASPMX.L.GOOGLE.COM
5   ALT2.ASPMX.L.GOOGLE.COM
10  ALT3.ASPMX.L.GOOGLE.COM
10  ALT4.ASPMX.L.GOOGLE.COM
```

## Updating copy

Two paths:

1. **Direct edit:** open `public/index.html` and edit the copy in place.
2. **Source-of-truth edit:** open `docs/COPY-EDIT.md`, modify the labeled blocks, and re-apply to `public/index.html`.

Either path: re-deploy with `./deploy.sh`.

## Brand kit

The canonical brand kit lives at `~/vision-genesis-brand-kit/` (separate from this repo). When the brand updates, copy refreshed SVGs and favicons into `public/assets/`.

Locked tokens:
- `--paper` `#F4EFE6`
- `--burgundy` `#6B1E1E`
- `--ink` `#171717`
- Display: Cormorant Garamond
- Body: Source Serif 4
- UI: Inter
- Mono: IBM Plex Mono

## Locked taglines

- Brand line on logo: *Human-First AI*
- Primary tagline: *We've built the system that allows us to build yours.*
- Ethics tagline: *Human-authored · AI-delivered*
