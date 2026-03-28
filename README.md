# 🛍️ Shopee Affiliate Link Generator

Công cụ tạo link affiliate Shopee cho Facebook - hoàn toàn miễn phí!

## 🎯 Quick Start

👉 **[Xem hướng dẫn nhanh trong QUICKSTART.md](QUICKSTART.md)**

Tính năng:
- ✅ Chỉ cần paste link Shopee → Click  "Tạo Link Ngay" → Copy → Done!
- ✅ Affiliate ID và Sub ID được config qua environment variables
- ✅ Không cần nhập thông tin mỗi lần sử dụng
- ✅ Deploy miễn phí lên Vercel/Netlify

## 🚀 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Config environment variables (tùy chọn)
cp .env.example .env
# Sau đó điền Affiliate ID và Sub ID vào file .env

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Config Environment Variables (Khuyên dùng)

Để tự động điền sẵn Affiliate ID và Sub ID:

1. Copy `.env.example` thành `.env`:
```bash
cp .env.example .env
```

2. Điền thông tin:
```env
VITE_AFFILIATE_ID=17382370178
VITE_SUB_ID_1=addlivetag
VITE_SUB_ID_2=yourname
```

3. User sẽ thấy các ô input đã điền sẵn!

📖 **Chi tiết**: Xem [ENV_CONFIG.md](ENV_CONFIG.md) để biết cách config trên Vercel/Netlify.

## 📖 Hướng dẫn sử dụng

1. **Lấy Affiliate ID của bạn**
   - Đăng ký tài khoản Shopee Affiliate
   - Lấy Affiliate ID từ dashboard

2. **Sử dụng công cụ**
   - Nhập link sản phẩm Shopee vào ô "Link sản phẩm Shopee"
   - Nhập Affiliate ID của bạn
   - Nhập Sub ID để tracking (mặc định: addlivetag)
   - Click "🔥 Tạo Link Ngay"
   - Copy link affiliate đã tạo
   - Dán vào comment Facebook

3. **Cách link hoạt động**
   - Link sẽ redirect qua `s.shopee.vn/an_redir`
   - Tự động gắn Affiliate ID và Sub ID cho tracking
   - Người dùng nhận mã khuyến mãi khi click link
   - Bạn nhận commission từ Shopee

## 🌐 Deploy miễn phí

### Vercel (Khuyên dùng)
```bash
# Cài Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Cài Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### GitHub Pages
```bash
# Build
npm run build

# Deploy folder dist/ lên GitHub Pages
```

## 🔧 Tính năng

- ✅ Tạo link affiliate Shopee tự động
- ✅ Hỗ trợ Sub ID để tracking chi tiết
- ✅ Copy link nhanh chóng
- ✅ Giao diện đẹp, responsive mobile
- ✅ Không cần backend, chạy hoàn toàn client-side
- ✅ Miễn phí 100%

## 📝 Giải thích cách hoạt động

Link affiliate được tạo theo format:
```
https://s.shopee.vn/an_redir?origin_link=[encoded_product_url]&share_channel_code=4&affiliate_id=[your_id]&sub_id=[tracking_id]
```

- `origin_link`: Link sản phẩm gốc (đã encode)
- `share_channel_code`: Mã kênh (4 = Facebook)
- `affiliate_id`: ID affiliate của bạn
- `sub_id`: Mã tracking tùy chỉnh

## 🎯 Lưu ý

- Link chỉ hoạt động khi bạn có tài khoản Shopee Affiliate hợp lệ
- Cần có mã khuyến mãi đang hoạt động trên Shopee
- Theo dõi hiệu quả qua Sub ID

## 📞 Hỗ trợ

Nếu có vấn đề, hãy kiểm tra:
1. Affiliate ID có đúng không
2. Link Shopee có đúng format không (phải có dạng `-i.shopid.itemid`)
3. Tài khoản affiliate có đang hoạt động không

---

Made with ❤️ for Shopee Affiliates
