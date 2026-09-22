"use client";

import { useEffect, useRef, useState } from "react";

const CROSSFADE_SECONDS = 0.45;
const SAFE_END_SECONDS = 4.0;

function ProjectionLoop({
  side,
  offsetFraction = 0,
}: {
  side: "left" | "right";
  offsetFraction?: number;
}) {
  const firstRef = useRef<HTMLVideoElement | null>(null);
  const secondRef = useRef<HTMLVideoElement | null>(null);
  const activeRef = useRef<0 | 1>(0);
  const switchingRef = useRef(false);
  const [active, setActive] = useState<0 | 1>(0);

  useEffect(() => {
    const first = firstRef.current;
    const second = secondRef.current;
    if (!first || !second) return;

    const videos = [first, second] as const;

    videos.forEach((video) => {
      video.muted = true;
      video.controls = false;
      video.playbackRate = 0.28;
    });

    const cueStart = (video: HTMLVideoElement, useOffset: boolean) => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      video.currentTime = useOffset
        ? Math.min(SAFE_END_SECONDS - 1.1, Math.max(0, SAFE_END_SECONDS * offsetFraction))
        : 0;
    };

    const start = () => {
      cueStart(first, offsetFraction > 0);
      second.currentTime = 0;
      void first.play().catch(() => undefined);
    };

    const handleTime = () => {
      const currentIndex = activeRef.current;
      const current = videos[currentIndex];

      if (
        switchingRef.current ||
        !Number.isFinite(current.duration) ||
        current.duration <= 0 ||
        current.currentTime < SAFE_END_SECONDS - CROSSFADE_SECONDS
      ) return;

      switchingRef.current = true;
      const nextIndex = currentIndex === 0 ? 1 : 0;
      const next = videos[nextIndex];

      next.currentTime = 0;
      void next.play().then(() => {
        activeRef.current = nextIndex;
        setActive(nextIndex);

        window.setTimeout(() => {
          current.pause();
          current.currentTime = 0;
          switchingRef.current = false;
        }, CROSSFADE_SECONDS * 1000 + 120);
      }).catch(() => {
        current.currentTime = 0;
        void current.play().catch(() => undefined);
        switchingRef.current = false;
      });
    };

    const rescueEnded = (video: HTMLVideoElement) => {
      const index = video === first ? 0 : 1;
      if (index !== activeRef.current) return;
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    };

    const onFirstEnded = () => rescueEnded(first);
    const onSecondEnded = () => rescueEnded(second);

    first.addEventListener("loadedmetadata", start, { once: true });
    first.addEventListener("timeupdate", handleTime);
    second.addEventListener("timeupdate", handleTime);
    first.addEventListener("ended", onFirstEnded);
    second.addEventListener("ended", onSecondEnded);

    if (first.readyState >= 1) start();

    return () => {
      first.removeEventListener("loadedmetadata", start);
      first.removeEventListener("timeupdate", handleTime);
      second.removeEventListener("timeupdate", handleTime);
      first.removeEventListener("ended", onFirstEnded);
      second.removeEventListener("ended", onSecondEnded);
    };
  }, [offsetFraction]);

  return (
    <div className={`vestibule__projection vestibule__projection--${side}${side === "right" ? " is-mirrored" : ""}`}>
      <video
        ref={firstRef}
        className={`vestibule__projection-video${active === 0 ? " is-active" : ""}`}
        src="/media/atmosphere/exterior-mushrooms.mp4"
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        tabIndex={-1}
      />
      <video
        ref={secondRef}
        className={`vestibule__projection-video${active === 1 ? " is-active" : ""}`}
        src="/media/atmosphere/exterior-mushrooms.mp4"
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        tabIndex={-1}
      />
    </div>
  );
}

export function VestibuleProjection() {
  return (
    <div className="vestibule__projection-field" aria-hidden="true">
      <ProjectionLoop side="left" />
      <ProjectionLoop side="right" offsetFraction={0.06} />
    </div>
  );
}
