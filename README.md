# AI Marketing Platform 🚀

แพลตฟอร์มสร้างคอนเทนต์การตลาดด้วย AI สำหรับธุรกิจไทย

## ✨ Features

- 🎨 **Landing Page** สวยงาม responsive ภาษาไทย
- 🔐 **ระบบสมาชิก** พร้อม Authentication (ไม่ต้องยืนยันอีเมล)
- 📊 **Dashboard** ที่ใช้งานง่าย พร้อม sidebar navigation
- 🤖 **AI Content Generation** สร้างคอนเทนต์การตลาดด้วย AI
- 🖼️ **AI Banner Generation** สร้างภาพแบนเนอร์ด้วย Replicate (Nano Banana Pro 🍌)
- 🎨 **สีธีม** ขาว-ฟ้า Premium Professional
- 📱 **Responsive** ใช้งานได้ทุกอุปกรณ์

## 🛠 Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, React 19
- **Styling:** Tailwind CSS, shadcn/ui
- **Icons:** Iconify
- **Backend:** Supabase (Auth + Database)
- **AI:** 
  - OpenRouter (Text Content Generation)
  - Replicate (Image Generation - Google Nano Banana Pro 🍌)
- **Deployment:** Vercel

## 📦 Installation

1. Clone repository:
\`\`\`bash
git clone <your-repo-url>
cd ai-marketing-platform
\`\`\`

2. ติดตั้ง dependencies:
\`\`\`bash
npm install
\`\`\`

3. สร้างไฟล์ \`.env.local\` (ดูจาก \`ENV_SETUP.md\`):
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENROUTER_API_KEY=your-openrouter-key
REPLICATE_API_TOKEN=your-replicate-token
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

4. Setup Supabase (ดูรายละเอียดใน \`SUPABASE_SETUP.md\`):
   - สร้าง Supabase project
   - รัน migration ใน \`supabase/migrations/001_create_profiles.sql\`
   - รัน migration ใน \`supabase/migrations/002_create_content_and_banners.sql\`
   - ปิด email confirmation

5. รัน development server:
\`\`\`bash
npm run dev
\`\`\`

6. เปิด [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

ดูคำแนะนำการ deploy บน Vercel ได้ที่ \`DEPLOYMENT.md\`

## 📁 Project Structure

\`\`\`
├── app/
│   ├── (auth)/          # Login, Register pages
│   ├── dashboard/       # Protected dashboard pages
│   │   ├── banner/      # AI Banner Generation
│   │   ├── content/     # AI Content Generation
│   │   └── ...
│   ├── api/
│   │   └── ai/
│   │       ├── banner/  # Banner generation API
│   │       └── generate/# Content generation API
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
├── components/
│   ├── landing/         # Landing page components
│   ├── dashboard/       # Dashboard components
│   └── ui/              # shadcn/ui components
├── lib/
│   └── supabase/        # Supabase client utilities
└── supabase/
    └── migrations/      # Database migrations
\`\`\`

## 🎨 Design System

- **Primary Color:** Blue (#3B82F6, #2563EB)
- **Accent Color:** Cyan (#06B6D4, #0EA5E9)
- **Background:** White, Light Gray
- **Font:** Noto Sans Thai

## 📝 Features Roadmap

- [x] Landing Page
- [x] Authentication System
- [x] Dashboard Layout
- [x] Basic UI/UX
- [x] AI Content Generation (OpenRouter integration)
- [x] AI Banner Generation (Replicate Nano Banana Pro)
- [ ] Content History & Management
- [ ] User Profile Management
- [ ] Export Content functionality

## 🖼️ Banner Generation Feature

สร้างภาพแบนเนอร์คุณภาพสูงด้วย AI! ดูรายละเอียดเพิ่มเติมได้ที่ [`BANNER_FEATURE.md`](./BANNER_FEATURE.md)

**คุณสมบัติหลัก:**
- สร้างภาพจากคำอธิบาย (Text-to-Image)
- รองรับความละเอียด 1K, 2K, 4K
- รองรับสัดส่วนภาพ 16:9, 4:3, 1:1, 3:4, 9:16
- ใช้โมเดล Google Nano Banana Pro 🍌 จาก Replicate
- ดาวน์โหลดภาพได้ในรูปแบบ PNG, JPG, WebP
- บันทึกประวัติการสร้างลงฐานข้อมูล

## 🤝 Contributing

Pull requests are welcome! สำหรับการเปลี่ยนแปลงใหญ่ กรุณาเปิด issue ก่อน

## 📄 License

MIT

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Iconify](https://iconify.design/)
- [OpenRouter](https://openrouter.ai/)
- [Replicate](https://replicate.com/)
