"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { MoodSlider } from "@/components/mood-slider"
import { MoodButton } from "@/components/mood-button"
import { useMood } from "@/contexts/mood-context"
import { cn } from "@/lib/utils"

interface JournalEntry {
  id: number
  content: string
  mood: "neutral" | "hyper" | "good"
  date: string
}

/**
 * JOURNAL PAGE
 *
 * Layout recomposes based on mood (not just colors):
 * - Calm: Centered layout, wide margins
 * - Hyper: Asymmetrical grid, compressed spacing
 * - Good: Floating cards with playful spacing
 */
export default function JournalPage() {
  const { mood, intensity } = useMood()
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      content: "Today felt like a breakthrough. The ideas are flowing and I'm capturing them all.",
      mood: "good",
      date: "2024-01-15",
    },
    {
      id: 2,
      content: "Chaotic energy. Can't sit still. Everything feels urgent and important.",
      mood: "hyper",
      date: "2024-01-14",
    },
    {
      id: 3,
      content: "Peaceful morning. Coffee, silence, reflection. Sometimes quiet is all you need.",
      mood: "neutral",
      date: "2024-01-13",
    },
  ])
  const [newEntry, setNewEntry] = useState("")

  const isCalm = intensity <= 33
  const isNeutral = intensity > 33 && intensity <= 66
  const isHyper = intensity > 66

  const addEntry = () => {
    if (!newEntry.trim()) return
    setEntries([{ id: Date.now(), content: newEntry, mood, date: new Date().toISOString().split("T")[0] }, ...entries])
    setNewEntry("")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div
        className={cn(
          "pt-24 px-4 pb-12 transition-all duration-500",
          // Layout composition changes based on mood
          isCalm && "max-w-2xl mx-auto", // Centered, wide margins
          isNeutral && "max-w-4xl mx-auto",
          isHyper && "max-w-6xl mx-auto px-2", // Compressed
        )}
      >
        {/* Header with mood indicator */}
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
            Journal
          </h1>
          <p className="text-muted-foreground text-sm">
            /* layout: {isCalm ? "centered" : isNeutral ? "standard" : "asymmetric"} */
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

        {/* New entry form */}
        <div
          className={cn(
            "mb-12 p-6 border-2 border-black bg-white transition-all duration-300",
            isCalm && "rounded-3xl",
            isNeutral && "rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
            isHyper && "rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          )}
        >
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">New Entry</label>
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="How are you feeling?"
            className={cn(
              "w-full min-h-32 p-4 border-2 border-black font-mono text-sm resize-none focus:outline-none transition-all duration-300",
              isCalm && "rounded-xl",
              isNeutral && "rounded-none",
              isHyper && "rounded-none bg-muted/20",
            )}
          />
          <div
            className={cn(
              "mt-4 flex",
              isCalm && "justify-center",
              isNeutral && "justify-end",
              isHyper && "justify-start",
            )}
          >
            <MoodButton onClick={addEntry}>Save Entry</MoodButton>
          </div>
        </div>

        {/* Journal entries - layout changes based on mood */}
        <div
          className={cn(
            "transition-all duration-500",
            // Calm: centered single column with wide margins
            isCalm && "space-y-8",
            // Neutral: standard list
            isNeutral && "space-y-4",
            // Hyper: asymmetrical grid, compressed
            isHyper && "grid grid-cols-2 gap-2 md:grid-cols-3",
          )}
        >
          {entries.map((entry, index) => (
            <article
              key={entry.id}
              className={cn(
                "p-6 border-2 border-black bg-white transition-all duration-300",
                // Calm: floating with shadows, rounded
                isCalm && "rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1",
                // Neutral: retro style
                isNeutral &&
                  "rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                // Hyper: compressed, sharp, jittery on hover
                isHyper && "rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:animate-jitter",
                // Good mood: playful offset positions
                entry.mood === "good" && isCalm && (index % 2 === 0 ? "-rotate-1" : "rotate-1"),
              )}
            >
              {/* Entry mood indicator */}
              <div
                className={cn(
                  "inline-block px-2 py-1 mb-3 text-[10px] uppercase tracking-widest font-bold border border-black",
                  entry.mood === "neutral" && "bg-mood-neutral text-black",
                  entry.mood === "hyper" && "bg-mood-hyper text-white",
                  entry.mood === "good" && "bg-mood-good text-black",
                )}
              >
                {entry.mood}
              </div>

              <p
                className={cn(
                  "font-mono",
                  isCalm && "text-base leading-relaxed",
                  isNeutral && "text-sm leading-normal",
                  isHyper && "text-xs leading-tight",
                )}
              >
                {entry.content}
              </p>

              <time className="block mt-4 text-xs text-muted-foreground">{entry.date}</time>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
