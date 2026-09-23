"use client";

import { useEffect, useRef, useState } from "react";
import type { Artwork } from "@/lib/artworks";

function EmberWork({ work, index }: { work: Artwork; index: number }) {
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
      { threshold: 0.24, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(figure);
    return () => observer.disconnect();
  }, [lit]);

  return (
    <figure
      ref={figureRef}
      className={`current-ember-work current-ember-work--${index + 1}${lit ? " is-lit" : ""}`}
    >
      <div className="current-ember-work__glow" aria-hidden="true" />
      <img src={work.src} alt={work.alt} loading="lazy" decoding="async" />
    </figure>
  );
}

export function CurrentEmberSequence({ artworks }: { artworks: Artwork[] }) {
  return (
    <section className="current-ember-sequence" aria-label="Maria Burns Her Wedding Dress artworks">
      {artworks.map((work, index) => (
        <EmberWork work={work} index={index} key={work.src} />
      ))}
    </section>
  );
}
