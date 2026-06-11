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
