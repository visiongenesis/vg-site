# Vision Genesis Website — AI Builder Prompt

Use this brief verbatim with Lovable, v0, Bolt, Cursor, Webflow AI, or any other AI website builder. The brand and copy are locked. Your job is to build the site to spec, not to edit the words.

---

## What you're building

A multi-page marketing site for **Vision Genesis** — an owner-operated AI implementation firm. The site must:

- Convey institutional credibility (the firm runs on twenty-year operating experience)
- Recruit AI-native architects (a dedicated page for that audience)
- Communicate a serious, editorial register — closer to a research firm or annual report than a SaaS landing page
- Load fast (sub-second LCP) and pass Core Web Vitals
- Be deployable to a free Cloudflare Pages or Vercel account from a single push

Build it as a multi-page site (Next.js or Astro preferred). The current draft lives at one URL with sections; you should split those into proper routes:
- `/` — Home
- `/model` — The Model
- `/principles` — Principles
- `/architects` — Architects (recruiting)
- `/engage` — Engage (client intake)

Keep the same copy across the split — do not invent new sentences.

---

## Brand identity — locked

### Palette
Use these hex values exactly. Do not introduce other colors.

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F4EFE6` | Default page background (warm cream — never pure white) |
| `--bone` | `#E7E0D0` | Section alt-band (slightly darker cream for "alt" sections) |
| `--burgundy` | `#6B1E1E` | Brand color — wordmark, accent, hero italic emphasis, hard-rule panel, brand panel background |
| `--burgundy-dark` | `#561515` | Borders on burgundy panels |
| `--ink` | `#171717` | Body text |
| `--ink-2` | `#2A2A2A` | Secondary body text |
| `--rule` | `#6F6A60` | Hairline rules (1px dashed dividers) |
| `--graphite` | `#4A4A48` | Tertiary text |
| `--muted` | `#6F6A60` | Mono caps labels, eyebrows, metadata |

### Typography
Three typefaces, three jobs. Free Google Fonts.

- **Display headings (`h1`, `h2`, `h3` in editorial sections):** **Cormorant Garamond**, weight 500, letter-spacing -0.005em. Italic in burgundy for emphasis.
- **Body prose (`<p>` in marketing sections):** **Source Serif 4**, weight 400, line-height 1.65.
- **UI text & nav (`<a>`, `<button>`, sans elements):** **Inter**, weight 400/500/600.
- **Data, eyebrows, metadata, mono caps:** **IBM Plex Mono**, weight 400, uppercase, letter-spacing 0.08–0.16em.

### Logo
Use the supplied SVG assets verbatim. The brand kit is at `/Users/jrd/vision-genesis-brand-kit/`. The site needs:

- Header: `Oxblood logo - no background.svg` (oxblood wordmark on cream paper). Render at 64px height.
- Footer column 1: `Black logo - no background.svg` at 36px height.
- Brand panel between sections: NO logo — typographic statement only (see brand panel section below).
- Favicons: use `assets/favicon/` from the brand kit (favicon-32x32.png, apple-touch-icon.png, android-chrome-512x512.png).

### Layout principles
- 12-column grid, 24px column gap
- Max content width: 1320px, with 40px horizontal padding
- Hard 1px rules as primary divider — no shadows, no rounded corners (`border-radius: 0` globally)
- Generous vertical rhythm (sections at 96–112px padding)
- Plural-noun register throughout copy ("our operators," "engagements," never "I")

### Tone
Editorial firm — not SaaS, not Big-4. Reference register: Bridgewater Associates' research notes, Stripe Press, BCG Featured Insights, Berkshire Hathaway annual reports (modernized typography), gov.uk/service-manual.

---

## Locked taglines (use verbatim — do not paraphrase)

- **Brand line on the wordmark logo (already in the SVG):** *Human-First AI*
- **Primary tagline (brand panel between Model and Principles sections):** *We've built the system that allows us to build yours.*
- **Ethics tagline (brand panel, beneath primary):** *Human-authored · AI-delivered* (mono caps, separated by middle dot)

---

## Page-by-page copy

### Site meta

- **Title tag:** `Vision Genesis — Human-First AI`
- **Meta description:** `AI operating systems that grow your business by restructuring work — not replacing your team. Installed by an owner-operated partnership of experienced business leaders and AI-native architects.`

