import { RelativeSection } from "@/components/RelativeSection";
import { GardenSection } from "@/components/GardenSection";
import { GrottoSection } from "@/components/GrottoSection";
import { ThresholdSection } from "@/components/ThresholdSection";

export default function ExhibitionPage() {
  return (
    <main className="exhibition-scroll">

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

    </main>
  );
}