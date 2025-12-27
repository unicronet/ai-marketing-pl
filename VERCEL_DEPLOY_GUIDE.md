# 🚀 Vercel Deployment - Complete Guide

## เริ่มต้น Deploy บน Vercel ใน 10 นาที!

---

## 📋 Checklist ก่อน Deploy

### ✅ สิ่งที่ต้องมี:

- [ ] **Supabase Project** พร้อม:
  - [ ] Tables: profiles, content, banners
  - [ ] Storage bucket: banners
  - [ ] Policies ครบถ้วน
  - [ ] Email confirmation ปิด

- [ ] **API Keys:**
  - [ ] Supabase URL & Anon Key
  - [ ] OpenRouter API Key (สำหรับ text generation)
  - [ ] Replicate API Token (สำหรับ banner generation)

- [ ] **GitHub Account** พร้อม repository

- [ ] **Vercel Account** (สมัครฟรี)

---

## 🎯 Step-by-Step Deployment

### 1️⃣ เตรียม Code

#### A. ตรวจสอบไฟล์สำคัญ

```bash
# ตรวจสอบว่ามีไฟล์เหล่านี้:
ls -la
# - package.json ✅
# - next.config.ts ✅
# - vercel.json ✅ (ถ้ามี)
```

#### B. Test Build ใน Local

```bash
# Build และทดสอบ
npm run build
npm run start

# ถ้า build สำเร็จ → พร้อม deploy!
```

---

### 2️⃣ Push to GitHub

```bash
# Initialize Git (ถ้ายังไม่ได้ทำ)
git init
git add .
git commit -m "Ready for Vercel deployment"

# สร้าง Repository ใหม่บน GitHub
# จากนั้น:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

### 3️⃣ Deploy บน Vercel

#### A. Import Project

1. ไปที่ [vercel.com/new](https://vercel.com/new)
2. เชื่อม GitHub account (ถ้ายังไม่ได้เชื่อม)
3. เลือก Repository ของคุณ
4. คลิก **"Import"**

#### B. Configure Project

**Framework Preset:** Next.js (auto-detect ✅)

**Root Directory:** `.` (default)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

---

### 4️⃣ เพิ่ม Environment Variables

ในหน้า **Configure Project**, คลิก **Environment Variables** แล้วเพิ่ม:

#### 🔐 Supabase

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 🤖 AI APIs

```env
OPENROUTER_API_KEY=sk-or-v1-xxxxx
REPLICATE_API_TOKEN=r8_O0Qgaqr2FxTDSVvevKjk2yLjxI4x6oE4AMDCT
```

#### 🌐 App URL

```env
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```
*(อัปเดตหลัง deploy ครั้งแรก)*

#### 💾 Storage (Optional)

```env
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=banners
```

---

### 5️⃣ Deploy!

1. คลิก **"Deploy"**
2. รอ 2-5 นาที
3. เมื่อเสร็จ จะได้ URL: `https://your-app-xxxxx.vercel.app`

---

### 6️⃣ อัปเดต App URL

#### A. ใน Vercel

1. **Settings** → **Environment Variables**
2. แก้ `NEXT_PUBLIC_APP_URL` เป็น URL ที่ได้
3. คลิก **Save**

#### B. Redeploy

1. **Deployments** → เลือก deployment ล่าสุด
2. คลิก **⋯** → **Redeploy**
3. เลือก **Use existing Build Cache**
4. คลิก **Redeploy**

---

### 7️⃣ ตั้งค่า Supabase Redirect URLs

#### A. เข้า Supabase Dashboard

**Authentication** → **URL Configuration**

#### B. เพิ่ม URLs

**Site URL:**
```
https://your-app.vercel.app
```

**Redirect URLs:** (เพิ่มทั้งหมด)
```
https://your-app.vercel.app/*
https://your-app.vercel.app/auth/callback
http://localhost:3000/*
http://localhost:3000/auth/callback
```

#### C. Save

คลิก **Save**

---

## ✅ ทดสอบหลัง Deploy

### 1. Landing Page
```
https://your-app.vercel.app
```
- [ ] โหลดได้
- [ ] CSS แสดงผลถูกต้อง
- [ ] Navigation ทำงาน

### 2. Authentication
- [ ] สมัครสมาชิกได้
- [ ] Login ได้
- [ ] ไม่ต้องยืนยันอีเมล

### 3. Dashboard
- [ ] เข้า Dashboard ได้
- [ ] Sidebar แสดงผล
- [ ] Protected routes ทำงาน

### 4. AI Features
- [ ] สร้างคอนเทนต์ได้ (OpenRouter)
- [ ] สร้างแบนเนอร์ได้ (Replicate) 🍌
- [ ] ภาพ upload ไป Storage
- [ ] ดาวน์โหลดภาพได้

---

## 🎨 Custom Domain (Optional)

### เพิ่ม Domain ของคุณ

1. **Settings** → **Domains**
2. คลิก **Add**
3. ใส่ domain (เช่น `myapp.com`)
4. ทำตาม DNS instructions
5. รอ propagation (5-60 นาที)

### อัปเดต Environment Variables

```env
NEXT_PUBLIC_APP_URL=https://myapp.com
```

### อัปเดต Supabase Redirect URLs

