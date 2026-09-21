import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { VestibuleDapple } from "@/components/VestibuleDapple";

export default function VestibulePage() {
  return (
    <main className="vestibule">
      <div className="vestibule__stone" aria-hidden="true" />
      <div className="vestibule__shadow" aria-hidden="true" />
      <div className="vestibule__moss" aria-hidden="true" />
      <VestibuleDapple />
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
    </main>
  );
}
