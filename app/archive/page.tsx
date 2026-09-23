import Link from "next/link";
import { ArtworkLightboxGrid } from "@/components/ArtworkLightboxGrid";
import { artistBio, artistStatement, fruitingBodyStatement, processStatement } from "@/lib/editorial";
import { museumWorks } from "@/lib/works";
import { artworkSets } from "@/lib/artworks";

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
        <TextBlock title="Bio" paragraphs={artistBio} />
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

            {work.id === "red-thread" ? (
              <section className="archive-historical-edits" aria-label="Earlier Red Thread edits">
                <header className="archive-historical-edits__intro">
                  <p className="archive-work__room">Earlier curated edits</p>
                  <p>
                    Before the current installation, this material existed as three separate bodies of work.
                    The archive preserves those earlier edits alongside the merged Red Thread installation.
                  </p>
                </header>

                <div className="archive-historical-edit">
                  <h3>Red Thread</h3>
                  <ArtworkLightboxGrid images={artworkSets.redThread.slice(0, 8)} mode="archive" />
                </div>

                <div className="archive-historical-edit">
                  <h3>It Was Shelter Before It Was a Lie</h3>
                  <ArtworkLightboxGrid images={artworkSets.shelter.slice(0, 8)} mode="archive" />
                </div>

                <div className="archive-historical-edit">
                  <h3>Unravel</h3>
                  <ArtworkLightboxGrid images={artworkSets.unravel.slice(0, 4)} mode="archive" />
                </div>
              </section>
            ) : null}

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
