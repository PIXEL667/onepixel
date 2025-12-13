"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMood, getMoodColor, getMoodTextColor } from "@/contexts/mood-context"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()
  const { mood, intensity } = useMood()

  const isHyper = intensity > 66

  const links = [
    { href: "/", label: "Home" },
    { href: "/journal", label: "Journal" },
    { href: "/player", label: "Player" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  return (
    <nav
      className={cn("fixed top-0 left-0 right-0 z-50 border-b-2 border-black bg-white", isHyper && "animate-jitter")}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo - Fixed placement as emotional anchor */}
        <Link href="/" className="font-bold text-xl uppercase tracking-[0.3em]">
          MOOD
          <span
            className={cn("inline-block px-1 ml-1 border-2 border-black", getMoodColor(mood), getMoodTextColor(mood))}
          >
            SCAPE
          </span>
        </Link>

        {/* Navigation links */}
        <div className="flex gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-xs uppercase tracking-wider font-bold border-2 border-black transition-all",
                pathname === link.href
                  ? cn(getMoodColor(mood), getMoodTextColor(mood))
                  : "bg-white text-black hover:bg-muted",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
