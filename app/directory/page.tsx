import Link from "next/link";
import { ArtworkLightboxGrid } from "@/components/ArtworkLightboxGrid";
import { FilmThumbnail } from "@/components/FilmThumbnail";
import { OpenDetailsFromHash } from "@/components/OpenDetailsFromHash";
import { PracticeSection } from "@/components/PracticeSection";
import { showInterpretiveQuestions } from "@/lib/editorial";
import { indexGroups, museumWorksById, type WorkId } from "@/lib/works";

export default function IndexPage() {
  return (
    <main className="index-page">
      <OpenDetailsFromHash />
      <header className="utility-header">
        <p className="utility-header__eyebrow">Fruiting Body</p>
        <h1>Index</h1>
        <p>
          A fast view of the installed work. Image order follows the museum rooms.
        </p>
        <p className="utility-header__contact">
          <span className="utility-header__contact-who">
            Abby Buchanan · <a href="mailto:abby@fruitingbody.works">abby@fruitingbody.works</a>
          </span>
          <span className="utility-header__contact-sep" aria-hidden="true">{" · "}</span>
          <span className="utility-header__contact-links">
            <a href="#artist-statement">Statement</a>
            {" · "}<a href="#bio">Bio</a>
            {" · "}<a href="#cv">CV</a>
          </span>
        </p>
      </header>

      <div className="index-page__groups">
        {indexGroups.map((group) => (
          <section className="index-room-group" key={group.room}>
            <h2>{group.room}</h2>

            {group.ids.map((id) => {
              const work = museumWorksById[id as WorkId];
              // The Index shows the catalog edit where it differs from the room: Phase as
              // six frames, Daffodils with The Return under The Fall, Red Thread in three rows.
              const images = ["phase", "daffodils", "red-thread"].includes(work.id) ? work.archive : work.exhibition;
              return (
                <article className="index-work" data-work-id={work.id} key={work.id}>
                  <header className="index-work__header">
                    <div className="index-work__identity">
                      <p className="index-work__meta">{work.year} · {work.medium}{work.place ? ` · ${work.place}` : ""}</p>
                      <h3><Link href={work.href}>{work.title}</Link></h3>
                      <p className="index-work__statement">{work.statement}</p>
                      {showInterpretiveQuestions ? <p className="index-work__question">{work.question}</p> : null}
                    </div>
                  </header>

                  <ArtworkLightboxGrid images={images} mode="index" />
                </article>
              );
            })}
          </section>
        ))}
      </div>

      <aside className="index-moving-image">
        <p className="index-work__meta">Water Room · Moving image</p>
        <FilmThumbnail />
      </aside>

      <PracticeSection />

      <p className="index-archive-note">
        Earlier edits, fuller bodies of work and project histories are in the{" "}
        <Link href="/archive">Archive</Link>.
      </p>

      <section className="index-colophon" aria-label="Colophon">
        <p className="index-work__meta">Colophon</p>
        <p>
          Concept, art direction, design, photography and sound design by Abby Buchanan.
          The artworks are the artist&rsquo;s own photographs.
        </p>
        <p>
          Rooms: the Entrance (London, 2013), Vestibule (Kathmandu, 2013) and Narthex
          (San Francisco, 2024) are the artist&rsquo;s photographs. The Garden, Red Room and
          Water Room are collages by the artist, combining licensed stock imagery with her
          own footage.
        </p>
        <p>
          Films by the artist: the mushrooms on the Entrance (Belknap Springs, Oregon, 2026),
          the Water Room film (Columbia River Gorge, 2024), the Cloisters (Oregon, 2026) and the
          Courtyard (Oregon City, 2026).
        </p>
        <p>
          Sound assembled by the artist from her own recordings and licensed recordings
          from Epidemic Sound.
        </p>
        <p>
          The concept, design and writing, including the poems, are the artist&rsquo;s own. AI was
          used only as a tool: to write code to her wireframes and specifications, and as an
          editor on her texts, helping with cuts and arrangement. Every word is her own. No
          generative AI was used in the artworks or the artist&rsquo;s photographs.
        </p>
      </section>

      <Link className="utility-return-to-narthex" href="/narthex?arrived=1">
        Return to Narthex
      </Link>
    </main>
  );
}
