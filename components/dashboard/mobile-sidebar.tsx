"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "ภาพรวม",
    href: "/dashboard",
    icon: "mdi:view-dashboard",
  },
  {
    title: "สร้างคอนเทนต์",
    href: "/dashboard/content",
    icon: "mdi:file-document-edit",
  },
  {
    title: "สร้างแบนเนอร์",
    href: "/dashboard/banner",
    icon: "mdi:image-plus",
  },
  {
    title: "ประวัติ",
    href: "/dashboard/history",
    icon: "mdi:history",
  },
  {
    title: "ตั้งค่า",
    href: "/dashboard/settings",
    icon: "mdi:cog",
  },
]

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-blue-100 bg-white lg:hidden flex">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-blue-100 px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500">
              <Icon icon="mdi:robot" className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900">AI Marketing</div>
              <div className="text-xs text-gray-500">Platform</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon icon="mdi:close" className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-blue-50/50 hover:text-blue-600"
                )}
              >
                <Icon icon={item.icon} className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-blue-100 p-4">
          <div className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-900">
              <Icon icon="mdi:gift" className="h-5 w-5" />
              แผนฟรี
            </div>
            <p className="mt-1 text-xs text-blue-700">
              ใช้งานได้ไม่จำกัด
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

