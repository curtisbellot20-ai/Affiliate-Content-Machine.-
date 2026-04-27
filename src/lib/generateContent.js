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
- pinterestPins: exactly 5 pins
- influencerPrompts: exactly 5 prompts
- emails: exactly 3 emails
- sms: exactly 3 messages
- Tone: ${tone}
- Use "AFFILIATE_LINK" as placeholder for the affiliate URL
- Make all content specific to this product, not generic

CRITICAL — VIDEO SCRIPTS: Write exactly 10 scripts. They must be STRUCTURALLY different — different sentence patterns, different formats, not just different topics. Follow these exact formats for each:

Script 1 — Problem/Solution
  title: "Problem/Solution: [specific problem]"
  hook: A direct frustrated question or relatable complaint. e.g. "Still dealing with [specific problem]? There's finally a fix."
  body: Name the exact problem → introduce the product as the answer → give ONE specific before/after result. Prose format.
  cta: Action-focused, references fixing the problem.

Script 2 — Unboxing/First Impression
  title: "Unboxing: My First Reaction"
  hook: First-person excitement of receiving it. e.g. "My [product] just arrived and I am obsessed."
  body: Describe what's in the packaging, the first thing you notice, and one immediate wow moment. First-person present tense.
  cta: "Get yours — link in bio."

Script 3 — Before & After
  title: "Before & After: [result]"
  hook: Two-line contrast — "Before [product]: [negative state]. After: [positive state]."
  body: Paint the before picture with 2 specific details, then the after with 2 specific improvements. Use vivid contrast.
  cta: Transformation-focused CTA.

Script 4 — Top 5 Reasons
  title: "Top 5 Reasons to Get [product]"
  hook: "5 reasons [product] is the only [category] you'll ever need:"
  body: NUMBERED LIST FORMAT — write exactly: "1. [reason + detail]. 2. [reason + detail]. 3. [reason + detail]. 4. [reason + detail]. 5. [reason + detail]."
  cta: "Which reason got you? Link in bio."

Script 5 — Personal Story
  title: "My Honest Story with [product]"
  hook: "Real talk — here's what actually happened when I started using [product]."
  body: First-person narrative with a specific moment or turning point, an emotional beat, and a tangible result. Use customer review language if reviews were provided.
  cta: "Don't wait like I did — link in bio."

Script 6 — Comparison
  title: "[Old way] vs [product]: No Contest"
  hook: "[Old solution] vs [product] — I'm never going back."
  body: At least 2 side-by-side comparisons using "Old way: ... New way: ..." or "Before: ... Now: ..." structure. Include cost, time, or effort angle.
  cta: "Make the switch — link in bio."

Script 7 — Tutorial / How-To
  title: "How to Get [result] with [product]"
  hook: "Here's exactly how I use [product] to get [specific result] every single time:"
  body: STEP FORMAT — write exactly: "Step 1: [action]. Step 2: [action]. Step 3: [action]. That's it."
  cta: "Try it yourself — link in bio."

Script 8 — Testimonial
  title: "What Customers Are Saying About [product]"
  hook: An actual customer quote in quotation marks — use real review text if provided, otherwise write a realistic paraphrased quote.
  body: Validate the quote with a second detail, mention star rating if available, add one more customer result.
  cta: "Join them — link in bio."

Script 9 — FOMO / Urgency
  title: "Why Everyone Is Talking About [product]"
  hook: Social pressure opener. e.g. "Everyone in [niche] is getting [product] and I finally understand why."
  body: Why it's trending right now, what you're missing by waiting, social proof angle with numbers or viral framing.
  cta: "Don't be the last to know — link in bio."

Script 10 — Myth-Busting
  title: "The Biggest Myth About [niche/product]"
  hook: State a common WRONG belief as a myth. e.g. "Everyone thinks [myth] — but that's completely wrong."
  body: "The truth is…" — debunk the myth with a specific fact or result, position the product as the proof.
  cta: "Get the truth — and the product — link in bio."

Each script title must clearly reflect its angle. Hooks must NOT all start with "I" or all be questions — vary the sentence structure.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 16000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].text.trim();
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
  return parsed;
}
