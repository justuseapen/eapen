# Marketing Loops Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the daily-driver `/marketing-loop` skill plus its state files and accountability nag, per `docs/superpowers/specs/2026-06-10-marketing-loops-design.md`.

**Architecture:** One project skill runs six stages interactively (inbox scan → follow-up sends → first-touch Gmail drafts → content queue → warm intros → Friday rollup), with all state in repo markdown files and `crm.md` as the single source of truth for contact status. Each run commits and pushes `pipeline/loop-log.md`; a scheduled cloud routine reads it from GitHub and nags only on idle days.

**Tech Stack:** Claude Code project skill (markdown), Gmail MCP connector (claude.ai), WebSearch, git, `/schedule` cloud routine. No build system, no test framework (repo is a static site) — verification is dry-run execution plus file assertions.

**Context for the implementer (read first):**

- This repo is the marketing operation for Eapen Technology, a T&S/moderation consultancy. The operator is Justus Eapen. Deal anchor is a $25K assessment; weighted pipeline values: contacted $1,250 · replied $3,750 · call booked $6,250 · call complete $10,000 · proposal out $15,000.
- 10 cold emails already exist in `pipeline/emails/01-*.md` through `10-*.md` (format: `**To:** / **From:** / **Subject:**` header, body, `## Notes` section). They are ~4 weeks stale.
- The buyer universe is `pipeline/cold-outbound.md` (30 researched companies, 10 of which have email drafts).
- Send order was already decided in `docs/superpowers/reports/2026-05-15-phase2-operator-review.md`: GiveSendGo, Pray.com, Salem, Newsmax, Hallow, Beehiiv, Neynar, Muslim Pro, Real America's Voice (LinkedIn DM — email is guessed), Epoch Times.
- Emails send **from `justus@eapentechnology.com`**. The Gmail connector may be authenticated to a different mailbox; the skill verifies send-as on first run.
- Git remote: `github.com/justuseapen/eapen`, branch `master`. Pushes auto-deploy the static site via Coolify; markdown-only pushes are harmless (Dockerfile copies only `index.html` and `essays/`).

---

### Task 1: Create `pipeline/loop-log.md`

**Files:**
- Create: `pipeline/loop-log.md`

- [ ] **Step 1: Write the file with exactly this content**

````markdown
# Marketing Loop — Run Log

Append-only. One entry per run, newest at the bottom. Entry header is `## YYYY-MM-DD — <mode>`
where mode is `live`, `dry-run`, or `degraded`. The scheduled nag routine reads this file from
GitHub master: if no entry exists for today (America/New_York), it notifies the operator.

The first `live` entry's date is the **content anchor** — the essay posting schedule counts
weeks from it.

<!-- entries below -->
````

- [ ] **Step 2: Verify**

Run: `grep -c "content anchor" pipeline/loop-log.md`
Expected: `1`

- [ ] **Step 3: Commit**

```bash
git add pipeline/loop-log.md
git commit -m "feat: loop-log state file for marketing loop runs"
```

---

### Task 2: Create `pipeline/followup-templates.md`

**Files:**
- Create: `pipeline/followup-templates.md`

- [ ] **Step 1: Write the file with exactly this content**

Note the `Approved: no` header — the skill refuses to auto-send until the operator flips it in Task 6. Voice rules apply: no em-dash pivots, no "we", no triplet adjectives.

````markdown
# Cold Outbound Follow-up Templates

Approved: no
<!-- The marketing-loop skill auto-sends follow-ups ONLY when the operator flips the line
     above from no to yes. Until then it creates Gmail drafts and asks the operator to send.
     Skill implementers: check the gate with an anchored match on the line above (grep -x);
     this comment deliberately never spells out the open-gate value. -->

Rules:
- FU-1 sends 7+ days after first touch with no reply. FU-2 sends 7+ days after FU-1, still no reply.
- Both send as replies in the original thread (same subject; `Re:` prefixed on a fresh send
  unless the subject already starts with `Re:`).
