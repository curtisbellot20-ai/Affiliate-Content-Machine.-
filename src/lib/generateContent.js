const FRAMEWORKS = [
  "I Wish I Knew This Sooner",
  "Stop Doing This",
  "3 Things Nobody Tells You",
  "POV Hook",
  "Before vs After",
  "I Tested It So You Don't Have To",
  "Hidden Gem",
  "Don't Buy Until You See This",
  "This Feels Illegal",
  "You're Making This Mistake",
  "What Nobody Shows You",
  "Quick Hack",
  "I Tried Everything",
  "This Shouldn't Work But It Does",
  "If You're Lazy Like Me",
  "The Shortcut",
  "Real Talk",
  "This Changed My Routine",
  "I Almost Gatekept This",
  "Warning",
  "This Is Why You're Stuck",
  "Underrated",
  "Simple Upgrade",
  "Take This As A Sign",
  "You Don't Need More Info",
];

const PERSONA_VOICES = {
  "Best Friend": "casual, warm, enthusiastic — like texting a friend: 'omg you HAVE to try this'",
  "Trusted Expert": "authoritative, knowledgeable, builds credibility first before recommending",
  "Honest Reviewer": "balanced and transparent — 'I was skeptical at first, here's what I actually found'",
  "Lifestyle Creator": "aspirational, aesthetic-focused — 'this just fits the vibe'",
  "AI Influencer": "futuristic, tech-savvy, efficiency-obsessed — 'I tested 47 options so you don't have to'",
  "Finance Creator": "ROI-focused — always mentions cost vs value, savings angle",
  "Anime/Gaming Creator": "pop-culture references, level-up framing — 'this is literally a power-up'",
};

const PLATFORM_NOTES = {
  "TikTok": "15-60 seconds, hook in first 1-2 seconds, fast-paced, trending language, scene changes",
  "Instagram Reels": "aesthetic feel, slightly longer hook, 15-90 seconds, lifestyle-focused",
  "YouTube Shorts": "more informative, can be 60 seconds, strong visual hook, clear value proposition",
  "Blog": "SEO-friendly long-form, headers, persuasive copy, 500-800 word voiceover/body",
  "Pinterest": "visual-first, save-worthy, aspirational, keyword-rich descriptions",
  "Email": "subject line focus, personalized opener, scannable body, single clear CTA",
  "Landing Page": "headline-driven, benefit bullets, social proof, urgency, conversion-focused",
};

