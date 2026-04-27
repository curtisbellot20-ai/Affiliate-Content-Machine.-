const ACM_URL = "https://affiliate-content-machine.vercel.app";

let scrapedProduct = null;

function setState(name) {
  ["idle", "loading", "result", "error"].forEach((s) => {
    document.getElementById(`state-${s}`).classList.toggle("active", s === name);
  });
}

function setLoadingText(text) {
  document.getElementById("loading-text").textContent = text;
}

function showError(msg) {
  document.getElementById("error-text").textContent = msg;
  setState("error");
}

function showResult(product) {
  scrapedProduct = product;

  // Images gallery
  const gallery = document.getElementById("img-gallery");
  gallery.innerHTML = "";
  const imgs = product.images || (product.image ? [product.image] : []);
  if (imgs.length > 0) {
    imgs.slice(0, 10).forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Product image ${i + 1}`;
      img.title = src;
      img.onerror = () => img.parentElement && (img.style.display = "none");
      gallery.appendChild(img);
    });
    gallery.style.display = "flex";
  } else {
    gallery.style.display = "none";
  }

  document.getElementById("product-title").textContent = product.title || "Unknown product";
  document.getElementById("product-price").textContent = product.price || "";
  document.getElementById("img-count").textContent =
    imgs.length > 0 ? `${imgs.length} image${imgs.length !== 1 ? "s" : ""} found` : "No images found";

  setState("result");
}

// The scraper function that runs inside the active tab (has full DOM access)
function scrapePageDOM() {
  const result = { title: "", description: "", price: "", image: "", images: [], url: location.href };

  // Title
  result.title =
    document.querySelector('meta[property="og:title"]')?.content ||
    document.querySelector("h1")?.innerText?.trim() ||
    document.title ||
    "";

  // Description
  result.description =
    document.querySelector('meta[property="og:description"]')?.content ||
    document.querySelector('meta[name="description"]')?.content ||
    "";

  // Price - Amazon-specific first, then generic
  result.price =
    document.querySelector(".a-price .a-offscreen")?.innerText?.trim() ||
    document.querySelector('[data-asin] .a-price')?.innerText?.trim() ||
    document.querySelector('[itemprop="price"]')?.getAttribute("content") ||
    document.querySelector('[class*="price"]')?.innerText?.trim() ||
    "";

  // ---- Image scraping ----
  const allRaw = [];

  // Method 1: data-a-dynamic-image (Amazon main image + all variants at multiple resolutions)
  document.querySelectorAll("[data-a-dynamic-image]").forEach((el) => {
    try {
      const map = JSON.parse(el.getAttribute("data-a-dynamic-image") || "{}");
      for (const [url, dims] of Object.entries(map)) {
        allRaw.push({ url, res: (dims[0] || 0) * (dims[1] || 0) });
      }
    } catch {}
  });

  // Method 2: data-old-hires (Amazon hi-res attribute on img tags)
  document.querySelectorAll("img[data-old-hires]").forEach((el) => {
    const url = el.getAttribute("data-old-hires");
    if (url && url.includes("media-amazon")) allRaw.push({ url, res: 0 });
  });

  // Method 3: colorImages JS variable in page scripts
  document.querySelectorAll("script").forEach((el) => {
    const content = el.textContent || "";
    const m = content.match(/'colorImages'\s*:\s*\{\s*'initial'\s*:\s*(\[[\s\S]*?\])/);
    if (m) {
      try {
        JSON.parse(m[1]).forEach((img) => {
          if (img.hiRes) allRaw.push({ url: img.hiRes, res: 999999 });
          else if (img.large) allRaw.push({ url: img.large, res: 0 });
        });
      } catch {}
    }
    // Also try 'ImageBlockATF'
    const m2 = content.match(/"ImageBlockATF"[\s\S]*?"colorImages"\s*:\s*\{"initial"\s*:\s*(\[[\s\S]*?\])/);
    if (m2) {
      try {
        JSON.parse(m2[1]).forEach((img) => {
          if (img.hiRes) allRaw.push({ url: img.hiRes, res: 999999 });
          else if (img.large) allRaw.push({ url: img.large, res: 0 });
        });
      } catch {}
    }
  });

  // Method 4: alt image thumbnails in sidebar (convert from thumbnail to full size)
  document.querySelectorAll(
    "#altImages img, #imageBlock img, .imageThumbnail img, li.image.item img"
  ).forEach((el) => {
    const src = el.src || el.getAttribute("data-src") || "";
    if (!src || !src.includes("media-amazon")) return;
    if (src.includes("sprite") || src.includes("transparent") || src.includes(".gif")) return;
    const full = src.replace(/\._[A-Z0-9,_]+_\./i, ".");
    if (full) allRaw.push({ url: full, res: 1 });
  });

  // Method 5: full-size images already loaded in the page (covers non-Amazon sites)
  document.querySelectorAll("img").forEach((el) => {
    const src = el.src || el.getAttribute("data-src") || el.getAttribute("data-lazy") || "";
    if (!src || src.startsWith("data:") || src.includes("sprite") || src.includes("icon")) return;
    const w = el.naturalWidth || el.width || 0;
    const h = el.naturalHeight || el.height || 0;
    if (w >= 200 && h >= 200) allRaw.push({ url: src, res: w * h });
  });

  // Method 6: og:image fallback
  const ogImage = document.querySelector('meta[property="og:image"]')?.content || "";
  if (ogImage) allRaw.push({ url: ogImage, res: 0 });

  // Deduplicate: group by base image ID (Amazon) or full URL; keep highest res per group
  const byKey = {};
  for (const { url, res } of allRaw) {
    if (!url || url.includes("data:")) continue;
    const idMatch = url.match(/\/images\/I\/([A-Za-z0-9+%]+)\./);
    const key = idMatch ? idMatch[1] : url;
    if (!byKey[key] || res > byKey[key].res) byKey[key] = { url, res };
  }

  // Convert thumbnail URLs to full-size for Amazon
  result.images = Object.values(byKey)
    .sort((a, b) => b.res - a.res)
    .map((v) => v.url.replace(/\._[A-Z0-9,_]+_\./i, "."))
    .filter(Boolean)
    .slice(0, 12);

  result.image = result.images[0] || ogImage || "";
  return result;
}

async function scrape() {
  setState("loading");
  setLoadingText("Scraping product data…");

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error("No active tab found.");

    const [{ result: product }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapePageDOM,
    });

    if (!product) throw new Error("Could not scrape the page. Make sure you're on a product page.");

    setLoadingText("Done!");
    showResult(product);
  } catch (err) {
    showError(err.message || "An unexpected error occurred.");
  }
}

document.getElementById("scrape-btn").addEventListener("click", scrape);
document.getElementById("rescrape-btn").addEventListener("click", scrape);
document.getElementById("retry-btn").addEventListener("click", () => setState("idle"));

document.getElementById("generate-btn").addEventListener("click", () => {
  if (!scrapedProduct) return;
  try {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(scrapedProduct))));
    const targetUrl = `${ACM_URL}/generate?product=${encoded}`;
    chrome.tabs.create({ url: targetUrl });
  } catch {
    showError("Failed to encode product data. Please try again.");
  }
});

// Start in idle state
setState("idle");
