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
| 4 | Steve Smith | Newsmax | email | pipeline/emails/08-newsmax-steve-smith.md | sent (2026-06-12) | delivered to steves@newsmax.com (thread 19ebce0abe855804); 60.6% addr guess, non-Google domain — watch for delayed bounce next run (ladder: ssmith@, steve.smith@); crm row created |
| 5 | Erich Kerekes | Hallow | email | pipeline/emails/05-hallow-erich-kerekes.md | sent (2026-06-12) | delivered to erich@hallow.app (thread 19ebc5e3e8ff4023), no bounce; crm row created |
| 6 | Tyler Denk | Beehiiv | email | pipeline/emails/04-beehiiv-tyler-denk.md | awaiting-send (2026-06-23) | Gmail draft r-2810200677700863471; addr: tyler@beehiiv.com (GUESS, ladder tyler.denk@); subject fixed to "Re: Summer Release", "last week's"→"recent" Reply Rules; hook live (Summer Release Jul 16 — send before then) |
| 7 | Rishav Mukherji | Neynar | email | pipeline/emails/06-neynar-rishav-mukherji.md | awaiting-send (2026-06-23) | Gmail draft r855293272742933662; addr: rish@neynar.com (GUESS, ladder rishav@); hook live (5-months-in, Neynar runs Farcaster, AI-agent spam, Clanker fees) |
| 8 | Nafees Khundker | Muslim Pro | email | pipeline/emails/07-muslim-pro-nafees-khundker.md | awaiting-send (2026-06-23) | Gmail draft r-5330159793012188189; addr: nafees@bitsmedia.com (GUESS, ladder nafees.khundker@); "launch last month"→"in May"; hook live (Amanah Pro May 6) |
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
