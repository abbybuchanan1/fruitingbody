import Link from "next/link";
import { CurrentEmberSequence } from "@/components/CurrentEmberSequence";
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
        </div>

        <CurrentEmberSequence artworks={work.exhibition} />

        <Link className="current-room__return" href="/vestibule">
          Return to Vestibule
        </Link>
      </div>
    </main>
  );
}
