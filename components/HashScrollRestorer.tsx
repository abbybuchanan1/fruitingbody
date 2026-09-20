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

    place();
    const timers = [40, 180, 520].map((delay) => window.setTimeout(place, delay));
    const raf = window.requestAnimationFrame(place);

    return () => {
      cancelled = true;
      html.style.scrollBehavior = previousBehavior;
      timers.forEach((timer) => window.clearTimeout(timer));
      window.cancelAnimationFrame(raf);
    };
  }, [pathname, jumpTarget, returning]);

  return null;
}
