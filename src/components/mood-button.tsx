"use client"

import type React from "react"

import { useMood, getMoodColor, getMoodTextColor } from "@/contexts/mood-context"
import { cn } from "@/lib/utils"

interface MoodButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
  className?: string
}

/**
 * MOOD-DRIVEN BUTTON COMPONENT
 *
 * Visual variants based on intensity slider:
 * - Calm (0-33): Rounded corners, slow hover animation (transition-all duration-500)
 * - Neutral (34-66): Standard retro button with hard edges
 * - Hyper (67-100): Sharp edges, fast jittery micro-interaction
 */
export function MoodButton({ children, onClick, variant = "primary", className }: MoodButtonProps) {
  const { mood, intensity } = useMood()

  // Determine visual variant based on intensity
  // 0-33: Calm | 34-66: Neutral | 67-100: Hyper
  const isCalm = intensity <= 33
  const isNeutral = intensity > 33 && intensity <= 66
  const isHyper = intensity > 66

  const baseStyles = cn(
    "relative font-mono uppercase tracking-wider text-sm font-bold px-6 py-3 border-2 border-black",
    variant === "primary" ? getMoodColor(mood) : "bg-white",
    variant === "primary" ? getMoodTextColor(mood) : "text-black",
  )

  const moodStyles = cn(
    // Calm: rounded, slow transitions
    isCalm && "rounded-full transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg",
    // Neutral: standard retro button
    isNeutral &&
      "rounded-none transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none",
    // Hyper: sharp edges, jittery
    isHyper && "rounded-none transition-all duration-75 hover:animate-jitter shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
  )

  return (
    <button onClick={onClick} className={cn(baseStyles, moodStyles, className)}>
      {/* Intensity indicator annotation */}
      <span className="absolute -top-6 left-0 text-[10px] text-muted-foreground opacity-60">
        {isCalm && "/* calm: rounded, slow */"}
        {isNeutral && "/* neutral: retro */"}
        {isHyper && "/* hyper: jittery */"}
      </span>
      {children}
    </button>
  )
}
