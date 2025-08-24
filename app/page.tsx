"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import VideoBackground from "@/components/video-background"
import PulsingCircle from "@/components/pulsing-circle"
import BackgroundVideo from "@/components/BackgroundVideo";

export default function Home() {
  return (
    <>
      <BackgroundVideo
        src="https://tcubnxddig2ns7zi.public.blob.vercel-storage.com/Hella_Hero_Video.mp4"
        // poster="/hero-fallback.jpg" // optional
      />
      <main className="relative z-10 min-h-screen flex items-center justify-center">
        {/* Foreground content */}
        <div className="text-white text-center px-6">
          <h1 className="text-5xl font-bold tracking-tight">Hella Good</h1>
          <p className="mt-4 text-lg/7 opacity-90">Burgers with serious attitude.</p>
        </div>
      </main>
    </>
  );
}

export default function ShaderShowcase() {
  return (
    <VideoBackground>
      <Header />
      <HeroContent />
      <PulsingCircle />
    </VideoBackground>
  )
}
