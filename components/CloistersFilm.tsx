"use client";

import { useEffect, useRef, useState } from "react";

const CROSSFADE_SECONDS = 0.8;

// The Cloisters film (Abby's footage, 2026). Arriving through one of the
// Grotto's side passages, the film opens at that passage's own point, so the
// two sides show different light; otherwise (from the Map) it opens at 20s.
// While the film loads, a dimmed still of that exact frame holds the room, so
// there is never a black screen; the film fades in over it once it plays.
const POSTER_AT = [6, 20, 41];
export function CloistersFilm({ startAt }: { startAt?: number }) {
  const firstRef = useRef<HTMLVideoElement | null>(null);
  const secondRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState<0 | 1>(0);
  const activeRef = useRef<0 | 1>(0);
  const switchingRef = useRef(false);
  const [ready, setReady] = useState(false);
  const opening = startAt ?? 20;
  const poster = `/media/films/cloister-poster-${POSTER_AT.includes(opening) ? opening : 20}.jpg`;

  useEffect(() => {
    const first = firstRef.current;
    const second = secondRef.current;
    if (!first || !second) return;

    const videos = [first, second] as const;

    const start = () => {
      const duration = first.duration;
      if (!Number.isFinite(duration) || duration < 12) return;

      first.currentTime = Math.min(opening, Math.max(0, duration - 10));
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
  }, [opening]);

  useEffect(() => {
    const first = firstRef.current;
    if (!first) return;
    const onPlaying = () => setReady(true);
    first.addEventListener("playing", onPlaying, { once: true });
    return () => first.removeEventListener("playing", onPlaying);
  }, []);

  return (
    <div className={`cloisters-film__video-stack${ready ? " is-ready" : ""}`} aria-hidden="true">
      <img className="cloisters-film__poster" src={poster} alt="" />
      <video
        ref={firstRef}
        className={`cloisters-film__video${active === 0 ? " is-active" : ""}`}
        src="/media/films/cloister-film-2.mp4"
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={secondRef}
        className={`cloisters-film__video${active === 1 ? " is-active" : ""}`}
        src="/media/films/cloister-film-2.mp4"
        muted
        playsInline
        preload="metadata"
      />
    </div>
  );
}
