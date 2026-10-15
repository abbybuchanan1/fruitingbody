import Link from "next/link";
import { ScrollBackLink } from "@/components/ScrollBackLink";

// The three paths that end here, in map order (Red Room wing on the left,
// the Rear Gallery in the middle, the Water Room wing on the right).
const PATHS = [
  { key: "red", label: "Red Room", href: "/red-room?jump=membrane-end&return=1", end: "membrane-end" },
  { key: "exhibition", label: "Exhibition", href: "/exhibition?jump=threshold-end&return=1", end: "threshold-end" },
  { key: "water", label: "Water Room", href: "/water-room?jump=body-of-water-end&return=1", end: "body-of-water-end" },
] as const;

// The Narthex as a room you walk into at the end of each path (Exhibition,
// Red Room, Water Room) instead of being carried there by a film. Each path
// ends in its own copy, so visitors can scroll back out the way they came;
// the Map's Narthex is the same room on its own page.
// "from" names the side room this copy of the Narthex sits below: its label
// then scrolls back up into that room instead of reloading it.
export function NarthexHall({
  variant = "scroll",
  from,
  path,
}: {
  variant?: "scroll" | "room" | "above";
  from?: "reading" | "courtyard" | "archive";
  /** The path this copy ends: its door scrolls back up into it. */
  path?: "red" | "exhibition" | "water";
}) {
  const back = "#room-start";
  return (
    <section
      id={variant === "above" ? "narthex-above" : "narthex"}
      className={`narthex-hall narthex-hall--${variant}`}
      data-audio-zone="red-water-narthex"
      aria-label="Narthex"
    >
      <div className="narthex-hall__environment" aria-hidden="true">
        <img className="narthex-hall__image" src="/media/video/environment/narthex-arrival.jpg" alt="" />
        {/* The stained-glass light alone, lifted from the same photograph, on
            two slow, unrelated rhythms: the floor stays still while the light
            on it brightens, softens and shifts, as when clouds pass. */}
        <img className="narthex-hall__light narthex-hall__light--a" src="/media/video/environment/narthex-light.png" alt="" />
        <img className="narthex-hall__light narthex-hall__light--b" src="/media/video/environment/narthex-light.png" alt="" />
        <div className="narthex-hall__veil" />
      </div>

      <div className="narthex-hall__room">
        <p className="room-label narthex-hall__label">Narthex</p>

        {/* Back: the doors to the three paths, high on the floor. */}
        <nav className="narthex-hall__back" aria-label="Back into the exhibition rooms">
          {PATHS.map((p) =>
            p.key === path ? (
              <ScrollBackLink
                key={p.key}
                target={p.end}
                className={`narthex-hall__link narthex-hall__link--back narthex-hall__link--${p.key}`}
              >
                {p.label}
              </ScrollBackLink>
            ) : (
              <Link
                key={p.key}
                href={p.href}
                className={`narthex-hall__link narthex-hall__link--back narthex-hall__link--${p.key}`}
              >
                {p.label}
              </Link>
            ),
          )}
        </nav>

        <nav className="narthex-hall__paths" aria-label="From the Narthex">
          <Link className="narthex-hall__link narthex-hall__link--reading" href={from === "reading" ? back : "/reading-room?at=threshold"}>
            Reading Room
          </Link>
          <Link className="narthex-hall__link narthex-hall__link--courtyard" href={from === "courtyard" ? back : "/exit?at=threshold"}>
            Courtyard
          </Link>
          {/* Archive: a side room, labelled more quietly than the two doors.
              (Index lives in the top row on every page.) */}
          <Link className="narthex-hall__link narthex-hall__link--archive narthex-hall__link--quiet" href={from === "archive" ? back : "/archive?at=threshold"}>
            Archive
          </Link>
        </nav>
      </div>
    </section>
  );
}
