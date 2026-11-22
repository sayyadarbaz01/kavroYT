---
name: youtube-marketing
description: Plan and write YouTube marketing assets grounded in channel and trend data. Use when the user says "youtube marketing", "youtube strategy", "grow my channel", "write titles", "thumbnail ideas", "video description", "hook script", "content calendar", "shorts plan", or wants a launch plan for a video or channel. Produces titles, thumbnail briefs, descriptions with chapters, hooks, a shorts plan, and an upload calendar.
---

# YouTube marketing

Produce strategy and ready-to-use assets. Ground them in data, not in generic best practice.

## Get the evidence first

Check `reports/` and `data/` for an existing audit or trend report less than two weeks old. If one is missing and the request depends on it:

- no channel audit for the user's channel: run the `youtube-channel-audit` skill,
- no trend read on the niche: run the `youtube-trends-30d` skill,
- need competitor packaging for one topic: `python3 .claude/skills/youtube-research/scripts/yt.py search "<topic>" --window any --sort views --limit 20`.

For a single small asset (one title, one description) a quick competitor search is enough; do not run a full audit.

Then confirm what you need from the user and cannot look up: the goal (views, subscribers, leads, sales), the audience, the offer or call to action, and how many videos per week they can actually make. Ask once, in one message. If they do not answer, state your assumptions and continue.

## Assets

Deliver only what was asked for. For a full plan, deliver all of these.

**Positioning.** One sentence: who the channel is for, what they get, why this channel. Three to five content pillars, each tied to a theme that the audit or trend data shows working.

**Titles.** Ten options per video, under 60 characters where possible, with the main keyword early. Vary the structure: outcome, curiosity gap, number, contrarian, how-to. Model them on the outlier titles in the data and name which outlier each follows. Mark your top three. No claim the video does not deliver.

**Thumbnail brief.** Two or three concepts per video. Each states the single focal subject, the text overlay (four words or fewer, not repeating the title), the emotion or tension, the colour contrast, and how it differs from the top competitor thumbnails for that query.

**Hook.** The first 30 seconds as a script: confirm the title's promise in the first sentence, show the stakes or the payoff, give a reason to stay. For shorts, the first three seconds.

**Description.** Two lines that restate the promise with the keyword, since those show above the fold. Then links, chapters with timestamps (first at 00:00), and three to five hashtags. Leave a clearly marked placeholder for any link you do not have.

**Shorts plan.** For each long video, three to five clips: the moment, the on-screen hook, and the pointer back to the full video.

**Calendar.** Four weeks, sized to the user's real capacity. Each slot has the topic, the pillar, the format, the working title, and the evidence behind it. Put the strongest evidence-backed idea first.

**Distribution.** A community post or poll per video, a pinned comment, end screen and card targets, playlist placement, and where outside YouTube the video should be shared given the audience.

**Measurement.** What to check in YouTube Studio at 48 hours and at 7 days (CTR, average view duration, the first-30-second drop), and the rule for when to swap the title or thumbnail.

## Output

Write to `reports/youtube-marketing-<slug>-<YYYY-MM-DD>.md`. Lead with the plan in ten lines or fewer, then the assets, each ready to paste.

## Boundaries

This skill writes and plans. It does not upload, schedule, post, comment, or change anything on a YouTube account. Do not promise view or subscriber numbers. Do not write misleading titles or thumbnails; a title the video does not pay off damages retention and the channel.
