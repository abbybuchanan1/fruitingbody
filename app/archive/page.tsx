import Link from "next/link";
import { ArtworkLightboxGrid } from "@/components/ArtworkLightboxGrid";
import { artistStatement, fruitingBodyStatement, processStatement } from "@/lib/editorial";
import { museumWorks } from "@/lib/works";

function TextBlock({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="archive-text-block">
      <h2>{title}</h2>
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </section>
  );
}

export default function ArchivePage() {
  return (
    <main className="archive-page">
      <header className="utility-header">
        <p className="utility-header__eyebrow">Research Room</p>
        <h1>Archive</h1>
        <p>
          Expanded edits, project histories, and optional reflections from the practice.
        </p>
      </header>

      <section className="archive-practice">
        <TextBlock title="Artist Statement" paragraphs={artistStatement} />
        <TextBlock title="Fruiting Body" paragraphs={fruitingBodyStatement} />
        <TextBlock title="Process" paragraphs={processStatement} />
      </section>

      <section className="archive-works" aria-label="Expanded archive">
        {museumWorks.map((work) => (
          <article id={`archive-${work.id}`} className="archive-work" data-work-id={work.id} key={work.id}>
            <header className="archive-work__header">
              <p className="archive-work__room">{work.room}</p>
              <h2>{work.title}</h2>
              <p className="archive-work__meta">{work.year} · {work.medium}</p>
              <p>{work.statement}</p>
              {work.archiveNote ? <p className="archive-work__history">{work.archiveNote}</p> : null}
              <Link href={work.href}>View installed work</Link>
            </header>

            <ArtworkLightboxGrid images={work.archive} mode="archive" />

            {work.reflection?.length ? (
              <details className="archive-reflection">
                <summary>Artist Reflection</summary>
                <div className="archive-reflection__body">
                  {work.reflection.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </details>
            ) : null}
          </article>
        ))}
      </section>

      <Link className="utility-return-to-narthex" href="/narthex?arrived=1">
        Return to Narthex
      </Link>
    </main>
  );
}
