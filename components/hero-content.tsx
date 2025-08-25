"use client"

import { useState } from "react"
import { VideoUpload } from "./video-upload"

export default function HeroContent() {
  const [showUpload, setShowUpload] = useState(false)

  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10">🍔 Premium Burger Experience</span>
        </div>

        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
          <span className="font-medium italic instrument">Hella</span> Good
          <br />
          <span className="font-light tracking-tight text-white">Burgers</span>
        </h1>

        <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
          Crafted with premium ingredients and bold flavors. Every bite delivers an unforgettable experience that's
          hella good. Fresh, juicy, and made to perfection.
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          <button className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
            Order Now
          </button>
        </div>

        {showUpload && (
          <div className="mt-6 p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
            <h3 className="text-white text-sm font-medium mb-3">Upload Your Hero Video</h3>
            <VideoUpload
              onVideoUploaded={(url) => {
                console.log("[v0] Video uploaded to:", url)
                // You can add logic here to update the video background
                setShowUpload(false)
              }}
            />
          </div>
        )}
      </div>
    </main>
  )
}
