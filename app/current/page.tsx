import Link from "next/link";
import { Room } from "@/components/Room";

export default function CurrentPage() {
  return (
    <Room eyebrow="Current exhibition" title="Current" environment="current">
      <div data-museum-location="current" className="current-room__content">
        {/* Current exhibition content remains data-driven in the next utility pass. */}
      </div>

      <Link className="current-room__return" href="/vestibule">
        Return to Vestibule
      </Link>
    </Room>
  );
}