เพิ่ม:
```
https://myapp.com/*
https://myapp.com/auth/callback
```

---

## 🔄 Auto Deployments

Vercel จะ auto-deploy เมื่อ:

| Branch | Deploy Type | URL |
|--------|-------------|-----|
| `main` | Production | `your-app.vercel.app` |
| อื่นๆ | Preview | `your-app-git-branch.vercel.app` |

---

## 📊 Monitoring & Analytics

### ดู Performance

1. **Dashboard** → Project
2. **Analytics** - ดูจำนวน visitors
3. **Speed Insights** - ดูความเร็ว
4. **Logs** - ดู errors

### Real-time Logs

```bash
# ใช้ Vercel CLI
npx vercel logs
```

---

## 🐛 Troubleshooting

### ❌ Build Failed

**ตรวจสอบ:**
```bash
# Local build
npm run build

# ถ้าผ่าน แต่ Vercel ไม่ผ่าน:
# - ตรวจสอบ Node version
# - ดู Build Logs ใน Vercel
```

**แก้ไข:**
- เพิ่ม `engines` ใน `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

### ❌ Login ไม่ได้

**สาเหตุ:**
- Redirect URLs ไม่ถูกต้อง
- Environment variables ผิด

**แก้ไข:**
1. ตรวจสอบ Supabase Redirect URLs
2. ตรวจสอบ `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy

---

### ❌ AI Features ไม่ทำงาน

**Content Generation ไม่ทำงาน:**
- ตรวจสอบ `OPENROUTER_API_KEY`
- ดู Vercel Logs

**Banner Generation ไม่ทำงาน:**
- ตรวจสอบ `REPLICATE_API_TOKEN`
- ตรวจสอบ Supabase Storage bucket
- ตรวจสอบ Storage Policies

---

### ❌ Storage Upload ไม่ได้

**ตรวจสอบ:**
1. Supabase Storage bucket `banners` มีไหม?
2. Policies ถูกต้องไหม?
3. Environment variables ครบไหม?

**แก้ไข:**
```sql
-- รัน migration อีกครั้ง
-- supabase/migrations/003_setup_storage.sql
```

---

### ❌ หน้าเว็บโหลดช้า

**แก้ไข:**
1. ใช้ Vercel **Edge Functions** (อัพเกรด Pro)
2. Enable **Image Optimization**
3. เพิ่ม **ISR** (Incremental Static Regeneration)

---

## 🔒 Security Best Practices

### 1. Environment Variables

❌ **ห้าม:**
- เปิดเผย API keys ใน code
- Commit `.env.local` ลง Git

✅ **ควร:**
- ใส่ทุก key ใน Vercel Environment Variables
- ใช้ `.env.example` เป็นตัวอย่าง

### 2. Supabase RLS

✅ **ต้องมี:**
- Row Level Security enabled
- Policies ครบทุกตาราง

### 3. API Routes

✅ **ต้องมี:**
- Authentication check
- Input validation
- Error handling

---

## 💰 Pricing

### Vercel Free Plan

✅ **ได้:**
- Unlimited deployments
- Auto HTTPS/SSL
- Preview deployments
- Analytics (basic)
- 100 GB bandwidth/month

❌ **ไม่ได้:**
- Edge Functions (Pro feature)
- Advanced analytics
- Team features

### When to Upgrade?

Upgrade Pro ($20/month) ถ้า:
- Traffic > 100 GB/month
- ต้องการ Team collaboration
- ต้องการ Advanced analytics

---

## 📚 เอกสารเพิ่มเติม

| เอกสาร | Link |
|--------|------|
| Vercel Docs | [vercel.com/docs](https://vercel.com/docs) |
| Next.js on Vercel | [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment) |
| Supabase + Vercel | [supabase.com/docs/guides/hosting/vercel](https://supabase.com/docs/guides/hosting/vercel) |

---

## 🎁 Bonus Tips

### 1. GitHub Integration

```bash
# Auto-deploy on push
git push origin main  # → Auto deploy!
```

### 2. Preview Deployments

```bash
# สร้าง branch ใหม่
git checkout -b feature/new-feature
git push origin feature/new-feature

# → Vercel สร้าง preview URL ให้อัตโนมัติ!
```

### 3. Vercel CLI

```bash
# Install
npm i -g vercel

# Deploy จาก local
vercel

# Deploy to production
vercel --prod
```

---

## ✅ Final Checklist

- [ ] Build สำเร็จใน local
- [ ] Push code to GitHub
- [ ] Import project to Vercel
- [ ] เพิ่ม Environment Variables ครบ
- [ ] Deploy สำเร็จ
- [ ] อัปเดต `NEXT_PUBLIC_APP_URL`
- [ ] Redeploy
- [ ] ตั้งค่า Supabase Redirect URLs
- [ ] ทดสอบ Landing Page
- [ ] ทดสอบ Authentication
- [ ] ทดสอบ Dashboard
- [ ] ทดสอบ AI Features
- [ ] ทดสอบ Banner Generation
- [ ] ทดสอบ Storage Upload

---

## 🎉 Congratulations!

**เว็บไซต์ของคุณ Live แล้ว!** 🚀

Share URL ของคุณ:
```
https://your-app.vercel.app
```

**Happy Coding!** 💻✨

