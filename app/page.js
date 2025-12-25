"use client"

import { useRouter } from "next/navigation"
import Container from "@/components/Container"
import Card from "@/components/Card"
import Button from "@/components/Button"

export default function Home() {
  const router = useRouter()

  return (
    <Container>
      <div className="text-center mb-8">
        <h1>PunchIt</h1>
        <p className="text-gray-500 mt-2">
          Simple loyalty rewards for your favorite cafés
        </p>
        <p className="text-gray-500 mt-2">
          Simple loyalty rewards for your favorite cafés
        </p>
        <p className="text-gray-500 mt-2">
          Simple loyalty rewards for your favorite cafés
        </p>
        <p className="text-gray-500 mt-2">
          Simple loyalty rewards for your favorite cafés
        </p>
        <p className="text-gray-500 mt-2">
          Simple loyalty rewards for your favorite cafés
        </p>
        <p className="text-gray-500 mt-2">
          Simple loyalty rewards for your favorite cafés
        </p>
      </div>

      <Card className="bg-[#F5EFE6]">
  <div className="flex justify-between items-center gap-6 ">
    <Button
      onClick={() => router.push("/customer/login")}
      className="
        
        flex-1
        bg-[#7A4A2E]
        text-white
        hover:bg-[#6B3F27]
        active:scale-95
        transition-all
        duration-200
        ease-in-out
        shadow-md
        hover:shadow-lg
      "
    >
      I am a Customer
    </Button>

    <Button
      onClick={() => router.push("/store/login")}
      className="
        flex-1
        bg-[#A47148]
        text-white
        hover:bg-[#8F5F3C]
        active:scale-95
        transition-all
        duration-200
        ease-in-out
        shadow-md
        hover:shadow-lg
      "
    >
      I am a Store Owner
    </Button>
  </div>
</Card>

    </Container>
  )
}
