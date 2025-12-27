# 🗄️ Supabase Storage Setup Guide

## ภาพรวม

คู่มือนี้จะช่วยให้คุณตั้งค่า Supabase Storage สำหรับเก็บภาพแบนเนอร์ที่สร้างจาก AI

## ทำไมต้องใช้ Supabase Storage?

✅ **ข้อดี:**
- เก็บภาพไว้ถาวร (Replicate URL อาจหมดอายุ)
- ควบคุมการเข้าถึงได้
- CDN ในตัว (เร็ว)
- ฟรี 1GB สำหรับ Free Plan
- ง่ายต่อการจัดการ

---

## 📋 ขั้นตอนการตั้งค่า

### 1. สร้าง Storage Bucket

เข้า **Supabase Dashboard** → **Storage**

#### Option A: ผ่าน Dashboard

1. คลิก **"Create a new bucket"**
2. กรอกข้อมูล:
   ```
   Name: banners
   Public bucket: ✅ เปิด (เพื่อให้ดาวน์โหลดได้โดยตรง)
   File size limit: 50 MB (หรือตามต้องการ)
   Allowed MIME types: image/png, image/jpeg, image/webp
   ```
3. คลิก **"Create bucket"**

#### Option B: ผ่าน SQL

```sql
-- สร้าง bucket สำหรับเก็บภาพแบนเนอร์
INSERT INTO storage.buckets (id, name, public)
VALUES ('banners', 'banners', true);
```

---

### 2. ตั้งค่า Storage Policies

เข้า **Storage** → **banners** → **Policies**

#### Policy 1: Public Read (ทุกคนดูได้)

```sql
-- Policy: Anyone can view banners
CREATE POLICY "Public banners are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'banners');
```

#### Policy 2: Authenticated Upload (ผู้ใช้ที่ login แล้วอัปโหลดได้)

```sql
-- Policy: Authenticated users can upload
CREATE POLICY "Authenticated users can upload banners"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'banners' 
  AND auth.role() = 'authenticated'
);
```

#### Policy 3: Users Delete Own Files (ลบของตัวเองได้)

```sql
-- Policy: Users can delete their own banners
CREATE POLICY "Users can delete own banners"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'banners' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

---

### 3. ตั้งค่า CORS (ถ้าจำเป็น)

ใน **Project Settings** → **API** → **CORS**

เพิ่ม:
```
http://localhost:3000
https://your-domain.com
```

---

## 🗂️ โครงสร้างไฟล์

ภาพจะถูกเก็บในโครงสร้างนี้:

```
banners/
  └── {user_id}/
      └── {timestamp}_{resolution}_{aspect_ratio}.{format}

ตัวอย่าง:
banners/
  └── 550e8400-e29b-41d4-a716-446655440000/
      └── 2025-12-27_1735303200000_2K_16-9.png
```

---

## 📝 Environment Variables

เพิ่มใน `.env.local`:

```env
# Supabase (มีอยู่แล้ว)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Supabase Storage
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=banners
```

---

## 🧪 ทดสอบ Storage

### ผ่าน Dashboard

1. เข้า **Storage** → **banners**
2. คลิก **"Upload file"**
3. เลือกภาพทดสอบ
4. คลิก **"Upload"**
5. คลิกที่ไฟล์ → **"Get URL"**
6. ลอง copy URL และเปิดในบราวเซอร์

### ผ่าน Code (JavaScript)

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Upload
const { data, error } = await supabase.storage
  .from('banners')
  .upload('test/test.png', file)

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('banners')
  .getPublicUrl('test/test.png')

console.log(publicUrl)
```

---

## 📊 Storage Limits

### Free Plan
- **Storage:** 1 GB
- **Bandwidth:** 2 GB/month
- **File Size:** 50 MB (ปรับได้)

### Pro Plan ($25/month)
- **Storage:** 100 GB
- **Bandwidth:** 200 GB/month
- **File Size:** 5 GB

---

## 🔧 Storage Management

### ดูขนาดไฟล์ทั้งหมด

```sql
SELECT 
  bucket_id,
  COUNT(*) as file_count,
  SUM(metadata->>'size')::bigint / 1024 / 1024 as total_mb
FROM storage.objects
WHERE bucket_id = 'banners'
GROUP BY bucket_id;
```

### ลบไฟล์เก่า (> 30 วัน)

```sql
DELETE FROM storage.objects
WHERE bucket_id = 'banners'
  AND created_at < NOW() - INTERVAL '30 days';
```

---

## 🚨 Troubleshooting

### ปัญหา: Upload ไม่ได้

**สาเหตุ:**
- ไม่ได้ login
- Policy ไม่ถูกต้อง
- File size เกิน limit

**แก้ไข:**
```sql
-- ตรวจสอบ policies
SELECT * FROM storage.policies WHERE bucket_id = 'banners';

-- ตรวจสอบ bucket settings
SELECT * FROM storage.buckets WHERE id = 'banners';
```

### ปัญหา: URL ไม่สามารถเข้าถึงได้

**แก้ไข:**
- ตรวจสอบว่า bucket เป็น `public = true`
- ตรวจสอบ policy สำหรับ SELECT
- ลอง refresh bucket

---

## 📚 เอกสารเพิ่มเติม

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Storage Policies](https://supabase.com/docs/guides/storage/security/access-control)
- [Storage CDN](https://supabase.com/docs/guides/storage/cdn)

---

## ✅ Checklist

- [ ] สร้าง bucket ชื่อ `banners`
- [ ] ตั้งค่า `public = true`
- [ ] เพิ่ม Policy: Public Read
- [ ] เพิ่ม Policy: Authenticated Upload
- [ ] เพิ่ม Policy: Delete Own Files
- [ ] ทดสอบ upload ผ่าน dashboard
- [ ] ทดสอบ public URL
- [ ] เพิ่ม Environment Variables

---

**พร้อมใช้งาน!** 🚀

