"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import OpenInButton from "./OpenInButton";

function scriptText(s) {
  return `HOOK:\n${s.hook}\n\nBODY:\n${s.body}\n\nCTA:\n${s.cta}`;
}

export default function VideoScriptsSection({ scripts }) {
  const [open, setOpen] = useState(0);
  if (!scripts?.length) return null;

  const allText = scripts.map((s, i) => `=== Script ${i + 1}: ${s.title} ===\n${scriptText(s)}`).join("\n\n");

  return (
    <div>
      <div className="section-title">
        <span>🎬</span> Video Scripts (10)
        <CopyButton text={allText} label="Copy all" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {scripts.map((script, i) => (
          <div key={i} className="card" style={{ padding: 0, overflow: "hidden" }}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
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
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="tag" style={{ fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontWeight: 600 }}>{script.title}</span>
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: 18, transform: open === i ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>›</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12, marginBottom: 16, flexWrap: "wrap" }}>
                  <CopyButton text={scriptText(script)} />
                  <OpenInButton
                    text={scriptText(script)}
                    url="https://www.capcut.com/"
                    label="CapCut"
                    icon="🎬"
                  />
                  <OpenInButton
                    text={scriptText(script)}
                    url="https://www.canva.com/create/tiktok-videos/"
                    label="Canva"
                    icon="🎨"
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--accent-light)", marginBottom: 8 }}>Hook</div>
                  <p style={{ color: "var(--text)", lineHeight: 1.7 }}>{script.hook}</p>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--accent-light)", marginBottom: 8 }}>Body</div>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>{script.body}</p>
                </div>
                <div style={{ background: "var(--accent-dim)", border: "1px solid rgba(108,99,255,0.2)", borderRadius: "var(--radius-sm)", padding: "12px 16px" }}>
                  <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--accent-light)", marginBottom: 4 }}>CTA</div>
                  <p style={{ color: "var(--text)" }}>{script.cta}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
