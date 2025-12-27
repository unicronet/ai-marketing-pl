"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { useState } from "react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500">
              <Icon icon="mdi:robot" className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              AI Marketing
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-gray-600 transition-colors hover:text-blue-600"
            >
              ฟีเจอร์
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 transition-colors hover:text-blue-600"
            >
              วิธีใช้งาน
            </Link>
            <Link
              href="#"
              className="text-gray-600 transition-colors hover:text-blue-600"
            >
              ราคา
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="ghost">
              <Link href="/login">เข้าสู่ระบบ</Link>
            </Button>
            <Button asChild>
              <Link href="/register">
                <Icon icon="mdi:rocket-launch" className="mr-2 h-4 w-4" />
                ลงทะเบียนฟรี
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon
              icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"}
              className="h-6 w-6 text-gray-900"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-blue-100 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link
                href="#features"
                className="text-gray-600 transition-colors hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                ฟีเจอร์
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-600 transition-colors hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                วิธีใช้งาน
              </Link>
              <Link
                href="#"
                className="text-gray-600 transition-colors hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                ราคา
              </Link>
              <div className="flex flex-col gap-2 border-t border-blue-100 pt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">เข้าสู่ระบบ</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register">
                    <Icon icon="mdi:rocket-launch" className="mr-2 h-4 w-4" />
                    ลงทะเบียนฟรี
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

