"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import Container from "@/components/Container"
import Card from "@/components/Card"

export default function ScanPage() {
  const { storeId } = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [done, setDone] = useState(false)
  const [store, setStore] = useState(null)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    // Fetch store info for display
    const { data: storeData } = await supabase
      .from("stores")
      .select("name")
      .eq("id", storeId)
      .single()

    setStore(storeData)

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      router.replace(`/customer/login?redirect=/scan/${storeId}`)
      return
    }

    // Register visit automatically
    await supabase.from("purchases").insert({
      store_id: storeId,
      customer_id: session.user.id
    })

    setDone(true)
    setLoading(false)
  }

  return (
    <Container>
      <Card>
        {loading && (
          <>
            <h2 className="mb-2">Checking you in…</h2>
            <p className="text-gray-600">
              Please wait
            </p>
          </>
        )}

        {done && (
          <>
            <h2 className="mb-2">
              Welcome to {store?.name}
            </h2>
            <p className="text-green-600 font-medium">
              ✅ Visit registered
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Your reward will be added once the store approves.
            </p>
          </>
        )}
      </Card>
    </Container>
  )
}
