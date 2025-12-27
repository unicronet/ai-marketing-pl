import { Icon } from "@iconify/react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: "mdi:brain",
    title: "AI ที่ฉลาดจริง",
    description: "ใช้เทคโนโลยี Large Language Model ระดับโลก เข้าใจบริบทภาษาไทยได้อย่างแม่นยำ",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: "mdi:lightning-bolt",
    title: "สร้างได้ทันที",
    description: "เพียงบอกความต้องการ AI จะสร้างคอนเทนต์คุณภาพให้ภายในไม่กี่วินาที",
    color: "text-cyan-600 bg-cyan-100",
  },
  {
    icon: "mdi:palette",
    title: "ครบทุกรูปแบบ",
    description: "โพสต์โซเชียล, บทความ, โฆษณา, อีเมล ทำได้ครบจบในที่เดียว",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: "mdi:translate",
    title: "ภาษาไทยแท้ๆ",
    description: "เข้าใจคำสแลง สำนวน และวัฒนธรรมไทย ไม่ใช่แค่แปลจากภาษาอังกฤษ",
    color: "text-cyan-600 bg-cyan-100",
  },
  {
    icon: "mdi:trending-up",
    title: "เพิ่มยอดขาย",
    description: "คอนเทนต์ที่ดึงดูดใจ ช่วยเพิ่มการมีส่วนร่วมและยอดขายได้อย่างมีประสิทธิภาพ",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: "mdi:shield-check",
    title: "ปลอดภัย มั่นใจ",
    description: "ข้อมูลของคุณปลอดภัย เข้ารหัสทุกขั้นตอน มาตรฐานระดับสากล",
    color: "text-cyan-600 bg-cyan-100",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            ทำไมต้องเลือกเรา?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            ฟีเจอร์ครบครัน ใช้งานง่าย เหมาะกับธุรกิจทุกขนาด
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-blue-100 transition-all hover:shadow-lg hover:shadow-blue-100/50"
            >
              <CardContent className="p-6">
                <div className={`inline-flex rounded-lg p-3 ${feature.color}`}>
                  <Icon icon={feature.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

