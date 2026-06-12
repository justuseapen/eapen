#!/usr/bin/env python3
"""Post due, operator-approved content from content/queue/*.json to X and LinkedIn.

Run by .github/workflows/autopost.yml daily. Each queue file is one post unit
(an X thread or a LinkedIn post). Only files with status "approved" and a
scheduled date <= today (America/New_York) are touched. Results are written
back into the queue file; the workflow commits them.

Required env (only checked once a due post exists):
  X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET
  LINKEDIN_ACCESS_TOKEN, LINKEDIN_PERSON_URN  (e.g. urn:li:person:AbC123)

Statuses: approved -> posted | partial (X thread died mid-way; fix by hand,
never auto-retry a partial thread or followers get duplicate tweets).
"""

import json
import os
import sys
import time
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

QUEUE_DIR = Path(__file__).resolve().parent.parent / "content" / "queue"
X_MAX = 280
LINKEDIN_MAX = 3000
LINKEDIN_VERSION = "202506"


def today() -> str:
    return datetime.now(ZoneInfo("America/New_York")).strftime("%Y-%m-%d")


def now_iso() -> str:
    return datetime.now(ZoneInfo("America/New_York")).isoformat(timespec="seconds")


def due_units():
    units = []
    for path in sorted(QUEUE_DIR.glob("*.json")):
        data = json.loads(path.read_text())
        if data.get("status") == "approved" and data.get("scheduled", "9999") <= today():
            units.append((path, data))
    return units


def save(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")


def post_x_thread(path: Path, data: dict) -> None:
    from requests_oauthlib import OAuth1Session

    chunks = data["chunks"]
    bad = [(i + 1, len(c)) for i, c in enumerate(chunks) if len(c) > X_MAX]
    if bad:
        raise ValueError(f"chunks over {X_MAX} chars: {bad}")

    session = OAuth1Session(
        os.environ["X_API_KEY"],
        client_secret=os.environ["X_API_SECRET"],
        resource_owner_key=os.environ["X_ACCESS_TOKEN"],
        resource_owner_secret=os.environ["X_ACCESS_TOKEN_SECRET"],
    )
    prev_id = None
    for i, chunk in enumerate(chunks):
        payload = {"text": chunk}
        if prev_id:
            payload["reply"] = {"in_reply_to_tweet_id": prev_id}
        resp = session.post("https://api.x.com/2/tweets", json=payload)
        if resp.status_code not in (200, 201):
            # record what made it out so a human can repair the thread
            data["status"] = "partial"
            data["posted_at"] = now_iso()
            data["error"] = f"tweet {i + 1}/{len(chunks)} failed: {resp.status_code} {resp.text[:300]}"
            save(path, data)
            raise RuntimeError(data["error"])
        prev_id = resp.json()["data"]["id"]
        data["tweet_ids"].append(prev_id)
        time.sleep(2)

    data["status"] = "posted"
    data["posted_at"] = now_iso()
    data["post_urls"] = [f"https://x.com/i/web/status/{data['tweet_ids'][0]}"]
    save(path, data)


def post_linkedin(path: Path, data: dict) -> None:
    import requests

    text = data["text"]
    if len(text) > LINKEDIN_MAX:
        raise ValueError(f"LinkedIn text over {LINKEDIN_MAX} chars: {len(text)}")

    resp = requests.post(
        "https://api.linkedin.com/rest/posts",
        headers={
            "Authorization": f"Bearer {os.environ['LINKEDIN_ACCESS_TOKEN']}",
            "LinkedIn-Version": LINKEDIN_VERSION,
            "X-Restli-Protocol-Version": "2.0.0",
            "Content-Type": "application/json",
        },
        json={
            "author": os.environ["LINKEDIN_PERSON_URN"],
            "commentary": text,
            "visibility": "PUBLIC",
            "distribution": {
                "feedDistribution": "MAIN_FEED",
                "targetEntities": [],
                "thirdPartyDistributionChannels": [],
            },
            "lifecycleState": "PUBLISHED",
            "isReshareDisabledByAuthor": False,
        },
        timeout=30,
    )
    if resp.status_code != 201:
        raise RuntimeError(f"LinkedIn post failed: {resp.status_code} {resp.text[:300]}")

    urn = resp.headers.get("x-restli-id", "")
    data["status"] = "posted"
    data["posted_at"] = now_iso()
    data["post_urls"] = [f"https://www.linkedin.com/feed/update/{urn}"] if urn else []
    save(path, data)


def main() -> int:
    units = due_units()
    if not units:
        print(f"nothing due as of {today()}")
        return 0

    failures = 0
    for path, data in units:
        label = f"{path.name} ({data['platform']})"
        try:
            if data["platform"] == "x":
                post_x_thread(path, data)
            elif data["platform"] == "linkedin":
                post_linkedin(path, data)
            else:
                raise ValueError(f"unknown platform {data['platform']!r}")
            print(f"POSTED {label} -> {data['post_urls']}")
        except Exception as exc:  # keep going; other units are independent
            failures += 1
            print(f"FAILED {label}: {exc}", file=sys.stderr)

    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
