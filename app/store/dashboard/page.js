// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "@/lib/supabaseClient"
// import Card from "@/components/Card"
// import Button from "@/components/Button"

// export default function StoreDashboard() {
//   const [loading, setLoading] = useState(true)
//   const [storeId, setStoreId] = useState(null)
//   const [requests, setRequests] = useState([])

//   useEffect(() => {
//     const init = async () => {
//       const {
//         data: { session }
//       } = await supabase.auth.getSession()

//       if (!session?.user) return

//       setStoreId(session.user.id)

//       const { data } = await supabase
//         .from("purchases")
//         .select(`
//           id,
//           customer_id,
//           status,
//           customers(email)
//         `)
//         .eq("store_id", session.user.id)
//         .eq("status", "pending")
//         .order("created_at", { ascending: true })

//       setRequests(data || [])
//       setLoading(false)
//     }

//     init()
//   }, [])

//   const updateStatus = async (purchaseId, customerId) => {
//       await supabase
//         .from("purchases")
//         .update({ status: "approved" })
//         .eq("id", purchaseId)

//       await supabase.rpc("increment_customer_credit", {
//         customer_uuid: customerId
//       })

//       setRequests((prev) => prev.filter((r) => r.id !== purchaseId))
//   }


//   if (loading) {
//     return <p className="p-4">Loading dashboard...</p>
//   }

//   return (
//     <div className="min-h-screen bg-[#FAF7F2] p-4">
//       <h1 className="text-xl font-semibold mb-4">Store Dashboard</h1>

//       <Card>
//         <h2 className="text-lg font-medium mb-3">Pending Requests</h2>

//         {requests.length === 0 && (
//           <p className="text-sm text-gray-600">
//             No pending customer requests
//           </p>
//         )}

//         {requests.map((req) => (
//           <div
//             key={req.id}
//             className="flex items-center justify-between border-b py-3 last:border-b-0"
//           >
//             <div>
//               <p className="text-sm font-medium">
//                 {req.customers?.email || "Customer"}
//               </p>
//               <p className="text-xs text-gray-500">
//                 Requested loyalty credit
//               </p>
//             </div>

//             <div className="flex gap-2">
//               <Button onClick={() => updateStatus(req.id, req.customer_id)}>
//                 Approve
//               </Button>


//               <Button
//                 variant="secondary"
//                 onClick={() => updateStatus(req.id, "declined")}
//               >
//                 Decline
//               </Button>
//             </div>
//           </div>
//         ))}
//       </Card>
//     </div>
//   )
// }



"use client"

import Container from "@/components/Container"
import Card from "@/components/Card"
import Button from "@/components/Button"

export default function StoreDashboard() {
  const pendingRequests = [
    {
      id: 1,
      customer: "+91 98XXXX5519",
      time: "2 mins ago"
    }
  ]

  return (
    <Container>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2E2E2E]">
          Cafe21
        </h1>
        <p className="text-sm text-[#8B8B8B] mt-1">
          Store Dashboard
        </p>
      </div>

      {/* Pending Requests */}
      <h2 className="text-sm font-medium text-[#6F4E37] mb-3">
        Pending Requests
      </h2>

      {pendingRequests.length === 0 ? (
        <Card>
          <p className="text-sm text-[#8B8B8B] text-center">
            No pending customer requests
          </p>
        </Card>
      ) : (
        pendingRequests.map(req => (
          <Card key={req.id}>
            <div className="mb-3">
              <p className="text-sm font-medium text-[#2E2E2E]">
                {req.customer}
              </p>
              <p className="text-xs text-[#8B8B8B]">
                Requested {req.time}
              </p>
            </div>

            <div className="flex gap-3">
              <Button>
                Approve
              </Button>

              <Button variant="secondary">
                Reject
              </Button>
            </div>
          </Card>
        ))
      )}

    </Container>
  )
}
