"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Arriving at the end of a path from the Narthex (?return=1), a quiet line
// appears at the top for a few seconds: the visitor learns they have come in
// backwards, and can glide up to the start to see the work in order.
export function EndArrivalCue({ room }: { room: string }) {
  const [state, setState] = useState<"hidden" | "shown" | "gone" | "removed">("hidden");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Not when stepping back out of the Film Room: that visitor knows where they are.
    if (params.get("return") !== "1" || params.get("from") === "film-room") return;
    const show = window.setTimeout(() => setState((s) => (s === "hidden" ? "shown" : s)), 900);
    const hide = window.setTimeout(() => setState("gone"), 6500);
    // Gone as soon as the visitor reaches the start, however they get there.
    // Only watched once the arrival has settled: while the page is being
    // placed at the end of the room it passes the start on the way, and that
    // must not count.
    const onScroll = () => {
      const start = document.getElementById("room-start");
      if (start && start.getBoundingClientRect().top > -window.innerHeight * 0.6) setState("gone");
    };
    const arm = window.setTimeout(() => {
      window.addEventListener("scroll", onScroll, { passive: true });
    }, 1400);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
      window.clearTimeout(arm);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Once faded, it leaves the page entirely.
  useEffect(() => {
    if (state !== "gone") return;
    const t = window.setTimeout(() => setState("removed"), 1000);
    return () => window.clearTimeout(t);
  }, [state]);

  if (state === "hidden" || state === "removed") return null;

  const begin = () => {
    setState("gone");
    const start = document.getElementById("room-start");
    if (!start) return;
    const lead = Number(start.dataset.lead ?? 0) * window.innerHeight;
    window.scrollTo({ top: start.getBoundingClientRect().top + window.scrollY - lead, behavior: "smooth" });
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
