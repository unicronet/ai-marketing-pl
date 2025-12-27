"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white py-20 sm:py-32">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-100/40 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Icon icon="mdi:sparkles" className="h-4 w-4" />
            <span>แพลตฟอร์ม AI Marketing สำหรับคนไทย</span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            สร้างคอนเทนต์การตลาด
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              ด้วย AI ใน 1 คลิก
            </span>
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg text-gray-600 sm:text-xl">
            ปลดล็อกพลังของ AI เพื่อสร้างคอนเทนต์การตลาดคุณภาพสูง
            ประหยัดเวลา เพิ่มยอดขาย ทำงานได้เร็วกว่าเดิมถึง 10 เท่า
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 py-6">
              <Link href="/register">
                <Icon icon="mdi:rocket-launch" className="mr-2 h-5 w-5" />
                เริ่มใช้งานฟรี
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-6">
              <Link href="#features">
                <Icon icon="mdi:play-circle" className="mr-2 h-5 w-5" />
                ดูความสามารถ
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <div className="text-3xl font-bold text-blue-600 sm:text-4xl">10x</div>
              <div className="mt-1 text-sm text-gray-600">เร็วกว่าเดิม</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 sm:text-4xl">AI</div>
              <div className="mt-1 text-sm text-gray-600">เทคโนโลยีล้ำสมัย</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-3xl font-bold text-blue-600 sm:text-4xl">100%</div>
              <div className="mt-1 text-sm text-gray-600">ภาษาไทย</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

