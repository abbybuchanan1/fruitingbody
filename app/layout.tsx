import { Suspense } from "react";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./museum.css";
import { SiteNav } from "@/components/SiteNav";
import { MuseumAudio } from "@/components/MuseumAudio";
import { RoomImageViewer } from "@/components/RoomImageViewer";
import { DaylightClock } from "@/components/DaylightClock";
import { ReducedMotionVideos } from "@/components/ReducedMotionVideos";

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
  "A digital museum of self-portrait photography and poetry by Abby Buchanan, an interdisciplinary artist in Portland, Oregon.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fruitingbody.works"),
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: "Abby Buchanan" }],
  // Pages may be found in search; the photographs on them may not.
  robots: { index: true, follow: true, noimageindex: true },
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
// golden hour or blue hour. It is read before the first paint and holds while
// the visitor is in a room, so the light never shifts while someone is looking;
// walking into another room reads it again (components/DaylightClock).
// The hours follow the seasons: sunrise and sunset are estimated for a
// mid-northern latitude like Portland's (Dec ~4:30pm, Jun ~9pm sunset),
// turned the other way round in the southern hemisphere (told by when the
// visitor's clock keeps daylight saving), and milder where clocks never change.
//   golden: from 2¼ hours before sunset to ¼ hour after
//   blue:   from then until ¼ hour after sunrise
//   morning: the rest of the day
// ?light=morning|golden|blue previews a state for the rest of the visit;
// ?light=auto goes back to the clock.
const daylightScript = `(function(){
function now(){var d=new Date(),y=d.getFullYear();
var jan=new Date(y,0,1).getTimezoneOffset(),jul=new Date(y,6,1).getTimezoneOffset();
var hasDst=jan!==jul,south=hasDst&&jan<jul,dst=hasDst&&d.getTimezoneOffset()<Math.max(jan,jul);
var doy=Math.floor((d-new Date(y,0,0))/864e5);if(south)doy+=182;
var amp=hasDst?1:.45,c=Math.cos(2*Math.PI*(doy+10)/365);
var set=18.25-1.8*amp*c+(dst?1:0),rise=6.1+1.75*amp*c+(dst?1:0);
var h=d.getHours()+d.getMinutes()/60;
if(h>=set-2.25&&h<set+.25)return"golden";
if(h>=set+.25||h<rise+.25)return"blue";
return"morning";}
window.__fbDaylight=now;
try{var q=new URLSearchParams(location.search).get("light");var ok=q==="morning"||q==="golden"||q==="blue";
if(ok){try{sessionStorage.setItem("daylight-preview",q)}catch(e){}}
else if(q==="auto"){q=null;try{sessionStorage.removeItem("daylight-preview")}catch(e){}}
else{try{q=sessionStorage.getItem("daylight-preview")}catch(e){q=null}}
document.documentElement.setAttribute("data-daylight",q||now());}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={wayfinding.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: daylightScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <DaylightClock />
        <ReducedMotionVideos />
        <SiteNav />
        <Suspense fallback={null}><MuseumAudio /></Suspense>
        <div id="main-content">{children}</div>
        <RoomImageViewer />
      </body>
    </html>
  );
}
