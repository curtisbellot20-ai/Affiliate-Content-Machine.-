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
    lines.push("");

    if (r) {
      lines.push("=== RESEARCH ===");
      lines.push(`Summary: ${r.summary}`);
      lines.push(`Demographic: ${r.targetDemographic}`);
      lines.push(`Pain Points: ${r.painPoints?.join(", ")}`);
      lines.push(`USPs: ${r.uniqueSellingPoints?.join(", ")}`);
      lines.push(`Competitor Gap: ${r.competitorGap}`);
      lines.push("");
    }

    campaign.videoScripts?.forEach((s, i) => {
      lines.push(`=== VIDEO SCRIPT ${i + 1}: ${s.title} ===`);
      lines.push(`Hook: ${s.hook}`);
      lines.push(`Body: ${s.body}`);
      lines.push(`CTA: ${s.cta}`);
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
      lines.push(`Meta: ${campaign.blogPost.metaDescription}`);
      lines.push("");
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
    }

    return lines.join("\n");
  }

  function buildMarkdown() {
    const text = buildText();
    return text.replace(/^=== (.+) ===/gm, "## $1");
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
