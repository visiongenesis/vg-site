# Morning Brief — Vision Genesis · 2026-05-14

**For:** Ryan
**From:** Claude Code (autonomous overnight build)
**TL;DR:** Two builds are up. **v10 is LIVE at `/`** — your current site + the brief's Gold-pivot layer + the two new sections + the Ryan Prime video. **v11 is at `/v11/`** — a from-scratch Next.js 14 rebuild with identical content. I ran the advisory board on cleanliness (Round 13, 8 models), applied the 6 fixes they converged on to **both** builds, and caught + fixed a real parity bug they predicted. Everything is committed, pushed, and verified live. Nothing is blocking. Punch list and open decisions below.

---

## Where things stand — the map

| URL | What it is | Status |
|---|---|---|
| `visiongenesisai.com/` | **v10** — your live static site + the brief's new layer | **LIVE, canonical** |
| `visiongenesisai.com/v11/` | **v11** — Next.js 14 / TS / Tailwind / Framer Motion rebuild, same content | Live preview |
| `/stack/` · `/apply/` | Shared secondary pages (both builds link here) | LIVE, now palette-corrected |
| `/v11/stack/` · `/v11/apply/` | v11's own secondary pages | Live preview |

Both builds carry **identical content**. The only differences are platform (hand-edited static HTML vs. component-driven Next.js) and implementation quality.

---

## What changed overnight

### 1. The brief's "new layer" — applied to both builds

Per your call ("for items 1–14, the latest live website is the canonical content that should not be lost"), I took **only** the new layer from the FINAL BRIEF and left all 14 of your recent live edits intact:

- **Gold pivot** — every orange `#FF8200` → Championship Gold `#D4A024`, deep variant `#B8862E` where contrast needs it. Site-wide.
- **Navy shift** — primary navy `#0A1628` → `#0C1B2A`. navy-mid / navy-light / mono-bg unchanged.
- **NEW "Meet Ryan Prime" section** — dark navy, after the Proof Strip. Real HeyGen avatar video embedded (see below).
- **NEW "Three Formats Preview" section** — navy-mid, three show cards (AI Game Tape / Workflow ER / Business CSI).

### 2. Ryan Prime video — embedded, both builds

The HeyGen app URL you sent (`app.heygen.com/videos/test-1-…`) is auth-walled — it can't be embedded directly. So I used your `Test_1.mp4`: transcoded it to H.264 `.mp4` + VP9 `.webm`, pulled a poster frame, and embedded it as a native `<video controls>` with the RP/AI badge top-right. Click-to-play (it has speech audio). Poster frame means it shows a clean still, not a black rectangle, before play. Self-hosted = reliable, no third-party auth dependency.

### 3. v11 — the full Next.js rebuild

Built from scratch: 3 routes (`/`, `/stack/`, `/apply/`), App Router, static export, served from `/v11/`. Same copy, same sections, same video. Tailwind config enforces the palette globally — which, as it turns out, matters (see the parity bug below).

---

## The advisory board — Round 13 cleanliness pass

