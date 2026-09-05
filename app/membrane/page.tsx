import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { MembraneInstallation } from "@/components/MembraneInstallation";
import { artworkSets } from "@/lib/artworks";

export default function MembranePage() {
  const wallText =
    "The work investigates permeability as a condition of emergence, asking how transformation occurs through exchange rather than separation.";

  return (
    <main className="membrane-room">
      {/* Entry: material before information */}
      <section
        className="membrane-entry"
        aria-label="Entering Membrane"
      >
        <div
          className="membrane-entry__surface"
          aria-hidden="true"
        />

        <div className="membrane-question">
          <p>What must pass through us in order for us to become?</p>
        </div>
      </section>

      {/* Wall text */}
      <section
        className="membrane-introduction"
        aria-labelledby="membrane-title"
      >
        <div className="membrane-introduction__inner">
          <h1 id="membrane-title">Membrane</h1>

          <p
            className="membrane-wall-card__text"
            data-text={wallText}
          >
            {wallText}
          </p>
        </div>
      </section>

      {/* Spatial installation */}
      <section
        className="membrane-installation"
        aria-label="Membrane installation"
      >
        <MembraneInstallation
          artworks={artworkSets.membrane}
        />
      </section>

      {/* Emergence */}
      <section
        className="membrane-exit"
        aria-label="Continue from Membrane"
      >
        <div
          className="membrane-exit__light"
          aria-hidden="true"
        />

        <ArchitecturalLink
          href="/dark-garden"
          tone="light"
        >
          Into the Dark Garden
        </ArchitecturalLink>
      </section>
    </main>
  );
}