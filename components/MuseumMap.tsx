"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mapRooms, museumCollections, type MuseumRoomId } from "@/lib/museum";

const supplementalCollections: Partial<Record<MuseumRoomId, string[]>> = {
  current: ["Maria Burns Her Wedding Dress"],
  "film-room": ["Body of Water — film"],
};

function roomCollections(roomId: MuseumRoomId) {
  return [
    ...museumCollections
      .filter((collection) => collection.room === roomId)
      .map((collection) => collection.title),
    ...(supplementalCollections[roomId] ?? []),
  ];
}

export function MuseumMap({
  isOpen,
  onClose,
  currentLocation,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentLocation?: MuseumRoomId;
}) {
  const [hoveredRoom, setHoveredRoom] = useState<MuseumRoomId | undefined>();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="museum-map-overlay" role="dialog" aria-label="Museum map">
      <div className="museum-map" data-current-location={currentLocation}>
        <div className="museum-map__topline">
          <p className="museum-map__label">Fruiting Body</p>
          <button type="button" className="museum-map__close" onClick={onClose}>Close</button>
        </div>

        <div className="museum-map__blueprint">
          {currentLocation ? <div className="museum-map__current-surface" data-room={currentLocation} aria-hidden="true" /> : null}
          {hoveredRoom && hoveredRoom !== currentLocation ? <div className="museum-map__hover-surface" data-room={hoveredRoom} aria-hidden="true" /> : null}
          <svg className="museum-map__drawing" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
            <g className="museum-map__drawing-primary">
              <path d="M292 42 H708 V120 H292 Z" />
              <path d="M292 120 C246 120 218 151 218 194 V574 C218 616 245 638 292 638" />
              <path d="M708 120 C754 120 782 151 782 194 V574 C782 616 755 638 708 638" />
              <path d="M292 638 H708" />
              <path d="M126 196 H218 V574 H126 Z" />
              <path d="M782 196 H874 V574 H782 Z" />
              <path d="M397 142 H603 V188 H397 Z" />
              <path d="M414 208 H586 V548 H414 Z" />
              <path d="M414 360 H586" />
              <path d="M397 566 H603 V614 H397 Z" />
              <path d="M365 224 H344 V532 H365" />
              <path d="M635 224 H656 V532 H635" />
              <path d="M292 638 H708 V686 H292 Z" />
              <path d="M454 638 C466 620 534 620 546 638" />
              <path d="M708 626 H902 V678 H708" />
              <ellipse cx="828" cy="288" rx="29" ry="51" transform="rotate(-18 828 288)" />
              {/* Narthex subspaces stay quiet: room labels do the work rather than decorative bubbles. */}
              <path d="M306 64 Q306 52 318 52 H392 Q404 52 404 64 V99 H306 Z" />
              <path d="M586 64 Q586 52 598 52 H632 Q644 52 644 64 V99 H586 Z" />
              <path d="M650 64 Q650 52 662 52 H682 Q694 52 694 64 V99 H650 Z" />
            </g>
          </svg>

          {mapRooms.map((room) => {
            const isCurrent = room.id === currentLocation;
            const collections = roomCollections(room.id);
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
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(undefined)}
                onFocus={() => setHoveredRoom(room.id)}
                onBlur={() => setHoveredRoom(undefined)}
              >
                <span className="museum-map__room-name">{room.title}</span>
                {collections.length ? (
                  <span className="museum-map__collections">
                    {collections.map((title) => <span className="museum-map__collection" key={title}>{title}</span>)}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
