"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import Container from "@/components/Container"
import Card from "@/components/Card"
import Button from "@/components/Button"

export default function StoreLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (!error) router.push("/store/dashboard")
    else alert(error.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFE8D6] to-[#FFD4B8]">
      <Container>
        {/* Decorative elements */}
        <div className="absolute top-10 left-5 text-4xl opacity-20 animate-pulse">☕</div>
        <div className="absolute top-32 right-8 text-3xl opacity-20 animate-pulse delay-700">☕</div>
        
        {/* Header */}
        <div className="text-center mb-8 px-4 pt-8">
          <div className="inline-block mb-4 p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-4xl">🏪</div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#FF9A56] via-[#FF7043] to-[#FF5722] bg-clip-text text-transparent mb-2">
            Store Portal
          </h1>
          <p className="text-base sm:text-lg text-[#6F4E37] font-medium">
            Manage your loyalty program
          </p>
        </div>

        {/* Login Card */}
        <div className="max-w-md mx-auto px-4">
          <div className="bg-gradient-to-br from-white to-[#FFF8F0] rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-[#FFE8D6]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2E2E2E] mb-6 text-center">
              Store Login
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#6F4E37] mb-2">
                Email Address
              </label>
              <input
                className="w-full border-2 border-[#FFE8D6] rounded-xl p-4 text-base focus:outline-none focus:border-[#FF7043] focus:ring-2 focus:ring-[#FF7043]/20 transition-all"
                placeholder="store@email.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#6F4E37] mb-2">
                Password
              </label>
              <input
                className="w-full border-2 border-[#FFE8D6] rounded-xl p-4 text-base focus:outline-none focus:border-[#FF7043] focus:ring-2 focus:ring-[#FF7043]/20 transition-all"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={login}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF9A56] to-[#FF7043] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login to Dashboard"
              )}
            </button>

            <p
              className="text-sm text-center text-[#6F4E37] mt-6 font-semibold underline cursor-pointer hover:text-[#FF7043] transition-colors"
              onClick={() =>
                router.push("/store/register")
              }
            >
              Register your store
            </p>
          </div>

          {/* Info Section */}
          <div className="mt-6 flex justify-center gap-6 text-center">
            <div>
              <div className="text-2xl mb-1">🔒</div>
              <span className="text-xs sm:text-sm font-semibold text-[#6F4E37]">Secure</span>
            </div>
            <div>
              <div className="text-2xl mb-1">📊</div>
              <span className="text-xs sm:text-sm font-semibold text-[#6F4E37]">Analytics</span>
            </div>
            <div>
              <div className="text-2xl mb-1">⚡</div>
              <span className="text-xs sm:text-sm font-semibold text-[#6F4E37]">Easy Setup</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}