- After FU-2 with no reply, the contact moves to `nurture` in crm.md and is never auto-touched again.
- Personalization slots: [Name] = first name; [hook-clause] = short noun phrase restating the
  original email's hook (it follows "about", so it must read as a noun phrase). Freshness-check
  it first: if the hook event has aged, restate it in past tense; if it is no longer accurate,
  skip the send and flag for the operator.
- Max 10 follow-up sends (or drafts, when unapproved) per run, oldest due first.

## FU-1 (day 7)

> [Name],
>
> My note from last week about [hook-clause] still stands. Thirty minutes on your moderation
> surface. No deck and no pitch. If the timing is wrong, a one-line "not now" is a fine answer.
>
> Justus

## FU-2 (day 14, final)

> [Name],
>
> Last note from me. If moderation infrastructure is on your roadmap this year, the two client
> slots I mentioned will likely be filled this quarter. If not, no reply needed and I'll stay
> out of your inbox.
>
> https://eapentechnology.com
>
> Justus
````

- [ ] **Step 2: Verify**

Run: `grep -c "Approved: no" pipeline/followup-templates.md`
Expected: `1`

- [ ] **Step 3: Commit**

```bash
git add pipeline/followup-templates.md
git commit -m "feat: follow-up templates (unapproved; auto-send locked until operator flips)"
```

---

### Task 3: Create `pipeline/queue.md`

**Files:**
- Create: `pipeline/queue.md`

- [ ] **Step 1: Write the file with exactly this content**

The 10 drafted emails in the operator-decided send order, then the 20 researched-but-undrafted companies from `pipeline/cold-outbound.md` as backlog. Queue item statuses: `queued → awaiting-send [or awaiting-send (DM)] → sent` (terminal) or `skipped` (with reason).

````markdown
# Send Queue — Cold Outbound

Pre-send lifecycle lives here; crm.md rows are created only after something actually sends.
Statuses: queued (no current Gmail draft) · awaiting-send (Gmail draft created, operator has
not sent) · awaiting-send (DM) (DM text written into the draft file; operator must paste it —
no Gmail draft exists) · sent (detected in Sent folder; crm row exists) · skipped (reason in
notes). Skill note: match `awaiting-send` as a prefix so the DM variant is always included.
Routes: email · linkedin-dm (address guessed or none; agent writes DM text instead).

## Config

- daily-first-touch-cap: 3
- weekly-first-touch-cap: 15
- replenish-threshold: 10   # trigger replenish when undrafted backlog drops below this; quantity = replenish-batch
- replenish-batch: 5        # at most once per 7 days

## Queue (drafted emails, operator-approved order)

| Pos | Contact | Company | Route | Draft file | Status | Notes |
|-----|---------|---------|-------|------------|--------|-------|
| 1 | Jacob Wells | GiveSendGo | email | pipeline/emails/01-givesendgo-jacob-wells.md | queued | Hook decayed (Karmelo Anthony cycle, May); needs freshness pass |
| 2 | Steve Gatena | Pray.com | email | pipeline/emails/02-pray-com-steve-gatena.md | queued | July 4 America Prays hook still live |
| 3 | David Santrella | Salem Media | email | pipeline/emails/03-salem-media-david-santrella.md | queued | 30-day acquisition window likely closed; needs new hook angle |
| 4 | Steve Smith | Newsmax | email | pipeline/emails/08-newsmax-steve-smith.md | queued | Earnings-timing hook (May 14 Q1 print) stale; needs freshness pass |
| 5 | Erich Kerekes | Hallow | email | pipeline/emails/05-hallow-erich-kerekes.md | queued | Brand trial hook (Oct 2026 trial) likely still live |
| 6 | Tyler Denk | Beehiiv | email | pipeline/emails/04-beehiiv-tyler-denk.md | queued | Apr 23 webinars launch hook aging |
| 7 | Rishav Mukherji | Neynar | email | pipeline/emails/06-neynar-rishav-mukherji.md | queued | Keep or soften "policy capture" (in email body) per the file's notes section |
| 8 | Nafees Khundker | Muslim Pro | email | pipeline/emails/07-muslim-pro-nafees-khundker.md | queued | Ummah Pro / Ramadan hook stale post-Ramadan; needs freshness pass |
| 9 | Michael Norton | Real America's Voice | linkedin-dm | pipeline/emails/09-real-americas-voice-michael-norton.md | queued | No verified email (two guesses in file); DM route per operator review |
| 10 | Samuel Zhou | Epoch Times | email | pipeline/emails/10-epoch-times-samuel-zhou.md | queued | Long email; trim on freshness pass if hook moved |

