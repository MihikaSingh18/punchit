"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Container from "@/components/Container"
import Card from "@/components/Card"
import CustomerBottomNav from "@/components/CustomerBottomNav"

export default function CustomerHistory() {
  const [items, setItems] = useState([])

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const { data: { session } } = await supabase.auth.getSession()

    const { data } = await supabase
      .from("purchases")
      .select("created_at, stores(name)")
      .eq("customer_id", session.user.id)
      .eq("status", "accepted")

    setItems(data || [])
  }

  return (
    <>
      <Container>
        <h2 className="font-bold mb-4">History</h2>

        {items.map((i, idx) => (
          <Card key={idx}>
            <p className="font-medium">{i.stores.name}</p>
            <p className="text-sm text-gray-500">
              Credit earned
            </p>
          </Card>
        ))}
      </Container>

      <CustomerBottomNav />
    </>
  )
}
