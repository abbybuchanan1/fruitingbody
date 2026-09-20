"use client";

import { useEffect, useRef } from "react";

export function CloistersFilm() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const enterAtRandomPoint = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 2) return;
      const safeDuration = Math.max(1, video.duration - 1);
      video.currentTime = Math.random() * safeDuration;
      void video.play().catch(() => undefined);
    };

    video.addEventListener("loadedmetadata", enterAtRandomPoint, { once: true });
    return () => video.removeEventListener("loadedmetadata", enterAtRandomPoint);
  }, []);

  return (
    <video
      ref={videoRef}
      className="cloisters-film__video"
      src="/media/films/cloister-film-1.mp4"
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
    />
  );
}
