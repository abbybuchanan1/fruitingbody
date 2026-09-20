"use client";

import { useEffect, useRef, useState } from "react";

export function ExteriorAtmosphere() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    void audio.play().then(() => {
      setSoundOn(true);
    }).catch(() => {
      // Browsers commonly block audible autoplay on a first visit.
      // The quiet text control below lets the visitor opt in without
      // interfering with the landing image.
    });
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundOn) {
      audio.pause();
      setSoundOn(false);
      return;
    }

    void audio.play().then(() => setSoundOn(true)).catch(() => undefined);
  };

  return (
    <>
      <video
        className="museum-exterior__projection"
        src="/media/atmosphere/exterior-mushrooms.mp4"
        muted
        playsInline
        autoPlay
        loop
        preload="metadata"
        aria-hidden="true"
      />
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
