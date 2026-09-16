import { thresholdPairs } from "@/lib/artworks";

export function ThresholdSection() {
  return (
    <section className="threshold-page">
      <div
        className="threshold-environment"
        aria-hidden="true"
      />

      <div className="threshold-content">

        <section
          id="threshold"
          className="threshold-section"
          aria-labelledby="threshold-title"
        >

          <div className="threshold-section__question-block">
            <p className="threshold-section__eyebrow">
              Threshold
            </p>

            <p className="threshold-section__question">
              What occurs in the space between what has ended
              and what has not yet emerged?
            </p>
          </div>


          

          <div
            className="threshold-pairs"
            aria-label="Threshold diptychs"
          >
            {thresholdPairs.map((pair) => (
              <figure
                className={`threshold-pair threshold-pair--${pair.id}`}
                key={pair.id}
              >
                <div className="threshold-pair__image threshold-pair__image--a">
                  <img
                    src={pair.a.src}
                    alt={pair.a.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="threshold-pair__image threshold-pair__image--b">
                  <img
                    src={pair.b.src}
                    alt={pair.b.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </figure>
            ))}
          </div>

        </section>

      </div>
    </section>
  );
}