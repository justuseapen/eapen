# Marketing Loops — Design Spec

**Date:** 2026-06-10
**Status:** Approved by operator (Justus Eapen)
**Scope:** A daily-driver marketing loop system that converts the stalled Phase 2 pipeline into a self-sustaining cadence with the operator gating only irreversible actions.

## Problem

The Phase 2 pipeline froze on 2026-05-15. Ten cold emails, nine thread drafts, and a 30-company buyer universe sit drafted but unsent because the three operator-review gates never cleared. The Day-30 milestone (2026-06-13) will be missed: 0 sends against a target of 30+. Several personalization hooks have decayed during the stall (Salem's post-acquisition window, GiveSendGo's press cycle, Newsmax's earnings timing).

The bottleneck is not drafting capacity. It is that nothing forces a regular operator touchpoint, and review was framed as one large chore instead of a small daily one.

## Decisions, locked

These were made by the operator during brainstorming and are inputs to this spec:

- **Operator role:** Hybrid by risk level. Automation handles research, CRM, drafting, and follow-up sends; the operator personally executes every first-touch send, every public post, and every reply to a human.
- **Loop scope (v1):** all four — cold outbound, content distribution, CRM + weekly status, warm intros.
- **Email plumbing:** Gmail connected. First-touch emails land as ready-to-send Gmail drafts. Seven-day follow-ups to non-repliers send autonomously from pre-approved templates. The agent reads the inbox and Sent folder to detect replies and confirmed sends.
- **Architecture:** Daily-driver skill + accountability nag. One `/marketing-loop` command run interactively (~10 min/day) does all the work while the operator is present (the Gmail connector is interactively authenticated and unreliable headless). A scheduled cloud routine nags only when the day's run is missing.

## Out of scope for v1

- Autonomous posting to Truth Social, X, or LinkedIn. No API access; post text is prepared ready-to-paste.
- Auto-replying to humans. Replies always get a drafted response for operator review.
- Phase 3 conversion templates (call prep, proposals, retainers). Still deferred until the first call books, per the Phase 2 plan.
- New essays. The content loop distributes and adapts existing material; new long-form is operator-initiated.
- Any change to site, positioning, or pricing.

## Architecture

One project skill at `.claude/skills/marketing-loop/SKILL.md`, invoked daily as `/marketing-loop`. Six stages run in order; all state lives in repo files; `crm.md` remains the single source of truth for contact status. Each run ends with a commit and push of the run log, which a scheduled cloud routine reads from GitHub to decide whether to nag.

```
.claude/skills/marketing-loop/SKILL.md   # the daily-driver skill (stages, rules, caps)
pipeline/queue.md                        # ordered send queue, daily cap, route (email/DM)
pipeline/followup-templates.md           # operator-approved follow-up copy (approved once)
pipeline/loop-log.md                     # append-only run log (read by the cloud nag)
crm.md                                   # existing — single source of truth, format unchanged
```

### The six stages

1. **Inbox scan.** Search Gmail for mail from anyone in `crm.md` since the last run. A reply moves the contact to `replied` (15% weighting) and produces a drafted response for operator review — never auto-sent. The Sent folder is scanned too: when the operator sends a queued draft, the next run detects it and moves the contact to `contacted` ($1,250 weighted) with no manual reporting.
2. **Follow-up sends.** Contacts at `contacted`, no reply, last touch ≥ 7 days, fewer than 2 follow-ups: auto-send from the pre-approved template, lightly personalized. After follow-up #2 with no reply, status → `nurture`; never auto-touched again. A "not interested" reply → `closed-lost`, permanent suppression.
3. **First-touch drafts.** Pull today's 2-3 contacts from `pipeline/queue.md` in priority order. Freshness-check each hook by web search; rewrite stale hook lines. Create Gmail drafts. Contacts with guessed email addresses are routed as LinkedIn DM text to paste instead. When researched-but-unqueued companies drop below 10, research 5 new companies into the buyer universe (resuming rows 31-50), at most once per week.
4. **Content queue.** Follow the schedule, anchored to the first live run: Essay 1 threads in week 1, Essay 2 in week 2, Essay 3 in week 3 — all three platforms the same day per essay. After the essays, sustain 1-2 short technical posts per week drafted from existing essay material and positioning, each closing with the 2-clients CTA. Post text is presented ready-to-paste; on operator confirmation the loop records post URLs in `crm.md`.
5. **Warm intros.** Until 30 names exist, ask the operator for 5 names in-session. Every new name gets a personalized ask drafted the same session from the templates in `pipeline/warm-intros.md`, calibrated by relationship strength. Tracker rows move `drafted → sent → replied / intro-made / no-response`, with a 7-day nudge draft on silence.
6. **Friday rollup.** On Fridays (or the first run after), compute the weekly status block in `crm.md`: sends, replies, calls booked/completed, proposals, weighted pipeline $, plus distance to the Day-60 marker (100+ sends, 10-15 calls by 2026-07-13). End every run by appending to `pipeline/loop-log.md`, committing, and pushing.

The session ends with a summary: what was sent automatically, what is waiting in Gmail drafts, what replies need answering, what posts are ready to paste.

## Risk boundary

**Autonomous:** web research, hook freshness rewrites, CRM writes, Gmail draft creation, follow-up sends (template-based, max 2 per contact), inbox/Sent scanning, run logging, git commits and pushes.

**Operator-gated:** every first-touch send (operator hits send on the Gmail draft), every public post (operator pastes), every reply to a human, any new essay, any change to positioning or pricing.

## Guardrails

- Voice rules from the repositioning spec enforced on every draft: no em-dash rhetorical pivots, no "It's not X, it's Y," no "we," no triplet adjectives, no stock openers; specific numbers and named platforms.
- TMTG disclosure boundary on every draft: TMTG and Truth Social nameable; Janus, Boosted Truths, Spark, and internal architecture never.
- Caps: 3 first-touch per day, 15 per week, so the inbox stays watchable for replies.
- No contact at `replied` or later is ever touched by automation.
- Follow-up copy is operator-approved once (at build time) before any auto-send is permitted.

## Cold start — first run clears the stale gates

The first `/marketing-loop` session absorbs the three pending Phase 2 gates instead of treating them as a separate chore:

1. **Emails (Gate 1).** All 10 drafted emails get hook-freshness re-research. Known decay: Salem's 30-day acquisition window has likely closed; GiveSendGo's Karmelo Anthony cycle has decayed; Pray.com's July 4 hook is still live. Refreshed drafts re-queue; dead hooks are rewritten and flagged for the operator's eye. The first session presents the urgent three as Gmail drafts.
2. **Threads (Gate 2).** The four unratified calibration calls are asked as four yes/no questions in the first session: "AWS is run by woke leftists" (Essay 2, TS+X), Telegram intelligence-community speculation (Essay 2, TS+X), "I was at January 6" (Essay 2, TS+X), "I am writing this as a Christian" (Essay 3, TS+X). Decisions applied, Essay 1 threads queued.
3. **Warm names (Gate 3).** The warm-intro stage asks for 5 names, not 30.

## The nag routine

One scheduled cloud agent (created via `/schedule`), daily at 5pm ET. It fetches `pipeline/loop-log.md` from GitHub master. If a run entry exists for today, it does nothing. If not, it composes a notification with state, not sentiment, by reading the queue and CRM from the repo: e.g. "Pipeline idle today. 2 drafts unsent in Gmail, 3 follow-ups due tomorrow, 33 days to Day-60 (0/100 sends)."

## Edge handling

- **Gmail connector unavailable:** detected at stage 1; the skill prompts `/mcp` re-auth. If declined, the run degrades to repo-file drafts and the log marks the run degraded so the nag stays accurate.
- **Hook unverifiable:** that contact is skipped and flagged; the next queue item moves up. Nothing sends on a stale or unverifiable claim.
- **Skipped days:** follow-up due-ness is computed from CRM dates, not run counts, so backlogs process correctly. Before any auto-send, the Sent folder is checked for a prior identical follow-up — idempotent by construction.
- **Ambiguous replies** (out-of-office, wrong person, forwarded): status unchanged; surfaced to the operator with a suggested classification.

## Testing

`/marketing-loop dry-run` executes all six stages with all writes confined to repo files: no Gmail drafts, no sends, no external effects. Verification sequence: dry run first; then the first live session gates each external action individually before the standing rules take over.

## Build order

1. Skill + state files (`queue.md`, `followup-templates.md`, `loop-log.md`).
2. Dry-run verification.
3. Follow-up templates presented for one-time operator approval.
4. `/schedule` the nag routine.
5. First live run — doubles as clearing the three Phase 2 gates.

## Success criteria

- Operator's daily cost is ~10 minutes; nothing external moves without the gates defined above.
- 3 urgent emails (hooks refreshed) sent within 3 days of the first live run.
- Essay 1 threads posted within the first week; Essays 2 and 3 on the weekly cadence after.
- Follow-ups go out on day 7 without operator involvement; zero double-sends.
- `crm.md` reflects reality without manual bookkeeping; Friday rollups appear every week.
- Day-60 checkpoint (2026-07-13) measured honestly against 100+ sends and 10-15 calls; if replies aren't coming by then, the wedge post-mortem from the repositioning spec triggers rather than papering over.
