"use client";

import { useEffect, useRef, useState } from "react";

const CROSSFADE_SECONDS = 0.8;

export function CloistersFilm() {
  const firstRef = useRef<HTMLVideoElement | null>(null);
  const secondRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState<0 | 1>(0);
  const activeRef = useRef<0 | 1>(0);
  const switchingRef = useRef(false);

  useEffect(() => {
    const first = firstRef.current;
    const second = secondRef.current;
    if (!first || !second) return;

    const videos = [first, second] as const;

    const start = () => {
      const duration = first.duration;
      if (!Number.isFinite(duration) || duration < 12) return;

      // Start somewhere different on each visit, but never so near the end
      // that the visitor immediately hits a loop.
      first.currentTime = Math.random() * Math.max(1, duration - 10);
      second.currentTime = 0;
      void first.play().catch(() => undefined);
    };

    const handleTime = () => {
      const current = videos[activeRef.current];
      if (
        switchingRef.current ||
        !Number.isFinite(current.duration) ||
        current.duration - current.currentTime > CROSSFADE_SECONDS
      ) return;

      switchingRef.current = true;
      const nextIndex = activeRef.current === 0 ? 1 : 0;
      const next = videos[nextIndex];
      next.currentTime = 0;
      void next.play().then(() => {
        activeRef.current = nextIndex;
        setActive(nextIndex);
        window.setTimeout(() => {
          current.pause();
          current.currentTime = 0;
          switchingRef.current = false;
        }, CROSSFADE_SECONDS * 1000 + 80);
      }).catch(() => {
        current.currentTime = 0;
        void current.play().catch(() => undefined);
        switchingRef.current = false;
      });
    };

    first.addEventListener("loadedmetadata", start, { once: true });
    first.addEventListener("timeupdate", handleTime);
    second.addEventListener("timeupdate", handleTime);

    if (first.readyState >= 1) start();

    return () => {
      first.removeEventListener("loadedmetadata", start);
      first.removeEventListener("timeupdate", handleTime);
      second.removeEventListener("timeupdate", handleTime);
    };
  }, []);

  return (
    <div className="cloisters-film__video-stack" aria-hidden="true">
      <video
        ref={firstRef}
        className={`cloisters-film__video${active === 0 ? " is-active" : ""}`}
        src="/media/films/cloister-film-1.mp4"
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={secondRef}
        className={`cloisters-film__video${active === 1 ? " is-active" : ""}`}
        src="/media/films/cloister-film-1.mp4"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
