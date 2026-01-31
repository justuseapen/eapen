# Landing Page Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the single-page splash into a scrollable, multi-section consulting page with hero, services, about, and CTA — all within one `index.html` file.

**Architecture:** Single self-contained HTML file with inline CSS and JS. No build system, no dependencies. The existing visual system (glass-morphism, orbs, particles, mesh gradient) is preserved and extended to a scrollable layout. All content comes from the approved design document at `docs/plans/2026-01-30-landing-page-redesign-design.md`.

**Tech Stack:** HTML, CSS (custom properties, grid, backdrop-filter), vanilla JS.

**Verification:** After each task, run `python3 -m http.server 8000` and visually check `http://localhost:8000` in a browser.

---

## Task 1: Update meta tags and page title

**Files:**
- Modify: `index.html:1-6` (head section)

**Step 1: Replace the title and add meta tags**

Replace the existing `<title>` tag and add meta description, Open Graph, and Twitter Card tags immediately after the viewport meta tag:

```html
<title>Eapen Technology — AI Solutions for Business</title>
<meta name="description" content="Justus Eapen evaluates your business processes and designs AI implementations that cut costs and eliminate bottlenecks. Limited availability.">
<meta property="og:title" content="Eapen Technology — AI Solutions for Business">
<meta property="og:description" content="Justus Eapen evaluates your business processes and designs AI implementations that cut costs and eliminate bottlenecks. Limited availability.">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Eapen Technology — AI Solutions for Business">
<meta name="twitter:description" content="Justus Eapen evaluates your business processes and designs AI implementations that cut costs and eliminate bottlenecks. Limited availability.">
```

**Step 2: Commit**

```bash
git add index.html
git commit -m "feat: update page title and add meta/OG/Twitter tags"
```

---

## Task 2: Make the page scrollable and update CSS layout

**Files:**
- Modify: `index.html` — CSS section (lines 7-297)

**Step 1: Update body styles for scrolling**

Change body from single-viewport centered layout to scrollable:

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
    background: #fbfbfd;
    color: var(--text-primary);
    min-height: 100vh;
    position: relative;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

Key changes: remove `display: flex`, `align-items: center`, `justify-content: center`, `overflow: hidden`.

**Step 2: Update .container to be a full-page layout container**

```css
.container {
    position: relative;
    z-index: 1;
    max-width: 720px;
    width: 90%;
    margin: 0 auto;
    padding: 80px 40px;
    animation: fadeIn 0.8s ease-out;
}
```

Key changes: wider `max-width` (720px from 600px), auto horizontal margin for centering, more top padding, remove `text-align: center`.

**Step 3: Add new CSS custom properties to :root**

Add to the existing `:root` block:

```css
--text-tertiary: #86868b;
--surface-dark: rgba(0, 0, 0, 0.02);
```

**Step 4: Add typography scale**

Add after the existing `h1` styles:

```css
h2 {
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

h3 {
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
}
```

**Step 5: Add section spacing**

```css
.section {
    margin-bottom: 100px;
}

.section-label {
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent-blue);
    margin-bottom: 1rem;
}
```

**Step 6: Add hero section styles**

```css
.hero {
    text-align: center;
    padding: 60px 0 80px;
    margin-bottom: 100px;
}

.hero .tagline {
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
}

.hero .subtitle {
    font-size: 1.125rem;
    font-weight: 400;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    line-height: 1.5;
    max-width: 540px;
    margin-left: auto;
    margin-right: auto;
}

.hero .supporting {
    font-size: 0.9375rem;
    color: var(--text-tertiary);
    margin-bottom: 2.5rem;
    line-height: 1.5;
}
```

**Step 7: Add services grid styles**

```css
.services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-top: 2rem;
}

.service-card {
    background: var(--surface-light);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid var(--border-light);
    border-radius: 20px;
    padding: 2rem;
    text-align: left;
    box-shadow:
        0 4px 24px rgba(0, 0, 0, 0.04),
        0 1px 2px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.service-card:hover {
    transform: translateY(-2px);
    box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.06),
        0 2px 4px rgba(0, 0, 0, 0.08);
}

.service-card h3 {
    margin-bottom: 0.75rem;
}

.service-card p {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-secondary);
}
```

**Step 8: Add about section styles**

```css
.about p {
    font-size: 1.0625rem;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 1rem;
}

.about p:last-child {
    margin-bottom: 0;
}
```

**Step 9: Add bottom CTA section styles**

```css
.bottom-cta {
    text-align: center;
    padding: 60px 0 40px;
    margin-bottom: 60px;
}

.bottom-cta .qualifier {
    font-size: 0.9375rem;
    color: var(--text-tertiary);
    margin-top: 1.25rem;
}
```

**Step 10: Update responsive breakpoint**

Replace the existing `@media (max-width: 600px)` block with:

```css
@media (max-width: 600px) {
    h1 {
        font-size: 2.5rem;
    }

    h2 {
        font-size: 1.75rem;
    }

    .hero {
        padding: 40px 0 60px;
        margin-bottom: 60px;
    }

    .hero .tagline {
        font-size: 1.25rem;
    }

    .hero .subtitle {
        font-size: 1rem;
    }

    .section {
        margin-bottom: 60px;
    }

    .container {
        padding: 40px 20px;
    }

    .service-card {
        padding: 1.5rem;
    }

    .contact-card {
        padding: 1.5rem;
    }
}
```

**Step 11: Commit**

```bash
git add index.html
git commit -m "feat: update CSS for scrollable multi-section layout

Add typography scale, section spacing, services grid, about styles,
hero layout, bottom CTA, and updated responsive breakpoints."
```

