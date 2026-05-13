# Vision Genesis V2 — Claude Code Implementation Brief

**Version:** 2.0  
**Date:** 2026-05-13  
**Status:** FINAL — Build-ready  
**Audience:** Claude Code (or any coding agent / developer)  
**Scope:** Single-page homepage for visiongenesis.ai  

---

## Contents

- [1. Project Overview](#1-project-overview)
- [2. Design Tokens](#2-design-tokens)
- [3. Section-by-Section Build Spec](#3-section-by-section-build-spec)
- [4. Asset Manifest](#4-asset-manifest)
- [5. Interactive Elements](#5-interactive-elements)
- [6. Brand Guardrails](#6-brand-guardrails)
- [7. SEO & Meta](#7-seo--meta)
- [8. Copy Document](#8-copy-document)

---

## 1. Project Overview

### What We're Building

A single-page marketing homepage for **Vision Genesis** (visiongenesis.ai) — an owner-operated AI-implementation firm. The page is dark-dominant (deep navy base), typography-forward, with alternating warm Paper sections. It follows a Ramp/Linear/Palantir-inspired aesthetic: engineering-specification layout, live-data energy, problem-first empathy, one color-burst moment.

The page has **10 sections** in this order:

1. Nav (sticky)
2. Hero (problem-first, live terminal)
3. Proof Strip (warm Paper, live counters)
4. VG Stack 01–05 (engineering spec layout)
5. Refrain Band (full-bleed VG Deep Blue)
6. Living Tree (Paper — THE color burst moment)
7. Products (bento grid)
8. Founder (Ryan Dix — Paper)
9. Free AI Operating Audit (conversion form)
10. For Builders & Operators (recruitment — Paper)
11. Footer (dark)

### Tech Stack Recommendation

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 14+ (App Router) | SSR/SSG for SEO, React component model, Vercel-native deployment |
| **Styling** | Tailwind CSS 3.4+ | Matches the mockup (built with Tailwind classes). Design tokens map directly to `tailwind.config.ts` |
| **Animation** | Framer Motion | Scroll-triggered reveals, pulse animations, counter animations. Lightweight and React-native |
| **Fonts** | Google Fonts (Inter + JetBrains Mono) | `next/font/google` for zero-CLS loading |
| **Form Handling** | Server Action or API route → email/webhook | The audit form posts to an endpoint (initially mailto fallback, later Stripe/CRM) |
| **Deployment** | Vercel | Natural fit for Next.js. Custom domain: visiongenesis.ai |

### Visual Source of Truth

The V2 mockup HTML files are the canonical design reference:
- **Desktop (1440px):** `vg_redesign_v2/screens/home-desktop.html`
- **Mobile (390px):** `vg_redesign_v2/screens/home-mobile.html`

When this brief and the mockup disagree, **the mockup wins** for visual details. This brief wins for architectural decisions, responsive behavior, and implementation specifics not visible in the static mockup.

---

## 2. Design Tokens

### 2.1 Color Palette

#### CSS Custom Properties

```css
:root {
  /* Primary */
  --color-blue: #0051D5;
  --color-blue-light: #4D8FFF;
  --color-blue-dark: #003DA0;

  /* Warm ground */
  --color-paper: #F2EBDD;
  --color-paper-light: #FAF7F2;
  --color-paper-dark: #E8DFD0;

  /* Dark ground */
  --color-navy: #0A1628;
  --color-navy-mid: #152238;
  --color-navy-light: #1E3050;
  --color-navy-deep: #060F1C;

  /* Accent */
  --color-orange: #FF8200;

  /* Text */
  --color-ink: #1A1A2E;
  --color-slate: #5A6378;
  --color-dark-body: #C8D0DC;
  --color-dark-muted: #8891A0;
  --color-white: #FFFFFF;

  /* Semantic */
  --color-success: #22C55E;
  --color-error: #EF4444;
}
```

#### Tailwind Config — `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        vg: {
          blue: {
            DEFAULT: '#0051D5',
            light: '#4D8FFF',
            dark: '#003DA0',
          },
          paper: {
            DEFAULT: '#F2EBDD',
            light: '#FAF7F2',
            dark: '#E8DFD0',
          },
          navy: {
            DEFAULT: '#0A1628',
            mid: '#152238',
            light: '#1E3050',
            deep: '#060F1C',
          },
          orange: {
            DEFAULT: '#FF8200',
          },
          ink: '#1A1A2E',
          slate: '#5A6378',
          'dark-body': '#C8D0DC',
          'dark-muted': '#8891A0',
          success: '#22C55E',
          error: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display-desktop': ['86px', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-mobile': ['40px', { lineHeight: '1.0', letterSpacing: '-0.025em', fontWeight: '800' }],
        'h1-desktop': ['56px', { lineHeight: '1.0', letterSpacing: '-0.025em', fontWeight: '800' }],
        'h1-mobile': ['34px', { lineHeight: '1.0', letterSpacing: '-0.025em', fontWeight: '800' }],
        'h2-desktop': ['48px', { lineHeight: '1.0', letterSpacing: '-0.025em', fontWeight: '800' }],
        'h2-mobile': ['30px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h3-desktop': ['40px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h3-mobile': ['26px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'card-title': ['30px', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
        'card-title-sm': ['26px', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        'card-title-xs': ['22px', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        'body-lg': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'overline': ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.12em', fontWeight: '600' }],
        'overline-sm': ['0.625rem', { lineHeight: '1.3', letterSpacing: '0.12em', fontWeight: '600' }],
      },
      spacing: {
        'section-desktop': '96px',
        'section-mobile': '56px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'card-paper': '0 4px 24px rgba(0, 81, 213, 0.08)',
        'card-dark': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'glow-blue': '0 0 60px rgba(0, 81, 213, 0.08)',
        'glow-blue-strong': '0 0 60px rgba(0, 81, 213, 0.12)',
        'tree-glow': 'drop-shadow(0 24px 64px rgba(0,81,213,0.18)) drop-shadow(0 8px 24px rgba(255,130,0,0.12))',
      },
      maxWidth: {
        'content': '1280px',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(255,130,0,0.45)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 0 7px rgba(255,130,0,0)' },
        },
        'pulse-green': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(34,197,94,0.45)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 0 5px rgba(34,197,94,0)' },
        },
        'counter-breathe': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2.2s ease-in-out infinite',
        'pulse-green': 'pulse-green 2.5s ease-in-out infinite',
        'counter-breathe': 'counter-breathe 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

### 2.2 Typography System

| Level | Desktop | Mobile | Weight | Font |
|-------|---------|--------|--------|------|
| Hero Display | 86px / line-height 1.0 / tracking -0.03em | 40px / 1.0 / -0.025em | 800 | Inter |
| Section H1 | 56px / 1.0 / -0.025em | 34px / 1.0 / -0.025em | 800 (extrabold) | Inter |
| Section H2 | 48px / 1.0 / -0.025em | 30px / 1.05 / -0.02em | 800 | Inter |
| Living Tree H2 | 40px / 1.05 / -0.02em | 26px / 1.05 / -0.02em | 800 | Inter |
| Stack Item Title | 30px / 1.1 / -0.015em | 22px / 1.1 / -0.01em | 700 | Inter |
| Card Title (products, large) | 26px / 1.1 / -0.01em | 20px | 700 | Inter |
| Card Title (products, small) | 22px / 1.1 / -0.01em | 20px | 700 | Inter |
| Body Large (hero sub, audit desc) | 20px / 1.6 | 16px / 1.6 | 400 | Inter |
| Body | 16px / 1.6 | 16px / 1.6 | 400 | Inter |
| Body Small | 14px / 1.5 | 14px / 1.5 | 400 | Inter |
| Overline | 12px / 1.3 / tracking 0.12em / uppercase | 10px / 1.3 / 0.12em | 600 | Inter |
| Monospace (terminal) | 14px / 1.75 (leading-7) | 11px / 1.6 | 400 | JetBrains Mono |
| Monospace (labels) | 12px / tracking 0.1em | 10px | 600 | JetBrains Mono |

**Font loading (Next.js):**

```ts
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
  display: 'swap',
});
```

### 2.3 Spacing & Layout

- **Max content width:** 1280px
- **Page width (mockup canvas):** 1440px desktop / 390px mobile
- **Content horizontal padding:** `px-8` (32px) desktop / `px-5` (20px) mobile
- **Section vertical padding:** `py-24` (96px) desktop / `py-14` (56px) mobile
- **Grid:** 12-column on desktop, single-column on mobile. `gap-8` (32px) desktop grid gap.
- **Nav height:** 66px desktop / 58px mobile

### 2.4 Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| Mobile | < 768px | Single column, stacked layout |
| Tablet | 768px–1023px | Intermediate (adapt from mobile, 2-col where sensible) |
| Desktop | ≥ 1024px | Full 12-column grid |
| Canvas | 1440px | Max body width for the mockup frame. Content stays at 1280px max-width. |

### 2.5 Additional Tokens

**Border radii used in the mockup:**
- Buttons: `rounded-lg` (8px)
- Cards (products, form): `rounded-2xl` (16px)
- Small cards (recruit, terminal): `rounded-xl` (12px)
- Pulse pills: `rounded-full` (9999px)
- Inputs: `rounded-lg` (8px)

**Transitions:**
- All interactive elements: `transition-colors` or `transition-all` at default duration (150ms)
- Card hover borders: `transition-all`

**Grid background texture (hero section):**
```css
.grid-bg {
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 72px 72px; /* desktop */
  /* 48px 48px on mobile */
}
```

**Hero radial gradient overlay:**
```css
background: radial-gradient(ellipse 900px 700px at 70% 50%, rgba(0,81,213,0.06) 0%, transparent 70%);
/* mobile: ellipse 400px 400px at 80% 20%, rgba(0,81,213,0.07) */
```

---

## 3. Section-by-Section Build Spec

---

### Section 0: Nav

**Component:** `<Nav />`  
**Sticky:** Yes — `sticky top-0 z-50`  
**Background:** `#0A1628` at 95% opacity + `backdrop-blur-sm` + bottom border `1px solid #1E3050`  
**Height:** 66px desktop / 58px mobile  
**Max-width container:** 1280px centered  
**Padding:** `px-8` desktop / `px-5` mobile

**Desktop layout:**
```
[ Logo (h-10) ]  ----gap-8----  [ The Stack | Products | For Builders | Ryan Dix ]  ----  [ FREE AI AUDIT → button ]
```

- Logo: `<img>` tag, `h-10 w-auto` (40px height)
- Nav links: `text-[#8891A0] hover:text-white text-sm font-medium tracking-wide transition-colors`
- CTA button: `bg-[#0051D5] hover:bg-[#003DA0] text-white text-sm font-bold tracking-wider px-5 py-2.5 rounded-lg uppercase`

**Mobile layout:**
```
[ Logo (h-8) ]  ----  [ Free Audit → button ]
```

- Nav links hidden on mobile. No hamburger menu in the mockup. Decision: implement a hamburger menu that slides open with the 4 links + CTA.
- Mobile CTA: `text-xs font-bold tracking-wider px-4 py-2`

**Nav links scroll-to-section behavior:**
- "The Stack" → scrolls to VG Stack section
- "Products" → scrolls to Products section
- "For Builders" → scrolls to Recruit section
- "Ryan Dix" → scrolls to Founder section
- "Free AI Audit →" → scrolls to Audit form section

**Responsive behavior:** On mobile, nav collapses to logo + CTA only. Add a hamburger icon (3-line) that reveals a slide-down panel with the 4 nav links. Use Framer Motion for the panel animation.

---

### Section 1: Hero

**Component:** `<Hero />`  
**Background:** `bg-[#0A1628]` with grid texture overlay and radial gradient  
**Min-height:** `min-h-[900px]` desktop (flex column, vertically centered) / naturally flowing on mobile  
**Padding:** `pt-16 pb-16` desktop / `pt-10 pb-12 px-5` mobile

**Desktop layout:** `grid grid-cols-12 gap-8 items-start`
- Left column (col-span-7): pills → headline → pain points → solution pivot → CTAs
- Right column (col-span-5): terminal artifact

**Mobile layout:** Single column stacked. Terminal moves BELOW the fold (separate section `<HeroTerminal />`).

#### Sub-elements:

**1. Live Agent Pills (top)**
- Two inline pills side by side:
  - Orange pill: `bg-[#FF8200]/10 border border-[#FF8200]/30 rounded-full px-4 py-2` containing pulsing dot + "9 Agents · Active" in mono
  - Gray pill: `bg-white/[0.04] border border-white/10 rounded-full px-4 py-2` containing "PIPELINE: 47 TASKS IN PROGRESS" counter
- Mobile: `flex flex-wrap gap-2 mb-8`, pills use smaller text (`text-[10px]`)

**2. Problem-First Display Headline**
- Desktop: 86px / line-height 1.0 / letter-spacing -0.03em / font-weight 800 / max-width 700px
- Mobile: 40px
- Structure:
  ```
  Your best people
  are buried in work
  that shouldn't exist.    ← this line in #0051D5
  ```
- The blue line uses `<span class="text-[#0051D5]">`
- `<br>` tags create the line breaks in the markup

**3. Pain Points Grid**
- Desktop: `grid grid-cols-3 gap-3 mt-8 mb-8 max-w-[680px]`
- Mobile: `space-y-2.5 mb-7` (single column, stacked)
- Each card: `bg-white/[0.03] border border-white/[0.06] rounded-lg p-4` (desktop) / `p-3.5` (mobile)
- Each has: orange alert-circle SVG icon (14px) + body text in `#C8D0DC text-sm`
- Three pain points — see Copy Document (Section 8)

**4. Solution Pivot Text**
- `text-[#C8D0DC] text-xl leading-relaxed mb-10 max-w-[580px]`
- Mobile: `text-base`
- Contains `<strong class="text-white">` for emphasis

**5. CTA Buttons**
- Desktop: `flex items-center gap-4`
- Mobile: Full-width stacked, `mb-3` between them
- Primary: `bg-[#0051D5] hover:bg-[#003DA0] text-white font-bold text-base tracking-wider px-8 py-4 rounded-lg uppercase`
- Secondary: `border border-[#4D8FFF]/40 text-[#4D8FFF] hover:border-[#4D8FFF] hover:bg-[#4D8FFF]/10 font-semibold text-base px-8 py-4 rounded-lg`

**6. Live Terminal Artifact (right column / below fold mobile)**
- Outer: `bg-[#060F1C] border border-[#1E3050] rounded-xl overflow-hidden` with `box-shadow: 0 0 60px rgba(0,81,213,0.08)`
- Chrome bar: `bg-[#0A1628] border-b border-[#1E3050]` with traffic lights (red/orange/green at 60% opacity, 12px dots desktop / 10px mobile) + title "VG Agent Terminal — Live Output" in mono + green "ACTIVE" pulse indicator
- Body: `p-6 font-mono text-sm leading-7 space-y-1` (desktop) / `p-4 font-mono space-y-1` at 11px (mobile)
- Five terminal lines showing agent activity (see Copy Document for exact text)
- Last line: `opacity-50` with blinking cursor `animate-pulse`
- Footer stats bar: `px-6 py-3 bg-[#0A1628]/50 border-t border-[#1E3050]` showing TASKS TODAY: 47 | AGENTS: 9/9 ONLINE | UPTIME: 100%

**Reusable components from this section:**
- `<PulsePill />` — orange status pill with animation
- `<LiveTerminal />` — the full terminal artifact
- `<PrimaryButton />` and `<SecondaryButton />` — CTA buttons

---

### Section 2: Proof Strip

**Component:** `<ProofStrip />`  
**Background:** `bg-[#F2EBDD]` (Paper — warm section)  
**Padding:** `py-14` desktop / `py-10` mobile

**Desktop layout:** `flex items-center justify-between` inside max-w-[1280px]
- Left: live task counter (large 44px mono number)
- Five stats separated by `1px` vertical dividers (`w-px h-10 bg-[#E8DFD0]`)
- Right: honest disclaimer text

**Stats in order:**
1. Tasks completed today: `47` (44px mono bold, `#1A1A2E`, `counter-live` animation)
2. `20` Years Operator Experience
3. `9` AI Agents Active
4. `170+` Agent Specs In Pipeline (the `+` is `text-[#FF8200]`)
5. `3` Products Live on Stripe
6. `2` Founding Partners
7. Disclaimer: "Honest scale. No inflated numbers. Here's exactly where we are."

**Stat styling:**
- Number: `text-[#0051D5] font-extrabold` at 40px, letter-spacing -0.02em
- Label: `text-[#5A6378] text-xs font-semibold tracking-[0.08em] uppercase`

**Mobile layout:** 
- Task counter + disclaimer at top with bottom border
- 2×2 grid for the 4 key stats (20, 9, 170+, 3)
- "2 Founding Partners" stat dropped on mobile
- Numbers at 32px

**Responsive note:** The horizontal stat strip won't fit on tablet. At `< 1024px`, switch to a 2×3 or 3×2 grid. At `< 768px`, use the mobile 2×2 layout.

---

### Section 3: VG Stack 01–05

**Component:** `<VGStack />` with `<StackItem />` sub-components  
**Background:** `bg-[#0A1628]`  
**Padding:** `py-24` desktop / `py-14` mobile

**Section header (desktop):** `grid grid-cols-12 gap-8 mb-16`
- Left (col-span-8):
  - Overline: `text-[#4D8FFF] text-xs font-semibold tracking-[0.12em] uppercase mb-4` → "The System"
  - H1: `text-white font-extrabold` 56px → "The VG Stack"
  - Body: `text-[#8891A0] text-lg max-w-[520px] leading-relaxed`
- Right (col-span-4): version badge aligned bottom-right → `border border-[#1E3050] rounded-lg px-4 py-2 font-mono text-xs text-[#8891A0] tracking-wider` → "SPEC REV. 01 — 2026"

**Mobile header:** Single column, no version badge visible.

**Stack Items (5 total):** Each is an `<article>` element.

**Desktop layout per item:** `grid grid-cols-12 gap-6 relative border-t border-[#1E3050] py-10` with `group hover:bg-white/[0.015] transition-colors overflow-hidden`

- **Watermark number:** 160px JetBrains Mono weight 900, `color: rgba(255,255,255,0.04)`, absolute positioned right edge, vertically centered. `pointer-events-none; user-select:none;`
- Column 1 (col-span-2): `STACK 0X` label in mono `text-[#4D8FFF] text-xs font-semibold tracking-[0.1em] uppercase` + large ghost number at 72px `text-white/[0.08] font-extrabold font-mono`
- Column 2 (col-span-6): Title (30px bold white) + description paragraph (`text-[#C8D0DC] text-base leading-relaxed max-w-[480px]`)
- Column 3 (col-span-4): Layer badge aligned right — small bordered pill with label

**Layer badges:**
| Stack | Badge Text | Style |
|-------|-----------|-------|
| 01 Operators | HUMAN LAYER | `border border-[#1E3050] text-[#8891A0]` |
| 02 Builders | HUMAN LAYER | same |
| 03 Agents | AI LAYER + "9 ACTIVE" pulse | `border border-[#FF8200]/30 text-[#FF8200] bg-[#FF8200]/[0.06]` with orange pulse dot |
| 04 Practices | DELIVERY LAYER | `border border-[#1E3050] text-[#8891A0]` |
| 05 Products | SCALE LAYER | `border border-[#0051D5]/40 text-[#4D8FFF] bg-[#0051D5]/[0.08]` |

The last item (05) has both `border-t` AND `border-b`.

**Mobile layout per item:** `border-t border-[#1E3050] py-6`
- Top row: `flex items-start justify-between mb-3` — stack label left, badge right
- Title: 22px bold
- Description: `text-sm`
- No watermark numbers on mobile. No ghost numbers.

**This is NOT a reusable component** — each item has unique content. However, `<StackItem />` is a component that receives props: `number`, `title`, `description`, `badgeText`, `badgeVariant`.

---

### Section 4: Refrain Band

**Component:** `<RefrainBand />`  
**Background:** `bg-[#0051D5]` (full-bleed VG Deep Blue)  
**Padding:** `py-20` desktop / `py-14` mobile  
**Layout:** Centered text

- Overline: `text-white/60 text-sm font-semibold tracking-[0.12em] uppercase mb-5` → "Customer-facing refrain" (mobile: `text-[10px]`)
- Line 1: `text-white font-extrabold` 56px → "We don't sell tools." (mobile: 30px)
- Line 2: same style → "We solve what's costing you money." (mobile: 30px)
- Tagline: `text-white/50 text-xs font-semibold tracking-[0.14em] uppercase` → "Human-Authored · AI-Delivered" (mobile: `text-[10px]`)

---

### Section 5: Living Tree (Color Burst)

**Component:** `<LivingTree />`  
**Background:** `bg-[#F2EBDD]` (Paper)  
**Padding:** `py-24` desktop / `py-14` mobile

**Desktop layout:** `grid grid-cols-2 gap-16 items-center`
- Left column: Large logo image centered, with dramatic drop-shadow + caption text
- Right column: Six principles + Hard Rule

**Mobile layout:** Single column — logo at top centered, then principles below.

**Left column (Logo display):**
- Logo: `w-[360px] h-auto mx-auto` (desktop) / `w-[220px]` (mobile)
- Drop-shadow filter: `drop-shadow(0 24px 64px rgba(0,81,213,0.18)) drop-shadow(0 8px 24px rgba(255,130,0,0.12))`
- Caption below: "The Living Tree — Firm Identity Mark" in `text-[#5A6378] text-xs font-semibold tracking-[0.1em] uppercase text-center`
- Sub-caption: "Operators and builders as intertwined trunks. Agents as sap. Practices as branches. Products as fruit."

**Right column (Principles):**
- Overline: `text-[#0051D5]` → "Built on Six Principles"
- H2: `text-[#1A1A2E] font-extrabold` 40px → "The architecture we hold ourselves to."
- Six principles as numbered list: `space-y-4 mb-8`
  - Number: `text-[#0051D5] font-mono text-xs font-bold tracking-wider w-5` (01–06)
  - Text: `text-[#1A1A2E] text-base leading-relaxed`
- Hard Rule box: `bg-[#1A1A2E] rounded-xl p-6`
  - Label: `text-[#FF8200] text-xs font-semibold tracking-[0.1em] uppercase mb-3` → "The Hard Rule — Non-Negotiable"
  - Quote: `text-white text-base leading-relaxed` — see Copy Document

---

### Section 6: Products (Bento Grid)

**Component:** `<Products />` with `<ProductCard />` sub-components  
**Background:** `bg-[#0A1628]`  
**Padding:** `py-24` desktop / `py-14` mobile

**Header:**
- Overline: `text-[#4D8FFF]` → "What We Sell"
- H2: 48px → "Three entry points.\nOne outcome: your problem solved." (mobile: 30px single-line variant)

**Desktop layout:** `grid grid-cols-12 gap-4`

**Card A: Pain-Point Pilots (wide left)** — `col-span-7`
- Container: `bg-[#152238] border border-[#1E3050] rounded-2xl p-8 hover:border-[#0051D5]/50 transition-all`
- Top row: overline "Custom Engagement" + title "Pain-Point Pilots" left, badge "ENGAGEMENT-BASED" right
- Description paragraph
- Three checkmark items (green check SVG + text)
- CTA: Primary blue button "Start with the Free Audit →"

**Card B: Weekly Intelligence Brief (top-right)** — part of `col-span-5 flex flex-col gap-4`
- `flex-1 bg-[#152238] border border-[#1E3050] rounded-2xl p-7`
- Top row: overline "Subscription" + title "Weekly Intelligence Brief" left, price "$47 /month" right
- Price: `text-[#FF8200] font-extrabold` at 28px, "/month" below in `text-[#8891A0] text-xs`
- Description paragraph
- CTA: Ghost/outline button `border border-[#4D8FFF]/40 text-[#4D8FFF]` "Subscribe — Live on Stripe"

**Card C: 5-Agent Blueprint (bottom-right)** — same col-span-5 column
- Same structure as Brief card, price "$47 one-time"
- CTA: "Get the Blueprint — Live on Stripe"

**Mobile layout:** `space-y-4` — all three cards stacked full-width.

---

### Section 7: Founder (Ryan Dix)

**Component:** `<Founder />`  
**Background:** `bg-[#F2EBDD]` (Paper)  
**Padding:** `py-24` desktop / `py-14` mobile

**Desktop layout:** `grid grid-cols-12 gap-12 items-center`
- Left (col-span-4): Portrait card placeholder
- Right (col-span-8): Bio content

**Portrait card:**
- Container: `rounded-xl border-2 border-[#0051D5] bg-[#0A1628] overflow-hidden` with `max-width:300px; aspect-ratio:3/4` and `box-shadow: 0 0 60px rgba(0,81,213,0.12)`
- Interior (placeholder until real photo): Circular initials "RD" (20px circle in `#0051D5` with white text), name, "Portrait placeholder" text, "Deep Blue crewneck #0051D5" note
- **When real photo is available:** Replace placeholder with `<Image>` tag, `object-cover`, same frame styling

**Bio content:**
- Overline: "The Founder"
- H1: "Ryan Dix" at 48px
- Sub-title: `text-[#5A6378] text-sm font-semibold tracking-widest uppercase mb-7` → "Operator · Founder · Not a Consultant"
- Two paragraphs at `text-[#1A1A2E] text-lg leading-relaxed`
- Stats row: `flex items-center gap-8`
  - "20 yrs" / ExxonMobil + Iron Mountain
  - "Operator" / Not a consultant
  - "Ships first" / Strategy follows delivery
  - Separated by `w-px h-10 bg-[#E8DFD0]` dividers

**Mobile layout:** Portrait centered at top (180×220px), then bio stacked below. Stats in a 3-column grid.

---

### Section 8: Free AI Operating Audit

**Component:** `<AuditSection />` with `<AuditForm />` sub-component  
**Background:** `bg-[#0A1628]`  
**Padding:** `py-24` desktop / `py-14` mobile

**Desktop layout:** `grid grid-cols-2 gap-16 items-start`
- Left: What the audit is (3 numbered steps)
- Right: Intake form

**Left side:**
- Overline: `text-[#FF8200]` → "Start Here. Free. No Pitch."
- H2: 48px → "The Free AI\nOperating Audit"
- Description: `text-[#C8D0DC] text-xl leading-relaxed mb-8`
- Three steps, each with:
  - Circle number: `w-7 h-7 rounded-full bg-[#0051D5]/20 border border-[#0051D5]/40` with number in `text-[#4D8FFF]`
  - Title: `text-white font-semibold text-base mb-1`
  - Subtitle: `text-[#8891A0] text-sm leading-relaxed`

**Right side (Form):**
- Container: `bg-[#152238] border border-[#1E3050] rounded-2xl p-8`
- Title: "Take the Audit" (20px bold white)
- Subtitle: "Takes 4 minutes. Human-reviewed. No pitch on the back end." in `text-[#8891A0] text-sm mb-6`
- Four form fields — see Interactive Elements (Section 5) for details
- Submit button: Full-width primary blue, uppercase "Send Me the Audit Assessment →"
- Disclaimer: "Human-reviewed within 24 hours. No automated pitch." centered in `text-[#8891A0] text-xs`

**Mobile layout:** Single column — description first, then form card below. No three-step visualization on mobile (mobile mockup has form only).

---

### Section 9: For Builders & Operators (Recruit Band)

**Component:** `<RecruitBand />`  
**Background:** `bg-[#F2EBDD]` (Paper)  
**Padding:** `py-16` desktop / `py-12` mobile

**Desktop layout:** `grid grid-cols-2 gap-6`

**Two cards, side by side:**

**Card A: For Veteran Operators**
- Container: `bg-white border border-[#E8DFD0] rounded-xl p-8 hover:border-[#0051D5]/30 hover:shadow-[0_4px_24px_rgba(0,81,213,0.08)] transition-all`
- Overline: `text-[#0051D5]` → "For Veteran Operators"
- Title: "Plant a Practice" at 24px (mobile: 20px)
- Description: `text-[#5A6378] text-base leading-relaxed mb-6`
- CTA: Ghost link style — `text-[#0051D5] font-semibold text-sm border-b border-dashed border-[#0051D5] pb-0.5` → "Apply as an Operator Partner →"

**Card B: For AI-Native Builders**
- Same card styling
- Overline: "For AI-Native Builders"
- Title: "Earn Equity. Ship Real Work."
- CTA: "Apply as a Builder →"

**Mobile layout:** `space-y-4`, cards stacked.

---

### Section 10: Footer

**Component:** `<Footer />`  
**Background:** `bg-[#0A1628] border-t border-[#1E3050]`  
**Padding:** `py-16` desktop / `py-10` mobile

**Desktop layout:** `grid grid-cols-12 gap-8 mb-12`
- Brand column (col-span-4): Logo (`h-12`), description text, "Human-Authored · AI-Delivered" tagline
- Spacer (col-span-2)
- The Firm links (col-span-2): The VG Stack, Ryan Dix, Principles, Manifesto
- Products links (col-span-2): Pain-Point Pilots, Intelligence Brief, 5-Agent Blueprint, Free AI Audit
- Join links (col-span-2): For Operators, For Builders, FAQ, Contact

**Link styling:** `text-[#8891A0] hover:text-[#C8D0DC] text-sm transition-colors`  
**Column headers:** `text-white font-semibold text-xs uppercase tracking-widest mb-4`

**Bottom bar:** `border-t border-[#1E3050] pt-8 flex items-center justify-between`
- Left: Refrain quote in `text-[#5A6378] text-sm italic`
- Right: `© 2026 Vision Genesis LLC · All rights reserved` in `text-[#5A6378] text-xs`

**Mobile layout:**
- Logo + description + tagline stacked
- 2-column grid for footer links (The Firm | Products)
- Bottom: quote + copyright stacked

---

## 4. Asset Manifest

### 4.1 Logo

**Source file:** `/home/ubuntu/Uploads/VG Logo May 12.png`  
**Description:** Deep navy background, blue tree with golden apple orbs, "VISION GENESIS" wordmark below, "HUMAN-FIRST AI" tagline beneath.

**Usage:**
| Context | Size | Notes |
|---------|------|-------|
| Nav (desktop) | `h-10` (40px height) | Render on transparent bg if possible; the nav bg matches the logo bg |
| Nav (mobile) | `h-8` (32px height) | |
| Footer (desktop) | `h-12` (48px height) | |
| Footer (mobile) | `h-10` (40px height) | |
| Living Tree section | `w-[360px]` desktop / `w-[220px]` mobile | With drop-shadow filter |
| Favicon | 32×32 / 16×16 | Extract tree mark only, simplified to trunk + 3 orbs in a circle. Bg: `#0051D5`, tree/orbs: white + orange |
| OG Image | 1200×630 | Logo centered on Paper `#F2EBDD` background |
| Apple Touch Icon | 180×180 | Same as favicon concept, larger |

**Implementation:**
1. Place the full logo PNG at `/public/images/vg-logo.png`
2. Create optimized Next.js `<Image>` components for each usage
3. Favicon: Create `/public/favicon.ico` and `/public/favicon-32x32.png` — extract/simplify the tree mark
4. Apple touch icon: `/public/apple-touch-icon.png` at 180×180
5. OG image: `/public/og-image.png` at 1200×630

### 4.2 Ryan Dix Portrait

**Status:** Placeholder in V2 mockup. Use the circular "RD" initials placeholder until a real photo is provided.  
**Placeholder spec:** 
- Dark navy card (aspect ratio 3:4, max-width 300px desktop / 180px mobile)
- Circular blue avatar with "RD" white initials
- Caption: "Ryan Dix" + "Portrait placeholder"

**When real photo arrives:**
- Dimensions: Chest-up portrait, approximately 300×400px display area
- Ryan should be in the Deep Blue crewneck (`#0051D5`)
- Photo frame: `rounded-xl border-2 border-[#0051D5]` on Paper sections
- Use `next/image` with `object-cover` and `priority` loading

### 4.3 SVG Elements to Recreate

**Alert-circle icon (pain points):** Used in hero pain-point cards. Simple SVG:
```svg
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <line x1="12" y1="8" x2="12" y2="12"/>
  <line x1="12" y1="16" x2="12.01" y2="16"/>
</svg>
```
Color: `text-[#FF8200]`

**Checkmark icon (product features):**
```svg
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="20 6 9 17 4 12"/>
</svg>
```
Color: `text-[#22C55E]`

**Terminal traffic light dots:** Three `<span>` elements, 12px circles (desktop) / 10px (mobile), using `bg-[#EF4444]/60`, `bg-[#FF8200]/60`, `bg-[#22C55E]/60`.

**Recommendation:** Use [Lucide React](https://lucide.dev/) for all icons. Install `lucide-react` and import `AlertCircle`, `Check`, etc.

### 4.4 Font Loading

```html
<!-- If NOT using next/font/google, use this link -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

**Recommended approach:** Use `next/font/google` (shown in Section 2.2) for zero-CLS font loading.

---

## 5. Interactive Elements

### 5.1 Terminal Artifact Behavior

The terminal in the hero shows simulated live agent output. It is **NOT** connected to a real backend. The content is static text styled to look like live output.

**Implementation options (pick one):**
1. **Static with typing animation:** On page load, each terminal line fades in sequentially (200ms delay between lines) using Framer Motion. The last line has a blinking cursor (`animate-pulse` on an underscore character). This is the recommended approach.
2. **Static, no animation:** All lines visible immediately. Simplest implementation.

**Terminal line structure:**
```
› [timestamp] AgentName → Description text VALUE
```
- `›` prompt: `#FF8200`
- Timestamp: `#8891A0`
- Agent name: `#4D8FFF`
- Description: `#C8D0DC`
- Highlighted values: `#FFFFFF font-semibold`
- Success values: `#22C55E font-semibold`

**The last line** should have `opacity-50` to simulate "in progress" and a blinking cursor.

### 5.2 Live Counter / Pulse Animations

Three CSS-only animations (no JS required):

1. **`pulse-dot`** — Orange pulsing dot on the agent status pill. 2.2s ease-in-out infinite. Expands from 0 to 7px box-shadow in orange, fading out.
2. **`pulse-green`** — Green pulsing dot on the terminal "ACTIVE" indicator. 2.5s ease-in-out infinite.
3. **`counter-breathe`** — Subtle opacity breathing on the task counter (1.0 → 0.75 → 1.0). 3.5s ease-in-out infinite.

**The "47" task count** is displayed in multiple places (hero pill, proof strip, terminal footer). It should be a consistent value. In a future iteration, this could be a real-time counter from an API. For now, hardcode `47`.

### 5.3 Scroll-Reveal Animations

Use Framer Motion's `useInView` hook or the `whileInView` prop on section wrappers:

```tsx
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
```

Apply to: each section wrapper, each stack item, each product card, the form container. **Do NOT animate headlines word-by-word** — the brand system explicitly forbids typewriter effects. Animate entire elements (fade up).

### 5.4 Audit Form — Fields and Validation

**Form fields:**

| # | Label | Type | Placeholder | Validation |
|---|-------|------|-------------|------------|
| 1 | Your name | `text` | "First name" | Required, min 2 chars |
| 2 | Business email | `email` | "you@yourbusiness.com" | Required, valid email format |
| 3 | What does your business do? | `text` | "e.g. landscaping, HVAC, medical practice..." | Required, min 3 chars |
| 4 | What's costing you the most right now? | `textarea` (3 rows) | "Briefly describe the workflow or problem bleeding the most time and money..." | Required, min 10 chars |

**Input styling (dark context):**
- Background: `bg-[#0A1628]`
- Border: `border border-[#1E3050]` → focus: `border-[#4D8FFF]`
- Text: `text-[#C8D0DC]`
- Placeholder: `text-[#8891A0]/50`
- Border radius: `rounded-lg`
- Padding: `px-4 py-3 text-sm`
- No visible outline: `outline-none`
- Textarea: `resize-none`

**Label styling:** `text-[#C8D0DC] text-sm font-medium block mb-1.5`

**Submit button:** Full-width primary blue, uppercase. Text: "Send Me the Audit Assessment →"

**Form submission (initial implementation):**
- Use a Next.js Server Action or API Route that sends the form data as an email via a service like Resend, SendGrid, or a simple mailto link.
- On success: Replace the form with a success message ("Thank you! We'll review your audit within 24 hours.")
- On error: Show inline error below the submit button in `text-[#EF4444]`.
- Client-side validation: Validate on blur and on submit. Show field-level errors below each input.

### 5.5 Navigation Behavior

**Smooth scroll:** All nav links and in-page CTAs scroll smoothly to the target section. Use `scroll-behavior: smooth` on `<html>` or implement with `scrollIntoView({ behavior: 'smooth' })`.

**Active section tracking (optional enhancement):** Highlight the current section's nav link using Intersection Observer. Change link color from `#8891A0` to `#FFFFFF` when its section is in view.

**Mobile menu:** Hamburger icon triggers a slide-down panel. Use Framer Motion `AnimatePresence` for the panel. Close on link click or tap outside.

### 5.6 Hover States

| Element | Hover State |
|---------|-------------|
| Nav links | `text-[#8891A0]` → `text-white` |
| Primary button (blue) | `bg-[#0051D5]` → `bg-[#003DA0]` |
| Secondary button (outline) | Border brightens, faint blue bg: `hover:border-[#4D8FFF] hover:bg-[#4D8FFF]/10` |
| Ghost link (dashed underline) | Dashed border remains, text stays same |
| Product cards | `hover:border-[#0051D5]/50` — border shifts from `#1E3050` to blue tint |
| Recruit cards | `hover:border-[#0051D5]/30 hover:shadow-[card-paper]` |
| Stack items | `hover:bg-white/[0.015]` — extremely subtle background shift |
| Footer links | `text-[#8891A0]` → `text-[#C8D0DC]` |

---

## 6. Brand Guardrails

### 6.1 Copy Rules (Non-Negotiable)

| Always Say | Never Say |
|------------|-----------|
| Owner / Business owner | CEO (reads Fortune-500) |
| Builder | Architect, Engineer, Developer |
| Ryan Dix | Ryan J. Dix |
| Operator | Consultant |
| "We solve what's costing you money." | "We install operating systems." (internal only) |
| Practice | Project, Engagement (for ongoing work) |

### 6.2 Color Usage Rules

- **Orange `#FF8200` max 5% viewport coverage.** It appears ONLY in: pulse pills, status indicators, price numerals, terminal prompts, overline labels on the audit section. **Never** as a button fill. **Never** as a card/section background.
- **Paper sections (`#F2EBDD`) cover ~30-40% of total page area.** The page is dark-dominant.
- **No background textures.** Every surface is a flat hex color. No paper grain, no noise, no gradients except the hero's subtle radial gradient.
- **No glassmorphism, frosted glass, or blur-behind effects** on content containers. The nav's `backdrop-blur-sm` is the only blur allowed.

### 6.3 Typography Rules

- **Inter is the ONLY UI font.** JetBrains Mono for terminal/code contexts only.
- **No serif fonts anywhere.** No Cormorant Garamond. No italic accent words.
- **No typewriter/word-reveal animations** on headlines.
- **No drop shadows on text** — anywhere.

### 6.4 Photography Direction

- Ryan is always in the Deep Blue `#0051D5` crewneck.
- Chest-up framing, direct eye contact, confident but approachable.
- No crossed arms. Natural or warm lighting.
- No stock photography of any kind. The only humans on the site are VG people.
- No "AI brain" imagery, no gradient mesh, no robot handshake stock photos.

### 6.5 Do's and Don'ts Summary

**DO:**
- Lead the hero with the owner's PAIN before the VG solution
- Show the terminal artifact with real (simulated) agent output
- Use massive display type (86px desktop) for typographic impact
- Alternate Paper and Dark sections (never stack two of the same)
- Use the numbered STACK 01–05 pattern with monospace labels
- Make the Living Tree section the ONE full-color moment

**DON'T:**
- Add gradient mesh, aurora, blob backgrounds
- Use orange as a button fill color
- Overclaim — no "we've helped 500 businesses"
- Animate headlines or hero text
- Stack more than 2 CTA buttons in one viewport
- Use the tree mark below 24px without simplifying to badge variant
- Put the aspirational refrain ("We install operating systems") anywhere customer-facing

---

## 7. SEO & Meta

### 7.1 Page Title & Meta Description

```html
<title>Vision Genesis — Human-First AI | We Solve What's Costing You Money</title>
<meta name="description" content="Vision Genesis pairs veteran operators with AI-native builders to solve the most expensive pain points inside real businesses — without replacing the people who run them. Take the free AI Operating Audit." />
```

### 7.2 Open Graph Tags

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://visiongenesis.ai" />
<meta property="og:title" content="Vision Genesis — Human-First AI" />
<meta property="og:description" content="Owner-operated AI implementation. We find the three workflows bleeding your P&L and fix them — without replacing a single person." />
<meta property="og:image" content="https://miro.medium.com/v2/resize:fit:1200/1*xXj49xg5ssadYdSwwwtPVg.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Vision Genesis" />
```

### 7.3 Twitter Card

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Vision Genesis — Human-First AI" />
<meta name="twitter:description" content="Owner-operated AI implementation. We find the three workflows bleeding your P&L and fix them — without replacing a single person." />
<meta name="twitter:image" content="https://dng.ai/wp-content/uploads/2025/04/social-1.jpg" />
```

### 7.4 Additional Meta

```html
<meta name="theme-color" content="#0A1628" />
<link rel="canonical" href="https://visiongenesis.ai" />
<meta name="robots" content="index, follow" />
```

### 7.5 Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vision Genesis",
  "url": "https://visiongenesis.ai",
  "logo": "https://mma.prnewswire.com/media/2722154/Genesis_AI_Logo.jpg?p=facebook",
  "description": "Owner-operated AI implementation firm that pairs veteran operators with AI-native builders to solve real business pain points.",
  "foundingDate": "2026",
  "founder": {
    "@type": "Person",
    "name": "Ryan Dix",
    "jobTitle": "Founder"
  },
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "url": "https://visiongenesis.ai#audit"
  }
}
```

Also add a `LocalBusiness` or `ProfessionalService` schema if appropriate:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Vision Genesis",
  "url": "https://visiongenesis.ai",
  "description": "AI implementation for owner-operated businesses ($2M-$50M revenue)",
  "priceRange": "$47 - Custom",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Implementation Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Weekly Intelligence Brief",
        "price": "47.00",
        "priceCurrency": "USD",
        "description": "14 sources synthesized weekly into 3 actionable items. Operator-curated."
      },
      {
        "@type": "Offer",
        "name": "5-Agent Business Blueprint",
        "price": "47.00",
        "priceCurrency": "USD",
        "description": "The five agents every owner-operated business should run today."
      },
      {
        "@type": "Offer",
        "name": "Free AI Operating Audit",
        "price": "0",
        "priceCurrency": "USD",
        "description": "10 questions. Graded assessment. Know where AI fits in your business."
      }
    ]
  }
}
```

---

## 8. Copy Document

All text content extracted from the V2 mockup. Copy-paste directly. HTML entities have been decoded to readable characters.

---

### NAV

```
Links: The Stack | Products | For Builders | Ryan Dix
CTA: FREE AI AUDIT →
```

---

### HERO

**Agent pill:**
```
9 Agents · Active
```

**Pipeline pill:**
```
PIPELINE: 47 TASKS IN PROGRESS
```

**Headline:**
```
Your best people
are buried in work
that shouldn't exist.
```
(Last line "that shouldn't exist." is in `#0051D5`)

**Pain point 1:**
```
Your estimator spends 3 hours quoting what should take 20 minutes
```

**Pain point 2:**
```
You bought software your team works around instead of with
```

**Pain point 3:**
```
The consultant took $40k and handed you a deck nobody reads
```

**Solution pivot:**
```
We find the three workflows bleeding your P&L and fix them — without replacing a single person.
```
("without replacing a single person." is `<strong class="text-white">`)

**Primary CTA:**
```
Take the Free AI Operating Audit →
```

**Secondary CTA:**
```
See the System ↓
```

---

### TERMINAL

**Chrome title:**
```
VG Agent Terminal — Live Output
```
(Mobile: "VG Agent Terminal")

**Status indicator:**
```
ACTIVE
```
(Mobile: "LIVE")

**Terminal lines (desktop — full):**
```
› [08:41:03] EstimateAgent → Parsed 847-word voice note → structured quote in 18s
› [08:41:19] SchedulerAgent → Resolved 3 crew conflicts, updated CRM, sent confirmations
› [08:41:47] IntelAgent → 14 sources → 3 actionable items. Digest compiled.
› [08:42:01] EstimateAgent Estimate approved by operator. Sent to client. 23 min total.
› [08:42:18] OpsAgent → Parsing supplier invoice_
```

**Terminal lines (mobile — condensed):**
```
› EstimateAgent → Voice note → quote in 18s
› SchedulerAgent → 3 crew conflicts resolved
› IntelAgent → Digest: 3 actions flagged
› EstimateAgent Approved & sent. 23 min.
```

**Terminal footer stats (desktop):**
```
TASKS TODAY: 47 | AGENTS: 9/9 ONLINE | UPTIME: 100%
```

**Terminal footer stats (mobile):**
```
TASKS TODAY: 47 | 9/9 ONLINE
```

---

### PROOF STRIP

**Live counter label:**
```
Tasks completed today
```

**Live counter value:**
```
47
```

**Stat 1:** `20` — Years Operator Experience  
**Stat 2:** `9` — AI Agents Active  
**Stat 3:** `170+` — Agent Specs In Pipeline  
**Stat 4:** `3` — Products Live on Stripe  
**Stat 5:** `2` — Founding Partners  

**Disclaimer:**
```
Honest scale. No inflated numbers. Here's exactly where we are.
```

---

### VG STACK

**Overline:**
```
The System
```

**Headline:**
```
The VG Stack
```

**Description:**
```
Five interdependent layers. Engineered to compound. Not a service menu — a system that runs inside a real business.
```

**Version badge:**
```
SPEC REV. 01 — 2026
```

---

**STACK 01 — Operators**

Label: `STACK 01`  
Badge: `HUMAN LAYER`

Title:
```
Operators
```

Description:
```
Veteran operators who ran real operations for decades. They hold the truth about what's actually breaking inside a business — not what the dashboard says. They lead client relationships, qualify engagements, and mentor the builders.
```

---

**STACK 02 — Builders**

Label: `STACK 02`  
Badge: `HUMAN LAYER`

Title:
```
Builders
```

Description:
```
AI-native technologists who ship working systems for paying clients from week one. Not consultants. Not architects. Builders — people who hold equity and deliver. They progress under operator mentorship. The firm is only as good as what they ship.
```

---

**STACK 03 — Agents**

Label: `STACK 03`  
Badge: `AI LAYER` + `9 ACTIVE` (with orange pulse)

Title:
```
Agents
```

Description:
```
An internal team of named AI agents — 9 today, 170+ in the specification pipeline — handling research, drafting, scheduling, and monitoring. Coordination layer, not decision layer. People still make the calls. Agents multiply judgment. They do not lead it.
```

---

**STACK 04 — Practices**

Label: `STACK 04`  
Badge: `DELIVERY LAYER`

Title:
```
Practices
```

Description:
```
One operator + one builder + one agent team, installed inside a real business. Each practice is the unit the firm scales by. Not a project with a handoff date. A working relationship where VG has a P&L stake in the outcome. The practice stays until the system runs without us.
```

---

**STACK 05 — Products**

Label: `STACK 05`  
Badge: `SCALE LAYER`

Title:
```
Products
```

Description:
```
Every engagement is R&D for the next product. What we solve for one owner becomes a packaged system the next owner can buy. The firm scales by standing up more practices AND productizing what proves useful. Custom today. Packaged tomorrow. Knowledge that compounds.
```

---

### REFRAIN BAND

**Overline:**
```
Customer-facing refrain
```

**Line 1:**
```
We don't sell tools.
```

**Line 2:**
```
We solve what's costing you money.
```

**Tagline:**
```
Human-Authored · AI-Delivered
```

---

### LIVING TREE

**Logo caption:**
```
The Living Tree — Firm Identity Mark
```

**Logo sub-caption:**
```
Operators and builders as intertwined trunks. Agents as sap. Practices as branches. Products as fruit.
```

**Overline:**
```
Built on Six Principles
```

**Headline:**
```
The architecture we hold ourselves to.
```

**Principle 01:**
```
Restructure the work; never replace the people.
```

**Principle 02:**
```
Truth before sales pressure. Even when it costs us the engagement.
```

**Principle 03:**
```
Playbooks, not dependencies. The system you keep is yours.
```

**Principle 04:**
```
Agents multiply judgment. They do not lead it.
```

**Principle 05:**
```
Every engagement is R&D for the next product.
```

**Principle 06:**
```
Builders and operators are owners. Equity follows delivery, not tenure.
```

**Hard Rule label:**
```
The Hard Rule — Non-Negotiable
```

**Hard Rule text:**
```
"We do not serve companies whose explicit goal is to reduce headcount. AI multiplies team capacity. It does not replace people."
```

---

### PRODUCTS

**Overline:**
```
What We Sell
```

**Headline:**
```
Three entry points.
One outcome: your problem solved.
```
(Mobile: "Three entry points. One outcome.")

---

**Product 1: Pain-Point Pilots**

Overline:
```
Custom Engagement
```

Title:
```
Pain-Point Pilots
```

Badge:
```
ENGAGEMENT-BASED
```

Description:
```
One operator. One builder. One expensive workflow — diagnosed and fixed. We embed with your team, find the bleed, and ship a working AI system. You keep the playbook. The agents stay running.
```

Feature 1:
```
Voice-to-Quote: 72-hour turnaround → 20 minutes for a landscaping operator
```

Feature 2:
```
Event Management Ledger in build with Southeastern Dermatology
```

Feature 3:
```
You own the output. No recurring dependency on VG.
```

CTA:
```
Start with the Free Audit →
```

---

**Product 2: Weekly Intelligence Brief**

Overline:
```
Subscription
```

Title:
```
Weekly Intelligence Brief
```

Price:
```
$47 /month
```

Description:
```
14 sources synthesized weekly into 3 things worth acting on. Operator-curated. For owners who don't have time to sort signal from hype.
```

CTA:
```
Subscribe — Live on Stripe
```

---

**Product 3: 5-Agent Business Blueprint**

Overline:
```
Strategic Deliverable
```

Title:
```
5-Agent Business Blueprint
```

Price:
```
$47 one-time
```

Description:
```
The five agents every owner-operated business should run today — with specs, priority, and ROI framing your team can act on immediately.
```

CTA:
```
Get the Blueprint — Live on Stripe
```

---

### FOUNDER

**Overline:**
```
The Founder
```

**Name:**
```
Ryan Dix
```

**Subtitle:**
```
Operator · Founder · Not a Consultant
```

**Bio paragraph 1:**
```
20 years at ExxonMobil and Iron Mountain running industrial finance and operations. Not in a slide deck — in the field. When something broke, Ryan fixed it. When a process was costing money nobody could explain, Ryan found it.
```

**Bio paragraph 2:**
```
Vision Genesis is what happens when that operator stops renting consultants and starts building AI systems with people who know how to ship. The firm exists because the market has too many strategy decks and not enough working systems.
```

**Stat 1:** `20 yrs` — ExxonMobil + Iron Mountain  
**Stat 2:** `Operator` — Not a consultant  
**Stat 3:** `Ships first` — Strategy follows delivery  

---

### FREE AI OPERATING AUDIT

**Overline:**
```
Start Here. Free. No Pitch.
```

**Headline:**
```
The Free AI
Operating Audit
```

**Description:**
```
10 questions. Graded assessment. You'll know exactly where AI fits in your business and what's worth fixing first — before spending a dollar with us.
```

**Step 1 title:**
```
Where are you losing time?
```
**Step 1 description:**
```
We map the workflows eating your best operators alive.
```

**Step 2 title:**
```
What's actually automatable?
```
**Step 2 description:**
```
Not everything is. We'll tell you what's worth it and what isn't.
```

**Step 3 title:**
```
What's the graded result?
```
**Step 3 description:**
```
A scored assessment of your AI readiness. Yours to keep forever.
```

---

**Form header:**
```
Take the Audit
```

**Form subheader:**
```
Takes 4 minutes. Human-reviewed. No pitch on the back end.
```

**Field 1 label:** Your name  
**Field 1 placeholder:** First name

**Field 2 label:** Business email  
**Field 2 placeholder:** you@yourbusiness.com

**Field 3 label:** What does your business do?  
**Field 3 placeholder:** e.g. landscaping, HVAC, medical practice...

**Field 4 label:** What's costing you the most right now?  
**Field 4 placeholder:** Briefly describe the workflow or problem bleeding the most time and money...

**Submit button:**
```
Send Me the Audit Assessment →
```

**Disclaimer:**
```
Human-reviewed within 24 hours. No automated pitch.
```

---

### FOR BUILDERS & OPERATORS

**Card 1: Veteran Operators**

Overline:
```
For Veteran Operators
```

Title:
```
Plant a Practice
```

Description:
```
20+ years running operations and watching consultants burn your budget? We're recruiting operator partners who want to plant a practice with equity. You own your vertical. You mentor the builders. The firm scales behind you.
```

CTA:
```
Apply as an Operator Partner →
```

---

**Card 2: AI-Native Builders**

Overline:
```
For AI-Native Builders
```

Title:
```
Earn Equity. Ship Real Work.
```

Description:
```
You can build. You know AI. You want equity and to learn how a business actually runs. VG builders hold equity-on-delivery and work under operator mentorship from day one. This is not a junior dev role. This is a founding position.
```

CTA:
```
Apply as a Builder →
```

---

### FOOTER

**Brand description:**
```
Owner-operated AI implementation. Veteran operators paired with AI-native builders to solve the most expensive pain points inside real businesses.
```

**Tagline:**
```
Human-Authored · AI-Delivered
```

**Column 1 — The Firm:**
```
The VG Stack
Ryan Dix
Principles
Manifesto
```

**Column 2 — Products:**
```
Pain-Point Pilots
Intelligence Brief
5-Agent Blueprint
Free AI Audit
```

**Column 3 — Join:**
```
For Operators
For Builders
FAQ
Contact
```

**Bottom bar — Refrain:**
```
"We don't sell tools. We solve what's costing you money."
```

**Copyright:**
```
© 2026 Vision Genesis LLC · All rights reserved
```

---

## Appendix A: Component Architecture Recommendation

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata, JSON-LD
│   ├── page.tsx            # Home page — composes all sections
│   └── globals.css         # Tailwind imports + custom CSS (grid-bg, animations)
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── HeroTerminal.tsx    # Terminal artifact (used in hero + mobile below-fold)
│   │   ├── ProofStrip.tsx
│   │   ├── VGStack.tsx
│   │   ├── RefrainBand.tsx
│   │   ├── LivingTree.tsx
│   │   ├── Products.tsx
│   │   ├── Founder.tsx
│   │   ├── AuditSection.tsx
│   │   └── RecruitBand.tsx
│   ├── ui/
│   │   ├── Button.tsx          # Primary, Secondary, Ghost variants
│   │   ├── PulsePill.tsx       # Orange agent status pill
│   │   ├── StackItem.tsx       # Individual stack row
│   │   ├── ProductCard.tsx     # Bento grid card
│   │   ├── AuditForm.tsx       # Form with validation
│   │   └── SectionReveal.tsx   # Framer Motion scroll-reveal wrapper
│   └── icons/
│       ├── AlertCircle.tsx
│       └── Check.tsx
├── lib/
│   └── constants.ts            # All copy strings, stat values
└── public/
    ├── images/
    │   └── vg-logo.png
    ├── favicon.ico
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    └── og-image.png
```

---

## Appendix B: Suggested `page.tsx` Structure

```tsx
import { Nav } from '@/components/layout/Nav';
import { Hero } from '@/components/sections/Hero';
import { ProofStrip } from '@/components/sections/ProofStrip';
import { VGStack } from '@/components/sections/VGStack';
import { RefrainBand } from '@/components/sections/RefrainBand';
import { LivingTree } from '@/components/sections/LivingTree';
import { Products } from '@/components/sections/Products';
import { Founder } from '@/components/sections/Founder';
import { AuditSection } from '@/components/sections/AuditSection';
import { RecruitBand } from '@/components/sections/RecruitBand';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <VGStack />
        <RefrainBand />
        <LivingTree />
        <Products />
        <Founder />
        <AuditSection />
        <RecruitBand />
      </main>
      <Footer />
    </>
  );
}
```

---

## Appendix C: Section ID Map (for scroll-to navigation)

| Nav Link | Target Section | ID |
|----------|---------------|-----|
| The Stack | VG Stack 01–05 | `#stack` |
| Products | Products Bento Grid | `#products` |
| For Builders | Recruit Band | `#join` |
| Ryan Dix | Founder Section | `#founder` |
| Free AI Audit → (all CTAs) | Audit Section | `#audit` |

---

*This document is the single source of truth for building the Vision Genesis V2 website. Every design detail, every word of copy, every hex code, every spacing value is documented here. Build from this. Don't guess.*
