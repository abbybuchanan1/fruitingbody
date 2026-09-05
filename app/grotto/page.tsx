import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { ArtworkSequence } from "@/components/ArtworkSequence";
import { Room } from "@/components/Room";
import { artworkSets } from "@/lib/artworks";

export default function GrottoPage() {
  return (
    <Room eyebrow="Inner chambers" title="Grotto" environment="grotto">
      <p className="room__body">The works become smaller, closer, and more private. The chambers can be left at any time.</p>
      <div className="grotto-chambers">
        <section className="grotto-chamber">
          <h2>A Miscarriage</h2>
          <ArtworkSequence artworks={artworkSets.miscarriage} label="A Miscarriage works" mode="intimate" />
        </section>
        <section className="grotto-chamber">
          <h2>Winter / Phase</h2>
          <ArtworkSequence artworks={artworkSets.phase} label="Winter / Phase works" mode="intimate" />
        </section>
        <section className="grotto-chamber">
          <h2>This Morning I Was Gathering Daffodils</h2>
          <ArtworkSequence artworks={artworkSets.daffodils} label="Daffodils works" mode="varied" />
        </section>
        <section className="grotto-chamber">
          <h2>Maria Burns Her Wedding Dress</h2>
          <ArtworkSequence artworks={artworkSets.maria} label="Maria Burns Her Wedding Dress works" mode="intimate" />
        </section>
        <aside className="grotto-hidden" aria-label="Future grotto chamber">
          <span>an unopened chamber</span>
        </aside>
      </div>
      <ArchitecturalLink href="/light-garden" tone="light">Toward light</ArchitecturalLink>
    </Room>
  );
}
