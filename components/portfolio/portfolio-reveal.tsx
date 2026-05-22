"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/hooks/use-reveal";

/**
 * Wrapper client-side que activa las animaciones scroll-reveal
 * en el contenido del Portfolio (que es un Server Component).
 */
export default function PortfolioReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return <div ref={ref}>{children}</div>;
}
