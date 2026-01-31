# Eapen Technology Landing Page Redesign — Design Document

**Date:** 2026-01-30
**Status:** Approved

---

## Positioning

**AI Operations Advisor** — Justus evaluates business processes and designs AI solutions that save real money. Limited availability, application-style intake.

---

## Page Structure (top to bottom)

### 1. Hero

**Headline:** AI Solutions That Actually Save You Money

**Subhead:** Eapen Technology evaluates your business processes and designs AI implementations that cut costs, eliminate bottlenecks, and compound over time.

**Supporting line:** Led by Justus Eapen — senior engineer, AI specialist, and engineering leader with 12+ years shipping software at scale. Limited availability.

**CTA button:** "Apply for a Consultation" → Calendly link (https://calendly.com/eapentechnology/get-acquainted) with screening questions configured in Calendly (company name, size, what they need, budget range).

### 2. Services (3 cards, glass-morphism style)

**Card 1: AI Process Audit**
I examine your operations end-to-end and identify where AI can eliminate manual work, reduce errors, and cut costs. You get a prioritized roadmap — not a vague slide deck.

**Card 2: AI Solution Design & Implementation**
From architecture to production. I design and build AI systems tailored to your workflows — content moderation, automation, internal tooling, whatever moves the needle.

**Card 3: Engineering Leadership**
Need someone to lead the technical side? I embed with your team to hire engineers, set standards, and ship. Fractional CTO, hands-on.

### 3. About — "Who You're Working With"

Justus Eapen is a senior software engineer and engineering leader with 12+ years building production systems at scale. He currently leads internal tools and AI automoderation at a major social media platform, designing systems that process millions of pieces of content daily.

Previously, Justus built full-stack applications at SmartLogic, led product and engineering at multiple startups, and founded Baltimore's first AI meetup — growing it to 400+ members. He's spoken at national engineering conferences, hosted two technology podcasts, and contributed to open-source AI and chatbot frameworks.

He started Eapen Technology to bring that same level of engineering rigor to businesses ready to capture real value from AI.

### 4. Bottom CTA (repeated)

**CTA button:** "Apply for a Consultation" (same Calendly link)

**Qualifier text:** Limited availability — I take on a small number of clients at a time.

---

## Design Decisions

- **CTA placement:** Hero + bottom. Two touchpoints, same destination.
- **Qualification method:** Application-style language + Calendly screening questions. No price signal on page. No custom form — Calendly handles intake.
- **No headshot** for now — clean text layout. Photo can be added in Phase 2.
- **No footer nav, social icons, or blog links.** Single conversion path.
- **Existing visual system carries forward:** Glass-morphism cards, animated gradient orbs, floating particles, mesh gradient background. Remove `overflow: hidden` to allow scrolling. Extend background effects to full page height.
- **Service cards reuse glass-card pattern** from existing contact card.

---

## Meta & SEO

- **Page title:** Eapen Technology — AI Solutions for Business
- **Meta description:** Justus Eapen evaluates your business processes and designs AI implementations that cut costs and eliminate bottlenecks. Limited availability.
- **Open Graph tags:** Same title + description, no image yet.
- **Twitter Card tags:** Same.
- **Favicon:** Deferred.

---

## What's NOT in scope

- Testimonials / case studies (Phase 2 — needs client material)
- Professional headshot (Phase 2)
- Analytics setup (Phase 2)
- robots.txt, sitemap, structured data (Phase 3)
- Performance optimizations (Phase 3)
- Accessibility hardening (Phase 3)
- Dockerfile / Coolify deployment (Phase 3)
