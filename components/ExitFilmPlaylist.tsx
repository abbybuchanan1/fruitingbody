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

function nextDifferent(current: number, queue: number[]) {
  const next = queue.find((index) => index !== current);
  return next ?? ((current + 1) % FILMS.length);
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

    left.playbackRate = 0.72;
    right.playbackRate = 0.68;

    const startAtDifferentMoments = (video: HTMLVideoElement, fraction: number) => {
      if (!Number.isFinite(video.duration) || video.duration < 12) return;
      video.currentTime = Math.min(video.duration - 2, Math.max(1, video.duration * fraction));
    };

    const onLeftMeta = () => startAtDifferentMoments(left, 0.12 + Math.random() * 0.22);
    const onRightMeta = () => startAtDifferentMoments(right, 0.42 + Math.random() * 0.18);

    left.addEventListener("loadedmetadata", onLeftMeta, { once: true });
    right.addEventListener("loadedmetadata", onRightMeta, { once: true });

    void left.play().catch(() => undefined);
    void right.play().catch(() => undefined);

    return () => {
      left.removeEventListener("loadedmetadata", onLeftMeta);
      right.removeEventListener("loadedmetadata", onRightMeta);
    };
  }, [leftIndex, rightIndex]);

  const advanceLeft = () => {
    const queue = shuffledIndexes().filter((index) => index !== rightIndex);
    setLeftIndex((current) => nextDifferent(current, queue));
  };

  const advanceRight = () => {
    const queue = shuffledIndexes().filter((index) => index !== leftIndex);
    setRightIndex((current) => nextDifferent(current, queue));
  };

  useEffect(() => {
    const left = leftRef.current;
    if (!left) return;
    left.muted = !soundOn;
    left.volume = soundOn ? 0.68 : 0;
  }, [soundOn, leftIndex]);

  const toggleSound = () => {
    const left = leftRef.current;
    if (!left) return;

    if (soundOn) {
      setSoundOn(false);
      return;
    }

    left.muted = false;
    left.volume = 0.68;
    void left.play().then(() => setSoundOn(true)).catch(() => {
      left.muted = true;
    });
  };

  return (
    <>
      <div className="exit-exterior__split" aria-hidden="true">
        <div className="exit-exterior__pane exit-exterior__pane--left">
          <video
            ref={leftRef}
            className="exit-exterior__split-video"
            src={FILMS[leftIndex]}
            muted={!soundOn}
            playsInline
            autoPlay
            preload="auto"
            onEnded={advanceLeft}
          />
        </div>

        <div className="exit-exterior__pane exit-exterior__pane--right">
          <video
            ref={rightRef}
            className="exit-exterior__split-video"
            src={FILMS[rightIndex]}
            muted
            playsInline
            autoPlay
            preload="auto"
            onEnded={advanceRight}
          />
        </div>
      </div>

      <button
        type="button"
        className="ambient-sound-control ambient-sound-control--exit"
        onClick={toggleSound}
        aria-pressed={soundOn}
      >
        {soundOn ? "Sound off" : "Sound"}
      </button>
    </>
  );
}
