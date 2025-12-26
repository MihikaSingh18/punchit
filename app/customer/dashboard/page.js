"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import CustomerShell from "@/components/CustomerShell"
import Card from "@/components/Card"
import Button from "@/components/Button"

export default function CustomerDashboard() {
  const searchParams = useSearchParams()
  const storeId = searchParams.get("storeId")

  const [credits, setCredits] = useState(0)
  const [loading, setLoading] = useState(true)
  const [requested, setRequested] = useState(false)

  useEffect(() => {
    const load = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from("customers")
        .select("credits")
        .eq("id", user.id)
        .single()

      setCredits(data?.credits || 0)
      setLoading(false)
    }

    load()
  }, [])

  const requestCredit = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user || !storeId) return

    await supabase.from("purchases").insert({
      customer_id: user.id,
      store_id: storeId,
      status: "pending"
    })

    setRequested(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFE8D6] to-[#FFD4B8]">
        <CustomerShell title="My Rewards">
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="animate-spin h-12 w-12 text-[#FF7043] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-[#6F4E37] font-medium">Loading your rewards...</p>
          </div>
        </CustomerShell>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFE8D6] to-[#FFD4B8]">
      <CustomerShell title="My Rewards">
        {/* Decorative elements */}
        <div className="absolute top-10 right-5 text-3xl opacity-20 animate-pulse">☕</div>
        <div className="absolute top-40 left-5 text-2xl opacity-20 animate-pulse delay-500">🎁</div>

        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Hero Card - Credits Display */}
          <div className="bg-gradient-to-br from-[#FF9A56] via-[#FF7043] to-[#FF5722] rounded-3xl p-8 text-white mb-6 shadow-2xl relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎯</span>
                <p className="text-sm font-medium opacity-90">Your Loyalty Balance</p>
              </div>
              
              <h2 className="text-6xl sm:text-7xl font-bold mt-3 mb-1">
                {credits}
              </h2>
              <p className="text-xl font-medium opacity-90 mb-4">
                Credits Earned
              </p>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">☕</span>
                  <p className="text-sm font-semibold">Reward Progress</p>
                </div>
                <p className="text-sm opacity-90">
                  Buy 5 times → Get 1 FREE coffee!
                </p>
                
                {/* Progress bar */}
                <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((credits % 5) * 20, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs opacity-75 mt-2">
                  {credits % 5} of 5 purchases complete
                </p>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-gradient-to-br from-white to-[#FFF8F0] rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-[#FFE8D6]">
            {!requested ? (
              <>
                <div className="text-center mb-6">
                  <div className="inline-block p-4 bg-gradient-to-br from-[#FFE8D6] to-[#FFD4B8] rounded-2xl mb-4">
                    <span className="text-4xl">📱</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2E2E2E] mb-2">
                    Ready to Earn?
                  </h3>
                  <p className="text-sm sm:text-base text-[#6F4E37]">
                    Scan the QR code at the café and request your credit after purchase
                  </p>
                </div>

                <button
                  onClick={requestCredit}
                  className="w-full bg-gradient-to-r from-[#FF9A56] to-[#FF7043] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-xl">✨</span>
                    Request Credit
                  </span>
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="inline-block p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl mb-4">
                  <span className="text-5xl">✅</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-700 mb-2">
                  Request Sent!
                </h3>
                <p className="text-sm sm:text-base text-green-600">
                  Waiting for café approval. You'll be notified once confirmed.
                </p>
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
              <div className="text-2xl mb-1">⚡</div>
              <p className="text-xs font-semibold text-[#6F4E37]">Instant</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
              <div className="text-2xl mb-1">🎁</div>
              <p className="text-xs font-semibold text-[#6F4E37]">Rewards</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
              <div className="text-2xl mb-1">🔒</div>
              <p className="text-xs font-semibold text-[#6F4E37]">Secure</p>
            </div>
          </div>
        </div>
      </CustomerShell>
    </div>
  )
}