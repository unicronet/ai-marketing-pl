# 🚀 Storage Quick Start - เริ่มใช้งานใน 5 นาที!

## 📝 ภาพรวม

เพิ่มฟีเจอร์ Upload ภาพแบนเนอร์ที่สร้างจาก AI ไป **Supabase Storage** แทนที่จะพึ่ง URL จาก Replicate เพียงอย่างเดียว

## ⚡ ทำไมต้อง Upload ไป Storage?

| ปัญหา | แก้ไขได้ |
|-------|----------|
| ❌ Replicate URL อาจหมดอายุ | ✅ เก็บถาวรใน Supabase |
| ❌ ไม่สามารถควบคุม URL | ✅ ใช้ URL ของเราเอง |
| ❌ ไม่มี CDN | ✅ Supabase มี CDN ในตัว |
| ❌ ไม่มี backup | ✅ มี backup 2 URL |

---

## 🎯 วิธีการทำงาน

```
1. สร้างภาพจาก Replicate ✅
   ↓
2. Download ภาพจาก Replicate URL
   ↓
3. Upload ไป Supabase Storage 📤
   ↓
4. ได้ Public URL จาก Supabase
   ↓
5. บันทึก 2 URLs ลงฐานข้อมูล:
   - image_url (Supabase - หลัก)
   - replicate_url (Replicate - สำรอง)
```

---

## 📋 ขั้นตอนการตั้งค่า

### 1️⃣ รัน Migration

เปิด **Supabase Dashboard** → **SQL Editor**

#### Migration 1: Database Tables
```sql
-- คัดลอกและรันจากไฟล์:
supabase/migrations/002_create_content_and_banners.sql
```

#### Migration 2: Storage Setup
```sql
-- คัดลอกและรันจากไฟล์:
supabase/migrations/003_setup_storage.sql
```

หรือใช้ Supabase CLI:
```bash
supabase db push
```

---

### 2️⃣ ตรวจสอบ Storage Bucket

1. เข้า **Storage** ในเมนูซ้าย
2. ควรเห็น bucket ชื่อ **"banners"**
3. คลิกเข้าไป → ควรว่างเปล่า (ยังไม่มีไฟล์)

---

### 3️⃣ ทดสอบ Upload (Optional)

ใน **Storage** → **banners**:
1. คลิก **"Upload file"**
2. เลือกรูปภาพทดสอบ
3. Upload สำเร็จ → ✅ Storage พร้อมใช้งาน!

---

### 4️⃣ Restart Dev Server

```bash
# หยุด server (Ctrl+C)
# แล้วรันใหม่
npm run dev
```

---

## 🎨 ทดสอบฟีเจอร์

### 1. สร้างภาพแบนเนอร์

1. เข้า `/dashboard/banner`
2. กรอก Prompt
3. เลือก Resolution, Aspect Ratio, Format
4. กด **"สร้างภาพแบนเนอร์"**

### 2. ตรวจสอบ Response

เปิด **Developer Tools** → **Network** → **banner**

**Response ใหม่:**
```json
{
  "imageUrl": "https://.../banners/user-id/timestamp_2K_16-9.png",
  "replicateUrl": "https://replicate.delivery/...",
  "saved": true,
  "uploadedToStorage": true,
  "id": "uuid",
  "resolution": "2K",
  "aspect_ratio": "16:9"
}
```

**สังเกต:**
- `imageUrl`: URL จาก Supabase Storage (ใช้ URL นี้)
- `replicateUrl`: URL จาก Replicate (สำรอง)
- `uploadedToStorage`: true = Upload สำเร็จ

### 3. ตรวจสอบใน Storage

1. เข้า **Supabase** → **Storage** → **banners**
2. เปิด folder ตามชื่อ user ID
3. ควรเห็นไฟล์รูปที่เพิ่งสร้าง!

---

## 📂 โครงสร้างไฟล์

```
Storage: banners/
├── user-uuid-1/
│   ├── 1735303200000_2K_16-9.png
│   ├── 1735303300000_4K_1-1.jpg
│   └── 1735303400000_2K_3-4.webp
├── user-uuid-2/
│   └── 1735303500000_2K_16-9.png
└── user-uuid-3/
    └── 1735303600000_4K_16-9.jpg

Pattern:
{user_id}/{timestamp}_{resolution}_{aspect_ratio}.{format}
```

---

## 🗄️ Database Schema

### ตาราง `banners`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | ผู้สร้าง |
| prompt | text | คำอธิบายภาพ |
| **image_url** | text | **URL หลัก (Supabase)** |
| **replicate_url** | text | **URL สำรอง (Replicate)** |
| resolution | text | 1K, 2K, 4K |
| aspect_ratio | text | 16:9, 4:3, etc. |
| created_at | timestamp | เวลาสร้าง |

---

## 🔍 ตรวจสอบ Storage Usage

