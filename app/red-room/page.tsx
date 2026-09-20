import { Suspense } from "react";
import { ArtworkSequence } from "@/components/ArtworkSequence";
import { EnvironmentalPanelSequence } from "@/components/EnvironmentalPanelSequence";
import { HashScrollRestorer } from "@/components/HashScrollRestorer";
import { NarthexTransition } from "@/components/NarthexTransition";
import { Room } from "@/components/Room";
import { artworkSets } from "@/lib/artworks";

const redRoomEnvironment = [
  { src: "/media/architecture/red-room-alt-01.jpg" },
  { src: "/media/architecture/red-room-environment-composite-B.jpg" },
  { src: "/media/architecture/red-room-environment-composite-C.jpg" },
  { src: "/media/architecture/red-room-environment-composite-D.jpg" },
];

export default function RedRoomPage() {
  return (
    <Room eyebrow="Continuous exhibition" title="Red Room" environment="textile">
      <Suspense fallback={null}>
        <HashScrollRestorer />
      </Suspense>
      <div id="red-room-start" className="route-start-anchor" aria-hidden="true" />
      <EnvironmentalPanelSequence panels={redRoomEnvironment} className="red-room-environment" />

      <div className="red-room-flow">
        <section id="red-thread" className="red-room-project red-room-project--thread" aria-labelledby="red-thread-title">
          <div className="red-room-opening">
            <header className="red-room-opening__title">
              <p className="red-room-opening__room-label">Red Room</p>
              <h2 id="red-thread-title">Red Thread</h2>
              <p className="red-room-opening__statement">
                This work explores the tensions between entanglement, belonging, and becoming.
              </p>
              <p className="exhibition-content-note red-room-opening__note">
                Some works contain nudity and close studies of the human body.
              </p>
            </header>
            <p className="red-room-opening__question">What binds us?</p>
          </div>
          <div className="red-thread-installation">
            <ArtworkSequence artworks={artworkSets.redThread} label="Red Thread works" mode="varied" />
          </div>
        </section>

        <div className="red-room-passage" aria-hidden="true" />

        <section id="membrane" className="red-room-project red-room-project--membrane" aria-labelledby="membrane-title">
          <header className="red-room-project__header">
            <p className="red-room-project__eyebrow">Membrane</p>
            <h2 id="membrane-title">What must pass through us in order for us to become?</h2>
          </header>
          <div className="membrane-installation">
            <ArtworkSequence artworks={artworkSets.membrane} label="Membrane works" mode="immersive" />
          </div>
          <div id="membrane-end" className="return-anchor" aria-hidden="true" />
        </section>
      </div>

      <Suspense fallback={null}>
        <NarthexTransition from="red-room" />
      </Suspense>
    </Room>
  );
}
