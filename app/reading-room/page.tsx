import Link from "next/link";
import { poems } from "@/lib/poems";

export default function ReadingRoomPage() {
  return (
    <main className="reading-room-page" data-museum-location="reading-room">
      <div className="reading-room-page__image" aria-hidden="true" />
      <div className="reading-room-page__veil" aria-hidden="true" />

      <section className="reading-room-page__content">
        <header className="reading-room-title-card">
          <p className="reading-room-title-card__room">Reading Room</p>
          <h1>Poems</h1>
          <p>
            A parallel language for embodiment, relation, grief, time, and return.
          </p>
        </header>

        <div className="reading-room-shelf">
          {poems.map((poem) => (
            <Link
              className="reading-room-poem-card"
              key={poem.slug}
              href={`/reading-room/${poem.slug}`}
            >
              <div className="reading-room-poem-card__heading">
                <h2>{poem.title}</h2>
                {poem.year ? <p>{poem.year}</p> : null}
              </div>
              {poem.preview.length ? (
                <p className="reading-room-poem-card__preview">
                  {poem.preview.map((line) => (
                    <span key={line}>{line}<br /></span>
                  ))}
                </p>
              ) : (
                <p className="reading-room-poem-card__preview">Read poem</p>
              )}
            </Link>
          ))}
        </div>

        <Link className="utility-return-to-narthex reading-room-page__return" href="/narthex?arrived=1">
          Return to Narthex
        </Link>
      </section>
    </main>
  );
}
