import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { ArtworkSequence } from "@/components/ArtworkSequence";
import { Room } from "@/components/Room";
import { artworkSets } from "@/lib/artworks";

export default function ThresholdPage() {
  return (
    <Room eyebrow="Collection" title="Threshold" question="What occurs in the space between states?" environment="threshold">
      <ArtworkSequence artworks={artworkSets.threshold} label="Threshold works" mode="immersive" />
      <div className="branch-grid" aria-label="Exits from Threshold">
        <ArchitecturalLink href="/narthex">Toward the narthex</ArchitecturalLink>
        <ArchitecturalLink href="/light-garden">Return to the light garden</ArchitecturalLink>
      </div>
    </Room>
  );
}
