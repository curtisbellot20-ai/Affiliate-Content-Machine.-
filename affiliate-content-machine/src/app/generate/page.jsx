"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GeneratePage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("conversational");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter an affiliate product URL.");
      return;
    }
    setError("");
    setLoading(true);
    setStatus("Scraping product page…");

    try {
      const scrapeRes = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const product = await scrapeRes.json();

      setStatus("Generating campaign content with AI…");

      const genRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, niche, audience, tone }),
      });
      const data = await genRes.json();

      if (!genRes.ok) throw new Error(data.error || "Generation failed");

      const campaign = { ...data, product, meta: { url, niche, audience, tone, generatedAt: Date.now() } };
      localStorage.setItem("acm_campaign", JSON.stringify(campaign));
      router.push("/results");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
      setStatus("");
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: "40px 0 80px" }}>
      <div className="container" style={{ maxWidth: 680 }}>
        <Link href="/" style={{ color: "var(--text-muted)", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32, textDecoration: "none" }}>
          ← Back
        </Link>

        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
            Create your campaign
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            Enter your affiliate product URL and a few details to generate 30+ pieces of content.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* URL */}
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
              Affiliate product URL <span style={{ color: "var(--accent-light)" }}>*</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/product"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text)",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Niche */}
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
              Niche / Category
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. fitness, beauty, home improvement"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text)",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Audience */}
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
              Target audience
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. women 25-45 who want to lose weight"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text)",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Tone */}
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
              Content tone
            </label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["conversational", "professional", "hype", "educational"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "var(--radius-sm)",
                    border: `1px solid ${tone === t ? "var(--accent)" : "var(--border)"}`,
                    background: tone === t ? "var(--accent-dim)" : "var(--bg-card)",
                    color: tone === t ? "var(--accent-light)" : "var(--text-muted)",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div style={{
              padding: "12px 16px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "var(--radius-sm)",
              color: "var(--red)",
              fontSize: 14,
            }}>
              {error}
            </div>
          )}

          {loading ? (
            <div style={{
              padding: "20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>⚡</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Generating your campaign…</div>
              <div style={{ color: "var(--text-muted)", fontSize: 14 }}>{status}</div>
            </div>
          ) : (
            <button type="submit" className="btn btn-primary" style={{ fontSize: 16, padding: "14px 32px", alignSelf: "flex-start" }}>
              Generate campaign →
            </button>
          )}
        </form>
      </div>
    </main>
  );
}
