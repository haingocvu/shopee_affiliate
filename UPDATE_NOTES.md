# 🔄 Đã Cập Nhật API - Cần Redeploy

## ✅ API đã được improve với:

1. **Dùng GET request** thay vì HEAD để lấy full content
2. **Thử nhiều patterns** để extract shopId và itemId:
   - Pattern 1: `/shopee.vn/.*-i\.(\d+)\.(\d+)/`
   - Pattern 2: `/shopee.vn/.*/(\d+)/(\d+)/`
   - Pattern 3: Parse từ HTML (`"shopid":`, `"itemid":`)
3. **Debug info** chi tiết khi lỗi

## 🚀 Để áp dụng cập nhật trên Vercel:

### Option 1: Từ GitHub (Auto Deploy)

```bash
# Commit changes
git add .
git commit -m "Improve short link expansion API"
git push

# Vercel tự động deploy (nếu đã link với GitHub)
```

### Option 2: Deploy Manual

```bash
# Deploy trực tiếp
vercel --prod

# Hoặc nếu chưa login
vercel login
vercel --prod
```

## 🧪 Test sau khi deploy:

Thử với các link này:

**Link rút gọn:**
```
https://s.shopee.vn/6L03N3Y7ST
https://s.shopee.vn/1qXaxVE1xR
```

**Link đầy đủ:**
```
https://shopee.vn/Nồi-cơm-cao-tần-Tefal-Rice-Master-Max-RK819868-1.8L-i.254657873.26963411782
```

## 🐛 Nếu vẫn lỗi:

Xem response error sẽ có thêm debug info:
```json
{
  "success": false,
  "error": "Could not extract product info. Final URL: ...",
  "debug": {
    "originalUrl": "...",
    "expandedUrl": "...",
    "htmlLength": 12345
  }
}
```

Hoặc báo lại để tôi debug thêm!

---

📝 **Next Steps**: Commit code → Push lên GitHub/Vercel → Test lại với link rút gọn!
