import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { ArtworkSequence } from "@/components/ArtworkSequence";
import { Room } from "@/components/Room";
import { artworkSets } from "@/lib/artworks";

export default function LightGardenPage() {
  return (
    <Room eyebrow="Garden" title="Light Garden" environment="light-garden">
      <p className="room__body">Taste and See unfolds at a more human scale in warm botanical openness after the grotto.</p>
      <ArtworkSequence artworks={artworkSets.taste} label="Taste and See works" mode="standard" />
      <ArchitecturalLink href="/threshold">Continue</ArchitecturalLink>
    </Room>
  );
}
