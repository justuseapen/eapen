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

The site is a single self-contained `index.html` (~377 lines) with embedded CSS and JavaScript:

- **CSS (lines 7-297):** Uses CSS custom properties defined in `:root`. Apple-inspired design system with glass-morphism effects (`backdrop-filter: blur`), animated gradient orbs, mesh gradient background, floating particles, and a shimmer effect on the contact card. Responsive breakpoint at 600px.
- **HTML (lines 299-328):** Semantic structure with mesh gradient background, three floating orbs, particle container, main content container (heading, tagline, subtitle, contact card with mailto CTA), and noise texture overlay.
- **JavaScript (lines 330-375):** Dynamically creates 20 floating light particles, adds parallax movement to orbs on mouse move, and applies 3D perspective tilt to the contact card on hover.

## Design Conventions

- Apple system font stack (`-apple-system, BlinkMacSystemFont, "SF Pro Display"...`)
- Color palette: text primary `#1d1d1f`, text secondary `#6e6e73`, accent blue `#0071e3`, background `#fbfbfd`
- Uses `-webkit-` prefixes for Safari compatibility (`-webkit-backdrop-filter`, `-webkit-background-clip`)
- All styling and scripts are inline (no external files)

## Deployment

Intended for static hosting via Coolify. No Dockerfile exists yet; deploy by serving `index.html` as a static file.
