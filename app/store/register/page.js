"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import Container from "@/components/Container"
import Card from "@/components/Card"
import Button from "@/components/Button"
import Link from "next/link"

export default function StoreRegister() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const register = async () => {
    setLoading(true)
    setError("")

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    await supabase.from("stores").insert({
      id: data.user.id,
      name,
      reward_threshold: 5,
      reward_description: "Free Coffee"
    })

    setLoading(false)
    router.push("/store/login")
  }

  return (
    <Container>
      <Card>
        <h2 className="text-lg font-semibold mb-4">
          Register Your Store
        </h2>

        <input
          className="border rounded-xl p-3 w-full mb-3"
          placeholder="Store name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border rounded-xl p-3 w-full mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border rounded-xl p-3 w-full mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-600 mb-3">
            {error}
          </p>
        )}

        <Button
          onClick={register}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Creating..." : "Create Store Account"}
        </Button>

        <p className="text-center text-sm text-[#6F4E37] mt-4">
          Already registered?{" "}
          <Link href="/store/login" className="underline">
            Login here
          </Link>
        </p>
      </Card>
    </Container>
  )
}
