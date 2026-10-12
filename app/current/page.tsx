import { CurrentEmberSequence } from "@/components/CurrentEmberSequence";
import { WorkIntroCard } from "@/components/WorkIntroCard";
import { QuestionPrompt } from "@/components/QuestionPrompt";
import { NarthexHall } from "@/components/NarthexHall";
import { RoomStart } from "@/components/RoomStart";
import { VestibuleHall } from "@/components/VestibuleHall";
import { museumWorksById } from "@/lib/works";

// Current opens below the Vestibule (scroll up to walk back into it) and ends
// in the Narthex, like the paths.
export default function CurrentPage() {
  const work = museumWorksById.maria;

  return (
    <main className="current-exhibition" data-museum-location="current">
      <VestibuleHall path="current" />
      <RoomStart />
      <div className="current-exhibition__inner">
        <div className="room-opening">
          <WorkIntroCard
            room="Current"
            title={work.title}
            roomNote="A rotating room for the newest work in the practice."
            statement={work.statement} reflection={work.reflection}
            headingLevel={1}
          />
          <QuestionPrompt>{work.question}</QuestionPrompt>
        </div>

        <CurrentEmberSequence artworks={work.exhibition} />
      </div>
      <NarthexHall />
    </main>
  );
}
