"use client";

import { useEffect } from "react";

// Opens a <details> section when the page is reached with its id in the URL
// (e.g. /archive#contact from the Narthex), then brings it into view.
export function OpenDetailsFromHash() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const element = document.getElementById(id);
      if (element instanceof HTMLDetailsElement) {
        element.open = true;
        window.requestAnimationFrame(() =>
          element.scrollIntoView({ block: "start", behavior: "smooth" }),
        );
      }
    };
    // Clicking the same in-page link twice fires no hashchange, so links are
    // also handled directly.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (link && link.getAttribute("href") === window.location.hash) open();
    };
    open();
    window.addEventListener("hashchange", open);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", open);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
