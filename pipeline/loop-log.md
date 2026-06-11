# Marketing Loop — Run Log

Append-only. One entry per run, newest at the bottom. Entry header is `## YYYY-MM-DD — <mode>`
where mode is `live`, `dry-run`, or `degraded`. The scheduled nag routine reads this file from
GitHub master: if no entry exists for today (America/New_York), it notifies the operator.
If multiple runs occur on the same day, all entries remain; any entry dated today silences the nag.

The first `live` entry's date is the **content anchor** — the essay posting schedule counts
weeks from it.

<!-- entries below -->
