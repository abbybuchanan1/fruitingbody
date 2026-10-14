"use client";

import { useEffect, useState } from "react";

// Arriving at the end of a path from the Narthex (?return=1), a quiet line
// appears at the top for a few seconds: the visitor learns they have come in
// backwards, and can glide up to the start to see the work in order.
export function EndArrivalCue({ room }: { room: string }) {
  const [state, setState] = useState<"hidden" | "shown" | "gone">("hidden");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("return") !== "1") return;
    const show = window.setTimeout(() => setState("shown"), 900);
    const hide = window.setTimeout(() => setState("gone"), 10500);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  if (state === "hidden") return null;

  const begin = () => {
    setState("gone");
    const start = document.getElementById("room-start");
    if (!start) return;
    window.scrollTo({ top: start.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  };

  return (
    <div className={`end-arrival-cue${state === "gone" ? " is-gone" : ""}`} role="status">
      <p className="end-arrival-cue__line">You&apos;ve come in at the end of the {room}.</p>
      <button type="button" className="end-arrival-cue__begin" onClick={begin} tabIndex={state === "gone" ? -1 : 0}>
        Begin at the start <span aria-hidden="true">↑</span>
      </button>
    </div>
  );
}
