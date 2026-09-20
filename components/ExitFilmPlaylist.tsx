"use client";

import { useEffect, useRef, useState } from "react";

const FILMS = [
  "/media/video/exterior/exit-01.mp4",
  "/media/video/exterior/exit-02.mp4",
  "/media/video/exterior/exit-03.mp4",
  "/media/video/exterior/exit-04.mp4",
  "/media/video/exterior/exit-05.mp4",
];

const CROSSFADE_MS = 1600;
const CROSSFADE_SECONDS = CROSSFADE_MS / 1000;

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function ExitFilmPlaylist() {
  const firstRef = useRef<HTMLVideoElement | null>(null);
  const secondRef = useRef<HTMLVideoElement | null>(null);
  const orderRef = useRef<string[]>(FILMS);
  const nextIndexRef = useRef(2);
  const activeRef = useRef<0 | 1>(0);
  const switchingRef = useRef(false);
  const soundRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<0 | 1>(0);
  const [sources, setSources] = useState<[string, string]>([FILMS[0], FILMS[1]]);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const order = shuffle(FILMS);
    orderRef.current = order;
    nextIndexRef.current = 2;
    setSources([order[0], order[1]]);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const first = firstRef.current;
    const second = secondRef.current;
    if (!first || !second) return;

    const videos = [first, second] as const;
    first.volume = 1;
    second.volume = 0;

    const randomizeFirstStart = () => {
      if (!Number.isFinite(first.duration)) return;
      if (first.duration > 36) {
        const latest = Math.max(1, first.duration * 0.62);
        first.currentTime = 2 + Math.random() * Math.max(1, latest - 2);
      }
      void first.play().catch(() => undefined);
    };

    if (first.readyState >= 1) randomizeFirstStart();
    else first.addEventListener("loadedmetadata", randomizeFirstStart, { once: true });

    const advance = () => {
      if (switchingRef.current) return;
      const currentIndex = activeRef.current;
      const current = videos[currentIndex];

      if (
        !Number.isFinite(current.duration) ||
        current.duration - current.currentTime > CROSSFADE_SECONDS
      ) return;

      switchingRef.current = true;
      const nextSlot = currentIndex === 0 ? 1 : 0;
      const next = videos[nextSlot];
      next.currentTime = 0;
      next.volume = 0;
      next.muted = !soundRef.current;

      void next.play().then(() => {
        const started = performance.now();
        activeRef.current = nextSlot;
        setActive(nextSlot);

        const fade = (now: number) => {
          const amount = Math.min(1, (now - started) / CROSSFADE_MS);
          if (soundRef.current) {
            current.volume = 1 - amount;
            next.volume = amount;
          }

          if (amount < 1) {
            requestAnimationFrame(fade);
            return;
          }

          current.pause();
          current.currentTime = 0;
          current.volume = 1;

          const order = orderRef.current;
          if (nextIndexRef.current >= order.length) {
            const lastPlayed = order[order.length - 1];
            let reshuffled = shuffle(FILMS);
            if (reshuffled[0] === lastPlayed && reshuffled.length > 1) {
              [reshuffled[0], reshuffled[1]] = [reshuffled[1], reshuffled[0]];
            }
            orderRef.current = reshuffled;
            nextIndexRef.current = 0;
          }

          const upcoming = orderRef.current[nextIndexRef.current];
          nextIndexRef.current += 1;
          setSources((previous) => {
            const copy: [string, string] = [...previous] as [string, string];
            copy[currentIndex] = upcoming;
            return copy;
          });

          switchingRef.current = false;
        };

        requestAnimationFrame(fade);
      }).catch(() => {
        current.currentTime = 0;
        void current.play().catch(() => undefined);
        switchingRef.current = false;
      });
    };

    first.addEventListener("timeupdate", advance);
    second.addEventListener("timeupdate", advance);

    return () => {
      first.removeEventListener("loadedmetadata", randomizeFirstStart);
      first.removeEventListener("timeupdate", advance);
      second.removeEventListener("timeupdate", advance);
    };
  }, [ready]);

  useEffect(() => {
    soundRef.current = soundOn;
    const videos = [firstRef.current, secondRef.current];
    videos.forEach((video, index) => {
      if (!video) return;
      video.muted = !soundOn;
      video.volume = index === activeRef.current ? 1 : 0;
    });
  }, [soundOn]);

  const toggleSound = () => {
    const activeVideo = activeRef.current === 0 ? firstRef.current : secondRef.current;
    if (!activeVideo) return;

    if (soundOn) {
      setSoundOn(false);
      return;
    }

    activeVideo.muted = false;
    void activeVideo.play().then(() => setSoundOn(true)).catch(() => {
      activeVideo.muted = true;
    });
  };

  if (!ready) return null;

  return (
    <>
      <div className="exit-exterior__video-stack" aria-hidden="true">
        <video
          ref={firstRef}
          className={`exit-exterior__video${active === 0 ? " is-active" : ""}`}
          src={sources[0]}
          muted={!soundOn}
          playsInline
          preload="auto"
        />
        <video
          ref={secondRef}
          className={`exit-exterior__video${active === 1 ? " is-active" : ""}`}
          src={sources[1]}
          muted={!soundOn}
          playsInline
          preload="auto"
        />
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
