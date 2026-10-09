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
  "red-room": { x: 110, y: 190, w: 108, h: 374 },
  "water-room": { x: 782, y: 190, w: 108, h: 374 },
  "film-room": { x: 806, y: 270, w: 44, h: 70, z: 10 },
  current: { x: 768, y: 612, w: 203, h: 64, z: 9 },
  vestibule: { x: 292, y: 630, w: 416, h: 50 },
  exterior: { x: 410, y: 680, w: 180, h: 20 },
  "exit-exterior": { x: 410, y: 4, w: 180, h: 20, z: 11 },
  narthex: { x: 292, y: 30, w: 416, h: 88, z: 4 },
  "reading-room": { x: 310, y: 43, w: 122, h: 55, z: 10 },
  index: { x: 552, y: 43, w: 68, h: 55, z: 10 },
  archive: { x: 630, y: 43, w: 68, h: 55, z: 10 },
};

// The phone plan: the same building redrawn for a tall screen (viewBox
// 400 × 800), with rooms wide enough for their names. Red Room and Water
// Room are curved wings either side of the hall, as on desktop.
const mobileBoxes: Partial<Record<MuseumRoomId, MapBox>> = {
  "exit-exterior": { x: 140, y: 6, w: 120, h: 30, z: 11 },
  narthex: { x: 70, y: 46, w: 260, h: 104, z: 4 },
  "reading-room": { x: 78, y: 58, w: 122, h: 60, z: 10 },
  index: { x: 206, y: 58, w: 58, h: 60, z: 10 },
  archive: { x: 268, y: 58, w: 56, h: 60, z: 10 },
  "rear-gallery": { x: 130, y: 170, w: 140, h: 55 },
  grotto: { x: 140, y: 245, w: 120, h: 157 },
  garden: { x: 140, y: 402, w: 120, h: 158 },
  "front-gallery": { x: 130, y: 580, w: 140, h: 55 },
  "red-room": { x: 8, y: 200, w: 102, h: 420 },
  "water-room": { x: 290, y: 200, w: 102, h: 420 },
  "film-room": { x: 322, y: 300, w: 28, h: 80, z: 10 },
  vestibule: { x: 110, y: 660, w: 180, h: 75 },
  exterior: { x: 150, y: 740, w: 100, h: 30 },
  current: { x: 296, y: 650, w: 96, h: 85, z: 9 },
};

// Curved wings (flat side on the hall wall, widest at the middle).
const WINGS = {
  desktop: {
    red: "M218 190 Q2 377 218 564 Z",
    water: "M782 190 Q998 377 782 564 Z",
    cloisterLeft: "M372 206 Q304 371 372 536 Q360 371 372 206 Z",
    cloisterRight: "M628 206 Q696 371 628 536 Q640 371 628 206 Z",
  },
  mobile: {
    red: "M110 200 Q-94 410 110 620 Z",
    water: "M290 200 Q494 410 290 620 Z",
    cloisterLeft: "M136 250 Q96 405 136 560 Q126 405 136 250 Z",
    cloisterRight: "M264 250 Q304 405 264 560 Q274 405 264 250 Z",
  },
} as const;

function notifyAudioRoom(roomId: MuseumRoomId) {
  window.dispatchEvent(
    new CustomEvent("museum-audio-room", { detail: { roomId } }),
  );
}

// The plan is entered from the bottom and walked upward, so in these rooms the
// first work you meet is listed lowest.
const WALKED_UPWARD: MuseumRoomId[] = ["garden", "grotto", "red-room"];

function roomCollections(roomId: MuseumRoomId) {
  const sets = museumCollections
    .filter((collection) => collection.room === roomId)
    .map((collection) => ({ title: collection.title, href: collection.href }));
  if (WALKED_UPWARD.includes(roomId)) sets.reverse();
  return [
    ...sets,
    ...(supplementalCollections[roomId] ?? []).map((title) => ({ title, href: "/current" })),
  ];
}

function boxStyle(box?: MapBox, mbox?: MapBox): CSSProperties | undefined {
  if (!box) return undefined;
  const mobile = mbox
    ? {
        "--mmap-left": `${mbox.x / 4}%`,
        "--mmap-top": `${mbox.y / 8}%`,
        "--mmap-width": `${mbox.w / 4}%`,
        "--mmap-height": `${mbox.h / 8}%`,
        "--mmap-z": mbox.z ?? 6,
      }
    : {};
  return {
    ...mobile,
    "--map-left": `${box.x / 10}%`,
    "--map-top": `${(box.y / 700) * 100}%`,
    "--map-width": `${box.w / 10}%`,
    "--map-height": `${(box.h / 700) * 100}%`,
    "--map-z": box.z ?? 6,
  } as CSSProperties;
}

