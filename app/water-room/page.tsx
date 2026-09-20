import { Suspense } from "react";
import { ArtworkSequence } from "@/components/ArtworkSequence";
import { WaterRoomJunction } from "@/components/WaterRoomJunction";
import { HashScrollRestorer } from "@/components/HashScrollRestorer";
import type { Artwork } from "@/lib/artworks";

const panels = ["A", "B", "C", "D"];

const bodyOfWaterWorks: Artwork[] = Array.from({ length: 8 }, (_, index) => ({
  src: `/art/body-of-water/body-of-water-${String(index + 1).padStart(2, "0")}.jpg`,
  alt: `Body of Water, work ${index + 1}. Provisional curatorial alt text pending.`,
}));

export default function WaterRoomPage() {
  return (
    <main id="water-room-start" className="water-room" data-museum-location="water-room">
      <Suspense fallback={null}>
        <HashScrollRestorer />
      </Suspense>
      <div className="water-room__environment" aria-hidden="true">
        {panels.map((panel, index) => (
          <div className="water-room__environment-panel" data-panel-index={index} key={panel}>
            <img
              src={`/media/architecture/environments/water-room/water-room-environment-${panel}.jpg`}
              alt=""
            />
          </div>
        ))}
      </div>

      <header className="water-room__header">
        <div className="water-room__intro-card">
          <p className="water-room__eyebrow">Water Room</p>
          <h1>Body of Water</h1>
          <p className="water-room__statement">
            The work explores what becomes possible when the body adopts the logic of water rather than resisting it.
          </p>
        </div>

        <p className="exhibition-content-note water-room__content-note">
          Some works contain nudity and close studies of the human body.
        </p>

        <p className="water-room__question">
          What happens when we stop resisting transformation and begin moving with it?
        </p>
      </header>

      <section className="water-room-installation" aria-label="Body of Water">
        <ArtworkSequence artworks={bodyOfWaterWorks} label="Body of Water works" mode="varied" eagerFirst />
      </section>

      <div id="body-of-water-end" className="return-anchor" aria-hidden="true" />
      <WaterRoomJunction />
    </main>
  );
}
