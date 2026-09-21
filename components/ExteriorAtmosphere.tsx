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
        {soundOn ? "Sound off" : "Sound"}
      </button>
    </>
  );
}