function highlightShape(room: MuseumRoomId, key: string, mode: "desktop" | "mobile" = "desktop"): ReactNode {
  const wings = WINGS[mode];
  if (room === "cloisters") {
    return (
      <g key={key}>
        <path d={wings.cloisterLeft} />
        <path d={wings.cloisterRight} />
      </g>
    );
  }
  if (room === "red-room") return <path key={key} d={wings.red} />;
  if (room === "water-room") return <path key={key} d={wings.water} />;

  if (mode === "desktop") {
    if (room === "reading-room") {
      return <path key={key} d="M310 53 Q310 43 322 43 H420 Q432 43 432 53 V98 H310 Z" />;
    }
    if (room === "index") {
      return <path key={key} d="M552 53 Q552 43 564 43 H608 Q620 43 620 53 V98 H552 Z" />;
    }
    if (room === "archive") {
      return <path key={key} d="M630 53 Q630 43 642 43 H686 Q698 43 698 53 V98 H630 Z" />;
    }
  }

  const box = (mode === "mobile" ? mobileBoxes : roomBoxes)[room];
  if (!box) return null;

  const rx =
    room === "film-room" ? (mode === "mobile" ? 6 : 8) :
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
          <svg className="museum-map__drawing museum-map__drawing--desktop" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
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

              <path d={WINGS.desktop.red} />
              <path d={WINGS.desktop.water} />

              <path d="M397 136 H603 V184 H397 Z" />
              <path d="M414 204 H586 V538 H414 Z" />
              <path d="M414 354 H586" />
              <path d="M397 556 H603 V604 H397 Z" />

              {/* Cloisters: slim curved wings either side of the Garden and Grotto. */}
              <path d={WINGS.desktop.cloisterLeft} />
              <path d={WINGS.desktop.cloisterRight} />

              <path d="M292 630 H708 V680 H292 Z" />
              <path d="M454 630 C466 612 534 612 546 630" />
              <rect x="410" y="680" width="180" height="20" rx="2" />

              <path d="M708 644 H768" />
              <rect x="768" y="612" width="203" height="64" rx="2" />

              <rect x="806" y="270" width="44" height="70" rx="7" />

              <path d="M310 53 Q310 43 322 43 H420 Q432 43 432 53 V98 H310 Z" />
              <path d="M552 53 Q552 43 564 43 H608 Q620 43 620 53 V98 H552 Z" />
              <path d="M630 53 Q630 43 642 43 H686 Q698 43 698 53 V98 H630 Z" />
            </g>
          </svg>

          <svg className="museum-map__drawing museum-map__drawing--mobile" viewBox="0 0 400 800" preserveAspectRatio="none" aria-hidden="true">
            {currentLocation ? (
              <g className="museum-map__svg-highlight museum-map__svg-highlight--current">
                {highlightShape(currentLocation, `m-current-${currentLocation}`, "mobile")}
              </g>
            ) : null}

            {hoveredRoom && hoveredRoom !== currentLocation ? (
              <g className="museum-map__svg-highlight museum-map__svg-highlight--hover">
                {highlightShape(hoveredRoom, `m-hover-${hoveredRoom}`, "mobile")}
              </g>
            ) : null}

            <g className="museum-map__drawing-primary">
              <rect x="140" y="6" width="120" height="30" rx="2" />
              <path d="M200 36 V46" />
              <path d="M70 46 H330 V150 H70 Z" />
              <rect x="78" y="58" width="122" height="60" rx="6" />
              <rect x="206" y="58" width="58" height="60" rx="6" />
              <rect x="268" y="58" width="56" height="60" rx="6" />

              <path d="M150 150 H250 Q290 150 290 190 V620 Q290 660 250 660 H150 Q110 660 110 620 V190 Q110 150 150 150 Z" />

              <path d={WINGS.mobile.red} />
              <path d={WINGS.mobile.water} />
              <rect x="322" y="300" width="28" height="80" rx="6" />

              <rect x="130" y="170" width="140" height="55" rx="2" />
              <path d={WINGS.mobile.cloisterLeft} />
              <path d={WINGS.mobile.cloisterRight} />
              <path d="M140 245 H260 V560 H140 Z" />
              <path d="M140 402 H260" />
              <rect x="130" y="580" width="140" height="55" rx="2" />

              <path d="M110 660 H290 V735 H110 Z" />
              <path d="M182 660 Q200 644 218 660" />
              <rect x="150" y="740" width="100" height="30" rx="2" />

              <path d="M290 697 H296" />
              <rect x="296" y="650" width="96" height="85" rx="2" />
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
                    onClick={() => { notifyAudioRoom(room.id); onClose(); }}
                    {...passageEvents}
                  >
                    <span className="museum-map__cloister-label">Cloisters</span>
                  </Link>
                  <Link
                    href={room.href}
                    className="museum-map__cloister-passage museum-map__cloister-passage--right"
                    aria-current={isCurrent ? "location" : undefined}
                    onClick={() => { notifyAudioRoom(room.id); onClose(); }}
                    {...passageEvents}
                  >
                    <span className="museum-map__cloister-label">Cloisters</span>
                  </Link>
                </div>
              );
            }

            const box = roomBoxes[room.id];

            // The room box is a container: its name links to the room, and
            // each set listed inside links straight to that set.
            return (
              <div
                key={room.id}
                className="museum-map__room museum-map__room--canonical"
                style={boxStyle(box, mobileBoxes[room.id])}
                data-map-box={box ? "true" : "false"}
                data-room={room.id}
                data-group={room.mapGroup}
                data-map-role={room.mapRole ?? "room"}
                data-parent={room.parent}
                data-current={isCurrent ? "true" : "false"}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(undefined)}
              >
                <Link
                  href={room.href}
                  className="museum-map__room-link"
                  aria-current={isCurrent ? "location" : undefined}
                  onClick={onClose}
                  onFocus={() => setHoveredRoom(room.id)}
                  onBlur={() => setHoveredRoom(undefined)}
                >
                  {roomTitle(room.id, room.title)}
                </Link>
                {collections.length ? (
                  <span className="museum-map__collections">
                    {collections.map((set) => (
                      <Link
                        className="museum-map__collection"
                        key={set.title}
                        href={set.href}
                        onClick={onClose}
                        onFocus={() => setHoveredRoom(room.id)}
                        onBlur={() => setHoveredRoom(undefined)}
                      >
                        {set.title}
                      </Link>
                    ))}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
