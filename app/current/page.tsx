import Link from "next/link";
import { ArtworkSequence } from "@/components/ArtworkSequence";
import { WorkIntroCard } from "@/components/WorkIntroCard";
import { museumWorksById } from "@/lib/works";

export default function CurrentPage() {
  const work = museumWorksById.maria;

  return (
    <main className="current-exhibition" data-museum-location="current">
      <div className="current-exhibition__inner">
        <div className="room-opening">
          <WorkIntroCard
            room="Current"
            title={work.title}
            statement={work.statement}
            headingLevel={1}
          />
          <p className="room-opening__question">{work.question}</p>
        </div>

        <ArtworkSequence artworks={work.exhibition} label={work.title} mode="varied" />

        <Link className="current-room__return" href="/vestibule">
          Return to Vestibule
        </Link>
      </div>
    </main>
  );
}
