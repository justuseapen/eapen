# Marketing Loop — Run Log

Append-only. One entry per run, newest at the bottom. Entry header is `## YYYY-MM-DD — <mode>`
where mode is `live`, `dry-run`, or `degraded`. The scheduled nag routine reads this file from
GitHub master: if no entry exists for today (America/New_York), it notifies the operator.
If multiple runs occur on the same day, all entries remain; any entry dated today silences the nag.

The first `live` entry's date is the **content anchor** — the essay posting schedule counts
weeks from it.

<!-- entries below -->

## 2026-06-11 — dry-run
- inbox: skipped (Gmail MCP not authenticated; dry-run wins over degraded)
- followups: gate closed (Approved: no); 0 eligible anyway (crm empty)
- first-touch: 0 drafted (dry-run writes no Gmail drafts); freshness pass done on top 3: GiveSendGo hook rewritten (Jun 9 verdict + Jun 10 takedown/replacement, decays fast), Pray.com product terms fixed (congregations/prayer communities, hook live to Jul 4), Salem hook rewritten (SCA launch Jun 9, window framing dropped, deal closes ~Aug)
- content: no content anchor yet (no live run); cold start pending
- warm: 0/30 names; not asked (dry-run)
- rollup: written (Week of 2026-06-08, all zeros; placeholder counted as never-written)
- replenish: not due (20 needs-draft in backlog, threshold 10)
- action-needed: authenticate Gmail (/mcp), approve follow-up templates, then first live run (ratification questions + 5 warm names + first 3 Gmail drafts)

## 2026-06-11 — degraded
- inbox: skipped (degraded; Gmail not authenticated, operator proceeded anyway)
- followups: skipped (degraded); gate now open (templates operator-approved today)
- first-touch: 3 outbox drafts written (givesendgo, pray-com, salem) — status stays queued with outbox: notes; all three To addresses are pattern guesses, flagged; next live run converts outbox to Gmail drafts
- content: no content anchor (degraded runs never set it); Essay 1 presentation deferred to first live run
- warm: asked for 5 names; none provided this session; 0/30
- rollup: not due (written earlier today)
- replenish: not due
- action-needed: (1) /mcp to authenticate Gmail, then run /marketing-loop — it will convert the 3 outbox drafts to Gmail drafts, verify send-as justus@eapentechnology.com, set the content anchor, and present Essay 1 threads; OR copy-paste the 3 outbox files and send manually today (GiveSendGo hook decays fastest); (2) 5 warm names still owed
- note: cold-start Gates 1-2 cleared earlier today (all 10 hooks freshness-passed; 4 thread calibration lines ratified KEEP VERBATIM; see content/threads.md header)
