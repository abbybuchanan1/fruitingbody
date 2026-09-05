import type { Artwork } from "@/lib/artworks";

type Props = {
  artworks: Artwork[];
};

const planeClasses = [
  "membrane-plane--encounter",
  "membrane-plane--approach",
  "membrane-plane--compression",
  "membrane-plane--crossing",
  "membrane-plane--release",
  "membrane-plane--emergence",
];

export function MembraneInstallation({ artworks }: Props) {
  return (
    <section
      className="membrane-planes"
      aria-label="Membrane works"
    >
      {artworks.map((artwork, index) => {
        const planeClass =
          planeClasses[index] ?? "membrane-plane--emergence";

        return (
          <div
            className={`membrane-plane-stage ${planeClass}`}
            key={artwork.src}
          >
            <figure className="membrane-plane">
              <div
                className="membrane-plane__scrim"
                aria-hidden="true"
              />

              <img
                src={artwork.src}
                alt={artwork.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </figure>
          </div>
        );
      })}
    </section>
  );
}