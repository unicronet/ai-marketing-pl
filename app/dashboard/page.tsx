"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  const fullName = user?.user_metadata?.full_name || "คุณ"

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          ยินดีต้อนรับ, {fullName}! 👋
        </h1>
        <p className="mt-2 text-gray-600">
          พร้อมสร้างคอนเทนต์การตลาดที่ยอดเยี่ยมด้วย AI แล้วหรือยัง?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="group cursor-pointer border-blue-100 transition-all hover:shadow-lg hover:shadow-blue-100/50">
          <Link href="/dashboard/content">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                  <Icon icon="mdi:file-document-edit" className="h-6 w-6" />
                </div>
                <Icon
                  icon="mdi:arrow-right"
                  className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1"
                />
              </div>
              <CardTitle className="text-lg">สร้างคอนเทนต์</CardTitle>
              <CardDescription>
                ใช้ AI สร้างคอนเทนต์การตลาดคุณภาพสูง
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="group cursor-pointer border-blue-100 transition-all hover:shadow-lg hover:shadow-cyan-100/50">
          <Link href="/dashboard/history">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-cyan-100 p-3 text-cyan-600">
                  <Icon icon="mdi:history" className="h-6 w-6" />
                </div>
                <Icon
                  icon="mdi:arrow-right"
                  className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1"
                />
              </div>
              <CardTitle className="text-lg">ประวัติ</CardTitle>
              <CardDescription>
                ดูคอนเทนต์ที่สร้างไว้ทั้งหมด
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="group cursor-pointer border-blue-100 transition-all hover:shadow-lg hover:shadow-blue-100/50">
          <Link href="/dashboard/settings">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                  <Icon icon="mdi:cog" className="h-6 w-6" />
                </div>
                <Icon
                  icon="mdi:arrow-right"
                  className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1"
                />
              </div>
              <CardTitle className="text-lg">ตั้งค่า</CardTitle>
              <CardDescription>
                จัดการบัญชีและการตั้งค่าต่างๆ
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>คอนเทนต์ทั้งหมด</CardDescription>
            <CardTitle className="text-3xl font-bold text-blue-600">0</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-gray-500">
              <Icon icon="mdi:information" className="mr-1 h-3 w-3" />
              เริ่มสร้างคอนเทนต์แรกของคุณ
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>สัปดาห์นี้</CardDescription>
            <CardTitle className="text-3xl font-bold text-cyan-600">0</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-gray-500">
              <Icon icon="mdi:trending-up" className="mr-1 h-3 w-3" />
              พร้อมเริ่มต้นแล้ว
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>แผนปัจจุบัน</CardDescription>
            <CardTitle className="text-2xl font-bold text-blue-600">ฟรี</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-gray-500">
              <Icon icon="mdi:check-circle" className="mr-1 h-3 w-3" />
              ไม่จำกัด
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>ใช้งานล่าสุด</CardDescription>
            <CardTitle className="text-2xl font-bold text-cyan-600">วันนี้</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-gray-500">
              <Icon icon="mdi:clock" className="mr-1 h-3 w-3" />
              เพิ่งเข้าสู่ระบบ
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon icon="mdi:lightbulb" className="h-5 w-5 text-blue-600" />
            เริ่มต้นใช้งาน
          </CardTitle>
          <CardDescription>ขั้นตอนง่ายๆ เพื่อสร้างคอนเทนต์แรกของคุณ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              1
            </div>
            <div>
              <p className="font-medium text-gray-900">ไปที่หน้าสร้างคอนเทนต์</p>
              <p className="text-sm text-gray-600">เลือกประเภทคอนเทนต์ที่ต้องการสร้าง</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              2
            </div>
            <div>
              <p className="font-medium text-gray-900">ระบุรายละเอียด</p>
              <p className="text-sm text-gray-600">บอก AI ว่าต้องการคอนเทนต์แบบไหน</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              3
            </div>
            <div>
              <p className="font-medium text-gray-900">รับผลลัพธ์</p>
              <p className="text-sm text-gray-600">AI จะสร้างคอนเทนต์คุณภาพให้ภายในไม่กี่วินาที</p>
            </div>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/dashboard/content">
              <Icon icon="mdi:rocket-launch" className="mr-2 h-4 w-4" />
              เริ่มสร้างเลย
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

