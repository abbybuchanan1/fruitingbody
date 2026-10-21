import Link from "next/link";
import { NarthexHall } from "@/components/NarthexHall";
import { RoomStart } from "@/components/RoomStart";
import { ArtworkLightboxGrid } from "@/components/ArtworkLightboxGrid";
import { OpenDetailsFromHash } from "@/components/OpenDetailsFromHash";
import { FilmThumbnail } from "@/components/FilmThumbnail";
import { showInterpretiveQuestions } from "@/lib/editorial";
import { museumWorks } from "@/lib/works";
import type { Artwork } from "@/lib/artworks";


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
      "Thread binds and traces.",
    question:
      "How do we become ourselves when we can never fully separate from the whole?",
    // Original 07 is withdrawn: its textures began as generative AI material.
    images: numberedImages("red-thread-original", "red-thread-original", 8, "Red Thread").filter(
      (image) => !image.src.endsWith("-07.jpg"),
    ),
  },
  {
    title: "It Was Shelter Before It Was a Lie",
    statement:
      "Protection hardens into identity.",
    question:
      "How do we recognize when a form of protection has become a form of confinement?",
    images: numberedImages("shelter-original", "shelter-original", 8, "It Was Shelter Before It Was a Lie"),
  },
  {
    title: "Unravel",
    statement:
      "Blur and movement loosen the figure.",
    question:
      "What emerges when we stop trying to manage the process of becoming?",
    // Original order: 01, 02, 03, then 05 (the frame that now closes the
    // installed Red Thread) as the fourth, then 04.
    images: ["01", "02", "03", "05", "04"].map((n, i) => ({
      src: `/art/archive/unravel-original/unravel-original-${n}.jpg`,
      alt: `Unravel, original edit, image ${i + 1} of 5.`,
    })) as Artwork[],
  },
] as const;

// Only works whose archive differs from the Index are kept here (the rest are
// shown in full on the Index). Daffodils and Fear Not now carry further work.
const ARCHIVE_IDS = ["daffodils", "fear-not", "red-thread", "membrane", "body-of-water", "maria"];
// Part of the Daffodils archive: a collage from the same material, titled from the Pádraig Ó
// Tuama passage quoted in the Daffodils reflection.
const oneYearCollage: Artwork[] = [
  {
    src: "/art/archive/daffodils/one-year-fifty-five-hundred-forever.jpg",
    alt: "One Year. Fifty. Five Hundred. Forever. A kaleidoscopic digital collage of bodies, pale flowers and earth, mirrored around a dark centre.",
    title: "One Year. Fifty. Five Hundred. Forever.",
    medium: "Digital collage, 2025",
  },
];

const archiveWorks = museumWorks.filter((work) => ARCHIVE_IDS.includes(work.id));

export default function ArchivePage() {
  return (
    <main className="archive-page">
      <OpenDetailsFromHash />
      <NarthexHall variant="above" from="archive" />
      <RoomStart title="archive-title" />
      {/* The Archive's entrance: a detail of the artist's painting (2010),
          like a canvas kept under a dust sheet, with the room's title card. */}
      <section className="archive-entrance" aria-label="Archive">
        <img className="archive-entrance__image" src="/media/architecture/archive-entrance.jpg" alt="" aria-hidden="true" />
      </section>
      <header id="archive-title" className="utility-header archive-header archive-title-card">
        <p className="utility-header__eyebrow">Research Room</p>
        <h1>Archive</h1>
        <p>
          Fuller bodies of work, earlier edits and project histories.
          For the installed exhibition and the artist statement, bio, CV and contact, visit the <Link href="/directory">Index</Link>.
        </p>
        <p className="utility-header__contact">
          Abby Buchanan · <a href="mailto:abby@fruitingbody.works">abby@fruitingbody.works</a>
        </p>

        <nav className="archive-menu" aria-label="Archive works">
          {archiveWorks.map((work) => (
            <a href={`#archive-${work.id}`} key={work.id}>{work.title}</a>
          ))}
        </nav>
      </header>


      <section className="archive-works" aria-label="Full finished bodies of work">
        {archiveWorks.map((work) => (
          <article id={`archive-${work.id}`} className="archive-work" data-work-id={work.id} key={work.id}>
            <header className="archive-work__header">
              <p className="archive-work__room">{work.room}</p>
              <h2>{work.title}</h2>
              <p className="archive-work__meta">{work.year} · {work.medium}{work.place ? ` · ${work.place}` : ""}</p>
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

            <p className="archive-historical-edit__label archive-installed-label">Installed work</p>
            <ArtworkLightboxGrid images={work.archive} mode="archive" />
            {work.id === "body-of-water" ? <FilmThumbnail /> : null}
            {work.archiveExtra?.length ? (
              <section id={work.id === "daffodils" ? "archive-one-year" : undefined} className="archive-further" aria-label={`${work.title}: further work`}>
                <p className="archive-historical-edit__label">Further work</p>
                <ArtworkLightboxGrid images={work.id === "daffodils" ? [...work.archiveExtra, ...oneYearCollage] : work.archiveExtra} mode="archive" />
              </section>
            ) : null}

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
                    {showInterpretiveQuestions ? <p className="archive-historical-edit__question">{set.question}</p> : null}
                    <ArtworkLightboxGrid images={set.images} mode="archive" />
                    {set.title === "Unravel" ? (
                      <figure className="archive-source-footage">
                        <video
                          src="/media/films/unravel-source-footage.mp4"
                          poster="/media/films/unravel-source-footage-poster.jpg"
                          muted
                          playsInline
                          autoPlay
                          loop
                          preload="metadata"
                          aria-label="Unravel, raw footage from the shoot: walking away across the sand as the wind lifts the red tulle."
                        />
                        <figcaption>Raw footage from the shoot. The Unravel frames were drawn from this movement.</figcaption>
                      </figure>
                    ) : null}
                  </article>
                ))}
              </section>
            ) : null}
          </article>
        ))}
      </section>

      <NarthexHall from="archive" />
    </main>
  );
}
