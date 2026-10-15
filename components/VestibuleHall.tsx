import { ArchitecturalLink } from "@/components/ArchitecturalLink";
import { ScrollBackLink } from "@/components/ScrollBackLink";

// The Vestibule at the top of each path (Exhibition, Red Room, Water Room):
// the page opens at the start of the path, and scrolling up walks back into
// the Vestibule, whose floor fades down into the path. The path's own label
// glides back down into it; the others lead to the start of their paths.
export function VestibuleHall({ path }: { path: "exhibition" | "red" | "water" | "current" }) {
  const door = (key: typeof path, href: string, label: string) =>
    key === path ? (
      <ScrollBackLink target="room-start" offset={0.3} className="architectural-link architectural-link--default">
        {label}
      </ScrollBackLink>
    ) : (
      <ArchitecturalLink href={href}>{label}</ArchitecturalLink>
    );

  return (
    <section id="vestibule-hall" className="vestibule-hall" data-audio-zone="vestibule" aria-label="Vestibule">
      <div className="vestibule-hall__environment" aria-hidden="true">
        <div className="vestibule__stone" />
        <div className="vestibule__shadow" />
      </div>

      <div className="vestibule__space vestibule-hall__room">
        <p className="room-label vestibule__room-label">Vestibule</p>

        <div className="vestibule__primary-passage">
          {door("exhibition", "/exhibition", "Exhibition")}
        </div>

        <nav className="vestibule__side-passages" aria-label="Paths from the vestibule">
          {door("red", "/red-room", "Red Room")}
          {door("water", "/water-room", "Water Room")}
          {door("current", "/current", "Current")}
        </nav>
      </div>
    </section>
  );
}
