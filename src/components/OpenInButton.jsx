"use client";
import { useState } from "react";

export default function OpenInButton({ text, url, label, icon }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    window.open(url, "_blank");
  }

  return (
    <button
      onClick={handleClick}
      title={copied ? `Text copied! Paste it in ${label}` : `Copy text & open ${label}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 12px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        border: `1px solid ${copied ? "rgba(34,197,94,0.4)" : "rgba(108,99,255,0.3)"}`,
        background: copied ? "rgba(34,197,94,0.1)" : "var(--accent-dim)",
        color: copied ? "var(--green)" : "var(--accent-light)",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      <span>{icon}</span>
      <span>{copied ? `Copied! Paste in ${label}` : `Open in ${label}`}</span>
    </button>
  );
}
