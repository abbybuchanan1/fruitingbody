import { NarthexHall } from "@/components/NarthexHall";
import { NarthexThreshold } from "@/components/NarthexThreshold";
import Link from "next/link";
import { poems } from "@/lib/poems";

export default function ReadingRoomPage() {
  return (
    <main id="room-top" className="reading-room-page" data-museum-location="reading-room">
      <div className="reading-room-page__image" aria-hidden="true" />
      <div className="reading-room-page__veil" aria-hidden="true" />

      <NarthexThreshold />
      <section className="reading-room-page__content">
        <header className="reading-room-title-card">
          <p className="reading-room-title-card__room">Reading Room</p>
          <h1>Poems</h1>
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
                {poem.year && !poem.title.includes(poem.year) ? <p>{poem.year}</p> : null}
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


      </section>
      <NarthexHall from="reading" />
    </main>
  );
}
