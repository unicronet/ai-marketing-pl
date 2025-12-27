# Supabase Setup Instructions

## 1. สร้าง Supabase Project

1. ไปที่ [Supabase Dashboard](https://supabase.com/dashboard)
2. คลิก "New Project"
3. เลือก Organization
4. กรอกข้อมูล:
   - **Name:** AI Marketing Platform
   - **Database Password:** สร้างรหัสผ่านที่แข็งแรง (เก็บไว้)
   - **Region:** Southeast Asia (Singapore) - ใกล้ไทยที่สุด
5. คลิก "Create new project" และรอ 2-3 นาที

## 2. ตั้งค่า Authentication

1. ไปที่ **Authentication** → **Providers**
2. เปิดใช้งาน **Email** provider
3. ไปที่ **Authentication** → **Email Templates**
4. **ปิด Email Confirmation:**
   - ไปที่ **Authentication** → **Settings** (หรือ URL Settings)
   - ค้นหา "Email Confirmation"
   - **ปิด** "Enable email confirmations"
   - หรือในส่วน **Email Auth** → ปิด "Confirm email"

## 3. รัน Database Migration

1. ไปที่ **SQL Editor** ใน Supabase Dashboard
2. คลิก "New query"
3. Copy เนื้อหาจากไฟล์ `supabase/migrations/001_create_profiles.sql`
4. Paste ลงใน SQL Editor
5. คลิก "Run" เพื่อสร้าง profiles table และ RLS policies

## 4. ดึง API Keys

1. ไปที่ **Project Settings** → **API**
2. Copy ข้อมูลต่อไปนี้:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (เก็บเป็นความลับ!)

## 5. อัปเดต Environment Variables

1. เปิดไฟล์ `.env.local`
2. แทนที่ค่าว่างด้วย API keys ที่ copy มา:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
\`\`\`

## 6. ทดสอบการเชื่อมต่อ

1. รัน development server:
   \`\`\`bash
   npm run dev
   \`\`\`

2. เปิด http://localhost:3000
3. ลอง Register account ใหม่
4. ตรวจสอบใน Supabase Dashboard → **Authentication** → **Users** ว่ามี user ใหม่หรือไม่

## สำเร็จ! 🎉

Supabase ของคุณพร้อมใช้งานแล้ว ระบบจะ:
- ไม่ต้องยืนยัน Email (สมัครแล้วใช้ได้ทันที)
- สร้าง profile อัตโนมัติเมื่อ user ลงทะเบียน
- มี Row Level Security ป้องกันข้อมูล

## หมายเหตุ

- **ห้าม commit** ไฟล์ `.env.local` ขึ้น Git
- เก็บ `service_role_key` เป็นความลับ อย่าแชร์ใครเด็ดขาด
- สำหรับ production ให้ตั้งค่า environment variables ใน Vercel

