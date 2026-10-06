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
  stack?: string;
  sameHeight?: boolean;
};

const sizes = imageSizes;

// Width-to-height ratio from the manifest, so each thumbnail keeps the
// photograph's own shape (no cropping, no letterboxing).
function ratioOf(src: string) {
  const size = sizes[src];
  return size ? size[0] / size[1] : 0.8;
}

// Every single image shares one long edge: a landscape's width equals a
// portrait's height. Pairs (Relative, Threshold) keep one shared height so the
// two halves line up.
function thumbStyle(ratio: number, inPair: boolean, sameHeight = false): CSSProperties {
  if (sameHeight) {
    // Rows set to one height (Red Thread): every image is --edge tall.
    return {
      "--ratio": ratio,
      width: `calc(${ratio.toFixed(4)} * min(var(--edge), var(--fit-edge, 9999px)))`,
      height: "min(var(--edge), var(--fit-edge, 9999px))",
    } as CSSProperties;
  }
  if (inPair) {
    return { "--ratio": ratio, width: `calc(${ratio} * var(--row))`, height: "var(--row)" } as CSSProperties;
  }
  const w = Math.min(1, ratio);
  const h = Math.min(1, 1 / ratio);
  return {
    "--ratio": ratio,
    width: `calc(${w.toFixed(4)} * min(var(--edge), var(--fit-edge, 9999px)))`,
    height: `calc(${h.toFixed(4)} * min(var(--edge), var(--fit-edge, 9999px)))`,
  } as CSSProperties;
}

// A set of one shape stays on a single row on wider screens: the long edge
// shrinks just enough for every image to fit across.
function fitStyle(images: LightboxImage[]): CSSProperties | undefined {
  if (images.some((image) => image.sameHeight)) {
    // Rows of one height (Red Thread): the height shrinks just enough for the
    // widest row to fit across, so each row stays on one line.
    const rows: LightboxImage[][] = [];
    images.forEach((image, i) => {
      if (i === 0 || image.breakBefore) rows.push([]);
      rows[rows.length - 1].push(image);
    });
    const widest = rows.reduce(
      (best, row) => {
        const sum = row.reduce((total, image) => total + ratioOf(image.src), 0);
        return sum > best.sum ? { sum, n: row.length } : best;
      },
      { sum: 0, n: 1 },
    );
    return {
      "--fit-edge": `calc((100cqw - ${widest.n - 1} * 1.1rem - 2px) / ${widest.sum.toFixed(4)})`,
    } as CSSProperties;
  }
  if (!isUniform(images)) return undefined;
  const ratio = Math.min(1, ratioOf(images[0].src));
  const n = images.length;
  return {
    "--fit-edge": `calc((100cqw - ${n - 1} * 1.1rem - 2px) / ${(n * ratio).toFixed(4)})`,
  } as CSSProperties;
}

// A set whose images all share one shape (Fear Not, Phase) hangs larger.
function isUniform(images: LightboxImage[]) {
  if (images.length < 2 || images.some((image) => image.group)) return false;
  const ratios = images.map((image) => ratioOf(image.src));
  return Math.max(...ratios) / Math.min(...ratios) < 1.08;
}

type Block = { key: string; title?: string; breakBefore?: boolean; stack?: boolean; items: Array<{ image: LightboxImage; index: number }> };

// Consecutive images that share a group (a Relative or Threshold pair) are
// kept together on one row with one caption.
function toBlocks(images: LightboxImage[]): Block[] {
  const blocks: Block[] = [];
  images.forEach((image, index) => {
    const last = blocks[blocks.length - 1];
    if (image.stack && last && last.key === `s-${image.stack}`) {
      last.items.push({ image, index });
      return;
    }
    if (image.stack) {
      blocks.push({ key: `s-${image.stack}`, stack: true, breakBefore: image.breakBefore, items: [{ image, index }] });
      return;
    }
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
      <div
        className={`catalog-grid catalog-grid--${mode}${isUniform(images) ? " catalog-grid--uniform" : ""}${images.some((image) => image.sameHeight) ? " catalog-grid--rows" : ""}${images.some((image) => image.group) ? " catalog-grid--pairs" : ""}`}
        style={fitStyle(images)}
      >
        {toBlocks(images).map((block) => {
          const ratio = block.items.reduce((sum, { image: item }) => sum + ratioOf(item.src), 0);
          if (block.stack) {
            return [
              block.breakBefore ? <span className="catalog-break" key={`${block.key}-break`} aria-hidden="true" /> : null,
              <div className="catalog-stack" key={block.key}>
                {block.items.map(({ image: item, index }) => (
                  <figure className="catalog-block" key={`${item.src}-${index}`}>
                    <div className="catalog-block__images">
                      <button
                        className="catalog-thumb"
                        type="button"
                        onClick={() => setOpenIndex(index)}
                        aria-label={`Open ${item.title ?? item.alt} large`}
                        style={thumbStyle(ratioOf(item.src), false, item.sameHeight)}
                      >
                        <img src={item.src} alt={item.alt} loading={mode === "index" ? "eager" : "lazy"} decoding="async" />
                      </button>
                    </div>
                    {item.title ? <figcaption className="catalog-block__title">{item.title}</figcaption> : null}
                  </figure>
                ))}
              </div>,
            ];
          }
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
                    style={thumbStyle(ratioOf(item.src), block.items.length > 1, item.sameHeight)}
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
