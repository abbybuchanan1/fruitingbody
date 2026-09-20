import { WorkIntroCard } from "@/components/WorkIntroCard";
import { thresholdPairs } from "@/lib/artworks";
import { museumWorksById } from "@/lib/works";

export function ThresholdSection() {
  const work = museumWorksById.threshold;

  return (
    <section className="threshold-page">
      <div className="threshold-environment" aria-hidden="true" />
      <div className="threshold-content">
        <section id="threshold" className="threshold-section">
          <div className="room-opening">
            <WorkIntroCard
              room="Rear Gallery"
              title={work.title}
              statement={work.statement}
              headingLevel={1}
            />
            <p className="room-opening__question">{work.question}</p>
          </div>

          <div className="threshold-pairs" aria-label="Threshold diptychs">
            {thresholdPairs.map((pair) => (
              <figure className={`threshold-pair threshold-pair--${pair.id}`} key={pair.id}>
                <div className="threshold-pair__image threshold-pair__image--a">
                  <img src={pair.a.src} alt={pair.a.alt} loading="lazy" decoding="async" />
                </div>
                <div className="threshold-pair__image threshold-pair__image--b">
                  <img src={pair.b.src} alt={pair.b.alt} loading="lazy" decoding="async" />
                </div>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
