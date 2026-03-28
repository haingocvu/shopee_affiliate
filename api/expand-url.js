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

  // Validate URL using WHATWG URL API (not url.parse)
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith("shopee.vn")) {
      return res.status(400).json({
        success: false,
        error: "Invalid Shopee URL",
      });
    }
  } catch {
    return res.status(400).json({
      success: false,
      error: "Invalid URL format",
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
    let shopId, itemId;

    // If it's a short link, we need to expand it to get the final URL

    // If it's a short link, expand it
    if (isShortLink) {
      try {
        const response = await fetch(url, {
          method: "GET",
          redirect: "follow",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        });

        finalUrl = response.url;

        // Try multiple patterns to extract product info from URL
        let match = finalUrl.match(/shopee\.vn\/.*-i\.(\d+)\.(\d+)/);

        if (!match) {
          // Try alternative pattern
          match = finalUrl.match(/shopee\.vn\/.*\/(\d+)\/(\d+)/);
        }

        if (match) {
          shopId = match[1];
          itemId = match[2];
        } else {
          // Try to extract from HTML content
          const html = await response.text();

          // Try to find shopid and itemid in HTML/JSON
          const jsonMatch = html.match(
            /"shopid["\s:]+(\d+).*?"itemid["\s:]+(\d+)/i,
          );
          if (jsonMatch) {
            shopId = jsonMatch[1];
            itemId = jsonMatch[2];
          } else {
            // Try reverse pattern
            const reverseMatch = html.match(
              /"itemid["\s:]+(\d+).*?"shopid["\s:]+(\d+)/i,
            );
            if (reverseMatch) {
              itemId = reverseMatch[1];
              shopId = reverseMatch[2];
            } else {
              return res.status(400).json({
                success: false,
                error: "Could not extract product info. Final URL: " + finalUrl,
                debug: {
                  originalUrl: url,
                  expandedUrl: finalUrl,
                  htmlLength: html.length,
                },
              });
            }
          }
        }
      } catch (fetchError) {
        return res.status(500).json({
          success: false,
          error: "Could not fetch short link: " + fetchError.message,
        });
      }
    } else {
      // Extract shop ID and item ID from full link
      const urlPattern = /shopee\.vn\/.*-i\.(\d+)\.(\d+)/;
      const match = finalUrl.match(urlPattern);

      if (!match) {
        return res.status(400).json({
          success: false,
          error: "Could not extract product info from URL",
        });
      }

      shopId = match[1];
      itemId = match[2];
    }

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
