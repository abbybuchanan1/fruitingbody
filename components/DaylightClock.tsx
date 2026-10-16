"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

// The building's light is read from the visitor's clock when they arrive
// (the script in app/layout.tsx). It is read again only as they walk into
// another room, never while they are in one: if the hour has turned on a long
// visit, the next room is in the new light, but nothing shifts in front of
// them. A ?light= preview holds for the whole visit.
// The clock itself lives in the script in app/layout.tsx (so the first paint
// is already in the right light); it is shared here as window.__fbDaylight.
function daylightNow(): string {
  const read = (window as unknown as { __fbDaylight?: () => string }).__fbDaylight;
  return read ? read() : "morning";
}

export function DaylightClock() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let preview: string | null = null;
    try {
      preview = window.sessionStorage.getItem("daylight-preview");
    } catch {
      preview = null;
    }
    const next = preview ?? daylightNow();
    const html = document.documentElement;
    if (html.getAttribute("data-daylight") !== next) html.setAttribute("data-daylight", next);
  }, [pathname]);

  return null;
}
