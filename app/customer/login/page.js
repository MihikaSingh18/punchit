"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import Container from "@/components/Container"
import Card from "@/components/Card"
import Button from "@/components/Button"

export default function CustomerLogin() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  const login = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (!error) {
      alert("Check your email to login.")
    }
  }

  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN") {
      const storeId = localStorage.getItem("active_store_id")
      router.push(storeId ? `/cafe/${storeId}` : "/customer/dashboard")
    }
  })

  return (
    <Container>
      <Card>
        <h2 className="mb-4 text-lg font-semibold">Customer Login</h2>

        <input
          className="border p-3 w-full rounded mb-4"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <Button onClick={login}>Send Login Link</Button>
      </Card>
    </Container>
  )
}
