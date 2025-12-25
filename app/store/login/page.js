"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Card from "@/components/Card"
import Button from "@/components/Button"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function StoreLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push("/store/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
      <Card>
        <h2 className="text-xl font-semibold mb-6 text-center">
          Store Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-600 mb-3">
            {error}
          </p>
        )}

        <Button
          className="w-full"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-[#6F4E37] mt-4">
          New store?{" "}
          <Link href="/store/register" className="underline">
            Register here
          </Link>
        </p>
      </Card>
    </div>
  )
}
