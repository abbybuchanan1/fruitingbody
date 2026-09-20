import { Suspense } from "react";
import { RelativeSection } from "@/components/RelativeSection";
import { GardenSection } from "@/components/GardenSection";
import { GrottoSection } from "@/components/GrottoSection";
import { ThresholdSection } from "@/components/ThresholdSection";
import { NarthexTransition } from "@/components/NarthexTransition";
import { HashScrollRestorer } from "@/components/HashScrollRestorer";

export default function ExhibitionPage() {
  return (
    <main className="exhibition-scroll">
      <Suspense fallback={null}>
        <HashScrollRestorer />
      </Suspense>
      <RelativeSection />

      <div
        className="exhibition-transition exhibition-transition--relative-garden"
        aria-hidden="true"
      />

      <GardenSection />

      <div
        className="exhibition-transition exhibition-transition--garden-grotto"
        aria-hidden="true"
      />

      <GrottoSection />

      <div
        className="exhibition-transition exhibition-transition--grotto-threshold"
        aria-hidden="true"
      />

      <ThresholdSection />
      <div id="threshold-end" className="return-anchor" aria-hidden="true" />
      <Suspense fallback={null}>
        <NarthexTransition from="exhibition" />
      </Suspense>
    </main>
  );
}
