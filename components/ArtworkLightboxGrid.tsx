"use client";

import { useEffect, useState } from "react";

type LightboxImage = {
  src: string;
  alt: string;
  title?: string;
};

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
      <div className={mode === "index" ? "index-work__grid" : "archive-work__grid"}>
        {images.map((item, index) => (
          <figure
            className={mode === "index" ? "index-thumb" : "archive-image"}
            key={`${item.src}-${index}`}
          >
            <button
              className="artwork-lightbox-trigger"
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open ${item.title ?? item.alt} large`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading={mode === "index" ? "eager" : "lazy"}
                decoding="async"
              />
            </button>
            {item.title ? <figcaption>{item.title}</figcaption> : null}
          </figure>
        ))}
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
            {image.title ? <figcaption>{image.title}</figcaption> : null}
          </figure>
        </div>
      ) : null}
    </>
  );
}
