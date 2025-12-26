"use client"

import { useRouter } from "next/navigation"
import Container from "@/components/Container"

export default function Home() {
  const router = useRouter()

 return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFE8D6] to-[#FFD4B8]">
      <Container>
        {/* Decorative coffee beans */}
        <div className="absolute top-10 left-5 text-4xl opacity-20 animate-pulse">☕</div>
        <div className="absolute top-32 right-8 text-3xl opacity-20 animate-pulse delay-700">☕</div>
        
        {/* Header */}
        <div className="text-center mb-10 px-4 pt-8">
          <div className="inline-block mb-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-5xl mb-2">☕</div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#8B6F47] via-[#6F4E37] to-[#5C3D2E] bg-clip-text text-transparent mb-3">
            PunchIt
          </h1>
          <p className="text-base sm:text-lg text-[#6F4E37] font-medium">
            Simple loyalty rewards for your favorite cafés
          </p>
        </div>

        {/* Action Cards */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full px-4 max-w-4xl mx-auto">
          {/* Customer */}
          <button
            onClick={() => router.push("/customer/login")}
            className="group flex-1 bg-gradient-to-br from-white to-[#FFF8F0] rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 active:scale-100 border-2 border-[#FFE8D6]"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-[#FF9A56] to-[#FF7043] flex items-center justify-center text-4xl sm:text-5xl shadow-md group-hover:scale-110 transition-transform mb-4">
              👤
            </div>
            <p className="font-bold text-[#2E2E2E] text-xl sm:text-2xl mb-2">
              I'm a Customer
            </p>
            <p className="text-sm sm:text-base text-[#6F4E37] mb-3">
              Collect rewards at your favorite cafés
            </p>
            <span className="text-[#FF7043] text-3xl group-hover:translate-y-1 transition-transform">↓</span>
          </button>

          {/* Store Owner */}
          <button
            onClick={() => router.push("/store/login")}
            className="group flex-1 bg-gradient-to-br from-white to-[#FFF8F0] rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 active:scale-100 border-2 border-[#FFE8D6]"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-[#8B6F47] to-[#6F4E37] flex items-center justify-center text-4xl sm:text-5xl shadow-md group-hover:scale-110 transition-transform mb-4">
              🏪
            </div>
            <p className="font-bold text-[#2E2E2E] text-xl sm:text-2xl mb-2">
              I'm a Store Owner
            </p>
            <p className="text-sm sm:text-base text-[#6F4E37] mb-3">
              Manage your loyalty program
            </p>
            <span className="text-[#6F4E37] text-3xl group-hover:translate-y-1 transition-transform">↓</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-8 sm:gap-12 mt-12 sm:mt-16 px-4 pb-8">
          <div className="text-center">
            <div className="text-2xl mb-1">⚡</div>
            <span className="text-sm sm:text-base font-semibold text-[#6F4E37]">Easy</span>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🚀</div>
            <span className="text-sm sm:text-base font-semibold text-[#6F4E37]">Fast</span>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🎁</div>
            <span className="text-sm sm:text-base font-semibold text-[#6F4E37]">Free</span>
          </div>
        </div>
      </Container>
    </div>
  )
}