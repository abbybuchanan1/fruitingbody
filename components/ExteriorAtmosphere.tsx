"use client";

import { useEffect, useRef, useState } from "react";

const TARGET_VOLUME = 0.42;
const CROSSFADE_SECONDS = 0.9;
const FALLBACK_DURATION_SECONDS = 4;

export function ExteriorAtmosphere() {
  const audioRefs = [
    useRef<HTMLAudioElement | null>(null),
    useRef<HTMLAudioElement | null>(null),
  ];
  const timerRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const playingRef = useRef(false);
  const [soundOn, setSoundOn] = useState(false);

  const clearLoop = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (animationRef.current !== null) {
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const stopAll = () => {
    clearLoop();
    playingRef.current = false;
    audioRefs.forEach((ref) => {
      const audio = ref.current;
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0;
    });
  };

  const fadeBetween = (
    from: HTMLAudioElement,
    to: HTMLAudioElement,
    onComplete: () => void,
  ) => {
    const startedAt = performance.now();
    const durationMs = CROSSFADE_SECONDS * 1000;

    const tick = (now: number) => {
      if (!playingRef.current) return;
      const progress = Math.min(1, (now - startedAt) / durationMs);
      from.volume = TARGET_VOLUME * (1 - progress);
      to.volume = TARGET_VOLUME * progress;

      if (progress < 1) {
        animationRef.current = window.requestAnimationFrame(tick);
      } else {
        from.pause();
        from.currentTime = 0;
        from.volume = 0;
        to.volume = TARGET_VOLUME;
        animationRef.current = null;
        onComplete();
      }
    };

    animationRef.current = window.requestAnimationFrame(tick);
  };

  const scheduleCrossfade = (currentIndex: number) => {
    if (!playingRef.current) return;

    const current = audioRefs[currentIndex].current;
    const nextIndex = currentIndex === 0 ? 1 : 0;
    const next = audioRefs[nextIndex].current;
    if (!current || !next) return;

    const sourceDuration =
      Number.isFinite(current.duration) && current.duration > CROSSFADE_SECONDS + 0.5
        ? current.duration
        : FALLBACK_DURATION_SECONDS;

    const delayMs = Math.max(
      1200,
      (sourceDuration - CROSSFADE_SECONDS) * 1000,
    );

    timerRef.current = window.setTimeout(() => {
      if (!playingRef.current) return;

      next.currentTime = 0;
      next.volume = 0;

      void next.play().then(() => {
        fadeBetween(current, next, () => scheduleCrossfade(nextIndex));
      }).catch(() => {
        stopAll();
        setSoundOn(false);
      });
    }, delayMs);
  };

  const toggleSound = () => {
    if (soundOn) {
      stopAll();
      setSoundOn(false);
      return;
    }

    const first = audioRefs[0].current;
    if (!first) return;

    clearLoop();
    playingRef.current = true;
    first.currentTime = 0;
    first.volume = TARGET_VOLUME;

    void first.play().then(() => {
      setSoundOn(true);
      scheduleCrossfade(0);
    }).catch(() => {
      playingRef.current = false;
    });
  };

  useEffect(() => () => stopAll(), []);

  return (
    <>
      <audio
        ref={audioRefs[0]}
        src="/media/atmosphere/exterior-ambient.m4a"
        preload="auto"
      />
      <audio
        ref={audioRefs[1]}
        src="/media/atmosphere/exterior-ambient.m4a"
        preload="auto"
      />

      <button
        type="button"
        className="ambient-sound-control ambient-sound-control--exterior"
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
