"use client";

import { useEffect, useState } from "react";

// In the rooms, a work can be opened on its own and closed again — no
// previous/next, so the installation is never turned into a slideshow.
// Relative is left out on purpose: its pairs are meant to be seen together.
// A Miscarriage is left out too: its frames are near full-bleed already and
// the votive light is part of the work.
const WORK_SELECTOR = [
  ".art-sequence .artwork-image",
  ".current-ember-work",
  ".membrane-plane",
].join(", ");

type Open = {
  src: string;
  alt: string;
  title?: string;
  medium?: string;
  dark: boolean;
  /** Phase only: the six frames, stepped through in order. */
  sequence?: string[];
  index?: number;
};

// Phase hangs as one grid (2 rows of 3). Clicking a face opens that frame;
// the arrows then move through the six in the order they are read.
const PHASE_FRAMES = Array.from({ length: 6 }, (_, i) => `/art/phase/phase-frame-0${i + 1}.jpg`);

export function RoomImageViewer() {
  const [open, setOpen] = useState<Open | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const target = event.target as HTMLElement | null;
      const work = target?.closest<HTMLElement>(WORK_SELECTOR);
      if (!work || work.closest("a, button, .relative-pair, .catalog-grid")) return;
      const img = work.querySelector("img");
      if (!img) return;
      const caption = work.querySelector(".artwork-image__caption, .miscarriage-votive__title");
      const medium = work.querySelector(".artwork-image__medium")?.textContent ?? undefined;
      const title = caption
        ? (caption.firstChild?.textContent ?? caption.textContent ?? "").trim() || undefined
        : undefined;
      if (img.src.includes("/art/phase/phase-grid")) {
        const rect = img.getBoundingClientRect();
        const col = Math.min(2, Math.max(0, Math.floor(((event.clientX - rect.left) / rect.width) * 3)));
        const row = (event.clientY - rect.top) / rect.height < 0.5 ? 0 : 1;
        const index = row * 3 + col;
        setOpen({
          src: PHASE_FRAMES[index],
          alt: `Phase, frame ${index + 1} of 6.`,
          title: "Phase",
          medium: `${index + 1} / 6`,
          dark: true,
          sequence: PHASE_FRAMES,
          index,
        });
        return;
      }
      setOpen({
        src: img.currentSrc || img.src,
        alt: img.alt,
        title,
        medium,
        dark: Boolean(work.closest(".miscarriage-votive, .grotto-section")),
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  function step(delta: number) {
    setOpen((current) => {
      if (!current?.sequence || current.index === undefined) return current;
      const n = current.sequence.length;
      const index = (current.index + delta + n) % n;
      return {
        ...current,
        index,
        src: current.sequence[index],
        alt: `Phase, frame ${index + 1} of ${n}.`,
        medium: `${index + 1} / ${n}`,
      };
    });
  }

  if (!open) return null;

  return (
    <div
      className={`room-viewer${open.dark ? " room-viewer--dark" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={open.title ?? open.alt}
      onClick={(event) => {
        if (event.target === event.currentTarget) setOpen(null);
      }}
    >
      <button className="room-viewer__close" type="button" onClick={() => setOpen(null)} aria-label="Close">
        ×
      </button>
      {open.sequence ? (
        <>
          <button className="room-viewer__step room-viewer__step--prev" type="button" onClick={() => step(-1)} aria-label="Previous frame">
            ‹
          </button>
          <button className="room-viewer__step room-viewer__step--next" type="button" onClick={() => step(1)} aria-label="Next frame">
            ›
          </button>
        </>
      ) : null}
      <figure className="room-viewer__figure" onClick={() => (open.sequence ? step(1) : setOpen(null))}>
        <img src={open.src} alt={open.alt} />
        {open.title ? (
          <figcaption className="room-viewer__caption">
            {open.title}
            {open.medium ? <span>{open.medium}</span> : null}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}
