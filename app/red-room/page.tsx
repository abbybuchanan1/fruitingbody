import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { ArtworkSequence } from "@/components/ArtworkSequence";
import { Room } from "@/components/Room";
import { artworkSets } from "@/lib/artworks";

export default function RedRoomPage() {
  return (
    <Room
      eyebrow="Continuous exhibition"
      title="Red Room"
      environment="textile"
    >
      {/* ========================================
          RED ROOM ENVIRONMENT

          One continuous environmental layer.

          Canonical panel order:
          1. v2 — architectural entrance
          2. B
          3. C
          4. D — final Membrane territory

          Do not duplicate these images elsewhere
          in the Red Room markup.
          ======================================== */}

      <div
        className="red-room-environment"
        aria-hidden="true"
      >
        <img
          src="/media/architecture/red-room-environment-composite-v2.jpg"
          alt=""
        />

        <img
          src="/media/architecture/red-room-environment-composite-B.jpg"
          alt=""
        />

        <img
          src="/media/architecture/red-room-environment-composite-C.jpg"
          alt=""
        />

        <img
          src="/media/architecture/red-room-environment-composite-D.jpg"
          alt=""
        />
      </div>


      {/* ========================================
          EXHIBITION CONTENT
          ======================================== */}

      <div className="red-room-flow">


        {/* ========================================
            RED THREAD
            ======================================== */}

        <section
          className="red-room-project red-room-project--thread"
          aria-labelledby="red-thread-title"
        >
          <header className="red-room-project__header">
            <p className="red-room-project__eyebrow">
              Red Thread
            </p>

            <h2 id="red-thread-title">
              What binds us?
            </h2>
          </header>

          <div className="red-thread-installation">
            <ArtworkSequence
              artworks={artworkSets.redThread}
              label="Red Thread works"
              mode="varied"
            />
          </div>
        </section>


        {/* ========================================
            ARCHITECTURE → MEMBRANE PASSAGE
            ======================================== */}

        <div
          className="red-room-passage"
          aria-hidden="true"
        />


        {/* ========================================
            MEMBRANE
            ======================================== */}

        <section
          className="red-room-project red-room-project--membrane"
          aria-labelledby="membrane-title"
        >
          <header className="red-room-project__header">
            <p className="red-room-project__eyebrow">
              Membrane
            </p>

            <h2 id="membrane-title">
              What must pass through us in order for us to become?
            </h2>
          </header>

          <div className="membrane-installation">
            <ArtworkSequence
              artworks={artworkSets.membrane}
              label="Membrane works"
              mode="immersive"
            />
          </div>
        </section>

      </div>


      {/* ========================================
          EXITS
          ======================================== */}

      <div
        className="branch-grid red-room-exits"
        aria-label="Exits from the Red Room"
      >
        <ArchitecturalLink href="/courtyard">
          Cloister
        </ArchitecturalLink>

        <ArchitecturalLink href="/back-corridor">
          Back corridor
        </ArchitecturalLink>

        <ArchitecturalLink href="/vestibule">
          Vestibule
        </ArchitecturalLink>
      </div>
    </Room>
  );
}