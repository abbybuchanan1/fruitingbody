import Link from "next/link";
import { collections } from "@/lib/collections";

export default function MapPage() {
  return (
    <main className="utility-page">
      <p className="eyebrow">Orientation</p>
      <h1>Map</h1>
      <div className="map-plan" aria-label="Museum floor plan">
        <Link href="/vestibule">Vestibule</Link>
        <Link href="/membrane">Membrane</Link>
        <Link href="/courtyard">Courtyard / Cloister</Link>
        <Link href="/dark-garden">Dark Garden</Link>
        <Link href="/grotto">Grotto</Link>
        <Link href="/light-garden">Light Garden</Link>
        <Link href="/threshold">Threshold</Link>
        <Link href="/back-corridor">Back Corridor</Link>
        <Link href="/red-room">Red Room</Link>
        <Link href="/narthex">Narthex</Link>
        {collections.map((collection) => (
          <Link key={collection.slug} href={`/collections/${collection.slug}`}>{collection.title}</Link>
        ))}
        <Link href="/reading-room">Reading Room</Link>
        <Link href="/archive">Archive</Link>
      </div>
    </main>
  );
}
