# How to build moderation that doesn't lean left

The biggest moderation risk at a heterodox platform is not a user posting something dangerous. It is Apple or Google pulling your app.

Most engineering teams think about moderation the way the major platforms taught them to think about it. Build a pipeline. Classify content. Remove the bad stuff. The bad stuff is roughly what Twitter and Meta call bad. If a piece of content slips through, you have a reputational problem and maybe a press cycle. You apologize. You ship a patch. You move on.

That is not how it works at a small heterodox platform. At a small heterodox platform, the failure mode is not a press cycle. The failure mode is that your app is no longer in the App Store on Monday morning. Apple does not apologize. There is no patch. There is no moving on. You have a few days to make a case for reinstatement, and during those few days your platform does not exist for most of your users.

This essay is about how to build a moderation system that survives that operating environment, and how the work is different from what the vendors and the consultancies will tell you to do.

## The double standard

Twitter, Reddit, Discord, and 4chan all host content categories that would get a small platform pulled from the App Store within a week. They have not been pulled. Reddit has hosted forums dedicated to material that, on a platform like Parler, would have been treated as a five-alarm fire. 4chan has been 4chan for twenty years. Discord is the largest extremism vector on the consumer internet by several public measures and is still in the App Store. The major platforms are not safer than the minor ones. They are bigger.

Apple's published guidelines do not say "we apply a different standard to platforms with a perceived political valence." But the record speaks for itself. Parler was removed in January 2021 inside seventy-two hours of a generic content-moderation complaint. Gab has been rejected from the App Store repeatedly across years. Telegram has been forced to restrict features on iOS that work fine on Android. Meanwhile, the majors absorb similar or worse content and stay listed.

This is the operating environment. It is not fair. It is not going to change. The job is to build a moderation posture that wins inside it anyway.

## What this means for the posture

The first counterintuitive move is this. A heterodox platform that wants to survive must moderate more aggressively, not less, on the categories Apple and Google care about. Not because those categories represent your team's values. Because they represent the conditions of your continued existence.

This often confuses people who hear "heterodox platform" and assume the goal is permissive moderation. The goal is not permissive moderation. The goal is to host the speech your users actually want to make, which is mostly political and religious and culturally contrarian speech that the major platforms have decided is unsafe. To protect that speech, the platform has to be ironclad on the categories that have nothing to do with politics. CSAM. Real-world violence. Doxxing. Targeted harassment. The categories the App Store reviewer is going to ask about.

A platform that is sloppy on those categories does not get to host political speech for very long. A platform that is excellent on those categories earns the slack it needs.

## Where the lean enters

The work that matters is not "do we ban hate speech." Every serious platform bans the things that get you deplatformed. The work that matters lives in the smaller, more contested space between what the major platforms' policy teams call unsafe and what your users consider normal discourse.

The vendor classifiers do not solve this for you. A vendor classifier is a commodity. It emits category scores. It tells you that a piece of content is, say, 0.83 likely to be classified as harassment under the definition the vendor uses. The vendor's definition was written by people, and those people work in San Francisco and Seattle, and the definition reflects that. But the vendor is not making the call. The vendor is reporting a score. You decide what to do with the score.

The decision happens in three layers your team owns.

First, the taxonomy. Which categories do you care about? Apple cares about certain things and you have to care about those. Beyond that, the choice is yours. A platform that treats "misinformation" as a category and a platform that does not are not running the same system, even if they pay the same vendor.

Second, the weights and thresholds. The classifier says 0.83. What does your platform do? At 0.95 you auto-remove. At 0.40 you ignore. Between those, you route to a human queue, or you weight the score by user history, or you apply a different threshold for accounts with verified identity. These are policy choices encoded as numbers. Every number is a value judgment.

Third, the human policy. A score and a threshold get you a queue. A queue gets you a moderator looking at a post. That moderator is reading a policy document your team wrote. The document tells them what removable means and what borderline means and what to do when they are unsure. The document is where your platform's actual moral commitments live. Most platforms do not write this document carefully. They inherit it from the prior employer of whoever they hired to run trust and safety.

If your team is staffed from the same labor pool as the majors, your policy will read like the majors' policy, because the people writing it grew up inside the majors' assumptions. This is the lean. It is not in the vendor. It is in your policy team.

## The structural advantage of a small team

Here is the second counterintuitive move. A small team that has to lean on AI for most of its moderation decisions is in a better position to write a defensible policy than a large team that does not.

A 500-person trust and safety team at a major platform almost never has to make its values explicit. The moderators share them implicitly. The training is a few slides and a culture. The policy document, if it exists at all, is a wiki that nobody reads because everyone already knows what the call is.

A five-person team at a small platform cannot afford that. Volume is too high. The team has to encode its policy into the weights, thresholds, and queue routing that the AI executes. Encoded policy is inspectable policy. Inspectable policy is defensible policy.

When Apple asks why you handled a piece of content the way you did, the major platform points to outcomes and culture. The small platform points to its config. The small platform wins that conversation more often than the press would have you believe.

## What this looks like in practice

The work, roughly, is this. Inventory the categories where your users actually diverge from the major platforms' defaults. Decide, explicitly, what your platform's posture is on each one. Encode that posture into weights and thresholds applied on top of your vendor's classifier outputs. Build a reviewer workflow that executes the encoded policy consistently. Document everything so that when an App Store reviewer or a journalist or a court asks, you have a paper trail and not a culture.

The hard part is not the engineering. The engineering is a few weeks of work. The hard part is the thinking. Most platforms have not done the thinking. They hired a head of trust and safety from a major platform and inherited a worldview. The platforms that survive are the ones whose founders sat down and wrote out, in their own words, what their platform is for and what it is not for, and then built the moderation system to match.

## Close

The job is not to build moderation that has the right politics. The job is to build moderation that survives Apple and Google long enough for the platform to mean something. For a heterodox platform, that means more thinking up front, not less. More encoded policy, not less. More confidence about where the line is, not less. The platforms that get pulled from the App Store are the ones that did not write this down in advance.

I work on this problem. If you run a platform where the App Store risk is real and the major-platform playbook does not fit, the next step is a thirty-minute conversation about your specific stack and your specific risk surface.

---

I'm taking on 2 Eapen Technology clients this quarter. If this is your problem, apply for a consultation.

[Apply for a Consultation] → https://calendly.com/eapentechnology/get-acquainted
