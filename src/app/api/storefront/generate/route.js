import { NextResponse } from 'next/server';
import { generateStorefront } from '@/lib/generateStorefront';

export async function POST(request) {
  try {
    const intake = await request.json();

    const required = ['niche', 'brandName', 'targetAudience', 'brandVoice', 'primaryGoal'];
    for (const field of required) {
      if (!intake[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const storefront = await generateStorefront(intake);
    return NextResponse.json(storefront);
  } catch (err) {
    console.error('Storefront generation error:', err);
    return NextResponse.json(
      { error: err instanceof SyntaxError ? 'AI returned malformed JSON. Please retry.' : err.message },
      { status: 500 }
    );
  }
}
