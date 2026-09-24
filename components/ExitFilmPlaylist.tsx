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
  const [soundOn, setSoundOn] = useState(false);

  const initial = useMemo(() => {
    const order = shuffledIndexes();
    return [order[0], order[1] ?? ((order[0] + 1) % FILMS.length)] as const;
  }, []);

  const [leftIndex, setLeftIndex] = useState(initial[0]);
  const [rightIndex, setRightIndex] = useState(initial[1]);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    left.playbackRate = 0.8;
    right.playbackRate = 0.8;

    void left.play().catch(() => undefined);
    void right.play().catch(() => undefined);
  }, [leftIndex, rightIndex]);

  useEffect(() => {
    const left = leftRef.current;
    if (!left) return;
    left.muted = !soundOn;
    left.volume = soundOn ? 0.65 : 0;
  }, [soundOn, leftIndex]);

  const toggleSound = () => {
    const left = leftRef.current;
    if (!left) return;

    if (soundOn) {
      setSoundOn(false);
      return;
    }

    left.muted = false;
    left.volume = 0.65;
    void left.play().then(() => setSoundOn(true)).catch(() => {
      left.muted = true;
    });
  };

  return (
    <>
      <div className="exit-exterior__split" aria-hidden="true">
        <div className="exit-exterior__pane">
          <video
            ref={leftRef}
            className="exit-exterior__split-video"
            src={FILMS[leftIndex]}
            muted={!soundOn}
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

      <button
        type="button"
        className="ambient-sound-control ambient-sound-control--exit"
        onClick={toggleSound}
        aria-pressed={soundOn}
      >
        <span className="ambient-sound-control__icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" focusable="false">
            <path d="M3.5 8h3l3.8-3.2v10.4L6.5 12h-3z" />
            <path d="M13 7.2c1.05.75 1.7 1.7 1.7 2.8s-.65 2.05-1.7 2.8" />
            <path d="M15.2 5.2c1.55 1.3 2.5 2.9 2.5 4.8s-.95 3.5-2.5 4.8" />
          </svg>
        </span>
        <span>{soundOn ? "Sound off" : "Sound"}</span>
      </button>
    </>
  );
}
