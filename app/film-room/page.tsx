import { Room } from "@/components/Room";

export default function FilmRoomPage() {
  return (
    <Room
      eyebrow="Moving image"
      title="Films"
      environment="film"
    >
      <div data-museum-location="film-room">
        {/* Rotating FilmInstallation will live here. */}

        {/* Final spatial destination: Narthex. */}
      </div>
    </Room>
  );
}