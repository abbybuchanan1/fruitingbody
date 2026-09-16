import { notFound } from "next/navigation";
import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { ArtworkSequence } from "@/components/ArtworkSequence";
import { RelativeDiptychSequence } from "@/components/RelativeDiptychSequence";
import { Room } from "@/components/Room";
import { getCollection } from "@/lib/collections";
import {
  artworkSets,
  relativePairs,
} from "@/lib/artworks";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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


  /* ========================================
     RELATIVE
     ======================================== */

  if (slug === "relative") {
  return (
    <main className="relative-page">
      <img
        className="relative-environment"
        src="/media/architecture/environments/relative/relative-environment-composite.jpg"
        alt=""
        aria-hidden="true"
      />

      <div className="relative-content">
        <header className="relative-intro">
          <p className="relative-intro__eyebrow">
            Collection
          </p>

          <h1>
            Relative
          </h1>

          <p className="relative-intro__question">
            What becomes visible when the body is understood
            as part of the same living system as the land?
          </p>

          <p className="relative-intro__content-note">
            Some works contain nudity and close studies of the human body.
          </p>

          <div className="relative-wall-card">
            <p>
              The work investigates the ways bodies and landscapes
              participate in the same forces rather than functioning
              as metaphors for one another.
            </p>
          </div>
        </header>

        <RelativeDiptychSequence
          pairs={relativePairs}
        />

        <nav
          className="relative-exits"
          aria-label="Exits from Relative"
        >
          {exits.map((exit) => (
            <ArchitecturalLink
              key={exit.href}
              href={exit.href}
            >
              {exit.label}
            </ArchitecturalLink>
          ))}
        </nav>
      </div>
    </main>
  );
}
  /* ========================================
     OTHER COLLECTIONS
     ======================================== */

  return (
    <Room
      eyebrow="Collection"
      title={collection.title}
      question={collection.question}
      environment={collection.environment}
    >
      <ArtworkSequence
        artworks={sets[slug as keyof typeof sets]}
        label={`${collection.title} artworks`}
        mode={modes[slug as keyof typeof modes]}
        eagerFirst
      />

      <div
        className="branch-grid"
        aria-label={`Exits from ${collection.title}`}
      >
        {exits.map((exit) => (
          <ArchitecturalLink
            key={exit.href}
            href={exit.href}
          >
            {exit.label}
          </ArchitecturalLink>
        ))}
      </div>
    </Room>
  );
}