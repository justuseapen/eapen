# Eapen Technology Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild eapentechnology.com as a positioning surface for premium T&S consulting buyers, publish three essays that pre-qualify inbound, and scaffold the pipeline working directory.

**Architecture:** Single static `index.html` at repo root, deployed via existing Coolify pipeline on push to master. Three additional standalone HTML essays in `/essays/`. Markdown working copy in `/site/` for review rounds before HTML port. Pipeline workstream files in `/pipeline/`, `/content/`, and `/crm.md`. No build step, no framework, no tests — this is a 1990s-era static site by design.

**Tech Stack:** HTML5, inline CSS, vanilla nothing-else. Apple system font stack. Calendly external link for primary CTA.

**Operator review gates:** Marked with **OPERATOR REVIEW** — those tasks pause for Justus to read drafts before the next task begins. Do not skip them.

**Spec:** `docs/superpowers/specs/2026-05-12-eapen-repositioning-design.md`

---

## Task 1: Working-copy directory scaffolding

**Files:**
- Create: `site/.gitkeep`
- Create: `essays/.gitkeep`
- Create: `pipeline/.gitkeep`
- Create: `content/.gitkeep`
- Create: `proposals/.gitkeep`

- [ ] **Step 1: Create the directories**

```bash
mkdir -p site essays pipeline content proposals
touch site/.gitkeep essays/.gitkeep pipeline/.gitkeep content/.gitkeep proposals/.gitkeep
```

- [ ] **Step 2: Verify**

Run: `ls -la site essays pipeline content proposals`
Expected: Each directory exists and contains `.gitkeep`.

- [ ] **Step 3: Commit**

```bash
git add site/.gitkeep essays/.gitkeep pipeline/.gitkeep content/.gitkeep proposals/.gitkeep
git commit -m "chore: scaffold working directories for repositioning work"
```

---

## Task 2: Draft hero copy

**Files:**
- Create: `site/hero.md`

- [ ] **Step 1: Write the markdown file**

Write to `site/hero.md`:

```markdown
# Hero — eapentechnology.com

**Eyebrow:** (none — drop the "Mission-aligned AI" line)

**H1:** Eapen Technology

**Lead:** AI moderation systems for politically sensitive platforms.

**Body:** If you run a platform where every moderation decision becomes a press incident, a Congressional letter, or a user revolt, generic T&S vendors will not save you. I build the systems that do.

**Credential line:** Senior Software Engineer at TMTG (NASDAQ: DJT), Truth Social. Five years on internal trust and safety infrastructure at scale. Founder, Eapen Technology.

**Scarcity line:** Taking on 2 clients this quarter.

**Primary CTA:** Apply for a Consultation → https://calendly.com/eapentechnology/get-acquainted
```

- [ ] **Step 2: Verify voice rules**

Read the file. Check against the spec voice rules:
- No em-dash rhetorical pivots ✓
- No "It's not X, it's Y" ✓
- No "in today's rapidly evolving landscape" ✓
- No triplet adjectives ✓
- "I" not "we" ✓
- Buyer named in lead sentence ✓
- TMTG + Truth Social named; nothing internal ✓

- [ ] **Step 3: Commit (do not stage hero for live site yet — markdown only)**

```bash
git add site/hero.md
git commit -m "draft: hero copy for repositioned site"
```

- [ ] **Step 4: OPERATOR REVIEW**

Show `site/hero.md` to Justus. Pause for explicit approval or revisions before proceeding to Task 3.

---

## Task 3: Draft services copy

**Files:**
- Create: `site/services.md`

- [ ] **Step 1: Write the markdown file**

Write to `site/services.md`:

```markdown
# Services — eapentechnology.com

**Section label:** 01 · SERVICES
**H2:** What I Build

## Moderation Stack Assessment
**Price anchor:** $25,000 · 4 weeks · fixed price

Production review of your current moderation pipeline. I look at ingest, classification, queueing, reviewer tooling, appeals, and audit. You get a written architecture document, a 90-day implementation plan, and named vendor and model recommendations. Not a slide deck.

## T&S Architecture Engagement
**Price anchor:** from $60,000 · 8 to 12 weeks · fixed scope

For platforms past the assessment that need the system actually built. Production-ready architecture, model evaluation harness, reviewer workflow, on-call runbook. Roadmap to first-pass automation on the categories you choose. I do the work; your team owns the result.

## Senior Advisor Retainer
**Price anchor:** $15,000/month · 3-month minimum

Embedded availability for CTOs and Heads of Trust and Safety. 30 hours per month. Weekly architecture review, escalation availability, model and vendor decisions, incident post-mortems. For platforms running their own T&S build and want a senior voice in the room.
```

