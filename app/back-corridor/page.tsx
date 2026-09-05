import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { Room } from "@/components/Room";

export default function BackCorridorPage() {
  return (
    <Room eyebrow="Connector" title="Back Corridor" environment="back-corridor">
      <p className="room__body">
        A warm circulation hub between the outer galleries, the Red Room, and the narthex.
      </p>
      <div className="branch-grid" aria-label="Paths from the back corridor">
        <ArchitecturalLink href="/red-room">Toward textiles</ArchitecturalLink>
        <ArchitecturalLink href="/collections/relative">Relative</ArchitecturalLink>
        <ArchitecturalLink href="/narthex">Narthex</ArchitecturalLink>
        <ArchitecturalLink href="/vestibule">Vestibule</ArchitecturalLink>
      </div>
    </Room>
  );
}
