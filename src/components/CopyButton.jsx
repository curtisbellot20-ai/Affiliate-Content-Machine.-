"use client";

import { useState } from "react";

export default function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button className={`copy-btn${copied ? " copied" : ""}`} onClick={handleCopy}>
      {copied ? "✓ Copied" : `⎘ ${label}`}
    </button>
  );
}