- [ ] **Step 2: Verify voice rules**

Same checklist as Task 2. Plus: every offer has a visible price anchor.

- [ ] **Step 3: Commit**

```bash
git add site/services.md
git commit -m "draft: services copy with productized offer ladder"
```

- [ ] **Step 4: OPERATOR REVIEW**

Show to Justus. Pricing is the load-bearing decision here. Confirm $25K / $60K / $15K-mo are the numbers before proceeding.

---

## Task 4: Draft about copy

**Files:**
- Create: `site/about.md`

- [ ] **Step 1: Write the markdown file**

Write to `site/about.md`:

```markdown
# About — eapentechnology.com

**Section label:** 02 · ABOUT
**H2:** Who You're Working With

Justus Eapen has spent the last five years as a Senior Software Engineer at Trump Media and Technology Group (NASDAQ: DJT), working on Truth Social's internal trust and safety infrastructure. He has built and operated moderation systems at scale under regulatory scrutiny, press attention, and political pressure that most platforms will never face.

Before TMTG: developer at SmartLogic, leading production systems and hosting Elixir Wizards for six seasons. Speaker at ElixirConf USA. Head of Software at Pavlok, where he scaled the engineering team to 30+. SVP of Innovation at NorthOut, running product and engineering across 4 to 6 startup teams simultaneously.

Founder of Baltimore AI/ML. Grew the community to 400+ members. Booked speakers from Johns Hopkins, NASA Goddard, and Legg Mason.

He lives in Aberdeen, Maryland with his wife and two children.
```

- [ ] **Step 2: Verify disclosure boundary**

Confirm: TMTG named ✓. Truth Social named ✓. Janus NOT named ✓. Boosted Truths NOT named ✓. Spark NOT named ✓. Every claim traceable to resume ✓. No invented metrics ✓.

- [ ] **Step 3: Commit**

```bash
git add site/about.md
git commit -m "draft: about copy within TMTG disclosure boundary"
```

- [ ] **Step 4: OPERATOR REVIEW**

Show to Justus. Disclosure boundary is the load-bearing decision here.

---

## Task 5: Draft writing-section copy

**Files:**
- Create: `site/writing.md`

- [ ] **Step 1: Write the markdown file**

Write to `site/writing.md`:

```markdown
# Writing — eapentechnology.com

**Section label:** 03 · WRITING
**H2:** Selected Essays

Three essays I wrote for the kind of operator who would hire me. If these arguments resonate, we will probably get along.

## How to build moderation that doesn't lean left
The dominant T&S stack ships with values embedded in the labels. A walk through what changes at the data layer, the model layer, and the policy layer when you build for a different value frame.
**Link:** /essays/moderation-without-the-lean.html

## The trust and safety stack for a 10M-user platform
A reference architecture: ingest, classification, queueing, reviewer tooling, appeals, audit, on-call. What the boxes are and how they connect.
**Link:** /essays/the-stack.html

## Why Bay Area consultancies can't help you with moderation
A cultural-fit argument. Some problems are not technical. The pool of senior engineers who can build T&S for a heterodox platform is not the same pool that staffs the major consultancies.
**Link:** /essays/why-the-bay-cant-help.html
```

- [ ] **Step 2: Commit**

```bash
git add site/writing.md
git commit -m "draft: writing-section copy linking to three essays"
```

---

## Task 6: Draft essay one — "How to build moderation that doesn't lean left"

**Files:**
- Create: `essays/moderation-without-the-lean.html`

This is the longest task in the plan. Budget 2-3 hours including operator review iteration.

- [ ] **Step 1: Draft the essay body in markdown first**

Create scratch file `essays/_drafts/moderation-without-the-lean.md` (drafts directory will be gitignored at end).

```bash
mkdir -p essays/_drafts
```

Write a 2,000 to 3,000 word essay. Structure:

