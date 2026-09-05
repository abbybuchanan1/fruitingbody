import { ArtworkSequence } from "@/components/ArtworkSequence";
import { artworkSets } from "@/lib/artworks";

const gardenEnvironment = [
  "/media/architecture/environments/garden/garden-01.jpg",
  "/media/architecture/environments/garden/garden-02.jpg",
  "/media/architecture/environments/garden/garden-03.jpg",
  "/media/architecture/environments/garden/garden-04.jpg",
  "/media/architecture/environments/garden/garden-05.jpg",
  "/media/architecture/environments/garden/garden-06.jpg",
  "/media/architecture/environments/garden/garden-07.jpg",
  "/media/architecture/environments/garden/garden-08.jpg",
  "/media/architecture/environments/garden/garden-09.jpg",
  "/media/architecture/environments/garden/garden-10.jpg",
  "/media/architecture/environments/garden/garden-11.jpg",
  "/media/architecture/environments/garden/garden-12.jpg",
];

export default function GardenPage() {
  return (
    <main className="garden-page">
      <div className="garden-environment" aria-hidden="true">
        {gardenEnvironment.map((src, index) => (
          <div
            className={`garden-environment__panel garden-environment__panel--${
              index + 1
            }`}
            key={src}
          >
            <img src={src} alt="" />
          </div>
        ))}
      </div>

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