"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDialogFocus } from "@/lib/useDialogFocus";

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useDialogFocus(dialogRef, open !== null);

  // Keyboard: every work that opens on click can also be reached with Tab and
  // opened with Enter or Space. (Works appear as rooms load, so they are
  // marked again when the page changes or new works arrive.)
  useEffect(() => {
    const mark = () => {
      document.querySelectorAll<HTMLElement>(WORK_SELECTOR).forEach((work) => {
        if (work.dataset.viewerReady || work.closest("a, button, .relative-pair, .catalog-grid")) return;
        const img = work.querySelector("img");
        if (!img) return;
        work.dataset.viewerReady = "1";
        work.tabIndex = 0;
        work.setAttribute("role", "button");
        work.setAttribute("aria-label", `Open ${img.alt || "image"} large`);
      });
    };
    mark();
    const observer = new MutationObserver(mark);
    observer.observe(document.body, { childList: true, subtree: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const work = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-viewer-ready]");
      if (!work || event.target !== work) return;
      event.preventDefault();
      openWork(work);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", onKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function openWork(work: HTMLElement, event?: MouseEvent) {
    const img = work.querySelector("img");
    if (!img) return;
    const caption = work.querySelector(".artwork-image__caption, .miscarriage-votive__title");
    const medium = work.querySelector(".artwork-image__medium")?.textContent ?? undefined;
    const title = caption
      ? (caption.firstChild?.textContent ?? caption.textContent ?? "").trim() || undefined
      : undefined;
    if (img.src.includes("/art/phase/phase-grid")) {
      // By pointer, the face that was clicked; by keyboard, the first frame.
      let index = 0;
      if (event) {
        const rect = img.getBoundingClientRect();
        const col = Math.min(2, Math.max(0, Math.floor(((event.clientX - rect.left) / rect.width) * 3)));
        const row = (event.clientY - rect.top) / rect.height < 0.5 ? 0 : 1;
        index = row * 3 + col;
      }
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
  }

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const target = event.target as HTMLElement | null;
      const work = target?.closest<HTMLElement>(WORK_SELECTOR);
      if (!work || work.closest("a, button, .relative-pair, .catalog-grid")) return;
      const img = work.querySelector("img");
      if (!img) return;
      openWork(work, event);
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
      ref={dialogRef}
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
