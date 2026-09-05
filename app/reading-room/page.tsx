import { Room } from "@/components/Room";

export default function ReadingRoomPage() {
  return (
    <Room eyebrow="Language collection" title="Reading Room" environment="reading-room">
      <article className="reading-surface">
        <h2>Poetry will live here</h2>
        <p>The first build uses real semantic text and generous measure. No simulated bookshelves or page-turning interface.</p>
      </article>
    </Room>
  );
}