## Backlog (researched in cold-outbound.md, no email drafted yet)

Drafting order is agent's choice by hook freshness. Rows reference `pipeline/cold-outbound.md`.

| Company | Contact | Cold-outbound row | Status |
|---------|---------|-------------------|--------|
| Rumble | Wojciech Hlibowicki | 1 | needs-draft |
| Minds | Mark Harding | 2 | needs-draft |
| Gab | Andrew Torba | 3 | needs-draft |
| Gloo | Pat Gelsinger | 5 | needs-draft |
| Substack | Hamish McKenzie | 6 | needs-draft |
| Locals | Assaf Lev | 7 | needs-draft |
| Damus | William Casarin | 8 | needs-draft |
| Primal | Miljan Braticevic | 9 | needs-draft |
| PublicSquare | Michael Seifert | 10 | needs-draft |
| Mask Network / Lens | Suji Yan | 12 | needs-draft |
| MeWe | Carlos Betancourt | 13 | needs-draft |
| Glorify | Henry Costa | 14 | needs-draft |
| Ark Dating | Bob Carroll | 16 | needs-draft |
| RallyPoint | David Gowel | 17 | needs-draft (hook outside 90d; re-research first) |
| Blaze Media | Tyler Cardon | 18 | needs-draft (no sharp hook; re-research first) |
| SALT | Rachael Kearney | 19 | needs-draft (contact research incomplete) |
| Stacker News | Keyan Kousha | 21 | needs-draft |
| Odysee | Julian Chandra | 23 | needs-draft |
| GETTR | Ken Huang | 27 | needs-draft |
| Brighteon | Mike Adams | 30 | needs-draft (hook outside 90d; re-research first) |
````

- [ ] **Step 2: Verify**

Run: `grep -c "needs-draft" pipeline/queue.md`
Expected: `20`

Run: `grep -c "| queued |" pipeline/queue.md`
Expected: `10`

- [ ] **Step 3: Commit**

```bash
git add pipeline/queue.md
git commit -m "feat: send queue - 10 drafted emails in approved order + 20-company backlog"
```

---

### Task 4: Create the `/marketing-loop` skill

**Files:**
- Create: `.claude/skills/marketing-loop/SKILL.md`

- [ ] **Step 1: Write the skill with exactly this content**

````markdown
---
name: marketing-loop
description: Daily driver for the Eapen Technology client pipeline. Six stages - inbox scan, follow-up sends, first-touch Gmail drafts, content queue, warm intros, Friday rollup - then log, commit, push. Use when the operator runs /marketing-loop or asks for a daily marketing/pipeline session. Pass "dry-run" to suppress all external effects.
---

# Marketing Loop — Daily Driver

One run per day, ~10 minutes of operator time. You do everything except irreversible external
actions. The operator personally: sends every first-touch email (from Gmail drafts you create),
pastes every public post, sends every warm-intro ask, and answers every human reply. You may
auto-send ONLY cold-outbound follow-ups, and only when `pipeline/followup-templates.md` says
`Approved: yes`.

Design spec: `docs/superpowers/specs/2026-06-10-marketing-loops-design.md`.

## Modes