### Header / nav

Brand mark links to `/`. Nav links right-aligned:
- The Model
- Principles
- Architects
- Engage

Header is sticky, paper background, 1px ink border-bottom.

### Home page (`/`)

#### Hero
- **Eyebrow (mono caps, burgundy):** `Human-First AI`
- **Meta line (mono caps, muted):** `Index / Home  ·  Updated [today's date]`
- **Headline (Cormorant Garamond, italic burgundy on emphasis):**
  > Build a first-mover advantage for your business in the age of *artificial intelligence*.
- **Lede (Source Serif 4, italic burgundy on `<em>`, bold ink on `<strong>`):**
  > AI operating systems that **grow your business** by restructuring work — not replacing your team. Built and installed by an owner-operated partnership of experienced business operators and AI-native architects, built on Vision Genesis, our proprietary, *human-first* AI architecture.
- **CTA primary:** `How the partnership works` (link to `/model`)
- **CTA secondary (text link):** `Engage →` (link to `/engage`)

#### Section: Why now (optional new section if you can write something specific to AI urgency without slop — otherwise skip)

#### Brand panel (full-width burgundy block between Home hero and Model preview)
- Background: `--burgundy`. Padding: 112px vertical.
- **Primary tagline (italic Cormorant, large, centered):**
  > We've built the system that allows us to build yours.
- **Ethics tagline (IBM Plex Mono, uppercase, letter-spaced 0.16em, centered, opacity 0.7):**
  > HUMAN-AUTHORED · AI-DELIVERED

#### Section preview cards linking to inner pages
Show three preview blocks linking to The Model, Principles, and Architects with one-line teasers. Use the Cormorant Garamond serif for the H3s on each card.

### `/model` — The Model

- **Eyebrow:** `01 / The Model`
- **H2:** `A partnership, not a pyramid.`
- **Body (three paragraphs):**

> Vision Genesis is a partnership, not a consulting pyramid. The architects who deliver client work hold equity in the firm. The experienced operators set the standard for what is true inside a business and what is theater. There are no junior staff, no billable-hour budgets to fill, no consensus rituals to slow the work down.

> Each engagement is a practice. One operator who has run real operations at scale. One AI-native architect who builds and ships at speed. An internal agent team that handles research, drafting, scheduling, and monitoring so a two-person practice delivers the output of a traditional consulting team. The agents do not make decisions. They give the practice room to think.

> The model scales because every engagement produces operating knowledge we can use again. What we install in one $20M company becomes a template for the next twenty. What we package as a product becomes ongoing software for the next hundred. The firm grows by standing up more practices and shipping more products — not by hiring armies of analysts.

#### Three role cells (three-column grid below body)

Each cell: mono caps eyebrow in burgundy, Cormorant H3, body paragraph, three mono caps bullets separated by 1px dashed rules.

**Role 01 / Operator**
> The operator holds the truth.
> Multi-decade veterans that have run real businesses. They name what is broken before AI is applied to it. They mentor the architect who builds.
- Industrial-scale operating experience
- Sets engagement scope and standard
- Anchors the practice in reality

**Role 02 / Architect**
> The architect builds and owns.
> AI-native technologists who ship working systems for paying clients from week one. They hold equity in the firm. They progress under operator mentorship.
- Builds operating systems, not demos
- Equity follows delivery, not tenure
- Apprenticeship inside live work

**Role 03 / Agents**
> The agents multiply judgment.
> An internal agent team runs research, drafting, scheduling, and monitoring so each practice delivers more without growing headcount.
- Coordination layer, not decision layer
- Built and operated locally
- Lets two-person practices ship like ten

### `/principles` — The six principles

- **Eyebrow:** `02 / Principles`
- **H2:** `The six the firm runs on.`
- **Intro:** `The credo of every Vision Genesis practice. Not aspirations. Operating reality.`

Render as a 2×3 grid. Each principle card has: mono caps "Principle 0X" eyebrow in burgundy, Cormorant Garamond H3, body rationale in Source Serif 4.

1. **Restructure the work; never replace the people.**
   AI multiplies team capacity. It does not reduce headcount. We do not serve companies whose explicit goal is to cut staff.

