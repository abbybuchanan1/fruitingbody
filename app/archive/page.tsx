import Link from "next/link";
import { ArtworkLightboxGrid } from "@/components/ArtworkLightboxGrid";
import { artistBio, artistStatement, fruitingBodyStatement, processStatement } from "@/lib/editorial";
import { museumWorks } from "@/lib/works";
import type { Artwork } from "@/lib/artworks";

function PracticeDetails({
  id,
  title,
  paragraphs,
}: {
  id: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <details className="archive-practice-detail" id={id}>
      <summary>{title}</summary>
      <div className="archive-practice-detail__body">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </details>
  );
}

function numberedImages(folder: string, prefix: string, count: number, title: string): Artwork[] {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      src: `/art/archive/${folder}/${prefix}-${number}.jpg`,
      alt: `${title}, original edit, image ${index + 1} of ${count}.`,
    };
  });
}

const redThreadDevelopment = [
  {
    title: "Red Thread",
    statement:
      "The work investigates inheritance as an ongoing relationship rather than a problem to be solved, exploring the tensions between entanglement, belonging, and becoming.",
    question:
      "How do we become ourselves when we can never fully separate from the whole?",
    images: numberedImages("red-thread-original", "red-thread-original", 8, "Red Thread"),
  },
  {
    title: "It Was Shelter Before It Was a Lie",
    statement:
      "The work investigates the relationship between identity and protection, asking how forms of shelter evolve, persist, and eventually require renegotiation.",
    question:
      "How do we recognize when a form of protection has become a form of confinement?",
    images: numberedImages("shelter-original", "shelter-original", 8, "It Was Shelter Before It Was a Lie"),
  },
  {
    title: "Unravel",
    statement:
      "The work investigates participation as an alternative to control, exploring what emerges when certainty gives way to movement, attention, and trust.",
    question:
      "What emerges when we stop trying to manage the process of becoming?",
    images: numberedImages("unravel-original", "unravel-original", 4, "Unravel"),
  },
] as const;

export default function ArchivePage() {
  return (
    <main className="archive-page">
      <header className="utility-header archive-header">
        <p className="utility-header__eyebrow">Research Room</p>
        <h1>Archive</h1>
        <p>
          The Index is a quick view of the installed exhibition. The Archive holds the fuller
          finished edits, project histories, and optional reflections from the practice.
        </p>

        <nav className="archive-menu" aria-label="Archive contents">
          <a href="#artist-statement">Artist Statement</a>
          <a href="#fruiting-body">Fruiting Body</a>
          <a href="#process">Process</a>
          {museumWorks.map((work) => (
            <a href={`#archive-${work.id}`} key={work.id}>{work.title}</a>
          ))}
          <a href="#bio">Bio</a>
        </nav>
      </header>

      <section className="archive-practice" aria-label="Practice context">
        <PracticeDetails id="artist-statement" title="Artist Statement" paragraphs={artistStatement} />
        <PracticeDetails id="fruiting-body" title="Fruiting Body" paragraphs={fruitingBodyStatement} />
        <PracticeDetails id="process" title="Process" paragraphs={processStatement} />
        <PracticeDetails id="bio" title="Bio" paragraphs={artistBio} />
      </section>

      <section className="archive-works" aria-label="Full finished bodies of work">
        {museumWorks.map((work) => (
          <article id={`archive-${work.id}`} className="archive-work" data-work-id={work.id} key={work.id}>
            <header className="archive-work__header">
              <p className="archive-work__room">{work.room}</p>
              <h2>{work.title}</h2>
              <p className="archive-work__meta">{work.year} · {work.medium}</p>
              <p>{work.statement}</p>
              {work.archiveNote ? <p className="archive-work__history">{work.archiveNote}</p> : null}
              {work.reflection?.length ? (
                <details className="archive-reflection archive-reflection--intro">
                  <summary>Artist Reflection</summary>
                  <div className="archive-reflection__body">
                    {work.reflection.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </details>
              ) : null}
              <Link href={work.href}>View installed work</Link>
            </header>

            <ArtworkLightboxGrid images={work.archive} mode="archive" />

            {work.id === "red-thread" ? (
              <section className="archive-historical-edits" aria-label="Red Thread developmental archive">
                <header className="archive-historical-edits__intro">
                  <p className="archive-work__room">Developmental archive</p>
                  <h3>Red Thread — Earlier Bodies of Work</h3>
                  <p>
                    The installed Red Thread developed from three earlier bodies of work.
                    Each began as a distinct inquiry and was originally edited as a separate series.
                    Those original edits are preserved here as part of the work&apos;s developmental history.
                  </p>
                </header>

                {redThreadDevelopment.map((set) => (
                  <article className="archive-historical-edit" key={set.title}>
                    <p className="archive-historical-edit__label">Original edit</p>
                    <h3>{set.title}</h3>
                    <p className="archive-historical-edit__statement">{set.statement}</p>
                    <p className="archive-historical-edit__question">{set.question}</p>
                    <ArtworkLightboxGrid images={set.images} mode="archive" />
                  </article>
                ))}
              </section>
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
