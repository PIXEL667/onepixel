import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Space_Mono, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { MoodProvider } from "@/contexts/mood-context"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
})

export const metadata: Metadata = {
  title: "Mood — Anti-Design Mood Journal",
  description: "Feel over format. No identical twins. Chaos with a compass.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <MoodProvider>{children}</MoodProvider>
        <Analytics />
      </body>
    </html>
  )
}
