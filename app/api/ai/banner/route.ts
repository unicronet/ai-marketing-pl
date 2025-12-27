import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || 'r8_O0Qgaqr2FxTDSVvevKjk2yLjxI4x6oE4AMDCT',
})

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'ไม่ได้รับอนุญาต กรุณาเข้าสู่ระบบ' },
        { status: 401 }
      )
    }

    const { prompt, resolution, aspect_ratio, output_format, safety_filter_level } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'กรุณาระบุคำอธิบายภาพที่ต้องการ' },
        { status: 400 }
      )
    }

    // Generate image using Replicate's nano-banana-pro model
    const output = await replicate.run(
      "google/nano-banana-pro" as any,
      {
        input: {
          prompt: prompt,
          resolution: resolution || "2K",
          aspect_ratio: aspect_ratio || "16:9",
          output_format: output_format || "png",
          safety_filter_level: safety_filter_level || "block_only_high",
        }
      }
    )

    // The output is typically an array of image URLs
    const replicateUrl = Array.isArray(output) ? output[0] : output

    if (!replicateUrl) {
      return NextResponse.json(
        { error: 'ไม่สามารถสร้างภาพได้ กรุณาลองใหม่' },
        { status: 500 }
      )
    }

    // Upload to Supabase Storage
    let storageUrl = replicateUrl // Default to Replicate URL
    let uploadError = null

    try {
      // Download image from Replicate
      const imageResponse = await fetch(replicateUrl)
      const imageBlob = await imageResponse.blob()
      const imageBuffer = Buffer.from(await imageBlob.arrayBuffer())

      // Generate filename
      const timestamp = Date.now()
      const fileName = `${user.id}/${timestamp}_${resolution}_${aspect_ratio.replace(':', '-')}.${output_format}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from('banners')
        .upload(fileName, imageBuffer, {
          contentType: `image/${output_format}`,
          cacheControl: '3600',
          upsert: false
        })

      if (uploadErr) {
        console.error('Storage upload error:', uploadErr)
        uploadError = uploadErr
      } else {
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('banners')
          .getPublicUrl(fileName)
        
        storageUrl = publicUrl
      }
    } catch (error) {
      console.error('Error uploading to storage:', error)
      uploadError = error
    }

    // Save to database
    const { data: savedBanner, error: saveError } = await supabase
      .from('banners')
      .insert({
        user_id: user.id,
        prompt: prompt,
        image_url: storageUrl,
        replicate_url: replicateUrl,
        resolution: resolution || "2K",
        aspect_ratio: aspect_ratio || "16:9",
      })
      .select()
      .single()

    if (saveError) {
      console.error('Database error:', saveError)
      // Return image URL anyway even if save fails
      return NextResponse.json({
        imageUrl: storageUrl,
        replicateUrl: replicateUrl,
        saved: false,
        uploadedToStorage: !uploadError,
        error: 'สร้างภาพสำเร็จ แต่ไม่สามารถบันทึกลงฐานข้อมูลได้',
      })
    }

    return NextResponse.json({
      imageUrl: storageUrl,
      replicateUrl: replicateUrl,
      saved: true,
      uploadedToStorage: !uploadError,
      id: savedBanner.id,
      resolution: resolution || "2K",
      aspect_ratio: aspect_ratio || "16:9",
    })

  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' },
      { status: 500 }
    )
  }
}

