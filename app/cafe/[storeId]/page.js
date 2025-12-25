// "use client"

// import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"
// import { supabase } from "@/lib/supabaseClient"
// import Container from "@/components/Container"
// import Card from "@/components/Card"
// import Button from "@/components/Button"

// export default function CafeDashboard() {
//   const { storeId } = useParams()
//   const [store, setStore] = useState(null)
//   const [credits, setCredits] = useState(0)
//   const [requested, setRequested] = useState(false)

//   useEffect(() => {
//     const load = async () => {
//       const { data: { session } } = await supabase.auth.getSession()
//       if (!session?.user) return

//       const storeRes = await supabase
//         .from("stores")
//         .select("name, reward_threshold, reward_description")
//         .eq("id", storeId)
//         .single()

//       setStore(storeRes.data)

//       const creditRes = await supabase
//         .from("purchases")
//         .select("id", { count: "exact" })
//         .eq("store_id", storeId)
//         .eq("customer_id", session.user.id)
//         .eq("status", "approved")

//       setCredits(creditRes.count)
//     }

//     load()
//   }, [storeId])

//   const requestCredit = async () => {
//     const { data: { session } } = await supabase.auth.getSession()
//     if (!session?.user) return alert("Please login")

//     await supabase.from("purchases").insert({
//       store_id: storeId,
//       customer_id: session.user.id,
//       status: "pending"
//     })

//     setRequested(true)
//   }

//   if (!store) return null

//   return (
//     <Container>
//       <h1 className="text-xl font-semibold mb-1">
//         Welcome to {store.name}
//       </h1>

//       <p className="text-sm text-gray-500 mb-6">
//         {store.reward_description}
//       </p>

//       <Card>
//         <p className="text-lg font-semibold mb-2">
//           {credits} / {store.reward_threshold} visits
//         </p>

//         {requested ? (
//           <p className="text-green-600 text-sm">
//             ✅ Visit registered. Awaiting approval.
//           </p>
//         ) : (
//           <Button onClick={requestCredit}>
//             Request Credit
//           </Button>
//         )}
//       </Card>
//     </Container>
//   )
// }




"use client"

import Container from "@/components/Container"
import Card from "@/components/Card"
import Button from "@/components/Button"

export default function CafeDashboard() {
  return (
    <Container>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2E2E2E]">
          Café Brew
        </h1>
        <p className="text-sm text-[#8B8B8B] mt-1">
          Loyalty Rewards Program
        </p>
      </div>

      {/* Rewards Card */}
      <Card>
        <p className="text-sm text-[#8B8B8B] mb-2">
          Your Progress
        </p>

        <div className="flex items-end gap-2 mb-3">
          <span className="text-3xl font-semibold text-[#6F4E37]">
            0
          </span>
          <span className="text-sm text-[#8B8B8B]">
            / 5 visits
          </span>
        </div>

        <p className="text-sm text-[#2E2E2E] mb-5">
          Buy 5 times → get 1 free coffee
        </p>

        <Button>
          Request Credit
        </Button>
      </Card>

      {/* Status */}
      <p className="text-xs text-center text-[#8B8B8B] mt-4">
        Credits are added after café approval
      </p>

    </Container>
  )
}
