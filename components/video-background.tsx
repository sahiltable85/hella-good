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
    const handleLoadedData = () => setIsLoaded(true)

    const d = desktopRef.current
    const m = mobileRef.current

    d?.addEventListener("loadeddata", handleLoadedData)
    m?.addEventListener("loadeddata", handleLoadedData)

    return () => {
      d?.removeEventListener("loadeddata", handleLoadedData)
      m?.removeEventListener("loadeddata", handleLoadedData)
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
        preload="metadata"
      >
        <source src="https://tcubnxddig2ns7zi.public.blob.vercel-storage.com/Hella_Hero_Video.mp4" type="video/mp4" />
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
        preload="metadata"
      >
        <source
          src="https://tcubnxddig2ns7zi.public.blob.vercel-storage.com/Hella_Hero_Video_Vertical.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient fallback while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      )}

      {children}
    </div>
  )
}
