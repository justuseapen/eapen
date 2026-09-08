# Eapen Workshop — preview verification

Date: 2026-09-08. Branch: `codex/eapen-workshop`.

The local landing-page demo implements the Eapen Workshop concept: a photographic desk with live-text paper objects, a visitor-controlled editorial rehearsal, three canonical project notebooks, a training-led offer, the approved portrait, and existing essays/contact paths. This report describes development evidence; it is not a production launch or a conversion claim.

## Requirements and implementation

| Requirement | Evidence |
| --- | --- |
| R1: person, audience, offer visible immediately | Hero identifies Justus, AI systems/training, media/publishing, and the $2,500/seat training path before interaction. |
| R2: approved offer ladder | Training leads; 1–2 days, $2,500/seat. Custom builds start at $25,000. The $750 playbook remains a planned edition with email interest. |
| R3: existing engagement and writing paths | Three original essay URLs, Calendly destination and direct email retained; static integrity checks crawl these paths. |
| R4: consequential, inspectable fictional workflow | Both policies have different outcomes. Requesting a source holds the intact submission; omission shows a marked revision. A complete source prepares editor review. No model/API or publication occurs. |
| R5: factual attributed projects | Three standalone case pages identify founder/software-leadership roles, link public product evidence, and distinguish original conceptual drawings from actual product artifacts and engineering commentary. The evidence ledger records claim boundaries. |
| R6: entry, exit, repeat, reset | User initiates Run. Replay retains policy; Reset clears it. The chosen rule travels into the result, followed by a training link. No inputs, uploads or personal data. |
| R7: accessible substantive paths | Semantic HTML, native links/dialog, live outcome announcement, static no-JS explanation, keyboard and reduced-motion browser checks. Additional browser/device/assistive-technology coverage is listed below. |
| R8: resilient navigation | Canonical case paths, native modified links, Back/Forward, Escape/focus restoration, immediate loading/direct link, stale-load cancellation, timeout and ordinary-page fallback. |
| R9: motion lifecycle | WAAPI state is independent of animation. Reduced motion cancels current choreography on the next frame without changing the decision; navigation/visibility/offscreen handlers settle it. |

Production code uses static HTML, scoped CSS, four native JavaScript modules, and nginx. No framework, runtime dependencies, model credentials, or new backend were introduced. Source art, plans, audits, operational scripts, tests, drafts and unrelated work stay outside the nginx document root.

## Automated and browser checks

- `node --test tests/*.test.mjs`: 22 passing tests, including domain policies and navigation races, timeout, malformed content, repeated close, focus/history state, ordinary-link behavior, cancellation and animation failure.
- `tests/workshop-browser.cua.mjs`: seven composed checks executed against the real Chromium preview through CUA. Covers every policy outcome, carried rules, replay, reset, keyboard inspector, actual focus and live text, runtime reduced-motion cancellation, native Escape and Back/Forward. Results: `eapen-workshop/browser-regression.json`.
- `tests/workshop-lifecycle.cua.mjs`: four additional real-browser checks passed for pause/resume and natural completion, stale replay callbacks and Reset, active Escape/offscreen/anchor cancellation, and duplicate initialization/destroy/reinitialization. Results: `eapen-workshop/browser-lifecycle.json`.
- `tests/site-integrity.py`: production-container responses match the checkout; canonical URLs, modules/CSS/image references and 26 fragment links resolve; 17 private/missing routes reject; the exact public allowlist, gzip, caching and transfer budgets pass. PNG/WebP/JPEG signatures and the 1200 × 630 social image dimensions are checked.
- A real artifact-format regression was caught: CUA returned JPEG screenshot bytes despite a `.png` destination. The published social card was converted to genuine PNG. The new signature check rejects the earlier staged bytes and accepts the corrected artifact.
- Seven viewport widths were checked: 320, 390, 620, 768, 900, 1024 and 1440 CSS pixels. No document horizontal overflow. A 720 × 450 CSS viewport also passed as a 200%-zoom-equivalent reflow check. This does not represent an actual OS/browser zoom or physical device test.
- Browser fault injection confirmed immediate pending text and an independent direct link. A failed enhanced fetch navigated to the complete canonical page. Clicking the direct link during an intercepted request also opened the complete page.
- With script execution disabled, the homepage retained its static policy explanation and all three case links. The CUA click helper could not complete its disabled-JavaScript interaction, so the no-JS link-following step is not claimed as separately browser-verified; direct static routes pass HTTP checks.
- Native dialog keyboard checks kept focus inside the dialog, restored the invoking case link on Escape/Back, and reopened the case on Forward. The inline rule inspector opens with Enter.
- axe-core 4.10.3 was run against the homepage, workflow states and an open Pavlok dialog. The final sweep reports zero automated violations in all six homepage/workflow states. Remaining contrast checks involve textured/gradient artwork and require visual judgment; this is not a WCAG certification.
- Normal page interactions produced no unexpected console errors. Deliberately injected network failures and rejected instrumentation commands are not counted as application errors.

