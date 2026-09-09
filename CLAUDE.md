# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for Eapen Technology, Justus Eapen's AI automation and training practice. The homepage leads with on-site AI training for leaders at established companies, using their real work. The upright gold/red layout includes one portrait, an immediate workshop explanation, supported professional contributions, an optional illustrative workflow, FAQ, and a clear introductory-call path. The site uses HTML, CSS, native JavaScript modules, and nginx; there is no bundler or framework.

## Development

**Run locally:**
```bash
python3 -m http.server 8000 --bind 127.0.0.1
# Visit http://localhost:8000
```

The Python server is a quick development preview and serves files that production deliberately excludes. Validate release candidates in the Docker container.

**Checks:**

```bash
node --test tests/*.test.mjs
docker build -t eapen-workshop:preview .
docker run --detach --name eapen-workshop-preview --publish 127.0.0.1:8003:80 eapen-workshop:preview
docker exec eapen-workshop-preview nginx -t
/usr/bin/python3 tests/site-integrity.py --base-url http://127.0.0.1:8003 --container eapen-workshop-preview --include-fonts
```

If replacing an existing task preview, remove only `eapen-workshop-preview` with `docker rm -f eapen-workshop-preview` before the `docker run` command. The test runner needs Node.js; the integrity script needs Python 3.9+ and no third-party packages. The tested macOS Python executable has working system CA certificates. `--include-fonts` requires internet access; omit it for first-party-only checks.

`tests/workshop-demo.test.mjs` checks deterministic policy transitions. `tests/workshop-navigation.test.mjs` checks case loading, races, timeout, history, focus, native-link behavior, and cancellation. `tests/workshop-browser.cua.mjs` and `tests/workshop-lifecycle.cua.mjs` are separate real-browser regression fixtures requiring a documented CUA tab/CDP session; their headers explain invocation. The Python integrity test checks actual production HTTP responses, exact public files, internal links, media signatures, and transfer budgets. It fails if the container's public bytes differ from the checkout.

There is no package manifest, configured linter, or typecheck. See `docs/audits/eapen-workshop-release.md` for browser evidence and coverage limits, and `docs/audits/eapen-workshop-packaging.md` for the current container measurements.

## Architecture

- **`index.html`:** Semantic homepage content, responsive hero portrait, on-site training offer, biography and three ordinary case links, a native details disclosure containing the workflow, FAQ, secondary custom build, contact, optional essays, and a native case dialog. Section destinations are `#offers`, `#work`, `#about`, `#method`, `#faq`, `#build`, `#essays`, and `#contact`; `#workflow-stage` reaches the rehearsal directly. Substantive content and engagement links remain accessible without JavaScript.
- **Styles:** `styles/site.css` owns homepage composition and shared utilities; `styles/workshop-demo.css` scopes the rehearsal; `styles/cases.css` serves both standalone case pages and their dialog articles. Homepage mobile composition changes at 760px, the rehearsal stacks at 900px, and case pages adapt at 900px/640px, with additional intermediate and narrow-screen rules.
- **`scripts/site.js`:** Initializes the rehearsal and case navigation only. The fallback explanation is hidden only after successful rehearsal initialization. There is no decorative hero parallax or paper-prop motion.
- **`scripts/workshop-policy.js`:** Pure, deterministic state transitions for two fictional samples and two missing-source policies. Requesting a source holds the submission; omitting the claim prepares a marked revision for editor review. Replay preserves policy; Reset clears it. No model calls, personal inputs, storage, or publishing occur.
- **`scripts/workshop-demo.js`:** Renders the rehearsal, announces results, manages focus, and controls cancelable Web Animations API choreography. State and navigation work independently of animation completion. Keep the static HTML explanation alongside this enhancement.
- **`scripts/workshop-navigation.js`:** Fetches approved same-origin case paths into a native dialog, with ordinary-page fallback, a three-second timeout, cancellation of stale requests, loading/direct links, and Back/Forward/focus restoration. Modified clicks retain native behavior.
- **Canonical pages:** `work/1t-home.html`, `work/tradecraft.html`, and `work/pavlok.html` contain the actual case articles. The dialog imports those articles; do not maintain a second case-prose copy in JavaScript. Original essay URLs remain under `essays/`.
- **Assets and evidence:** `assets/workshop/1t-product.webp` and `tradecraft-product.webp` are actual product screenshots captured through CUA on September 8, 2026 from `https://1thome.com/` and `https://rooferrate.com/`. They were resized to 1200px with cwebp quality 82, without compositional edits. Retired generated scenery and its source/provenance remain under `assets/workshop/`, `design/workshop/`, and `docs/design/`; it is not used by the current hero. Those product screenshots are now retired from the homepage and case pages; current project content uses concise supported role and product details. Keep generated scenery and conceptual drawings distinct from actual project evidence. `assets/social-card.png` is a genuine 1200 × 630 PNG; the integrity test verifies its signature and dimensions.

