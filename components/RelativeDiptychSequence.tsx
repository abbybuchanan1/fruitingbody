import type { RelativePair } from "@/lib/artworks";

export function RelativeDiptychSequence({
  pairs,
}: {
  pairs: RelativePair[];
}) {
  return (
    <section
      className="relative-pairs"
      aria-label="Relative diptychs"
    >
      {pairs.map((pair, index) => (
        <figure
          className={`relative-pair relative-pair--${pair.layout}`}
          key={pair.id}
        >
          <div className="relative-pair__image relative-pair__image--a">
            <img
              src={pair.a.src}
              alt={pair.a.alt}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>

          <div className="relative-pair__image relative-pair__image--b">
            <img
              src={pair.b.src}
              alt={pair.b.alt}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        </figure>
      ))}
    </section>
  );
}