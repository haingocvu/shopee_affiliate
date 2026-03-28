# 🚀 Hướng Dẫn Deploy Miễn Phí

## Deploy lên Vercel (Khuyên dùng - Dễ nhất)

### 1. Từ GitHub
1. Push code lên GitHub repository
2. Truy cập [vercel.com](https://vercel.com)
3. Đăng nhập bằng GitHub
4. Click "Import Project"
5. Chọn repository của bạn
6. Click "Deploy"
7. Xong! Link sẽ là: `https://your-project.vercel.app`

### 2. Từ CLI
```bash
# Cài Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

## Deploy lên Netlify

### 1. Từ GitHub
1. Push code lên GitHub
2. Truy cập [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Chọn GitHub và repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy!

### 2. Từ CLI
```bash
# Cài Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

## Deploy lên Cloudflare Pages

1. Push code lên GitHub
2. Truy cập [pages.cloudflare.com](https://pages.cloudflare.com)
3. Login và click "Create a project"
4. Chọn GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
6. Deploy!

## Deploy lên GitHub Pages (Miễn phí mãi mãi)

1. Thêm vào `vite.config.js`:
```js
export default defineConfig({
  plugins: [react()],
  base: '/ShopeeAffiliate/' // Thay bằng tên repo của bạn
})
```

2. Cài gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Thêm scripts vào `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

5. Bật GitHub Pages trong Settings > Pages > Source: gh-pages branch

## Chi phí

Tất cả các phương án trên đều **MIỄN PHÍ**:
- ✅ Vercel: Free tier (100GB bandwidth/tháng)
- ✅ Netlify: Free tier (100GB bandwidth/tháng)
- ✅ Cloudflare Pages: Unlimited requests (miễn phí)
- ✅ GitHub Pages: Miễn phí không giới hạn

## Domain tùy chỉnh (Tùy chọn)

Sau khi deploy, bạn có thể thêm domain riêng:
- Mua domain tại [Tên Miền Việt](https://tenmienviet.vn) (~200k/năm)
- Hoặc dùng Freenom cho domain miễn phí (.tk, .ml, .ga, .cf, .gq)
- Cấu hình DNS trỏ về nền tảng bạn đang dùng

## Khuyến nghị

**Vercel** là lựa chọn tốt nhất vì:
- Deploy tự động khi push code
- SSL/HTTPS miễn phí
- CDN toàn cầu
- Tốc độ cao
- Zero config
