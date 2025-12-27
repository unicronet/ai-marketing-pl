"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"

interface ContentItem {
  id: string
  content_type: string
  topic: string
  generated_content: string
  created_at: string
}

const contentTypeLabels: Record<string, { label: string; icon: string; color: string }> = {
  social: { label: "โพสต์โซเชียล", icon: "mdi:share-variant", color: "bg-blue-100 text-blue-700" },
  blog: { label: "บทความบล็อก", icon: "mdi:file-document", color: "bg-cyan-100 text-cyan-700" },
  ad: { label: "โฆษณา", icon: "mdi:bullhorn", color: "bg-purple-100 text-purple-700" },
  email: { label: "อีเมลการตลาด", icon: "mdi:email", color: "bg-green-100 text-green-700" },
}

export default function HistoryPage() {
  const [contents, setContents] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)

  useEffect(() => {
    fetchContents()
  }, [])

  const fetchContents = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setContents(data || [])
    } catch (error) {
      console.error('Error fetching contents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
    alert('คัดลอกเรียบร้อย!')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('คุณต้องการลบคอนเทนต์นี้หรือไม่?')) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id)

      if (error) throw error

      setContents(contents.filter(c => c.id !== id))
      if (selectedContent?.id === id) {
        setSelectedContent(null)
      }
    } catch (error) {
      console.error('Error deleting content:', error)
      alert('ไม่สามารถลบได้ กรุณาลองใหม่')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Icon icon="mdi:loading" className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-2 text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  if (contents.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ประวัติ</h1>
          <p className="mt-2 text-gray-600">
            ดูคอนเทนต์ที่คุณสร้างไว้ทั้งหมด
          </p>
        </div>

        <Card className="border-dashed border-blue-200 bg-blue-50/30">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-blue-100 p-6">
              <Icon icon="mdi:file-document-multiple" className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              ยังไม่มีประวัติ
            </h3>
            <p className="mt-2 max-w-md text-gray-600">
              เมื่อคุณสร้างคอนเทนต์ มันจะแสดงที่นี่
              เริ่มสร้างคอนเทนต์แรกของคุณเลย!
            </p>
            <Link href="/dashboard/content">
              <Button className="mt-6">
                <Icon icon="mdi:plus" className="mr-2 h-4 w-4" />
                สร้างคอนเทนต์
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ประวัติ</h1>
          <p className="mt-2 text-gray-600">
            คอนเทนต์ทั้งหมด {contents.length} รายการ
          </p>
        </div>
        <Link href="/dashboard/content">
          <Button>
            <Icon icon="mdi:plus" className="mr-2 h-4 w-4" />
            สร้างใหม่
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Content List */}
        <div className="space-y-3 lg:col-span-1">
          {contents.map((content) => {
            const typeInfo = contentTypeLabels[content.content_type] || contentTypeLabels.social
            const isSelected = selectedContent?.id === content.id

            return (
              <Card
                key={content.id}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'hover:border-blue-300 hover:shadow-sm'
                }`}
                onClick={() => setSelectedContent(content)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <Badge className={`mb-2 ${typeInfo.color}`}>
                        <Icon icon={typeInfo.icon} className="mr-1 h-3 w-3" />
                        {typeInfo.label}
                      </Badge>
                      <CardTitle className="text-sm truncate">{content.topic}</CardTitle>
                      <CardDescription className="text-xs">
                        {formatDate(content.created_at)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* Content Preview */}
        <div className="lg:col-span-2">
          {selectedContent ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={contentTypeLabels[selectedContent.content_type]?.color}>
                        <Icon 
                          icon={contentTypeLabels[selectedContent.content_type]?.icon} 
                          className="mr-1 h-3 w-3" 
                        />
                        {contentTypeLabels[selectedContent.content_type]?.label}
                      </Badge>
                    </div>
                    <CardTitle>{selectedContent.topic}</CardTitle>
                    <CardDescription>{formatDate(selectedContent.created_at)}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(selectedContent.generated_content)}
                    >
                      <Icon icon="mdi:content-copy" className="mr-2 h-4 w-4" />
                      คัดลอก
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(selectedContent.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Icon icon="mdi:delete" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-gray-50 p-4 whitespace-pre-wrap border">
                  {selectedContent.generated_content}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Icon icon="mdi:arrow-left" className="h-8 w-8 text-gray-400" />
                <p className="mt-4 text-gray-600">
                  เลือกคอนเทนต์ทางซ้ายเพื่อดูรายละเอียด
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
