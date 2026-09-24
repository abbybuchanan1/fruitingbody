"use client";

import { useRef, useState } from "react";

export function ExteriorAtmosphere() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundOn) {
      audio.pause();
      setSoundOn(false);
      return;
    }

    audio.volume = 0.42;
    void audio.play().then(() => setSoundOn(true)).catch(() => undefined);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/media/atmosphere/exterior-ambient.m4a"
        loop
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
