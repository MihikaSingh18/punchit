"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data?.session?.user) {
        router.push("/")
        return
      }

      const storeId = localStorage.getItem("active_store_id")

      if (storeId) {
        router.push(`/cafe/${storeId}`)
      } else {
        router.push("/customer/dashboard")
      }
    }

    handleAuth()
  }, [router])

  return <p className="text-center mt-10">Signing you in…</p>
}
