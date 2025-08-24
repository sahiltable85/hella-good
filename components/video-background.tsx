"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface VideoBackgroundProps {
  children: React.ReactNode
}

export default function VideoBackground({ children }: VideoBackgroundProps) {
  const desktopRef = useRef<HTMLVideoElement>(null)
  const mobileRef = useRef<HTMLVideoElement>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [needsUnmute, setNeedsUnmute] = useState(true)

  useEffect(() => {
    const markLoaded = () => setIsLoaded(true)

    const d = desktopRef.current
    const m = mobileRef.current

    d?.addEventListener("canplay", markLoaded)
    m?.addEventListener("canplay", markLoaded)

    // Kick off autoplay (muted) for both – only the visible one is shown
    d?.play().catch(() => {})
    m?.play().catch(() => {})

    return () => {
      d?.removeEventListener("canplay", markLoaded)
      m?.removeEventListener("canplay", markLoaded)
    }
  }, [])

  const enableSound = async () => {
    setNeedsUnmute(false)
    const targets = [desktopRef.current, mobileRef.current].filter(Boolean) as HTMLVideoElement[]
    for (const v of targets) {
      try {
        v.muted = false
        v.volume = 0.6
        // iOS/Safari often needs play() on the same gesture that unmutes
        await v.play()
      } catch {
        // If play fails, fall back to showing native controls for the user
        v.controls = true
      }
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Desktop video */}
      <video
        ref={desktopRef}
        className={`hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted={needsUnmute}
        playsInline
        preload="auto"
      >
        <source
          src="https://tcubnxddig2ns7zi.public.blob.vercel-storage.com/Hella_Hero_Video.mp4"
          type="video/mp4"
        />
      </video>

      {/* Mobile video */}
      <video
        ref={mobileRef}
        className={`block md:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted={needsUnmute}
        playsInline
        preload="auto"
      >
        <source
          src="https://tcubnxddig2ns7zi.public.blob.vercel-storage.com/Hella_Hero_Video_Vertical.mp4"
          type="video/mp4"
        />
      </video>

      {/* Tap-to-unmute button */}
      {needsUnmute && (
        <button
          onClick={enableSound}
          className="absolute z-10 bottom-4 right-4 md:bottom-6 md:right-6 rounded-full bg-white/90 hover:bg-white text-black px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-medium shadow-lg backdrop-blur"
          aria-label="Enable sound"
        >
          Tap for sound
        </button>
      )}

      {/* Gradient fallback while loading */}
      {!isLoaded && <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />}

      {children}
    </div>
  )
}
