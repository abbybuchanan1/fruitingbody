"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Either side of the votive lamps, the Cloisters show through the Grotto's
// walls: their film flickers faintly at the edges of the screen, each side at
// a different point in it. A click or tap (never a hover) steps through.
export function GrottoCloisters() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // The glimpses play only while the passage is on screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const videos = Array.from(root.querySelectorAll("video"));
    const observer = new IntersectionObserver(
      ([entry]) => {
        videos.forEach((video) => {
          if (entry.isIntersecting) void video.play().catch(() => undefined);
          else video.pause();
        });
      },
      { rootMargin: "20% 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grotto-cloisters" ref={rootRef}>
      {(["left", "right"] as const).map((side) => (
        <Link
          key={side}
          className={`grotto-cloisters__passage grotto-cloisters__passage--${side}`}
          href={`/cloisters?from=grotto-${side}`}
        >
          <span className="grotto-cloisters__glimpse" aria-hidden="true">
            <video
              src={`/media/films/cloister-glimpse.mp4#t=${side === "left" ? 6 : 41}`}
              muted
              playsInline
              loop
              preload="none"
            />
          </span>
          <span className="grotto-cloisters__label">Cloisters</span>
        </Link>
      ))}
    </div>
  );
}
