"use client"

import { createContext, useContext, useEffect, useState } from "react"

const PointsContext = createContext()

export function PointsProvider({ children }) {
  const [points, setPoints] = useState(0)
  const [storeConfig, setStoreConfig] = useState({
    pointsPerPurchase: 1,
    rewardThreshold: 10,
    rewardDescription: "Free Coffee"
  })

  // Load from localStorage
  useEffect(() => {
    const savedPoints = localStorage.getItem("points")
    const savedConfig = localStorage.getItem("storeConfig")

    if (savedPoints) setPoints(Number(savedPoints))
    if (savedConfig) setStoreConfig(JSON.parse(savedConfig))
  }, [])

  // Persist points
  useEffect(() => {
    localStorage.setItem("points", points)
  }, [points])

  // Persist store config
  useEffect(() => {
    localStorage.setItem("storeConfig", JSON.stringify(storeConfig))
  }, [storeConfig])

  const addPoints = () => {
    setPoints(prev => prev + storeConfig.pointsPerPurchase)
  }

  const resetPoints = () => {
    setPoints(0)
  }

  const updateStoreConfig = (config) => {
    setStoreConfig(config)
  }

  return (
    <PointsContext.Provider
      value={{
        points,
        storeConfig,
        addPoints,
        resetPoints,
        updateStoreConfig
      }}
    >
      {children}
    </PointsContext.Provider>
  )
}

export function usePoints() {
  return useContext(PointsContext)
}
