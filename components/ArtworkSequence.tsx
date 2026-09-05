import type { Artwork } from "@/lib/artworks";

type Props = {
  artworks: Artwork[];
  label: string;
  mode?: "standard" | "immersive" | "intimate" | "paired" | "varied";
  eagerFirst?: boolean;
};

export function ArtworkSequence({ artworks, label, mode = "standard", eagerFirst = false }: Props) {
  return (
    <section className={`art-sequence art-sequence--${mode}`} aria-label={label}>
      {artworks.map((artwork, index) => (
        <figure className="artwork-image" key={artwork.src}>
          {/* Native img is deliberate in this prototype: exported WebP assets are already optimized. */}
          <img
            src={artwork.src}
            alt={artwork.alt}
            loading={eagerFirst && index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </figure>
      ))}
    </section>
  );
}