## Performance evidence

The final public JavaScript is approximately 11.3 KB gzipped. A conservative homepage accounting includes both hero variants, both portrait sizes, lazy media, and every Google Fonts subset/weight returned to a mobile user agent. That upper bound is approximately 574 KB, below the 1 MB project budget. The social image is not a homepage render request.

Three fresh top-of-page loads in the Codex Chromium browser at 390 × 844, with 4× CPU slowdown, 150 ms latency, 200,000 download bytes/second and HTTP cache disabled, produced:

| Lab observation | Result |
| --- | --- |
| LCP | 1,060 / 1,088 / 1,052 ms |
| CLS | 0.0465 / 0.0465 / 0.0465 |
| Tested interaction-event duration | 48–64 ms |
| Event input delay | 0.1–0.9 ms |

These are lab observations on this Mac, not field Core Web Vitals or formal population-level INP. A same-session font cache may remain. Two reloads that restored a scrolled position yielded no LCP candidate; they are retained as excluded samples, then replaced by fresh navigations. Raw observations and limitations are in `eapen-workshop/performance.json`.

Desktop replay at normal CPU produced 135 animation-frame samples: median 16.7 ms, p95 17.5 ms, none over 33.4 ms. This measures requestAnimationFrame cadence, not GPU presentation or a real-phone benchmark. See `eapen-workshop/motion-frames.json`.

All temporary network, CPU, touch and motion emulation is restored after testing. Developer measurement code is removed by the final navigation/reload.

## Visual and simplification passes

The second pass enlarged substantive text and metadata, darkened secondary text on light surfaces, shortened the redundant rehearsal introduction, preserved deliberate mobile headline breaks, and made explicit actions move to their next step on stacked layouts. The saved policy now appears inside the outcome and a brief stroke marks the rule. Project captions name RooferRate/RoofGuide and Pavlok software leadership. Training explicitly includes reusable framework templates.

Three independent simplification lenses ran. Applied: one reuse change (initial result copy uses its existing source), one quality change (status presentation table replaces deep ternaries), and two efficiency changes (pointer calculations coalesce per frame; one motion-cancellation owner per run). Two low-value suggestions were retained deliberately: scoped screen-reader styling keeps the component self-contained, and explicit responsive typography keeps breakpoint intent readable. Source files were formatted with Prettier 3.6.2; no repository-wide lint/typecheck configuration existed.

A full independent code review, including a Claude Opus 5 pass, followed. The frozen snapshot's rendered-controller coverage finding is addressed by the two successful CUA browser suites (eleven composed checks). See `eapen-workshop/code-review.json` for the immutable review receipt and `eapen-workshop/review-follow-up.md` for remediation. The review found no confirmed runtime or security defect. Actual hidden-tab and back/forward-cache restoration remain unverified; synthetic lifecycle dispatch is not represented as equivalent evidence.

## Final visual evidence

- `eapen-workshop/desktop-hero-final.jpg`
- `eapen-workshop/desktop-workflow-final.jpg`
- `eapen-workshop/desktop-case-final.jpg`
- `eapen-workshop/mobile-hero-final.jpg`
- `eapen-workshop/mobile-result-final.jpg`

These captures show the finished visual design. The first-pass captures remain development evidence, not the final appearance.

## Before production launch

The current deliverable is a local preview and reviewable branch. Production has not been changed.

- Safari, Firefox, VoiceOver and physical touch-device testing remain unverified. They were not exposed by the enabled CUA app/browser surfaces. Attempting a separate Chrome extension tab timed out; no separate Chrome result is claimed. Raw in-app CDP touch dispatch is unsupported, so an actual touch-event test is not claimed.
- Five representative-buyer comprehension/recall sessions were not conducted. The plan identifies them as formative research, not a reason to pretend validation occurred or stall the demo.
- More detailed personal architectural contribution evidence or authentic product photography can deepen the case stories. The current pages keep roles factual and engineering considerations explicitly separate from historical implementation claims.
- A real production performance baseline and qualified-inquiry baseline still need collection; no conversion uplift is claimed.

For launch, merge only after the intended browser/device checks and review. Verify the homepage, all three case routes, portrait, CSS/modules, and existing essay links through the production URL. Observe nginx/Coolify errors and 404s for `/styles/`, `/scripts/`, `/work/` and `/assets/workshop/` during the first 30 minutes and the next day. Healthy means successful static responses and working booking links; repeated asset failures, broken case navigation or blocked conversion paths trigger rollback to the prior deployment. The deploying operator owns that verification.
