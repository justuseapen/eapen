# Eapen Technology marketing audit

September 8, 2026. Scope: live homepage, local implementation, linked-page availability, public portrait research, responsive behavior, and production packaging. The live homepage matched the starting local `index.html` byte for byte. This report records the audit and resulting revision, which Justus reviewed and approved for publication on September 8, 2026.

## Assessment

The dark editorial design is worth keeping. The primary weaknesses were an impersonal first screen, vague promises, service cards without a next step, and proof framed more narrowly than the approved AI automation positioning. The June strategy explicitly names media and publishing as the starting market and keeps trust and safety as a proof point.

## Findings and changes

| Priority | Finding | Local revision |
| --- | --- | --- |
| High | The wedding photo is loosely framed, flatly lit, and looks away from the visitor. | Created a photo-based headshot candidate, moved it into the hero, and preserved the original. See portrait notes below. |
| High | None of the three offers has an action link; the playbook says “Start tonight” without a purchase path. | Added training/build booking links and a playbook email interest link. Treat the playbook as planned pending the owner's availability answer. |
| High | “Ten people” becoming “three,” “most clients,” and “2 clients this quarter” are unsubstantiated or time-sensitive in the materials inspected. | Replaced them with concrete descriptions of work, transparent prices, and a specific invitation to discuss one workflow. No case-study metrics or testimonials invented. |
| High | The hero speaks to everyone while the approved market is media/publishing. | Named that audience and added editorial intake, audience operations, and review/moderation as potential workflow examples. |
| Medium | “Forged where the scrutiny was worst” and “yours is not harder” risk dismissing the buyer's problems. | Kept the named roles and technical experience, with a more approachable explanation of how they transfer. Avoided implying a change in employment status. |
| Medium | Project descriptions sell the linked products more than they establish Justus's role. | Tightened role descriptions and removed distracting GPU earnings/self-shock language. Kept the actual project links and distinction between founded products and employment. |
| Medium | Booking a call gives little indication of what happens next. | Explained the 30-minute agenda and added an email alternative beside the closing CTA. |
| Medium | Small-text contrast failures and an ineffective reduced-motion selector. | Brightened faint text, corrected reduced-motion CSS, added navigation/main landmarks and a keyboard skip link, and reduced the canvas opacity. |
| Medium | The canvas keeps doing work outside the viewport and runs indefinitely. | Pauses when offscreen/hidden, respects runtime reduced-motion changes, and stops after five cumulative seconds of visible activity. |
| Medium | No canonical URL, share image, favicon, robots file, or sitemap. | Added these and explicitly included them in the production Docker image. |

## Portrait

The selected portrait is AI-generated, using the original site image for identity/current appearance and a [2018 Technical.ly portrait](https://technical.ly/company-culture/smartlogic-developers-employer-brand/) for natural expression and facial proportions. Justus approved the reviewed version for publication. The old professional photo remains an authentic alternative, though dated.

The Photos library search was blocked by macOS privacy permissions; no library content was accessed. [Portrait provenance and exact prompt](2026-09-08-portrait.md) records the sources, method, and asset paths. The 400 px and 800 px WebP assets are approximately 16 KB and 56 KB. The full-resolution generated source is retained but excluded from deployment.

## Validation

- Browser checks at 320, 390, 620, 768, 900, 1024, and 1440 px: no horizontal overflow, missing fragment targets, or broken images. Reduced-motion mode has no running entrance animations.
- Keyboard skip link and the hero services link land on the intended targets.
- axe checks for WCAG A/AA rules at 1440 and 390 px: zero detected violations. The tool cannot automatically determine contrast over the hero canvas; manual bounds analysis establishes at least 4.78:1 for the dimmest hero text, even against a conservative brightest background. This is an automated check plus targeted inspection, not a full accessibility certification.
- Browser integration verifies that the normal animation stops after five seconds and that switching reduced motion on stops drawing. Eight focused simulated lifecycle checks cover hidden/offscreen time, cleanup, and missing context/zero dimensions.
- Production Docker build passes. A container served the homepage and all nine checked new assets, crawler files, and linked essay pages with HTTP 200. No browser page errors or failed local asset responses.
- All five unique external homepage destinations (Calendly, 1T Home, TradeCraft, Truth Social, Pavlok) returned HTTP 200 with expected titles. No booking was attempted; schedule availability was not verified.
- `git diff --check` passes. Existing untracked `podcast.html` and `.claude/state/` were left untouched.

Visual records: [desktop](2026-09-08-desktop.png), [mobile](2026-09-08-mobile.png).

## Next improvements requiring real business input

1. **One concrete case study:** the workflow before, what Justus personally built, human-review safeguards, and an approved result such as time saved or reduced backlog. This is the strongest remaining proof gap.
2. **Playbook readiness:** the live copy advertised immediate access, but the approved strategy made it contingent on training content. No checkout was found. A question is pending with the owner; the local version uses an interest link.
3. **Portrait:** approved for this release. A new authentic professional photograph remains a future option.
4. **Broader writing:** retain the existing essays as specialist evidence; add a practical media/publishing automation article to connect that expertise to the larger offer.

The approved prices and existing credentials are preserved. This audit did not independently establish all historical metrics, training prerequisites, delivery guarantees, or current sales capacity. Historical `site/*.md` drafts are now explicitly marked as noncanonical in `site/README.md`.
