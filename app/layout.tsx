import { Suspense } from "react";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./museum.css";
import { SiteNav } from "@/components/SiteNav";
import { MuseumAudio } from "@/components/MuseumAudio";
import { RoomImageViewer } from "@/components/RoomImageViewer";

// Wayfinding face for the Map, Index and Sound controls: a Futura-lineage
// geometric sans, the kind used on printed museum plans and signage.
const wayfinding = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-wayfinding",
  display: "swap",
});

const siteTitle = "Fruiting Body — Abby Buchanan";
const siteDescription =
  "Fruiting Body is a digital museum of photographic work and poetry by Abby Buchanan, a Portland, Oregon artist working in self-portraiture.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fruitingbody.works"),
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: "Abby Buchanan" }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Fruiting Body",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "A figure wrapped in red fabric floating in a river gorge.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
};

// The building's light follows the visitor's own time of day: mid-morning,
// golden hour or blue hour. It is read once, before the first paint, and holds
// for the whole visit so the light never shifts while someone is looking.
// ?light=morning|golden|blue previews a state.
const daylightScript = `(function(){try{var q=new URLSearchParams(location.search).get("light");var d=new Date();var h=d.getHours()+d.getMinutes()/60;var s=(q==="morning"||q==="golden"||q==="blue")?q:(h>=6&&h<16?"morning":(h>=16&&h<19.5?"golden":"blue"));document.documentElement.setAttribute("data-daylight",s);}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={wayfinding.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: daylightScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteNav />
        <Suspense fallback={null}><MuseumAudio /></Suspense>
        <div id="main-content">{children}</div>
        <RoomImageViewer />
      </body>
    </html>
  );
}