2. **We tell you the truth, even when it costs us the engagement.**
   Twenty years of running real businesses means we know when an org chart is lying about what's actually happening. We name what's broken — even when naming it costs us the work.

3. **Playbooks, not dependencies.**
   We leave you stronger than we found you. The systems we install belong to you. The playbook is yours when we're done — even if we never work together again.

4. **Agents multiply judgment; they do not lead it.**
   Our AI agents handle coordination, drafting, and follow-through. Every recommendation that reaches you traces back to a named operator and a named architect. People still make the calls.

5. **Every engagement is R&D for the next product.**
   What we solve for one company becomes a packaged system for the next hundred. Your engagement isn't just consulting — it's the blueprint we'll productize.

6. **Builders are owners. Equity follows delivery, not tenure.**
   Architects who deliver client systems hold equity in the firm. Ownership is the structural fact of the partnership, not a recruiting perk.

Below the principles grid, render the **Hard Rule** as a full-width burgundy panel (`--burgundy` background, paper text):

- **Eyebrow (cream, opacity 0.7):** `03 / The hard rule`
- **H2 (cream Cormorant Garamond):** `Who we won't serve.`
- **Small mono caps label (cream):** `EXCLUDED`
- **Body (large italic Cormorant Garamond on burgundy):**
  > We do not serve companies whose explicit goal is to reduce headcount. AI multiplies team capacity. It does not replace people. If your operating thesis is "smaller team," we are the wrong firm.

### `/lineage` (or section on home or model page) — Firms we are built like

- **Eyebrow:** `04 / Lineage`
- **H2:** `Firms we are built like.`
- **Intro:** `Vision Genesis is novel, but the structural choices have precedent. We borrow from firms that have already proven the model parts at scale.`

Render as table-like rows. Left column (200px, IBM Plex Mono uppercase, burgundy): firm name. Right column (Source Serif 4): citation. 1px dashed rule between rows.

| Firm | Citation |
|---|---|
| Edward Jones | Broad equity is a structural operating choice, not an employee benefit. |
| KKR Capstone | Operating judgment paired with implementation, embedded inside the client's actual business. |
| Apollo APPS | Embedded operating capability that changes how a company runs, not just what it spends. |
| Atomic Object | Senior craft paired with apprenticeship; shipping for real clients from week one. |
| 8th Light | Apprenticeship belongs inside the work, not beside it. |
| Berkshire Hathaway | The firm holds the standard; the practitioners hold the autonomy. |

### `/architects` — Become a partner

- **Eyebrow:** `05 / Architects`
- **H2:** `Become a partner.`
- **Three paragraphs of body:**

> Vision Genesis is built for AI-native architects who want to ship real systems for paying business owners before the career window closes. The work here is not demo-building, ticket-clearing, or maintaining a system someone else designed. It is live operating work inside real businesses that need capacity now, mentored by operators who have actually run businesses at scale.

> Ownership here is a structural fact, not a recruiting perk. Architects who deliver work hold equity in the firm. The principle is plain: the people who build the systems should share in the firm those systems create. There are no four-year cliffs, no startup-style lottery tickets, and no "we're a family" theater in lieu of equity. There is delivery, and delivery earns ownership.

> The apprenticeship is direct. You work alongside Ryan Dix and future operator-partners with twenty years of industrial-scale experience at firms like ExxonMobil and Iron Mountain. The agent team gives small human teams real capacity. This is different from a startup because the model is not unicorn-or-bust. It is different from FAANG because the work is building new operating systems, not maintaining old ones. It is different from consulting because the people who do the work own the firm.

- **CTA:** `Apply →` (mailto link to `vision@visiongenesisai.com?subject=Architect application`)

### `/engage` — How we start with a new client

- **Eyebrow:** `06 / Clients`
- **H2:** `How we start with a new client.`
- **Two paragraphs of body:**

> No sales pitches dressed up as free strategy calls. No discovery decks. Engagement begins with a written intake — three operating questions, twenty minutes of your time.

> If we're the wrong firm, we'll tell you in writing within forty-eight hours. If we're the right firm, you receive an assessment of your business and fixed-scope proposal options. No billable-hour padding. No retainer locks. The playbook is yours when we're done.

