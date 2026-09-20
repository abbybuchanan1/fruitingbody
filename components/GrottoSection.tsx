import { ArtworkSequence } from "@/components/ArtworkSequence";
import { WorkIntroCard } from "@/components/WorkIntroCard";
import { museumWorksById } from "@/lib/works";
import { QuestionPrompt } from "@/components/QuestionPrompt";

export function GrottoSection() {
  const miscarriage = museumWorksById.miscarriage;
  const phase = museumWorksById.phase;

  return (
    <section id="grotto" className="grotto-page">
      <div className="grotto-environment" aria-hidden="true" />

      <div className="grotto-content">
        <section id="a-miscarriage" className="grotto-section grotto-section--miscarriage">
          <div className="room-opening">
            <WorkIntroCard
              room="Grotto"
              title={miscarriage.title}
              statement={miscarriage.statement}
              headingLevel={1}
            />
            <QuestionPrompt>{miscarriage.question}</QuestionPrompt>
          </div>

          <div className="miscarriage-sequence" aria-label="A Miscarriage artworks">
            {miscarriage.exhibition.map((work, index) => (
              <figure className={`miscarriage-work miscarriage-work--${index + 1}`} key={work.src}>
                <img src={work.src} alt={work.alt} loading="lazy" decoding="async" />
                {work.title ? <figcaption className="miscarriage-work__title">{work.title}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>

        <div className="grotto-transition grotto-transition--miscarriage-phase" aria-hidden="true" />

        <section id="phase" className="grotto-section grotto-section--phase">
          <div className="room-opening room-opening--secondary">
            <WorkIntroCard room="Grotto" title={phase.title} statement={phase.statement} />
            <QuestionPrompt>{phase.question}</QuestionPrompt>
          </div>
          <ArtworkSequence artworks={phase.exhibition} label="Phase artworks" mode="varied" />
        </section>
      </div>
    </section>
  );
}
