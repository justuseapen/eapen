# Content Autopost — One-Time Setup

The `content-autopost` GitHub Actions workflow posts operator-approved content from
`content/queue/*.json` to X and LinkedIn daily at 10:10am ET. Truth Social stays
manual (the marketing loop presents ready-to-paste threads on essay days).

First scheduled post: **Essay 1 on Monday 2026-06-15** (X thread + LinkedIn post).
Until the secrets below exist, the workflow fails loudly on due days and GitHub
emails you — nothing posts silently.

## 1. X (≈5 minutes)

1. Go to https://developer.x.com → sign in as the account that should post →
   create a Project + App (Free tier; its 500 writes/month covers ~12 threads).
2. App settings → User authentication settings → enable **Read and write**,
   type "Web App, Automated App or Bot" (callback URL can be `https://eapentechnology.com`).
3. Keys and tokens tab → generate **API Key & Secret** and **Access Token & Secret**
   (the access token must say "Read and Write" — regenerate it after step 2 if not).
4. Set the secrets:

```bash
gh secret set X_API_KEY --repo justuseapen/eapen
gh secret set X_API_SECRET --repo justuseapen/eapen
gh secret set X_ACCESS_TOKEN --repo justuseapen/eapen
gh secret set X_ACCESS_TOKEN_SECRET --repo justuseapen/eapen
```

## 2. LinkedIn (≈10 minutes)

1. https://developer.linkedin.com → Create app (associate it with your Eapen
   Technology company page) → Products tab → request **"Share on LinkedIn"** and
   **"Sign In with LinkedIn using OpenID Connect"** (both self-serve).
2. Auth tab → note Client ID/Secret → use the OAuth 2.0 token generator
   (Developer Portal → app → Auth → "OAuth 2.0 tools") to mint a **member access
   token** with scopes `w_member_social openid profile`.
3. Get your person URN:

```bash
curl -s https://api.linkedin.com/v2/userinfo -H "Authorization: Bearer <TOKEN>" | jq -r .sub
# URN is urn:li:person:<that value>
```

4. Set the secrets:

```bash
gh secret set LINKEDIN_ACCESS_TOKEN --repo justuseapen/eapen
gh secret set LINKEDIN_PERSON_URN --repo justuseapen/eapen   # urn:li:person:XXXX
```

**Maintenance:** LinkedIn member tokens expire after ~60 days. When the workflow
starts failing with a 401 on LinkedIn, mint a new token (step 2) and re-set the
secret. X tokens do not expire.

## 3. Verify

Run the workflow by hand once (it will report "nothing due" before Jun 15):

```bash
gh workflow run content-autopost --repo justuseapen/eapen
gh run watch --repo justuseapen/eapen
```

## How it works

- One JSON file per post unit in `content/queue/` — `status: approved` plus a
  `scheduled` date is the contract. The workflow only ever posts approved units.
- X threads post as sequential replies; a mid-thread failure marks the unit
  `partial` with the surviving tweet IDs — repair by hand, never re-run a partial
  (followers would get duplicate tweets).
- Results (post URLs, timestamps) are committed back to the queue file by the
  workflow. The daily `/marketing-loop` run syncs those into crm.md and presents
  the Truth Social version for manual posting the same day.
- New content enters the queue ONLY after operator approval — the agent never
  sets `status: approved` unilaterally.
- Note: the workflow's record-keeping commit to master triggers the Coolify
  site deploy webhook like any push; that is harmless (static site).
