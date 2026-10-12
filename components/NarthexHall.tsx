import Link from "next/link";

// The Narthex as a room you walk into at the end of each path (Exhibition,
// Red Room, Water Room) instead of being carried there by a film. Each path
// ends in its own copy, so visitors can scroll back out the way they came;
// the Map's Narthex is the same room on its own page.
export function NarthexHall({ variant = "scroll" }: { variant?: "scroll" | "room" }) {
  return (
    <section
      id="narthex"
      className={`narthex-hall narthex-hall--${variant}`}
      data-audio-zone="red-water-narthex"
      aria-label="Narthex"
    >
      <div className="narthex-hall__environment" aria-hidden="true">
        <img className="narthex-hall__image" src="/media/video/environment/narthex-arrival.jpg" alt="" />
        <div className="narthex-hall__veil" />
      </div>

      <div className="narthex-hall__room">
        <p className="room-label narthex-hall__label">Narthex</p>

        <nav className="narthex-hall__paths" aria-label="From the Narthex">
          <Link className="narthex-hall__link narthex-hall__link--reading" href="/reading-room">
            Reading Room
          </Link>
          <Link className="narthex-hall__link narthex-hall__link--courtyard" href="/exit">
            Courtyard
          </Link>
          <Link className="narthex-hall__link narthex-hall__link--index" href="/directory">
            Index
          </Link>
          <Link className="narthex-hall__link narthex-hall__link--archive" href="/archive">
            Archive
          </Link>
        </nav>
      </div>
    </section>
  );
}
