# On-site AI training landing page

September 9, 2026. Implementation follows the operator's clarification of an in-person workshop for leaders at established companies. Current preview: http://127.0.0.1:8003/.

## What changed

- Hero names the audience, on-site delivery, 1–2 day duration, and $2,500 participant price. Its primary action reaches the introductory-call section.
- Workshop explanation follows the credentials: observe actual work, identify a suitable automation, demonstrate/build alongside participants where scope allows. Framework templates remain part of the existing approved offer.
- Professional proof is concise and attributable. Pavlok's exact contribution, “designed the self-shock protocol,” is supported by the operator-approved July 15 plan. The page does not invent architecture, customer outcomes, or measured savings.
- All three canonical project stories now describe supported roles and product facts. Generic lessons, conceptual-diagram prose, stale drawing credits, and low-value landing-page screenshots have been removed from those stories. The original assets/provenance remain preserved.
- One portrait appears in the hero. The editorial example is optional through native details; the static fallback remains available without JavaScript.
- FAQs explain participants, travel to the office, preparation, and the scope-dependent distinction between a demonstration and production delivery.
- The existing Calendly event remains Get Acquainted, a 30-minute introduction. Site labels now match it; no event was edited and no booking was submitted.
- Custom systems from $25,000 remain secondary. The planned $750 playbook and original essays remain available below the primary conversion path.
- Social-preview copy and the 1200 by 630 PNG reflect on-site AI training.

## Evidence and verification

Fresh checks in this implementation:

- 22 Node tests passed across deterministic workflow policy and case navigation.
- Eight composed CUA browser checks passed: optional disclosure initially closed and keyboard-openable; policy/decision focus; hold/replay/collapse/reopen state; complete-source branch; marked revision; reset/inspector; runtime reduced-motion cancellation; dialog Escape/Back/Forward and focus restoration. Existing browser fixture was extended for disclosure behavior.
- Axe checks for WCAG 2 A/AA, 2.1 AA, and 2.2 AA returned zero violations at desktop and 320px widths. This is automated coverage, not a full accessibility certification.
- Responsive checks at 320, 390, 768, and 1440 CSS pixels found no horizontal overflow. Desktop hero/workshop and mobile hero were inspected visually.
- With scripts disabled and the page reloaded at /#workflow-stage, the disclosure opened to the static explanation, with no enhanced demo DOM. Script execution and viewport emulation were restored afterward.
- The public Calendly page showed Get Acquainted, 30 minutes, and available dates on September 9. No personal information was submitted.
- Formatting checks passed for the authored HTML/CSS/social-source files; git diff --check passed. No project linter or typecheck is configured.
- nginx config and Docker packaging passed. The final integrity result is in 2026-09-09-onsite-training/site-integrity.json: 25 exact public files, 19 local routes/resources, 22 fragment links, and 17 rejected private/missing routes. Gzipped JavaScript is 10,641 bytes. Homepage transfer upper bound including every returned font file is 465,605 bytes against the 1 MB budget.
- Final candidate image: sha256:76e4d7c6b2341eeafa997c2914f4fd7fca652d85843542d3d9a5d8a6c97116c5.

No new tests were added for static copy or CSS. The existing real-browser fixture was strengthened for the new disclosure; browser inspection and HTTP integrity verify the static changes. Controller logic did not change in this turn.

## Mobile comparison

At 390 by 844 CSS pixels, with the optional demo and FAQs closed:

| Measure | Previous refinement | On-site landing page |
|---|---:|---:|
| Page height | 9,518px | 5,507px |
| Method section height | 2,606px | 680px |
| Workshop explanation begins | 5,195px (offers section) | 828px |
| Price position | In the later offer | 374px in the hero |
| Primary CTA position | Hero | 441px |

The initial page is approximately 42% shorter. This measures layout, not conversion rate or Core Web Vitals.

## Simplification

Three independent reviewers covered reuse, code quality, and efficiency. Two quality cleanups were applied: one authoritative section spacing rule and removal of the obsolete dark-button rules. No reuse changes were needed. Lazy loading the optional demo was not applied: the current small controller keeps its existing startup/fallback behavior; introducing asynchronous loading and new failure/retry states is a separate optimization. No added tracking or backend is required by this page.

## Completed code review

The structured code review completed with a Ready to merge verdict and no remaining findings. Local reviewers covered correctness, project standards, testing, maintainability, and adversarial analysis. Two content corrections were verified: metadata promises a demonstration rather than an unconditional build, and design documentation describes one portrait and retired project screenshots accurately.

Review run: `20260909-092010-2eccc3df`. The attempted external Claude review reached its turn limit without a usable artifact; it did not supply corroborating evidence. The local adversarial fallback completed. No additional implementation changes were requested.

## Measurement limits

This is a conversion-oriented implementation, not evidence of a measured conversion increase. No visitor experiment was run. Future measurement should compare qualified introductory calls to relevant landing-page visits and record whether inquiries are for on-site training or custom builds. Do not claim guaranteed delivery, travel-inclusive prices, coding prerequisites, ongoing support, customer results, or workshop dates without additional confirmation.
