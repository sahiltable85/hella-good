"use client";

import Header from "@/components/header";
import HeroContent from "@/components/hero-content";
import VideoBackground from "@/components/video-background";
import PulsingCircle from "@/components/pulsing-circle";
import BackgroundVideo from "./components/BackgroundVideo";

export default function Page() {
  return (
    <main>
      <BackgroundVideo src="/video/hero.mp4" poster="/video/hero.jpg" />
      <VideoBackground>
        <Header />
        <HeroContent />
        <PulsingCircle />
      </VideoBackground>
    </main>
  );
}
