---
name: youtube-channel-audit
description: Audit a single YouTube channel from public data. Use when the user says "audit this channel", "youtube channel audit", "review my channel", "why is this channel growing or stalling", or gives a channel URL or @handle and asks what is working. Produces performance stats, outlier analysis, packaging and SEO review, and prioritized recommendations.
---

# YouTube channel audit

Audit one channel using the shared collector. See `.claude/skills/youtube-research/SKILL.md` for the full field notes.

```bash
YT=.claude/skills/youtube-research/scripts/yt.py
mkdir -p data/<slug>
python3 $YT channel <channel> --limit 50 > data/<slug>/videos.json
python3 $YT channel <channel> --tab shorts --limit 30 > data/<slug>/shorts.json
```

If the channel has no shorts or streams tab the call fails; note that and move on.

## Process

1. **Baseline.** From `videos.json` read subscribers, median views, views per subscriber, uploads per week, days since last upload, and median duration. Do the same for shorts.

2. **Split the sample.** Sort by `x_median`. Outliers are 2.0 or more; underperformers are below 0.5. Compare the two groups on topic, title structure, title length, duration, and age. A pattern counts only if at least three videos support it.

3. **Trajectory.** Compare the median views of the newest third of the sample against the oldest third. State whether the channel is rising, flat, or falling, and by how much.

4. **Inspect the extremes.** Fetch the top 5 outliers and the bottom 3 with full detail:

   ```bash
   python3 $YT video <id> <id> ... --transcript --comments 30 > data/<slug>/detail.json
   ```

   For each, read the first 30 to 60 seconds of transcript (the hook), the description's first two lines, whether chapters and tags exist, and the top comments.

5. **Review each area** and give a one-line verdict with evidence:

   - Positioning: is it clear from the channel description and the last 10 titles who this is for?
   - Topics: which themes outperform, which drag.
   - Packaging: title patterns of winners versus losers. Open the `thumbnail` URLs of the top and bottom videos if a visual comparison helps.
   - Hooks: how long before the video delivers on the title.
   - Format and length: which durations outperform; long-form versus shorts.
   - Cadence: consistency and gaps.
   - SEO hygiene: descriptions, chapters, tags, links.
   - Audience: what commenters praise, complain about, and ask for.

6. **Recommend.** Five to eight actions, ordered by expected impact. Each names the evidence behind it and what to do this week. Include three to five concrete next-video ideas built on the outlier patterns.

## Output

Write to `reports/channel-audit-<slug>-<YYYY-MM-DD>.md` unless told another path.

```markdown
# Channel audit: <name>
<url> · <subs> subscribers · sampled <N> videos, <M> shorts · <date>

## Verdict
Three sentences: where the channel stands, the biggest lever, the biggest risk.

## Numbers
| Metric | Long-form | Shorts |

## What works
Outliers table (title, views, x_median, link) and the patterns behind them.

## What does not
Underperformers and the patterns behind them.

## Area review
One short paragraph per area from step 5.

## Recommendations
Ordered list with evidence.

## Next video ideas

## Limits
```

## Limits

Public data only. CTR, retention, impressions, traffic sources, revenue, and subscriber history are not available; say so instead of estimating them. If the user owns the channel, ask them to paste YouTube Studio figures for those and fold them in. Dates from the channel listing are approximate.
