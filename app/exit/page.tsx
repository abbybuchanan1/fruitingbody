import Link from "next/link";
import { ExitFilmPlaylist } from "@/components/ExitFilmPlaylist";

export default function ExitPage() {
  return (
    <main className="exit-exterior" data-museum-location="exit-exterior">
      <ExitFilmPlaylist />
      <div className="exit-exterior__veil" aria-hidden="true" />
      <div className="exit-exterior__ui">
        <p className="exit-exterior__label">Exterior</p>
        <Link className="exit-exterior__return" href="/narthex?arrived=1">Return to Narthex</Link>
      </div>
    </main>
  );
}
