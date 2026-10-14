import Link from "next/link";
import { CloistersFilm } from "@/components/CloistersFilm";

// The Cloisters: a walkway beside the Grotto, reached from either side of the
// votive lamps. Each side opens the film at a different point; both edges of
// the walkway lead back to the votives where the visitor left.
const START = { left: 6, right: 41 } as const;

type Props = { searchParams: Promise<{ from?: string }> };

export default async function CloistersPage({ searchParams }: Props) {
  const { from } = await searchParams;
  const startAt = from === "grotto-left" ? START.left : from === "grotto-right" ? START.right : undefined;
  const back = "/exhibition?jump=grotto-cloisters";

  return (
    <main className="cloisters-film" data-museum-location="cloisters">
      <CloistersFilm startAt={startAt} />
      <div className="cloisters-film__veil" aria-hidden="true" />
      <p className="room-label cloisters-film__room-label">Cloisters</p>
      <nav className="cloisters-returns" aria-label="Back to the Grotto">
        <Link className="cloisters-return cloisters-return--left" href={back}>Grotto</Link>
        <Link className="cloisters-return cloisters-return--right" href={back}>Grotto</Link>
      </nav>
    </main>
  );
}
