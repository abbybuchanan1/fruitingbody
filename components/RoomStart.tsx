"use client";

import { useLayoutEffect } from "react";

// Marks where a side room begins, below the Narthex at the top of its page,
// and places the visitor on arrival (unless a hash or ?jump names a target):
//  - arriving through a Narthex door (?at=threshold): at the threshold, the
//    shadowed passage between the Narthex and the room, so it is clear that
//    something has happened and the room lies just below;
//  - arriving any other way (the Map, the Index, a link): at the room's title
//    card, if it has one, otherwise at the start of the room.
// Next.js scrolls a new page to its top after it renders, so the placement is
// repeated for a moment after arrival, and stops as soon as the visitor
// scrolls or touches the page.
export function RoomStart({
  title,
  threshold = "room-start",
  titleOffset = 0.14,
  lead = 0,
}: {
  /** id of the room's title card. */
  title?: string;
  /** id of the element that begins the threshold. */
  threshold?: string;
  /** Where the title card sits on arrival, as a fraction of the screen from the top. */
  titleOffset?: number;
  /** How much of what lies above the start to keep in view, as a fraction of
      the screen (the paths keep the Vestibule's reflected floor in view). */
  lead?: number;
}) {
  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (window.location.hash || params.get("jump")) return;

    const atThreshold = params.get("at") === "threshold";
    const targetId = atThreshold ? threshold : title ?? "room-start";
    const offset = atThreshold ? 0 : title ? titleOffset : lead;

    let stopped = false;
    const stop = () => {
      stopped = true;
    };
    const html = document.documentElement;
    const place = () => {
      if (stopped) return;
      const el = document.getElementById(targetId) ?? document.getElementById("room-start");
      if (!el) return;
      const previous = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * offset;
      window.scrollTo(0, Math.max(0, y));
      html.style.scrollBehavior = previous;
    };

    place();
    const raf = window.requestAnimationFrame(place);
    const timers = [40, 160, 420, 800].map((delay) => window.setTimeout(place, delay));
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    events.forEach((name) => window.addEventListener(name, stop, { passive: true }));

    return () => {
      stopped = true;
      window.cancelAnimationFrame(raf);
      timers.forEach((timer) => window.clearTimeout(timer));
      events.forEach((name) => window.removeEventListener(name, stop));
    };
  }, [title, threshold, titleOffset, lead]);

  return <span id="room-start" className="room-start" data-lead={lead} aria-hidden="true" />;
}
