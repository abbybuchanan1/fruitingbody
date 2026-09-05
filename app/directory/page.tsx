import Link from "next/link";
import { collections } from "@/lib/collections";

export default function IndexPage() {
  return (
    <main className="utility-page">
      <p className="eyebrow">Fast access</p>
      <h1>Index</h1>
      <section>
        <h2>Collections</h2>
        <ul className="index-list">
          {collections.map((collection) => (
            <li key={collection.slug}><Link href={`/collections/${collection.slug}`}>{collection.title}</Link></li>
          ))}
          <li><Link href="/red-room">Red Thread / Shelter / Unravel</Link></li>
          <li><Link href="/membrane">Membrane</Link></li>
          <li><Link href="/dark-garden">Fear Not</Link></li>
          <li><Link href="/grotto">A Miscarriage / Winter-Phase / Daffodils</Link></li>
          <li><Link href="/light-garden">Taste and See</Link></li>
          <li><Link href="/threshold">Threshold</Link></li>
        </ul>
      </section>
      <section>
        <h2>Institution</h2>
        <ul className="index-list">
          <li><Link href="/reading-room">Reading Room</Link></li>
          <li><Link href="/archive">Archive</Link></li>
          <li><Link href="/map">Map</Link></li>
        </ul>
      </section>
    </main>
  );
}
