import { ExitFilmPlaylist } from "@/components/ExitFilmPlaylist";
import { NarthexHall } from "@/components/NarthexHall";

// The Courtyard: reached by its door in the Narthex (or the Map). The films
// fill the screen, full bleed; scrolling down walks back in through the
// darkness by the doors and into the Narthex, and up again goes back out.
export default function ExitPage() {
  return (
    <main id="room-top" className="exit-page" data-museum-location="exit-exterior">
      <section className="exit-exterior" aria-label="Courtyard">
        <ExitFilmPlaylist />
        <div className="exit-exterior__veil" aria-hidden="true" />
        <div className="exit-exterior__ui">
          <p className="exit-exterior__label">Courtyard</p>
        </div>
      </section>
      <div className="exit-page__open-air" aria-hidden="true" />
      <div className="exit-page__doors" aria-hidden="true" />
      <NarthexHall from="courtyard" />
    </main>
  );
}
