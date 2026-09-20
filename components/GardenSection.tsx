import { ArtworkSequence } from "@/components/ArtworkSequence";
import { WorkIntroCard } from "@/components/WorkIntroCard";
import { museumWorksById } from "@/lib/works";

export function GardenSection({
  showExit = false,
  embedded = false,
}: {
  showExit?: boolean;
  embedded?: boolean;
}) {
  const daffodils = museumWorksById.daffodils;
  const fearNot = museumWorksById["fear-not"];
  const taste = museumWorksById["taste-and-see"];

  return (
    <section
      id="garden"
      className={`garden-page ${embedded ? "garden-page--embedded" : ""}`}
    >
      <div className="garden-environment" aria-hidden="true" />

      <div className="garden-content">
        <section id="daffodils" className="garden-section garden-section--daffodils">
          <div className="room-opening">
            <WorkIntroCard
              room="Garden"
              title={daffodils.title}
              statement={daffodils.statement}
              headingLevel={1}
            />
            <p className="room-opening__question">{daffodils.question}</p>
          </div>
          <ArtworkSequence artworks={daffodils.exhibition} label={daffodils.title} mode="varied" />
        </section>

        <section id="fear-not" className="garden-section garden-section--fear-not">
          <div className="room-opening room-opening--secondary">
            <WorkIntroCard room="Garden" title={fearNot.title} statement={fearNot.statement} />
            <p className="room-opening__question">{fearNot.question}</p>
          </div>
          <ArtworkSequence artworks={fearNot.exhibition} label={fearNot.title} mode="varied" />
        </section>

        <section id="taste-and-see" className="garden-section garden-section--taste-and-see">
          <div className="room-opening room-opening--secondary">
            <WorkIntroCard room="Garden" title={taste.title} statement={taste.statement} />
            <p className="room-opening__question">{taste.question}</p>
          </div>
          <ArtworkSequence artworks={taste.exhibition} label={taste.title} mode="varied" />
        </section>

        {showExit ? (
          <nav className="garden-page__exit" aria-label="Garden navigation">
            <a href="/index">Index</a>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
