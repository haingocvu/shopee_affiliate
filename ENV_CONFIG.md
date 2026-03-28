# ⚙️ Hướng Dẫn Config Environment Variables

## 🔧 Cấu hình Local (Development)

1. Copy file `.env.example` thành `.env`:
```bash
cp .env.example .env
```

2. Điền thông tin vào file `.env`:
```env
VITE_AFFILIATE_ID=17382370178
VITE_SUB_ID_1=addlivetag
VITE_SUB_ID_2=yourname
```

3. Restart dev server:
```bash
npm run dev
```

## 🌐 Deploy lên Vercel với Environment Variables

### Cách 1: Qua Vercel Dashboard (Web UI)

1. Deploy project lên Vercel
2. Vào project settings: `your-project.vercel.app` → Settings → Environment Variables
3. Thêm các biến:
   - `VITE_AFFILIATE_ID` = `17382370178` (ID của bạn)
   - `VITE_SUB_ID_1` = `addlivetag`
   - `VITE_SUB_ID_2` = `yourname` (tùy chọn)
4. Chọn môi trường: **Production, Preview, Development**
5. Save và Redeploy

### Cách 2: Từ CLI

```bash
# Login Vercel
vercel login

# Link project
vercel link

# Thêm environment variables
vercel env add VITE_AFFILIATE_ID
# Nhập value: 17382370178

vercel env add VITE_SUB_ID_1
# Nhập value: addlivetag

vercel env add VITE_SUB_ID_2
# Nhập value: yourname

# Deploy với env vars
vercel --prod
```

### Cách 3: Qua vercel.json

Tạo file `vercel.json`:
```json
{
  "env": {
    "VITE_AFFILIATE_ID": "17382370178",
    "VITE_SUB_ID_1": "addlivetag",
    "VITE_SUB_ID_2": "yourname"
  }
}
```

⚠️ **CHÚ Ý**: Không commit file này nếu muốn giữ bí mật!

## 🔒 Bảo mật

- File `.env` đã được thêm vào `.gitignore`
- Không commit `.env` lên GitHub
- Chỉ config trên Vercel Dashboard hoặc CLI
- Environment variables chỉ được build vào code khi deploy

## 🎯 Cách hoạt động

Khi user vào website:
- Các ô input sẽ tự động điền sẵn giá trị từ env vars
- User chỉ cần paste link Shopee và click "Tạo Link Ngay"
- Giúp tiết kiệm thời gian và đồng nhất tracking

## ✅ Ưu điểm

- ✅ Không cần nhập Affiliate ID mỗi lần
- ✅ Dễ quản lý nhiều Sub ID cho tracking
- ✅ Có thể tạo nhiều version với các affiliate ID khác nhau
- ✅ An toàn hơn khi không hardcode trong code

## 📱 Ví dụ trên Vercel

Sau khi config xong, truy cập:
```
https://your-shopee-affiliate.vercel.app
```

Các ô Affiliate ID và Sub ID sẽ tự động có giá trị từ environment variables!
