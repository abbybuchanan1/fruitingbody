"use client";

import { useEffect, useRef, useState } from "react";

const FIRST_DELAY_MIN = 7000;
const FIRST_DELAY_MAX = 11000;
const REPEAT_DELAY_MIN = 32000;
const REPEAT_DELAY_MAX = 52000;

function delayBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function ExteriorShadowPass() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const playPass = () => {
      video.currentTime = 0;
      setActive(true);
      void video.play().catch(() => setActive(false));
    };

    const schedule = (first = false) => {
      const min = first ? FIRST_DELAY_MIN : REPEAT_DELAY_MIN;
      const max = first ? FIRST_DELAY_MAX : REPEAT_DELAY_MAX;
      timerRef.current = window.setTimeout(playPass, delayBetween(min, max));
    };

    const finish = () => {
      setActive(false);
      schedule(false);
    };

    video.addEventListener("ended", finish);
    schedule(true);

    return () => {
      video.removeEventListener("ended", finish);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className={`museum-exterior__shadow-pass${active ? " is-active" : ""}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="museum-exterior__shadow-video"
        src="/media/atmosphere/exterior-shadow-pass.mp4"
        muted
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        tabIndex={-1}
      />
    </div>
  );
}
