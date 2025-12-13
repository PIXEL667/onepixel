"use client"

import { useState, useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { MoodSlider } from "@/components/mood-slider"
import { useMood, getMoodColor, getMoodTextColor } from "@/contexts/mood-context"
import { cn } from "@/lib/utils"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"

/**
 * MUSIC PLAYER PAGE
 *
 * Controls, progress bar, and animations change based on mood:
 * - Calm: Smooth linear progress, gentle transitions
 * - Neutral: Standard retro controls
 * - Hyper: Segmented/irregular progress bar, jittery animations
 * - Good: Bouncy, animated transitions
 */
export default function PlayerPage() {
  const { mood, intensity } = useMood()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(35)
  const [volume, setVolume] = useState(75)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const isCalm = intensity <= 33
  const isNeutral = intensity > 33 && intensity <= 66
  const isHyper = intensity > 66

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5))
      }, 100)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const tracks = [
    { title: "Synthetic Dreams", artist: "NeonWave", duration: "4:32" },
    { title: "Midnight Protocol", artist: "DataStream", duration: "3:45" },
    { title: "Digital Sunrise", artist: "Chromatic", duration: "5:18" },
  ]

  const [currentTrack, setCurrentTrack] = useState(0)

  const nextTrack = () => {
    setCurrentTrack((c) => (c + 1) % tracks.length)
    setProgress(0)
  }

  const prevTrack = () => {
    setCurrentTrack((c) => (c - 1 + tracks.length) % tracks.length)
    setProgress(0)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div
        className={cn(
          "pt-24 px-4 pb-12 min-h-screen flex flex-col items-center justify-center transition-all duration-500",
          isCalm && "gap-12",
          isNeutral && "gap-8",
          isHyper && "gap-4",
        )}
      >
        {/* Mood controls */}
        <div
          className={cn(
            "p-6 border-2 border-black bg-white w-full max-w-md",
            isCalm && "rounded-2xl",
            isNeutral && "rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
            isHyper && "rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
          )}
        >
          <MoodSlider />
        </div>

        {/* Main player card */}
        <div
          className={cn(
            "w-full max-w-lg p-8 border-2 border-black bg-white transition-all duration-500",
            isCalm && "rounded-3xl shadow-2xl",
            isNeutral && "rounded-none shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
            isHyper && "rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-jitter",
          )}
        >
          {/* Album art placeholder */}
          <div
            className={cn(
              "aspect-square w-full mb-6 border-2 border-black overflow-hidden relative",
              getMoodColor(mood),
              isCalm && "rounded-2xl",
              isNeutral && "rounded-none",
              isHyper && "rounded-none",
            )}
          >
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center text-6xl font-bold",
                getMoodTextColor(mood),
              )}
            >
              {mood === "neutral" && "◐"}
              {mood === "hyper" && "⚡"}
              {mood === "good" && "✦"}
            </div>
            {/* Animated visualizer bars */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-1 justify-center">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 bg-black transition-all",
                    isPlaying && isCalm && "animate-pulse",
                    isPlaying && isHyper && "animate-jitter",
                    isPlaying && mood === "good" && "animate-bounce-soft",
                  )}
                  style={{
                    height: isPlaying ? `${Math.random() * 40 + 10}px` : "4px",
                    animationDelay: `${i * 0.1}s`,
                    transitionDuration: isCalm ? "500ms" : isHyper ? "50ms" : "200ms",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Track info */}
          <div
            className={cn("text-center mb-6", isCalm && "space-y-2", isNeutral && "space-y-1", isHyper && "space-y-0")}
          >
            <h2
              className={cn(
                "font-bold uppercase tracking-wider",
                isCalm && "text-xl",
                isNeutral && "text-2xl",
                isHyper && "text-3xl animate-jitter",
              )}
            >
              {tracks[currentTrack].title}
            </h2>
            <p className="text-muted-foreground text-sm uppercase tracking-widest">{tracks[currentTrack].artist}</p>
          </div>

          {/* Progress bar - changes based on mood */}
          <div className="mb-6">
            <div
              className={cn(
                "relative h-4 border-2 border-black overflow-hidden",
                isCalm && "rounded-full",
                isNeutral && "rounded-none",
                isHyper && "rounded-none",
              )}
            >
              {/* Calm: smooth linear progress */}
              {isCalm && (
                <div
                  className={cn("h-full transition-all duration-500", getMoodColor(mood))}
                  style={{ width: `${progress}%` }}
                />
              )}

              {/* Neutral: standard progress */}
              {isNeutral && (
                <div
                  className={cn("h-full transition-all duration-200", getMoodColor(mood))}
                  style={{ width: `${progress}%` }}
                />
              )}

              {/* Hyper: segmented/irregular progress */}
              {isHyper && (
                <div className="h-full flex gap-0.5">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex-1 transition-all duration-75",
                        (i / 20) * 100 <= progress ? getMoodColor(mood) : "bg-muted",
                      )}
                      style={{
                        transform:
                          (i / 20) * 100 <= progress && isPlaying
                            ? `scaleY(${0.8 + Math.random() * 0.4})`
                            : "scaleY(1)",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Time display */}
            <div className="flex justify-between mt-2 text-xs text-muted-foreground font-mono">
              <span>
                {Math.floor(progress * 0.045)}:{String(Math.floor((progress * 2.7) % 60)).padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase">
                /* progress: {isCalm ? "smooth" : isNeutral ? "standard" : "segmented"} */
              </span>
              <span>{tracks[currentTrack].duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div
            className={cn(
              "flex items-center justify-center",
              isCalm && "gap-8",
              isNeutral && "gap-4",
              isHyper && "gap-2",
            )}
          >
            <button
              onClick={prevTrack}
              className={cn(
                "p-3 border-2 border-black transition-all",
                isCalm && "rounded-full hover:scale-110 duration-500",
                isNeutral && "rounded-none hover:bg-muted duration-200",
                isHyper && "rounded-none hover:animate-jitter duration-75",
              )}
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={cn(
                "p-4 border-2 border-black transition-all",
                getMoodColor(mood),
                getMoodTextColor(mood),
                isCalm && "rounded-full hover:scale-110 duration-500 shadow-lg",
                isNeutral &&
                  "rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 duration-200",
                isHyper && "rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] duration-75",
                isPlaying && mood === "good" && "animate-bounce-soft",
              )}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            <button
              onClick={nextTrack}
              className={cn(
                "p-3 border-2 border-black transition-all",
                isCalm && "rounded-full hover:scale-110 duration-500",
                isNeutral && "rounded-none hover:bg-muted duration-200",
                isHyper && "rounded-none hover:animate-jitter duration-75",
              )}
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume control */}
          <div
            className={cn(
              "mt-6 flex items-center gap-3",
              isCalm && "justify-center",
              isNeutral && "justify-end",
              isHyper && "justify-start",
            )}
          >
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className={cn(
                "w-24 h-2 appearance-none cursor-pointer border border-black",
                "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer",
                getMoodColor(mood).replace("bg-", "[&::-webkit-slider-thumb]:bg-"),
                "bg-muted",
                isCalm && "[&::-webkit-slider-thumb]:rounded-full rounded-full",
                isNeutral && "[&::-webkit-slider-thumb]:rounded-none rounded-none",
                isHyper && "[&::-webkit-slider-thumb]:rounded-none rounded-none",
              )}
            />
          </div>
        </div>

        {/* Track list */}
        <div
          className={cn(
            "w-full max-w-lg border-2 border-black bg-white",
            isCalm && "rounded-2xl p-6",
            isNeutral && "rounded-none p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
            isHyper && "rounded-none p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          )}
        >
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Queue</h3>
          <div className={cn(isCalm && "space-y-3", isNeutral && "space-y-2", isHyper && "space-y-1")}>
            {tracks.map((track, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentTrack(i)
                  setProgress(0)
                }}
                className={cn(
                  "w-full flex items-center justify-between p-3 border-2 border-black transition-all text-left",
                  currentTrack === i ? cn(getMoodColor(mood), getMoodTextColor(mood)) : "bg-white hover:bg-muted",
                  isCalm && "rounded-xl",
                  isNeutral && "rounded-none",
                  isHyper && "rounded-none",
                )}
              >
                <div>
                  <p className="font-bold text-sm">{track.title}</p>
                  <p className={cn("text-xs", currentTrack === i ? "opacity-70" : "text-muted-foreground")}>
                    {track.artist}
                  </p>
                </div>
                <span className="text-xs font-mono">{track.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
