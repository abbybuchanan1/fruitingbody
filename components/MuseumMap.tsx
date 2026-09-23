"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { mapRooms, museumCollections, type MuseumRoomId } from "@/lib/museum";

const supplementalCollections: Partial<Record<MuseumRoomId, string[]>> = {
  current: ["Maria Burns Her Wedding Dress"],
};

type MapBox = { x: number; y: number; w: number; h: number; z?: number };

const roomBoxes: Partial<Record<MuseumRoomId, MapBox>> = {
  "rear-gallery": { x: 397, y: 136, w: 206, h: 48 },
  grotto: { x: 414, y: 204, w: 172, h: 150 },
  garden: { x: 414, y: 354, w: 172, h: 184 },
  "front-gallery": { x: 397, y: 556, w: 206, h: 48 },
  "red-room": { x: 126, y: 190, w: 92, h: 374 },
  "water-room": { x: 782, y: 190, w: 92, h: 374 },
  "film-room": { x: 812, y: 250, w: 52, h: 78, z: 10 },
  current: { x: 742, y: 612, w: 203, h: 64, z: 9 },
  vestibule: { x: 292, y: 630, w: 416, h: 50 },
  exterior: { x: 410, y: 680, w: 180, h: 20 },
  "exit-exterior": { x: 410, y: 4, w: 180, h: 20, z: 11 },
  narthex: { x: 292, y: 30, w: 416, h: 88, z: 4 },
  "reading-room": { x: 310, y: 43, w: 122, h: 55, z: 10 },
  index: { x: 552, y: 43, w: 68, h: 55, z: 10 },
  archive: { x: 630, y: 43, w: 68, h: 55, z: 10 },
};

function roomCollections(roomId: MuseumRoomId) {
  return [
    ...museumCollections
      .filter((collection) => collection.room === roomId)
      .map((collection) => collection.title),
    ...(supplementalCollections[roomId] ?? []),
  ];
}

function boxStyle(box?: MapBox): CSSProperties | undefined {
  if (!box) return undefined;
  return {
    "--map-left": `${box.x / 10}%`,
    "--map-top": `${(box.y / 700) * 100}%`,
    "--map-width": `${box.w / 10}%`,
    "--map-height": `${(box.h / 700) * 100}%`,
    "--map-z": box.z ?? 6,
  } as CSSProperties;
}

function highlightShape(room: MuseumRoomId, key: string): ReactNode {
  if (room === "cloisters") {
    return (
      <g key={key}>
        <rect x="344" y="220" width="21" height="302" rx="2" />
        <rect x="635" y="220" width="21" height="302" rx="2" />
      </g>
    );
  }

  if (room === "reading-room") {
    return <path key={key} d="M310 53 Q310 43 322 43 H420 Q432 43 432 53 V98 H310 Z" />;
  }
  if (room === "index") {
    return <path key={key} d="M552 53 Q552 43 564 43 H608 Q620 43 620 53 V98 H552 Z" />;
  }
  if (room === "archive") {
    return <path key={key} d="M630 53 Q630 43 642 43 H686 Q698 43 698 53 V98 H630 Z" />;
  }

  const box = roomBoxes[room];
  if (!box) return null;

  const rx =
    room === "film-room" ? 8 :
    room === "current" ? 2 :
    room === "narthex" ? 0 :
    2;

  return (
    <rect
      key={key}
      x={box.x}
      y={box.y}
      width={box.w}
      height={box.h}
      rx={rx}
    />
  );
}

function roomTitle(roomId: MuseumRoomId, title: string) {
  if (roomId === "film-room") {
    return (
      <span className="museum-map__room-name museum-map__room-name--stacked">
        <span>Film</span>
        <span>Room</span>
      </span>
    );
  }
  return <span className="museum-map__room-name">{title}</span>;
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
          <svg className="museum-map__drawing" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
            {currentLocation ? (
              <g className="museum-map__svg-highlight museum-map__svg-highlight--current">
                {highlightShape(currentLocation, `current-${currentLocation}`)}
              </g>
            ) : null}

            {hoveredRoom && hoveredRoom !== currentLocation ? (
              <g className="museum-map__svg-highlight museum-map__svg-highlight--hover">
                {highlightShape(hoveredRoom, `hover-${hoveredRoom}`)}
              </g>
            ) : null}

            <g className="museum-map__drawing-primary">
              <rect x="410" y="4" width="180" height="20" rx="2" />
              <path d="M500 24 V30" />
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
              <rect x="410" y="680" width="180" height="20" rx="2" />

              <path d="M708 644 H742" />
              <rect x="742" y="612" width="203" height="64" rx="2" />

              <rect x="812" y="250" width="52" height="78" rx="7" />

              <path d="M310 53 Q310 43 322 43 H420 Q432 43 432 53 V98 H310 Z" />
              <path d="M552 53 Q552 43 564 43 H608 Q620 43 620 53 V98 H552 Z" />
              <path d="M630 53 Q630 43 642 43 H686 Q698 43 698 53 V98 H630 Z" />
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
                  className="museum-map__cloisters-group museum-map__cloisters-group--canonical"
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

            const box = roomBoxes[room.id];

            return (
              <Link
                key={room.id}
                href={room.href}
                className="museum-map__room museum-map__room--canonical"
                style={boxStyle(box)}
                data-map-box={box ? "true" : "false"}
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
                {roomTitle(room.id, room.title)}
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
