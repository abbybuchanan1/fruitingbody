"use client";

import { useEffect, useRef, useState } from "react";

const CROSSFADE_SECONDS = 0.8;
const AUDIO_CROSSFADE_SECONDS = 1.0;
const AUDIO_VOLUME = 0.48;
const AUDIO_FALLBACK_DURATION = 10;

export function CloistersFilm() {
  const firstRef = useRef<HTMLVideoElement | null>(null);
  const secondRef = useRef<HTMLVideoElement | null>(null);
  const audioRefs = [
    useRef<HTMLAudioElement | null>(null),
    useRef<HTMLAudioElement | null>(null),
  ];
  const audioTimerRef = useRef<number | null>(null);
  const audioAnimationRef = useRef<number | null>(null);
  const audioPlayingRef = useRef(false);
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

  const clearAudioLoop = () => {
    if (audioTimerRef.current !== null) {
      window.clearTimeout(audioTimerRef.current);
      audioTimerRef.current = null;
    }
    if (audioAnimationRef.current !== null) {
      window.cancelAnimationFrame(audioAnimationRef.current);
      audioAnimationRef.current = null;
    }
  };

  const stopAudio = () => {
    clearAudioLoop();
    audioPlayingRef.current = false;
    audioRefs.forEach((ref) => {
      const audio = ref.current;
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0;
    });
  };

  const fadeAudio = (
    from: HTMLAudioElement,
    to: HTMLAudioElement,
    onComplete: () => void,
  ) => {
    const startedAt = performance.now();
    const durationMs = AUDIO_CROSSFADE_SECONDS * 1000;

    const tick = (now: number) => {
      if (!audioPlayingRef.current) return;
      const progress = Math.min(1, (now - startedAt) / durationMs);
      from.volume = AUDIO_VOLUME * (1 - progress);
      to.volume = AUDIO_VOLUME * progress;

      if (progress < 1) {
        audioAnimationRef.current = window.requestAnimationFrame(tick);
      } else {
        from.pause();
        from.currentTime = 0;
        from.volume = 0;
        to.volume = AUDIO_VOLUME;
        audioAnimationRef.current = null;
        onComplete();
      }
    };

    audioAnimationRef.current = window.requestAnimationFrame(tick);
  };

  const scheduleAudioCrossfade = (currentIndex: number) => {
    if (!audioPlayingRef.current) return;

    const current = audioRefs[currentIndex].current;
    const nextIndex = currentIndex === 0 ? 1 : 0;
    const next = audioRefs[nextIndex].current;
    if (!current || !next) return;

    const duration =
      Number.isFinite(current.duration) && current.duration > AUDIO_CROSSFADE_SECONDS + 0.5
        ? current.duration
        : AUDIO_FALLBACK_DURATION;

    const delayMs = Math.max(
      1200,
      (duration - AUDIO_CROSSFADE_SECONDS) * 1000,
    );

    audioTimerRef.current = window.setTimeout(() => {
      if (!audioPlayingRef.current) return;

      next.currentTime = 0;
      next.volume = 0;
      void next.play().then(() => {
        fadeAudio(current, next, () => scheduleAudioCrossfade(nextIndex));
      }).catch(() => {
        stopAudio();
        setSoundOn(false);
      });
    }, delayMs);
  };

  const toggleSound = () => {
    if (soundOn) {
      stopAudio();
      setSoundOn(false);
      return;
    }

    const first = audioRefs[0].current;
    if (!first) return;

    clearAudioLoop();
    audioPlayingRef.current = true;
    first.currentTime = 0;
    first.volume = AUDIO_VOLUME;

    void first.play().then(() => {
      setSoundOn(true);
      scheduleAudioCrossfade(0);
    }).catch(() => {
      audioPlayingRef.current = false;
    });
  };

  useEffect(() => () => stopAudio(), []);

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
        ref={audioRefs[0]}
        src="/media/atmosphere/cloisters-ambient.m4a"
        preload="auto"
      />
      <audio
        ref={audioRefs[1]}
        src="/media/atmosphere/cloisters-ambient.m4a"
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
