# Phase 2 Pickup Plan

> **2026-06-11 update:** The execution model below is superseded by the marketing loop
> system — run `/marketing-loop` daily. See
> `docs/superpowers/specs/2026-06-10-marketing-loops-design.md`. The milestone dates and the
> Phase 3 trigger (first booked call) remain in force.

**Last touched:** 2026-05-15
**Branch:** master (Phase 1 already deployed live to eapentechnology.com)
**State:** Mid-Phase 2. Cold buyer universe + cold email drafts + thread drafts done. Operator review and posting are the next gates.

## State summary — what shipped, what's queued, what's blocked

### Shipped to production (live on eapentechnology.com)
- Repositioned site under T&S/moderation wedge with $25K / $60K+ / $15K-mo offer ladder
- TMTG and Truth Social named on About
- Three essays: `moderation-without-the-lean.html`, `platform-risk-is-political-risk.html`, `why-the-bay-cant-help.html`
- Restrained visual reset (no orbs/particles/mesh/parallax)
- Dockerfile copies essays/ directory; .dockerignore excludes drafts

### Drafted, awaiting operator review (NOT sent / NOT posted)
- **10 cold emails** in `pipeline/emails/01-10-*.md`. Three urgent (GiveSendGo, Pray.com, Salem Media). Seven follow-up (Beehiiv, Hallow, Neynar, Muslim Pro, Newsmax, Real America's Voice, Epoch Times).
- **9 thread drafts** in `content/threads.md`. Three essays × three platforms (Truth Social, X, LinkedIn).
- **Cold buyer universe**: 30 companies committed in `pipeline/cold-outbound.md` across 3 batches. Paused at 30 per operator call (not 50).

### Scaffolding ready, awaiting operator input
- **Warm intros**: `pipeline/warm-intros.md` has eight graph segments with trigger questions, three ask templates calibrated by relationship strength, and an empty tracker. Operator owes 30 names. Zero entered.
- **CRM tracker**: `crm.md` has weighted-$ formula and rolling weekly status template. Zero entries.

### Deferred (intentionally)
- Phase 2 buyer rows 31-50. Diminishing returns; 30 is workable.
- Phase 3 conversion templates (call prep, follow-up, proposals). Per plan, defer until first call booked.

---

## The three gates that block all forward motion

Forward motion in Phase 2 stops on operator review of three artifacts. Until those happen, nothing external should be sent.

### Gate 1: Read and approve the 10 cold emails
**Files:** `pipeline/emails/01-givesendgo-jacob-wells.md` through `pipeline/emails/10-epoch-times-samuel-zhou.md`.

**Per email, decide:**
- Does the prose read as Justus, or as a competent but generic consultant?
- Are the facts in the personalization hook actually correct?
- Email pattern guess (`jacob@givesendgo.com`, etc.) — leave, override, or skip to LinkedIn DM only?
- The Calendly link is intentionally omitted from all 10. Reverse on any specific one?

**Flagged items inside specific emails:**
- **01 GiveSendGo**: Names "Heather" (Wilson, co-founder). Verify the framing reads natural from inside.
- **02 Pray.com**: Cites "prayer-circle and congregation features." Confirm those are real product names.
- **04 Beehiiv**: Uses Substack's "Standards and Enforcement" rebrand as a cautionary tale. Confirm the framing is fair.
- **05 Hallow**: Praises their handling of the Brand cutoff ("You did. Most platforms in faith-tech have not had to make a public call like that yet"). Verify this lands as recognition, not sycophancy.
- **06 Neynar**: Uses term-of-art "policy capture." Defensible at a Web3 founder; alternative phrasing in the file's notes section.
- **08 Newsmax**: Says "Q1 print this morning." Q1 2026 earnings were today (May 14). If timing's wrong on send, swap to "Q1 print this week."
- **10 Epoch Times**: Names "Falun Gong-affiliated" once, factually, no commentary. Deliberate choice — softening reads cowardly.

### Gate 2: Read and approve the 9 thread drafts
**File:** `content/threads.md`.

**Calibration calls the agents made — ratify or override:**
- **"AWS is run by woke leftists"** verbatim on Truth Social + X; softened to "AWS made a political calculation" on LinkedIn. (Essay 2)
- **Telegram intelligence-community speculation** verbatim on Truth Social + X; softened to "A platform useful to enough state actors gets treated differently" on LinkedIn. (Essay 2)
- **"I was at January 6"** at Truth Social post 3 and X tweet 3. Not in LinkedIn. (Essay 2)
- **"I am writing this as a Christian"** at Truth Social post 4 and X tweet 4. Not in LinkedIn. (Essay 3)

**Self-flagged line edits worth Justus's eye:**
- Essay 1 Truth Social post 5: cut "So" at the opening
- Essay 1 LinkedIn: decide on "First / Second / Third" structure vs. flowing prose
- Essay 3 Truth Social post 5: "obvious" used twice in close proximity
- Essay 2 X tweet 12: em-dash separating URL from closing line — swap to period + line break for strict zero-em-dash compliance
- Essay 3 X tweet 3: mild triplet rhythm

### Gate 3: Operator dumps warm-intro names
**File:** `pipeline/warm-intros.md`.

Eight graph segments with trigger prompts already laid out. Operator's job: list names under each segment. Format per row: `name | role/world | relationship`. No prose; no prioritization; just dump. Once names are in, agent drafts personalized asks per name using one of three templates (already in file) in under 30 seconds per name.

Highest-leverage segments to start with: **E (conservative tech network)** and **F (Reformed/theological)**.

---

## After the gates clear — execution sequence

In strict order. Each step waits on the prior.

### Step 1: Send the three urgent cold emails (this week)
**Files:** `pipeline/emails/01-03-*.md`.

GiveSendGo / Pray.com / Salem Media. The hooks are news-cycle-sensitive. Each one decays daily. Order: GiveSendGo first (most time-sensitive, Karmelo Anthony press cycle is active), then Pray.com (White House campaign peaks July 4), then Salem (post-acquisition transition window is ~30 days).

After sending each, update `/crm.md`:
- One row per recipient
- Status = `contacted`
- Channel = `cold-email`
- Weighted $ = $25K × 5% (= $1,250) for contacted stage
- Last contact = send date
- Next action = `follow-up in 7d if no reply`

### Step 2: Send the next 7 cold emails (this week or next)
**Files:** `pipeline/emails/04-10-*.md`.

Beehiiv, Hallow, Neynar, Muslim Pro, Newsmax, Real America's Voice, Epoch Times. Less time-sensitive than the urgent three but still want to ship while research is fresh. Recommended cadence: 2-3 per day, not all in one batch — keeps the inbox watchable for replies.

Same CRM update pattern per send.

### Step 3: Post Essay 1's threads (Week 1)
**File:** `content/threads.md`, Essay 1 section.

Post all three (Truth Social, X, LinkedIn) on the same day. Tuesday morning ET is conventional for technical content on X and LinkedIn; Truth Social is less time-sensitive.

After posting, update `/crm.md`:
- One row marked "Essay 1 distribution"
- Channel = `content`
- Status = `published`
- Notes: post URLs across all three platforms

### Step 4: Draft warm-intro asks for first 5-10 names (when names exist)
Once operator has dumped names into `pipeline/warm-intros.md`, agent generates personalized asks per name. Each row in tracker moves from `drafted` → `sent` (when operator sends) → `replied / intro-made / no-response`.

Day-30 milestone: first 10 warm asks sent.

### Step 5: Post Essay 2's threads (Week 2)
Same as Step 3. Different essay's section.

### Step 6: Build out CRM weekly status (every Friday)
The `crm.md` file has a rolling weekly status template at the bottom. Every Friday, count up:
- Sends out (cold + warm)
- Replies in
- Calls booked
- Calls completed
- Proposals out
- Weighted pipeline $

This is the dashboard for the next operator review checkpoint.

### Step 7: Post Essay 3's threads (Week 3)
Sharpest of the three; lands last so Essays 1 and 2 have pre-qualified the audience.

### Step 8: First booked call → Phase 3 activates
The plan defers Phase 3 templates (call prep, follow-up, proposals, retainer continuation) until the first discovery call books. When a call appears in the CRM at status `call booked`:
- Agent generates pre-call brief from the company's row in `pipeline/cold-outbound.md` plus public research
- Agent drafts 24-hour follow-up template
- Agent drafts pilot proposal template ($15-25K / 4-6wk / fixed scope)
- Agent drafts retainer continuation template ($15K/mo, 30hrs senior leadership)

---

## Milestone checkpoints (from original brief)

- **Day 30** (2026-06-13): 50-company buyer list complete, 30 warm-intro names with drafts, first 10 warm asks sent, 30+ cold emails sent, first essay distributed across all three platforms. **Tracking against this:** 30 of 50 companies done; 0 of 30 warm names; 10 cold emails drafted (3 ready to send); 9 thread drafts ready.
- **Day 60** (2026-07-13): 100+ cold emails sent, 10-15 discovery calls completed, 3-5 pilot proposals issued. **Gating step toward this:** the 10 drafted emails need to actually go out; conversion math needs replies coming in.
- **Day 90** (2026-08-13): First retainer signed ($15K/mo). 2-3 pilots in progress. Weighted pipeline ≥ $50K MRR.
- **Day 150** (2026-10-13): Second retainer signed.

---

## Where each file lives

```
/index.html                                  # live site
/essays/*.html                               # live essays (3)
/essays/_drafts/*.md                         # essay source markdown (3)
/site/{hero,services,about,writing}.md       # site copy working files
/pipeline/cold-outbound.md                   # 30-company buyer universe
/pipeline/warm-intros.md                     # graph segments + ask templates + empty tracker
/pipeline/emails/01-10-*.md                  # 10 cold email drafts
/content/threads.md                          # 9 thread drafts (3 essays × 3 platforms)
/crm.md                                      # pipeline tracker
/proposals/                                  # empty until Phase 3
/docs/superpowers/specs/2026-05-12-eapen-repositioning-design.md
/docs/superpowers/plans/2026-05-12-eapen-repositioning.md
/docs/superpowers/plans/2026-05-15-phase2-pickup.md   # this file
```

---

## Open task list when you return

In ID order:

| ID | Status | Subject |
|---|---|---|
| #3 | completed | Buyer universe (30 of original 50; paused per operator call) |
| #4 | in_progress | Warm intros — 30 names + personalized asks (scaffold done, names owed) |
| #5 | pending | /crm.md tracker + weekly status cadence (file exists, no entries) |
| #6 | in_progress | Cold outbound + content distribution (10 emails + 9 threads drafted; nothing sent yet) |
| #7 | pending | Phase 3 conversion playbook (deferred until first call books) |
| #20 | in_progress | Urgent cold emails: GiveSendGo, Pray.com, Salem (drafted; not sent) |
| #21 | completed | Next 5-7 cold emails (Beehiiv, Hallow, Neynar, Muslim Pro, Newsmax, RAV, Epoch Times) |
| #22 | completed | Essay 2 thread drafts |
| #23 | completed | Essay 3 thread drafts |

**Reactivation order when resuming:**
1. Operator reads the 10 cold emails and 9 threads. Marks edits.
2. Operator sends edits OR approves as-is.
3. Operator dumps first batch of warm names.
4. Agent drafts warm asks.
5. Operator sends the 3 urgent cold emails.
6. Operator posts Essay 1 threads.
7. Loop continues per execution sequence above.

## One-line resume prompt for next session

> Pick up Phase 2 of the Eapen Technology pipeline. See `docs/superpowers/plans/2026-05-15-phase2-pickup.md` for state. Three operator-review gates are pending: 10 cold emails in `pipeline/emails/`, 9 thread drafts in `content/threads.md`, and warm-intro names owed in `pipeline/warm-intros.md`.
