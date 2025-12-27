# 🚀 Quick Start: Banner Generation Feature

## เริ่มใช้งานภายใน 5 นาที!

### 1️⃣ ตั้งค่า API Token

สร้างไฟล์ `.env.local` ในโฟลเดอร์ root:

```env
REPLICATE_API_TOKEN=r8_O0Qgaqr2FxTDSVvevKjk2yLjxI4x6oE4AMDCT
```

> **หมายเหตุ:** Token นี้ถูกฝังไว้ในโค้ดแล้ว แต่แนะนำให้ใส่ใน .env.local

### 2️⃣ รัน Database Migration

เปิด **Supabase Dashboard** → **SQL Editor** → วาง SQL นี้:

```sql
-- คัดลอกจากไฟล์ supabase/migrations/002_create_content_and_banners.sql
-- และ Execute
```

หรือใช้ Supabase CLI:

```bash
supabase db push
```

### 3️⃣ รัน Development Server

```bash
npm run dev
```

### 4️⃣ ทดลองใช้งาน

1. เปิด http://localhost:3000
2. Login เข้าสู่ระบบ
3. คลิกเมนู **"สร้างแบนเนอร์"** 🖼️
4. กรอกคำอธิบายภาพ เช่น:

```
ภาพแบนเนอร์สำหรับร้านกาแฟ มีถ้วยกาแฟร้อน ๆ บนโต๊ะไม้ 
บรรยากาศอบอุ่น แสงสีส้ม สไตล์มินิมอล คุณภาพสูง
```

5. เลือกขนาด (เช่น Facebook Post: 1200×630)
6. กด **"สร้างภาพแบนเนอร์"**
7. รอ 10-30 วินาที
8. ดาวน์โหลดภาพ! ✨

## 🎨 ตัวเลือกที่แนะนำ

### ความละเอียด (Resolution)
- **1K** - ความละเอียดต่ำ, รวดเร็ว
- **2K** - ความละเอียดกลาง, แนะนำ ✅
- **4K** - ความละเอียดสูง, คุณภาพสูงสุด

### สัดส่วนภาพ (Aspect Ratio)
| Use Case | Ratio | Platform |
|----------|-------|----------|
| YouTube, Website | 16:9 | Landscape Wide ✅ |
| Presentation | 4:3 | Standard |
| Instagram Post | 1:1 | Square |
| Instagram Story | 3:4 | Portrait |
| TikTok, Reels | 9:16 | Vertical |

## 💡 Prompt Tips

### ✅ ดี
```
Professional website banner, modern tech company, 
gradient blue background, floating geometric shapes,
clean minimal design, high quality, 4K
```

### ❌ ไม่ดี
```
banner
```

### 🔑 สูตรสำเร็จ
```
[ประเภท] + [หัวข้อ] + [สไตล์] + [สี/Mood] + [คุณภาพ]
```

## 📝 ตัวอย่าง Prompts

### ร้านอาหาร
```
Elegant restaurant banner, delicious Thai food presentation,
wooden table, warm lighting, professional photography,
appetizing colors, high quality
```

### E-commerce
```
Modern e-commerce sale banner, vibrant gradient background,
floating product elements, energetic style, bright colors,
professional design, 4K quality
```

### เทคโนโลยี
```
Tech startup banner, futuristic design, dark blue gradient,
geometric patterns, modern minimal, professional, clean,
high-tech atmosphere
```

### การศึกษา
```
Educational platform banner, books and learning elements,
friendly atmosphere, soft pastel colors, modern design,
inspirational mood, professional quality
```

## 🐛 Troubleshooting

### ปัญหา: "ไม่ได้รับอนุญาต"
**แก้ไข:** Login เข้าสู่ระบบก่อน

### ปัญหา: "เกิดข้อผิดพลาด"
**แก้ไข:** 
1. ตรวจสอบ REPLICATE_API_TOKEN
2. ตรวจสอบ internet connection
3. ลองใหม่อีกครั้ง

### ปัญหา: "ไม่สามารถบันทึกได้"
**แก้ไข:**
1. ตรวจสอบ Supabase connection
2. ตรวจสอบว่ารัน migration แล้ว
3. ตรวจสอบ RLS policies

## 📚 เอกสารเพิ่มเติม

- 📖 [BANNER_FEATURE.md](./BANNER_FEATURE.md) - เอกสารฉบับเต็ม
- 📊 [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - รายละเอียดการพัฒนา
- 📘 [README.md](./README.md) - เอกสารโปรเจกต์

## ⚡ API Usage (สำหรับนักพัฒนา)

```typescript
const response = await fetch('/api/ai/banner', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Your banner description here',
    resolution: '2K',
    aspect_ratio: '16:9',
    output_format: 'png',
    safety_filter_level: 'block_only_high',
  }),
})

const { imageUrl } = await response.json()
```

## 🎯 Next Steps

หลังจากสร้างภาพแบนเนอร์แล้ว คุณสามารถ:

- ✅ ดาวน์โหลดภาพ (PNG format, high quality)
- ✅ ใช้ในโซเชียลมีเดีย
- ✅ ใช้ในเว็บไซต์
- ✅ แก้ไขต่อใน Photoshop/Figma
- ✅ สร้างภาพใหม่ด้วย prompt ที่แตกต่าง

---

**สนุกกับการสร้างแบนเนอร์!** 🎨✨

