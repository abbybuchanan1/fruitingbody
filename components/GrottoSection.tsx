import { ArtworkSequence } from "@/components/ArtworkSequence";
import { WorkIntroCard } from "@/components/WorkIntroCard";
import { museumWorksById } from "@/lib/works";
import { QuestionPrompt } from "@/components/QuestionPrompt";
import { MiscarriageVotiveSequence } from "@/components/MiscarriageVotiveSequence";
import { GrottoCloisters } from "@/components/GrottoCloisters";

export function GrottoSection() {
  const miscarriage = museumWorksById.miscarriage;
  const phase = museumWorksById.phase;

  return (
    <section id="grotto" className="grotto-page" data-audio-zone="quiet">
      <div className="grotto-environment" aria-hidden="true" />

      <div className="grotto-content">
        <section id="a-miscarriage" className="grotto-section grotto-section--miscarriage">
          <div className="room-opening">
            <WorkIntroCard
              room="Grotto"
              title={miscarriage.title}
              statement={miscarriage.statement} reflection={miscarriage.reflection}
              note="This work documents a miscarriage as it happened."
              headingLevel={1}
            />
            <QuestionPrompt>{miscarriage.question}</QuestionPrompt>
          </div>

          <MiscarriageVotiveSequence artworks={miscarriage.archive} />
        </section>

        <div className="grotto-transition grotto-transition--miscarriage-phase">
          {/* Votive lamps (Kathmandu, 2013) rising out of the stone into Phase. */}
          <div className="grotto-transition__votives" aria-hidden="true">
            {/* Two faint glow layers on unrelated rhythms: the flames flicker. */}
            <span className="grotto-transition__flicker grotto-transition__flicker--a" />
            <span className="grotto-transition__flicker grotto-transition__flicker--b" />
          </div>
          {/* Where the Cloisters return a visitor: the votives, in view. */}
          <span id="grotto-cloisters" className="grotto-cloisters__anchor" aria-hidden="true" />
          <GrottoCloisters />
        </div>

        <section id="phase" className="grotto-section grotto-section--phase">
          <div className="room-opening room-opening--secondary">
            <WorkIntroCard room="Grotto" title={phase.title} statement={phase.statement} reflection={phase.reflection} />
            <QuestionPrompt>{phase.question}</QuestionPrompt>
          </div>
          <ArtworkSequence artworks={phase.exhibition} label="Phase artworks" mode="varied" />
        </section>
      </div>
    </section>
  );
}