- `/marketing-loop` — live run.
- `/marketing-loop dry-run` — run every stage, but create NO Gmail drafts, send NOTHING,
  prompt no posting, and ask no operator questions that imply external action. Repo-file
  writes proceed normally. Log the entry as `dry-run`.
- Degraded — Gmail unavailable (see Setup). Stages 1-2 skip; stage 3 writes draft bodies to
  `pipeline/outbox/` instead of Gmail, leaving queue status `queued` with an
  `outbox: <path>` note (the next live run converts these to real Gmail drafts). Log as
  `degraded`. If dry-run was requested and Gmail is also unavailable, dry-run wins: log
  `dry-run`.

## State files

| File | Role |
|------|------|
| `crm.md` | Source of truth for contact state AFTER first external event. Rows created only on confirmed send/post. |
| `pipeline/queue.md` | Pre-send lifecycle: order, caps config, route, item status. |
| `pipeline/followup-templates.md` | Follow-up copy + the `Approved:` gate for auto-send. |
| `pipeline/loop-log.md` | Append-only run log. First `live` entry = content anchor. |
| `pipeline/cold-outbound.md` | Buyer universe / research backlog. |
| `pipeline/emails/*.md` | First-touch drafts. Format: `**To:**/**From:**/**Subject:**` header, body, `## Notes`. |
| `pipeline/warm-intros.md` | Segments, ask templates (1=strong personal, 2=professional, 3=audience/public), warm tracker. |
| `content/threads.md` | Thread drafts: 3 essays x (Truth Social, X, LinkedIn). |

## Hard rules (check before every external action)

- Voice: no em-dash rhetorical pivots; no "It's not X, it's Y"; no "we" (operator is solo);
  no triplet adjectives; no stock openers; specific numbers and named platforms.
- Disclosure: TMTG and Truth Social may be named. NEVER name Janus, Boosted Truths, Spark,
  or describe internal TMTG architecture.
- Caps: 3 first-touch drafts/day and 15 first-touch sends/week (queue.md Config);
  10 follow-up sends, or drafts when the gate is closed, per run (followup-templates.md).
- Never auto-touch any contact at `replied` or later. "Not interested" → `closed-lost`,
  permanent suppression. Never auto-send a reply to a human.
- Weighted $: contacted $1,250 · replied $3,750 · call booked $6,250 · call complete $10,000
  · proposal out $15,000 (anchor $25K assessment).

## Setup (every run)

1. Get today: `date +%F`. Read `pipeline/loop-log.md`: last run date, last mode, whether any
   `live` entry exists (if none, this is a COLD-START run — see below).
2. Load Gmail tools via ToolSearch (query: "gmail search read draft send"). If absent or
   unauthenticated, ask the operator to run `/mcp` and authenticate. If declined/failed,
   switch to degraded mode and say so plainly.
3. First live run only: verify the connected mailbox can send as `justus@eapentechnology.com`
   (check Gmail send-as settings via a test draft with that From address; delete it after).
   If send-as is unavailable, STOP and ask the operator whether to proceed from the connected
   address or fix Workspace settings first.

## Stage 1 — Inbox scan

Skip in degraded mode.

1. Build the watchlist: every `addr:` recorded in crm.md row Notes plus every queue item
   whose status begins with `awaiting-send`, plus every `sent` queue item. A crm row without
   an `addr:` note (e.g., warm or inbound) cannot be inbox-watched; surface it once in the
   summary so the operator knows.
2. Search Gmail for messages from each address (and its domain) since the last run date
   (no prior entries in loop-log: scan the last 14 days).
3. For each hit, classify:
   - **Reply from contact** → crm status `replied`, weighted $3,750, draft a response for the
     operator as a Gmail draft in the reply thread (never send it), surface in summary. If the reply contains scheduling language or
     a Calendly confirmation → status `call booked` ($6,250) and flag **PHASE 3 TRIGGER**:
     tell the operator the Phase 3 conversion playbook (pre-call brief, follow-up template,
     pilot proposal) should now be drafted per the Phase 2 plan, step 8.
   - **Bounce** → mark email invalid in queue notes, suggest `linkedin-dm` route, no crm change.
   - **Out-of-office** → keep status, push next-action date past the return date.
   - **"Not interested"** → `closed-lost`, suppress permanently.
   - **Ambiguous** (wrong person, forward, unclear) → no status change; surface with a
     suggested classification.
