import Link from "next/link"
import { Icon } from "@iconify/react"

export function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500">
                <Icon icon="mdi:robot" className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                AI Marketing
              </span>
            </div>
            <p className="mt-4 max-w-md text-gray-600">
              แพลตฟอร์มสร้างคอนเทนต์การตลาดด้วย AI
              ที่ออกแบบมาเพื่อธุรกิจไทยโดยเฉพาะ
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200"
              >
                <Icon icon="mdi:facebook" className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200"
              >
                <Icon icon="mdi:twitter" className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200"
              >
                <Icon icon="mdi:linkedin" className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900">ผลิตภัณฑ์</h3>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li>
                <Link href="#features" className="hover:text-blue-600">
                  ฟีเจอร์
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600">
                  ราคา
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900">บริษัท</h3>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li>
                <Link href="#" className="hover:text-blue-600">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600">
                  ติดต่อ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-blue-100 pt-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} AI Marketing Platform. สงวนลิขสิทธิ์.</p>
        </div>
      </div>
    </footer>
  )
}

