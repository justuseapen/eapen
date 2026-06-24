# Marketing Loop — Status

_Last updated: 2026-06-24. Picks up from the 2026-06-23 `/marketing-loop` run + the strategy pivot._

## TL;DR

Two things happened recently: (1) the daily loop ran and queued 8 email drafts, and
(2) the offer got repositioned. **T&S was too narrow to sell**, so Eapen Technology is now
positioned as **AI automation for small businesses**, with a three-tier value ladder. The new
site is **live on eapentechnology.com**. T&S is now one proof point, not the pitch. Next big
build (not started): productize the training frameworks so the two cheaper tiers are actually
deliverable.

## ✅ Done in the pivot (2026-06-23 → 24)

- **Strategy approved** — `docs/strategy/2026-06-23-value-ladder-positioning.md`. Operator
  signed off on: broaden to AI automation, media/publishing beachhead, keep T&S outbound
  running (those targets ARE the beachhead), tier names + prices.
- **Site rewritten + LIVE** — `index.html` pushed to master (auto-deployed via Coolify).
  Leads with "I build the AI automation a small team can't build itself." Three tiers,
  lead-with-the-middle order:
  1. **Build-With-AI Training** — $2,500/seat (the lead offer; "where most clients start")
  2. **AI Automation Build-out** — from $25K (T&S/moderation folded in as an included build)
  3. **The Automation Playbook** — $750 self-serve

## ⏭️ Next big build (NOT started — the real unlock)

**Productize the DWY "Build-With-AI Training" frameworks** (strategy doc step #3). The site now
*sells* Training ($2.5K/seat) and Playbook ($750), but neither is deliverable until the
curriculum + template library exists. Build it from the existing T&S policy-stack material.
Recording the training later becomes the Playbook. This gates real revenue on the two cheap tiers.

Also pending from the strategy doc:
- Set **per-tier deal sizes** in `crm.md` ($25K / ~$20K-for-10-seats / $750) → unblocks weighted-$.
- New **SMB email templates** only when widening *past* the media/publishing beachhead.

## ⚠️ ACTION REQUIRED — from the 2026-06-23 loop

1. 🔴 **Content autopost is BROKEN.** `autopost.yml` has failed every day since 2026-06-16
   (the "Post due content" step exits 1 — almost certainly missing/invalid X API secrets, the
   6 secrets in `docs/content-autopost-setup.md` that were never set). **Essay 1 (sched Jun 15)
   and Essay 2 (sched Jun 22) X+LinkedIn never posted.** Both still `approved`, `tweet_ids`
   empty → safe to re-run once secrets are fixed (no duplicate risk). Fix secrets → re-run.
2. **Send the 8 Gmail drafts** (justus@ mailbox). This connector has NO send tool, so the loop
   can only draft — you send manually:
   - 5 FU-1 follow-ups (in-thread): GiveSendGo, Pray.com, Salem, Hallow, Newsmax.
   - 3 new first-touch — **verify the guessed addresses first:** Beehiiv `tyler@beehiiv.com`
     (try `tyler.denk@`), Neynar `rish@neynar.com` (try `rishav@`), Muslim Pro
     `nafees@bitsmedia.com` (try `nafees.khundker@`).
3. **Paste Truth Social threads** — Essay 1 and Essay 2 (manual; in `content/threads.md`).
4. **5 warm intro names** — still 0/30, highest-leverage thing not started.

## Pipeline snapshot

- 5 contacts at `contacted` (all 2026-06-12 first-touch). 0 replies, 0 new bounces as of 2026-06-23.
- FU-1 for all 5 drafted 2026-06-23 (awaiting your send — crm last-contact NOT advanced until sent).
- Weighted $: still TBD (deal size unset). Day-60 (2026-07-13): 5/100 sends, 0 calls.

## Voice rules (unchanged — in memory + email-file notes)

Justus's real sent-mail voice, not copywriter voice: "Just wanted to reach out and
congratulate you...", "figured", "a ton", "God bless!" to fellow believers. No punditry, no
clipped fragments, no press-cycle predictions. Published-essay rules (no em-dash, no "we", no
triplets) do NOT apply to correspondence. The new positioning makes the broad framing primary:
**AI automation across domains**; T&S is a proof point and a vertical, not the lead.

## Backlog

20 researched companies in `queue.md` awaiting drafts (queue positions 9–10 still queued:
Real America's Voice DM, Epoch Times). All are media/publishing = the beachhead. Rumble is the
strongest unworked fit.
