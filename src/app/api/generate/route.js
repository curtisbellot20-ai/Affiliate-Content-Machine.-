import { NextResponse } from "next/server";
import { generateContent } from "@/lib/generateContent";

export async function POST(request) {
  try {
    const { product, niche, audience, tone, platforms, persona } = await request.json();
    const content = await generateContent({ product, niche, audience, tone, platforms, persona });
    return NextResponse.json(content);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
