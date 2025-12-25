"use client"

import { supabase } from "@/lib/supabaseClient"
import Container from "@/components/Container"
import Card from "@/components/Card"
import Button from "@/components/Button"
import CustomerBottomNav from "@/components/CustomerBottomNav"

export default function CustomerProfile() {
  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <>
      <Container>
        <Card>
          <p className="mb-3">
            Logged in
          </p>

          <Button onClick={logout}>
            Logout
          </Button>
        </Card>
      </Container>

      <CustomerBottomNav />
    </>
  )
}
