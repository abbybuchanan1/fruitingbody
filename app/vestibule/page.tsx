import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { VestibuleArrivalShell } from "@/components/VestibuleArrivalShell";
import { VestibuleProjection } from "@/components/VestibuleProjection";

type Props = {
  searchParams: Promise<{ arrived?: string | string[] }>;
};

export default async function VestibulePage({ searchParams }: Props) {
  const params = await searchParams;
  const arriving = params.arrived === "1";

  return (
    <VestibuleArrivalShell arriving={arriving}>
      <div className="vestibule__stone" aria-hidden="true" />
      <div className="vestibule__shadow" aria-hidden="true" />
      <VestibuleProjection />
      <div className="vestibule__light" aria-hidden="true" />

      <section className="vestibule__space" aria-label="Vestibule">
        <div className="vestibule__quiet-mark" aria-hidden="true">
          Arrival
        </div>

        <div className="vestibule__primary-passage">
          <ArchitecturalLink href="/exhibition">Exhibition</ArchitecturalLink>
        </div>

        <nav className="vestibule__side-passages" aria-label="Paths from the vestibule">
          <ArchitecturalLink href="/red-room">Red Room</ArchitecturalLink>
          <ArchitecturalLink href="/water-room">Water Room</ArchitecturalLink>
          <ArchitecturalLink href="/current">Current</ArchitecturalLink>
        </nav>
      </section>
    </VestibuleArrivalShell>
  );
}
