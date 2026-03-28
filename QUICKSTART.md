# 🚀 Quick Start Guide

## Bước 1: Config Environment Variables

Tạo file `.env` trong thư mục root:

```bash
cp .env.example .env
```

Sửa file `.env` với thông tin của bạn:

```env
VITE_AFFILIATE_ID=17382370178
VITE_SUB_ID_1=addlivetag
VITE_SUB_ID_2=yourname
```

## Bước 2: Chạy Local

```bash
npm install
npm run dev
```

Mở browser: http://localhost:5173

## Bước 3: Test

1. Paste link Shopee vào ô input (hỗ trợ cả 2 loại link):
   
   **Link đầy đủ:**
   ```
   https://shopee.vn/Nồi-cơm-cao-tần-Tefal-Rice-Master-Max-RK819868-1.8L-i.254657873.26963411782
   ```
   
   **Link rút gọn:**
   ```
   https://s.shopee.vn/1qXaxVE1xR
   ```

2. Click "🔥 Tạo Link Ngay"

3. Copy link affiliate đã tạo

4. Dán vào comment Facebook!

## Bước 4: Deploy lên Vercel (Miễn phí)

### A. Từ GitHub (Dễ nhất)

1. Push code lên GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/shopee-affiliate.git
   git push -u origin main
   ```

2. Vào [vercel.com](https://vercel.com) và login

3. Click "Add New Project" → Import từ GitHub

4. Chọn repository

5. **QUAN TRỌNG**: Thêm Environment Variables trước khi deploy:
   - Click "Environment Variables"
   - Thêm:
     - `VITE_AFFILIATE_ID` = `17382370178`
     - `VITE_SUB_ID_1` = `addlivetag`
     - `VITE_SUB_ID_2` = `yourname`

6. Click "Deploy"

7. Xong! Link sẽ là: `https://your-project.vercel.app`

### B. Từ CLI

```bash
# Cài Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Thêm env vars
vercel env add VITE_AFFILIATE_ID
vercel env add VITE_SUB_ID_1
vercel env add VITE_SUB_ID_2

# Deploy production
vercel --prod
```

## ✅ Hoàn tất!

Bây giờ bạn có:
- ✅ Website tạo link affiliate tự động
- ✅ Chỉ cần paste link Shopee là xong
- ✅ Deploy miễn phí trên Vercel
- ✅ Domain miễn phí `.vercel.app`

## 💡 Tips

- Chia sẻ link website với team/bạn bè để họ cũng dùng
- Mỗi người có thể fork và config affiliate ID riêng
- Tracking được thông qua Sub ID

---

🎉 **Chúc bạn kiếm được nhiều commission!**
