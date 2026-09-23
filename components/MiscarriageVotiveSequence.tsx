"use client";

import { useEffect, useRef, useState } from "react";
import type { Artwork } from "@/lib/artworks";

function VotiveWork({ work, index }: { work: Artwork; index: number }) {
  const figureRef = useRef<HTMLElement | null>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure || lit) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLit(true);
        observer.disconnect();
      },
      {
        threshold: 0.28,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(figure);
    return () => observer.disconnect();
  }, [lit]);

  return (
    <figure
      ref={figureRef}
      className={`miscarriage-votive miscarriage-votive--${index + 1}${lit ? " is-lit" : ""}`}
    >
      <div className="miscarriage-votive__light" aria-hidden="true" />
      <img src={work.src} alt={work.alt} loading="lazy" decoding="async" />
      {work.title ? (
        <figcaption className="miscarriage-votive__title">{work.title}</figcaption>
      ) : null}
    </figure>
  );
}

export function MiscarriageVotiveSequence({
  artworks,
}: {
  artworks: Artwork[];
}) {
  return (
    <div className="miscarriage-votive-sequence" aria-label="A Miscarriage artworks">
      {artworks.map((work, index) => (
        <VotiveWork work={work} index={index} key={work.src} />
      ))}
    </div>
  );
}
