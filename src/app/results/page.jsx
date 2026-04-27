"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductResearchCard from "@/components/ProductResearchCard";
import VideoScriptsSection from "@/components/VideoScriptsSection";
import PinterestPinsSection from "@/components/PinterestPinsSection";
import InfluencerVideoPromptsSection from "@/components/InfluencerVideoPromptsSection";
import BlogPostSection from "@/components/BlogPostSection";
import EmailSmsSection from "@/components/EmailSmsSection";
import CaptionsHashtagsSection from "@/components/CaptionsHashtagsSection";
import HooksSection from "@/components/HooksSection";
import CTAsSection from "@/components/CTAsSection";
import LandingPageSection from "@/components/LandingPageSection";
import ExportButtons from "@/components/ExportButtons";

const NAV_ITEMS = [
  { id: "research", label: "Research", icon: "🔍" },
  { id: "hooks", label: "Hooks & CTAs", icon: "🎣" },
  { id: "videos", label: "Scripts", icon: "🎬" },
  { id: "pinterest", label: "Pinterest", icon: "📌" },
  { id: "influencer", label: "Influencer", icon: "🎥" },
  { id: "blog", label: "Blog Post", icon: "✍️" },
  { id: "email", label: "Email & SMS", icon: "📧" },
  { id: "captions", label: "Captions", icon: "📱" },
  { id: "landing", label: "Landing Page", icon: "🚀" },
];

export default function ResultsPage() {
  const [campaign, setCampaign] = useState(null);
  const [activeSection, setActiveSection] = useState("research");

  useEffect(() => {
    const stored = localStorage.getItem("acm_campaign");
    if (stored) setCampaign(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [campaign]);

  function handleScriptUpdate(index, newScript) {
    setCampaign((prev) => {
      const updated = { ...prev, videoScripts: [...prev.videoScripts] };
      updated.videoScripts[index] = newScript;
      localStorage.setItem("acm_campaign", JSON.stringify(updated));
      return updated;
    });
  }

  if (!campaign) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ fontSize: 48 }}>🤔</div>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>No campaign found</h1>
        <p style={{ color: "var(--text-muted)" }}>Generate a campaign first to see your results.</p>
        <Link href="/generate" className="btn btn-primary" style={{ textDecoration: "none", marginTop: 8 }}>Generate campaign →</Link>
      </main>
    );
  }

  const meta = campaign.meta || {};

  return (
    <main style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sticky side nav */}
      <aside style={{ width: 220, flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto", borderRight: "1px solid var(--border)", padding: "32px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, textDecoration: "none", color: "var(--text)" }}>
          <span style={{ fontSize: 18 }}>⚡</span>
          <span style={{ fontWeight: 800, fontSize: 14 }}>ACM</span>
        </Link>
        {NAV_ITEMS.map(({ id, label, icon }) => (
          <a key={id} href={`#${id}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 500, textDecoration: "none", background: activeSection === id ? "var(--accent-dim)" : "transparent", color: activeSection === id ? "var(--accent-light)" : "var(--text-muted)", border: `1px solid ${activeSection === id ? "rgba(108,99,255,0.3)" : "transparent"}`, transition: "all 0.15s" }}>
            <span>{icon}</span><span>{label}</span>
          </a>
        ))}
        {(meta.platforms?.length || meta.persona) && (
          <div style={{ marginTop: 16, padding: "10px 12px", background: "var(--bg-card)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
            {meta.platforms?.length > 0 && (
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>{meta.platforms.join(", ")}</div>
            )}
            {meta.persona && (
              <div style={{ fontSize: 11, color: "var(--accent-light)", fontWeight: 600 }}>{meta.persona}</div>
            )}
          </div>
        )}
        <div style={{ marginTop: "auto", paddingTop: 16 }}>
          <Link href="/generate" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 13, width: "100%", justifyContent: "center" }}>
            + New campaign
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div style={{ flex: 1, overflowX: "hidden" }}>
        <div style={{ padding: "32px 40px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{campaign.product?.title || "Campaign Results"}</h1>
            <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
              Generated {meta.generatedAt ? new Date(meta.generatedAt).toLocaleString() : ""}
              {meta.tone && <span style={{ marginLeft: 8, padding: "2px 8px", background: "var(--accent-dim)", color: "var(--accent-light)", borderRadius: 4, fontSize: 12 }}>{meta.tone}</span>}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <ExportButtons campaign={campaign} />
            <Link href="/video" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 13 }}>🎬 Make Video</Link>
          </div>
        </div>

        <div style={{ padding: "0 40px 80px" }}>
          <section id="research" style={{ paddingTop: 48 }}>
            <ProductResearchCard product={campaign.product} research={campaign.research} />
          </section>

          <section id="hooks" style={{ paddingTop: 64 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <HooksSection hooks={campaign.hooks} />
              <CTAsSection ctas={campaign.ctas} />
            </div>
          </section>

          <section id="videos" style={{ paddingTop: 64 }}>
            <VideoScriptsSection
              scripts={campaign.videoScripts}
              meta={{ ...meta, product: campaign.product }}
              onScriptUpdate={handleScriptUpdate}
            />
          </section>

          <section id="pinterest" style={{ paddingTop: 64 }}>
            <PinterestPinsSection pins={campaign.pinterestPins} productImage={campaign.product?.images?.[0] || campaign.product?.image} />
          </section>

          <section id="influencer" style={{ paddingTop: 64 }}>
            <InfluencerVideoPromptsSection prompts={campaign.influencerPrompts} />
          </section>

          <section id="blog" style={{ paddingTop: 64 }}>
            <BlogPostSection post={campaign.blogPost} />
          </section>

          <section id="email" style={{ paddingTop: 64 }}>
            <EmailSmsSection emails={campaign.emails} sms={campaign.sms} />
          </section>

          <section id="captions" style={{ paddingTop: 64 }}>
            <CaptionsHashtagsSection captions={campaign.captions} productImage={campaign.product?.images?.[0] || campaign.product?.image} />
          </section>

          <section id="landing" style={{ paddingTop: 64 }}>
            <LandingPageSection landingPage={campaign.landingPage} />
          </section>
        </div>
      </div>
    </main>
  );
}
