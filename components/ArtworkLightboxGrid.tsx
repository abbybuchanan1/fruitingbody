"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { imageSizes } from "@/lib/image-sizes";

type LightboxImage = {
  src: string;
  alt: string;
  title?: string;
  group?: string;
  groupTitle?: string;
  breakBefore?: boolean;
};

const sizes = imageSizes;

// Width-to-height ratio from the manifest, so each thumbnail keeps the
// photograph's own shape (no cropping, no letterboxing).
function ratioOf(src: string) {
  const size = sizes[src];
  return size ? size[0] / size[1] : 0.8;
}

type Block = { key: string; title?: string; breakBefore?: boolean; items: Array<{ image: LightboxImage; index: number }> };

// Consecutive images that share a group (a Relative or Threshold pair) are
// kept together on one row with one caption.
function toBlocks(images: LightboxImage[]): Block[] {
  const blocks: Block[] = [];
  images.forEach((image, index) => {
    const last = blocks[blocks.length - 1];
    if (image.group && last && last.key === `g-${image.group}`) {
      last.items.push({ image, index });
      if (!last.title && image.groupTitle) last.title = image.groupTitle;
      return;
    }
    blocks.push({
      key: image.group ? `g-${image.group}` : `i-${index}`,
      breakBefore: image.breakBefore,
      title: image.group ? image.groupTitle : image.title,
      items: [{ image, index }],
    });
  });
  return blocks;
}

export function ArtworkLightboxGrid({
  images,
  mode,
}: {
  images: LightboxImage[];
  mode: "index" | "archive";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") {
        setOpenIndex((current) => current === null ? null : (current + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        setOpenIndex((current) => current === null ? null : (current - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, images.length]);

  const image = openIndex === null ? null : images[openIndex];

  return (
    <>
      <div className={`catalog-grid catalog-grid--${mode}`}>
        {toBlocks(images).map((block) => {
          const ratio = block.items.reduce((sum, { image: item }) => sum + ratioOf(item.src), 0);
          return [
            block.breakBefore ? <span className="catalog-break" key={`${block.key}-break`} aria-hidden="true" /> : null,
            <figure
              className={`catalog-block${block.items.length > 1 ? " catalog-block--group" : ""}`}
              key={block.key}
              style={{ "--ratio": ratio } as CSSProperties}
            >
              <div className="catalog-block__images">
                {block.items.map(({ image: item, index }) => (
                  <button
                    className="catalog-thumb"
                    type="button"
                    key={`${item.src}-${index}`}
                    onClick={() => setOpenIndex(index)}
                    aria-label={`Open ${item.title ?? item.alt} large`}
                    style={{ "--ratio": ratioOf(item.src) } as CSSProperties}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading={mode === "index" ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
              {block.title ? <figcaption className="catalog-block__title">{block.title}</figcaption> : null}
            </figure>,
          ];
        })}
      </div>

      {image ? (
        <div
          className="artwork-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={image.title ?? image.alt}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenIndex(null);
          }}
        >
          <button className="artwork-lightbox__close" type="button" onClick={() => setOpenIndex(null)}>
            Close
          </button>
          {images.length > 1 ? (
            <>
              <button
                className="artwork-lightbox__nav artwork-lightbox__nav--prev"
                type="button"
                onClick={() =>
                  setOpenIndex((current) =>
                    current === null ? null : (current - 1 + images.length) % images.length,
                  )
                }
                aria-label="Previous image"
              >
                Previous
              </button>
              <button
                className="artwork-lightbox__nav artwork-lightbox__nav--next"
                type="button"
                onClick={() =>
                  setOpenIndex((current) =>
                    current === null ? null : (current + 1) % images.length,
                  )
                }
                aria-label="Next image"
              >
                Next
              </button>
            </>
          ) : null}
          <figure className="artwork-lightbox__figure">
            <img src={image.src} alt={image.alt} />
            {image.title ?? image.groupTitle ? <figcaption>{image.title ?? image.groupTitle}</figcaption> : null}
          </figure>
        </div>
      ) : null}
    </>
  );
}
