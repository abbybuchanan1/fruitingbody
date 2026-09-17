"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MuseumMap } from "@/components/MuseumMap";
import type { MuseumRoomId } from "@/lib/museum";

function getCurrentLocation(pathname: string): MuseumRoomId | undefined {
  if (pathname === "/vestibule") return "vestibule";
  if (pathname === "/red-room") return "red-room";
  if (pathname === "/water-room") return "water-room";
  if (pathname === "/film-room") return "film-room";
  if (pathname === "/current") return "current";
  if (pathname === "/narthex") return "narthex";
  if (pathname === "/reading-room") return "reading-room";
  if (pathname === "/index" || pathname === "/directory") return "index";
  if (pathname === "/archive") return "archive";
  if (pathname === "/cloisters") return "cloisters";
  if (pathname === "/exit") return "exit-exterior";

  /*
   * The continuous exhibition spans four physical rooms:
   * Front Gallery → Garden → Grotto → Rear Gallery.
   *
   * Scroll-aware room detection will determine which of those
   * rooms is active once that layer is installed.
   */
  if (pathname === "/exhibition") return undefined;

  return undefined;
}

export function SiteNav() {
  const pathname = usePathname();
  const [mapOpen, setMapOpen] = useState(false);

  if (pathname === "/") {
    return null;
  }

  const currentLocation = getCurrentLocation(pathname);

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

        <Link href="/index">Index</Link>
      </nav>

      <MuseumMap
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        currentLocation={currentLocation}
      />
    </>
  );
}