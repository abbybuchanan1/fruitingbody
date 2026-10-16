import Link from "next/link";

// The end of the Water Room: on the right, the Film Room's film plays faintly
// through its open side (step in, and back out the same way); on the left,
// the Narthex's stained-glass floor already shows, and carries straight on
// into the Narthex below. Visitors can walk past the Film Room or into it.
export function WaterRoomJunction() {
  return (
    <section className="water-room-junction water-room-junction--walk" aria-label="Film Room and the way on">
      <div className="water-room-junction__floor" aria-hidden="true">
        <img src="/media/video/environment/narthex-arrival.jpg" alt="" />
      </div>

      <Link
        className="water-room-junction__film"
        href="/film-room?from=water-room"
        aria-label="Film Room"
        tabIndex={-1}
      >
        <video
          className="water-room-junction__moving-glimpse water-room-junction__moving-glimpse--film"
          src="/media/films/body-of-water-film-v2.mp4"
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
        />
      </Link>

      <Link className="water-room-junction__label" href="/film-room?from=water-room">
        Film Room
      </Link>
    </section>
  );
}