### ผ่าน SQL

```sql
-- ดูการใช้งาน storage ของ user
SELECT * FROM get_user_storage_usage('user-uuid-here');

-- ผลลัพธ์:
-- file_count | total_size_mb
-- -----------+--------------
--          5 |         12.45
```

### ผ่าน Dashboard

1. **Storage** → **banners**
2. ดูขนาดไฟล์แต่ละไฟล์
3. ดูจำนวนไฟล์ทั้งหมด

---

## 🧹 Cleanup (ถ้าต้องการ)

### ลบไฟล์เก่า (> 90 วัน)

```sql
SELECT cleanup_old_banner_files(90);
```

### ลบไฟล์ของ User เฉพาะ

```sql
DELETE FROM storage.objects
WHERE bucket_id = 'banners'
  AND (storage.foldername(name))[1] = 'user-uuid-here';
```

---

## 🚨 Troubleshooting

### ปัญหา 1: Upload ไม่สำเร็จ

**ตรวจสอบ:**
```sql
-- ตรวจสอบ bucket
SELECT * FROM storage.buckets WHERE id = 'banners';

-- ตรวจสอบ policies
SELECT * FROM storage.policies WHERE bucket_id = 'banners';
```

**แก้ไข:**
- รัน migration 003 ใหม่
- ตรวจสอบ authentication

### ปัญหา 2: URL ไม่สามารถเข้าถึงได้

**เช็ค:**
- Bucket ต้อง public = true
- Policy "Public Read" ต้องมี
- URL format ถูกต้อง

### ปัญหา 3: ไฟล์ขนาดใหญ่เกินไป

**แก้ไข:**
```sql
-- เพิ่ม file size limit เป็น 100 MB
UPDATE storage.buckets
SET file_size_limit = 104857600
WHERE id = 'banners';
```

---

## 📊 Storage Limits

### Free Plan
- ✅ Storage: **1 GB**
- ✅ Bandwidth: **2 GB/month**
- ✅ File Size: **50 MB** (ปรับได้)

### Pro Plan ($25/month)
- ✅ Storage: **100 GB**
- ✅ Bandwidth: **200 GB/month**
- ✅ File Size: **5 GB**

---

## ✨ ฟีเจอร์ที่ได้รับ

### ก่อน (ไม่มี Storage)
```json
{
  "imageUrl": "https://replicate.delivery/...", // อาจหมดอายุ
  "saved": false,
  "error": "บันทึกไม่ได้"
}
```

### หลัง (มี Storage)
```json
{
  "imageUrl": "https://your-project.supabase.co/storage/v1/object/public/banners/...",
  "replicateUrl": "https://replicate.delivery/...",
  "saved": true,
  "uploadedToStorage": true,
  "id": "uuid"
}
```

---

## 🎯 Best Practices

1. **ใช้ Supabase URL เป็นหลัก**
   ```typescript
   const imageToDisplay = data.imageUrl // Supabase Storage
   ```

2. **Replicate URL เป็น fallback**
   ```typescript
   const fallbackUrl = data.replicateUrl // ถ้า Supabase ล้ม
   ```

3. **ลบไฟล์เก่าเป็นระยะ**
   ```sql
   -- ทุก 3 เดือน
   SELECT cleanup_old_banner_files(90);
   ```

4. **Monitor Storage Usage**
   ```sql
   -- เช็คทุกวัน
   SELECT 
     SUM((metadata->>'size')::bigint) / 1024 / 1024 as total_mb
   FROM storage.objects
   WHERE bucket_id = 'banners';
   ```

---

## 📚 ไฟล์ที่เกี่ยวข้อง

| ไฟล์ | คำอธิบาย |
|------|----------|
| `app/api/ai/banner/route.ts` | API route พร้อม Storage upload |
| `supabase/migrations/002_*.sql` | Database schema |
| `supabase/migrations/003_*.sql` | Storage setup |
| `SUPABASE_STORAGE_SETUP.md` | คู่มือฉบับเต็ม |

---

## ✅ Checklist

- [ ] รัน migration 002 (database)
- [ ] รัน migration 003 (storage)
- [ ] ตรวจสอบ bucket "banners" ใน dashboard
- [ ] ทดสอบ upload ไฟล์ใน dashboard
- [ ] Restart dev server
- [ ] ทดสอบสร้างภาพแบนเนอร์
- [ ] ตรวจสอบไฟล์ใน storage
- [ ] ตรวจสอบ database record

---

**🎉 เสร็จสมบูรณ์!** 

ตอนนี้ภาพแบนเนอร์ทุกภาพจะถูก:
1. ✅ สร้างจาก Replicate
2. ✅ Upload ไป Supabase Storage
3. ✅ บันทึก 2 URLs ลงฐานข้อมูล
4. ✅ พร้อมใช้งานถาวร!

🚀 **Happy Coding!**

