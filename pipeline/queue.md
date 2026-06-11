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