4. Reconcile sends: for each `awaiting-send` (email-route) queue item, search the Sent folder
   for a message to that address. If found: queue status `sent`; create the crm row
   (`contacted`, channel `cold-email`, weighted $1,250, last contact = send date, next action
   `follow-up in 7d if no reply`), and record in the row's Notes the exact send address and
   first-touch date (`addr: x@y.com · first: YYYY-MM-DD`). For `awaiting-send (DM)` items
   there is no Sent-folder evidence: ask the operator in-session whether the DM went out; on
   yes, queue status `sent` and crm row with channel `cold-dm`, same stage math and Notes
   convention. ALL `cold-dm` contacts are excluded from Stage 2 (it filters on `cold-email`);
   when their follow-up would come due, draft DM follow-up text for the operator instead.
5. Dry-run mode: scan read-only and report what WOULD change; write no crm rows, create no
   Gmail drafts, ask no DM-confirmation questions.

## Stage 2 — Follow-up sends

Skip in degraded mode.

1. Eligible: crm rows with channel `cold-email`, status `contacted`, last contact ≥ 7 days
   ago, and fewer than 2 follow-ups recorded (track as `FU1 sent YYYY-MM-DD` / `FU2 sent
   YYYY-MM-DD` in the row's Notes).
2. Check the gate: open only when the templates file has a line that is exactly
   `Approved: yes` (anchored: `grep -x "Approved: yes" pipeline/followup-templates.md`).
   If closed, create Gmail drafts instead of sending and tell the operator the gate is closed.
3. Idempotency: before each send, search Sent for any message to that address sent strictly
   AFTER the last recorded touch (the recorded touch is itself a Sent message; exclude it).
   If one exists, skip and reconcile crm instead.
4. Compose from FU-1 or FU-2 template, fill the slots per the templates file's rules ([Name],
   [hook-clause] with its freshness check), reply in the original thread. Send. Update crm
   Notes and last-contact date.
5. After FU-2: status → `nurture`.
6. Cap 10 per run (sends, or drafts when the gate is closed), oldest due first; note any
   deferred to next run.
7. Dry-run mode: report who WOULD receive what; send nothing, draft nothing.

## Stage 3 — First-touch drafts

1. Read caps and statuses from `pipeline/queue.md`. Compute this week's first-touch sends:
   crm rows with channel `cold-email` or `cold-dm` whose `first:` Notes date is within the
   last 7 days. Respect both caps.
2. Goal: create up to `daily-first-touch-cap` NEW drafts this run (a per-run rate; items left
   at `awaiting-send` from prior runs do not count against it, but surface them as overdue).
   If 2x the daily cap or more already sit at a status beginning with `awaiting-send`, draft
   nothing and tell the operator the backlog needs clearing first. Process the Queue table in
   position order:
   - **Freshness check** (every item, every time): WebSearch the hook's named event. A hook is
     stale if the event is no longer current, superseded, or factually changed. Rewrite the
     hook line(s) in the draft file — keep the body, swap the hook. If no live hook can be
     found, mark `skipped (stale hook)` in queue notes and move on; never send unverifiable
     claims.
   - Run the Hard-rules checklist over the final text.
   - Route `email` → create a Gmail draft (From `justus@eapentechnology.com`, Subject from
     the file header, the body verbatim). To: if the header lists one address, use it; if it
     lists guesses, pick the most probable one, record it in the queue Notes (`addr: ...`),
     and flag the guess in the summary so the operator can override before sending. Mark
     `awaiting-send` with date.
   - Route `linkedin-dm` → write a ≤120-word DM adaptation into the draft file under
     `## LinkedIn DM version`, mark `awaiting-send (DM)`, surface ready-to-paste in summary.
   - Backlog item without a draft file (`needs-draft`): write a new email in
     `pipeline/emails/NN-<company>-<contact-slug>.md` matching the existing file format,
     built on the cold-outbound row's hook plus fresh research, ~150 words, no Calendly link,
     sign-off "Justus". Then promote it into the Queue table and proceed as above.
