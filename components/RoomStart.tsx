"use client";

import { useLayoutEffect } from "react";

// Marks where a side room begins, below the Narthex at the top of its page.
// On arrival (with no other target) the page opens here, so the visitor can
// scroll up into the Narthex they came from, or down into the room.
export function RoomStart() {
  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (window.location.hash || params.get("jump")) return;
    const el = document.getElementById("room-start");
    if (!el) return;
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
    html.style.scrollBehavior = previous;
  }, []);

  return <span id="room-start" className="room-start" aria-hidden="true" />;
}
