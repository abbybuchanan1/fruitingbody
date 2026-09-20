import Link from "next/link";

const poems = [
  {
    title: "For C",
    year: "2026",
    href: "/media/reading-room/For%20C%20(1).pdf",
  },
  {
    title: "May, 2024",
    year: "2024",
    href: "/media/reading-room/May%2C%202024%20(v%202).pdf",
  },
  {
    title: "That It Was",
    year: "2026",
    href: "/media/reading-room/That%20it%20was.pdf",
  },
  {
    title: "Two Days",
    year: "",
    href: "/media/reading-room/Two%20Days.pdf",
  },
  {
    title: "Evidence",
    year: "",
    href: "/media/reading-room/Evidence%20(1).pdf",
  },
  {
    title: "Rosary",
    year: "",
    href: "/media/reading-room/Rosary.pdf",
  },
];

export default function ReadingRoomPage() {
  return (
    <main className="reading-room-page" data-museum-location="reading-room">
      <div className="reading-room-page__image" aria-hidden="true" />
      <div className="reading-room-page__veil" aria-hidden="true" />

      <section className="reading-room-page__content">
        <header className="reading-room-page__header">
          <p>Reading Room</p>
          <h1>Poems</h1>
          <p>
            A parallel language for embodiment, relation, grief, time, and return.
          </p>
        </header>

        <div className="reading-room-shelf">
          {poems.map((poem) => (
            <article className="reading-room-poem" key={poem.title}>
              <div>
                <h2>{poem.title}</h2>
                {poem.year ? <p>{poem.year}</p> : null}
              </div>
              <a href={poem.href} target="_blank" rel="noreferrer">
                Read poem
              </a>
            </article>
          ))}
        </div>

        <Link className="utility-return-to-narthex reading-room-page__return" href="/narthex?arrived=1">
          Return to Narthex
        </Link>
      </section>
    </main>
  );
}
