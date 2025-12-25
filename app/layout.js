"use client"

import "./globals.css"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { PointsProvider } from "./context/PointsContext"

export default function RootLayout({ children }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(() => {
      setReady(true)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      setReady(true)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <html lang="en">
      <body>
        {ready ? (
          <PointsProvider>
            {children}
          </PointsProvider>
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        )}
      </body>
    </html>
  )
}
