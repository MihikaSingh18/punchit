"use client"

import { usePathname, useRouter } from "next/navigation"

export default function CustomerBottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const item = (label, path) => (
    <button
      onClick={() => router.push(path)}
      className={`flex-1 py-2 text-sm ${
        pathname === path ? "font-bold text-black" : "text-gray-500"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white flex">
      {item("Dashboard", "/customer/dashboard")}
      {item("History", "/customer/history")}
      {item("Profile", "/customer/profile")}
    </div>
  )
}
