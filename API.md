# 📡 API Documentation

## Endpoint: `/api/expand-url`

Serverless function để expand Shopee short links và extract product information.

### Method
`GET`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | Shopee URL (full or short link) |

### Request Example

```
GET /api/expand-url?url=https%3A%2F%2Fs.shopee.vn%2F1qXaxVE1xR
```

### Response

#### Success Response (200)

```json
{
  "success": true,
  "originalUrl": "https://s.shopee.vn/1qXaxVE1xR",
  "expandedUrl": "https://shopee.vn/product-name-i.443723888.57803668873",
  "shopId": "443723888",
  "itemId": "57803668873"
}
```

#### Error Response (400/500)

```json
{
  "success": false,
  "error": "Invalid Shopee URL"
}
```

### Supported URL Formats

1. **Short link**: `https://s.shopee.vn/6L03N3Y7ST`
2. **Full link**: `https://shopee.vn/product-name-i.123456.789012`

### How It Works

1. Checks if URL is a short link (`s.shopee.vn`)
2. If short link: 
   - Follows redirect to get full URL
   - Uses HEAD request to avoid downloading content
3. Extracts `shopId` and `itemId` from the expanded URL
4. Returns structured data

### Usage in Frontend

```javascript
const apiUrl = `/api/expand-url?url=${encodeURIComponent(shopeeUrl)}`;
const response = await fetch(apiUrl);
const data = await response.json();

if (data.success) {
  const { shopId, itemId } = data;
  // Build affiliate link
  const originLink = `https://shopee.vn/opaanlp/${shopId}/${itemId}`;
}
```

### Local Development

⚠️ **Note**: API endpoint chỉ hoạt động khi deploy lên Vercel.

Để test local với link rút gọn, bạn có thể:
1. Manually expand link trong browser
2. Copy full URL
3. Paste vào app

Hoặc deploy lên Vercel ngay để có API đầy đủ (miễn phí).

### Deployment

API này tự động deploy cùng với app khi bạn deploy lên Vercel.

Không cần config gì thêm - Vercel tự động nhận diện folder `/api` và deploy như serverless functions.

### Rate Limits (Vercel Free Tier)

- 100GB bandwidth/month
- 100 hours serverless execution/month
- Đủ cho hàng nghìn requests mỗi ngày!
