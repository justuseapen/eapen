# Eapen Technology Landing Page - Unified Implementation Plan

**Date:** 2026-01-30
**Status:** Awaiting founder decisions before execution

---

## Diagnosis

Three independent audits (Design, Marketing, Engineering) reached the same conclusion: the current page is visually excellent but functionally empty as a consulting business page. It has zero of the eight essential elements a prospect needs to decide to reach out. The core text is 18 words. The single CTA is a raw mailto link. There is no SEO, no accessibility foundation, and no content.

The good news: the visual craft is genuinely strong. The design system is clean and extensible. We are not starting from scratch -- we are filling a beautiful container with substance.

---

## Phase 1: Foundation

**Goal:** Transform the page from a placeholder into a functional consulting page that answers: Who are you? What do you do? Who do you do it for? How do I contact you?

**Timeline:** Can be executed in 1-2 focused sessions once founder decisions are made.

### 1.1 Content Structure (Marketing owns, Design reviews)

| # | Task | Owner | Dependency |
|---|------|-------|------------|
| 1.1.1 | Finalize positioning statement (see Decision Points below) | **Founder** | None -- this unlocks everything |
| 1.1.2 | Write hero headline and subhead based on chosen positioning | Marketing | 1.1.1 |
| 1.1.3 | Write 3-4 service descriptions (title + 2-sentence summary each) | Marketing | 1.1.1 |
| 1.1.4 | Write "About" section (3-4 sentences establishing credibility) | Marketing | Founder provides bio inputs |
| 1.1.5 | Write contact section copy (what happens after they reach out) | Marketing | 1.1.1 |

### 1.2 Page Layout (Design owns, Engineering implements)

| # | Task | Owner | Dependency |
|---|------|-------|------------|
| 1.2.1 | Define section structure: Hero, Services, About, Contact | Design | 1.1.2 (needs content lengths) |
| 1.2.2 | Design service card component (reuse glass-morphism pattern) | Design | 1.2.1 |
| 1.2.3 | Define H2-H6 typography scale (currently only H1 exists) | Design | None |
| 1.2.4 | Design responsive breakpoints for multi-section layout | Design | 1.2.1 |
| 1.2.5 | Remove `overflow: hidden` on body to support scrolling content | Engineering | 1.2.1 |

### 1.3 Core Engineering (Engineering owns)

| # | Task | Owner | Dependency |
|---|------|-------|------------|
| 1.3.1 | Restructure HTML with semantic landmarks (header, main, sections, footer) | Engineering | 1.2.1 (layout defined) |
| 1.3.2 | Implement all sections with final copy | Engineering | 1.1.2 - 1.1.5 (copy ready) |
| 1.3.3 | Add `<meta name="description">` with positioning-aligned text | Engineering | 1.1.2 |
| 1.3.4 | Add Open Graph and Twitter Card meta tags | Engineering | 1.1.2 |
| 1.3.5 | Replace mailto CTA with Calendly embed or contact form | Engineering | Founder decides (see Decision Points) |
| 1.3.6 | Add favicon | Engineering | Founder provides or Design creates |

### Phase 1 Dependency Chain

```
Founder decisions (positioning, services, bio, CTA type)
    |
    v
Marketing writes copy (1.1.2 - 1.1.5)
    |                          \
    v                           v
Design defines layout        Engineering prepares
(1.2.1 - 1.2.4)             semantic HTML skeleton (1.3.1)
    |                          |
    v                          v
Engineering implements full page (1.3.2 - 1.3.6)
```

**Phase 1 delivers:** A page that tells visitors what Eapen Technology does, who it serves, and makes it easy to get in touch. Moves from 0/8 essential consulting elements to 4/8.

---

## Phase 2: Trust and Conversion

**Goal:** Add credibility signals and reduce friction to convert visitors into conversations.

**Timeline:** 1-2 sessions. Can begin as soon as Phase 1 is live. Some items can run in parallel with Phase 1.

### 2.1 Social Proof (Marketing owns, Founder provides raw material)

| # | Task | Owner | Dependency |
|---|------|-------|------------|
| 2.1.1 | Collect 2-3 client testimonials (even informal quotes) | **Founder** | None -- start now |
| 2.1.2 | Write up 1-2 brief case study summaries (problem, approach, result) | Marketing | Founder provides details |
| 2.1.3 | List relevant credentials, certifications, or notable clients | Marketing | Founder provides details |
| 2.1.4 | Source or take a professional headshot | **Founder** | None -- start now |

### 2.2 Trust Section Design (Design owns)

| # | Task | Owner | Dependency |
|---|------|-------|------------|
| 2.2.1 | Design testimonial card component | Design | 2.1.1 (need content shape) |
| 2.2.2 | Design "How I Work" process section (3-4 steps) | Design | Marketing drafts process copy |
| 2.2.3 | Design about section with headshot layout | Design | 2.1.4 |

### 2.3 Conversion Optimization (Engineering owns)

| # | Task | Owner | Dependency |
|---|------|-------|------------|
| 2.3.1 | Implement testimonials section | Engineering | 2.2.1 + 2.1.1 |
| 2.3.2 | Implement process/how-I-work section | Engineering | 2.2.2 + marketing copy |
| 2.3.3 | Add secondary CTA (e.g., "Download checklist" or "Free consultation") | Engineering | Marketing defines offer |
| 2.3.4 | Add basic analytics (Plausible, Fathom, or similar privacy-respecting tool) | Engineering | None -- can do anytime |

**Phase 2 delivers:** Credibility and trust signals that answer "Why should I trust this person?" Moves from 4/8 to 7-8/8 essential consulting elements. Analytics provide visibility into visitor behavior.

---

## Phase 3: Polish and Infrastructure

**Goal:** SEO, performance, accessibility hardening, and production readiness.

