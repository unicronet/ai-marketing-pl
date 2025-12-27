# Environment Variables Setup

สร้างไฟล์ `.env.local` ที่ root ของโปรเจกต์และเพิ่มข้อมูลต่อไปนี้:

\`\`\`env
# Supabase Configuration
# ดูวิธีการดึงค่าเหล่านี้ได้ที่ SUPABASE_SETUP.md
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# OpenRouter Configuration (for future AI features)
# สมัครได้ที่ https://openrouter.ai/
OPENROUTER_API_KEY=your-openrouter-api-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## หมายเหตุ

- **อย่า commit** ไฟล์ `.env.local` ขึ้น Git
- สำหรับ production บน Vercel ให้เพิ่ม environment variables เหล่านี้ใน Vercel Dashboard

