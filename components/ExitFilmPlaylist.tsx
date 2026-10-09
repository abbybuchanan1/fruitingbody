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

const CROSSFADE_SECONDS = 1.6;

// One pane of the Courtyard: two stacked videos. As the playing film nears
// its end, the next film starts underneath and the two crossfade.
function FilmPane({ initial, avoidRef, onChange }: {
  initial: number;
  avoidRef: { current: number };
  onChange: (index: number) => void;
}) {
  const refs = [useRef<HTMLVideoElement | null>(null), useRef<HTMLVideoElement | null>(null)];
  const [sources, setSources] = useState<[number, number]>([initial, nextDifferent(initial, avoidRef.current)]);
  const [active, setActive] = useState<0 | 1>(0);
  const switchingRef = useRef(false);

  useEffect(() => {
    const video = refs[active].current;
    if (!video) return;
    void video.play().catch(() => undefined);

    const onTime = () => {
      if (switchingRef.current || !Number.isFinite(video.duration) || video.duration <= 0) return;
      if (video.duration - video.currentTime > CROSSFADE_SECONDS) return;
      switchingRef.current = true;
      const nextSlot = (active === 0 ? 1 : 0) as 0 | 1;
      const next = refs[nextSlot].current;
      if (next) {
        next.currentTime = 0;
        void next.play().catch(() => undefined);
      }
      setActive(nextSlot);
      onChange(sources[nextSlot]);
      window.setTimeout(() => {
        // Load a fresh film into the slot that just faded out.
        setSources((current) => {
          const updated: [number, number] = [current[0], current[1]];
          updated[active] = nextDifferent(current[nextSlot], avoidRef.current);
          return updated;
        });
        switchingRef.current = false;
      }, CROSSFADE_SECONDS * 1000 + 200);
    };

    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, sources]);

  return (
    <div className="exit-exterior__pane">
      {[0, 1].map((slot) => (
        <video
          key={slot}
          ref={refs[slot]}
          className={`exit-exterior__split-video${slot === active ? " is-active" : ""}`}
          src={FILMS[sources[slot]]}
          muted
          playsInline
          autoPlay={slot === active}
          preload="auto"
        />
      ))}
    </div>
  );
}

export function ExitFilmPlaylist() {
  const initial = useMemo(() => {
    const order = shuffledIndexes();
    return [order[0], order[1] ?? ((order[0] + 1) % FILMS.length)] as const;
  }, []);

  // Each pane avoids showing the film currently playing in the other.
  const leftNow = useRef<number>(initial[0]);
  const rightNow = useRef<number>(initial[1]);

  return (
    <div className="exit-exterior__split" aria-hidden="true">
      <FilmPane initial={initial[0]} avoidRef={rightNow} onChange={(index) => { leftNow.current = index; }} />
      <FilmPane initial={initial[1]} avoidRef={leftNow} onChange={(index) => { rightNow.current = index; }} />
    </div>
  );
}
