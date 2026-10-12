"use client";

import type { ReactNode } from "react";

// A door back into the room this Narthex (or Vestibule) is attached to: it
// glides back to the given point in the page (the end of the room) rather
// than reloading it.
export function ScrollBackLink({
  target,
  className,
  children,
  offset = 0.78,
}: {
  target: string;
  className?: string;
  children: ReactNode;
  offset?: number;
}) {
  return (
    <a
      className={className}
      href={`#${target}`}
      onClick={(event) => {
        const el = document.getElementById(target);
        if (!el) return;
        event.preventDefault();
        const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * offset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }}
    >
      {children}
    </a>
  );
}
