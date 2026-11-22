# Do competitors A/B test, and is that why they go viral?
2026-11-22 · 12 "What If" channels · 25 page loads each (plus 38 extra loads for Hypo Room) · raw data in `data/ab-testing/`

## Answer
- **Yes, some competitors A/B test.** Five of the 12 channels had a live YouTube "Test & compare" right now: Suddenly You (16 of its latest 30 videos), What If (4), Hypo Room (5), Nero (1), Jeremy Bearimy (1). A World Without also showed one.
- **A/B testing is not why they go viral.** The two fastest growers in the niche show no tests at all: ConChaser (11M+ views in about 5 weeks, 0 tests in 30 videos) and Gus Maybe (0 of 15). Tested videos do not beat untested ones: on Suddenly You, the median tested video scores 0.76x the channel median and the median untested one 1.68x (new videos are tested first, so they are younger, which pulls this down). On Hypo Room it is 1.00x against 0.97x.
- **What testing does:** it picks the better of 2-3 packages on a video that already gets impressions. It cannot create a hit out of a weak premise. The viral reasons are the premise, the packaging, the volume and the timing (see "Why they go viral" below).

## How Test & compare works
- Up to 3 titles, 3 thumbnails, or 3 title-plus-thumbnail pairs per video. The winner is the version with the most **watch time**, not clicks, and it is then shown to everyone. [YouTube Help: A/B test titles & thumbnails](https://support.google.com/youtube/answer/16391400)
- Results are "Winner", "Preferred" or "Performed same". Not for Shorts, made-for-kids, mature or private videos. Thumbnails below 1280x720 are downscaled. [YouTube Help: Test & compare thumbnails](https://support.google.com/youtube/answer/13861714)
- Tests run up to about 2 weeks; title testing reached all creators with Advanced Features (phone-verified) in 2025. [Search Engine Journal](https://www.searchenginejournal.com/youtube-title-a-b-testing-rolls-out-globally-to-creators/562571/), [TubeFilter](https://www.tubefilter.com/2025/07/16/youtube-feature-test-and-compare-titles-thumbnails/), [Social Media Today](https://www.socialmediatoday.com/news/youtube-adds-title-testing-youtube-studio/753015/)

## How the tests were found
Each channel's `/videos` page was loaded 25 times as a new signed-out visitor (`data/ab-testing/abscan.py`). For every video the script recorded the title shown and the thumbnail file served. A normal video always returns the same title and `hq720.jpg`. A video in a test returns different titles, or files named `hq720_custom_1.jpg`, `_custom_2`, `_custom_3`, to different visitors. The thumbnail files of Hypo Room's 5 tested videos were downloaded and compared: the variants are different pictures, not re-encodes.

Two patterns showed up:
- **Even split** (for example 8 / 8 / 9 loads): the test is running now.
- **Rare variant** (24 loads default, 1 load a variant): the variants are live, but signed-out visitors almost always get the default. Either the test has ended and the default won, or it is still running and these visitors fall in YouTube's control group, which "will only see the default thumbnail and title" ([YouTube Help](https://support.google.com/youtube/answer/16391400)). The public page cannot tell the two apart.

## Results by channel
| Channel | Subs | Median views | Videos checked | Tests found | Title tests | Thumbnail tests |
|---|---|---|---|---|---|---|
| Suddenly You | 5,040 | 9,550 | 30 | 16 (7 even, 9 rare) | 8 | 9 |
| Hypo Room | 28,800 | 90,000 | 19 | 5 (all rare) | 0 | 5 |
| What If | 9,000,000 | 393,000 | 30 | 4 (3 even, 1 rare) | 4 | 2 |
| Nero | 3,810 | 65,000 | 11 | 1 (even) | 0 | 1 |
| Jeremy Bearimy | 65,000 | 48,000 | 30 | 1 (even) | 1 | 0 |
| A World Without | 907,000 | 851,000 | 30 | 1 (rare) | 0 | 1 |
| ConChaser | 33,100 | 117,000 | 29 | 0 | 0 | 0 |
| Gus Maybe | 10,600 | 46,000 | 15 | 0 | 0 | 0 |
| IFNation | 13,400 | 68,000 | 30 | 0 | 0 | 0 |
| Lookif | 2,130 | 11,000 | 15 | 0 | 0 | 0 |
| Possiblo | 3,820 | 18,050 | 14 | 0 | 0 | 0 |
| What If Though | n/a | 3 | 5 | 0 | 0 | 0 |

## What they test
**Hypo Room: three different thumbnail concepts, not small tweaks.** All 5 videos from Nov 14 to 21 are tested; none of the 14 older ones still show variants.
- Toilets (80k): "BUSH TOILETS?" with both characters in hedges, against "IT'S FINE" (thumbs-up gag), against "WHAT TO DO?" (a no-toilet sign).
- Different Planets (308k, 3.42x): a no-text picture of each character on a planet, against two "Venus / Mars / Different Planets" split-screens.
- GTA 6 streamer (9.6k): "0 VIEWERS → 1 MILLION VIEWERS" before/after, against "10 MILLION FOLLOWERS".
- Real Life RPG (202k, 2.24x): the same LEVEL 1 → LEVEL 99 idea in two art styles.

**Suddenly You: three title angles per video.** Running now (even split):
- "What If You Had a Rewind Button for Life?" / "…Could Rewind Time With Your Crush?" / "…Could Rewind Time by 10 Seconds?" (8 / 8 / 9 loads)
- "What If Your Whole School Could Hear Your Thoughts?" / "…the One Girl Who Hates You Could Hear Every Thought?" / "…Everyone Within 10 Feet Could Hear Your Thoughts?" (9 / 6 / 10)
- "What If You Swapped Bodies With Your Crush for 14 Days?" / "…Woke Up in Your Crush's Body?" / "…the Girl Who Never Talks to You Became You?" (7 / 8 / 10)

Default title in 24 of 25 loads (the winner if the test has ended, otherwise the control version). In each case the default is the more concrete title:
- "What If You Could See How Everyone Rates You 1 to 10?" beat "…How Much Everyone Secretly Likes You?"
- "What If You and Your Crush Were Alone on Earth for 7 Days?" beat "What If Everyone Disappeared Except You and Your Crush?"
- "What If You Won The Lottery Every Day?" beat "…Couldn't Stop Winning the Lottery?"

**What If (9M subs): title plus thumbnail pairs, also on old videos.** "The True Scale of the Largest Objects in the Universe" (213 days old, 1.6M views) is still being tested against "A Star That Swallows 10 Billion Suns Is Not the Biggest Thing Out There". Tests can be started on a back-catalogue video at any time.

**Nero:** its biggest video, "What If You Were Stuck in a Time Loop Until You Beat Prime Usain Bolt?" (398k views on 3,810 subs, 6.12x), is running a two-thumbnail test (13 / 12 loads).

## Why they go viral (from the earlier audits)
Full evidence in `reports/fast-growth/strategy-ifblaze-15-day-2026-11-22.md`, `reports/viral-whatif/audit-conchaser.md`, `reports/viral-whatif/audit-hypo-room.md` and `reports/fast-growth/audit-gus-maybe.md`.
1. **One premise family, repeated.** ConChaser's 10 outliers all come from "What If You Could See Everyone's [stat]?". Gus Maybe's titles with "CRUSH" beat its others.
2. **A clear contrast in the thumbnail.** Two characters, one glowing number or one before/after. Clicks come from browse and suggested, not search: ConChaser has no tags on 26 of 29 videos.
3. **"You" narration and a fast hook.** The premise lands in 0-30 s. ConChaser's second-person videos score a median of 2.99x, its third-person "Alex" videos 0.53x.
4. **Volume.** One long video a day; only 3 to 10 in 15 to 29 break out.
5. **A fixed upload slot in the US afternoon.** ConChaser posts at 1:00 to 2:30 AM IST.
6. **A sibling video within 24-48 h of a hit.** Remakes of the same hit fail.

## What IfBlaze should do
1. **Turn on Test & compare for all 3 scheduled videos before they go live.** The test starts at publish. IfBlaze already has an A and a B thumbnail for each video (`projects/ifblaze-thumbs/ai/out/`). Requires Advanced Features (phone verification) in Studio.
2. **Make the variants different concepts, as Hypo Room does.** For example, a different scene, number or reaction; not the same picture with new colours. Close variants end as "Performed same".
3. **Test a concrete title against a broad one.** Use numbers, a time limit or a ranking ("1 to 10", "for 7 Days"). Suddenly You's apparent winners are all the concrete version.
4. **Leave each test alone until YouTube calls it.** That takes up to about 2 weeks; don't swap the thumbnail by hand during it.
5. **Do not copy the suggestive thumbnails** that Hypo Room and Gus Maybe use (for example the Ice Cave "Can you warm me up?" variants). That breaks the channel's rules and risks age restriction.

## Limits
- This shows only tests that are live today, seen by signed-out visitors on the channel page. ConChaser or Gus Maybe may have tested in the past, and the search and home feeds were not checked.
- No CTR, watch time, or test results are public. Which version is the default does not prove which one won.
- 25 loads per channel cannot measure the exact split.
- No test or thumbnail guarantees views.
