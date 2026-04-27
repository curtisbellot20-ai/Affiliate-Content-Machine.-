export async function scrapeProduct(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
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

  // Method 1: data-a-dynamic-image on any element (most reliable for Amazon)
  $("[data-a-dynamic-image]").each((_, el) => {
    if (images.length > 0) return;
    try {
      const imgMap = JSON.parse($(el).attr("data-a-dynamic-image") || "{}");
      images = Object.keys(imgMap).filter(Boolean);
    } catch {}
  });

  // Method 2: colorImages JSON in script tags
  if (images.length === 0) {
    $("script").each((_, el) => {
      const content = $(el).html() || "";
      const match = content.match(/'colorImages'\s*:\s*\{\s*'initial'\s*:\s*(\[[\s\S]*?\])/);
      if (match && images.length === 0) {
        try {
          const parsed = JSON.parse(match[1]);
          images = parsed.map((img) => img.hiRes || img.large).filter(Boolean);
        } catch {}
      }
    });
  }

  // Method 3: extract from alt image thumbnails and convert to full-size URLs
  if (images.length === 0) {
    $("img").each((_, el) => {
      const src = $(el).attr("src") || $(el).attr("data-src") || "";
      if (!src.includes("media-amazon")) return;
      if (src.includes("sprite") || src.includes("transparent") || src.includes("pixel")) return;
      const fullSize = src.replace(/\._[A-Z0-9,_]+_\./i, ".");
      if (fullSize) images.push(fullSize);
    });
  }

  // Method 4: single main image fallback
  if (images.length === 0) {
    const single =
      $("#landingImage").attr("data-old-hires") ||
      $("#landingImage").attr("src") ||
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
