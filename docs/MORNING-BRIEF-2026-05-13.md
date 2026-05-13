# Morning Brief — Vision Genesis · 2026-05-13

**For:** Ryan
**From:** Claude Code (autonomous overnight build)
**TL;DR:** v9 (Abacus V2 redesign with your production logo) is now LIVE at canonical `/`. Fully responsive, all real URLs wired, mobile hamburger menu, audit form functional. Version history preserved at `/v6/`, `/v7/`, `/v8/`, `/v9/`.

---

## What I did overnight

You said: *"I'm going to bed - please get it all up and running. You have bypass permissions. I won't be here to click, so go at it."*

I read that as: promote v9 to production and finish the build. Here's exactly what happened.

### 1. Made v9 properly responsive (single file)

Abacus shipped two static mockups (1440px desktop + 390px mobile) — not a responsive site. I merged them into a single responsive `index.html`:

- **Mobile-first Tailwind responsive prefixes** throughout (`lg:` activates at ≥1024px)
- **Hamburger menu** for mobile nav with slide-down panel (Abacus's brief said "Claude Code decides on hamburger"; I built it)
- **Proof strip** flips from 7-stat horizontal strip (desktop) to 2×3 grid (mobile)
- **VG Stack 01-05** stacks per-item with inline layer badges on mobile; full 12-col engineering layout with 160px watermarks on desktop
- **Living Tree** stacks (logo top, principles below) on mobile; 2-col with the dramatic blue+orange drop-shadow on desktop
- **Bento products** stack on mobile; 7+5 column split on desktop
- **Founder bio** stacks on mobile; 4+8 with portrait card on desktop
- **Audit form** stacks on mobile; 2-col with 3-step explainer left, form right on desktop
- **Footer** 2-col link grid on mobile; 12-col with brand+spacer+3-link-columns on desktop
- **Hero display** scales from 40px (mobile) → 56px (sm) → 86px (lg)

### 2. Wired all the real URLs (no more `href="#"` placeholders)

| What | Was | Now |
|---|---|---|
| Weekly Brief subscribe button | `href="#"` | `https://buy.stripe.com/28E9AU1mjciQbSMbvQ5c400` (your live Stripe) |
| 5-Agent Blueprint button | `href="#"` | mailto:vision@visiongenesisai.com with subject `5-Agent Blueprint - I'd like to buy` |
| Apply as Operator Partner | `href="#"` | mailto:vision@visiongenesisai.com with subject `Operator Partner application` |
| Apply as Builder | `href="#"` | mailto:vision@visiongenesisai.com with subject `Builder application` |
| Footer "Manifesto" link | `href="#"` | mailto with subject `VG Manifesto - send me a copy` |
| Footer "Contact" link | `href="#"` | mailto with subject `VG Question` |
| Footer "@VisionGenesisAI" | `href="#"` | `https://x.com/VisionGenesisAI` |
| Audit form submission | placeholder button | functional mailto submission via JS (collects name/email/business/pain, opens user's mail client with structured email) |
| Nav links (The Stack, Products, etc.) | `href="#"` | anchor links (`#stack`, `#products`, `#builders`, `#ryan`) with `scroll-mt-20` offset for sticky nav |

### 3. Cropped your production logo into 5 working variants

Your 1254×1254 production tree-logo PNG cropped into:

- **`vg-logo.png`** — full lockup (tree + Vision Genesis + Human-First AI). Used in the Living Tree section hero (w-220 mobile / w-360 desktop) with the dramatic blue+orange drop-shadow
- **`vg-logo-tree.png`** — tree-only crop. Used in nav (h-8 mobile / h-10 desktop) and footer (h-10 mobile / h-12 desktop) where the full lockup would compress illegibly
- **`vg-logo-wordmark.png`** — "Vision Genesis" + "Human-First AI" text-only (staged for future use)
- **`vg-logo-text.png`** — just "Vision Genesis" without the tagline (staged)
- **`favicon-tree.png`** — 256×256 tree icon for browser tabs
- **`apple-touch-icon.png`** — 180×180 for iOS home-screen pinning

All 6 copied to root `/assets/` so the canonical site references them directly.

### 4. Promoted v9 → canonical `/`

The current state:

| URL | Content |
|---|---|
| **`https://visiongenesisai.com/`** | **v9 — Abacus V2 dark-navy redesign with your production logo (LIVE)** |
| `https://visiongenesisai.com/v6/` | v6.1 archive (Living Tree literary palette — what was canonical until tonight) |
| `https://visiongenesisai.com/v7/` | Round 8 honest-refrain milestone (paper+burgundy with "We solve what's costing you money" locked) |
| `https://visiongenesisai.com/v8/` | Round 11 board verdict (App Store Blue + Pantone 151 on Paper-dominant) |
| `https://visiongenesisai.com/v9/` | Direct preview pinned to v9 (identical to canonical /) |

If you wake up and disagree with promotion to canonical, revert is one git command:

```bash
cd /Users/jrd/.openclaw/workspace/vg-site && git revert e57a066 && git push
```

---

## Why I promoted v9 to canonical (and the open question on it)

**Why:**
- Your message said *"get this version of the website (output from Abacus) up and running"* — strongest reading is make v9 the live site
- v9 incorporates your production logo
- v9 has your locked v8 palette (App Store Blue #0051D5 + Pantone 151 #FF8200 + Paper #F2EBDD)
- v9 has the numbered VG Stack 01-05 and Living Tree section the board has been validating across 11 rounds

**The open question — dark-dominant vs Paper-dominant:**
Round 11 board UNANIMOUSLY confirmed Paper-dominant (~45-50% surface) was the engineered moat against AI-bro dark-mode sites. Abacus's V2 pivoted to **dark-dominant** (Palantir/Linear/Ramp aesthetic) with Paper as interruption sections (proof strip + Living Tree + Founder + Recruit, ~30-40% surface).

These are different optimization bets:
- **Dark-dominant (v9):** "engineering firm vibe," Palantir-grade typographic confidence, the terminal artifact reads as live AI
- **Paper-dominant (v8):** "operator-warm tech," differentiation moat in AI services where everyone else is dark

You picked Abacus's dark-dominant after seeing R11's Paper-dominant verdict. I assumed that means you've moved past R11's bet. If I'm wrong: revert above.

---

## What's still NOT done (flagged for your morning review)

### Hard blockers — need you to provide
1. **Real Ryan portrait** — Apple Deep Blue #0051D5 crewneck, chest-up, direct gaze. Currently shows "RD" placeholder card on the Founder section.
2. **Real Living Tree diagram** — I used your production tree logo for the Living Tree section. If you want the annotated diagram version (roots labeled Truth/Service/Ownership, branches labeled Practices, fruit labeled Productized solutions), Abacus needs to render it per the brief at `docs/ABACUS-BRIEF-V8-2026-05-12.md` Priority 1.
3. ~~**Real OG social image**~~ → DONE. Generated 1200×630 with your production logo centered on dark navy. Live at `https://visiongenesisai.com/assets/og-social.png`. Use the more elaborate "Ryan portrait + headline" version Abacus is rendering as v2 when it arrives.
4. **Calendly URL** — none of the CTAs link to scheduling. All conversion currently funnels through the Audit form (mailto) or direct mailto.

### Soft blockers — known limitations to revisit
5. **Audit form is mailto fallback** — opens user's email client. Need ConvertKit/Buttondown/Stripe webhook for proper form submission with auto-response.
6. **Inner pages don't exist** — `/ryan`, `/builders`, `/lineage`, `/faq`, `/manifesto` are not built. Footer links now anchor-scroll or mailto instead, so no 404s. Building proper inner pages is v9.1 work.
7. **No analytics wired** — no GA, no Plausible, no analytics of any kind on the live site.
8. **Tailwind via CDN** — Abacus shipped using Tailwind CDN (`https://cdn.tailwindcss.com`). That works but it's not production-optimal. The brief recommends a Next.js + Framer Motion migration; that's a separate project.

### Things I could have done but didn't
9. **Live-update the agent terminal** — currently static text. JS animation (Framer Motion's `useInView` per Abacus's brief) would add a typing-fade effect. Decided it wasn't worth the JS overhead for v9.0; static reads fine.
10. **The HeyGen-rendered avatar** — none of Christian's avatar work is wired. When Episode 01 lands, we'll integrate it.

### Late additions (after the initial push)
11. **OG social image** — generated `assets/og-social.png` (1200×630, full tree logo centered on #0A1628 navy). Wired into root + `/v9/` og:image and twitter:image. Live.
12. **`sitemap.xml`** — published at root with anchor URLs for primary sections (#stack, #products, #audit, #ryan, #builders, #principles).
13. **`robots.txt`** — published at root, allows all crawlers, blocks `_incoming/` + `secureworkspace/`, references sitemap.
14. **Brand logo link** — changed from `href="#"` to `href="/"` with proper aria-label so clicking the nav logo returns to home.

### Final addition before bed — substantive 10-question audit
You asked for the free audit to be **real intake** — 10 free-form questions, name + business type required but not counted. Built it.

**Structure (live at https://visiongenesisai.com/#audit):**
- Required basics (not counted): Name · Business email · "In one line, what does your business do?" (with operator-honest placeholder like "residential HVAC service in Knoxville · 12 trucks · 22 employees")
- Visual divider: *"10 Questions · Free-form"*
- Q01–Q10 free-form textareas, all required, each with the question + a helper placeholder that nudges the right kind of answer

**The 10 questions** — each targets a different signal so the assessment writer has real material:

| # | Question | Targets |
|---|---|---|
| 01 | Where in your business does work pile up faster than your team can clear it? | The bottleneck workflow |
| 02 | What's one task that eats more of your best people's time than it should? | Wasted-talent hours |
| 03 | What software did you buy in the last 24 months that nobody really uses? Why didn't it stick? | Tool graveyard + adoption failure pattern |
| 04 | If you could give your operations team one hour back per day, what would they actually do with it? | Real opportunity cost (not aspirational) |
| 05 | What's the most expensive mistake you watched happen in the past year — and why did it happen? | Process failure modes |
| 06 | How do you find out when something's broken — a number, a phone call, or a customer complaint? | Observability maturity |
| 07 | What does your business do better than anyone else in your market — and what would break if that one operator left tomorrow? | True moat + key-person risk |
| 08 | What's the biggest growth blocker right now — people, process, demand, or capital? | The actual constraint |
| 09 | Have you tried AI tools before? What worked, what didn't, and what did it cost you to find out? | AI maturity + skepticism level |
| 10 | If we built one thing for you in the next 90 days that paid for itself within a year, what would you want it to be? | Crystallized one-thing + ROI expectation |

**Layout restructure:** the previous 2-column audit section (3-step explainer left / 4-field form right) was redesigned because 10 textareas + a 3-step bullet list would have left massive whitespace on the left. New layout:
1. Full-width section header at top
2. 3-step explainer as a horizontal 3-card band (mobile stacks)
3. Form full-width below, centered max-w-860px card

**Mailto handler updated** to capture all 10 answers in a structured email body. Subject line is now `AI Operating Audit — <name> / <business>` so you can scan intake responses in your inbox.

**Copy updates:**
- "Takes 4 minutes" → **"Takes 10–15 minutes if you do it right"**
- "Human-reviewed within 24 hours" → **"24–48 hours. Personalized assessment, no automated pitch"**
- Submit button: "Send Me the Audit Assessment →" → **"Send Me the Personalized Assessment →"**

---

## File map for your morning review

| File | Purpose |
|---|---|
| `vg-site/index.html` | The new canonical homepage (v9 responsive build) |
| `vg-site/v9/index.html` | Mirror of canonical, pinned at `/v9/` URL |
| `vg-site/v6/index.html` | v6.1 archive (what was previously canonical) |
| `vg-site/v7/index.html` | Round 8 milestone |
| `vg-site/v8/index.html` | Round 11 milestone |
| `vg-site/docs/CLAUDE-CODE-BRIEF-VG-V2-2026-05-13.md` | Abacus's build spec (full Next.js implementation guide) |
| `vg-site/docs/ABACUS-V2-DESIGN-NOTES.md` | Abacus's design system summary |
| `vg-site/docs/ABACUS-BRIEF-V8-2026-05-12.md` | The brief we sent Abacus that produced V2 |
| `vg-site/docs/VG-BUSINESS-BRIEF-2026-05-12.md` | The strategic business brief |
| `vg-site/assets/` | Logo crops + favicon + apple-touch-icon (all root, shared by all versions) |

---

## Suggested next steps when you're back

In order of impact:

1. **Pull up `https://visiongenesisai.com/` on your phone** — verify the mobile hamburger menu, the responsive stack, the hero terminal scales right. If anything looks broken, screenshot and I'll fix.
2. **Decide: keep v9 canonical, or revert to v8/v6.1.** Both are preserved at /v8/ and /v6/. Revert is one command (`git revert e57a066`).
3. **Send Abacus back to render the priorities** in `docs/ABACUS-BRIEF-V8-2026-05-12.md`: real Living Tree annotated diagram, real Ryan portrait render (HeyGen-aligned with locked #0051D5 crewneck), OG social image, YouTube thumbnail templates.
4. **Take your operator portrait** — Apple Deep Blue #0051D5 crewneck, chest-up, direct gaze, no grin, neutral background. Drop at `vg-site/assets/ryan-portrait.jpg` and the placeholder swaps to your real face automatically.
5. **Wire Calendly** — give me the URL and I'll wire it into the primary CTAs.
6. **Hook the audit form to a real endpoint** — pick ConvertKit / Buttondown / Stripe webhook, give me the endpoint, I wire it.

---

## What still works from prior rounds (locked, no drift)

- "The system that builds yours." (primary tagline) — still in mind; not in the v9 design as a hero element (Abacus chose the problem-first hero instead). It's implicitly the brand promise. **Flag:** if you want the tagline visibly on the homepage, that's a v9.1 edit.
- "We don't sell tools. We solve what's costing you money." — present in the refrain band ✓
- "Human-Authored · AI-Delivered" — present in nav region + footer ✓
- Six principles + Hard Rule — present in Living Tree section ✓
- "Owner" not "CEO" — language clean ✓
- "Builder" not "Architect" — language clean ✓
- "Restructure the work; never replace the people" — Principle 01 ✓
- Christian = Builder #1 — implicit in Builder copy; not explicitly named (Abacus's design doesn't single him out by name on the homepage)

## What v9 explicitly DROPS from prior versions (be aware)

- **No "Operator's Log" preview tiles** — Christian's YouTube channel preview that was in v6.1 isn't in v9
- **No "Three Doors" engagement architecture** — v6.1 had "For owners / For operators+builders / For curious" as three cards; v9 collapses this into one audit funnel + one recruit band (For Operators / For Builders)
- **No "Two trunks. One firm." section** — the operator/builder craft side-by-side from v6.1 is replaced by the VG Stack 01-05 numbered system
- **No Cormorant Garamond italic burgundy** — Abacus's design uses Inter exclusively (no serif). The italic "yours" emphasis is dropped.
- **Primary tagline "The system that builds yours." is not a hero element** — replaced by the problem-first headline "Your best people are buried in work that shouldn't exist." This is a real shift.

If any of those drops bother you, they're recoverable in v9.1.

---

**Site is live. Pull it up. Let me know what to fix.**

— Claude Code, 2026-05-13 (your time still 2026-05-12, late)
