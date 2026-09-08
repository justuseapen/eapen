# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static landing page for Eapen Technology, a small business technology consulting service. The entire site is a single `index.html` file with no build system, no dependencies, and no framework.

## Development

**Run locally:**
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

There is no build step, no package manager, no linter, and no test suite.

## Architecture

The site is a single self-contained `index.html` with embedded CSS and JavaScript. It uses a dark editorial design (imported from a Claude Design project, 2026-07-15):

- **CSS (in `<style>`):** CSS custom properties in `:root` define the palette, type stack, and rules. Sections: nav, hero with portrait, credential strip (3 stats), services (3 cards and workflow examples), about, selected work, essays, contact, footer. Responsive breakpoints at 900px and 620px adapt the layout; the mobile portrait becomes a compact profile row.
- **HTML (in `<body>`):** A skip link, named `<nav>`, `<main>`, content sections, and footer. Nav anchors jump to `#offers`, `#about`, `#work`, `#essays`.
- **JavaScript (one IIFE at the bottom):** An ambient Conway's Game of Life animation on `<canvas id="heroCanvas">`. It reacts to mouse movement for at most five seconds of visible active time, pauses offscreen or in hidden tabs, and stops for reduced-motion preferences (including changes during the visit). Entrance animations also respect reduced motion.

The **portrait** in the hero uses responsive `assets/justus-headshot-{400,800}.webp` files. The September revision uses an approved AI-generated portrait; source, exact prompt, and approval are documented in `docs/audits/2026-09-08-portrait.md`. `portrait.jpg` is the preserved original. The full-resolution generated PNG is kept in the repo but is not copied into the production image.

## Design Conventions

- **Fonts (external, Google Fonts):** Newsreader (serif headings + pull quotes), Archivo (body/buttons), IBM Plex Mono (eyebrows, labels, stats). Loaded via `<link>` in `<head>` — this is the one place the site depends on an external host.
- **Palette (dark):** bg `#0b0c0e`, alt-bg `#0d0e10`, text `#e9e8e3`, heading `#f2f1eb`, body `#bcbab1`, muted `#a3a199`, faint `#99968d`, gold accent `#c6a052` (soft `#d9c99b`, bright `#efe4c4`). Hairline rules use `rgba(255,255,255,.07)`.
- **Eyebrows** are mono, uppercase, gold, numbered `01 — …` through `05 — …`. Keep numbering contiguous when adding/removing sections.
- All styling and scripts are inline; the only external dependency is the Google Fonts stylesheet.

## Deployment

Deployed via Coolify on Hetzner VPS (`172.252.211.242`). Pushes to `master` auto-deploy via GitHub webhook.

- **Dockerfile**: `nginx:alpine` serving `index.html`, `portrait.jpg`, WebP/SVG assets, `assets/social-card.png`, `robots.txt`, `sitemap.xml`, and `essays/`
- **SSL**: Traefik with Let's Encrypt (managed by Coolify)
- **Domain**: `eapentechnology.com`

To deploy: just `git push origin master`.

⚠️ **The Dockerfile copies files selectively — it does NOT copy the whole repo.** Any new asset (image, font, extra page) must get its own `COPY` line or it will 404 in production while working perfectly in local testing. `python3 -m http.server` serves the entire directory, so it will not catch this class of bug. To verify a new asset before pushing:

```bash
docker build -t eapen-verify . && docker run --rm eapen-verify ls /usr/share/nginx/html/
```
