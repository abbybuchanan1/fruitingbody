"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteNav() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="site-nav" aria-label="Museum navigation">
      <Link href="/map">Map</Link>
      <Link href="/index">Index</Link>
    </nav>
  );
}