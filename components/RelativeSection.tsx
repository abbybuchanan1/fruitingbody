import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { RelativeDiptychSequence } from "@/components/RelativeDiptychSequence";
import { relativePairs } from "@/lib/artworks";

type Exit = {
  href: string;
  label: string;
};

export function RelativeSection({
  showExits = false,
  exits = [],
}: {
  showExits?: boolean;
  exits?: Exit[];
}) {
  return (
    <section className="relative-page">
      <img
        className="relative-environment"
        src="/media/architecture/environments/relative/relative-environment-composite.jpg"
        alt=""
        aria-hidden="true"
      />

      <div className="relative-content">
        <header className="relative-intro">
          <p className="relative-intro__eyebrow">
            Collection
          </p>

          <h1>
            Relative
          </h1>

          <p className="relative-intro__question">
            What becomes visible when the body is understood as part of the
            same living system as the land?
          </p>

          <p className="relative-intro__content-note">
            Some works contain nudity and close studies of the human body.
          </p>

          <div className="relative-wall-card">
            <p>
              The work investigates the ways bodies and landscapes participate
              in the same forces rather than functioning as metaphors for one
              another.
            </p>
          </div>
        </header>

        <RelativeDiptychSequence
          pairs={relativePairs}
        />

        {showExits ? (
          <nav
            className="relative-exits"
            aria-label="Exits from Relative"
          >
            {exits.map((exit) => (
              <ArchitecturalLink
                key={exit.href}
                href={exit.href}
              >
                {exit.label}
              </ArchitecturalLink>
            ))}
          </nav>
        ) : null}
      </div>
    </section>
  );
}