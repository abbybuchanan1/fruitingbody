"use client";

import Link from "next/link";
import { useEffect } from "react";
import { mapRooms, type MuseumRoomId } from "@/lib/museum";

export function MuseumMap({
  isOpen,
  onClose,
  currentLocation,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentLocation?: MuseumRoomId;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="museum-map-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Museum map"
    >
      <button
        className="museum-map-overlay__backdrop"
        type="button"
        aria-label="Close museum map"
        onClick={onClose}
      />

      <div className="museum-map" data-current-location={currentLocation}>
        <div className="museum-map__topline">
          <p className="museum-map__label">Fruiting Body</p>

          <button
            type="button"
            className="museum-map__close"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="museum-map__blueprint">
          {mapRooms.map((room) => {
            const isCurrent = room.id === currentLocation;

            return (
              <Link
                key={room.id}
                href={room.href}
                className="museum-map__room"
                data-room={room.id}
                data-group={room.mapGroup}
                data-map-role={room.mapRole ?? "room"}
                data-parent={room.parent}
                data-current={isCurrent ? "true" : "false"}
                aria-current={isCurrent ? "location" : undefined}
                onClick={onClose}
              >
                {room.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
