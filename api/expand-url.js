export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "URL parameter is required",
    });
  }

  try {
    // Validate Shopee URL
    const isShortLink = /s\.shopee\.vn\//.test(url);
    const isFullLink = /shopee\.vn\/.*-i\.(\d+)\.(\d+)/.test(url);

    if (!isShortLink && !isFullLink) {
      return res.status(400).json({
        success: false,
        error: "Invalid Shopee URL",
      });
    }

    let finalUrl = url;

    // If it's a short link, expand it
    if (isShortLink) {
      const response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });
      finalUrl = response.url;
    }

    // Extract shop ID and item ID
    const urlPattern = /shopee\.vn\/.*-i\.(\d+)\.(\d+)/;
    const match = finalUrl.match(urlPattern);

    if (!match) {
      return res.status(400).json({
        success: false,
        error: "Could not extract product info from URL",
      });
    }

    const shopId = match[1];
    const itemId = match[2];

    return res.status(200).json({
      success: true,
      originalUrl: url,
      expandedUrl: finalUrl,
      shopId,
      itemId,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
