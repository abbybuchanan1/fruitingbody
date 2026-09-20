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
        <header className="poem-page__header">
          <p>Reading Room</p>
          <h1>{poem.title}</h1>
          {poem.year ? <span>{poem.year}</span> : null}
        </header>

        <div className="poem-page__document">
          <object data={poem.pdf} type="application/pdf" aria-label={poem.title}>
            <p>
              This browser cannot display the poem inline.{" "}
              <a href={poem.pdf}>Open the poem.</a>
            </p>
          </object>
        </div>

        <nav className="poem-page__nav" aria-label="Reading Room navigation">
          <Link href="/reading-room">Back to Reading Room</Link>
          <Link href="/narthex?arrived=1">Return to Narthex</Link>
        </nav>
      </section>
    </main>
  );
}
