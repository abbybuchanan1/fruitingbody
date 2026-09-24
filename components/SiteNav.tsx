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
  const exhibitionLocation = useExhibitionLocation(pathname);

  if (pathname === "/") {
    return null;
  }

  const currentLocation =
    pathname === "/exhibition"
      ? exhibitionLocation
      : getRouteLocation(pathname);

  return (
    <>
      <nav className="site-nav" aria-label="Museum navigation">
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
        <Link href="/archive">Archive</Link>
      </nav>

      <MuseumMap
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        currentLocation={currentLocation}
      />
    </>
  );
}
