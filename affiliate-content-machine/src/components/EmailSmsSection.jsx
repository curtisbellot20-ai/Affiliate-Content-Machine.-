"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";

export default function EmailSmsSection({ emails, sms }) {
  const [tab, setTab] = useState("email");
  if (!emails?.length && !sms?.length) return null;

  const allEmailText = emails?.map((e, i) => `=== Email ${i + 1} ===\nSubject: ${e.subject}\n\n${e.body}`).join("\n\n");
  const allSmsText = sms?.join("\n\n");

  return (
    <div>
      <div className="section-title">
        <span>📧</span> Email & SMS
        <CopyButton text={tab === "email" ? allEmailText : allSmsText} label={`Copy all ${tab === "email" ? "emails" : "SMS"}`} />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["email", "sms"].map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "8px 20px",
            borderRadius: "var(--radius-sm)",
            border: `1px solid ${tab === t ? "var(--accent)" : "var(--border)"}`,
            background: tab === t ? "var(--accent-dim)" : "transparent",
            color: tab === t ? "var(--accent-light)" : "var(--text-muted)",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}>{t === "email" ? "📧 Emails (3)" : "💬 SMS (3)"}</button>
        ))}
      </div>

      {tab === "email" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {emails?.map((email, i) => (
            <div key={i} className="card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="tag">Email {i + 1}</span>
                  <span style={{ fontWeight: 700 }}>{email.subject}</span>
                </div>
                <CopyButton text={`Subject: ${email.subject}\n\n${email.body}`} />
              </div>
              <div style={{ padding: "12px 16px", background: "var(--bg)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)", marginBottom: 8 }}>Subject</div>
                <div style={{ fontWeight: 600, marginBottom: 16 }}>{email.subject}</div>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)", marginBottom: 8 }}>Body</div>
                <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>{email.body}</pre>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "sms" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sms?.map((msg, i) => (
            <div key={i} className="card" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 12, flex: 1 }}>
                <span className="tag" style={{ flexShrink: 0 }}>SMS {i + 1}</span>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{msg}</p>
              </div>
              <CopyButton text={msg} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
