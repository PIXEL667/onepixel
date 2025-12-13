"use client"

import { Navigation } from "@/components/navigation"
import { MoodSlider } from "@/components/mood-slider"
import { useMood } from "@/contexts/mood-context"
import { cn } from "@/lib/utils"

/**
 * DASHBOARD PAGE
 *
 * Weekly overview showing:
 * - Number of journals written
 * - Dominant mood of the week
 * - Chart style and layout shift based on dominant mood
 */
export default function DashboardPage() {
  const { mood, intensity } = useMood()

  const isCalm = intensity <= 33
  const isNeutral = intensity > 33 && intensity <= 66
  const isHyper = intensity > 66

  // Mock weekly data
  const weeklyData = [
    { day: "Mon", entries: 2, mood: "neutral" as const, value: 45 },
    { day: "Tue", entries: 1, mood: "good" as const, value: 78 },
    { day: "Wed", entries: 3, mood: "hyper" as const, value: 92 },
    { day: "Thu", entries: 2, mood: "good" as const, value: 65 },
    { day: "Fri", entries: 1, mood: "neutral" as const, value: 40 },
    { day: "Sat", entries: 4, mood: "good" as const, value: 85 },
    { day: "Sun", entries: 2, mood: "neutral" as const, value: 55 },
  ]

  const totalEntries = weeklyData.reduce((acc, d) => acc + d.entries, 0)
  const moodCounts = weeklyData.reduce(
    (acc, d) => {
      acc[d.mood] = (acc[d.mood] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  const dominantMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div
        className={cn(
          "pt-24 px-4 pb-12 transition-all duration-500",
          isCalm && "max-w-4xl mx-auto",
          isNeutral && "max-w-5xl mx-auto",
          isHyper && "max-w-6xl mx-auto",
        )}
      >
        {/* Header */}
        <header
          className={cn(
            "mb-8 transition-all duration-300",
            isCalm && "text-center space-y-4",
            isNeutral && "text-left space-y-2",
            isHyper && "text-left space-y-1",
          )}
        >
          <h1
            className={cn(
              "font-bold uppercase tracking-[0.15em]",
              isCalm && "text-3xl",
              isNeutral && "text-4xl",
              isHyper && "text-5xl animate-jitter",
            )}
          >
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            /* chart style: {isCalm ? "smooth curves" : isNeutral ? "bar chart" : "fragmented"} */
          </p>
        </header>

        {/* Mood controls */}
        <div
          className={cn(
            "mb-8 p-6 border-2 border-black bg-white",
            isCalm && "rounded-2xl mx-auto max-w-md",
            isNeutral && "rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
            isHyper && "rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
          )}
        >
          <MoodSlider />
        </div>

        {/* Stats cards */}
        <div
          className={cn(
            "grid gap-4 mb-8 transition-all duration-500",
            isCalm && "grid-cols-1 md:grid-cols-3 gap-6",
            isNeutral && "grid-cols-3 gap-4",
            isHyper && "grid-cols-2 md:grid-cols-4 gap-2",
          )}
        >
          {/* Total entries */}
          <div
            className={cn(
              "p-6 border-2 border-black bg-white transition-all duration-300",
              isCalm && "rounded-2xl shadow-lg text-center",
              isNeutral && "rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
              isHyper && "rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] col-span-2",
            )}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Total Entries</p>
            <p
              className={cn(
                "font-bold",
                isCalm && "text-4xl",
                isNeutral && "text-5xl",
                isHyper && "text-6xl animate-jitter",
              )}
            >
              {totalEntries}
            </p>
          </div>

          {/* Dominant mood */}
          <div
            className={cn(
              "p-6 border-2 border-black transition-all duration-300",
              dominantMood === "neutral" && "bg-mood-neutral text-black",
              dominantMood === "hyper" && "bg-mood-hyper text-white",
              dominantMood === "good" && "bg-mood-good text-black",
              isCalm && "rounded-2xl shadow-lg text-center",
              isNeutral && "rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
              isHyper && "rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
            )}
          >
            <p className="text-xs uppercase tracking-widest opacity-70 mb-2">Dominant Mood</p>
            <p
              className={cn(
                "font-bold uppercase",
                isCalm && "text-2xl",
                isNeutral && "text-3xl",
                isHyper && "text-4xl animate-jitter",
              )}
            >
              {dominantMood}
            </p>
          </div>

          {/* Streak */}
          <div
            className={cn(
              "p-6 border-2 border-black bg-white transition-all duration-300",
              isCalm && "rounded-2xl shadow-lg text-center",
              isNeutral && "rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
              isHyper && "rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
            )}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Streak</p>
            <p
              className={cn(
                "font-bold",
                isCalm && "text-4xl",
                isNeutral && "text-5xl",
                isHyper && "text-6xl animate-jitter",
              )}
            >
              7<span className="text-lg text-muted-foreground">days</span>
            </p>
          </div>
        </div>

        {/* Weekly chart - style changes based on mood */}
        <div
          className={cn(
            "p-6 border-2 border-black bg-white transition-all duration-500",
            isCalm && "rounded-3xl shadow-xl",
            isNeutral && "rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
            isHyper && "rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          )}
        >
          <h2
            className={cn(
              "font-bold uppercase tracking-wider mb-6",
              isCalm && "text-lg text-center",
              isNeutral && "text-xl",
              isHyper && "text-2xl animate-jitter",
            )}
          >
            Weekly Overview
          </h2>

          {/* Chart visualization */}
          <div
            className={cn(
              "h-64 flex items-end transition-all duration-500",
              isCalm && "gap-8 justify-center",
              isNeutral && "gap-4",
              isHyper && "gap-1",
            )}
          >
            {weeklyData.map((day, i) => (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                {/* Bar */}
                <div className="w-full flex flex-col items-center justify-end h-48 relative">
                  {/* Calm: smooth rounded bars with gradient feel */}
                  {isCalm && (
                    <div
                      className={cn(
                        "w-full max-w-12 rounded-t-full border-2 border-black transition-all duration-700 ease-out",
                        day.mood === "neutral" && "bg-mood-neutral",
                        day.mood === "hyper" && "bg-mood-hyper",
                        day.mood === "good" && "bg-mood-good",
                      )}
                      style={{ height: `${day.value}%` }}
                    />
                  )}

                  {/* Neutral: standard retro bars */}
                  {isNeutral && (
                    <div
                      className={cn(
                        "w-full border-2 border-black transition-all duration-300",
                        "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                        day.mood === "neutral" && "bg-mood-neutral",
                        day.mood === "hyper" && "bg-mood-hyper",
                        day.mood === "good" && "bg-mood-good",
                      )}
                      style={{ height: `${day.value}%` }}
                    />
                  )}

                  {/* Hyper: fragmented/irregular bars */}
                  {isHyper && (
                    <div className="w-full flex flex-col-reverse gap-0.5" style={{ height: `${day.value}%` }}>
                      {[...Array(Math.floor(day.value / 10))].map((_, j) => (
                        <div
                          key={j}
                          className={cn(
                            "w-full border border-black transition-all duration-75",
                            day.mood === "neutral" && "bg-mood-neutral",
                            day.mood === "hyper" && "bg-mood-hyper",
                            day.mood === "good" && "bg-mood-good",
                          )}
                          style={{
                            height: `${8 + Math.random() * 8}px`,
                            transform: `translateX(${(Math.random() - 0.5) * 4}px)`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Entry count */}
                  <span className={cn("absolute -top-6 text-xs font-mono", isHyper && "animate-jitter")}>
                    {day.entries}
                  </span>
                </div>

                {/* Day label */}
                <span
                  className={cn(
                    "mt-2 text-xs uppercase tracking-widest text-muted-foreground",
                    isCalm && "text-sm",
                    isHyper && "text-[10px]",
                  )}
                >
                  {day.day}
                </span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div
            className={cn(
              "mt-6 flex flex-wrap gap-4",
              isCalm && "justify-center",
              isNeutral && "justify-start",
              isHyper && "justify-between",
            )}
          >
            {(["neutral", "hyper", "good"] as const).map((m) => (
              <div key={m} className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-4 h-4 border border-black",
                    m === "neutral" && "bg-mood-neutral",
                    m === "hyper" && "bg-mood-hyper",
                    m === "good" && "bg-mood-good",
                    isCalm && "rounded-full",
                    isNeutral && "rounded-none",
                    isHyper && "rounded-none rotate-45",
                  )}
                />
                <span className="text-xs uppercase tracking-widest">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood distribution */}
        <div
          className={cn(
            "mt-8 grid gap-4 transition-all duration-500",
            isCalm && "grid-cols-1 md:grid-cols-3 gap-6",
            isNeutral && "grid-cols-3 gap-4",
            isHyper && "grid-cols-3 gap-2",
          )}
        >
          {(["neutral", "hyper", "good"] as const).map((m) => (
            <div
              key={m}
              className={cn(
                "p-6 border-2 border-black transition-all duration-300",
                m === "neutral" && "bg-mood-neutral text-black",
                m === "hyper" && "bg-mood-hyper text-white",
                m === "good" && "bg-mood-good text-black",
                isCalm && "rounded-2xl shadow-lg text-center",
                isNeutral && "rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                isHyper && "rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
              )}
            >
              <p className="text-xs uppercase tracking-widest opacity-70 mb-2">{m} days</p>
              <p
                className={cn(
                  "font-bold",
                  isCalm && "text-4xl",
                  isNeutral && "text-5xl",
                  isHyper && "text-6xl animate-jitter",
                )}
              >
                {moodCounts[m] || 0}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
