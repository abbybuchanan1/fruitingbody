import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { Room } from "@/components/Room";

export default function CourtyardPage() {
  return (
    <Room eyebrow="Orientation" title="Courtyard" environment="courtyard">
      <p className="room__body">The building opens. The courtyard provides light, air, resting space, and recoverable orientation.</p>
      <div className="branch-grid" aria-label="Paths from the courtyard">
        <ArchitecturalLink href="/dark-garden">A darker garden</ArchitecturalLink>
        <ArchitecturalLink href="/collections/relative">Toward grasses</ArchitecturalLink>
        <ArchitecturalLink href="/collections/selected-works">Selected works</ArchitecturalLink>
        <ArchitecturalLink href="/collections/body-of-water">Toward water</ArchitecturalLink>
        <ArchitecturalLink href="/red-room">Toward textiles</ArchitecturalLink>
        <ArchitecturalLink href="/vestibule">Vestibule</ArchitecturalLink>
      </div>
    </Room>
  );
}
