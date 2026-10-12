import { ExitFilmPlaylist } from "@/components/ExitFilmPlaylist";
import { NarthexHall } from "@/components/NarthexHall";
import { RoomStart } from "@/components/RoomStart";

// The Courtyard: reached by its door in the Narthex (or the Map). The films
// fill the screen, full bleed. Scrolling up or down walks back in through the
// darkness by the doors and into the Narthex.
export default function ExitPage() {
  return (
    <main className="exit-page" data-museum-location="exit-exterior">
      <section className="exit-exterior" aria-label="Courtyard">
        <ExitFilmPlaylist />
        <div className="exit-exterior__veil" aria-hidden="true" />
        <div className="exit-exterior__ui">
          <p className="exit-exterior__label">Courtyard</p>
        </div>
      </section>
      <NarthexHall variant="above" from="courtyard" />
      <div className="exit-page__doors exit-page__doors--above" aria-hidden="true" />
      <RoomStart />
      <div className="exit-page__open-air" aria-hidden="true" />
      <div className="exit-page__doors" aria-hidden="true" />
      <NarthexHall from="courtyard" />
    </main>
  );
}
