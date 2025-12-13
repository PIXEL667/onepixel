"use client"

import { Navigation } from "@/components/navigation"
import { MoodSlider } from "@/components/mood-slider"
import { MoodButton } from "@/components/mood-button"
import { useMood, getMoodColor, getMoodTextColor } from "@/contexts/mood-context"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function HeroPage() {
  const { mood, intensity } = useMood()

  const isCalm = intensity <= 33
  const isNeutral = intensity > 33 && intensity <= 66
  const isHyper = intensity > 66

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Full-screen hero */}
      <section
        className={cn(
          "min-h-screen flex flex-col items-center justify-center px-4 pt-20 transition-all duration-500",
          // Layout shifts based on intensity
          isCalm && "gap-12",
          isNeutral && "gap-8",
          isHyper && "gap-4",
        )}
      >
        {/* Hero title with mood-based styling */}
        <div
          className={cn(
            "text-center transition-all duration-500",
            isCalm && "space-y-6",
            isNeutral && "space-y-4",
            isHyper && "space-y-2",
          )}
        >
          <h1
            className={cn(
              "font-bold uppercase tracking-[0.2em] transition-all duration-300",
              isCalm && "text-4xl md:text-6xl",
              isNeutral && "text-5xl md:text-7xl",
              isHyper && "text-6xl md:text-8xl animate-jitter",
            )}
          >
            <span className="block">Feel.</span>
            <span className="block">Write.</span>
            <span
              className={cn(
                "block px-4 py-2 border-4 border-black inline-block mt-2",
                getMoodColor(mood),
                getMoodTextColor(mood),
              )}
            >
              Express.
            </span>
          </h1>

          <p
            className={cn(
              "font-mono text-muted-foreground max-w-md mx-auto",
              isCalm && "text-base leading-relaxed",
              isNeutral && "text-sm leading-normal",
              isHyper && "text-xs leading-tight tracking-widest uppercase",
            )}
          >
            A mood-driven journal where the UI responds to your emotional state. Intentional chaos. Controlled
            expression.
          </p>
        </div>

        {/* Mood Intensity Slider */}
        <div
          className={cn(
            "p-8 border-2 border-black bg-white transition-all duration-300",
            isCalm && "rounded-3xl shadow-lg",
            isNeutral && "rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
            isHyper && "rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-jitter",
          )}
        >
          <MoodSlider />
        </div>

        {/* CTA Buttons with 3 visual variants */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-4 transition-all duration-300",
            isCalm && "flex-col items-center",
            isNeutral && "flex-row",
            isHyper && "flex-row gap-2",
          )}
        >
          <Link href="/journal">
            <MoodButton variant="primary">Start Journal</MoodButton>
          </Link>
          <Link href="/player">
            <MoodButton variant="secondary">Open Player</MoodButton>
          </Link>
          <Link href="/dashboard">
            <MoodButton variant="secondary">View Dashboard</MoodButton>
          </Link>
        </div>

        {/* Visual indicator showing current mood state */}
        <div
          className={cn(
            "fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 border-2 border-black bg-white font-mono text-xs uppercase tracking-widest",
            isHyper && "animate-jitter",
          )}
        >
          <span className="text-muted-foreground">Mode: </span>
          <span className={cn("px-2 py-1 ml-2 border border-black", getMoodColor(mood), getMoodTextColor(mood))}>
            {mood}
          </span>
          <span className="text-muted-foreground ml-4">Intensity: </span>
          <span>{intensity}%</span>
        </div>
      </section>
    </main>
  )
}
