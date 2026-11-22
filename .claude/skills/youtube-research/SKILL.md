---
name: youtube-research
description: Deep research across many YouTube channels in a niche or on a topic. Use when the user says "research YT", "deep research YouTube", "research all channels in <niche>", "compare these channels", "who is winning on YouTube for <topic>", or wants a cited cross-channel report. Discovers channels, audits each one in parallel, reads transcripts of the outlier videos, and writes a synthesized report.
---

# YouTube deep research

Cross-channel research on public YouTube data. Every number in the report comes from the collector script, and every claim cites a video or channel URL.

## Collector

All youtube-* skills share one script. It needs only `yt-dlp` (no API key) and prints JSON.

```bash
YT=.claude/skills/youtube-research/scripts/yt.py
python3 $YT channel @handle --limit 50              # videos + stats; --tab shorts|streams
python3 $YT search "query" --window month --sort views --limit 30   # window: month|week|today|any
python3 $YT video <url-or-id>... --transcript --comments 30         # exact date, tags, chapters
```

Field notes:

- `x_median` is a video's views divided by the channel's median views in the sample. 2.0 or higher is an outlier; below 0.5 is an underperformer.
- `channel` dates are approximate (parsed from "3 weeks ago"). Use `video` when an exact date matters. The shorts tab has no dates.
- `search` results have no date; the `--window` filter is what bounds them. Run `video` on the ones you keep to get `views_per_day` and `views_per_subscriber`.
- If a call returns null views or an empty list, retry it once before treating it as real.
- Transcripts default to English. Pass `--lang hi`, `--lang es`, and so on for other languages.

Save raw JSON under `data/<slug>/` so later steps and other agents read files instead of re-fetching.

## Process

### 1. Scope

Pin down the niche or topic, the language or region, and whether the user gave a channel list. If they gave channels, skip step 2. Ask only if the niche is too vague to search; otherwise state your reading of it and proceed.

### 2. Discover channels

Write 6 to 10 search queries that cover the niche: the head term, sub-topics, formats ("tutorial", "review", "explained"), and audience phrasing. Run each with `--window any --sort relevance` and again with `--window month --sort views`.

Tally `channel_url` across all results. Keep 8 to 15 channels, mixing:

- the established leaders (appear in most queries),
- the risers (appear in the month window with high views but are not leaders),
- one or two adjacent channels that serve the same audience differently.

List the channels you dropped and why, in one line each.

### 3. Audit each channel in parallel

Spawn one `youtube-channel-audit` agent per channel, all in a single message so they run concurrently. Give each the channel URL, the niche, and the output path `data/<slug>/<channel>.md`. Ask for the audit in the skill's standard format plus the raw stats block.

If you are already running as a subagent and cannot spawn agents, run the `youtube-channel-audit` skill yourself for each channel in turn, using a 30-video sample.

### 4. Go deep on the outliers

Across all audits, collect the videos with `x_median` of 2.0 or more. Group them by topic. For the 10 to 15 strongest, run `video --transcript --comments 30` and read:

- the first 30 to 60 seconds: what the hook promises and how fast it gets to substance,
- the structure: segment order, where the payoff lands, how the video ends,
- the top comments: what viewers say they came for, what they ask for next.

### 5. Synthesize

Compare across channels. Look for:

- **Benchmarks**: median views, views per subscriber, upload cadence, typical duration, per channel.
- **Shared winners**: topics or formats that are outliers on more than one channel. These are niche-level demand, not one creator's luck.
- **Lone winners**: an outlier topic only one channel has tried. These are openings.
- **Packaging conventions**: title structures and lengths that recur among outliers versus among underperformers.
- **Gaps**: things commenters ask for repeatedly that no audited channel has made.
- **Momentum**: channels whose recent uploads beat their own median, and channels in decline.

### 6. Verify, then write

Before writing, re-check every specific number against the saved JSON, and confirm each cited URL is one you actually fetched. Drop any claim you cannot trace.

Write the report to `reports/youtube-research-<slug>-<YYYY-MM-DD>.md`:

```markdown
# YouTube research: <niche>
<date> · <N> channels · <M> videos sampled

## Summary
Five to eight findings, most important first, each with a number and a link.

## Channel benchmarks
| Channel | Subs | Median views | Views/sub | Uploads/wk | Median length | Momentum |

## What is working
Shared winners, with the videos that prove each one.

## Openings
Lone winners and audience-requested gaps.

## Packaging and structure
Title patterns, hook patterns, length, with examples.

## Channel notes
Three or four lines per channel, linking to its full audit.

## Method and limits
Queries used, sample sizes, date collected, what could not be measured.
```

## Limits to state in the report

Public data only: no CTR, retention curves, impressions, revenue, or subscriber history. Views per subscriber and `x_median` are proxies. Search results vary by region and time. Never present an estimate as a measured figure.
