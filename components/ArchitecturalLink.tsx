import Link from "next/link";
import type { ReactNode } from "react";

export function ArchitecturalLink({
  href,
  children,
  tone = "default",
}: {
  href: string;
  children: ReactNode;
  tone?: "default" | "dark" | "light";
}) {
  return (
    <Link className={`architectural-link architectural-link--${tone}`} href={href}>
      {children}
    </Link>
  );
}
