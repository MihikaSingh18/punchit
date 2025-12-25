"use client"

import { usePathname, useRouter } from "next/navigation"

export default function BottomNav() {
  const path = usePathname()
  const router = useRouter()

  const item = (label, route) => (
    <button
      onClick={() => router.push(route)}
      className={`flex-1 py-3 text-sm ${
        path === route
          ? "text-[#6F4E37] font-medium"
          : "text-gray-400"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex max-w-[420px] mx-auto">
      {item("Rewards", "/customer/dashboard")}
      {item("History", "/customer/history")}
      {item("Profile", "/customer/profile")}
    </div>
  )
}
