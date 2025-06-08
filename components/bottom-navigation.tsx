"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, BookOpen, BarChart3, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Home",
    href: "/ua/lessons/1", // Updated from /roadmap to /ua/lessons/1
    icon: Home,
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: BarChart3,
  },
  {
    name: "Resources",
    href: "/resources",
    icon: BookOpen,
  },
  {
    name: "Profile",
    href: "/ua/lessons/1", // Updated from /profile to /ua/lessons/1
    icon: User,
  },
]

export default function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto">
        <nav className="flex justify-around bg-white border-t border-gray-200 shadow-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={cn(
                  "flex flex-col items-center py-2 px-3 w-full",
                  isActive ? "text-purple-600" : "text-gray-500",
                )}
              >
                <item.icon className={cn("h-6 w-6", isActive ? "text-purple-600" : "text-gray-500")} />
                <span className="text-xs mt-1">{item.name}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