const FALLBACK = {
  research: {
    summary: "This product solves a common pain point for its target audience.",
    targetDemographic: "Adults aged 25-45 seeking practical solutions",
    painPoints: ["Time constraints", "Budget concerns", "Decision fatigue"],
    uniqueSellingPoints: ["High quality at an accessible price", "Easy to use", "Trusted by thousands"],
    competitorGap: "Competitors lack the combination of affordability and quality this product delivers.",
    emotionalAngle: "The desire to finally solve a frustrating problem without wasting more money.",
  },
  hooks: Array.from({ length: 10 }, (_, i) => `Hook ${i + 1}: This one thing changed everything for me…`),
  ctas: Array.from({ length: 10 }, (_, i) => `CTA ${i + 1}: Check it out through the link in bio.`),
  videoScripts: Array.from({ length: 10 }, (_, i) => ({
    title: `Script ${i + 1}`,
    framework: FRAMEWORKS[i],
    hook: `Hook: This one thing changed everything for me…`,
    problem: "The problem is [pain point] is frustrating and wastes your time.",
    solution: "Then I found this product and it changed everything.",
    proof: "Here's what actually happened when I tried it for the first time.",
    voiceover: "Full voiceover script goes here. This is what you'd say on camera.",
    sceneDirection: "Show yourself at your desk or in a lifestyle setting. Zoom into the product.",
    onScreenText: "Text overlay goes here.",
    caption: "Caption for this post. #niche #affiliate",
    cta: "Link in bio — grab yours today.",
    hashtags: ["#lifehack", "#affiliate", "#productreview"],
  })),
  pinterestPins: Array.from({ length: 5 }, (_, i) => ({
    title: `Pin ${i + 1}: The Secret to [Result]`,
    description: "Discover how this product helps you achieve [result]. Save this pin!",
    boardSuggestion: "Best Products for [Niche]",
  })),
  influencerPrompts: Array.from({ length: 5 }, (_, i) => ({
    angle: `Angle ${i + 1}: Day-in-the-life`,
    script: "Show your morning routine featuring the product.",
    duration: "30-60 seconds",
  })),
  blogPost: {
    title: "The Complete Guide to [Product]",
    seoTitles: ["Best [Product] Review", "Is [Product] Worth It?", "Top [Product] Alternatives"],
    metaDescription: "Thinking about buying [product]? Read our honest review.",
    intro: "Finding the right product can be overwhelming. Here's everything you need to know.",
    content: "## Introduction\n\nFull blog post content here.\n\n[Get it here →](AFFILIATE_LINK)",
  },
  emails: [
    { subject: "Have you heard about this?", body: "Hey [Name],\n\nI found something you'll love...\n\n→ AFFILIATE_LINK\n\n[Your name]" },
    { subject: "Still thinking about it?", body: "Hey [Name],\n\nJust a follow up...\n\n→ AFFILIATE_LINK\n\n[Your name]" },
    { subject: "Last chance", body: "Hey [Name],\n\nLast reminder...\n\n→ AFFILIATE_LINK\n\n[Your name]" },
  ],
  sms: [
    "Hey! Found something you'll love → AFFILIATE_LINK",
    "Still thinking about it? Here's the link: AFFILIATE_LINK",
    "Last heads up → AFFILIATE_LINK. You'll thank me later!",
  ],
  captions: {
    instagram: "🙌 I can't stop talking about this. Link in bio! #affiliate #productreview",
    tiktok: "POV: you finally found the thing that actually works 👇",
    twitter: "If you haven't tried this yet, what are you waiting for? → AFFILIATE_LINK",
    hashtags: ["#affiliate", "#productreview", "#recommendation", "#musthave"],
  },
  landingPage: {
    headline: "Finally — A [Product] That Actually Works",
    subheadline: "Join thousands of people who solved [problem] with [product].",
    headlines: [
      "Stop Wasting Money on [Problem] — This Actually Works",
      "The [Product] Everyone Is Talking About",
      "Finally Found Something That Fixes [Problem]",
      "[Number] People Can't Be Wrong About This",
      "Your [Problem] Ends Here",
    ],
    emailSubjects: [
      "I wasn't going to share this, but…",
      "The [product] that changed everything for me",
      "Have you tried this yet?",
      "Why everyone in [niche] is obsessed with this",
      "This is the last [product] you'll ever need",
    ],
  },
};

