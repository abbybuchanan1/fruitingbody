import Link from "next/link";
import { ArtworkLightboxGrid } from "@/components/ArtworkLightboxGrid";
import { indexGroups, museumWorksById, type WorkId } from "@/lib/works";

export default function IndexPage() {
  return (
    <main className="index-page">
      <header className="utility-header">
        <p className="utility-header__eyebrow">Fruiting Body</p>
        <h1>Index</h1>
        <p>
          A fast view of the installed work. Image order follows the museum rooms.
        </p>
      </header>

      <div className="index-page__groups">
        {indexGroups.map((group) => (
          <section className="index-room-group" key={group.room}>
            <h2>{group.room}</h2>

            {group.ids.map((id) => {
              const work = museumWorksById[id as WorkId];
              const images = work.id === "miscarriage" ? work.archive : work.exhibition;
              return (
                <article className="index-work" data-work-id={work.id} key={work.id}>
                  <header className="index-work__header">
                    <div className="index-work__identity">
                      <p className="index-work__meta">{work.year} · {work.medium}</p>
                      <h3><Link href={work.href}>{work.title}</Link></h3>
                      <p className="index-work__statement">{work.statement}</p>
                      <p className="index-work__question">{work.question}</p>
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
        <Link href="/film-room?from=water-room">Body of Water — film</Link>
      </aside>

      <Link className="utility-return-to-narthex" href="/narthex?arrived=1">
        Return to Narthex
      </Link>
    </main>
  );
}
