export async function scrapeProduct(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

  const html = await res.text();

  // Dynamic import so Next.js bundles cheerio server-side only
  const { load } = await import("cheerio");
  const $ = load(html);

  const title =
    $('meta[property="og:title"]').attr("content") ||
    $("h1").first().text() ||
    $("title").text() ||
    "Product";

  const description =
    $('meta[property="og:description"]').attr("content") ||
    $('meta[name="description"]').attr("content") ||
    "";

  const price =
    $('[class*="price"]').first().text().trim() ||
    $('[itemprop="price"]').attr("content") ||
    "";

  // Try to extract multiple images from Amazon's colorImages JSON in script tags
  let images = [];

  $("script").each((_, el) => {
    const content = $(el).children().first().text() || "";
    const match = content.match(/'colorImages'\s*:\s*\{\s*'initial'\s*:\s*(\[[\s\S]*?\])\s*\}/);
    if (match && images.length === 0) {
      try {
        const parsed = JSON.parse(match[1]);
        images = parsed
          .map((img) => img.hiRes || img.large || img.mainUrl)
          .filter(Boolean);
      } catch {}
    }
  });

  // Fallback: extract from #altImages thumbnails and convert to full-size URLs
  if (images.length === 0) {
    $("#altImages img, #imageBlock img").each((_, el) => {
      const src = $(el).attr("src") || "";
      const fullSize = src.replace(/\._[A-Z0-9,_]+_\./i, ".");
      if (fullSize && fullSize.includes("media-amazon") && !fullSize.includes("sprite")) {
        images.push(fullSize);
      }
    });
  }

  // Fallback: single main image
  if (images.length === 0) {
    const single =
      $("#landingImage").attr("data-old-hires") ||
      $("#landingImage").attr("src") ||
      $("#imgBlkFront").attr("data-old-hires") ||
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      "";
    if (single) images.push(single);
  }

  // Dedupe and limit to 8
  images = [...new Set(images.filter(Boolean))].slice(0, 8);
  const image = images[0] || "";

  // Grab meaningful body text (exclude nav/footer/script)
  $("nav, footer, script, style, noscript, header").remove();
  const body = $("body").text().replace(/\s+/g, " ").trim().slice(0, 3000);

  return { title: title.trim(), description: description.trim(), price: price.trim(), image: image.trim(), images, body, url };
}
