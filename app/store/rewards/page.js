"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import Container from "@/components/Container"
import Card from "@/components/Card"
import Button from "@/components/Button"

export default function StoreRewards() {
  const [threshold, setThreshold] = useState(5)
  const [reward, setReward] = useState("Free Coffee")

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const { data } = await supabase.from("stores").select("*").single()
    if (data) {
      setThreshold(data.reward_threshold)
      setReward(data.reward_description)
    }
  }

  const save = async () => {
    await supabase.from("stores").update({
      reward_threshold: threshold,
      reward_description: reward
    })
    alert("Saved")
  }

  return (
    <Container>
      <Card>
        <input
          value={threshold}
          onChange={e => setThreshold(e.target.value)}
          className="border w-full mb-3 p-2"
          placeholder="Visits required"
        />
        <input
          value={reward}
          onChange={e => setReward(e.target.value)}
          className="border w-full mb-3 p-2"
          placeholder="Reward"
        />
        <Button onClick={save}>Save</Button>
      </Card>
    </Container>
  )
}
