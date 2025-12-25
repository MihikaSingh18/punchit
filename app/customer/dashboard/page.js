"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import CustomerShell from "@/components/CustomerShell"
import Card from "@/components/Card"
import Button from "@/components/Button"

export default function CustomerDashboard() {
  const searchParams = useSearchParams()
  const storeId = searchParams.get("storeId")

  const [credits, setCredits] = useState(0)
  const [loading, setLoading] = useState(true)
  const [requested, setRequested] = useState(false)

  useEffect(() => {
    const load = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from("customers")
        .select("credits")
        .eq("id", user.id)
        .single()

      setCredits(data?.credits || 0)
      setLoading(false)
    }

    load()
  }, [])

  const requestCredit = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user || !storeId) return

    await supabase.from("purchases").insert({
      customer_id: user.id,
      store_id: storeId,
      status: "pending"
    })

    setRequested(true)
  }

  if (loading) {
    return (
      <CustomerShell title="My Rewards">
        <p className="text-center text-gray-500">Loading...</p>
      </CustomerShell>
    )
  }

  return (
        <CustomerShell title="My Rewards">

      {/* Hero Card */}
      <div className="bg-[#6F4E37] rounded-3xl p-6 text-white mb-6">
        <p className="text-sm opacity-90">Your Loyalty Balance</p>
        <h2 className="text-4xl font-semibold mt-2">
          {credits}
          <span className="text-lg font-normal opacity-80"> Credits</span>
        </h2>

        <p className="text-sm mt-3 opacity-90">
          Buy 5 times → get 1 free coffee
        </p>
      </div>

      {/* Action Card */}
      <Card>
        {!requested ? (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Scan and request credit after your purchase.
            </p>

            <Button onClick={requestCredit}>
              Request Credit
            </Button>
          </>
        ) : (
          <p className="text-sm text-green-600 text-center">
            ✅ Request sent. Waiting for café approval.
          </p>
        )}
      </Card>

    </CustomerShell>

  )
}
