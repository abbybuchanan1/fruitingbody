"use client";

import { useEffect, useRef, useState } from "react";
import { showInterpretiveQuestions } from "@/lib/editorial";

export function QuestionPrompt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -14% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // When questions are switched off, the element keeps its place on the wall
  // (so the scroll rhythm of each room is unchanged) but is invisible and
  // hidden from screen readers.
  if (!showInterpretiveQuestions) {
    return (
      <p
        className="room-opening__question question-prompt"
        aria-hidden="true"
        style={{ visibility: "hidden" }}
      >
        {children}
      </p>
    );
  }

  return (
    <p
      ref={ref}
      className={`room-opening__question question-prompt${visible ? " is-visible" : ""}`}
    >
      {children}
    </p>
  );
}
