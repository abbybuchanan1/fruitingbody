import { Suspense } from "react";
import { ArtworkSequence } from "@/components/ArtworkSequence";
import { EnvironmentalPanelSequence } from "@/components/EnvironmentalPanelSequence";
import { HashScrollRestorer } from "@/components/HashScrollRestorer";
import { NarthexTransition } from "@/components/NarthexTransition";
import { Room } from "@/components/Room";
import { WorkIntroCard } from "@/components/WorkIntroCard";
import { museumWorksById } from "@/lib/works";

const redRoomEnvironment = [
  { src: "/media/architecture/red-room-alt-01.jpg" },
  { src: "/media/architecture/red-room-environment-composite-B.jpg" },
  { src: "/media/architecture/red-room-environment-composite-C.jpg" },
  { src: "/media/architecture/red-room-environment-composite-D.jpg" },
];

export default function RedRoomPage() {
  const redThread = museumWorksById["red-thread"];
  const membrane = museumWorksById.membrane;

  return (
    <Room eyebrow="Continuous exhibition" title="Red Room" environment="textile">
      <Suspense fallback={null}><HashScrollRestorer /></Suspense>
      <div id="red-room-start" className="route-start-anchor" aria-hidden="true" />
      <EnvironmentalPanelSequence panels={redRoomEnvironment} className="red-room-environment" />

      <div className="red-room-flow">
        <section id="red-thread" className="red-room-project red-room-project--thread">
          <div className="room-opening room-opening--red">
            <WorkIntroCard
              room="Red Room"
              title={redThread.title}
              statement={redThread.statement}
              note="Some works contain nudity and close studies of the human body."
              headingLevel={1}
            />
            <p className="room-opening__question">{redThread.question}</p>
          </div>
          <div className="red-thread-installation">
            <ArtworkSequence artworks={redThread.exhibition} label="Red Thread works" mode="varied" />
          </div>
        </section>

        <div className="red-room-passage" aria-hidden="true" />

        <section id="membrane" className="red-room-project red-room-project--membrane">
          <div className="room-opening room-opening--red room-opening--secondary">
            <WorkIntroCard room="Red Room" title={membrane.title} statement={membrane.statement} />
            <p className="room-opening__question">{membrane.question}</p>
          </div>
          <div className="membrane-installation">
            <ArtworkSequence artworks={membrane.exhibition} label="Membrane works" mode="immersive" />
          </div>
          <div id="membrane-end" className="return-anchor" aria-hidden="true" />
        </section>
      </div>

      <Suspense fallback={null}><NarthexTransition from="red-room" /></Suspense>
    </Room>
  );
}
