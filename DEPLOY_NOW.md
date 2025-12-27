# 🚀 Deploy ทันที - 2 วิธี

## วิธีที่ 1: Vercel CLI (เร็วที่สุด) ⚡

### ขั้นตอน:

```bash
# 1. Login Vercel
npx vercel login

# 2. Deploy (Preview)
npx vercel

# 3. Deploy to Production
npx vercel --prod
```

### Environment Variables

หลัง deploy สำเร็จ, เพิ่ม Environment Variables:

```bash
# ไปที่ Vercel Dashboard → Settings → Environment Variables
# หรือใช้ CLI:

npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
npx vercel env add OPENROUTER_API_KEY
npx vercel env add REPLICATE_API_TOKEN
npx vercel env add NEXT_PUBLIC_APP_URL
```

---

## วิธีที่ 2: GitHub + Vercel (Auto Deploy) 🔄

### ขั้นตอน:

#### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial deployment"
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

#### 2. Import to Vercel

1. ไปที่ [vercel.com/new](https://vercel.com/new)
2. เลือก GitHub Repository
3. เพิ่ม Environment Variables (ดูด้านล่าง)
4. คลิก **Deploy**

---

## 🔑 Environment Variables ที่ต้องเพิ่ม

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI APIs
OPENROUTER_API_KEY=sk-or-v1-xxxxx
REPLICATE_API_TOKEN=r8_O0Qgaqr2FxTDSVvevKjk2yLjxI4x6oE4AMDCT

# App URL (อัปเดตหลัง deploy ครั้งแรก)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# Storage (optional)
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=banners
```

---

## ✅ หลัง Deploy

### 1. อัปเดต App URL

**Vercel:**
- Settings → Environment Variables
- แก้ `NEXT_PUBLIC_APP_URL` เป็น URL ที่ได้
- Redeploy

### 2. ตั้งค่า Supabase

**Authentication → URL Configuration:**

Site URL:
```
https://your-app.vercel.app
```

Redirect URLs:
```
https://your-app.vercel.app/*
https://your-app.vercel.app/auth/callback
```

---

## 🎯 Quick Commands

### Vercel CLI

```bash
# Login
npx vercel login

# Deploy (Preview)
npx vercel

# Deploy (Production)
npx vercel --prod

# View logs
npx vercel logs

# List deployments
npx vercel ls
```

---

## 📋 Checklist

- [ ] Login Vercel (CLI หรือ Web)
- [ ] Deploy project
- [ ] เพิ่ม Environment Variables ครบ
- [ ] ได้ URL แล้ว
- [ ] อัปเดต `NEXT_PUBLIC_APP_URL`
- [ ] Redeploy
- [ ] ตั้งค่า Supabase Redirect URLs
- [ ] ทดสอบเว็บไซต์
- [ ] ทดสอบ Login
- [ ] ทดสอบ AI Features

---

**พร้อม Deploy แล้ว!** 🚀

