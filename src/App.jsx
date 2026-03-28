import { useState } from "react";
import "./App.css";

function App() {
  const [shopeeUrl, setShopeeUrl] = useState("");
  const [affiliateId, setAffiliateId] = useState(
    import.meta.env.VITE_AFFILIATE_ID || "",
  );
  const [subId1, setSubId1] = useState(
    import.meta.env.VITE_SUB_ID_1 || "addlivetag",
  );
  const [subId2, setSubId2] = useState(import.meta.env.VITE_SUB_ID_2 || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateAffiliateLink = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      // Validate inputs
      if (!shopeeUrl.trim()) {
        throw new Error("Vui lòng nhập link sản phẩm Shopee");
      }
      if (!affiliateId.trim()) {
        throw new Error("Vui lòng nhập Affiliate ID");
      }

      // Extract product info from Shopee URL
      const urlPattern = /shopee\.vn\/.*-i\.(\d+)\.(\d+)/;
      const match = shopeeUrl.match(urlPattern);

      if (!match) {
        throw new Error("Link Shopee không hợp lệ. Vui lòng kiểm tra lại.");
      }

      const shopId = match[1];
      const itemId = match[2];

      // Parse URL to get all parameters
      const urlObj = new URL(shopeeUrl);
      const extraParams = urlObj.searchParams.get("extraParams");
      const spAtk = urlObj.searchParams.get("sp_atk");
      const xptdk = urlObj.searchParams.get("xptdk");

      // Build origin link
      let originLink = `https://shopee.vn/opaanlp/${shopId}/${itemId}`;
      if (extraParams || spAtk || xptdk) {
        const params = new URLSearchParams();
        if (extraParams) params.append("extraParams", extraParams);
        if (spAtk) params.append("sp_atk", spAtk);
        if (xptdk) params.append("xptdk", xptdk);
        originLink += "?" + params.toString();
      }

      // Build sub_id
      const subIdParts = [subId1, subId2, "", "", ""].filter(Boolean);
      const subId =
        subIdParts.join("-") +
        "--".repeat(5 - subIdParts.length).slice(0, 5 - subIdParts.length);

      // Generate affiliate link
      const affiliateLink =
        `https://s.shopee.vn/an_redir?` +
        `origin_link=${encodeURIComponent(originLink)}&` +
        `share_channel_code=4&` +
        `affiliate_id=${affiliateId}&` +
        `sub_id=${subId}`;

      setResult({
        success: true,
        url: shopeeUrl,
        affiliateLink: affiliateLink,
        subids: {
          sub1: subId1,
          sub2: subId2,
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Đã copy link!");
    } catch (err) {
      alert("Không thể copy. Vui lòng copy thủ công.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🛍️ Tạo Link Shopee Affiliate</h1>
        <p className="subtitle">
          Công cụ tạo link affiliate Shopee cho Facebook miễn phí
        </p>

        <form onSubmit={generateAffiliateLink}>
          <div className="form-group">
            <label htmlFor="shopeeUrl">Link sản phẩm Shopee</label>
            <input
              id="shopeeUrl"
              type="text"
              value={shopeeUrl}
              onChange={(e) => setShopeeUrl(e.target.value)}
              placeholder="https://shopee.vn/product-name-i.123456.789012"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="affiliateId">Affiliate ID *</label>
            <input
              id="affiliateId"
              type="text"
              value={affiliateId}
              onChange={(e) => setAffiliateId(e.target.value)}
              placeholder="17382370178"
              className="input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subId1">Sub ID 1</label>
              <input
                id="subId1"
                type="text"
                value={subId1}
                onChange={(e) => setSubId1(e.target.value)}
                placeholder="addlivetag"
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subId2">Sub ID 2 (tùy chọn)</label>
              <input
                id="subId2"
                type="text"
                value={subId2}
                onChange={(e) => setSubId2(e.target.value)}
                placeholder="username"
                className="input"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Đang tạo..." : "🔥 Tạo Link Ngay"}
          </button>
        </form>

        {error && <div className="error">⚠️ {error}</div>}

        {result && result.success && (
          <div className="result">
            <h3>✅ Tạo link thành công!</h3>

            <div className="link-box">
              <label>Link Affiliate:</label>
              <div className="link-container">
                <input
                  type="text"
                  value={result.affiliateLink}
                  readOnly
                  className="input-readonly"
                />
                <button
                  onClick={() => copyToClipboard(result.affiliateLink)}
                  className="btn-copy"
                >
                  📋 Copy
                </button>
              </div>
            </div>

            <div className="instructions">
              <h4>📝 Hướng dẫn sử dụng:</h4>
              <ol>
                <li>
                  Nhấn <strong>Copy Link</strong> ở trên
                </li>
                <li>Dán link dưới bình luận bài đăng Facebook</li>
                <li>Người dùng click vào link sẽ nhận được mã khuyến mãi</li>
              </ol>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>
          💡 Hỗ trợ tạo link affiliate Shopee cho Facebook hoàn toàn miễn phí
        </p>
      </footer>
    </div>
  );
}

export default App;
