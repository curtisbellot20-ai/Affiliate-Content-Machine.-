const FALLBACK = {
  research: {
    summary: "This product solves a common pain point for its target audience. Key selling points include quality construction, competitive pricing, and strong social proof.",
    targetDemographic: "Adults aged 25-45 seeking practical solutions",
    painPoints: ["Time constraints", "Budget concerns", "Decision fatigue"],
    uniqueSellingPoints: ["High quality at an accessible price", "Easy to use", "Trusted by thousands"],
    competitorGap: "Competitors lack the combination of affordability and quality this product delivers.",
  },
  videoScripts: Array.from({ length: 10 }, (_, i) => ({
    title: `Video Script ${i + 1}`,
    hook: `Hook ${i + 1}: This one thing changed everything for me…`,
    body: `Body: I was struggling with [problem] until I found this product. Here's what happened when I tried it for the first time. [Key benefit]. [Social proof]. [Call to action].`,
    cta: "Link in bio — grab yours before they sell out.",
  })),
  pinterestPins: Array.from({ length: 5 }, (_, i) => ({
    title: `Pin Title ${i + 1}: The Secret to [Result]`,
    description: `Discover how this product helps you achieve [result] without [common obstacle]. Perfect for anyone who wants [benefit]. Save this pin for later!`,
    boardSuggestion: "Best Products for [Niche]",
  })),
  influencerPrompts: Array.from({ length: 5 }, (_, i) => ({
    angle: `Angle ${i + 1}: Day-in-the-life`,
    script: `Show your morning routine featuring the product. Walk through how it fits into your daily life and the specific benefit you get from it. End with an honest recommendation.`,
    duration: "30-60 seconds",
  })),
  blogPost: {
    title: "The Complete Guide to [Product]: Everything You Need to Know Before You Buy",
    metaDescription: "Thinking about buying [product]? Read our in-depth review covering features, pros, cons, and whether it's worth your money.",
    content: `## Introduction\n\nFinding the right product can be overwhelming. In this guide, we break down everything you need to know.\n\n## Key Features\n\n- Feature one with explanation\n- Feature two with explanation\n- Feature three with explanation\n\n## Who Is This For?\n\nThis product is ideal for people who [description].\n\n## Pros and Cons\n\n**Pros:**\n- High quality\n- Great value\n- Easy to use\n\n**Cons:**\n- May not suit everyone\n\n## FAQs\n\n**Q: Is it worth the price?**\nA: Yes, especially given the quality.\n\n## Final Verdict\n\nThis product delivers on its promises. If you're in the market, it's well worth considering.\n\n[Get it here →](AFFILIATE_LINK)`,
  },
  emails: [
    { subject: "Have you heard about this?", body: "Hey [Name],\n\nI came across something you might love…\n\n[Product name] has been getting incredible reviews and I wanted to make sure you knew about it.\n\nHere's why I think it's perfect for you: [reason].\n\n→ Check it out here: AFFILIATE_LINK\n\nLet me know what you think!\n\n[Your name]" },
    { subject: "Still thinking about it?", body: "Hey [Name],\n\nJust wanted to follow up on [product]. A few things worth knowing:\n\n✓ [Benefit 1]\n✓ [Benefit 2]\n✓ [Benefit 3]\n\nIf you've been on the fence, this might help make the decision easier.\n\n→ AFFILIATE_LINK\n\n[Your name]" },
    { subject: "Last chance (don't miss this)", body: "Hey [Name],\n\nLast reminder — if you've been thinking about [product], now's the time.\n\n[Urgency reason or offer].\n\n→ Grab it here: AFFILIATE_LINK\n\nHope this helps!\n[Your name]" },
  ],
  sms: [
    "Hey! Found something you'll love → AFFILIATE_LINK — [product name]. Check it out!",
    "Still thinking about [product]? Here's the link: AFFILIATE_LINK. Worth it!",
    "Last heads up on [product] — AFFILIATE_LINK. You'll thank me later!",
  ],
  captions: {
    instagram: "🙌 I can't stop talking about [product]. If you're looking for [benefit], this is it. Link in bio! #[niche] #[product] #recommendation",
    tiktok: "POV: you finally found [product] and your life changes 👇 [benefit]. Get the link in my bio!",
    twitter: "If you haven't tried [product] yet, what are you waiting for? Honestly game-changing for [use case]. → AFFILIATE_LINK",
    hashtags: ["#[niche]", "#affiliate", "#productreview", "#recommendation", "#[benefit]", "#musthave", "#review", "#[audience]"],
  },
};

