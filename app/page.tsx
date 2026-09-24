"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ExteriorShadowPass } from "@/components/ExteriorShadowPass";

export default function ExteriorPage() {
  const router = useRouter();
  const [imageReady, setImageReady] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    router.prefetch("/vestibule?arrived=1");

    ["/media/architecture/vestibule-arch-desktop.jpg", "/media/architecture/vestibule-arch-mobile.jpg"].forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }, [router]);

  const enterVestibule = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (entering) return;

    setEntering(true);
    window.setTimeout(() => {
      router.push("/vestibule?arrived=1");
    }, 300);
  };

  return (
    <main
      className={`museum-exterior${imageReady ? " is-image-ready" : ""}${entering ? " is-entering" : ""}`}
    >
      <Image
        src="/media/architecture/stone-exterior-wide-1.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="museum-exterior__image"
        onLoad={() => setImageReady(true)}
      />

      <ExteriorShadowPass ready={imageReady} />

      <div className="museum-exterior__sign">
        Fruiting Body
      </div>

      <Link
        href="/vestibule?arrived=1"
        aria-label="Enter Fruiting Body"
        className="museum-exterior__door"
        onClick={enterVestibule}
      />

      <div className="museum-exterior__entry-veil" aria-hidden="true" />
    </main>
  );
}
