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
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return null;
}
