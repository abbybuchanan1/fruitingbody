import { Room } from "@/components/Room";

export default function WaterRoomPage() {
  return (
    <Room
      eyebrow="Continuous exhibition"
      title="Water Room"
      environment="water"
    >
      <div data-museum-location="water-room">
        {/* Body of Water installation will live here. */}

        {/* Final junction:
            Narthex ← moving architectural passage
            Film Room → moving artwork passage
        */}
      </div>
    </Room>
  );
}