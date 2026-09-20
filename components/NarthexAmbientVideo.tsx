"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function NarthexAmbientVideo() {
  const searchParams = useSearchParams();
  const arrived = searchParams.get("arrived") === "1";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [settled, setSettled] = useState(arrived);

  useEffect(() => {
    if (arrived) return;
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 1;
    void video.play().catch(() => setSettled(true));
  }, [arrived]);

  return (
    <div className={`narthex-room__environment-stack${settled ? " is-settled" : ""}`} aria-hidden="true">
      <img
        className="narthex-room__environment-still"
        src="/media/video/environment/narthex-arrival.jpg"
        alt=""
      />
      {!arrived ? (
        <video
          ref={videoRef}
          className="narthex-room__environment"
          src="/media/video/environment/narthex.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
          onEnded={() => setSettled(true)}
          onError={() => setSettled(true)}
        />
      ) : null}
    </div>
  );
}
