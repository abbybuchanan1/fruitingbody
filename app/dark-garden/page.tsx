import Link from "next/link";
import { artworkSets } from "@/lib/artworks";

export default function DarkGardenPage() {
  const artworks = artworkSets.fearNot;

  return (
    <main className="dark-garden">

      {/* ARRIVAL — FULL ARCHITECTURAL SPACE */}
      <section
        className="dark-garden-arrival"
        aria-label="Dark Garden"
      >
        <div
          className="dark-garden-arrival__environment"
          aria-hidden="true"
        />

        <div
          className="dark-garden-arrival__shade"
          aria-hidden="true"
        />

        <div className="dark-garden-arrival__title">
          Dark Garden
        </div>
      </section>


      {/* GARDEN ENVIRONMENT */}
      <div className="dark-garden-growth">

        <div
          className="dark-garden-growth__environment"
          aria-hidden="true"
        />

        <div
          className="dark-garden-growth__shade"
          aria-hidden="true"
        />


        {/* QUESTION */}
        <section className="dark-garden-question">
          <p>
            What becomes possible when curiosity matters more
            than certainty?
          </p>
        </section>


        {/* FEAR NOT WALL CARD */}
        <section className="dark-garden-card-stage">
          <div className="dark-garden-card">
            <h1>Fear Not</h1>

            <p>
              The work investigates curiosity as a transformative
              force, reclaiming knowledge, desire, and participation
              from narratives of transgression and fear.
            </p>
          </div>
        </section>


        {/* FEAR NOT INSTALLATION */}
        <section
          className="dark-garden-installation"
          aria-label="Fear Not works"
        >
          {artworks.map((artwork, index) => (
            <div
              className={`dark-garden-work-stage dark-garden-work-stage--${index + 1}`}
              key={artwork.src}
            >
              <figure className="dark-garden-work">
                <img
                  src={artwork.src}
                  alt={artwork.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </figure>
            </div>
          ))}
        </section>


        {/* EXIT */}
        <section className="dark-garden-exit">
          <Link
            className="dark-garden-exit__link"
            href="/grotto"
          >
            <span
              className="dark-garden-exit__line"
              aria-hidden="true"
            />

            <span>Enter the Grotto</span>
          </Link>
        </section>

      </div>

    </main>
  );
}