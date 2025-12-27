import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

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

    const { contentType, topic } = await request.json()

    if (!contentType || !topic) {
      return NextResponse.json(
        { error: 'กรุณาระบุประเภทคอนเทนต์และหัวข้อ' },
        { status: 400 }
      )
    }

    // Prepare prompt based on content type
    const prompts: Record<string, string> = {
      social: `สร้างโพสต์โซเชียลมีเดียภาษาไทยเกี่ยวกับหัวข้อ: ${topic}

ข้อกำหนด:
- ใช้ภาษาไทยที่เป็นกันเอง น่าสนใจ
- ความยาว 150-200 คำ
- ใส่ hashtags ที่เกี่ยวข้อง 3-5 แฮชแท็ก
- มีการเรียกผู้อ่านให้ engage (ถูกใจ แชร์ คอมเมนต์)
- เน้นดึงดูดความสนใจ

โพสต์:`,
      blog: `เขียนบทความบล็อกภาษาไทยเกี่ยวกับหัวข้อ: ${topic}

ข้อกำหนด:
- ใช้ภาษาไทยที่เป็นทางการแต่อ่านง่าย
- มีโครงสร้าง: บทนำ เนื้อหา สรุป
- ความยาว 300-400 คำ
- มี bullet points หรือหัวข้อย่อย
- SEO-friendly
- มีคุณค่าต่อผู้อ่าน

บทความ:`,
      ad: `สร้างข้อความโฆษณาภาษาไทยสำหรับ: ${topic}

ข้อกำหนด:
- ใช้ภาษาไทยที่กระชับ โดนใจ
- เน้น benefits และ unique selling points
- มี call-to-action ชัดเจน
- ความยาว 100-150 คำ
- ดึงดูดให้ลูกค้าตัดสินใจ
- สร้างความรู้สึกเร่งด่วน (urgency)

ข้อความโฆษณา:`,
      email: `เขียนอีเมลการตลาดภาษาไทยเกี่ยวกับ: ${topic}

ข้อกำหนด:
- หัวเรื่องที่น่าสนใจ (Subject line)
- เนื้อหาอีเมลที่เป็นมิตร
- ความยาว 200-250 คำ
- มี call-to-action ชัดเจน
- เน้นสร้างความสัมพันธ์กับลูกค้า
- มีการปิดท้ายที่อบอุ่น

อีเมล:`,
    }

    const prompt = prompts[contentType] || prompts.social

    // Call OpenRouter API
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-exp:free', // ใช้ model ฟรีสำหรับเริ่มต้น
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!openRouterResponse.ok) {
      const errorData = await openRouterResponse.text()
      console.error('OpenRouter error:', errorData)
      return NextResponse.json(
        { error: 'เกิดข้อผิดพลาดในการสร้างคอนเทนต์ กรุณาลองใหม่อีกครั้ง' },
        { status: 500 }
      )
    }

    const aiResponse = await openRouterResponse.json()
    const generatedContent = aiResponse.choices[0]?.message?.content || ''

    if (!generatedContent) {
      return NextResponse.json(
        { error: 'ไม่สามารถสร้างคอนเทนต์ได้ กรุณาลองใหม่' },
        { status: 500 }
      )
    }

    // Save to database
    const { data: savedContent, error: saveError } = await supabase
      .from('content')
      .insert({
        user_id: user.id,
        content_type: contentType,
        topic: topic,
        generated_content: generatedContent,
      })
      .select()
      .single()

    if (saveError) {
      console.error('Database error:', saveError)
      // Return content anyway even if save fails
      return NextResponse.json({
        content: generatedContent,
        saved: false,
        error: 'สร้างคอนเทนต์สำเร็จ แต่ไม่สามารถบันทึกได้',
      })
    }

    return NextResponse.json({
      content: generatedContent,
      saved: true,
      id: savedContent.id,
    })

  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' },
      { status: 500 }
    )
  }
}

