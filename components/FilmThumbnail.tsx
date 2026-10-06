import Link from "next/link";

// A still from the Body of Water film that opens the Film Room. Hung at the
// catalog's long edge so it sits with the photographs around it.
export function FilmThumbnail() {
  return (
    <div className="catalog-grid catalog-film">
      <figure className="catalog-block">
        <Link className="catalog-film__link" href="/film-room?from=water-room" aria-label="Watch the Body of Water film">
          <img src="/media/films/body-of-water-film-poster.jpg" alt="Still from the Body of Water film: the waterline and ripples." loading="lazy" decoding="async" />
          <span className="catalog-film__play" aria-hidden="true" />
        </Link>
        <figcaption className="catalog-block__title">Body of Water · Film, 1:21</figcaption>
      </figure>
    </div>
  );
}
