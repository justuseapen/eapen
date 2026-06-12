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
| 1 | Jacob Wells | GiveSendGo | email | pipeline/emails/01-givesendgo-jacob-wells.md | sent (2026-06-12) | delivered, no bounce (thread 19ebbfa91f8c4ff6); crm row created |
| 2 | Steve Gatena | Pray.com | email | pipeline/emails/02-pray-com-steve-gatena.md | sent (2026-06-12) | delivered, no bounce (thread 19ebbfaa170c0717); crm row created |
| 3 | David Santrella | Salem Media | email | pipeline/emails/03-salem-media-david-santrella.md | sent (2026-06-12) | delivered to david.santrella@salemmedia.com on retry (thread 19ebc120c1a6f42b), no bounce; first attempt to david@ bounced same-second; crm row created |
| 4 | Steve Smith | Newsmax | email | pipeline/emails/08-newsmax-steve-smith.md | queued | Hook refreshed 2026-06-11 (Jun 2 international expansion); subject now "Re: international expansion" |
| 5 | Erich Kerekes | Hallow | email | pipeline/emails/05-hallow-erich-kerekes.md | queued | Hook live; Brand pre-trial hearings Jun 16-17 make this week ideal; trial Oct 12 |
| 6 | Tyler Denk | Beehiiv | email | pipeline/emails/04-beehiiv-tyler-denk.md | queued | Hook refreshed 2026-06-11 (Jul 16 Summer Release + newer Substack beats); send before Jul 16 |
| 7 | Rishav Mukherji | Neynar | email | pipeline/emails/06-neynar-rishav-mukherji.md | queued | Hook refreshed 2026-06-11 (5-months-in framing, AI-agent spam); "policy capture" call still open per file notes |
| 8 | Nafees Khundker | Muslim Pro | email | pipeline/emails/07-muslim-pro-nafees-khundker.md | queued | Hook refreshed 2026-06-11 (May 6 Amanah Pro launch); subject now "Re: Amanah Pro" |
| 9 | Michael Norton | Real America's Voice | linkedin-dm | pipeline/emails/09-real-americas-voice-michael-norton.md | queued | Hook refreshed 2026-06-11 (Mar 25 Espanol OTA, 12M households); subject now "Re: RAV Espanol"; DM route, no verified email |
| 10 | Samuel Zhou | Epoch Times | email | pipeline/emails/10-epoch-times-samuel-zhou.md | queued | Hook refreshed 2026-06-11 (execution evidence: Wisdom live, Mar student program) |

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
