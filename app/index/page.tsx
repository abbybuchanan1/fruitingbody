import Link from "next/link";
import { indexedCollections } from "@/lib/museum";

export default function IndexPage() {
  return (
    <main className="utility-page">
      <p className="eyebrow">Collections</p>
      <h1>Index</h1>

      <section aria-labelledby="index-collections-title">
        <h2 id="index-collections-title">Installed works</h2>
        <ul className="index-list">
          {indexedCollections.map((collection) => (
            <li key={collection.id}>
              <Link href={collection.href}>{collection.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="index-spaces-title">
        <h2 id="index-spaces-title">Museum</h2>
        <ul className="index-list">
          <li>
            <Link href="/current">Current</Link>
          </li>
          <li>
            <Link href="/reading-room">Reading Room</Link>
          </li>
          <li>
            <Link href="/archive">Archive</Link>
          </li>
          <li>
            <Link href="/narthex">Narthex</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
