import Link from "next/link";
import { notFound } from "next/navigation";
import { getPoem, poems } from "@/lib/poems";

export function generateStaticParams() {
  return poems.map((poem) => ({ slug: poem.slug }));
}

export default async function PoemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const poem = getPoem(slug);
  if (!poem) notFound();

  return (
    <main className="poem-page" data-museum-location="reading-room">
      <div className="poem-page__environment" aria-hidden="true" />

      <section className="poem-page__content">
        <article className="poem-page__card">
          <Link
            href="/reading-room"
            className="poem-page__close"
            aria-label="Close poem and return to Reading Room"
          >
            ×
          </Link>
          <header className="poem-page__header">
            <p>Reading Room</p>
            <h1>{poem.title}</h1>
            {poem.year ? <span>{poem.year}</span> : null}
          </header>

          <div className="poem-page__poem">
            {poem.body.split("\n").map((line, index) =>
              line === "" ? (
                <span className="poem-page__stanza-break" key={index} aria-hidden="true" />
              ) : (
                <span className="poem-page__line" key={index}>{line}</span>
              )
            )}
          </div>
        </article>

        <nav className="poem-page__nav" aria-label="Reading Room navigation">
          <Link href="/reading-room">Back to Reading Room</Link>
          <Link href="/narthex?arrived=1">Return to Narthex</Link>
        </nav>
      </section>
    </main>
  );
}
