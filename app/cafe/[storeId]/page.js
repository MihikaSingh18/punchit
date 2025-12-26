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
  const [requested, setRequested] = useState(false)

  useEffect(() => {
    if (!storeId) return

    localStorage.setItem("active_store_id", storeId)

    supabase
      .from("stores")
      .select("*")
      .eq("id", storeId)
      .single()
      .then(({ data }) => setStore(data))
  }, [storeId])

  const requestCredit = async () => {
    const { data: { session } } =
      await supabase.auth.getSession()

    if (!session?.user) {
      router.push("/customer/login")
      return
    }

    await supabase.from("purchases").insert({
      store_id: storeId,
      customer_id: session.user.id,
      status: "pending",
    })

    setRequested(true)
  }

  if (!store) return null

  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-1">
        {store.name}
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        Loyalty Rewards Program
      </p>

      <Card>
        <p className="text-sm text-gray-500 mb-1">
          Your Progress
        </p>

        <p className="text-lg mb-3">
          0 / {store.reward_threshold} visits
        </p>

        <p className="text-sm mb-4">
          Buy {store.reward_threshold} times → get{" "}
          {store.reward_description}
        </p>

        <Button
          onClick={requestCredit}
          disabled={requested}
        >
          {requested ? "Request Sent" : "Request Credit"}
        </Button>
      </Card>
    </Container>
  )
}