3. **Replenish**: if backlog `needs-draft` count < replenish-threshold AND no `replenish`
   note in loop-log within 7 days: research `replenish-batch` new companies (cold-outbound
   rows 31+, matching its column format, hooks within 90 days, named decision-maker), append
   to cold-outbound.md and the Backlog table.
4. Dry-run mode: do the freshness research and report findings; write no Gmail drafts; you
   may still fix stale hook lines in the repo files (that is a repo write, allowed).

## Stage 4 — Content queue

1. Content anchor = date of the first `live` loop-log entry; on the cold-start live run
   itself, the anchor is today (its entry is written at Stage 6). Dry-run or degraded runs
   never set the anchor; with no anchor yet, report "no content anchor" and skip this stage.
   Week 1 = anchor through day 6, week 2 = days 7-13, week 3 = days 14-20.
2. Schedule: Essay 1 threads in week 1, Essay 2 in week 2, Essay 3 in week 3 — all three
   platforms (Truth Social, X, LinkedIn) the same day per essay.
3. If the current week's essay has no `Essay N distribution` row in crm.md: present that
   essay's three platform versions from `content/threads.md` ready-to-paste. When the operator
   confirms posting, add the crm row (channel `content`, status `published`, post URLs in
   Notes). If they defer, note it and move on.
4. Week 4+: if no content row in the last 7 days, draft one short technical post (Truth
   Social + X versions, 150-300 words) adapted from an essay section not yet used standalone,
   closing with the 2-clients CTA. Operator approves and pastes; record as above.
5. Dry-run mode: report what is due; present nothing for posting.

## Stage 5 — Warm intros

1. Count named rows across segments in `pipeline/warm-intros.md`. If < 30 (and not dry-run):
   ask the operator for up to 5 names now, format `Name | role/world | relationship |
   segment` (segment optional; infer it and confirm). Add each name under its segment list
   AND create its tracker row. Zero names is an acceptable answer; log and continue.
2. For each name without a tracker row: choose the template by segment (A/F/G → 1,
   C/D → 2, B/E → 3, G with weaker ties → 2; default 2), draft the personalized ask, add a
   tracker row with status `drafted`. The operator sends all warm asks personally.
3. For tracker rows at `sent` with no response after 7 days and no nudge drafted yet: draft a
   one-line nudge for the operator. After 14 days silent: status `no response`.

## Stage 6 — Friday rollup + close

1. If today is Friday, or the newest weekly block in crm.md is older than 7 days (the
   `Week of YYYY-MM-DD` placeholder counts as never-written): append a
   weekly status block (sends out cold+warm, replies in, calls booked, calls completed,
   proposals out, weighted pipeline $, closed-won, blockers) computed from crm.md, plus:
   `Day-60 (2026-07-13): X/100 sends, Y/10-15 calls`.
2. Append the run entry to `pipeline/loop-log.md`:

   ```
   ## YYYY-MM-DD — live|dry-run|degraded
   - inbox: <replies/bounces/sends-detected or "skipped">
   - followups: <n sent (who) or "gate closed: drafted n">
   - first-touch: <n drafted (who), n skipped (why)>
   - content: <what posted/presented/deferred>
   - warm: <names added, asks drafted, nudges>
   - rollup: <written|not due>
   - replenish: <done|not due|n/a>
   - action-needed: <operator items>
   ```

