# Eapen Technology — Positioning & Value Ladder

**Status:** APPROVED · 2026-06-23 (operator signed off: tier names, prices, media/publishing
beachhead, keep T&S outbound running)
**Decision that triggered this:** T&S/moderation framing is too narrow — very few companies
require trust & safety consulting, so the buyer universe (and the whole cold-email + essay
campaign built on it) is too small. Decision: **broaden the offer to AI automation for small
businesses**, with T&S demoted from the headline to one vertical.

---

## 1. The repositioning

**Old headline:** "Trust & safety / moderation infrastructure for heterodox platforms."
Problem: the addressable market is a few dozen platforms, most of which already have (or think
they have) a T&S function. Hard to sell, long cycles, tiny list.

**New headline:** "I build the AI automation a small team can't build itself."

The transferable asset from 5 years at TMTG/Truth Social is **not** "moderation." It is the
underlying skill: *taking a small team and encoding human judgment into automated systems* —
classifiers, thresholds, policy-as-config, AI-driven workflows that replace headcount. Every
small business wants that. Almost none want "moderation infrastructure."

T&S becomes **one vertical proof point**, not the pitch: "I did this for a platform operating
under regulatory and press scrutiny — your accounts-payable workflow is not harder than that."

What carries over unchanged:
- The credibility story (5 years, named platform, real scrutiny).
- The "encoded policy is inspectable / a 5-person team beats a 500-person team" argument —
  it generalizes from moderation to *any* business process.
- The content engine (essays + autoposting). The essays need new framing over time, but the
  pillar-content machine itself is built.

---

## 2. The value ladder (DFY → DWY → DIY)

Three tiers, descending customization, ascending scalability. Lead with the **middle**, not
the top (the source-material tactic: never present DFY as the only door — it has the longest
cycle).

### Tier 1 — Done For You (DFY): "AI Automation Build-out"
- **What:** You audit the client's workflows, pick the highest-leverage one, and build the
  automation end to end. You own the output.
- **Anchor price:** **$25K** (keeps the existing assessment anchor). Range $15K–$40K by scope.
- **Pros:** Highest margin, deepest trust, best case studies.
- **Cons:** Long cycle, doesn't scale, drains your time. So: **do not lead with it.**
- **T&S still lives here** as a premium vertical for the rare platform that needs it.

### Tier 2 — Done With You (DWY): "Build-With-AI Training" ← LEAD WITH THIS
- **What:** Teach the client's team (or a cohort of peers) to build the automations
  themselves using your frameworks. A 1–2 day workshop + framework templates.
- **Price:** **$2,500 / seat** (source-material tactic: 50 seats × $2.5K = $125K for two days
  of delivery vs. one $25K custom build). Realistic early target: 5–15 seats per engagement.
- **Pros:** Repeatable, fast close, low time cost, gets you into a company's procurement
  system, and is the best DFY lead-gen there is — teams that train often hire you to build anyway.
- **Cons:** Requires productized frameworks (a one-time build; see §4).
- **Peer variant:** if a target client has no internal team to train, sell the same training
  to *other consultants/operators* who want to add AI automation to their own offering.

### Tier 3 — Do It Yourself (DIY): "The Automation Playbook"
- **What:** Record the DWY training once; package as a self-serve course + template library.
- **Price:** **$500–$1,000** one-time (or low monthly for the template library + updates).
- **Pros:** Zero delivery time. Pure downsell — captures revenue from prospects who reject
  the $25K build *and* the $2.5K/seat training on budget, without touching your capacity.
- **Cons:** Only worth building after the DWY content exists (don't pre-build it).

**The downsell flow:** prospect says no to DFY → offer DWY → no to DWY → offer DIY. You never
leave the conversation empty-handed, and the cheap tiers feed the expensive one.

---

## 3. What this changes in the existing machine

| Asset | Change needed |
|---|---|
| `index.html` (landing) | Rewrite headline + add a 3-tier section. T&S → one proof point, not the pitch. (Separate task, after sign-off.) |
| Cold-email hooks (`pipeline/emails/`) | Current hooks are platform/T&S-specific. Broadened offer = broader buyer list (SMBs, not just platforms). The T&S-niche emails still work *for platforms* — keep them as one segment; add an SMB/AI-automation segment to `cold-outbound.md`. |
| Newsmax email | Already broadened to "AI automation intro call" — this is the template for the new framing. |
| Essays / `content/threads.md` | Existing 3 essays are T&S-specific. Keep them (they prove depth) but future standalone posts should pull the *generalizable* lessons (encoded judgment, small-team leverage) toward the automation audience. |
| `crm.md` weighted-$ | Still needs a default deal size. With three tiers, set per-tier deal sizes: DFY $25K, DWY ~$20K (10 seats), DIY ~$750. |

---

## 4. Build order (if you approve)

1. **Sign off on tier names + prices** (this doc).
2. **Rewrite `index.html`** — new headline + tiers section + per-tier CTA.
3. **Productize the DWY frameworks** — the one-time content build that makes DWY and DIY real.
   (Biggest effort. Can start from the T&S policy-stack material you already have.)
4. **Add an SMB/AI-automation segment** to `cold-outbound.md` + new email templates built on
   the broadened hook (the Newsmax email is the prototype).
5. **Record DWY → package as DIY** once the training content exists.

---

## 5. Decisions (operator-approved 2026-06-23)

- **Tier names** — APPROVED as written: AI Automation Build-out / Build-With-AI Training /
  The Automation Playbook.
- **Prices** — APPROVED: DFY $25K anchor · DWY $2,500/seat · DIY $750 (within the $500–1K band).
  Set per-tier deal sizes in `crm.md` weighted-$ accordingly.
- **Market focus** — **MEDIA/PUBLISHING BEACHHEAD.** Anchor first where the platform background
  reads loudest — media, publishing, creator/newsletter platforms — then widen to general SMB.
  Conveniently, the entire existing outbound list (Beehiiv, Neynar, Muslim Pro, GiveSendGo,
  Pray.com, Salem, Hallow, Newsmax, Epoch Times, etc.) already *is* media/publishing — so the
  current pipeline is the beachhead, no list rebuild needed to start.
- **Existing T&S outbound** — **KEEP RUNNING.** These targets are media/publishing platforms,
  i.e. the beachhead. The T&S hook stays valid *for this segment*; the broadened
  AI-automation framing layers on top rather than replacing it here. The 8 drafts in the
  mailbox (5 FU-1 + 3 first-touch) all send (verify the 3 guessed addresses first).

## 6. Implication for the beachhead

Because the beachhead = media/publishing and the current list already is that, the broadened
positioning does **not** require pausing or rewriting the live campaign. Sequence:
1. Keep the existing media/publishing outbound running on the (still-valid-for-this-segment)
   platform hooks.
2. Rewrite `index.html` to lead with AI-automation + 3 tiers, T&S as proof point — so when a
   replied contact lands on the site, they see the broader, productized offer.
3. Build DWY frameworks from existing T&S policy-stack material.
4. Only when widening *past* the beachhead do new SMB email templates + a new `cold-outbound`
   segment become necessary.
