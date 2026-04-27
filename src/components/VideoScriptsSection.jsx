"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import OpenInButton from "./OpenInButton";

function scriptText(s) {
  return [
    `FRAMEWORK: ${s.framework || ""}`,
    `HOOK: ${s.hook}`,
    `PROBLEM: ${s.problem || ""}`,
    `SOLUTION: ${s.solution || ""}`,
    `PROOF: ${s.proof || ""}`,
    ``,
    `VOICEOVER:`,
    s.voiceover || s.body || "",
    ``,
    `SCENE DIRECTION: ${s.sceneDirection || ""}`,
    `ON-SCREEN TEXT: ${s.onScreenText || ""}`,
    `CAPTION: ${s.caption || ""}`,
    `CTA: ${s.cta}`,
    `HASHTAGS: ${Array.isArray(s.hashtags) ? s.hashtags.join(" ") : ""}`,
  ].join("\n");
}

function Field({ label, value, accent }) {
  if (!value) return null;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: accent ? "var(--accent-light)" : "var(--text-muted)", marginBottom: 5 }}>
        {label}
      </div>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.75, fontSize: 14, margin: 0, whiteSpace: "pre-wrap" }}>{value}</p>
    </div>
  );
}

function ScriptCard({ script, index, meta, onScriptUpdate }) {
  const [open, setOpen] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [regenError, setRegenError] = useState("");

  async function handleRegenerate() {
    setRegenerating(true);
    setRegenError("");
    try {
      const res = await fetch("/api/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scriptIndex: index,
          framework: script.framework,
          product: meta?.product,
          niche: meta?.niche,
          audience: meta?.audience,
          tone: meta?.tone,
          persona: meta?.persona,
          platforms: meta?.platforms,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.script) throw new Error(data.error || "Regeneration failed");
      onScriptUpdate(index, data.script);
    } catch (err) {
      setRegenError(err.message);
    } finally {
      setRegenerating(false);
    }
  }

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          color: "var(--text)",
          cursor: "pointer",
          textAlign: "left",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
          <span className="tag" style={{ flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {script.title}
            </div>
            {script.framework && (
              <div style={{ fontSize: 11, color: "var(--accent-light)", marginTop: 2, fontWeight: 500 }}>
                {script.framework}
              </div>
            )}
          </div>
        </div>
        <span style={{ color: "var(--text-muted)", fontSize: 18, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.15s", flexShrink: 0 }}>›</span>
      </button>

      {open && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border)" }}>
          {/* Action buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14, marginBottom: 18, flexWrap: "wrap" }}>
            <CopyButton text={scriptText(script)} />
            <OpenInButton text={scriptText(script)} url="https://www.capcut.com/" label="CapCut" icon="🎬" />
            <OpenInButton text={scriptText(script)} url="https://www.canva.com/create/tiktok-videos/" label="Canva" icon="🎨" />
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: regenerating ? "var(--text-muted)" : "var(--text)",
                fontSize: 13,
                fontWeight: 600,
                cursor: regenerating ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {regenerating ? "⏳ Regenerating…" : "↺ Regenerate"}
            </button>
          </div>

          {regenError && (
            <div style={{ marginBottom: 14, padding: "8px 12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 6, color: "var(--red)", fontSize: 13 }}>
              {regenError}
            </div>
          )}

          {/* Script fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <div>
              <Field label="Hook" value={script.hook} accent />
              <Field label="Problem" value={script.problem} />
              <Field label="Solution" value={script.solution} />
              <Field label="Proof" value={script.proof} />
            </div>
            <div>
              <Field label="Scene Direction" value={script.sceneDirection} />
              <Field label="On-Screen Text" value={script.onScreenText} />
              <Field label="Caption" value={script.caption} />
            </div>
          </div>

          {/* Voiceover - full width */}
          {(script.voiceover || script.body) && (
            <div style={{ marginBottom: 14, padding: "14px 16px", background: "var(--bg)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
              <div style={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--accent-light)", marginBottom: 8 }}>
                🎙 Voiceover (Full Script)
              </div>
              <p style={{ color: "var(--text)", lineHeight: 1.8, fontSize: 14, margin: 0, whiteSpace: "pre-wrap" }}>
                {script.voiceover || script.body}
              </p>
            </div>
          )}

          {/* CTA */}
          <div style={{ background: "var(--accent-dim)", border: "1px solid rgba(108,99,255,0.2)", borderRadius: "var(--radius-sm)", padding: "12px 16px", marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--accent-light)", marginBottom: 4 }}>CTA</div>
            <p style={{ color: "var(--text)", margin: 0 }}>{script.cta}</p>
          </div>

          {/* Hashtags */}
          {Array.isArray(script.hashtags) && script.hashtags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {script.hashtags.map((tag, i) => (
                <span key={i} style={{ padding: "3px 10px", borderRadius: 999, background: "var(--accent-dim)", color: "var(--accent-light)", border: "1px solid rgba(108,99,255,0.2)", fontSize: 12, fontWeight: 500 }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function VideoScriptsSection({ scripts, meta, onScriptUpdate }) {
  if (!scripts?.length) return null;

  const allText = scripts.map((s, i) => `=== Script ${i + 1}: ${s.title} ===\n${scriptText(s)}`).join("\n\n");

  return (
    <div>
      <div className="section-title">
        <span>🎬</span> Video Scripts ({scripts.length})
        <CopyButton text={allText} label="Copy all" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {scripts.map((script, i) => (
          <ScriptCard
            key={i}
            script={script}
            index={i}
            meta={meta}
            onScriptUpdate={onScriptUpdate || (() => {})}
          />
        ))}
      </div>
    </div>
  );
}
