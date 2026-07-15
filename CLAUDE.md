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

- **CSS (in `<style>`):** CSS custom properties in `:root` define the palette, type stack, and rules. Sections: nav, hero, credential strip (3 stats), services (3 cards), about (with portrait slot), selected work (portfolio), essays, contact, footer. Responsive breakpoints at 900px and 620px collapse the multi-column grids to single column.
- **HTML (in `<body>`):** One top-level `<div>` wrapping the sections above. Semantic-ish structure using `<section>` for the four mid-page blocks (offers/about/work/essays) and `<div>` for nav/hero/strip/contact/footer. Nav anchors jump to `#offers`, `#about`, `#work`, `#essays`.
- **JavaScript (one IIFE at the bottom):** An ambient Conway's Game of Life animation painted on the hero `<canvas id="heroCanvas">`. It reacts to mouse movement and is fully gated behind `prefers-reduced-motion: reduce` (returns early, never animates for opted-out users).

The **portrait** in the About section references `portrait.jpg` at the repo root; if that file is absent the `<img onerror>` hides it and a "Portrait" placeholder shows through. Drop a real `portrait.jpg` (4:5 works best) at the repo root to fill it.

## Design Conventions

- **Fonts (external, Google Fonts):** Newsreader (serif headings + pull quotes), Archivo (body/buttons), IBM Plex Mono (eyebrows, labels, stats). Loaded via `<link>` in `<head>` — this is the one place the site depends on an external host.
- **Palette (dark):** bg `#0b0c0e`, alt-bg `#0d0e10`, text `#e9e8e3`, heading `#f2f1eb`, body `#bcbab1`, muted `#a3a199`, faint `#7c7a72`, gold accent `#c6a052` (soft `#d9c99b`, bright `#efe4c4`). Hairline rules use `rgba(255,255,255,.07)`.
- **Eyebrows** are mono, uppercase, gold, numbered `01 — …` through `05 — …`. Keep numbering contiguous when adding/removing sections.
- All styling and scripts are inline; the only external dependency is the Google Fonts stylesheet.

## Deployment

Deployed via Coolify on Hetzner VPS (`172.252.211.242`). Pushes to `master` auto-deploy via GitHub webhook.

- **Dockerfile**: `nginx:alpine` serving `index.html`
- **SSL**: Traefik with Let's Encrypt (managed by Coolify)
- **Domain**: `eapentechnology.com`

To deploy: just `git push origin master`.
