import { ArtworkSequence } from "@/components/ArtworkSequence";
import { artworkSets } from "@/lib/artworks";

export function GardenSection({
  showExit = false,
  embedded = false,
}: {
  showExit?: boolean;
  embedded?: boolean;
}) {
  return (
    <section
      id="garden"
      className={`garden-page ${embedded ? "garden-page--embedded" : ""}`}
    >
      <div className="garden-environment" aria-hidden="true" />

      <div className="garden-content">
        <section
          id="daffodils"
          className="garden-section garden-section--daffodils"
          aria-labelledby="daffodils-title"
        >
          <div className="garden-section__question-block">
            <p className="garden-section__eyebrow">Garden</p>
            <p className="garden-section__question">
              What forms of freedom remain available inside the conditions that
              make us?
            </p>
          </div>

          <div className="garden-wall-card">
            <h1 id="daffodils-title">
              This Morning I Was Gathering Daffodils
            </h1>
            <p>
              The work investigates the relationship between agency and
              inevitability, exploring forms of sovereignty that emerge through
              participation rather than escape.
            </p>
          </div>

          <ArtworkSequence
            artworks={artworkSets.daffodils}
            label="This Morning I Was Gathering Daffodils"
            mode="varied"
          />
        </section>

        <section
          id="fear-not"
          className="garden-section garden-section--fear-not"
          aria-labelledby="fear-not-title"
        >
          <div className="garden-section__question-block">
            <p className="garden-section__question">
              What becomes possible when curiosity matters more than certainty?
            </p>
          </div>

          <div className="garden-wall-card">
            <h2 id="fear-not-title">Fear Not</h2>
            <p>
              The work investigates curiosity as a transformative force,
              reclaiming knowledge, desire, and participation from narratives
              of transgression and fear.
            </p>
          </div>

          <ArtworkSequence
            artworks={artworkSets.fearNot}
            label="Fear Not"
            mode="varied"
          />
        </section>

        <section
          id="taste-and-see"
          className="garden-section garden-section--taste-and-see"
          aria-labelledby="taste-and-see-title"
        >
          <div className="garden-section__question-block">
            <p className="garden-section__question">
              What is beauty when it no longer exists for the gaze of others?
            </p>
          </div>

          <div className="garden-wall-card">
            <h2 id="taste-and-see-title">Taste and See</h2>
            <p>
              The work investigates beauty as an embodied experience rather
              than a performed identity, asking what remains when beauty is no
              longer organized around spectatorship.
            </p>
          </div>

          <ArtworkSequence
            artworks={artworkSets.taste}
            label="Taste and See"
            mode="varied"
          />
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
