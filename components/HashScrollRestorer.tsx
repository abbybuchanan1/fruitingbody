"use client";

import { useLayoutEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function HashScrollRestorer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jumpTarget = searchParams.get("jump");
  const returning = searchParams.get("return") === "1";

  useLayoutEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    const targetId = jumpTarget || hash;
    if (!targetId) return;

    let cancelled = false;
    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const place = () => {
      if (cancelled) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      const y = target.getBoundingClientRect().top + window.scrollY;
      const offset = returning ? window.innerHeight * 0.78 : window.innerHeight * 0.06;
      window.scrollTo({ top: Math.max(0, y - offset), left: 0, behavior: "auto" });
    };

    // Placed again for a moment while the room settles (photographs and
    // fonts arriving can move the target), until the visitor scrolls or
    // touches the page themselves.
    const stop = () => {
      cancelled = true;
    };
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    events.forEach((name) => window.addEventListener(name, stop, { passive: true }));

    place();
    const timers = [40, 180, 520, 900, 1500].map((delay) => window.setTimeout(place, delay));
    const raf = window.requestAnimationFrame(place);

    return () => {
      cancelled = true;
      html.style.scrollBehavior = previousBehavior;
      timers.forEach((timer) => window.clearTimeout(timer));
      window.cancelAnimationFrame(raf);
      events.forEach((name) => window.removeEventListener(name, stop));
    };
  }, [pathname, jumpTarget, returning]);

  return null;
}
