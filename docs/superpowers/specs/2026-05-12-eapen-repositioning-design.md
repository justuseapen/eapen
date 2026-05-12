# Eapen Technology Repositioning — Design Spec

**Date:** 2026-05-12
**Status:** Approved by operator (Justus Eapen)
**Scope:** Full repositioning of eapentechnology.com plus pipeline scaffolding for a 90-day path to first retainer.

## Problem

Eapen Technology has a 12-month revenue gap of $325K to close on top of TMTG W-2 income, with a hard target of two $15K/month retainer clients signed within 90-150 days. The existing site is a generic AI consulting page with no specific buyer named, no productized offer, no proof, and visual treatment that signals "designer portfolio" rather than "senior operator." It will not produce premium pipeline.

The operator has an asymmetric advantage that the current site does not exploit: five years of production trust & safety work at Trump Media and Technology Group on Truth Social, building moderation infrastructure at scale under regulatory and political pressure that Bay Area consultancies cannot replicate.

## Strategic decisions, locked

These are inputs to this spec, not open questions:

- **Primary wedge:** AI for trust, safety, and moderation at politically sensitive platforms.
- **Secondary wedge (fallback, not in scope for this spec):** AI implementation for SMB home-services rollups.
- **TMTG disclosure boundary:** Name TMTG and Truth Social on the site. Do NOT name Janus, Boosted Truths, or the Spark team. Do not describe internal architectures in ways that could violate the employment agreement.
- **Voice:** Operator's public voice as seen on Zipwire Substack and Truth Social. Not LinkedIn thought-leader prose.
- **Pricing anchor:** $25K productized assessment as lead offer. $15K/month retainer as the destination.
- **Capacity assumption:** 25 hrs/week sustainable, 30+ possible if operator chooses to pause Zipwire or PPL. Plan to 25.
- **Pipeline state:** Zero warm conversations. Plan accordingly.

## Out of scope for this spec

- The secondary home-services wedge.
- Phase 3 conversion templates (discovery briefs, proposals, retainer continuations). Authored only after the first call is booked.
- A backend, CMS, analytics platform, or any new infrastructure. Site stays single static `index.html` deployed via existing Coolify pipeline.
- Lead magnet / sample audit PDF. Killed in brainstorm.
- Email capture form. Killed in brainstorm.
- A redesign beyond the restrained-refresh visual pass described below.

## Architecture

The deployed artifact remains a single `index.html` at the repository root, served by `nginx:alpine` via the existing Dockerfile and Coolify auto-deploy on push to `master`. No build step, no generator.

`/site/*.md` files are working copy: the operator reads and edits prose there before it is hand-ported into `index.html`. They are not a build source; they are a review surface that keeps long-form copy out of the HTML file during editing rounds.

Other working files host the pipeline workstream:

```
/index.html                     # single deployed file (hand-edited from /site sources)
/essays/
  moderation-without-the-lean.html
  the-stack.html
  why-the-bay-cant-help.html
/site/                          # working markdown — source of truth for copy review
  hero.md
  services.md
  about.md
  writing.md
/pipeline/
  warm-intros.md
  cold-outbound.md
/content/
  threads.md
/proposals/                     # populated when Phase 3 starts
/crm.md
docs/superpowers/specs/2026-05-12-eapen-repositioning-design.md
```

Essays are individual static HTML files in `/essays/`. Each shares a minimal stylesheet inlined per-file to avoid introducing external CSS dependencies. Each ends with the same "Taking on 2 Eapen Technology clients this quarter" CTA footer pointing at the Calendly link.

## Site content

### Hero (replaces index.html lines 567-578)

```
Eapen Technology

AI moderation systems for politically sensitive platforms.

If you run a platform where every moderation decision becomes a press
incident, a Congressional letter, or a user revolt, generic T&S vendors
will not save you. I build the systems that do.

Senior Software Engineer at TMTG (NASDAQ: DJT), Truth Social. Five
years on internal trust and safety infrastructure at scale. Founder,
Eapen Technology.

Taking on 2 clients this quarter.

[Apply for a Consultation]  →  Calendly
```

### Services — three productized offerings

Replaces the current three-card "What I Do" section. Prices visible.

**Moderation Stack Assessment — $25,000, 4 weeks.** Production review of the current moderation pipeline. Deliverable: written architecture document covering ingest, classification, queueing, reviewer tooling, appeals, and audit. Includes a 90-day implementation plan and named vendor and model recommendations. Single fixed price.

**T&S Architecture Engagement — from $60,000, 8 to 12 weeks.** For platforms past the assessment that need the system built. Fixed-scope deliverable: production-ready architecture, model evaluation harness, reviewer workflow, on-call runbook. Roadmap to first-pass automation on the categories the client chooses.

**Senior Advisor Retainer — $15,000/month, 3-month minimum.** Embedded availability for CTOs and Heads of Trust & Safety. 30 hours per month. Weekly architecture review, escalation availability, model and vendor decisions, incident post-mortems. For platforms running their own T&S build.

### About — names TMTG and Truth Social, nothing internal

```
Who you're working with

Justus Eapen has spent the last five years as a Senior Software Engineer
at Trump Media and Technology Group (NASDAQ: DJT), working on Truth
Social's internal trust and safety infrastructure. He has built and
operated moderation systems at scale under regulatory scrutiny, press
attention, and political pressure that most platforms will never face.

Before TMTG: developer at SmartLogic, leading production systems and
hosting Elixir Wizards for six seasons. Speaker at ElixirConf USA. Head
of Software at Pavlok, where he scaled the engineering team to 30+. SVP
of Innovation at NorthOut, running product and engineering across 4 to 6
startup teams simultaneously.

Founder of Baltimore AI/ML. Grew the community to 400+ members. Booked
speakers from Johns Hopkins, NASA Goddard, and Legg Mason.

He lives in Aberdeen, Maryland with his wife and two children.
```

