# Deployment Guide - Vercel

คู่มือการ deploy AI Marketing Platform บน Vercel

## 📋 Prerequisites

1. ✅ Supabase project ที่ตั้งค่าเรียบร้อยแล้ว (ดู `SUPABASE_SETUP.md`)
2. ✅ OpenRouter API key (ถ้าต้องการใช้ AI features)
3. ✅ GitHub/GitLab account
4. ✅ Vercel account ([สมัครฟรีที่นี่](https://vercel.com/signup))

## 🚀 Deployment Steps

### 1. Push Code to GitHub

\`\`\`bash
# Initialize git (ถ้ายังไม่ได้ทำ)
git init
git add .
git commit -m "Initial commit: AI Marketing Platform"

# สร้าง repository ใหม่บน GitHub แล้ว push
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
\`\`\`

### 2. Import Project to Vercel

1. ไปที่ [Vercel Dashboard](https://vercel.com/dashboard)
2. คลิก **"Add New..."** → **"Project"**
3. เลือก GitHub repository ของคุณ
4. คลิก **"Import"**

### 3. Configure Environment Variables

ในหน้า **"Configure Project"** ให้เพิ่ม Environment Variables:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI APIs
OPENROUTER_API_KEY=your-openrouter-key
REPLICATE_API_TOKEN=r8_O0Qgaqr2FxTDSVvevKjk2yLjxI4x6oE4AMDCT

# Storage (optional - ถ้าใช้ชื่ออื่น)
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=banners

# App URL (จะได้หลัง deploy ครั้งแรก)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
\`\`\`

### 4. Deploy

1. คลิก **"Deploy"**
2. รอ 2-3 นาที ให้ Vercel build และ deploy
3. เมื่อสำเร็จ จะได้ URL เช่น `https://your-app.vercel.app`

### 5. Update App URL

1. กลับไปที่ **Settings** → **Environment Variables**
2. แก้ไข `NEXT_PUBLIC_APP_URL` เป็น URL ที่ได้
3. คลิก **"Save"**
4. ไปที่ **Deployments** → คลิก **"Redeploy"** บน deployment ล่าสุด

### 6. Update Supabase Redirect URLs

1. ไปที่ Supabase Dashboard → **Authentication** → **URL Configuration**
2. เพิ่ม URL ใน **Redirect URLs**:
   - `https://your-app.vercel.app/auth/callback`
   - `https://your-app.vercel.app/*`
3. เพิ่ม URL ใน **Site URL**: `https://your-app.vercel.app`
4. คลิก **"Save"**

## ✅ Verification

ทดสอบว่าทุกอย่างทำงานได้:

1. ✅ เปิด landing page: `https://your-app.vercel.app`
2. ✅ ลองสมัครสมาชิก (ควรสำเร็จโดยไม่ต้องยืนยันอีเมล)
3. ✅ ลอง login
4. ✅ เข้า dashboard
5. ✅ ทดสอบ navigation ต่างๆ
6. ✅ ทดสอบสร้างคอนเทนต์ (AI Content Generation)
7. ✅ ทดสอบสร้างแบนเนอร์ (AI Banner Generation) 🍌
8. ✅ ตรวจสอบ Supabase Storage มีไฟล์ภาพ

## 🔧 Custom Domain (Optional)

### เพิ่ม Domain ของคุณเอง:

1. ไปที่ Vercel Dashboard → Project → **Settings** → **Domains**
2. คลิก **"Add"**
3. ใส่ domain ของคุณ (เช่น `myapp.com`)
4. ทำตาม instructions เพื่อตั้งค่า DNS
5. รอ DNS propagation (5-60 นาที)
6. อัปเดต environment variable `NEXT_PUBLIC_APP_URL` ให้เป็น domain ใหม่
7. อัปเดต Supabase Redirect URLs ให้ตรงกับ domain ใหม่

## 🐛 Troubleshooting

### ❌ Build Failed

- ตรวจสอบ error logs ใน Vercel
- ตรวจสอบว่า `npm run build` ทำงานได้ใน local

### ❌ Login ไม่ได้

- ตรวจสอบ environment variables ว่าถูกต้อง
- ตรวจสอบ Supabase Redirect URLs
- ดู Supabase logs ที่ **Authentication** → **Logs**

### ❌ ไม่มี CSS / หน้าจอแปลก

- Clear browser cache
- Redeploy project
- ตรวจสอบว่า Tailwind CSS config ถูกต้อง

## 🔄 Automatic Deployments

Vercel จะ auto-deploy ทุกครั้งที่คุณ push code ไปที่ GitHub:

- **main/master branch** → Production deployment
- **other branches** → Preview deployments

## 📊 Monitoring

ดู analytics และ performance:

1. ไปที่ Vercel Dashboard → Project
2. ดู **Analytics**, **Speed Insights**, **Logs**

## 🎉 Done!

เว็บไซต์ของคุณพร้อมใช้งานแล้ว! 🚀

## 📞 Support

หากมีปัญหา:
1. ดู [Vercel Documentation](https://vercel.com/docs)
2. ดู [Next.js Documentation](https://nextjs.org/docs)
3. ดู [Supabase Documentation](https://supabase.com/docs)

