"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type MoodType = "neutral" | "hyper" | "good"

interface MoodContextType {
  mood: MoodType
  intensity: number // 0-100
  setMood: (mood: MoodType) => void
  setIntensity: (intensity: number) => void
}

const MoodContext = createContext<MoodContextType | undefined>(undefined)

export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<MoodType>("neutral")
  const [intensity, setIntensity] = useState(50)

  return <MoodContext.Provider value={{ mood, intensity, setMood, setIntensity }}>{children}</MoodContext.Provider>
}

export function useMood() {
  const context = useContext(MoodContext)
  if (!context) {
    throw new Error("useMood must be used within a MoodProvider")
  }
  return context
}

/**
 * Mood-based color mapping:
 * - Neutral/Reflective: White, Black, Yellow (oklch(0.88 0.18 95))
 * - Hyper/Chaotic: White, Black, Red (oklch(0.65 0.25 25))
 * - Good/Flow: White, Black, Sky Blue (oklch(0.75 0.15 230))
 */
export function getMoodColor(mood: MoodType): string {
  switch (mood) {
    case "neutral":
      return "bg-mood-neutral" // Yellow
    case "hyper":
      return "bg-mood-hyper" // Red
    case "good":
      return "bg-mood-good" // Sky Blue
  }
}

export function getMoodTextColor(mood: MoodType): string {
  switch (mood) {
    case "neutral":
      return "text-black"
    case "hyper":
      return "text-white"
    case "good":
      return "text-black"
  }
}

export function getMoodBorderColor(mood: MoodType): string {
  switch (mood) {
    case "neutral":
      return "border-mood-neutral"
    case "hyper":
      return "border-mood-hyper"
    case "good":
      return "border-mood-good"
  }
}
