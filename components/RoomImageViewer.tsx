"use client";

import { useEffect, useState } from "react";

// In the rooms, a work can be opened on its own and closed again — no
// previous/next, so the installation is never turned into a slideshow.
// Relative is left out on purpose: its pairs are meant to be seen together.
const WORK_SELECTOR = [
  ".art-sequence .artwork-image",
  ".miscarriage-votive",
  ".current-ember-work",
  ".membrane-plane",
].join(", ");

type Open = { src: string; alt: string; title?: string; medium?: string; dark: boolean };

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
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

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
      <figure className="room-viewer__figure" onClick={() => setOpen(null)}>
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
