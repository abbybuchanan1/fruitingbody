"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mapRooms, museumCollections, type MuseumRoomId } from "@/lib/museum";

const supplementalCollections: Partial<Record<MuseumRoomId, string[]>> = {
  current: ["Maria Burns Her Wedding Dress"],
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
          {currentLocation ? (
            <div className="museum-map__current-surface" data-room={currentLocation} aria-hidden="true" />
          ) : null}
          {hoveredRoom && hoveredRoom !== currentLocation ? (
            <div className="museum-map__hover-surface" data-room={hoveredRoom} aria-hidden="true" />
          ) : null}

          <svg className="museum-map__drawing" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
            <g className="museum-map__drawing-primary">
              <path d="M292 30 H708 V118 H292 Z" />
              <path d="M292 118 C246 118 218 149 218 192 V564 C218 608 245 630 292 630" />
              <path d="M708 118 C754 118 782 149 782 192 V564 C782 608 755 630 708 630" />
              <path d="M292 630 H708" />
              <path d="M126 190 H218 V564 H126 Z" />
              <path d="M782 190 H874 V564 H782 Z" />
              <path d="M397 136 H603 V184 H397 Z" />
              <path d="M414 204 H586 V538 H414 Z" />
              <path d="M414 354 H586" />
              <path d="M397 556 H603 V604 H397 Z" />
              <path d="M365 220 H344 V522 H365" />
              <path d="M635 220 H656 V522 H635" />
              <path d="M292 630 H708 V680 H292 Z" />
              <path d="M454 630 C466 612 534 612 546 630" />
              <rect x="718" y="621" width="176" height="46" rx="2" />
              <rect x="807" y="246" width="64" height="86" rx="11" />
              <path d="M310 53 Q310 43 322 43 H420 Q432 43 432 53 V98 H310 Z" />
              <path d="M570 53 Q570 43 582 43 H626 Q638 43 638 53 V98 H570 Z" />
              <path d="M650 53 Q650 43 662 43 H706 Q718 43 718 53 V98 H650 Z" />
            </g>
          </svg>

          {mapRooms.map((room) => {
            const isCurrent = room.id === currentLocation;
            const collections = roomCollections(room.id);

            if (room.id === "cloisters") {
              const passageEvents = {
                onMouseEnter: () => setHoveredRoom(room.id),
                onMouseLeave: () => setHoveredRoom(undefined),
                onFocus: () => setHoveredRoom(room.id),
                onBlur: () => setHoveredRoom(undefined),
              };

              return (
                <div
                  key={room.id}
                  className="museum-map__cloisters-group"
                  data-room={room.id}
                  data-current={isCurrent ? "true" : "false"}
                >
                  <Link
                    href={room.href}
                    className="museum-map__cloister-passage museum-map__cloister-passage--left"
                    aria-current={isCurrent ? "location" : undefined}
                    onClick={onClose}
                    {...passageEvents}
                  >
                    <span className="museum-map__cloister-label">Cloisters</span>
                  </Link>
                  <Link
                    href={room.href}
                    className="museum-map__cloister-passage museum-map__cloister-passage--right"
                    aria-current={isCurrent ? "location" : undefined}
                    onClick={onClose}
                    {...passageEvents}
                  >
                    <span className="museum-map__cloister-label">Cloisters</span>
                  </Link>
                </div>
              );
            }

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
                    {collections.map((title) => (
                      <span className="museum-map__collection" key={title}>{title}</span>
                    ))}
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
