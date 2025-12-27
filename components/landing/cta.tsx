import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"

export function CTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            พร้อมเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="mt-6 text-lg text-blue-50">
            เข้าร่วมกับผู้ใช้งานหลายพันคนที่เชื่อมั่นในแพลตฟอร์มของเรา
            เริ่มสร้างคอนเทนต์ที่ยอดเยี่ยมวันนี้
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full bg-white text-blue-600 hover:bg-blue-50 sm:w-auto text-base px-8 py-6"
            >
              <Link href="/register">
                <Icon icon="mdi:rocket-launch" className="mr-2 h-5 w-5" />
                เริ่มใช้งานฟรีตอนนี้
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-white bg-transparent text-white hover:bg-white/10 sm:w-auto text-base px-8 py-6"
            >
              <Link href="/login">
                <Icon icon="mdi:login" className="mr-2 h-5 w-5" />
                เข้าสู่ระบบ
              </Link>
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 flex items-center justify-center gap-2 text-blue-50">
            <Icon icon="mdi:shield-check" className="h-5 w-5" />
            <span className="text-sm">ไม่ต้องใช้บัตรเครดิต • เริ่มใช้งานได้ทันที</span>
          </div>
        </div>
      </div>
    </section>
  )
}

