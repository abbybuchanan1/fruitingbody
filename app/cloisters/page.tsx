import { CloistersFilm } from "@/components/CloistersFilm";

export default function CloistersPage() {
  return (
    <main className="cloisters-film" data-museum-location="cloisters">
      <CloistersFilm />
      <div className="cloisters-film__veil" aria-hidden="true" />
      <header className="cloisters-film__label">
        <p>Cloisters</p>
      </header>
    </main>
  );
}
