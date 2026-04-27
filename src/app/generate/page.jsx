"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PLATFORMS, PERSONAS, TONES } from "@/lib/constants";

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  color: "var(--text)",
  outline: "none",
  transition: "border-color 0.15s",
};

function SelectorLabel({ children }) {
  return (
    <label style={{ display: "block", fontWeight: 600, marginBottom: 10, fontSize: 14 }}>
      {children}
    </label>
  );
}

function ChipGroup({ options, value, onChange, multi = false }) {
  function isActive(opt) {
    return multi ? (value || []).includes(opt) : value === opt;
  }
  function toggle(opt) {
    if (multi) {
      const cur = value || [];
      onChange(cur.includes(opt) ? cur.filter((v) => v !== opt) : [...cur, opt]);
    } else {
      onChange(opt);
    }
  }
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--radius-sm)",
            border: `1px solid ${isActive(opt) ? "var(--accent)" : "var(--border)"}`,
            background: isActive(opt) ? "var(--accent-dim)" : "var(--bg-card)",
            color: isActive(opt) ? "var(--accent-light)" : "var(--text-muted)",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function GenerateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [url, setUrl] = useState("");
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Conversational");
  const [platforms, setPlatforms] = useState(["TikTok"]);
  const [persona, setPersona] = useState("Best Friend");
  const [extraImages, setExtraImages] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [preScraped, setPreScraped] = useState(null);

  useEffect(() => {
    const encoded = searchParams.get("product");
    if (!encoded) return;
    try {
      const json = decodeURIComponent(escape(atob(encoded)));
      const product = JSON.parse(json);
      setPreScraped(product);
      if (product.url) setUrl(product.url);
    } catch {
      setError("Could not load product data from extension. Please enter the URL manually.");
    }
  }, [searchParams]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!url.trim() && !preScraped) {
      setError("Please enter an affiliate product URL.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      let product = preScraped;

      if (!product) {
        setStatus("Scraping product page…");
        const scrapeRes = await fetch("/api/scrape", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: url.trim() }),
        });
        product = await scrapeRes.json();
      } else {
        setStatus("Using product data from Chrome extension…");
      }

      if (extraImages.trim()) {
        const manualImgs = extraImages.split("\n").map((s) => s.trim()).filter(Boolean);
        product.images = [...new Set([...(product.images || []), ...manualImgs])].slice(0, 12);
        product.image = product.image || manualImgs[0];
      }

      setStatus("Generating campaign with AI…");

      const genRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, niche, audience, tone, platforms, persona }),
      });
      const data = await genRes.json();
      if (!genRes.ok) throw new Error(data.error || "Generation failed");

      const campaign = {
        ...data,
        product,
        meta: { url: product.url || url, niche, audience, tone, platforms, persona, generatedAt: Date.now() },
      };
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
      <div className="container" style={{ maxWidth: 720 }}>
        <Link href="/" style={{ color: "var(--text-muted)", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32, textDecoration: "none" }}>
          ← Back
        </Link>

        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>
            Create your campaign
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            Paste an affiliate link, choose your platform and persona, and generate a complete content pack.
          </p>
        </div>

        {preScraped && (
          <div style={{ padding: "12px 16px", background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.35)", borderRadius: "var(--radius-sm)", marginBottom: 24, display: "flex", alignItems: "flex-start", gap: 12 }}>
            {preScraped.images?.[0] && (
              <img src={preScraped.images[0]} alt="product" style={{ width: 52, height: 52, objectFit: "contain", borderRadius: 6, background: "#fff", flexShrink: 0 }} />
            )}
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>⚡ Product loaded from Chrome extension</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.4 }}>
                {preScraped.title?.slice(0, 90)}{preScraped.title?.length > 90 ? "…" : ""}
              </div>
              <div style={{ fontSize: 12, color: "var(--accent-light)", marginTop: 4 }}>
                {preScraped.images?.length || 0} images · {preScraped.price || "price not found"} · {preScraped.reviews?.length || 0} reviews
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>

          {/* URL */}
          {!preScraped ? (
            <div>
              <SelectorLabel>Affiliate product URL <span style={{ color: "var(--accent-light)" }}>*</span></SelectorLabel>
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/product" required style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
            </div>
          ) : (
            <div>
              <SelectorLabel>Product URL</SelectorLabel>
              <div style={{ ...inputStyle, color: "var(--text-muted)", fontSize: 13, wordBreak: "break-all" }}>{url || preScraped.url}</div>
            </div>
          )}

          {/* Platform */}
          <div>
            <SelectorLabel>Platform <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: 13 }}>(select all that apply)</span></SelectorLabel>
            <ChipGroup options={PLATFORMS} value={platforms} onChange={setPlatforms} multi />
          </div>

          {/* Persona */}
          <div>
            <SelectorLabel>Influencer Persona</SelectorLabel>
            <ChipGroup options={PERSONAS} value={persona} onChange={setPersona} />
          </div>

          {/* Tone */}
          <div>
            <SelectorLabel>Content Tone</SelectorLabel>
            <ChipGroup options={TONES} value={tone} onChange={setTone} />
          </div>

          {/* Niche */}
          <div>
            <SelectorLabel>Niche / Category <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></SelectorLabel>
            <input type="text" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="e.g. fitness, beauty, home improvement" style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
          </div>

          {/* Audience */}
          <div>
            <SelectorLabel>Target Audience <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></SelectorLabel>
            <input type="text" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. women 25-45 who want to lose weight" style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
          </div>

          {/* Extra images */}
          <div>
            <SelectorLabel>Extra product image URLs <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></SelectorLabel>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
              {preScraped
                ? `${preScraped.images?.length || 0} images already loaded from extension. Add more here if needed.`
                : "One URL per line. Or use the Chrome extension for automatic image scraping."}
            </p>
            <textarea value={extraImages} onChange={(e) => setExtraImages(e.target.value)}
              placeholder={"https://example.com/image1.jpg\nhttps://example.com/image2.jpg"}
              rows={3}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: 12, lineHeight: 1.6 }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
          </div>

          {error && (
            <div style={{ padding: "12px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "var(--radius-sm)", color: "var(--red)", fontSize: 14 }}>
              {error}
            </div>
          )}

          {loading ? (
            <div style={{ padding: "20px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", textAlign: "center" }}>
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

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--text-muted)" }}>Loading…</div>
      </main>
    }>
      <GenerateForm />
    </Suspense>
  );
}
