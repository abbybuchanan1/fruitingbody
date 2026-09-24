"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const FILMS = [
  "/media/video/exterior/exit-01.mp4",
  "/media/video/exterior/exit-02.mp4",
  "/media/video/exterior/exit-03.mp4",
  "/media/video/exterior/exit-04.mp4",
  "/media/video/exterior/exit-05.mp4",
];

function shuffledIndexes() {
  const values = FILMS.map((_, index) => index);
  for (let i = values.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
}

function nextDifferent(current: number, avoid: number) {
  const order = shuffledIndexes().filter((index) => index !== avoid && index !== current);
  return order[0] ?? ((current + 1) % FILMS.length);
}

export function ExitFilmPlaylist() {
  const leftRef = useRef<HTMLVideoElement | null>(null);
  const rightRef = useRef<HTMLVideoElement | null>(null);
  const initial = useMemo(() => {
    const order = shuffledIndexes();
    return [order[0], order[1] ?? ((order[0] + 1) % FILMS.length)] as const;
  }, []);

  const [leftIndex, setLeftIndex] = useState(initial[0]);
  const [rightIndex, setRightIndex] = useState(initial[1]);


  return (
    <>
      <div className="exit-exterior__split" aria-hidden="true">
        <div className="exit-exterior__pane">
          <video
            ref={leftRef}
            className="exit-exterior__split-video"
            src={FILMS[leftIndex]}
            muted
            playsInline
            autoPlay
            preload="auto"
            onEnded={() => setLeftIndex((current) => nextDifferent(current, rightIndex))}
          />
        </div>

        <div className="exit-exterior__pane">
          <video
            ref={rightRef}
            className="exit-exterior__split-video"
            src={FILMS[rightIndex]}
            muted
            playsInline
            autoPlay
            preload="auto"
            onEnded={() => setRightIndex((current) => nextDifferent(current, leftIndex))}
          />
        </div>
      </div>

    </>
  );
}
