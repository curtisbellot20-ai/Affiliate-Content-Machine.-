"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";

export default function BlogPostSection({ post }) {
  const [view, setView] = useState("rendered");
  if (!post) return null;

  const fullText = [
    `Title: ${post.title}`,
    post.seoTitles?.length ? `SEO Titles:\n${post.seoTitles.map((t, i) => `${i + 1}. ${t}`).join("\n")}` : "",
    `Meta: ${post.metaDescription}`,
    post.intro ? `\nIntro:\n${post.intro}` : "",
    `\n${post.content}`,
  ].filter(Boolean).join("\n");

  const rendered = post.content
    ?.split("\n")
    .map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 8, color: "var(--text)" }}>{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} style={{ fontSize: 16, fontWeight: 700, marginTop: 16, marginBottom: 6, color: "var(--text)" }}>{line.slice(4)}</h3>;
      if (line.startsWith("- ")) return <li key={i} style={{ marginLeft: 20, color: "var(--text-muted)", marginBottom: 4, fontSize: 14 }}>{line.slice(2)}</li>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} style={{ fontWeight: 700, marginTop: 12, marginBottom: 4 }}>{line.slice(2, -2)}</p>;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 8, fontSize: 14 }}>{line}</p>;
    });

  return (
    <div>
      <div className="section-title">
        <span>✍️</span> SEO Blog Post
        <CopyButton text={fullText} label="Copy post" />
      </div>

      <div className="card">
        <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)", fontWeight: 600, marginBottom: 8 }}>Title</div>
          <div style={{ fontWeight: 800, fontSize: 20, lineHeight: 1.3 }}>{post.title}</div>
        </div>
        <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)", fontWeight: 600, marginBottom: 8 }}>Meta Description</div>
          <div style={{ color: "var(--text-muted)", fontSize: 14 }}>{post.metaDescription}</div>
        </div>

        {post.seoTitles?.length > 0 && (
          <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)", fontWeight: 600, marginBottom: 10 }}>SEO Title Variations</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {post.seoTitles.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", minWidth: 18 }}>{i + 1}.</span>
                  <span style={{ fontSize: 14, color: "var(--text)", flex: 1 }}>{t}</span>
                  <CopyButton text={t} />
                </div>
              ))}
            </div>
          </div>
        )}

        {post.intro && (
          <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)", fontWeight: 600, marginBottom: 8 }}>Blog Intro</div>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.8 }}>{post.intro}</p>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["rendered", "raw"].map((v) => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: `1px solid ${view === v ? "var(--accent)" : "var(--border)"}`,
              background: view === v ? "var(--accent-dim)" : "transparent",
              color: view === v ? "var(--accent-light)" : "var(--text-muted)",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              textTransform: "capitalize",
            }}>{v}</button>
          ))}
        </div>

        {view === "rendered" ? (
          <div>{rendered}</div>
        ) : (
          <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
            {post.content}
          </pre>
        )}
      </div>
    </div>
  );
}
