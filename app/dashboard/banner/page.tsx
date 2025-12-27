'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@iconify/react'

export default function BannerPage() {
  const [prompt, setPrompt] = useState('')
  const [resolution, setResolution] = useState('2K')
  const [aspectRatio, setAspectRatio] = useState('16:9')
  const [outputFormat, setOutputFormat] = useState('png')
  const [safetyFilterLevel] = useState('block_only_high')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const resolutionOptions = ['1K', '2K', '4K']
  
  const aspectRatioPresets = [
    { name: 'Landscape Wide', ratio: '16:9', icon: 'mdi:monitor' },
    { name: 'Standard', ratio: '4:3', icon: 'mdi:television-classic' },
    { name: 'Square', ratio: '1:1', icon: 'mdi:square-outline' },
    { name: 'Portrait', ratio: '3:4', icon: 'mdi:cellphone' },
    { name: 'Vertical', ratio: '9:16', icon: 'mdi:cellphone-screenshot' },
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('กรุณาระบุคำอธิบายภาพที่ต้องการ')
      return
    }

    setLoading(true)
    setError(null)
    setImageUrl(null)

    try {
      const response = await fetch('/api/ai/banner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          resolution,
          aspect_ratio: aspectRatio,
          output_format: outputFormat,
          safety_filter_level: safetyFilterLevel,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาด')
      }

      setImageUrl(data.imageUrl)
      
      if (!data.saved) {
        setError(data.error || 'สร้างภาพสำเร็จ แต่ไม่สามารถบันทึกได้')
      }
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการสร้างภาพ')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!imageUrl) return

    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `banner-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError('ไม่สามารถดาวน์โหลดภาพได้')
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">สร้างภาพแบนเนอร์</h1>
        <p className="text-muted-foreground">
          สร้างภาพแบนเนอร์สวยงามด้วย AI โดยใช้ Google Nano Banana Pro 🍌
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Input Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ตั้งค่าภาพแบนเนอร์</CardTitle>
              <CardDescription>
                กรอกรายละเอียดเพื่อสร้างภาพแบนเนอร์ของคุณ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Prompt Input */}
              <div className="space-y-2">
                <Label htmlFor="prompt">คำอธิบายภาพ (Prompt)</Label>
                <textarea
                  id="prompt"
                  className="w-full min-h-[120px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="เช่น: ภาพแบนเนอร์สำหรับร้านกาแฟ มีบรรยากาศอบอุ่น มีถ้วยกาแฟร้อน ๆ บนโต๊ะไม้ พื้นหลังเป็นร้านกาแฟสไตล์มินิมอล"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={loading}
                />
                <p className="text-sm text-muted-foreground">
                  เขียนคำอธิบายภาพที่ต้องการให้ละเอียด เพื่อผลลัพธ์ที่ดีที่สุด
                </p>
              </div>

              {/* Resolution */}
              <div className="space-y-2">
                <Label>ความละเอียด (Resolution)</Label>
                <div className="grid grid-cols-3 gap-2">
                  {resolutionOptions.map((res) => (
                    <Button
                      key={res}
                      variant={resolution === res ? "default" : "outline"}
                      size="sm"
                      onClick={() => setResolution(res)}
                      disabled={loading}
                    >
                      {res}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio Presets */}
              <div className="space-y-2">
                <Label>สัดส่วนภาพ (Aspect Ratio)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {aspectRatioPresets.map((preset) => (
                    <Button
                      key={preset.ratio}
                      variant={aspectRatio === preset.ratio ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAspectRatio(preset.ratio)}
                      disabled={loading}
                      className="justify-start"
                    >
                      <Icon icon={preset.icon} className="mr-2 h-4 w-4" />
                      <span className="flex-1 text-left">{preset.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {preset.ratio}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Output Format */}
              <div className="space-y-2">
                <Label>รูปแบบไฟล์ (Output Format)</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['png', 'jpg', 'webp'].map((format) => (
                    <Button
                      key={format}
                      variant={outputFormat === format ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOutputFormat(format)}
                      disabled={loading}
                    >
                      {format.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Icon icon="eos-icons:loading" className="mr-2 h-5 w-5 animate-spin" />
                    กำลังสร้างภาพ...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:image-plus" className="mr-2 h-5 w-5" />
                    สร้างภาพแบนเนอร์
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-sm text-destructive flex items-center">
                    <Icon icon="mdi:alert-circle" className="mr-2 h-4 w-4" />
                    {error}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>ภาพตัวอย่าง</CardTitle>
              <CardDescription>
                ภาพแบนเนอร์ที่สร้างจะแสดงที่นี่
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg">
                  <Icon icon="eos-icons:loading" className="h-16 w-16 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">กำลังสร้างภาพแบนเนอร์...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    อาจใช้เวลาประมาณ 10-30 วินาที
                  </p>
                </div>
              ) : imageUrl ? (
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt="Generated Banner"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleDownload}
                      className="flex-1"
                      variant="outline"
                    >
                      <Icon icon="mdi:download" className="mr-2 h-4 w-4" />
                      ดาวน์โหลดภาพ
                    </Button>
                    <Button
                      onClick={() => {
                        setImageUrl(null)
                        setPrompt('')
                      }}
                      variant="outline"
                    >
                      <Icon icon="mdi:refresh" className="mr-2 h-4 w-4" />
                      สร้างใหม่
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg">
                  <Icon icon="mdi:image-outline" className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    กรอกคำอธิบายภาพและกดสร้างภาพแบนเนอร์<br />
                    เพื่อดูตัวอย่างที่นี่
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

