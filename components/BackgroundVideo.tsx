"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
};

export default function BackgroundVideo({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [needsUnmute, setNeedsUnmute] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onEnded = () => {
      if (Number.isFinite(v.duration) && v.duration > 0) {
        try {
          v.currentTime = Math.max(0, v.duration - 0.01);
        } catch {}
      }
    };

    const tryPlay = async () => {
      try {
        await v.play();
      } catch {}
    };

    v.addEventListener("ended", onEnded);
    tryPlay();
    return () => v.removeEventListener("ended", onEnded);
  }, []);

  const enableSound = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = false;
      await v.play();
      setNeedsUnmute(false);
    } catch {}
  };

  return (
    <div className="relative w-full h-dvh overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
      />
      {needsUnmute && (
        <button
          onClick={enableSound}
          className="absolute bottom-6 right-6 rounded-2xl px-4 py-2 bg-black/60 text-white"
        >
          Tap for sound
        </button>
      )}
    </div>
  );
}
