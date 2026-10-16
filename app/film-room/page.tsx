import Link from "next/link";
import { FilmPlayer } from "@/components/FilmPlayer";

export default function FilmRoomPage() {
  return (
    <main className="film-room" data-museum-location="film-room">
      <header className="film-room__header">
        <p className="film-room__eyebrow">Films</p>
        <h1>Body of Water</h1>
        <p className="film-room__note">Moving-image work from the Water Room.</p>
        <p className="film-room__note">No spoken words. The sound is the river, recorded underwater.</p>
      </header>

      <section className="film-installation" aria-label="Body of Water film">
        <div className="film-installation__screen">
          <FilmPlayer
            className="film-installation__video"
            src="/media/films/body-of-water-film-v2.mp4"
            describedBy="body-of-water-film-description"
          />
          <p id="body-of-water-film-description" className="visually-hidden">
            A film without words. In and under the river, the artist&apos;s body moves
            with the water through haze and shifting light. The only sound is the river
            itself, recorded underwater.
          </p>
        </div>
      </section>

      <div className="film-room__return-wrap">
        <Link className="film-room__return" href="/water-room?jump=body-of-water-end&return=1&from=film-room">
          Return to Water Room
        </Link>
      </div>
    </main>
  );
}