---

## Task 3: Restructure HTML with all content sections

**Files:**
- Modify: `index.html` — HTML body (lines 299-328)

**Step 1: Replace the main content HTML**

Replace everything between `<div id="particles"></div>` and `<div class="noise"></div>` with the full page structure:

```html
<!-- Main content -->
<div class="container">
    <!-- Hero Section -->
    <section class="hero">
        <h1>Eapen Technology</h1>
        <p class="tagline">AI Solutions That Actually Save You Money</p>
        <p class="subtitle">We evaluate your business processes and design AI implementations that cut costs, eliminate bottlenecks, and compound over time.</p>
        <p class="supporting">Led by Justus Eapen — senior engineer, AI specialist, and engineering leader with 12+ years shipping software at scale. Limited availability.</p>

        <div class="contact-card">
            <a href="https://calendly.com/eapentechnology/get-acquainted" target="_blank" rel="noopener noreferrer" class="contact-btn">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Apply for a Consultation
            </a>
        </div>
    </section>

    <!-- Services Section -->
    <section class="section">
        <p class="section-label">Services</p>
        <h2>What I Do</h2>
        <div class="services-grid">
            <div class="service-card">
                <h3>AI Process Audit</h3>
                <p>I examine your operations end-to-end and identify where AI can eliminate manual work, reduce errors, and cut costs. You get a prioritized roadmap — not a vague slide deck.</p>
            </div>
            <div class="service-card">
                <h3>AI Solution Design &amp; Implementation</h3>
                <p>From architecture to production. I design and build AI systems tailored to your workflows — content moderation, automation, internal tooling, whatever moves the needle.</p>
            </div>
            <div class="service-card">
                <h3>Engineering Leadership</h3>
                <p>Need someone to lead the technical side? I embed with your team to hire engineers, set standards, and ship. Fractional CTO, hands-on.</p>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="section about">
        <p class="section-label">About</p>
        <h2>Who You're Working With</h2>
        <p>Justus Eapen is a senior software engineer and engineering leader with 12+ years building production systems at scale. He currently leads internal tools and AI automoderation at a major social media platform, designing systems that process millions of pieces of content daily.</p>
        <p>Previously, Justus built full-stack applications at SmartLogic, led product and engineering at multiple startups, and founded Baltimore's first AI meetup — growing it to 400+ members. He's spoken at national engineering conferences, hosted two technology podcasts, and contributed to open-source AI and chatbot frameworks.</p>
        <p>He started Eapen Technology to bring that same level of engineering rigor to businesses ready to capture real value from AI.</p>
    </section>

    <!-- Bottom CTA -->
    <section class="bottom-cta">
        <div class="contact-card">
            <a href="https://calendly.com/eapentechnology/get-acquainted" target="_blank" rel="noopener noreferrer" class="contact-btn">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Apply for a Consultation
            </a>
        </div>
        <p class="qualifier">Limited availability — I take on a small number of clients at a time.</p>
    </section>
</div>
```

Note: The CTA SVG icon is changed from an envelope to a calendar icon (matches Calendly action). Both CTAs link to the same Calendly URL with `target="_blank"` and `rel="noopener noreferrer"`.

**Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add hero, services, about, and CTA sections

Replace single-viewport splash with full scrollable page.
All content from approved design document."
```

---

## Task 4: Update JavaScript for scrollable page

**Files:**
- Modify: `index.html` — script section (lines 330-375)

**Step 1: Update JS to handle multiple contact cards and scrollable layout**

Replace the entire `<script>` block with:

```html
<script>
    // Create floating light particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'light-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 25 + 's';
        particle.style.animationDuration = (20 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }

    // Subtle parallax effect on mouse move (with requestAnimationFrame)
    let rafId = null;
    document.addEventListener('mousemove', (e) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;

            const orbs = document.querySelectorAll('.liquid-orb');
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 20;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
            rafId = null;
        });
    });

    // Smooth hover effect for all contact cards
    document.querySelectorAll('.contact-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) - 0.5;
            const y = ((e.clientY - rect.top) / rect.height) - 0.5;

            card.style.transform = `
                perspective(1000px)
                rotateY(${x * 5}deg)
                rotateX(${-y * 5}deg)
                translateZ(10px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
        });
    });
</script>
```

Changes:
- Wrap mousemove parallax in `requestAnimationFrame` (performance fix from Phase 3 backlog — free to include)
- Use `querySelectorAll('.contact-card')` and `forEach` to handle both hero and bottom CTA cards
- Otherwise identical behavior

**Step 2: Commit**

```bash
git add index.html
git commit -m "feat: update JS for multiple contact cards and rAF optimization"
```

---

## Task 5: Visual verification

**Step 1: Start local server and verify**

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` and verify:
- [ ] Page scrolls (no `overflow: hidden`)
- [ ] Hero section: headline, tagline, subtitle, supporting line, CTA button visible
- [ ] CTA button says "Apply for a Consultation" and opens Calendly in new tab
- [ ] Services section: 3 glass cards with correct titles and descriptions
- [ ] About section: "Who You're Working With" header, 3 paragraphs of bio
- [ ] Bottom CTA: second "Apply for a Consultation" button + qualifier text
- [ ] Background orbs, particles, and mesh gradient still animate
- [ ] Both contact cards have 3D tilt effect on hover
- [ ] Shimmer effect works on both contact cards
- [ ] Mobile responsive (resize to ~375px width)

**Step 2: Fix any visual issues found**

If adjustments are needed, make them and commit:

```bash
git add index.html
git commit -m "fix: visual adjustments from verification"
```