1. **Cold open (200 words).** A specific scenario — e.g., a hypothetical post about a contested public-health claim that one team's classifier flags as "misinformation" and another's flags as "scientific debate." Same post, different labels, both produced by the same underlying model class. Set up the argument.
2. **Section: The labels are not neutral (400 words).** Walk through how training datasets like Jigsaw's Civil Comments, Perspective API outputs, and academic hate-speech corpora encode editorial decisions about what counts as toxic. Cite publicly available papers. No internal TMTG examples.
3. **Section: Where the lean enters (500 words).** Three layers. (a) Data: who labeled the training set and what their guidelines were. (b) Model: which base model and what its safety-tuning targeted. (c) Policy: who writes the rules the reviewers enforce. Each layer compounds the prior one.
4. **Section: What changes when you build for a different frame (700 words).** Concrete technical changes: custom-labeled internal datasets, multiple-classifier ensembles where disagreement triggers human review rather than majority vote, policy frameworks that distinguish "I disagree with this" from "this violates the rules." Architecture, not opinion.
5. **Section: What this is not (200 words).** Not a license for unmoderated platforms. Not a defense of harassment. The argument is about *who decides* and *how the system encodes that decision*, not whether to moderate.
6. **Close (200 words).** The competence claim: doing this well is hard, requires senior engineering taste, and is not what the major T&S vendors sell. Soft pivot to the work.
7. **CTA footer (boilerplate, same across all three essays):**

```
---
I'm taking on 2 Eapen Technology clients this quarter. If this is your problem, apply for a consultation.

[Apply for a Consultation] → https://calendly.com/eapentechnology/get-acquainted
```

Voice constraints:
- No em-dash pivots
- No "we"
- Specific numbers, named papers, real edge cases
- No internal TMTG specifics — everything traceable to public sources or first-principles reasoning
- Faintly contrarian, never preachy
- Faith and politics show through subject matter, never stated identity

- [ ] **Step 2: OPERATOR REVIEW — markdown draft**

Show `essays/_drafts/moderation-without-the-lean.md` to Justus. This is the highest-risk essay (most polarizing). Iterate until he signs off.

- [ ] **Step 3: Port approved markdown to standalone HTML**

Create `essays/moderation-without-the-lean.html` using this template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>How to build moderation that doesn't lean left — Eapen Technology</title>
<meta name="description" content="The dominant T&S stack ships with values embedded in the labels. What changes when you build for a different frame.">
<meta property="og:title" content="How to build moderation that doesn't lean left">
<meta property="og:description" content="The dominant T&S stack ships with values embedded in the labels. What changes when you build for a different frame.">
<meta property="og:type" content="article">
<style>
:root {
  --text: #1d1d1f;
  --muted: #6e6e73;
  --accent: #0071e3;
  --bg: #ffffff;
  --rule: #e5e5e7;
}
* { box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
  color: var(--text);
  background: var(--bg);
  max-width: 680px;
  margin: 0 auto;
  padding: 80px 24px 120px;
  line-height: 1.6;
  font-size: 18px;
}
header { margin-bottom: 64px; }
.eyebrow {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 16px;
}
h1 {
  font-size: 40px;
  line-height: 1.15;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
}
.byline {
  color: var(--muted);
  font-size: 15px;
}
h2 {
  font-size: 24px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 48px 0 16px;
}
p { margin: 0 0 20px; }
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
hr {
  border: none;
  border-top: 1px solid var(--rule);
  margin: 64px 0 40px;
}
.cta {
  background: var(--text);
  color: white;
  padding: 32px;
  border-radius: 12px;
}
.cta a.btn {
  display: inline-block;
  background: var(--accent);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 16px;
}
.cta a.btn:hover { text-decoration: none; opacity: 0.9; }
.home-link {
  display: inline-block;
  margin-bottom: 32px;
  color: var(--muted);
  font-size: 14px;
}
</style>
</head>
<body>
<a href="/" class="home-link">← Eapen Technology</a>
<header>
  <div class="eyebrow">Essay · Moderation</div>
  <h1>How to build moderation that doesn't lean left</h1>
  <p class="byline">Justus Eapen</p>
</header>

<!-- ESSAY BODY GOES HERE — wrap each paragraph in <p>, each section header in <h2> -->

<hr>
<div class="cta">
  <p><strong>I'm taking on 2 Eapen Technology clients this quarter.</strong> If this is your problem, apply for a consultation.</p>
  <a href="https://calendly.com/eapentechnology/get-acquainted" class="btn" target="_blank" rel="noopener noreferrer">Apply for a Consultation</a>
