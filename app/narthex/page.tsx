import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { Room } from "@/components/Room";

export default function NarthexPage() {
  return (
    <Room eyebrow="Connector" title="Narthex" environment="narthex">
      <p className="room__body">
        A quieter stone passage near the back of the museum. From here the visitor can leave,
        return toward the main vestibule, or move into the back corridor.
      </p>
      <div className="branch-grid" aria-label="Paths from the narthex">
        <ArchitecturalLink href="/exit">Exit</ArchitecturalLink>
        <ArchitecturalLink href="/back-corridor">Back corridor</ArchitecturalLink>
        <ArchitecturalLink href="/vestibule">Main vestibule</ArchitecturalLink>
        <ArchitecturalLink href="/threshold">Threshold</ArchitecturalLink>
      </div>
    </Room>
  );
}
