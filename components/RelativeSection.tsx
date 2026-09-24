import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { RelativeDiptychSequence } from "@/components/RelativeDiptychSequence";
import { WorkIntroCard } from "@/components/WorkIntroCard";
import { relativePairs } from "@/lib/artworks";
import { museumWorksById } from "@/lib/works";
import { QuestionPrompt } from "@/components/QuestionPrompt";

type Exit = { href: string; label: string };

export function RelativeSection({
  showExits = false,
  exits = [],
}: {
  showExits?: boolean;
  exits?: Exit[];
}) {
  const work = museumWorksById.relative;

  return (
    <section id="relative" className="relative-page" data-audio-zone="gallery">
      <img
        className="relative-environment"
        src="/media/architecture/environments/relative/relative-environment-composite.jpg"
        alt=""
        aria-hidden="true"
      />

      <div className="relative-content">
        <div className="room-opening room-opening--relative">
          <WorkIntroCard
            room="Front Gallery"
            title={work.title}
            statement={work.statement}
            note="Some works contain nudity and close studies of the human body."
            headingLevel={1}
          />
          <QuestionPrompt>{work.question}</QuestionPrompt>
        </div>

        <RelativeDiptychSequence pairs={relativePairs} />

        {showExits ? (
          <nav className="relative-exits" aria-label="Exits from Relative">
            {exits.map((exit) => (
              <ArchitecturalLink key={exit.href} href={exit.href}>
                {exit.label}
              </ArchitecturalLink>
            ))}
          </nav>
        ) : null}
      </div>
    </section>
  );
}
