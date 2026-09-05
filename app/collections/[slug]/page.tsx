import { notFound } from "next/navigation";
import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { ArtworkSequence } from "@/components/ArtworkSequence";
import { Room } from "@/components/Room";
import { getCollection } from "@/lib/collections";
import { artworkSets } from "@/lib/artworks";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const exits = {
    relative: [
      { href: "/vestibule", label: "Vestibule" },
      { href: "/narthex", label: "Narthex" },
      { href: "/back-corridor", label: "Back corridor" },
    ],
    "body-of-water": [
      { href: "/vestibule", label: "Vestibule" },
      { href: "/narthex", label: "Narthex" },
      { href: "/courtyard", label: "Cloister" },
    ],
    "selected-works": [
      { href: "/vestibule", label: "Vestibule" },
      { href: "/back-corridor", label: "Back corridor" },
      { href: "/courtyard", label: "Courtyard" },
    ],
  }[slug] ?? [{ href: "/courtyard", label: "Cloister" }];

  const sets = {
    relative: artworkSets.relative,
    "body-of-water": artworkSets.bodyOfWater,
    "selected-works": artworkSets.selectedWorks,
  } as const;
  const modes = {
    relative: "paired",
    "body-of-water": "immersive",
    "selected-works": "standard",
  } as const;

  return (
    <Room eyebrow="Collection" title={collection.title} question={collection.question} environment={collection.environment}>
      <ArtworkSequence artworks={sets[slug as keyof typeof sets]} label={`${collection.title} artworks`} mode={modes[slug as keyof typeof modes]} eagerFirst />
      <div className="branch-grid" aria-label={`Exits from ${collection.title}`}>
        {exits.map((exit) => (
          <ArchitecturalLink key={exit.href} href={exit.href}>{exit.label}</ArchitecturalLink>
        ))}
      </div>
    </Room>
  );
}
