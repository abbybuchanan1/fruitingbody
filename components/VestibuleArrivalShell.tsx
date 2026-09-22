"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export function VestibuleArrivalShell({
  arriving,
  children,
}: {
  arriving: boolean;
  children: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [handoff, setHandoff] = useState(!arriving);
  const [complete, setComplete] = useState(!arriving);

  useEffect(() => {
    if (!arriving) return;
    const video = videoRef.current;
    if (!video) {
      setHandoff(true);
      setComplete(true);
      return;
    }

    video.currentTime = 0;
    video.playbackRate = 1;
    void video.play().catch(() => {
      setHandoff(true);
      setComplete(true);
    });
  }, [arriving]);

  const handleTime = () => {
    const video = videoRef.current;
    if (
      !video ||
      !Number.isFinite(video.duration) ||
      video.duration <= 0
    ) return;

    if (video.duration - video.currentTime <= 0.22) {
      setHandoff(true);
    }
  };

  const finish = () => {
    setHandoff(true);
    window.setTimeout(() => setComplete(true), 160);
  };

  return (
    <main
      className={`vestibule${arriving ? " is-arriving" : ""}${handoff ? " is-handing-off" : ""}${complete ? " is-arrived" : ""}`}
    >
      {children}

      {arriving && !complete ? (
        <div className="vestibule-arrival" aria-hidden="true">
          <video
            ref={videoRef}
            className="vestibule-arrival__video"
            src="/media/video/transitions/vestibule-arrival.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            tabIndex={-1}
            onTimeUpdate={handleTime}
            onEnded={finish}
            onError={() => {
              setHandoff(true);
              setComplete(true);
            }}
          />
        </div>
      ) : null}
    </main>
  );
}
