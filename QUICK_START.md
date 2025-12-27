# Quick Start Guide 🚀

เริ่มต้นใช้งาน AI Marketing Platform ภายใน 10 นาที!

## 📋 สิ่งที่ต้องเตรียม

- Node.js 18+ ([ดาวน์โหลด](https://nodejs.org/))
- npm หรือ yarn
- Supabase account ([สมัครฟรี](https://supabase.com/))
- Git

## ⚡ เริ่มต้นแบบเร็ว (Local Development)

### 1. Clone & Install (2 นาที)

\`\`\`bash
# Clone project
git clone <your-repo-url>
cd ai-marketing-platform

# ติดตั้ง dependencies
npm install
\`\`\`

### 2. Setup Supabase (5 นาที)

#### สร้าง Project:
1. ไปที่ [supabase.com/dashboard](https://supabase.com/dashboard)
2. คลิก "New Project"
3. เลือก region: **Southeast Asia (Singapore)**
4. สร้างรหัสผ่าน database
5. คลิก "Create new project" และรอ 2-3 นาที

#### ปิด Email Confirmation:
1. ไปที่ **Authentication** → **Providers**
2. คลิกที่ **Email**
3. **ปิด** "Confirm email"
4. Save

#### รัน Database Migration:
1. ไปที่ **SQL Editor**
2. คลิก "New query"
3. Copy SQL จาก `supabase/migrations/001_create_profiles.sql`
4. Paste และ Run

#### ดึง API Keys:
1. ไปที่ **Project Settings** → **API**
2. Copy:
   - Project URL
   - anon/public key
   - service_role key

### 3. ตั้งค่า Environment Variables (1 นาที)

สร้างไฟล์ `.env.local`:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
OPENROUTER_API_KEY=sk-or-...  # Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 4. รัน Development Server (1 นาที)

\`\`\`bash
npm run dev
\`\`\`

เปิด [http://localhost:3000](http://localhost:3000) 🎉

## ✅ ทดสอบ

1. ✅ เห็น Landing Page สวยงาม
2. ✅ คลิก "ลงทะเบียนฟรี"
3. ✅ สมัครสมาชิกด้วยอีเมล (ไม่ต้องยืนยัน)
4. ✅ เข้าสู่ระบบสำเร็จ
5. ✅ เห็น Dashboard

## 🎯 ขั้นตอนถัดไป

### ถ้าต้องการใช้งาน Local:
- ✅ เสร็จแล้ว! ใช้งานได้เลย

### ถ้าต้องการ Deploy บน Internet:
- 📖 อ่าน `DEPLOYMENT.md` สำหรับคำแนะนำการ deploy บน Vercel

### ถ้าต้องการเพิ่ม AI Features:
1. สมัคร OpenRouter ([openrouter.ai](https://openrouter.ai/))
2. ดึง API key
3. เพิ่มใน `.env.local`:
   \`\`\`env
   OPENROUTER_API_KEY=sk-or-v1-xxx...
   \`\`\`
4. จาก code ที่ทำไว้ ฟีเจอร์พร้อมต่อยอดทันที!

## 🐛 มีปัญหา?

### Build Error
\`\`\`bash
# ลองลบ node_modules และติดตั้งใหม่
rm -rf node_modules .next
npm install
npm run build
\`\`\`

### ไม่สามารถ Login
- ตรวจสอบว่า Supabase URL และ Keys ถูกต้อง
- ตรวจสอบว่าปิด email confirmation แล้ว
- ดู Supabase logs: **Authentication** → **Logs**

### หน้าจอแสดงผลผิดปกติ
- Clear browser cache
- Restart dev server

## 📚 Documentation

- 📖 [README.md](README.md) - ภาพรวมโปรเจกต์
- 🔧 [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Setup Supabase แบบละเอียด
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy บน Vercel
- 🔑 [ENV_SETUP.md](ENV_SETUP.md) - Environment variables

## 🎉 สำเร็จ!

ยินดีด้วย! คุณได้ AI Marketing Platform ทำงานแล้ว 🚀

Happy coding! 💙

