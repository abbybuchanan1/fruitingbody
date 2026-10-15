import { Suspense } from "react";
import { ArtworkSequence } from "@/components/ArtworkSequence";
import { WaterRoomJunction } from "@/components/WaterRoomJunction";
import { NarthexHall } from "@/components/NarthexHall";
import { VestibuleHall } from "@/components/VestibuleHall";
import { RoomStart } from "@/components/RoomStart";
import { EndArrivalCue } from "@/components/EndArrivalCue";
import { HashScrollRestorer } from "@/components/HashScrollRestorer";
import { WorkIntroCard } from "@/components/WorkIntroCard";
import { museumWorksById } from "@/lib/works";
import { QuestionPrompt } from "@/components/QuestionPrompt";

const panels = ["A", "B", "C", "D"];

export default function WaterRoomPage() {
  const work = museumWorksById["body-of-water"];

  return (
    <main className="water-room" data-museum-location="water-room">
      <Suspense fallback={null}><HashScrollRestorer /></Suspense>
      <VestibuleHall path="water" />
      <RoomStart />
      <EndArrivalCue room="Water Room" />
      <div id="water-room-start" className="route-start-anchor" aria-hidden="true" />

      <div className="water-room__environment" aria-hidden="true">
        {panels.map((panel, index) => (
          <div className="water-room__environment-panel" data-panel-index={index} key={panel}>
            <img src={`/media/architecture/environments/water-room/water-room-environment-${panel}.jpg`} alt="" />
          </div>
        ))}
      </div>

      <header className="water-room__header">
        <div className="room-opening room-opening--water">
          <WorkIntroCard
            room="Water Room"
            title={work.title}
            statement={work.statement} reflection={work.reflection}
            note="Some works contain nudity and close studies of the human body."
            headingLevel={1}
          />
          <QuestionPrompt>{work.question}</QuestionPrompt>
        </div>
      </header>

      <section className="water-room-installation" aria-label="Body of Water">
        <ArtworkSequence artworks={work.exhibition} label="Body of Water works" mode="varied" eagerFirst />
      </section>

      <div id="body-of-water-end" className="return-anchor" aria-hidden="true" />
      <WaterRoomJunction />
      <NarthexHall path="water" />
    </main>
  );
}
