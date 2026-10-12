"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MuseumMap } from "@/components/MuseumMap";
import type { MuseumRoomId } from "@/lib/museum";

const exhibitionRooms: Array<{ id: string; room: MuseumRoomId }> = [
  { id: "relative", room: "front-gallery" },
  { id: "garden", room: "garden" },
  { id: "grotto", room: "grotto" },
  { id: "threshold", room: "rear-gallery" },
  { id: "narthex", room: "narthex" },
];

// The Red Room and Water Room each end in their own Narthex: the plan shows
// the Narthex once the visitor has scrolled into it.
function narthexReached() {
  const narthex = document.querySelector<HTMLElement>("#narthex .narthex-hall__room");
  if (!narthex) return false;
  return narthex.getBoundingClientRect().top <= window.innerHeight * 0.38;
}

// Rooms whose walls are dark: the Map and Index cards switch to light
// lettering on a faint dark glass there, and to dark lettering elsewhere.
const DARK_ROOMS: MuseumRoomId[] = [
  "vestibule", "garden", "grotto", "water-room", "film-room",
  "current", "cloisters", "exit-exterior", "reading-room",
];

function getRouteLocation(pathname: string): MuseumRoomId | undefined {
  if (pathname === "/") return "exterior";
  if (pathname === "/vestibule") return "vestibule";
  if (pathname === "/red-room") return "red-room";
  if (pathname === "/water-room") return "water-room";
  if (pathname === "/film-room") return "film-room";
  if (pathname === "/current") return "current";
  if (pathname === "/narthex") return "narthex";
  if (pathname.startsWith("/reading-room")) return "reading-room";
  if (pathname === "/index" || pathname === "/directory") return "index";
  if (pathname === "/archive") return "archive";
  if (pathname === "/cloisters") return "cloisters";
  if (pathname === "/exit") return "exit-exterior";

  return undefined;
}

function useExhibitionLocation(pathname: string) {
  const [location, setLocation] = useState<MuseumRoomId | undefined>();

  useEffect(() => {
    const sideRooms: Record<string, MuseumRoomId> = {
      "/red-room": "red-room",
      "/water-room": "water-room",
      "/reading-room": "reading-room",
      "/archive": "archive",
    };
    if (sideRooms[pathname]) {
      const fallback = sideRooms[pathname];
      const update = () => setLocation(narthexReached() ? "narthex" : fallback);
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      return () => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      };
    }

    if (pathname !== "/exhibition") {
      setLocation(undefined);
      return;
    }

    const updateLocation = () => {
      const probe = window.innerHeight * 0.38;
      let nearest: { room: MuseumRoomId; distance: number } | undefined;

      for (const target of exhibitionRooms) {
        const element = document.getElementById(target.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= probe && rect.bottom > probe) {
          setLocation(target.room);
          return;
        }

        const distance = Math.min(
          Math.abs(rect.top - probe),
          Math.abs(rect.bottom - probe),
        );

        if (!nearest || distance < nearest.distance) {
          nearest = { room: target.room, distance };
        }
      }

      setLocation(nearest?.room ?? "front-gallery");
    };

    updateLocation();
    window.addEventListener("scroll", updateLocation, { passive: true });
    window.addEventListener("resize", updateLocation);

    return () => {
      window.removeEventListener("scroll", updateLocation);
      window.removeEventListener("resize", updateLocation);
    };
  }, [pathname]);

  return location;
}

export function SiteNav() {
  const pathname = usePathname();
  const [mapOpen, setMapOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContactOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(".site-nav__contact-wrap")) setContactOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [contactOpen]);

  useEffect(() => setContactOpen(false), [pathname]);
  const exhibitionLocation = useExhibitionLocation(pathname);

  const currentLocation =
    ["/exhibition", "/red-room", "/water-room", "/reading-room", "/archive"].includes(pathname)
      ? exhibitionLocation ?? getRouteLocation(pathname)
      : getRouteLocation(pathname);
  const tone = currentLocation && DARK_ROOMS.includes(currentLocation) ? "dark" : "light";

  // The Sound control lives outside this nav, so the tone is also set on the
  // page root for it to follow.
  useEffect(() => {
    document.documentElement.dataset.navTone = tone;
  }, [tone]);

  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <nav
        className="site-nav"
        aria-label="Museum navigation"
        data-tone={tone}
      >
        <button
          type="button"
          className="site-nav__map"
          onClick={() => setMapOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={mapOpen}
        >
          Map
        </button>

        <Link href="/directory">Index</Link>

        {/* Contact: a quiet line under Index on every room. */}
        <div className="site-nav__contact-wrap">
          <button
            type="button"
            className="site-nav__contact"
            onClick={() => setContactOpen((open) => !open)}
            aria-expanded={contactOpen}
            aria-controls="site-contact"
          >
            Contact
          </button>
          {contactOpen ? (
            <div id="site-contact" className="site-contact" role="dialog" aria-label="Contact">
              <p className="site-contact__name">Abby Buchanan</p>
              <a className="site-contact__email" href="mailto:abby@fruitingbody.works">abby@fruitingbody.works</a>
              <p className="site-contact__note">
                Open to representation, exhibitions and print inquiries.
              </p>
            </div>
          ) : null}
        </div>
      </nav>

      <MuseumMap
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        currentLocation={currentLocation}
      />
    </>
  );
}
