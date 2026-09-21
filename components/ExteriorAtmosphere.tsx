"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_CROSSFADE_MS = 900;
const AUDIO_CROSSFADE_MS = 850;

export function ExteriorAtmosphere() {
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const audioARef = useRef<HTMLAudioElement | null>(null);
  const audioBRef = useRef<HTMLAudioElement | null>(null);

  const [activeVideo, setActiveVideo] = useState<0 | 1>(0);
  const [activeAudio, setActiveAudio] = useState<0 | 1>(0);
  const [soundOn, setSoundOn] = useState(false);

  const activeVideoRef = useRef<0 | 1>(0);
  const activeAudioRef = useRef<0 | 1>(0);
  const switchingVideoRef = useRef(false);
  const switchingAudioRef = useRef(false);
  const soundOnRef = useRef(false);

  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;
    const videos = [a, b] as const;

    const start = () => {
      a.currentTime = 0;
      void a.play().catch(() => undefined);
    };

    const handleTime = () => {
      const currentIndex = activeVideoRef.current;
      const current = videos[currentIndex];
      if (
        switchingVideoRef.current ||
        !Number.isFinite(current.duration) ||
        current.duration - current.currentTime > VIDEO_CROSSFADE_MS / 1000
      ) return;

      switchingVideoRef.current = true;
      const nextIndex = currentIndex === 0 ? 1 : 0;
      const next = videos[nextIndex];
      next.currentTime = 0;

      void next.play().then(() => {
        activeVideoRef.current = nextIndex;
        setActiveVideo(nextIndex);
        window.setTimeout(() => {
          current.pause();
          current.currentTime = 0;
          switchingVideoRef.current = false;
        }, VIDEO_CROSSFADE_MS + 100);
      }).catch(() => {
        current.currentTime = 0;
        void current.play().catch(() => undefined);
        switchingVideoRef.current = false;
      });
    };

    a.addEventListener("loadedmetadata", start, { once: true });
    a.addEventListener("timeupdate", handleTime);
    b.addEventListener("timeupdate", handleTime);
    if (a.readyState >= 1) start();

    return () => {
      a.removeEventListener("loadedmetadata", start);
      a.removeEventListener("timeupdate", handleTime);
      b.removeEventListener("timeupdate", handleTime);
    };
  }, []);

  useEffect(() => {
    const a = audioARef.current;
    const b = audioBRef.current;
    if (!a || !b) return;
    const audios = [a, b] as const;

    a.volume = 0.42;
    b.volume = 0;

    const handleTime = () => {
      if (!soundOnRef.current) return;
      const currentIndex = activeAudioRef.current;
      const current = audios[currentIndex];

      if (
        switchingAudioRef.current ||
        !Number.isFinite(current.duration) ||
        current.duration - current.currentTime > AUDIO_CROSSFADE_MS / 1000
      ) return;

      switchingAudioRef.current = true;
      const nextIndex = currentIndex === 0 ? 1 : 0;
      const next = audios[nextIndex];
      next.currentTime = 0;
      next.volume = 0;

      void next.play().then(() => {
        const started = performance.now();
        activeAudioRef.current = nextIndex;
        setActiveAudio(nextIndex);

        const fade = (now: number) => {
          const amount = Math.min(1, (now - started) / AUDIO_CROSSFADE_MS);
          current.volume = 0.42 * (1 - amount);
          next.volume = 0.42 * amount;

          if (amount < 1) {
            requestAnimationFrame(fade);
            return;
          }

          current.pause();
          current.currentTime = 0;
          current.volume = 0;
          switchingAudioRef.current = false;
        };

        requestAnimationFrame(fade);
      }).catch(() => {
        current.currentTime = 0;
        void current.play().catch(() => undefined);
        switchingAudioRef.current = false;
      });
    };

    a.addEventListener("timeupdate", handleTime);
    b.addEventListener("timeupdate", handleTime);

    return () => {
      a.removeEventListener("timeupdate", handleTime);
      b.removeEventListener("timeupdate", handleTime);
    };
  }, []);

  const toggleSound = () => {
    const audios = [audioARef.current, audioBRef.current] as const;

    if (soundOn) {
      audios.forEach((audio) => audio?.pause());
      soundOnRef.current = false;
      setSoundOn(false);
      return;
    }

    const current = audios[activeAudioRef.current];
    if (!current) return;

    current.volume = 0.42;
    void current.play().then(() => {
      soundOnRef.current = true;
      setSoundOn(true);
    }).catch(() => undefined);
  };

  return (
    <>
      <div className="museum-exterior__projection-stack" aria-hidden="true">
        <video
          ref={videoARef}
          className={`museum-exterior__projection${activeVideo === 0 ? " is-active" : ""}`}
          src="/media/atmosphere/exterior-mushrooms.mp4"
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={videoBRef}
          className={`museum-exterior__projection${activeVideo === 1 ? " is-active" : ""}`}
          src="/media/atmosphere/exterior-mushrooms.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>

      <audio ref={audioARef} src="/media/atmosphere/exterior-ambient.m4a" preload="auto" />
      <audio ref={audioBRef} src="/media/atmosphere/exterior-ambient.m4a" preload="auto" />

      <button
        type="button"
        className="ambient-sound-control ambient-sound-control--exterior"
        onClick={toggleSound}
        aria-pressed={soundOn}
      >
        {soundOn ? "Sound off" : "Sound"}
      </button>
    </>
  );
}
