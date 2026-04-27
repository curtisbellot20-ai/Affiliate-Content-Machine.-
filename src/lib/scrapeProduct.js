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

  // Amazon-specific: grab high-res image from the main product image element
  const amazonImg =
    $("#landingImage").attr("data-old-hires") ||
    $("#landingImage").attr("src") ||
    $("#imgBlkFront").attr("data-old-hires") ||
    $("#imgBlkFront").attr("src") ||
    $("img[data-old-hires]").first().attr("data-old-hires") ||
    $('[id="main-image"]').attr("src");

  const image =
    amazonImg ||
    $('meta[property="og:image"]').attr("content") ||
    $('meta[name="twitter:image"]').attr("content") ||
    $('img[class*="product"]').first().attr("src") ||
    "";

  // Grab meaningful body text (exclude nav/footer/script)
  $("nav, footer, script, style, noscript, header").remove();
  const body = $("body").text().replace(/\s+/g, " ").trim().slice(0, 3000);

  return { title: title.trim(), description: description.trim(), price: price.trim(), image: image.trim(), body, url };
}
