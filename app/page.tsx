"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import VideoBackground from "@/components/video-background"
import PulsingCircle from "@/components/pulsing-circle"

export default function ShaderShowcase() {
  return (
    <VideoBackground>
      <Header />
      <HeroContent />
      <PulsingCircle />
    </VideoBackground>
  )
}
