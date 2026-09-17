import { Room } from "@/components/Room";

export default function CurrentPage() {
  return (
    <Room
      eyebrow="Current exhibition"
      title="Current"
      environment="current"
    >
      <div data-museum-location="current">
        {/* Current exhibition title, wall card,
            works, location and event information
            will be data-driven here. */}
      </div>
    </Room>
  );
}