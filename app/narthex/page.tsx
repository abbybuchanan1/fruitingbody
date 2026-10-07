import Link from "next/link";
import { Suspense } from "react";
import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { NarthexAmbientVideo } from "@/components/NarthexAmbientVideo";
import { NarthexReturn } from "@/components/NarthexReturn";

export default function NarthexPage() {
  return (
    <main id="narthex-start" className="narthex-room" data-museum-location="narthex">
      <Suspense fallback={null}>
        <NarthexAmbientVideo />
      </Suspense>
      <div className="narthex-room__veil" aria-hidden="true" />

      <div className="narthex-room__ui">
        <p className="narthex-room__label">Narthex</p>

        <nav className="narthex-room__returns narthex-room__courtyard" aria-label="To the Courtyard">
          <span className="narthex-room__returns-label">Go to</span>
          <div className="narthex-room__return-links">
            <Link className="narthex-room__return" href="/exit">Courtyard</Link>
          </div>
        </nav>

        <nav className="narthex-room__paths" aria-label="Narthex destinations">
          <ArchitecturalLink href="/reading-room">Reading Room</ArchitecturalLink>
          <ArchitecturalLink href="/directory">Index</ArchitecturalLink>
          <ArchitecturalLink href="/archive">Archive</ArchitecturalLink>
          <a className="architectural-link architectural-link--default" href="/directory#contact">Contact</a>
        </nav>

        <NarthexReturn />
      </div>
    </main>
  );
}
