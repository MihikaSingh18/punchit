"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Container from "@/components/Container"
import Card from "@/components/Card"
import Button from "@/components/Button"

export default function StoreDashboard() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const load = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      if (!sessionData?.session?.user) return

      const storeId = sessionData.session.user.id

      const { data } = await supabase
        .from("purchases")
        .select("id, customer_id, created_at")
        .eq("store_id", storeId)
        .eq("status", "pending")

      setRequests(data || [])
    }

    load()
  }, [])

  const approve = async (purchaseId, customerId) => {
    const { data: sessionData } = await supabase.auth.getSession()
    const storeId = sessionData.session.user.id

    await supabase.from("purchases")
      .update({ status: "approved" })
      .eq("id", purchaseId)

    await supabase.rpc("increment_customer_points", {
      p_store_id: storeId,
      p_customer_id: customerId
    })

    location.reload()
  }

  return (
    <Container>
      <h1 className="text-xl font-semibold mb-4">Pending Requests</h1>

      {requests.length === 0 && <p>No pending requests</p>}

      {requests.map(r => (
        <Card key={r.id}>
          <p>{r.customer_id}</p>
          <Button onClick={() => approve(r.id, r.customer_id)}>
            Approve
          </Button>
        </Card>
      ))}
    </Container>
  )
}
