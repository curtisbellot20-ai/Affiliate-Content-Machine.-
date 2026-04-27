import { NextResponse } from "next/server";
import { scrapeProduct } from "@/lib/scrapeProduct";

export async function POST(request) {
  try {
    const { url } = await request.json();
    if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

    const product = await scrapeProduct(url);
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: err.message, title: "Product", description: "", price: "", body: "" });
  }
}
