"use client";

import { useEffect, useRef, RefObject } from "react";

/**
 * useReveal — IntersectionObserver hook para animaciones scroll-triggered.
 *
 * Observa todos los elementos con [data-reveal] dentro del `containerRef`
 * y les añade la clase `is-visible` cuando entran al viewport.
 *
 * @param containerRef  Ref del contenedor padre que envuelve los elementos a animar
 * @param threshold     Fracción del elemento que debe ser visible (default 0.15)
 */
export function useReveal<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  threshold = 0.15
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = Array.from(
      container.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Una vez visible, dejamos de observar (animación one-shot)
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -60px 0px", // dispara un poco antes del borde inferior
      }
    );

    targets.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [containerRef, threshold]);
}
