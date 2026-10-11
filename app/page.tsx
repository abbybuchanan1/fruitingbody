"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ExteriorLeafShadows } from "@/components/ExteriorLeafShadows";
import { VestibuleProjection } from "@/components/VestibuleProjection";

export default function ExteriorPage() {
  const router = useRouter();
  const [imageReady, setImageReady] = useState(false);
  const [entering, setEntering] = useState(false);
  // Trial (October 2026): "/?v=b" shows the mushroom projection on the wall
  // instead of the tree shadows, so the two can be compared.
  const [variant, setVariant] = useState<"a" | "b">("a");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("v") === "b") setVariant("b");
  }, []);

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
      data-variant={variant}
      className={`museum-exterior${imageReady ? " is-image-ready" : ""}${entering ? " is-entering" : ""}`}
    >
      <Image
        src="/media/architecture/exterior-door.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="museum-exterior__image"
        onLoad={() => setImageReady(true)}
      />

      {variant === "b" ? (
        <div className={`museum-exterior__projection${imageReady ? " is-ready" : ""}`}>
          <VestibuleProjection place="entrance" />
        </div>
      ) : (
        <ExteriorLeafShadows ready={imageReady} />
      )}

      <div className="museum-exterior__sign">
        Fruiting Body
        <span className="museum-exterior__artist">Abby Buchanan</span>
      </div>

      <Link
        href="/vestibule?arrived=1"
        aria-label="Enter Fruiting Body"
        className="museum-exterior__door"
        onClick={enterVestibule}
      >
        <span className="museum-exterior__enter" aria-hidden="true">Enter</span>
      </Link>

      <div className="museum-exterior__entry-veil" aria-hidden="true" />
    </main>
  );
}
