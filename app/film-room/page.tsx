import Link from "next/link";

export default function FilmRoomPage() {
  return (
    <main className="film-room" data-museum-location="film-room">
      <header className="film-room__header">
        <p className="film-room__eyebrow">Films</p>
        <h1>Body of Water</h1>
        <p className="film-room__note">Moving-image work from the Water Room.</p>
      </header>

      <section className="film-installation" aria-label="Body of Water film">
        <div className="film-installation__screen">
          <video
            className="film-installation__video"
            src="/media/films/body-of-water-film.mp4"
            controls
            playsInline
            preload="metadata"
          />
        </div>
      </section>

      <div className="film-room__return-wrap">
        <Link className="film-room__return" href="/water-room?jump=body-of-water-end&return=1">
          Return to Water Room
        </Link>
      </div>
    </main>
  );
}