</div>
</body>
</html>
```

Port the markdown into the `<!-- ESSAY BODY GOES HERE -->` section, wrapping paragraphs in `<p>` and section headers in `<h2>`.

- [ ] **Step 4: Verify**

Open `essays/moderation-without-the-lean.html` in a browser (`open essays/moderation-without-the-lean.html` on macOS). Check:
- Renders cleanly, ~680px column
- No layout shift on resize
- All headings present
- Home link returns to `/`
- CTA button links to Calendly
- No broken HTML (no orphaned tags, all `<p>` closed)

- [ ] **Step 5: Commit**

```bash
git add essays/moderation-without-the-lean.html essays/_drafts/moderation-without-the-lean.md
git commit -m "essay: moderation without the lean"
```

---

## Task 7: Draft essay two — "The T&S stack for a 10M-user platform"

**Files:**
- Create: `essays/_drafts/the-stack.md`
- Create: `essays/the-stack.html`

- [ ] **Step 1: Draft in markdown**

2,000 to 3,000 words. Structure:

1. **Cold open (150 words).** "Here is the diagram I draw when a CTO asks me what they need to build." Set expectation: this is reference architecture, not a vendor pitch.
2. **Section: Ingest (300 words).** What flows in. Posts, comments, DMs, media uploads, reports. Throughput math for a 10M-user platform. Why you need a queue before any classifier.
3. **Section: Classification (400 words).** The model layer. Multi-classifier ensembles, separate models per category (hate, harassment, CSAM detection via PhotoDNA, spam, sexual content, self-harm). Why one giant model is the wrong answer. Where the trade-off between precision and recall actually lives.
4. **Section: Queueing and triage (300 words).** Severity scoring. Why priority queues beat FIFO. The reports-per-reviewer-per-hour math.
5. **Section: Reviewer tooling (400 words).** The interface humans actually use. Keyboard shortcuts, context windows, decision audit. Why this is the unsexy piece that determines whether the system works.
6. **Section: Appeals (300 words).** The legitimacy layer. Why every public moderation decision needs a path back. The architecture differences between "platform reviews itself" and "user can escalate to a second-tier reviewer."
7. **Section: Audit and on-call (300 words).** Logs, replay, who-saw-what. The incident-response loop. What happens at 2am when a viral post needs a decision in five minutes.
8. **Close (150 words).** The taste claim: every piece is publicly known. The judgment about how they fit is what makes the system work or fail.
9. **CTA footer** (same as essay 1).

No internal TMTG specifics. Everything derivable from: Meta's "How Meta enforces" pages, Twitter's Trust & Safety transparency reports (pre-acquisition), Trust & Safety Foundation reference papers, the NIST AI Risk Management Framework, the operator's own reasoning.

- [ ] **Step 2: OPERATOR REVIEW — markdown draft**

Show to Justus. Iterate.

- [ ] **Step 3: Port to HTML**

Use the same HTML template as Task 6, with updated title, description, and OG tags:

- `<title>` and `og:title`: "The trust and safety stack for a 10M-user platform — Eapen Technology"
- `og:description` and `meta description`: "A reference architecture: ingest, classification, queueing, reviewer tooling, appeals, audit, on-call."
- Eyebrow: "Essay · Architecture"
- H1: "The trust and safety stack for a 10M-user platform"

- [ ] **Step 4: Verify**

Same checklist as Task 6 Step 4. Plus: every section header from the markdown is present in the HTML as `<h2>`.

- [ ] **Step 5: Commit**

```bash
git add essays/the-stack.html essays/_drafts/the-stack.md
git commit -m "essay: the T&S stack for a 10M-user platform"
```

---

## Task 8: Draft essay three — "Why Bay Area consultancies can't help you"

**Files:**
- Create: `essays/_drafts/why-the-bay-cant-help.md`
- Create: `essays/why-the-bay-cant-help.html`

- [ ] **Step 1: Draft in markdown**

2,000 to 3,000 words. Structure:

1. **Cold open (200 words).** A composite anecdote: a heterodox platform hires a Big T&S Consulting Firm, the firm sends a deck recommending the same vendor stack (Hive, Sift, Two Hat, Spectrum Labs), the platform discovers six months later that the models flag their own users' speech as toxic. Set up the argument: this is a cultural-fit problem, not a competence problem.
2. **Section: Where the major consultancies recruit (500 words).** The pool of senior T&S engineers in SF/Seattle has a strong political-cultural lean. Public Twitter data, Stanford CS politics surveys, Tabarrok / Klein discussions. Walk through why this matters when the work involves judgment calls about what counts as harm.
3. **Section: The deliverables look identical until they don't (400 words).** A T&S report from Firm A and Firm B will use the same diagrams. The difference shows up in the *defaults* — which categories are pre-checked, which thresholds are recommended, which appeals paths are designed in. These are taste choices that ride on the politics of the people writing the report.
4. **Section: What changes when the consultant shares your frame (400 words).** Specific examples. Hate-speech classifiers calibrated to your actual user base. Policy frameworks that distinguish "I disagree with this" from "this violates the rules" — a distinction that is theoretical to one team and lived experience to another. Reviewer training that doesn't sneak progressive HR-trainer assumptions in.
5. **Section: The unfair-advantage argument (400 words).** This is where Justus's positioning lives. Engineers with senior T&S production experience who can sit comfortably across the table from a conservative-coded platform are rare. Name the public ones (anonymously or by category if direct naming is risky). The pool is small. The pool is the asset.
6. **Close (200 words).** Soft direct pitch.
7. **CTA footer** (same as essays 1 and 2).

- [ ] **Step 2: OPERATOR REVIEW — markdown draft**

Show to Justus. This essay is the most directly competitive — it argues against the competition by name (category, not individual firms). Justus should be comfortable with every claim.

- [ ] **Step 3: Port to HTML**

Same template. Title: "Why Bay Area consultancies can't help you with moderation — Eapen Technology". Eyebrow: "Essay · Positioning".

- [ ] **Step 4: Verify**

Same checklist as Task 6 Step 4.

- [ ] **Step 5: Commit**

```bash
git add essays/why-the-bay-cant-help.html essays/_drafts/why-the-bay-cant-help.md
git commit -m "essay: why the Bay can't help you with moderation"
```

---

## Task 9: Rebuild index.html

**Files:**
- Modify: `index.html` (full rewrite)

This is the visual reset described in the spec: drop orbs, particles, mesh, parallax, 3D tilt, noise overlay, glass-morphism, shimmer.

- [ ] **Step 1: Replace the entire file**

Overwrite `index.html` with this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Eapen Technology — AI Moderation Systems for Politically Sensitive Platforms</title>
<meta name="description" content="Justus Eapen builds AI moderation systems for platforms where every decision becomes a press incident. Five years at Truth Social. Taking on 2 clients this quarter.">
<meta property="og:title" content="Eapen Technology — AI Moderation Systems for Politically Sensitive Platforms">
<meta property="og:description" content="Justus Eapen builds AI moderation systems for platforms where every decision becomes a press incident. Five years at Truth Social. Taking on 2 clients this quarter.">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Eapen Technology — AI Moderation Systems for Politically Sensitive Platforms">
<meta name="twitter:description" content="Justus Eapen builds AI moderation systems for platforms where every decision becomes a press incident. Five years at Truth Social.">
<style>
:root {
  --text: #1d1d1f;
  --muted: #6e6e73;
  --accent: #0071e3;
  --bg: #ffffff;
  --rule: #e5e5e7;
}
* { box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
  color: var(--text);
  background: var(--bg);
  max-width: 720px;
  margin: 0 auto;
  padding: 96px 24px 120px;
  line-height: 1.6;
  font-size: 18px;
}
.eyebrow {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  margin: 0 0 16px;
}
h1 {
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 24px;
}
h2 {
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 24px;
}
h3 {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
  margin: 0 0 8px;
}
p { margin: 0 0 20px; }
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
.lead {
  font-size: 24px;
  line-height: 1.35;
  font-weight: 500;
  margin: 0 0 24px;
}
.credential {
  color: var(--muted);
  font-size: 16px;
  margin: 32px 0 24px;
}
.scarcity {
  font-weight: 600;
  margin: 32px 0 24px;
}
.btn {
  display: inline-block;
  background: var(--text);
  color: white;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  margin-top: 8px;
}
.btn:hover { text-decoration: none; background: var(--accent); }
section { margin: 96px 0 0; }
section.hero { margin-top: 0; }
.price {
  color: var(--muted);
  font-size: 15px;
  margin: 0 0 12px;
  font-variant-numeric: tabular-nums;
}
.offer { margin-bottom: 48px; }
.offer:last-child { margin-bottom: 0; }
.essay-link {
  display: block;
  padding: 24px 0;
  border-bottom: 1px solid var(--rule);
  color: var(--text);
}
.essay-link:hover { text-decoration: none; }
.essay-link h3 { color: var(--text); margin-bottom: 4px; }
.essay-link:hover h3 { color: var(--accent); }
.essay-link p { color: var(--muted); margin: 0; font-size: 16px; }
.essay-link:first-of-type { border-top: 1px solid var(--rule); }
footer {
  margin-top: 120px;
  padding-top: 32px;
  border-top: 1px solid var(--rule);
  color: var(--muted);
  font-size: 14px;
}
</style>
</head>
<body>

<section class="hero">
  <h1>Eapen Technology</h1>
  <p class="lead">AI moderation systems for politically sensitive platforms.</p>
  <p>If you run a platform where every moderation decision becomes a press incident, a Congressional letter, or a user revolt, generic T&amp;S vendors will not save you. I build the systems that do.</p>
  <p class="credential">Senior Software Engineer at TMTG (NASDAQ: DJT), Truth Social. Five years on internal trust and safety infrastructure at scale. Founder, Eapen Technology.</p>
  <p class="scarcity">Taking on 2 clients this quarter.</p>
  <a href="https://calendly.com/eapentechnology/get-acquainted" class="btn" target="_blank" rel="noopener noreferrer">Apply for a Consultation</a>
</section>

<section>
  <p class="eyebrow">01 · Services</p>
  <h2>What I Build</h2>

  <div class="offer">
    <h3>Moderation Stack Assessment</h3>
    <p class="price">$25,000 · 4 weeks · fixed price</p>
    <p>Production review of your current moderation pipeline. I look at ingest, classification, queueing, reviewer tooling, appeals, and audit. You get a written architecture document, a 90-day implementation plan, and named vendor and model recommendations. Not a slide deck.</p>
  </div>

  <div class="offer">
    <h3>T&amp;S Architecture Engagement</h3>
    <p class="price">from $60,000 · 8 to 12 weeks · fixed scope</p>
    <p>For platforms past the assessment that need the system actually built. Production-ready architecture, model evaluation harness, reviewer workflow, on-call runbook. Roadmap to first-pass automation on the categories you choose. I do the work; your team owns the result.</p>
  </div>

  <div class="offer">
    <h3>Senior Advisor Retainer</h3>
    <p class="price">$15,000/month · 3-month minimum</p>
    <p>Embedded availability for CTOs and Heads of Trust and Safety. 30 hours per month. Weekly architecture review, escalation availability, model and vendor decisions, incident post-mortems. For platforms running their own T&amp;S build and want a senior voice in the room.</p>
  </div>
</section>

<section>
  <p class="eyebrow">02 · About</p>
  <h2>Who You're Working With</h2>
  <p>Justus Eapen has spent the last five years as a Senior Software Engineer at Trump Media and Technology Group (NASDAQ: DJT), working on Truth Social's internal trust and safety infrastructure. He has built and operated moderation systems at scale under regulatory scrutiny, press attention, and political pressure that most platforms will never face.</p>
  <p>Before TMTG: developer at SmartLogic, leading production systems and hosting Elixir Wizards for six seasons. Speaker at ElixirConf USA. Head of Software at Pavlok, where he scaled the engineering team to 30+. SVP of Innovation at NorthOut, running product and engineering across 4 to 6 startup teams simultaneously.</p>
  <p>Founder of Baltimore AI/ML. Grew the community to 400+ members. Booked speakers from Johns Hopkins, NASA Goddard, and Legg Mason.</p>
  <p>He lives in Aberdeen, Maryland with his wife and two children.</p>
</section>

<section>
  <p class="eyebrow">03 · Writing</p>
  <h2>Selected Essays</h2>
  <p>Three essays I wrote for the kind of operator who would hire me. If these arguments resonate, we will probably get along.</p>

  <a href="/essays/moderation-without-the-lean.html" class="essay-link">
    <h3>How to build moderation that doesn't lean left</h3>
    <p>The dominant T&amp;S stack ships with values embedded in the labels. What changes at the data layer, the model layer, and the policy layer when you build for a different value frame.</p>
  </a>

  <a href="/essays/the-stack.html" class="essay-link">
    <h3>The trust and safety stack for a 10M-user platform</h3>
    <p>A reference architecture: ingest, classification, queueing, reviewer tooling, appeals, audit, on-call. What the boxes are and how they connect.</p>
  </a>

  <a href="/essays/why-the-bay-cant-help.html" class="essay-link">
    <h3>Why Bay Area consultancies can't help you with moderation</h3>
    <p>A cultural-fit argument. Some problems are not technical. The pool of engineers who can build T&amp;S for a heterodox platform is not the same pool that staffs the major consultancies.</p>
  </a>
</section>

<section>
  <p class="eyebrow">04 · Contact</p>
  <h2>Apply</h2>
  <p>I take on a small number of clients at a time. If you've read this far, the next step is a 30-minute call.</p>
  <a href="https://calendly.com/eapentechnology/get-acquainted" class="btn" target="_blank" rel="noopener noreferrer">Apply for a Consultation</a>
</section>

<footer>
  <p>Eapen Technology · Aberdeen, Maryland · justus@eapentechnology.com</p>
</footer>

</body>
</html>
```