Every line is from the operator's resume. No invented metrics.

### Writing layer (new section)

A `Writing` section above the bottom CTA links to three essays. Titles, working drafts:

1. `moderation-without-the-lean.html` — "How to build moderation that doesn't lean left"
2. `the-stack.html` — "The trust and safety stack for a 10M-user platform"
3. `why-the-bay-cant-help.html` — "Why Bay Area consultancies can't help you with moderation"

Each essay is 2,000 to 3,000 words. None disclose TMTG internals. The architectural essay draws only from publicly derivable sources: Trust & Safety Foundation papers, Meta and Twitter public post-mortems, the operator's own reasoning.

Each essay closes with the same CTA: "I'm taking on 2 Eapen Technology clients this quarter. If this is your problem, apply for a consultation."

### Voice rules

Enforced on every published word:

- No em-dash rhetorical pivots. Use period + new sentence.
- No "It's not X, it's Y."
- No openers like "in today's rapidly evolving landscape."
- No triplet adjectives.
- No "we." Operator is solo. Use "I."
- Specific numbers, named platforms, real edge cases.
- Faintly contrarian, never preachy. Faith and political convictions show through subject choice, never stated identity.

## Visual treatment

Single restrained-refresh pass after copy is final.

**Remove:** mesh gradient, three liquid orbs, 20 floating particles, mouse-move parallax, 3D contact-card tilt, noise overlay, glass-morphism on the contact card, the shimmer effect.

**Keep:** Apple system font stack, blue accent (`#0071e3` or shift slightly cooler), the single-column structure.

**New rules:**
- Single column, 720px max width, generous vertical rhythm.
- White background, near-black text, blue accent on links and the primary CTA only.
- One subtle horizontal divider per section.
- No animation.
- Larger heading scale, tighter line-height on headings, more leading on body.
- Section labels become small uppercase eyebrows (`01 · SERVICES`) instead of the current decorative numbered tags.
- CTA: solid filled button. No glow, no shimmer.

## Pipeline scaffolding (Phase 2 prerequisites)

This spec covers the *files and structure* for pipeline work. Authoring volume (the 50-company buyer universe, the 30 warm-intro list, the 100-150 cold sends) is in the implementation plan, not this spec.

**`/pipeline/cold-outbound.md`** — table of 50 companies across alt-tech, faith-tech, heterodox publishing, values-based dating, Web3 social, defense-adjacent UGC. Per company: name, URL, category, employee count estimate, named CTO / Head of Product / Head of T&S / founder, LinkedIn URL, public email if available, recent product release or moderation incident as personalization hook.

**`/pipeline/warm-intros.md`** — 30 names from the operator's existing graph: Truth Social followers, TMTG colleagues willing to refer, Baltimore AI/ML alumni, podcast contacts, Reformed/theological network, conservative tech network. Per name: relationship context, what they could open, draft individualized ask.

**`/crm.md`** — central tracker. Columns: name, company, channel (warm/cold/content/inbound), status (researched / contacted / replied / call booked / proposal out / closed-won / closed-lost), last contact date, next action, weighted pipeline $ value. Updated after every interaction. Friday weekly status report rolled up from this file.

**`/content/threads.md`** — drafts of Truth Social, X, and LinkedIn threads adapted from each essay. Cadence: 1 to 2 substantive technical posts per week. Each closes with the same "taking on 2 clients" CTA.

## Phasing and checkpoints

- **Week 1.** This spec approved (done). Site copy drafted in `/site/*.md`. All three essay outlines drafted. First essay full draft. Operator reviews.
- **Week 2.** All three essays final-drafted. `index.html` rebuilt from new copy. Visual restrained-refresh pass. Goes live after operator sign-off.
- **Day 30.** 50-company buyer list done. 30 warm-intro names + drafts done. First 10 warm asks sent. First essay distributed across Truth Social / X / LinkedIn.
- **Day 60.** 100 cold emails sent. 10 to 15 discovery calls completed. Copy and offer iterated based on what calls reveal.
- **Day 90.** First retainer signed, or honest post-mortem on why not.
- **Day 150.** Second retainer signed.

## Risks and what to watch

- **Voice drift.** Agent-written copy will sound generic by default. Operator review of every published word is the only mitigation. Drafts are gated.
- **TMTG disclosure overreach.** Easy to drift from "Truth Social trust & safety" into describing internal architecture. Every essay and site section reviewed against the disclosure boundary before publishing.
- **Wedge mismatch.** If the buyer universe doesn't generate replies by Day 45, the wedge may be miscalibrated. Honest post-mortem rather than papering over.
- **Capacity overrun.** 25 hrs/week assumption gets tested fast against newborn + deacon duties + PPL + Zipwire + property close. Day 30 checkpoint includes capacity re-confirmation.
- **Public TMTG association.** Naming TMTG on a commercial site is a high-signal, polarizing move. Operator has confirmed this is the chosen positioning; spec proceeds accordingly.

## Success criteria

- Site live with new positioning by end of Week 2.
- 3 essays published by end of Week 2.
- Day-30 / 60 / 90 / 150 / 365 milestones from the operator briefing met as written.
- $550K total income at Day 365 (TMTG W-2 + Eapen Technology).