export async function generateContent({ product, niche, audience, tone }) {
  if (!process.env.ANTHROPIC_API_KEY) return FALLBACK;

  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const reviewsText = (product?.reviews || []).length > 0
    ? (product.reviews).map((r, i) =>
        `Review ${i + 1}${r.rating ? ` (${r.rating}★)` : ""}${r.title ? ` — "${r.title}"` : ""}:\n"${r.text}"`
      ).join("\n\n")
    : "No reviews available.";

  const productContext = `
Product Title: ${product?.title || "Unknown Product"}
Description: ${product?.description || ""}
Price: ${product?.price || ""}
URL: ${product?.url || ""}
Page content excerpt: ${product?.body?.slice(0, 1500) || ""}
Niche: ${niche || "general"}
Target Audience: ${audience || "general consumers"}
Content Tone: ${tone || "conversational"}

Customer Reviews:
${reviewsText}
`.trim();

  const prompt = `You are an expert affiliate marketer and content strategist. Based on the product details below, generate a complete affiliate content campaign.

${productContext}

Return a valid JSON object (no markdown, no code fences) with EXACTLY this structure:
{
  "research": {
    "summary": "2-3 sentence product summary",
    "targetDemographic": "who this is for",
    "painPoints": ["pain1", "pain2", "pain3"],
    "uniqueSellingPoints": ["usp1", "usp2", "usp3"],
    "competitorGap": "what competitors lack"
  },
  "videoScripts": [
    { "title": "Script title", "hook": "Opening hook (1-2 sentences)", "body": "Main content (3-5 sentences)", "cta": "Call to action" }
  ],
  "pinterestPins": [
    { "title": "Pin title", "description": "Pin description (2-3 sentences)", "boardSuggestion": "Board name" }
  ],
  "influencerPrompts": [
    { "angle": "Content angle", "script": "What to say/do", "duration": "Suggested length" }
  ],
  "blogPost": {
    "title": "SEO blog post title",
    "metaDescription": "Meta description under 155 chars",
    "content": "Full blog post in markdown with H2 headers, at least 1000 words, including intro, features, pros/cons, FAQ, and conclusion with affiliate link placeholder AFFILIATE_LINK"
  },
  "emails": [
    { "subject": "Email subject", "body": "Full email body with personalization placeholders" }
  ],
  "sms": ["SMS message 1", "SMS message 2", "SMS message 3"],
  "captions": {
    "instagram": "Instagram caption with emojis and hashtags",
    "tiktok": "TikTok caption",
    "twitter": "Tweet under 280 chars",
    "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8"]
  }
}

Requirements:
- videoScripts: exactly 10 scripts, each using a DIFFERENT angle in this order:
  1. Problem/Solution — open with a relatable pain point the product solves
  2. Unboxing/First Impression — excitement of receiving and opening it
  3. Before & After — transformation story, life before vs after using it
  4. Top 5 Reasons — listicle format, "5 reasons you need this"
  5. Personal Story — narrative of how the product fit into daily life
  6. Comparison — this product vs common alternatives or old way of doing things
  7. Tutorial/How-To — step-by-step walkthrough of using it
  8. Testimonial-style — based on real customer reviews if provided; quote specific results or phrases from them
  9. FOMO/Urgency — trending, selling fast, or limited availability angle
  10. Myth-busting — correct a common misconception about the product or niche
  Each script must have a unique title reflecting its angle. No two scripts should share the same hook, body, or structure.
  Scripts 5 (Personal Story) and 8 (Testimonial) MUST borrow specific language, results, or details from the Customer Reviews if any are provided.
- pinterestPins: exactly 5 pins
- influencerPrompts: exactly 5 prompts
- emails: exactly 3 emails
- sms: exactly 3 messages
- Tone: ${tone}
- Use "AFFILIATE_LINK" as placeholder for the affiliate URL
- Make all content specific to this product, not generic`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].text.trim();
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
  return parsed;
}