3. Commit ONLY the loop's files: `git add crm.md pipeline/ content/threads.md`, then
   `git commit -m "loop: YYYY-MM-DD run" && git push`. NEVER `git add -A` or `git add .`:
   the operator keeps unrelated work in flight, and pushes to master auto-deploy the site.
   If `git status` shows unexpected changes to `index.html` or `essays/`, leave them
   unstaged and flag them in the summary.
4. End with the session summary:

   ```
   ## Loop summary — YYYY-MM-DD
   **Sent automatically:** n follow-ups (names) | none
   **Waiting on you:**
   - Gmail drafts ready to send: ...
   - Replies needing answers (drafts ready): ...
   - Posts ready to paste: ...
   - Warm asks to send: ...
   **Pipeline:** weighted $X · Day-60: Y/100 sends · Z calls booked
   ```

## Cold start (first run with no prior `live` entry)

Cold start applies to LIVE runs only (a dry-run with no prior live entry just runs the six
stages in dry-run mode and reports that cold start is still pending). Run these BEFORE the
six stages:

1. **Gate 1 — emails:** freshness re-research ALL queue items (not just today's three).
   Rewrite stale hooks in the draft files; flag any dead-hook items.
2. **Gate 2 — threads:** if `content/threads.md` already carries a ratification-decisions
   note at the top, skip this gate (an earlier cold start handled it). Otherwise ask the
   operator the four pending ratification questions, one decision each — keep verbatim on
   Truth Social + X, or remove from those platforms (the LinkedIn versions already soften or
   omit each line; for (a) and (b) that softened phrasing may also replace the TS+X line if
   the operator prefers): (a) "AWS is run by woke leftists" (Essay 2), (b) Telegram
   intelligence-community speculation (Essay 2), (c) "I was at January 6" (Essay 2),
   (d) "I am writing this as a Christian" (Essay 3). Apply decisions to `content/threads.md`
   and note them at the top of the file.
3. **Gate 3 — warm names:** stage 5 asks for 5 names as usual.
4. Today becomes the content anchor once this run's `live` entry is logged.
````

- [ ] **Step 1b: Add the `published` status to crm.md**

In `crm.md`, extend the status line to read:

```
Status values: researched · contacted · replied · call booked · call complete · proposal out · closed-won · closed-lost · nurture · published (content-distribution rows only; no weighted $)
```

Commit separately:

```bash
git add crm.md
git commit -m "feat: add published status to crm tracker for content-distribution rows"
```

- [ ] **Step 2: Verify the skill loads**

Run: `head -5 .claude/skills/marketing-loop/SKILL.md`
Expected: frontmatter with `name: marketing-loop`

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/marketing-loop/SKILL.md
git commit -m "feat: /marketing-loop daily-driver skill - six stages, dry-run, cold start"
```

---

### Task 5: Dry-run verification

**Files:**
- Modify (expected by the run, not by you): `pipeline/loop-log.md`, possibly `pipeline/emails/*.md`

- [ ] **Step 1: Run the loop in dry-run mode**

Invoke the skill: `/marketing-loop dry-run`

- [ ] **Step 2: Assert external silence**

Confirm in the session transcript: no Gmail draft created, no send, no posting prompt, no
operator questions about external actions. If Gmail is not yet authenticated, the run must
have proceeded in degraded-dry mode without erroring.

- [ ] **Step 3: Assert state writes**

Run: `tail -15 pipeline/loop-log.md`
Expected: one new entry headed `## <today> — dry-run` with all eight bullet lines present (inbox, followups, first-touch, content, warm, rollup, replenish, action-needed).

Run: `git status --short`
Expected: only repo markdown files modified (loop-log, possibly email files with refreshed hooks).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "test: marketing-loop dry-run - state writes verified, zero external effects"
```

---

### Task 6: Operator approves follow-up templates

**Files:**
- Modify: `pipeline/followup-templates.md` (the `Approved:` line)

- [ ] **Step 1: Present FU-1 and FU-2 verbatim to the operator**

Show both templates and the rules block. Ask explicitly: "These two messages will send from
your address without per-send review once approved. Approve as written, or edit first?"

- [ ] **Step 2: Apply any edits, then flip the gate**

On approval, change `Approved: no` to `Approved: yes` and add a line
`Approved by operator: YYYY-MM-DD`.

- [ ] **Step 3: Commit**

```bash
git add pipeline/followup-templates.md
git commit -m "feat: operator-approved follow-up templates - auto-send gate open"
```

---

### Task 7: Schedule the nag routine

**Files:** none in repo (cloud routine via `/schedule`)

- [ ] **Step 1: Push master so the routine can read current state**

```bash
git push origin master
```

- [ ] **Step 2: Create the routine with the /schedule skill**

Schedule: daily at 17:00 America/New_York. Repo: `justuseapen/eapen`, branch `master`. Prompt:

> Read `pipeline/loop-log.md` in this repo. Compute today's date in America/New_York. If an
> entry headed with today's date exists (any mode: live, dry-run, or degraded), do nothing and
> end without notifying. Otherwise read `pipeline/queue.md` and `crm.md`, then notify Justus
> with the title "Pipeline idle — run /marketing-loop" and a body of at most two sentences
> containing: how many queue items sit at a status beginning with awaiting-send (drafts or
> DMs waiting on the operator), how many crm
> contacts at `contacted` have a last-contact date 5 or more days old (follow-ups coming due),
> and days remaining until the 2026-07-13 Day-60 checkpoint with current total sends versus
> the 100-send target. State, not sentiment. Never include contact email addresses in the
> notification.

- [ ] **Step 3: Verify**

List scheduled routines (via the /schedule skill's list mode) and confirm the routine exists
with the daily 17:00 America/New_York cadence. If the platform supports a manual trigger, run
it once and confirm a notification arrives (today's log has no entry yet at that moment) or
does not (if the dry-run entry from Task 5 carries today's date — either observed behavior
must match the log state).

---

### Task 8: First live run (clears the three Phase 2 gates)

**Files:**
- Modify (by the run): `pipeline/emails/*.md`, `content/threads.md`, `pipeline/queue.md`, `pipeline/warm-intros.md`, `pipeline/loop-log.md`, `crm.md`

- [ ] **Step 1: Run `/marketing-loop`**

Cold-start section executes first: full freshness re-research on all 10 queued emails, the
four thread-ratification questions, then the six stages. Expect stage 3 to produce the first
3 Gmail drafts (GiveSendGo, Pray.com, Salem — hooks refreshed or replaced) and stage 5 to ask
for 5 warm names.

- [ ] **Step 2: Operator sends the first drafts**

Operator opens Gmail, reviews the 3 drafts, hits send (or edits first). This is outside the
session; the next run's stage 1 detects the sends and creates the crm rows.

- [ ] **Step 3: Verify cold-start completion**

Run: `tail -15 pipeline/loop-log.md`
Expected: entry headed `## <today> — live`.

Run: `head -20 content/threads.md`
Expected: a ratification-decisions note at the top of the file.

- [ ] **Step 4: Commit and push** (the skill's stage 6 does this; verify)

Run: `git log --oneline -1`
Expected: `loop: <today> run`

---

### Task 9: Mark the Phase 2 plan superseded

**Files:**
- Modify: `docs/superpowers/plans/2026-05-15-phase2-pickup.md` (top of file, after the title)

- [ ] **Step 1: Insert this note directly under the `# Phase 2 Pickup Plan` heading**

```markdown
> **2026-06-11 update:** The execution model below is superseded by the marketing loop
> system — run `/marketing-loop` daily. See
> `docs/superpowers/specs/2026-06-10-marketing-loops-design.md`. The milestone dates and the
> Phase 3 trigger (first booked call) remain in force.
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/plans/2026-05-15-phase2-pickup.md
git commit -m "docs: phase 2 plan superseded by marketing loop system"
git push origin master
```