- [ ] **Step 2: Start local server and visual-check**

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in browser. Visual checklist:
- White background, no orbs, no particles, no gradient, no animation
- Single column, ~720px max width
- Apple system font
- Blue CTA links work and route to Calendly
- Essay links work and route to the three essay HTML files
- No JS errors in browser console (none expected — no script tag)
- Renders cleanly at 375px (iPhone width) and 1440px (desktop)

- [ ] **Step 3: Stop server**

`Ctrl+C` to stop python http.server.

- [ ] **Step 4: OPERATOR REVIEW**

Show the live local server to Justus. This is the look-and-feel sign-off. Iterate on any visual issues before commit.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: rebuild index.html for T&S moderation positioning"
```

---

## Task 10: Pipeline working-file stubs

**Files:**
- Create: `pipeline/cold-outbound.md`
- Create: `pipeline/warm-intros.md`
- Create: `content/threads.md`
- Create: `crm.md`

These are scaffolds only. Authoring volume is Phase 2 / Task 7 in the task list, not this implementation plan.

- [ ] **Step 1: Write cold-outbound.md stub**

Write to `pipeline/cold-outbound.md`:

```markdown
# Cold Outbound — Buyer Universe

Target: 50 companies across alt-tech, faith-tech, heterodox publishing, values-based dating, Web3 social, defense-adjacent UGC.

