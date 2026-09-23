"use client";

import { useEffect, useRef } from "react";

function ShadowVideo({
  side,
  offset = 0,
}: {
  side: "left" | "right";
  offset?: number;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.controls = false;
    video.playbackRate = 0.46;

    const start = () => {
      if (Number.isFinite(video.duration) && video.duration > 0 && offset > 0) {
        video.currentTime = Math.min(video.duration - 0.25, video.duration * offset);
      }
      void video.play().catch(() => undefined);
    };

    if (video.readyState >= 1) start();
    else video.addEventListener("loadedmetadata", start, { once: true });

    return () => video.removeEventListener("loadedmetadata", start);
  }, [offset]);

  return (
    <div
      className={`museum-exterior__shadow-pass museum-exterior__shadow-pass--${side}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="museum-exterior__shadow-video"
        src="/media/atmosphere/exterior-shadow-pass.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        tabIndex={-1}
      />
    </div>
  );
}

export function ExteriorShadowPass() {
  return (
    <div className="museum-exterior__shadow-field" aria-hidden="true">
      <ShadowVideo side="left" />
      <ShadowVideo side="right" offset={0.37} />
    </div>
  );
}
