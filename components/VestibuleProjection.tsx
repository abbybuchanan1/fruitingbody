"use client";

import { useEffect, useRef } from "react";

function keepPlaying(video: HTMLVideoElement | null) {
  if (!video) return;
  video.muted = true;
  video.controls = false;
  video.loop = true;
  void video.play().catch(() => undefined);
}

export function VestibuleProjection() {
  const leftRef = useRef<HTMLVideoElement | null>(null);
  const rightRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    const start = () => {
      keepPlaying(left);
      keepPlaying(right);
    };

    const offsetRight = () => {
      if (Number.isFinite(right.duration) && right.duration > 4) {
        right.currentTime = right.duration * 0.42;
      }
      keepPlaying(right);
    };

    const restartLeft = () => {
      left.currentTime = 0;
      keepPlaying(left);
    };

    const restartRight = () => {
      right.currentTime = 0;
      keepPlaying(right);
    };

    left.addEventListener("ended", restartLeft);
    right.addEventListener("ended", restartRight);
    right.addEventListener("loadedmetadata", offsetRight, { once: true });

    start();

    return () => {
      left.removeEventListener("ended", restartLeft);
      right.removeEventListener("ended", restartRight);
      right.removeEventListener("loadedmetadata", offsetRight);
    };
  }, []);

  return (
    <div className="vestibule__projection-field" aria-hidden="true">
      <div className="vestibule__projection vestibule__projection--left">
        <video
          ref={leftRef}
          className="vestibule__projection-video"
          src="/media/atmosphere/exterior-mushrooms.mp4"
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

      <div className="vestibule__projection vestibule__projection--right">
        <video
          ref={rightRef}
          className="vestibule__projection-video"
          src="/media/atmosphere/exterior-mushrooms.mp4"
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
    </div>
  );
}
