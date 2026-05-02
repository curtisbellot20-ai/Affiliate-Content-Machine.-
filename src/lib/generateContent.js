import { FRAMEWORKS } from "@/lib/constants";

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

  const prompt = `You are an elite affiliate marketing copywriter and viral content strategist.

${productContext}

Affiliate Disclosure: "Disclosure: This post may contain affiliate links. I may earn a commission if you buy through my link."

VOICE RULES:
- Persona: "${selectedPersona}" — ${PERSONA_VOICES[selectedPersona] || ""}
- Tone: ${selectedTone}
- Platform: ${selectedPlatform} — ${PLATFORM_NOTES[selectedPlatform] || ""}
- Never say "guaranteed results", "you will definitely make money", "this cures", or "best in the world"

STRICT UNIQUENESS RULES — these are non-negotiable:
1. NO sentence may appear in more than one script, hook, or CTA. Not even close paraphrases.
2. NO phrase of 4+ words may repeat across any two pieces of content.
3. Every voiceover must follow a DIFFERENT emotional arc. Use each arc exactly once across all 10 scripts:
   - Arc A: regret → discovery → relief
   - Arc B: skepticism → reluctant try → conviction
   - Arc C: frustration → stumbling on solution → joy
   - Arc D: curiosity → research → confident recommendation
   - Arc E: embarrassment → fix → confidence
   - Arc F: FOMO → action → satisfaction
   - Arc G: confusion → clarity → momentum
   - Arc H: laziness → easy win → surprise at results
   - Arc I: habit → upgrade → can't go back
   - Arc J: warning → stakes → safe outcome
4. BANNED phrases — do not use these anywhere in the output:
   "link in bio", "game changer", "changed my life", "you need this", "trust me",
   "literally obsessed", "I can't believe", "check it out", "this product",
   "highly recommend", "must have", "don't sleep on"
5. Every voiceover must open with a structurally different sentence type:
   scripts 1,6 — declarative statement
   scripts 2,7 — imperative command
   scripts 3,8 — question
   scripts 4,9 — exclamation or contrast
   scripts 5,10 — number or list opener
6. Vary sentence length deliberately: some voiceovers use short punchy sentences (5-8 words), others use longer flowing ones (15-20 words). Never use the same rhythm in two scripts.

Return a valid JSON object (no markdown, no code fences):
{
  "research": {
    "summary": "2-3 sentence product summary",
    "targetDemographic": "who this is for",
    "painPoints": ["pain1", "pain2", "pain3", "pain4"],
    "uniqueSellingPoints": ["usp1", "usp2", "usp3", "usp4"],
    "competitorGap": "what competitors lack",
    "emotionalAngle": "the core emotional reason someone buys this"
  },
  "hooks": ["hook1","hook2","hook3","hook4","hook5","hook6","hook7","hook8","hook9","hook10"],
  "ctas": ["cta1","cta2","cta3","cta4","cta5","cta6","cta7","cta8","cta9","cta10"],
  "videoScripts": [
    {
      "title": "script title",
      "framework": "framework name",
      "hook": "opener (1-2 sentences)",
      "problem": "pain point",
      "solution": "how product solves it",
      "proof": "why it works",
      "voiceover": "complete spoken script, 120-160 words",
      "sceneDirection": "what to film",
      "onScreenText": "text overlays",
      "caption": "social caption with emojis",
      "cta": "call to action",
      "hashtags": ["#tag1","#tag2","#tag3","#tag4","#tag5"]
    }
  ],
  "pinterestPins": [{"title":"","description":"","boardSuggestion":""}],
  "influencerPrompts": [{"angle":"","script":"","duration":""}],
  "blogPost": {
    "title": "",
    "seoTitles": ["","",""],
    "metaDescription": "",
    "intro": "",
    "content": ""
  },
  "emails": [{"subject":"","body":""}],
  "sms": ["","",""],
  "captions": {"instagram":"","tiktok":"","twitter":"","hashtags":[]},
  "landingPage": {
    "headline": "",
    "subheadline": "",
    "headlines": ["","","","",""],
    "emailSubjects": ["","","","",""]
  }
}

REQUIREMENTS:

hooks (exactly 10): Each must use a completely different angle and sentence type. Distribute like this — 3 questions, 2 confessions, 2 warnings/dangers, 1 bold claim, 1 number-led, 1 POV. No two hooks may start with the same word. Every hook must name something specific about this product.

ctas (exactly 10): Vary the urgency and angle — 2 soft/curiosity, 2 social-proof, 2 scarcity/urgency, 2 benefit-focused, 2 action-forward. No two CTAs may start with the same word. Each must feel like it belongs in a different part of a funnel.

VIDEO SCRIPTS — 10 scripts, each using one of these frameworks in this exact order, with the forced hook opener shown:

Script 1 — "I Wish I Knew This Sooner" | Arc A | Declarative opener
  Hook starts: "I wish I found [specific thing] before I spent [time/money] on..."
  Body: regret → discovery → transformation

Script 2 — "Warning" | Arc J | Imperative opener
  Hook starts: "Warning:"
  Body: risk/mistake → product as safe solution → specific result

Script 3 — "POV Hook" | Arc F | Question opener
  Hook starts: "POV:"
  Body: immersive second-person scenario living the benefit

Script 4 — "Before vs After" | Arc C | Contrast opener
  Hook: "Before [product]: [negative]. After: [specific positive]."
  Body: 2 before details, 2 after improvements

Script 5 — "3 Things Nobody Tells You" | Arc D | Number opener
  Hook starts: "3 things nobody tells you about [niche/problem]:"
  Body: numbered list — "1. ... 2. ... 3. ..." — product solves one

Script 6 — "Stop Doing This" | Arc G | Declarative opener
  Hook starts: "Stop [specific wrong behavior]."
  Body: cost of wrong behavior → product as the right way

Script 7 — "Quick Hack" | Arc H | Imperative opener
  Hook starts: "Here's a [niche] hack that actually works:"
  Body: step format — "Step 1: ... Step 2: ... Step 3: ..."

Script 8 — "Real Talk" | Arc B | Question opener
  Hook starts: "Real talk —"
  Body: honest admission → why product is still worth it

Script 9 — "If You're Lazy Like Me" | Arc I | Contrast opener
  Hook starts: "If you're lazy like me,"
  Body: low-effort framing → product as easy shortcut → results

Script 10 — "Take This As A Sign" | Arc E | Number/list opener
  Hook starts: "Take this as a sign to"
  Body: motivational push → product as vehicle → vivid outcome

Each voiceover must be 120-160 words, complete and ready to read on camera, and structurally unlike every other voiceover in this set.

pinterestPins: exactly 5, each targeting a different keyword angle
influencerPrompts: exactly 5, tailored to the ${selectedPersona} persona
emails: exactly 3, each at a different funnel stage (awareness / consideration / urgency)
sms: exactly 3, each a different type (curiosity / social proof / urgency)
landingPage.headlines: exactly 5
landingPage.emailSubjects: exactly 5

Use "AFFILIATE_LINK" as the placeholder. Make everything specific to this product — zero generic placeholders.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
  });

  if (message.stop_reason === "max_tokens") {
    throw new Error("Content generation was cut short — output too long. Try selecting fewer platforms.");
  }

  const textBlock = message.content?.find((b) => b.type === "text");
  if (!textBlock?.text) throw new Error("No text content in API response.");

  const text = textBlock.text.trim();
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
    throw new Error("API response did not contain valid JSON.");
  }

  return JSON.parse(text.slice(jsonStart, jsonEnd + 1));
}