The **portrait** appears only in the hero and uses responsive `assets/justus-headshot-{400,800}.webp` files. The September revision uses an approved AI-generated portrait; source, exact prompt, and approval are documented in `docs/audits/2026-09-08-portrait.md`. `portrait.jpg` is the preserved original. The full-resolution generated PNG is kept in the repo but is not copied into the production image.

## Design Conventions

- **Fonts (external, Google Fonts):** Newsreader (serif headings + pull quotes), Archivo (body/buttons), IBM Plex Mono (eyebrows, labels, stats). Loaded via `<link>` in `<head>` — this is the one place the site depends on an external host.
- **Homepage palette:** Warm charcoal `#191616` / `#131111`, surface `#211c1c`, oxblood red `#762a33`, paper `#f1ece2` / `#e6ded1`, muted `#b9aea3`, and gold `#d6b36a`, as defined in `styles/site.css`. The user selected gold and red during the September Workshop polish. Workflow holds use rose paper; revised/ready outcomes use warm parchment.
- **Eyebrows** use uppercase mono labels and section numbers `01 / …` through `04 / …`. Keep numbering contiguous when adding/removing sections.
- Keep readable text in HTML. Use upright aligned panels, restrained borders, and real product imagery; do not restore decorative paper props, folded corners, tilted content, or hero parallax. Workflow motion uses translation and opacity while preserving reduced-motion behavior, cancellation, and ordinary scrolling. Functional icon rotations are acceptable.
- Styles and scripts are separate public files. External font CSS/files are the only runtime third-party assets. Initial mobile transfer targets at most 1 MB including fonts; compressed first-party JavaScript targets at most 40 KB. Transfer accounting alone does not establish browser performance.

## Deployment

Deployed via Coolify on Hetzner VPS (`172.252.211.242`). Pushes to `master` auto-deploy via GitHub webhook.

- **Dockerfile**: `nginx:alpine` serving the homepage, original portrait, finished root/workshop assets, `styles/`, four explicitly named public modules, `work/`, `essays/`, and crawler files. `nginx.conf` enables gzip, revalidation of unversioned text, one-hour image caching, and real 404s for missing routes.
- **SSL**: Traefik with Let's Encrypt (managed by Coolify)
- **Domain**: `eapentechnology.com`

To deploy: just `git push origin master`.

⚠️ **The Dockerfile copies files selectively — it does NOT copy the whole repo.** Every new public asset, module, stylesheet, or page must be covered by both `.dockerignore` and an appropriate `COPY` instruction, or it can 404 in production while working in local testing. Keep `tests/site-integrity.py`'s public inventory aligned with intentional additions. Public JavaScript filenames are enumerated because `scripts/` also contains operational `autopost.py`. Keep source art, docs, tests, `.claude`, essay drafts, the source portrait PNG, and unrelated `podcast.html` outside production. `python3 -m http.server` serves the entire directory, so it cannot catch this class of bug. The full HTTP integrity check above verifies the running image; a quick document-root listing is also available:

```bash
docker build -t eapen-verify . && docker run --rm eapen-verify ls /usr/share/nginx/html/
```

## Current offer

The operator confirmed on September 9, 2026: training is for leaders at established companies; Justus travels to their office, observes actual work, identifies automation opportunities, and demonstrates implementation alongside the team. Building the automation during the visit is conditional on scope. Retain 1–2 days and $2,500 per participant. Do not claim travel-inclusive pricing, guaranteed production delivery, no-coding prerequisites, or ongoing support without confirmation. See `docs/strategy/2026-09-09-onsite-ai-leadership-training.md`.

Booking links use the existing “Get Acquainted!” Calendly event and promise a 30-minute introduction. Workshop CTAs go to `#contact`; they do not imply an instant paid booking or completed workflow audit.
