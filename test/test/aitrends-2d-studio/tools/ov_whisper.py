"""tools/ov_whisper.py — Whisper on the Intel GPU with OpenVINO GenAI (word timestamps). Called by tools/transcribe.py.

Runs inside the OpenVINO environment:  .venv-ov/Scripts/python tools/ov_whisper.py <audio.wav 16k mono> <model_dir> <out.json> [--device GPU] [--lang en]
The model dir is an OpenVINO export of Whisper (models/whisper-base-ov) with openvino_tokenizer/detokenizer.xml.
"""
import argparse, json, sys, time
import numpy as np, soundfile as sf
import openvino_genai as og

ap = argparse.ArgumentParser()
ap.add_argument("audio"); ap.add_argument("model"); ap.add_argument("out")
ap.add_argument("--device", default="GPU"); ap.add_argument("--lang", default="en")
a = ap.parse_args()
t0 = time.time()
pipe = og.WhisperPipeline(a.model, a.device, word_timestamps=True)
audio, sr = sf.read(a.audio, dtype="float32")
if audio.ndim > 1:
    audio = audio.mean(axis=1)
if sr != 16000:
    sys.exit(f"expected 16 kHz audio, got {sr}")
print(f"openvino whisper on {a.device}: loaded in {time.time() - t0:.1f}s", flush=True)
t0 = time.time()
r = pipe.generate(audio.tolist(), language=f"<|{a.lang}|>", task="transcribe", return_timestamps=True, word_timestamps=True)
words = [{"word": w.word.strip(), "start": round(float(w.start_ts), 3), "end": round(float(w.end_ts), 3)} for w in (r.words or []) if w.word.strip()]
json.dump({"words": words, "device": a.device}, open(a.out, "w", encoding="utf-8"))
print(f"{len(words)} words in {time.time() - t0:.1f}s ({len(audio) / 16000:.0f}s of audio)", flush=True)
