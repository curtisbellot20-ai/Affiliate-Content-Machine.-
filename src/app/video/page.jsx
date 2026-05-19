"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const W = 1080;
const H = 1920;
const DURATION = 28;
const FPS = 30;

const P_INTRO_END    = 0.11;
const P_HOOK_END     = 0.39;
const P_SHOWCASE_END = 0.75;

function drawRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawWrappedText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(" ");
  let line = "";
  const lines = [];
  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line.trim());
      line = word + " ";
    } else {
      line = test;
    }
  }
  if (line.trim()) lines.push(line.trim());
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineH));
  return lines.length * lineH;
}

function drawProductImage(ctx, img, x, y, size) {
  if (!img || !img.naturalWidth) return;
  ctx.save();
  drawRoundRect(ctx, x, y, size, size, 40);
  ctx.clip();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, size, size);
  ctx.drawImage(img, x, y, size, size);
  ctx.restore();
}

function drawFrame(ctx, elapsed, script, productImgs, productTitle) {
  const progress = Math.min(elapsed / DURATION, 1);

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#0a0a0f");
  bg.addColorStop(1, "#13131a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W / 2, H * 0.35, 0, W / 2, H * 0.35, W * 0.7);
  glow.addColorStop(0, "rgba(108,99,255,0.18)");
  glow.addColorStop(1, "rgba(108,99,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(0, H - 10, W, 10);
  ctx.fillStyle = "#6c63ff";
  ctx.fillRect(0, H - 10, W * progress, 10);

  const ease = (t) => Math.min(1, t * 3);
  const imgs = productImgs || [];
  const hasImgs = imgs.length > 0;

  if (progress < P_INTRO_END) {
    const t = ease(progress / P_INTRO_END);
    ctx.globalAlpha = t;
    ctx.font = "bold 120px -apple-system, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("⚡", W / 2, H * 0.42);
    ctx.font = "bold 56px -apple-system, sans-serif";
    ctx.fillStyle = "#6c63ff";
    ctx.fillText("Affiliate Content", W / 2, H * 0.50);
    ctx.fillText("Machine", W / 2, H * 0.565);
    if (productTitle) {
      ctx.font = "400 38px -apple-system, sans-serif";
      ctx.fillStyle = "rgba(240,240,248,0.55)";
      drawWrappedText(ctx, productTitle, W / 2, H * 0.635, W - 160, 50);
    }
    ctx.globalAlpha = 1;
    return;
  }

  if (progress < P_HOOK_END) {
    const t = ease((progress - P_INTRO_END) / 0.08);
    ctx.globalAlpha = t;
    const imgSize = 660;
    const imgX = (W - imgSize) / 2;
    const imgY = H * 0.07;
    if (hasImgs) drawProductImage(ctx, imgs[0], imgX, imgY, imgSize);
    const textY = hasImgs ? H * 0.50 : H * 0.22;
    ctx.font = "700 34px -apple-system, sans-serif";
    ctx.fillStyle = "#6c63ff";
    ctx.textAlign = "center";
    ctx.fillText("🎯  HOOK", W / 2, textY);
    ctx.font = "700 60px -apple-system, sans-serif";
    ctx.fillStyle = "#f0f0f8";
    drawWrappedText(ctx, script.hook, W / 2, textY + 58, W - 160, 76);
    ctx.globalAlpha = 1;
    return;
  }

  if (progress < P_SHOWCASE_END) {
    const phaseProgress = (progress - P_HOOK_END) / (P_SHOWCASE_END - P_HOOK_END);
    const t = ease(phaseProgress / 0.12);
    ctx.globalAlpha = t;
    const showcaseImgs = imgs.length > 1 ? imgs.slice(1) : imgs;
    const secsInPhase = phaseProgress * (DURATION * (P_SHOWCASE_END - P_HOOK_END));
    const imgIdx = Math.min(Math.floor(secsInPhase / 2), showcaseImgs.length - 1);
    const currentImg = showcaseImgs[imgIdx] || imgs[0];
    const thumbSize = 120;
    const thumbGap = 16;
    const thumbCount = Math.min(showcaseImgs.length, 5);
    const stripW = thumbCount * thumbSize + (thumbCount - 1) * thumbGap;
    const stripX = (W - stripW) / 2;
    const stripY = H * 0.05;
    showcaseImgs.slice(0, 5).forEach((img, i) => {
      const tx = stripX + i * (thumbSize + thumbGap);
      const isActive = i === imgIdx;
      ctx.save();
      drawRoundRect(ctx, tx, stripY, thumbSize, thumbSize, 14);
      ctx.clip();
      ctx.fillStyle = "#fff";
      ctx.fillRect(tx, stripY, thumbSize, thumbSize);
      if (img && img.naturalWidth) ctx.drawImage(img, tx, stripY, thumbSize, thumbSize);
      ctx.restore();
      if (isActive) {
        ctx.strokeStyle = "#6c63ff";
        ctx.lineWidth = 6;
        drawRoundRect(ctx, tx, stripY, thumbSize, thumbSize, 14);
        ctx.stroke();
      }
    });
    const mainSize = 620;
    const mainX = (W - mainSize) / 2;
    const mainY = stripY + thumbSize + 24;
    drawProductImage(ctx, currentImg, mainX, mainY, mainSize);
    ctx.font = "700 32px -apple-system, sans-serif";
    ctx.fillStyle = "#6c63ff";
    ctx.textAlign = "center";
    ctx.fillText("💡  THE DETAILS", W / 2, mainY + mainSize + 50);
    ctx.fillStyle = "rgba(108,99,255,0.4)";
    ctx.fillRect(W / 2 - 60, mainY + mainSize + 72, 120, 3);
    ctx.font = "400 48px -apple-system, sans-serif";
    ctx.fillStyle = "rgba(240,240,248,0.9)";
    drawWrappedText(ctx, script.body, W / 2, mainY + mainSize + 95, W - 160, 64);
    ctx.globalAlpha = 1;
    return;
  }

  {
    const t = ease((progress - P_SHOWCASE_END) / 0.08);
    ctx.globalAlpha = t;
    const ctaGlow = ctx.createLinearGradient(0, H * 0.25, 0, H * 0.85);
    ctaGlow.addColorStop(0, "rgba(108,99,255,0.22)");
    ctaGlow.addColorStop(1, "rgba(108,99,255,0)");
    ctx.fillStyle = ctaGlow;
    ctx.fillRect(0, H * 0.25, W, H * 0.6);
    if (hasImgs) {
      const ctaImg = imgs[imgs.length - 1] || imgs[0];
      const imgSize = 520;
      drawProductImage(ctx, ctaImg, (W - imgSize) / 2, H * 0.08, imgSize);
    }
    ctx.font = "80px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🔥", W / 2, H * 0.53);
    ctx.font = "bold 64px -apple-system, sans-serif";
    ctx.fillStyle = "#6c63ff";
    ctx.fillText("DON'T MISS OUT", W / 2, H * 0.61);
    ctx.fillStyle = "rgba(108,99,255,0.4)";
    ctx.fillRect(W / 2 - 80, H * 0.627, 160, 3);
    ctx.font = "400 52px -apple-system, sans-serif";
    ctx.fillStyle = "#f0f0f8";
    drawWrappedText(ctx, script.cta, W / 2, H * 0.65, W - 160, 68);
    ctx.font = "700 48px -apple-system, sans-serif";
    ctx.fillStyle = "rgba(139,133,255,0.9)";
    ctx.fillText("👆 Link in bio", W / 2, H * 0.87);
    ctx.globalAlpha = 1;
  }
}

export default function VideoPage() {
  const [campaign, setCampaign] = useState(null);
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState("idle");
  const [videoUrl, setVideoUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loadedImgCount, setLoadedImgCount] = useState(0);
  const [genError, setGenError] = useState("");
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const recorderRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("acm_campaign");
    if (stored) setCampaign(JSON.parse(stored));
  }, []);

  async function generate() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const script = campaign.videoScripts[selected];

    setStatus("loading");
    setProgress(0);
    setVideoUrl(null);
    setGenError("");
    setLoadedImgCount(0);

    try {
      if (!window.MediaRecorder) throw new Error("Video recording is not supported in this browser. Try Chrome or Edge.");

      const rawUrls = (campaign.product?.images?.length > 0
        ? campaign.product.images
        : campaign.product?.image ? [campaign.product.image] : []
      ).slice(0, 6);

      const productImgs = await Promise.all(
        rawUrls.map((src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => { setLoadedImgCount((n) => n + 1); resolve(img); };
            img.onerror = () => resolve(null);
            img.src = src;
            setTimeout(() => resolve(null), 8000);
          })
        )
      );
      const validImgs = productImgs.filter(Boolean);

      setStatus("recording");

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : MediaRecorder.isTypeSupported("video/webm") ? "video/webm" : "";

      if (!mimeType) throw new Error("No supported video format found in this browser. Try Chrome or Edge.");

      const stream = canvas.captureStream(FPS);
      const recorder = new MediaRecorder(stream, { mimeType });
      recorderRef.current = recorder;
      const chunks = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onerror = (e) => {
        setGenError(`Recording error: ${e.error?.message || "unknown error"}`);
        setStatus("idle");
      };
      recorder.onstop = () => {
        const totalSize = chunks.reduce((s, c) => s + c.size, 0);
        if (totalSize === 0) {
          setGenError("Recording produced an empty file. Stay on this tab while generating and try again.");
          setStatus("idle");
          return;
        }
        const blob = new Blob(chunks, { type: "video/webm" });
        setVideoUrl(URL.createObjectURL(blob));
        setStatus("done");
      };

      recorder.start(100);
      const start = Date.now();
      const scriptData = { ...script, body: script.voiceover || script.body };

      // Use setInterval instead of requestAnimationFrame so frames keep
      // rendering even when the tab is backgrounded or throttled.
      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - start) / 1000;
        setProgress(Math.min(elapsed / DURATION, 1));
        drawFrame(ctx, elapsed, scriptData, validImgs, campaign.product?.title);
        if (elapsed >= DURATION) {
          clearInterval(intervalRef.current);
          recorder.stop();
        }
      }, 1000 / FPS);

    } catch (err) {
      setGenError(err.message || "Video generation failed. Please try again.");
      setStatus("idle");
    }
  }

  function cancel() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    setStatus("idle");
    setProgress(0);
  }

  if (!campaign) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ fontSize: 48 }}>🎬</div>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>No campaign found</h1>
        <p style={{ color: "var(--text-muted)" }}>Generate a campaign first.</p>
        <Link href="/generate" className="btn btn-primary" style={{ textDecoration: "none" }}>Generate campaign →</Link>
      </main>
    );
  }

  const totalImgs = Math.min((campaign.product?.images?.length || (campaign.product?.image ? 1 : 0)), 6);

  return (
    <main style={{ minHeight: "100vh", padding: "40px 0 80px" }}>
      <div className="container" style={{ maxWidth: 960 }}>
        <Link href="/results" style={{ color: "var(--text-muted)", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32, textDecoration: "none" }}>
          ← Back to results
        </Link>

        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>🎬 Free Video Generator</h1>
          <p style={{ color: "var(--text-muted)", marginBottom: 12 }}>
            Pick a script and generate a short-form video in TikTok/Reels format — all your product images included.
          </p>
          <div style={{ display: "inline-flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ padding: "6px 12px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 6, fontSize: 13, color: "var(--green)" }}>✓ Free — no API key needed</span>
            <span style={{ padding: "6px 12px", background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 6, fontSize: 13, color: "var(--accent-light)" }}>
              📸 Uses {totalImgs} product image{totalImgs !== 1 ? "s" : ""}
            </span>
            <span style={{ padding: "6px 12px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 13, color: "var(--text-muted)" }}>🔇 Silent — add voiceover in CapCut</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 10, fontSize: 14 }}>1. Pick a script</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 320, overflowY: "auto" }}>
                {campaign.videoScripts?.map((s, i) => (
                  <button key={i} onClick={() => { setSelected(i); setVideoUrl(null); setStatus("idle"); }} style={{
                    padding: "11px 16px", borderRadius: 8,
                    border: `1px solid ${selected === i ? "var(--accent)" : "var(--border)"}`,
                    background: selected === i ? "var(--accent-dim)" : "var(--bg-card)",
                    color: selected === i ? "var(--accent-light)" : "var(--text-muted)",
                    textAlign: "left", cursor: "pointer", fontSize: 14, fontWeight: 500, transition: "all 0.15s",
                  }}>
                    <span style={{ opacity: 0.5, marginRight: 8 }}>#{i + 1}</span>{s.title}
                  </button>
                ))}
              </div>
            </div>

            {campaign.videoScripts?.[selected] && (
              <div className="card" style={{ fontSize: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--accent-light)", marginBottom: 6 }}>Hook</div>
                <p style={{ color: "var(--text-muted)", marginBottom: 14, lineHeight: 1.6 }}>{campaign.videoScripts[selected].hook}</p>
                <div style={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--accent-light)", marginBottom: 6 }}>CTA</div>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>{campaign.videoScripts[selected].cta}</p>
              </div>
            )}

            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 10, fontSize: 14 }}>2. Generate</label>
              {genError && (
                <div style={{ padding: "12px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, color: "var(--red)", fontSize: 14, marginBottom: 10 }}>
                  {genError}
                </div>
              )}
              {status === "idle" && (
                <button onClick={generate} className="btn btn-primary" style={{ fontSize: 15, padding: "14px 28px", width: "100%", justifyContent: "center" }}>
                  ⚡ Generate Video (~{DURATION}s)
                </button>
              )}
              {status === "loading" && (
                <div className="card" style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>Loading images…</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{loadedImgCount} / {totalImgs} loaded</div>
                </div>
              )}
              {status === "recording" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div className="card" style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 600, marginBottom: 10 }}>🎬 Recording…</div>
                    <div style={{ background: "var(--bg)", borderRadius: 999, height: 8, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: "linear-gradient(90deg, #6c63ff, #8b85ff)", width: `${Math.round(progress * 100)}%`, transition: "width 0.2s" }} />
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8 }}>{Math.round(progress * 100)}%</div>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", margin: 0 }}>Keep this tab active while recording</p>
                  <button onClick={cancel} className="btn btn-secondary" style={{ fontSize: 13 }}>Cancel</button>
                </div>
              )}
              {status === "done" && videoUrl && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <a href={videoUrl} download={`video-script-${selected + 1}.webm`} className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "14px 28px", justifyContent: "center" }}>
                    ⬇ Download Video (.webm)
                  </a>
                  <button onClick={() => { setStatus("idle"); setVideoUrl(null); }} className="btn btn-secondary" style={{ fontSize: 13 }}>Generate another</button>
                </div>
              )}
            </div>

            {status === "done" && (
              <div style={{ padding: "14px 16px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 8, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
                <strong style={{ color: "var(--green)" }}>Next step:</strong> Open the video in <strong>CapCut</strong> and use their AI voiceover or record yourself reading the script above.
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.5 }}>9:16 Preview</div>
            <div style={{ width: 240, height: 427, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", position: "relative", flexShrink: 0 }}>
              <canvas ref={canvasRef} width={W} height={H} style={{ width: "100%", height: "100%", display: "block" }} />
              {status === "idle" && (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, pointerEvents: "none" }}>
                  <div style={{ fontSize: 40 }}>🎬</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Preview here</div>
                </div>
              )}
            </div>
            {status === "done" && videoUrl && (
              <video src={videoUrl} controls loop style={{ width: 240, borderRadius: 16, border: "1px solid var(--border)" }} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
