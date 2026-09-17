import { Room } from "@/components/Room";

export default function CloistersPage() {
  return (
    <Room
      eyebrow="Cloisters"
      title="Cloisters"
      environment="cloisters"
    >
      <div data-museum-location="cloisters">
        {/* Persistent environmental video will live here.
            This room will ultimately be entered through Map,
            not ordinary Index/gallery navigation. */}
      </div>
    </Room>
  );
}