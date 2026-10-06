"use client";

import { useEffect, useRef } from "react";

// The film's soundtrack is mixed much louder than the museum's room tone
// (about −17 dB average against roughly −40 dB). On first play the sound
// fades in to a level closer to the rooms; after that the visitor's own
// volume control is left alone.
const TARGET_VOLUME = 0.18;
const FADE_MS = 3000;

export function FilmPlayer({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let frame = 0;
    let faded = false;

    const onPlay = () => {
      if (faded) return;
      faded = true;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        video.volume = TARGET_VOLUME;
        return;
      }

      const start = performance.now();
      video.volume = 0;

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / FADE_MS);
        video.volume = TARGET_VOLUME * t * t;
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    // If the visitor touches the volume during the fade, stop fading.
    const onVolumeChange = () => {
      if (!faded || !frame) return;
      const expectedMax = TARGET_VOLUME + 0.001;
      if (video.volume > expectedMax) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("volumechange", onVolumeChange);
    return () => {
      cancelAnimationFrame(frame);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      controls
      playsInline
      preload="metadata"
    />
  );
}