- **CTA:** `Begin intake →` (mailto link to `vision@visiongenesisai.com?subject=VG Intake`)

### Footer

Three columns, 1px ink rule above:
1. **Brand:** Vision Genesis logo (black version, 36px height) + paragraph: `An owner-operated partnership of experienced business operators and AI-native architects. We install human-first AI operating systems through practices that multiply capacity at scale.`
2. **Pages:** mono caps `PAGES` heading + nav list (The Model, Principles, Architects, Engage)
3. **Contact:** mono caps `CONTACT` heading + email link `vision@visiongenesisai.com` + X social link with X icon: `𝕏 @VisionGenesisAI` (link to https://x.com/VisionGenesisAI)

Footer meta line at the bottom (mono caps, muted): `© 2026 Vision Genesis. Human-First AI.` on the left, `v1.0 · [today's date]` on the right.

---

## Copy guardrails — never write these lines

- "We use AI to help businesses do more with fewer people."
- "Join Vision Genesis and get startup-style equity upside."
- "Our AI agents transform your business while your team watches."
- Any reference to "mid-market companies," "$2M–$50M," or other revenue-band jargon.
- Any use of "CEO" — use "owner" or "business owner" instead.
- Any first-person singular ("I") outside the bio.
- Any framing that makes the firm feel small or scrappy — no "MacBook," "Day-N," "Revenue $0," etc.
- Any use of the founder's first initial — write "Ryan Dix" or "Ryan," never "J. Ryan Dix."

---

## What to avoid (visual)

- No SaaS gradient hero. No purple-to-blue. No glass-morphism.
- No stock photography. No hero image of "diverse team in office."
- No game-room / "we're a family" perks-as-culture cheese.
- No rounded corners. No drop shadows. No animated gradients.
- No emoji icons. No isometric illustrations. No 3D blob shapes.
- No "Trusted by" logo bar with fake or placeholder logos.

---

## Technical requirements

- **Stack:** Next.js 15 (App Router) or Astro 5. Both are acceptable. Tailwind CSS optional but the design tokens above must be honored exactly.
- **Performance:** sub-second LCP on 4G. Pass Core Web Vitals. No layout shift. Inline critical CSS.
- **SEO:** semantic HTML, proper heading hierarchy, OpenGraph + Twitter card meta, sitemap.xml, robots.txt.
- **Accessibility:** WCAG 2.2 AA. Keyboard-navigable. Proper focus states. Sufficient contrast (the burgundy/cream pair passes AA at the sizes used).
- **Responsiveness:** mobile-first. Header collapses to logo + hamburger below 900px. Three-column grids stack to single column.
- **Deployment:** target Cloudflare Pages or Vercel. Single-command deploy from the repo root.
- **Hosting domain:** `visiongenesisai.com` (currently a Squarespace placeholder; DNS will be repointed once site is ready).
- **Email:** `vision@visiongenesisai.com` for all CTAs.
- **Repo:** initialize a git repo, write a clean README with setup and deploy instructions.

---

## Reference assets

The brand kit (logos, tokens, favicons) lives at `/Users/jrd/vision-genesis-brand-kit/`. Pull from there:
- `logo-source/Oxblood logo - no background.svg` — header
- `logo-source/Black logo - no background.svg` — footer
- `logo-source/Color logo with background.svg` — optional brand panel use (NOT recommended; the typographic-only brand panel is locked)
- `assets/favicon/` — favicons
- `brand-tokens/tokens.css` — CSS variable definitions

A reference HTML implementation (single-page version) is at `/Users/jrd/.openclaw/workspace/vg-site/index.html` — use it for visual ground truth, but split it into proper routes when building.

---

## Definition of done

The site is done when:
1. Every page above is built with the exact copy verbatim.
2. The visual register feels like a serious editorial firm, not a SaaS startup.
3. Lighthouse scores are 95+ across Performance, Accessibility, Best Practices, SEO.
4. The site builds and deploys to Cloudflare Pages or Vercel from a single command.
5. Every CTA email link routes to `vision@visiongenesisai.com`.
6. The repo has a README explaining setup, deploy, and how to update copy.

Build it.