**Timeline:** 1-2 sessions. Lower urgency but important for long-term discoverability and professionalism.

### 3.1 SEO and Discoverability (Marketing defines, Engineering implements)

| # | Task | Owner | Dependency |
|---|------|-------|------------|
| 3.1.1 | Research and select target keywords for consulting niche | Marketing | Positioning finalized |
| 3.1.2 | Write SEO-optimized page title and meta description | Marketing | 3.1.1 |
| 3.1.3 | Create robots.txt | Engineering | None |
| 3.1.4 | Create XML sitemap | Engineering | None |
| 3.1.5 | Add LocalBusiness structured data (JSON-LD) | Engineering | Marketing provides business details |
| 3.1.6 | Submit to Google Search Console | Engineering | 3.1.3, 3.1.4 |

### 3.2 Performance (Engineering owns)

| # | Task | Owner | Dependency |
|---|------|-------|------------|
| 3.2.1 | Wrap mousemove handlers in requestAnimationFrame | Engineering | None |
| 3.2.2 | Add `prefers-reduced-motion` media query to disable/reduce animations | Engineering | None |
| 3.2.3 | Add Firefox fallback for backdrop-filter (solid background) | Engineering | None |
| 3.2.4 | Reduce particle count on mobile (20 is heavy for low-end devices) | Engineering | None |
| 3.2.5 | Add `will-change` properties to animated elements for GPU hint | Engineering | None |

### 3.3 Accessibility (Engineering owns, Design reviews)

| # | Task | Owner | Dependency |
|---|------|-------|------------|
| 3.3.1 | Add visible focus styles to all interactive elements | Engineering | Design defines focus style |
| 3.3.2 | Add ARIA labels to icon-only elements and decorative elements | Engineering | None |
| 3.3.3 | Verify color contrast meets WCAG AA (4.5:1 for text) | Engineering | None |
| 3.3.4 | Add skip-to-content link | Engineering | Phase 1 complete (sections exist) |
| 3.3.5 | Test with screen reader (VoiceOver) and keyboard-only navigation | Engineering | All above complete |

### 3.4 Deployment Infrastructure (Engineering owns)

| # | Task | Owner | Dependency |
|---|------|-------|------------|
| 3.4.1 | Create Dockerfile for static serving (nginx or caddy) | Engineering | None |
| 3.4.2 | Configure Coolify deployment with SSL | Engineering | 3.4.1 |
| 3.4.3 | Set up health check endpoint | Engineering | 3.4.1 |
| 3.4.4 | Configure caching headers for static assets | Engineering | 3.4.1 |

**Phase 3 delivers:** A production-grade, accessible, SEO-ready page that performs well across all browsers and devices, deployed on proper infrastructure.

---

## Decision Points

These require the founder's input before execution can begin. Items 1-4 block Phase 1. Items 5-6 block Phase 2.

### 1. Positioning Choice (Blocks Phase 1)

The marketing audit proposed three options. Pick one:

**Option A: Fractional CTO**
"Technology leadership for businesses that have outgrown DIY but can't justify a full-time CTO."
- Best if: You want to position as strategic, premium, ongoing engagements
- Differentiator: Decision-making and leadership, not just implementation

**Option B: Technology Clarity**
"Cutting through tech complexity so you can make confident decisions for your business."
- Best if: You want to emphasize your ability to translate tech into business terms
- Differentiator: Clarity and confidence, not just solutions

**Option C: Small Business Tech Partner**
"Your technology partner from first server to full scale."
- Best if: You want to emphasize long-term relationship and growth journey
- Differentiator: Partnership and continuity, not transactional projects

### 2. Services to Feature (Blocks Phase 1)

List 3-4 services to highlight. Examples based on typical small business tech consulting:
- Technology strategy and roadmap
- Vendor and tool selection
- System architecture and infrastructure
- Security and compliance assessment
- Team hiring and management guidance
- Legacy system modernization
- Cloud migration

**What I need from you:** Which 3-4 best describe what you actually do and want to do more of?

### 3. Bio Inputs (Blocks Phase 1)

For the About section, provide:
- Years of experience and relevant background
- 1-2 notable companies, industries, or projects (if shareable)
- What motivated starting the consulting practice
- Any credentials or certifications worth featuring

### 4. Primary CTA Approach (Blocks Phase 1)

Current: `mailto:justus@eapentechnology.com` (high friction, no tracking)

Options:
- **Calendly link** (recommended): Lets prospects book a 15-30 min intro call directly. Lowest friction.
- **Contact form** (embedded): Collects name, email, brief description. More control but more friction.
- **Both**: Calendly as primary CTA, email as secondary option.

### 5. Testimonials and Case Studies (Blocks Phase 2)

Can you provide:
- 2-3 client quotes (even informal, from emails or Slack)?
- 1-2 project summaries (problem they had, what you did, what happened)?
- Permission to use client names or company names?

### 6. Professional Headshot (Blocks Phase 2)

Do you have a professional photo to use, or should we plan to get one?

---

## What Can Start Right Now

Even before founder decisions, these tasks have zero dependencies:

| Task | Owner | Phase |
|------|-------|-------|
| Define H2-H6 typography scale | Design | 1 |
| Design service card component (mockup with placeholder text) | Design | 1 |
| Add requestAnimationFrame to mousemove handlers | Engineering | 3 |
| Add prefers-reduced-motion media query | Engineering | 3 |
| Add Firefox backdrop-filter fallback | Engineering | 3 |
| Create robots.txt | Engineering | 3 |
| Create Dockerfile for Coolify deployment | Engineering | 3 |
| Set up Plausible or Fathom analytics | Engineering | 2 |

These 8 tasks can be delegated to agents immediately while waiting for founder input on positioning and content.
