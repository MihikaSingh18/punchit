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
      const { data: { session } } =
        await supabase.auth.getSession()

      if (!session?.user) return

      const { data } = await supabase
        .from("purchases")
        .select("*")
        .eq("store_id", session.user.id)
        .eq("status", "pending")

      setRequests(data || [])
    }

    load()
  }, [])

  return (
    <Container>
      <h2 className="text-2xl font-semibold mb-4">
        Store Dashboard
      </h2>

      {requests.length === 0 && (
        <p className="text-sm text-gray-500">
          No pending customer requests
        </p>
      )}

      {requests.map((r) => (
        <Card key={r.id}>
          <p className="text-sm mb-3">
            Customer requested a credit
          </p>
          <Button>Approve</Button>
        </Card>
      ))}
    </Container>
  )
}