Per-row research before any send:
1. Recent product release or moderation incident (personalization hook)
2. Named decision-maker: CTO, Head of Product, Head of T&S, or founder
3. LinkedIn URL
4. Public email if available

## Tracker

| # | Company | Category | URL | Employee est. | Contact name | Title | LinkedIn | Email | Personalization hook | Status | Last action | Next action |
|---|---------|----------|-----|---------------|--------------|-------|----------|-------|----------------------|--------|-------------|-------------|
| 1 | _example_ | alt-tech | example.com | 50-100 | Jane Doe | CTO | linkedin.com/in/x | jane@example.com | "Their Sep 2024 post on appeals reform" | researched | 2026-05-12 | draft email |

(Replace example row when first real entry is added.)

## Categories to fill

- [ ] Alt-tech (Rumble, Locals, Gab, Minds, Parler-successors)
- [ ] Conservative media w/ community features
- [ ] Religious / faith platforms (Hallow, Pray.com, Gloo, Pure Flix-adjacent)
- [ ] Bitcoin / crypto social
- [ ] Values-based dating apps
- [ ] Heterodox publishing platforms (Substack-adjacent)
- [ ] Web3 social (Farcaster, Lens-adjacent)
- [ ] Defense-adjacent platforms w/ UGC
```

- [ ] **Step 2: Write warm-intros.md stub**

Write to `pipeline/warm-intros.md`:

```markdown
# Warm Intros — Existing Graph

