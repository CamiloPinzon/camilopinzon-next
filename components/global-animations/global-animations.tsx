"use client";

import { useEffect } from "react";

/**
 * Sistema de animaciones global — un único IntersectionObserver para toda la página.
 * Escanea dos tipos de elementos:
 *
 * [data-reveal]   → La sección entera entra con fade + scale sutil
 * [data-stagger]  → Los hijos directos entran en cascada (stagger)
 *
 * Este componente no renderiza nada visible. Solo observa y añade atributos.
 * El CSS en globals.css hace el trabajo real de animación.
 */
export default function GlobalAnimations() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Si el usuario prefiere movimiento reducido, revelar todo sin animación
    if (prefersReduced) {
      document
        .querySelectorAll("[data-reveal], [data-stagger]")
        .forEach((el) => el.setAttribute("data-revealed", "true"));
      return;
    }

    const targets = document.querySelectorAll("[data-reveal], [data-stagger]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target); // Solo una vez
          }
        });
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -48px 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
