import Image from "next/image";
import Link from "next/link";

export default function ExteriorPage() {
  return (
    <main className="museum-exterior">
      <Image
        src="/media/architecture/stone-exterior-wide-1.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="museum-exterior__image"
      />

      <div className="museum-exterior__sign">
        Fruiting Body
      </div>

      <Link
        href="/vestibule"
        aria-label="Enter Fruiting Body"
        className="museum-exterior__door"
      />
    </main>
  );
}