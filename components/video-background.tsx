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

  useEffect(() => {
    const markLoaded = () => setIsLoaded(true)

    desktopRef.current?.addEventListener("canplay", markLoaded)
    mobileRef.current?.addEventListener("canplay", markLoaded)

    desktopRef.current?.play().catch(() => {})
    mobileRef.current?.play().catch(() => {})

    return () => {
      desktopRef.current?.removeEventListener("canplay", markLoaded)
      mobileRef.current?.removeEventListener("canplay", markLoaded)
    }
  }, [])

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
        muted
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
        muted
        playsInline
        preload="auto"
      >
        <source
          src="https://tcubnxddig2ns7zi.public.blob.vercel-storage.com/Hella_Hero_Video_Vertical.mp4"
          type="video/mp4"
        />
      </video>

      {/* Fallback gradient */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      )}

      {children}
    </div>
  )
}
