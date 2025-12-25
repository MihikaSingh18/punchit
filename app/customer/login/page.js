"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import Container from "@/components/Container"
import Card from "@/components/Card"
import Button from "@/components/Button"

export default function CustomerLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
    const rawRedirect = searchParams.get("redirect")
    const redirectTo =
      rawRedirect && rawRedirect.startsWith("/scan/")
        ? rawRedirect
        : "/customer/dashboard"


  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace(redirectTo)
      }
    })
  }, [router, redirectTo])

  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + redirectTo
      }
    })

    if (!error) setSent(true)
  }

  return (
    <Container>
      <Card>
        <h2 className="text-xl font-bold mb-4">
          Register to earn rewards
        </h2>

        {!sent ? (
          <>
            <input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mb-4"
            />

            <Button onClick={sendMagicLink}>
              Send Login Link
            </Button>
          </>
        ) : (
          <p className="text-green-600">
            Login link sent. Check your email.
          </p>
        )}
      </Card>
    </Container>
  )
}
