import { ExitFilmPlaylist } from "@/components/ExitFilmPlaylist";
import { NarthexHall } from "@/components/NarthexHall";

// The Courtyard: the films fill the first screen; scrolling down walks back
// into the Narthex (the same room every path ends in).
export default function ExitPage() {
  return (
    <main className="exit-page" data-museum-location="exit-exterior">
      <section className="exit-exterior" aria-label="Courtyard">
        <ExitFilmPlaylist />
        <div className="exit-exterior__veil" aria-hidden="true" />
        {/* The light falls away at the foot of the Courtyard: walking back in
            through the doors, before the Narthex floor appears. */}
        <div className="exit-exterior__dusk" aria-hidden="true" />
        <div className="exit-exterior__ui">
          <p className="exit-exterior__label">Courtyard</p>
          <a className="exit-exterior__return" href="#narthex">Return to Narthex</a>
        </div>
      </section>
      <NarthexHall />
    </main>
  );
}
