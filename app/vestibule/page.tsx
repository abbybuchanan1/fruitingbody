import { ArchitecturalLink } from "@/components/ArchitecturalLink";

export default function VestibulePage() {
  return (
    <main className="vestibule">
      <div className="vestibule__stone" aria-hidden="true" />
      <div className="vestibule__shadow" aria-hidden="true" />
      <div className="vestibule__light" aria-hidden="true" />

      <section
        className="vestibule__space"
        aria-label="Vestibule"
      >
        <div className="vestibule__quiet-mark" aria-hidden="true">
          Arrival
        </div>

        <div className="vestibule__primary-passage">
          <ArchitecturalLink href="/membrane">
            Through the arch
          </ArchitecturalLink>
        </div>

        <nav
          className="vestibule__side-passages"
          aria-label="Paths from the vestibule"
        >
          <ArchitecturalLink href="/collections/relative">
            Relative
          </ArchitecturalLink>

          <ArchitecturalLink href="/red-room">
            Red Room
          </ArchitecturalLink>

          <ArchitecturalLink href="/collections/selected">
            Selected Works
          </ArchitecturalLink>

          <ArchitecturalLink href="/collections/body-of-water">
            Body of Water
          </ArchitecturalLink>
        </nav>
      </section>
    </main>
  );
}