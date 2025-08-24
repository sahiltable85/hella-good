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
      // Hold on the last frame (seek to just before duration end)
      if (Number.isFinite(v.duration) && v.duration > 0) {
        try {
          v.currentTime = Math.max(0, v.duration - 0.01);
        } catch {}
      }
    };

    const tryPlay = async () => {
      try {
        await v.play(); // autoplay (muted) should work
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
      v.volume = 1.0;
      await v.play();
      setNeedsUnmute(false);
    } catch {}
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black" aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        loop={false}
        poster={poster}
        crossOrigin="anonymous"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {needsUnmute && (
        <button
          onPointerDown={enableSound}
          onClick={enableSound}
          className="absolute inset-0 flex items-end md:items-center justify-center p-6 md:p-0 bg-black/20"
          aria-label="Enable sound"
          style={{ cursor: "pointer" }}
        >
          <span className="select-none rounded-full backdrop-blur-sm bg-white/80 px-4 py-2 text-sm font-medium text-black shadow">
            Tap for sound
          </span>
        </button>
      )}

      <style jsx>{`
        :global(video::-webkit-media-controls) { display: none !important; opacity: 0 !important; }
      `}</style>
    </div>
  );
}
