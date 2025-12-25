"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import Container from "@/components/Container"
import Card from "@/components/Card"
import Button from "@/components/Button"

export default function CafeDashboard() {
  const { storeId } = useParams()
  const router = useRouter()

  const [store, setStore] = useState(null)
  const [loading, setLoading] = useState(true)
  const [requested, setRequested] = useState(false)

  useEffect(() => {
    if (!storeId) return

    const init = async () => {
      // Save active cafe (CRITICAL – prevents collision)
      localStorage.setItem("active_store_id", storeId)

      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("id", storeId)
        .single()

      if (error || !data) {
        alert("Invalid café QR")
        return
      }

      setStore(data)
      setLoading(false)
    }

    init()
  }, [storeId])

  const requestCredit = async () => {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      router.push("/customer/login")
      return
    }

    await supabase.from("purchases").insert({
      store_id: storeId,
      customer_id: session.user.id,
      status: "pending"
    })

    setRequested(true)
  }

  if (loading) {
    return (
      <Container>
        <p className="text-center text-sm text-gray-500">Loading café...</p>
      </Container>
    )
  }

  return (
    <Container>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2E2E2E]">
          {store.name}
        </h1>
        <p className="text-sm text-[#8B8B8B] mt-1">
          Loyalty Rewards Program
        </p>
      </div>

      {/* Rewards Card */}
      <Card>
        <p className="text-sm text-[#8B8B8B] mb-2">
          Your Progress
        </p>

        <div className="flex items-end gap-2 mb-3">
          <span className="text-3xl font-semibold text-[#6F4E37]">
            0
          </span>
          <span className="text-sm text-[#8B8B8B]">
            / {store.reward_threshold} visits
          </span>
        </div>

        <p className="text-sm text-[#2E2E2E] mb-5">
          Buy {store.reward_threshold} times → get {store.reward_description}
        </p>

        <Button onClick={requestCredit} disabled={requested}>
          {requested ? "Request Sent" : "Request Credit"}
        </Button>
      </Card>

      {/* Status */}
      <p className="text-xs text-center text-[#8B8B8B] mt-4">
        Credits are added after café approval
      </p>

    </Container>
  )
}
