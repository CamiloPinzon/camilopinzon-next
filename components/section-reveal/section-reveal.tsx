"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Delay de la transición en ms. Útil para efectos escalonados. */
  delay?: number;
}

/**
 * Envuelve cualquier sección con una animación de entrada scroll-triggered.
 * Usa IntersectionObserver — sin scroll listeners, compositor-only (opacity + transform).
 * Solo anima una vez; luego desconecta el observer para no degradar el rendimiento.
 */
export default function SectionReveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respetar prefers-reduced-motion desde JS también (doble protección)
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          // Una sola vez — libera el observer
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.07,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`section-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
