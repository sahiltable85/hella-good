"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface VideoBackgroundProps {
  children: React.ReactNode
  videoSrc?: string
}

export default function VideoBackground({
  children,
  videoSrc = "https://tcubnxddig2ns7zi.public.blob.vercel-storage.com/Hella_Hero_Video.mp4",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => setIsLoaded(true)
      video.addEventListener("loadeddata", handleLoadedData)

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted
        controls
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        {/* Fallback gradient background if video fails to load */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-yellow-500" />
      </video>

      {/* Loading fallback with burger brand colors */}
      {!isLoaded && <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />}

      {children}
    </div>
  )
}