Target: 30 names from Justus's existing graph who can open doors to platform founders, PE operators, or T&S decision-makers.

Sources:
- Truth Social followers (~50K)
- TMTG colleagues willing to refer
- Baltimore AI/ML alumni
- Podcast contacts (Elixir Wizards / Smart Software, 6 seasons)
- Conservative tech network
- Reformed / theological network
- ElixirConf USA / Lonestar ElixirConf contacts

Ask template: "I'm taking on two new Eapen Technology clients this quarter. Ideal profile: [X]. Anyone in your network running [Y]?"

## Tracker

| # | Name | Relationship | Source | Could open | Draft ask | Status | Sent date | Response | Intro made |
|---|------|--------------|--------|------------|-----------|--------|-----------|----------|------------|
| 1 | _example_ | Former SmartLogic colleague | LinkedIn | Substack-adjacent founders | "Hey X, taking on..." | drafted | — | — | — |

(Replace example row when first real entry is added.)
```

- [ ] **Step 3: Write content/threads.md stub**

Write to `content/threads.md`:

```markdown
# Content Distribution — Threads

Each essay gets adapted into three thread formats:
- Truth Social (250-char chunks, no embedded links until final post)
- X (280-char chunks)
- LinkedIn (longer single post, 1,300-char target)

Every thread closes with the same line:
> Taking on 2 new Eapen Technology clients this quarter. Calendly in bio.

