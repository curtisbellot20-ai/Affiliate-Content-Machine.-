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

  // Step 1: get main image at highest resolution from data-a-dynamic-image
  let mainImages = [];
  $("[data-a-dynamic-image]").each((_, el) => {
    if (mainImages.length > 0) return;
    try {
      const imgMap = JSON.parse($(el).attr("data-a-dynamic-image") || "{}");
      const byId = {};
      for (const [imgUrl, dims] of Object.entries(imgMap)) {
        const idMatch = imgUrl.match(/\/images\/I\/([A-Za-z0-9+]+)\./);
        if (!idMatch) continue;
        const id = idMatch[1];
        const res = (dims[0] || 0) * (dims[1] || 0);
        if (!byId[id] || res > byId[id].res) byId[id] = { url: imgUrl, res };
      }
      mainImages = Object.values(byId).map((v) => v.url).filter(Boolean);
    } catch {}
  });

  // Step 2: always grab all sidebar thumbnails and convert to full-size
  const altImages = [];
  $("#altImages img, #imageBlock img, .imageThumbnail img").each((_, el) => {
    const src = $(el).attr("src") || $(el).attr("data-src") || "";
    if (!src.includes("media-amazon")) return;
    if (src.includes("sprite") || src.includes("transparent") || src.includes("gif")) return;
    const fullSize = src.replace(/\._[A-Z0-9,_]+_\./i, ".");
    if (fullSize) altImages.push(fullSize);
  });

  // Step 3: from colorImages JSON in scripts
  const scriptImages = [];
  if (mainImages.length === 0 && altImages.length === 0) {
    $("script").each((_, el) => {
      const content = $(el).html() || "";
      const match = content.match(/'colorImages'\s*:\s*\{\s*'initial'\s*:\s*(\[[\s\S]*?\])/);
      if (match && scriptImages.length === 0) {
        try {
          const parsed = JSON.parse(match[1]);
          parsed.forEach((img) => { if (img.hiRes || img.large) scriptImages.push(img.hiRes || img.large); });
        } catch {}
      }
    });
  }

  // Combine all, deduplicate by image ID, keep highest res first
  const allRaw = [...mainImages, ...altImages, ...scriptImages];
  const seenIds = new Set();
  const images = [];
  for (const imgUrl of allRaw) {
    const idMatch = imgUrl.match(/\/images\/I\/([A-Za-z0-9+]+)\./);
    const id = idMatch ? idMatch[1] : imgUrl;
    if (!seenIds.has(id)) {
      seenIds.add(id);
      images.push(imgUrl);
    }
  }

  // Final fallback: og:image
  if (images.length === 0) {
    const single =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") || "";
    if (single) images.push(single);
  }

  const image = images[0] || "";

  // Grab meaningful body text (exclude nav/footer/script)
  $("nav, footer, script, style, noscript, header").remove();
  const body = $("body").text().replace(/\s+/g, " ").trim().slice(0, 3000);

  return { title: title.trim(), description: description.trim(), price: price.trim(), image: image.trim(), images, body, url };
}
