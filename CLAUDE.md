# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for Eapen Technology, Justus Eapen's AI automation and training practice. The homepage presents the Eapen Workshop: a tactile editorial desk, an illustrative workflow, project case pages, and direct training/build/contact paths. Production uses HTML, CSS, native JavaScript modules, and nginx; there is no bundler or framework.

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

- **`index.html`:** Semantic homepage content, live-text desk objects, static workflow explanation, three ordinary case links, offers, biography, essays, contact, and a native case dialog. Section destinations are `#method`, `#work`, `#offers`, `#about`, `#essays`, and `#contact`; `#workflow-stage` reaches the rehearsal directly. Substantive content and engagement links remain accessible without JavaScript.
- **Styles:** `styles/site.css` owns homepage composition and shared utilities; `styles/workshop-demo.css` scopes the rehearsal; `styles/cases.css` serves both standalone case pages and their dialog articles. Homepage mobile composition changes at 760px, the rehearsal stacks at 900px, and case pages adapt at 900px/640px, with additional intermediate and narrow-screen rules.
- **`scripts/site.js`:** Initializes both enhancements and coalesces the hero's mouse-driven movement through `requestAnimationFrame`. Hidden/offscreen state and reduced-motion preferences settle or pause optional motion. The fallback explanation is hidden only after successful rehearsal initialization.
- **`scripts/workshop-policy.js`:** Pure, deterministic state transitions for two fictional samples and two missing-source policies. Requesting a source holds the submission; omitting the claim prepares a marked revision for editor review. Replay preserves policy; Reset clears it. No model calls, personal inputs, storage, or publishing occur.
- **`scripts/workshop-demo.js`:** Renders the rehearsal, announces results, manages focus, and controls cancelable Web Animations API choreography. State and navigation work independently of animation completion. Keep the static HTML explanation alongside this enhancement.
- **`scripts/workshop-navigation.js`:** Fetches approved same-origin case paths into a native dialog, with ordinary-page fallback, a three-second timeout, cancellation of stale requests, loading/direct links, and Back/Forward/focus restoration. Modified clicks retain native behavior.
- **Canonical pages:** `work/1t-home.html`, `work/tradecraft.html`, and `work/pavlok.html` contain the actual case articles. The dialog imports those articles; do not maintain a second case-prose copy in JavaScript. Original essay URLs remain under `essays/`.
- **Assets and evidence:** Finished scenic images live in `assets/workshop/`. Source art and provenance remain under `design/workshop/` and `docs/design/`. Generated scenery and conceptual drawings must remain distinguishable from actual project evidence. `assets/social-card.png` is a genuine 1200 × 630 PNG; the integrity test verifies its signature and dimensions.

The **portrait** uses `assets/justus-headshot-400.webp` in the hero identity row and responsive `assets/justus-headshot-{400,800}.webp` files in the biography. The September revision uses an approved AI-generated portrait; source, exact prompt, and approval are documented in `docs/audits/2026-09-08-portrait.md`. `portrait.jpg` is the preserved original. The full-resolution generated PNG is kept in the repo but is not copied into the production image.

## Design Conventions

- **Fonts (external, Google Fonts):** Newsreader (serif headings + pull quotes), Archivo (body/buttons), IBM Plex Mono (eyebrows, labels, stats). Loaded via `<link>` in `<head>` — this is the one place the site depends on an external host.
- **Palette:** Warm charcoal `#1c1514` / `#140f0f`, burgundy surface `#281b1b`, oxblood red `#6b252e`, paper `#f1e8d8`, muted `#bdaca0`, and gold `#d6b36a` / `#e7c986`. The user selected gold and red during the September Workshop polish. Workflow holds use rose paper; revised/ready outcomes use warm parchment.
- **Eyebrows** use uppercase mono labels and section numbers `01 / …` through `05 / …`. Keep numbering contiguous when adding/removing sections.
- Keep readable text in HTML. CSS supplies shallow object depth and optional entrance motion; SVG supplies drawings and annotations. Preserve reduced-motion behavior and ordinary scrolling.
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
