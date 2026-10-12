import { NarthexHall } from "@/components/NarthexHall";

// The Map's Narthex: the same room each path ends in, on its own page.
// (The earlier film-arrival version is kept in NarthexAmbientVideo,
// NarthexReturn and NarthexTransition for an easy revert.)
export default function NarthexPage() {
  return (
    <main id="narthex-start" className="narthex-page" data-museum-location="narthex">
      <NarthexHall variant="room" />
    </main>
  );
}
