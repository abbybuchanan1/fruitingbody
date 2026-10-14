"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Arriving at the end of a path from the Narthex (?return=1), a quiet line
// appears at the top for a few seconds: the visitor learns they have come in
// backwards, and can glide up to the start to see the work in order.
export function EndArrivalCue({ room }: { room: string }) {
  const [state, setState] = useState<"hidden" | "shown" | "gone">("hidden");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Not when stepping back out of the Film Room: that visitor knows where they are.
    if (params.get("return") !== "1" || params.get("from") === "film-room") return;
    const show = window.setTimeout(() => setState((s) => (s === "hidden" ? "shown" : s)), 900);
    const hide = window.setTimeout(() => setState("gone"), 6500);
    // Gone as soon as the visitor reaches the start, however they get there.
    const onScroll = () => {
      const start = document.getElementById("room-start");
      if (start && start.getBoundingClientRect().top > -window.innerHeight * 0.6) setState("gone");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (state === "hidden") return null;

  const begin = () => {
    setState("gone");
    const start = document.getElementById("room-start");
    if (!start) return;
    window.scrollTo({ top: start.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  };

  // Rendered at the top of the page (outside the room), so no layer of the
  // room's installation can sit over it and catch its clicks.
  return createPortal(
    <div className={`end-arrival-cue${state === "gone" ? " is-gone" : ""}`} role="status">
      <p className="end-arrival-cue__line">You&apos;ve come in at the end of the {room}.</p>
      <button type="button" className="end-arrival-cue__begin" onClick={begin} tabIndex={state === "gone" ? -1 : 0}>
        Begin at the start <span aria-hidden="true">↑</span>
      </button>
    </div>,
    document.body,
  );
}
