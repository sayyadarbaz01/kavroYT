#!/usr/bin/env python3
"""YouTube data collector for the youtube-* skills. Wraps yt-dlp, prints JSON.

  yt.py channel <@handle|url|UC-id> [--limit 50] [--tab videos|shorts|streams]
  yt.py search  <query> [--limit 30] [--window month|week|today|any] [--sort views|relevance|date]
  yt.py video   <url-or-id>... [--transcript] [--lang en] [--comments N]

No API key. Public data only. Dates in `channel` output are approximate
(derived from "3 weeks ago" style labels); `video` dates are exact.
"""
import argparse
import base64
import datetime as dt
import glob
import json
import os
import statistics
import subprocess
import sys
import tempfile
import urllib.parse

TODAY = dt.datetime.now(dt.timezone.utc).date()


def ytdlp(*args):
    proc = subprocess.run(
        ["yt-dlp", "--no-warnings", "--ignore-no-formats-error", *args],
        capture_output=True, text=True,
    )
    if proc.returncode != 0 and not proc.stdout.strip():
        sys.exit(f"yt-dlp failed: {proc.stderr.strip()[-500:]}")
    return proc.stdout


def channel_url(ref, tab):
    if ref.startswith("http"):
        base = ref.split("?")[0].rstrip("/")
        for suffix in ("/videos", "/shorts", "/streams", "/featured"):
            if base.endswith(suffix):
                base = base[: -len(suffix)]
    elif ref.startswith("UC") and len(ref) == 24:
        base = f"https://www.youtube.com/channel/{ref}"
    else:
        base = f"https://www.youtube.com/@{ref.lstrip('@')}"
    return f"{base}/{tab}"


def entry_date(e):
    if e.get("upload_date"):
        return dt.datetime.strptime(e["upload_date"], "%Y%m%d").date()
    if e.get("timestamp"):
        return dt.datetime.fromtimestamp(e["timestamp"], dt.timezone.utc).date()
    return None


def flat_video(e):
    date = entry_date(e)
    views = e.get("view_count")
    age = (TODAY - date).days if date else None
    return {
        "id": e.get("id"),
        "url": f"https://www.youtube.com/watch?v={e.get('id')}",
        "title": e.get("title"),
        "channel": e.get("channel") or e.get("uploader"),
        "channel_url": e.get("channel_url") or e.get("uploader_url"),
        "views": views,
        "duration_s": e.get("duration"),
        "date": date.isoformat() if date else None,
        "age_days": age,
        "views_per_day": round(views / max(age, 1)) if views is not None and age is not None else None,
    }


def cmd_channel(a):
    raw = ytdlp("-J", "--flat-playlist", "--playlist-end", str(a.limit),
                "--extractor-args", "youtubetab:approximate_date",
                channel_url(a.channel, a.tab))
    data = json.loads(raw)
    videos = [flat_video(e) for e in data.get("entries") or [] if e]
    counted = [v["views"] for v in videos if v["views"] is not None]
    median = statistics.median(counted) if counted else None
    for v in videos:
        v["channel"] = v["channel"] or data.get("channel")
        v["x_median"] = round(v["views"] / median, 2) if median and v["views"] is not None else None
    dates = sorted(dt.date.fromisoformat(v["date"]) for v in videos if v["date"])
    span = (dates[-1] - dates[0]).days if len(dates) > 1 else 0
    last30 = [v for v in videos if v["age_days"] is not None and v["age_days"] < 30]
    durations = [v["duration_s"] for v in videos if v["duration_s"]]
    return {
        "channel": data.get("channel") or data.get("uploader"),
        "channel_id": data.get("channel_id"),
        "channel_url": data.get("channel_url"),
        "subscribers": data.get("channel_follower_count"),
        "description": data.get("description"),
        "tags": data.get("tags"),
        "tab": a.tab,
        "stats": {
            "sample_size": len(videos),
            "median_views": median,
            "mean_views": round(statistics.mean(counted)) if counted else None,
            "median_duration_s": statistics.median(durations) if durations else None,
            "uploads_per_week": round((len(dates) - 1) / span * 7, 2) if span else None,
            "uploads_last_30d": len(last30),
            "views_last_30d_uploads": sum(v["views"] or 0 for v in last30),
            "days_since_last_upload": (TODAY - dates[-1]).days if dates else None,
            "median_views_per_subscriber": round(median / data["channel_follower_count"], 3)
            if median and data.get("channel_follower_count") else None,
        },
        "videos": videos,
    }


