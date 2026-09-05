import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { ArtworkSequence } from "@/components/ArtworkSequence";
import { Room } from "@/components/Room";
import { artworkSets } from "@/lib/artworks";

export default function RedRoomPage() {
  return (
    <Room eyebrow="Continuous exhibition" title="Red Room" environment="textile">
      <p className="room__body">Red Thread, It Was Shelter Before It Was a Lie, and Unravel share one continuous tactile room. Project boundaries remain perceptible without becoming separate destinations.</p>
      <div className="red-room-flow">
        <section>
          <h2>Red Thread</h2>
          <ArtworkSequence artworks={artworkSets.redThread} label="Red Thread works" mode="varied" />
        </section>
        <section>
          <h2>It Was Shelter Before It Was a Lie</h2>
          <ArtworkSequence artworks={artworkSets.shelter} label="Shelter works" mode="varied" />
        </section>
        <section>
          <h2>Unravel</h2>
          <ArtworkSequence artworks={artworkSets.unravel} label="Unravel works" mode="immersive" />
        </section>
      </div>
      <div className="branch-grid" aria-label="Exits from the Red Room">
        <ArchitecturalLink href="/courtyard">Cloister</ArchitecturalLink>
        <ArchitecturalLink href="/back-corridor">Back corridor</ArchitecturalLink>
        <ArchitecturalLink href="/vestibule">Vestibule</ArchitecturalLink>
      </div>
    </Room>
  );
}
