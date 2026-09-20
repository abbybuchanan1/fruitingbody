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

        <nav className="narthex-room__paths" aria-label="Narthex destinations">
          <ArchitecturalLink href="/reading-room">Reading Room</ArchitecturalLink>
          <ArchitecturalLink href="/index">Index</ArchitecturalLink>
          <ArchitecturalLink href="/archive">Archive</ArchitecturalLink>
          <ArchitecturalLink href="/exit">Exit</ArchitecturalLink>
        </nav>

        <NarthexReturn />
      </div>
    </main>
  );
}
