"use client";

import Link from "next/link";

export function WaterRoomJunction() {
  const goToNarthex = () => {
    document.getElementById("narthex")?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <section className="water-room-junction" aria-label="Water Room passages">
      <p className="water-room-junction__eyebrow">Passages</p>

      <div className="water-room-junction__choices">
        <button
          type="button"
          className="water-room-junction__choice water-room-junction__choice--narthex"
          onClick={goToNarthex}
        >
          <video
            className="water-room-junction__moving-glimpse"
            src="/media/video/environment/narthex.mp4"
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
          />
          <span className="water-room-junction__choice-label">Narthex</span>
        </button>

        <Link
          className="water-room-junction__choice water-room-junction__choice--films"
          href="/film-room?from=water-room"
        >
          <video
            className="water-room-junction__moving-glimpse water-room-junction__moving-glimpse--film"
            src="/media/films/body-of-water-film.mp4"
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
          />
          <span className="water-room-junction__choice-label">Films</span>
        </Link>
      </div>
    </section>
  );
}