Cadence: 1 to 2 substantive technical posts per week.

## Drafts

### Essay 1 — Moderation Without the Lean
- [ ] Truth Social thread
- [ ] X thread
- [ ] LinkedIn post

### Essay 2 — The Stack
- [ ] Truth Social thread
- [ ] X thread
- [ ] LinkedIn post

### Essay 3 — Why the Bay Can't Help
- [ ] Truth Social thread
- [ ] X thread
- [ ] LinkedIn post
```

- [ ] **Step 4: Write crm.md stub**

Write to `crm.md`:

```markdown
# Eapen Technology CRM

Central tracker. Updated after every interaction. Friday weekly status report rolls up from this file.

## Pipeline

| Name | Company | Channel | Status | Weighted $ | Last contact | Next action | Notes |
|------|---------|---------|--------|------------|--------------|-------------|-------|

Status values: researched · contacted · replied · call booked · call complete · proposal out · closed-won · closed-lost · nurture

Weighted $ formula: deal size × stage probability
- contacted: 5%
- replied: 15%
- call booked: 25%
- call complete: 40%
- proposal out: 60%
- verbal: 80%
- closed-won: 100%

## Weekly status (rolling)

### Week of YYYY-MM-DD
- Sends out: 0
- Replies in: 0
- Calls booked: 0
- Calls completed: 0
- Proposals out: 0
- Weighted pipeline $: 0
- Closed-won this week: 0
- Blockers / notes:
```

- [ ] **Step 5: Commit**

```bash
git add pipeline/cold-outbound.md pipeline/warm-intros.md content/threads.md crm.md
git commit -m "chore: scaffold pipeline tracker files"
```

---

## Task 11: Privacy — gitignore the essay drafts directory (optional)

**Files:**
- Modify: `.gitignore` (create if absent)

`essays/_drafts/` contains markdown drafts that have been ported to HTML. They're useful in git history for review purposes, but the user may want them gitignored going forward. Default: keep them in git for review traceability. Skip this task unless Justus says otherwise.

- [ ] **Step 1: OPERATOR DECISION**

Ask Justus: keep `essays/_drafts/` in git, or gitignore it? Default keep.

- [ ] **Step 2 (only if gitignore chosen)**

```bash
echo "essays/_drafts/" >> .gitignore
git rm -r --cached essays/_drafts/
git add .gitignore
git commit -m "chore: gitignore essay markdown drafts"
```

---

## Task 12: Deploy to production

**Files:** None — git push triggers Coolify auto-deploy.

- [ ] **Step 1: Verify git status clean**

```bash
git status
```

Expected: working tree clean, ahead of origin/master by ~10 commits.

- [ ] **Step 2: Push**

```bash
git push origin master
```

- [ ] **Step 3: Watch deploy**

Coolify auto-deploys from master push. Verify eapentechnology.com loads new content within ~2 minutes.

- [ ] **Step 4: Smoke-test production**

Open `https://eapentechnology.com` in browser. Check:
- New hero loads, not the old "AI Solutions That Actually Save You Money"
- All three essay links work and load full essays
- Calendly CTA opens correctly
- 404 check: visit `https://eapentechnology.com/essays/moderation-without-the-lean.html` directly

- [ ] **Step 5: OPERATOR FINAL SIGN-OFF**

Justus confirms production looks correct. Phase 1 complete.

---

## What's done at end of Task 12

Phase 1 of the operator briefing — repositioning — is shipped.

What remains for Phase 2 (separate plans, not this one):
- Populate `pipeline/cold-outbound.md` with 50 real companies + named contacts
- Populate `pipeline/warm-intros.md` with 30 real names + drafted asks
- First 10 warm asks sent
- Distribute essays across Truth Social / X / LinkedIn

Phase 3 (deferred until first call booked):
- Discovery call brief template
- 24-hour follow-up email template
- Pilot proposal template
- Retainer continuation proposal template
