"use client"

import { useState } from "react"
import { Icon } from "@iconify/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const contentTypes = [
  {
    id: "social",
    title: "โพสต์โซเชียล",
    description: "สร้างโพสต์สำหรับ Facebook, Instagram, Twitter",
    icon: "mdi:share-variant",
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: "blog",
    title: "บทความบล็อก",
    description: "เขียนบทความยาวคุณภาพสูง SEO-friendly",
    icon: "mdi:file-document",
    color: "text-cyan-600 bg-cyan-100",
  },
  {
    id: "ad",
    title: "โฆษณา",
    description: "สร้างข้อความโฆษณาที่ดึงดูดใจ",
    icon: "mdi:bullhorn",
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: "email",
    title: "อีเมลการตลาด",
    description: "เขียนอีเมลที่กระตุ้นให้ลูกค้าตอบกลับ",
    icon: "mdi:email",
    color: "text-cyan-600 bg-cyan-100",
  },
]

export default function ContentPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!selectedType || !topic) return

    setLoading(true)
    setError(null)
    setGeneratedContent(null)

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType: selectedType,
          topic: topic,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาด')
      }

      setGeneratedContent(data.content)
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการสร้างคอนเทนต์')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent)
      alert('คัดลอกเรียบร้อย!')
    }
  }

  const handleReset = () => {
    setGeneratedContent(null)
    setError(null)
    setTopic("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">สร้างคอนเทนต์</h1>
        <p className="mt-2 text-gray-600">
          เลือกประเภทคอนเทนต์และให้ AI สร้างให้คุณภายในไม่กี่วินาที
        </p>
      </div>

      {/* Content Type Selection */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          เลือกประเภทคอนเทนต์
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contentTypes.map((type) => (
            <Card
              key={type.id}
              className={`group cursor-pointer transition-all ${
                selectedType === type.id
                  ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-100/50"
                  : "border-blue-100 hover:border-blue-300 hover:shadow-md"
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <CardHeader className="pb-3">
                <div className={`inline-flex w-fit rounded-lg p-3 ${type.color}`}>
                  <Icon icon={type.icon} className="h-6 w-6" />
                </div>
                <CardTitle className="text-base">{type.title}</CardTitle>
                <CardDescription className="text-sm">
                  {type.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Content Input Form */}
      {selectedType && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="mdi:pencil" className="h-5 w-5 text-blue-600" />
              ระบุรายละเอียด
            </CardTitle>
            <CardDescription>
              บอกเราว่าคุณต้องการคอนเทนต์เกี่ยวกับอะไร
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">หัวข้อหรือคำอธิบาย</Label>
              <Input
                id="topic"
                placeholder="เช่น: โปรโมชั่นร้านกาแฟ ลด 50% สำหรับสมาชิกใหม่"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                ยิ่งระบุรายละเอียดมาก ผลลัพธ์จะยิ่งตรงใจ
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-blue-200 text-blue-700">
                <Icon icon="mdi:language-thai" className="mr-1 h-3 w-3" />
                ภาษาไทย
              </Badge>
              <Badge variant="outline" className="border-blue-200 text-blue-700">
                <Icon icon="mdi:sparkles" className="mr-1 h-3 w-3" />
                AI-Powered
              </Badge>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!topic || loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Icon icon="mdi:loading" className="mr-2 h-4 w-4 animate-spin" />
                  กำลังสร้าง...
                </>
              ) : (
                <>
                  <Icon icon="mdi:magic-staff" className="mr-2 h-4 w-4" />
                  สร้างคอนเทนต์
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Generated Content Result */}
      {generatedContent && (
        <Card className="border-green-200 bg-green-50/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-600" />
                คอนเทนต์ที่สร้างเสร็จแล้ว
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Icon icon="mdi:content-copy" className="mr-2 h-4 w-4" />
                  คัดลอก
                </Button>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <Icon icon="mdi:refresh" className="mr-2 h-4 w-4" />
                  สร้างใหม่
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-white p-4 whitespace-pre-wrap border border-green-200">
              {generatedContent}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <Card className="border-red-200 bg-red-50/30">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 text-red-600">
              <Icon icon="mdi:alert-circle" className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Placeholder when no type selected */}
      {!selectedType && !generatedContent && (
        <Card className="border-dashed border-blue-200 bg-blue-50/30">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-blue-100 p-4">
              <Icon icon="mdi:lightbulb" className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              เริ่มต้นสร้างคอนเทนต์
            </h3>
            <p className="mt-2 max-w-sm text-sm text-gray-600">
              เลือกประเภทคอนเทนต์ด้านบน แล้ว AI จะช่วยสร้างคอนเทนต์คุณภาพให้คุณ
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

