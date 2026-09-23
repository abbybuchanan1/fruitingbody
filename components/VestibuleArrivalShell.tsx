"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const ARRIVAL_MS = 2400;
const HANDOFF_LEAD_MS = 220;

export function VestibuleArrivalShell({
  arriving,
  children,
}: {
  arriving: boolean;
  children: ReactNode;
}) {
  const handoffTimer = useRef<number | null>(null);
  const completeTimer = useRef<number | null>(null);
  const [handoff, setHandoff] = useState(!arriving);
  const [complete, setComplete] = useState(!arriving);

  useEffect(() => {
    if (!arriving) {
      setHandoff(true);
      setComplete(true);
      return;
    }

    setHandoff(false);
    setComplete(false);

    handoffTimer.current = window.setTimeout(
      () => setHandoff(true),
      ARRIVAL_MS - HANDOFF_LEAD_MS,
    );

    completeTimer.current = window.setTimeout(
      () => setComplete(true),
      ARRIVAL_MS,
    );

    return () => {
      if (handoffTimer.current) window.clearTimeout(handoffTimer.current);
      if (completeTimer.current) window.clearTimeout(completeTimer.current);
    };
  }, [arriving]);

  return (
    <main
      className={`vestibule${arriving ? " is-arriving" : ""}${handoff ? " is-handing-off" : ""}${complete ? " is-arrived" : ""}`}
    >
      {children}

      {arriving && !complete ? (
        <div className="vestibule-arrival" aria-hidden="true">
          <div className="vestibule-arrival__image" />
        </div>
      ) : null}
    </main>
  );
}
