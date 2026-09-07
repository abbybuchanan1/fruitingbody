import { ArtworkSequence } from "@/components/ArtworkSequence";
import { artworkSets } from "@/lib/artworks";

export default function GardenPage() {
  return (
    <main className="garden-page">
      <div className="garden-environment" aria-hidden="true" />

      <div className="garden-content">
        <section
          id="daffodils"
          className="garden-section garden-section--daffodils"
          aria-labelledby="daffodils-title"
        >
          <div className="garden-section__intro">
            <p className="garden-section__eyebrow">Garden</p>

            <h1 id="daffodils-title" className="garden-section__title">
              This Morning I Was Gathering Daffodils
            </h1>

            <p className="garden-section__question">
              What forms of freedom remain available inside the conditions that
              make us?
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
          <div className="garden-section__intro">
            <h2 id="fear-not-title" className="garden-section__title">
              Fear Not
            </h2>

            <p className="garden-section__question">
              What becomes possible when curiosity matters more than certainty?
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
          <div className="garden-section__intro">
            <h2 id="taste-and-see-title" className="garden-section__title">
              Taste and See
            </h2>

            <p className="garden-section__question">
              What is beauty when it no longer exists for the gaze of others?
            </p>
          </div>

          <ArtworkSequence
            artworks={artworkSets.taste}
            label="Taste and See"
            mode="varied"
          />
        </section>

        <nav className="garden-page__exit" aria-label="Garden navigation">
          <a href="/map">Map</a>
          <a href="/directory">Directory</a>
        </nav>
      </div>
    </main>
  );
}