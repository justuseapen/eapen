---
title: "feat: Add Selected Work portfolio section to corporate site"
type: feat
status: completed
date: 2026-07-15
---

# ✨ feat: Add "Selected Work" portfolio section to corporate site

Add a portfolio section to `index.html` linking to 1T Home (1thome.com), TradeCraft (tradecrafttechnology.com), and Truth Social (truthsocial.com), plus a Pavlok credit for inventing the self-shock protocol. Visually appealing, but inside the existing restrained Apple-editorial design system — no images, no new colors.

## Fact verification (done 2026-07-15)

All external claims were checked before planning, per the triple-checked-facts standard:

| Item | Verified |
|---|---|
| [1thome.com](https://1thome.com/) | Live. "1T Home — Trillion-parameter AI at home. It can pay its own way." $49,900 4× RTX PRO 6000 inference box with Vast.ai earning mode. |
| [tradecrafttechnology.com](https://tradecrafttechnology.com/) | Live. "TradeCraft — Pragmatic AI for the Trades." Products: RooferRate, RoofGuide. |
| [truthsocial.com](https://truthsocial.com/) | Live; already the site's core credential (hero + About). Role: Senior SWE, trust & safety infrastructure, 5 years. |
| [Pavlok](https://pavlok.com/) | Still on the market in 2026 — Pavlok 3, Shock Clock 3, Smart Ring sold via pavlok.com and Amazon. Justus was Head of Software (already in About). |

## Proposed section

**Placement (recommended):** new section `03 · Selected Work` between About (02) and Writing (03→04, Contact 04→05). Portfolio extends the bio, so all credibility material sits together before the essays.

**Visual treatment:** reuse the `.essay-link` bordered-list pattern with one addition — a muted role/meta line (styled like the existing `.price` class) under each title. This gives the section its own texture (title + role tag + one-line blurb) while staying text-only, one column, and consistent with the rest of the page. Hover keeps the existing accent-color affordance. All four entries are real links (Pavlok links to pavlok.com, avoiding a dead non-link entry).

### Draft copy (operator must confirm role labels before publish)

```html
<!-- index.html — insert after the About section -->
<section>
  <p class="eyebrow">03 · Selected Work</p>
  <h2>Things I've Built</h2>
  <p>Products and systems I've founded, built, or run engineering for.</p>

  <a href="https://1thome.com" class="work-link" target="_blank" rel="noopener noreferrer">
    <h3>1T Home</h3>
    <p class="role">Founder</p><!-- CONFIRM role label -->
    <p>Trillion-parameter AI at home. A burn-in-tested inference box that rents out its GPUs when you're not using them — it can pay its own way.</p>
  </a>

  <a href="https://tradecrafttechnology.com" class="work-link" target="_blank" rel="noopener noreferrer">
    <h3>TradeCraft</h3>
    <p class="role">Founder</p><!-- CONFIRM role label -->
    <p>Pragmatic AI for the trades. RooferRate and RoofGuide take the friction out of rating contractors and scoping roof projects.</p>
  </a>

  <a href="https://truthsocial.com" class="work-link" target="_blank" rel="noopener noreferrer">
    <h3>Truth Social</h3>
    <p class="role">Senior Software Engineer, trust &amp; safety infrastructure · 5 years</p>
    <p>Built and operated the internal moderation systems behind a platform under regulatory and press scrutiny most platforms never face.</p>
  </a>

  <a href="https://pavlok.com" class="work-link" target="_blank" rel="noopener noreferrer">
    <h3>Pavlok</h3>
    <p class="role">Head of Software · designed the self-shock protocol</p>
    <p>The habit-breaking wearable that zaps bad habits away. Scaled the engineering team to 30+; the device is still on the market today.</p>
  </a>
</section>
```

```css
/* index.html <style> — .work-link mirrors .essay-link plus a role line */
.work-link {
  display: block;
  padding: 24px 0;
  border-bottom: 1px solid var(--rule);
  color: var(--text);
}
.work-link:first-of-type { border-top: 1px solid var(--rule); }
.work-link:hover { text-decoration: none; }
.work-link:hover h3 { color: var(--accent); }
.work-link h3 { margin-bottom: 2px; }
.work-link .role {
  color: var(--muted);
  font-size: 14px;
  letter-spacing: 0.02em;
  margin: 0 0 8px;
}
.work-link > p:last-child { color: var(--muted); margin: 0; font-size: 16px; }
```

## Acceptance Criteria

- [x] New `03 · Selected Work` section in `index.html` with the four entries above; eyebrow/h2/h3 hierarchy matches sibling sections
- [x] All four links use `target="_blank" rel="noopener noreferrer"`; internal essay links unchanged
- [x] Section numbering contiguous after insertion: Writing → `04`, Contact → `05`; `grep -n "· " index.html site/*.md` shows no stale numbers (note: `site/writing.md` still reads `03 · WRITING` — pre-existing drift, out of scope per plan)
- [x] Truth Social entry states the employment role explicitly — nothing implies ownership of the platform
- [x] Pavlok entry links to pavlok.com (no href-less anchor); wording is "designed the self-shock protocol" (operator-approved 2026-07-15 — do NOT use "invented")
- [x] Role labels for 1T Home and TradeCraft confirmed by operator before push ("Founder" for both — operator-confirmed 2026-07-15)
- [x] No images, logos, or new colors; only the `.work-link` CSS addition
- [x] `site/portfolio.md` created mirroring the section copy (same convention as `site/about.md`)
- [~] Verified locally via `python3 -m http.server 8000` — server 200, all four external links resolve HTTP 200, no unbreakable long tokens; live-browser breakpoint screenshots (320/375/720px) NOT run — Chrome extension not connected this session
- [x] Read-through: Truth Social (hero + About + Portfolio) and Pavlok (About + Portfolio) repetition still reads intentional, not duplicated

## Context

- The site is a single self-contained `index.html` (~197 lines) — no build step; push to `master` auto-deploys via Coolify. There is no staging and no rollback gate, so local verification before push is the whole QA process.
- `CLAUDE.md`'s description of `index.html` (glass-morphism, orbs, particles) is **stale** — the file was rewritten in the 2026-06-23 AI-automation repositioning (`e81eaa7`). Worth a follow-up fix.
- **Pre-existing drift:** `site/hero.md` and `site/writing.md` still carry pre-pivot copy and no longer match the live HTML. This plan only adds `site/portfolio.md`; resyncing the rest is flagged as an open question, not silently expanded scope.
- Conversion note: this section adds four exit ramps before the Contact CTA. Mitigations built into the draft: all links `_blank`, blurbs are credential-focused rather than "go explore," and the section sits after the hero CTA. If the operator worries about leakage, the Truth Social entry could drop its link (the credential is the point; hero/About already carry it).
- `podcast.html` sits untracked at repo root — assumed unrelated to this change.

## Decisions (operator, 2026-07-15)

1. **Pavlok wording: "designed the self-shock protocol"** — not "invented" (patent-attribution caution). Already applied to the draft copy above.
2. **Truth Social: full linked entry** to truthsocial.com with the explicit employment role label. Operator confirmed listing it is acceptable.

## Remaining open questions (implementer: use the defaults, flag in PR/commit message)

1. **Role labels** for 1T Home and TradeCraft — draft assumes "Founder" for both; confirm at review.
2. **Placement** — default is after About (03); cheap to move if operator prefers it after the offers.
3. **`site/*.md` drift** — out of scope; only add `site/portfolio.md`. Leave `hero.md`/`writing.md` resync for a separate cleanup.

## Sources

- Repo: `index.html:154-182` (About + Writing patterns), `index.html:99-109` (`.essay-link` CSS), `site/about.md`, `docs/strategy/2026-06-23-value-ladder-positioning.md`, `STATUS.md`
- Pavlok market status: [pavlok.com](https://pavlok.com/), [shop.pavlok.com Pavlok 2](https://shop.pavlok.com/products/pavlok-2-updated), [Shock Clock 3](https://pavlok.com/products/shock-clock-3), [Shark Tank status 2026](https://www.sharktankcompanies.com/products/pavlok)
- Portfolio targets: [1thome.com](https://1thome.com/), [tradecrafttechnology.com](https://tradecrafttechnology.com/)
- SpecFlow analysis: compound-engineering spec-flow-analyzer run 2026-07-15 (gaps folded into criteria + open questions above)
