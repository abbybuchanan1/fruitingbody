import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import "./next-pass.css";
import { SiteNav } from "@/components/SiteNav";
import { MuseumAudio } from "@/components/MuseumAudio";

export const metadata: Metadata = {
  title: "Fruiting Body",
  description: "A digital museum for an evolving artistic practice.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteNav />
        <Suspense fallback={null}><MuseumAudio /></Suspense>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
