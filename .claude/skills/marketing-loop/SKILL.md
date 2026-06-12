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
  writes proceed normally except where a stage's dry-run clause narrows them. Log the entry
  as `dry-run`.
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
| `content/threads.md` | Thread drafts: 3 essays x (Truth Social, X, LinkedIn), plus `### Standalone posts` from week 4 on. |

## Hard rules (check before every external action)

- Voice: no em-dash rhetorical pivots; no "It's not X, it's Y"; no "we" (operator is solo);
  no triplet adjectives; no stock openers; specific numbers and named platforms.
- Disclosure: TMTG and Truth Social may be named. NEVER name Janus, Boosted Truths, Spark,
  or describe internal TMTG architecture.
- Caps: 3 NEW first-touch drafts per calendar day across all runs and 15 first-touch
  sends/week (queue.md Config; when running twice in a day, count drafts already created
  today via loop-log); 10 follow-up sends, or drafts when the gate is closed, per run
  (followup-templates.md).
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
3. The connected mailbox is the operator's own `justus@eapentechnology.com` (confirmed
   2026-06-12: first-touches sent with native From; no send-as setup involved). If the
   authenticated account ever appears to be a different address, STOP and ask the operator
   before creating any drafts.

## Stage 1 — Inbox scan

Skip in degraded mode.

1. Build the watchlist: every `addr:` recorded in crm.md row Notes plus every queue item
   whose status begins with `awaiting-send`, plus every `sent` queue item. A crm row without
   an `addr:` note (e.g., warm or inbound) cannot be inbox-watched; surface it once in the
   summary so the operator knows.
2. Search Gmail for messages from each address (and its domain) since the date of the newest
   `live` entry in loop-log. Dry-run and degraded entries record nothing and must NOT advance
   this watermark. No live entries yet: scan the last 14 days. Re-scanning overlap is
   harmless; classification is idempotent.
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
   Gmail drafts, ask no DM-confirmation questions. If Gmail is also unavailable, skip the
   scan and say so.

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
2. Goal: create up to `daily-first-touch-cap` NEW drafts today (drafts created by earlier
   runs today, per loop-log, count against the cap; items left at `awaiting-send` from prior
   days do not, but surface them as overdue).
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
     the file header, the body verbatim). ALWAYS pass an HTML body with the signature as an
     explicit anchor (`<a href="https://eapentechnology.com">eapentechnology.com</a>`) —
     plain-text drafts get auto-linkified by Gmail, which pastes its google.com/url redirect
     wrapper in as the visible signature text (applies to reply drafts in Stage 1 too).
     To: if the header lists one address, use it; if it
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
2. Schedule: Essay 1 in week 1, Essay 2 in week 2, Essay 3 in week 3. X and LinkedIn post
   AUTOMATICALLY via the `content-autopost` GitHub Actions workflow (daily 10:10am ET) from
   `content/queue/*.json`; Truth Social remains manual. Setup/maintenance doc:
   `docs/content-autopost-setup.md`.
3. Each run, read `content/queue/*.json`:
   - status `posted` with no matching crm row → add the crm row (channel `content`, status
     `published`, post URLs from the file).
   - status `partial`, or a unit whose scheduled date passed while still `approved` (secrets
     missing / workflow failing) → alert the operator in the summary; never re-run a
     `partial` X thread automatically (duplicate tweets).
4. On or after each essay's scheduled date, if the crm row's Notes lack a Truth Social URL:
   present that essay's Truth Social thread from `content/threads.md` ready-to-paste; record
   the TS URL in the crm row when the operator confirms. If they defer, note it and move on.
5. Week 4+: if no content row in the last 7 days, draft one short technical post (Truth
   Social + X versions, 150-300 words) adapted from an essay section not yet used standalone,
   closing with the 2-clients CTA. Write it into `content/threads.md` under a
   `### Standalone posts` section. After the operator approves: create the
   `content/queue/YYYY-MM-DD-standalone-N-x.json` entry (status `approved` ONLY on explicit
   operator approval — the agent never sets it unilaterally) and present the TS version for
   pasting.
6. Dry-run mode: report queue/posted state; create no queue entries, present nothing.

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
