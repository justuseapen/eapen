# Eapen Workshop — evidence ledger

Checked 2026-09-08. This ledger covers the three canonical case stories and their original SVG studies. It separates the operator’s existing public role claims, official current product material, and explicitly illustrative engineering commentary.

## Attribution baseline

The existing, authorized `index.html` at commit `f606db9f9035ca8287b53e0cb3776a9ddf91a893` is the source for personal roles. The case stories retain its scope:

| Case | Existing claim retained | Source location in baseline |
| --- | --- | --- |
| 1T Home | Founder; building local AI infrastructure, including an inference machine designed to run large models at home. | `index.html`, work entry, lines 397–401. |
| TradeCraft | Founder; RooferRate and RoofGuide as products for rating contractors and scoping roof projects. | `index.html`, work entry, lines 405–409. |
| Pavlok | Head of Software; led software for a habit-changing wearable and scaled engineering to 30+. | `index.html`, work entry, lines 421–425; biography at line 381; credential strip at lines 311–313. |

These are operator-provided biography claims. The official product pages checked below provide company/product context; they do not independently verify the titles, personal contribution, or team size. Current product features are not attributed to Justus’s tenure. No employment dates, customer outcomes, sales, benchmark results, or savings are inferred.

## Public product sources

### 1T Home

| Source | Supported material used | Boundary |
| --- | --- | --- |
| [1T overview](https://1thome.com/) | Private AI ownership across workstation, professional-server, and private-infrastructure scales. The site distinguishes memory fit from throughput promises. | These are product descriptions, not verified deliveries or independent benchmarks. |
| [1T Home](https://1thome.com/home) | Owner-operated private inference workstation; technically prepared home/studio; approved serving profile and local API. | No exact price or current hardware specification is repeated, avoiding brittle time-sensitive detail. |
| [Qualification and acceptance](https://1thome.com/how-it-works) | Exact-model/workload screen; acceptance of the serving profile on the actual unit; private operating mode. | The three-step display is a compact paraphrase of a public process, not a proprietary architecture or a completed customer engagement. |

**Engineering commentary:** Checking context size, simultaneous requests, and recovery is a general engineering consideration. The article does not claim that Justus personally implemented a named architecture or achieved a particular performance result.

**Unavailable:** An owned hardware photograph, a personally attributable architectural decision, a public implementation repository, and measured deployment outcomes. The canonical page is therefore framed as a project notebook with inspectable product material, not an outcome case study.

### TradeCraft

| Source | Supported material used | Boundary |
| --- | --- | --- |
| [TradeCraft](https://tradecrafttechnology.com/) | Focused tools for roofing, estimating, and scoping; stated use of structured data, computer vision, and LLM workflows; RooferRate and RoofGuide product identities. | No claim about internal implementation, accuracy, adoption, or customer savings. |
| [RooferRate](https://rooferrate.com/) | Contractor directory; ratings/reviews; stated use of Google Places and public records; public no-paid-placement ranking promise. | Data quality and ranking behavior were not independently audited. Copy attributes these statements to the product. No directory counts are repeated. |
| [RoofGuide](https://roofguide.ai/) | Current public positioning around roof claims and project scope. | The current site has evolved beyond the older TradeCraft summary about pricing and bid comparison. Copy uses the current broad description without making insurance, financial, or legal efficacy claims. |

**Engineering commentary:** The input/comparison/decision panel and uncertainty discussion are explicitly illustrative. They are not a report of TradeCraft’s internal workflow, an actual customer estimate, or a claim about an automated decision system.

**Unavailable:** Approved customer examples, exact personal implementation details, production architecture, customer outcomes, and savings. No dates or newly discovered company-registration details are introduced into the portfolio copy.

### Pavlok

| Source | Supported material used | Boundary |
| --- | --- | --- |
| [Pavlok](https://pavlok.com/) | Wearable device and mobile-app ecosystem; current descriptions of sound, vibration, electrical feedback, and integrations including IFTTT and Zapier. | Current product context only. No present-day feature is assigned to Justus’s tenure. No clinical efficacy or habit-change outcome claims are adopted. |
| Existing Eapen biography, baseline above | Head of Software; scaled and led engineering to 30+. | Operator-authorized claim, not independently corroborated by the current Pavlok homepage. |

**Engineering commentary:** The device/software/person panel, acknowledgment-versus-command distinction, and discussion of handoffs are a labeled general design lens. They do not reconstruct Pavlok’s architecture or disclose internal incidents.

**Unavailable:** Specific tenure dates, attributable feature list, approved internal diagrams, performance outcomes, and independent corroboration of the team-size claim. The page explicitly distinguishes current company context from a list of features personally built.

## Original visual material

All three illustrations are authored as native inline SVG within the canonical article. No image generation, borrowed screenshots, or customer records are used in this unit. Titles, descriptions, and visible captions identify their illustrative status. Labels remain in text/SVG, never rasterized.

| File / figure | What it represents | What it does not represent |
| --- | --- | --- |
| `work/1t-home.html`, `case-1t-art-title` | An exploded computing-board stack within a local operating boundary. | An actual 1T hardware photograph, bill of materials, precise scale drawing, or proprietary schematic. |
| `work/tradecraft.html`, `case-tradecraft-art-title` | A conceptual roof-plan sheet and decision checklist. | A customer property, real estimate, claim file, measurement, or product screenshot. |
| `work/pavlok.html`, `case-pavlok-art-title` | An abstract wearable and a connected software signal. | A photograph or exact form of a Pavlok product, interface screenshot, or production architecture. |

The palette and typography follow the workshop direction: charcoal `#111412`, cream `#efe9dc`, sage `#8c9d83`, acid gold `#dfef93`; Newsreader, Archivo, and IBM Plex Mono. The illustration captions are visible in both standalone and dialog contexts. Desktop annotations are supplementary; mobile retains the full textual explanation and caption.

## Runtime and verification handoff

- Every canonical document contains exactly one `article[data-case-article]`. There is no duplicate prose payload elsewhere.
- Each article has a unique heading ID, semantic sections, accessible inline-SVG titles/descriptions, and its own contact and next-story links.
- The shared stylesheet is scoped to `.case-story` and `body.case-page`/`.case-page`; it does not style unqualified homepage headings or navigation.
- Internal navigation and assets use root-relative paths. Product links use ordinary external URLs with `rel="noopener noreferrer"` when opening a new tab.
- Static stories require no JavaScript. Browser enhancement, history/dialog operation, browser visual review, and selective Docker packaging belong to the integrating parent task.
- Verification for this content/styling unit: parse all three documents; check article uniqueness, IDs and ARIA references, canonical metadata, root-relative navigation, links, and absence of script dependencies; review SVG XML and CSS scope. No implementation-mirroring test files are introduced for this static content unit.

The Python standard-library audit passed for all three documents on 2026-09-08: one article and H1 per page, unique IDs, resolved ARIA references, exact canonical URLs, no scripts, existing internal destinations, booking/offer/back links, complete social metadata, and parseable SVG XML. It initially found missing lesson-heading IDs; those were added and the full audit passed. CSS selectors were checked for scope and balanced rules. Gzipped HTML sizes measured 4,105 bytes (1T Home), 4,482 bytes (TradeCraft), and 4,257 bytes (Pavlok), before HTTP compression settings. The case stylesheet is approximately 2.4 KB gzipped, excluding external fonts. No browser session, server, package installation, or shared test-state mutation was performed by this bounded worker; integrated visual and production-container checks remain the parent’s responsibility.

## Publication boundary

These pages establish a grounded portfolio foundation and give visitors substantive product context. They do **not** fill the plan’s remaining evidence gap around detailed personal architectural contributions. Adding a stronger retrospective would require an attributable decision, a publishable implementation artifact, or an approved first-person account. That limitation is recorded here rather than covered with invented narrative.