export async function generateContent({ product, niche, audience, tone, platforms, persona }) {
  if (!process.env.ANTHROPIC_API_KEY) return FALLBACK;

  const { getAnthropicClient } = await import("@/lib/anthropicClient");
  const client = await getAnthropicClient();

  const reviewsText = (product?.reviews || []).length > 0
    ? product.reviews.map((r, i) =>
        `Review ${i + 1}${r.rating ? ` (${r.rating}★)` : ""}${r.title ? ` — "${r.title}"` : ""}:\n"${r.text}"`
      ).join("\n\n")
    : "No reviews available.";

  // platforms is an array; use first entry as primary platform for script style
  const platformList = Array.isArray(platforms) && platforms.length > 0 ? platforms : ["TikTok"];
  const selectedPlatform = platformList[0];
  const selectedPersona = persona || "Best Friend";
  const selectedTone = tone || "Conversational";

  const productContext = `
Product Title: ${product?.title || "Unknown Product"}
Description: ${product?.description || ""}
Price: ${product?.price || ""}
URL: ${product?.url || ""}
Page content excerpt: ${product?.body?.slice(0, 1500) || ""}
Niche: ${niche || "general"}
Target Audience: ${audience || "general consumers"}
Primary Platform: ${selectedPlatform} — ${PLATFORM_NOTES[selectedPlatform] || ""}
All Platforms: ${platformList.join(", ")}
Influencer Persona: ${selectedPersona} — voice style: ${PERSONA_VOICES[selectedPersona] || "authentic and relatable"}
Content Tone: ${selectedTone}

Customer Reviews:
${reviewsText}
`.trim();

  const prompt = `You are an elite affiliate marketing copywriter and viral content strategist. Your job is to turn affiliate links into high-converting scripts that get clicks, attention, and sales.

${productContext}

Affiliate Disclosure to include where relevant: "Disclosure: This post may contain affiliate links. I may earn a commission if you buy through my link."

IMPORTANT VOICE RULES:
- Every script must sound like the "${selectedPersona}" persona. ${PERSONA_VOICES[selectedPersona] || ""}
- Tone must be: ${selectedTone}
- Primary platform: ${selectedPlatform} — ${PLATFORM_NOTES[selectedPlatform] || ""}
- All selected platforms: ${platformList.join(", ")} — make content feel native to these platforms
- Never say "guaranteed results", "you will definitely make money", "this cures", or "best in the world"
- Keep scripts natural and human — not robotic or salesy

Return a valid JSON object (no markdown, no code fences) with EXACTLY this structure:
{
  "research": {
    "summary": "2-3 sentence product summary",
    "targetDemographic": "who this is for",
    "painPoints": ["pain1", "pain2", "pain3", "pain4"],
    "uniqueSellingPoints": ["usp1", "usp2", "usp3", "usp4"],
    "competitorGap": "what competitors lack",
    "emotionalAngle": "the core emotional reason someone buys this"
  },
  "hooks": ["hook1", "hook2", "hook3", "hook4", "hook5", "hook6", "hook7", "hook8", "hook9", "hook10"],
  "ctas": ["cta1", "cta2", "cta3", "cta4", "cta5", "cta6", "cta7", "cta8", "cta9", "cta10"],
  "videoScripts": [
    {
      "title": "script title",
      "framework": "framework name",
      "hook": "attention-grabbing opener (1-2 sentences)",
      "problem": "the pain point this addresses",
      "solution": "how the product solves it",
      "proof": "why it works / results / social proof",
      "voiceover": "the complete spoken script from start to finish",
      "sceneDirection": "what to film, show, or do on camera",
      "onScreenText": "text overlays to display",
      "caption": "social media caption with emojis",
      "cta": "call to action",
      "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
    }
  ],
  "pinterestPins": [
    { "title": "pin title", "description": "pin description", "boardSuggestion": "board name" }
  ],
  "influencerPrompts": [
    { "angle": "content angle", "script": "what to say/do", "duration": "length" }
  ],
  "blogPost": {
    "title": "SEO blog post title",
    "seoTitles": ["seo title 1", "seo title 2", "seo title 3"],
    "metaDescription": "meta description under 155 chars",
    "intro": "compelling blog intro paragraph (150-200 words)",
    "content": "full blog post in markdown, 1000+ words, H2 headers, pros/cons, FAQ, affiliate disclosure, AFFILIATE_LINK placeholder"
  },
  "emails": [
    { "subject": "email subject", "body": "full email body" }
  ],
  "sms": ["sms1", "sms2", "sms3"],
  "captions": {
    "instagram": "instagram caption",
    "tiktok": "tiktok caption",
    "twitter": "tweet under 280 chars",
    "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8"]
  },
  "landingPage": {
    "headline": "primary headline",
    "subheadline": "supporting subheadline",
    "headlines": ["headline1", "headline2", "headline3", "headline4", "headline5"],
    "emailSubjects": ["subject1", "subject2", "subject3", "subject4", "subject5"]
  }
}

REQUIREMENTS:

HOOKS — generate exactly 10. Each hook must be product-specific and use the forced angle below. No two hooks may share a similar opening structure.
Hook 1 — Question angle: Open with a direct question to the target audience about their frustration or desire related to this product. Must name or clearly reference the product category.
Hook 2 — Confession angle: Start with "I'll be honest —" then share a personal admission about the niche or a past mistake before this product.
Hook 3 — Number/stat angle: Open with a specific number or statistic (real or illustrative) tied to the product's benefit or the problem it solves.
Hook 4 — Problem callout angle: Start with "The problem with most [product category]..." and name the exact flaw this product fixes.
Hook 5 — POV angle: Start with "POV: You just discovered" followed by a vivid scenario of using this specific product.
Hook 6 — Secret/hidden angle: Start with "Nobody is talking about" followed by a specific lesser-known benefit or use case of this product.
Hook 7 — Before/after tease angle: Open with a one-sentence contrast showing life before vs. after this product. Do NOT use the word "Before".
Hook 8 — Audience callout angle: Start with "If you [describe a specific struggle the target audience has]," — make the struggle specific to this product's niche.
Hook 9 — Test/experiment angle: Start with "I tried [product name or clear reference]" and tease a surprising or counter-intuitive result.
Hook 10 — Urgency/FOMO angle: Open with a sense of missing out or a time-sensitive framing tied to a specific benefit of this product.

CTAS — generate exactly 10. Each CTA must be product-specific and use the forced style below. No two CTAs may use the same verb to open.
CTA 1 — Soft discovery: Gentle invitation to learn more. Start with "Find out".
CTA 2 — Curiosity gap: Tease a specific benefit or result they'll only get by clicking. Start with "See".
CTA 3 — Urgency: Create time or quantity pressure tied to the product. Start with "Grab".
CTA 4 — Social proof: Reference that others are already using/loving it. Start with "Join".
CTA 5 — Benefit-first: Lead with the specific outcome they'll get. Start with "Get".
CTA 6 — Direct action: No fluff, just the action. Start with "Shop".
CTA 7 — FOMO: Frame it as something they'll regret missing. Start with "Don't".
CTA 8 — Personal/empathetic: Speak directly to their specific struggle. Start with "If".
CTA 9 — Journey/transformation: Frame the click as starting a change. Start with "Start".
CTA 10 — Value/savings angle: Highlight a deal, price, or ROI. Start with "Save" or a dollar/percent figure.

VIDEO SCRIPTS — use EXACTLY these 10 frameworks in this exact order. Each has a FORCED hook opener that you must use as the literal start of the hook field:

Script 1 — Framework: "I Wish I Knew This Sooner"
  Hook MUST start with: "I wish I found [product-specific thing] before I wasted [time/money] on..."
  Body format: personal regret → discovery → transformation result
  Voiceover style: reflective, first-person story

Script 2 — Framework: "Warning"
  Hook MUST start with: "Warning:"
  Body format: state the risk or mistake → introduce product as the safe solution → one specific result
  Voiceover style: serious and urgent, then reassuring

Script 3 — Framework: "POV Hook"
  Hook MUST start with: "POV:"
  Body format: immersive second-person scenario where the viewer is experiencing the benefit
  Voiceover style: present tense, visual and sensory

Script 4 — Framework: "Before vs After"
  Hook MUST be two short lines in this exact format: "Before [product]: [negative state]. After: [specific positive state]."
  Body format: paint the before in 2 details, then the after in 2 specific improvements
  Voiceover style: contrast-driven, emotional

Script 5 — Framework: "3 Things Nobody Tells You"
  Hook MUST start with: "3 things nobody tells you about [niche or problem]:"
  Body format: NUMBERED LIST — write literally "1. [thing]. 2. [thing]. 3. [thing]." — product is the solution for at least one
  Voiceover style: educational, punchy

Script 6 — Framework: "Stop Doing This"
  Hook MUST start with: "Stop [specific wrong behavior people do]."
  Body format: explain why that behavior is costing them → introduce the product as the right way
  Voiceover style: direct, slightly tough-love, then empathetic

Script 7 — Framework: "Quick Hack"
  Hook MUST start with: "Here's a [niche] hack that actually works:"
  Body format: STEP FORMAT — "Step 1: ... Step 2: ... Step 3: ..." — the product is the tool in one of the steps
  Voiceover style: fast-paced, practical

Script 8 — Framework: "Real Talk"
  Hook MUST start with: "Real talk —"
  Body format: admit something honest or slightly negative about the niche/product → turn it into a reason the product is still worth it
  Voiceover style: candid, conversational, no hype

Script 9 — Framework: "If You're Lazy Like Me"
  Hook MUST start with: "If you're lazy like me,"
  Body format: relatable low-effort framing → product as the easy shortcut → specific result with minimal effort
  Voiceover style: self-deprecating humor, warm

Script 10 — Framework: "Take This As A Sign"
  Hook MUST start with: "Take this as a sign to"
  Body format: motivational push → product as the vehicle for the change → one vivid outcome
  Voiceover style: inspiring, slightly emotional

IMPORTANT: Every script's voiceover must be completely different in structure from all others. No two voiceovers should have the same opening paragraph or the same flow. Each must be a complete, ready-to-read script of 150-200 words.

- pinterestPins: exactly 5 pins
- influencerPrompts: exactly 5 prompts tailored to the ${selectedPersona} persona
- emails: exactly 3 emails
- sms: exactly 3 messages
- landingPage.headlines: exactly 5 headlines
- landingPage.emailSubjects: exactly 5 subject lines
- Use "AFFILIATE_LINK" as the placeholder for the affiliate URL
- Make EVERYTHING specific to this product — no generic placeholders`;

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
