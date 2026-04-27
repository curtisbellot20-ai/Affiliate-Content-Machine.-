"use client";

export default function ExportButtons({ campaign }) {
  function buildText() {
    const lines = [];
    const p = campaign.product;
    const r = campaign.research;

    lines.push("=== AFFILIATE CONTENT MACHINE CAMPAIGN ===");
    lines.push(`Product: ${p?.title}`);
    lines.push(`URL: ${p?.url}`);
    lines.push(`Generated: ${new Date(campaign.meta?.generatedAt).toLocaleString()}`);
    if (campaign.meta?.platforms?.length) lines.push(`Platforms: ${campaign.meta.platforms.join(", ")}`);
    if (campaign.meta?.persona) lines.push(`Persona: ${campaign.meta.persona}`);
    lines.push("");

    if (r) {
      lines.push("=== RESEARCH ===");
      lines.push(`Summary: ${r.summary}`);
      lines.push(`Demographic: ${r.targetDemographic}`);
      lines.push(`Emotional Angle: ${r.emotionalAngle || ""}`);
      lines.push(`Pain Points: ${r.painPoints?.join(", ")}`);
      lines.push(`USPs: ${r.uniqueSellingPoints?.join(", ")}`);
      lines.push(`Competitor Gap: ${r.competitorGap}`);
      lines.push("");
    }

    if (campaign.hooks?.length) {
      lines.push("=== HOOKS ===");
      campaign.hooks.forEach((h, i) => lines.push(`${i + 1}. ${h}`));
      lines.push("");
    }

    if (campaign.ctas?.length) {
      lines.push("=== CTAs ===");
      campaign.ctas.forEach((c, i) => lines.push(`${i + 1}. ${c}`));
      lines.push("");
    }

    campaign.videoScripts?.forEach((s, i) => {
      lines.push(`=== VIDEO SCRIPT ${i + 1}: ${s.title} ===`);
      if (s.framework) lines.push(`Framework: ${s.framework}`);
      lines.push(`Hook: ${s.hook}`);
      if (s.problem) lines.push(`Problem: ${s.problem}`);
      if (s.solution) lines.push(`Solution: ${s.solution}`);
      if (s.proof) lines.push(`Proof: ${s.proof}`);
      if (s.voiceover || s.body) { lines.push(""); lines.push("Voiceover:"); lines.push(s.voiceover || s.body); }
      if (s.sceneDirection) lines.push(`Scene Direction: ${s.sceneDirection}`);
      if (s.onScreenText) lines.push(`On-Screen Text: ${s.onScreenText}`);
      if (s.caption) lines.push(`Caption: ${s.caption}`);
      lines.push(`CTA: ${s.cta}`);
      if (Array.isArray(s.hashtags)) lines.push(`Hashtags: ${s.hashtags.join(" ")}`);
      lines.push("");
    });

    campaign.pinterestPins?.forEach((pin, i) => {
      lines.push(`=== PINTEREST PIN ${i + 1} ===`);
      lines.push(`Title: ${pin.title}`);
      lines.push(`Description: ${pin.description}`);
      lines.push(`Board: ${pin.boardSuggestion}`);
      lines.push("");
    });

    campaign.influencerPrompts?.forEach((pr, i) => {
      lines.push(`=== INFLUENCER PROMPT ${i + 1}: ${pr.angle} ===`);
      lines.push(`Duration: ${pr.duration}`);
      lines.push(pr.script);
      lines.push("");
    });

    if (campaign.blogPost) {
      lines.push("=== BLOG POST ===");
      lines.push(`Title: ${campaign.blogPost.title}`);
      if (campaign.blogPost.seoTitles?.length) {
        lines.push(`SEO Titles: ${campaign.blogPost.seoTitles.join(" | ")}`);
      }
      lines.push(`Meta: ${campaign.blogPost.metaDescription}`);
      lines.push("");
      if (campaign.blogPost.intro) { lines.push("Intro:"); lines.push(campaign.blogPost.intro); lines.push(""); }
      lines.push(campaign.blogPost.content);
      lines.push("");
    }

    campaign.emails?.forEach((e, i) => {
      lines.push(`=== EMAIL ${i + 1} ===`);
      lines.push(`Subject: ${e.subject}`);
      lines.push(e.body);
      lines.push("");
    });

    campaign.sms?.forEach((msg, i) => {
      lines.push(`=== SMS ${i + 1} ===`);
      lines.push(msg);
      lines.push("");
    });

    if (campaign.captions) {
      lines.push("=== CAPTIONS ===");
      lines.push(`Instagram: ${campaign.captions.instagram}`);
      lines.push(`TikTok: ${campaign.captions.tiktok}`);
      lines.push(`X/Twitter: ${campaign.captions.twitter}`);
      lines.push(`Hashtags: ${campaign.captions.hashtags?.join(" ")}`);
      lines.push("");
    }

    if (campaign.landingPage) {
      lines.push("=== LANDING PAGE ===");
      lines.push(`Headline: ${campaign.landingPage.headline}`);
      lines.push(`Subheadline: ${campaign.landingPage.subheadline}`);
      lines.push("");
      lines.push("Headline Variations:");
      campaign.landingPage.headlines?.forEach((h, i) => lines.push(`${i + 1}. ${h}`));
      lines.push("");
      lines.push("Email Subject Lines:");
      const subjects = campaign.landingPage.emailSubjects || campaign.landingPage.emailSubjectLines || [];
      subjects.forEach((s, i) => lines.push(`${i + 1}. ${s}`));
      lines.push("");
    }

    return lines.join("\n");
  }

  function buildMarkdown() {
    return buildText().replace(/^=== (.+) ===/gm, "## $1");
  }

  function download(content, filename) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  const slug = (campaign.product?.title || "campaign").toLowerCase().replace(/\s+/g, "-").slice(0, 40);

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button className="btn btn-secondary" style={{ fontSize: 13 }} onClick={() => download(buildText(), `${slug}.txt`)}>
        ⬇ Export TXT
      </button>
      <button className="btn btn-secondary" style={{ fontSize: 13 }} onClick={() => download(buildMarkdown(), `${slug}.md`)}>
        ⬇ Export MD
      </button>
    </div>
  );
}
