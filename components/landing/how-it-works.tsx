import { Icon } from "@iconify/react"

const steps = [
  {
    number: "01",
    icon: "mdi:account-plus",
    title: "สมัครสมาชิก",
    description: "สร้างบัญชีฟรีภายใน 30 วินาที ไม่ต้องใช้บัตรเครดิต",
  },
  {
    number: "02",
    icon: "mdi:pencil",
    title: "บอกความต้องการ",
    description: "ระบุประเภทคอนเทนต์ หัวข้อ และรายละเอียดที่ต้องการ",
  },
  {
    number: "03",
    icon: "mdi:robot",
    title: "AI สร้างให้",
    description: "AI จะวิเคราะห์และสร้างคอนเทนต์คุณภาพสูงให้ภายในไม่กี่วินาที",
  },
  {
    number: "04",
    icon: "mdi:share",
    title: "นำไปใช้ได้เลย",
    description: "ปรับแต่งเล็กน้อยตามต้องการ แล้วนำไปโพสต์หรือเผยแพร่ได้ทันที",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-white via-blue-50/30 to-white py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            เริ่มต้นใช้งานง่ายๆ
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            เพียง 4 ขั้นตอนง่ายๆ คุณก็สามารถสร้างคอนเทนต์คุณภาพได้ทันที
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Connection Line */}
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-blue-200 via-cyan-200 to-blue-200 lg:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-start gap-6 lg:flex-row">
                {/* Step Number Circle */}
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xl font-bold text-white shadow-lg">
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex-1 rounded-2xl bg-white p-6 shadow-md shadow-blue-100/50 transition-all hover:shadow-lg hover:shadow-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                      <Icon icon={step.icon} className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

