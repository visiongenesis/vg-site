---
name: "Vision Genesis V2"
colors:
  primary: "#0051D5"
  secondary: "#4D8FFF"
  accent: "#FF8200"
  neutral: "#5A6378"
  background: "#0A1628"
  surface: "#152238"
  error: "#EF4444"
  paper: "#F2EBDD"
  paper-dark: "#E8DFD0"
  ink: "#1A1A2E"
  dark-body: "#C8D0DC"
  dark-muted: "#8891A0"
  navy-mid: "#152238"
  navy-light: "#1E3050"
typography:
  display:
    fontFamily: Inter
    fontSize: 5.5rem
    fontWeight: 800
  heading:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: 800
  body:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 400
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 600
  mono:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "96px"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
---

## Overview
Vision Genesis V2 is a ground-up reimagination of the VG website, drawing from Palantir's typographic confidence, Linear's engineering-diagram aesthetic, Ramp's live-data energy, EOS's problem-first empathy, and Vercel's one-moment color explosion. The design targets owner-operators ($2M–$50M revenue) who have bought tools that didn't work — and need their three most expensive problems solved. Dark-dominant, typography-forward, precision-engineered.

## Color usage
- **Deep Navy `#0A1628`**: Primary page background for hero, Stack, products, footer sections. Matches the logo background — the logo always feels native.
- **Paper `#F2EBDD`**: Warm contrast sections (proof strip, Living Tree, audit form). The ONE differentiating moat in AI services. Used for ~30-40% of screen real estate.
- **VG Deep Blue `#0051D5`**: All primary CTAs, refrain band, nav active states, numbered stack labels, link colors on dark.
- **Operator Orange `#FF8200`**: Live status indicators (agent pulse), price numerals, code prompts. MAX 5% viewport coverage. Never a button fill, never a surface.
- **Pure White `#FFFFFF`**: Headlines on dark backgrounds. Terminal output highlights.
- **Dark Body `#C8D0DC`**: Body text on dark backgrounds.
- **Ink `#1A1A2E`**: Body text on Paper backgrounds.

## Typography
Inter is the only UI font. JetBrains Mono for code/terminal only.
- **Display (80-100px, weight 800)**: Hero problem statement, section-opening numbers. Tight tracking (-0.03em). Creates Palantir-level typographic confidence.
- **H1 (48px, weight 800)**: Section titles. Tight tracking.
- **H2 (36px, weight 700)**: Subsection headers, card titles.
- **Stack numbers**: Monospace treatment — 120px Inter 800 in very low opacity as background watermark, 48px `font-mono` as the label. Linear FIG-notation style.
- **Overline labels**: 12px Inter 600, ALL-CAPS, letter-spacing 0.08em. Used for `STACK 01 — OPERATORS` style labels.
- **Body**: 18px Inter 400, line-height 1.6. Never shrink below 16px.
- **Code**: JetBrains Mono 14px, Deep Navy background, `#C8D0DC` text.

## Layout
V2 is dark-dominant with alternating warm Paper accent sections:
1. **Nav**: Deep Navy, minimal, logo left + links right + single CTA
2. **Hero**: Deep Navy, problem-first, massive type, live agent pulse
3. **Proof Strip**: Paper, Ramp-style live counters
4. **VG Stack (01-05)**: Deep Navy, engineering-spec layout with Large numbered grid
5. **Refrain Band**: VG Deep Blue full-bleed
6. **Living Tree / Manifesto**: Paper — the ONE full-color explosion moment
7. **Products / Offers**: Deep Navy, bento-grid cards
8. **Founder Section**: Paper, Ryan portrait, operator biography
9. **Free Audit CTA**: Deep Navy with form
10. **Footer**: Deep Navy

Section vertical padding: 96px desktop, 64px mobile. Massive whitespace communicates confidence.
12-column grid, 1280px max content width on 1440px canvas.

## Do's and Don'ts
- Do: Use massive display type (80px+) for maximum typographic impact
- Do: Use FIG-style or numbered architectural labels for the Stack (STACK 01, STACK 02...)
- Do: Make the Living Tree section the ONLY full-color moment — deep navy to paper transition
- Do: Include live-updating pulse elements (agent counter, tasks ticker)
- Do: Lead hero with owner PAIN before the VG solution
- Do: Keep the audit as the primary conversion — single funnel
- Do: Use the logo at large scale in the hero/nav — it's the color burst anchor on dark
- Don't: Use warm Paper for more than 40% of total page area (V2 is dark-dominant)
- Don't: Add gradients, glassmorphism, or any 2021-era effects
- Don't: Use orange as a surface color or button background
- Don't: Overclaim — customer-facing refrain only ("We solve what's costing you money")
- Don't: Use any serif fonts, Cormorant, or secondary typefaces
- Don't: Add decorative wave SVGs, blob backgrounds, or generic AI illustration styles
- Don't: Put real URLs in href attributes — mockup is static, all links use href="#"
