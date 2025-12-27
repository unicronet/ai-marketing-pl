"use client"

import { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  })

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user)
        setFormData({
          fullName: user.user_metadata?.full_name || "",
          email: user.email || "",
        })
      }
    })
  }, [])

  const handleSave = async () => {
    try {
      setLoading(true)
      const supabase = createClient()

      // Update user metadata in auth.users
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
        },
      })

      if (authError) throw authError

      // Update profile in profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
        })
        .eq("user_id", user.id)

      if (profileError) throw profileError

      alert("บันทึกข้อมูลสำเร็จ!")
      
      // Refresh user data
      const { data: { user: updatedUser } } = await supabase.auth.getUser()
      if (updatedUser) {
        setUser(updatedUser)
        setFormData({
          fullName: updatedUser.user_metadata?.full_name || "",
          email: updatedUser.email || "",
        })
      }
    } catch (error: any) {
      console.error("Error updating profile:", error)
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ตั้งค่า</h1>
        <p className="mt-2 text-gray-600">
          จัดการบัญชีและการตั้งค่าของคุณ
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลส่วนตัว</CardTitle>
          <CardDescription>
            อัปเดตข้อมูลโปรไฟล์ของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">อีเมล</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              disabled
              className="bg-gray-50"
            />
            <p className="text-xs text-gray-500">
              ไม่สามารถเปลี่ยนอีเมลได้
            </p>
          </div>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                <Icon icon="mdi:loading" className="mr-2 h-4 w-4 animate-spin" />
                กำลังบันทึก...
              </>
            ) : (
              <>
                <Icon icon="mdi:content-save" className="mr-2 h-4 w-4" />
                บันทึกการเปลี่ยนแปลง
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลบัญชี</CardTitle>
          <CardDescription>
            รายละเอียดเกี่ยวกับบัญชีของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">แผนปัจจุบัน</p>
              <p className="text-sm text-gray-600">ใช้งานได้ไม่จำกัด</p>
            </div>
            <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              ฟรี
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">สมาชิกเมื่อ</p>
              <p className="text-sm text-gray-600">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "ไม่ทราบ"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>การตั้งค่า</CardTitle>
          <CardDescription>
            ปรับแต่งประสบการณ์การใช้งานของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">ภาษา</p>
              <p className="text-sm text-gray-600">ภาษาที่ใช้ในแพลตฟอร์ม</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              <Icon icon="mdi:language-thai" className="h-4 w-4" />
              ภาษาไทย
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">การแจ้งเตือน</p>
              <p className="text-sm text-gray-600">รับการแจ้งเตือนทางอีเมล</p>
            </div>
            <Button variant="outline" size="sm">
              เปิดใช้งาน
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">ระวัง</CardTitle>
          <CardDescription>
            การดำเนินการเหล่านี้ไม่สามารถย้อนกลับได้
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">ลบบัญชี</p>
              <p className="text-sm text-gray-600">
                ลบบัญชีและข้อมูลทั้งหมดของคุณอย่างถาวร
              </p>
            </div>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              ลบบัญชี
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

