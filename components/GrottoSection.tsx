import { ArtworkSequence } from "@/components/ArtworkSequence";
import { artworkSets, miscarriageWorks } from "@/lib/artworks";

export function GrottoSection() {
  return (
    <section id="grotto" className="grotto-page">
      <div className="grotto-environment" aria-hidden="true" />

      <div className="grotto-content">
        <section
          id="a-miscarriage"
          className="grotto-section grotto-section--miscarriage"
          aria-labelledby="miscarriage-title"
        >
          <div className="grotto-section__question-block">
            <p className="grotto-section__eyebrow">Grotto</p>
            <p className="grotto-section__question">
              How does a body continue becoming through loss, longing, and
              interrupted passage?
            </p>
          </div>

          <div className="grotto-wall-card">
            <h1 id="miscarriage-title">A Miscarriage</h1>
            <p>
              The work investigates transformation through interruption,
              exploring longing, absence, and passage as conditions of becoming.
            </p>
          </div>

          <div
            className="miscarriage-sequence"
            aria-label="A Miscarriage artworks"
          >
            {miscarriageWorks.map((work, index) => (
              <figure
                className={`miscarriage-work miscarriage-work--${index + 1}`}
                key={work.src}
              >
                <img
                  src={work.src}
                  alt={work.alt}
                  loading="lazy"
                  decoding="async"
                />

                {work.title ? (
                  <figcaption className="miscarriage-work__title">
                    {work.title}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>

        <div
          className="grotto-transition grotto-transition--miscarriage-phase"
          aria-hidden="true"
        />

        <section
          id="phase"
          className="grotto-section grotto-section--phase"
          aria-labelledby="phase-title"
        >
          <div className="grotto-section__question-block">
            <p className="grotto-section__question">
              Who are we while we are becoming someone we cannot yet recognize?
            </p>
          </div>

          <div className="grotto-wall-card">
            <h2 id="phase-title">Phase</h2>
            <p>
              The work investigates identity during periods of dissolution,
              attending to the unstable interval between one state of being and
              another.
            </p>
          </div>

          <ArtworkSequence
            artworks={artworkSets.phase}
            label="Phase artworks"
            mode="varied"
          />
        </section>
      </div>
    </section>
  );
}
