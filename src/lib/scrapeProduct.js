export async function scrapeProduct(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AffiliateCM/1.0)",
      Accept: "text/html",
    },
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

  // Grab meaningful body text (exclude nav/footer/script)
  $("nav, footer, script, style, noscript, header").remove();
  const body = $("body").text().replace(/\s+/g, " ").trim().slice(0, 3000);

  return { title: title.trim(), description: description.trim(), price: price.trim(), body, url };
}