def search_sp(window, sort):
    """YouTube search filter protobuf: sort (field 1), upload date + type=video (field 2)."""
    date_code = {"today": 2, "week": 3, "month": 4}.get(window)
    sort_code = {"date": 2, "views": 3}.get(sort)
    filters = (bytes([0x08, date_code]) if date_code else b"") + b"\x10\x01"
    msg = (bytes([0x08, sort_code]) if sort_code else b"") + bytes([0x12, len(filters)]) + filters
    return base64.b64encode(msg).decode()


def cmd_search(a):
    url = "https://www.youtube.com/results?" + urllib.parse.urlencode(
        {"search_query": a.query, "sp": search_sp(a.window, a.sort)})
    raw = ytdlp("-J", "--flat-playlist", "--playlist-end", str(a.limit), url)
    videos = [flat_video(e) for e in json.loads(raw).get("entries") or [] if e]
    if a.sort == "views":
        videos.sort(key=lambda v: v["views"] or 0, reverse=True)
    return {"query": a.query, "window": a.window, "sort": a.sort, "videos": videos}


def transcript(url, lang):
    with tempfile.TemporaryDirectory() as tmp:
        ytdlp("--skip-download", "--write-subs", "--write-auto-subs",
              "--sub-langs", f"{lang},{lang}-orig,{lang}-.*", "--sub-format", "json3",
              "-o", os.path.join(tmp, "t"), url)
        files = sorted(glob.glob(os.path.join(tmp, "*.json3")), key=len)
        if not files:
            return None
        with open(files[0]) as f:
            events = json.load(f).get("events", [])
    lines = []
    for ev in events:
        text = "".join(s.get("utf8", "") for s in ev.get("segs") or []).strip()
        if text:
            lines.append(f"[{ev.get('tStartMs', 0) // 1000}s] {text}")
    return "\n".join(lines)


def cmd_video(a):
    out = []
    for ref in a.urls:
        url = ref if ref.startswith("http") else f"https://www.youtube.com/watch?v={ref}"
        args = ["-J", "--no-playlist"]
        if a.comments:
            args += ["--write-comments", "--extractor-args",
                     f"youtube:max_comments={a.comments},all,0,0;comment_sort=top"]
        d = json.loads(ytdlp(*args, url))
        date = entry_date(d)
        age = (TODAY - date).days if date else None
        views = d.get("view_count")
        item = {
            "id": d.get("id"), "url": d.get("webpage_url"), "title": d.get("title"),
            "channel": d.get("channel"), "channel_url": d.get("channel_url"),
            "subscribers": d.get("channel_follower_count"),
            "views": views, "likes": d.get("like_count"),
            # With --comments yt-dlp reports the number fetched, not the real total.
            "comment_count": None if a.comments else d.get("comment_count"),
            "date": date.isoformat() if date else None, "age_days": age,
            "views_per_day": round(views / max(age, 1)) if views is not None and age is not None else None,
            "views_per_subscriber": round(views / d["channel_follower_count"], 2)
            if views is not None and d.get("channel_follower_count") else None,
            "duration_s": d.get("duration"), "categories": d.get("categories"),
            "tags": d.get("tags"), "description": d.get("description"),
            "chapters": [{"start_s": c.get("start_time"), "title": c.get("title")}
                         for c in d.get("chapters") or []],
            "thumbnail": d.get("thumbnail"),
        }
        if a.comments:
            item["comments"] = [{"likes": c.get("like_count"), "text": c.get("text")}
                                for c in d.get("comments") or []]
        if a.transcript:
            item["transcript"] = transcript(url, a.lang)
        out.append(item)
    return out


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)

    c = sub.add_parser("channel")
    c.add_argument("channel")
    c.add_argument("--limit", type=int, default=50)
    c.add_argument("--tab", choices=["videos", "shorts", "streams"], default="videos")
    c.set_defaults(fn=cmd_channel)

    s = sub.add_parser("search")
    s.add_argument("query")
    s.add_argument("--limit", type=int, default=30)
    s.add_argument("--window", choices=["month", "week", "today", "any"], default="month")
    s.add_argument("--sort", choices=["views", "relevance", "date"], default="views")
    s.set_defaults(fn=cmd_search)

    v = sub.add_parser("video")
    v.add_argument("urls", nargs="+")
    v.add_argument("--transcript", action="store_true")
    v.add_argument("--lang", default="en")
    v.add_argument("--comments", type=int, default=0)
    v.set_defaults(fn=cmd_video)

    a = p.parse_args()
    json.dump(a.fn(a), sys.stdout, ensure_ascii=False, indent=1)
    print()


if __name__ == "__main__":
    main()