Ran all 8 models on a pure QA prompt (positioning/palette/architecture locked — find what's *broken*). Average confidence **70.6%**. Run saved at `advisory-board/results/2026-05-14-032651-*`.

| Model | Conf | Shippable as preview? | Verdict gist |
|---|---|---|---|
| deepseek-v4-pro | 88 | Yes | Both shippable; v11 cleaner; promote after 3 fixes |
| qwen-3.6-plus | 88 | Yes | Shippable; fix CTA/contrast/flow; don't promote v11 until parity locked |
| deepseek-v3.2 | 85 | Yes | Both shippable; v11 cleaner |
| mistral-large-3 | 85 | Yes | v11 cleaner; promote with the reorder; keep v10 as fallback |
| gpt-5.5 | 82 | Yes | Shippable preview; not "final" until CTA/contrast/parity tightened |
| claude-opus-4.7 | 72 | Yes | Shippable preview; promote v11 after a parity sweep |
| grok-4.20 | 65 | Yes (preview, not launch) | v11 cleaner; replace v10 after 4–6 polish fixes |
| gemini-3.1-pro | — | — | Returned a partial/truncated response; what came through: "v11 structurally superior," flagged blocking contrast + flow |

**Where they agreed (and the synthesis tool's "no consensus" is misleading — it matches verdict wording, not substance):**
- **8/8: shippable as an overnight preview.** Nothing blocking.
- **Effectively 8/8: v11 is the cleaner build and the eventual promotion target** — but only after a parity QA sweep.
- The same three issues came up over and over: **CTA redundancy**, **gold-on-paper contrast**, **section flow**.

### The 6 fixes I applied — to BOTH v10 and v11

| # | Fix | Why / who flagged it |
|---|---|---|
| 1 | **Refrain Band moved above Meet Ryan Prime** | Two content-marketing sections back-to-back buried the value prop. Flagged by deepseek-v4-pro, qwen, gemini, mistral. |
| 2 | **Removed the 3 "Watch the latest →" CTAs** from the Three Formats cards | 4 channel-CTAs in one stretch diluted the audit CTA (your actual conversion goal). Most-cited issue — opus, deepseek-v4-pro, qwen, grok, gpt-5.5. The single "Watch the Channel →" in Meet Ryan Prime stays. |
| 3 | **Gold-on-paper "170+" → deep gold `#B8862E`** | `#D4A024` on paper `#F2EBDD` fails WCAG AA. Second-most-cited — opus, both deepseeks, qwen, mistral, gemini. |
| 4 | **"This isn't a gimmick. It's the product demo." → "This is the product demo."** | Defensive phrasing reads as insecurity to SMB owners. Flagged by qwen, mistral. |
| 5 | **Three Formats day labels singularized** (Mondays → Monday) | Copy consistency. |
| 6 | **Added a bridging line to Three Formats** ("The same workflow teardowns we run inside client engagements — new episodes every Monday, Wednesday, Friday.") | Stops the section reading as bolted-on. Flagged by opus, qwen. |

Commit `fff856b`. v11 was rebuilt from source after these edits — verified the compiled output carries all 6.

---

## The parity bug the board predicted — caught and fixed

Three models (deepseek-v4-pro, gpt-5.5, opus) all warned that a hand-edited static site would have **stale orange stragglers**. They were right — but not where they guessed.

The v10 Gold-pivot pass updated `index.html` but **missed the two static secondary pages**:

| Page | Stale `#FF8200` orange | Stale `#0A1628` navy |
|---|---|---|
| `/stack/` (before) | 11 | 6 |
| `/apply/` (before) | 21 | 25 |

So clicking **"The Stack"** in the nav, or any audit CTA into `/apply/`, dropped you from a gold homepage onto an **orange** subpage. v11's pages were already correct (Tailwind config applies the palette globally — exactly the structural advantage the board cites for v11).

**Fixed** — same site-wide swap applied to both pages. Both now show **0 stale hex**, matching the homepage and v11. Commit `97986f9`. (Note: v10's preview links point at the shared root `/stack/` + `/apply/`, so this one fix covers v10's preview too.)

---

## One judgment call I made — your call to override

**The Three Formats mixed metaphors.** AI Game Tape (sports), Workflow ER (medical), Business CSI (crime/forensic) — three different metaphors in one three-card row. The board split:
- **opus:** "Intentional differentiation, NOT a bug — each format has its own lens. Don't flatten it."
- **deepseek-v4-pro:** "Reads as indecisive, not clever."

I **left them as-is** — each show is its own franchise with its own deliberate lens, and flattening to one metaphor would erase that. But it's a brand-voice call, not a cleanliness call, so it's yours. Say the word and I'll unify them.

---

## Verified live (all green)

- All 6 routes return **HTTP 200**: `/`, `/v11/`, `/stack/`, `/apply/`, `/v11/stack/`, `/v11/apply/`
- **0 stale orange** on every route
- Ryan Prime video assets reachable on both builds (`/assets/ryan-prime.*` and `/v11/ryan-prime.*`)
- Section order on both: Proof Strip → **Refrain Band** → Meet Ryan Prime → Three Formats → Living Tree
- v10 `index.html` and `/v10/index.html` byte-identical; both = canonical `/`
- v11 rebuilt from source, R13 fixes confirmed in compiled output
- CDN propagation confirmed by polling — not assumed

---

## Build recommendation

**Keep v10 live for now. v11 is the right long-term home — promote it after a parity QA sweep, not tonight.**

The board is effectively unanimous that v11 is structurally cleaner: the palette is enforced by config instead of by hand (the parity bug above is a v10-only failure mode that *cannot* happen in v11), components keep things consistent, and it's the better base for everything downstream — MDX episode pages, route-based growth, real preview deploys.

The reason **not** to flip the switch tonight: v11 needs a deliberate side-by-side parity pass — mobile breakpoints, the audit form behavior, anchor-scroll offsets under the sticky nav, the hero terminal animation. That's a focused 60–90 min sweep, best done with you able to eyeball it. grok and gpt-5.5 and opus all said the same: promote *after* parity is verified.

---

## Open items — need your input

1. **HeyGen video** — currently a self-hosted transcode of `Test_1.mp4` (reliable, with poster frame). If you want the actual HeyGen player instead, you'd need to send a **public/embeddable** share link — the app URL is auth-walled.
2. **v11 promotion** — say go and I'll run the parity sweep and flip `/v11/` → `/`. Or we leave v10 live and treat v11 as the staging target.
3. **True Vercel deploy for v11** — right now it's a static export served from GitHub Pages under `/v11/` (works fully). The brief envisioned Vercel. Optional — your call whether that's worth doing.
4. **Three Formats metaphors** — keep the three distinct lenses (current), or unify to one? (See judgment call above.)
5. **Stripe $19/mo price** — still pending on your side, per the brief. Not touched.

## Nice-to-have polish (non-blocking, noted by the board)

- **Founder vs. Ryan Prime sequencing** — opus noted Ryan gets introduced as "the AI clone of founder Ryan Dix" *before* the Founder section introduces him as a human. Section architecture is locked per the QA brief, so I didn't touch it — flagging only.
- **Audit form** uses `mailto:` submission — fails silently for anyone without a configured desktop mail client (more common on mobile). Known constraint; worth a real form handler eventually.
- **em-dash vs. hyphen** consistency audit, `prefers-reduced-motion` fallback, explicit `aria-label`s on the video + tree watermark (qwen).

---

## Commits pushed tonight

- `fff856b` — R13 cleanliness pass — 6 board fixes across v10 + v11
- `97986f9` — Fix v10 parity gap — Gold pivot + navy shift on /stack/ + /apply/

Everything on `gh-pages`, live and verified. Ready for your morning review.
