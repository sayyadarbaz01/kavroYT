---
name: youtube-trends-30d
description: Find what has been trending on YouTube in the last 30 days for a niche, topic, or keyword. Use when the user says "youtube trends", "trends 30d", "what's trending on YouTube for <topic>", "what's working this month", or wants breakout videos and video ideas from recent uploads. Ranks recent videos by velocity and by performance relative to channel size.
---

# YouTube trends, last 30 days

Surface what gained traction in a niche this month using the shared collector. See `.claude/skills/youtube-research/SKILL.md` for field notes.

```bash
YT=.claude/skills/youtube-research/scripts/yt.py
mkdir -p data/trends-<slug>
```

## Process

1. **Queries.** Turn the niche into 6 to 10 search queries: the head term, sub-topics, formats, tools or names currently in the news for that niche, and how a beginner would phrase it. State the list before running.

2. **Collect.** For each query, run both windows:

   ```bash
   python3 $YT search "<query>" --window month --sort views --limit 30 > data/trends-<slug>/<q>-month.json
   python3 $YT search "<query>" --window week  --sort views --limit 20 > data/trends-<slug>/<q>-week.json
   ```

3. **Merge.** Deduplicate by video id. Drop off-topic results, music, and re-uploads. Note how many queries each video appeared in.

4. **Enrich.** Search results have no upload date or subscriber count. Run `video` on the top 20 to 30 by views, in batches of 10:

   ```bash
   python3 $YT video <id> <id> ... > data/trends-<slug>/detail-1.json
   ```

   Discard anything whose exact `age_days` is over 30.

5. **Rank two ways.**

   - Velocity: `views_per_day`. Shows what is biggest right now.
   - Breakout: `views_per_subscriber`. A value above 1.0 on a channel under 100k subscribers means the topic carried the video, not the audience. These are the most copyable signals.

6. **Cluster.** Group the enriched videos into 4 to 7 themes. For each theme record how many videos, combined views, the best breakout example, and the dominant format and length. A theme present in the week window but thin in the month window is emerging; the reverse is fading.

7. **Read the top breakouts.** For the best 3 to 5, run `video --transcript --comments 30` and note the hook, the angle that differs from older videos on the topic, and what commenters ask for next.

8. **Turn it into ideas.** Give 8 to 10 video ideas. Each has a working title, the trend it rides, the evidence video, and the angle that is not yet taken.

## Output

Write to `reports/youtube-trends-<slug>-<YYYY-MM-DD>.md`.

```markdown
# YouTube trends: <niche>, last 30 days
<date> · <N> queries · <M> videos enriched

## Headline
Three to five sentences on what moved this month.

## Themes
| Theme | Videos | Combined views | Status (emerging / peaking / fading) | Best example |

## Top by velocity
| Video | Channel | Views | Age | Views/day |

## Breakouts from small channels
| Video | Channel | Subs | Views | Views/sub |

## Patterns
Titles, formats, lengths, hooks that recur among the winners.

## Video ideas

## Method and limits
```

## Limits

Search results depend on region and on YouTube's ranking, so this is a sample of the niche, not a census. Views are a snapshot at collection time. Thirty days is too short to tell a durable trend from a news spike; flag which themes are tied to a single event.
