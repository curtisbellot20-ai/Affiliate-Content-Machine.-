import { NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropicClient";

export async function POST(request) {
  try {
    const { scriptIndex, framework, product, niche, audience, tone, persona, platforms } = await request.json();

    let client;
    try {
      client = await getAnthropicClient();
    } catch {
      return NextResponse.json({ error: "No API key configured" }, { status: 500 });
    }

    const platform = Array.isArray(platforms) ? platforms[0] : (platforms || "TikTok");

    const prompt = `You are an elite affiliate marketing copywriter. Regenerate a single video script for the product below.

Product: ${product?.title || "Unknown Product"}
Price: ${product?.price || ""}
Description: ${product?.description || ""}
Niche: ${niche || "general"}
Audience: ${audience || "general consumers"}
Platform: ${platform}
Tone: ${tone || "Conversational"}
Persona: ${persona || "Best Friend"}
Framework to use: ${framework}

Return ONLY a valid JSON object (no markdown, no code fences) with this exact structure:
{
  "title": "script title reflecting the framework",
  "framework": "${framework}",
  "hook": "attention-grabbing opener 1-2 sentences",
  "problem": "the pain point this addresses",
  "solution": "how the product solves it",
  "proof": "why it works / results / social proof",
  "voiceover": "complete spoken script ready to read on camera (150-200 words)",
  "sceneDirection": "what to film or show on screen",
  "onScreenText": "text overlays to display",
  "caption": "social media caption with emojis",
  "cta": "call to action",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
}

Make it specific to this product. Match the ${persona} voice and ${tone} tone. Never use "guaranteed results" or fake claims.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].text.trim();
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const script = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

    return NextResponse.json({ script });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
