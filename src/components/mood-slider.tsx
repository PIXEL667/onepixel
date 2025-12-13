"use client"

import { useMood } from "@/contexts/mood-context"
import { cn } from "@/lib/utils"

/**
 * MOOD INTENSITY SLIDER
 *
 * Controls the intensity level (0-100) which affects:
 * - Button shapes and animations
 * - Layout compositions
 * - Progress bar styles
 * - Chart visualizations
 */
export function MoodSlider() {
  const { intensity, setIntensity, mood, setMood } = useMood()

  const isCalm = intensity <= 33
  const isNeutral = intensity > 33 && intensity <= 66
  const isHyper = intensity > 66

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Mood type selector */}
      <div className="flex gap-2 justify-center">
        {(["neutral", "hyper", "good"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={cn(
              "px-4 py-2 text-xs uppercase font-bold border-2 border-black transition-all",
              mood === m
                ? m === "neutral"
                  ? "bg-mood-neutral text-black"
                  : m === "hyper"
                    ? "bg-mood-hyper text-white"
                    : "bg-mood-good text-black"
                : "bg-white text-black hover:bg-muted",
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Intensity slider */}
      <div className="relative">
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          <span className={cn(isCalm && "text-foreground font-bold")}>Calm</span>
          <span className={cn(isNeutral && "text-foreground font-bold")}>Neutral</span>
          <span className={cn(isHyper && "text-foreground font-bold")}>Hyper</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className={cn(
            "w-full h-3 appearance-none cursor-pointer border-2 border-black",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer",
            mood === "neutral" && "[&::-webkit-slider-thumb]:bg-mood-neutral bg-mood-neutral/30",
            mood === "hyper" && "[&::-webkit-slider-thumb]:bg-mood-hyper bg-mood-hyper/30",
            mood === "good" && "[&::-webkit-slider-thumb]:bg-mood-good bg-mood-good/30",
            isCalm && "[&::-webkit-slider-thumb]:rounded-full",
            isNeutral && "[&::-webkit-slider-thumb]:rounded-none",
            isHyper && "[&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:rotate-45",
          )}
        />

        {/* Intensity value display */}
        <div className="text-center mt-2 font-mono text-lg">
          <span className="text-muted-foreground text-xs">intensity: </span>
          <span className={cn(isHyper && "animate-jitter inline-block")}>{intensity}</span>
        </div>
      </div>
    </div>
  )
}
