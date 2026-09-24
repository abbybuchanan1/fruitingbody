"use client";

import { useEffect, useRef, useState } from "react";

const CROSSFADE_SECONDS = 0.8;

export function CloistersFilm() {
  const firstRef = useRef<HTMLVideoElement | null>(null);
  const secondRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [active, setActive] = useState<0 | 1>(0);
  const [soundOn, setSoundOn] = useState(false);
  const activeRef = useRef<0 | 1>(0);
  const switchingRef = useRef(false);

  useEffect(() => {
    const first = firstRef.current;
    const second = secondRef.current;
    if (!first || !second) return;

    const videos = [first, second] as const;

    const start = () => {
      const duration = first.duration;
      if (!Number.isFinite(duration) || duration < 12) return;

      first.currentTime = Math.random() * Math.max(1, duration - 10);
      second.currentTime = 0;
      void first.play().catch(() => undefined);
    };

    const handleTime = () => {
      const current = videos[activeRef.current];
      if (
        switchingRef.current ||
        !Number.isFinite(current.duration) ||
        current.duration - current.currentTime > CROSSFADE_SECONDS
      ) return;

      switchingRef.current = true;
      const nextIndex = activeRef.current === 0 ? 1 : 0;
      const next = videos[nextIndex];
      next.currentTime = 0;
      void next.play().then(() => {
        activeRef.current = nextIndex;
        setActive(nextIndex);
        window.setTimeout(() => {
          current.pause();
          current.currentTime = 0;
          switchingRef.current = false;
        }, CROSSFADE_SECONDS * 1000 + 80);
      }).catch(() => {
        current.currentTime = 0;
        void current.play().catch(() => undefined);
        switchingRef.current = false;
      });
    };

    first.addEventListener("loadedmetadata", start, { once: true });
    first.addEventListener("timeupdate", handleTime);
    second.addEventListener("timeupdate", handleTime);

    if (first.readyState >= 1) start();

    return () => {
      first.removeEventListener("loadedmetadata", start);
      first.removeEventListener("timeupdate", handleTime);
      second.removeEventListener("timeupdate", handleTime);
    };
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundOn) {
      audio.pause();
      setSoundOn(false);
      return;
    }

    audio.volume = 0.48;
    void audio.play().then(() => setSoundOn(true)).catch(() => undefined);
  };

  return (
    <>
      <div className="cloisters-film__video-stack" aria-hidden="true">
        <video
          ref={firstRef}
          className={`cloisters-film__video${active === 0 ? " is-active" : ""}`}
          src="/media/films/cloister-film-1.mp4"
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={secondRef}
          className={`cloisters-film__video${active === 1 ? " is-active" : ""}`}
          src="/media/films/cloister-film-1.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>

      <audio
        ref={audioRef}
        src="/media/atmosphere/cloisters-ambient.m4a"
        loop
        preload="auto"
      />

      <button
        type="button"
        className="ambient-sound-control ambient-sound-control--cloisters"
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
